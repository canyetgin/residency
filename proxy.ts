import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { getRequiredPermissionForRoute, can } from "@/lib/permissions";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //for better-auth, disable check permissions for auth routes
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

    //for api routes

  if (pathname.startsWith("/api")) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.next();
  }

  //for better ux we need to understand users preffered lang to not the show default lang on each redirect
  const localePattern = new URLPattern({ pathname: `/:locale(${routing.locales.join("|")})/:path*` });
  const match = localePattern.exec(request.url);
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const currentLocale = match?.pathname.groups.locale || 
    (cookieLocale && routing.locales.includes(cookieLocale as any) ? cookieLocale : routing.defaultLocale);

  const cleanPathname = match ? `/${match.pathname.groups.path || ""}` : pathname;

  // path/url based check for visitng pages
  const requiredPermission = getRequiredPermissionForRoute(cleanPathname);

  if (requiredPermission) {
    const session = await auth.api.getSession({ headers: await headers() });

    // no signed user

    if (!session) {
      // Artık doğru dil çerezini koruyarak yönlendirir
      return NextResponse.redirect(new URL(`/${currentLocale}/login`, request.url));
    }

    // signed but dont have permission
    if (!can(session, requiredPermission)) {
      return NextResponse.redirect(new URL(`/${currentLocale}`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: '/((?!trpc|_next|_vercel|.*\\..*).*)'
};
