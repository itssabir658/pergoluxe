"use client";

import { useCallback, useState } from "react";
import { Search } from "lucide-react";

import { cn } from "@/utils/cn";
import { useSearchShortcut } from "@/features/search/hooks/useSearchShortcut";
import { SearchModal } from "@/features/search/components/SearchModal";

type SearchTriggerProps = {
  className?: string;
  /** Renders as an icon-only button (header) vs. a labeled search field
   * affordance (mobile quick actions) from the same trigger + modal pair. */
  variant?: "icon" | "field";
};

export function SearchTrigger({ className, variant = "icon" }: SearchTriggerProps) {
  const [open, setOpen] = useState(false);
  const openSearch = useCallback(() => setOpen(true), []);
  useSearchShortcut(openSearch);

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={openSearch}
          aria-label="Search (Cmd+K)"
          className={cn(
            "duration-fast focus-visible:ring-ring/50 flex size-11 items-center justify-center rounded-md transition-colors hover:bg-[currentColor]/10 focus-visible:ring-2 focus-visible:outline-none",
            className,
          )}
        >
          <Search className="size-5" aria-hidden="true" />
        </button>
      ) : (
        <button
          type="button"
          onClick={openSearch}
          className={cn(
            "text-body border-input bg-background text-muted-foreground duration-fast hover:border-ring flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left transition-colors",
            className,
          )}
        >
          <Search className="size-4 shrink-0" aria-hidden="true" />
          Search products, projects…
        </button>
      )}
      <SearchModal open={open} onOpenChange={setOpen} />
    </>
  );
}
