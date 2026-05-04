# Blue Ridge Gold Wings Home Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the home page to a Rolex-style chaptered editorial layout. Pivot the entire site to an Inter-only type system. Add a Headroom-style auto-hide site header.

**Architecture:** Same hand-built static site (HTML/CSS/JS at the repo root, no framework, no build step). Type system reduces to one font family (Inter, four weights). Vertical spacing switches to viewport-relative units. The home page `<main>` is rebuilt as 11 distinct compositional sections that alternate between pure-type articles and photographic moments.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, `clamp()`, `mask-image`, viewport units), vanilla JS (`requestAnimationFrame` scroll tracking), Inter as `.woff2` (regular, medium, semibold, bold), GitHub Pages.

**Reference docs:** [redesign spec](2026-05-04-blue-ridge-gold-wings-redesign.md), [original spec](2026-05-03-blue-ridge-gold-wings-design.md), [CLAUDE.md](../CLAUDE.md).

**Writing rules:** Per CLAUDE.md, all prose follows: never use the em dash (`—`, U+2014), restructure sentences instead. Voice is confident, experienced, and authentic. No superlatives, no aviation tropes.

**TDD adaptation note:** Static site, no useful unit-test surface for HTML and CSS. Each task ends with explicit static checks (file presence, brace balance, em-dash sweep, JS syntax, structural greps) plus visual verification deferred to the human reviewer in a browser.

**Commit conventions:** Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`). Co-authorship trailer per repo settings.

**Deferred safe-state strategy:** CSS edits are sequenced so that no commit leaves the site referencing styles that don't exist. Task 2 keeps `--f-serif` as an alias to `--f-sans` so legacy references still resolve until Task 3 cleans them up. The `index.html` rewrite (Task 5) happens AFTER all the new component CSS exists (Task 4), so the rewritten markup has styles ready.

---

## Task 1: Acquire Inter Bold, delete Fraunces font files

**Files:**
- Create: `assets/fonts/Inter-Bold.woff2`
- Delete: `assets/fonts/Fraunces-Regular.woff2`, `assets/fonts/Fraunces-SemiBold.woff2`, `assets/fonts/Fraunces-Bold.woff2`

- [ ] **Step 1.1: Download Inter Bold from fontsource CDN**

The URL `https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff2` returns a valid woff2 (verified, 200 OK).

```bash
cd /Users/bushrow/Projects/blue_ridge_gold_wings
curl -fL "https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff2" \
  -o assets/fonts/Inter-Bold.woff2
file assets/fonts/Inter-Bold.woff2
```

Expected: `Web Open Font Format (Version 2)`. Size approximately 25 KB.

- [ ] **Step 1.2: Delete the three Fraunces files**

```bash
rm assets/fonts/Fraunces-Regular.woff2 \
   assets/fonts/Fraunces-SemiBold.woff2 \
   assets/fonts/Fraunces-Bold.woff2
