import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 bg-[#6B1C23] relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A345]/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block text-[#C9A345] text-sm font-semibold uppercase tracking-widest mb-4">
          Take the First Step
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
          Ready to Find Your
          <br />
          Perfect Loan?
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Whether you're buying your first home, upgrading, or refinancing, our
          team is ready to guide you. Getting pre-approved takes less than 10
          minutes.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/apply"
            className="inline-flex items-center justify-center gap-2 bg-white text-[#6B1C23] hover:bg-[#F8F6F3] px-8 py-4 rounded-md text-base font-bold transition-colors shadow-lg"
          >
            Apply Now — It's Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:+14045551234"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-md text-base font-semibold transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call (404) 555-1234
          </a>
        </div>

        <p className="text-white/50 text-sm mt-6">
          No obligation. No credit pull required for pre-qualification.
        </p>
      </div>
    </section>
  );
}
