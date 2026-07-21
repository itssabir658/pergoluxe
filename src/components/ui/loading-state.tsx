import { cn } from "@/utils/cn";
import { Stack } from "@/components/layout";
import { Spinner } from "@/components/ui/spinner";

type LoadingStateProps = {
  label?: string;
  className?: string;
};

/**
 * Generic Suspense-fallback / `loading.tsx` content. For content that has a
 * known shape (a product grid, a PDP), prefer a shape-matched Skeleton over
 * this — LoadingState is for cases where no layout has been decided yet.
 */
export function LoadingState({ label = "Loading…", className }: LoadingStateProps) {
  return (
    <Stack align="center" gap="sm" className={cn("py-16 text-center", className)}>
      <Spinner size="lg" label={label} />
      <p className="text-caption text-muted-foreground">{label}</p>
    </Stack>
  );
}
