import { Geist, Geist_Mono } from "next/font/google";

/**
 * Single-family type system per BRAND_IDENTITY.md §5: Geist Sans carries
 * every role from Display through Body (weight and size express hierarchy,
 * not a second typeface), with Geist Mono for code and specification
 * tables. `--font-display-loaded` is intentionally NOT set — tokens.css
 * falls `--font-display` back to `--font-sans`, which is exactly the
 * one-family behaviour the brand bible specifies. If a distinct display
 * face is licensed later (Neue Haas Grotesk is the documented upgrade
 * path), it plugs in here as a third loader without touching tokens or
 * component code.
 *
 * next/font self-hosts and subsets at build time (no runtime request to
 * Google Fonts, no layout shift from a late-loading external stylesheet).
 */

export const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans-loaded",
  display: "swap",
});

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono-loaded",
  display: "swap",
});

/** Applied to <html> by the root layout. */
export const fontVariables = [fontSans.variable, fontMono.variable].join(" ");
