import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { loanOfficers } from "@/lib/db/schema";
import { requireAuth } from "@/lib/utils/auth-guard";
import { eq } from "drizzle-orm";
import { z } from "zod";

const PATCH_FIELDS = ["name", "title", "nmlsNumber", "phone", "email", "bio", "photoUrl", "specialties", "languages", "yearsExperience", "licenseState", "isFounder", "isActive", "displayOrder"] as const;

const patchSchema = z.object({
  name: z.string().optional(),
  title: z.string().optional(),
  nmlsNumber: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  bio: z.string().optional(),
  photoUrl: z.string().nullable().optional(),
  specialties: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  yearsExperience: z.number().optional(),
  licenseState: z.array(z.string()).optional(),
  isFounder: z.boolean().optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.number().optional(),
});

type Props = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Props) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const [officer] = await db.select().from(loanOfficers).where(eq(loanOfficers.id, numId)).limit(1);
    if (!officer) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(officer);
  } catch (err) {
    console.error("GET /api/team/[id] error:", err);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Props) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Validation failed" }, { status: 422 });

  const update: Record<string, unknown> = { updatedAt: new Date() };
  for (const key of PATCH_FIELDS) {
    if (parsed.data[key] !== undefined) update[key] = parsed.data[key];
  }

  try {
    const [updated] = await db.update(loanOfficers).set(update).where(eq(loanOfficers.id, numId)).returning();
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/team/[id] error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Props) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const [updated] = await db.update(loanOfficers).set({ isActive: false, updatedAt: new Date() }).where(eq(loanOfficers.id, numId)).returning();
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/team/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
