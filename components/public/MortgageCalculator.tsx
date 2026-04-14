"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { calculateMonthlyPayment, formatCurrency } from "@/lib/utils/format";

export function MortgageCalculator() {
  // Inputs
  const [purchasePrice, setPurchasePrice] = useState(350000);
  const [downPaymentPct, setDownPaymentPct] = useState(10);
  const [interestRate, setInterestRate] = useState(6.75);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(1.2); // % per year
  const [homeInsurance, setHomeInsurance] = useState(150); // $ per month
  const [includePMI, setIncludePMI] = useState(true);

  // Calculations
  const downPaymentDollars = purchasePrice * (downPaymentPct / 100);
  const loanAmount = purchasePrice - downPaymentDollars;

  const principalAndInterest = useMemo(
    () => calculateMonthlyPayment(loanAmount, interestRate, loanTerm),
    [loanAmount, interestRate, loanTerm]
  );

  const monthlyPropertyTax = (purchasePrice * (propertyTax / 100)) / 12;
  const pmi = includePMI && downPaymentPct < 20 ? (loanAmount * 0.005) / 12 : 0;
  const totalMonthlyPayment = principalAndInterest + monthlyPropertyTax + homeInsurance + pmi;

  // Amortization info
  const totalPaid = principalAndInterest * loanTerm * 12;
  const totalInterest = totalPaid - loanAmount;

  const safePI = isNaN(principalAndInterest) ? 0 : principalAndInterest;
  const safeTotal = isNaN(totalMonthlyPayment) ? 0 : totalMonthlyPayment;

  const breakdownItems = [
    { label: "Principal & Interest", value: safePI, color: "#6B1C23" },
    { label: "Property Tax", value: monthlyPropertyTax, color: "#C9A345" },
    { label: "Home Insurance", value: homeInsurance, color: "#8A2530" },
    ...(pmi > 0 ? [{ label: "PMI", value: pmi, color: "#E8C97A" }] : []),
  ];

  return (
    <section className="py-20 bg-[#F8F6F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Inputs - 3 cols */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-[#E8E0D8] p-8">
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8 font-[family-name:var(--font-playfair)]">
              Loan Details
            </h2>

            <div className="space-y-8">
              {/* Purchase Price */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-[#1A1A1A]">Home Price</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#6B6056]">$</span>
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(Math.max(0, Number(e.target.value)))}
                      className="w-28 text-right text-sm font-bold text-[#6B1C23] border border-[#E8E0D8] rounded-md px-2 py-1 focus:outline-none focus:border-[#6B1C23]"
                    />
                  </div>
                </div>
                <input
                  type="range" min={50000} max={2000000} step={5000}
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full h-2 appearance-none rounded-full cursor-pointer"
                  style={{ background: `linear-gradient(to right, #6B1C23 ${((purchasePrice - 50000) / 1950000) * 100}%, #E8E0D8 ${((purchasePrice - 50000) / 1950000) * 100}%)` }}
                />
                <div className="flex justify-between text-xs text-[#6B6056] mt-1">
                  <span>$50K</span><span>$2M</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-[#1A1A1A]">Down Payment</label>
                  <span className="text-sm font-bold text-[#6B1C23]">
                    {downPaymentPct}% — {formatCurrency(downPaymentDollars)}
                  </span>
                </div>
                <input
                  type="range" min={3} max={50} step={1}
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full h-2 appearance-none rounded-full cursor-pointer"
                  style={{ background: `linear-gradient(to right, #6B1C23 ${((downPaymentPct - 3) / 47) * 100}%, #E8E0D8 ${((downPaymentPct - 3) / 47) * 100}%)` }}
                />
                {downPaymentPct < 20 && (
                  <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    PMI applies when down payment is below 20%
                  </p>
                )}
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-[#1A1A1A]">Interest Rate</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step={0.125}
                      min={1}
                      max={15}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value)))}
                      className="w-16 text-right text-sm font-bold text-[#6B1C23] border border-[#E8E0D8] rounded-md px-2 py-1 focus:outline-none focus:border-[#6B1C23]"
                    />
                    <span className="text-xs text-[#6B6056]">%</span>
                  </div>
                </div>
                <input
                  type="range" min={2} max={14} step={0.125}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 appearance-none rounded-full cursor-pointer"
                  style={{ background: `linear-gradient(to right, #6B1C23 ${((interestRate - 2) / 12) * 100}%, #E8E0D8 ${((interestRate - 2) / 12) * 100}%)` }}
                />
              </div>

              {/* Loan Term */}
              <div>
                <label className="text-sm font-semibold text-[#1A1A1A] block mb-3">Loan Term</label>
                <div className="grid grid-cols-5 gap-2">
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
                      {term}yr
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Costs */}
              <div className="pt-4 border-t border-[#E8E0D8]">
                <h3 className="text-sm font-semibold text-[#1A1A1A] mb-4">
                  Additional Monthly Costs (Optional)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-[#6B6056] block mb-1">Property Tax Rate (%/yr)</label>
                    <input
                      type="number" step={0.1} min={0} max={5}
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(Math.max(0, Number(e.target.value)))}
                      className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#6B6056] block mb-1">Home Insurance ($/mo)</label>
                    <input
                      type="number" step={10} min={0}
                      value={homeInsurance}
                      onChange={(e) => setHomeInsurance(Math.max(0, Number(e.target.value)))}
                      className="w-full border border-[#E8E0D8] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#6B1C23]"
                    />
                  </div>
                </div>
                {downPaymentPct < 20 && (
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="checkbox"
                      id="pmi"
                      checked={includePMI}
                      onChange={(e) => setIncludePMI(e.target.checked)}
                      className="accent-[#6B1C23]"
                    />
                    <label htmlFor="pmi" className="text-xs text-[#6B6056]">
                      Include estimated PMI (0.5% annually)
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results - 2 cols */}
          <div className="lg:col-span-2 space-y-5">
            {/* Payment Card */}
            <div className="bg-[#6B1C23] text-white rounded-2xl p-8">
              <p className="text-white/70 text-sm mb-2">Total Monthly Payment</p>
              <p className="text-5xl font-bold font-[family-name:var(--font-playfair)]">
                {formatCurrency(safeTotal)}
                <span className="text-lg font-normal text-white/70">/mo</span>
              </p>
            </div>

            {/* Breakdown */}
            <div className="bg-white rounded-xl border border-[#E8E0D8] p-6">
              <h3 className="font-bold text-[#1A1A1A] mb-4 font-[family-name:var(--font-playfair)]">
                Payment Breakdown
              </h3>
              <div className="space-y-3">
                {breakdownItems.map((item) => {
                  const pct = safeTotal > 0 ? (item.value / safeTotal) * 100 : 0;
                  return (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                          {item.label}
                        </span>
                        <span className="font-semibold">{formatCurrency(item.value)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#F0EBE3] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Loan Summary */}
            <div className="bg-[#F8F6F3] rounded-xl border border-[#E8E0D8] p-6">
              <h3 className="font-bold text-[#1A1A1A] mb-4 font-[family-name:var(--font-playfair)]">
                Loan Summary
              </h3>
              <div className="space-y-2">
                {[
                  { label: "Loan Amount", value: formatCurrency(loanAmount) },
                  { label: "Down Payment", value: `${formatCurrency(downPaymentDollars)} (${downPaymentPct}%)` },
                  { label: "Total Interest Paid", value: formatCurrency(isNaN(totalInterest) ? 0 : totalInterest) },
                  { label: "Total Cost of Loan", value: formatCurrency(isNaN(totalPaid) ? 0 : totalPaid + downPaymentDollars) },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-[#6B6056]">{label}</span>
                    <span className="font-semibold text-[#1A1A1A]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <p className="text-xs text-[#6B6056]">
              * Estimate only. Actual payments may vary. Contact us for an accurate quote.
            </p>
            <Link
              href="/apply"
              className="flex items-center justify-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-6 py-3.5 rounded-md text-sm font-semibold transition-colors w-full"
            >
              Get Pre-Approved <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
