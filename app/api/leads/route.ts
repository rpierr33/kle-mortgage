import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { requireAuth } from "@/lib/utils/auth-guard";
import { z } from "zod";
import { desc } from "drizzle-orm";

const insertSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  interest: z.string().optional(),
  message: z.string().optional(),
  sourcePage: z.string().optional(),
  sourceType: z.enum(["contact_form", "apply_now", "calculator", "loan_program", "refinance"]).optional().default("contact_form"),
  smsConsent: z.boolean().optional().default(false),
  emailConsent: z.boolean().optional().default(false),
});

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

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = insertSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 422 });

  const d = parsed.data;

  try {
    const [lead] = await db.insert(leads).values({
      firstName: d.firstName,
      lastName: d.lastName,
      email: d.email,
      phone: d.phone,
      interest: d.interest,
      message: d.message,
      sourcePage: d.sourcePage,
      sourceType: d.sourceType ?? "contact_form",
      smsConsent: d.smsConsent ?? false,
      emailConsent: d.emailConsent ?? false,
      status: "new",
    }).returning();

    return NextResponse.json(lead, { status: 201 });
  } catch (err) {
    console.error("POST /api/leads error:", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
