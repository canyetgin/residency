import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

import createMiddleware from "next-intl/middleware";

import { auth } from "@/lib/auth";
import { routing } from "@/i18n/routing";
import { can, getRequiredPermissionForRoute } from "@/lib/permissions";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //for better-auth, disable check permissions for auth routes

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  //for api routes

  if (pathname.startsWith("/api")) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    return NextResponse.next();
  }

  //for better ux we need to understand users preffered lang to not the show default lang on each redirect

  const localePattern = new URLPattern({
    pathname: `/:locale(${routing.locales.join("|")})/:path*`,
  });

  const match = localePattern.exec(request.url);

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;

  const currentLocale =
    match?.pathname.groups.locale ||
    (cookieLocale &&
    routing.locales.includes(cookieLocale as (typeof routing.locales)[number])
      ? cookieLocale
      : routing.defaultLocale);

  const cleanPathname = match
    ? `/${match.pathname.groups.path || ""}`
    : pathname;

  // path/url based check for visitng pages

  const requiredPermission = getRequiredPermissionForRoute(cleanPathname);

  if (requiredPermission) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // no signed user
    if (!session) {
      const url = new URL(`/${currentLocale}/login`, request.url);

      //repect to the next param so login page can redirect to where user came. See in Login Form Compoenent props.
      url.searchParams.set(
        "next",
        request.nextUrl.pathname + request.nextUrl.search,
      );
      return NextResponse.redirect(url);
    }

    // signed but dont have permission. This is optimistic check for route level. DAL check needed for each func.

    if (!can(session, requiredPermission)) {
      return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!trpc|_next|_vercel|.*\\..*).*)",
};
