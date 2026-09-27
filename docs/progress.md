# Modernization Progress Log — AGlobal Care, Inc.

> **Purpose.** A cold-start handoff document. A fresh session should be able to read
> only this file and continue without re-discovering anything.
>
> **Last updated:** session 5 — resolved both Vercel install warnings. Site is
> **complete and verified**; remaining items are content/brand decisions, not code.
>
> **Project root note:** the app was un-nested from `aglobal-care-web/` to the
> repository root (`E:\code\Aglobal`). Paths below are root-relative.

---

## 1. TL;DR status

| Item | State |
| --- | --- |
| Source | `https://www.aglobalcare.com/` (also `about.html`) |
| Legacy stack (inferred) | Next.js hash-style bundle + Squarespace-hosted `about.html`; single index page with `#` anchors, `<video>` hero, 40+ large JPEG/PNG assets |
| New stack | **Next.js 15.5.26** (App Router, React 19) · TypeScript strict · Tailwind CSS v4 · static export |
| Node | `engines: ">=22.13.0 <25"`, `.nvmrc` = `22.13.0` (bounded on purpose — see §6, session 5) |
| Project root | `E:\code\Aglobal` (repository root) |
| Build output | `E:\code\Aglobal\out` (static, CDN-ready) |
| CI | `.github/workflows/ci.yml` — pins the failure modes below |
| Known acceptable warnings | `npm warn deprecated eslint@9.39.5`, `npm audit` PostCSS-via-Next advisory — both upstream-blocked, see §6 session 5 |
| Verified | ✅ `tsc --noEmit` · ✅ `eslint .` · ✅ `next build` (8/8 static pages) · ✅ browser-checked at 390 / 768 / 1440 px · ✅ CI guard unit-tested |
| Open blockers | None technical. 4 content decisions pending (see §7) |

### Commands

```bash
cd E:\code\Aglobal
npm ci                 # exactly what CI and Vercel install
npm run dev            # http://localhost:3000
npm run verify         # typecheck + lint + build  ← use this before every handoff
```

---

## 2. What was done, in order

1. **Recon.** Fetched the live site and `about.html`; enumerated every asset URL.
2. **Read text baked into images.** Downloaded and visually read the legacy
   text-image assets — this was the highest-value step, because that copy existed
   *only* as pixels and was invisible to search engines and screen readers:
   - `images/impact1.png` → "BRAND IDENTITY ENHANCEMENT" card
   - `images/impact2.png` → "EXTENSIVE SEARCH" card
   - `images/impact3.png` → "BRAND PORTFOLIO EXPANSION" card
   - `images/business_model1..4.png` → Product Selection / Supplier Relationships /
     Regulatory Compliance / Marketing Distributions
   All five are now **real, selectable, indexable text** in `src/lib/content.ts`.
3. **Sampled the brand palette** directly from the logo pixels (see §4).
4. **Scaffolded** Next.js with `create-next-app`, then replaced the template wholesale.
5. **Built a typed content layer** so no marketing copy lives inside JSX.
6. **Implemented 9 sections** as Server Components + 3 client islands.
7. **Added boilerplate**: README, `.env.example`, sitemap, robots, manifest, 404,
   JSON-LD, favicon, ESLint, strict tsconfig, `.gitignore` fix.
8. **Verified in a real browser** (see §6) and cleaned up every temporary file.

---

## 3. Architecture

