"use client";

import { motion } from "framer-motion";
import { Clock, HeartHandshake, TrendingDown, BookOpen, CheckCircle2, Phone } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: Clock,
    title: "Fast Pre-Approval",
    description: "Get pre-approved in as little as 24 hours. We move quickly so you don't miss your dream home.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Service",
    description: "A dedicated loan officer guides you from application to closing — no call centers, no runaround.",
  },
  {
    icon: TrendingDown,
    title: "Competitive Rates",
    description: "We shop multiple lenders to secure the best rate for your situation, saving you thousands.",
  },
  {
    icon: BookOpen,
    title: "Expert Guidance",
    description: "15+ years of mortgage expertise. We explain every step in plain language so you always know where you stand.",
  },
];

const checkpoints = [
  "No hidden fees or surprises at closing",
  "Licensed in GA, FL, and TX",
  "Equal Housing Lender — we serve everyone",
  "Available weekends for your convenience",
];

export function WhyKLESection() {
  return (
    <section className="py-28 bg-white relative overflow-hidden">
      {/* Subtle right-side warmth */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#FDF9F5] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Visual card stack */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative pb-10 pr-10"
          >
            {/* Main Promise card */}
            <div className="relative bg-gradient-to-br from-[#6B1C23] via-[#7A1E26] to-[#4A1218] rounded-3xl p-9 text-white overflow-hidden shadow-[0_24px_80px_rgba(107,28,35,0.35)]">
              {/* Gold top-left accent */}
              <div className="absolute top-0 left-0 w-24 h-0.5 bg-gradient-to-r from-[#C9A345] to-transparent" />

              {/* Decorative orbs */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-sm" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#C9A345]/15 rounded-full translate-y-1/2 -translate-x-1/4 blur-md" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-5 h-0.5 bg-[#C9A345] rounded-full" />
                  <p className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                    Our Promise
                  </p>
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold italic leading-tight mb-4">
                  We put your family first.
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-7">
                  At KLE Mortgage Financing, we believe homeownership changes
                  lives. That&apos;s why we work tirelessly to find solutions that
                  fit your budget, timeline, and goals.
                </p>
                <ul className="space-y-3">
                  {checkpoints.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm text-white/85">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A345] flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Floating call card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-2 -right-2 bg-white rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.14)] p-4 border border-[#E8E0D8] w-54"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F8F6F3] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#6B1C23]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B6056]">Call us today</p>
                  <p className="text-sm font-bold text-[#1A1A1A] font-[family-name:var(--font-cormorant)]">
                    +1 (305) 705-2030
                  </p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#F0EBE3]">
                <p className="text-xs text-[#6B6056]">Mon–Sat 8AM–7PM ET</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Benefits */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
              <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">Why KLE</span>
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#1A1A1A] leading-tight mb-5">
              The KLE
              <br />
              <span className="text-[#6B1C23] italic">Difference</span>
            </h2>
            <p className="text-[#6B6056] text-base leading-relaxed mb-12 max-w-md">
              We&apos;re not just a lender — we&apos;re your partner in one of the most
              important decisions of your life.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group flex gap-4"
                  >
                    <div className="w-11 h-11 bg-[#F8F6F3] border border-[#E8E0D8] group-hover:border-[#6B1C23]/20 group-hover:bg-[#6B1C23]/5 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-0.5">
                      <Icon className="w-5 h-5 text-[#6B1C23]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A] mb-1.5 font-[family-name:var(--font-cormorant)]">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-[#6B6056] leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-12 flex gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#6B1C23] hover:bg-[#8A2530] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 shadow-[0_2px_12px_rgba(107,28,35,0.3)] hover:shadow-[0_4px_20px_rgba(107,28,35,0.4)]"
              >
                Learn About Us
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#6B1C23]/30 text-[#6B1C23] hover:border-[#6B1C23] hover:bg-[#F8F6F3] px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
