import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site-config";

/** Required for `output: "export"` route handlers. */
export const dynamic = "force-static";

/**
 * Sitemap.
 *
 * The site is currently a single page whose sections are anchor targets, so
 * only the canonical root is listed. Fragment-only URLs are intentionally
 * omitted: search engines treat them as the same URL as the root.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
