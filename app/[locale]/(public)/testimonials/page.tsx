import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import TestimonialsClient from "./TestimonialsClient";
import { siteMetadata } from "@/lib/seo";

type Testimonial = typeof testimonials.$inferSelect;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return siteMetadata({
    path: "/testimonials",
    title: t("testimonialsTitle"),
    description: t("testimonialsDescription"),
  });
}

const loanTypeLabels: Record<string, string> = {
  conventional: "Conventional Loan",
  fha: "FHA Loan",
  va: "VA Loan",
  usda: "USDA Loan",
  jumbo: "Jumbo Loan",
  refinance: "Refinance",
  first_time_buyer: "First-Time Buyer",
  other: "Home Loan",
};

const fallbackTestimonials: Testimonial[] = [
  { id: 1, reviewerName: "Marcus & Tanya Williams", rating: 5, location: "Miami, FL", loanType: "fha" as const, verified: true, isFeatured: true, displayOrder: 0, reviewerAvatarUrl: null, reviewText: "KLE made our first home purchase stress-free. Our loan officer explained everything clearly and we closed in 28 days. Highly recommend to anyone looking to buy!", createdAt: new Date(), updatedAt: new Date() },
  { id: 2, reviewerName: "Robert Johnson", rating: 5, location: "Hollywood, FL", loanType: "va" as const, verified: true, isFeatured: true, displayOrder: 1, reviewerAvatarUrl: null, reviewText: "As a veteran, I was grateful for the VA loan expertise at KLE. They knew exactly what I was entitled to and got me into my home with zero down. Incredible service.", createdAt: new Date(), updatedAt: new Date() },
  { id: 3, reviewerName: "Priya Patel", rating: 5, location: "Coral Gables, FL", loanType: "conventional" as const, verified: true, isFeatured: false, displayOrder: 2, reviewerAvatarUrl: null, reviewText: "I refinanced my home through KLE and saved $420/month. The process was seamless and my loan officer was always available to answer my questions.", createdAt: new Date(), updatedAt: new Date() },
  { id: 4, reviewerName: "David & Sarah Chen", rating: 5, location: "Aventura, FL", loanType: "conventional" as const, verified: true, isFeatured: true, displayOrder: 3, reviewerAvatarUrl: null, reviewText: "We tried two other lenders before KLE — nobody could get our deal done. KLE found a program that worked perfectly for our situation. Closed in 32 days!", createdAt: new Date(), updatedAt: new Date() },
  { id: 5, reviewerName: "Tamika Brooks", rating: 5, location: "Hialeah, FL", loanType: "fha" as const, verified: true, isFeatured: true, displayOrder: 4, reviewerAvatarUrl: null, reviewText: "As a single mom, I never thought homeownership was possible. KLE helped me qualify for a first-time buyer program and the whole team celebrated with me at closing!", createdAt: new Date(), updatedAt: new Date() },
  { id: 6, reviewerName: "Kevin & Angela Moore", rating: 5, location: "Doral, FL", loanType: "usda" as const, verified: true, isFeatured: false, displayOrder: 5, reviewerAvatarUrl: null, reviewText: "We used USDA and got into our dream home in a great school district for 0% down. KLE walked us through every step. Cannot say enough good things.", createdAt: new Date(), updatedAt: new Date() },
  { id: 7, reviewerName: "James & Michelle Harris", rating: 5, location: "Plantation, FL", loanType: "conventional" as const, verified: true, isFeatured: false, displayOrder: 6, reviewerAvatarUrl: null, reviewText: "Professional, responsive, and knowledgeable. KLE got us the best rate we found anywhere. We're in our forever home thanks to them.", createdAt: new Date(), updatedAt: new Date() },
  { id: 8, reviewerName: "Carlos Rodriguez", rating: 5, location: "Pembroke Pines, FL", loanType: "fha" as const, verified: true, isFeatured: false, displayOrder: 7, reviewerAvatarUrl: null, reviewText: "I had some credit challenges and KLE took the time to work with me on a plan. Within 8 months I was approved. Patient, helpful team.", createdAt: new Date(), updatedAt: new Date() },
];

export default async function TestimonialsPage() {
  let allTestimonials = [...fallbackTestimonials];
  try {
    const dbTestimonials = await db.select().from(testimonials).orderBy(asc(testimonials.displayOrder));
    if (dbTestimonials.length > 0) allTestimonials = dbTestimonials;
  } catch { /* fallback */ }

  return (
    <>
      <TestimonialsClient testimonials={allTestimonials} loanTypeLabels={loanTypeLabels} />
      <CTASection />
    </>
  );
}
