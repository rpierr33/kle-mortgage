"use client";

import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTimeMinutes: number;
  publishedAt: Date | null;
}

interface Props {
  posts: Post[];
  categoryLabels: Record<string, string>;
}

const stagger = { visible: { transition: { staggerChildren: 0.07 } } };
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const LOCALE_BCP47: Record<string, string> = { en: "en-US", fr: "fr-FR", ht: "fr-FR", es: "es-US" };

function formatDate(date: Date | null, locale: string): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString(LOCALE_BCP47[locale] ?? "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function ResourcesClient({ posts, categoryLabels }: Props) {
  const t = useTranslations("ResourcesPage");
  const locale = useLocale();
  return (
    <>
      <section className="pt-28 pb-20 bg-[#6B1C23] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
              <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                {t("kicker")}
              </span>
            </div>
            <h1
              className="font-[family-name:var(--font-cormorant)] font-semibold text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              {t("headlineLead")}{" "}
              <span className="text-[#C9A345] italic">{t("headlineAccent")}</span>
            </h1>
            <p className="text-lg text-white/75 leading-relaxed">{t("intro")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-28 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <BookOpen className="w-12 h-12 text-[#6B6056] mx-auto mb-4 opacity-40" />
              <p className="text-[#6B6056]">{t("comingSoon")}</p>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
            >
              {posts.map((post) => (
                <motion.div key={post.id} variants={cardVariant}>
                  <Link
                    href={`/resources/${post.slug}`}
                    className="group flex flex-col bg-white rounded-2xl border border-[#E8E0D8] overflow-hidden hover:border-[#C9A345]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-all duration-300 h-full"
                  >
                    <div className="relative bg-[#F8F6F3] h-44 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#6B1C23]/8 to-transparent" />
                      <BookOpen className="w-10 h-10 text-[#6B1C23]/20 relative z-10" />
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C9A345] to-transparent" />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#F8F6F3] border border-[#E8E0D8] text-[#6B1C23] uppercase tracking-wide">
                          {categoryLabels[post.category] || post.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-[#6B6056]">
                          <Clock className="w-3 h-3" />
                          {post.readTimeMinutes} {t("minRead")}
                        </div>
                      </div>

                      <h2
                        className="font-[family-name:var(--font-cormorant)] font-bold text-[#1A1A1A] mb-2 group-hover:text-[#6B1C23] transition-colors line-clamp-2 leading-snug"
                        style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.25rem)" }}
                      >
                        {post.title}
                      </h2>
                      <p className="text-sm text-[#6B6056] line-clamp-2 mb-4 leading-relaxed flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-[#6B6056] border-t border-[#E8E0D8] pt-4">
                        <span>{formatDate(post.publishedAt, locale)}</span>
                        <span className="flex items-center gap-1 text-[#6B1C23] font-semibold group-hover:underline">
                          {t("readMore")} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
