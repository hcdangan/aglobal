import { SolutionTabs } from "@/components/sections/solution-tabs";
import { Container, Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { solutions } from "@/lib/content";

/**
 * Solutions — end-to-end distribution and regulatory / market-access services.
 * Server component wrapper; only the tab switcher ships client JavaScript.
 */
export function Solutions() {
  return (
    <Section
      id="solutions"
      aria-labelledby="solutions-title"
      className="bg-gradient-to-b from-white to-ink-50"
    >
      <Container>
        <SectionHeading
          id="solutions-title"
          eyebrow="Solutions"
          title="Two service lines, one accountable partner"
          lead="Whether you need products moved safely across the archipelago or cleared for the Philippine market, our teams cover the full journey."
        />
        <div className="mt-10 sm:mt-12">
          <SolutionTabs groups={solutions} />
        </div>
      </Container>
    </Section>
  );
}
