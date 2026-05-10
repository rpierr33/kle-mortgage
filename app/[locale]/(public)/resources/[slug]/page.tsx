import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, BookOpen } from "lucide-react";
import { db } from "@/lib/db";
import { blogPosts, loanOfficers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { formatDate } from "@/lib/utils/format";
import { CTASection } from "@/components/public/CTASection";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (post) return { title: post.seoTitle || post.title, description: post.seoDescription || post.excerpt };
  } catch { /* fallback */ }
  return { title: "Article" };
}

export default async function ResourceDetailPage({ params }: Props) {
  const { slug } = await params;

  let post: typeof blogPosts.$inferSelect | null = null;
  let author: string | null = null;

  try {
    const [result] = await db
      .select({ post: blogPosts, authorName: loanOfficers.name })
      .from(blogPosts)
      .leftJoin(loanOfficers, eq(blogPosts.authorId, loanOfficers.id))
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (result && result.post.isPublished) {
      post = result.post;
      author = result.authorName;
    }
  } catch { /* fallback */ }

  if (!post) notFound();

  return (
    <>
      <section className="pt-28 pb-12 bg-[#6B1C23]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
            <span className="mx-2">/</span>
            <span className="text-white line-clamp-1">{post.title}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-cormorant)]">
            {post.title}
          </h1>
          <p className="text-white/80 text-lg mb-6">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-white/60">
            {author && <span>By {author}</span>}
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTimeMinutes} min read</span>
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F6F3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-[#E8E0D8] p-8 sm:p-12">
            {post.content ? (
              <div className="prose prose-slate max-w-none">
                {post.content.split('\n\n').map((para, i) => (
                  <p key={i} className="text-[#1A1A1A] leading-relaxed mb-4">{para}</p>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-[#6B6056]">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p>Full article coming soon.</p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Link href="/resources" className="flex items-center gap-2 text-[#6B1C23] font-semibold hover:underline">
              <ArrowLeft className="w-4 h-4" /> Back to Resources
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
