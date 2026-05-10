import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ArrowRight, MapPin, DollarSign, Award, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { NEIGHBORHOODS, getNeighborhoodBySlug } from "@/lib/neighborhoods";
import { siteMetadata } from "@/lib/seo";

// 7 main mortgage programs for the City × Program matrix.
// 9 neighborhoods × 7 programs = 63 long-tail SEO pages.
const MATRIX_PROGRAMS = [
  "fha", "va", "usda", "conventional", "jumbo", "refinance", "first-time-buyer",
] as const;

type MatrixProgram = (typeof MATRIX_PROGRAMS)[number];

function isMatrixProgram(s: string): s is MatrixProgram {
  return (MATRIX_PROGRAMS as readonly string[]).includes(s);
}

export function generateStaticParams() {
  return NEIGHBORHOODS.flatMap((n) =>
    MATRIX_PROGRAMS.map((program) => ({ slug: n.slug, program })),
  );
}

type Props = { params: Promise<{ locale: string; slug: string; program: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug, program } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n || !isMatrixProgram(program)) return { title: "Not Found" };

  const tProg = await getTranslations({ locale, namespace: "LoanProgramsIndex" });
  const tCity = await getTranslations({ locale, namespace: "CityProgram" });
  type ProgKey = `programs.${MatrixProgram}.name`;
  const programName = tProg(`programs.${program}.name` as ProgKey);
  const title = tCity("titleTemplate", { program: programName, city: n.name });
  const description = tCity("introTemplate", { program: programName, city: n.name });

  return siteMetadata({
    path: `/neighborhoods/${slug}/${program}`,
    title,
    description: description.slice(0, 155).trim(),
  });
}

