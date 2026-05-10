import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";
import { db } from "@/lib/db";
import { blogPosts, loanOfficers } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { formatDate } from "@/lib/utils/format";
import ResourcesClient from "./ResourcesClient";
import { siteMetadata } from "@/lib/seo";

type Post = typeof blogPosts.$inferSelect;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return siteMetadata({
    path: "/resources",
    title: t("resourcesTitle"),
    description: t("resourcesDescription"),
  });
}

const fallbackPosts: Post[] = [
  { id: 1, slug: "first-time-buyer-guide", title: "The Complete First-Time Homebuyer's Guide", excerpt: "Everything you need to know about buying your first home — from saving for a down payment to closing day.", category: "first_time_buyer", readTimeMinutes: 8, publishedAt: new Date("2024-01-15"), viewCount: 1240, coverImageUrl: null, content: "", isPublished: true, authorId: 1, tags: [], seoTitle: null, seoDescription: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, slug: "understanding-fha-loans", title: "Understanding FHA Loans: Are They Right for You?", excerpt: "FHA loans offer flexibility for buyers with less-than-perfect credit. Learn if this program fits your situation.", category: "mortgage_tips", readTimeMinutes: 6, publishedAt: new Date("2024-02-01"), viewCount: 890, coverImageUrl: null, content: "", isPublished: true, authorId: 1, tags: [], seoTitle: null, seoDescription: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, slug: "mortgage-refinance-timing", title: "When Is the Right Time to Refinance Your Mortgage?", excerpt: "Interest rates, equity, and break-even analysis — how to know if refinancing makes financial sense for you.", category: "refinancing", readTimeMinutes: 7, publishedAt: new Date("2024-02-20"), viewCount: 650, coverImageUrl: null, content: "", isPublished: true, authorId: 1, tags: [], seoTitle: null, seoDescription: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, slug: "improving-credit-for-mortgage", title: "5 Ways to Improve Your Credit Score Before Applying", excerpt: "Even a 20-point improvement in your credit score can save thousands in interest. Here's how to boost it.", category: "buying_tips", readTimeMinutes: 5, publishedAt: new Date("2024-03-05"), viewCount: 1100, coverImageUrl: null, content: "", isPublished: true, authorId: 1, tags: [], seoTitle: null, seoDescription: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, slug: "va-loan-benefits-explained", title: "VA Loan Benefits Explained: A Guide for Veterans", excerpt: "Zero down payment, no PMI, competitive rates — here's everything veterans need to know about VA loans.", category: "mortgage_tips", readTimeMinutes: 6, publishedAt: new Date("2024-03-18"), viewCount: 740, coverImageUrl: null, content: "", isPublished: true, authorId: 1, tags: [], seoTitle: null, seoDescription: null, createdAt: new Date(), updatedAt: new Date() },
  { id: 6, slug: "mortgage-rates-2024", title: "Mortgage Rate Trends: What Buyers Need to Know in 2024", excerpt: "Understanding how rate changes affect affordability and what strategies buyers can use in today's market.", category: "market_update", readTimeMinutes: 5, publishedAt: new Date("2024-04-01"), viewCount: 920, coverImageUrl: null, content: "", isPublished: true, authorId: 1, tags: [], seoTitle: null, seoDescription: null, createdAt: new Date(), updatedAt: new Date() },
];

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
      <ResourcesClient posts={posts} categoryLabels={categoryLabels} />
      <CTASection />
    </>
  );
}
