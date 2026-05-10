import { NextRequest, NextResponse, after } from "next/server";
import { z } from "zod";
import { and, eq, gte, or, sql, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { loanApplications } from "@/lib/db/schema";
import { requireAuth } from "@/lib/utils/auth-guard";
import { notifyTeam, sendAutoresponder } from "@/lib/lead-notify";
import { pickLoanOfficer } from "@/lib/lead-router";

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
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  dateOfBirth: z.string().optional(),
  loanType: z.enum(["conventional", "fha", "va", "usda", "jumbo", "refinance", "first_time_buyer", "other"]),
  isRefinance: z.boolean().optional().default(false),
  purchasePrice: z.string().optional(),
  downPayment: z.string().optional(),
  propertyAddress: z.string().optional(),
  propertyCity: z.string().optional(),
  propertyState: z.string().optional(),
  propertyZip: z.string().optional(),
  propertyType: z.enum(["single_family", "condo", "townhouse", "multi_family", "manufactured", "other"]).optional(),
  propertyUsage: z.enum(["primary_residence", "secondary_home", "investment_property"]).optional(),
  employmentStatus: z.enum(["employed", "self_employed", "retired", "other"]).optional(),
  employerName: z.string().optional(),
  jobTitle: z.string().optional(),
  yearsEmployed: z.string().optional(),
  grossMonthlyIncome: z.string().optional(),
  otherIncome: z.string().optional(),
  estimatedCreditScore: z.string().optional(),
  smsConsent: z.boolean().optional().default(false),
  emailConsent: z.boolean().optional().default(false),
  locale: z.enum(["en", "fr", "ht"]).default("en"),
  utm: utmSchema.optional(),
  // Honeypot
  website: z.string().max(500).optional(),
});

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const apps = await db
      .select()
      .from(loanApplications)
      .orderBy(desc(loanApplications.createdAt))
      .limit(100);
    return NextResponse.json(apps);
  } catch (err) {
    console.error("GET /api/applications error:", err);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = insertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const d = parsed.data;

  // 1. Honeypot
  if (d.website && d.website.trim().length > 0) {
    return NextResponse.json({ success: true, message: "Application created" }, { status: 201 });
  }

  const email = d.email.toLowerCase().trim();
  const phone = d.phone.replace(/[^\d+]/g, "");

  try {
    // 2. Per-contact dedupe (same email or phone in last 60s).
    const dedupeWindow = new Date(Date.now() - RATE_LIMIT_PER_EMAIL_WINDOW_SEC * 1000);
    const recent = await db
      .select({ id: loanApplications.id })
      .from(loanApplications)
      .where(
        and(
          or(eq(loanApplications.email, email), eq(loanApplications.phone, phone)),
          gte(loanApplications.createdAt, dedupeWindow),
        ),
      )
      .limit(1);
    if (recent.length > 0) {
      return NextResponse.json(
        { success: true, message: "Application already received", id: recent[0].id },
        { status: 200 },
      );
    }

    // 3. Global flood guard.
    const globalWindow = new Date(Date.now() - RATE_LIMIT_GLOBAL_WINDOW_SEC * 1000);
    const [{ floodCount = 0 } = { floodCount: 0 }] = await db
      .select({ floodCount: sql<number>`count(*)::int` })
      .from(loanApplications)
      .where(gte(loanApplications.createdAt, globalWindow));
    if (floodCount >= RATE_LIMIT_GLOBAL_MAX) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(RATE_LIMIT_GLOBAL_WINDOW_SEC) } },
      );
    }

    // 4. Round-robin assignment (least-loaded active loan officer).
    const picked = await pickLoanOfficer();

    // 5. Atomic insert.
    const [app] = await db
      .insert(loanApplications)
      .values({
        firstName: d.firstName,
        lastName: d.lastName,
        email,
        phone,
        dateOfBirth: d.dateOfBirth,
        loanType: d.loanType,
        isRefinance: d.isRefinance ?? false,
        purchasePrice: d.purchasePrice ?? null,
        downPayment: d.downPayment ?? null,
        propertyAddress: d.propertyAddress,
        propertyCity: d.propertyCity,
        propertyState: d.propertyState,
        propertyZip: d.propertyZip,
        propertyType: d.propertyType ?? null,
        propertyUsage: d.propertyUsage ?? null,
        employmentStatus: d.employmentStatus ?? null,
        employerName: d.employerName,
        jobTitle: d.jobTitle,
        yearsEmployed: d.yearsEmployed ?? null,
        grossMonthlyIncome: d.grossMonthlyIncome ?? null,
        otherIncome: d.otherIncome ?? null,
        estimatedCreditScore: d.estimatedCreditScore,
        smsConsent: d.smsConsent ?? false,
        emailConsent: d.emailConsent ?? false,
        status: "new",
        ...(picked ? { assignedOfficerId: picked.id } : {}),
      })
      .returning();

    // 6. Notifications via after() — never await outbound HTTP in response path.
    const sourceTag = ["loan_application", `loan_type=${d.loanType}`]
      .concat(d.utm?.source ? [`utm_source=${d.utm.source}`] : [])
      .concat(d.utm?.campaign ? [`utm_campaign=${d.utm.campaign}`] : [])
      .join("|")
      .slice(0, 255);

    const leadForEmail = {
      id: app.id,
      firstName: d.firstName,
      lastName: d.lastName,
      email,
      phone,
      interest: `Loan Application — ${d.loanType.replace("_", " ")}`,
      message:
        [
          d.purchasePrice ? `Purchase Price: $${Number(d.purchasePrice).toLocaleString()}` : null,
          d.propertyAddress
            ? `Property: ${[d.propertyAddress, d.propertyCity, d.propertyState, d.propertyZip].filter(Boolean).join(", ")}`
            : null,
          d.grossMonthlyIncome ? `Income: $${Number(d.grossMonthlyIncome).toLocaleString()}/mo` : null,
          d.utm?.referrer ? `Referrer: ${d.utm.referrer}` : null,
        ]
          .filter(Boolean)
          .join("\n") || null,
      source: sourceTag,
      assignedOfficerName: picked?.name ?? null,
    };
    after(async () => {
      await Promise.allSettled([
        notifyTeam(leadForEmail),
        sendAutoresponder(leadForEmail, d.locale),
      ]);
    });

    return NextResponse.json(app, { status: 201 });
  } catch (err) {
    console.error("POST /api/applications error:", err);
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }
}
