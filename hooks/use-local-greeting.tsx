"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

export function useLocalGreeting(): string {
  const t = useTranslations("general.greeting");
  const [hour, setHour] = useState<number | null>(null);
 //to prevent prerender issue. There is a mismatch between server prerendered time and actual client time when the code arrived. Time never equals so always gives hydration err.
  useEffect(() => {

    setHour(new Date().getHours());
  }, []);

  if (hour === null) return t("morning");

  if (hour < 12) return t("morning");
  if (hour < 17) return t("afternoon");
  return t("evening");
}
