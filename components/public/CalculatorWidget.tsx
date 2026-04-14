"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { calculateMonthlyPayment, formatCurrency } from "@/lib/utils/format";
import { motion } from "framer-motion";

export function CalculatorWidget() {
  const [purchasePrice, setPurchasePrice] = useState(350000);
  const [downPaymentPct, setDownPaymentPct] = useState(10);
  const [interestRate, setInterestRate] = useState(6.75);
  const [loanTerm, setLoanTerm] = useState(30);

  const loanAmount = useMemo(
    () => purchasePrice * (1 - downPaymentPct / 100),
    [purchasePrice, downPaymentPct]
  );

  const monthlyPayment = useMemo(
    () => calculateMonthlyPayment(loanAmount, interestRate, loanTerm),
    [loanAmount, interestRate, loanTerm]
  );

  const downPaymentDollars = purchasePrice * (downPaymentPct / 100);

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF9F5] via-white to-[#F8F6F3] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Calculator panel */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl p-8 border border-[#E8E0D8] shadow-[0_4px_32px_rgba(0,0,0,0.06)]"
          >
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
                <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                  Payment Calculator
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-[#1A1A1A]">
                Estimate Your Payment
              </h2>
            </div>

            <div className="space-y-8">
              {/* Purchase Price */}
              <div>
                <div className="flex justify-between mb-2.5">
                  <label className="text-sm font-medium text-[#1A1A1A]">Purchase Price</label>
                  <span className="text-sm font-bold text-[#6B1C23] font-[family-name:var(--font-playfair)]">
                    {formatCurrency(purchasePrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={1500000}
                  step={5000}
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6B1C23 ${((purchasePrice - 100000) / 1400000) * 100}%, #E8E0D8 ${((purchasePrice - 100000) / 1400000) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-[#6B6056] mt-1.5">
                  <span>$100K</span>
                  <span>$1.5M</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between mb-2.5">
                  <label className="text-sm font-medium text-[#1A1A1A]">Down Payment</label>
                  <span className="text-sm font-bold text-[#6B1C23] font-[family-name:var(--font-playfair)]">
                    {downPaymentPct}% ({formatCurrency(downPaymentDollars)})
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={40}
                  step={1}
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6B1C23 ${((downPaymentPct - 3) / 37) * 100}%, #E8E0D8 ${((downPaymentPct - 3) / 37) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-[#6B6056] mt-1.5">
                  <span>3%</span>
                  <span>40%</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-2.5">
                  <label className="text-sm font-medium text-[#1A1A1A]">Interest Rate</label>
                  <span className="text-sm font-bold text-[#6B1C23] font-[family-name:var(--font-playfair)]">
                    {interestRate.toFixed(2)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={12}
                  step={0.125}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-1.5 appearance-none rounded-full cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6B1C23 ${((interestRate - 3) / 9) * 100}%, #E8E0D8 ${((interestRate - 3) / 9) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-[#6B6056] mt-1.5">
                  <span>3%</span>
                  <span>12%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="text-sm font-medium text-[#1A1A1A] block mb-2.5">Loan Term</label>
                <div className="grid grid-cols-5 gap-2">
                  {[10, 15, 20, 25, 30].map((term) => (
                    <button
                      key={term}
                      onClick={() => setLoanTerm(term)}
                      className={`py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                        loanTerm === term
                          ? "bg-[#6B1C23] text-white border-[#6B1C23] shadow-[0_4px_12px_rgba(107,28,35,0.3)]"
                          : "bg-white text-[#6B6056] border-[#E8E0D8] hover:border-[#6B1C23] hover:text-[#6B1C23]"
                      }`}
                    >
                      {term}yr
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Result + copy */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
              <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">Your Estimate</span>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-5 leading-tight">
              See What Your Home
              <br />
              <span className="text-[#6B1C23] italic">Could Cost Monthly</span>
            </h2>
            <p className="text-[#6B6056] leading-relaxed mb-8 text-sm max-w-sm">
              Use this quick calculator as a starting point. Your actual payment
              may include taxes, insurance, and PMI. Talk to one of our loan
              officers for a precise quote.
            </p>

            {/* Payment Display Card */}
            <div className="bg-gradient-to-br from-[#6B1C23] via-[#7A1E26] to-[#4A1218] rounded-3xl p-8 text-white mb-5 shadow-[0_16px_64px_rgba(107,28,35,0.35)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-0.5 bg-gradient-to-r from-[#C9A345]/60 to-transparent" />
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-sm" />

              <div className="relative z-10">
                <p className="text-white/60 text-xs tracking-wider uppercase mb-2">Estimated Monthly Payment</p>
                <p className="font-[family-name:var(--font-cormorant)] font-semibold text-white leading-none mb-1"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                  {formatCurrency(isNaN(monthlyPayment) ? 0 : monthlyPayment)}
                  <span className="text-xl font-normal text-white/50 ml-1">/mo</span>
                </p>

                <div className="mt-6 grid grid-cols-2 gap-5 pt-5 border-t border-white/15">
                  <div>
                    <p className="text-white/50 text-xs mb-1">Loan Amount</p>
                    <p className="font-semibold text-sm">{formatCurrency(loanAmount)}</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1">Loan Term</p>
                    <p className="font-semibold text-sm">{loanTerm} years</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1">Interest Rate</p>
                    <p className="font-semibold text-sm">{interestRate.toFixed(2)}%</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-xs mb-1">Down Payment</p>
                    <p className="font-semibold text-sm">{downPaymentPct}%</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#6B6056] mb-6 leading-relaxed">
              * Estimate excludes property taxes, homeowners insurance, and PMI. For illustration purposes only.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/apply"
                className="group flex items-center justify-center gap-2 bg-[#6B1C23] hover:bg-[#8A2530] text-white px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-[0_4px_16px_rgba(107,28,35,0.3)] hover:shadow-[0_8px_24px_rgba(107,28,35,0.4)]"
              >
                Get Pre-Approved
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/calculator"
                className="flex items-center justify-center gap-2 border border-[#6B1C23]/30 hover:border-[#6B1C23] text-[#6B1C23] hover:bg-[#F8F6F3] px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
              >
                Full Calculator
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
