import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // PPR requires a canary release; re-enable (`ppr: "incremental"`) once
    // the project moves off stable 15.3.0, per the phased rollout in
    // ARCHITECTURE.md §5/§10 (Phase 8 of the roadmap).
    typedRoutes: true,
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
