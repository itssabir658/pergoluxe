import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shape-matched to `ProductCard`, per `LoadingState`'s own guidance
 * ("prefer a shape-matched Skeleton over generic LoadingState when the
 * layout is known") — shown during the grid's `isPending` filter/sort
 * transition, never as a full-page loader.
 */
export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[4/3] w-full rounded-xl" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="mt-2 h-4 w-24" />
      </div>
    </div>
  );
}
