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
    path: "/loan-programs",
    title: t("loanProgramsTitle"),
    description: t("loanProgramsDescription"),
  });
}

export default function LoanProgramsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