function safeJson(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default async function CityProgramPage({ params }: Props) {
  const { locale, slug, program } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n || !isMatrixProgram(program)) notFound();

  const tProg = await getTranslations({ locale, namespace: "LoanProgramsIndex" });
  const tCity = await getTranslations({ locale, namespace: "CityProgram" });
  type ProgKey<S extends string> = `programs.${MatrixProgram}.${S}`;
  const programName = tProg(`programs.${program}.name` as ProgKey<"name">);
  const programDesc = tProg(`programs.${program}.description` as ProgKey<"description">);
  const programFeatures = [
    tProg(`programs.${program}.f1` as ProgKey<"f1">),
    tProg(`programs.${program}.f2` as ProgKey<"f2">),
    tProg(`programs.${program}.f3` as ProgKey<"f3">),
    tProg(`programs.${program}.f4` as ProgKey<"f4">),
    tProg(`programs.${program}.f5` as ProgKey<"f5">),
  ];

  // Combined Place + FinancialProduct schema for the city × program intersection
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "FinancialProduct",
      name: `${programName} — ${n.name}, FL`,
      description: programDesc,
      url: `https://klemortgage.com/neighborhoods/${slug}/${program}`,
      areaServed: {
        "@type": "Place",
        name: `${n.name}, ${n.state}`,
        geo: { "@type": "GeoCoordinates", latitude: n.lat, longitude: n.lng },
      },
      provider: { "@id": "https://klemortgage.com#organization" },
      category: "Mortgage Loan",
    },
    {
      "@context": "https://schema.org",
      "@type": "Place",
      name: `${n.name}, ${n.state}`,
      geo: { "@type": "GeoCoordinates", latitude: n.lat, longitude: n.lng },
      containedInPlace: { "@type": "AdministrativeArea", name: n.county },
    },
  ];

  const otherPrograms = MATRIX_PROGRAMS.filter((p) => p !== program).slice(0, 4);
  const otherCities = NEIGHBORHOODS.filter((x) => x.slug !== slug).slice(0, 4);

  return (
    <>
      <script type="application/ld+json">{safeJson(schemas)}</script>

      {/* Hero */}
      <section className="relative bg-[#0D0608] pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A0407] via-[#0D0608] to-[#0A0406]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A345]/30 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[#C9A345] text-sm font-semibold tracking-wider uppercase mb-4">
            <MapPin className="w-4 h-4" />
            {programName} · {n.county}
          </div>
          <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium text-white leading-tight mb-5">
            <span className="text-[#C9A345] italic">{programName}</span>{" "}
            in {n.name}, {n.state}
          </h1>
          <p className="text-white/65 text-lg max-w-3xl leading-relaxed">
            {tCity("introTemplate", { program: programName, city: n.name })}
          </p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="py-10 bg-[#1A1A1A] border-y border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-9 h-9 rounded-full bg-[#C9A345]/15 flex items-center justify-center mx-auto mb-2">
                <DollarSign className="w-4 h-4 text-[#C9A345]" />
              </div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                Avg {n.name} Home Price
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-[#C9A345]">
                {n.avgHomePrice}
              </p>
            </div>
            <div className="text-center">
              <div className="w-9 h-9 rounded-full bg-[#C9A345]/15 flex items-center justify-center mx-auto mb-2">
                <Award className="w-4 h-4 text-[#C9A345]" />
              </div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                FHA Loan Limit ({n.county.replace(" County", "")})
              </p>
              <p className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-[#C9A345]">
                {n.fhaLoanLimit}
              </p>
            </div>
            <div className="text-center">
              <div className="w-9 h-9 rounded-full bg-[#C9A345]/15 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-4 h-4 text-[#C9A345]" />
              </div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">
                Top Programs Here
              </p>
              <p className="text-white text-sm font-medium">
                {n.topPrograms.slice(0, 3).join(" · ")}
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
              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#1A1A1A] mb-5">
                {tCity("marketContextHeading", { city: n.name })}
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed mb-6">{n.description}</p>
              <p className="text-[#374151] text-base leading-relaxed mb-10">
                <strong className="text-[#1A1A1A]">Hometown Heroes in {n.name}:</strong>{" "}
                {n.hometownHeroesNote}
              </p>

              <h2 className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-[#1A1A1A] mb-5">
                {tCity("programOverviewHeading", { program: programName })}
              </h2>
              <p className="text-[#374151] text-base leading-relaxed mb-6">{programDesc}</p>

              <h3 className="font-[family-name:var(--font-cormorant)] text-2xl font-bold text-[#1A1A1A] mb-4">
                {tCity("eligibilityHeading")}
              </h3>
              <ul className="space-y-3 mb-10">
                {programFeatures.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[#374151] leading-relaxed"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#6B1C23] flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="bg-white border border-[#E8E0D8] rounded-2xl p-6">
                <h3 className="font-[family-name:var(--font-cormorant)] text-lg font-bold text-[#1A1A1A] mb-3">
                  {tCity("relatedHeading")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {otherPrograms.map((p) => (
                    <Link
                      key={p}
                      href={`/neighborhoods/${slug}/${p}`}
                      className="text-sm text-[#1A1A1A] hover:text-[#6B1C23] transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-[#C9A345] group-hover:translate-x-0.5 transition-transform" />
                      {tProg(`programs.${p}.name` as ProgKey<"name">)} in {n.name}
                    </Link>
                  ))}
                  {otherCities.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/neighborhoods/${c.slug}/${program}`}
                      className="text-sm text-[#1A1A1A] hover:text-[#6B1C23] transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 text-[#C9A345] group-hover:translate-x-0.5 transition-transform" />
                      {programName} in {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-[#6B1C23] to-[#4A1218] rounded-2xl p-6 text-white shadow-[0_8px_32px_rgba(107,28,35,0.25)]">
                <h3 className="font-[family-name:var(--font-cormorant)] text-xl font-bold mb-3">
                  {tCity("ctaHeading", { program: programName, city: n.name })}
                </h3>
                <p className="text-white/75 text-sm mb-5 leading-relaxed">
                  {tCity("ctaBody", { program: programName, city: n.name })}
                </p>
                <Link
                  href="/apply"
                  className="block text-center bg-[#C9A345] text-[#1A0407] font-bold text-sm px-6 py-3.5 rounded-lg hover:bg-[#E8C97A] transition-colors mb-3"
                >
                  {tCity("ctaPrimary")}
                </Link>
                <Link
                  href="/calculator"
                  className="block text-center border border-white/25 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {tCity("ctaCalc")}
                </Link>
                <div className="mt-5 pt-5 border-t border-white/10 text-xs text-white/50">
                  KLE Mortgage Financing, LLC · NMLS #2380070 · Equal Housing Lender · Licensed in Florida
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
