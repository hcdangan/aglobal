// @ts-check
/**
 * Guard: no Tailwind arbitrary value may compile to a CSS `url()` that points at
 * a repository asset.
 *
 * WHY THIS EXISTS
 * ---------------
 * Next.js pipes the compiled stylesheet through webpack's css-loader, which
 * treats *every* `url()` in the CSS as a module request. A Tailwind arbitrary
 * value that emits `url(/some-asset.svg)` therefore makes css-loader try to
 * resolve that path as a module, failing the Linux build with:
 *
 *     Module not found: Can't resolve './&'
 *
 * The `./&` is built from the quote characters and the `&` separator css-loader
 * uses for its request id. It passes on Windows and fails on the Vercel builder,
 * so a local build alone cannot catch it.
 *
 * THE TRAP THAT MAKES THIS SUBTLE
 * -------------------------------
 * Tailwind v4 scans raw source text for class-shaped strings — *including
 * comments and markdown*. Writing the offending utility verbatim inside a comment
 * that warns about it regenerates the exact bug. That happened once already, so
 * this file never contains the literal; it is assembled from fragments below.
 *
 * Written in Node (not bash) so it behaves identically on Windows, Linux and CI,
 * and so `npm run verify` works everywhere. No dependencies.
 *
 * USAGE
 *   node scripts/check-css-urls.mjs source    # scan tracked sources (fast)
 *   node scripts/check-css-urls.mjs build     # scan compiled CSS (authoritative)
 *   node scripts/check-css-urls.mjs selftest  # prove the rules still catch it
 */

import { readFileSync, readdirSync, statSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { tmpdir } from "node:os";

// The literal is assembled from fragments so this file never contains the
// class-shaped string it hunts for.
const URL_OPEN = "url(";

/**
 * Match a *complete* arbitrary-value utility that reaches `url(`.
 *
 * Read it as: `bg-[` … no whitespace or `]` … `url(` … a value with no nested
 * paren or space … `)` and `]` closing it.
 *
 * Two traps, both learned the hard way while writing this file:
 *
 *   1. `url(` is consecutive inside the arbitrary-value prefix, so a looser
 *      pattern also fires on a truncated excerpt in the docs. The docs must be
 *      able to show the broken shape, because the guard scans markdown.
 *   2. Requiring the closing `)]` is what separates a real candidate from an
 *      excerpt, and it is also exactly why the build failed: only a *complete*
 *      utility compiles to a `url()` that css-loader then tries to resolve.
 *
 * Writing this as a character walker was tempting but unnecessary — and the first
 * two attempts at it produced false positives on ordinary gradient utilities.
 * Verified against every arbitrary utility in the repo: zero false positives.
 *
 * Deliberately still flags a fragment form such as the `#clip` case, because that
 * utility compiles to a `background-image` holding a bare fragment, which is
 * invalid CSS anyway. Erring toward flagging it is the safe direction.
 */
const ARBITRARY_URL_UTILITY = /bg-\[[^\s\]]*url\([^(\s]*\)\]/;

const ROOT = process.cwd();
/** Source locations Tailwind v4's scanner can see. */
const SOURCE_ROOTS = ["src", "docs", "README.md"];
const SCANNABLE_EXT = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".css", ".md", ".mdx", ".json", ".html"]);
const BUILD_CSS_DIR = join(ROOT, "out", "_next", "static", "css");

let failed = false;

/** @param {string} message */
function fail(message) {
  failed = true;
  console.error(message);
}

/** Recursively collect files under a path (or return the path if it is a file). */
function walk(target, out = []) {
  let stats;
  try {
    stats = statSync(target);
  } catch {
    return out;
  }
  if (stats.isFile()) {
    out.push(target);
    return out;
  }
  if (!stats.isDirectory()) return out;
  for (const entry of readdirSync(target)) {
    if (entry === "node_modules" || entry === ".git" || entry === ".next" || entry === "out") continue;
    walk(join(target, entry), out);
  }
  return out;
}

/**
 * A CSS url() is safe when css-loader has nothing to resolve:
 *   - a `data:` URI is inert
 *   - a `/_next/...` path is an artifact the build emitted itself
 *   - a `#fragment` reference has no file behind it
 * Everything else names a repository file, which is the bug.
 * @param {string} css
 */
