import { Star } from "lucide-react";

import { cn } from "@/utils/cn";

type StarRatingProps = {
  /** 1–5. */
  rating: number;
  className?: string;
};

/**
 * The five glyphs are decorative (`aria-hidden`); the rating is announced
 * once as text — a screen reader hears "Rated 5 out of 5", never five
 * icon names. Unfilled stars keep their outline, so the rating survives
 * grayscale and colour-blindness by shape, not fill colour alone.
 */
export function StarRating({ rating, className }: StarRatingProps) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      <span className="sr-only">Rated {rating} out of 5</span>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={cn(
            "size-4",
            index < rating ? "fill-warning text-warning" : "text-border",
          )}
        />
      ))}
    </span>
  );
}
