// Neighborhoods KLE Mortgage Financing serves across South Florida.
// Used for programmatic landing pages at /neighborhoods/[slug].
// Each entry targets long-tail mortgage SEO ("FHA loans [city]", "Hometown
// Heroes [city]") and gives AI engines structured local content to cite.
//
// IMPORTANT: KLE is a Florida-licensed MORTGAGE BROKER (NMLS #2380070).
// Content here is mortgage-specific (loan programs, FHA limits, Hometown
// Heroes professions in that city) — not realty content (which is leo-realty's
// territory). See feedback_kle_content_must_be_mortgage_specific.md.

export type Neighborhood = {
  slug: string;
  name: string;
  county: string;
  state: "FL";
  description: string;
  vibe: string;
  highlights: string[];
  zipCodes: string[];
  // Approximate center coordinates for Place schema
  lat: number;
  lng: number;
  // Mortgage-specific facts
  avgHomePrice: string;
  fhaLoanLimit: string;
  topPrograms: string[];
  hometownHeroesNote: string;
};

// 2026 FHA loan limits per Miami-Dade ($697,000 single-family) and Broward
// ($697,000) — Florida high-cost counties. Palm Beach also $697,000.
// Standard FHA limit elsewhere: $498,257.

export const NEIGHBORHOODS: Neighborhood[] = [
  {
    slug: "north-miami-beach",
    name: "North Miami Beach",
    county: "Miami-Dade County",
    state: "FL",
    description:
      "KLE Mortgage Financing's home base. North Miami Beach is one of the most active FHA loan markets in Miami-Dade County — accessible price points, strong rental demand for investors, and a borrower mix where FHA, Hometown Heroes, and First-Time Buyer programs all see heavy volume. Single-family homes here typically sit between $500K and $1M, condos start under $300K, putting most properties within FHA loan limits.",
    vibe: "Established, multicultural, family-driven — strong Haitian, Latin American, and Caribbean populations who often qualify for FHA and Hometown Heroes.",
    highlights: [
      "FHA loan limit (Miami-Dade): $697,000 for a single-family home in 2026",
      "Most condos under $300K — FHA-eligible with 3.5% down",
      "Hometown Heroes program heavily used by NMB teachers, nurses, and city employees",
      "KLE office at 909 N Miami Beach Blvd, Suite 301A — local team that knows your zip codes",
    ],
    zipCodes: ["33162", "33179", "33169", "33181"],
    lat: 25.9331,
    lng: -80.1628,
    avgHomePrice: "$525,000",
    fhaLoanLimit: "$697,000",
    topPrograms: ["FHA", "Hometown Heroes", "First-Time Buyer", "Conventional"],
    hometownHeroesNote: "Many North Miami Beach teachers, nurses, and city employees qualify — up to $35,000 in down payment assistance.",
  },
  {
    slug: "miami-beach",
    name: "Miami Beach",
    county: "Miami-Dade County",
    state: "FL",
    description:
      "Miami Beach is dominated by condo financing and Jumbo lending. Median condo prices range from the high-$400Ks in North Beach to multi-million in South Beach and Mid-Beach oceanfront towers. Conventional and Jumbo loans are the most common programs here. Some FHA-approved condo buildings exist (the FHA-approved condo list is critical) but the inventory is more limited than other areas of Miami-Dade.",
    vibe: "Iconic, international, condo-driven — financing here is mostly Conventional or Jumbo with FHA-approved condo limits.",
    highlights: [
      "Jumbo loan threshold: $697,000 (high-cost county) — many properties exceed it",
      "FHA-approved condo financing available in select buildings — KLE checks the FHA approval list before recommending",
      "International borrower programs (foreign national / ITIN) available through KLE's wholesale lender network",
      "Strong short-term rental zones — DSCR loans for investors qualifying on rental income",
    ],
    zipCodes: ["33139", "33140", "33141"],
    lat: 25.7907,
    lng: -80.13,
    avgHomePrice: "$760,000",
    fhaLoanLimit: "$697,000",
    topPrograms: ["Conventional", "Jumbo", "DSCR", "FHA (approved condos only)"],
    hometownHeroesNote: "Hometown Heroes available, but Miami Beach prices often exceed program limits — KLE checks eligibility per address.",
  },
  {
    slug: "brickell",
    name: "Brickell",
    county: "Miami-Dade County",
    state: "FL",
    description:
      "Brickell is Miami's financial district — a vertical, condo-only mortgage market. Most properties are Conventional financing on FHA-approved high-rise buildings, with significant Jumbo activity in the $1M+ tower segment. Many young-professional borrowers qualify for First-Time Buyer programs combined with Conventional 3% down. KLE works with wholesale lenders who specialize in Miami high-rise condo underwriting.",
    vibe: "Urban, professional, vertical — condo financing requires HOA review, master insurance, and FHA-approval list checking.",
    highlights: [
      "FHA-approved condo buildings in Brickell tracked weekly — KLE verifies before lock",
      "Conventional 3% down for first-time buyers up to the $697K conforming limit",
      "Jumbo loans for $700K+ towers with competitive rates for 700+ FICO borrowers",
      "DSCR loans for investor purchases — qualifies on the unit's rental income, not the buyer's W-2",
    ],
    zipCodes: ["33129", "33130", "33131"],
    lat: 25.7617,
    lng: -80.1918,
    avgHomePrice: "$680,000",
    fhaLoanLimit: "$697,000",
    topPrograms: ["Conventional", "Jumbo", "DSCR", "First-Time Buyer"],
    hometownHeroesNote: "Hometown Heroes valid for downtown professionals (teachers, nurses, law enforcement) buying here — KLE pairs it with Conventional 3% down.",
  },
  {
    slug: "aventura",
    name: "Aventura",
    county: "Miami-Dade County",
    state: "FL",
    description:
      "Aventura is a master-planned, gated community market — condos starting in the $300Ks and single-family homes in the gated Aventura Lakes / Williams Island ranging $700K to $5M+. Heavy international buyer presence drives demand for Foreign National and ITIN loan programs alongside standard Conventional and Jumbo financing. Aventura's HOA structures require careful condo underwriting.",
    vibe: "Upscale, international, HOA-driven — financing mix skews Conventional and Jumbo, with Foreign National programs for international buyers.",
    highlights: [
      "Conventional and Jumbo are the dominant programs — FHA used selectively in approved buildings",
      "Foreign National loan programs available through KLE for international buyers without US credit",
      "DSCR loans active for the strong investor segment buying for short-term rentals",
      "Hometown Heroes works for teachers and city of Aventura employees up to county price limits",
    ],
    zipCodes: ["33160", "33180"],
    lat: 25.9565,
    lng: -80.1392,
    avgHomePrice: "$675,000",
    fhaLoanLimit: "$697,000",
    topPrograms: ["Conventional", "Jumbo", "DSCR", "Foreign National"],
    hometownHeroesNote: "Aventura's median price is near the FL Hometown Heroes limit — KLE confirms eligibility per address, with FHA-Heroes stack the most common combination.",
  },
  {
    slug: "coral-gables",
    name: "Coral Gables",
    county: "Miami-Dade County",
    state: "FL",
    description:
      "Coral Gables — Miami-Dade's premier historic and architectural district — is a Jumbo loan market in the heart, with conventional financing at the edges. Single-family homes range $700K+ at the boundaries to $10M+ near the country club and the University of Miami. Most KLE clients here use Jumbo or Conventional Jumbo programs. The historic district means careful appraisal selection and sometimes longer underwriting cycles.",
    vibe: "Historic, prestigious, architectural — Jumbo-heavy market with experienced borrowers and longer underwriting timelines.",
    highlights: [
      "Jumbo loans the dominant program — KLE has wholesale relationships with multiple Jumbo lenders for rate competition",
      "Conventional financing at the boundary zip codes (33134) for under-conforming-limit purchases",
      "DSCR loans active for the rental investment market near University of Miami",
      "Construction-to-permanent loans for the gut-renovation segment of historic Mediterranean Revival homes",
    ],
    zipCodes: ["33134", "33143", "33146"],
    lat: 25.7215,
    lng: -80.2683,
    avgHomePrice: "$1,250,000",
    fhaLoanLimit: "$697,000",
    topPrograms: ["Jumbo", "Conventional", "DSCR", "Construction"],
    hometownHeroesNote: "Most Coral Gables prices exceed Hometown Heroes program limits — first-time buyers often look at boundary zip codes 33134 where the program may apply.",
  },
  {
    slug: "doral",
    name: "Doral",
    county: "Miami-Dade County",
    state: "FL",
    description:
      "Doral is one of South Florida's fastest-growing cities, with heavy demand from Latin American buyers (Venezuelan, Colombian, Brazilian). Single-family homes $700K-$3M, townhomes from $500K. Conventional and Jumbo dominate, but FHA financing is active in the lower-priced townhome segment. Foreign National and ITIN programs see high volume from KLE's international clientele.",
    vibe: "Family-corporate, master-planned, Latin-American international — Conventional/Jumbo dominant with significant Foreign National program volume.",
    highlights: [
      "Foreign National and ITIN loan programs — KLE specializes in this segment given Doral's international borrower base",
      "FHA financing active for townhomes in the $500-$700K range",
      "Conventional 3% down for first-time buyers in the corporate-relocation segment",
      "Trump National Doral and surrounding gated communities — Jumbo financing with golf-course HOA review",
    ],
    zipCodes: ["33122", "33172", "33178", "33182"],
    lat: 25.8195,
    lng: -80.3553,
    avgHomePrice: "$780,000",
    fhaLoanLimit: "$697,000",
    topPrograms: ["Conventional", "Jumbo", "Foreign National", "FHA"],
    hometownHeroesNote: "Many Doral teachers, nurses, and city employees use Hometown Heroes — KLE pairs with FHA for the townhome segment.",
  },
  {
    slug: "hialeah",
    name: "Hialeah",
    county: "Miami-Dade County",
    state: "FL",
    description:
      "Hialeah is one of the most active FHA, Hometown Heroes, and First-Time Buyer markets in all of Florida. Median single-family prices in the $400Ks place most homes well within FHA loan limits. The city's predominantly working-class, Cuban-American population means heavy Hometown Heroes use (city of Hialeah employees, Miami-Dade teachers, Jackson Health nurses) and consistent FHA volume. KLE's bilingual loan officers (English / Spanish-adjacent through Haitian-Creole-trained team) serve Hialeah heavily.",
    vibe: "Working-class, family-driven, predominantly Hispanic — FHA and Hometown Heroes are the workhorse programs here.",
    highlights: [
      "Hialeah median home price ~$425K — well within FHA $697K Miami-Dade limit",
      "Hometown Heroes heavily used — Hialeah city workers, teachers, nurses, firefighters",
      "FHA Streamline refinance volume high — many homeowners refinanced 2020-2021 want rate-and-term update",
      "DSCR loans for the strong rental investor segment serving the Hialeah-Hialeah Gardens corridor",
    ],
    zipCodes: ["33010", "33012", "33013", "33014", "33015", "33016", "33018"],
    lat: 25.8576,
    lng: -80.2781,
    avgHomePrice: "$425,000",
    fhaLoanLimit: "$697,000",
    topPrograms: ["FHA", "Hometown Heroes", "First-Time Buyer", "FHA Streamline Refinance"],
    hometownHeroesNote: "Hialeah is one of the highest-volume Hometown Heroes markets in Florida — most teachers, nurses, and city employees easily qualify for the full $35,000 in down payment + closing cost assistance.",
  },
  {
    slug: "hollywood",
    name: "Hollywood",
    county: "Broward County",
    state: "FL",
    description:
      "Hollywood, FL offers waterfront affordability without Miami Beach pricing. Single-family $400K-$1.5M, condos $200K+. The mix supports FHA, Conventional, VA (strong veteran population near naval and reserve installations), and Hometown Heroes. The Broward County FHA loan limit ($697,000 in 2026) covers the bulk of the market. Beach-adjacent zips see DSCR investor activity for short-term-rental zones where allowed.",
    vibe: "Beachy, working-family, veteran-heavy — FHA, VA, and Hometown Heroes are the dominant programs.",
    highlights: [
      "Strong VA loan volume — Hollywood has a notable veteran population; 0% down VA with no PMI",
      "FHA financing covers the entire single-family inventory under $697K",
      "Hometown Heroes for Broward County educators, healthcare workers, and first responders",
      "DSCR loans for short-term rental investors in beach-zoned properties",
    ],
    zipCodes: ["33019", "33020", "33021"],
    lat: 26.0112,
    lng: -80.1495,
    avgHomePrice: "$525,000",
    fhaLoanLimit: "$697,000",
    topPrograms: ["FHA", "VA", "Hometown Heroes", "Conventional", "DSCR"],
    hometownHeroesNote: "Strong fit for Broward County teachers, Memorial Healthcare nurses, Hollywood Police, and Hollywood Fire — KLE pairs Hometown Heroes with FHA or Conventional 3% down.",
  },
  {
    slug: "pembroke-pines",
    name: "Pembroke Pines",
    county: "Broward County",
    state: "FL",
    description:
      "Pembroke Pines is the most popular Broward County city for first-time buyers and family relocations. Single-family $450K-$900K, townhomes $350K-$550K. Conventional 3% down for first-time buyers, FHA, and Hometown Heroes are the most common programs. Some western Pembroke Pines zip codes touch USDA-eligible areas — KLE checks USDA eligibility on a property-by-property basis. Top-rated schools drive consistent demand.",
    vibe: "Suburban, school-district-driven, first-time-buyer heavy — programs skew Conventional 3% down and FHA.",
    highlights: [
      "Conventional 3% down (HomeReady / Home Possible) — best for credit scores 740+",
      "FHA financing covers the full single-family and townhome inventory",
      "USDA loans available in select western zip codes (33028, 33029) — 0% down for eligible borrowers",
      "Hometown Heroes heavily used by Broward Schools teachers and Memorial Healthcare nurses",
    ],
    zipCodes: ["33024", "33025", "33027", "33028", "33029"],
    lat: 26.0086,
    lng: -80.2962,
    avgHomePrice: "$565,000",
    fhaLoanLimit: "$697,000",
    topPrograms: ["Conventional", "FHA", "Hometown Heroes", "USDA (select zips)", "First-Time Buyer"],
    hometownHeroesNote: "Pembroke Pines is one of the strongest Hometown Heroes markets in Broward — teachers, healthcare workers, and first responders all consistent users of the program.",
  },
];

export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return NEIGHBORHOODS.find((n) => n.slug === slug);
}
