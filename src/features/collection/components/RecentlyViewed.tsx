"use client";

import { useLocalStorage } from "@/hooks";
import { Container, Section } from "@/components/layout";
import { ProductCard } from "@/features/collection/components/ProductCard";
import type { CollectionProduct } from "@/features/collection/types";

const RECENTLY_VIEWED_KEY = "pergoluxe:recently-viewed";
const MAX_RECENTLY_VIEWED = 4;

/**
 * The write side of this feature — call from the future Product Detail
 * Page on mount to record a view. Exported now so the PDP milestone only
 * needs to call it, not design the storage shape; nothing in this
 * milestone calls it yet since there's no PDP to call it from.
 */
export function useRecordProductView() {
  const [, setHandles] = useLocalStorage<string[]>(RECENTLY_VIEWED_KEY, []);
  return function recordView(handle: string) {
    setHandles((prev) =>
      [handle, ...prev.filter((h) => h !== handle)].slice(0, MAX_RECENTLY_VIEWED),
    );
  };
}

/**
 * "Future-ready," per the brief, means genuinely functional once something
 * writes to it — not a fake placeholder row. With no PDP yet (out of this
 * milestone's scope), the stored list is always empty on a fresh browser,
 * so this renders nothing rather than an empty state that would show on
 * every single visit for a feature that hasn't shipped its write side yet.
 * The moment the PDP calls `useRecordProductView`, this section starts
 * populating with no further change here.
 */
export function RecentlyViewed({ allProducts }: { allProducts: CollectionProduct[] }) {
  const [handles] = useLocalStorage<string[]>(RECENTLY_VIEWED_KEY, []);
  const recent = handles
    .map((handle) => allProducts.find((p) => p.handle === handle))
    .filter((p): p is CollectionProduct => Boolean(p));

  if (recent.length === 0) return null;

  return (
    <Section spacing="sm" className="bg-surface">
      <Container size="content">
        <h2 className="text-h4 text-foreground">Recently Viewed</h2>
        <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {recent.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
