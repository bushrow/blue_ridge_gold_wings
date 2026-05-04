# Blue Ridge Gold Wings, LLC. Website Design Spec

**Status:** Approved design, ready for implementation planning.
**Date:** 2026-05-03
**Author:** Charlie Bushrow (with Claude)

## 1. Overview

A static marketing website for **Blue Ridge Gold Wings, LLC**, a private contract pilot service operated by Paul Bushrow out of Charlottesville, Virginia. The site replaces an existing WordPress site (preserved locally as reference, not committed) with a hand-built, statically hosted version on GitHub Pages.

### 1.1 Audience

Aircraft owners across the Mid-Atlantic and Central Appalachian corridor. They are typically experienced, often senior, and accustomed to evaluating professional services for themselves. The site is a peer-to-peer offer, not a sales page.

### 1.2 Goals

The site signals prestige and seniority without feeling stiff or overproduced. It conveys:

- The pilot's experience (45+ years, Navy carrier aviator, regional airline captain, glider pilot, contract instructor).
- Authentic warmth that reflects the pilot's personality. Approachable, not aloof.
- Restrained pride in Navy heritage. Honored through a single gold accent and the "Wings of Gold" lineage in the name. Never costume.
- Modern feel, but warmer than SaaS minimalism. Editorial pacing.

### 1.3 Aesthetic direction

A combination of Rolex (luxury, restrained typography, generous whitespace, photography given room) and the U.S. Navy's contemporary visual identity (deep navy, gold accents, confident declarative type). Surprisingly modern in both cases.

## 2. Information Architecture

Two primary pages, plus a 404:

1. `index.html` (home). Full single-scroll experience covering hero, intro, credentials, services, about teaser, and contact.
2. `about.html` (deep bio). Long-form editorial profile of Paul's career, with period photography and a credentials block.
3. `404.html` (auxiliary). Minimal "Page not found" with the same header and footer.

The hybrid pattern (one focused home plus one deep about) lets the home stay tight while giving the biographical material the editorial space it deserves.

### 2.1 Navigation behavior

The top-bar nav appears on every page with three items: `About`, `Services`, `Contact`.

- **From `index.html`:** `About` links to `about.html`; `Services` and `Contact` are anchor jumps to the on-page sections (`#services`, `#contact`).
- **From `about.html` and `404.html`:** `About` links to `about.html` (or stays as the current page indicator on the about page itself); `Services` and `Contact` link to home-page anchors (`index.html#services`, `index.html#contact`).
- The footer nav follows the same rules.

## 3. Visual System

### 3.1 Color tokens

| Role | Hex | Use |
| --- | --- | --- |
| Navy (primary) | `#14233f` | Dark sections, primary headings on cream, primary text-link color |
| Gold (accent) | `#b49342` | Hairline rules, link underlines, the wordmark accent. Used sparingly. Never as a button fill. |
| Cream (background) | `#f5f0e6` | Default page background |
| Paper (alt background) | `#fbf8f1` | Slightly lighter for nested cards or quote panels |
| Ink (body text) | `#1c1b18` | Warm near-black. Better on cream than pure black. |
| Mute | `#7d756a` | Captions, metadata, secondary text, hairline dividers |
| White | `#ffffff` | Used only for text on navy sections |

These are starting tokens. They may be tuned during implementation, but should stay in this neighborhood.

### 3.2 Typography

- **Headings:** Fraunces. A contemporary serif with confident weight and a slight modernist edge. Used at weights 600 and 700. Distinctive without being decorative.
- **Body and UI:** Inter. Clean humanist sans, neutral, highly readable. Weights 400, 500, 600.
- Both fonts self-hosted as `.woff2` files.
- Fallback stack: `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` (for Inter) and `Georgia, "Iowan Old Style", serif` (for Fraunces).
- `font-display: swap` so text renders in fallbacks while custom fonts load.

### 3.3 Type scale

| Role | Size | Notes |
| --- | --- | --- |
| Hero headline | `clamp(3rem, 7vw, 5.5rem)` | Fraunces 700, tight line-height (1.05) |
| Section heading | `clamp(2rem, 4vw, 3.25rem)` | Fraunces 600, line-height 1.15 |
| Subheading | `1.5rem` | Fraunces 600 |
| Eyebrow / small caps | `0.8125rem` | Inter 600, letter-spaced 0.08em, all caps |
| Body | `1.0625rem` | Inter 400, line-height 1.6 |
| Caption | `0.875rem` | Inter 400, mute color |

### 3.4 Spacing

8px base. Token scale: 8, 16, 24, 32, 48, 64, 96, 128.

- Section vertical padding: `96px` mobile, `128px` desktop.
- Max content width: `1180px` for full-width sections; long-form text capped at `680px` for readability.

