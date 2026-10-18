"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@teispace/next-themes";
import { useHydrated } from "@teispace/next-themes/hooks/use-hydrated";
import { useTranslations } from "next-intl";

import { Toggle } from "./ui/toggle";

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  //lib's own solution for hydraiton errs, else we had to wrap the whole ThemeProvider with suspense, which will sacrifies the app shell built for prefetching and cached compoenents.
  const hydrated = useHydrated();
  const t = useTranslations("general.widgets.themeSwitcher");

  const isLight = resolvedTheme === "light";

  return (
    <Toggle
      onClick={() => setTheme(isLight ? "dark" : "light")}
      aria-label={hydrated ? (isLight ? t("dark") : t("light")) : undefined}
      variant="outline"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
    </Toggle>
  );
}
