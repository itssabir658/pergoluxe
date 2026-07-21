import { Container, Section } from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductCardSkeleton } from "@/features/collection";

/**
 * Not visibly triggered today — the placeholder catalogue resolves
 * synchronously, so this route never actually suspends. It exists for the
 * moment a real Shopify data fetch introduces real latency
 * (COMMERCE_ARCHITECTURE.md §13's Server Components plan), at which point
 * this is already the correct shape: no code change needed, just an
 * async boundary that starts actually using it.
 */
export default function CollectionLoading() {
  return (
    <>
      <Skeleton className="h-[70vh] w-full rounded-none lg:h-[80vh]" />
      <Section spacing="sm">
        <Container size="narrow" className="text-center">
          <Skeleton className="mx-auto h-6 w-64" />
          <Skeleton className="mx-auto mt-3 h-4 w-96 max-w-full" />
        </Container>
      </Section>
      <Container size="content">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 py-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </>
  );
}
