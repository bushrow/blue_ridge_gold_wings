# Blue Ridge Gold Wings, LLC. Home Page Redesign Spec

**Status:** Approved design, ready for implementation planning.
**Date:** 2026-05-04
**Author:** Charlie Bushrow (with Claude)
**Supersedes:** `2026-05-03-blue-ridge-gold-wings-design.md` for the home-page section structure, type system, and spacing system. The original spec's information architecture, accessibility requirements, hosting constraints, and writing rules still apply.

## 1. Why redesign

The first build of the home page produced a structurally correct page that did not feel right. Symptoms reported by the owner:

- Too much whitespace; sections feel isolated rather than chaptered.
- The opening statement read as awkward and disconnected from the hero.
- The credentials strip felt out of place wherever it lived.
- A first attempted iteration (combining opening, credentials, and about-teaser into one lead-in block) made the page more confused, not less.

The root cause: the page used the same compositional pattern (two-column image+text grid) for every content block, with generous fixed-pixel padding between every section. Every block looked similar, and the rhythm came from blank space rather than from variation.

This redesign borrows the compositional discipline of `rolex.com/en-us/buying-a-rolex/experiencing-a-rolex`. The Rolex page alternates pure-type articles with photographic moments (full-bleed image, diptyque, image+text), uses viewport-relative vertical spacing, and applies a strict eyebrow-and-heading typographic discipline. It feels calm and confident because each section has one clear job and no two adjacent sections share a treatment.

## 2. Scope

In scope:
- Home page (`index.html`): full restructure of `<main>` content into 11 distinct sections.
- Type system: replace Fraunces with Inter for all uses. Delete Fraunces font files.
- Spacing system: switch vertical rhythm to viewport-relative units.
- About page (`about.html`): type pivot and spacing update only. Section structure preserved.
- 404 page (`404.html`): type pivot only.
- Header: add sticky auto-hide behavior that re-presents on scroll-up.
- CSS rewrite: delete obsolete component rules, add new ones, restructure tokens.

Out of scope (preserved from prior spec):
- Hosting on GitHub Pages, branch root, no build step.
- Writing rules: no em dash, voice is confident and authentic.
- Accessibility requirements: skip link, ARIA labels, focus styles, alt text, prefers-reduced-motion handling.
- The deferred items (final logo asset, optional pull-quote text on about page).

## 3. Type system

One font family. Inter, four weights, self-hosted as `.woff2`. Fraunces is deleted.

| Role | Family | Weight | Size | Other |
| --- | --- | --- | --- | --- |
| Eyebrow | Inter | 600 | `0.8125rem` (13px) | `letter-spacing: 0.14em`, uppercase, no margin-bottom |
| Hero h1 | Inter | 700 | `clamp(2.75rem, 6vw, 4.75rem)` | `line-height: 1.08`, `letter-spacing: -0.015em` |
| Chapter h2 | Inter | 600 | `clamp(2rem, 4vw, 3rem)` | `line-height: 1.15`, `letter-spacing: -0.015em` |
| Sub h3 | Inter | 600 | `1.5rem` | |
| Body | Inter | 400 | `1.0625rem` | `line-height: 1.65` |
| Pull-quote | Inter | 500 | `clamp(1.5rem, 3vw, 2.25rem)` | italic, `line-height: 1.3` |

Token naming in CSS: `--f-sans` retained; `--f-serif` deleted. Inter `.woff2` files retained at three weights (Regular 400, Medium 500, SemiBold 600). Add a fourth weight: Bold 700 for the hero.

Existing files to delete from `assets/fonts/`:
- `Fraunces-Regular.woff2`
- `Fraunces-SemiBold.woff2`
- `Fraunces-Bold.woff2`

Existing files to keep:
- `Inter-Regular.woff2`, `Inter-Medium.woff2`, `Inter-SemiBold.woff2`

New file to acquire:
- `Inter-Bold.woff2` (for the hero h1).

## 4. Spacing system

Vertical rhythm switches to viewport-relative units so the page breathes proportionally at every screen size without breakpoint juggling.

```css
:root {
  --space-xs: 4vh;
  --space-sm: 8vh;
  --space-md: 12vh;
  --space-lg: 16vh;
}
```

These tokens are used for **section-to-section vertical padding only**. Internal component spacing (gaps between text elements, padding inside cards, gutters between grid columns) keeps the existing 8px pixel scale (`--s-1` through `--s-8`).

Default section padding: `padding-block: var(--space-md)` (12vh). The hero is full-viewport (`100vh`); the navy bands use `var(--space-sm)` (8vh) to feel weighty but not bloated.

## 5. Color discipline

