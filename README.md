# AGlobal Care, Inc. — Website

Modern rebuild of [aglobalcare.com](https://www.aglobalcare.com/): a fast, accessible,
mobile-first marketing site for AGlobal Care, Inc. — *"Changing human life globally."*

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

Requires Node.js **20.9+**.

## Deployment

`npm run build` writes a complete static site to `out/`. Point any static host at
that directory. Two values are worth setting in the host's environment:

- `NEXT_PUBLIC_SITE_URL` — canonical origin, used for canonical URLs, Open Graph,
  `sitemap.xml`, `robots.txt` and JSON-LD.
- `NEXT_PUBLIC_CONTACT_ENDPOINT` — optional form backend. If unset, the contact
  form gracefully falls back to opening a prefilled email draft.

See [`.env.example`](./.env.example).

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
