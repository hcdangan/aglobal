import type { NextConfig } from "next";

/**
 * Next.js configuration.
 * Kept intentionally small: this is a fully static marketing site, so we can
 * emit a plain `out/` directory that any CDN or static host can serve.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Emit a static site (no Node server required at runtime).
  output: "export",
  trailingSlash: true,
  images: {
    // `next/image` optimization is unavailable with `output: "export"`,
    // so images are served as-is.
    unoptimized: true,
  },
};

export default nextConfig;
