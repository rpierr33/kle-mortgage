"use client";

import { Phone, ClipboardCheck, Calculator } from "lucide-react";
import Link from "next/link";

/**
 * FloatingContactBar — sticky bottom mobile CTA bar for KLE Mortgage.
 * Hidden on md+ screens (md:hidden). Glassmorphism background.
 * Phone: (305) 705-2030
 */
export default function FloatingContactBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Glassmorphism bar */}
      <div
        className="flex items-stretch border-t border-white/10"
        style={{
          background: "rgba(13, 6, 8, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {/* Call */}
        <a
          href="tel:+13057052030"
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-white/80 active:bg-white/10 transition-colors"
          aria-label="Call KLE Mortgage"
        >
          <Phone className="w-5 h-5 text-[#C9A345]" />
          <span className="text-[10px] font-semibold tracking-wide uppercase text-white/70">
            Call
          </span>
        </a>

        {/* Divider */}
        <div className="w-px bg-white/10 my-2" />

        {/* Get Pre-Approved */}
        <Link
          href="/apply"
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-white/80 active:bg-white/10 transition-colors"
          aria-label="Get pre-approved"
        >
          <ClipboardCheck className="w-5 h-5 text-[#C9A345]" />
          <span className="text-[10px] font-semibold tracking-wide uppercase text-white/70">
            Pre-Approve
          </span>
        </Link>

        {/* Divider */}
        <div className="w-px bg-white/10 my-2" />

        {/* Calculate */}
        <Link
          href="/calculator"
          className="flex flex-1 flex-col items-center justify-center gap-1 py-3 text-white/80 active:bg-white/10 transition-colors"
          aria-label="Mortgage calculator"
        >
          <Calculator className="w-5 h-5 text-[#C9A345]" />
          <span className="text-[10px] font-semibold tracking-wide uppercase text-white/70">
            Calculate
          </span>
        </Link>
      </div>

      {/* Safe area spacer for iOS */}
      <div
        className="bg-[#0D0608]"
        style={{ height: "env(safe-area-inset-bottom, 0px)" }}
      />
    </div>
  );
}
