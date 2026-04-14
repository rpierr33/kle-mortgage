import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";

const programData: Record<string, {
  name: string; tagline: string; description: string; longDescription: string;
  features: string[]; requirements: string[]; bestFor: string[];
  minDown: string | null; minCredit: number; maxLoan?: string;
}> = {
  conventional: {
    name: "Conventional Loans",
    tagline: "The most popular loan type for qualified buyers",
    description: "Conventional mortgages are the most common loan type in America. Not government-backed, they offer flexibility and competitive rates.",
    longDescription: "Conventional loans are mortgage loans that are not insured or guaranteed by a government agency such as the FHA, VA, or USDA. They come in two varieties: conforming (meeting Fannie Mae/Freddie Mac guidelines) and non-conforming (jumbo). Conventional loans typically require stronger credit and down payments, but offer lower overall costs for well-qualified buyers.",
    features: ["Competitive interest rates", "3% minimum down payment", "No upfront mortgage insurance", "PMI removable at 20% equity", "Flexible property types", "Multiple term options (10–30 years)"],
    requirements: ["Credit score 620+", "Debt-to-income ratio ≤45%", "2 years employment history", "Proof of income and assets", "Property appraisal required"],
    bestFor: ["Buyers with 620+ credit", "Those with 3–20% down", "Investment property buyers", "Move-up buyers"],
    minDown: "3%", minCredit: 620, maxLoan: "$766,550 (conforming)",
  },
  fha: {
    name: "FHA Loans",
    tagline: "Flexible financing for buyers with less-than-perfect credit",
    description: "FHA loans are backed by the Federal Housing Administration and are ideal for first-time buyers or those rebuilding credit.",
    longDescription: "Federal Housing Administration (FHA) loans are government-backed mortgages designed to help more Americans achieve homeownership. They have more lenient credit requirements and allow lower down payments, making them an excellent option for first-time buyers, those with challenged credit history, or buyers with limited savings.",
    features: ["3.5% down payment (580+ credit)", "10% down (500–579 credit)", "Gift funds allowed for down payment", "Higher DTI ratios accepted", "Flexible credit guidelines", "Non-occupant co-borrowers allowed"],
    requirements: ["Credit score 580+ (for 3.5% down)", "2 years employment history", "Primary residence only", "Property must meet FHA standards", "MIP required for life of loan (if <10% down)"],
    bestFor: ["First-time homebuyers", "Buyers with 580–620 credit", "Limited savings for down payment", "Rebuilding credit history"],
    minDown: "3.5%", minCredit: 580, maxLoan: "Varies by county",
  },
  va: {
    name: "VA Loans",
    tagline: "A well-earned benefit for those who served",
    description: "VA loans are an earned benefit for veterans and active-duty service members — with no down payment and no PMI.",
    longDescription: "VA home loans are a benefit provided by the U.S. Department of Veterans Affairs to eligible veterans, active-duty service members, and surviving spouses. They offer some of the most favorable terms available, including no down payment, no private mortgage insurance, and competitive interest rates. The VA loan benefit can be used multiple times throughout your lifetime.",
    features: ["0% down payment required", "No private mortgage insurance", "Competitive interest rates", "Closing cost limits protected", "No prepayment penalties", "Lifetime reusable benefit"],
    requirements: ["Eligible veteran, active-duty, or surviving spouse", "Certificate of Eligibility (COE)", "Minimum service requirements", "Primary residence only", "VA appraisal required"],
    bestFor: ["Veterans", "Active-duty service members", "Eligible surviving spouses", "National Guard / Reserve members"],
    minDown: "0%", minCredit: 580,
  },
  usda: {
    name: "USDA Loans",
    tagline: "100% financing for eligible rural areas",
    description: "USDA loans provide zero down payment financing for eligible rural and suburban homebuyers who meet income requirements.",
    longDescription: "USDA home loans are backed by the U.S. Department of Agriculture and are designed to promote homeownership in rural and select suburban areas. They offer 100% financing with no down payment required, making them one of the most affordable loan options available to qualifying borrowers.",
    features: ["0% down payment", "Low annual mortgage insurance fee", "Competitive fixed rates", "Flexible credit guidelines", "Seller can pay closing costs", "Owner-occupied only"],
    requirements: ["Property in USDA-eligible area", "Income within 115% of area median", "Stable 2-year employment history", "Must be primary residence", "Property size/use restrictions apply"],
    bestFor: ["Buyers in rural/suburban areas", "Low-to-moderate income households", "Those with limited down payment savings", "Buyers in USDA-designated zones"],
    minDown: "0%", minCredit: 640,
  },
  jumbo: {
    name: "Jumbo Loans",
    tagline: "Premium financing for higher-value properties",
    description: "Jumbo loans exceed conforming loan limits and are ideal for buyers purchasing luxury or high-cost area properties.",
    longDescription: "Jumbo mortgage loans exceed the conforming loan limits set by Fannie Mae and Freddie Mac ($766,550 in most areas). They are used to finance luxury properties or homes in high-cost markets. Despite being non-conforming, KLE Mortgage offers competitive jumbo rates with a variety of term options.",
    features: ["Loan amounts from $766,551+", "Fixed and adjustable rates", "Interest-only options available", "Multiple property types", "Primary, vacation, and investment", "Competitive rates for strong profiles"],
    requirements: ["Credit score 700+ (720+ recommended)", "12–24 months cash reserves", "DTI ≤43%", "Two property appraisals may be required", "Strong income documentation"],
    bestFor: ["Luxury home buyers", "High-income earners", "Properties in expensive markets", "Buyers with significant assets"],
    minDown: "10%", minCredit: 680, maxLoan: "No standard maximum",
  },
  refinance: {
    name: "Refinancing",
    tagline: "Lower your rate, access equity, or change terms",
    description: "Refinancing replaces your existing mortgage with a new one, potentially saving money or unlocking your home's equity.",
    longDescription: "Refinancing your mortgage can accomplish several goals: lower your interest rate, reduce your monthly payment, shorten your loan term, switch from an ARM to a fixed rate, or access your home's equity through a cash-out refinance. KLE Mortgage will analyze your current mortgage and goals to determine if refinancing makes financial sense for you.",
    features: ["Rate-and-term refinancing", "Cash-out refinancing", "FHA Streamline refinance", "VA IRRRL (Interest Rate Reduction)", "Lower monthly payments", "Access home equity"],
    requirements: ["Existing mortgage in good standing", "Sufficient home equity (typically 5–20%)", "Income verification", "Credit score 580–640+ (varies by type)", "Home appraisal (usually required)"],
    bestFor: ["Rates dropped since original loan", "Improved credit score", "Need access to home equity", "Want to shorten loan term"],
    minDown: null, minCredit: 620,
  },
  "first-time-buyer": {
    name: "First-Time Buyer Programs",
    tagline: "Special programs and guidance for new homebuyers",
    description: "First-time buyer programs combine favorable loan terms with down payment assistance and dedicated education to help you succeed.",
    longDescription: "Buying your first home is one of life's biggest milestones — and it can feel overwhelming. KLE Mortgage's first-time buyer specialists combine low down payment loan programs with available down payment assistance grants, homebuyer education, and one-on-one guidance to make the process clear and manageable. Many first-time buyers are surprised by how much they can qualify for.",
    features: ["Down payment assistance available", "Closing cost assistance programs", "Homebuyer education resources", "Multiple loan type options", "Special rate incentives in some areas", "Dedicated first-time buyer specialists"],
    requirements: ["Generally: no homeownership in past 3 years", "Income limits may apply for assistance", "Homebuyer education may be required", "Primary residence only", "Varies by specific program"],
    bestFor: ["Never purchased a home before", "Haven't owned in 3+ years", "Limited down payment savings", "Want structured guidance"],
    minDown: "3%", minCredit: 580,
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = programData[slug];
  if (!program) return { title: "Loan Program Not Found" };
  return {
    title: program.name,
    description: program.description,
  };
}

export default async function LoanProgramDetailPage({ params }: Props) {
  const { slug } = await params;
  const program = programData[slug];
  if (!program) notFound();

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-[#6B1C23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/loan-programs" className="hover:text-white transition-colors">
              Loan Programs
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{program.name}</span>
          </nav>
          <div className="max-w-2xl">
            <span className="inline-block text-[#C9A345] text-sm font-semibold uppercase tracking-widest mb-3">
              Loan Program
            </span>
            <h1 className="text-5xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
              {program.name}
            </h1>
            <p className="text-xl text-white/80">{program.tagline}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl border border-[#E8E0D8] p-8">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4 font-[family-name:var(--font-playfair)]">
                  What is a {program.name}?
                </h2>
                <p className="text-[#6B6056] leading-relaxed">{program.longDescription}</p>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E0D8] p-8">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-5 font-[family-name:var(--font-playfair)]">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {program.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[#1A1A1A]">
                      <CheckCircle2 className="w-5 h-5 text-[#6B1C23] flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E0D8] p-8">
                <h2 className="text-2xl font-bold text-[#1A1A1A] mb-5 font-[family-name:var(--font-playfair)]">
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {program.requirements.map((r) => (
                    <li key={r} className="flex items-center gap-3 text-[#6B6056] text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6B1C23] flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Quick Stats */}
              <div className="bg-[#6B1C23] text-white rounded-xl p-6">
                <h3 className="font-bold mb-4 font-[family-name:var(--font-playfair)]">At a Glance</h3>
                <div className="space-y-3">
                  {program.minDown && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Min. Down Payment</span>
                      <span className="font-bold text-[#C9A345]">{program.minDown}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">Min. Credit Score</span>
                    <span className="font-bold text-[#C9A345]">{program.minCredit}</span>
                  </div>
                  {program.maxLoan && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/70">Loan Limit</span>
                      <span className="font-bold text-[#C9A345]">{program.maxLoan}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Best For */}
              <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
                <h3 className="font-bold text-[#1A1A1A] mb-4 font-[family-name:var(--font-playfair)]">
                  Best For
                </h3>
                <ul className="space-y-2">
                  {program.bestFor.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-[#6B6056]">
                      <CheckCircle2 className="w-4 h-4 text-[#6B1C23] flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Card */}
              <div className="bg-[#F8F6F3] border border-[#E8E0D8] rounded-xl p-6">
                <h3 className="font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-playfair)]">
                  Ready to Apply?
                </h3>
                <p className="text-sm text-[#6B6056] mb-4">
                  Get pre-approved in as little as 24 hours. No obligation.
                </p>
                <Link
                  href="/apply"
                  className="flex items-center justify-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-5 py-3 rounded-md text-sm font-semibold transition-colors w-full"
                >
                  Start Application <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+14045551234"
                  className="flex items-center justify-center gap-2 mt-3 text-sm text-[#6B1C23] hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  Call (404) 555-1234
                </a>
              </div>

              {/* Other Programs */}
              <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
                <h3 className="font-bold text-[#1A1A1A] mb-3 font-[family-name:var(--font-playfair)]">
                  Other Programs
                </h3>
                <ul className="space-y-1.5">
                  {Object.entries(programData)
                    .filter(([s]) => s !== slug)
                    .slice(0, 5)
                    .map(([s, p]) => (
                      <li key={s}>
                        <Link
                          href={`/loan-programs/${s}`}
                          className="text-sm text-[#6B6056] hover:text-[#6B1C23] transition-colors"
                        >
                          → {p.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
