import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MortgageCalculator } from "@/components/public/MortgageCalculator";
import { CTASection } from "@/components/public/CTASection";
import { siteMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return siteMetadata({
    path: "/calculator",
    title: t("calculatorTitle"),
    description: t("calculatorDescription"),
  });
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CalculatorPage" });
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#6B1C23]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-[#C9A345] text-sm font-semibold uppercase tracking-widest mb-3">
            {t("kicker")}
          </span>
          <h1 className="text-5xl font-bold text-white mb-4 font-[family-name:var(--font-cormorant)]">
            {t("headlineLead")} <span className="italic text-[#C9A345]">{t("headlineAccent")}</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {t("intro")}
          </p>
        </div>
      </section>

      <MortgageCalculator />
      <CTASection />
    </>
  );
}
