import { ContactForm } from "@/components/sections/contact-form";
import { Icon } from "@/components/ui/icon";
import { Container, Section } from "@/components/ui/layout";
import { SectionHeading } from "@/components/ui/section-heading";
import { contact } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const { contact: details } = siteConfig;

const detailItems = [
  {
    icon: "mail",
    label: "Email",
    value: details.email,
    href: `mailto:${details.email}`,
  },
  {
    icon: "phone",
    label: "Contact no.",
    value: details.phone,
    href: `tel:${details.phoneHref}`,
  },
  {
    icon: "pin",
    label: "Address",
    value: `${details.address.street}, ${details.address.city}, ${details.address.region}, ${details.address.country}`,
    href: undefined,
  },
] as const;

/** Contact section: enquiry form plus direct contact channels. */
export function Contact() {
  return (
    <Section id="contact" aria-labelledby="contact-title">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              id="contact-title"
              eyebrow="Contact"
              title={contact.title}
              lead={contact.lead}
            />

            <ul className="mt-8 space-y-3">
              {detailItems.map((item) => (
                <li
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-inset ring-brand-100">
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block text-sm font-semibold break-words text-brand-700 transition-colors hover:text-brand-500 sm:text-base"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-sm leading-relaxed text-ink-700 sm:text-base">
                        {item.value}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 flex gap-3 rounded-2xl bg-ink-50 p-5 text-xs leading-relaxed text-ink-600 sm:text-sm">
              <Icon name="shield" className="mt-0.5 size-5 shrink-0 text-brand-500" />
              {contact.adrNote}
            </p>
          </div>

          <div className="rounded-3xl border border-ink-100 bg-white p-6 shadow-card sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  );
}