```

- [ ] **Step 1.3: Verify final font set**

```bash
ls -la assets/fonts/
```

Expected: four files only, all Inter (`Inter-Regular.woff2`, `Inter-Medium.woff2`, `Inter-SemiBold.woff2`, `Inter-Bold.woff2`).

- [ ] **Step 1.4: Commit**

```bash
git add -A assets/fonts/
git commit -m "chore: pivot fonts to Inter only (add Bold weight, drop Fraunces)"
```

---

## Task 2: Update CSS tokens, font faces, base typography, utilities

**Files:**
- Modify: `assets/css/main.css`

This task updates the foundation: tokens, `@font-face` block, base type, utilities (eyebrow), and the section padding default. Existing component rules that reference `--f-serif` will continue to work because we keep `--f-serif` as an alias to `--f-sans` for now. Task 3 cleans up those legacy references.

- [ ] **Step 2.1: Replace the tokens block**

Find the current `:root { ... }` block in `assets/css/main.css` (around lines 9-37) and REPLACE it entirely with:

```css
:root {
  /* Colors */
  --c-navy:  #14233f;
  --c-gold:  #b49342;
  --c-cream: #f5f0e6;
  --c-ink:   #1c1b18;
  --c-mute:  #5e574e;
  --c-white: #ffffff;

  /* Internal pixel spacing scale (component-level paddings, gaps) */
  --s-1: 8px;
  --s-2: 16px;
  --s-3: 24px;
  --s-4: 32px;
  --s-5: 48px;
  --s-6: 64px;
  --s-7: 96px;
  --s-8: 128px;

  /* Section vertical rhythm (viewport-relative) */
  --space-xs: 4vh;
  --space-sm: 8vh;
  --space-md: 12vh;
  --space-lg: 16vh;

  /* Type families. --f-serif is kept as an alias to --f-sans for backward
     compatibility until Task 3 cleans up the remaining legacy references. */
  --f-sans:  "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --f-serif: var(--f-sans);

  /* Layout */
  --max-w: 1180px;
  --prose-w: 720px;
}
```

(Note `--c-paper` is removed. `--prose-w` widened from 680px to 720px per spec.)

- [ ] **Step 2.2: Replace the `@font-face` block**

Find the existing `@font-face` block (lines 38-80, six declarations covering Fraunces and Inter regular/medium/semibold) and REPLACE it entirely with:

```css
@font-face {
  font-family: "Inter";
  src: url("../fonts/Inter-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Inter";
  src: url("../fonts/Inter-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Inter";
  src: url("../fonts/Inter-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Inter";
  src: url("../fonts/Inter-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

(All Fraunces faces deleted. Inter Bold added.)

- [ ] **Step 2.3: Update base typography**

Find the `html { ... }` and the `h1, h2, h3, h4 { ... }` blocks (around lines 92-122) and REPLACE them with:

```css
html {
  font-family: var(--f-sans);
  font-size: 17px;
  line-height: 1.65;
  color: var(--c-ink);
  background: var(--c-cream);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4 {
  font-family: var(--f-sans);
  color: var(--c-navy);
  margin: 0 0 var(--s-3);
  letter-spacing: -0.015em;
}

h1 {
  font-size: clamp(2.75rem, 6vw, 4.75rem);
  font-weight: 700;
  line-height: 1.08;
}
h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 600;
  line-height: 1.15;
}
h3 {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
}
h4 {
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.3;
}

p { margin: 0 0 var(--s-3); }
p:last-child { margin-bottom: 0; }

a { text-decoration: none; }
```

- [ ] **Step 2.4: Update section default padding to use viewport-relative tokens**

Find the line `section { padding-block: var(--s-6); }` and the matching `@media (min-width: 960px) { section { padding-block: var(--s-7); } }` (around lines 133-134) and REPLACE both with:

```css
section { padding-block: var(--space-md); }
```

(One rule, no breakpoint. The `vh` unit handles the responsive sizing.)

- [ ] **Step 2.5: Update the `.eyebrow` utility**

Find the existing `.eyebrow { ... }` block (around lines 137-145) and REPLACE with:

```css
.eyebrow {
  font-family: var(--f-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-mute);
  margin: 0;
}
.eyebrow + h1,
.eyebrow + h2,
.eyebrow + h3 { margin-top: var(--s-2); }
```

(Letter-spacing tightens to spec value. `margin: 0` so eyebrow sits flush; the adjacent-sibling rule reintroduces a small gap when a heading follows.)

- [ ] **Step 2.6: Verify CSS still balances and contains no em dashes**

```bash
grep -c '{' assets/css/main.css
grep -c '}' assets/css/main.css
grep -n '—' assets/css/main.css
```

Brace counts must be equal. Em-dash hits: 0.

- [ ] **Step 2.7: Commit**

```bash
git add assets/css/main.css
git commit -m "refactor: pivot CSS to Inter-only type and viewport-relative spacing tokens"
```

---

## Task 3: Update existing component CSS for the type pivot

**Files:**
- Modify: `assets/css/main.css`

This task removes every remaining direct or indirect reference to `--f-serif` and updates the existing component rules (hero, contact, about-page chapters, pull-quote, credentials block, error page) to use the new type scale. The `--f-serif` alias is also deleted at the end of this task because nothing should reference it after this point.

- [ ] **Step 3.1: Update `.hero__sub`**

Find `.hero__sub { ... }` (around line 360) and REPLACE with:

```css
.hero__sub {
  font-family: var(--f-sans);
  font-size: 1.125rem;
  font-weight: 400;
  color: rgba(245, 240, 230, 0.92);
  max-width: 560px;
  margin-top: var(--s-3);
}
```

- [ ] **Step 3.2: Update `.contact__email`**

Find `.contact__email { ... }` (around lines 514-518) and REPLACE with:

```css
.contact__email {
  font-family: var(--f-sans);
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 500;
  margin: 0 0 var(--s-4);
}
```

- [ ] **Step 3.3: Update about-page rules: page title, lede, chapter, pull quote, credentials, error page**

Find the entire about-page section block (sections 16 through 19, plus section 20 the 404 page) starting at the `/* ---------- 16. About page: title block and lede ---------- */` comment.

REPLACE everything from the comment `/* ---------- 16. About page: title block and lede ---------- */` through and including the end of the section 20 (`.error-page p { font-size: 1.0625rem; }`) with:

```css
/* ---------- 16. About page: title block and lede ---------- */
.page-title { padding-block: var(--space-md) var(--space-sm); }
.page-title h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin-bottom: var(--s-3);
}
.page-title__lede {
  font-family: var(--f-sans);
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  font-weight: 400;
  color: var(--c-mute);
  max-width: 760px;
  margin: 0;
}
.lede { padding-block: var(--space-sm) var(--space-md); }
.lede .prose { margin-inline: auto; }
.lede p { font-size: 1.125rem; line-height: 1.65; }

/* ---------- 17. About page: chapters ---------- */
.chapter {
  display: grid;
  gap: var(--s-4);
  align-items: center;
  padding-block: var(--space-sm);
}
.chapter + .chapter { border-top: 1px solid rgba(0,0,0,0.06); }
@media (min-width: 960px) {
  .chapter {
    grid-template-columns: 1fr 1fr;
    gap: var(--s-7);
    padding-block: var(--space-md);
    max-width: var(--max-w);
    margin-inline: auto;
    padding-inline: var(--s-3);
  }
  .chapter--left  .chapter__media { order: 1; }
  .chapter--left  .chapter__copy  { order: 2; }
  .chapter--right .chapter__media { order: 2; }
  .chapter--right .chapter__copy  { order: 1; }
}
@media (max-width: 959.98px) {
  .chapter { padding-inline: var(--s-3); }
}
.chapter__media img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}
.chapter__copy h2 { font-size: clamp(1.875rem, 3.5vw, 2.75rem); }

/* ---------- 18. About page: pull quote ---------- */
.pull-quote {
  background: var(--c-navy);
  color: var(--c-cream);
  padding-block: var(--space-md);
}
.pull-quote__inner { text-align: center; max-width: 920px; margin-inline: auto; padding-inline: var(--s-3); }
.pull-quote blockquote {
  font-family: var(--f-sans);
  font-style: italic;
  font-weight: 500;
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  line-height: 1.3;
  margin: 0;
  color: var(--c-cream);
  letter-spacing: -0.01em;
}

/* ---------- 19. About page: credentials block ---------- */
.credentials-block {
  background: var(--c-cream);
  border-block: 1px solid rgba(0,0,0,0.06);
}
.credentials-block__heading {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin-bottom: var(--s-5);
}
.credentials-block__list {
  display: grid;
  gap: var(--s-3);
  margin: 0;
}
@media (min-width: 760px) {
  .credentials-block__list { grid-template-columns: 1fr 1fr; gap: var(--s-3) var(--s-5); }
}
.credentials-block__list > div {
  display: grid;
  grid-template-columns: minmax(8rem, 12rem) 1fr;
  gap: var(--s-3);
  padding-block: var(--s-2);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.credentials-block__list dt {
  font-family: var(--f-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--c-mute);
  margin: 0;
}
.credentials-block__list dd {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--c-ink);
}

/* ---------- 20. 404 page ---------- */
.error-page { padding-block: var(--space-md) var(--space-lg); }
.error-page__inner { max-width: 640px; margin-inline: auto; text-align: left; }
.error-page h1 { font-size: clamp(2.5rem, 6vw, 4rem); margin-bottom: var(--s-3); }
.error-page p { font-size: 1.0625rem; }
```

(Notable changes: `.credentials-block` background changes from `--c-paper` to `--c-cream` since `--c-paper` is gone. `.pull-quote` becomes Inter italic. All paddings switch to `--space-*` tokens. `.page-title__lede` loses the `font-style: italic` from the previous build since the italic now lives on the pull-quote.)

- [ ] **Step 3.4: Delete the `--f-serif` alias**

In the `:root { ... }` block (Task 2), find:

```css
  /* Type families. --f-serif is kept as an alias to --f-sans for backward
     compatibility until Task 3 cleans up the remaining legacy references. */
  --f-sans:  "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --f-serif: var(--f-sans);
```

REPLACE with:

```css
  /* Type family */
  --f-sans:  "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
```

- [ ] **Step 3.5: Verify no `--f-serif` references remain**

```bash
grep -n 'f-serif\|Fraunces' assets/css/main.css
```

Expected: zero hits. If any references remain, find and update them to use `--f-sans` directly (or remove the rule if it's part of obsolete code that Task 4 will remove anyway).

- [ ] **Step 3.6: Verify CSS still balances**

```bash
grep -c '{' assets/css/main.css
grep -c '}' assets/css/main.css
grep -n '—' assets/css/main.css
```

Counts equal, em-dash hits 0.

- [ ] **Step 3.7: Commit**

```bash
git add assets/css/main.css
git commit -m "refactor: complete type pivot in component CSS, remove --f-serif"
```

---

## Task 4: Delete obsolete home-page CSS, add new section components and sticky header states

**Files:**
- Modify: `assets/css/main.css`

This task replaces the home-page-specific CSS sections (sections 10 through 15 in the current numbering) with the new component vocabulary: `.article`, `.diptyque`, `.service` variants (`--asymm-right`, `--asymm-left`, `--full-bleed`), `.band--navy`, plus the sticky-header state classes.

- [ ] **Step 4.1: Locate and delete sections 10 through 14 inclusive**

Sections 10 (Lead-in), 11 (Section head pattern), 12 (Services), 13 (the navy-band variant of services), 14 (Contact, but only its current rules), and any leftovers from the old service grid.

DELETE everything from the line `/* ---------- 10. Lead-in (intro + bio + credentials, sits flush after the hero) ---------- */` up to (but not including) the line `/* ---------- 16. About page: title block and lede ---------- */`.

This removes: `.lead-in*`, `.section-head`, `.services`, `.service` (and its variants `--left`, `--right`, `--navy`), and the contact section's CSS. Contact CSS will be re-added below (slightly updated for the type pivot).

- [ ] **Step 4.2: Insert the new home-page CSS in its place**

At the location where you deleted the old sections (right before `/* ---------- 16. About page: title block and lede ---------- */`), INSERT:

```css
/* ---------- 10. Article (pure-type centered chapter) ---------- */
.article {
  background: var(--c-cream);
}
.article__inner {
  max-width: var(--prose-w);
  margin-inline: auto;
  padding-inline: var(--s-3);
  text-align: center;
}
.article__inner .gold-rule { margin-inline: auto; }
.article__inner .eyebrow { display: block; }
.article__inner h2 { margin-bottom: var(--s-3); }
.article__inner p {
  font-size: 1.0625rem;
  line-height: 1.65;
  margin-bottom: 0;
}
.article__inner p + p { margin-top: var(--s-3); }
.article__cta { margin-top: var(--s-4); }

/* ---------- 11. Diptyque (paired portrait photos, no text) ---------- */
.diptyque {
  padding-block: var(--space-sm);
  background: var(--c-cream);
}
.diptyque__pair {
  display: grid;
  gap: var(--s-2);
  max-width: var(--max-w);
  margin-inline: auto;
  padding-inline: var(--s-3);
}
@media (min-width: 760px) {
  .diptyque__pair { grid-template-columns: 1fr 1fr; gap: 10px; }
}
.diptyque figure { margin: 0; }
.diptyque img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

/* ---------- 12. Service blocks (three compositional variants) ---------- */
.service {
  padding-block: var(--space-sm);
  background: var(--c-cream);
}
.service__inner {
  max-width: var(--max-w);
  margin-inline: auto;
  padding-inline: var(--s-3);
  display: grid;
  gap: var(--s-4);
  align-items: center;
}
@media (min-width: 960px) {
  .service__inner {
    grid-template-columns: 5fr 7fr;
    gap: var(--s-7);
  }
  .service--asymm-right .service__copy  { order: 1; }
  .service--asymm-right .service__media { order: 2; }
  .service--asymm-left  .service__media { order: 1; }
  .service--asymm-left  .service__copy  { order: 2; }
}
.service__media img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
.service__copy h3 { font-size: clamp(1.5rem, 2.4vw, 2rem); margin-bottom: var(--s-2); }
.service__copy p { color: var(--c-ink); }

/* Full-bleed photo variant (service 02). Photo extends edge-to-edge with
   gradient seams that fade into the cream backgrounds above and below.
   Text is overlaid on a subtle dark scrim in the lower-left of the photo. */
.service--full-bleed {
  position: relative;
  padding: 0;
  background: var(--c-cream);
}
.service--full-bleed .service__media {
  position: relative;
  width: 100vw;
  margin-inline: calc(50% - 50vw);
  aspect-ratio: 16 / 10;
  overflow: hidden;
}
.service--full-bleed .service__media picture,
.service--full-bleed .service__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.service--full-bleed .service__media::before,
.service--full-bleed .service__media::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  height: 12vh;
  background: var(--c-cream);
  pointer-events: none;
  z-index: 1;
}
.service--full-bleed .service__media::before {
  top: 0;
  -webkit-mask-image: linear-gradient(black, transparent);
  mask-image: linear-gradient(black, transparent);
}
.service--full-bleed .service__media::after {
  bottom: 0;
  -webkit-mask-image: linear-gradient(transparent, black);
  mask-image: linear-gradient(transparent, black);
}
.service--full-bleed .service__overlay {
  position: absolute;
  z-index: 2;
  left: max(var(--s-3), calc(50vw - var(--max-w) / 2 + var(--s-3)));
  bottom: var(--s-6);
  max-width: 540px;
  color: var(--c-cream);
  background: linear-gradient(
    to top,
    rgba(20, 35, 63, 0.78) 0%,
    rgba(20, 35, 63, 0.55) 70%,
    rgba(20, 35, 63, 0) 100%
  );
  padding: var(--s-5) var(--s-4) var(--s-4);
  border-radius: 2px;
}
.service--full-bleed .service__overlay .eyebrow { color: rgba(245, 240, 230, 0.78); }
.service--full-bleed .service__overlay h3 { color: var(--c-cream); margin-bottom: var(--s-2); }
.service--full-bleed .service__overlay p {
  color: rgba(245, 240, 230, 0.92);
  font-size: 1rem;
  margin: 0;
}

/* ---------- 13. Navy band (proof statement, full-bleed) ---------- */
.band--navy {
  position: relative;
  isolation: isolate;
  background: var(--c-navy);
  color: var(--c-cream);
  padding-block: var(--space-sm);
  text-align: center;
}
.band--navy::before {
  content: "";
  position: absolute;
  inset-block: 0;
  inset-inline: calc(50% - 50vw);
  background: var(--c-navy);
  z-index: -1;
}
.band--navy__inner {
  max-width: 920px;
  margin-inline: auto;
  padding-inline: var(--s-3);
}
.band--navy .gold-rule { margin-inline: auto; margin-bottom: var(--s-3); }
.band--navy .eyebrow { color: rgba(245, 240, 230, 0.65); margin-bottom: var(--s-3); }
.band--navy__statement {
  font-family: var(--f-sans);
  font-weight: 600;
  font-size: clamp(1.875rem, 4vw, 3rem);
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: var(--c-cream);
  margin: 0 0 var(--s-3);
}
.band--navy__credentials {
  font-family: var(--f-sans);
  font-weight: 500;
  font-size: 0.9375rem;
  color: rgba(245, 240, 230, 0.7);
  margin: 0;
  letter-spacing: 0.02em;
}

/* ---------- 14. Contact ---------- */
.contact {
  background: var(--c-navy);
  color: var(--c-cream);
  padding-block: var(--space-md);
}
.contact h2 { color: var(--c-cream); }
.contact__inner {
  max-width: 720px;
  margin-inline: auto;
  text-align: center;
  padding-inline: var(--s-3);
}
.contact__inner .gold-rule { margin-inline: auto; }
.contact__lede {
  font-size: 1.0625rem;
  color: rgba(245, 240, 230, 0.85);
  margin-bottom: var(--s-5);
}
.contact__email {
  font-family: var(--f-sans);
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 500;
  margin: 0 0 var(--s-4);
}
.contact__email a {
  color: var(--c-cream);
  border-bottom: 1px solid var(--c-gold);
  padding-bottom: 4px;
  transition: color 200ms ease;
}
.contact__email a:hover { color: var(--c-gold); }
.contact__location {
  font-size: 0.875rem;
  color: rgba(245, 240, 230, 0.65);
  letter-spacing: 0.04em;
  margin: 0;
}

/* ---------- 15. Site header sticky auto-hide states ---------- */
/* Default state defined in section 7 above; these add the fixed/hidden states. */
.site-header.is-fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--c-cream);
  color: var(--c-ink);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  transform: translateY(0);
  transition: transform 240ms ease;
  z-index: 50;
}
.site-header.is-fixed.is-hidden {
  transform: translateY(-100%);
}
.site-header.is-fixed .site-nav {
  background: var(--c-cream);
  color: var(--c-ink);
}
@media (prefers-reduced-motion: reduce) {
  .site-header.is-fixed { transition: none; }
}
```

(Section 15 leverages the existing `.site-header` rules from section 7 of the file. The new state classes are additions, not replacements.)

- [ ] **Step 4.3: Verify CSS still balances and contains no em dashes or stale references**

```bash
grep -c '{' assets/css/main.css
grep -c '}' assets/css/main.css
grep -n '—' assets/css/main.css
grep -nE 'lead-in|about-teaser|section-head|--c-paper|--f-serif' assets/css/main.css
```

Brace counts equal. Em-dash 0. Last grep returns 0 hits.

- [ ] **Step 4.4: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: add Rolex-style section components (article, diptyque, service variants, navy band, sticky header states)"
```

---

## Task 5: Rewrite `index.html` `<main>` with the 11 new sections

**Files:**
- Modify: `index.html`

- [ ] **Step 5.1: Replace the entire `<main>` element**

In `index.html`, find the existing `<main id="main"> ... </main>` element (everything from line 27 through the closing `</main>` around line 154) and REPLACE the whole element with:

```html
  <main id="main">
    <section class="hero" aria-label="Introduction">
      <picture class="hero__image">
        <source media="(min-width: 960px)"
                srcset="assets/images/hero/blue-ridge-cockpit-1920.webp"
                type="image/webp">
        <source srcset="assets/images/hero/blue-ridge-cockpit-960.webp"
                type="image/webp">
        <img src="assets/images/hero/blue-ridge-cockpit-1920.jpg"
             alt="Aerial view of the Blue Ridge mountains seen from an aircraft cockpit at altitude.">
      </picture>
      <div class="hero__overlay" aria-hidden="true"></div>
      <div class="container hero__content">
        <hr class="gold-rule" aria-hidden="true">
        <p class="eyebrow hero__eyebrow">Contract Pilot &middot; Charlottesville, VA</p>
        <h1>Navy Trained.<br>Airline Experienced.<br>On Your Flight Deck.</h1>
        <p class="hero__sub">Ferry, contract, and instruction across the Mid-Atlantic.</p>
      </div>
      <a class="hero__scroll" href="#intro" aria-label="Scroll to next section">&#x25BC;</a>
    </section>

    <section class="article" id="intro" aria-labelledby="intro-heading">
      <div class="article__inner" data-fade-up>
        <hr class="gold-rule" aria-hidden="true">
        <p class="eyebrow">01 &middot; Introduction</p>
        <h2 id="intro-heading">One pilot. Already in Charlottesville.</h2>
        <p>Blue Ridge Gold Wings is a one-pilot contract operation serving aircraft owners across the Mid-Atlantic and Central Appalachian corridor. Forty-five years in the air, beginning in Navy carrier aviation and continuing today on commercial type ratings. No commuter leg, no scheduling around a distant home base. The pilot is already here.</p>
      </div>
    </section>

    <section class="diptyque" aria-label="Then and now">
      <div class="diptyque__pair" data-fade-up>
        <figure>
          <picture>
            <source srcset="assets/images/content/young-navy-aviator-1200.webp" type="image/webp">
            <img src="assets/images/content/young-navy-aviator-1200.jpg"
                 alt="Paul Bushrow as a young Naval aviator in flight gear.">
          </picture>
        </figure>
        <figure>
          <picture>
            <source srcset="assets/images/content/current-commercial-airline-1200.webp" type="image/webp">
            <img src="assets/images/content/current-commercial-airline-1200.jpg"
                 alt="Paul Bushrow standing in front of a regional commercial airliner.">
          </picture>
        </figure>
      </div>
    </section>

    <section class="article" id="services" aria-labelledby="services-heading">
      <div class="article__inner" data-fade-up>
        <hr class="gold-rule" aria-hidden="true">
        <p class="eyebrow">02 &middot; Services</p>
        <h2 id="services-heading">Three kinds of work.</h2>
        <p>Ferry and positioning. Contract piloting in either seat. Flight instruction in fixed-wing and glider. All flown out of Charlottesville, on the schedule the owner needs.</p>
      </div>
    </section>

    <article class="service service--asymm-right" aria-labelledby="service-1-heading" data-fade-up>
      <div class="service__inner">
        <div class="service__copy">
          <p class="eyebrow">01 &middot; Ferry &amp; Positioning</p>
          <h3 id="service-1-heading">Get the airplane where it needs to be.</h3>
          <p>For aircraft owners who need a plane somewhere it is not, ferry and positioning flights are the bread and butter of contract piloting. Paul flies single and twin-engine piston, turboprop, and light jet aircraft on positioning legs, repossession deliveries, and pre-purchase movements.</p>
          <p>The schedule is yours. The route, weather call, and operational decisions are made with the experience of a captain who has flown both Naval carrier approaches and regional airline operations across the eastern United States.</p>
        </div>
        <div class="service__media">
          <picture>
            <source srcset="assets/images/content/cockpit-flying-1200.webp" type="image/webp">
            <img src="assets/images/content/cockpit-flying-1200.jpg"
                 alt="Paul Bushrow at the controls of an aircraft, in flight.">
          </picture>
        </div>
      </div>
    </article>

    <article class="service service--full-bleed" aria-labelledby="service-2-heading" data-fade-up>
      <div class="service__media">
        <picture>
          <source srcset="assets/images/content/pilatus-1200.webp" type="image/webp">
          <img src="assets/images/content/pilatus-1200.jpg"
               alt="A Pilatus PC-12 turboprop on a runway with a mountain backdrop.">
        </picture>
        <div class="service__overlay">
          <p class="eyebrow">02 &middot; Contract Piloting</p>
          <h3 id="service-2-heading">Either seat. Any operation.</h3>
          <p>Type-rated on the Canadair Regional Jet (CL-65) and the Jetstream 41, with current initial training on the Pilatus PC-12 NG and Legacy. Comfortable in either seat, with an owner-pilot or a fully professional crew.</p>
        </div>
      </div>
    </article>

    <article class="service service--asymm-left" aria-labelledby="service-3-heading" data-fade-up>
      <div class="service__inner">
        <div class="service__media">
          <picture>
            <source srcset="assets/images/content/glider-cockpit-1200.webp" type="image/webp">
            <img src="assets/images/content/glider-cockpit-1200.jpg"
                 alt="View from inside a glider cockpit during flight.">
          </picture>
        </div>
        <div class="service__copy">
          <p class="eyebrow">03 &middot; Flight Instruction</p>
          <h3 id="service-3-heading">Experience that translates to the syllabus.</h3>
          <p>Forty-five years of flying produces specific opinions. Paul's instruction work focuses on the parts of aviation that experience teaches better than any syllabus: decision-making under fatigue, weather sense in real terrain, the rhythm of a crew that trusts each other.</p>
          <p>Certifications: CFI, CFII, and CFIG. Instruction available for fixed-wing single, fixed-wing multi, instrument, and glider students.</p>
        </div>
      </div>
    </article>

    <section class="band--navy" aria-labelledby="proof-heading" data-fade-up>
      <div class="band--navy__inner">
        <hr class="gold-rule" aria-hidden="true">
        <p class="eyebrow">The Record</p>
        <p id="proof-heading" class="band--navy__statement">45+ years. 0 incidents. 0 failed checkrides.</p>
        <p class="band--navy__credentials">ATP &middot; CL-65 &middot; BA-4100 &middot; CFI &middot; CFII &middot; CFIG &middot; Wings of Gold</p>
      </div>
    </section>

    <section class="article" id="more" aria-labelledby="more-heading">
      <div class="article__inner" data-fade-up>
        <hr class="gold-rule" aria-hidden="true">
        <p class="eyebrow">03 &middot; About</p>
        <h2 id="more-heading">More about Paul.</h2>
        <p>Naval aviator. Regional airline captain. Glider rated. Contract pilot from Charlottesville. The full version of the story, including the chapters that brought him here, is on its own page.</p>
        <p class="article__cta"><a class="link-gold" href="about.html">Read the full bio &rsaquo;</a></p>
      </div>
    </section>

    <section class="contact" id="contact" aria-labelledby="contact-heading">
      <div class="contact__inner" data-fade-up>
        <hr class="gold-rule gold-rule--center" aria-hidden="true">
        <h2 id="contact-heading">Get in touch.</h2>
        <p class="contact__lede">For ferry, contract, or instruction work, reach out directly.</p>
        <p class="contact__email">
          <a href="mailto:paul@blueridgegoldwings.com">paul@blueridgegoldwings.com</a>
        </p>
        <p class="contact__location">Based in Charlottesville, Virginia.</p>
      </div>
    </section>
  </main>
```

(Note: the in-page nav anchors changed. The `Services` link in the top-bar nav points to `#services` which now lives on the services-intro article. The `Contact` link still points to `#contact`. The hero scroll cue points to `#intro`.)

- [ ] **Step 5.2: Verify HTML structure**

```bash
cd /Users/bushrow/Projects/blue_ridge_gold_wings
grep -n '—' index.html
grep -c '<main' index.html
grep -c '</main>' index.html
grep -c '<section\|<article' index.html
grep -c 'id="intro"\|id="services"\|id="contact"\|id="more"' index.html
```

Em-dash 0. `<main`: 1. `</main>`: 1. Section/article count: 10 (4 articles: 3 article sections + 3 service articles + 4 other sections; total around 10). The id grep should return 4 (intro, services, contact, more).

- [ ] **Step 5.3: Commit**

```bash
git add index.html
git commit -m "refactor: rebuild home page main with 11 chaptered sections"
```

---

## Task 6: Update `about.html` minor adjustments and verify cascade

**Files:**
- Modify: `about.html` (minor)

The about page's CSS has already been updated in Task 3 (type pivot, vh-based padding). The HTML structure is preserved. This task verifies the page still works and makes one small touch-up to the page-title block: remove the italic styling on the lede since italic is now reserved for the pull-quote per the type system rules.

- [ ] **Step 6.1: Verify the page-title lede no longer relies on italic**

The CSS in Task 3 removed `font-style: italic` from `.page-title__lede`. The HTML doesn't apply italic directly. Confirm by reading lines 28-35 of `about.html`:

```bash
sed -n '28,35p' about.html
```

If the markup contains an explicit `<em>` or `<i>` wrapping the lede text, leave it alone. If not, no change needed.

- [ ] **Step 6.2: Verify no em dashes in the about page**

```bash
grep -n '—' about.html
```

Expected: zero hits.

- [ ] **Step 6.3: If any HTML changes were needed, commit; otherwise no commit**

```bash
git diff --stat about.html
```

If the diff is empty, skip the commit step. If there are changes:

```bash
git add about.html
git commit -m "refactor: drop italic from about page lede (italic reserved for pull-quote)"
```

---

## Task 7: Verify `404.html` cascade and commit if needed

**Files:**
- Modify: `404.html` (likely no change)

The 404 page only uses CSS rules that have already been updated in Task 3 (the `.error-page` block). The HTML structure does not need changes.

- [ ] **Step 7.1: Verify the page renders without referencing dropped tokens or fonts**

```bash
grep -n 'Fraunces\|f-serif\|c-paper' 404.html
grep -n '—' 404.html
```

All should return 0 hits.

- [ ] **Step 7.2: If any HTML changes were needed, commit; otherwise no commit**

```bash
git diff --stat 404.html
```

If empty, skip the commit. If non-empty:

```bash
git add 404.html
git commit -m "refactor: clean up 404 page after type pivot"
```

---

## Task 8: Add sticky auto-hide header to `assets/js/main.js`

**Files:**
- Modify: `assets/js/main.js`

This task adds the third responsibility to the JS file: scroll-direction header that switches the site header to fixed-position after the hero, hides on scroll-down, and re-presents on scroll-up. Existing mobile-nav and fade-up behavior is preserved.

- [ ] **Step 8.1: REPLACE the entire content of `assets/js/main.js`**

```js
// Blue Ridge Gold Wings. Site interactivity.
// Three responsibilities: mobile nav toggle, fade-up on scroll,
// sticky auto-hide site header.

(function () {
  // --- Mobile nav toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var nav    = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && window.matchMedia('(max-width: 639.98px)').matches) {
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Fade-up on scroll ---
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('[data-fade-up]');

  if (prefersReduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) { observer.observe(el); });
  }

  // --- Sticky auto-hide site header ---
  // After scrolling past 80% of the hero, the header switches to fixed
  // position with a solid background. While in this fixed state, the
  // header hides on scroll-down and reveals on scroll-up.
  var header = document.querySelector('.site-header');
  var hero   = document.querySelector('.hero');
  if (!header) return;

  var lastY = window.scrollY;
  var ticking = false;
  var heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
  var threshold = heroBottom * 0.8;
  var DELTA = 6;

  function recalcHero() {
    if (!hero) return;
    heroBottom = hero.offsetTop + hero.offsetHeight;
    threshold = heroBottom * 0.8;
  }

  function onScroll() {
    var y = window.scrollY;

    if (y < threshold) {
      header.classList.remove('is-fixed', 'is-hidden');
    } else {
      header.classList.add('is-fixed');
      var dy = y - lastY;
      if (Math.abs(dy) > DELTA) {
        if (dy > 0) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
        }
        lastY = y;
      }
    }

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('resize', function () {
    recalcHero();
  });
})();
```

- [ ] **Step 8.2: Verify JS syntax and em-dash freedom**

```bash
cd /Users/bushrow/Projects/blue_ridge_gold_wings
node --check assets/js/main.js
grep -n '—' assets/js/main.js
```

Both should produce no output (silent pass on `node --check`, zero em-dash hits).

- [ ] **Step 8.3: Commit**

```bash
git add assets/js/main.js
git commit -m "feat: add sticky auto-hide site header behavior"
```

---

## Task 9: Final verification, commit residue, push to deploy

**Files:**
- Possible: README.md, CLAUDE.md (only if they reference Fraunces).

- [ ] **Step 9.1: Final em-dash sweep across the repo**

```bash
cd /Users/bushrow/Projects/blue_ridge_gold_wings
grep -rn '—' README.md CLAUDE.md design/ index.html about.html 404.html assets/css/main.css assets/js/main.js scripts/optimize-images.sh
```

Expected: only the legitimate references inside backticks where the rule defines what is forbidden (CLAUDE.md heading, design doc rule sections, plan doc grep example). Any other hit must be fixed.

- [ ] **Step 9.2: Update README.md and CLAUDE.md font references if any**

```bash
grep -n 'Fraunces' README.md CLAUDE.md
```

If any hits, edit those references to remove Fraunces (the font is no longer used). The README's Tech Stack section and CLAUDE.md's working-in-this-repo section may mention it. Update the README's tech stack bullet to read "Self-hosted Inter font in `assets/fonts/`."

If changes were made, commit:

```bash
git add README.md CLAUDE.md
git commit -m "docs: update README and CLAUDE.md after Fraunces removal"
```

- [ ] **Step 9.3: Verify static site smoke checks**

```bash
ls index.html about.html 404.html
ls assets/fonts/   # should be exactly 4 files, all Inter
ls assets/images/hero/    # should be 3 files
ls assets/images/content/ | wc -l   # should be 22

grep -ohE '(src|srcset)="[^"]*assets/images/[^"]*"' index.html about.html 404.html | grep -ohE 'assets/images/[^"]+' | sort -u | while read p; do
  if [ ! -f "$p" ]; then echo "MISSING: $p"; fi
done

grep -c '{' assets/css/main.css
grep -c '}' assets/css/main.css
node --check assets/js/main.js
```

All MISSING checks return nothing. Brace counts equal. JS clean.

- [ ] **Step 9.4: Push to GitHub**

```bash
git push origin main
```

- [ ] **Step 9.5: Wait for Pages build and verify**

```bash
until gh api repos/bushrow/blue_ridge_gold_wings/pages/builds/latest --jq '.commit + " " + .status' 2>/dev/null | grep -E "$(git rev-parse HEAD).*(built|errored)" >/dev/null; do sleep 5; done
gh api repos/bushrow/blue_ridge_gold_wings/pages/builds/latest --jq '{commit, status, error: .error.message, duration_ms: .duration}'

curl -sI -L https://bushrow.xyz/blue_ridge_gold_wings/ | head -3
curl -sI -L https://bushrow.xyz/blue_ridge_gold_wings/about.html | head -3
```

Build status should be `built` with `error: null`. Both curl checks return `HTTP/2 200`.

- [ ] **Step 9.6: Items for human-in-loop browser review**

Surface to the user, do not attempt programmatically:

1. Hero composition: tagline plus eyebrow plus supporting line read cleanly at desktop and mobile widths.
2. Sticky header behavior: scrolls smoothly off when going down, re-presents when going up, snap-on under reduced-motion.
3. Diptyque: photos sit cleanly side-by-side with the 10px gap, stack on narrow widths.
4. Service 02 full-bleed: photo bleeds edge-to-edge, gradient seams above and below dissolve into cream cleanly, overlay is legible.
5. Navy proof band: the single statement reads with weight, the credentials line beneath sits comfortably.
6. Smooth in-page anchor scrolling on the new section ids (`#intro`, `#services`, `#contact`, `#more`).

---

## Self-review checklist (run after the plan is complete)

- [x] **Spec coverage:**
  - Type system (spec section 3) → Task 1 (fonts), Task 2 (CSS tokens, base type, eyebrow), Task 3 (component type pivot)
  - Spacing system (spec section 4) → Task 2 (token addition), Task 3 (about-page padding), Task 4 (new components)
  - Color discipline (spec section 5) → Task 2 (token block drops `--c-paper`), Task 3 (`.credentials-block` background swap)
  - Compositional rules (spec section 6) → encoded in Task 4 (component CSS) and Task 5 (HTML structure)
  - Home page structure (spec section 7) → Task 4 (CSS), Task 5 (HTML)
  - Sticky header (spec section 8) → Task 4 (CSS states), Task 8 (JS behavior)
  - About page changes (spec section 9) → Task 3 (CSS), Task 6 (HTML verification)
  - 404 page changes (spec section 10) → Task 7
  - CSS file restructure (spec section 11) → Tasks 2, 3, 4
  - JS file changes (spec section 12) → Task 8
  - Copy (spec section 13) → embedded in Task 5
  - Acceptance criteria (spec section 14) → Task 9 verification

- [x] **Placeholder scan:** No "TBD", no "implement appropriate". Every code-changing step has the actual code.

- [x] **Type/class consistency:** Class names referenced consistently. `.article` and `.article__inner` used throughout. `.service__inner` introduced in Task 4 and used in Task 5 markup. `.band--navy` and `.band--navy__inner`, `.band--navy__statement`, `.band--navy__credentials` aligned. Sticky header state classes (`is-fixed`, `is-hidden`) match between CSS (Task 4) and JS (Task 8).

- [x] **Em-dash hygiene:** No em dashes in the plan body except inside backticks where the rule is being defined.

- [x] **Commit messages:** Conventional Commits style on every task.

- [x] **Each task is independently committable** and produces a verifiable change.
