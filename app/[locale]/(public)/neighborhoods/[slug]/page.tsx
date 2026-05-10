import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, DollarSign, TrendingUp, Award } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NEIGHBORHOODS, getNeighborhoodBySlug } from "@/lib/neighborhoods";
import { siteMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ slug: n.slug }));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) return { title: "Neighborhood Not Found" };
  return siteMetadata({
    path: `/neighborhoods/${n.slug}`,
    title: `Mortgage Loans in ${n.name}, FL — FHA · VA · Hometown Heroes | KLE Mortgage`,
    description: `${n.description.slice(0, 150).trim()}...`,
  });
}

function safeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default async function NeighborhoodPage({ params }: Props) {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) notFound();

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `${n.name}, ${n.state}`,
    description: n.description,
    geo: {
      "@type": "GeoCoordinates",
      latitude: n.lat,
      longitude: n.lng,
    },
    containedInPlace: {
      "@type": "AdministrativeArea",
      name: n.county,
    },
  };

  return (
    <>
      <script type="application/ld+json">{safeJson(placeSchema)}</script>

      {/* Hero */}
      <section className="relative bg-[#0D0608] pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A0407] via-[#0D0608] to-[#0A0406]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[#C9A345] text-sm font-semibold tracking-wider uppercase mb-4">
            <MapPin className="w-4 h-4" />
            Mortgage Loans · {n.county}
          </div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.8rem,6vw,5rem)] font-medium text-white leading-tight mb-5">
            Mortgage Loans in{" "}
            <span className="text-[#C9A345] italic">
              {n.name}, {n.state}
            </span>
          </h1>
          <p className="text-white/65 text-xl max-w-3xl leading-relaxed">{n.vibe}</p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="py-12 bg-[#1A1A1A] border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[#C9A345]/15 flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-5 h-5 text-[#C9A345]" />
              </div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                Avg Home Price
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[#C9A345]">
                {n.avgHomePrice}
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-[#C9A345]/15 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-5 h-5 text-[#C9A345]" />
              </div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                FHA Loan Limit
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[#C9A345]">
                {n.fhaLoanLimit}
              </p>
            </div>
            <div className="text-center col-span-2">
              <div className="w-10 h-10 rounded-full bg-[#C9A345]/15 flex items-center justify-center mx-auto mb-2">
                <Award className="w-5 h-5 text-[#C9A345]" />
              </div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                Top Programs
              </p>
              <p className="text-white text-sm font-medium">
                {n.topPrograms.join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 md:py-24 bg-[#F8F6F3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#1A1A1A] mb-6">
                Mortgage financing in {n.name}
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed mb-10">
                {n.description}
              </p>

              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#1A1A1A] mb-5">
                What KLE Mortgage clients in {n.name} should know
              </h3>
              <ul className="space-y-3 mb-10">
                {n.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 text-[#374151] leading-relaxed"
                  >
                    <span className="block w-2 h-2 rounded-full bg-[#C9A345] flex-shrink-0 mt-2" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="bg-white border border-[#E8E0D8] rounded-2xl p-6 mb-10">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-5 h-5 text-[#C9A345]" />
                  <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold text-[#1A1A1A]">
                    Hometown Heroes in {n.name}
                  </h3>
                </div>
                <p className="text-[#6B6056] leading-relaxed">{n.hometownHeroesNote}</p>
              </div>

              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#1A1A1A] mb-5">
                ZIP codes served
              </h3>
              <div className="flex flex-wrap gap-2">
                {n.zipCodes.map((z) => (
                  <span
                    key={z}
                    className="bg-white border border-[#E8E0D8] text-[#1A1A1A] text-sm font-semibold px-4 py-1.5 rounded-full"
                  >
                    {z}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-[#6B1C23] to-[#4A1218] rounded-2xl p-6 text-white shadow-[0_8px_32px_rgba(107,28,35,0.25)]">
                <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold mb-3">
                  Pre-approve for {n.name}
                </h3>
                <p className="text-white/75 text-sm mb-5 leading-relaxed">
                  Tell us about your situation. A KLE loan officer reviews your
                  scenario, runs FHA / Conventional / Hometown Heroes
                  eligibility for {n.name}, and gets back to you within one
                  business hour.
                </p>
                <Link
                  href="/apply"
                  className="block text-center bg-[#C9A345] text-[#1A0407] font-bold text-sm px-6 py-3.5 rounded-lg hover:bg-[#E8C97A] transition-colors mb-3"
                >
                  Start Pre-Approval
                </Link>
                <Link
                  href="/calculator"
                  className="block text-center border border-white/25 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Estimate Payment
                </Link>
                <div className="mt-5 pt-5 border-t border-white/10 text-xs text-white/50">
                  KLE Mortgage Financing, LLC · NMLS #2380070 · Equal Housing Lender · Licensed in Florida
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E0D8] p-6 mt-6">
                <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-[#1A1A1A] mb-4">
                  Other South Florida cities
                </h3>
                <ul className="space-y-2.5">
                  {NEIGHBORHOODS.filter((x) => x.slug !== n.slug).slice(0, 6).map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/neighborhoods/${other.slug}`}
                        className="flex items-center justify-between gap-2 text-sm text-[#1A1A1A] hover:text-[#6B1C23] transition-colors group"
                      >
                        <span>
                          {other.name}, FL <span className="text-[#9CA3AF] text-xs">· {other.county.replace(" County", "")}</span>
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#C9A345] group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
