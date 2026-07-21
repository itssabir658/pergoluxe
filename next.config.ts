import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // PPR requires a canary release; re-enable (`ppr: "incremental"`) once
    // the project moves off stable 15.3.0, per the phased rollout in
    // ARCHITECTURE.md §5/§10 (Phase 8 of the roadmap).
    //
    // `typedRoutes` is also off for now, not permanently: it type-checks
    // every `<Link href>` against routes that actually have a `page.tsx`.
    // The global shell built in this pass links to routes (`/products`,
    // `/configurator`, `/account`, ...) that don't exist as pages yet by
    // design — this is chrome built ahead of the pages it will wrap. Turn
    // this back on once every route in `src/constants/routes.ts` resolves
    // to a real page.
    inlineCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
