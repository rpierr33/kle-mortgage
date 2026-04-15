import Image from "next/image";
import type { loanOfficers } from "@/lib/db/schema";

type LoanOfficer = typeof loanOfficers.$inferSelect;

const realTeam = [
  { name: "Leopold Evariste", title: "CEO & Founder", photo: "/team-leopold.jpg", specialties: ["Leadership", "Investment Properties", "Commercial"], yearsExperience: 32 },
  { name: "Joanne Evariste", title: "Office Manager", photo: "/team-joanne.jpg", specialties: ["Operations", "Client Relations"], yearsExperience: 15 },
  { name: "Jean Samuel Luxama", title: "Realtor & Loan Originator", photo: "/team-jean-samuel.jpg", specialties: ["FHA Loans", "First-Time Buyers", "Hometown Heroes"], yearsExperience: 8 },
  { name: "Olivier Desire", title: "Loan Originator", photo: "/team-olivier.jpg", specialties: ["DSCR Loans", "USDA Loans", "Investment Properties"], yearsExperience: 10 },
  { name: "Daniel Calixte", title: "Loan Originator", photo: "/team-daniel.jpg", specialties: ["VA Loans", "FHA Loans", "Refinancing"], yearsExperience: 7 },
  { name: "Carly Cadet", title: "Realtor Associate", photo: "/team-carly.jpg", specialties: ["Residential Homes", "Condominiums", "Rentals"], yearsExperience: 5 },
];

interface Props {
  officers: LoanOfficer[];
}

export function TeamGrid({ officers: _officers }: Props) {
  return (
    <section className="py-28" style={{ backgroundColor: "#FFFBF5" }} id="team">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: "#C9A345" }}
          >
            Our Team
          </span>
          <h2
            className="text-3xl sm:text-4xl font-medium mb-3"
            style={{ color: "#1A1A1A", fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            The People Behind Your Loan
          </h2>
          <p className="text-sm max-w-md mx-auto" style={{ color: "#6B6056" }}>
            Licensed, experienced, and dedicated to finding the best solution for you.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {realTeam.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <h3
                className="text-base font-semibold mb-0.5"
                style={{ color: "#1A1A1A", fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                {member.name}
              </h3>
              <p className="text-xs mb-2" style={{ color: "#C9A345" }}>
                {member.title} · {member.yearsExperience} yrs
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {member.specialties.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "#F5F0EB", color: "#6B6056", border: "1px solid #E8E0D8" }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
