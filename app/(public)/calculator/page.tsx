import type { Metadata } from "next";
import { MortgageCalculator } from "@/components/public/MortgageCalculator";
import { CTASection } from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description: "Calculate your estimated monthly mortgage payment with KLE's free mortgage calculator. Includes principal, interest, taxes, and insurance breakdown.",
};

export default function CalculatorPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#6B1C23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-[#C9A345] text-sm font-semibold uppercase tracking-widest mb-3">
            Free Tool
          </span>
          <h1 className="text-5xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
            Mortgage Calculator
          </h1>
          <p className="text-xl text-white/80 max-w-xl mx-auto">
            Estimate your monthly payment with a full breakdown including
            taxes, insurance, and PMI.
          </p>
        </div>
      </section>

      <MortgageCalculator />
      <CTASection />
    </>
  );
}