```
.                          (repository root = project root)
├─ .github/workflows/ci.yml
├─ docs/progress.md        ← this file
├─ src/app/
│  ├─ layout.tsx        fonts, metadata, header/footer, skip link, JSON-LD
│  ├─ page.tsx          composes the 9 sections
│  ├─ globals.css       @theme design tokens + base layer + plain-CSS utilities
│  │                    (.rail-marquee, .field-select — see §6 session 4)
│  ├─ not-found.tsx  sitemap.ts  robots.ts  manifest.ts
├─ src/components/
│  ├─ layout/           site-header · mobile-nav · site-footer
│  ├─ sections/         hero · impact · business-model · products · solutions
│  │                    solution-tabs · partners · about (+ Team) · contact · contact-form
│  └─ ui/               button · icon · logo · optimized-image · section-heading · layout
├─ src/lib/
│  ├─ content.ts        ← ALL marketing copy (single source of truth)
│  ├─ site-config.ts    identity, contact, navigation, absoluteUrl()
│  ├─ types.ts          Highlight · ProductCategory · SolutionGroup · Stat · …
│  ├─ structured-data.ts  schema.org Organization + WebSite
│  └─ cn.ts             dependency-free class-name composer
└─ public/              logo.png · icon.svg · partners/*.png · team/*.webp
```

### Key decisions and their rationale

| Decision | Rationale |
| --- | --- |
| **Static export** (`output: "export"`) | A marketing site has no per-request state. Static = cheapest, fastest, deployable anywhere, no server to patch. |
| **Server Components by default** | Only the mobile nav disclosure, the solution tabs and the contact form are `"use client"`. Shared JS stays at **103 kB**. |
| **Tailwind v4 CSS-first `@theme`** | Design tokens are plain CSS custom properties — inspectable in DevTools, no `tailwind.config.js`, no runtime CSS-in-JS. |
| **Fluid `clamp()` type scale** | Headings scale continuously instead of jumping at breakpoints; fewer media queries to maintain. |
| **Custom `cn()` instead of `clsx` + `tailwind-merge`** | Saves ~10 kB of dependencies for a need that is just conditional joining. Documented in the file. |
| **Inline SVG icon registry** | No icon-font network request, no extra dependency, tree-shakeable by construction. |
| **Only `logo.png` kept** | Directly satisfies "do not re-use photos that are large" — see §5. |
| **`relativeTime`-free, no date libs** | Nothing on the page needs it. |

---

## 4. Brand system

Palette sampled from `logo.png` pixels (dominant colours, by frequency):

| Token | Hex | Origin |
| --- | --- | --- |
| `brand-700` | `#002E63` | Logo navy — primary text/headers |
| `brand-500` | `#0047BA` | Logo blue — interactive accent |
| `accent-500` | `#CF142B` | Logo red — CTA emphasis |
| `ink-700` | `#393637` | Logo charcoal — body copy |

Typography: **Plus Jakarta Sans** (UI/headings — geometric grotesque close to the
logo wordmark, without redistributing the actual licensed logo font) and
**Source Serif 4 italic** (pull quotes, echoing the *"Changing human life globally"*
tagline). Both self-hosted by `next/font`, so there are no third-party requests.

---

## 5. Legacy assets: kept vs. dropped

**Kept — exactly one file.**

- `logo.png` — the supplied corporate lockup (`AGLOBAL CARE, INC.` +
  *"Changing human life globally"*). It is the only image on the site.

**Dropped, and what replaced it.**

| Legacy asset | Replacement | Why |
| --- | --- | --- |
| Hero background `<video>` | CSS radial brand gradient + masked globe grid | Heavy, muted, inaccessible, carried no information. |
| `impact1-3.png` (~1.3 MB **each**) | Real text cards | Copy was trapped in pixels. |
| `business_model1-4.png` | Real text, numbered `<ol>` | Same, plus the sequence is now semantic. |
| 6 product-category JPEGs | Inline SVG icon cards | Decorative stock photos; ~0 bytes now. |
| 14 partner logo JPEGs × 2 marquee copies (~590 KB, ~30 requests) | **Kept** — re-encoded to 14 transparent PNGs (~297 KB) on a CSS marquee | Real brand marks; see §5a for the conversion. |
| `harish.jpg`, `javish.jpg`, `pratik.jpg` (~190–250 KB, 1066×1600 each) | **Kept** — 3:4 WebP at 640×854 + 320×427 (~69 KB for all six files) | The actual leadership portraits; see §5b. |
| `who.jpg` | Not used | Generic stock-style photo with no content value. |
| Facebook/Instagram/LinkedIn icon PNGs | Inline SVG | Same reason. |

