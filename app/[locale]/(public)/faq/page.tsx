import type { Metadata } from "next";
import { Phone, MessageSquare } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { FaqSection } from "@/components/seo/FaqSection";
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
    path: "/faq",
    title: t("faqTitle"),
    description: t("faqDescription"),
  });
}

const CATEGORY_ITEMS: Record<string, string[]> = {
  categoryGettingStarted: ["preQualVsPreApproval", "downPayment", "creditScore", "timeline"],
  categoryLoanTypes: ["fhaVsConventional", "vaEligibility", "usdaIncomeLimits", "refinance"],
  categoryCosts: ["closingCosts", "pmi", "applicationFees", "rollClosingCostsIntoLoan"],
  categoryProcess: ["documents", "dti", "closingDay", "selfEmployed"],
};

type ItemKey =
  | "preQualVsPreApproval" | "downPayment" | "creditScore" | "timeline"
  | "fhaVsConventional" | "vaEligibility" | "usdaIncomeLimits" | "refinance"
  | "closingCosts" | "pmi" | "applicationFees" | "rollClosingCostsIntoLoan"
  | "documents" | "dti" | "closingDay" | "selfEmployed";

export default async function FaqPage() {
  const t = await getTranslations("Faq");
  const tItems = await getTranslations("Faq.items");

  const buildItems = (keys: string[]) =>
    keys.map((k) => ({
      question: tItems(`${k as ItemKey}.q` as const),
      answer: tItems(`${k as ItemKey}.a` as const),
    }));

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-br from-[#1A0407] via-[#4A1218] to-[#6B1C23] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-6xl font-medium leading-tight mb-4">
            {t("pageHeading")}
          </h1>
          <p className="text-base text-white/75 leading-relaxed max-w-2xl mx-auto">
            {t("pageIntro")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a
              href="tel:+13057052030"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A345] hover:bg-[#E8C97A] text-[#1A0407] font-bold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t("ctaPhone")}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {t("ctaContact")}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ sections — each emits FaqJsonLd for SEO/GEO */}
      <FaqSection label={t("categoryGettingStarted")} items={buildItems(CATEGORY_ITEMS.categoryGettingStarted)} />
      <FaqSection label={t("categoryLoanTypes")} items={buildItems(CATEGORY_ITEMS.categoryLoanTypes)} variant="dark" />
      <FaqSection label={t("categoryCosts")} items={buildItems(CATEGORY_ITEMS.categoryCosts)} />
      <FaqSection label={t("categoryProcess")} items={buildItems(CATEGORY_ITEMS.categoryProcess)} variant="dark" />

      <CTASection />
    </>
  );
}
