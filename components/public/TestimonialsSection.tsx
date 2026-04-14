"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { testimonials } from "@/lib/db/schema";
import Link from "next/link";

type Testimonial = typeof testimonials.$inferSelect;

const fallbackTestimonials = [
  {
    id: 1, reviewerName: "Marcus & Tanya Williams", rating: 5, location: "Atlanta, GA",
    loanType: "fha" as const, verified: true, isFeatured: true, displayOrder: 0,
    reviewerAvatarUrl: null,
    reviewText: "KLE made our first home purchase stress-free. Our loan officer explained everything clearly and we closed in 28 days. Highly recommend!",
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 2, reviewerName: "Robert Johnson", rating: 5, location: "Marietta, GA",
    loanType: "va" as const, verified: true, isFeatured: true, displayOrder: 1,
    reviewerAvatarUrl: null,
    reviewText: "As a veteran, I was grateful for the VA loan expertise at KLE. They knew exactly what I was entitled to and got me into my home with zero down.",
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 3, reviewerName: "Priya Patel", rating: 5, location: "Decatur, GA",
    loanType: "conventional" as const, verified: true, isFeatured: true, displayOrder: 2,
    reviewerAvatarUrl: null,
    reviewText: "I refinanced my home through KLE and saved $420/month. The process was seamless and my loan officer was always available to answer my questions.",
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 4, reviewerName: "David & Sarah Chen", rating: 5, location: "Alpharetta, GA",
    loanType: "conventional" as const, verified: true, isFeatured: true, displayOrder: 3,
    reviewerAvatarUrl: null,
    reviewText: "We tried two other lenders before KLE — nobody could get our deal done. KLE found a program that worked perfectly for our situation.",
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 5, reviewerName: "Tamika Brooks", rating: 5, location: "Stone Mountain, GA",
    loanType: "fha" as const, verified: true, isFeatured: true, displayOrder: 4,
    reviewerAvatarUrl: null,
    reviewText: "As a single mom, I never thought homeownership was possible. KLE helped me qualify for a first-time buyer program and the whole team celebrated with me at closing!",
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 6, reviewerName: "Kevin & Angela Moore", rating: 5, location: "Duluth, GA",
    loanType: "usda" as const, verified: true, isFeatured: true, displayOrder: 5,
    reviewerAvatarUrl: null,
    reviewText: "We used USDA and got into our dream home in a great school district for 0% down. KLE walked us through every step. Cannot say enough good things.",
    createdAt: new Date(), updatedAt: new Date(),
  },
];

const loanTypeLabels: Record<string, string> = {
  conventional: "Conventional",
  fha: "FHA Loan",
  va: "VA Loan",
  usda: "USDA Loan",
  jumbo: "Jumbo Loan",
  refinance: "Refinance",
  first_time_buyer: "First-Time Buyer",
  other: "Home Loan",
};

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

interface Props {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials: data }: Props) {
  const displayData = data.length > 0 ? data : fallbackTestimonials;

  return (
    <section className="py-28 bg-[#0F0A0B] relative overflow-hidden">
      {/* Warm background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C1014] via-[#0F0A0B] to-[#0D0608]" />

      {/* Decorative gold blur top-right */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A345]/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#6B1C23]/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#C9A345] rounded-full" />
            <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
              Client Stories
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#C9A345] rounded-full" />
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold text-white mb-4">
            Real Families.{" "}
            <span className="text-[#C9A345] italic">Real Results.</span>
          </h2>
          <p className="text-[#A89588] text-base max-w-md mx-auto leading-relaxed">
            Don&apos;t take our word for it — here&apos;s what our clients say about
            working with KLE Mortgage.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white/[0.04] hover:bg-white/[0.07] border border-white/8 hover:border-[#C9A345]/25 rounded-2xl p-7 transition-all duration-300"
            >
              {/* Large decorative quote */}
              <div
                className="absolute top-5 right-6 font-[family-name:var(--font-cormorant)] text-[6rem] leading-none text-[#C9A345]/8 select-none pointer-events-none"
                aria-hidden="true"
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C9A345] text-[#C9A345]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/80 text-sm leading-relaxed mb-6 font-[family-name:var(--font-sans)] italic">
                &ldquo;{item.reviewText}&rdquo;
              </p>

              {/* Author footer */}
              <div className="flex items-center justify-between pt-5 border-t border-white/8">
                <div className="flex items-center gap-3">
                  {/* Initials avatar */}
                  <div className="w-9 h-9 rounded-full bg-[#6B1C23] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold font-[family-name:var(--font-playfair)]">
                      {getInitials(item.reviewerName)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">{item.reviewerName}</p>
                    {item.location && (
                      <p className="text-xs text-[#A89588]">{item.location}</p>
                    )}
                  </div>
                </div>
                <span className="text-xs bg-[#6B1C23]/25 border border-[#6B1C23]/30 text-[#E8A0A8] px-2.5 py-1 rounded-full font-medium">
                  {loanTypeLabels[item.loanType] || item.loanType}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-[#C9A345] font-semibold text-sm hover:text-[#E8C97A] transition-colors"
          >
            Read More Stories →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
