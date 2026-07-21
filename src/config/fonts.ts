import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Placeholder type family pending final brand typography. Inter (sans) and
 * JetBrains Mono are safe, high-quality defaults unlikely to change.
 * Fraunces (display) is the one most likely to be swapped for a licensed
 * brand typeface — it's isolated to this single file so that swap never
 * touches tokens.css, component code, or the `--font-display` contract.
 *
 * next/font self-hosts and subsets these at build time (no runtime request
 * to Google Fonts, no layout shift from a late-loading external stylesheet).
 */

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
});

export const fontDisplay = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  variable: "--font-display-loaded",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  display: "swap",
});

/** Applied to <html> or <body> once the root layout is built. */
export const fontVariables = [
  fontSans.variable,
  fontDisplay.variable,
  fontMono.variable,
].join(" ");
