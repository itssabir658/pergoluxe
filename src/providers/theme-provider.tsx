"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ComponentProps } from "react";

/**
 * `attribute="class"` is what makes the `@custom-variant dark` rule in
 * globals.css (`&:is(.dark *)`) work. `enableSystem={false}` is deliberate:
 * dark mode's token values exist and are wired end-to-end, but no dark
 * surface has been visually QA'd yet — defaulting new visitors into it via
 * OS preference would ship an unreviewed theme. Flip this to `true` (and
 * ship a theme toggle) once dark mode has had a design pass.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
