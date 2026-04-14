"use client";

import { motion } from "framer-motion";
import { ContactForm } from "@/components/public/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero — maroon with gold accent */}
      <section className="pt-28 pb-20 bg-[#6B1C23] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-2xl"
          >
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
                <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
                  Get in Touch
                </span>
              </div>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-[family-name:var(--font-cormorant)] font-semibold text-white leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
            >
              Let&apos;s Talk About{" "}
              <span className="text-[#C9A345] italic">Your Next Home</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/75 leading-relaxed">
              Whether you have a question, want a rate quote, or are ready to
              start your application — we&apos;re here for you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content — split layout */}
      <section className="py-28 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left: Contact Info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="space-y-6"
            >
              {/* Info card */}
              <motion.div
                variants={fadeUp}
                className="bg-white rounded-2xl border border-[#E8E0D8] p-7 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-5 h-0.5 bg-[#C9A345] rounded-full" />
                  <h3 className="font-[family-name:var(--font-cormorant)] font-bold text-[#1A1A1A] text-xl">
                    Get in Touch
                  </h3>
                </div>
                <div className="space-y-5">
                  {[
                    {
                      icon: Phone,
                      label: "Phone",
                      content: (
                        <a href="tel:+13057052030" className="font-semibold text-[#1A1A1A] hover:text-[#6B1C23] transition-colors text-sm">
                          +1 (305) 705-2030
                        </a>
                      ),
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      content: (
                        <a href="mailto:Info@klemortgage.com" className="font-semibold text-[#1A1A1A] hover:text-[#6B1C23] transition-colors text-sm break-all">
                          Info@klemortgage.com
                        </a>
                      ),
                    },
                    {
                      icon: MapPin,
                      label: "Location",
                      content: (
                        <div className="text-sm">
                          <p className="font-semibold text-[#1A1A1A]">909 N Miami Beach Blvd, Suite 301A</p>
                          <p className="text-[#6B6056]">North Miami Beach, FL 33162</p>
                        </div>
                      ),
                    },
                    {
                      icon: Clock,
                      label: "Office Hours",
                      content: (
                        <div className="text-sm">
                          <p className="font-semibold text-[#1A1A1A]">Mon–Fri: 8AM – 7PM ET</p>
                          <p className="text-[#6B6056]">Sat: 9AM – 4PM ET</p>
                        </div>
                      ),
                    },
                  ].map(({ icon: Icon, label, content }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 bg-[#F8F6F3] rounded-xl flex items-center justify-center flex-shrink-0 border border-[#E8E0D8]">
                        <Icon className="w-4 h-4 text-[#6B1C23]" />
                      </div>
                      <div>
                        <p className="text-xs text-[#6B6056] mb-0.5 uppercase tracking-wide font-medium">{label}</p>
                        {content}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA card */}
              <motion.div
                variants={fadeUp}
                className="bg-gradient-to-br from-[#4A1218] via-[#6B1C23] to-[#8A2530] rounded-2xl p-7 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/40 to-transparent" />
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-0.5 bg-[#C9A345] rounded-full" />
                  <p className="text-[#C9A345] text-xs font-semibold uppercase tracking-wider">Skip the Wait</p>
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] font-bold text-xl text-white mb-2">
                  Ready to Apply?
                </h3>
                <p className="text-white/75 text-sm mb-5 leading-relaxed">
                  Get pre-approved in 24 hours. No credit pull for pre-qualification.
                </p>
                <a
                  href="/apply"
                  className="block bg-[#C9A345] hover:bg-[#E8C97A] text-[#1A1A1A] px-5 py-3 rounded-lg text-sm font-bold text-center transition-colors"
                >
                  Start Application
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
