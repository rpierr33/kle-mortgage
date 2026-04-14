import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";

const programData: Record<string, {
  name: string; tagline: string; description: string; longDescription: string;
  features: string[]; requirements: string[]; bestFor: string[];
  minDown: string | null; minCredit: number | null; maxLoan?: string;
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
  "non-qm": {
    name: "Non-QM Loans",
    tagline: "Flexible underwriting for complex income",
    description: "Non-Qualified Mortgage loans open the door for borrowers with unique income situations — self-employed, investors, or alternative documentation.",
    longDescription: "Non-QM (Non-Qualified Mortgage) loans are designed for borrowers who don't fit the standard underwriting box. Self-employed individuals, real estate investors, foreign nationals, or those with recent credit events often qualify through alternative documentation such as bank statements, asset depletion, or debt-service coverage ratios (DSCR). KLE Mortgage has deep expertise in structuring Non-QM deals that traditional lenders turn away.",
    features: ["Bank statement income qualifying (12/24 months)", "No tax returns required for self-employed", "Asset depletion programs", "DSCR investor loans", "Foreign national programs", "Recent credit events considered"],
    requirements: ["Alternative income documentation", "Minimum 10–20% down payment", "Credit scores from 580+", "Property appraisal required", "Reserves may be required"],
    bestFor: ["Self-employed business owners", "Real estate investors", "Foreign nationals", "Recent credit event (BK/foreclosure)", "High-net-worth with non-traditional income"],
    minDown: "10%", minCredit: 620,
  },
  "interest-rate-buydown": {
    name: "Interest Rate Buydown",
    tagline: "Pay less upfront to save more long-term",
    description: "A rate buydown reduces your mortgage interest rate by paying discount points at closing, resulting in lower monthly payments throughout the loan.",
    longDescription: "An interest rate buydown is a financing technique where discount points are paid at closing to permanently (or temporarily) lower the mortgage rate. In higher-rate environments, buydowns can make homeownership significantly more affordable. Sellers can also contribute to buydowns as a closing incentive. The 2-1 buydown, for example, reduces the rate by 2% in year one and 1% in year two before settling at the note rate in year three.",
    features: ["Permanent or temporary buydown options", "2-1 and 3-2-1 temporary buydown programs", "Seller-funded buydowns available", "Lower payments during initial ownership years", "Predictable rate after buydown period"],
    requirements: ["Standard qualification requirements", "Buydown amount paid at closing", "Seller concession within program limits", "All standard loan eligibility criteria apply", "Applicable to most loan types"],
    bestFor: ["Buyers wanting lower initial payments", "Sellers seeking to attract buyers", "Buyers in a higher-rate environment", "Those expecting income growth over time"],
    minDown: "3%", minCredit: 620,
  },
  "203k": {
    name: "FHA 203(k) Rehab Loan",
    tagline: "Buy and renovate with one loan",
    description: "The FHA 203(k) loan finances both the purchase price and renovation costs of a home into a single mortgage — making fixer-uppers accessible.",
    longDescription: "The FHA 203(k) loan allows homebuyers to purchase a home that needs repairs or improvements while financing both the purchase and renovation costs in a single mortgage. There are two versions: the Standard 203(k) for major renovations exceeding $35,000, and the Limited 203(k) for smaller projects up to $35,000. This program is ideal for buyers who want to purchase a below-market fixer-upper and build instant equity through improvements.",
    features: ["Finance purchase + renovation in one loan", "Standard 203(k) for major projects ($35k+)", "Limited 203(k) for smaller projects (≤$35k)", "FHA-approved contractor required", "Funds held in escrow, disbursed at milestones", "Can include appliances and landscaping"],
    requirements: ["Minimum $5,000 in eligible renovations", "Owner-occupied primary residence only", "FHA-approved consultant required for Standard", "Licensed, bonded contractor required", "Work must be completed within 6 months"],
    bestFor: ["Buyers targeting fixer-uppers", "Buyers seeking below-market properties", "Those wanting to customize a home", "Buyers with limited cash for separate renovation loans"],
    minDown: "3.5%", minCredit: 580,
  },
  "heloc": {
    name: "HELOC",
    tagline: "Flexible revolving access to your home equity",
    description: "A Home Equity Line of Credit gives you flexible, ongoing access to your home's equity with a variable-rate revolving credit facility.",
    longDescription: "A HELOC (Home Equity Line of Credit) functions like a credit card secured by your home's equity. You're approved for a maximum credit limit and can draw funds as needed during the draw period (typically 5–10 years), paying only interest on what you use. After the draw period ends, you enter the repayment phase and begin paying principal and interest. HELOCs are ideal for ongoing expenses such as home renovations, tuition, or as a financial safety net.",
    features: ["Draw funds anytime during draw period", "Interest-only payments during draw phase", "Variable rate tied to prime index", "Revolving — repay and reuse", "Access via checks, card, or transfer", "Possible tax deduction on interest (consult CPA)"],
    requirements: ["Minimum 15–20% equity in your home", "Credit score 640+", "Stable income verification", "Debt-to-income ratio ≤43%", "Primary or second home only"],
    bestFor: ["Homeowners needing flexible, ongoing access to equity", "Ongoing renovation projects", "Emergency financial reserves", "Education expenses", "Debt consolidation"],
    minDown: null, minCredit: 640,
  },
  "interest-only": {
    name: "Interest-Only Loans",
    tagline: "Lower initial payments with full flexibility",
    description: "Interest-only mortgages let you pay only the interest portion for a set period, freeing up cash flow in the early years of the loan.",
    longDescription: "An interest-only mortgage allows the borrower to pay only interest charges for an initial period — typically 5, 7, or 10 years — after which the loan converts to a fully amortizing payment schedule. This keeps monthly payments lower during the IO period, which can be advantageous for high-income buyers with variable income, investors, or buyers who anticipate selling or refinancing before the IO period ends.",
    features: ["Pay interest only for 5, 7, or 10 years", "Significantly lower initial payments", "Available on jumbo loan amounts", "ARM and fixed-rate options", "Popular with real estate investors", "Strong cash flow preservation during IO period"],
    requirements: ["Higher credit scores typically required (680+)", "Larger down payment (10–20%)", "Strong income and asset reserves", "Available on primary, second home, investment", "Must qualify at fully amortized rate"],
    bestFor: ["High-income earners with variable income", "Real estate investors maximizing cash flow", "Short-term property ownership plans", "Buyers in high-cost markets managing cash flow"],
    minDown: "10%", minCredit: 680,
  },
  "fixed-rate": {
    name: "Fixed-Rate Mortgage",
    tagline: "Locked-in stability for the life of your loan",
    description: "A fixed-rate mortgage keeps your interest rate constant for the entire loan term — protecting you from rate increases and making budgeting simple.",
    longDescription: "A fixed-rate mortgage is the most straightforward and predictable home loan option available. Your interest rate and monthly principal-and-interest payment are locked in at closing and never change, regardless of market fluctuations. This provides long-term stability and makes financial planning easy. Fixed-rate mortgages are available in 10, 15, 20, 25, and 30-year terms, with shorter terms offering lower rates but higher monthly payments.",
    features: ["Rate locked for the entire loan term", "Predictable monthly payment — never changes", "Available in 15, 20, and 30-year terms", "No rate risk from market fluctuations", "Easy to budget and plan around", "Great for long-term homeowners"],
    requirements: ["Standard credit and income requirements", "Property appraisal required", "Proof of income and assets", "Debt-to-income ≤45%", "Down payment per loan type"],
    bestFor: ["Long-term homeowners", "Those who value payment predictability", "Buyers in low-rate environments", "Buyers planning to stay 7+ years"],
    minDown: "3%", minCredit: 620,
  },
  "arm": {
    name: "Adjustable-Rate Mortgage (ARM)",
    tagline: "Lower initial rate with future adjustment potential",
    description: "ARMs offer a lower fixed rate for an initial period, then adjust based on a market index — ideal for buyers who won't keep the loan long-term.",
    longDescription: "An adjustable-rate mortgage offers a fixed interest rate for an initial period (typically 5, 7, or 10 years), after which the rate adjusts periodically based on a market index plus a margin. The most common ARM structures are 5/1, 7/1, and 10/1 — meaning the rate is fixed for the first 5, 7, or 10 years, then adjusts annually. ARMs include rate caps to protect against extreme rate increases. They can result in significant savings for buyers who plan to sell or refinance before the adjustment period begins.",
    features: ["Initial fixed period: 5, 7, or 10 years", "Lower rate than comparable fixed mortgage", "Periodic caps limit annual rate change", "Lifetime cap protects against extreme increases", "Can save thousands during fixed period", "Eligible for most property types"],
    requirements: ["Credit score 620+", "Standard income and employment verification", "Property appraisal required", "Must qualify at note rate (some programs at fully indexed rate)", "Debt-to-income ≤45%"],
    bestFor: ["Buyers planning to sell within 5–10 years", "Those expecting to refinance before adjustment", "Buyers maximizing purchasing power", "Short-term or transitional housing needs"],
    minDown: "5%", minCredit: 620,
  },
  "construction": {
    name: "Construction Loans",
    tagline: "Finance your custom-built dream home",
    description: "Construction loans fund the building of a new home from the ground up, disbursing funds in stages as work is completed before converting to a permanent mortgage.",
    longDescription: "A construction loan is a short-term loan that funds the building of a new home. Unlike a traditional mortgage, funds are disbursed in draws (stages) as construction milestones are completed. Once construction is complete, the loan either converts to a permanent mortgage (construction-to-permanent) or is paid off with a new permanent mortgage (construction-only). KLE Mortgage specializes in construction-to-permanent financing, which means a single closing, reducing costs and complexity.",
    features: ["Construction-to-permanent in one closing", "Interest-only payments during build phase", "Funds disbursed in draws at milestones", "Licensed, insured builder required", "Available for primary and vacation homes", "Lock in permanent rate at closing"],
    requirements: ["Licensed and insured general contractor", "Detailed construction plans and budget", "Minimum 20% down payment", "Higher credit scores required (680+)", "Adequate cash reserves", "Land must be owned or purchased simultaneously"],
    bestFor: ["Custom home builders", "Buyers who can't find existing inventory", "Those building a vacation or second home", "Buyers wanting control over home design and materials"],
    minDown: "20%", minCredit: 680,
  },
  "reverse-mortgage": {
    name: "Reverse Mortgage",
    tagline: "Convert your home equity into tax-free income",
    description: "A reverse mortgage (HECM) lets homeowners 62+ access their home's equity as tax-free funds while remaining in their home — no monthly mortgage payments required.",
    longDescription: "A reverse mortgage, formally known as a Home Equity Conversion Mortgage (HECM), is an FHA-insured loan product available to homeowners aged 62 or older. It allows you to convert a portion of your home's equity into tax-free proceeds (as a lump sum, monthly payments, or line of credit) without having to make monthly mortgage payments. The loan balance grows over time and is repaid when the last borrower permanently leaves the home. Reverse mortgages are subject to FHA guidelines and require HUD-approved counseling.",
    features: ["No monthly mortgage payments required", "Proceeds are tax-free (consult CPA)", "Stay in your home as long as you wish", "Available as lump sum, monthly income, or credit line", "FHA-insured HECM program", "Non-recourse loan — never owe more than home value"],
    requirements: ["Homeowner must be 62 or older", "Primary residence only", "Sufficient home equity", "HUD-approved counseling required", "Home must meet FHA property standards", "Must maintain taxes, insurance, and home upkeep"],
    bestFor: ["Homeowners 62+ with significant equity", "Retirees seeking supplemental income", "Those wanting to eliminate monthly mortgage payments", "Homeowners facing medical or living expenses"],
    minDown: null, minCredit: null,
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
                    <span className="font-bold text-[#C9A345]">{program.minCredit ?? "Contact us"}</span>
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
                  href="tel:+13057052030"
                  className="flex items-center justify-center gap-2 mt-3 text-sm text-[#6B1C23] hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  Call +1 (305) 705-2030
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
