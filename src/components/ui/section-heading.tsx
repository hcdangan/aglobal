import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Center on large screens; left-aligned when the section is asymmetric. */
  align?: "start" | "center";
  id?: string;
  tone?: "dark" | "light";
  className?: string;
}

/** Shared eyebrow + title + lead block used by every marketing section. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "start",
  id,
  tone = "dark",
  className,
}: SectionHeadingProps) {
  const isLight = tone === "light";
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold tracking-[0.18em] uppercase",
            isLight ? "text-brand-200" : "text-brand-500",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className={cn(
          "text-title font-bold",
          isLight ? "text-white" : "text-brand-800",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            isLight ? "text-brand-100/90" : "text-ink-600",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
