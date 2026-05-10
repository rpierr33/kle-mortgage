"use client";

import { motion } from "framer-motion";
import { Clock, HeartHandshake, TrendingDown, BookOpen, CheckCircle2, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function WhyKLESection() {
  const t = useTranslations("WhyKLE");
  const tc = useTranslations("Common");

  const benefits = [
    { icon: Clock, title: t("benefit1Title"), description: t("benefit1Body") },
    { icon: HeartHandshake, title: t("benefit2Title"), description: t("benefit2Body") },
    { icon: TrendingDown, title: t("benefit3Title"), description: t("benefit3Body") },
    { icon: BookOpen, title: t("benefit4Title"), description: t("benefit4Body") },
  ];

  const checkpoints = [
    t("promisePoint1"),
    t("promisePoint2"),
    t("promisePoint3"),
    t("promisePoint4"),
  ];

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#FDF9F5] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative pb-10 pr-10"
          >
            <div className="relative bg-gradient-to-br from-[#6B1C23] via-[#7A1E26] to-[#4A1218] rounded-3xl p-9 text-white overflow-hidden shadow-[0_24px_80px_rgba(107,28,35,0.35)]">
              <div className="absolute top-0 left-0 w-24 h-0.5 bg-gradient-to-r from-[#C9A345] to-transparent" />

              <div className="absolute top-0 right-0 w-56 h-56 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-sm" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#C9A345]/15 rounded-full translate-y-1/2 -translate-x-1/4 blur-md" />

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-5 h-0.5 bg-[#C9A345] rounded-full" />
                  <p className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                    {t("promiseKicker")}
                  </p>
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold italic leading-tight mb-4">
                  {t("promiseHeadline")}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-7">
                  {t("promiseBody")}
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
                  <p className="text-xs text-[#6B6056]">{t("callCardLead")}</p>
                  <p className="text-sm font-bold text-[#1A1A1A] font-[family-name:var(--font-cormorant)]">
                    {tc("phone")}
                  </p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-[#F0EBE3]">
                <p className="text-xs text-[#6B6056]">{t("callCardHours")}</p>
              </div>
            </motion.div>
          </motion.div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
              <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">{t("kicker")}</span>
            </div>
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#1A1A1A] leading-tight mb-5">
              {t("headlineLead")}
              <br />
              <span className="text-[#6B1C23] italic">{t("headlineAccent")}</span>
            </h2>
            <p className="text-[#6B6056] text-base leading-relaxed mb-12 max-w-md">
              {t("intro")}
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
                {t("ctaLearn")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-[#6B1C23]/30 text-[#6B1C23] hover:border-[#6B1C23] hover:bg-[#F8F6F3] px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200"
              >
                {t("ctaContact")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
