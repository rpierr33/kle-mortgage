import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return siteMetadata({
    path: "/terms",
    title: t("termsTitle"),
    description: t("termsDescription"),
  });
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal" });

  return (
    <section className="pt-28 pb-20 bg-[#F8F6F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#1A1A1A] mb-8 font-[family-name:var(--font-cormorant)]">
          {t("termsHeading")}
        </h1>
        <div className="bg-white rounded-xl border border-[#E8E0D8] p-8 sm:p-12 space-y-6 text-[#6B6056] leading-relaxed">
          <p className="text-sm">
            <strong className="text-[#1A1A1A]">{t("lastUpdated")}</strong> {t("lastUpdatedDate")}
          </p>
          {locale !== "en" && (
            <p className="text-xs italic text-[#9CA3AF]">{t("translationDisclaimer")}</p>
          )}
          <p>{t("termsIntro")}</p>

          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-cormorant)]">
              {t("termsCommitmentHeading")}
            </h2>
            <p>{t("termsCommitment")}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-cormorant)]">
              {t("termsCalcHeading")}
            </h2>
            <p>{t("termsCalc")}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-cormorant)]">
              {t("termsHousingHeading")}
            </h2>
            <p>{t("termsHousing")}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-cormorant)]">
              {t("termsLicensingHeading")}
            </h2>
            <p>
              {t("termsLicensing")}{" "}
              <a
                href="https://www.nmlsconsumeraccess.org"
                className="text-[#6B1C23] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                nmlsconsumeraccess.org
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2 font-[family-name:var(--font-cormorant)]">
              {t("termsContactHeading")}
            </h2>
            <p>
              {t("termsContact")}{" "}
              <a href="mailto:legal@klemortgage.com" className="text-[#6B1C23]">
                legal@klemortgage.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
