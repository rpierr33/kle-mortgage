"use client";

import { Phone, ClipboardCheck, Calculator } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function FloatingContactBar() {
  const t = useTranslations("FloatingBar");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div
        className="flex items-stretch border-t border-white/10"
        style={{
          background: "rgba(13, 6, 8, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <a
          href="tel:+13057052030"
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-white/80 active:bg-white/10 transition-colors"
          aria-label={t("callAria")}
        >
          <Phone className="w-5 h-5 text-[#C9A345]" />
          <span className="text-[10px] font-semibold tracking-wide uppercase text-white/70">
            {t("call")}
          </span>
        </a>

        <div className="w-px bg-white/10 my-2" />

        <Link
          href="/apply"
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-white/80 active:bg-white/10 transition-colors"
          aria-label={t("preApproveAria")}
        >
          <ClipboardCheck className="w-5 h-5 text-[#C9A345]" />
          <span className="text-[10px] font-semibold tracking-wide uppercase text-white/70">
            {t("preApprove")}
          </span>
        </Link>

        <div className="w-px bg-white/10 my-2" />

        <Link
          href="/calculator"
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-white/80 active:bg-white/10 transition-colors"
          aria-label={t("calculateAria")}
        >
          <Calculator className="w-5 h-5 text-[#C9A345]" />
          <span className="text-[10px] font-semibold tracking-wide uppercase text-white/70">
            {t("calculate")}
          </span>
        </Link>
      </div>

      <div
        className="bg-[#0D0608]"
        style={{ height: "env(safe-area-inset-bottom, 0px)" }}
      />
    </div>
  );
}
