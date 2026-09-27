import { Icon } from "@/components/ui/icon";
import { Container, Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { productCategories } from "@/lib/content";

/**
 * Product categories.
 *
 * The legacy grid used six stock photographs. Each category is now an
 * icon-led card, which keeps the page fast (no image payload) while remaining
 * fully scannable on small screens.
 */
export function Products() {
  return (
    <Section id="products" aria-labelledby="products-title">
      <Container>
        <SectionHeading
          id="products-title"
          eyebrow="What we carry"
          title="Product categories"
          lead="A diversified portfolio spanning the entirety of healthcare — supporting every phase of life, from growth and development to critical care."
        />

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:grid-cols-3 lg:grid-cols-6">
          {productCategories.map((category) => (
            <li key={category.name}>
              <div className="flex h-full flex-col items-start rounded-2xl border border-ink-100 bg-white p-4 shadow-card transition-[box-shadow,transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:p-5">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500/10 to-brand-700/10 text-brand-600">
                  <Icon name={category.icon} className="size-6" />
                </span>
                <h3 className="mt-4 text-sm font-bold tracking-wide text-brand-800 uppercase sm:text-base">
                  {category.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-500 sm:text-sm">
                  {category.blurb}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
