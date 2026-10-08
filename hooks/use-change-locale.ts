"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function useChangeLocale() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const changeLocale = (nextLocale: string | null) => {
    //safe guard and type guard
    if (!nextLocale || nextLocale === currentLocale) return;

    router.replace(pathname, { locale: nextLocale,scroll: false });
  };

  return {
    currentLocale,
    changeLocale,
  };
}