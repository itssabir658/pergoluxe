import { type ReactNode } from "react";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { HeaderModeProvider } from "@/providers/header-mode-provider";

/**
 * Single composition root for every app-wide provider. The root
 * `layout.tsx` wraps `{children}` in this one component instead of a
 * hand-nested pyramid of providers — adding a new global provider
 * (analytics, cart) means editing this file, not every consumer of layout.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <TooltipProvider delayDuration={200}>
          <HeaderModeProvider>{children}</HeaderModeProvider>
          <Toaster position="bottom-right" />
        </TooltipProvider>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
