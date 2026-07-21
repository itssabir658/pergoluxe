import Image from "next/image";

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
 * The editorial centrepiece — a magazine-spread pairing of the largest
 * quote on the page with its real project photo, rather than another card
 * in the grid. This is deliberately the one testimonial allowed real
 * visual weight; the grid below stays quiet by comparison so the featured
 * quote reads as curated, not just first-in-array.
 */
export function FeaturedTestimonial({ testimonial }: { testimonial: Testimonial }) {
  const { name, location, rating, quote, installedModel, projectImage } = testimonial;

  return (
    <figure className="border-border bg-card grid items-center gap-8 rounded-2xl border p-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12 lg:p-12">
      {projectImage && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:order-2">
          <Image
            src={projectImage.src}
            alt={projectImage.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <div className={projectImage ? "lg:order-1" : ""}>
        <StarRating rating={rating} />
        <blockquote className="text-h3 text-foreground mt-5">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="mt-6 flex items-center gap-3">
          <Avatar className="size-12">
            <AvatarFallback className="text-body">{initials(name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-body text-foreground font-medium">{name}</p>
            <p className="text-caption text-muted-foreground">
              {location} · {installedModel}
            </p>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
