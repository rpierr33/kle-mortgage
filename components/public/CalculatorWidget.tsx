"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { calculateMonthlyPayment, formatCurrency } from "@/lib/utils/format";

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
    <section className="py-24 bg-[#F8F6F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left: Calculator */}
          <div className="bg-white rounded-2xl p-8 border border-[#E8E0D8] shadow-sm">
            <div className="mb-8">
              <span className="text-[#6B1C23] text-sm font-semibold uppercase tracking-widest">
                Payment Calculator
              </span>
              <h2 className="text-3xl font-bold text-[#1A1A1A] mt-1 font-[family-name:var(--font-playfair)]">
                Estimate Your Payment
              </h2>
            </div>

            <div className="space-y-7">
              {/* Purchase Price */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-[#1A1A1A]">Purchase Price</label>
                  <span className="text-sm font-bold text-[#6B1C23]">{formatCurrency(purchasePrice)}</span>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={1500000}
                  step={5000}
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full h-2 appearance-none rounded-full cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6B1C23 ${((purchasePrice - 100000) / 1400000) * 100}%, #E8E0D8 ${((purchasePrice - 100000) / 1400000) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-[#6B6056] mt-1">
                  <span>$100K</span>
                  <span>$1.5M</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-[#1A1A1A]">Down Payment</label>
                  <span className="text-sm font-bold text-[#6B1C23]">
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
                  className="w-full h-2 appearance-none rounded-full cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6B1C23 ${((downPaymentPct - 3) / 37) * 100}%, #E8E0D8 ${((downPaymentPct - 3) / 37) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-[#6B6056] mt-1">
                  <span>3%</span>
                  <span>40%</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-[#1A1A1A]">Interest Rate</label>
                  <span className="text-sm font-bold text-[#6B1C23]">{interestRate.toFixed(2)}%</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={12}
                  step={0.125}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 appearance-none rounded-full cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #6B1C23 ${((interestRate - 3) / 9) * 100}%, #E8E0D8 ${((interestRate - 3) / 9) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-[#6B6056] mt-1">
                  <span>3%</span>
                  <span>12%</span>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="text-sm font-medium text-[#1A1A1A] block mb-2">Loan Term</label>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 15, 20, 25, 30].map((term) => (
                    <button
                      key={term}
                      onClick={() => setLoanTerm(term)}
                      className={`py-2 rounded-md text-sm font-medium transition-colors border ${
                        loanTerm === term
                          ? "bg-[#6B1C23] text-white border-[#6B1C23]"
                          : "bg-white text-[#1A1A1A] border-[#E8E0D8] hover:border-[#6B1C23]"
                      }`}
                    >
                      {term} yr
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Result */}
          <div>
            <span className="inline-block text-[#6B1C23] text-sm font-semibold uppercase tracking-widest mb-3">
              Your Estimate
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-playfair)]">
              See What Your Home Could Cost Monthly
            </h2>
            <p className="text-[#6B6056] leading-relaxed mb-8">
              Use this quick calculator as a starting point. Your actual payment
              may include taxes, insurance, and PMI. Talk to one of our loan
              officers for a precise quote.
            </p>

            {/* Payment Display */}
            <div className="bg-[#6B1C23] rounded-2xl p-8 text-white mb-6">
              <p className="text-white/70 text-sm mb-2">Estimated Monthly Payment</p>
              <p className="text-5xl font-bold font-[family-name:var(--font-playfair)]">
                {formatCurrency(isNaN(monthlyPayment) ? 0 : monthlyPayment)}
                <span className="text-xl font-normal text-white/70">/mo</span>
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                <div>
                  <p className="text-white/60 text-xs">Loan Amount</p>
                  <p className="font-semibold">{formatCurrency(loanAmount)}</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs">Loan Term</p>
                  <p className="font-semibold">{loanTerm} years</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs">Interest Rate</p>
                  <p className="font-semibold">{interestRate.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs">Down Payment</p>
                  <p className="font-semibold">{downPaymentPct}%</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#6B6056] mb-5">
              * Estimate excludes property taxes, homeowners insurance, and PMI. For illustration purposes only.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/apply"
                className="flex items-center justify-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-6 py-3 rounded-md text-sm font-semibold transition-colors"
              >
                Get Pre-Approved <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculator"
                className="flex items-center justify-center gap-2 border border-[#6B1C23] text-[#6B1C23] hover:bg-[#F8F6F3] px-6 py-3 rounded-md text-sm font-semibold transition-colors"
              >
                Full Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
