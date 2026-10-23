import { safeRedirect } from '@/lib/utils';
import { LoginForm } from './login-form';
import { auth } from '@/lib/auth';
import { getLocale, getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { redirect } from '@/i18n/navigation';

export async function LoginCard({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  const locale = await getLocale();

  const session = await auth.api.getSession({
    headers: await headers(),
    //in critical pages, never trust to better-auth cookie cache
    query: { disableCookieCache: true },
  });

  //chek session. if user has session redirect to dashboard. if not look the next param and try to redirect
  if (session) {
    redirect({ href: safeRedirect(next), locale });
  }

  return <LoginForm next={safeRedirect(next)} />;
}
