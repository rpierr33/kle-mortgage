"use client";

import Link from "next/link";
import { ArrowRight, Shield, Award, Users, ChevronDown, Star, CheckCircle2 } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "500+", label: "Families Served" },
  { value: "$150M+", label: "Loans Funded" },
  { value: "4.9/5", label: "Client Rating" },
  { value: "15+", label: "Years Experience" },
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{
          backgroundImage: "url('/hero-luxury.jpg')",
          y: bgY,
        }}
      />

      {/* Layered overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D0608]/95 via-[#1A1A1A]/75 to-[#6B1C23]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0608]/60 via-transparent to-transparent" />

      {/* Gold texture vignette — left column accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#C9A345]/60 to-transparent" />

      {/* Bottom fade to page */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F8F6F3] to-transparent" />

      <motion.div
        style={{ y: textY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 pt-40"
      >
        <div className="max-w-3xl">
          {/* NMLS badge */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 bg-white/8 backdrop-blur-md border border-white/15 text-white/90 text-xs font-medium px-4 py-2 rounded-full mb-8 tracking-wide"
          >
            <Shield className="w-3.5 h-3.5 text-[#C9A345]" />
            Licensed Mortgage Broker — NMLS #2380070
          </motion.div>

          {/* Gold accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 0 }}
            className="w-12 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] mb-6 rounded-full"
          />

          {/* Headline — refined, not oversized */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="font-[family-name:var(--font-cormorant)] font-medium text-white leading-[1.1] mb-8"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Mortgages Made Easy,{" "}
            <span className="text-[#C9A345]">Dreams Made Real.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-base sm:text-lg text-white/75 leading-relaxed mb-10 max-w-lg font-[family-name:var(--font-sans)]"
          >
            Your path to homeownership starts here.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-3 mb-5"
          >
            <Link
              href="/apply"
              className="group inline-flex items-center justify-center gap-2.5 bg-[#6B1C23] hover:bg-[#8A2530] text-white px-8 py-4 rounded-lg text-sm font-semibold transition-all duration-300 shadow-[0_0_40px_rgba(107,28,35,0.5)] hover:shadow-[0_0_60px_rgba(107,28,35,0.7)] hover:scale-[1.02]"
            >
              Get Pre-Approved in Minutes
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 bg-white/8 hover:bg-white/15 border border-white/20 hover:border-white/35 text-white px-8 py-4 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-sm"
            >
              Calculate Payment
            </Link>
          </motion.div>

          {/* Social proof — one-liner below CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2.5 mb-10"
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#C9A345] text-[#C9A345]" />
              ))}
            </div>
            <span className="text-white/50 text-xs">
              5/5 stars —{" "}
              <span className="text-white/70 italic">&ldquo;KLE made buying our first home stress-free&rdquo;</span>
              {" "}— Maria G.
            </span>
          </motion.div>

          {/* Trust badges — enhanced, more prominent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.50 }}
            className="flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-3.5 py-1.5 text-white/70 text-xs font-medium">
              <Shield className="w-3.5 h-3.5 text-[#C9A345]" />
              NMLS #2380070
            </div>
            <div className="flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-3.5 py-1.5 text-white/70 text-xs font-medium">
              <Award className="w-3.5 h-3.5 text-[#C9A345]" />
              Equal Housing Lender
            </div>
            <div className="flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-3.5 py-1.5 text-white/70 text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A345]" />
              BBB Accredited
            </div>
            <div className="flex items-center gap-2 bg-white/8 border border-white/12 rounded-full px-3.5 py-1.5 text-white/70 text-xs font-medium">
              <Users className="w-3.5 h-3.5 text-[#C9A345]" />
              Licensed FL, GA, TX
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 inline-grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-14"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + idx * 0.08 }}
              className="text-left"
            >
              <p
                className="font-[family-name:var(--font-cormorant)] font-semibold text-[#C9A345] leading-none mb-1"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                {stat.value}
              </p>
              <p className="text-xs text-white/50 tracking-wider uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
