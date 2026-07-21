import { StarRating } from "@/features/testimonials/components/StarRating";
import type { AggregateRating } from "@/features/testimonials/types";

/**
 * The fast, low-detail trust signal (NAVIGATION.md's "every trust signal
 * appears at least twice" pattern) — the same 4.9/1,200+ figures already
 * shown in the Trust Bar, restated here in full sentence form right where
 * the detailed reviews that back the number actually live.
 */
export function AggregateRatingSummary({ rating, countLabel }: AggregateRating) {
  return (
    <div className="flex items-center gap-3">
      <StarRating rating={Math.round(rating)} />
      <p className="text-body text-muted-foreground">
        <span className="text-foreground font-medium">{rating.toFixed(1)}</span> average
        from <span className="text-foreground font-medium">{countLabel}</span> verified
        customers
      </p>
    </div>
  );
}
