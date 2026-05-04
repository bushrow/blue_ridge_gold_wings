# Blue Ridge Gold Wings, LLC. Website

Marketing site for Blue Ridge Gold Wings, LLC, a private contract pilot service operated by Paul Bushrow out of Charlottesville, Virginia. Replaces the current WordPress site with a hand-built, statically hosted version on GitHub Pages.

## About the business

Paul is a former U.S. Navy carrier aviator (Wings of Gold) who went on to fly regionally for PSA Airlines (American Eagle) and Atlantic Coast Airlines (United Express / Delta Connection), and is also rated as a glider pilot. He now offers contract pilot services to aircraft owners in the Mid-Atlantic and Central Appalachian corridor.

**Tagline:** *Navy Trained. Airline Experienced. On Your Flight Deck.*

**Services:**
- Ferry and positioning flights
- Flight instruction (CFI / CFII / CFIG, single, multi, glider)
- Contract piloting (Pilatus PC-12, light jets, multi-engine piston)

**Credentials highlighted on the site:**
- 45+ years of flying with no incidents and no failed checkrides
- ATP with CL-65 (Canadair Regional Jet) and BA-4100 (Jetstream 41) type ratings
- CFI, CFII, CFIG
- FAA First Class Medical
- Recent PC-12 NG and Legacy initial training

**Service area:** Within roughly a two-hour drive of Charlottesville, VA, covering the Mid-Atlantic and Central Appalachian region.

**Contact:** paul@blueridgegoldwings.com

## Project goals

The site should signal prestige and seniority without feeling stiff or overproduced. The audience is aircraft owners. They are typically experienced, often senior, and decision-makers in their own businesses. The tone needs to read as a peer-to-peer offer of service, not a sales page.

Design priorities:
- Clean lines and clear typographic hierarchy
- Restrained, tasteful nods to Navy heritage (gold accent, "Wings of Gold" lineage), proud and never costume-y
- Modern feel, but warmer than pure-minimalist SaaS aesthetics
- High attention to detail in spacing, alignment, image treatment, and copy

## Tech stack

- **Static HTML / CSS / JS.** No framework required. GitHub Pages serves the files as-is.
- No build step assumed at this stage. If one is added later (Eleventy, Astro, etc.), it must produce a plain static output compatible with GitHub Pages.
- No backend. Contact happens via `mailto:` to paul@blueridgegoldwings.com.

## Repository layout

```
blue_ridge_gold_wings/
├── README.md              ← this file
├── CLAUDE.md              ← guidance for Claude when working in this repo
├── images/                ← source photography (see inventory below)
├── reference_code/        ← exported HTML of the current WordPress site
└── website/               ← the new static site (currently empty)
```

### `images/` inventory

| File | Subject |
| --- | --- |
| `Blue-ridge-from-the-cockpit.png` | Aerial Blue Ridge view from the cockpit. Hero background. |
| `headshot_smiling.jpeg` | Paul, contemporary headshot |
| `cockpit_flying.jpeg` | Paul flying, cockpit view |
| `cockpit_right_seat.jpeg` | Paul in the right seat |
| `current_commercial_airline.png` | Paul with current commercial airline aircraft |
| `glider_cockpit.jpeg` | Glider cockpit shot |
| `pilatus-with-australia-background.jpg` | Pilatus PC-12 with scenic backdrop |
| `young_by_plane.jpeg` | Early-career, by aircraft |
| `young_by_plane_on_ladder.jpeg` | Early-career, on ladder |
| `young_by_plane_with_flight_helmet.jpeg` | Early-career, with flight helmet |
| `young_commercial_wings.jpeg` | Early commercial-pilot wings photo |
| `young_navy_aviator_suite.jpg` | Young Paul in Navy aviator gear |

The early-career imagery is a meaningful asset. It lets the bio span "then and now" without leaning on stock photography.

### `reference_code/`

`current_wordpress_site.html` is the saved markup from the existing live WordPress site. It is the canonical source of truth for **content** (bio copy, services, tagline, contact). It is *not* a design reference to be copied. The new site is a redesign, not a port.

### `website/`

Target output directory for the new static site. Currently empty. HTML, CSS, and JS go here.

## Local preview

Any static-file server works. From the repo root:

```bash
cd website
python3 -m http.server 8000
# → http://localhost:8000
```

## Deployment

GitHub Pages, served from the `website/` directory (or `docs/`, or a `gh-pages` branch). Final choice TBD when the repo is pushed.

## Status

Greenfield. The `website/` directory is empty. Design and implementation are still to be done.