---

## 5a. Partner logos — recovery and conversion

**The real logos were recoverable.** `https://www.aglobalcare.com/images/{1..15}.jpg`
returns genuine 300×300 JPEGs (32–53 KB each). The legacy set **skips 7**, so there
are **14**, not 15. `.jpg` on this server always returns HTTP 200 with image data —
which is why an earlier session wrongly assumed the partner names had to be invented.

Brand names were read off each logo's own artwork (never guessed). Three files are
pure marks with no readable wordmark, and are labelled neutrally as
"Partner logo N" rather than being attributed to a guessed company:

| File | Name in `alt` |
| --- | --- |
| `2.jpg` | Korea Arlico Pharm. Co., Ltd. |
| `3.jpg` | Beximco Pharma |
| `4.jpg` | General Pharmaceuticals Ltd. |
| `5.jpg` | Grand Pharma |
| `6.jpg` | Ildong |
| `9.jpg` | NCPC |
| `10.jpg` | Penmix |
| `11.jpg` | Polipharm |
| `13.jpg` | Swiss |
| `15.jpg` | Phapros |
| `1.jpg`, `8.jpg`, `12.jpg`, `14.jpg` | Partner logo 1 / 8 / 12 / 14 |

### Conversion method

No ImageMagick or cwebp was available, so the re-encode runs in .NET
(`System.Drawing`) via `LockBits` + `Marshal.Copy` (per-pixel `GetPixel` is far too
slow at this scale). Per logo:

1. **Border flood fill** through near-white pixels removes the page background.
   Connected to the border — so white *inside* letterforms is preserved.
2. **Taint detection.** A second pass removes large enclosed near-white regions
   **only** when a pixel above 236 has a neighbour below 214. JPEG edge ringing
   leaves that footprint, so this distinguishes real page background (Polipharm,
   and the card interiors of Beximco/General) from a logo's own white counterform
   (Swiss, Ildong, NCPC, and the cross-shaped mark in `14.jpg` — all correctly kept).
3. **Crop to the non-background bounding box**, then fit into a 256×256 canvas with
   16 px padding, so every logo renders at a consistent optical size (`88 px` tall)
   without distortion.

Result: **296.6 KB total, largest file 34 KB** (was 590 KB of opaque JPEGs).

### Display

`src/components/sections/partners.tsx` renders one CSS-animated track plus an
`aria-hidden` duplicate for a seamless loop, on `bg-ink-50`. The legible names are
verified against the `alt` values above.

---

## 5b. Leadership portraits

`harish.jpg`, `javish.jpg` and `pratik.jpg` are genuine 1066×1600 sRGB studio
portraits (190–250 KB each, EXIF orientation 1 — no rotation needed). Re-encoded
with **sharp** (available globally at
`C:\Users\harle\AppData\Roaming\npm\node_modules\sharp`; used directly, so nothing
was added to `package.json`):

- Cropped to a **3:4 portrait** frame with `fit: "cover", position: "top"`, which
  keeps the head and torso and trims the lower body — verified on a contact sheet
  before wiring in.
- Emitted at **640×854 (q78)** and **320×427 (q80)** as WebP, served via
  `srcset`/`sizes`.

Result: **69.1 KB for all six files** — less than a third of one original JPEG.
The `who.jpg` group photo was reviewed and skipped (generic, no content value).

The `Team` section renders a photo card per member with the name and role beneath,
falling back to an initials avatar when `photo` is absent — so removing a portrait
degrades gracefully rather than breaking.

---

## 6. Verification evidence (session 1)

Browser checks were run with Playwright driving the **real Chrome** install against
a local server on the exported `out/` directory. Raw console output:

