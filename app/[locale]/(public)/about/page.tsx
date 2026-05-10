import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { db } from "@/lib/db";
import { loanOfficers } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { AboutHero } from "@/components/public/AboutHero";
import { TeamGrid } from "@/components/public/TeamGrid";
import { MissionSection } from "@/components/public/MissionSection";
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
    path: "/about",
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  });
}

export const revalidate = 300;

export default async function AboutPage() {
  // Pass empty array — TeamGrid has built-in fallback fixture data and renders beautifully
  let officers: typeof loanOfficers.$inferSelect[] = [];
  try {
    const dbOfficers = await db
      .select()
      .from(loanOfficers)
      .where(eq(loanOfficers.isActive, true))
      .orderBy(asc(loanOfficers.displayOrder));
    if (dbOfficers.length > 0) officers = dbOfficers;
  } catch (error) {
    console.error("About page DB query failed, using fallback:", error instanceof Error ? error.message : "Unknown error");
  }

  return (
    <>
      <AboutHero />
      <MissionSection />
      <TeamGrid officers={officers} />
      <CTASection />
    </>
  );
}
