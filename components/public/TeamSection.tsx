"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Award } from "lucide-react";
import Link from "next/link";
import type { loanOfficers } from "@/lib/db/schema";

type LoanOfficer = typeof loanOfficers.$inferSelect;

const realTeam = [
  {
    id: 1, name: "Leopold Evariste", title: "CEO & Founder",
    nmlsNumber: "", phone: "(305) 705-2030", email: "leopold@klemortgage.com",
    slug: "leopold-evariste", isFounder: true, isActive: true, displayOrder: 0,
    bio: "Founded Leo Realty Capital Investments in 1992. Brings 32+ years of South Florida market expertise to mortgage lending and investment financing.",
    photoUrl: "/team-leopold.jpg",
    specialties: ["Investment Properties", "Commercial", "Luxury"] as unknown as string[],
    languages: ["English", "Haitian Creole"] as unknown as string[],
    yearsExperience: 32,
    licenseState: ["FL"] as unknown as string[],
    linkedinUrl: null, facebookUrl: null,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 2, name: "Joanne Evariste", title: "Office Manager",
    nmlsNumber: "", phone: "(305) 705-2030", email: "joanne@klemortgage.com",
    slug: "joanne-evariste", isFounder: false, isActive: true, displayOrder: 1,
    bio: "The backbone of operations, ensuring every mortgage transaction runs smoothly from application to clear-to-close.",
    photoUrl: "/team-joanne.jpg",
    specialties: ["Operations", "Client Relations", "Transaction Coordination"] as unknown as string[],
    languages: ["English"] as unknown as string[],
    yearsExperience: 15,
    licenseState: ["FL"] as unknown as string[],
    linkedinUrl: null, facebookUrl: null,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 3, name: "Jean Samuel Luxama", title: "Realtor & Loan Originator",
    nmlsNumber: "", phone: "(305) 705-2030", email: "jsluxama@klemortgage.com",
    slug: "jean-samuel-luxama", isFounder: false, isActive: true, displayOrder: 2,
    bio: "Dual-licensed Realtor and Loan Originator providing seamless service from property search to closing.",
    photoUrl: "/team-jean-samuel.jpg",
    specialties: ["FHA Loans", "First-Time Buyers", "Hometown Heroes"] as unknown as string[],
    languages: ["English", "Haitian Creole"] as unknown as string[],
    yearsExperience: 8,
    licenseState: ["FL"] as unknown as string[],
    linkedinUrl: null, facebookUrl: null,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 4, name: "Olivier Desire", title: "Loan Originator",
    nmlsNumber: "", phone: "(305) 705-2030", email: "olivier@klemortgage.com",
    slug: "olivier-desire", isFounder: false, isActive: true, displayOrder: 3,
    bio: "Specializes in investment property financing and complex mortgage scenarios including DSCR and USDA programs.",
    photoUrl: "/team-olivier.jpg",
    specialties: ["DSCR Loans", "USDA Loans", "Investment Properties"] as unknown as string[],
    languages: ["English", "Haitian Creole"] as unknown as string[],
    yearsExperience: 10,
    licenseState: ["FL"] as unknown as string[],
    linkedinUrl: null, facebookUrl: null,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 5, name: "Daniel Calixte", title: "Loan Originator",
    nmlsNumber: "", phone: "(305) 705-2030", email: "daniel@klemortgage.com",
    slug: "daniel-calixte", isFounder: false, isActive: true, displayOrder: 4,
    bio: "Deep expertise in VA and FHA loan programs, dedicated to making mortgages stress-free for every client.",
    photoUrl: "/team-daniel.jpg",
    specialties: ["VA Loans", "FHA Loans", "Refinancing"] as unknown as string[],
    languages: ["English", "Haitian Creole"] as unknown as string[],
    yearsExperience: 7,
    licenseState: ["FL"] as unknown as string[],
    linkedinUrl: null, facebookUrl: null,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 6, name: "Carly Cadet", title: "Realtor Associate",
    nmlsNumber: "", phone: "(305) 705-2030", email: "carly@klemortgage.com",
    slug: "carly-cadet", isFounder: false, isActive: true, displayOrder: 5,
    bio: "Energy and market knowledge for every client relationship, specializing in residential homes and condos.",
    photoUrl: "/team-carly.jpg",
    specialties: ["Residential Homes", "Condominiums", "Rentals"] as unknown as string[],
    languages: ["English"] as unknown as string[],
    yearsExperience: 5,
    licenseState: ["FL"] as unknown as string[],
    linkedinUrl: null, facebookUrl: null,
    createdAt: new Date(), updatedAt: new Date(),
  },
];

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

