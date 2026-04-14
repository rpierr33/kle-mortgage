import { HeroSection } from "@/components/public/HeroSection";
import { LoanProgramsSection } from "@/components/public/LoanProgramsSection";
import { WhyKLESection } from "@/components/public/WhyKLESection";
import { CalculatorWidget } from "@/components/public/CalculatorWidget";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { TeamSection } from "@/components/public/TeamSection";
import { CTASection } from "@/components/public/CTASection";
import { db } from "@/lib/db";
import { testimonials, loanOfficers, loanPrograms } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

export default async function HomePage() {
  // Fetch data from DB — if DB is not configured, pass empty arrays.
  // LoanProgramsSection, TestimonialsSection, and TeamSection each have
  // built-in fallback fixture data and will render beautifully when given [].
  let testimonialsData: typeof testimonials.$inferSelect[] = [];
  let officersData: typeof loanOfficers.$inferSelect[] = [];
  let programsData: typeof loanPrograms.$inferSelect[] = [];

  try {
    const [tData, oData, pData] = await Promise.all([
      db.select().from(testimonials).where(eq(testimonials.isFeatured, true)).orderBy(asc(testimonials.displayOrder)).limit(6),
      db.select().from(loanOfficers).where(eq(loanOfficers.isActive, true)).orderBy(asc(loanOfficers.displayOrder)).limit(4),
      db.select().from(loanPrograms).where(eq(loanPrograms.isActive, true)).orderBy(asc(loanPrograms.displayOrder)).limit(7),
    ]);
    // Only use DB data if we actually got rows — prevents silent empty DB overriding fallbacks
    if (tData.length > 0) testimonialsData = tData;
    if (oData.length > 0) officersData = oData;
    if (pData.length > 0) programsData = pData;
  } catch (error) {
    // DB not connected — components will use their built-in fallback fixture data
    console.error("Homepage DB query failed, using component fallbacks:", error instanceof Error ? error.message : "Unknown error");
  }

  return (
    <>
      <HeroSection />
      <LoanProgramsSection programs={programsData} />
      <WhyKLESection />
      <CalculatorWidget />
      <TestimonialsSection testimonials={testimonialsData} />
      <TeamSection officers={officersData} />
      <CTASection />
    </>
  );
}
