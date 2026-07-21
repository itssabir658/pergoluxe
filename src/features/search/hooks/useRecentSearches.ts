"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  MAX_RECENT_SEARCHES,
  RECENT_SEARCHES_STORAGE_KEY,
} from "@/features/search/constants";

export function useRecentSearches() {
  const [recent, setRecent] = useLocalStorage<string[]>(RECENT_SEARCHES_STORAGE_KEY, []);

  function addRecentSearch(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecent((prev) =>
      [
        trimmed,
        ...prev.filter((existing) => existing.toLowerCase() !== trimmed.toLowerCase()),
      ].slice(0, MAX_RECENT_SEARCHES),
    );
  }

  function clearRecentSearches() {
    setRecent([]);
  }

  return { recent, addRecentSearch, clearRecentSearches };
}
