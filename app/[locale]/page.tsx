import { ThemeSwitcher } from "@/components/theme-switcher";
import { routing } from "@/i18n/routing";
import { authClient } from "@/lib/auth-client";
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home() {
  const { data: session, error } = await authClient.getSession();

  return (
    <div>
      <ThemeSwitcher />
      <p>{session?.user.id} ss</p>
    </div>
  );
}
