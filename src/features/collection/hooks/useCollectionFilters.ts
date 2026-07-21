"use client";

import { useCallback, useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { CollectionFilterState, SortOption } from "@/features/collection/types";
import { EMPTY_FILTER_STATE } from "@/features/collection/types";

const SORT_KEY = "sort";
const DEFAULT_SORT: SortOption = "featured";

type ArrayFilterKey = "model" | "size" | "colour" | "roofType" | "availability";

function parseArray(params: URLSearchParams, key: string): string[] {
  const raw = params.get(key);
  return raw ? raw.split(",").filter(Boolean) : [];
}

function parseNumber(params: URLSearchParams, key: string): number | null {
  const raw = params.get(key);
  if (!raw) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function parseState(params: URLSearchParams): CollectionFilterState {
  const motorRaw = params.get("motor");
  return {
    model: parseArray(params, "model"),
    size: parseArray(params, "size"),
    colour: parseArray(params, "colour"),
    roofType: parseArray(params, "roof"),
    availability: parseArray(params, "avail"),
    motorized: motorRaw === "true" ? true : motorRaw === "false" ? false : null,
    priceMin: parseNumber(params, "priceMin"),
    priceMax: parseNumber(params, "priceMax"),
    windRatingMin: parseNumber(params, "wind"),
    snowLoadMin: parseNumber(params, "snow"),
  };
}

function serializeState(state: CollectionFilterState, sort: SortOption): URLSearchParams {
  const params = new URLSearchParams();
  if (state.model.length) params.set("model", state.model.join(","));
  if (state.size.length) params.set("size", state.size.join(","));
  if (state.colour.length) params.set("colour", state.colour.join(","));
  if (state.roofType.length) params.set("roof", state.roofType.join(","));
  if (state.availability.length) params.set("avail", state.availability.join(","));
  if (state.motorized !== null) params.set("motor", String(state.motorized));
  if (state.priceMin !== null) params.set("priceMin", String(state.priceMin));
  if (state.priceMax !== null) params.set("priceMax", String(state.priceMax));
  if (state.windRatingMin !== null) params.set("wind", String(state.windRatingMin));
  if (state.snowLoadMin !== null) params.set("snow", String(state.snowLoadMin));
  if (sort !== DEFAULT_SORT) params.set(SORT_KEY, sort);
  return params;
}

/**
 * Filter + sort state lives entirely in the URL — never component state —
 * so a filtered/sorted view is linkable, shareable, and survives a back
 * navigation, matching the same rule `ARCHITECTURE.md` §6 already applies
 * to variant selection. `useTransition` wraps every update: it's what
 * gives the grid a real (not simulated) `isPending` state to render a
 * loading skeleton against, and it's also exactly the mechanism a future
 * Shopify-backed version needs anyway, since re-resolving `productFilters`
 * against the Storefront API is genuinely async — this hook's contract
 * doesn't change when the filtering behind it does.
 */
export function useCollectionFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filters = useMemo(() => parseState(searchParams), [searchParams]);
  const sort = useMemo(
    () => (searchParams.get(SORT_KEY) as SortOption | null) ?? DEFAULT_SORT,
    [searchParams],
  );

  const commit = useCallback(
    (nextFilters: CollectionFilterState, nextSort: SortOption) => {
      const params = serializeState(nextFilters, nextSort);
      const query = params.toString();
      startTransition(() => {
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
      });
    },
    [pathname, router],
  );

  const toggleArrayValue = useCallback(
    (key: ArrayFilterKey, value: string) => {
      const current = filters[key];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      commit({ ...filters, [key]: next }, sort);
    },
    [filters, sort, commit],
  );

  const setMotorized = useCallback(
    (value: boolean | null) => commit({ ...filters, motorized: value }, sort),
    [filters, sort, commit],
  );

  const setPriceRange = useCallback(
    (min: number | null, max: number | null) =>
      commit({ ...filters, priceMin: min, priceMax: max }, sort),
    [filters, sort, commit],
  );

  const setWindRatingMin = useCallback(
    (value: number | null) => commit({ ...filters, windRatingMin: value }, sort),
    [filters, sort, commit],
  );

  const setSnowLoadMin = useCallback(
    (value: number | null) => commit({ ...filters, snowLoadMin: value }, sort),
    [filters, sort, commit],
  );

  const setSort = useCallback(
    (next: SortOption) => commit(filters, next),
    [filters, commit],
  );

  const clearAll = useCallback(() => commit(EMPTY_FILTER_STATE, sort), [sort, commit]);

  const activeCount = useMemo(() => {
    let count = 0;
    count += filters.model.length + filters.size.length + filters.colour.length;
    count += filters.roofType.length + filters.availability.length;
    if (filters.motorized !== null) count += 1;
    if (filters.priceMin !== null || filters.priceMax !== null) count += 1;
    if (filters.windRatingMin !== null) count += 1;
    if (filters.snowLoadMin !== null) count += 1;
    return count;
  }, [filters]);

  return {
    filters,
    sort,
    isPending,
    activeCount,
    toggleArrayValue,
    setMotorized,
    setPriceRange,
    setWindRatingMin,
    setSnowLoadMin,
    setSort,
    clearAll,
  };
}
