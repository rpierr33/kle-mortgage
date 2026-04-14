import { Shield, Award, Users } from "lucide-react";

export function AboutHero() {
  return (
    <section className="pt-28 pb-20 bg-[#6B1C23] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block text-[#C9A345] text-sm font-semibold uppercase tracking-widest mb-4">
            Our Story
          </span>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)]">
            Built on Trust.
            <br />
            Driven by Purpose.
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
      </div>
    </section>
  );
}
