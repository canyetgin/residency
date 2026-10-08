"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
//used @teispace/next-themes instead of next-themes. bc of react 19 bugs and hydration errs.
import { ThemeProvider as NextThemesProvider } from "@teispace/next-themes";
import { useTheme } from "@teispace/next-themes";

import { Toggle } from "./ui/toggle";
import { useTranslations } from "next-intl";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations("general.widgets.themeSwitcher");

  return (
    <Toggle
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={theme === "light" ? t("dark") : t("light")}
      variant="outline"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0  dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90  dark:scale-100 dark:rotate-0" />
    </Toggle>
  );
}
