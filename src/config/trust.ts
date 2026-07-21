import { CalendarCheck, CreditCard, Layers, ShieldCheck, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TrustStat = {
  /** Numeric value the counter animates to. */
  value: number;
  /** Decimal places to render (e.g. 1 for a 4.9 rating). */
  decimals?: number;
  /** Rendered immediately after the number ("+", "-Year", "★"). */
  suffix?: string;
  label: string;
};

export type TrustFeature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

/**
 * PLACEHOLDER BUSINESS DATA — the years-in-business and projects-completed
 * figures below are stand-ins pending real company numbers, consistent
 * with the stats already used in the footer/strategy docs. Per the brand
 * bible (BRAND_IDENTITY.md §1), these must be real, verifiable numbers
 * before launch — never rounded up dishonestly. Once Sanity's siteSettings
 * singleton exists, this becomes its static fallback.
 */
export const trustStats: TrustStat[] = [
  { value: 15, suffix: "+", label: "Years of craftsmanship" },
  { value: 5000, suffix: "+", label: "Projects completed" },
  { value: 4.9, decimals: 1, label: "Average customer rating" },
  { value: 10, suffix: "-Year", label: "Structural warranty" },
];

export const trustFeatures: TrustFeature[] = [
  {
    icon: Layers,
    title: "Premium materials",
    description: "Marine-grade aluminum that won't rust, warp, or rot.",
  },
  {
    icon: CalendarCheck,
    title: "Free design consultation",
    description: "A specialist plans your space before you commit to anything.",
  },
  {
    icon: Wrench,
    title: "Professional installation",
    description: "Installed by our own certified teams, never subcontracted out.",
  },
];

/** The short trust line rendered beneath the hero CTAs. */
export const heroTrustLine = [
  "10-Year Warranty",
  "5,000+ Installations",
  "Licensed & Insured",
] as const;

/**
 * The four-item reassurance row on the Final CTA — the same facts as
 * `trustStats`/`trustFeatures`, restated compactly since that's the exact
 * set the brief calls for there (plus financing, which those two don't
 * cover). Kept separate from `trustFeatures` rather than reused directly:
 * the Final CTA's row is a fixed, curated four ("Warranty," "Free
 * consultation," "Professional installation," "Finance available"), not
 * whatever `trustFeatures` happens to contain — the two lists are allowed
 * to diverge without this section silently changing.
 */
export const finalCtaIndicators: TrustFeature[] = [
  {
    icon: ShieldCheck,
    title: "10-Year Warranty",
    description: "Structure and finish, every model, no exceptions.",
  },
  {
    icon: CalendarCheck,
    title: "Free Consultation",
    description: "A specialist plans your space before you commit to anything.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Installed by our own certified teams, never subcontracted.",
  },
  {
    icon: CreditCard,
    title: "Financing Available",
    description: "Monthly payment plans through our financing partner.",
  },
];
