import type { Metadata } from "next";
import { CTASection } from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description: "Get answers to common mortgage questions. Learn about loan types, the application process, closing costs, and more from KLE Mortgage.",
};

const faqs = [
  {
    category: "Getting Started",
    items: [
      { q: "What is pre-qualification vs. pre-approval?", a: "Pre-qualification is an informal estimate of how much you might borrow based on self-reported information. Pre-approval involves a full credit check and document review — it carries more weight with sellers and gives you a precise loan amount." },
      { q: "How much do I need for a down payment?", a: "It depends on the loan type. FHA requires 3.5%, conventional can be as low as 3%, VA and USDA are 0% down. The more you put down, the lower your monthly payment and you may avoid PMI." },
      { q: "What credit score do I need to buy a home?", a: "Minimum scores vary: FHA 580, conventional 620, VA 580, USDA 640, jumbo 700+. Higher scores qualify for better rates. Contact us to review your specific situation." },
      { q: "How long does the mortgage process take?", a: "On average, 30-45 days from application to closing. KLE typically closes in 28 days or less. Having your documents ready speeds up the process significantly." },
    ],
  },
  {
    category: "Loan Types",
    items: [
      { q: "What's the difference between FHA and conventional loans?", a: "FHA loans are government-backed with easier qualification (lower credit scores, higher DTI). Conventional loans require better credit but often have lower long-term costs since PMI can be removed once you reach 20% equity." },
      { q: "Who qualifies for a VA loan?", a: "Veterans, active-duty service members, National Guard/Reserve members meeting minimum service requirements, and eligible surviving spouses. There's no down payment required and no PMI." },
      { q: "What are the income limits for a USDA loan?", a: "USDA limits household income to 115% of the area median income. The property must also be in a USDA-eligible rural or suburban area. Our team can check your specific location." },
      { q: "When should I consider refinancing?", a: "Consider refinancing if rates have dropped 0.5%+ since your purchase, your credit has improved significantly, you want to switch from ARM to fixed, shorten your term, or access equity." },
    ],
  },
  {
    category: "Costs & Fees",
    items: [
      { q: "What are closing costs?", a: "Closing costs are fees paid at closing, typically 2-5% of the loan amount. They include lender fees, title insurance, appraisal, attorney fees, and prepaid items. We provide a Loan Estimate within 3 days of application." },
      { q: "What is PMI?", a: "Private Mortgage Insurance protects the lender if you default. It's required on conventional loans with less than 20% down. Once you reach 20% equity, you can request removal. PMI typically costs 0.5-1.5% of the loan annually." },
      { q: "Are there any fees to apply?", a: "There is no fee to apply or get pre-qualified. An appraisal fee (typically $400-$600) is paid once you're under contract. We're transparent about all costs upfront." },
      { q: "Can closing costs be rolled into the loan?", a: "In some cases, yes. VA and USDA loans allow certain costs to be financed. Sellers can also contribute to closing costs in negotiation. We'll walk you through all options." },
    ],
  },
  {
    category: "The Process",
    items: [
      { q: "What documents do I need to apply?", a: "Typically: 2 years W-2s or tax returns, 30 days pay stubs, 2 months bank statements, photo ID, and information on any debts. Self-employed borrowers need additional documentation." },
      { q: "What is a debt-to-income ratio?", a: "DTI is your total monthly debt payments divided by gross monthly income. Most programs allow up to 45-50% DTI. Lower DTI = better terms. We calculate yours during the application." },
      { q: "What happens at closing?", a: "You'll sign final documents, pay closing costs (via cashier's check or wire), and receive your keys. The whole process takes about 1-2 hours. We'll prepare you for everything in advance." },
      { q: "Can I buy a home if I'm self-employed?", a: "Absolutely. Self-employed borrowers typically need 2 years of tax returns showing stable income. We work with many self-employed clients and understand how to document your income effectively." },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#6B1C23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/80">
              Everything you need to know about the mortgage process, loan types, and working with KLE.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F8F6F3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((section) => (
            <div key={section.category} className="mb-12">
              <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-playfair)]">
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <details key={item.q} className="group bg-white rounded-xl border border-[#E8E0D8] overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none hover:bg-[#F8F6F3] transition-colors">
                      <span className="font-semibold text-[#1A1A1A]">{item.q}</span>
                      <span className="w-6 h-6 rounded-full bg-[#F0EBE3] flex items-center justify-center text-[#6B1C23] font-bold text-lg flex-shrink-0 group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-sm text-[#6B6056] leading-relaxed border-t border-[#E8E0D8] pt-4">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-[#6B1C23] rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-playfair)]">
              Still have questions?
            </h3>
            <p className="text-white/80 mb-5">
              Our loan officers are happy to answer any question, no matter how small.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="/contact" className="bg-white text-[#6B1C23] hover:bg-[#F8F6F3] px-6 py-3 rounded-md text-sm font-semibold transition-colors">
                Send a Message
              </a>
              <a href="tel:+14045551234" className="border border-white/40 text-white hover:bg-white/10 px-6 py-3 rounded-md text-sm font-semibold transition-colors">
                Call (404) 555-1234
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
