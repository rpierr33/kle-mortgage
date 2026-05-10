"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { testimonials } from "@/lib/db/schema";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Testimonial = typeof testimonials.$inferSelect;

const fallbackTestimonials = [
  {
    id: 1, reviewerName: "Marcus & Tanya Williams", rating: 5, location: "Miami, FL",
    loanType: "fha" as const, verified: true, isFeatured: true, displayOrder: 0,
    reviewerAvatarUrl: null,
    reviewText: "KLE made our first home purchase stress-free. Our loan officer explained everything clearly and we closed in 28 days. Highly recommend!",
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 2, reviewerName: "Robert Johnson", rating: 5, location: "Hollywood, FL",
    loanType: "va" as const, verified: true, isFeatured: true, displayOrder: 1,
    reviewerAvatarUrl: null,
    reviewText: "As a veteran, I was grateful for the VA loan expertise at KLE. They knew exactly what I was entitled to and got me into my home with zero down.",
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 3, reviewerName: "Priya Patel", rating: 5, location: "Coral Gables, FL",
    loanType: "conventional" as const, verified: true, isFeatured: true, displayOrder: 2,
    reviewerAvatarUrl: null,
    reviewText: "I refinanced my home through KLE and saved $420/month. The process was seamless and my loan officer was always available to answer my questions.",
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 4, reviewerName: "David & Sarah Chen", rating: 5, location: "Aventura, FL",
    loanType: "conventional" as const, verified: true, isFeatured: true, displayOrder: 3,
    reviewerAvatarUrl: null,
    reviewText: "We tried two other lenders before KLE — nobody could get our deal done. KLE found a program that worked perfectly for our situation.",
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 5, reviewerName: "Tamika Brooks", rating: 5, location: "Hialeah, FL",
    loanType: "fha" as const, verified: true, isFeatured: true, displayOrder: 4,
    reviewerAvatarUrl: null,
    reviewText: "As a single mom, I never thought homeownership was possible. KLE helped me qualify for a first-time buyer program and the whole team celebrated with me at closing!",
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 6, reviewerName: "Kevin & Angela Moore", rating: 5, location: "Doral, FL",
    loanType: "usda" as const, verified: true, isFeatured: true, displayOrder: 5,
    reviewerAvatarUrl: null,
    reviewText: "We used USDA and got into our dream home in a great school district for 0% down. KLE walked us through every step. Cannot say enough good things.",
    createdAt: new Date(), updatedAt: new Date(),
  },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

interface Props {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials: data }: Props) {
  const t = useTranslations("Testimonials");
  const tLabels = useTranslations("Testimonials.loanTypeLabels");
  const tFallback = useTranslations("Testimonials.fallback");
  const locale = useLocale();
  // Recipe invariant: on non-English locales, prefer the catalog over DB
  // (DB content is English-only). Fallback fixtures are also keyed in catalog.
  const useCatalogContent = locale !== "en";
  const displayData = useCatalogContent || data.length === 0 ? fallbackTestimonials : data;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };

  const prev = () => go(current === 0 ? displayData.length - 1 : current - 1);
  const next = () => go(current === displayData.length - 1 ? 0 : current + 1);

  const item = displayData[current];

  // On non-English locales, use translated fallback reviewText (keyed by id 1-6).
  // On English with DB data, use the DB row's reviewText as authored.
  const localizedReviewText = useCatalogContent || data.length === 0
    ? (() => {
        try {
          return tFallback(String(item.id) as Parameters<typeof tFallback>[0]);
        } catch {
          return item.reviewText;
        }
      })()
    : item.reviewText;

  const variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 32 : -32,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -32 : 32,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  const loanTypeLabel = (type: string) => {
    try {
      return tLabels(type as Parameters<typeof tLabels>[0]);
    } catch {
      return type;
    }
  };

  return (
    <section className="py-28 bg-[#0F0A0B] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1C1014] via-[#0F0A0B] to-[#0D0608]" />

      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A345]/4 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {t("kicker")}
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#C9A345] rounded-full" />
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl font-medium text-white leading-[1.05]">
            {t("headlineLead")}{" "}
            <span className="text-[#C9A345] italic">{t("headlineAccent")}</span>
          </h2>
        </motion.div>

        <div className="relative min-h-[320px] sm:min-h-[260px] flex flex-col items-center justify-center">
          <div
            className="absolute -top-6 left-0 sm:left-8 font-[family-name:var(--font-cormorant)] text-[10rem] leading-none text-[#C9A345]/10 select-none pointer-events-none"
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={item.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full text-center px-4 sm:px-12"
            >
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C9A345] text-[#C9A345]" />
                ))}
              </div>

              <blockquote className="font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl lg:text-4xl font-medium italic text-white leading-[1.3] mb-10">
                &ldquo;{localizedReviewText}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#6B1C23] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold font-[family-name:var(--font-cormorant)]">
                      {getInitials(item.reviewerName)}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm text-white">{item.reviewerName}</p>
                    {item.location && (
                      <p className="text-xs text-[#A89588]">{item.location}</p>
                    )}
                  </div>
                </div>
                <span className="text-xs bg-[#6B1C23]/25 border border-[#6B1C23]/30 text-[#E8A0A8] px-3 py-1 rounded-full font-medium mt-1">
                  {loanTypeLabel(item.loanType)}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            aria-label={t("prevAria")}
            className="w-11 h-11 rounded-full border border-white/15 hover:border-[#C9A345]/50 text-white/40 hover:text-[#C9A345] flex items-center justify-center transition-all duration-200 hover:bg-[#C9A345]/5"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2.5">
            {displayData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => go(idx)}
                aria-label={t("dotAria", { num: idx + 1 })}
                className={`rounded-full transition-all duration-300 ${
                  idx === current
                    ? "w-6 h-1.5 bg-[#C9A345]"
                    : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label={t("nextAria")}
            className="w-11 h-11 rounded-full border border-white/15 hover:border-[#C9A345]/50 text-white/40 hover:text-[#C9A345] flex items-center justify-center transition-all duration-200 hover:bg-[#C9A345]/5"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-[#C9A345] font-semibold text-sm hover:text-[#E8C97A] transition-colors"
          >
            {t("ctaMore")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
