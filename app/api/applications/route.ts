import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { loanApplications } from "@/lib/db/schema";
import { requireAuth } from "@/lib/utils/auth-guard";
import { z } from "zod";
import { desc } from "drizzle-orm";

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

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = insertSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 422 });
  }

  const d = parsed.data;

  try {
    const [app] = await db
      .insert(loanApplications)
      .values({
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email,
        phone: d.phone,
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
      })
      .returning();

    return NextResponse.json(app, { status: 201 });
  } catch (err) {
    console.error("POST /api/applications error:", err);
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }
}
