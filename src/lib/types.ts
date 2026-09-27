/** Shared domain types for the marketing content layer. */

export interface IconRef {
  /** Key into the shared icon registry (`@/components/ui/icon`). */
  name:
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
    | "check";
}

export interface Highlight {
  title: string;
  description: string;
  icon: IconRef["name"];
}

export interface ProductCategory {
  name: string;
  blurb: string;
  icon: IconRef["name"];
}

export interface SolutionGroup {
  /** Stable id used for tab/anchor wiring. */
  id: string;
  label: string;
  headline: string;
  intro: string;
  pillars: string[];
  cards: Highlight[];
}

export interface BusinessModelStep {
  step: number;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** Fallback initials, used for the avatar if no photo is supplied. */
  initials: string;
  /** Portrait under `/public`. Omit to fall back to the initials avatar. */
  photo?: {
    src: string;
    width: number;
    height: number;
    /** Intrinsic size of the original file, for `srcset` descriptors. */
    source?: { width: number; height: number };
  };
  bio?: string;
}

export interface CoreValue {
  letter: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  label: string;
}
