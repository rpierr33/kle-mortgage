import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/seo";
import { NEIGHBORHOODS } from "@/lib/neighborhoods";

const STATIC_ROUTES = [
  { path: "", priority: 1.0, changeFreq: "weekly" as const },
  { path: "/about", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/loan-programs", priority: 0.9, changeFreq: "monthly" as const },
  { path: "/loan-programs/conventional", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/loan-programs/fha", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/loan-programs/va", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/loan-programs/usda", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/loan-programs/jumbo", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/loan-programs/refinance", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/loan-programs/first-time-buyer", priority: 0.8, changeFreq: "monthly" as const },
  { path: "/calculator", priority: 0.7, changeFreq: "monthly" as const },
  { path: "/apply", priority: 0.9, changeFreq: "monthly" as const },
  { path: "/resources", priority: 0.6, changeFreq: "weekly" as const },
  { path: "/testimonials", priority: 0.6, changeFreq: "monthly" as const },
  { path: "/faq", priority: 0.7, changeFreq: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFreq: "monthly" as const },
  { path: "/privacy-policy", priority: 0.3, changeFreq: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFreq: "yearly" as const },
];

function localePath(locale: string, path: string): string {
  if (locale === routing.defaultLocale) {
    return `${SITE_URL}${path || "/"}`;
  }
  return `${SITE_URL}/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of STATIC_ROUTES) {
    for (const locale of routing.locales) {
      entries.push({
        url: localePath(locale, route.path),
        lastModified: now,
        changeFrequency: route.changeFreq,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((alt) => [alt, localePath(alt, route.path)]),
          ),
        },
      });
    }
  }

  // Programmatic neighborhood mortgage pages
  for (const n of NEIGHBORHOODS) {
    for (const locale of routing.locales) {
      const path = `/neighborhoods/${n.slug}`;
      entries.push({
        url: localePath(locale, path),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((alt) => [alt, localePath(alt, path)]),
          ),
        },
      });
    }
  }

  return entries;
}
