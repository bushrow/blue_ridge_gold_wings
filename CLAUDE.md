# CLAUDE.md

Guidance for Claude when working in this repository.

## What this project is

A static marketing website for **Blue Ridge Gold Wings, LLC**. The business is a one-person contract pilot service run by Paul Bushrow, a former Navy carrier aviator turned regional airline pilot, based in Charlottesville, Virginia. The site replaces an existing WordPress site (preserved in `reference_code/`) with a hand-built static site hosted on GitHub Pages.

See [README.md](README.md) for the full business background, services, and credentials.

## Hosting constraint: GitHub Pages

Output must be plain static files. That means:

- No server-side rendering, no PHP, no databases, no WordPress runtime.
- No required build step. A build step is acceptable if it emits static files (and the emitted files are what GitHub Pages serves), but don't introduce one casually. A single `index.html` plus a CSS file is a perfectly valid endpoint.
- Forms, if any, go to `mailto:paul@blueridgegoldwings.com` or a third-party form service. No backend code.
- Asset paths must be relative or root-relative so the site works under both `username.github.io/blue_ridge_gold_wings/` and a custom domain.

## Writing style

Two rules apply to every piece of written content in this project: site copy, headings, captions, alt text, commit messages, spec documents, code comments, and any prose Claude writes in this repo.

### 1. Never use the em dash character (`—`)

This is non-negotiable. The U+2014 em dash is banned outright.

Restructure the sentence instead. A period, comma, colon, semicolon, or parentheses can do the work, depending on what the dash was meant to convey. Reaching for an em dash is a signal that the sentence needs rewriting. En dashes (`–`) and hyphens (`-`) are fine in their normal roles (ranges, compound modifiers, list separators).

### 2. Voice: confident, experienced, authentic

The site reads like a peer-to-peer offer from an experienced aviator, not a brochure and not a humble pitch.

Avoid:
- Pleading or small framing. No "I'd love the chance to," no apologetic hedging, no asking permission to be considered.
- Sales bravado or superlatives. No "world-class," "the best," "second to none," "trusted partner," "premier."
- Cheesy aviation tropes. No "soar above the clouds," no "your journey begins here," no "passion for flight."
- Cockiness or self-aggrandizement. The credentials carry the weight. The prose stays plain.

Default to declarative sentences. Specifics beat adjectives. The reader is a peer.

## Voice, tone, and design intent

The audience is aircraft owners. They are experienced, often senior, and frequently decision-makers in their own right. The site is a peer-to-peer offer of service, not a sales pitch.

**Aim for:**
- Clean lines, generous whitespace, clear typographic hierarchy.
- Restrained pride in Navy heritage. The "Gold Wings" name is the lineage; honor it through a single gold accent, not eagles, stars, or Top Gun bravado.
- Modern but warmer than SaaS-minimalist. Editorial, not template.
- Confident understatement. The credentials speak for themselves; the copy does not need to oversell.

**Avoid:**
- Generic "AI-built website" aesthetic. No centered hero text on a gradient, no three-column feature grid with emoji-style icons.
- Stock photography. The `images/` directory has plenty of authentic material.
- Heavy parallax, scroll-jacking, hero video autoplay, or other gimmicks. Senior clientele should feel respected, not flashed.
- Military costume. No flag overlays, no stenciled-camo fonts, no callsign-style headings.
- Aggressive minimalism that strips warmth and personality.

## Brand reference (starting palette)

These values are starting points, not constraints. Refine as design develops, but stay in this neighborhood:

| Token | Value | Use |
| --- | --- | --- |
| Primary (deep) | `#28334d` | Slate blue, evokes uniform navy |
| Accent (gold) | `#b49342` | Wings of Gold reference; use sparingly |
| Neutral text | `#262626` | Body copy |
| Muted | `#a3a3a3` | Secondary text, dividers |
| Background | `#ffffff` | Default |

The current site uses system fonts. The redesign should pick a deliberate type pairing: a refined serif for headings and a clean humanist sans for body. Make the choice visible in the design rather than defaulting to the system stack.

**Tagline (do not paraphrase casually):** *Navy Trained. Airline Experienced. On Your Flight Deck.*

## Content source of truth

`reference_code/current_wordpress_site.html` is the canonical source for **copy**: bio, services descriptions, tagline, contact info. Pull content from there. Don't invent credentials, hours, ratings, or service-area claims. If something needs to change, ask before rewriting.

The reference file is *not* a design template. The new site is a redesign.

## Working in this repo

- The new site lives in `website/`. Start there.
- Source images are in `images/`, including the hero background `Blue-ridge-from-the-cockpit.png`.
- Don't modify files in `reference_code/`. That directory is a frozen snapshot.
- Optimize images before referencing them in HTML. Several originals in `images/` are multi-megabyte (the hero PNG is ~1.7 MB; the commercial-airline shot is ~5.5 MB). Serve appropriately sized derivatives.
- **Logo / wordmark:** no final asset yet. Paul will provide one later in development. Use a clear, obviously temporary placeholder (a simple text wordmark or a labeled `<!-- LOGO PLACEHOLDER -->` block) so it is easy to swap in.

## Contact

The only contact channel on the site is **email: paul@blueridgegoldwings.com**. Do not add phone numbers, mailing addresses, or hours. There are none. This is intentional and final.

## Things to confirm with the user, not assume

- Testimonials. None exist in the current site. Do not generate placeholder quotes.
- Final color and typography choices. The values above are a starting palette, not approved brand standards.

## Out of scope (until asked)

- Analytics, cookie banners, GDPR notices.
- Blog / CMS functionality.
- Booking or scheduling integrations.
- Multi-language support.
