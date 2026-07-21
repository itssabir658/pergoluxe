import Image from "next/image";
import Link from "next/link";
import { Heart, Scale, ShieldCheck } from "lucide-react";

import { cn } from "@/utils/cn";
import { formatPrice } from "@/utils/formatPrice";
import { Badge } from "@/components/ui/badge";
import type { CollectionProduct } from "@/features/collection/types";

type ProductCardProps = {
  product: CollectionProduct;
  comparing?: boolean;
  onToggleCompare?: (id: string) => void;
  wishlisted?: boolean;
  onToggleWishlist?: (id: string) => void;
};

/**
 * No "use client" of its own — same precedent as `ProjectCard`
 * (Part 2 of the homepage): its only consumer, `ProductGrid`, is already a
 * client boundary (it owns filter/sort/compare state), so this file never
 * needs its own directive. The hover-image swap is two stacked `next/image`
 * layers crossfading on `group-hover`/`group-focus-visible` — pure CSS,
 * exactly the same technique `HeroMedia`'s poster/video crossfade and
 * `ComparisonTable`'s image-zoom already use elsewhere on the site, so
 * there's one hover-image pattern in the codebase, not several.
 *
 * Every piece of card content the brief calls for is genuinely reusable
 * across a pergola model AND an accessory: `keySpecs` is an open list (not
 * "wind rating" hardcoded), badges render only when the underlying data
 * exists (an accessory has no warranty-badge assumption baked in), and
 * Quick Compare only appears when `product.pergolaModelId` is set — an
 * accessory card is never offered a comparison that wouldn't make sense.
 */
export function ProductCard({
  product,
  comparing = false,
  onToggleCompare,
  wishlisted = false,
  onToggleWishlist,
}: ProductCardProps) {
  const {
    name,
    startingPrice,
    compareAtPrice,
    financeAvailable,
    warrantyYears,
    availability,
    leadTimeWeeks,
    image,
    hoverImage,
    keySpecs,
    collectionHandles,
    pergolaModelId,
    href,
  } = product;

  const availabilityLabel =
    availability === "in-stock"
      ? "In Stock"
      : availability === "made-to-order"
        ? leadTimeWeeks
          ? `Made to Order · ${leadTimeWeeks[0]}–${leadTimeWeeks[1]} wks`
          : "Made to Order"
        : "Backordered";

  return (
    <article className="group relative">
      <div className="border-border relative aspect-[4/3] overflow-hidden rounded-xl border">
        <Link
          href={href}
          className="focus-visible:ring-ring/50 absolute inset-0 z-10 rounded-xl focus-visible:ring-2 focus-visible:outline-none"
          aria-label={name}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={cn(
              "duration-slow ease-standard object-cover transition-opacity",
              hoverImage && "group-hover:opacity-0 group-focus-visible:opacity-0",
            )}
          />
          {hoverImage && (
            <Image
              src={hoverImage.src}
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="duration-slow ease-standard object-cover opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          )}
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 z-20 flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {warrantyYears && (
              <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">
                <ShieldCheck className="size-3" aria-hidden="true" />
                {warrantyYears}-Yr Warranty
              </Badge>
            )}
            {financeAvailable && (
              <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">
                Financing Available
              </Badge>
            )}
          </div>

          {onToggleWishlist && (
            <button
              type="button"
              onClick={() => onToggleWishlist(product.id)}
              aria-pressed={wishlisted}
              aria-label={
                wishlisted ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`
              }
              className={cn(
                "duration-fast ease-standard pointer-events-auto flex size-9 items-center justify-center rounded-full backdrop-blur-sm transition-colors",
                "bg-background/90 text-muted-foreground hover:text-foreground",
                "focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none",
                wishlisted && "text-destructive",
              )}
            >
              <Heart
                className={cn("size-4", wishlisted && "fill-current")}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-caption text-primary">
          {collectionHandles[0]?.replace(/-/g, " ")}
        </p>
        <h3 className="text-h4 text-foreground mt-1">
          <Link
            href={href}
            className="focus-visible:ring-ring/50 rounded-sm focus-visible:ring-2 focus-visible:outline-none"
          >
            {name}
          </Link>
        </h3>

        {keySpecs.length > 0 && (
          <p className="text-caption text-muted-foreground mt-1.5">
            {keySpecs.map((spec) => spec.value).join(" · ")}
          </p>
        )}

        <div className="mt-3 flex items-baseline gap-2">
          <p className="text-body text-foreground font-medium">
            From {formatPrice(startingPrice)}
          </p>
          {compareAtPrice && compareAtPrice > startingPrice && (
            <p className="text-caption text-muted-foreground line-through">
              {formatPrice(compareAtPrice)}
            </p>
          )}
        </div>

        <p className="text-caption text-muted-foreground mt-1">{availabilityLabel}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <Link
            href={href}
            className="text-button text-foreground focus-visible:ring-ring/50 rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            View Details
          </Link>

          {pergolaModelId && onToggleCompare && (
            <button
              type="button"
              onClick={() => onToggleCompare(product.id)}
              aria-pressed={comparing}
              className={cn(
                "text-caption border-border duration-fast ease-standard inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-medium transition-colors",
                "hover:border-primary/50",
                "focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none",
                comparing && "border-primary bg-primary text-primary-foreground",
              )}
            >
              <Scale className="size-3.5" aria-hidden="true" />
              Compare
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
