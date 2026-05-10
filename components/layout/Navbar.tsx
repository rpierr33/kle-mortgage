"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const t = useTranslations("Nav");

  const navLinks = [
    {
      label: t("loanPrograms"),
      href: "/loan-programs",
      key: "loanPrograms",
      children: [
        { label: t("loanConventional"), href: "/loan-programs/conventional" },
        { label: t("loanFha"), href: "/loan-programs/fha" },
        { label: t("loanVa"), href: "/loan-programs/va" },
        { label: t("loanUsda"), href: "/loan-programs/usda" },
        { label: t("loanJumbo"), href: "/loan-programs/jumbo" },
        { label: t("loanRefinance"), href: "/loan-programs/refinance" },
      ],
    },
    { label: t("calculator"), href: "/calculator", key: "calculator" },
    { label: t("about"), href: "/about", key: "about" },
    { label: t("resources"), href: "/resources", key: "resources" },
    { label: t("contact"), href: "/contact", key: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/92 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06),0_4px_32px_rgba(0,0,0,0.07)] border-b border-[#E8E0D8]/60"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative">
              <Image
                src="/kle-logo-full.png"
                alt="KLE Mortgage Financing"
                width={160}
                height={64}
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:block">
              <p className={cn(
                "text-sm font-bold leading-tight font-[family-name:var(--font-playfair)] transition-colors duration-300",
                scrolled ? "text-[#6B1C23]" : "text-white"
              )}>
                KLE Mortgage
              </p>
              <p className={cn(
                "text-xs transition-colors duration-300",
                scrolled ? "text-[#6B6056]" : "text-white/60"
              )}>Financing, LLC</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <div
                key={link.key}
                className="relative"
                onMouseEnter={() => link.children && setOpenDropdown(link.key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-md transition-all duration-200",
                    scrolled
                      ? "text-[#1A1A1A] hover:text-[#6B1C23] hover:bg-[#F8F6F3]"
                      : "text-white/85 hover:text-white hover:bg-white/10"
                  )}
                >
                  {link.label}
                  {link.children && (
                    <ChevronDown
                      className={cn(
                        "w-3 h-3 transition-transform duration-200",
                        openDropdown === link.key ? "rotate-180" : ""
                      )}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {link.children && openDropdown === link.key && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-0 mt-1.5 w-60 bg-white/96 backdrop-blur-xl rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-[#E8E0D8]/80 py-1.5 z-50 overflow-hidden"
                    >
                      {/* Gold top accent */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A]" />
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-[#1A1A1A] hover:bg-[#F8F6F3] hover:text-[#6B1C23] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA + Phone + Lang */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+13057052030"
              className={cn(
                "flex items-center gap-1.5 text-xs font-medium transition-colors duration-200 tracking-wide",
                scrolled ? "text-[#6B6056] hover:text-[#6B1C23]" : "text-white/70 hover:text-white"
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              (305) 705-2030
            </a>
            <LanguageSwitcher scrolled={scrolled} />
            <Link
              href="/apply"
              className="bg-[#6B1C23] hover:bg-[#8A2530] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 shadow-[0_2px_12px_rgba(107,28,35,0.35)] hover:shadow-[0_4px_20px_rgba(107,28,35,0.45)] hover:scale-[1.02]"
            >
              {t("applyNow")}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "lg:hidden p-2 rounded-md transition-colors",
              scrolled
                ? "text-[#1A1A1A] hover:bg-[#F0EBE3]"
                : "text-white hover:bg-white/10"
            )}
            aria-label={t("toggleNavigation")}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <X className="w-5 h-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  <Menu className="w-5 h-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white/97 backdrop-blur-xl border-t border-[#E8E0D8] shadow-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-sm font-medium text-[#1A1A1A] hover:text-[#6B1C23] hover:bg-[#F8F6F3] rounded-md transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 border-l-2 border-[#E8E0D8] pl-3 mt-1 mb-1 space-y-0.5">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block px-3 py-2 text-xs text-[#6B6056] hover:text-[#6B1C23] rounded-md transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="pt-3 pb-2 border-t border-[#E8E0D8] flex flex-col gap-2">
                <div className="flex items-center justify-between px-1">
                  <a
                    href="tel:+13057052030"
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-[#6B1C23]"
                  >
                    <Phone className="w-4 h-4" />
                    +1 (305) 705-2030
                  </a>
                  <LanguageSwitcher scrolled />
                </div>
                <Link
                  href="/apply"
                  onClick={() => setMobileOpen(false)}
                  className="bg-[#6B1C23] text-white px-5 py-3 rounded-lg text-sm font-semibold text-center shadow-[0_2px_12px_rgba(107,28,35,0.3)]"
                >
                  {t("applyNow")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
