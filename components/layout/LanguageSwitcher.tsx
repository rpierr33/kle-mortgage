"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({
  className,
  scrolled = false,
}: {
  className?: string;
  scrolled?: boolean;
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const switchTo = (next: string) => {
    setOpen(false);
    router.replace(pathname, { locale: next });
  };

  const displayCode = (loc: string) =>
    loc === "ht" ? "KR" : loc.toUpperCase();

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-2 text-sm font-medium transition-colors rounded-md",
          scrolled
            ? "text-[#1A1A1A] hover:text-[#6B1C23] hover:bg-[#F8F6F3]"
            : "text-white/85 hover:text-white hover:bg-white/10"
        )}
        aria-label={t("label")}
      >
        <Globe className="w-4 h-4" />
        <span>{displayCode(locale)}</span>
        <ChevronDown
          className={cn(
            "w-3 h-3 transition-transform",
            open ? "rotate-180" : ""
          )}
        />
      </button>
      {open && (
        <div className="absolute top-full right-0 w-36 bg-white/96 backdrop-blur-xl border border-[#E8E0D8]/80 rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] py-1.5 z-50 mt-1.5 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A]" />
          {routing.locales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => switchTo(loc)}
              className={cn(
                "block w-full text-left px-4 py-2.5 text-sm transition-colors",
                loc === locale
                  ? "text-[#6B1C23] bg-[#F8F6F3] font-semibold"
                  : "text-[#1A1A1A] hover:text-[#6B1C23] hover:bg-[#F8F6F3]"
              )}
            >
              {t(loc as "en" | "fr" | "ht" | "es")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
