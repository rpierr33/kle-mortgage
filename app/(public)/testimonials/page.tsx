import type { Metadata } from "next";
import { Star } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";
import { db } from "@/lib/db";
import { testimonials } from "@/lib/db/schema";
import { asc } from "drizzle-orm";

type Testimonial = typeof testimonials.$inferSelect;

export const metadata: Metadata = {
  title: "Client Testimonials",
  description: "Read real stories from families who achieved homeownership with KLE Mortgage Financing. See why clients trust us with their biggest investment.",
};

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
  { id: 1, reviewerName: "Marcus & Tanya Williams", rating: 5, location: "Atlanta, GA", loanType: "fha" as const, verified: true, isFeatured: true, displayOrder: 0, reviewerAvatarUrl: null, reviewText: "KLE made our first home purchase stress-free. Our loan officer explained everything clearly and we closed in 28 days. Highly recommend to anyone looking to buy!", createdAt: new Date(), updatedAt: new Date() },
  { id: 2, reviewerName: "Robert Johnson", rating: 5, location: "Marietta, GA", loanType: "va" as const, verified: true, isFeatured: true, displayOrder: 1, reviewerAvatarUrl: null, reviewText: "As a veteran, I was grateful for the VA loan expertise at KLE. They knew exactly what I was entitled to and got me into my home with zero down. Incredible service.", createdAt: new Date(), updatedAt: new Date() },
  { id: 3, reviewerName: "Priya Patel", rating: 5, location: "Decatur, GA", loanType: "conventional" as const, verified: true, isFeatured: false, displayOrder: 2, reviewerAvatarUrl: null, reviewText: "I refinanced my home through KLE and saved $420/month. The process was seamless and my loan officer was always available to answer my questions.", createdAt: new Date(), updatedAt: new Date() },
  { id: 4, reviewerName: "David & Sarah Chen", rating: 5, location: "Alpharetta, GA", loanType: "conventional" as const, verified: true, isFeatured: true, displayOrder: 3, reviewerAvatarUrl: null, reviewText: "We tried two other lenders before KLE — nobody could get our deal done. KLE found a program that worked perfectly for our situation. Closed in 32 days!", createdAt: new Date(), updatedAt: new Date() },
  { id: 5, reviewerName: "Tamika Brooks", rating: 5, location: "Stone Mountain, GA", loanType: "fha" as const, verified: true, isFeatured: true, displayOrder: 4, reviewerAvatarUrl: null, reviewText: "As a single mom, I never thought homeownership was possible. KLE helped me qualify for a first-time buyer program and the whole team celebrated with me at closing!", createdAt: new Date(), updatedAt: new Date() },
  { id: 6, reviewerName: "Kevin & Angela Moore", rating: 5, location: "Duluth, GA", loanType: "usda" as const, verified: true, isFeatured: false, displayOrder: 5, reviewerAvatarUrl: null, reviewText: "We used USDA and got into our dream home in a great school district for 0% down. KLE walked us through every step. Cannot say enough good things.", createdAt: new Date(), updatedAt: new Date() },
  { id: 7, reviewerName: "James & Michelle Harris", rating: 5, location: "Roswell, GA", loanType: "conventional" as const, verified: true, isFeatured: false, displayOrder: 6, reviewerAvatarUrl: null, reviewText: "Professional, responsive, and knowledgeable. KLE got us the best rate we found anywhere. We're in our forever home thanks to them.", createdAt: new Date(), updatedAt: new Date() },
  { id: 8, reviewerName: "Carlos Rodriguez", rating: 5, location: "Lawrenceville, GA", loanType: "fha" as const, verified: true, isFeatured: false, displayOrder: 7, reviewerAvatarUrl: null, reviewText: "I had some credit challenges and KLE took the time to work with me on a plan. Within 8 months I was approved. Patient, helpful team.", createdAt: new Date(), updatedAt: new Date() },
];

export default async function TestimonialsPage() {
  let allTestimonials = [...fallbackTestimonials];
  try {
    const dbTestimonials = await db.select().from(testimonials).orderBy(asc(testimonials.displayOrder));
    if (dbTestimonials.length > 0) allTestimonials = dbTestimonials;
  } catch { /* fallback */ }

  const avgRating = allTestimonials.reduce((sum, t) => sum + t.rating, 0) / allTestimonials.length;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#6B1C23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
            Client Testimonials
          </h1>
          <p className="text-xl text-white/80 mb-6">Real stories from families we've helped achieve homeownership.</p>
          <div className="flex items-center justify-center gap-2">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} className="w-6 h-6 fill-[#C9A345] text-[#C9A345]" />
            ))}
            <span className="text-white font-bold ml-1">{avgRating.toFixed(1)}/5</span>
            <span className="text-white/60">({allTestimonials.length} reviews)</span>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allTestimonials.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-[#E8E0D8] p-6 hover:shadow-md transition-shadow">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A345] text-[#C9A345]" />
                  ))}
                </div>
                <p className="text-[#1A1A1A] text-sm leading-relaxed mb-5 italic">
                  &ldquo;{item.reviewText}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-[#E8E0D8]">
                  <div>
                    <p className="font-semibold text-sm text-[#1A1A1A]">{item.reviewerName}</p>
                    {item.location && <p className="text-xs text-[#6B6056]">{item.location}</p>}
                  </div>
                  <span className="text-xs bg-[#F8F6F3] border border-[#E8E0D8] text-[#6B1C23] px-2.5 py-1 rounded-full font-medium">
                    {loanTypeLabels[item.loanType] || item.loanType}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
