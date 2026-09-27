import { Icon } from "@/components/ui/icon";
import { Container, Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { impactHighlights } from "@/lib/content";

/**
 * Company impact cards.
 *
 * The legacy site rendered these three value propositions as flat PNGs, so the
 * copy was invisible to search engines and screen readers. They are now real
 * markup (text transcribed from impact1-3.png).
 */
export function Impact() {
  return (
    <Section id="impact" aria-labelledby="impact-title">
      <Container>
        <SectionHeading
          id="impact-title"
          eyebrow="Our impact"
          title="Healthcare that reaches further"
          lead="Three commitments shape how we build brands, extend reach and grow portfolios for the partners we represent."
        />

        <ul className="mt-12 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {impactHighlights.map((item) => (
            <li
              key={item.title}
              className="group relative flex flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift sm:p-7"
            >
              <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                <Icon name={item.icon} className="size-6" />
              </span>
              <h3 className="mt-5 text-heading font-bold text-brand-800">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600 sm:text-base">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
