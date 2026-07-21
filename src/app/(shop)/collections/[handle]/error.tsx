"use client";

import { useEffect } from "react";

import { ErrorState } from "@/components/ui/error-state";

/**
 * Same pattern as the root `error.tsx` — a route-specific message here
 * (rather than relying on the generic root boundary) is what the brief's
 * "Network error" state actually means for this page: a Shopify collection
 * fetch failing, not a generic app crash.
 */
export default function CollectionError({
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
      title="Couldn't load this collection"
      description="Something went wrong fetching these products. Please try again."
      onRetry={reset}
      className="min-h-[60vh] justify-center"
    />
  );
}
