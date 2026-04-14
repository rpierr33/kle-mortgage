"use client";

import { motion } from "framer-motion";
import { Phone, Mail, Award } from "lucide-react";
import Link from "next/link";
import type { loanOfficers } from "@/lib/db/schema";

type LoanOfficer = typeof loanOfficers.$inferSelect;

const fallbackOfficers = [
  {
    id: 1, name: "Kimberly Lewis-Edwards", title: "Senior Loan Officer / Founder",
    nmlsNumber: "123456", phone: "(404) 555-1234", email: "kle@klemortgage.com",
    slug: "kimberly-lewis-edwards", isFounder: true, isActive: true, displayOrder: 0,
    bio: "With 15+ years in mortgage lending, Kimberly founded KLE Mortgage with a single mission: make homeownership accessible to every family.",
    photoUrl: null,
    specialties: ["FHA", "VA", "First-Time Buyers"] as unknown as string[],
    languages: ["English", "Spanish"] as unknown as string[],
    yearsExperience: 15,
    licenseState: ["GA", "FL", "TX"] as unknown as string[],
    linkedinUrl: null, facebookUrl: null,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 2, name: "Marcus Thompson", title: "Loan Officer",
    nmlsNumber: "234567", phone: "(404) 555-2345", email: "mthompson@klemortgage.com",
    slug: "marcus-thompson", isFounder: false, isActive: true, displayOrder: 1,
    bio: "Marcus specializes in VA loans and has helped over 200 veterans and active-duty service members achieve homeownership.",
    photoUrl: null,
    specialties: ["VA Loans", "Conventional", "Refinance"] as unknown as string[],
    languages: ["English"] as unknown as string[],
    yearsExperience: 8,
    licenseState: ["GA", "TX"] as unknown as string[],
    linkedinUrl: null, facebookUrl: null,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 3, name: "Angela Roberts", title: "Loan Officer",
    nmlsNumber: "345678", phone: "(404) 555-3456", email: "aroberts@klemortgage.com",
    slug: "angela-roberts", isFounder: false, isActive: true, displayOrder: 2,
    bio: "Angela's passion is guiding first-time homebuyers through the process with patience, education, and unwavering support.",
    photoUrl: null,
    specialties: ["FHA", "USDA", "First-Time Buyers"] as unknown as string[],
    languages: ["English"] as unknown as string[],
    yearsExperience: 6,
    licenseState: ["GA", "FL"] as unknown as string[],
    linkedinUrl: null, facebookUrl: null,
    createdAt: new Date(), updatedAt: new Date(),
  },
  {
    id: 4, name: "David Chen", title: "Loan Officer",
    nmlsNumber: "456789", phone: "(404) 555-4567", email: "dchen@klemortgage.com",
    slug: "david-chen", isFounder: false, isActive: true, displayOrder: 3,
    bio: "David brings expertise in jumbo loans and investment properties, helping high-net-worth clients maximize their real estate portfolios.",
    photoUrl: null,
    specialties: ["Jumbo Loans", "Conventional", "Investment Properties"] as unknown as string[],
    languages: ["English", "Mandarin"] as unknown as string[],
    yearsExperience: 10,
    licenseState: ["GA", "FL", "TX"] as unknown as string[],
    linkedinUrl: null, facebookUrl: null,
    createdAt: new Date(), updatedAt: new Date(),
  },
];

const getInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

interface Props {
  officers: LoanOfficer[];
}

export function TeamSection({ officers }: Props) {
  const displayOfficers = officers.length > 0 ? officers : fallbackOfficers;

  return (
    <section className="py-24 bg-[#F8F6F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-[#6B1C23] text-sm font-semibold uppercase tracking-widest mb-3">
            Our Team
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-[#1A1A1A] mb-4 font-[family-name:var(--font-playfair)]">
            Meet Your Loan Officers
          </h2>
          <p className="text-lg text-[#6B6056] max-w-xl mx-auto">
            Experienced, licensed professionals dedicated to finding the right
            loan for your unique situation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayOfficers.map((officer, idx) => {
            const specialties = Array.isArray(officer.specialties) ? officer.specialties as string[] : [];
            return (
              <motion.div
                key={officer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white rounded-xl border border-[#E8E0D8] overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Avatar */}
                <div className="bg-[#6B1C23] h-32 flex items-center justify-center relative">
                  {officer.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={officer.photoUrl}
                      alt={officer.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold font-[family-name:var(--font-playfair)]">
                        {getInitials(officer.name)}
                      </span>
                    </div>
                  )}
                  {officer.isFounder && (
                    <div className="absolute top-3 right-3 bg-[#C9A345] text-white text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Award className="w-3 h-3" /> Founder
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-[#1A1A1A] mb-0.5">{officer.name}</h3>
                  <p className="text-xs text-[#C9A345] font-semibold mb-1">{officer.title}</p>
                  <p className="text-xs text-[#6B6056] mb-3">NMLS #{officer.nmlsNumber}</p>

                  <p className="text-xs text-[#6B6056] leading-relaxed mb-4 line-clamp-2">
                    {officer.bio}
                  </p>

                  {/* Specialties */}
                  {specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {specialties.slice(0, 2).map((s) => (
                        <span key={s} className="text-xs bg-[#F8F6F3] text-[#6B6056] px-2 py-0.5 rounded-full">
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

        <div className="text-center mt-10">
          <Link
            href="/about#team"
            className="inline-flex items-center gap-2 text-[#6B1C23] font-semibold hover:underline"
          >
            Meet the Full Team →
          </Link>
        </div>
      </div>
    </section>
  );
}
