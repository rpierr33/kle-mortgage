"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Phone, MessageSquare } from "lucide-react";
import { CTASection } from "@/components/public/CTASection";

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

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function FAQAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[#E8E0D8]">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-start justify-between gap-4 py-5 px-0 text-left group transition-colors duration-200"
            >
              <span
                className="font-semibold text-sm leading-snug transition-colors duration-200"
                style={{ color: isOpen ? "#6B1C23" : "#1A1A1A" }}
              >
                {item.q}
              </span>
              <ChevronDown
                className="w-5 h-5 flex-shrink-0 mt-0.5 transition-all duration-300"
                style={{
                  color: isOpen ? "#C9A345" : "#6B6056",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-[#6B6056]">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function FAQPage() {
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
                Knowledge Base
              </span>
            </div>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-semibold text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Frequently Asked{" "}
              <span className="text-[#C9A345] italic">Questions</span>
            </h1>
            <p className="text-lg text-white/75 leading-relaxed">
              Everything you need to know about the mortgage process, loan
              types, and working with KLE.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ content */}
      <section className="py-28 bg-[#F8F6F3]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {faqs.map((section, idx) => (
              <motion.div
                key={section.category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={sectionReveal}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-5 h-0.5 bg-[#C9A345] rounded-full" />
                  <h2
                    className="font-[family-name:var(--font-cormorant)] font-bold text-[#1A1A1A]"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
                  >
                    {section.category}
                  </h2>
                </div>
                <div className="bg-white rounded-2xl border border-[#E8E0D8] px-7 shadow-sm">
                  <FAQAccordion items={section.items} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Still have questions */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={sectionReveal}
            className="mt-16 bg-gradient-to-br from-[#4A1218] via-[#6B1C23] to-[#8A2530] rounded-3xl p-10 text-white text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/40 to-transparent" />
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#C9A345]/70 rounded-full" />
              <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                We&apos;re Here
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#C9A345]/70 rounded-full" />
            </div>
            <h3
              className="font-[family-name:var(--font-cormorant)] font-semibold text-white mb-3"
              style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
            >
              Still have questions?
            </h3>
            <p className="text-white/75 mb-7 max-w-md mx-auto">
              Our loan officers are happy to answer any question — no matter how small.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#6B1C23] hover:bg-[#F8F6F3] px-7 py-3.5 rounded-lg text-sm font-bold transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Send a Message
              </a>
              <a
                href="tel:+13057052030"
                className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white/60 hover:bg-white/10 text-white px-7 py-3.5 rounded-lg text-sm font-semibold transition-all"
              >
                <Phone className="w-4 h-4" />
                Call +1 (305) 705-2030
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
