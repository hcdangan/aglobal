import { Icon } from "@/components/ui/icon";
import { Container, Section } from "@/components/ui/layout";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { SectionHeading } from "@/components/ui/section-heading";
import { about, coreValues, team } from "@/lib/content";

/** About, mission and core values. */
export function About() {
  return (
    <Section id="about" aria-labelledby="about-title">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
          <div>
            <SectionHeading
              id="about-title"
              eyebrow="About us"
              title={about.title}
              lead={about.lead}
            />
            <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
              {about.body}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-ink-600 sm:text-base">
              {about.closing}
            </p>
          </div>

          <div className="rounded-2xl bg-brand-800 p-7 text-white shadow-lift sm:p-9">
            <span className="inline-flex size-12 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-inset ring-white/15">
              <Icon name="users" className="size-6" />
            </span>
            <h3 className="mt-5 text-heading font-bold text-white">Our mission</h3>
            <p className="mt-3 font-serif text-lg italic text-brand-100">
              &ldquo;{about.missionShort}&rdquo;
            </p>
            <p className="mt-5 border-t border-white/15 pt-5 text-sm leading-relaxed text-brand-100">
              {about.mission}
            </p>
          </div>
        </div>

        <h3 className="mt-16 text-heading font-bold text-brand-800 sm:mt-20">
          Our core values
        </h3>
        <p className="mt-2 text-sm text-ink-500 sm:text-base">
          Four letters. Four commitments we hold ourselves to.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {coreValues.map((value) => (
            <li
              key={value.letter}
              className="flex gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-card sm:p-6"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-700 font-serif text-xl font-bold text-white"
              >
                {value.letter}
              </span>
              <div>
                <h4 className="text-sm font-bold text-brand-800 sm:text-base">
                  <span className="sr-only">{value.letter} — </span>
                  {value.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-600 sm:text-sm">
                  {value.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/**
 * Leadership team.
 *
 * Real studio portraits, re-encoded from the legacy `harish/javish/pratik.jpg`
 * (1066×1600, ~190 kB each) into 3:4 WebP at 640×854 and 320×427. Each portrait
 * is ~15–21 kB, so all three together weigh less than a fifth of a single
 * original file. `srcset`/`sizes` keep phones on the small variant.
 *
 * Members without a photo fall back to an initials avatar, so this section never
 * depends on imagery being supplied.
 */
export function Team() {
  return (
    <Section
      id="team"
      aria-labelledby="team-title"
      spacing="compact"
      className="bg-ink-50"
    >
      <Container>
        <SectionHeading
          id="team-title"
          eyebrow="Leadership"
          title="Meet the team"
          lead="The people steering AGlobal Care's growth across local and international markets."
        />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <li
              key={member.name}
              className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
            >
              {member.photo ? (
                <OptimizedImage
                  src={member.photo.src}
                  srcSet={`${member.photo.src.replace(".webp", "-320.webp")} 320w, ${member.photo.src} ${member.photo.width}w`}
                  sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 90vw"
                  alt={`Portrait of ${member.name}, ${member.role}`}
                  width={member.photo.width}
                  height={member.photo.height}
                  className="aspect-3/4 w-full object-cover object-top"
                />
              ) : (
                <div className="flex aspect-3/4 w-full items-center justify-center bg-gradient-to-br from-brand-500 to-brand-700">
                  <span
                    aria-hidden="true"
                    className="text-4xl font-bold tracking-wide text-white"
                  >
                    {member.initials}
                  </span>
                </div>
              )}

              <div className="p-5">
                <h3 className="text-base font-bold text-brand-800 sm:text-lg">
                  {member.name}
                </h3>
                <p className="mt-1 text-xs font-semibold tracking-wide text-brand-500 uppercase sm:text-sm">
                  {member.role}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
