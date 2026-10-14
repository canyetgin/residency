import { safeRedirect } from "@/lib/utils";
import { LoginForm } from "./login-form";
import { auth } from "@/lib/auth";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation"; // 1. Redirect import edildi

export async function LoginCard({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const locale = await getLocale();

  const session = await auth.api.getSession({ headers: await headers() });

  //chek session. if user has session redirect to dashboard. if not look the next param and try to redirect
  if (session) {
    const destination = next ? safeRedirect(next) : `/${locale}/dashboard`;
    redirect(destination);
  }

  return <LoginForm next={safeRedirect(next)} />;
}
