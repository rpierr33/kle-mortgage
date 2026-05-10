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
    path: "/privacy-policy",
    title: t("privacyTitle"),
    description: t("privacyDescription"),
  });
}

export default async function PrivacyPolicyPage({
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
          {t("privacyHeading")}
        </h1>
        <div className="bg-white rounded-xl border border-[#E8E0D8] p-8 sm:p-12 prose prose-slate max-w-none">
          <p className="text-[#6B6056]">
            <strong>{t("lastUpdated")}</strong> {t("lastUpdatedDate")}
          </p>
          {locale !== "en" && (
            <p className="text-xs text-[#9CA3AF] italic">{t("translationDisclaimer")}</p>
          )}
          <p>{t("privacyIntro")}</p>

          <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-3 font-[family-name:var(--font-cormorant)]">
            {t("privacyInfoHeading")}
          </h2>
          <p>{t("privacyInfoIntro")}</p>
          <ul>
            <li>{t("privacyInfo1")}</li>
            <li>{t("privacyInfo2")}</li>
            <li>{t("privacyInfo3")}</li>
            <li>{t("privacyInfo4")}</li>
          </ul>

          <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-3 font-[family-name:var(--font-cormorant)]">
            {t("privacyUseHeading")}
          </h2>
          <p>{t("privacyUseIntro")}</p>
          <ul>
            <li>{t("privacyUse1")}</li>
            <li>{t("privacyUse2")}</li>
            <li>{t("privacyUse3")}</li>
            <li>{t("privacyUse4")}</li>
          </ul>

          <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-3 font-[family-name:var(--font-cormorant)]">
            {t("privacySharingHeading")}
          </h2>
          <p>{t("privacySharing")}</p>

          <h2 className="text-xl font-bold text-[#1A1A1A] mt-8 mb-3 font-[family-name:var(--font-cormorant)]">
            {t("privacyContactHeading")}
          </h2>
          <p>
            {t("privacyContact")}{" "}
            <a href="mailto:privacy@klemortgage.com" className="text-[#6B1C23]">
              privacy@klemortgage.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
