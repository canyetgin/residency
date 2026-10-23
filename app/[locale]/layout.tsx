import type { Metadata } from 'next';
import { Figtree, Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

import { ThemeProvider } from '@wrksz/themes/next/extended';
import { cn } from 'cn';
import { NextIntlClientProvider } from 'next-intl';

import { getLocale } from 'next-intl/server';

import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-sans',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Residency',
  description: 'Manage ez :D',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        figtree.variable,
      )}
    >
      <body className="no-translate">
        <NextIntlClientProvider>
          <ThemeProvider
            storage="hybrid"
            themeColor={{ light: '#ffffff', dark: '#0a0a0a' }}
            disableTransitionOnChange
            enableSameDocumentSync
            systemThemeMap={{ light: 'light', dark: 'dark' }}
          >
            <main>{children}</main>
            <Toaster closeButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