### 3.5 Treatment principles

- **Photography:** color preserved, no filters, no heavy shadows. Crops chosen for breathing room around the subject.
- **Gold rule:** 1px hairline, 32 to 48px wide, sits *above* major headings as an editorial accent. Not below, not full-width.
- **No card shadows, no glows, no UI gradients.** The only gradient permitted is a soft dark vignette on the lower portion of the hero photo, only as needed for tagline legibility.
- **Motion:** subtle fade-up on scroll (approximately 500ms ease-out, 16 to 24px translate). No parallax, no scroll-triggered counters, no autoplay video.
- **Borders and dividers:** 1px hairlines in mute color, or hairline-thin gold for accents.
- **Focus styles:** visible, gold underline (or 2px gold outline on non-text focusables).

## 4. Home page (`index.html`)

Single-scroll, top to bottom.

### 4.1 Hero, full-bleed cinematic

- **Background image:** `assets/images/hero/blue-ridge-cockpit-1920.webp` (with JPG fallback and 960w mobile variant).
- **Viewport:** `100vh` on desktop, capped at approximately `720px` on mobile so the rest of the page is hinted on short screens.
- **Vignette:** soft dark gradient on the lower third only, for legibility. Image colors preserved elsewhere.
- **Top bar (sticky after scroll):**
  - Wordmark left. Text-only placeholder until logo arrives.
  - Nav right: `About`, `Services`, `Contact`. Inline links on desktop, collapses to a hamburger under 640px.
- **Tagline block, lower-left aligned:**
  - 32px gold hairline.
  - Headline (Fraunces, large): *Navy Trained. Airline Experienced. On Your Flight Deck.*
  - Single supporting line (Inter): describes the offering and geography in one sentence.
- **Scroll cue:** small chevron or hairline at bottom-center.

### 4.2 Opening statement

- Single column, narrow (`max-width: 680px`), centered horizontally.
- Generous top and bottom padding.
- Two short editorial paragraphs framing what the practice is, who it serves, and why being already in Charlottesville matters.
- No image. Type breathing on cream.
- Copy drawn from the WordPress source's intro, restructured to match the voice rules in section 8.

### 4.3 Credentials strip

- One horizontal line of skim-friendly proof points separated by hairline gold dividers.
- Items: `45+ years`, `0 incidents`, `ATP`, `CFI / CFII / CFIG`, `Wings of Gold`.
- Inter, small caps, mute color, very restrained.
- Wraps to two rows on mobile.

### 4.4 Services, three alternating editorial blocks

| # | Service | Image (content path) | Side |
| --- | --- | --- | --- |
| 01 | Ferry & Positioning | `assets/images/content/current-commercial-airline-1200.webp` | image right |
| 02 | Contract Piloting | `assets/images/content/pilatus-1200.webp` | image left |
| 03 | Flight Instruction | `assets/images/content/glider-cockpit-1200.webp` | image right |

Each block:
- Gold hairline plus eyebrow (`01 / 02 / 03`).
- Service name in Fraunces.
- Two to three editorial paragraphs of copy drawn from the WordPress source.
- No "Learn more" button. The copy is the offer.

### 4.5 About teaser

- Two-column block on desktop, stacked on mobile.
- Headshot left (`assets/images/content/headshot-1200.webp`).
- One short bio paragraph right, then a single link: *Read the full bio*, gold underline, navy text, pointing to `about.html`.

### 4.6 Contact

- Centered. Dark navy (`#14233f`) background section. Cream text.
- Hairline gold rule above the heading.
- Heading (Fraunces): *Get in touch.*
- One short supporting line: framing for ferry, contract, or instruction work.
- Email set large as the primary affordance. `mailto:` link, gold underline on hover. **paul@blueridgegoldwings.com**.
- Below the email, a small line: *Based in Charlottesville, Virginia.*
- No form. No phone. No social links.

### 4.7 Footer

- Cream background, hairline divider above.
- Left: wordmark plus `© 2026 Blue Ridge Gold Wings, LLC.`
- Right: simple inline links (`About`, `Services`, `Contact`).

## 5. About page (`about.html`)

Editorial deep-dive. Same visual system as home, same header and footer components.

### 5.1 Header block

- Same top bar component as home.
- No full-bleed hero. Slim title block instead.
- Page title block contents:
  - 32px gold hairline.
  - *About* in Fraunces.
  - One-line lede in Inter beneath, summarizing 45+ years across Navy, airlines, glider, and contract piloting.

### 5.2 Lede

Single narrow column. Two short paragraphs introducing Paul Bushrow as he is today, then handing off to the chronological story.

### 5.3 Chapter 01, Naval Aviator

