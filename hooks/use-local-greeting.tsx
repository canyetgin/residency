"use client";

import { useTranslations } from "next-intl";

export function useLocalGreeting(): string {
  const t = useTranslations("general.greeting");
  const hour = new Date().getHours();

  if (hour < 12) return t("morning");
  if (hour < 17) return t("afternoon");
  if (hour < 22) return t("evening");

  return t("night");
}
