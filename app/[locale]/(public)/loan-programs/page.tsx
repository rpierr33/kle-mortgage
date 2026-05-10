"use client";

import { motion } from "framer-motion";
import {
  Home, Shield, Flag, Leaf, DollarSign, RefreshCw, Star, ArrowRight,
  CheckCircle2, TrendingDown, Wrench, Key, Percent, Building2, RotateCcw, Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CTASection } from "@/components/public/CTASection";

type ProgramSlug =
  | "conventional" | "fha" | "va" | "usda" | "jumbo" | "refinance"
  | "first-time-buyer" | "non-qm" | "interest-rate-buydown" | "203k"
  | "heloc" | "interest-only" | "fixed-rate" | "arm" | "construction" | "reverse-mortgage";

const PROGRAM_META: Record<ProgramSlug, { icon: React.ElementType; minDown: string | null; minCredit: number | null }> = {
  "conventional": { icon: Home, minDown: "3%", minCredit: 620 },
  "fha": { icon: Shield, minDown: "3.5%", minCredit: 580 },
  "va": { icon: Flag, minDown: "0%", minCredit: 580 },
  "usda": { icon: Leaf, minDown: "0%", minCredit: 640 },
  "jumbo": { icon: DollarSign, minDown: "10%", minCredit: 680 },
  "refinance": { icon: RefreshCw, minDown: null, minCredit: 620 },
  "first-time-buyer": { icon: Star, minDown: "3%", minCredit: 580 },
  "non-qm": { icon: Sparkles, minDown: "10%", minCredit: 620 },
  "interest-rate-buydown": { icon: TrendingDown, minDown: "3%", minCredit: 620 },
  "203k": { icon: Wrench, minDown: "3.5%", minCredit: 580 },
  "heloc": { icon: Key, minDown: null, minCredit: 640 },
  "interest-only": { icon: Percent, minDown: "10%", minCredit: 680 },
  "fixed-rate": { icon: Shield, minDown: "3%", minCredit: 620 },
  "arm": { icon: RefreshCw, minDown: "5%", minCredit: 620 },
  "construction": { icon: Building2, minDown: "20%", minCredit: 680 },
  "reverse-mortgage": { icon: RotateCcw, minDown: null, minCredit: null },
};

const SLUG_ORDER: ProgramSlug[] = [
  "conventional", "fha", "va", "usda", "jumbo", "refinance", "first-time-buyer",
  "non-qm", "interest-rate-buydown", "203k", "heloc", "interest-only",
  "fixed-rate", "arm", "construction", "reverse-mortgage",
];

const stagger = { visible: { transition: { staggerChildren: 0.06 } } };
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

export default function LoanProgramsPage() {
  const t = useTranslations("LoanProgramsIndex");

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
                {t("kicker")}
              </span>
            </div>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-semibold text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {t("headlineLead")}{" "}
              <span className="text-[#C9A345] italic">{t("headlineAccent")}</span>
            </h1>
            <p className="text-lg text-white/75 leading-relaxed">
              {t("intro")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs grid */}
      <section className="py-28 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {SLUG_ORDER.map((slug) => {
              const meta = PROGRAM_META[slug];
              const Icon = meta.icon;
              type ProgramKey = `programs.${typeof slug}.${"name" | "tagline" | "description" | "f1" | "f2" | "f3" | "f4" | "f5"}`;
              const tp = (suffix: "name" | "tagline" | "description" | "f1" | "f2" | "f3" | "f4" | "f5") =>
                t(`programs.${slug}.${suffix}` as ProgramKey);
              const features = [tp("f1"), tp("f2"), tp("f3"), tp("f4"), tp("f5")];
              return (
                <motion.div
                  key={slug}
                  variants={cardVariant}
                  className="group bg-white rounded-2xl border border-[#E8E0D8] p-7 hover:border-[#C9A345]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.07)] transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="w-11 h-11 bg-gradient-to-br from-[#6B1C23] to-[#4A1218] rounded-xl flex items-center justify-center mb-3 shadow-[0_4px_12px_rgba(107,28,35,0.2)] group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h2
                        className="font-[family-name:var(--font-cormorant)] font-bold text-[#1A1A1A] leading-tight"
                        style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)" }}
                      >
                        {tp("name")}
                      </h2>
                      <p className="text-sm text-[#6B6056] mt-0.5">{tp("tagline")}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      {meta.minDown && (
                        <div className="bg-[#F8F6F3] border border-[#E8E0D8] rounded-lg px-3 py-1.5 text-center">
                          <p className="text-xs text-[#6B6056]">{t("minDownLabel")}</p>
                          <p className="font-bold text-[#6B1C23] text-sm">{meta.minDown}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-[#6B6056] leading-relaxed mb-5">
                    {tp("description")}
                  </p>

                  <ul className="space-y-2 mb-5">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-[#1A1A1A]">
                        <CheckCircle2 className="w-4 h-4 text-[#6B1C23] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E8E0D8]">
                    <p className="text-xs text-[#6B6056]">
                      {meta.minCredit ? (
                        <>{t("minCreditLabel")}: <span className="font-semibold text-[#1A1A1A]">{meta.minCredit}</span></>
                      ) : (
                        <span className="text-[#C9A345] font-medium">—</span>
                      )}
                    </p>
                    <Link
                      href={`/loan-programs/${slug}`}
                      className="flex items-center gap-1.5 text-sm text-[#6B1C23] font-semibold hover:underline"
                    >
                      {t("ctaViewDetails")} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
