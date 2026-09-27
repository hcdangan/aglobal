import { Container, Section } from "@/components/ui/layout";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { partnerLogos, partners } from "@/lib/content";

/** Uniform optical size for every logo tile in the rail. */
const LOGO_BOX = 88;

/**
 * Principal & partner logo marquee.
 *
 * The legacy logo wall shipped 15 partner JPEGs *twice* (≈30 requests, ~1 MB) to
 * fake a continuous scroll. This version uses the same real logos — recovered
 * from the legacy site, re-encoded to 256×256 PNG with the white page background
 * removed so they sit cleanly on the light panel — and animates a single track
 * with CSS.
 *
 * Accessibility: each logo carries its real brand name as `alt`, taken from the
 * wordmark printed inside the artwork. The duplicated track that makes the loop
 * seamless is `aria-hidden`, so the list is announced exactly once. The rail is
 * also focusable, which lets keyboard users pause it via `:focus-within`.
 */
export function Partners() {
  const track = (duplicate: boolean) => (
    <ul
      aria-hidden={duplicate || undefined}
      className="flex shrink-0 items-center"
    >
      {partnerLogos.map((logo) => (
        <li
          key={`${logo.src}${duplicate ? "-dup" : ""}`}
          className="flex shrink-0 items-center justify-center px-4 sm:px-6"
          style={{ height: LOGO_BOX }}
        >
          <OptimizedImage
            src={logo.src}
            alt={duplicate ? "" : logo.name}
            width={256}
            height={256}
            // Not lazy: every logo must be present the moment the rail scrolls
            // into view, otherwise the marquee animates through blank tiles.
            // Each file is 10–34 kB, so the whole rail is ~297 kB.
            loading="eager"
            decoding="async"
            style={{ height: LOGO_BOX, width: "auto" }}
            className="object-contain"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <Section
      id="partners"
      aria-labelledby="partners-title"
      spacing="compact"
      className="overflow-hidden border-y border-ink-100 bg-ink-50"
    >
      <Container>
        <SectionHeading
          id="partners-title"
          eyebrow="Partners"
          title={partners.title}
          lead={partners.lead}
          align="center"
        />
      </Container>

      <div
        tabIndex={0}
        aria-label="Partner logos"
        className="relative mt-10 flex overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div className="flex w-max rail-marquee animate-marquee motion-reduce:animate-none">
          {track(false)}
          {track(true)}
        </div>
      </div>
    </Section>
  );
}
