"use client";

import Link from "next/link";
import { ArrowRight, Shield, Award, Users } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Families Served" },
  { value: "$150M+", label: "Loans Funded" },
  { value: "4.9/5", label: "Client Rating" },
  { value: "15+", label: "Years Experience" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-banner.jpg')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/90 via-[#1A1A1A]/70 to-[#6B1C23]/50" />

      {/* Decorative maroon gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8F6F3] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 pt-36">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm px-4 py-2 rounded-full mb-6"
          >
            <Shield className="w-4 h-4 text-[#C9A345]" />
            Licensed Mortgage Broker — NMLS #123456
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 font-[family-name:var(--font-playfair)]"
          >
            Your Dream Home
            <span className="block text-[#C9A345]">Starts Here.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/80 leading-relaxed mb-8 max-w-xl"
          >
            KLE Mortgage Financing simplifies the path to homeownership. We
            offer conventional, FHA, VA, USDA, and jumbo loans — tailored to
            your unique situation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <Link
              href="/apply"
              className="inline-flex items-center justify-center gap-2 bg-[#6B1C23] hover:bg-[#4A1218] text-white px-8 py-4 rounded-md text-base font-semibold transition-colors shadow-lg"
            >
              Start My Application
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-8 py-4 rounded-md text-base font-semibold transition-colors backdrop-blur-sm"
            >
              Calculate Payment
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-6"
          >
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Award className="w-4 h-4 text-[#C9A345]" />
              Equal Housing Lender
            </div>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <Users className="w-4 h-4 text-[#C9A345]" />
              Licensed in GA, FL, TX
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <p className="text-3xl font-bold text-[#C9A345] font-[family-name:var(--font-playfair)]">
                {stat.value}
              </p>
              <p className="text-sm text-white/60 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
