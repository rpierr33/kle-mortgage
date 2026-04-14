import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";
import { db } from "@/lib/db";
import { blogPosts, loanOfficers } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { formatDate } from "@/lib/utils/format";

type Post = typeof blogPosts.$inferSelect;

export const metadata: Metadata = {
  title: "Resources & Mortgage Tips",
  description: "Learn everything about mortgages, home buying, and refinancing with KLE Mortgage's resource library.",
};

const fallbackPosts: Post[] = [
  { id: 1, slug: "first-time-buyer-guide", title: "The Complete First-Time Homebuyer's Guide", excerpt: "Everything you need to know about buying your first home — from saving for a down payment to closing day.", category: "first_time_buyer", readTimeMinutes: 8, publishedAt: new Date("2024-01-15"), viewCount: 1240, coverImageUrl: null, content: "", isPublished: true, authorId: 1, tags: [], seoTitle: null, seoDescription: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, slug: "understanding-fha-loans", title: "Understanding FHA Loans: Are They Right for You?", excerpt: "FHA loans offer flexibility for buyers with less-than-perfect credit. Learn if this program fits your situation.", category: "mortgage_tips", readTimeMinutes: 6, publishedAt: new Date("2024-02-01"), viewCount: 890, coverImageUrl: null, content: "", isPublished: true, authorId: 1, tags: [], seoTitle: null, seoDescription: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, slug: "mortgage-refinance-timing", title: "When Is the Right Time to Refinance Your Mortgage?", excerpt: "Interest rates, equity, and break-even analysis — how to know if refinancing makes financial sense for you.", category: "refinancing", readTimeMinutes: 7, publishedAt: new Date("2024-02-20"), viewCount: 650, coverImageUrl: null, content: "", isPublished: true, authorId: 1, tags: [], seoTitle: null, seoDescription: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, slug: "improving-credit-for-mortgage", title: "5 Ways to Improve Your Credit Score Before Applying", excerpt: "Even a 20-point improvement in your credit score can save thousands in interest. Here's how to boost it.", category: "buying_tips", readTimeMinutes: 5, publishedAt: new Date("2024-03-05"), viewCount: 1100, coverImageUrl: null, content: "", isPublished: true, authorId: 1, tags: [], seoTitle: null, seoDescription: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, slug: "va-loan-benefits-explained", title: "VA Loan Benefits Explained: A Guide for Veterans", excerpt: "Zero down payment, no PMI, competitive rates — here's everything veterans need to know about VA loans.", category: "mortgage_tips", readTimeMinutes: 6, publishedAt: new Date("2024-03-18"), viewCount: 740, coverImageUrl: null, content: "", isPublished: true, authorId: 1, tags: [], seoTitle: null, seoDescription: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 6, slug: "mortgage-rates-2024", title: "Mortgage Rate Trends: What Buyers Need to Know in 2024", excerpt: "Understanding how rate changes affect affordability and what strategies buyers can use in today's market.", category: "market_update", readTimeMinutes: 5, publishedAt: new Date("2024-04-01"), viewCount: 920, coverImageUrl: null, content: "", isPublished: true, authorId: 1, tags: [], seoTitle: null, seoDescription: null, createdAt: new Date(), updatedAt: new Date() },
];

const categoryColors: Record<string, string> = {
  market_update: "bg-blue-100 text-blue-700",
  buying_tips: "bg-green-100 text-green-700",
  mortgage_tips: "bg-purple-100 text-purple-700",
  first_time_buyer: "bg-pink-100 text-pink-700",
  refinancing: "bg-amber-100 text-amber-700",
  company_news: "bg-gray-100 text-gray-700",
};

const categoryLabels: Record<string, string> = {
  market_update: "Market Update",
  buying_tips: "Buying Tips",
  mortgage_tips: "Mortgage Tips",
  first_time_buyer: "First-Time Buyer",
  refinancing: "Refinancing",
  company_news: "Company News",
};

export default async function ResourcesPage() {
  let posts = [...fallbackPosts];
  try {
    const dbPosts = await db
      .select({ post: blogPosts, author: { name: loanOfficers.name } })
      .from(blogPosts)
      .leftJoin(loanOfficers, eq(blogPosts.authorId, loanOfficers.id))
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.publishedAt))
      .limit(12);
    if (dbPosts.length > 0) {
      posts = dbPosts.map((r) => r.post);
    }
  } catch { /* fallback */ }

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#6B1C23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-[#C9A345] text-sm font-semibold uppercase tracking-widest mb-3">Blog & Resources</span>
            <h1 className="text-5xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
              Mortgage Tips & Guides
            </h1>
            <p className="text-xl text-white/80">
              Expert advice to help you navigate the homebuying and refinancing process with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen className="w-12 h-12 text-[#6B6056] mx-auto mb-4" />
              <p className="text-[#6B6056]">Resources coming soon. Check back shortly!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/resources/${post.slug}`}
                  className="group bg-white rounded-xl border border-[#E8E0D8] overflow-hidden hover:shadow-lg transition-all"
                >
                  {/* Cover image placeholder */}
                  <div className="bg-[#6B1C23]/10 h-40 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-[#6B1C23]/30" />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}>
                        {categoryLabels[post.category] || post.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-[#6B6056]">
                        <Clock className="w-3 h-3" />
                        {post.readTimeMinutes} min read
                      </div>
                    </div>

                    <h2 className="font-bold text-[#1A1A1A] mb-2 group-hover:text-[#6B1C23] transition-colors line-clamp-2 font-[family-name:var(--font-playfair)]">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[#6B6056] line-clamp-2 mb-4">{post.excerpt}</p>

                    <div className="flex items-center justify-between text-xs text-[#6B6056]">
                      <span>{post.publishedAt ? formatDate(post.publishedAt) : ""}</span>
                      <span className="flex items-center gap-1 text-[#6B1C23] font-medium group-hover:underline">
                        Read More <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
