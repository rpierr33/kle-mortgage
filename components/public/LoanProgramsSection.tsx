"use client";

import Link from "next/link";
import { Home, Shield, Flag, Leaf, DollarSign, RefreshCw, Star, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { loanPrograms } from "@/lib/db/schema";

type LoanProgram = typeof loanPrograms.$inferSelect;

const fallbackPrograms = [
  {
    id: 1, slug: "conventional", name: "Conventional Loans", type: "conventional" as const,
    tagline: "Flexible financing for qualified buyers", icon: Home,
    description: "Traditional mortgage financing with competitive rates for buyers with good credit and solid down payment.",
    minDownPayment: "3%", minCreditScore: 620,
  },
  {
    id: 2, slug: "fha", name: "FHA Loans", type: "fha" as const,
    tagline: "Low down payment, flexible requirements", icon: Shield,
    description: "Government-backed loans perfect for first-time buyers or those with less-than-perfect credit.",
    minDownPayment: "3.5%", minCreditScore: 580,
  },
  {
    id: 3, slug: "va", name: "VA Loans", type: "va" as const,
    tagline: "Earned benefit for those who served", icon: Flag,
    description: "Zero down payment loans exclusively for veterans, active-duty service members, and eligible surviving spouses.",
    minDownPayment: "0%", minCreditScore: 580,
  },
  {
    id: 4, slug: "usda", name: "USDA Loans", type: "usda" as const,
    tagline: "Rural homeownership made affordable", icon: Leaf,
    description: "100% financing for eligible rural and suburban homebuyers who meet income requirements.",
    minDownPayment: "0%", minCreditScore: 640,
  },
  {
    id: 5, slug: "jumbo", name: "Jumbo Loans", type: "jumbo" as const,
    tagline: "Financing for higher-value properties", icon: DollarSign,
    description: "Loans exceeding conventional loan limits for luxury and high-cost area properties.",
    minDownPayment: "10%", minCreditScore: 680,
  },
  {
    id: 6, slug: "refinance", name: "Refinancing", type: "refinance" as const,
    tagline: "Lower your rate or access equity", icon: RefreshCw,
    description: "Rate-and-term or cash-out refinancing to improve your current mortgage terms.",
    minDownPayment: null, minCreditScore: 620,
  },
  {
    id: 7, slug: "first-time-buyer", name: "First-Time Buyer", type: "first_time_buyer" as const,
    tagline: "Guidance every step of the way", icon: Star,
    description: "Special programs with down payment assistance, education, and dedicated support for first-time homebuyers.",
    minDownPayment: "3%", minCreditScore: 580,
  },
];

const iconMap: Record<string, React.ElementType> = {
  conventional: Home,
  fha: Shield,
  va: Flag,
  usda: Leaf,
  jumbo: DollarSign,
  refinance: RefreshCw,
  first_time_buyer: Star,
};

interface Props {
  programs: LoanProgram[];
}

export function LoanProgramsSection({ programs }: Props) {
  const displayPrograms = programs.length > 0
    ? programs.map((p) => ({ ...p, icon: iconMap[p.type] || Home }))
    : fallbackPrograms;

  return (
    <section className="py-28 bg-[#F8F6F3] relative overflow-hidden">
      {/* Subtle background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 items-start">
          {/* Left: Header — sticky context */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
              <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                Loan Programs
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl font-medium text-[#1A1A1A] leading-[1.05] mb-5">
              Find the Right Loan
              <br />
              <span className="text-[#6B1C23] italic">for You</span>
            </h2>
            <p className="text-sm text-[#6B6056] leading-relaxed mb-8 max-w-xs">
              A full suite of mortgage products to match your situation, goals, and timeline.
            </p>

            <Link
              href="/loan-programs"
              className="group inline-flex items-center gap-2 text-[#6B1C23] font-semibold text-sm hover:gap-3 transition-all duration-200"
            >
              View All Programs
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:scale-110" />
            </Link>
          </motion.div>

          {/* Right: Editorial list */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            {displayPrograms.map((program, idx) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={`/loan-programs/${program.slug}`}
                    className="group flex items-center justify-between gap-6 py-7 cursor-pointer"
                    aria-label={`Learn about ${program.name}`}
                  >
                    <div className="flex items-start gap-5 flex-1 min-w-0">
                      {/* Icon — minimal */}
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#E8E0D8] group-hover:border-[#6B1C23]/25 group-hover:bg-[#6B1C23]/5 flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-0.5">
                        <Icon className="w-4.5 h-4.5 text-[#6B1C23]" style={{ width: "1.1rem", height: "1.1rem" }} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[#1A1A1A] group-hover:text-[#6B1C23] transition-colors leading-tight">
                            {program.name}
                          </h3>
                          {program.minDownPayment && (
                            <span className="text-xs text-[#C9A345] font-semibold tracking-wide flex-shrink-0">
                              {program.minDownPayment} down
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#6B6056] mt-1 leading-relaxed">
                          {program.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowUpRight className="w-4 h-4 text-[#E8E0D8] group-hover:text-[#C9A345] transition-all duration-300 group-hover:scale-110 flex-shrink-0" />
                  </Link>

                  {/* Gold divider between items — not after last */}
                  {idx < displayPrograms.length - 1 && (
                    <div className="h-px bg-gradient-to-r from-[#E8E0D8] via-[#C9A345]/20 to-[#E8E0D8]" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
