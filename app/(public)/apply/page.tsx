import type { Metadata } from "next";
import { ApplicationForm } from "@/components/public/ApplicationForm";

export const metadata: Metadata = {
  title: "Apply for a Mortgage",
  description: "Apply for a home loan with KLE Mortgage Financing. Our simple multi-step application takes less than 10 minutes to complete.",
};

export default function ApplyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-[#6B1C23]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-[#C9A345] text-sm font-semibold uppercase tracking-widest mb-3">
            Start Today
          </span>
          <h1 className="text-5xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)]">
            Apply for a Home Loan
          </h1>
          <p className="text-xl text-white/80 max-w-xl mx-auto">
            Complete our simple application in about 10 minutes. No credit pull
            required for pre-qualification.
          </p>
        </div>
      </section>

      <ApplicationForm />
    </>
  );
}
