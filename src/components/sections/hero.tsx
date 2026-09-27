import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Container } from "@/components/ui/layout";
import { hero, stats } from "@/lib/content";

/**
 * Hero.
 *
 * The legacy site opened with an autoplaying background video (heavy, muted,
 * inaccessible). It is replaced by a CSS-only brand gradient plus a decorative
 * globe grid — no media requests, and the headline is real text.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-brand-800 text-white"
    >
      {/* Decorative background: radial brand glow + subtle globe grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_120%_at_15%_0%,var(--color-brand-500)_0%,var(--color-brand-800)_45%,var(--color-brand-950)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.16] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(90%_80%_at_70%_20%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 -z-10 size-[28rem] rounded-full bg-accent-500/20 blur-3xl"
      />

      <Container className="py-16 sm:py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-brand-100 ring-1 ring-inset ring-white/15 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-accent-400" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-display font-bold text-white text-balance"
          >
            {hero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-brand-100 sm:text-lg">
            {hero.lead}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              href={hero.primaryCta.href}
              size="lg"
              variant="accent"
              iconRight={<Icon name="arrow-right" className="size-5" />}
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              size="lg"
              variant="secondary"
              className="bg-white/10 text-white ring-white/25 backdrop-blur-sm hover:bg-white/20 hover:ring-white/40"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/15 pt-10 sm:mt-16 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs font-medium text-brand-200 sm:text-sm">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
