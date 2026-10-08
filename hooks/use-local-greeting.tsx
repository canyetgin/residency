"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export function useLocalGreeting(): string {
  const t = useTranslations("general.greeting");
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) setGreeting(t("morning"));
    else if (hour < 17) setGreeting(t("afternoon"));
    else if (hour < 22) setGreeting(t("evening"));
    else setGreeting(t("night"));
  }, [t]);

  return greeting;
}
