"use client";

import * as React from "react";
//used @teispace/next-themes instead of next-themes. bc of react 19 bugs and hydration errs.
import { ThemeProvider as NextThemesProvider } from "@teispace/next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