interface Props {
  officers: LoanOfficer[];
}

export function TeamSection({ officers: _officers }: Props) {
  const displayOfficers = realTeam;

  return (
    <section className="py-28 bg-[#F8F6F3] relative overflow-hidden">
      {/* Warm tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-[#FDF9F6]/40 to-white/0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#C9A345] rounded-full" />
            <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">Our Team</span>
            <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-[#C9A345] rounded-full" />
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4">
            Meet Your{" "}
            <span className="text-[#6B1C23] italic">Loan Officers</span>
          </h2>
          <p className="text-[#6B6056] text-base max-w-md mx-auto leading-relaxed">
            Experienced, licensed professionals dedicated to finding the right
            loan for your unique situation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayOfficers.map((officer, idx) => {
            const specialties = Array.isArray(officer.specialties) ? officer.specialties as string[] : [];
            return (
              <motion.div
                key={officer.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group bg-white rounded-2xl border border-[#E8E0D8] hover:border-[#C9A345]/30 overflow-hidden hover:shadow-[0_12px_48px_rgba(0,0,0,0.1)] transition-all duration-300"
              >
                {/* Avatar header */}
                <div className="relative aspect-[4/5] bg-gradient-to-br from-[#6B1C23] via-[#7A1E26] to-[#4A1218] flex items-center justify-center overflow-hidden">
                  {/* Subtle pattern */}
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "radial-gradient(circle at 70% 30%, #C9A345 0%, transparent 60%)",
                    }}
                  />
                  {officer.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={officer.photoUrl}
                      alt={officer.name}
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="relative w-20 h-20 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold font-[family-name:var(--font-cormorant)]">
                        {getInitials(officer.name)}
                      </span>
                    </div>
                  )}
                  {officer.isFounder && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] text-[#1A1A1A] text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Award className="w-3 h-3" /> Founder
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-[#1A1A1A] mb-0.5 font-[family-name:var(--font-cormorant)] group-hover:text-[#6B1C23] transition-colors">
                    {officer.name}
                  </h3>
                  <p className="text-xs text-[#C9A345] font-semibold mb-1 tracking-wide">{officer.title}</p>
                  {officer.nmlsNumber && (
                    <p className="text-xs text-[#6B6056] mb-3">NMLS #{officer.nmlsNumber}</p>
                  )}

                  <p className="text-xs text-[#6B6056] leading-relaxed mb-4 line-clamp-2">
                    {officer.bio}
                  </p>

                  {/* Specialties */}
                  {specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {specialties.slice(0, 2).map((s) => (
                        <span key={s} className="text-xs bg-[#F8F6F3] text-[#6B6056] px-2 py-0.5 rounded-full border border-[#E8E0D8]">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Contact */}
                  <div className="space-y-1.5 pt-3 border-t border-[#E8E0D8]">
                    <a
                      href={`tel:${officer.phone}`}
                      className="flex items-center gap-2 text-xs text-[#6B6056] hover:text-[#6B1C23] transition-colors"
                    >
                      <Phone className="w-3 h-3 text-[#6B1C23]" />
                      {officer.phone}
                    </a>
                    <a
                      href={`mailto:${officer.email}`}
                      className="flex items-center gap-2 text-xs text-[#6B6056] hover:text-[#6B1C23] transition-colors truncate"
                    >
                      <Mail className="w-3 h-3 text-[#6B1C23]" />
                      {officer.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/about#team"
            className="inline-flex items-center gap-2 text-[#6B1C23] font-semibold text-sm hover:gap-3 transition-all duration-200"
          >
            Meet the Full Team →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
