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
    path: "/apply",
    title: t("applyTitle"),
    description: t("applyDescription"),
  });
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
