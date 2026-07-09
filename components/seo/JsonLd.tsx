// JSON-LD schema for KLE Mortgage Financing, LLC.
// MortgageBroker schema (NOT RealEstateAgent) — KLE is a licensed broker, NMLS #2380070.

import { NAP, SITE_URL } from "@/lib/seo";

// Escape `<`, `>`, `&` so the JSON cannot break out of the <script> tag or
// be misinterpreted as HTML. Output is structured data we control — no user
// content is ever passed in. Safer than dangerouslySetInnerHTML because
// the content is rendered as a child string, not HTML-injected.
function safeJsonForScript(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["MortgageBroker", "FinancialService", "LocalBusiness"],
  "@id": `${SITE_URL}#organization`,
  name: NAP.name,
  legalName: NAP.legalName,
  alternateName: NAP.alternateName,
  url: SITE_URL,
  logo: `${SITE_URL}/kle-logo-full-v2.png`,
  image: `${SITE_URL}/opengraph-image`,
  telephone: NAP.telephone,
  email: NAP.email,
  foundingDate: NAP.foundingDate,
  founder: { "@type": "Person", name: NAP.founder },
  identifier: [
    { "@type": "PropertyValue", propertyID: "NMLS", value: NAP.nmls },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: NAP.streetAddress,
    addressLocality: NAP.addressLocality,
    addressRegion: NAP.addressRegion,
    postalCode: NAP.postalCode,
    addressCountry: NAP.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: NAP.latitude,
    longitude: NAP.longitude,
  },
  areaServed: [
    { "@type": "State", name: "Florida" },
    { "@type": "AdministrativeArea", name: "Miami-Dade County, Florida" },
    { "@type": "AdministrativeArea", name: "Broward County, Florida" },
    { "@type": "AdministrativeArea", name: "Palm Beach County, Florida" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  knowsLanguage: ["en", "fr", "ht", "es"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mortgage Loan Programs",
    itemListElement: [
      { "@type": "Offer", name: "FHA Loans", description: "FHA-insured home loans with as little as 3.5% down and flexible credit. Ideal for first-time buyers." },
      { "@type": "Offer", name: "VA Loans", description: "Zero-down VA loans for veterans, active-duty service members, and eligible surviving spouses." },
      { "@type": "Offer", name: "USDA Loans", description: "100% financing for eligible rural and suburban Florida homebuyers meeting USDA income limits." },
      { "@type": "Offer", name: "Conventional Loans", description: "Conforming and non-conforming conventional financing with as little as 3% down for qualified buyers." },
      { "@type": "Offer", name: "Jumbo Loans", description: "Financing above conventional loan limits for higher-value Florida properties." },
      { "@type": "Offer", name: "Refinancing", description: "Rate-and-term and cash-out refinance options to lower your payment or access home equity." },
      { "@type": "Offer", name: "Hometown Heroes", description: "Florida Hometown Heroes program — up to $35,000 in down payment and closing cost assistance for teachers, nurses, law enforcement, firefighters, and other eligible professionals." },
      { "@type": "Offer", name: "First-Time Buyer", description: "Combined low down payment programs and homebuyer education tailored to first-time Florida homebuyers." },
    ],
  },
  knowsAbout: [
    "FHA loan",
    "VA loan",
    "USDA loan",
    "Conventional loan",
    "Jumbo loan",
    "Hometown Heroes Florida",
    "first-time homebuyer",
    "mortgage refinance",
    "DSCR loan",
    "down payment assistance",
  ],
  parentOrganization: {
    "@type": "RealEstateAgent",
    name: "Leo Realty Capital Investments",
    url: "https://leorealtycapitalinvestments.com",
  },
  sameAs: [],
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  url: SITE_URL,
  name: NAP.name,
  publisher: { "@id": `${SITE_URL}#organization` },
  inLanguage: ["en", "fr", "ht", "es"],
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/loan-programs?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export function OrganizationJsonLd() {
  return (
    <script type="application/ld+json">
      {safeJsonForScript([ORG_SCHEMA, WEBSITE_SCHEMA])}
    </script>
  );
}

type FaqItem = { question: string; answer: string };

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
  return (
    <script type="application/ld+json">{safeJsonForScript(schema)}</script>
  );
}

type BreadcrumbItem = { name: string; url: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.url,
    })),
  };
  return (
    <script type="application/ld+json">{safeJsonForScript(schema)}</script>
  );
}

type LoanProgramSchema = {
  name: string;
  description: string;
  url: string;
  minDownPayment?: string;
  minCreditScore?: number;
};

export function LoanProgramJsonLd({ program }: { program: LoanProgramSchema }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: program.name,
    description: program.description,
    url: program.url,
    provider: { "@id": `${SITE_URL}#organization` },
    category: "Mortgage Loan",
    ...(program.minDownPayment
      ? {
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Minimum Down Payment",
              value: program.minDownPayment,
            },
            ...(program.minCreditScore
              ? [
                  {
                    "@type": "PropertyValue",
                    name: "Minimum Credit Score",
                    value: program.minCreditScore,
                  },
                ]
              : []),
          ],
        }
      : {}),
  };
  return (
    <script type="application/ld+json">{safeJsonForScript(schema)}</script>
  );
}