Two backgrounds in regular use: cream and navy. Gold reserved for hairline rules, link underlines, and a single accent on the hero eyebrow. The `paper` variant is dropped (it was only used by the now-removed about-teaser).

| Token | Hex | Use |
| --- | --- | --- |
| `--c-navy` | `#14233f` | Full-width chapter bands and contact background |
| `--c-cream` | `#f5f0e6` | Default page background |
| `--c-ink` | `#1c1b18` | Body text on cream |
| `--c-mute` | `#5e574e` | Eyebrow text on cream, captions, hairline dividers (WCAG AA) |
| `--c-gold` | `#b49342` | Hairline rules above headings, link underlines, hero eyebrow accent |
| `--c-white` | `#ffffff` | Text on navy sections |

(`--c-paper` deleted.)

## 6. Compositional rules

Six rules govern every section.

### 6.1 Eyebrow + heading discipline

Every chapter section begins with an eyebrow set tight against the heading below it. They read as one typographic unit.

- Eyebrow: tracked-caps Inter 600, `0.8125rem`, `0.14em` letter-spacing, mute color, `margin: 0`.
- Heading directly below: `margin-top: 0`, the appropriate clamp size from the type table.
- Optional 1px gold rule above the eyebrow, 32px wide.

### 6.2 Alternation

No two adjacent sections share a treatment. The home-page sequence cycles through: pure-type article → photo-led → article → image+text → full-bleed photo → image+text → navy band → article → navy contact. Color rhythm: image, cream, image, cream, cream, image, cream, navy, cream, navy, cream.

### 6.3 Asymmetric grids

Image+text sections use 7/5 or 5/7 column splits at desktop, never 50/50. Asymmetry communicates editorial intent.

### 6.4 Full-bleed gradient seams

Sections that bleed full-width (navy bands, full-bleed photo) extend edge-to-edge. The full-bleed photo section uses top and bottom pseudo-element gradient masks (`mask-image: linear-gradient`) so the photo dissolves into the cream above and below rather than cutting hard.

### 6.5 Diptyque

Two photos at 4:5 portrait, 10px gap, equal width, no captions. Pure visual storytelling. Stacks vertically below 760px.

### 6.6 Pure-type articles between every pair of photo-led sections

The breathing white type is what makes the page feel calm rather than dense. An article is one column at `max-width: 720px`, centered, with: optional eyebrow, a chapter heading, one short paragraph (40-90 words). Optional inline gold-underlined link.

## 7. Home page structure

Eleven sections in `index.html`'s `<main>`:

### 7.1 Hero
- Full-bleed background: `Blue-ridge-from-the-cockpit.png` (existing).
- Min-height: `100vh` desktop; capped at `720px` mobile.
- Dual-gradient overlay (top scrim + bottom darkening) preserved from the prior contrast fix.
- Top bar: wordmark left, nav right (the new sticky behavior described in section 8).
- Tagline composition positioned in the upper-left at approximately 40vh from top:
  - 1px gold rule (32px wide).
  - Eyebrow: `CONTRACT PILOT · CHARLOTTESVILLE, VA`.
  - Heading h1: `Navy Trained.` `Airline Experienced.` `On Your Flight Deck.` (three lines).
  - One supporting line in Inter 400 cream: `Ferry, contract, and instruction across the Mid-Atlantic.`
- Subtle scroll cue (chevron) at bottom-center.

### 7.2 Article 01: Introduction
- Background: cream. Padding-block: `var(--space-md)` (12vh).
- Centered narrow column, `max-width: 720px`.
- 1px gold rule (32px wide), centered.
- Eyebrow: `01 · INTRODUCTION`.
- Heading h2: `One pilot. Already in Charlottesville.`
- One paragraph: 40-70 words covering what the practice is, who it serves, and why "already here" matters. Drawn from existing copy, restructured for brevity.

### 7.3 Diptyque
- Background: cream. Padding-block: `var(--space-sm)` (8vh).
- Two `<figure>` elements side-by-side, each 50% width, 10px column gap.
- Aspect ratio: 4:5 each.
- Pairing (then and now): `young-navy-aviator-1200` (left) + `current-commercial-airline-1200` (right). The visual story without words.
- No captions.
- Stacks vertically below 760px with 16px gap.

### 7.4 Article 02: Services intro
- Background: cream. Padding-block: `var(--space-md)`.
- Centered narrow column.
- Eyebrow: `02 · SERVICES`.
- Heading h2: `Three kinds of work.`
- One paragraph: 30-60 words framing the three offerings.

