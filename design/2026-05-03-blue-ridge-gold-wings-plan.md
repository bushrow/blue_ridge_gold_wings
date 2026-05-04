# Blue Ridge Gold Wings Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the static marketing website for Blue Ridge Gold Wings, LLC per the design spec, deploy-ready on GitHub Pages.

**Architecture:** Hand-built static HTML, CSS, and JS at the repo root. No framework, no bundler, no build step. Single CSS file organized by concern. ~30-line vanilla JS file. Self-hosted Fraunces and Inter fonts. Manually optimized images served via `<picture>` with WebP and JPG fallbacks.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, flexbox, `clamp()`), vanilla JS, Fraunces and Inter (`.woff2`), `cwebp` and `sips` for image optimization, GitHub Pages for hosting.

**Reference docs:** [design spec](2026-05-03-blue-ridge-gold-wings-design.md), [CLAUDE.md](../CLAUDE.md), [README.md](../README.md).

**Writing rules:** Per [CLAUDE.md](../CLAUDE.md) section "Writing style," all prose in HTML, CSS comments, JS comments, commit messages, and any documentation must follow:
1. Never use the em dash (`—`, U+2014). Restructure sentences instead.
2. Voice is confident, experienced, and authentic. No pleading, no superlatives, no aviation tropes, no cockiness.

The character `—` is allowed only in places where it is being explicitly identified as forbidden (such as a rule heading inside backticks).

**TDD adaptation note:** A static marketing site has no useful unit-test surface for HTML and CSS, and the JS is too small to justify a test framework. The plan uses an analogous discipline: build incrementally, verify visually in a browser at each step, commit frequently. Each task ends with explicit verification before the commit step.

