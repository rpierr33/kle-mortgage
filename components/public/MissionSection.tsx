import { Heart, Target, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Family First",
    description: "Every decision we make is guided by what's best for the families we serve. We're not just closing loans — we're building futures.",
  },
  {
    icon: Target,
    title: "Transparency",
    description: "No hidden fees. No confusing jargon. We explain every number, every term, and every option so you can make informed decisions with confidence.",
  },
  {
    icon: Lightbulb,
    title: "Education",
    description: "We believe informed buyers make better decisions. Our team takes time to educate every client, from first-time buyers to seasoned investors.",
  },
];

export function MissionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="inline-block text-[#6B1C23] text-sm font-semibold uppercase tracking-widest mb-3">
              Our Mission
            </span>
            <h2 className="text-4xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-playfair)]">
              Making Homeownership Accessible to All
            </h2>
            <p className="text-[#6B6056] leading-relaxed mb-5">
              KLE Mortgage Financing was founded by Kimberly Lewis-Edwards with
              a vision to bridge the homeownership gap in underserved
              communities. We saw families who had the income to afford a home
              but lacked the guidance to navigate the mortgage process.
            </p>
            <p className="text-[#6B6056] leading-relaxed">
              Today, we serve clients across Georgia, Florida, and Texas,
              offering the same white-glove service regardless of loan amount.
              Whether you're buying a $150,000 starter home or a $1.5M estate,
              you deserve expert guidance.
            </p>
          </div>
          <div className="bg-[#F8F6F3] rounded-2xl p-8 border border-[#E8E0D8]">
            <h3 className="text-xl font-bold text-[#1A1A1A] mb-6 font-[family-name:var(--font-playfair)]">
              By the Numbers
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "500+", label: "Families Served" },
                { value: "$150M+", label: "Loans Funded" },
                { value: "15+", label: "Years Experience" },
                { value: "4.9", label: "Average Rating" },
                { value: "28", label: "Avg Days to Close" },
                { value: "3", label: "States Licensed" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-white rounded-lg border border-[#E8E0D8]">
                  <p className="text-3xl font-bold text-[#6B1C23] font-[family-name:var(--font-playfair)]">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#6B6056] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-10 text-center font-[family-name:var(--font-playfair)]">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map(({ icon: Icon, title, description }) => (
              <div key={title} className="text-center p-8 bg-[#F8F6F3] rounded-xl border border-[#E8E0D8]">
                <div className="w-14 h-14 bg-[#6B1C23] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-[#1A1A1A] text-lg mb-3 font-[family-name:var(--font-playfair)]">
                  {title}
                </h3>
                <p className="text-sm text-[#6B6056] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Licensing */}
        <div className="mt-16 bg-[#1A1A1A] rounded-2xl p-8 text-white">
          <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-playfair)]">
            Licensing & Compliance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-[#C9A345] font-semibold text-sm mb-1">NMLS Company</p>
              <p className="text-white/80 text-sm">KLE Mortgage Financing, LLC — NMLS #123456</p>
            </div>
            <div>
              <p className="text-[#C9A345] font-semibold text-sm mb-1">Licensed In</p>
              <p className="text-white/80 text-sm">Georgia (GA), Florida (FL), Texas (TX)</p>
            </div>
            <div>
              <p className="text-[#C9A345] font-semibold text-sm mb-1">Equal Housing</p>
              <p className="text-white/80 text-sm">Equal Housing Lender. We comply with all fair lending laws.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
