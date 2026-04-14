import { Phone, Mail, Award } from "lucide-react";
import type { loanOfficers } from "@/lib/db/schema";

type LoanOfficer = typeof loanOfficers.$inferSelect;

const fallbackOfficers: LoanOfficer[] = [
  {
    id: 1, name: "Kimberly Lewis-Edwards", title: "Senior Loan Officer / Founder",
    nmlsNumber: "123456", phone: "(404) 555-1234", email: "kle@klemortgage.com",
    slug: "kimberly-lewis-edwards", isFounder: true, isActive: true, displayOrder: 0,
    bio: "With 15+ years in mortgage lending, Kimberly founded KLE Mortgage with a single mission: make homeownership accessible to every family. She has personally helped over 300 families achieve their dreams.",
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
    bio: "Marcus specializes in VA loans and has helped over 200 veterans and active-duty service members achieve homeownership. His attention to detail and speed are unmatched.",
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
    bio: "Angela's passion is guiding first-time homebuyers through the process with patience, education, and unwavering support. She believes no question is too small.",
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

export function TeamGrid({ officers }: Props) {
  const displayOfficers = officers.length > 0 ? officers : fallbackOfficers;

  return (
    <section className="py-20 bg-[#F8F6F3]" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#1A1A1A] mb-4 font-[family-name:var(--font-playfair)]">
            Our Loan Officers
          </h2>
          <p className="text-[#6B6056] max-w-xl mx-auto">
            Each officer is licensed, experienced, and dedicated to finding the
            best solution for your unique situation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayOfficers.map((officer) => {
            const specialties = Array.isArray(officer.specialties) ? officer.specialties as string[] : [];
            const languages = Array.isArray(officer.languages) ? officer.languages as string[] : [];
            const licenseStates = Array.isArray(officer.licenseState) ? officer.licenseState as string[] : [];

            return (
              <div
                key={officer.id}
                className="bg-white rounded-xl border border-[#E8E0D8] p-6 flex gap-6"
              >
                {/* Avatar */}
                <div className="w-20 h-20 rounded-xl bg-[#6B1C23] flex items-center justify-center flex-shrink-0">
                  {officer.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={officer.photoUrl}
                      alt={officer.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <span className="text-white text-xl font-bold font-[family-name:var(--font-playfair)]">
                      {getInitials(officer.name)}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className="font-bold text-[#1A1A1A]">{officer.name}</h3>
                      <p className="text-xs text-[#C9A345] font-semibold">{officer.title}</p>
                    </div>
                    {officer.isFounder && (
                      <span className="flex items-center gap-1 text-xs bg-[#6B1C23] text-white px-2 py-0.5 rounded-full flex-shrink-0">
                        <Award className="w-3 h-3" /> Founder
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#6B6056] mb-2">NMLS #{officer.nmlsNumber} | {officer.yearsExperience} yrs experience</p>
                  <p className="text-sm text-[#6B6056] leading-relaxed mb-3">{officer.bio}</p>

                  {/* Details */}
                  <div className="flex flex-wrap gap-3 mb-3">
                    {specialties.slice(0, 3).map((s) => (
                      <span key={s} className="text-xs bg-[#F8F6F3] border border-[#E8E0D8] text-[#6B6056] px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>

                  {languages.length > 0 && (
                    <p className="text-xs text-[#6B6056] mb-2">
                      Languages: {languages.join(", ")}
                    </p>
                  )}

                  {licenseStates.length > 0 && (
                    <p className="text-xs text-[#6B6056] mb-3">
                      Licensed in: {licenseStates.join(", ")}
                    </p>
                  )}

                  <div className="flex gap-4">
                    <a
                      href={`tel:${officer.phone}`}
                      className="flex items-center gap-1.5 text-xs text-[#6B1C23] hover:underline"
                    >
                      <Phone className="w-3 h-3" />
                      {officer.phone}
                    </a>
                    <a
                      href={`mailto:${officer.email}`}
                      className="flex items-center gap-1.5 text-xs text-[#6B1C23] hover:underline truncate"
                    >
                      <Mail className="w-3 h-3" />
                      {officer.email}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
