/**
 * Central site metadata.
 *
 * Everything that identifies the site lives here so that metadata, JSON-LD,
 * the sitemap and the UI all read from a single source of truth.
 */

export const siteConfig = {
  name: "AGlobal Care, Inc.",
  shortName: "AGlobal Care",
  legalName: "AGlobal Care, Inc.",
  tagline: "Changing human life globally",
  description:
    "AGlobal Care, Inc. provides accessible, innovative, safe and reliable healthcare solutions — pharmaceutical distribution, regulatory and market access services for the Philippines.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.aglobalcare.com",
  locale: "en_PH",
  founded: "2013",
  contact: {
    email: "info@aglobalcare.com",
    phone: "+63 2 8726 4514",
    phoneHref: "+63287264514",
    address: {
      street: "One World Business Center, J. Tiongquiao Street",
      city: "Las Piñas City",
      region: "Metro Manila",
      country: "Philippines",
      countryCode: "PH",
    },
  },
  social: {
    facebook: "https://www.facebook.com/aglobalcare",
    linkedin: "https://www.linkedin.com/company/aglobalcare",
    instagram: "https://www.instagram.com/aglobalcare",
  },
  navigation: [
    { label: "Products", href: "#products" },
    { label: "Solutions", href: "#solutions" },
    { label: "Business Model", href: "#business-model" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL helper used by metadata, sitemap and JSON-LD. */
export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
