import { cn } from "@/lib/cn";

/** Props for every inline icon in the registry. */
export interface IconProps {
  name: IconName;
  className?: string;
  /** Decorative by default; pass a title to expose it to assistive tech. */
  title?: string;
}

export type IconName =
  | "syringe"
  | "capsule"
  | "eye"
  | "tube"
  | "leaf"
  | "stethoscope"
  | "truck"
  | "warehouse"
  | "thermometer"
  | "shield"
  | "clipboard"
  | "chart"
  | "globe"
  | "users"
  | "spark"
  | "check"
  | "mail"
  | "phone"
  | "pin"
  | "menu"
  | "close"
  | "arrow-right"
  | "facebook"
  | "linkedin"
  | "instagram";

const paths: Record<IconName, React.ReactNode> = {
  syringe: (
    <>
      <path d="m18 2 4 4" />
      <path d="m17 7 3-3" />
      <path d="M19 9 8.7 19.3a2 2 0 0 1-2.8 0l-1.2-1.2a2 2 0 0 1 0-2.8L15 5" />
      <path d="m9 11 4 4" />
      <path d="m5 15-3 3 4 4 3-3" />
    </>
  ),
  capsule: (
    <>
      <path d="m10.5 20.5 10-10a5.6 5.6 0 0 0-8-8l-10 10a5.6 5.6 0 0 0 8 8Z" />
      <path d="m8.5 8.5 7 7" />
    </>
  ),
  eye: (
    <>
      <path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  tube: (
    <>
      <path d="M9 2h6v4H9z" />
      <path d="M10 6v13a3 3 0 0 0 4 0V6" />
      <path d="M10 13h4" />
    </>
  ),
  leaf: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M4.8 2.3A.3.3 0 1 0 5 2.6V7a5 5 0 0 0 10 0V2.6a.3.3 0 1 0 .2-.3" />
      <path d="M10 12v3a4 4 0 0 0 8 0v-1" />
      <circle cx="19" cy="12" r="2" />
    </>
  ),
  truck: (
    <>
      <path d="M14 17V5a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1" />
      <path d="M14 8h4l4 4v4a1 1 0 0 1-1 1h-1" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  warehouse: (
    <>
      <path d="M3 21V9l9-6 9 6v12" />
      <path d="M7 21v-7h10v7" />
      <path d="M7 17h10" />
    </>
  ),
  thermometer: (
    <>
      <path d="M14 14.76V4.5a2.5 2.5 0 0 0-5 0v10.26a4 4 0 1 0 5 0Z" />
      <path d="M11.5 15.5v-3" />
    </>
  ),
  shield: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  clipboard: (
    <>
      <rect width="8" height="4" x="8" y="2" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </>
  ),
  chart: (
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M7 15l3.5-4 3 2.5L20 6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4Z" />
      <path d="M18 16.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z" />
    </>
  ),
  check: (
    <>
      <path d="M20 6 9 17l-5-5" />
    </>
  ),
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m2.5 6 8.4 6a2 2 0 0 0 2.2 0l8.4-6" />
    </>
  ),
  phone: (
    <>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  menu: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </>
  ),
  close: (
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>
  ),
  "arrow-right": (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
  facebook: (
    <>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
    </>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  instagram: (
    <>
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <path d="M17.5 6.5h.01" />
    </>
  ),
};

/**
 * Single inline-SVG icon registry.
 * Icons are stroked, inherit `currentColor`, and cost no extra network request.
 */
export function Icon({ name, className, title }: IconProps) {
  const decorative = !title;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6 shrink-0", className)}
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : "img"}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
