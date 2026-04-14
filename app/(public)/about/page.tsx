import type { Metadata } from "next";
import { db } from "@/lib/db";
import { loanOfficers } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import { AboutHero } from "@/components/public/AboutHero";
import { TeamGrid } from "@/components/public/TeamGrid";
import { MissionSection } from "@/components/public/MissionSection";
import { CTASection } from "@/components/public/CTASection";

export const metadata: Metadata = {
  title: "About KLE Mortgage Financing",
  description: "Learn about KLE Mortgage Financing, LLC — our story, mission, values, and the experienced team dedicated to helping families achieve homeownership.",
};

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
