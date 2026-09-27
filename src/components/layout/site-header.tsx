import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { Logo } from "@/components/ui/logo";
import { siteConfig } from "@/lib/site-config";

/**
 * Sticky site header.
 *
 * Server-rendered shell; only the mobile disclosure is a client component, so
 * the desktop navigation ships zero JavaScript.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-100/80 bg-white/85 backdrop-blur-md">
      <Container className="flex h-[var(--header-height)] items-center justify-between gap-4">
        <a
          href="#top"
          className="flex shrink-0 items-center rounded-lg"
          aria-label={`${siteConfig.name} — home`}
        >
          <Logo priority className="h-8 sm:h-10" />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3.5 py-2 text-sm font-semibold text-ink-600 transition-colors hover:bg-brand-50 hover:text-brand-700"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="#contact" size="sm" className="hidden sm:inline-flex">
            Get in touch
          </Button>
          <MobileNav navigation={siteConfig.navigation} />
        </div>
      </Container>
    </header>
  );
}
