import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/layout";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/lib/site-config";

const socials = [
  { key: "facebook", label: "Facebook", href: siteConfig.social.facebook },
  { key: "linkedin", label: "LinkedIn", href: siteConfig.social.linkedin },
  { key: "instagram", label: "Instagram", href: siteConfig.social.instagram },
] as const;

/** Site footer: brand, quick links and full contact details. */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const { contact } = siteConfig;

  return (
    <footer className="bg-brand-950 text-brand-100">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <div className="inline-flex rounded-xl bg-white px-3 py-2">
              <Logo className="h-9" decorative />
            </div>
            <p className="mt-5 max-w-sm font-serif text-lg italic text-brand-200">
              &ldquo;{siteConfig.tagline}&rdquo;
            </p>
            <ul className="mt-6 flex gap-2">
              {socials.map((social) => (
                <li key={social.key}>
                  <a
                    href={social.href}
                    aria-label={`${siteConfig.name} on ${social.label}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-11 items-center justify-center rounded-xl bg-white/10 text-white transition-colors hover:bg-brand-500"
                  >
                    <Icon name={social.key} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-brand-100 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex gap-3">
                <Icon name="pin" className="mt-0.5 size-5 text-brand-400" />
                <address className="not-italic leading-relaxed text-brand-100">
                  {contact.address.street}
                  <br />
                  {contact.address.city}, {contact.address.region}
                  <br />
                  {contact.address.country}
                </address>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 size-5 text-brand-400" />
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Icon name="phone" className="mt-0.5 size-5 text-brand-400" />
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="transition-colors hover:text-white"
                >
                  {contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-brand-300">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-xs font-semibold text-brand-200 transition-colors hover:text-white"
          >
            Back to top
            <Icon name="arrow-right" className="size-4 -rotate-90" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
