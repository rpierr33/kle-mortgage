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

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
            <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
              Loan Programs
            </span>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1A1A1A] leading-tight mb-4">
            Find the Right Loan
            <br />
            <span className="text-[#6B1C23] italic">for You</span>
          </h2>
          <p className="text-base text-[#6B6056] max-w-xl leading-relaxed">
            We offer a full suite of mortgage products to match your financial
            situation, goals, and timeline.
          </p>
        </motion.div>

        {/* Programs Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {displayPrograms.map((program) => {
            const Icon = program.icon;
            return (
              <motion.div key={program.id} variants={cardVariants}>
                <Link
                  href={`/loan-programs/${program.slug}`}
                  className="group block bg-white rounded-2xl p-6 border border-[#E8E0D8] hover:border-[#C9A345]/40 hover:shadow-[0_8px_40px_rgba(107,28,35,0.1)] transition-all duration-300 h-full relative overflow-hidden"
                >
                  {/* Hover gradient fill */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6B1C23]/0 to-[#6B1C23]/0 group-hover:from-[#6B1C23]/[0.02] group-hover:to-[#C9A345]/[0.04] transition-all duration-500 rounded-2xl" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-[#F8F6F3] group-hover:bg-[#6B1C23] rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-[0_4px_16px_rgba(107,28,35,0.3)]">
                      <Icon className="w-5 h-5 text-[#6B1C23] group-hover:text-white transition-colors duration-300" />
                    </div>

                    <h3 className="font-semibold text-[#1A1A1A] mb-1 text-base group-hover:text-[#6B1C23] transition-colors font-[family-name:var(--font-playfair)]">
                      {program.name}
                    </h3>
                    <p className="text-xs text-[#C9A345] font-semibold mb-3 tracking-wide">
                      {program.tagline}
                    </p>
                    <p className="text-sm text-[#6B6056] leading-relaxed mb-5 line-clamp-2">
                      {program.description}
                    </p>

                    {/* Footer row */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#E8E0D8]">
                      {program.minDownPayment ? (
                        <span className="text-xs bg-[#F8F6F3] group-hover:bg-[#6B1C23]/8 text-[#6B1C23] px-2.5 py-1 rounded-full font-medium transition-colors">
                          {program.minDownPayment} down
                        </span>
                      ) : (
                        <span className="text-xs text-[#6B6056]">Talk to us</span>
                      )}
                      <ArrowUpRight className="w-4 h-4 text-[#E8E0D8] group-hover:text-[#C9A345] transition-all duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/loan-programs"
            className="group inline-flex items-center gap-2 text-[#6B1C23] font-semibold text-sm hover:gap-3 transition-all duration-200"
          >
            View All Programs
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:scale-110" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
