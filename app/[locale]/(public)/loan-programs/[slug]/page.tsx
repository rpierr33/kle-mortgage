import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { CTASection } from "@/components/public/CTASection";
import LoanProgramDetailClient from "./LoanProgramDetailClient";
import { siteMetadata } from "@/lib/seo";

const PROGRAM_META: Record<
  string,
  { minDown: string | null; minCredit: number | null; maxLoan?: string }
> = {
  conventional: { minDown: "3%", minCredit: 620, maxLoan: "$766,550 (conforming)" },
  fha: { minDown: "3.5%", minCredit: 580, maxLoan: "Varies by county" },
  va: { minDown: "0%", minCredit: 580 },
  usda: { minDown: "0%", minCredit: 640 },
  jumbo: { minDown: "10%", minCredit: 680, maxLoan: "No standard maximum" },
  refinance: { minDown: null, minCredit: 620 },
  "first-time-buyer": { minDown: "3%", minCredit: 580 },
  "non-qm": { minDown: "10%", minCredit: 620 },
  "interest-rate-buydown": { minDown: "3%", minCredit: 620 },
  "203k": { minDown: "3.5%", minCredit: 580 },
  heloc: { minDown: null, minCredit: 640 },
  "interest-only": { minDown: "10%", minCredit: 680 },
  "fixed-rate": { minDown: "3%", minCredit: 620 },
  arm: { minDown: "5%", minCredit: 620 },
  construction: { minDown: "20%", minCredit: 680 },
  "reverse-mortgage": { minDown: null, minCredit: null },
};

const SLUG_ORDER = [
  "conventional", "fha", "va", "usda", "jumbo", "refinance", "first-time-buyer",
  "non-qm", "interest-rate-buydown", "203k", "heloc", "interest-only",
  "fixed-rate", "arm", "construction", "reverse-mortgage",
];

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!PROGRAM_META[slug]) return { title: "Loan Program Not Found" };
  const tMeta = await getTranslations({ locale, namespace: "LoanProgramsMeta" });
  const tProg = await getTranslations({ locale, namespace: "LoanProgramsIndex" });
  let title: string;
  let description: string;
  try {
    title = tMeta(`${slug}.title` as Parameters<typeof tMeta>[0]);
    description = tMeta(`${slug}.description` as Parameters<typeof tMeta>[0]);
  } catch {
    type ProgKey = `programs.${string}.${"name" | "description"}`;
    title = `${tProg(`programs.${slug}.name` as ProgKey)} | KLE Mortgage`;
    description = tProg(`programs.${slug}.description` as ProgKey);
  }
  return siteMetadata({ path: `/loan-programs/${slug}`, title, description });
}

export default async function LoanProgramDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const meta = PROGRAM_META[slug];
  if (!meta) notFound();

  const t = await getTranslations({ locale, namespace: "LoanProgramsIndex" });
  type ProgKey<S extends string> = `programs.${string}.${S}`;
  const name = t(`programs.${slug}.name` as ProgKey<"name">);
  const tagline = t(`programs.${slug}.tagline` as ProgKey<"tagline">);
  const description = t(`programs.${slug}.description` as ProgKey<"description">);
  const features = [
    t(`programs.${slug}.f1` as ProgKey<"f1">),
    t(`programs.${slug}.f2` as ProgKey<"f2">),
    t(`programs.${slug}.f3` as ProgKey<"f3">),
    t(`programs.${slug}.f4` as ProgKey<"f4">),
    t(`programs.${slug}.f5` as ProgKey<"f5">),
  ];

  const otherPrograms = SLUG_ORDER.filter((s) => s !== slug)
    .slice(0, 5)
    .map((s) => ({ slug: s, name: t(`programs.${s}.name` as ProgKey<"name">) }));

  return (
    <>
      <LoanProgramDetailClient
        slug={slug}
        name={name}
        tagline={tagline}
        description={description}
        features={features}
        minDown={meta.minDown}
        minCredit={meta.minCredit}
        maxLoan={meta.maxLoan}
        otherPrograms={otherPrograms}
      />
      <CTASection />
    </>
  );
}