- Lead image: `assets/images/content/young-navy-aviator-1200.webp` (full width, large).
- Eyebrow: `01 · Naval Aviator` (middle dot separator, consistent with other chapters).
- Heading in Fraunces.
- Two to three editorial paragraphs covering the Navy years and the Wings of Gold designation.
- Optional secondary inset image (`young-by-plane-helmet-1200.webp` or `young-by-plane-ladder-1200.webp`), smaller, with a thin caption.

### 5.4 Chapter 02, The Airlines

- Lead image: `assets/images/content/young-commercial-wings-1200.webp`, on the opposite side from Chapter 01.
- Eyebrow: `02 · The Airlines`.
- Two to three paragraphs covering PSA Airlines (American Eagle), Atlantic Coast Airlines (United Express and Delta Connection), turboprop and regional jet experience, and the type ratings earned (CL-65, BA-4100).
- Optional secondary inset (`young-by-plane-1200.webp`).

### 5.5 Pull quote, full-width navy band

- Single sentence between Chapters 02 and 03.
- Set large in Fraunces on a deep navy background, cream text.
- 32px gold hairline above the quote.
- Placeholder content for now: "Forty-five years and counting. No incidents. No failed checkrides." (Final wording to be selected from Paul's own words during implementation if available, otherwise this placeholder stands.)

### 5.6 Chapter 03, Today

- Lead image: `assets/images/content/cockpit-flying-1200.webp`.
- Eyebrow: `03 · Today`.
- Two to three paragraphs covering current contract work, recent PC-12 NG and Legacy initial training, the glider rating, the CFI / CFII / CFIG instruction work, and comfort in either seat.
- Optional secondary inset: `glider-cockpit-1200.webp` (same image used on home, smaller crop here is acceptable; or use a different existing image).

### 5.7 Credentials block

- Background shifts from cream to paper (`#fbf8f1`) for visual separation.
- Two-column list, all small caps Inter, neatly aligned. Categories and items:
  - **Ratings:** ATP, CL-65, BA-4100
  - **Instruction:** CFI, CFII, CFIG (single, multi, glider)
  - **Recent training:** PC-12 NG initial, Legacy initial
  - **Medical:** FAA First Class
  - **Record:** 45+ years, 0 incidents, 0 failed checkrides
- This is the only place on the site where the formal facts appear in full list form. Everywhere else they are woven into prose.

### 5.8 Closing CTA

- Compact version of the home contact section. Same dark navy treatment.
- Short paragraph plus the email link.

### 5.9 Footer

Same component as home.

## 6. Repository layout

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
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── main.js
│   ├── fonts/
│   │   ├── Fraunces-Regular.woff2
│   │   ├── Fraunces-SemiBold.woff2
│   │   ├── Fraunces-Bold.woff2
│   │   ├── Inter-Regular.woff2
│   │   ├── Inter-Medium.woff2
│   │   └── Inter-SemiBold.woff2
│   └── images/
│       ├── hero/
│       │   ├── blue-ridge-cockpit-1920.webp
│       │   ├── blue-ridge-cockpit-1920.jpg
│       │   └── blue-ridge-cockpit-960.webp
│       └── content/
│           ├── headshot-1200.webp
│           ├── current-commercial-airline-1200.webp
│           ├── pilatus-1200.webp
│           ├── glider-cockpit-1200.webp
│           ├── young-navy-aviator-1200.webp
│           ├── young-commercial-wings-1200.webp
│           ├── young-by-plane-1200.webp
│           ├── young-by-plane-helmet-1200.webp
│           ├── young-by-plane-ladder-1200.webp
│           ├── cockpit-flying-1200.webp
│           └── cockpit-right-seat-1200.webp
└── design/
    └── 2026-05-03-blue-ridge-gold-wings-design.md
```

### 6.1 Local-only material (gitignored)

The following directory exists on disk during development but is excluded from version control:

```
_source/
├── images/                         ← original full-size photography
└── reference/
    └── current_wordpress_site.html
```

`_source/images/` is the working directory the optimization step reads from. `_source/reference/` holds the WordPress export referenced for content during development.

### 6.2 `.gitignore` content (planned)

```
.DS_Store
_source/
```

### 6.3 Notes

- All asset paths in HTML are document-relative (`assets/css/main.css`), so the site works under both `username.github.io/blue_ridge_gold_wings/` and a custom domain.
- Each WebP-optimized image has a JPG fallback served via `<picture>`. Hero gets two widths (1920 and 960); content images use a single 1200w master.

## 7. Technical approach

### 7.1 Fonts

Self-hosted `.woff2` files in `assets/fonts/`, declared via `@font-face` with `font-display: swap`. No Google Fonts CDN. Reasons:

- Faster load (no third-party DNS).
- Better privacy posture.
- Reliable rendering (no upstream availability risk).

### 7.2 Image optimization

One-time manual pre-processing (no build step in this phase). For each image used on the site:

- Convert to WebP at approximately 80% quality.
- Generate a JPG fallback at the same dimensions.
- Hero gets two widths (1920 and 960) for `srcset`. Content images use a single 1200w master.
- Filenames are kebab-case with a width suffix.

Tooling: `cwebp` plus `sips` (macOS native). A short shell script in the repo will document the steps so the optimization is reproducible by anyone with access to the originals.

### 7.3 CSS

- Single `assets/css/main.css` file.
- Organization: tokens (custom properties) at top, then reset, then typography, then layout primitives, then components, then page-specific overrides at bottom.
- All color and spacing values exposed as CSS custom properties so the palette can be tuned in one place.
- Mobile-first authoring. Breakpoints at `640px`, `960px`, `1180px`.
- Modern features used freely: custom properties, `clamp()`, grid, flexbox, `:has()` where useful.

### 7.4 JavaScript

Vanilla JS, no framework, no bundler. Two responsibilities:

1. Mobile nav toggle (approximately 10 lines).
2. `IntersectionObserver` adding an `is-visible` class to elements with a `data-fade-up` attribute (approximately 15 lines).

If `prefers-reduced-motion: reduce`, the observer is skipped and elements are visible immediately.

Single `assets/js/main.js` file, loaded with `defer`.

### 7.5 Accessibility

- Semantic structure: `<header>`, `<nav>`, `<main>`, `<section>` with `aria-labelledby`, `<article>` for chapters, `<footer>`.
- Skip-to-content link as the first focusable element.
- Visible gold focus styles on all interactive elements.
- Substantive `alt` text on every image (descriptive, not "image of pilot"). Decorative images (the hero gradient, divider rules) marked `alt=""`.
- Color contrast: ink-on-cream and cream-on-navy both meet WCAG AA at body sizes.
- All motion respects `prefers-reduced-motion`.

### 7.6 Deployment

- GitHub Pages. "Deploy from a branch", branch root.
- `.nojekyll` file at the root tells Pages not to run Jekyll.
- A future custom domain (if added) requires a `CNAME` file at the root and a DNS record. Out of scope for this phase.

### 7.7 Out of scope (until requested)

- Analytics, cookie banners, GDPR notices.
- Blog or CMS functionality.
- Booking or scheduling integrations.
- Multi-language support.
- Service worker, PWA features.
- `sitemap.xml`, `robots.txt`, structured data markup.
- Favicon and `apple-touch-icon` (placeholder until logo arrives).
- Contact form. Contact is `mailto:` only.

## 8. Writing style rules (binding for all site copy and project docs)

### 8.1 Never use the em dash character (`—`, U+2014)

Restructure the sentence using a period, comma, colon, semicolon, or parentheses. En dashes (`–`) and hyphens (`-`) in their normal roles are fine. This applies to site copy, headings, captions, alt text, commit messages, code comments, and project documentation.

### 8.2 Voice: confident, experienced, authentic

Avoid:

- Pleading or "small" framing. No apologetic hedging, no "I'd love the chance to," no asking for consideration.
- Sales bravado or superlatives. No "world-class," "the best," "trusted partner," "premier."
- Cheesy aviation tropes. No "soar above the clouds," "your journey begins here," "passion for flight."
- Cockiness or self-aggrandizement.

Default to declarative sentences. Specifics beat adjectives. The reader is a peer.

## 9. Implementation sequence (preview)

To be expanded into a full plan by the writing-plans skill. Outline:

1. Restructure repo: create new directories, move source images and reference HTML to `_source/`, add `.gitignore` and `.nojekyll`.
2. Optimize images from `_source/images/` into `assets/images/{hero,content}/`.
3. Self-host Fraunces and Inter `.woff2` files in `assets/fonts/`.
4. Author `assets/css/main.css` with tokens, reset, typography, and layout primitives.
5. Build the home page (`index.html`) section by section, drafting copy as each section is built.
6. Build the about page (`about.html`).
7. Build `404.html`.
8. Author `assets/js/main.js` for mobile nav and fade-in.
9. Accessibility pass and contrast verification.
10. Update `README.md` and `CLAUDE.md` to reflect the final layout.
11. Configure GitHub Pages.
12. Final review against this spec.

## 10. Open questions deferred to implementation

- Final pull-quote text for the about page (section 5.5). Placeholder stands until Paul provides a preferred line.
- Final logo. Placeholder text wordmark used until Paul provides the asset.
- Whether to introduce a build script for image optimization. Manual is fine for now; a script can be added if the originals change frequently.
