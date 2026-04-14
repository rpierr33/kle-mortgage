import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { loanOfficers } from "@/lib/db/schema";
import { requireAuth } from "@/lib/utils/auth-guard";
import { z } from "zod";
import { asc } from "drizzle-orm";

const insertSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  nmlsNumber: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email(),
  bio: z.string().min(1),
  photoUrl: z.string().url().optional().nullable(),
  specialties: z.array(z.string()).optional().default([]),
  languages: z.array(z.string()).optional().default([]),
  yearsExperience: z.number().optional().default(0),
  licenseState: z.array(z.string()).optional().default([]),
  linkedinUrl: z.string().url().optional().nullable(),
  facebookUrl: z.string().url().optional().nullable(),
  isFounder: z.boolean().optional().default(false),
  displayOrder: z.number().optional().default(0),
});

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const officers = await db.select().from(loanOfficers).orderBy(asc(loanOfficers.displayOrder));
    return NextResponse.json(officers);
  } catch (err) {
    console.error("GET /api/team error:", err);
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = insertSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 422 });

  const d = parsed.data;
  const slug = d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  try {
    const [officer] = await db.insert(loanOfficers).values({
      ...d,
      slug,
      photoUrl: d.photoUrl ?? null,
      linkedinUrl: d.linkedinUrl ?? null,
      facebookUrl: d.facebookUrl ?? null,
    }).returning();

    return NextResponse.json(officer, { status: 201 });
  } catch (err) {
    console.error("POST /api/team error:", err);
    return NextResponse.json({ error: "Failed to create officer" }, { status: 500 });
  }
}
