import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "../globals.css";
import { cn } from "cn";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getTheme } from "@teispace/next-themes/server";
import { routing } from "@/i18n/routing";
import { Suspense } from "react";
import { getMessages } from "next-intl/server";
import pick from "lodash/pick";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Residency",
  description: "Manage ez :D",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

//since we enabled the prerender and component caching, we need to do this to not get err bc of using next-intl.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  // error.tsx is always a client component cuz next.js uses it as a react error boundary
  // we need to expose something to that client component to get our translations so useTranslations() reads from Provider
  const tMinRequiredTranslations = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        figtree.variable,
      )}
    >
      <body className="no-translate">
        <NextIntlClientProvider
          messages={pick(
            tMinRequiredTranslations,
            "general.error",
            "general.goBack",
          )}
        >
          {/* we used suspense for next-intl issues: when changing lang, it gives prefect and cache issue bc of theme shell :D. Felt like loop hole */}
          <Suspense fallback={null}>
            <ThemeShell>
              <main>{children}</main>
            </ThemeShell>
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

//to prevent hydration err for prefetch and cached compoenents. this wont disable prefetch and caching for all sub childs. it will create a dynamic hole for subtree.
async function ThemeShell({ children }: { children: React.ReactNode }) {
  const theme = await getTheme();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={theme || "system"}
      enableSystem
      disableTransitionOnChange
      transition
    >
      {children}
    </ThemeProvider>
  );
}
