import { OptimizedImage } from "@/components/ui/optimized-image";
import { cn } from "@/lib/cn";

interface LogoProps {
  /** Overrides the default rendered height. Width follows the intrinsic ratio. */
  className?: string;
  /** Load immediately and at high priority — use in the header. */
  priority?: boolean;
  /** Hide from assistive tech when adjacent text already names the brand. */
  decorative?: boolean;
}

/** Intrinsic dimensions of `public/logo.png`. */
const LOGO_WIDTH = 1500;
const LOGO_HEIGHT = 271;

/**
 * Corporate logo lockup: the globe/A mark, the "AGLOBAL CARE, INC." wordmark and
 * the "Changing human life globally" tagline.
 *
 * Kept as a single pre-rendered PNG so the mark, wordmark and tagline stay
 * pixel-accurate to the brand. `width`/`height` are the real source dimensions,
 * so the browser reserves the correct space and there is no layout shift.
 */
export function Logo({ className, priority = false, decorative = false }: LogoProps) {
  return (
    <OptimizedImage
      src="/logo.png"
      alt={decorative ? "" : "AGlobal Care, Inc. — Changing human life globally"}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={cn("h-9 w-auto sm:h-10", className)}
    />
  );
}
