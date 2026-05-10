"use client";

import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { calculateMonthlyPayment, formatCurrency } from "@/lib/utils/format";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function CalculatorWidget() {
  const t = useTranslations("Calculator");
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF9F5] via-white to-[#F8F6F3] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-[#C9A345] rounded-full" />
            <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
              {t("kicker")}
            </span>
            <div className="w-6 h-0.5 bg-gradient-to-l from-transparent to-[#C9A345] rounded-full" />
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-5xl sm:text-6xl font-medium text-[#1A1A1A] leading-[1.05] mb-3">
            {t("headline")}
          </h2>
          <p className="text-sm text-[#6B6056] max-w-sm mx-auto leading-relaxed">
            {t("intro")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white rounded-3xl border border-[#E8E0D8] shadow-[0_4px_40px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          <div className="p-8 sm:p-10 space-y-8">
            <div>
              <div className="flex justify-between mb-2.5">
                <label className="text-sm font-medium text-[#1A1A1A]">{t("labelPurchase")}</label>
                <span className="text-sm font-bold text-[#6B1C23] font-[family-name:var(--font-cormorant)]">
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

            <div>
              <div className="flex justify-between mb-2.5">
                <label className="text-sm font-medium text-[#1A1A1A]">{t("labelDownPayment")}</label>
                <span className="text-sm font-bold text-[#6B1C23] font-[family-name:var(--font-cormorant)]">
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

            <div>
              <div className="flex justify-between mb-2.5">
                <label className="text-sm font-medium text-[#1A1A1A]">{t("labelInterest")}</label>
                <span className="text-sm font-bold text-[#6B1C23] font-[family-name:var(--font-cormorant)]">
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

            <div>
              <label className="text-sm font-medium text-[#1A1A1A] block mb-2.5">{t("labelTerm")}</label>
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
                    {term}{t("termSuffix")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />

          <div className="bg-gradient-to-br from-[#6B1C23] via-[#7A1E26] to-[#4A1218] p-8 sm:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-40 h-0.5 bg-gradient-to-r from-[#C9A345]/50 to-transparent" />
            <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-sm pointer-events-none" />

            <div className="relative z-10">
              <p className="text-white/55 text-xs tracking-wider uppercase mb-2">{t("resultHeader")}</p>
              <p
                className="font-[family-name:var(--font-cormorant)] font-semibold text-white leading-none mb-6"
                style={{ fontSize: "clamp(2.75rem, 6vw, 4rem)" }}
              >
                {formatCurrency(isNaN(monthlyPayment) ? 0 : monthlyPayment)}
                <span className="text-2xl font-normal text-white/45 ml-1">{t("perMonth")}</span>
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-white/12 mb-6">
                <div>
                  <p className="text-white/45 text-xs mb-1">{t("labelLoanAmount")}</p>
                  <p className="font-semibold text-sm">{formatCurrency(loanAmount)}</p>
                </div>
                <div>
                  <p className="text-white/45 text-xs mb-1">{t("labelTermShort")}</p>
                  <p className="font-semibold text-sm">{loanTerm} {t("yearsSuffix")}</p>
                </div>
                <div>
                  <p className="text-white/45 text-xs mb-1">{t("labelRateShort")}</p>
                  <p className="font-semibold text-sm">{interestRate.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-white/45 text-xs mb-1">{t("labelDownShort")}</p>
                  <p className="font-semibold text-sm">{downPaymentPct}%</p>
                </div>
              </div>

              <p className="text-white/35 text-xs mb-6 leading-relaxed">
                {t("disclaimer")}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/apply"
                  className="group flex items-center justify-center gap-2 bg-white text-[#6B1C23] hover:bg-[#F8F6F3] px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                >
                  {t("ctaApply")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/calculator"
                  className="flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 text-white hover:bg-white/10 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200"
                >
                  {t("ctaFull")}
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
