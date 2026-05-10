import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");
  const isLoginPage = path === "/login";

  if (isAdminRoute || isLoginPage) {
    const session = await auth();

    if (isAdminRoute && !session) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", path);
      return NextResponse.redirect(loginUrl);
    }

    if (isLoginPage && session) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Run on everything except api, _next, _vercel, files with extensions,
    // and per-locale metadata routes (sitemap, robots, llms.txt, opengraph-image).
    "/((?!api|_next|_vercel|sitemap\\.xml|robots\\.txt|llms\\.txt|manifest\\.json|.*\\..*|(?:[a-z]{2}/)?(?:opengraph-image|twitter-image|icon|apple-icon)).*)",
  ],
};
