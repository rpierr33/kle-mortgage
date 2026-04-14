"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Phone } from "lucide-react";

interface Program {
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  requirements: string[];
  bestFor: string[];
  minDown: string | null;
  minCredit: number | null;
  maxLoan?: string;
}

interface Props {
  slug: string;
  program: Program;
  otherPrograms: [string, { name: string }][];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function LoanProgramDetailClient({ slug, program, otherPrograms }: Props) {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 bg-[#6B1C23] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.nav variants={fadeUp} className="text-sm text-white/50 mb-6 flex items-center gap-2">
              <Link href="/loan-programs" className="hover:text-white transition-colors">
                Loan Programs
              </Link>
              <span className="text-white/30">/</span>
              <span className="text-white/80">{program.name}</span>
            </motion.nav>

            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
                <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                  Loan Program
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-cormorant)] font-semibold text-white leading-[1.1] mb-4"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {program.name}
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-white/70 max-w-xl">
              {program.tagline}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-28 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border border-[#E8E0D8] p-8 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-5 h-0.5 bg-[#C9A345] rounded-full" />
                  <h2 className="font-[family-name:var(--font-cormorant)] font-bold text-[#1A1A1A] text-2xl">
                    What is a {program.name}?
                  </h2>
                </div>
                <p className="text-[#6B6056] leading-relaxed">{program.longDescription}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border border-[#E8E0D8] p-8 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-5 h-0.5 bg-[#C9A345] rounded-full" />
                  <h2 className="font-[family-name:var(--font-cormorant)] font-bold text-[#1A1A1A] text-2xl">
                    Key Features
                  </h2>
                </div>
                <ul className="space-y-3">
                  {program.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[#1A1A1A]">
                      <CheckCircle2 className="w-5 h-5 text-[#6B1C23] flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white rounded-2xl border border-[#E8E0D8] p-8 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-5 h-0.5 bg-[#C9A345] rounded-full" />
                  <h2 className="font-[family-name:var(--font-cormorant)] font-bold text-[#1A1A1A] text-2xl">
                    Requirements
                  </h2>
                </div>
                <ul className="space-y-3">
                  {program.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-[#6B6056] text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A345] flex-shrink-0 mt-2" />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              {/* At a Glance */}
              <div className="bg-gradient-to-br from-[#4A1218] via-[#6B1C23] to-[#8A2530] rounded-2xl p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/40 to-transparent" />
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-4 h-0.5 bg-[#C9A345] rounded-full" />
                  <h3 className="font-[family-name:var(--font-cormorant)] font-bold text-white text-lg">
                    At a Glance
                  </h3>
                </div>
                <div className="space-y-3">
                  {program.minDown && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/65">Min. Down Payment</span>
                      <span className="font-bold text-[#C9A345]">{program.minDown}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-white/65">Min. Credit Score</span>
                    <span className="font-bold text-[#C9A345]">{program.minCredit ?? "Contact us"}</span>
                  </div>
                  {program.maxLoan && (
                    <div className="flex justify-between text-sm">
                      <span className="text-white/65">Loan Limit</span>
                      <span className="font-bold text-[#C9A345] text-right text-xs mt-0.5 max-w-[140px]">{program.maxLoan}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Best For */}
              <div className="bg-white rounded-2xl border border-[#E8E0D8] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-0.5 bg-[#C9A345] rounded-full" />
                  <h3 className="font-[family-name:var(--font-cormorant)] font-bold text-[#1A1A1A] text-lg">
                    Best For
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {program.bestFor.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-[#6B6056]">
                      <CheckCircle2 className="w-4 h-4 text-[#6B1C23] flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="bg-[#F8F6F3] border border-[#E8E0D8] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-4 h-0.5 bg-[#C9A345] rounded-full" />
                  <h3 className="font-[family-name:var(--font-cormorant)] font-bold text-[#1A1A1A] text-lg">
                    Ready to Apply?
                  </h3>
                </div>
                <p className="text-sm text-[#6B6056] mb-4 leading-relaxed">
                  Get pre-approved in as little as 24 hours. No obligation.
                </p>
                <Link
                  href="/apply"
                  className="flex items-center justify-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-5 py-3 rounded-lg text-sm font-semibold transition-colors w-full"
                >
                  Start Application <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+13057052030"
                  className="flex items-center justify-center gap-2 mt-3 text-sm text-[#6B1C23] hover:underline"
                >
                  <Phone className="w-4 h-4" />
                  Call +1 (305) 705-2030
                </a>
              </div>

              {/* Other Programs */}
              <div className="bg-white rounded-2xl border border-[#E8E0D8] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-0.5 bg-[#C9A345] rounded-full" />
                  <h3 className="font-[family-name:var(--font-cormorant)] font-bold text-[#1A1A1A] text-lg">
                    Other Programs
                  </h3>
                </div>
                <ul className="space-y-2">
                  {otherPrograms.map(([s, p]) => (
                    <li key={s}>
                      <Link
                        href={`/loan-programs/${s}`}
                        className="text-sm text-[#6B6056] hover:text-[#6B1C23] transition-colors flex items-center gap-1.5"
                      >
                        <ArrowRight className="w-3 h-3" />
                        {p.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