**Commit conventions:** Conventional Commits style (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`). Each task ends in one commit. Co-authorship trailer per repo settings.

**File structure (target state at end of plan):**

```
blue_ridge_gold_wings/
├── README.md
├── CLAUDE.md
├── .gitignore
├── .nojekyll
├── index.html
├── about.html
├── 404.html
├── assets/
│   ├── css/main.css
│   ├── js/main.js
│   ├── fonts/{Fraunces,Inter}-*.woff2
│   └── images/{hero,content}/*.{webp,jpg}
├── design/
│   ├── 2026-05-03-blue-ridge-gold-wings-design.md
│   └── 2026-05-03-blue-ridge-gold-wings-plan.md
├── scripts/
│   └── optimize-images.sh
└── _source/                            (gitignored, local only)
    ├── images/                         (originals)
    └── reference/current_wordpress_site.html
```

---

## Task 1: Initialize repo, migrate to target directory structure

**Files:**
- Create: `.gitignore`, `.nojekyll`
- Move: `images/` → `_source/images/`, `reference_code/current_wordpress_site.html` → `_source/reference/`
- Delete: empty `website/`, top-level `.DS_Store`

- [ ] **Step 1.1: Initialize git repository**

```bash
cd /Users/bushrow/Projects/blue_ridge_gold_wings
git init
```

Expected: `Initialized empty Git repository in .../blue_ridge_gold_wings/.git/`

- [ ] **Step 1.2: Create `.gitignore`**

Write `.gitignore`:

```
.DS_Store
_source/
node_modules/
*.log
```

- [ ] **Step 1.3: Create `.nojekyll`**

Write empty file `.nojekyll` (signals GitHub Pages to skip Jekyll processing).

- [ ] **Step 1.4: Create `_source/` and migrate originals and reference**

```bash
mkdir -p _source/images _source/reference
mv images/* _source/images/
mv reference_code/current_wordpress_site.html _source/reference/
```

- [ ] **Step 1.5: Remove emptied source directories and top-level .DS_Store**

```bash
rm -f .DS_Store _source/images/.DS_Store
rmdir images reference_code website
```

- [ ] **Step 1.6: Verify final structure**

Run: `ls -la`

Expected output should include: `README.md`, `CLAUDE.md`, `.gitignore`, `.nojekyll`, `_source/`, `design/`, and no `images/`, `reference_code/`, or `website/` directories.

- [ ] **Step 1.7: Stage and commit**

```bash
git add .gitignore .nojekyll README.md CLAUDE.md design/
git commit -m "chore: initialize repository with design spec and base structure"
```

Verify: `git log --oneline` shows the single commit.

---

## Task 2: Acquire Fraunces and Inter font files

**Files:**
- Create: `assets/fonts/Fraunces-Regular.woff2`, `assets/fonts/Fraunces-SemiBold.woff2`, `assets/fonts/Fraunces-Bold.woff2`
- Create: `assets/fonts/Inter-Regular.woff2`, `assets/fonts/Inter-Medium.woff2`, `assets/fonts/Inter-SemiBold.woff2`

- [ ] **Step 2.1: Create the fonts directory**

```bash
mkdir -p assets/fonts
```

- [ ] **Step 2.2: Acquire font files via google-webfonts-helper**

Visit `https://gwfh.mranftl.com/fonts` in a browser.

For **Fraunces**:
1. Search "Fraunces" and select it.
2. Charsets: keep `latin` selected only.
3. Styles: select `regular 400`, `600`, `700`.
4. Format: choose "Modern Browsers" (woff2).
5. Click "Download files" to get a zip.
6. Extract and copy the three `.woff2` files into `assets/fonts/`. Rename if necessary so filenames match exactly:
   - `Fraunces-Regular.woff2`
   - `Fraunces-SemiBold.woff2`
   - `Fraunces-Bold.woff2`

For **Inter**:
1. Search "Inter" and select it.
2. Charsets: keep `latin` only.
3. Styles: select `regular 400`, `500`, `600`.
4. Format: "Modern Browsers" (woff2).
5. Download and extract.
6. Place in `assets/fonts/` as:
   - `Inter-Regular.woff2`
   - `Inter-Medium.woff2`
   - `Inter-SemiBold.woff2`

- [ ] **Step 2.3: Verify all six files are in place**

```bash
ls -la assets/fonts/
```

Expected: six `.woff2` files, each in the kilobyte range (typical sizes 30 to 80 KB each).

- [ ] **Step 2.4: Commit**

```bash
git add assets/fonts/
git commit -m "chore: self-host Fraunces and Inter font files"
```

---

## Task 3: Write image optimization script and produce optimized assets

**Files:**
- Create: `scripts/optimize-images.sh`
- Create (via the script): `assets/images/hero/blue-ridge-cockpit-{1920,960}.webp`, `assets/images/hero/blue-ridge-cockpit-1920.jpg`, and 11 content images at `assets/images/content/*-1200.{webp,jpg}`

- [ ] **Step 3.1: Verify `cwebp` is installed**

```bash
which cwebp
```

If missing, install:

```bash
brew install webp
```

- [ ] **Step 3.2: Write `scripts/optimize-images.sh`**

```bash
mkdir -p scripts
```

Create `scripts/optimize-images.sh` with the following content:

```bash
#!/usr/bin/env bash
# Optimize source photography from _source/images/ into assets/images/.
# Reproducible: run again at any time to regenerate derivatives.

set -euo pipefail

SRC=_source/images
HERO_DST=assets/images/hero
CONTENT_DST=assets/images/content

mkdir -p "$HERO_DST" "$CONTENT_DST"

# --- Hero: two widths, webp + jpg fallback at 1920w ---
HERO_SRC="$SRC/Blue-ridge-from-the-cockpit.png"
sips -Z 1920 -s format jpeg --setProperty formatOptions 80 \
  "$HERO_SRC" --out "$HERO_DST/blue-ridge-cockpit-1920.jpg" >/dev/null
cwebp -q 80 -resize 1920 0 "$HERO_SRC" \
  -o "$HERO_DST/blue-ridge-cockpit-1920.webp" >/dev/null
cwebp -q 80 -resize 960 0 "$HERO_SRC" \
  -o "$HERO_DST/blue-ridge-cockpit-960.webp" >/dev/null

# --- Content: single 1200w master, webp + jpg fallback ---
optimize_content() {
  local src_name=$1
  local out_name=$2
  local src_path="$SRC/$src_name"
  if [ ! -f "$src_path" ]; then
    echo "WARN: missing source $src_path"
    return
  fi
  sips -Z 1200 -s format jpeg --setProperty formatOptions 80 \
    "$src_path" --out "$CONTENT_DST/$out_name-1200.jpg" >/dev/null
  cwebp -q 80 -resize 1200 0 "$src_path" \
    -o "$CONTENT_DST/$out_name-1200.webp" >/dev/null
}

optimize_content headshot_smiling.jpeg                    headshot
optimize_content current_commercial_airline.png          current-commercial-airline
optimize_content pilatus-with-australia-background.jpg   pilatus
optimize_content glider_cockpit.jpeg                     glider-cockpit
optimize_content young_navy_aviator_suite.jpg            young-navy-aviator
optimize_content young_commercial_wings.jpeg             young-commercial-wings
optimize_content young_by_plane.jpeg                     young-by-plane
optimize_content young_by_plane_with_flight_helmet.jpeg  young-by-plane-helmet
optimize_content young_by_plane_on_ladder.jpeg           young-by-plane-ladder
optimize_content cockpit_flying.jpeg                     cockpit-flying
optimize_content cockpit_right_seat.jpeg                 cockpit-right-seat

echo "Done."
```

- [ ] **Step 3.3: Make the script executable and run it**

```bash
chmod +x scripts/optimize-images.sh
./scripts/optimize-images.sh
```

Expected: `Done.` printed, no warnings. If warnings appear, the source filename does not match.

- [ ] **Step 3.4: Verify outputs**

```bash
ls -la assets/images/hero/
ls -la assets/images/content/
```

Expected: `hero/` contains 3 files (`blue-ridge-cockpit-1920.webp`, `blue-ridge-cockpit-1920.jpg`, `blue-ridge-cockpit-960.webp`). `content/` contains 22 files (11 names × 2 formats each).

Spot-check sizes: WebP files should generally be smaller than the JPG fallbacks; both should be well under 500 KB each.

- [ ] **Step 3.5: Commit**

```bash
git add scripts/ assets/images/
git commit -m "feat: add image optimization script and derivatives"
```

---

## Task 4: CSS foundation (tokens, fonts, reset, typography, layout primitives)

**Files:**
- Create: `assets/css/main.css`

- [ ] **Step 4.1: Create the CSS directory and file**

```bash
mkdir -p assets/css
```

- [ ] **Step 4.2: Write `assets/css/main.css`**

```css
/* =========================================================
   Blue Ridge Gold Wings, LLC.
   main.css
   Sections: tokens, fonts, reset, typography, layout primitives,
             components, page sections, utilities.
   ========================================================= */

/* ---------- 1. Tokens ---------- */
:root {
  /* Colors */
  --c-navy:  #14233f;
  --c-gold:  #b49342;
  --c-cream: #f5f0e6;
  --c-paper: #fbf8f1;
  --c-ink:   #1c1b18;
  --c-mute:  #7d756a;
  --c-white: #ffffff;

  /* Spacing scale (8px base) */
  --s-1: 8px;
  --s-2: 16px;
  --s-3: 24px;
  --s-4: 32px;
  --s-5: 48px;
  --s-6: 64px;
  --s-7: 96px;
  --s-8: 128px;

  /* Type families */
  --f-serif: "Fraunces", Georgia, "Iowan Old Style", serif;
  --f-sans:  "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;

  /* Layout */
  --max-w: 1180px;
  --prose-w: 680px;
}

/* ---------- 2. Font faces ---------- */
@font-face {
  font-family: "Fraunces";
  src: url("../fonts/Fraunces-Regular.woff2") format("woff2");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Fraunces";
  src: url("../fonts/Fraunces-SemiBold.woff2") format("woff2");
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Fraunces";
  src: url("../fonts/Fraunces-Bold.woff2") format("woff2");
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
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

/* ---------- 3. Reset (light) ---------- */
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body { margin: 0; }
img, picture, video { max-width: 100%; height: auto; display: block; }
ul, ol { padding-left: 1.25rem; }
button { font: inherit; }
a { color: inherit; }

/* ---------- 4. Base typography ---------- */
html {
  font-family: var(--f-sans);
  font-size: 17px;
  line-height: 1.6;
  color: var(--c-ink);
  background: var(--c-cream);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4 {
  font-family: var(--f-serif);
  font-weight: 600;
  color: var(--c-navy);
  margin: 0 0 var(--s-3);
  line-height: 1.15;
  letter-spacing: -0.01em;
}

h1 {
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 1.05;
}
h2 { font-size: clamp(2rem, 4vw, 3.25rem); }
h3 { font-size: 1.5rem; }

p { margin: 0 0 var(--s-3); }
p:last-child { margin-bottom: 0; }

a { text-decoration: none; }

/* ---------- 5. Layout primitives ---------- */
.container {
  max-width: var(--max-w);
  margin-inline: auto;
  padding-inline: var(--s-3);
}

.prose { max-width: var(--prose-w); }

section { padding-block: var(--s-7); }
@media (min-width: 960px) { section { padding-block: var(--s-8); } }

/* ---------- 6. Utilities ---------- */
.eyebrow {
  font-family: var(--f-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--c-mute);
  margin: 0 0 var(--s-2);
}
.gold-rule {
  display: block;
  width: 32px;
  height: 1px;
  background: var(--c-gold);
  border: 0;
  margin: 0 0 var(--s-3);
}
.gold-rule--center { margin-inline: auto; }
.link-gold {
  color: var(--c-navy);
  border-bottom: 1px solid var(--c-gold);
  transition: color 200ms ease;
}
.link-gold:hover { color: var(--c-gold); }

.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--c-navy);
  color: var(--c-white);
  padding: var(--s-2) var(--s-3);
  z-index: 100;
}
.skip-link:focus { top: 0; }

:focus-visible {
  outline: 2px solid var(--c-gold);
  outline-offset: 3px;
}

/* Fade-up motion */
[data-fade-up] {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 500ms ease-out, transform 500ms ease-out;
}
[data-fade-up].is-visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  [data-fade-up] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 4.3: Verify the file is syntactically valid**

```bash
# Quick syntactic sanity check: count opening and closing braces.
grep -c '{' assets/css/main.css
grep -c '}' assets/css/main.css
```

Expected: both counts equal.

- [ ] **Step 4.4: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: add CSS foundation (tokens, fonts, reset, typography)"
```

---

## Task 5: Header and footer components (CSS only at this point)

**Files:**
- Modify: `assets/css/main.css` (append component rules)

- [ ] **Step 5.1: Append header and footer CSS**

Append to `assets/css/main.css` after the existing utilities block:

```css
/* ---------- 7. Site header ---------- */
.site-header {
  position: absolute;
  inset-inline: 0;
  top: 0;
  z-index: 10;
  padding: var(--s-3) 0;
  color: var(--c-cream);
}
.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--s-3);
}
.wordmark {
  font-family: var(--f-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: inherit;
}
.wordmark .accent { color: var(--c-gold); }

.nav-toggle {
  background: transparent;
  border: 0;
  color: inherit;
  padding: var(--s-1) var(--s-2);
  cursor: pointer;
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.nav-toggle[aria-expanded="true"] + .site-nav { display: flex; }

.site-nav {
  display: none;
  position: absolute;
  inset-inline: 0;
  top: 100%;
  background: var(--c-navy);
  flex-direction: column;
  padding: var(--s-3);
  gap: var(--s-2);
  font-size: 0.9375rem;
  letter-spacing: 0.04em;
}
@media (min-width: 640px) {
  .nav-toggle { display: none; }
  .site-nav {
    display: flex !important;
    position: static;
    flex-direction: row;
    background: transparent;
    padding: 0;
    gap: var(--s-4);
  }
}
.site-nav a {
  color: inherit;
  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
  transition: border-color 200ms ease;
}
.site-nav a:hover,
.site-nav a[aria-current="page"] { border-bottom-color: var(--c-gold); }

/* On non-hero pages, the header sits on cream and uses ink color. */
.site-header--solid {
  position: static;
  color: var(--c-ink);
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.site-header--solid .site-nav {
  background: var(--c-cream);
  color: var(--c-ink);
}

/* ---------- 8. Site footer ---------- */
.site-footer {
  background: var(--c-cream);
  border-top: 1px solid rgba(0,0,0,0.06);
  padding-block: var(--s-5);
  font-size: 0.9375rem;
  color: var(--c-mute);
}
.site-footer .container {
  display: flex;
  flex-direction: column;
  gap: var(--s-2);
  align-items: flex-start;
}
@media (min-width: 640px) {
  .site-footer .container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
.site-footer nav {
  display: flex;
  gap: var(--s-3);
}
.site-footer a:hover { color: var(--c-navy); }
```

- [ ] **Step 5.2: Verify brace balance**

```bash
grep -c '{' assets/css/main.css
grep -c '}' assets/css/main.css
```

Expected: equal counts.

- [ ] **Step 5.3: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: add site header and footer components"
```

---

## Task 6: Scaffold `index.html` with header, footer, and a hero placeholder

**Files:**
- Create: `index.html`

- [ ] **Step 6.1: Write `index.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Blue Ridge Gold Wings, LLC. Contract Pilot Services in Central Virginia</title>
  <meta name="description" content="Contract pilot services for aircraft owners across the Mid-Atlantic. Ferry, contract piloting, and instruction by a Navy-trained, airline-experienced pilot based in Charlottesville, Virginia.">
  <link rel="preload" as="image" href="assets/images/hero/blue-ridge-cockpit-1920.webp" type="image/webp">
  <link rel="stylesheet" href="assets/css/main.css">
  <script src="assets/js/main.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header">
    <div class="container">
      <a class="wordmark" href="/">Blue Ridge <span class="accent">Gold</span> Wings</a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="site-nav" id="site-nav" aria-label="Primary">
        <a href="about.html">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>

  <main id="main">
    <!-- Hero placeholder, fleshed out in Task 7 -->
    <section class="hero" aria-label="Introduction">
      <div class="container">
        <h1>Navy Trained. Airline Experienced. On Your Flight Deck.</h1>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div>
        <span class="wordmark">Blue Ridge <span class="accent">Gold</span> Wings</span>
        &nbsp;&middot;&nbsp;
        &copy; 2026 Blue Ridge Gold Wings, LLC.
      </div>
      <nav aria-label="Footer">
        <a href="about.html">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </footer>
</body>
</html>
```

- [ ] **Step 6.2: Stub the JS file so the `<script>` tag does not 404**

```bash
mkdir -p assets/js
```

Write `assets/js/main.js`:

```js
// Blue Ridge Gold Wings. Site interactivity. Fleshed out in Task 22.
```

- [ ] **Step 6.3: View in a browser**

Run: `python3 -m http.server 8000`

Open `http://localhost:8000/` and verify:
- The page loads without console errors.
- The wordmark "Blue Ridge Gold Wings" appears top-left.
- A nav (or hamburger button at narrow widths) appears top-right.
- The H1 tagline renders in the serif font (may render in Georgia fallback if Fraunces is still loading; reload after 1 second to confirm Fraunces).
- The footer appears at the bottom with the wordmark, copyright, and nav.
- Resize the window to ~500px wide; the nav collapses to a "Menu" button (clicking it does nothing yet; that comes in Task 22).

Stop the server (Ctrl-C) when done.

- [ ] **Step 6.4: Commit**

```bash
git add index.html assets/js/main.js
git commit -m "feat: scaffold index.html with header, footer, and hero placeholder"
```

---

## Task 7: Build the hero section

**Files:**
- Modify: `index.html` (replace hero placeholder)
- Modify: `assets/css/main.css` (append hero rules)

- [ ] **Step 7.1: Replace hero markup in `index.html`**

Find the hero placeholder in `index.html` and replace it with:

```html
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
        <h1>Navy Trained.<br>Airline Experienced.<br>On Your Flight Deck.</h1>
        <p class="hero__sub">Contract pilot services for aircraft owners across the Mid-Atlantic.</p>
      </div>
      <a class="hero__scroll" href="#opening" aria-label="Scroll to next section">&#x25BC;</a>
    </section>
```

- [ ] **Step 7.2: Append hero CSS to `assets/css/main.css`**

```css
/* ---------- 9. Hero ---------- */
.hero {
  position: relative;
  min-height: 100vh;
  color: var(--c-cream);
  overflow: hidden;
  padding: 0;
  display: flex;
  align-items: flex-end;
}
@media (max-width: 640px) {
  .hero { min-height: 720px; }
}
.hero__image,
.hero__image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0) 40%,
    rgba(20,35,63,0.72) 100%
  );
  z-index: 1;
}
.hero__content {
  position: relative;
  z-index: 2;
  padding-bottom: var(--s-7);
  padding-top: var(--s-7);
  width: 100%;
}
.hero__content .gold-rule { width: 48px; }
.hero__content h1 { color: var(--c-cream); }
.hero__sub {
  font-size: 1.125rem;
  color: rgba(245, 240, 230, 0.88);
  max-width: 540px;
  margin-top: var(--s-3);
}
.hero__scroll {
  position: absolute;
  z-index: 2;
  bottom: var(--s-3);
  left: 50%;
  transform: translateX(-50%);
  color: var(--c-cream);
  font-size: 0.75rem;
  opacity: 0.7;
  transition: opacity 200ms ease;
}
.hero__scroll:hover { opacity: 1; }
```

- [ ] **Step 7.3: Verify in a browser**

Run: `python3 -m http.server 8000`

Open `http://localhost:8000/`:
- The hero photo fills the viewport.
- The tagline renders in cream over the lower-left of the image, with a thin gold rule above it.
- A small chevron sits at the bottom-center.
- The header wordmark and nav remain readable over the photo (the gradient should keep them legible at the top, even though the gradient is bottom-weighted; check both).
- Resize to mobile width; verify the hero is at least 720px tall and the tagline still fits.

Stop the server.

- [ ] **Step 7.4: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: build hero section with full-bleed cockpit photo"
```

---

## Task 8: Opening statement section

**Files:**
- Modify: `index.html` (append section after hero)
- Modify: `assets/css/main.css` (append section rules)

- [ ] **Step 8.1: Append the opening section to `index.html`**

Insert immediately after the closing `</section>` of the hero:

```html
    <section class="opening" id="opening" aria-label="Overview">
      <div class="container">
        <div class="prose" data-fade-up>
          <p>Blue Ridge Gold Wings is a one-pilot contract operation based in Charlottesville, Virginia, serving aircraft owners across the Mid-Atlantic and Central Appalachian corridor. Paul Bushrow flies ferry, contract, and instruction work, drawing on forty-five years that began in Navy carrier aviation and continue today on commercial type ratings.</p>
          <p>The practice is built on availability. There is no commuter leg, no scheduling around a distant home base. When a flight needs a qualified pilot on short notice, the pilot is already in Charlottesville.</p>
        </div>
      </div>
    </section>
```

- [ ] **Step 8.2: Append CSS**

```css
/* ---------- 10. Opening ---------- */
.opening .prose { margin-inline: auto; }
.opening p {
  font-size: 1.125rem;
  line-height: 1.65;
}
.opening p:first-child::first-letter {
  /* Restrained editorial flourish: slightly larger first letter. */
  font-family: var(--f-serif);
  font-weight: 600;
  font-size: 1.4em;
  color: var(--c-navy);
}
```

- [ ] **Step 8.3: Verify**

Reload the browser. Below the hero, the two-paragraph opening reads in centered, narrow column. Both paragraphs visible. First letter of paragraph one slightly enlarged.

- [ ] **Step 8.4: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: add opening statement section"
```

---

## Task 9: Credentials strip

**Files:**
- Modify: `index.html`, `assets/css/main.css`

- [ ] **Step 9.1: Append the credentials strip to `index.html`** (after the opening section)

```html
    <section class="credentials" aria-label="Credentials at a glance">
      <div class="container">
        <ul class="credentials__list" data-fade-up>
          <li>45+ years</li>
          <li>0 incidents</li>
          <li>ATP</li>
          <li>CFI / CFII / CFIG</li>
          <li>Wings of Gold</li>
        </ul>
      </div>
    </section>
```

- [ ] **Step 9.2: Append CSS**

```css
/* ---------- 11. Credentials strip ---------- */
.credentials { padding-block: var(--s-5); border-block: 1px solid rgba(0,0,0,0.08); }
.credentials__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0;
  font-family: var(--f-sans);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--c-mute);
}
.credentials__list li {
  padding: var(--s-2) var(--s-3);
  position: relative;
}
.credentials__list li + li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 1em;
  background: var(--c-gold);
}
```

- [ ] **Step 9.3: Verify**

Reload. The credentials strip appears as a horizontal line of small-caps items with thin gold dividers between them. Resize to narrow widths and confirm the strip wraps gracefully (it may break to two rows; the dividers between rows look fine because each `li`'s `::before` is positioned relative to its own left edge).

- [ ] **Step 9.4: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: add credentials strip"
```

---

## Task 10: Services section, three alternating editorial blocks

**Files:**
- Modify: `index.html`, `assets/css/main.css`

- [ ] **Step 10.1: Append services markup to `index.html`**

```html
    <section class="services" id="services" aria-labelledby="services-heading">
      <div class="container">
        <header class="section-head" data-fade-up>
          <hr class="gold-rule" aria-hidden="true">
          <h2 id="services-heading">Services.</h2>
        </header>

        <article class="service service--right" data-fade-up>
          <div class="service__media">
            <picture>
              <source srcset="assets/images/content/current-commercial-airline-1200.webp" type="image/webp">
              <img src="assets/images/content/current-commercial-airline-1200.jpg"
                   alt="Paul Bushrow standing in front of a regional commercial airliner.">
            </picture>
          </div>
          <div class="service__copy">
            <p class="eyebrow">01 &middot; Ferry &amp; Positioning</p>
            <h3>Get the airplane where it needs to be.</h3>
            <p>For aircraft owners who need a plane somewhere it is not, ferry and positioning flights are the bread and butter of contract piloting. Paul flies single and twin-engine piston, turboprop, and light jet aircraft on positioning legs, repossession deliveries, and pre-purchase movements.</p>
            <p>The schedule is yours. The route, weather call, and operational decisions are made with the experience of a captain who has flown both Naval carrier approaches and regional airline operations across the eastern United States.</p>
          </div>
        </article>

        <article class="service service--left" data-fade-up>
          <div class="service__media">
            <picture>
              <source srcset="assets/images/content/pilatus-1200.webp" type="image/webp">
              <img src="assets/images/content/pilatus-1200.jpg"
                   alt="A Pilatus PC-12 turboprop on a runway with a mountain backdrop.">
            </picture>
          </div>
          <div class="service__copy">
            <p class="eyebrow">02 &middot; Contract Piloting</p>
            <h3>Either seat. Any operation.</h3>
            <p>Owners of high-performance aircraft sometimes want a second qualified pilot in the right seat. Sometimes they want one in the left. Paul is type-rated on the Canadair Regional Jet (CL-65) and the Jetstream 41, with current initial training on the Pilatus PC-12 NG and Legacy. He flies comfortably in either seat and with either an owner-pilot or a fully professional crew.</p>
            <p>For PC-12 owners and operators of light jets and multi-engine piston aircraft, the goal of contract work is the same: a pilot who steps into any cockpit and fits the operation as it already runs.</p>
          </div>
        </article>

        <article class="service service--right" data-fade-up>
          <div class="service__media">
            <picture>
              <source srcset="assets/images/content/glider-cockpit-1200.webp" type="image/webp">
              <img src="assets/images/content/glider-cockpit-1200.jpg"
                   alt="View from inside a glider cockpit during flight.">
            </picture>
          </div>
          <div class="service__copy">
            <p class="eyebrow">03 &middot; Flight Instruction</p>
            <h3>Experience that translates to the syllabus.</h3>
            <p>Forty-five years of flying produces specific opinions. Paul's instruction work focuses on the parts of aviation that experience teaches better than any syllabus: decision-making under fatigue, weather sense in real terrain, the rhythm of a crew that trusts each other.</p>
            <p>Certifications: CFI, CFII, and CFIG. Instruction available for fixed-wing single, fixed-wing multi, instrument, and glider students.</p>
          </div>
        </article>
      </div>
    </section>
```

- [ ] **Step 10.2: Append CSS**

```css
/* ---------- 12. Section head pattern ---------- */
.section-head {
  margin-bottom: var(--s-6);
}
.section-head h2 { margin-bottom: 0; }

/* ---------- 13. Services ---------- */
.services { background: var(--c-cream); }
.service {
  display: grid;
  gap: var(--s-4);
  align-items: center;
  padding-block: var(--s-6);
}
.service + .service { border-top: 1px solid rgba(0,0,0,0.06); }
@media (min-width: 960px) {
  .service { grid-template-columns: 1fr 1fr; gap: var(--s-7); padding-block: var(--s-7); }
  .service--left .service__media { order: 1; }
  .service--left .service__copy  { order: 2; }
  .service--right .service__media { order: 2; }
  .service--right .service__copy  { order: 1; }
}
.service__media img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; }
.service__copy h3 { font-size: 1.875rem; }
.service__copy p { color: var(--c-ink); }
```

- [ ] **Step 10.3: Verify**

Reload. The services section appears with a "Services." header (with gold rule above), then three blocks. On desktop widths, blocks alternate: image right / text left, then text right / image left, then image right / text left. On mobile, all blocks stack with image above copy. Each block has eyebrow, heading, and two paragraphs.

- [ ] **Step 10.4: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: add services section with three alternating editorial blocks"
```

---

## Task 11: About teaser

**Files:**
- Modify: `index.html`, `assets/css/main.css`

- [ ] **Step 11.1: Append about teaser markup**

```html
    <section class="about-teaser" aria-labelledby="about-teaser-heading">
      <div class="container about-teaser__grid">
        <div class="about-teaser__media" data-fade-up>
          <picture>
            <source srcset="assets/images/content/headshot-1200.webp" type="image/webp">
            <img src="assets/images/content/headshot-1200.jpg"
                 alt="Paul Bushrow, contemporary headshot.">
          </picture>
        </div>
        <div class="about-teaser__copy" data-fade-up>
          <hr class="gold-rule" aria-hidden="true">
          <h2 id="about-teaser-heading">About Paul.</h2>
          <p>Paul Bushrow began as a Navy carrier aviator, then flew turboprops and regional jets for PSA Airlines and Atlantic Coast Airlines. He continues to fly today, on contract assignments and instruction work from Charlottesville. Forty-five years in the air, no incidents, no failed checkrides.</p>
          <p><a class="link-gold" href="about.html">Read the full bio &rsaquo;</a></p>
        </div>
      </div>
    </section>
```

- [ ] **Step 11.2: Append CSS**

```css
/* ---------- 14. About teaser ---------- */
.about-teaser { background: var(--c-paper); }
.about-teaser__grid {
  display: grid;
  gap: var(--s-5);
  align-items: center;
}
@media (min-width: 960px) {
  .about-teaser__grid { grid-template-columns: 5fr 7fr; gap: var(--s-7); }
}
.about-teaser__media img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  max-width: 460px;
}
.about-teaser__copy h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); }
```

- [ ] **Step 11.3: Verify**

Reload. About teaser appears with headshot left and copy right at desktop widths, stacked on mobile. The "Read the full bio" link has a gold underline.

- [ ] **Step 11.4: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: add about teaser section"
```

---

## Task 12: Contact section

**Files:**
- Modify: `index.html`, `assets/css/main.css`

- [ ] **Step 12.1: Append contact markup**

```html
    <section class="contact" id="contact" aria-labelledby="contact-heading">
      <div class="container contact__inner" data-fade-up>
        <hr class="gold-rule gold-rule--center" aria-hidden="true">
        <h2 id="contact-heading">Get in touch.</h2>
        <p class="contact__lede">For ferry, contract, or instruction work, reach out directly.</p>
        <p class="contact__email">
          <a href="mailto:paul@blueridgegoldwings.com">paul@blueridgegoldwings.com</a>
        </p>
        <p class="contact__location">Based in Charlottesville, Virginia.</p>
      </div>
    </section>
```

- [ ] **Step 12.2: Append CSS**

```css
/* ---------- 15. Contact ---------- */
.contact {
  background: var(--c-navy);
  color: var(--c-cream);
}
.contact h2 { color: var(--c-cream); }
.contact__inner {
  max-width: 720px;
  margin-inline: auto;
  text-align: center;
}
.contact__lede {
  font-size: 1.0625rem;
  color: rgba(245, 240, 230, 0.85);
  margin-bottom: var(--s-5);
}
.contact__email {
  font-family: var(--f-serif);
  font-size: clamp(1.5rem, 4vw, 2.25rem);
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
```

- [ ] **Step 12.3: Verify**

Reload. Contact section is a deep navy band with cream text. The email link is large, serif, and has a gold underline. Hover state turns the email gold.

- [ ] **Step 12.4: Commit**

```bash
git add index.html assets/css/main.css
git commit -m "feat: add contact section"
```

---

## Task 13: Scaffold `about.html`

**Files:**
- Create: `about.html`

- [ ] **Step 13.1: Write `about.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>About Paul Bushrow. Blue Ridge Gold Wings, LLC.</title>
  <meta name="description" content="Forty-five years in the air. Naval aviator, regional airline pilot, glider rated, now flying contract from Charlottesville, Virginia.">
  <link rel="stylesheet" href="assets/css/main.css">
  <script src="assets/js/main.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header site-header--solid">
    <div class="container">
      <a class="wordmark" href="index.html">Blue Ridge <span class="accent">Gold</span> Wings</a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="site-nav" id="site-nav" aria-label="Primary">
        <a href="about.html" aria-current="page">About</a>
        <a href="index.html#services">Services</a>
        <a href="index.html#contact">Contact</a>
      </nav>
    </div>
  </header>

  <main id="main">
    <!-- Title block, lede, chapters, pull quote, credentials, closing CTA. Fleshed out in Tasks 14-20. -->
  </main>

  <footer class="site-footer">
    <div class="container">
      <div>
        <span class="wordmark">Blue Ridge <span class="accent">Gold</span> Wings</span>
        &nbsp;&middot;&nbsp;
        &copy; 2026 Blue Ridge Gold Wings, LLC.
      </div>
      <nav aria-label="Footer">
        <a href="about.html">About</a>
        <a href="index.html#services">Services</a>
        <a href="index.html#contact">Contact</a>
      </nav>
    </div>
  </footer>
</body>
</html>
```

- [ ] **Step 13.2: Verify**

Open `http://localhost:8000/about.html`. Header (with white background and ink text, since it has the `--solid` modifier), empty main, footer. The nav item "About" has a gold underline because of `aria-current="page"`.

- [ ] **Step 13.3: Commit**

```bash
git add about.html
git commit -m "feat: scaffold about.html with shared header and footer"
```

---

## Task 14: About title block and lede

**Files:**
- Modify: `about.html`, `assets/css/main.css`

- [ ] **Step 14.1: Replace the `<main>` placeholder with title block and lede**

```html
  <main id="main">
    <section class="page-title" aria-labelledby="page-title-heading">
      <div class="container">
        <hr class="gold-rule" aria-hidden="true">
        <h1 id="page-title-heading">About.</h1>
        <p class="page-title__lede">Forty-five years in the air. Naval aviator, regional airline pilot, glider rated, now flying contract from Charlottesville.</p>
      </div>
    </section>

    <section class="lede" aria-label="Introduction">
      <div class="container">
        <div class="prose" data-fade-up>
          <p>Paul Bushrow has flown professionally for more than four decades, beginning as a Naval carrier aviator and continuing through regional airline captaincy, glider rating, and contract work. He flies today from Charlottesville, Virginia, where Blue Ridge Gold Wings serves aircraft owners across the Mid-Atlantic and Central Appalachian region.</p>
          <p>What follows is the long version. The short version is on the home page.</p>
        </div>
      </div>
    </section>
```

(Leave the closing `</main>` tag where it was.)

- [ ] **Step 14.2: Append CSS**

```css
/* ---------- 16. About page: title block and lede ---------- */
.page-title { padding-block: var(--s-6) var(--s-5); }
.page-title h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  margin-bottom: var(--s-3);
}
.page-title__lede {
  font-family: var(--f-serif);
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  color: var(--c-mute);
  max-width: 760px;
  margin: 0;
  font-style: italic;
}
.lede { padding-block: var(--s-5) var(--s-7); }
.lede .prose { margin-inline: auto; }
.lede p { font-size: 1.125rem; line-height: 1.65; }
```

- [ ] **Step 14.3: Verify**

Open `about.html`. Title block shows gold rule, large "About." heading, and italic serif lede line. Below it, two-paragraph lede in narrow column.

- [ ] **Step 14.4: Commit**

```bash
git add about.html assets/css/main.css
git commit -m "feat: build about page title block and lede"
```

---

## Task 15: About chapter 01, Naval Aviator

**Files:**
- Modify: `about.html`, `assets/css/main.css`

- [ ] **Step 15.1: Append chapter markup inside `<main>`** (after the lede section)

```html
    <article class="chapter chapter--right" id="navy" data-fade-up>
      <div class="chapter__media">
        <picture>
          <source srcset="assets/images/content/young-navy-aviator-1200.webp" type="image/webp">
          <img src="assets/images/content/young-navy-aviator-1200.jpg"
               alt="Paul Bushrow as a young Naval aviator in flight gear.">
        </picture>
      </div>
      <div class="chapter__copy">
        <p class="eyebrow">01 &middot; Naval Aviator</p>
        <h2>Wings of Gold.</h2>
        <p>Paul earned his Wings of Gold as a Navy carrier aviator. The carrier landing is unforgiving in a way that civilian flying rarely is, and the habits formed there, the briefing-room discipline and the consideration of every variable before engine start, have carried forward through every cockpit since.</p>
        <p>The Navy years set the tempo. They also set the expectation that a flight should be a known thing rather than an emerging story.</p>
      </div>
    </article>
```

- [ ] **Step 15.2: Append CSS**

```css
/* ---------- 17. About page: chapters ---------- */
.chapter {
  display: grid;
  gap: var(--s-4);
  align-items: center;
  padding-block: var(--s-6);
}
.chapter + .chapter { border-top: 1px solid rgba(0,0,0,0.06); }
@media (min-width: 960px) {
  .chapter {
    grid-template-columns: 1fr 1fr;
    gap: var(--s-7);
    padding-block: var(--s-7);
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
```

- [ ] **Step 15.3: Verify**

Reload `about.html`. Chapter 01 appears with the young Navy photo on the right (desktop), eyebrow + "Wings of Gold." heading + two paragraphs on the left. Stacks on mobile.

- [ ] **Step 15.4: Commit**

```bash
git add about.html assets/css/main.css
git commit -m "feat: add about chapter 01 (Naval Aviator)"
```

---

## Task 16: About chapter 02, The Airlines

**Files:**
- Modify: `about.html`

- [ ] **Step 16.1: Append chapter markup after chapter 01**

```html
    <article class="chapter chapter--left" id="airlines" data-fade-up>
      <div class="chapter__media">
        <picture>
          <source srcset="assets/images/content/young-commercial-wings-1200.webp" type="image/webp">
          <img src="assets/images/content/young-commercial-wings-1200.jpg"
               alt="Paul Bushrow in commercial pilot uniform during his early airline years.">
        </picture>
      </div>
      <div class="chapter__copy">
        <p class="eyebrow">02 &middot; The Airlines</p>
        <h2>Regional captain.</h2>
        <p>After the Navy, Paul flew turboprops and jets for PSA Airlines under the American Eagle banner, and for Atlantic Coast Airlines under the United Express and Delta Connection brands. The aircraft included the Canadair Regional Jet and the Jetstream 41, with type ratings on both.</p>
        <p>Two decades of regional airline operations across the eastern United States added the rhythm of multi-leg days, real-weather decision-making, and crew coordination that shows up in every contract flight he flies now.</p>
      </div>
    </article>
```

- [ ] **Step 16.2: Verify**

Reload. Chapter 02 sits below chapter 01, alternating sides (image left, copy right at desktop). A hairline divider sits between them.

- [ ] **Step 16.3: Commit**

```bash
git add about.html
git commit -m "feat: add about chapter 02 (The Airlines)"
```

---

## Task 17: Pull quote, full-width navy band

**Files:**
- Modify: `about.html`, `assets/css/main.css`

- [ ] **Step 17.1: Append pull-quote markup after chapter 02**

```html
    <aside class="pull-quote" data-fade-up>
      <div class="container pull-quote__inner">
        <hr class="gold-rule gold-rule--center" aria-hidden="true">
        <blockquote>Forty-five years and counting. No incidents. No failed checkrides.</blockquote>
      </div>
    </aside>
```

- [ ] **Step 17.2: Append CSS**

```css
/* ---------- 18. About page: pull quote ---------- */
.pull-quote {
  background: var(--c-navy);
  color: var(--c-cream);
  padding-block: var(--s-7);
}
.pull-quote__inner { text-align: center; max-width: 920px; }
.pull-quote blockquote {
  font-family: var(--f-serif);
  font-weight: 600;
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  line-height: 1.25;
  margin: 0;
  color: var(--c-cream);
  letter-spacing: -0.01em;
}
```

- [ ] **Step 17.3: Verify**

Reload. Between chapters 02 and 03 (when added), a deep navy band appears with the centered serif quote and a gold rule above it.

- [ ] **Step 17.4: Commit**

```bash
git add about.html assets/css/main.css
git commit -m "feat: add about page pull quote"
```

---

## Task 18: About chapter 03, Today

**Files:**
- Modify: `about.html`

- [ ] **Step 18.1: Append chapter markup after the pull quote**

```html
    <article class="chapter chapter--right" id="today" data-fade-up>
      <div class="chapter__media">
        <picture>
          <source srcset="assets/images/content/cockpit-flying-1200.webp" type="image/webp">
          <img src="assets/images/content/cockpit-flying-1200.jpg"
               alt="Paul Bushrow at the controls of an aircraft, in flight.">
        </picture>
      </div>
      <div class="chapter__copy">
        <p class="eyebrow">03 &middot; Today</p>
        <h2>On contract from Charlottesville.</h2>
        <p>Today Paul flies contract assignments out of Charlottesville: ferry and positioning flights, second-pilot work in PC-12s and light jets, and instruction in fixed-wing and glider operations. Recent initial training on the Pilatus PC-12 NG and Legacy keeps him current on the type most common in his client base.</p>
        <p>He flies in either seat. He works with experienced owner-pilots, with new aircraft owners still building hours, and with fully professional crews. The shared goal is always the same: a flight that goes the way it was planned.</p>
      </div>
    </article>
```

- [ ] **Step 18.2: Verify**

Reload. Chapter 03 appears below the pull quote, with the in-flight cockpit photo on the right (desktop) and copy on the left. Layout matches chapters 01 and 02.

- [ ] **Step 18.3: Commit**

```bash
git add about.html
git commit -m "feat: add about chapter 03 (Today)"
```

---

## Task 19: Credentials block

**Files:**
- Modify: `about.html`, `assets/css/main.css`

- [ ] **Step 19.1: Append credentials block after chapter 03**

```html
    <section class="credentials-block" aria-labelledby="credentials-heading">
      <div class="container">
        <hr class="gold-rule" aria-hidden="true">
        <h2 id="credentials-heading" class="credentials-block__heading">Credentials.</h2>
        <dl class="credentials-block__list">
          <div><dt>Ratings</dt> <dd>ATP &middot; CL-65 &middot; BA-4100</dd></div>
          <div><dt>Instruction</dt> <dd>CFI &middot; CFII &middot; CFIG (single, multi, glider)</dd></div>
          <div><dt>Recent training</dt> <dd>Pilatus PC-12 NG initial &middot; Legacy initial</dd></div>
          <div><dt>Medical</dt> <dd>FAA First Class</dd></div>
          <div><dt>Record</dt> <dd>45+ years &middot; 0 incidents &middot; 0 failed checkrides</dd></div>
        </dl>
      </div>
    </section>
```

- [ ] **Step 19.2: Append CSS**

```css
/* ---------- 19. About page: credentials block ---------- */
.credentials-block {
  background: var(--c-paper);
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
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--c-mute);
  margin: 0;
}
.credentials-block__list dd {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--c-ink);
}
```

- [ ] **Step 19.3: Verify**

Reload. Credentials block appears with paper-tone background. Two-column grid at wide widths, single column at narrow. Each row has a small-caps label on the left and the values on the right, separated by middle dots.

- [ ] **Step 19.4: Commit**

```bash
git add about.html assets/css/main.css
git commit -m "feat: add about page credentials block"
```

---

## Task 20: About closing CTA

**Files:**
- Modify: `about.html`

- [ ] **Step 20.1: Append closing CTA after credentials block**

```html
    <section class="contact" aria-labelledby="about-cta-heading">
      <div class="container contact__inner" data-fade-up>
        <hr class="gold-rule gold-rule--center" aria-hidden="true">
        <h2 id="about-cta-heading">Get in touch.</h2>
        <p class="contact__lede">For ferry, contract, or instruction work, reach out directly.</p>
        <p class="contact__email">
          <a href="mailto:paul@blueridgegoldwings.com">paul@blueridgegoldwings.com</a>
        </p>
      </div>
    </section>
```

- [ ] **Step 20.2: Verify**

Reload. Compact contact CTA appears at the bottom of the about page, navy background, same email styling as the home page contact section.

- [ ] **Step 20.3: Commit**

```bash
git add about.html
git commit -m "feat: add about page closing CTA"
```

---

## Task 21: 404 page

**Files:**
- Create: `404.html`
- Modify: `assets/css/main.css` (append minimal 404 styles)

- [ ] **Step 21.1: Write `404.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page not found. Blue Ridge Gold Wings, LLC.</title>
  <meta name="description" content="The page you tried to reach is not here.">
  <link rel="stylesheet" href="/assets/css/main.css">
  <script src="/assets/js/main.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header site-header--solid">
    <div class="container">
      <a class="wordmark" href="/">Blue Ridge <span class="accent">Gold</span> Wings</a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="site-nav">Menu</button>
      <nav class="site-nav" id="site-nav" aria-label="Primary">
        <a href="/about.html">About</a>
        <a href="/index.html#services">Services</a>
        <a href="/index.html#contact">Contact</a>
      </nav>
    </div>
  </header>

  <main id="main" class="error-page">
    <div class="container error-page__inner">
      <hr class="gold-rule" aria-hidden="true">
      <h1>Page not found.</h1>
      <p>The page you tried to reach is not here. The link may be old, or the address may have a typo.</p>
      <p><a class="link-gold" href="/">Return home &rsaquo;</a></p>
    </div>
  </main>

  <footer class="site-footer">
    <div class="container">
      <div>
        <span class="wordmark">Blue Ridge <span class="accent">Gold</span> Wings</span>
        &nbsp;&middot;&nbsp;
        &copy; 2026 Blue Ridge Gold Wings, LLC.
      </div>
      <nav aria-label="Footer">
        <a href="/about.html">About</a>
        <a href="/index.html#services">Services</a>
        <a href="/index.html#contact">Contact</a>
      </nav>
    </div>
  </footer>
</body>
</html>
```

Note: 404.html uses absolute (`/`) paths because GitHub Pages serves it for arbitrary missing routes, and the page should resolve assets from the site root regardless of where the broken request came from. Other pages use document-relative paths so they work under both `username.github.io/<repo>/` and a custom domain. For project-page deployments, the 404 page's `/assets/...` paths will resolve under the project subpath because GitHub Pages serves the 404 from the project's own scope.

- [ ] **Step 21.2: Append CSS**

```css
/* ---------- 20. 404 page ---------- */
.error-page { padding-block: var(--s-7) var(--s-8); }
.error-page__inner { max-width: 640px; margin-inline: auto; text-align: left; }
.error-page h1 { font-size: clamp(2.5rem, 6vw, 4rem); margin-bottom: var(--s-3); }
.error-page p { font-size: 1.0625rem; }
```

- [ ] **Step 21.3: Verify**

Open `http://localhost:8000/404.html` directly. The page renders with the same header and footer as other pages, gold rule, "Page not found." heading, a short message, and a "Return home" link.

- [ ] **Step 21.4: Commit**

```bash
git add 404.html assets/css/main.css
git commit -m "feat: add 404 page"
```

---

## Task 22: JavaScript for mobile nav and fade-in

**Files:**
- Modify: `assets/js/main.js`

- [ ] **Step 22.1: Replace `assets/js/main.js` content**

```js
// Blue Ridge Gold Wings. Site interactivity.
// Two responsibilities: mobile nav toggle, fade-up on scroll.

(function () {
  // --- Mobile nav toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var nav    = document.getElementById('site-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    // Close the mobile nav when a link inside it is clicked.
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
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();
```

- [ ] **Step 22.2: Verify mobile nav**

Run `python3 -m http.server 8000`. Open `http://localhost:8000/`. Resize the window to ~500px wide. Click the "Menu" button:
- The nav drops down with a navy background and shows the three links.
- Clicking the button again closes it.
- Clicking a link closes the nav (but for in-page anchor links, the page also scrolls).

- [ ] **Step 22.3: Verify fade-up**

Reload `http://localhost:8000/`. Scroll down slowly:
- Sections like the opening statement and credentials strip start slightly transparent and fade up to full opacity as they enter view.
- Open DevTools Rendering panel and enable "Emulate CSS media feature prefers-reduced-motion: reduce". Reload. Sections appear immediately, no animation.

- [ ] **Step 22.4: Verify on the about page**

Open `http://localhost:8000/about.html`. Confirm fade-up triggers on each chapter and the pull quote.

- [ ] **Step 22.5: Commit**

```bash
git add assets/js/main.js
git commit -m "feat: add mobile nav toggle and fade-up scroll behavior"
```

---

## Task 23: Accessibility pass

**Files:**
- Possible touches: `index.html`, `about.html`, `404.html`, `assets/css/main.css`

- [ ] **Step 23.1: Run a quick automated audit**

In Chrome DevTools, open `http://localhost:8000/` and run Lighthouse with Accessibility checked. Repeat for `about.html` and `404.html`. Note any failures.

- [ ] **Step 23.2: Verify keyboard navigation**

On each page:
- Press Tab from a fresh page load. The skip link appears. Press Enter; focus jumps to `#main`.
- Continue tabbing. The wordmark, nav items, hero scroll cue, and all body links receive a visible gold focus outline in turn.
- On the contact section, the email link is reachable and shows the focus outline.

- [ ] **Step 23.3: Verify alt text**

Open page source for each HTML file. Confirm every `<img>` has an `alt` attribute. Decorative elements (gold rules, gradient overlay) are either CSS-only or marked `aria-hidden="true"`.

- [ ] **Step 23.4: Verify contrast**

Use Chrome DevTools color picker on:
- Body ink (`#1c1b18`) on cream (`#f5f0e6`): expect AA pass.
- Cream (`#f5f0e6`) on navy (`#14233f`): expect AA pass.
- Mute (`#7d756a`) on cream: expect AA pass for non-body text (the credentials strip and eyebrows are above 14pt bold or 18pt regular thresholds; verify each context).
- Gold (`#b49342`) used as link underline only, not as text on cream; underline does not need to meet text-contrast requirements.

If the mute color fails contrast on cream for a given size, darken the mute token slightly (e.g., to `#665e51`) in `:root` and re-verify.

- [ ] **Step 23.5: Fix any issues found**

For each Lighthouse failure or contrast miss, write the fix in code (do not document it as a TODO). Re-run the verification.

- [ ] **Step 23.6: Commit (only if changes were needed)**

```bash
git add -A
git commit -m "fix: address accessibility findings (focus, contrast, alt text)"
```

If no changes were needed, no commit. Note in the next task's commit message that the accessibility pass was clean.

---

## Task 24: Update README.md and CLAUDE.md to reflect final layout

**Files:**
- Modify: `README.md`, `CLAUDE.md`

- [ ] **Step 24.1: Update README.md repository layout section**

Replace the "Repository layout" section in `README.md` with:

```markdown
## Repository layout

```
blue_ridge_gold_wings/
├── README.md
├── CLAUDE.md
├── .gitignore
├── .nojekyll
├── index.html
├── about.html
├── 404.html
├── assets/
│   ├── css/main.css
│   ├── js/main.js
│   ├── fonts/
│   │   ├── Fraunces-{Regular,SemiBold,Bold}.woff2
│   │   └── Inter-{Regular,Medium,SemiBold}.woff2
│   └── images/
│       ├── hero/
│       └── content/
├── design/
│   ├── 2026-05-03-blue-ridge-gold-wings-design.md
│   └── 2026-05-03-blue-ridge-gold-wings-plan.md
└── scripts/
    └── optimize-images.sh
```

Local-only material, gitignored:

```
_source/
├── images/                         (original full-size photography)
└── reference/
    └── current_wordpress_site.html (preserved WordPress export)
```
```

- [ ] **Step 24.2: Update README.md "Local preview" section**

Replace:

````markdown
## Local preview

Any static-file server works. From the repo root:

```bash
cd website
python3 -m http.server 8000
```
````

With:

````markdown
## Local preview

Any static-file server works. From the repo root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/` in a browser. VS Code's Live Server extension also works against the repo root.
````

- [ ] **Step 24.3: Update README.md "Deployment" section**

Replace the deployment section with:

```markdown
## Deployment

GitHub Pages, deploy from a branch, branch root. The `.nojekyll` file at the root tells Pages to skip Jekyll processing.

To configure: in the repo's GitHub Settings, choose Pages, set Source to "Deploy from a branch," choose `main`, and root (`/`). Pages will publish at `https://<username>.github.io/<repo-name>/`. A custom domain can be added later by creating a `CNAME` file at the root and pointing DNS.
```

- [ ] **Step 24.4: Update README.md "Status" section**

Replace with:

```markdown
## Status

Site is implemented. Ongoing tasks before launch:
- Replace placeholder text wordmark with the final logo asset (planned to be provided by Paul).
- Optional: confirm pull-quote text on the about page.
- Configure GitHub Pages and (optional) custom domain.
```

- [ ] **Step 24.5: Update README.md "Tech stack" section**

Replace with:

```markdown
## Tech stack

- Static HTML, CSS, JS at the repo root. No framework, no bundler, no build step.
- Self-hosted Fraunces and Inter fonts in `assets/fonts/`.
- Images optimized via `scripts/optimize-images.sh` (uses macOS `sips` and `cwebp`).
- Hosted on GitHub Pages, deploy from a branch, branch root.
- No backend. Contact happens via `mailto:` to paul@blueridgegoldwings.com.
```

- [ ] **Step 24.6: Update CLAUDE.md "Working in this repo" section**

Replace with:

```markdown
## Working in this repo

- The site lives at the repo root. Entry points are `index.html`, `about.html`, and `404.html`.
- Stylesheet: `assets/css/main.css`. JS: `assets/js/main.js`. Fonts: `assets/fonts/`. Optimized images: `assets/images/{hero,content}/`.
- Original photography and the WordPress export live in `_source/` (gitignored, local only). Never reference `_source/` paths from served HTML.
- To regenerate optimized images, run `scripts/optimize-images.sh`. Requires macOS (`sips`) and `cwebp` (via `brew install webp`).
- Don't introduce a build step casually. The site is static by design.
- **Logo / wordmark:** placeholder text wordmark in HTML for now. Paul will provide the asset; swap in the `<a class="wordmark">` in `index.html`, `about.html`, and `404.html` (and update the footer wordmark in each), plus add a `<link rel="icon">`.
```

- [ ] **Step 24.7: Run a final em-dash scan**

```bash
grep -rn '—' README.md CLAUDE.md design/ index.html about.html 404.html assets/css/main.css assets/js/main.js scripts/optimize-images.sh
```

Expected: results only inside backticks where the rule defines what is forbidden. Any other hit is a violation that must be fixed before commit.

- [ ] **Step 24.8: Commit**

```bash
git add README.md CLAUDE.md
git commit -m "docs: update README and CLAUDE.md for final repo layout"
```

---

## Task 25: Final verification and GitHub Pages configuration note

**Files:**
- Modify: `README.md` (append a "Going live" subsection)

- [ ] **Step 25.1: Smoke test all pages**

Run `python3 -m http.server 8000`. Visit:
- `http://localhost:8000/` (index)
- `http://localhost:8000/about.html`
- `http://localhost:8000/404.html`

Verify on each:
- All images load (no broken-image icons in DevTools Network panel).
- Console is clean (no errors).
- Fonts render in Fraunces and Inter (DevTools Network shows `.woff2` files loaded with status 200).
- The mobile nav opens and closes at narrow widths.
- All in-page anchors (`#services`, `#contact`) jump to the correct sections from both pages.

- [ ] **Step 25.2: Validate HTML**

Visit `https://validator.w3.org/nu/?doc=` and paste each page's HTML, or use a browser extension. Resolve any errors. Warnings about info-level items can be left if benign.

- [ ] **Step 25.3: Append a "Going live" subsection to README.md**

Append at the end of `README.md`:

```markdown
## Going live (one-time setup)

1. Push the repo to GitHub: `git remote add origin git@github.com:<owner>/blue_ridge_gold_wings.git && git push -u origin main`.
2. In the repo's GitHub Settings → Pages, set Source to "Deploy from a branch," branch `main`, folder `/ (root)`.
3. Wait for the first build to publish (under a minute). The site will be live at `https://<owner>.github.io/blue_ridge_gold_wings/`.
4. To add a custom domain: create a `CNAME` file at the repo root containing the domain, configure DNS per GitHub's docs, and re-verify in Settings → Pages.
```

- [ ] **Step 25.4: Final commit**

```bash
git add README.md
git commit -m "docs: add going-live instructions"
```

- [ ] **Step 25.5: Confirm clean tree**

```bash
git status
git log --oneline
```

Expected: working tree is clean. The log shows the full sequence of feature commits from Task 1 through Task 25.

---

## Self-review checklist (run after the plan is complete)

This is a checklist for the plan author, not the implementer. The plan author runs it once after writing.

- [x] Spec coverage: every section in the design spec maps to at least one task here.
  - Visual system → Task 4 (tokens, fonts, base typography); Task 5 (header/footer)
  - Hero → Task 7
  - Opening statement → Task 8
  - Credentials strip → Task 9
  - Services → Task 10
  - About teaser → Task 11
  - Contact → Task 12
  - About page header/lede → Tasks 13, 14
  - About chapters 01/02/03 → Tasks 15, 16, 18
  - Pull quote → Task 17
  - Credentials block → Task 19
  - About closing CTA → Task 20
  - 404 → Task 21
  - JS (mobile nav, fade-in) → Task 22
  - Accessibility → Task 23
  - Repo layout migration → Task 1
  - Asset prep (fonts, images) → Tasks 2, 3
  - Doc updates and deployment → Tasks 24, 25
- [x] No "TBD" / "TODO" / "implement later" anywhere in task steps.
- [x] Type and class-name consistency: `.service`, `.chapter`, `.pull-quote`, `.contact`, `.gold-rule`, `[data-fade-up]` referenced consistently.
- [x] No em dash characters outside the rule-definition contexts (verified via grep step 24.7).
- [x] Commit messages follow Conventional Commits.
- [x] Each task is independently committable and produces a verifiable change.
