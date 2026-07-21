"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/ui/error-state";

/**
 * Next.js requires route-level `error.tsx` to be a Client Component — it
 * has to run in the browser to catch render errors React already
 * committed to the DOM. `reset()` re-renders the segment; logging the
 * error is a placeholder for wiring a real error-tracking service later.
 */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorState
      title="Something went wrong"
      description="We hit an unexpected error loading this page. Please try again."
      onRetry={reset}
      className="min-h-[50vh] justify-center"
    />
  );
}
