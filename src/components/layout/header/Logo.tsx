"use client";

import Link from "next/link";

import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/cn";
import { useHeaderTheme } from "@/components/layout/header/HeaderThemeContext";

/**
 * Abstracted beam/louver mark (three staggered strokes) rather than a
 * literal pergola pictogram — reads as an architectural monogram at
 * favicon size and doesn't compete with the wordmark next to it. Placeholder
 * pending a real brand mark; isolated to this one file for that reason.
 */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <rect x="3" y="6" width="26" height="2.5" rx="1.25" fill="currentColor" />
      <rect x="3" y="14.75" width="26" height="2.5" rx="1.25" fill="currentColor" />
      <rect x="3" y="23.5" width="18" height="2.5" rx="1.25" fill="currentColor" />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /**
   * Reads the ambient `HeaderThemeContext` to render white-over-imagery
   * while the header is transparent. Only the header's own instance
   * should pass this — a Logo rendered inside the (always-solid) mobile
   * drawer must NOT inherit that context just because Portals keep it in
   * the same React tree, or it would render invisible white-on-white.
   */
  adaptive?: boolean;
};

export function Logo({ className, adaptive = false }: LogoProps) {
  const { transparent } = useHeaderTheme();
  const isLight = adaptive && transparent;

  return (
    <Link
      href={ROUTES.home}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        "focus-visible:ring-ring/50 flex items-center gap-2 rounded-sm focus-visible:ring-2 focus-visible:outline-none",
        isLight ? "text-white" : "text-foreground",
        className,
      )}
    >
      <LogoMark className={cn("size-6", isLight ? "text-white" : "text-primary")} />
      <span className="text-h4 font-display tracking-tight">{siteConfig.name}</span>
    </Link>
  );
}
