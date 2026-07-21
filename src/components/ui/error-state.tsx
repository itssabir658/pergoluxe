import { type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

import { cn } from "@/utils/cn";
import { Stack } from "@/components/layout";
import { Button } from "@/components/ui/button";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
  action?: ReactNode;
  className?: string;
};

/**
 * The "something went wrong" state — pairs with a route's `error.tsx` or a
 * Suspense-boundary-local error boundary. `onRetry` maps directly to the
 * `reset()` callback error.tsx receives from Next.js.
 */
export function ErrorState({
  title = "Something went wrong",
  description = "Please try again, or come back in a moment.",
  onRetry,
  action,
  className,
}: ErrorStateProps) {
  return (
    <Stack align="center" gap="sm" className={cn("py-16 text-center", className)}>
      <AlertTriangle className="text-destructive size-10" aria-hidden="true" />
      <p className="text-h4">{title}</p>
      <p className="text-body max-w-measure text-muted-foreground">{description}</p>
      {(onRetry ?? action) && (
        <div className="mt-2">
          {action ?? (
            <Button variant="outline" onClick={onRetry}>
              Try again
            </Button>
          )}
        </div>
      )}
    </Stack>
  );
}
