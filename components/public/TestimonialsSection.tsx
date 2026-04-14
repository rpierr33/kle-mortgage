"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
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

interface Props {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials: data }: Props) {
  const displayData = data.length > 0 ? data : fallbackTestimonials;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-[#6B1C23] text-sm font-semibold uppercase tracking-widest mb-3">
            Client Stories
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4 font-[family-name:var(--font-playfair)]">
            Real Families. Real Results.
          </h2>
          <p className="text-lg text-[#6B6056] max-w-xl mx-auto">
            Don't take our word for it — here's what our clients say about
            working with KLE Mortgage.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="bg-[#F8F6F3] rounded-xl p-6 border border-[#E8E0D8] relative"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-[#6B1C23]/10 absolute top-5 right-5" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A345] text-[#C9A345]" />
                ))}
              </div>

              {/* Text */}
              <p className="text-[#1A1A1A] text-sm leading-relaxed mb-5 italic">
                &ldquo;{item.reviewText}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm text-[#1A1A1A]">{item.reviewerName}</p>
                  {item.location && (
                    <p className="text-xs text-[#6B6056]">{item.location}</p>
                  )}
                </div>
                <span className="text-xs bg-[#6B1C23]/10 text-[#6B1C23] px-2.5 py-1 rounded-full font-medium">
                  {loanTypeLabels[item.loanType] || item.loanType}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-[#6B1C23] font-semibold hover:underline"
          >
            Read More Stories →
          </Link>
        </div>
      </div>
    </section>
  );
}