function offendingUrlTargets(css) {
  const bad = [];
  for (const match of css.matchAll(/url\(([^)]*)\)/g)) {
    const raw = (match[1] ?? "").trim();
    const unquoted = raw.replace(/^['"]|['"]$/g, "");
    if (unquoted.startsWith("data:")) continue;
    if (unquoted.startsWith("/_next/")) continue;
    if (unquoted.startsWith("#")) continue;
    if (unquoted === "") continue;
    bad.push(raw);
  }
  return bad;
}

/** Rule body shared by the build scan and the selftest. */
function cssIsClean(css) {
  return offendingUrlTargets(css).length === 0;
}

function scanSource() {
  console.log("== source scan: Tailwind arbitrary values containing url( ==");
  const files = SOURCE_ROOTS.flatMap((root) => walk(join(ROOT, root)));
  const hits = [];
  for (const file of files) {
    if (!SCANNABLE_EXT.has(extname(file))) continue;
    const text = readFileSync(file, "utf8");
    text.split(/\r?\n/).forEach((line, index) => {
      const match = line.match(ARBITRARY_URL_UTILITY);
      if (match) {
        hits.push(`${relative(ROOT, file)}:${index + 1}: ${match[0]}`);
      }
    });
  }
  if (hits.length > 0) {
    fail("FAIL — an arbitrary background-image utility appears in scanned source.");
    console.error("Tailwind compiles these even inside comments. Describe the pattern in prose instead.");
    hits.forEach((h) => console.error("  " + h));
  } else {
    console.log(`PASS — scanned ${files.length} files, no arbitrary url() utilities.`);
  }
}

function scanBuild() {
  console.log("== build scan: url() targets in compiled CSS ==");
  let cssFiles;
  try {
    cssFiles = readdirSync(BUILD_CSS_DIR).filter((f) => f.endsWith(".css")).map((f) => join(BUILD_CSS_DIR, f));
  } catch {
    cssFiles = [];
  }
  if (cssFiles.length === 0) {
    fail("FAIL — no CSS emitted to out/_next/static/css (did the export run?)");
    return;
  }

  const css = cssFiles.map((f) => readFileSync(f, "utf8")).join("\n");
  const bad = [...new Set(offendingUrlTargets(css))];
  if (bad.length > 0) {
    fail("FAIL — compiled CSS references a repo asset via url():");
    bad.forEach((b) => console.error("  " + b));
  } else {
    console.log(`PASS — scanned ${cssFiles.length} CSS file(s); every url() is a data URI, a /_next artifact, or a fragment.`);
  }

  // Belt and braces: the asset behind the original outage must stay gone. Cheap,
  // and catches a reintroduction regardless of url() formatting.
  if (css.includes("chevron-down")) {
    fail("FAIL — compiled CSS still references the removed chevron asset.");
  } else {
    console.log("PASS — no reference to the removed chevron asset in compiled CSS.");
  }
}

function selftest() {
  console.log("== selftest: the rules must catch the real failure and pass safe input ==");
  const dir = mkdtempSync(join(tmpdir(), "css-url-guard-"));

  // Reproduces the exact outage signature, in both quoted and bare forms.
  const badCss = [
    `.x{background-image:${URL_OPEN}/chevron-down.svg)}`,
    `.q{background:${URL_OPEN}"img/logo.png")}`,
    `.r{background:${URL_OPEN}'./hero.webp')}`,
  ].join("\n");

  // Safe shapes that must never be flagged.
  const goodCss = [
    `.ok1{background-image:${URL_OPEN}data:image/svg+xml,%3Csvg%3E)}`,
    `.ok2{src:${URL_OPEN}/_next/static/media/abc-s.woff2)}`,
    `.ok3{mask:${URL_OPEN}#clip)}`,
  ].join("\n");

  writeFileSync(join(dir, "bad.css"), badCss);
  writeFileSync(join(dir, "good.css"), goodCss);

  const badRejected = !cssIsClean(badCss);
  const goodAccepted = cssIsClean(goodCss);

  rmSync(dir, { recursive: true, force: true });

  if (!badRejected || !goodAccepted) {
    fail(
      `FAIL — selftest broken (badRejected=${badRejected} expected true, goodAccepted=${goodAccepted} expected true). ` +
        "A guard that cannot fail is not a guard.",
    );
    return;
  }

  // The source rule must separate a real utility from documentation that shows a
  // truncated excerpt of one. Fixtures are assembled from fragments so this file
  // never contains the literal itself.
  const realQuote = "bg-[" + URL_OPEN + "'/logo.png')]";
  const truncated = "bg-[" + URL_OPEN + " ... )]"; // unclosed bracket => not a candidate
  const cases = [
    ["real utility, quoted", realQuote, true],
    ["real utility, bare", "bg-[" + URL_OPEN + "/logo.png)]", true],
    ["real utility, underscores", "bg-[" + URL_OPEN + "_/a_b.png_)]", true],
    ["in prose, still a utility", `documenting ${realQuote} inline`, true],
    ["truncated excerpt in docs", `output showed ${truncated} here`, false],
    ["unrelated arbitrary util", "bg-[length:1.25rem_1.25rem]", false],
    ["plain CSS url", `background-image:${URL_OPEN}/a.png)`, false],
  ];
  const wrong = cases.filter(([label, text, shouldMatch]) => {
    const matched = new RegExp(ARBITRARY_URL_UTILITY.source).test(String(text));
    if (matched !== shouldMatch) {
      console.error(`  rule mismatch: ${label} (matched=${matched}, expected=${shouldMatch})`);
      return true;
    }
    return false;
  });

  if (wrong.length > 0) {
    fail("FAIL — selftest: the source rule misclassifies utilities vs. prose.");
    return;
  }

  console.log("PASS — selftest: bad input rejected, good input accepted, prose tolerated.");
}

const mode = process.argv[2] ?? "all";
switch (mode) {
  case "source":
    scanSource();
    break;
  case "build":
    scanBuild();
    break;
  case "selftest":
    selftest();
    break;
  case "all":
    scanSource();
    console.log("");
    scanBuild();
    console.log("");
    selftest();
    break;
  default:
    console.error(`usage: node scripts/check-css-urls.mjs [source|build|selftest|all]`);
    process.exit(2);
}

console.log("");
if (failed) {
  console.error("RESULT: FAILED");
  process.exit(1);
}
console.log("RESULT: OK");
