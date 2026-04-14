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
    description: "We shop multiple lenders to secure the best rate for your situation, saving you thousands over the life of your loan.",
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main card */}
            <div className="bg-[#6B1C23] rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#C9A345]/20 rounded-full translate-y-1/2 -translate-x-1/2" />
              <div className="relative z-10">
                <p className="text-[#C9A345] text-sm font-semibold uppercase tracking-widest mb-2">
                  Our Promise
                </p>
                <h3 className="text-3xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
                  We put your family first.
                </h3>
                <p className="text-white/80 text-sm leading-relaxed mb-6">
                  At KLE Mortgage Financing, we believe homeownership changes
                  lives. That's why we work tirelessly to find solutions that
                  fit your budget, timeline, and goals.
                </p>
                <ul className="space-y-2.5">
                  {checkpoints.map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A345] flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Floating phone card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 border border-[#E8E0D8] w-52">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#F8F6F3] rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[#6B1C23]" />
                </div>
                <div>
                  <p className="text-xs text-[#6B6056]">Call us today</p>
                  <p className="text-sm font-bold text-[#1A1A1A]">+1 (305) 705-2030</p>
                </div>
              </div>
              <p className="text-xs text-[#6B6056] mt-2">Mon–Sat 8AM–7PM ET</p>
            </div>
          </motion.div>

          {/* Right: Benefits */}
          <div>
            <span className="inline-block text-[#6B1C23] text-sm font-semibold uppercase tracking-widest mb-3">
              Why KLE
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-playfair)]">
              The KLE Difference
            </h2>
            <p className="text-[#6B6056] text-lg leading-relaxed mb-10">
              We're not just a lender — we're your partner in one of the most
              important decisions of your life.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 bg-[#F8F6F3] border border-[#E8E0D8] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#6B1C23]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1A1A1A] mb-1">{benefit.title}</h4>
                      <p className="text-sm text-[#6B6056] leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 flex gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-6 py-3 rounded-md text-sm font-semibold transition-colors"
              >
                Learn About Us
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#6B1C23] text-[#6B1C23] hover:bg-[#F8F6F3] px-6 py-3 rounded-md text-sm font-semibold transition-colors"
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
