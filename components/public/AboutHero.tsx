import Image from "next/image";
import { Shield, Award, Users } from "lucide-react";

export function AboutHero() {
  return (
    <section className="pt-28 pb-20 bg-[#6B1C23] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-[#C9A345] to-[#E8C97A] rounded-full" />
            <span className="text-[#C9A345] text-xs font-semibold uppercase tracking-[0.15em]">
              Our Story
            </span>
          </div>
          <h1
            className="font-[family-name:var(--font-cormorant)] font-semibold text-white leading-[1.1] mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Built on Trust.
            <br />
            <span className="text-[#C9A345] italic">Driven by Purpose.</span>
          </h1>
          <p className="text-xl text-white/80 leading-relaxed mb-10">
            KLE Mortgage Financing was founded with one belief: every family
            deserves a fair shot at homeownership. We bring expertise,
            transparency, and genuine care to every loan we process.
          </p>
          <div className="flex flex-wrap gap-8">
            {[
              { icon: Shield, label: "Licensed & Regulated", sub: "NMLS #123456" },
              { icon: Award, label: "15+ Years Experience", sub: "Expert team" },
              { icon: Users, label: "500+ Families Served", sub: "And counting" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#C9A345]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-white/60 text-xs">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Real team photos — right column */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-3 gap-3">
            {[
              { src: "/team-leopold.jpg", name: "Leopold Evariste", title: "CEO" },
              { src: "/team-joanne.jpg", name: "Joanne Evariste", title: "Office Manager" },
              { src: "/team-jean-samuel.jpg", name: "Jean Samuel", title: "Loan Originator" },
              { src: "/team-olivier.jpg", name: "Olivier Desire", title: "Loan Originator" },
              { src: "/team-daniel.jpg", name: "Daniel Calixte", title: "Loan Originator" },
              { src: "/team-carly.jpg", name: "Carly Cadet", title: "Realtor" },
            ].map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-2 shadow-lg">
                  <Image
                    src={member.src}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
                <p className="text-white text-xs font-semibold leading-tight">{member.name}</p>
                <p className="text-white/50 text-[10px]">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