### 7.5 Service 01: Ferry & Positioning
- Background: cream. Padding-block: `var(--space-sm)`.
- Asymmetric grid: image right (7 columns), text left (5 columns) at desktop. Stacks at narrow widths with image above.
- Image: `current-commercial-airline-1200`, aspect ratio 4:3, full column width, no max-width constraint inside its column.
- Text column: eyebrow `01 · FERRY & POSITIONING`, heading h3 `Get the airplane where it needs to be.`, two paragraphs from existing copy.

### 7.6 Service 02: Contract Piloting (full-bleed photo with overlay)
- Background: cream container, but the photo bleeds full-viewport-width via the pseudo-element technique we've used.
- Image: `pilatus-1200`, full-width, aspect ratio 16:10 (constrained via `aspect-ratio: 16 / 10` on the picture element). Top and bottom gradient masks fade the photo into the cream above and below.
- Text overlay: lower-left of the image, on a subtle dark-gradient scrim. Eyebrow `02 · CONTRACT PILOTING`, heading h3 `Either seat. Any operation.`, one paragraph from existing copy (the second paragraph from the current service block, condensed to fit comfortably as overlay copy).
- The overlay text uses cream color. Maximum width 540px.

### 7.7 Service 03: Flight Instruction
- Background: cream. Padding-block: `var(--space-sm)`.
- Asymmetric grid mirrored: image left (7 columns), text right (5 columns) at desktop.
- Image: `glider-cockpit-1200`, aspect ratio 4:3.
- Text column: eyebrow `03 · FLIGHT INSTRUCTION`, heading h3 `Experience that translates to the syllabus.`, two paragraphs from existing copy.

### 7.8 Navy band: Proof
- Full-bleed navy background (`#14233f`). Padding-block: `var(--space-sm)`.
- Centered, `max-width: 920px`.
- 1px gold rule (32px wide), centered.
- Eyebrow: `THE RECORD`, cream-on-navy with lower opacity.
- One single declarative line, large, all weight on the message: `45+ years. 0 incidents. 0 failed checkrides.`. Inter 600, `clamp(1.875rem, 4vw, 3rem)`, `line-height: 1.2`. Cream color.
- A second small line beneath with the formal credentials in compact form: `ATP · CL-65 · BA-4100 · CFI · CFII · CFIG · Wings of Gold`. Inter 500, `0.9375rem`, mute-on-navy color.

### 7.9 Article 03: More about Paul
- Background: cream. Padding-block: `var(--space-md)`.
- Centered narrow column.
- Eyebrow: `03 · ABOUT`.
- Heading h2: `More about Paul.`
- One paragraph: 50-80 words bridging from the proof statement to the about page.
- Inline gold-underlined link: `Read the full bio →`, pointing to `about.html`.

### 7.10 Contact
- Full-bleed navy. Padding-block: `var(--space-md)`.
- Centered, `max-width: 720px`.
- 1px gold rule (32px wide), centered.
- Heading h2: `Get in touch.`
- One supporting line: `For ferry, contract, or instruction work, reach out directly.`
- Email link: large Inter 500, gold underline. `mailto:paul@blueridgegoldwings.com`.
- Below: `Based in Charlottesville, Virginia.` in muted-on-navy.

### 7.11 Footer
- Same structure as today. Cream background, hairline divider above. Wordmark, copyright, inline links.

## 8. Sticky auto-hide header

A Headroom-style header that re-presents on scroll-up.

### 8.1 States

| State class | When applied | Behavior |
| --- | --- | --- |
| (none) | Top of page, hero visible | Header sits over the photo as in the current build. `position: absolute`, transparent, cream text. |
| `is-fixed` | After scrolling past 80% of hero height | `position: fixed; top: 0`, solid cream background, ink-colored text, 1px hairline divider below. |
| `is-fixed is-hidden` | Scrolling DOWN while in `is-fixed` | `transform: translateY(-100%)`. Header slides out of view. |

When the user scrolls UP while in `is-fixed`, the `is-hidden` class is removed and the header slides back into view.

When the user scrolls back to within 80% of hero height, `is-fixed` is removed and the header returns to its in-flow over-photo state.

### 8.2 Transitions

`transition: transform 240ms ease`. On `prefers-reduced-motion: reduce`, transition is set to `none` so the header snaps in and out instantly.

### 8.3 JS implementation

Add to `assets/js/main.js`:

- Cache the header element and the hero's bottom offset on load and on resize.
- Scroll listener uses `requestAnimationFrame` to throttle.
- Track `lastScrollY`. On each scroll:
  - If `scrollY < heroBottom * 0.8`: remove `is-fixed`, remove `is-hidden`.
  - Else: add `is-fixed`. Compare `scrollY` vs `lastScrollY`:
    - Down by ≥6px: add `is-hidden`.
    - Up by ≥6px: remove `is-hidden`.
  - Update `lastScrollY` only on direction change beyond the threshold to avoid jitter.

