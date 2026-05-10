/**
 * Health check for KLE Mortgage — extends i18n audit with smoke tests + JSON-LD schema validation.
 *
 * Catches:
 *   - Routes 500/404 unexpectedly (after refactors, dependency upgrades)
 *   - JSON-LD schemas broken or missing (silent loss of AI/Google citations)
 *   - Sitemap, robots, llms.txt unreachable
 *   - OG image generation broken
 *
 * Usage: npm run health:check
 *   Defaults to http://localhost:3000
 *   Override: AUDIT_BASE_URL=https://klemortgage.com npm run health:check
 */

const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:3000";

type Check = {
  name: string;
  url: string;
  expectStatus: number | number[];
  contentType?: string;
  mustContain?: string[];
  mustHaveJsonLd?: string[];
};

const CHECKS: Check[] = [
  // Public routes — all 3 locales for homepage
  { name: "homepage en", url: "/", expectStatus: 200 },
  { name: "homepage fr", url: "/fr", expectStatus: 200 },
  { name: "homepage ht", url: "/ht", expectStatus: 200 },
  { name: "about", url: "/about", expectStatus: 200 },
  { name: "apply", url: "/apply", expectStatus: 200 },
  { name: "calculator", url: "/calculator", expectStatus: 200 },
  { name: "contact", url: "/contact", expectStatus: 200 },
  { name: "faq", url: "/faq", expectStatus: 200 },
  { name: "loan-programs", url: "/loan-programs", expectStatus: 200 },
  { name: "loan-programs/fha", url: "/loan-programs/fha", expectStatus: 200 },
  { name: "loan-programs/va", url: "/loan-programs/va", expectStatus: 200 },
  { name: "resources", url: "/resources", expectStatus: 200 },
  { name: "testimonials", url: "/testimonials", expectStatus: 200 },
  { name: "privacy-policy", url: "/privacy-policy", expectStatus: 200 },
  { name: "terms", url: "/terms", expectStatus: 200 },
  { name: "neighborhood (NMB)", url: "/neighborhoods/north-miami-beach", expectStatus: 200 },
  { name: "neighborhood (Hialeah)", url: "/neighborhoods/hialeah", expectStatus: 200 },
  { name: "neighborhood (Hollywood)", url: "/neighborhoods/hollywood", expectStatus: 200 },

  // Metadata routes
  { name: "sitemap.xml", url: "/sitemap.xml", expectStatus: 200, mustContain: ["<urlset", "klemortgage.com"] },
  { name: "robots.txt", url: "/robots.txt", expectStatus: 200 },
  { name: "llms.txt", url: "/llms.txt", expectStatus: 200, mustContain: ["KLE Mortgage", "NMLS #2380070"] },
  { name: "OG image (root)", url: "/opengraph-image", expectStatus: 200, contentType: "image/png" },

  // 404 for unknown neighborhood
  { name: "404 unknown neighborhood", url: "/neighborhoods/atlantis", expectStatus: 404 },

  // Schema markup — homepage must have MortgageBroker + WebSite
  { name: "homepage JSON-LD", url: "/", expectStatus: 200, mustHaveJsonLd: ["MortgageBroker", "FinancialService", "LocalBusiness", "WebSite"] },
  { name: "neighborhood Place schema", url: "/neighborhoods/north-miami-beach", expectStatus: 200, mustHaveJsonLd: ["Place"] },
];

async function runCheck(c: Check): Promise<{ pass: boolean; reason?: string }> {
  try {
    const res = await fetch(BASE_URL + c.url, { redirect: "manual" });
    const expected = Array.isArray(c.expectStatus) ? c.expectStatus : [c.expectStatus];
    if (!expected.includes(res.status)) {
      return { pass: false, reason: `expected ${expected.join("|")} got ${res.status}` };
    }

    if (c.contentType) {
      const ct = res.headers.get("content-type") ?? "";
      if (!ct.includes(c.contentType)) {
        return { pass: false, reason: `expected content-type ${c.contentType}, got ${ct}` };
      }
    }

    const body = await res.text();

    if (c.mustContain) {
      for (const needle of c.mustContain) {
        if (!body.includes(needle)) {
          return { pass: false, reason: `body missing "${needle}"` };
        }
      }
    }

    if (c.mustHaveJsonLd) {
      const scripts = body.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g) ?? [];
      const allTypes = new Set<string>();
      for (const s of scripts) {
        const json = s
          .replace(/^<script[^>]*>/, "")
          .replace(/<\/script>$/, "")
          .replace(/\\u003c/g, "<")
          .replace(/\\u003e/g, ">")
          .replace(/\\u0026/g, "&");
        try {
          const parsed = JSON.parse(json);
          const items = Array.isArray(parsed) ? parsed : [parsed];
          for (const item of items) {
            const t = item["@type"];
            if (Array.isArray(t)) t.forEach((x) => allTypes.add(x));
            else if (typeof t === "string") allTypes.add(t);
          }
        } catch {
          return { pass: false, reason: `invalid JSON-LD: ${json.slice(0, 80)}` };
        }
      }
      for (const required of c.mustHaveJsonLd) {
        if (!allTypes.has(required)) {
          return { pass: false, reason: `missing JSON-LD @type "${required}". Found: ${[...allTypes].join(",") || "none"}` };
        }
      }
    }

    return { pass: true };
  } catch (err) {
    return { pass: false, reason: `fetch error: ${err instanceof Error ? err.message : String(err)}` };
  }
}

async function main() {
  console.log(`\n🩺 KLE Mortgage health check against ${BASE_URL}\n`);
  console.log(`Running ${CHECKS.length} checks...\n`);

  let failed = 0;
  for (const c of CHECKS) {
    const { pass, reason } = await runCheck(c);
    if (pass) {
      console.log(`✅ ${c.name.padEnd(35)} ${c.url}`);
    } else {
      failed++;
      console.log(`❌ ${c.name.padEnd(35)} ${c.url}  →  ${reason}`);
    }
  }

  console.log("\n" + "=".repeat(70));
  if (failed > 0) {
    console.log(`❌ ${failed} of ${CHECKS.length} checks failed`);
    process.exit(1);
  }
  console.log(`✅ All ${CHECKS.length} checks passed`);
  process.exit(0);
}

main().catch((err) => {
  console.error("Health check crashed:", err);
  process.exit(2);
});

export {};
