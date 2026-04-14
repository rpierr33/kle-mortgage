import type { Metadata } from "next";
import Link from "next/link";
import { Home, Shield, Flag, Leaf, DollarSign, RefreshCw, Star, ArrowRight, CheckCircle2 } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "Loan Programs",
  description: "Explore KLE Mortgage's full range of home loan programs — conventional, FHA, VA, USDA, jumbo, refinance, and first-time buyer options.",
};

const programs = [
  {
    slug: "conventional",
    name: "Conventional Loans",
    icon: Home,
    tagline: "The most popular loan type for qualified buyers",
    description: "Conventional mortgages are not backed by a government agency. They offer competitive interest rates and flexible terms for buyers with good credit and stable income.",
    features: ["Competitive interest rates", "3% minimum down payment", "No upfront mortgage insurance", "Loan amounts up to $766,550 (conforming)", "15, 20, and 30-year terms available"],
    minDown: "3%",
    minCredit: 620,
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    slug: "fha",
    name: "FHA Loans",
    icon: Shield,
    tagline: "Flexible financing for buyers with less-than-perfect credit",
    description: "FHA loans are backed by the Federal Housing Administration, making them easier to qualify for with lower credit scores and smaller down payments.",
    features: ["As low as 3.5% down payment", "Credit scores from 580", "Gift funds accepted for down payment", "Higher debt-to-income ratios allowed", "Great for first-time buyers"],
    minDown: "3.5%",
    minCredit: 580,
    color: "bg-green-50 border-green-100",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    slug: "va",
    name: "VA Loans",
    icon: Flag,
    tagline: "A well-earned benefit for those who served",
    description: "VA loans are available to veterans, active-duty service members, and eligible surviving spouses — with no down payment required and no monthly PMI.",
    features: ["0% down payment required", "No private mortgage insurance (PMI)", "Competitive interest rates", "No prepayment penalties", "Lifetime benefit — use multiple times"],
    minDown: "0%",
    minCredit: 580,
    color: "bg-red-50 border-red-100",
    iconBg: "bg-red-100",
    iconColor: "text-red-700",
  },
  {
    slug: "usda",
    name: "USDA Loans",
    icon: Leaf,
    tagline: "100% financing for eligible rural areas",
    description: "USDA loans are backed by the U.S. Department of Agriculture for eligible rural and suburban homebuyers who meet income and property location requirements.",
    features: ["0% down payment", "Low mortgage insurance rates", "Flexible credit guidelines", "Rural and eligible suburban areas", "Income limits apply"],
    minDown: "0%",
    minCredit: 640,
    color: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    slug: "jumbo",
    name: "Jumbo Loans",
    icon: DollarSign,
    tagline: "Premium financing for higher-value properties",
    description: "Jumbo loans exceed conforming loan limits and are ideal for buyers purchasing luxury or high-cost area properties. We offer competitive rates and flexible terms.",
    features: ["Loan amounts above $766,550", "Competitive rates for strong borrowers", "15 and 30-year fixed options", "ARM programs available", "Excellent for high-income earners"],
    minDown: "10%",
    minCredit: 680,
    color: "bg-amber-50 border-amber-100",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    slug: "refinance",
    name: "Refinancing",
    icon: RefreshCw,
    tagline: "Lower your rate, access equity, or change terms",
    description: "Refinancing your existing mortgage can lower your monthly payment, reduce your interest rate, shorten your loan term, or give you access to your home's equity.",
    features: ["Rate-and-term refinancing", "Cash-out refinancing", "Streamline refinance options (FHA/VA)", "Debt consolidation", "Home improvement funding"],
    minDown: null,
    minCredit: 620,
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    slug: "first-time-buyer",
    name: "First-Time Buyer",
    icon: Star,
    tagline: "Special programs for new homebuyers",
    description: "First-time homebuyer programs combine low down payment loans with down payment assistance, education, and dedicated guidance to make your first purchase a success.",
    features: ["Down payment assistance programs", "Closing cost help available", "Homebuyer education included", "Multiple loan types combined", "Special rate incentives"],
    minDown: "3%",
    minCredit: 580,
    color: "bg-pink-50 border-pink-100",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-700",
  },
];

export default function LoanProgramsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#6B1C23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block text-[#C9A345] text-sm font-semibold uppercase tracking-widest mb-3">
              Our Programs
            </span>
            <h1 className="text-5xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
              Loan Programs
            </h1>
            <p className="text-xl text-white/80">
              Whatever your situation, we have a loan program designed for you.
              Compare options and find your perfect fit.
            </p>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programs.map((program) => {
              const Icon = program.icon;
              return (
                <div
                  key={program.slug}
                  className={`bg-white rounded-xl border ${program.color} p-7 hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className={`w-11 h-11 ${program.iconBg} rounded-lg flex items-center justify-center mb-3`}>
                        <Icon className={`w-5 h-5 ${program.iconColor}`} />
                      </div>
                      <h2 className="text-xl font-bold text-[#1A1A1A] font-[family-name:var(--font-playfair)]">
                        {program.name}
                      </h2>
                      <p className="text-sm text-[#6B6056] mt-0.5">{program.tagline}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {program.minDown && (
                        <div className="bg-[#F8F6F3] rounded-lg px-3 py-1 text-center">
                          <p className="text-xs text-[#6B6056]">Min Down</p>
                          <p className="font-bold text-[#6B1C23]">{program.minDown}</p>
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

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <p className="text-xs text-[#6B6056]">
                      Min credit: <span className="font-semibold text-[#1A1A1A]">{program.minCredit}</span>
                    </p>
                    <Link
                      href={`/loan-programs/${program.slug}`}
                      className="flex items-center gap-1.5 text-sm text-[#6B1C23] font-semibold hover:underline"
                    >
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
