import { absoluteUrl, siteConfig } from "@/lib/site-config";

/**
 * Schema.org JSON-LD.
 *
 * Describes the organisation once, in one place, so search engines can build a
 * knowledge panel for AGlobal Care, Inc.
 */
export function buildJsonLd() {
  const { contact, social } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        alternateName: siteConfig.shortName,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/logo.png"),
          width: 1500,
          height: 271,
        },
        slogan: siteConfig.tagline,
        description: siteConfig.description,
        email: contact.email,
        telephone: contact.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.address.street,
          addressLocality: contact.address.city,
          addressRegion: contact.address.region,
          addressCountry: contact.address.countryCode,
        },
        areaServed: {
          "@type": "Country",
          name: contact.address.country,
        },
        sameAs: [social.facebook, social.linkedin, social.instagram],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: "en-PH",
        publisher: { "@id": absoluteUrl("/#organization") },
      },
    ],
  };
}
