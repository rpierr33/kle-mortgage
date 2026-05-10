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
    path: "/faq",
    title: t("faqTitle"),
    description: t("faqDescription"),
  });
}

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
