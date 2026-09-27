import { Container, Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { businessModel } from "@/lib/content";

/**
 * Business model — the four-stage import & distribution cycle.
 *
 * Transcribed from the legacy business_model1-4.png card images into an ordered
 * list so the sequence is conveyed semantically as well as visually.
 */
export function BusinessModel() {
  return (
    <Section
      id="business-model"
      aria-labelledby="business-model-title"
      className="bg-ink-50"
    >
      <Container>
        <SectionHeading
          id="business-model-title"
          eyebrow={businessModel.eyebrow}
          title={businessModel.title}
          lead={businessModel.lead}
        />

        <ol className="mt-12 grid gap-x-6 gap-y-8 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {businessModel.steps.map((step, index) => (
            <li key={step.step} className="relative flex flex-col">
              {/* Connector rail between steps on wide screens */}
              {index < businessModel.steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-6 left-14 hidden h-px w-[calc(100%-2.5rem)] bg-gradient-to-r from-brand-200 to-transparent lg:block"
                />
              ) : null}

              <span className="relative z-10 inline-flex size-12 items-center justify-center rounded-full bg-brand-700 text-base font-bold text-white ring-4 ring-ink-50">
                {step.step}
              </span>
              <h3 className="mt-5 text-heading font-bold text-brand-800">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
