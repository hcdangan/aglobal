/**
 * Tiny class-name composer.
 *
 * Deliberately dependency-free: the site only needs conditional joining, so
 * pulling in `clsx` + `tailwind-merge` (~10 kB) would be unjustified.
 * Later utilities win for the same property only by document order in the
 * generated CSS, so callers should compose variants with full class strings.
 */
export type ClassValue = string | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  let out = "";
  for (const value of values) {
    if (!value) continue;
    out = out ? `${out} ${value}` : value;
  }
  return out;
}
