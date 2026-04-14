"use client";

import { motion } from "framer-motion";
import { ApplicationForm } from "@/components/public/ApplicationForm";
import { Shield, Clock, CheckCircle2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ApplyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-20 bg-[#6B1C23] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#C9A345]/70 rounded-full" />
                <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                  Start Today
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#C9A345]/70 rounded-full" />
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-cormorant)] font-semibold text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              Apply for a{" "}
              <span className="text-[#C9A345] italic">Home Loan</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-white/75 max-w-xl mx-auto mb-10 leading-relaxed"
            >
              Complete our simple application in about 10 minutes. No credit
              pull required for pre-qualification.
            </motion.p>

            {/* Trust row */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-xs"
            >
              {[
                { icon: Shield, label: "No credit pull to start" },
                { icon: Clock, label: "10-minute application" },
                { icon: CheckCircle2, label: "Pre-approval in 24hrs" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-[#C9A345]" />
                  {label}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Form section */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ApplicationForm />
      </motion.div>
    </>
  );
}
