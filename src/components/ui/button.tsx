import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-700 text-white shadow-card hover:bg-brand-800 hover:shadow-lift",
  secondary:
    "bg-white text-brand-700 ring-1 ring-inset ring-brand-200 hover:bg-brand-50 hover:ring-brand-300",
  ghost: "text-brand-700 hover:bg-brand-50",
  accent: "bg-accent-500 text-white shadow-card hover:bg-accent-600",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm sm:text-base",
  lg: "px-6 py-3 text-base",
};

interface CommonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Rendered before the label. */
  iconLeft?: ReactNode;
  /** Rendered after the label (e.g. an arrow). */
  iconRight?: ReactNode;
}

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * Polymorphic call-to-action.
 *
 * Renders an `<a>` whenever `href` is supplied and a `<button>` otherwise, so
 * semantics stay correct without a polymorphic `as` prop.
 */
export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    iconLeft,
    iconRight,
    ...rest
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  if (typeof rest.href === "string") {
    return (
      <a className={classes} {...rest} href={rest.href}>
        {iconLeft}
        <span>{children}</span>
        {iconRight}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonAsButton;
  return (
    <button className={classes} type={type} {...buttonRest}>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}
