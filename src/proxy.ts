import createIntlMiddleware from "next-intl/middleware";
import { jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /** Admin lives at /admin only; /zh/admin or /en/admin would 404 without redirect */
  const localeAdmin = pathname.match(/^\/(zh|en)\/admin(?:\/(.*))?$/);
  if (localeAdmin) {
    const tail = localeAdmin[2] ? `/${localeAdmin[2]}` : "";
    const url = request.nextUrl.clone();
    url.pathname = `/admin${tail}`;
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }
    const token = request.cookies.get("admin_session")?.value;
    const secret = process.env.ADMIN_SESSION_SECRET;
    if (!token || !secret) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    try {
      await jwtVerify(token, new TextEncoder().encode(secret));
      return NextResponse.next();
    } catch {
      const res = NextResponse.redirect(new URL("/admin/login", request.url));
      res.cookies.set("admin_session", "", { path: "/", maxAge: 0 });
      return res;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(zh|en)/:path*", "/admin/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
