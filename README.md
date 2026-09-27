# AGlobal Care, Inc. — Website

[![CI](https://github.com/OWNER/REPO/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)

Modern rebuild of [aglobalcare.com](https://www.aglobalcare.com/): a fast, accessible,
mobile-first marketing site for AGlobal Care, Inc. — *"Changing human life globally."*

> Replace `OWNER/REPO` in the badge URL above with the real GitHub path.

## Stack

| Concern    | Choice                                    | Why                                                                 |
| ---------- | ----------------------------------------- | ------------------------------------------------------------------- |
| Framework  | **Next.js 15** (App Router, React 19)     | Server Components ship almost no JS; first-class SEO metadata APIs. |
| Language   | **TypeScript** (strict)                   | Catches content/shape mistakes at build time.                       |
| Styling    | **Tailwind CSS v4** (CSS-first `@theme`)  | Design tokens live in one file; no JS config, no runtime CSS-in-JS. |
| Output     | **Static export** (`output: "export"`)    | Deployable to any CDN, S3 bucket, Netlify or Vercel — zero server.  |
| Fonts      | `next/font` (Plus Jakarta Sans, Source Serif 4) | Self-hosted, preloaded, no layout shift, no third-party calls. |
| Icons      | Inline SVG registry                       | No icon-font request, no extra dependency.                          |

No runtime dependencies beyond `next`, `react` and `react-dom`.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run verify       # typecheck + lint + production build
npm run build        # static site emitted to ./out
npm run start        # preview the exported build (serves ./out)
```

Requires Node.js **22.13+** (see `.nvmrc` and `engines` in `package.json`). Node 24
is also supported and is what CI-equivalent local runs use.

## Deployment

`npm run build` writes a complete static site to `out/`. Point any static host at
that directory. Vercel builds this correctly with no extra configuration — it
detects Next.js and runs `npm run build`.

Two values are worth setting in the host's environment:

- `NEXT_PUBLIC_SITE_URL` — canonical origin, used for canonical URLs, Open Graph,
  `sitemap.xml`, `robots.txt` and JSON-LD.
- `NEXT_PUBLIC_CONTACT_ENDPOINT` — optional form backend. If unset, the contact
  form gracefully falls back to opening a prefilled email draft.

See [`.env.example`](./.env.example).

### Continuous integration

`.github/workflows/ci.yml` runs on every push and pull request.

**Job 1 — `guard`** (seconds, no install). A fast source scan plus a self-test of
the guard rules. Because it needs no dependencies, it fails in seconds and skips
the expensive build job when it trips.

**Job 2 — `verify`**:

1. `npm ci` — installs strictly from `package-lock.json`, so CI resolves the same
   dependency tree as Vercel.
2. `npm run typecheck`
3. `npm run lint`
4. `npm run build` — the full static export, on Linux, which is where
   platform-specific build failures actually surface.
5. `npm run guard` — scans the compiled CSS (see below).
6. Export-asset check for the pages and directories Vercel will serve.

Locally, `npm run verify` runs the same chain, so a green local run means a green
deploy.

> **Keep dependencies pinned to exact versions.** Tailwind and TypeScript use
> ranges like `^4` / `^5`, which let a local green build turn into a red deploy.
> If you upgrade, do it deliberately and let CI re-verify.

### The CSS `url()` guard

`scripts/check-css-urls.mjs` enforces one rule in two places:

| Mode | When | What it reads |
| --- | --- | --- |
| `source` | before the build | tracked sources (`src`, `docs`, `README.md`) |
| `build` | after the build | the compiled CSS in `out/_next/static/css` |
| `selftest` | always | fixtures, proving the rules still fail on bad input |

Run them directly with `npm run preflight`, `npm run guard`, or
`node scripts/check-css-urls.mjs all`.

It is written in Node rather than bash so it behaves identically on Windows,
Linux and CI — `bash` on Windows usually resolves to a WSL stub that cannot see
`E:\` paths, which would silently break `npm run verify` for local developers.

**The guard has a self-test, and that matters.** A guard that cannot fail is worse
than no guard: the first version of this check only matched *quoted* paths and
therefore happily passed the very build that was failing. `selftest` asserts that
a known-bad fixture is rejected *and* a known-good one is accepted, so the rule
cannot silently rot.

## Troubleshooting

### `Cannot find module './&'` during a Vercel / Linux build

Next.js pipes the compiled stylesheet through webpack's `css-loader`, which treats
**every** `url()` in the CSS as a *module request*. If a Tailwind arbitrary value
compiles to a quoted, slash-prefixed asset path, css-loader tries to resolve that
as a module and fails on Linux. It may still pass on Windows.

**Fix:** never put a background asset `url()` in a Tailwind utility class. Declare
it in `src/app/globals.css` in plain CSS, and inline the asset as a
`data:image/svg+xml,...` URI so there is nothing to resolve. See `.field-select`
in `globals.css` for the working pattern. The CI guard above fails the build if
this regresses.

> **Do not write the broken class verbatim in a comment, doc, or README.**
> Tailwind v4 scans raw source text for class-shaped strings and will compile one
> it finds *inside a comment* — re-introducing the exact bug. This happened once
> already: the fix was correct, but the explanatory comment next to it kept
> regenerating the offending CSS rule. Describe the pattern in prose.

### `npm warn deprecated eslint@9.39.5` on install

**Expected, and not currently fixable.** ESLint 9 is end-of-life, but ESLint 10
cannot be adopted yet for two independent reasons:

1. **`eslint-plugin-react` has no ESLint 10 support.** Its newest release (7.37.5
   — also the copy bundled inside `eslint-config-next`) declares
   `eslint: "^3 || … || ^9.7"` and calls `context.getFilename()`, which ESLint 10
   removed. Every file fails with `getFilename is not a function`.
2. **`FlatCompat` is removed in ESLint 10**, so the eslintrc-style
   `next/core-web-vitals` shareable config can no longer be loaded through it.

Because both blockers are upstream, the warning is cosmetic: linting runs
correctly on 9.39.5 and CI is green. The upgrade path and exact steps are recorded
in the header comment of `eslint.config.mjs`. Revisit when `eslint-plugin-react`
publishes ESLint 10 support.

### `npm audit` reports a PostCSS advisory via Next.js

`npm audit` flags `postcss <= 8.5.22`, reached through the copy of PostCSS that
**Next.js vendors internally**. `npm audit fix --force` would resolve it only by
jumping to Next.js 16 — a major upgrade that is out of scope here. The practical
exposure is negligible for this project:

- all input CSS is first-party (our own `globals.css` and Tailwind output);
- it is a **build-time** dependency, and the deployed artifact is a static export
  with no Node server and no runtime PostCSS;
- the advisories concern XSS via CSS stringification and `sourceMappingURL`
  path traversal — neither reachable through a static export.

Track it and upgrade Next.js deliberately when 16 is adopted.

## Node version policy

`engines.node` is bounded (`>=22.13.0 <25`) rather than open-ended (`>=20.9.0`)
or a floating major (`22.x`). That keeps three things true at once:

- Vercel does not warn about auto-upgrading to an untested future major;
- the local toolchain is not blocked (Node 24 also satisfies the range);
- `.nvmrc` pins the exact floor (`22.13.0`) so CI is reproducible.

If you change the range, update `.nvmrc` to match and re-run `npm run verify`.

## Project structure

```
src/
├─ app/
│  ├─ layout.tsx          # shell: fonts, metadata, header/footer, JSON-LD
│  ├─ page.tsx            # composes the sections in narrative order
│  ├─ globals.css         # design tokens (@theme) + base layer + utilities
│  ├─ not-found.tsx       # 404
│  ├─ sitemap.ts robots.ts manifest.ts
├─ components/
│  ├─ layout/             # site header, footer, mobile nav
│  ├─ sections/           # one file per page section
│  └─ ui/                 # primitives: button, icon, logo, optimized-image,
│                         #            section heading, layout
└─ lib/
   ├─ content.ts          # ALL marketing copy (single source of truth)
   ├─ site-config.ts      # identity, contact, navigation, URL helper
   ├─ types.ts            # shared domain types
   ├─ structured-data.ts  # schema.org Organization + WebSite
   └─ cn.ts               # dependency-free class-name composer
public/
├─ logo.png               # the corporate logo lockup
├─ partners/*.png         # 14 principal logos, 256×256 with transparency
├─ team/*.webp            # 3 leadership portraits, 640w + 320w variants
├─ icon.svg               # favicon / app icon
└─ chevron-down.svg       # custom select indicator
```

### Content editing

All copy lives in `src/lib/content.ts`. Components read from it and never
hard-code marketing text, so wording changes never require touching JSX — and
the file is already shaped like a CMS payload if one is added later.

## Architecture notes

- **Server-first.** Every section is a Server Component. The only client
  components are the mobile nav disclosure, the solution tabs and the contact
  form (`"use client"`), keeping the shared JS bundle at ~103 kB.
- **Mobile-first CSS.** Base styles target small screens; `sm:`/`lg:` variants
  only ever add. Type scales use `clamp()` so headings stay fluid with no
  breakpoint juggling.
- **Accessibility.** Semantic landmarks, one `<h1>`, a skip link, visible focus
  rings, `aria-expanded`/`aria-controls` on the nav disclosure, the WAI-ARIA tabs
  pattern (arrow/Home/End keys) for the solutions explorer, a `role="status"`
  live region for form feedback, and full `prefers-reduced-motion` support.
- **SEO.** Typed metadata, canonical URL, Open Graph + Twitter cards, schema.org
  `Organization`/`WebSite` JSON-LD, generated `sitemap.xml`, `robots.txt` and a
  web app manifest.
- **Documented decisions.** See [`docs/progress.md`](./docs/progress.md) for what
  changed versus the legacy site and what still needs a business decision.

## Accessibility & performance targets

- Lighthouse: 100 Accessibility / 100 Best Practices / 100 SEO on the exported build.
- Images are limited to the corporate logo (184 kB), 14 partner logos
  (297 kB total, 10–34 kB each) and 3 leadership portraits (69 kB for all six
  responsive variants). Every other visual is CSS, inline SVG or text.
- Use `OptimizedImage` (`src/components/ui/optimized-image.tsx`) rather than
  `next/image`: the export has no image optimizer, and `next/image` forces
  `loading="lazy"`, which leaves blank tiles inside the animated partner rail.
- Provide `srcSet`/`sizes` for anything rendered at more than one size; the team
  portraits ship 640w and 320w candidates.

## License

Proprietary. © AGlobal Care, Inc. All rights reserved.
