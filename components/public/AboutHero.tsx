"use client";

import Image from "next/image";
import { useState } from "react";
import { Shield, Award, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

const teamSlugs = [
  { slug: "leopold-evariste", src: "/team-leopold.jpg", name: "Leopold Evariste" },
  { slug: "joanne-evariste", src: "/team-joanne.jpg", name: "Joanne Evariste" },
  { slug: "jean-samuel-luxama", src: "/team-jean-samuel.jpg", name: "Jean Samuel Luxama" },
  { slug: "olivier-desire", src: "/team-olivier.jpg", name: "Olivier Desire" },
  { slug: "daniel-calixte", src: "/team-daniel.jpg", name: "Daniel Calixte" },
  { slug: "carly-cadet", src: "/team-carly.jpg", name: "Carly Cadet" },
];

export function AboutHero() {
  const t = useTranslations("AboutHero");
  const tMembers = useTranslations("Team.members");
  const tQuotes = useTranslations("AboutHero.quotes");
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? teamSlugs.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === teamSlugs.length - 1 ? 0 : c + 1));

  const member = teamSlugs[current];
  const memberTitle = tMembers(`${member.slug}.title` as Parameters<typeof tMembers>[0]);
  const memberQuote = tQuotes(member.slug as Parameters<typeof tQuotes>[0]);

  return (
    <section className="pt-28 pb-20 relative overflow-hidden" style={{ backgroundColor: "#0D0608" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1210] via-[#0D0608] to-[#0A0406] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Story */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
              <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                {t("kicker")}
              </span>
            </div>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-medium text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {t("headlineLead")}
              <br />
              <span className="text-[#C9A345] italic">{t("headlineAccent")}</span>
            </h1>
            <p className="text-base text-white/70 leading-relaxed mb-10 max-w-lg">
              {t("intro")}
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Shield, label: t("trustLicensedLabel"), sub: t("trustLicensedSub") },
                { icon: Award, label: t("trustExperienceLabel"), sub: t("trustExperienceSub") },
                { icon: Users, label: t("trustFamiliesLabel"), sub: t("trustFamiliesSub") },
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

          {/* Right — Team Slider */}
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
                      src={member.src}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="380px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white font-semibold text-lg" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
                        {member.name}
                      </p>
                      <p className="text-[#C9A345] text-xs font-medium">
                        {memberTitle}
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-center px-4">
                    <p
                      className="text-white/80 text-lg sm:text-xl italic leading-relaxed"
                      style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
                    >
                      &ldquo;{memberQuote}&rdquo;
                    </p>
                  </blockquote>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
                  aria-label={t("prevAria")}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex gap-2">
                  {teamSlugs.map((m, i) => (
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
                      aria-label={t("viewAria", { name: m.name })}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all"
                  aria-label={t("nextAria")}
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
