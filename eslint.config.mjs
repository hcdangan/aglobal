import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/**
 * ESLint configuration.
 *
 * ------------------------------------------------------------------ PINNED ---
 * This project runs ESLint 9, and that is currently a *ceiling*, not a lag.
 * ESLint 10 cannot be used yet, for two independent reasons:
 *
 *   1. `FlatCompat` (the eslintrc bridge used below) is removed in ESLint 10 —
 *      it throws "Converting circular structure to JSON" while validating the
 *      legacy Next.js shareable config.
 *   2. `eslint-plugin-react` has no ESLint 10 support at all. The newest release
 *      (7.37.5, also the copy bundled inside `eslint-config-next`) peers on
 *      `^9.7` and calls `context.getFilename()`, which ESLint 10 removed —
 *      so every file fails with "getFilename is not a function".
 *
 * ESLint 9 is marked end-of-life on npm, so `npm install` prints a deprecation
 * warning. That warning is unavoidable until the React plugin ships ESLint 10
 * support. When it does, the migration is:
 *   - bump `eslint` to 10.x
 *   - bump `eslint-config-next` to a release shipping native flat config (16+)
 *   - replace `FlatCompat` with `import next from "eslint-config-next/core-web-vitals"`
 *     spread directly into the array (that preset already includes
 *     `next/typescript`, so the explicit second extend becomes redundant)
 *   - drop `@eslint/eslintrc`
 * -----------------------------------------------------------------------------
 */
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    name: "aglobal-care/ignores",
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
