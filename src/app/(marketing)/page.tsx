import { CollectionShowcase, Hero, TrustBar } from "@/features/home";

/**
 * Homepage — Part 1 of the build (Hero, Trust Bar, Collections), per the
 * section sequence in HOMEPAGE_STRATEGY.md §3. Remaining sections
 * (Configurator Preview onward) land in subsequent milestones and slot in
 * below CollectionShowcase. Metadata is inherited from the root layout's
 * defaults, which already carry the homepage's title/description/OG set.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CollectionShowcase />
    </>
  );
}
