"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock, Search as SearchIcon, TrendingUp, X } from "lucide-react";

import { cn } from "@/utils/cn";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Cluster } from "@/components/layout/Cluster";
import { Stack } from "@/components/layout/Stack";
import { Divider } from "@/components/layout/Divider";
import { primaryNav } from "@/config/nav";
import { ROUTES } from "@/constants/routes";
import { useRecentSearches } from "@/features/search/hooks/useRecentSearches";
import { POPULAR_SEARCHES } from "@/features/search/constants";

const productCategories =
  primaryNav.find((item) => item.label === "Products")?.megaMenu?.categories ?? [];

/**
 * Client-side match over the site's own nav taxonomy — a real (if small)
 * search, not a mockup. This function is the seam: swap its body for an
 * Algolia/Shopify predictive-search call later and nothing above it
 * (the modal, the sections) needs to change.
 */
function searchLocalIndex(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return productCategories.filter(
    (category) =>
      category.title.toLowerCase().includes(q) ||
      category.description.toLowerCase().includes(q),
  );
}

type SearchModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const { recent, addRecentSearch, clearRecentSearches } = useRecentSearches();
  const results = useMemo(() => searchLocalIndex(query), [query]);
  const hasQuery = query.trim().length > 0;

  function runSearch(term: string) {
    setQuery(term);
    addRecentSearch(term);
  }

  function handleOpenChange(next: boolean) {
    if (!next) setQuery("");
    onOpenChange(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        title="Search"
        hideTitle
        hideCloseButton
        className="top-24 flex max-h-[70vh] max-w-2xl -translate-y-0 flex-col gap-0 overflow-hidden p-0"
      >
        <div className="border-border flex items-center gap-3 border-b px-5 py-4">
          <SearchIcon
            className="text-muted-foreground size-5 shrink-0"
            aria-hidden="true"
          />
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && hasQuery) addRecentSearch(query);
            }}
            placeholder="Search products, projects, buying guides…"
            aria-label="Search"
            className="h-auto border-0 px-0 shadow-none focus-visible:ring-0"
          />
          <button
            type="button"
            onClick={() => handleOpenChange(false)}
            aria-label="Close search"
            className="text-muted-foreground duration-fast hover:bg-muted hover:text-foreground focus-visible:ring-ring/50 flex size-8 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5">
          {!hasQuery ? (
            <Stack gap="lg">
              {recent.length > 0 && (
                <Stack gap="sm">
                  <div className="flex items-center justify-between">
                    <SectionLabel icon={Clock}>Recent searches</SectionLabel>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-caption text-muted-foreground hover:text-foreground underline underline-offset-2"
                    >
                      Clear
                    </button>
                  </div>
                  <Cluster gap="sm">
                    {recent.map((term) => (
                      <SuggestionChip key={term} onClick={() => runSearch(term)}>
                        {term}
                      </SuggestionChip>
                    ))}
                  </Cluster>
                </Stack>
              )}

              <Stack gap="sm">
                <SectionLabel icon={TrendingUp}>Popular searches</SectionLabel>
                <Cluster gap="sm">
                  {POPULAR_SEARCHES.map((term) => (
                    <SuggestionChip key={term} onClick={() => runSearch(term)}>
                      {term}
                    </SuggestionChip>
                  ))}
                </Cluster>
              </Stack>
            </Stack>
          ) : (
            <Stack gap="lg">
              <Stack gap="sm">
                <SectionLabel>Suggested products</SectionLabel>
                {results.length > 0 ? (
                  <Stack gap="xs">
                    {results.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        onClick={() => onOpenChange(false)}
                        className="duration-fast hover:bg-muted rounded-md px-3 py-2.5 transition-colors"
                      >
                        <p className="text-body font-medium">{category.title}</p>
                        <p className="text-caption text-muted-foreground">
                          {category.description}
                        </p>
                      </Link>
                    ))}
                  </Stack>
                ) : (
                  <p className="text-body text-muted-foreground px-3">
                    No products match &ldquo;{query}&rdquo; yet.
                  </p>
                )}
              </Stack>

              <Divider />

              <Stack gap="sm">
                <SectionLabel>Suggested projects</SectionLabel>
                <p className="text-body text-muted-foreground px-3">
                  Project search connects once the project catalog is live —{" "}
                  <Link
                    href={ROUTES.projects}
                    className="text-foreground font-medium underline underline-offset-2"
                  >
                    browse all projects
                  </Link>{" "}
                  in the meantime.
                </p>
              </Stack>
            </Stack>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon?: typeof Clock;
  children: React.ReactNode;
}) {
  return (
    <div className="text-label text-muted-foreground flex items-center gap-1.5">
      {Icon && <Icon className="size-3.5" aria-hidden="true" />}
      {children}
    </div>
  );
}

function SuggestionChip({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-caption border-border duration-fast rounded-full border px-3 py-1.5 transition-colors",
        "hover:border-primary hover:bg-muted",
        "focus-visible:ring-ring/50 focus-visible:ring-2 focus-visible:outline-none",
      )}
    >
      {children}
    </button>
  );
}
