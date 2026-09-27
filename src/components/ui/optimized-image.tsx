import { cn } from "@/lib/cn";

interface OptimizedImageProps {
  src: string;
  /** Pass an empty string for decorative images that are hidden from assistive tech. */
  alt: string;
  /** Intrinsic dimensions of the source file — required to reserve layout space. */
  width: number;
  height: number;
  /** CSS size. Usually you constrain the rendered box and let the other axis follow. */
  className?: string;
  style?: React.CSSProperties;
  /**
   * `"eager"` loads immediately; `"lazy"` defers until near the viewport.
   * Use `"eager"` for anything inside an animated container.
   */
  loading?: "eager" | "lazy";
  /** Fetch this image at high priority (above-the-fold hero/logo). */
  priority?: boolean;
  decoding?: "sync" | "async" | "auto";
  sizes?: string;
  /** Responsive candidates, e.g. `"/team/a-2x.webp 1280w, /team/a.webp 640w"`. */
  srcSet?: string;
  fetchPriority?: "high" | "low" | "auto";
}

/**
 * Static-export image.
 *
 * Deliberately a plain `<img>` rather than `next/image`:
 *
 * - The site is exported with `output: "export"`, so the Next.js optimizer never
 *   runs — `next/image` would emit the same plain `<img>` while adding a client
 *   component to the bundle.
 * - `next/image` also hard-codes `loading="lazy"` on every instance. That is
 *   wrong for images inside an animated rail (the partner marquee), where an
 *   off-screen image can stay unloaded while the animation carries it into view.
 *
 * Intrinsic `width`/`height` are always emitted so the browser reserves space and
 * cumulative layout shift stays at zero.
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  style,
  loading = "lazy",
  priority = false,
  decoding = "async",
  sizes,
  srcSet,
  fetchPriority,
}: OptimizedImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- see component docs above.
    <img
      src={src}
      srcSet={srcSet}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : loading}
      fetchPriority={priority ? "high" : fetchPriority}
      decoding={decoding}
      sizes={sizes}
      className={cn(className)}
      style={style}
    />
  );
}
