import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { requireAuth } from "@/lib/utils/auth-guard";
import { eq } from "drizzle-orm";
import { z } from "zod";

const PATCH_FIELDS = ["title", "excerpt", "content", "coverImageUrl", "authorId", "category", "tags", "isPublished", "readTimeMinutes", "seoTitle", "seoDescription"] as const;

const patchSchema = z.object({
  title: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  coverImageUrl: z.string().nullable().optional(),
  authorId: z.number().nullable().optional(),
  category: z.enum(["market_update", "buying_tips", "mortgage_tips", "first_time_buyer", "refinancing", "company_news"]).optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  readTimeMinutes: z.number().optional(),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
});

type Props = { params: Promise<{ id: string }> };

export async function GET(_req: Request, { params }: Props) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id } = await params;
  const numId = parseInt(id);
  if (isNaN(numId)) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });

  try {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, numId)).limit(1);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch (err) {
    console.error("GET /api/blog/[id] error:", err);
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

  // Auto-set publishedAt when publishing
  if (parsed.data.isPublished === true) {
    const [existing] = await db.select({ publishedAt: blogPosts.publishedAt }).from(blogPosts).where(eq(blogPosts.id, numId)).limit(1);
    if (!existing?.publishedAt) update.publishedAt = new Date();
  }

  try {
    const [updated] = await db.update(blogPosts).set(update).where(eq(blogPosts.id, numId)).returning();
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH /api/blog/[id] error:", err);
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
    await db.delete(blogPosts).where(eq(blogPosts.id, numId));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/blog/[id] error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
