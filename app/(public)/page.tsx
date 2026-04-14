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
  // Fetch data from DB, fall back to empty arrays if DB not configured
  let testimonialsData: typeof testimonials.$inferSelect[] = [];
  let officersData: typeof loanOfficers.$inferSelect[] = [];
  let programsData: typeof loanPrograms.$inferSelect[] = [];

  try {
    [testimonialsData, officersData, programsData] = await Promise.all([
      db.select().from(testimonials).where(eq(testimonials.isFeatured, true)).orderBy(asc(testimonials.displayOrder)).limit(6),
      db.select().from(loanOfficers).where(eq(loanOfficers.isActive, true)).orderBy(asc(loanOfficers.displayOrder)).limit(4),
      db.select().from(loanPrograms).where(eq(loanPrograms.isActive, true)).orderBy(asc(loanPrograms.displayOrder)).limit(7),
    ]);
  } catch {
    // DB not connected — render with empty data
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
