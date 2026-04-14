"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingDown, ArrowRight } from "lucide-react";

/**
 * RateQuoteBanner — urgency-creating rate teaser banner below hero.
 * "Today's rates starting at 6.25%* — Get your personalized rate"
 */
export function RateQuoteBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#1A1A1A] border-b border-white/8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#C9A345]/15 flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-3.5 h-3.5 text-[#C9A345]" />
            </div>
            <p className="text-white/80 text-sm">
              <span className="font-semibold text-[#C9A345]">Today&apos;s rates starting at 6.25%*</span>
              {" "}—{" "}
              <span className="text-white/60">Get your personalized rate in minutes.</span>
            </p>
          </div>
          <Link
            href="/apply"
            className="group inline-flex items-center gap-1.5 bg-[#C9A345] hover:bg-[#E8C97A] text-[#1A1A1A] text-xs font-bold px-4 py-1.5 rounded-full transition-colors flex-shrink-0"
          >
            Get My Rate
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
        <p className="text-white/25 text-[10px] text-center mt-1">
          *Rate shown for illustrative purposes. Actual rate depends on credit, loan amount, and property. Subject to change without notice.
        </p>
      </div>
    </motion.div>
  );
}
