import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "../globals.css";

import { cn } from "cn";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getThemeScript } from "@teispace/next-themes/server";
import { getLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  const themeScript = getThemeScript({
    attribute: "class",
  });

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
      <head>
        {/* to prevent theme flickering on initial load. we did this c of the offical @teispace/next-themes doc recommend this way. */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
      </head>

      <body className="no-translate">
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            noScript
            disableTransitionOnChange
            transition
          >
            <main>{children}</main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
