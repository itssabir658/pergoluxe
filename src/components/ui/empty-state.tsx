import { type ReactNode } from "react";

import { cn } from "@/utils/cn";
import { Stack } from "@/components/layout";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

/**
 * The "nothing here yet" state — no search results, empty cart, empty
 * wishlist. Distinct from ErrorState (something went wrong) so the two
 * are never conflated in a feature's data-fetch branch.
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Stack align="center" gap="sm" className={cn("py-16 text-center", className)}>
      {icon && <div className="text-muted-foreground [&_svg]:size-10">{icon}</div>}
      <p className="text-h4">{title}</p>
      {description && (
        <p className="text-body max-w-measure text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </Stack>
  );
}
