import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/layout";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** 404 page — keeps a dead end inside the brand and offers a way back. */
export default function NotFound() {
  return (
    <Section className="bg-ink-50">
      <Container className="text-center">
        <p className="text-xs font-semibold tracking-[0.18em] text-brand-500 uppercase">
          404
        </p>
        <h1 className="mt-3 text-title font-bold">We could not find that page</h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-600 sm:text-base">
          The link may be outdated or mistyped. Head back to the homepage, or get in
          touch and we will point you in the right direction.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Back to homepage</Button>
          <Button href="/#contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
