import { NextRequest, NextResponse, after } from "next/server";
import { z } from "zod";
import { and, eq, gte, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { requireAuth } from "@/lib/utils/auth-guard";
import { notifyTeam, sendAutoresponder } from "@/lib/lead-notify";
import { pickLoanOfficer } from "@/lib/lead-router";
import { desc } from "drizzle-orm";

const RATE_LIMIT_PER_EMAIL_WINDOW_SEC = 60;
const RATE_LIMIT_GLOBAL_WINDOW_SEC = 60;
const RATE_LIMIT_GLOBAL_MAX = 30;

const utmSchema = z
  .object({
    source: z.string().max(120).optional(),
    medium: z.string().max(120).optional(),
    campaign: z.string().max(120).optional(),
    content: z.string().max(120).optional(),
    term: z.string().max(120).optional(),
    referrer: z.string().max(500).optional(),
    landing: z.string().max(500).optional(),
  })
  .partial();

const insertSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  interest: z.string().max(100).optional(),
  message: z.string().max(4000).optional(),
  sourcePage: z.string().max(255).optional(),
  sourceType: z
    .enum(["contact_form", "apply_now", "calculator", "loan_program", "refinance"])
    .optional()
    .default("contact_form"),
  smsConsent: z.boolean().optional().default(false),
  emailConsent: z.boolean().optional().default(false),
  locale: z.enum(["en", "fr", "ht"]).default("en"),
  utm: utmSchema.optional(),
  // Honeypot — real users never fill this; bots always do.
  website: z.string().max(500).optional(),
});

function buildSourcePage(
  base: string | undefined,
  utm: z.infer<typeof utmSchema> | undefined,
): string | undefined {
  const parts: string[] = [];
  if (base) parts.push(base);
  if (utm?.source) parts.push(`utm_source=${utm.source}`);
  if (utm?.medium) parts.push(`utm_medium=${utm.medium}`);
  if (utm?.campaign) parts.push(`utm_campaign=${utm.campaign}`);
  if (utm?.content) parts.push(`utm_content=${utm.content}`);
  if (utm?.term) parts.push(`utm_term=${utm.term}`);
  if (parts.length === 0) return undefined;
  return parts.join("|").slice(0, 255);
}

function buildMessage(
  userMessage: string | undefined,
  utm: z.infer<typeof utmSchema> | undefined,
): string | null {
  const lines: string[] = [];
  if (userMessage) lines.push(userMessage.trim());
  const meta: string[] = [];
  if (utm?.referrer) meta.push(`Referrer: ${utm.referrer}`);
  if (utm?.landing) meta.push(`Landing: ${utm.landing}`);
  if (meta.length) {
    if (lines.length) lines.push("");
    lines.push("---");
    lines.push(...meta);
  }
  return lines.length ? lines.join("\n") : null;
}

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(200);
    return NextResponse.json(allLeads);
  } catch (err) {
    console.error("GET /api/leads error:", err);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let data: z.infer<typeof insertSchema>;
  try {
    const body = await req.json();
    data = insertSchema.parse(body);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: err.issues },
        { status: 422 },
      );
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // 1. Honeypot — pretend success on bot fill, do not insert.
  if (data.website && data.website.trim().length > 0) {
    return NextResponse.json({ success: true, message: "Lead created" }, { status: 201 });
  }

  const firstName = data.firstName.trim();
  const lastName = data.lastName.trim();
  const email = data.email.toLowerCase().trim();
  const phone = data.phone ? data.phone.replace(/[^\d+]/g, "") : "";

  try {
    // 2. Per-contact dedupe + rate limit: same email or phone in the last minute returns
    //    the existing lead (idempotent for double-click) without re-inserting or re-notifying.
    const dedupeWindow = new Date(Date.now() - RATE_LIMIT_PER_EMAIL_WINDOW_SEC * 1000);
    const dedupePredicates = [eq(leads.email, email)];
    if (phone) dedupePredicates.push(eq(leads.phone, phone));
    const recent = await db
      .select({ id: leads.id })
      .from(leads)
      .where(and(or(...dedupePredicates), gte(leads.createdAt, dedupeWindow)))
      .limit(1);
    if (recent.length > 0) {
      return NextResponse.json(
        { success: true, message: "Lead already received", id: recent[0].id },
        { status: 200 },
      );
    }

    // 3. Global flood guard: cap site-wide submissions at N per minute.
    const globalWindow = new Date(Date.now() - RATE_LIMIT_GLOBAL_WINDOW_SEC * 1000);
    const [{ floodCount = 0 } = { floodCount: 0 }] = await db
      .select({ floodCount: sql<number>`count(*)::int` })
      .from(leads)
      .where(gte(leads.createdAt, globalWindow));
    if (floodCount >= RATE_LIMIT_GLOBAL_MAX) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(RATE_LIMIT_GLOBAL_WINDOW_SEC) } },
      );
    }

    // 4. Round-robin assignment (least-loaded active loan officer).
    const picked = await pickLoanOfficer();

    // 5. Atomic insert with assignment in one statement.
    const sourcePage = buildSourcePage(data.sourcePage, data.utm);
    const composedMessage = buildMessage(data.message, data.utm);

    const [inserted] = await db
      .insert(leads)
      .values({
        firstName,
        lastName,
        email,
        phone: phone || null,
        interest: data.interest || null,
        message: composedMessage,
        sourcePage: sourcePage || null,
        sourceType: data.sourceType ?? "contact_form",
        smsConsent: data.smsConsent ?? false,
        emailConsent: data.emailConsent ?? false,
        status: "new",
        ...(picked ? { assignedOfficerId: picked.id } : {}),
      })
      .returning({ id: leads.id });

    // 6. Notifications via Next.js `after()`. Runs after the response is sent
    //    but within Vercel's lifecycle. NEVER await outbound email in the
    //    response path — see feedback_serverless_no_await_side_effects.md.
    const leadForEmail = {
      id: inserted.id,
      firstName,
      lastName,
      email,
      phone,
      interest: data.interest ?? "",
      message: composedMessage,
      source: sourcePage ?? null,
      assignedOfficerName: picked?.name ?? null,
    };
    after(async () => {
      await Promise.allSettled([
        notifyTeam(leadForEmail),
        sendAutoresponder(leadForEmail, data.locale),
      ]);
    });

    return NextResponse.json(
      { success: true, message: "Lead created", id: inserted.id },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/leads error:", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