Estimated additional code: ~25 lines.

## 9. About page changes

- Type pivot: every Fraunces declaration in CSS becomes Inter. Heading rules updated to use the new type table from section 3.
- Spacing: chapter padding-block uses `var(--space-md)` (12vh) at desktop, `var(--space-sm)` (8vh) at mobile. Pull-quote band keeps `var(--space-md)`.
- Pull-quote text becomes Inter 500 italic, large size from the type table.
- Structure (page title, lede, three chapters, pull-quote, credentials block, closing CTA) preserved.

## 10. 404 page changes

- Type pivot only. No structural change.

## 11. CSS file restructure

`assets/css/main.css` undergoes substantial change. Sections to delete entirely:

- `.opening` (deleted in the prior iteration; verify gone).
- `.credentials` strip.
- `.about-teaser`.
- `.lead-in`, `.lead-in__*`.
- `.service`, `.service--left`, `.service--right`, `.service--navy` (replaced with new variants).
- `.section-head` (the old pattern is replaced by the new eyebrow + heading discipline).
- All `@font-face` declarations for Fraunces.
- `--f-serif` token.
- `--c-paper` token.

Sections to add:

- New tokens: `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`.
- New `Inter-Bold.woff2` `@font-face` declaration.
- `.eyebrow` updated rule (tracked caps, no margin-bottom, used universally).
- `.article` component (centered narrow column, padding-block, gold rule).
- `.diptyque` component.
- `.service` rebuilt: variants `.service--asymm-right`, `.service--asymm-left`, `.service--full-bleed` (with overlay child `.service__overlay`).
- `.band--navy` component (full-bleed navy band).
- `.site-header.is-fixed` and `.site-header.is-hidden` rules.

Existing rules retained without major change:

- Token layer (palette, internal pixel scale).
- Reset, base typography (with type sizes updated).
- `.container`, `.prose` layout primitives.
- `.gold-rule`, `.link-gold`, `.skip-link`, `:focus-visible`, `[data-fade-up]`, `prefers-reduced-motion` handling.
- `.site-header`, `.site-header--solid`, `.site-nav`, `.nav-toggle`, `.wordmark` (with the new fixed/hidden state classes added).
- `.site-footer`.
- `.hero` (with eyebrow added, h1 sizing updated).
- `.contact` (with type updates).
- About-page components (`.page-title`, `.lede`, `.chapter`, `.pull-quote`, `.credentials-block`, `.error-page`).

## 12. JS file changes

`assets/js/main.js` gets one additional responsibility: scroll-direction header. Final size approximately 70 lines. Existing behaviors (mobile nav toggle, fade-up via IntersectionObserver, prefers-reduced-motion handling) preserved.

## 13. Copy

Most existing copy is preserved. New copy needed for the proposed structure:

- Hero supporting line: `Ferry, contract, and instruction across the Mid-Atlantic.` (replaces current `Contract pilot services for aircraft owners across the Mid-Atlantic.` which is similar).
- Article 01 paragraph: a new short positioning statement (40-70 words). Drafted during implementation following the voice rules.
- Article 02 paragraph: a new short services intro (30-60 words). Drafted during implementation.
- Service 02 overlay copy: existing service 02 text, condensed to fit comfortably as overlay copy.
- Navy proof statement: `45+ years. 0 incidents. 0 failed checkrides.` plus the compact credentials line.
- Article 03 paragraph: a new about-teaser bridge (50-80 words). Drafted during implementation.

All other sections (services 01 and 03 body copy, contact section, footer, the about-page chapters) keep their existing copy.

## 14. Acceptance criteria

The redesign is complete when:

- The home page has 11 distinct sections in the order specified in section 7.
- No two adjacent sections share a compositional treatment.
- No Fraunces font files in `assets/fonts/`. CSS uses Inter only.
- All vertical section padding uses the `--space-*` viewport-relative tokens.
- The sticky auto-hide header behaves as specified in section 8 in modern browsers (Chrome, Safari, Firefox latest two versions).
- All accessibility requirements from the prior spec still met (skip link, ARIA, focus styles, alt text, reduced-motion handling).
- Em-dash sweep across the repo returns only the rule-definition references (CLAUDE.md, design docs).
- Pages still resolve cleanly under `bushrow.xyz/blue_ridge_gold_wings/` after deploy.

## 15. Open questions deferred to implementation

- The exact Inter Bold weight file: confirm fontsource provides a `latin-700-normal.woff2` for Inter (it does).
- Final copy for the three new article paragraphs and the article 03 bridge: drafted during implementation, following voice rules in CLAUDE.md.
- Whether the hero scroll cue stays (currently a chevron). Probably yes; minor decision during implementation.
