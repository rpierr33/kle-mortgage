import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { loanApplications } from "@/lib/db/schema";
import { requireAuth } from "@/lib/utils/auth-guard";
import { eq } from "drizzle-orm";
import { z } from "zod";

const PATCH_FIELDS = ["status", "assignedOfficerId", "notes"] as const;

const patchSchema = z.object({
  status: z.enum(["new", "in_review", "approved", "funded", "closed", "denied"]).optional(),
  assignedOfficerId: z.number().nullable().optional(),
  notes: z.string().optional(),
});

type Props = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Props) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const [app] = await db.select().from(loanApplications).where(eq(loanApplications.id, numId)).limit(1);
    if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(app);
  } catch (err) {
    console.error("GET /api/applications/[id] error:", err);
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
    const [updated] = await db.update(loanApplications).set(update).where(eq(loanApplications.id, numId)).returning();
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/applications/[id] error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
