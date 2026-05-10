"use client";

import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function CTASection() {
  const t = useTranslations("CTA");

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A1218] via-[#6B1C23] to-[#8A2530]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3A0E14]/60 via-transparent to-transparent" />

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C9A345]/8 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/20 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#C9A345]/70 rounded-full" />
            <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
              {t("kicker")}
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#C9A345]/70 rounded-full" />
          </div>

          <h2 className="font-[family-name:var(--font-cormorant)] font-semibold italic text-white leading-[1.0] mb-6"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}>
            {t("headlineLead")}
            <br />
            <span className="text-[#E8C97A]">{t("headlineAccent")}</span>
          </h2>

          <p className="text-base text-white/70 max-w-xl mx-auto mb-12 leading-relaxed font-[family-name:var(--font-sans)]">
            {t("intro")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/apply"
            className="group inline-flex items-center justify-center gap-2.5 bg-white text-[#6B1C23] hover:bg-[#F8F6F3] px-9 py-4 rounded-lg text-sm font-bold transition-all duration-200 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:scale-[1.02]"
          >
            {t("ctaApply")}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a
            href="tel:+13057052030"
            className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 text-white hover:bg-white/10 px-9 py-4 rounded-lg text-sm font-semibold transition-all duration-200 backdrop-blur-sm"
          >
            <Phone className="w-4 h-4" />
            {t("ctaCall")}
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-white/40 text-xs mt-7 tracking-wide"
        >
          {t("footnote")}
        </motion.p>
      </div>
    </section>
  );
}
