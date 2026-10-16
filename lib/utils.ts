import "server-only";

import { getTranslations } from "next-intl/server";
import { connection } from "next/server";

// open-redirect protection: only site-wide and starts with the "/" will be accepted
export function safeRedirect(
  target: string | null | undefined,
  fallback = "/dashboard",
) {
  if (!target) return fallback;
  if (
    !target.startsWith("/") ||
    target.startsWith("//") ||
    target.includes("\\")
  )
    return fallback;
  return target;
}

export async function getGreeting() {
  await connection();

  const t = await getTranslations("general.greeting");
  const hour = new Date().getHours();
  if (hour < 5) return t("night");
  if (hour < 12) return t("morning");
  if (hour < 17) return t("afternoon");
  return t("evening");
}
