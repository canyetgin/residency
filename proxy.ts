import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { getRequiredPermissionForRoute, can } from "@/lib/permissions";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  
  const response = intlMiddleware(request);
  const cleanPathname = request.nextUrl.pathname;

  //for better-auth, disable check permissions for auth routes
  if (cleanPathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  //for api routes
  if (cleanPathname.startsWith("/api")) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.next();
  }

  // path/url based check for visitng pages
  const requiredPermission = getRequiredPermissionForRoute(cleanPathname);

  if (requiredPermission) {
    const session = await auth.api.getSession({ headers: await headers() });

    // no signed user
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // signed but dont have permission
    if (!can(session, requiredPermission)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: '/((?!trpc|_next|_vercel|.*\\..*).*)'
};
