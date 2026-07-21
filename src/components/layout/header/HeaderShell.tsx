"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/utils/cn";
import { HeaderThemeProvider } from "@/components/layout/header/HeaderThemeContext";
import { useHeaderMode } from "@/providers/header-mode-provider";

const SCROLL_THRESHOLD_PX = 24;

type HeaderShellProps = {
  announcementBar?: ReactNode;
  left: ReactNode;
  center: ReactNode;
  right: ReactNode;
  /**
   * Static default for routes known ahead of render (used directly, no
   * hero ever). A route rendered under `{children}` that only knows its
   * own hero-ness at runtime should call `useSetHeaderMode("solid")`
   * instead — that overrides this prop via `HeaderModeProvider`, since a
   * descendant of `{children}` can't hand a prop to `Header`, its sibling
   * higher in the tree.
   */
  transparentUntilScroll?: boolean;
};

/**
 * Owns the one scroll listener the transparent→solid, blur, border, and
 * shrink states all derive from. `passive: true` + a `requestAnimationFrame`
 * guard means the listener never does work more than once per paint, so
 * scrolling never feels like it's fighting the header for the main thread —
 * the "never feels jumpy" requirement is mostly a perf requirement in
 * disguise.
 *
 * The announcement bar renders *inside* this same `fixed` stack rather than
 * as a separate in-flow element above it. Two fixed-position elements both
 * claiming the viewport's top edge is a real, easy-to-miss bug: a `fixed`
 * header positioned at `top: 0` overlaps an in-flow announcement bar that
 * also starts at `y: 0`, rather than stacking below it — caught by actually
 * rendering this and scrolling it, not by types or lint. Folding both into
 * one fixed block and measuring its real height with `ResizeObserver`
 * (rather than a hardcoded number) means the reserved spacer on no-hero
 * pages stays correct through a dismiss, a wrapped two-line announcement,
 * or a copy change — no manual re-tuning required.
 */
export function HeaderShell({
  announcementBar,
  left,
  center,
  right,
  transparentUntilScroll = true,
}: HeaderShellProps) {
  const headerMode = useHeaderMode();
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);
  const stackRef = useRef<HTMLDivElement>(null);
  const [stackHeight, setStackHeight] = useState(0);

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
      ticking.current = false;
    }
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const node = stackRef.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setStackHeight(entry.contentRect.height);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const allowTransparent = headerMode === "solid" ? false : transparentUntilScroll;
  const transparent = allowTransparent && !scrolled;

  return (
    <HeaderThemeProvider value={{ transparent }}>
      <div ref={stackRef} className="z-sticky fixed inset-x-0 top-0">
        {announcementBar}
        <header
          className={cn(
            "duration-base ease-standard border-b transition-[background-color,backdrop-filter,border-color,padding]",
            transparent
              ? "border-transparent bg-transparent py-5"
              : "border-border bg-background/85 py-3 shadow-sm backdrop-blur-md",
          )}
        >
          <div
            className={cn(
              "max-w-wide duration-base ease-standard mx-auto grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 transition-colors sm:px-6 lg:px-8",
              transparent ? "text-white" : "text-foreground",
            )}
          >
            <div className="flex min-w-0 items-center gap-3">{left}</div>
            <div className="flex items-center justify-center">{center}</div>
            <div className="flex items-center justify-end gap-1">{right}</div>
          </div>
        </header>
      </div>
      {/* Only reserved on non-transparent (no-hero) pages: the stack above
          is `fixed`, so without this, page content would start at y:0
          underneath it — real CLS on first paint. Hero pages deliberately
          skip this spacer; the hero is meant to render behind the
          transparent stack, not below a gap reserved for it. */}
      {!allowTransparent && <div aria-hidden="true" style={{ height: stackHeight }} />}
    </HeaderThemeProvider>
  );
}
