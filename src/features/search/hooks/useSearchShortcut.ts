"use client";

import { useEffect } from "react";

/** Cmd/Ctrl+K opens search — the convention Stripe, Linear, and Vercel all
 * use, so it works the way returning visitors already expect. */
export function useSearchShortcut(onTrigger: () => void) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onTrigger();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onTrigger]);
}
