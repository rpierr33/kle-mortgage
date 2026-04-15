"use client";

import Image from "next/image";
import { useState } from "react";
import { Shield, Award, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const team = [
  { src: "/team-leopold.jpg", name: "Leopold Evariste", title: "CEO & Founder", quote: "Every family deserves a fair shot at homeownership. That's why I started KLE — to make the process transparent and human." },
  { src: "/team-joanne.jpg", name: "Joanne Evariste", title: "Office Manager", quote: "Behind every smooth closing is a team that cares about the details. I make sure nothing falls through the cracks." },
  { src: "/team-jean-samuel.jpg", name: "Jean Samuel Luxama", title: "Realtor & Loan Originator", quote: "I walk with my clients from finding the home to securing the loan. One relationship, start to finish." },
  { src: "/team-olivier.jpg", name: "Olivier Desire", title: "Loan Originator", quote: "Complex loans don't scare me. I find a way for investors and first-timers alike." },
  { src: "/team-daniel.jpg", name: "Daniel Calixte", title: "Loan Originator", quote: "I believe in educating my clients. When you understand your options, you make better decisions." },
  { src: "/team-carly.jpg", name: "Carly Cadet", title: "Realtor Associate", quote: "Finding a home should feel exciting, not stressful. I bring the energy and the expertise." },
];

export function AboutHero() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? team.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === team.length - 1 ? 0 : c + 1));

  return (
    <section className="pt-28 pb-20 relative overflow-hidden" style={{ backgroundColor: "#0D0608" }}>
      {/* Subtle warm gradient overlay — NOT heavy red */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1210] via-[#0D0608] to-[#0A0406] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Story */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
              <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                Our Story
              </span>
            </div>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-medium text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Built on Trust.
              <br />
              <span className="text-[#C9A345] italic">Driven by Purpose.</span>
            </h1>
            <p className="text-base text-white/70 leading-relaxed mb-10 max-w-lg">
              KLE Mortgage Financing was founded with one belief: every family
              deserves a fair shot at homeownership. We bring expertise,
              transparency, and genuine care to every loan we process.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Shield, label: "Licensed & Regulated", sub: "NMLS #123456" },
                { icon: Award, label: "15+ Years Experience", sub: "Expert team" },
                { icon: Users, label: "500+ Families Served", sub: "And counting" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/[0.06] rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#C9A345]" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{label}</p>
                    <p className="text-white/40 text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Team Slider with Trust Quotes */}
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mb-6">
                    <Image
                      src={team[current].src}
                      alt={team[current].name}
                      fill
                      className="object-cover"
                      sizes="380px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                        {team[current].name}
                      </p>
                      <p className="text-[#C9A345] text-xs font-medium">
                        {team[current].title}
                      </p>
                    </div>
                  </div>

                  {/* Trust quote */}
                  <blockquote className="text-center px-4">
                    <p
                      className="text-white/70 text-sm italic leading-relaxed"
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                      &ldquo;{team[current].quote}&rdquo;
                    </p>
                  </blockquote>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
                  aria-label="Previous team member"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2">
                  {team.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className="transition-all duration-300"
                      style={{
                        width: i === current ? "24px" : "6px",
                        height: "6px",
                        borderRadius: "3px",
                        backgroundColor: i === current ? "#C9A345" : "rgba(255,255,255,0.2)",
                      }}
                      aria-label={`View ${team[i].name}`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
                  aria-label="Next team member"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
