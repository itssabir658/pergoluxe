import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StarRating } from "@/features/testimonials/components/StarRating";
import type { Testimonial } from "@/features/testimonials/types";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/**
 * Quote-first per the brand bible's testimonial language (§7): minimal
 * chrome, the customer's words carrying the weight. The photo slot is an
 * initials Avatar until real customer photos exist — an honest
 * placeholder, not a stock face. Hover deepens the shadow only (elevation
 * cue without movement — no lift, no scale).
 */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, location, rating, quote, installedModel } = testimonial;

  return (
    <figure className="border-border bg-card duration-base ease-standard flex h-full flex-col rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md">
      <StarRating rating={rating} />
      <blockquote className="text-body text-foreground mt-4 flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="border-border mt-5 flex items-center gap-3 border-t pt-5">
        <Avatar className="size-10">
          <AvatarFallback>{initials(name)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-caption text-foreground font-medium">{name}</p>
          <p className="text-caption text-muted-foreground">
            {location} · {installedModel}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
