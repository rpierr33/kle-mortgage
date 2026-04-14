"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Shield, Flag, Leaf, DollarSign, RefreshCw, Star, ArrowRight, CheckCircle2, TrendingDown, Wrench, Key, Percent, Building2, RotateCcw, Sparkles } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";

const programs = [
  { slug: "conventional", name: "Conventional Loans", icon: Home, tagline: "The most popular loan type for qualified buyers", description: "Conventional mortgages are not backed by a government agency. They offer competitive interest rates and flexible terms for buyers with good credit and stable income.", features: ["Competitive interest rates", "3% minimum down payment", "No upfront mortgage insurance", "Loan amounts up to $766,550 (conforming)", "15, 20, and 30-year terms available"], minDown: "3%", minCredit: 620 },
  { slug: "fha", name: "FHA Loans", icon: Shield, tagline: "Flexible financing for buyers with less-than-perfect credit", description: "FHA loans are backed by the Federal Housing Administration, making them easier to qualify for with lower credit scores and smaller down payments.", features: ["As low as 3.5% down payment", "Credit scores from 580", "Gift funds accepted for down payment", "Higher debt-to-income ratios allowed", "Great for first-time buyers"], minDown: "3.5%", minCredit: 580 },
  { slug: "va", name: "VA Loans", icon: Flag, tagline: "A well-earned benefit for those who served", description: "VA loans are available to veterans, active-duty service members, and eligible surviving spouses — with no down payment required and no monthly PMI.", features: ["0% down payment required", "No private mortgage insurance (PMI)", "Competitive interest rates", "No prepayment penalties", "Lifetime benefit — use multiple times"], minDown: "0%", minCredit: 580 },
  { slug: "usda", name: "USDA Loans", icon: Leaf, tagline: "100% financing for eligible rural areas", description: "USDA loans are backed by the U.S. Department of Agriculture for eligible rural and suburban homebuyers who meet income and property location requirements.", features: ["0% down payment", "Low mortgage insurance rates", "Flexible credit guidelines", "Rural and eligible suburban areas", "Income limits apply"], minDown: "0%", minCredit: 640 },
  { slug: "jumbo", name: "Jumbo Loans", icon: DollarSign, tagline: "Premium financing for higher-value properties", description: "Jumbo loans exceed conforming loan limits and are ideal for buyers purchasing luxury or high-cost area properties. We offer competitive rates and flexible terms.", features: ["Loan amounts above $766,550", "Competitive rates for strong borrowers", "15 and 30-year fixed options", "ARM programs available", "Excellent for high-income earners"], minDown: "10%", minCredit: 680 },
  { slug: "refinance", name: "Refinancing", icon: RefreshCw, tagline: "Lower your rate, access equity, or change terms", description: "Refinancing your existing mortgage can lower your monthly payment, reduce your interest rate, shorten your loan term, or give you access to your home's equity.", features: ["Rate-and-term refinancing", "Cash-out refinancing", "Streamline refinance options (FHA/VA)", "Debt consolidation", "Home improvement funding"], minDown: null, minCredit: 620 },
  { slug: "first-time-buyer", name: "First-Time Buyer", icon: Star, tagline: "Special programs for new homebuyers", description: "First-time homebuyer programs combine low down payment loans with down payment assistance, education, and dedicated guidance to make your first purchase a success.", features: ["Down payment assistance programs", "Closing cost help available", "Homebuyer education included", "Multiple loan types combined", "Special rate incentives"], minDown: "3%", minCredit: 580 },
  { slug: "non-qm", name: "Non-QM Loans", icon: Sparkles, tagline: "Flexible underwriting for complex income", description: "Non-Qualified Mortgage loans are designed for borrowers who don't fit traditional qualification criteria — self-employed, investors, or those with unique income documentation.", features: ["Bank statement qualifying", "No tax return needed for self-employed", "Asset depletion programs", "Investor cash flow loans (DSCR)", "Higher loan limits available"], minDown: "10%", minCredit: 620 },
  { slug: "interest-rate-buydown", name: "Interest Rate Buydown", icon: TrendingDown, tagline: "Lower your rate upfront to save long-term", description: "A rate buydown lets you pay discount points at closing to secure a permanently lower interest rate, reducing your monthly payment and total interest paid over the life of the loan.", features: ["Permanent or temporary buydown options", "2-1 and 3-2-1 buydown programs", "Seller-paid buydowns available", "Significant monthly savings", "Ideal in higher rate environments"], minDown: "3%", minCredit: 620 },
  { slug: "203k", name: "FHA 203(k) Rehab Loan", icon: Wrench, tagline: "Buy and renovate with one loan", description: "The FHA 203(k) loan lets you purchase a home and finance the cost of repairs or renovations into a single mortgage — perfect for fixer-uppers and distressed properties.", features: ["Finance purchase + renovation costs together", "Standard and Limited 203(k) options", "HUD-approved contractors required", "Minimum $5,000 in renovations", "Owner-occupied properties only"], minDown: "3.5%", minCredit: 580 },
  { slug: "heloc", name: "HELOC", icon: Key, tagline: "Flexible access to your home equity", description: "A Home Equity Line of Credit (HELOC) gives you a revolving credit line secured by your home's equity — use funds for renovations, education, debt consolidation, or any major expense.", features: ["Draw period then repayment phase", "Interest-only payments during draw", "Variable rate tied to prime", "Revolving credit — reuse as you repay", "Tax-deductible interest (consult CPA)"], minDown: null, minCredit: 640 },
  { slug: "interest-only", name: "Interest-Only Loans", icon: Percent, tagline: "Lower payments during the initial period", description: "Interest-only mortgages allow you to pay only the interest for a set period, keeping your payments lower during the early years of the loan — ideal for certain investment strategies.", features: ["Lower initial monthly payments", "5, 7, or 10-year interest-only periods", "Popular with high-income investors", "Available on jumbo loan amounts", "Transition to P&I after IO period"], minDown: "10%", minCredit: 680 },
  { slug: "fixed-rate", name: "Fixed-Rate Mortgage", icon: Shield, tagline: "Stability and predictability for the long term", description: "A fixed-rate mortgage locks in your interest rate for the life of the loan, giving you consistent monthly payments and protection from market rate increases.", features: ["Rate never changes over loan life", "15, 20, and 30-year options", "Ideal for long-term homeowners", "Protection against rate increases", "Simple to budget and plan around"], minDown: "3%", minCredit: 620 },
  { slug: "arm", name: "Adjustable-Rate Mortgage (ARM)", icon: RefreshCw, tagline: "Lower initial rate with periodic adjustments", description: "ARMs offer a lower fixed rate for an initial period, then adjust periodically based on a market index. A smart choice if you plan to sell or refinance before the adjustment period.", features: ["5/1, 7/1, and 10/1 ARM options", "Lower initial rate than fixed", "Rate caps protect from extreme swings", "Good for shorter-term ownership plans", "Can save thousands in first years"], minDown: "5%", minCredit: 620 },
  { slug: "construction", name: "Construction Loans", icon: Building2, tagline: "Finance your custom-built home", description: "Construction loans provide funding to build a new home from the ground up. Funds are dispersed in stages as construction milestones are completed, then convert to a permanent mortgage.", features: ["Construction-to-permanent in one closing", "Interest-only during build phase", "Draws released at project milestones", "Licensed builder required", "Available for primary and vacation homes"], minDown: "20%", minCredit: 680 },
  { slug: "reverse-mortgage", name: "Reverse Mortgage", icon: RotateCcw, tagline: "Convert equity into tax-free income", description: "A reverse mortgage (HECM) allows homeowners 62+ to convert home equity into tax-free funds while staying in their home — no monthly mortgage payments required.", features: ["No monthly mortgage payments", "Available to homeowners 62+", "FHA-insured HECM program", "Stay in your home as long as you wish", "Proceeds are tax-free (consult CPA)"], minDown: null, minCredit: null },
];

