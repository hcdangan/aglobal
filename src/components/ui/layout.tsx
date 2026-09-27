import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/** Consistent horizontal rhythm for every page section. */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn("container-page", className)}>{children}</Tag>;
}

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Tighter vertical rhythm for stacked/related sections. */
  spacing?: "default" | "compact";
  as?: ElementType;
  "aria-labelledby"?: string;
}

export function Section({
  children,
  id,
  className,
  spacing = "default",
  as: Tag = "section",
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        spacing === "default" ? "py-16 sm:py-20 lg:py-28" : "py-12 sm:py-14 lg:py-16",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
