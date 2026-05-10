// SEO helper utilities for KLE Mortgage Financing, LLC.
// Centralizes site URL, canonical/alternate hreflang, and per-page metadata defaults.

import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://klemortgage.com";

export const NAP = {
  name: "KLE Mortgage Financing",
  legalName: "KLE Mortgage Financing, LLC",
  alternateName: "KLE Mortgage",
  nmls: "2380070",
  streetAddress: "909 North Miami Beach Blvd, Suite 301A",
  addressLocality: "North Miami Beach",
  addressRegion: "FL",
  postalCode: "33162",
  addressCountry: "US",
  telephone: "+1-305-705-2030",
  email: "Info@klemortgage.com",
  latitude: 25.9331,
  longitude: -80.1628,
  foundingDate: "1992",
  founder: "Leopold Evariste",
  licensingState: "Florida",
} as const;

type SiteMetadataInput = {
  /** Pathname starting with `/` (e.g. `/about`). Use `/` for the homepage. */
  path: string;
  title: string;
  description: string;
  /** OG type, defaults to "website". */
  ogType?: "website" | "article";
  /** Optional explicit OG image URL. Defaults to `/opengraph-image`. */
  ogImage?: string;
};

/**
 * Build canonical + hreflang alternates + OG metadata for a page.
 * `path` is the locale-default path (e.g. "/loan-programs"); we generate the
 * /fr and /ht alternates plus `x-default`.
 */
export function siteMetadata({
  path,
  title,
  description,
  ogType = "website",
  ogImage,
}: SiteMetadataInput): Metadata {
  const canonical = path === "/" ? "/" : path;
  const alternates: Record<string, string> = { "x-default": canonical };
  for (const loc of routing.locales) {
    alternates[loc] = loc === routing.defaultLocale ? canonical : `/${loc}${path === "/" ? "" : path}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      type: ogType,
      url: `${SITE_URL}${canonical}`,
      siteName: NAP.name,
      locale: "en_US",
      alternateLocale: ["fr_FR", "ht_HT"],
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
