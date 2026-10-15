//this not found page is global fallback for non localized urls (ex:/public/non-exits.png)
//actual locale aware not found is under the [locale] dynamic 
// mentioned in next-intl docs: prevents next.js build failures since standard not-found files require a parent app/layout.tsx, which is missing because our root layout is nested inside app/[locale]/.
//it acts as a standalone shell catching non-localized urls and broken asset files (.png).
 
import "./globals.css";

import { BackButton } from "@/components/back-button";
import { Card, CardTitle } from "@/components/ui/card";
import NotFoundAnimation from "@/public/animations/404.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { cn } from "cn";
import { getTranslations } from "next-intl/server";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import { locale } from "next/root-params";
const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default async function NotFound() {
  return (
    <html
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
        <main className="flex flex-col items-center justify-center w-screen min-w-screen h-screen gap-2">
          <div className="h-[210px]">
            <DotLottieReact
              renderConfig={{ autoResize: true }}
              layout={{ fit: "contain" }}
              src={NotFoundAnimation}
              autoplay
            />
          </div>
          <p>Sorry, We couldn't find anthing here</p>
        </main>
      </body>
    </html>
  );
}
