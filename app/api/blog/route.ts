import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { requireAuth } from "@/lib/utils/auth-guard";
import { z } from "zod";
import { desc } from "drizzle-orm";

const insertSchema = z.object({
  title: z.string().min(1),
  slug: z.string().optional(),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  coverImageUrl: z.string().nullable().optional(),
  authorId: z.number().optional().nullable(),
  category: z.enum(["market_update", "buying_tips", "mortgage_tips", "first_time_buyer", "refinancing", "company_news"]),
  tags: z.array(z.string()).optional().default([]),
  isPublished: z.boolean().optional().default(false),
  readTimeMinutes: z.number().optional().default(5),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
});

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).limit(100);
    return NextResponse.json(posts);
  } catch (err) {
    console.error("GET /api/blog error:", err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
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
  const slug = d.slug ?? d.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now();

  try {
    const [post] = await db.insert(blogPosts).values({
      ...d,
      slug,
      coverImageUrl: d.coverImageUrl ?? null,
      authorId: d.authorId ?? null,
      seoTitle: d.seoTitle ?? null,
      seoDescription: d.seoDescription ?? null,
      publishedAt: d.isPublished ? new Date() : null,
    }).returning();

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("POST /api/blog error:", err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
