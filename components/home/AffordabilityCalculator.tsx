"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Home, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

/**
 * AffordabilityCalculator — "How Much Can I Afford?"
 * Takes annual income and shows max home price (3-4x annual income,
 * adjusted by rate). More compelling than a payment calculator.
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

const RATE_OPTIONS = [
  { label: "6.25%", value: 6.25 },
  { label: "6.75%", value: 6.75 },
  { label: "7.25%", value: 7.25 },
  { label: "7.75%", value: 7.75 },
];

export function AffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(90_000);
  const [incomeInput, setIncomeInput] = useState("90000");
  const [selectedRate, setSelectedRate] = useState(6.25);

  // Standard mortgage affordability:
  // Max monthly payment ≈ 28% of gross monthly income
  // Down payment 10% assumed for display
  // Monthly rate factor from rate
  const grossMonthly = annualIncome / 12;
  const maxMonthlyPayment = grossMonthly * 0.28;

  // Monthly mortgage constant for 30yr fixed
  const monthlyRate = selectedRate / 100 / 12;
  const n = 360; // 30 years
  const mortgageFactor = monthlyRate > 0
    ? (monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    : 1 / n;

  // Loan amount from max monthly payment
  const maxLoanAmount = maxMonthlyPayment / mortgageFactor;
  // With 10% down: home price = loan / 0.9
  const maxHomePrice = maxLoanAmount / 0.9;

  // Range: conservative (3x) and generous (4.5x) multiples as sanity band
  const conservativePrice = annualIncome * 3;
  const generousPrice = annualIncome * 4.5;
  // Use the calculated value, capped within the range
  const displayPrice = Math.min(Math.max(maxHomePrice, conservativePrice), generousPrice);

  const estimatedDownPayment = displayPrice * 0.1;
  const estimatedMonthly = displayPrice * 0.9 * mortgageFactor;

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setIncomeInput(raw);
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setAnnualIncome(Math.min(parsed, 10_000_000));
    }
  };

  const handleIncomeBlur = () => {
    if (!incomeInput || parseInt(incomeInput, 10) <= 0) {
      setIncomeInput("90000");
      setAnnualIncome(90_000);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-[#F8F6F3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[#C9A345] text-xs font-semibold uppercase tracking-[0.14em] mb-4">
            <span className="w-6 h-px bg-[#C9A345]" />
            Affordability
            <span className="w-6 h-px bg-[#C9A345]" />
          </div>
          <h2
            className="font-[family-name:var(--font-cormorant)] font-medium text-[#1A1A1A] leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            How Much Can You Afford?
          </h2>
          <p className="text-[#6B6056] text-lg max-w-xl mx-auto">
            Enter your annual income and today&apos;s rate — get an instant picture
            of your home-buying power.
          </p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white border border-[#E8E0D8] rounded-3xl overflow-hidden shadow-sm">
            {/* Input area */}
            <div className="bg-[#6B1C23] px-8 py-10 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Annual income input */}
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-[0.14em] mb-3 block">
                    Annual Household Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A345] font-bold text-xl">
                      $
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={incomeInput ? parseInt(incomeInput, 10).toLocaleString("en-US") : ""}
                      onChange={handleIncomeChange}
                      onBlur={handleIncomeBlur}
                      className="w-full pl-10 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white font-semibold text-xl placeholder-white/30 focus:outline-none focus:border-[#C9A345]/60 transition-colors"
                      placeholder="90,000"
                    />
                  </div>
                </div>

                {/* Rate selector */}
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-[0.14em] mb-3 block">
                    Today&apos;s Rate
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {RATE_OPTIONS.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setSelectedRate(r.value)}
                        className={`py-3 rounded-xl text-sm font-semibold transition-all ${
                          selectedRate === r.value
                            ? "bg-[#C9A345] text-[#1A1A1A]"
                            : "bg-white/10 text-white/70 border border-white/15 hover:bg-white/20"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="px-8 py-10 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Max home price */}
                <div className="md:col-span-1 bg-[#6B1C23] rounded-2xl p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                    <Home className="w-5 h-5 text-[#C9A345]" />
                  </div>
                  <div className="text-white/60 text-xs uppercase tracking-wider mb-1">
                    Max Home Price
                  </div>
                  <div
                    className="font-[family-name:var(--font-cormorant)] font-semibold text-[#C9A345] leading-none"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                  >
                    {formatCurrency(displayPrice)}
                  </div>
                  <div className="text-white/40 text-xs mt-1">estimated maximum</div>
                </div>

                {/* Down payment */}
                <div className="bg-[#FAF8F5] border border-[#E8E0D8] rounded-2xl p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#C9A345]/10 flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-5 h-5 text-[#C9A345]" />
                  </div>
                  <div className="text-[#6B6056] text-xs uppercase tracking-wider mb-1">
                    Down Payment (10%)
                  </div>
                  <div
                    className="font-[family-name:var(--font-cormorant)] font-semibold text-[#1A1A1A] leading-none"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                  >
                    {formatCurrency(estimatedDownPayment)}
                  </div>
                  <div className="text-[#9CA3AF] text-xs mt-1">recommended minimum</div>
                </div>

                {/* Monthly payment */}
                <div className="bg-[#FAF8F5] border border-[#E8E0D8] rounded-2xl p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#C9A345]/10 flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 text-[#C9A345]" />
                  </div>
                  <div className="text-[#6B6056] text-xs uppercase tracking-wider mb-1">
                    Est. Monthly Payment
                  </div>
                  <div
                    className="font-[family-name:var(--font-cormorant)] font-semibold text-[#1A1A1A] leading-none"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                  >
                    {formatCurrency(estimatedMonthly)}
                  </div>
                  <div className="text-[#9CA3AF] text-xs mt-1">principal &amp; interest</div>
                </div>
              </div>

              {/* Disclaimer + CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <p className="text-[#9CA3AF] text-xs max-w-sm leading-relaxed">
                  * Estimates based on 28% debt-to-income ratio, 10% down, 30-year fixed.
                  Taxes, insurance, and HOA not included. For a precise quote, talk to a
                  loan officer.
                </p>
                <Link
                  href="/apply"
                  className="group flex-shrink-0 inline-flex items-center gap-2.5 bg-[#6B1C23] hover:bg-[#8A2530] text-white px-7 py-4 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-[1.02]"
                >
                  Get Pre-Approved
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
