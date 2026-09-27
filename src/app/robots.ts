import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site-config";

/** Required for `output: "export"` route handlers. */
export const dynamic = "force-static";

/** robots.txt — allow everything and point crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