```
visible width: 390                    hamburger visible: true
regulatory tab aria-selected: true
contact forms: 1   required fields: 4   h1/h2: 11
console errors: none

[m] header=69px  #solutions h2 top=240px  clear=true      ← anchor offset OK
[d] header=69px  #solutions h2 top=255px  clear=true
select appearance: none | has custom chevron: true
native validation blocks empty submit: true | Please fill out this field.
overflow: { scrollW: 390, clientW: 390 } | ok: true       ← no horizontal scroll
reduced-motion marquee duration: 1e-05s                   ← motion disabled
```

Build output:

```
Route (app)                     Size  First Load JS
┌ ○ /                          5.24 kB         108 kB
├ ○ /_not-found                  135 B         103 kB
├ ○ /manifest.webmanifest        135 B         103 kB
├ ○ /robots.txt                  135 B         103 kB
└ ○ /sitemap.xml                 135 B         103 kB
```

Also confirmed present in the exported HTML: brand copy, transcribed image text
("Brand Identity Enhancement", "250 distributors", "eZCooler", "Certificate of
Product Registration"), team names, `logo.png`, `icon.svg`, and the
`application/ld+json` block.

**Bugs found and fixed during verification (don't reintroduce):**

1. `output: "export"` requires `export const dynamic = "force-static"` in
   `sitemap.ts` / `robots.ts` / `manifest.ts` — the build fails otherwise.
2. Anchor jumps were hiding the target heading behind the sticky header;
   fixed with `scroll-padding-top: calc(var(--header-height) + 1.5rem)`.
3. The native `<select>` indicator collided with custom padding; replaced with
   `public/chevron-down.svg` and `appearance: none`.
4. `next lint` is deprecated in Next 15 — the script now calls `eslint .` directly.

### Session 2 — partner logo rail

```
[m] logo <img> total=28 announced=14 broken=0
[m] marquee moving: true   paused on hover: true (state=paused)
[m] horizontal overflow: 0px
[d] logo <img> total=28 announced=14 broken=0
[d] marquee moving: true   paused on hover: true (state=paused)
[d] horizontal overflow: 0px
ALL CHECKS PASSED

reduced-motion: animationName="none"  imagesLoaded=28/28
page errors: none
```

Two more real bugs found and fixed here:

5. **`next/image` hard-codes `loading="lazy"`.** Inside the marquee, off-screen
   images never entered the viewport on their own, so the animation carried blank
   tiles into view (11 of 28 loaded). Fixed by adding
   `src/components/ui/optimized-image.tsx` — a plain `<img>` primitive with real
   `width`/`height`, an explicit `loading` prop and `priority`. Under
   `output: "export"` the Next.js optimizer never runs anyway, so this also removed
   a client component from the bundle (route JS went 10.6 kB → 5.24 kB).
6. **Tailwind v4 wraps `group-hover:` in `@media (hover: hover)`.** Hover-pause on
   the rail therefore did nothing on touch devices. Replaced with a plain-CSS
   `.rail-marquee:hover, .rail-marquee:focus-within { animation-play-state: paused }`
   rule in `globals.css`. The rail is focusable (`tabIndex={0}`), so tapping or
   tabbing to it pauses the scroll — which is the only reliable way to read the
   logos on a phone.

> Verification note: three "failures" during this pass were faults in the *test*,
> not the site — hovering the section's bottom padding instead of the rail, a
> midpoint that fell outside the viewport on mobile (the rail is wider than the
> screen), and hovering a perpetually-animating element (Playwright's stability
> check never settles; use raw coordinates). Check the harness before "fixing" the
> component.

### Session 3 — leadership portraits

```
[m] team imgs: 3/3 loaded | rendered 348x464 | cover/50% 0% | overflow 0px
[d] team imgs: 3/3 loaded | rendered 382x509 | cover/50% 0% | overflow 0px
ALL CHECKS PASSED
```

Each `currentSrc` resolved to the 640w candidate and every `alt` is of the form
`"Portrait of <name>, <role>"`. Crop framing was reviewed on a contact sheet
before wiring in, so the composition is deliberate rather than incidental.

### Session 4 — Vercel build failure (the important one)

**Symptom.** Local `npm run build` passed; Vercel failed with:

```
Module not found: Error: Cannot find module './&'
Import trace for requested module: ./src/app/globals.css
```

**Root cause.** The select indicator was styled with a Tailwind arbitrary
`background-image` utility whose value was a quoted, slash-prefixed asset path
(the chevron SVG in `public/`). That compiled to a CSS rule of the shape
`background-image:url(/chevron-down.svg)`.

Next.js pipes the compiled stylesheet through webpack's **css-loader**, which
treats *every* `url()` as a **module request**. A quoted, slash-prefixed path
turns into a bogus module id built from the leftover quote characters and the
`&` separator — hence `Cannot find module './&'`. It survived on Windows and
broke on the Linux builder.

The decisive clue was in the deploy log itself:

```
hash: "#x27;/chevron-down.svg&"
```

`#x27` is `'`. css-loader was consuming the quotes as part of the request.

**Fix.** Removed the arbitrary value entirely. The chevron is now an inlined
`data:image/svg+xml,...` URI in plain CSS (`.field-select` in
`src/app/globals.css`). A data URI is inert — css-loader has nothing to resolve.
`public/chevron-down.svg` was deleted and is no longer referenced.

This is the same class of failure as the known Next.js
[css-loader `url()` regression](https://github.com/vercel/next.js/issues/30895).
Do not reintroduce a background `url()` inside a utility class.

**Also hardened:**

- **Pinned every dependency to an exact version** (Tailwind and TypeScript were on
  `^4` / `^5`; installed Tailwind was already 4.3.3). Range drift is precisely how
  a green local build becomes a red deploy.
- **Added `.github/workflows/ci.yml`** (see §9). Note `npm ci` is used, never
  `npm install`, so CI resolves the same tree as Vercel.
- **Added a CI guard on compiled CSS.** Allowlist-based: every `url()` in
  `out/_next/static/css/*.css` must be a `data:` URI, a `/_next/` artifact, or a
  `#fragment`. Anything else fails the build. The guard was itself verified to
  pass the clean build *and* to fail a synthetic stylesheet containing the exact
  original signature — an unverified guard is worse than none.

**Post-fix verification:**

```
field-select: appearance=none, background-image=url("data:image/svg+xml,...")
chevron data URI: decoded 150x150          ← actually paintable, not just present
partner rail: animation=marquee-x, 28/28 loaded
horizontal overflow: 0px | network/page errors: none
ALL CHECKS PASSED

GUARD VERIFIED: passes a clean build, blocks the reported failure.
```

### Session 5 — Vercel install warnings

Two warnings reported from the Vercel build log.

**1. `engines.node: ">=20.9.0"` is an open-ended range.** Vercel warns because it
would silently auto-upgrade to an untested future major.

First attempt — `"node": "22.x"` — **introduced a new warning**:

```
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: 'aglobal-care-web@1.0.0',
npm warn EBADENGINE   required: { node: '22.x' },
npm warn EBADENGINE   current: { node: 'v24.18.0', npm: '12.0.2' },
```

A floating major locks out a working local toolchain. Final value:

```json
"engines": { "node": ">=22.13.0 <25" }
```

with `.nvmrc` pinned to the exact floor (`22.13.0`). That satisfies all three
constraints at once: bounded (no Vercel warning), not blocked locally (Node 24
passes), and reproducible in CI. Verified: `npm ci` now emits **no** EBADENGINE
warning on either Node 22 or Node 24.

**2. `npm warn deprecated eslint@9.39.5`.** This one cannot be fixed today, and
the investigation is worth recording.

ESLint 9 is genuinely end-of-life — *every* 9.x release is deprecated, so no 9.x
version avoids the warning. The only real fix is ESLint 10. That was attempted and
failed on two independent blockers:

```bash
# Blocker 1 — FlatCompat is removed in ESLint 10 (eslintrc bridge is dead):
TypeError: Converting circular structure to JSON
    at ConfigValidator.formatErrors (.../@eslint/eslintrc/lib/shared/config-validator.js)

# After rewriting to native flat config (import from eslint-config-next/core-web-vitals),
# Blocker 2 — the React plugin calls an API ESLint 10 deleted:
TypeError: Error while loading rule 'react/display-name':
  contextOrFilename.getFilename is not a function
```

Blocker 2 is upstream and unresolvable at any version: `eslint-plugin-react`'s
**latest** release (7.37.5 — also the exact copy bundled inside
`eslint-config-next@16.3.6`) declares `eslint: "^3 || … || ^9.7"`. No published
version of the React plugin supports ESLint 10.

**Decision:** stay on `eslint@9.39.5` + `eslint-config-next@15.5.26`, which matches
Next 15 and is the minimal correct posture. Linting works; CI is green. The
warning is cosmetic and upstream-blocked.

The upgrade was fully scoped during this session and is documented in the header
comment of `eslint.config.mjs` so the next person does not have to rediscover it:

1. bump `eslint` to 10.x;
2. bump `eslint-config-next` to a release shipping native flat config (16+);
3. replace `FlatCompat` with a direct spread of the `core-web-vitals` preset
   (it already contains `next/typescript`, so the second extend is redundant);
4. drop `@eslint/eslintrc`;
5. **blocked until** `eslint-plugin-react` ships ESLint 10 support.

Everything from the failed experiment was reverted, and the lockfile was restored
from backup and re-validated with `npm ci`.

**Bonus finding — `npm audit`.** Two advisories (1 moderate, 1 high) trace to
`postcss <= 8.5.22` bundled **inside Next.js itself**. `npm audit fix --force`
offers only `next@16.3.6`, a major upgrade out of scope here. Practical exposure
is negligible: first-party CSS only, a build-time dependency, and a static export
with no Node server or runtime PostCSS. Documented in the README rather than
papered over.

**Post-change verification:**

```
npm ci  → only the eslint deprecation warning; no EBADENGINE
npm run verify → typecheck ✅  lint ✅  build ✅  (7/7 static pages, export OK)
local Node 24.18.0 satisfies >=22.13.0 <25  ✅
```

---

## 7. Open items (business decisions, not code)

1. **Four partner logos remain unattributed.** `partner-1`, `partner-8`,
   `partner-12` and `partner-14` are marks without a readable company name, so they
   ship as "Partner logo N". Confirm who they are (or have the client supply newer
   artwork) and update `partnerLogos` in `src/lib/content.ts`. **Note:** an earlier
   session believed the partner names were unrecoverable and invented 15 placeholder
   names; those are gone — the real logos and their real wordmarks are now in use.
   This is still the most important item to confirm with the client, because a
   logo wall implies a public endorsement.
2. **Contact form has no backend.** With `NEXT_PUBLIC_CONTACT_ENDPOINT` unset, the
   form opens a prefilled mail draft to `info@aglobalcare.com` — functional, but
   not tracked. Set the env var to a form backend or serverless function for real
   inbox delivery.
3. **Confirm portrait crops with the client.** The 3:4 frame with `object-top`
   trims the lower body; if they prefer full-length shots, change `fit`/`position`
   in the encoder or switch the `object-position` in
   `src/components/sections/about.tsx`. Newer, higher-resolution portraits would
   also allow a sharper 2× asset.
4. **Logo weight.** `logo.png` is 184 kB / 1500×271 and only rendered at ~180 px
   wide. Ask the brand team for the **SVG** or a 480 px-wide PNG; that alone would
   cut roughly 150 kB from first load.
5. **Unverified legacy claims.** "90% national coverage" and "250+ distributors /
   10,000 drugstores" were transcribed verbatim from the legacy text-images. They
   are medical-distribution claims — worth legal/regulatory confirmation.
6. **Legacy copy errors corrected silently** — worth a client heads-up:
   "emmerged" → "emerged"; the misspelled heading "EXTENSIVE SEARCH" →
   "Extensive Reach"; "Marketing Distributions" → "Marketing & Distribution";
   the duplicated "Our Mission" heading collapsed into one; the leftover
   Squarespace "Basic / Intermediate / Advanced — add your pricing strategy"
   placeholder cards in `about.html` were dropped entirely.
7. **`about.html` was a separate Squarespace page.** Its genuinely unique content
   (company history, mission, core values) was merged into the `#about` section, so
   there is now **one canonical page**. If the client expects a separate `/about`
   route, split `About` into `src/app/about/page.tsx`.
8. **Lighthouse hasn't been run.** Playwright's Chrome channel has no Lighthouse
   audit wired up. Run `npx lighthouse http://localhost:3000 --view` against
   `npm run dev` (or the exported `out/`) and record the scores here.
9. **Social links point at guessed URLs** in `src/lib/site-config.ts`
   (the legacy site had `https://www.faceboook.com` — a typo — and `#` for the
   other two). Confirm the real handles.

---

## 8. Temp-file cleanup (done)

Removed after use — nothing left behind:

| Path | What it was |
| --- | --- |
| `E:\code\Aglobal\site.html` | 3-byte pre-existing stub in the workspace root |
| `E:\code\Aglobal\.tmp-assets\` | Downloaded legacy images used to read baked-in text |
| `E:\code\Aglobal\.tmp-logos\` | Partner logo sources + transparency conversion scripts |
| `E:\code\Aglobal\.tmp-team\` | Team portrait sources + sharp encode/contact-sheet scripts |
| `E:\code\Aglobal\.tmp-verify\`, `.tmp-tools\` | Playwright installs + verification scripts |
| `public/{next,vercel,file,globe,window}.svg` | create-next-app template SVGs |
| `public/chevron-down.svg` | Replaced by an inlined data URI (§6, session 4) |

The exported `out/` directory is intentionally kept (it is the deployable artifact)
and is already covered by `.gitignore`.

---

## 9. How to resume in a fresh session

```bash
cd E:\code\Aglobal
npm ci && npm run verify          # confirm the baseline is green
npm run dev                       # then work section by section
```

CI (`.github/workflows/ci.yml`) runs typecheck → lint → build → CSS `url()` guard →
export-asset check on every push. If CI is green, the Vercel build will be too.

Suggested order of attack:

1. Confirm the four unattributed partner marks (§7.1) — highest risk if shipped.
2. Configure `NEXT_PUBLIC_CONTACT_ENDPOINT` (§7.2).
3. Sign off the portrait crops (§7.3) and request the SVG logo (§7.4).
4. Run Lighthouse and record scores (§7.8).

**Conventions to preserve:**

- Marketing copy changes go in `src/lib/content.ts`, never in JSX.
- New sections: one file in `src/components/sections/`, composed in `src/app/page.tsx`.
- Keep new components as Server Components. Add `"use client"` only for real
  interactivity, and keep the island as small as possible.
- For images use `OptimizedImage` (`src/components/ui/optimized-image.tsx`), not
  `next/image` — and `loading="eager"` for anything inside an animated container.
- **Never put a background asset `url()` in a Tailwind utility class.** Declare it
  in `globals.css` and inline it as a data URI. This broke the Vercel build once
  (§6, session 4); CI now blocks it.
- Keep dependency versions exact; don't reintroduce `^` ranges.
- Mobile-first: base classes target small screens; `sm:`/`lg:` only add.
- Don't rely on `group-hover:` for functionality; Tailwind gates it behind
  `(hover: hover)`. Pair it with focus, or use plain CSS.
- Run `npm run verify` before declaring anything done.
