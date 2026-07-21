"use client";

import Image from "next/image";
import { Scale, X } from "lucide-react";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ComparisonTable } from "@/features/product";
import { pergolaModels } from "@/features/product/constants";
import type { CollectionProduct } from "@/features/collection/types";

const MAX_COMPARE = 3;

/**
 * The Product Listing Experience's "Compare Products" entry point.
 * Reuses `features/product`'s existing `ComparisonTable` (now accepting an
 * optional `models` prop, its second consumer) rather than a second
 * comparison implementation — this is genuinely the same feature the
 * homepage already ships, just fed a customer-selected subset instead of
 * the full catalogue. Only appears once at least one comparable product
 * (one with a `pergolaModelId`) is selected.
 */
export function CompareBar({
  selectedIds,
  products,
  onRemove,
  onClear,
}: {
  selectedIds: string[];
  products: CollectionProduct[];
  onRemove: (id: string) => void;
  onClear: () => void;
}) {
  const selected = products.filter((p) => selectedIds.includes(p.id));
  const compareModels = selected
    .map((p) => pergolaModels.find((m) => m.id === p.pergolaModelId))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  if (selected.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Product comparison"
      className={cn(
        "border-border bg-background z-drawer fixed inset-x-0 bottom-0 border-t shadow-2xl",
        "motion-safe:animate-in motion-safe:slide-in-from-bottom-4",
      )}
    >
      <div className="max-w-content mx-auto flex w-full items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {selected.map((product) => (
              <div
                key={product.id}
                className="border-background relative size-12 overflow-hidden rounded-full border-2"
              >
                <Image src={product.image.src} alt="" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => onRemove(product.id)}
                  aria-label={`Remove ${product.name} from comparison`}
                  className="bg-foreground/80 text-background focus-visible:ring-ring/50 duration-fast ease-standard absolute inset-0 flex items-center justify-center opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:outline-none"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
          <p className="text-caption text-muted-foreground hidden sm:block">
            {selected.length} of {MAX_COMPARE} selected
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="md" className="gap-2" disabled={compareModels.length < 2}>
                <Scale className="size-4" aria-hidden="true" />
                Compare ({selected.length})
              </Button>
            </DialogTrigger>
            <DialogContent
              title="Compare selected models"
              className="max-h-[85vh] max-w-6xl overflow-y-auto"
            >
              <div className="mt-4">
                <ComparisonTable models={compareModels} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
