"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle2 } from "lucide-react";

interface Testimonial {
  id: number;
  reviewerName: string;
  rating: number;
  location: string | null;
  loanType: string;
  verified: boolean;
  reviewText: string;
}

interface Props {
  testimonials: Testimonial[];
  loanTypeLabels: Record<string, string>;
}

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function TestimonialsClient({ testimonials, loanTypeLabels }: Props) {
  const avgRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 bg-[#6B1C23] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#C9A345]/70 rounded-full" />
              <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                Real Stories
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#C9A345]/70 rounded-full" />
            </div>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-semibold text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Client{" "}
              <span className="text-[#C9A345] italic">Testimonials</span>
            </h1>
            <p className="text-lg text-white/75 mb-6">
              Real stories from families we&apos;ve helped achieve homeownership.
            </p>
            {/* Rating display */}
            <div className="inline-flex items-center gap-3 bg-white/8 border border-white/15 rounded-full px-6 py-2.5 backdrop-blur-sm">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-[#C9A345] text-[#C9A345]" />
                ))}
              </div>
              <span className="text-white font-bold text-sm">{avgRating.toFixed(1)}/5</span>
              <span className="text-white/50 text-sm">({testimonials.length} reviews)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-28 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((item) => (
              <motion.div
                key={item.id}
                variants={cardVariant}
                className="group bg-white rounded-2xl border border-[#E8E0D8] p-7 hover:border-[#C9A345]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C9A345] text-[#C9A345]" />
                  ))}
                </div>

                {/* Quote mark */}
                <div
                  className="font-[family-name:var(--font-cormorant)] text-5xl text-[#6B1C23]/15 leading-none mb-2 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                <p className="text-[#1A1A1A] text-sm leading-relaxed mb-5 italic">
                  {item.reviewText}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8E0D8]">
                  <div>
                    <p className="font-semibold text-sm text-[#1A1A1A]">{item.reviewerName}</p>
                    {item.location && (
                      <p className="text-xs text-[#6B6056] mt-0.5">{item.location}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs bg-[#F8F6F3] border border-[#E8E0D8] text-[#6B1C23] px-2.5 py-1 rounded-full font-medium">
                      {loanTypeLabels[item.loanType] || item.loanType}
                    </span>
                    {item.verified && (
                      <span className="flex items-center gap-1 text-xs text-[#6B6056]">
                        <CheckCircle2 className="w-3 h-3 text-green-500" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
