import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const isProd =
  process.env.VERCEL_ENV === "production" ||
  process.env.NODE_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!isProd) {
    // Block all on staging/preview/dev to avoid SEO duplication and AI ingestion
    // of pre-release content.
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  // AI crawlers explicitly named so KLE Mortgage can be cited in ChatGPT,
  // Claude, Perplexity, Gemini, Apple Intelligence, etc. (GEO).
  const aiBots = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "Google-Extended",
    "ClaudeBot",
    "Claude-Web",
    "Anthropic-AI",
    "PerplexityBot",
    "Perplexity-User",
    "Applebot-Extended",
    "Bytespider",
    "CCBot",
    "cohere-ai",
    "DiffBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/login", "/_next/"],
      },
      ...aiBots.map((bot) => ({
        userAgent: bot,
        allow: "/",
        disallow: ["/admin/", "/api/", "/login"],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
