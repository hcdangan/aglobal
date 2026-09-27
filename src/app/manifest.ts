import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site-config";

/** Required for `output: "export"` route handlers. */
export const dynamic = "force-static";

/** Web app manifest, so the site installs cleanly on mobile devices. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#002e63",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/logo.png", sizes: "1500x271", type: "image/png" },
    ],
  };
}
