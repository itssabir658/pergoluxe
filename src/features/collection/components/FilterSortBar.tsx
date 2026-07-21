"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { cn } from "@/utils/cn";
import { useMediaQuery } from "@/hooks";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortOptions } from "@/features/collection/constants";
import { ActiveFilterChips } from "@/features/collection/components/ActiveFilterChips";
import { FilterControls } from "@/features/collection/components/FilterControls";
import type {
  CollectionFacets,
  CollectionFilterState,
  CollectionProduct,
  SortOption,
} from "@/features/collection/types";

type FilterSortBarProps = {
  products: CollectionProduct[];
  facets: CollectionFacets;
  filters: CollectionFilterState;
  sort: SortOption;
  activeCount: number;
  resultCount: number;
  onToggleArrayValue: (
    key: "model" | "size" | "colour" | "roofType" | "availability",
    value: string,
  ) => void;
  onSetMotorized: (value: boolean | null) => void;
  onSetPriceRange: (min: number | null, max: number | null) => void;
  onSetWindRatingMin: (value: number | null) => void;
  onSetSnowLoadMin: (value: number | null) => void;
  onSetSort: (sort: SortOption) => void;
  onClearAll: () => void;
};

/**
 * One responsive Drawer (vaul), not two separate desktop/mobile filter
 * UIs — `direction` alone switches it from a right-side panel (desktop,
 * reads as "sticky filters always one click away") to a bottom sheet
 * (mobile, the explicit "filter drawer" the brief calls for). The bar
 * itself is `sticky` under the site header so the trigger, sort, and
 * active chips stay reachable while scrolling the grid.
 */
export function FilterSortBar({
  products,
  facets,
  filters,
  sort,
  activeCount,
  resultCount,
  onToggleArrayValue,
  onSetMotorized,
  onSetPriceRange,
  onSetWindRatingMin,
  onSetSnowLoadMin,
  onSetSort,
  onClearAll,
}: FilterSortBarProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background/95 border-border z-dropdown sticky top-[var(--header-stack-height)] border-b backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 py-4">
        <div className="flex items-center gap-3">
          <Drawer
            open={open}
            onOpenChange={setOpen}
            direction={isDesktop ? "right" : "bottom"}
          >
            <DrawerTrigger asChild>
              <Button variant="outline" size="md" className="gap-2">
                <SlidersHorizontal className="size-4" aria-hidden="true" />
                Filters
                {activeCount > 0 && (
                  <span className="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-full text-xs">
                    {activeCount}
                  </span>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent title="Filter products" hideTitle={false}>
              <div className="border-border flex items-center justify-between border-b px-6 py-4">
                <p className="text-h4">Filters</p>
                <DrawerClose asChild>
                  <Button variant="ghost" size="sm">
                    Done
                  </Button>
                </DrawerClose>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <FilterControls
                  products={products}
                  facets={facets}
                  filters={filters}
                  onToggleArrayValue={onToggleArrayValue}
                  onSetMotorized={onSetMotorized}
                  onSetPriceRange={onSetPriceRange}
                  onSetWindRatingMin={onSetWindRatingMin}
                  onSetSnowLoadMin={onSetSnowLoadMin}
                />
              </div>
              <div className="border-border border-t px-6 py-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={onClearAll}
                  disabled={activeCount === 0}
                >
                  Clear all
                </Button>
              </div>
            </DrawerContent>
          </Drawer>

          <p className="text-caption text-muted-foreground hidden sm:block">
            {resultCount} {resultCount === 1 ? "result" : "results"}
          </p>
        </div>

        <Select value={sort} onValueChange={(value) => onSetSort(value as SortOption)}>
          <SelectTrigger className={cn("w-auto min-w-40")}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ActiveFilterChips
        filters={filters}
        onToggleArrayValue={onToggleArrayValue}
        onSetMotorized={onSetMotorized}
        onSetPriceRange={onSetPriceRange}
        onSetWindRatingMin={onSetWindRatingMin}
        onSetSnowLoadMin={onSetSnowLoadMin}
        onClearAll={onClearAll}
      />
    </div>
  );
}
