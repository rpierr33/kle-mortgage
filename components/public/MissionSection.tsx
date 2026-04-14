"use client";

import { Heart, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const values = [
  {
    icon: Heart,
    title: "Family First",
    description: "Every decision we make is guided by what's best for the families we serve. We're not just closing loans — we're building futures.",
  },
  {
    icon: Target,
    title: "Transparency",
    description: "No hidden fees. No confusing jargon. We explain every number, every term, and every option so you can make informed decisions with confidence.",
  },
  {
    icon: Lightbulb,
    title: "Education",
    description: "We believe informed buyers make better decisions. Our team takes time to educate every client, from first-time buyers to seasoned investors.",
  },
];

const stats = [
  { value: "500+", label: "Families Served" },
  { value: "$150M+", label: "Loans Funded" },
  { value: "15+", label: "Years Experience" },
  { value: "4.9", label: "Average Rating" },
  { value: "28", label: "Avg Days to Close" },
  { value: "3", label: "States Licensed" },
];

export function MissionSection() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FDF9F5] via-white to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Left: Mission copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
              <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">Our Mission</span>
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl font-bold text-[#1A1A1A] leading-tight mb-6">
              Making Homeownership
              <br />
              <span className="text-[#6B1C23] italic">Accessible to All</span>
            </h2>
            <p className="text-[#6B6056] leading-relaxed mb-5 text-base">
              KLE Mortgage Financing was founded by Kimberly Lewis-Edwards with
              a vision to bridge the homeownership gap in underserved
              communities. We saw families who had the income to afford a home
              but lacked the guidance to navigate the mortgage process.
            </p>
            <p className="text-[#6B6056] leading-relaxed text-base">
              Today, we serve clients across Georgia, Florida, and Texas,
              offering the same white-glove service regardless of loan amount.
              Whether you&apos;re buying a $150,000 starter home or a $1.5M estate,
              you deserve expert guidance.
            </p>
          </motion.div>

          {/* Right: Stats panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#F8F6F3] rounded-3xl p-9 border border-[#E8E0D8] shadow-sm"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-0.5 bg-[#C9A345] rounded-full" />
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-[#1A1A1A]">
                By the Numbers
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.07, duration: 0.4 }}
                  className="text-center p-4 bg-white rounded-2xl border border-[#E8E0D8] hover:border-[#C9A345]/30 hover:shadow-sm transition-all duration-200"
                >
                  <p className="font-[family-name:var(--font-cormorant)] font-semibold text-[#6B1C23] leading-none mb-1"
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#6B6056] mt-1 leading-tight">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#C9A345] rounded-full" />
              <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">What Drives Us</span>
              <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#C9A345] rounded-full" />
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl font-bold text-[#1A1A1A]">
              Our Core Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group text-center p-9 bg-[#F8F6F3] rounded-2xl border border-[#E8E0D8] hover:border-[#C9A345]/30 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#6B1C23] to-[#4A1218] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[0_4px_16px_rgba(107,28,35,0.25)] group-hover:scale-105 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] font-bold text-[#1A1A1A] text-lg mb-3">
                  {title}
                </h3>
                <p className="text-sm text-[#6B6056] leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Licensing bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 bg-gradient-to-br from-[#1A1A1A] to-[#0D0608] rounded-3xl p-9 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A345]/[0.04] rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />

          <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold mb-5 relative z-10">
            Licensing & Compliance
          </h3>
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-[#C9A345] font-semibold text-xs mb-1.5 uppercase tracking-wider">NMLS Company</p>
              <p className="text-white/70 text-sm">KLE Mortgage Financing, LLC — NMLS #123456</p>
            </div>
            <div>
              <p className="text-[#C9A345] font-semibold text-xs mb-1.5 uppercase tracking-wider">Licensed In</p>
              <p className="text-white/70 text-sm">Georgia (GA), Florida (FL), Texas (TX)</p>
            </div>
            <div>
              <p className="text-[#C9A345] font-semibold text-xs mb-1.5 uppercase tracking-wider">Equal Housing</p>
              <p className="text-white/70 text-sm">Equal Housing Lender. We comply with all fair lending laws.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