const stagger = { visible: { transition: { staggerChildren: 0.06 } } };
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function LoanProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 bg-[#6B1C23] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
              <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                Our Programs
              </span>
            </div>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-semibold text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Loan{" "}
              <span className="text-[#C9A345] italic">Programs</span>
            </h1>
            <p className="text-lg text-white/75 leading-relaxed">
              Whatever your situation, we have a loan program designed for you.
              Compare options and find your perfect fit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs grid */}
      <section className="py-28 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.slug}
                  variants={cardVariant}
                  className="group bg-white rounded-2xl border border-[#E8E0D8] p-7 hover:border-[#C9A345]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="w-11 h-11 bg-gradient-to-br from-[#6B1C23] to-[#4A1218] rounded-xl flex items-center justify-center mb-3 shadow-[0_4px_12px_rgba(107,28,35,0.2)] group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h2
                        className="font-[family-name:var(--font-cormorant)] font-bold text-[#1A1A1A] leading-tight"
                        style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)" }}
                      >
                        {program.name}
                      </h2>
                      <p className="text-sm text-[#6B6056] mt-0.5">{program.tagline}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {program.minDown && (
                        <div className="bg-[#F8F6F3] border border-[#E8E0D8] rounded-lg px-3 py-1.5 text-center">
                          <p className="text-xs text-[#6B6056]">Min Down</p>
                          <p className="font-bold text-[#6B1C23] text-sm">{program.minDown}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-[#6B6056] leading-relaxed mb-5">
                    {program.description}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                        <CheckCircle2 className="w-4 h-4 text-[#6B1C23] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E8E0D8]">
                    <p className="text-xs text-[#6B6056]">
                      {program.minCredit ? (
                        <>Min credit: <span className="font-semibold text-[#1A1A1A]">{program.minCredit}</span></>
                      ) : (
                        <span className="text-[#C9A345] font-medium">Call for eligibility</span>
                      )}
                    </p>
                    <Link
                      href={`/loan-programs/${program.slug}`}
                      className="flex items-center gap-1.5 text-sm text-[#6B1C23] font-semibold hover:underline"
                    >
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
