"use client";

import Link from "next/link";
import { Home, Shield, Flag, Leaf, DollarSign, RefreshCw, Star, ArrowRight } from "lucide-react";
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
    <section className="py-24 bg-[#F8F6F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-[#6B1C23] text-sm font-semibold uppercase tracking-widest mb-3">
            Loan Programs
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4 font-[family-name:var(--font-playfair)]">
            Find the Right Loan for You
          </h2>
          <p className="text-lg text-[#6B6056] max-w-2xl mx-auto">
            We offer a full suite of mortgage products to match your financial
            situation, goals, and timeline.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {displayPrograms.map((program, idx) => {
            const Icon = program.icon;
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
              >
                <Link
                  href={`/loan-programs/${program.slug}`}
                  className="group block bg-white rounded-xl p-6 border border-[#E8E0D8] hover:border-[#6B1C23] hover:shadow-lg transition-all duration-300 h-full"
                >
                  {/* Icon */}
                  <div className="w-11 h-11 bg-[#F8F6F3] group-hover:bg-[#6B1C23] rounded-lg flex items-center justify-center mb-4 transition-colors">
                    <Icon className="w-5 h-5 text-[#6B1C23] group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="font-bold text-[#1A1A1A] mb-1 group-hover:text-[#6B1C23] transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-xs text-[#C9A345] font-semibold mb-2">
                    {program.tagline}
                  </p>
                  <p className="text-sm text-[#6B6056] leading-relaxed mb-4 line-clamp-2">
                    {program.description}
                  </p>

                  {/* Down payment badge */}
                  {program.minDownPayment && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-[#F0EBE3] text-[#6B1C23] px-2.5 py-1 rounded-full font-medium">
                        Down: {program.minDownPayment}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#6B1C23] transition-colors" />
                    </div>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-10">
          <Link
            href="/loan-programs"
            className="inline-flex items-center gap-2 text-[#6B1C23] font-semibold hover:underline"
          >
            View All Programs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
