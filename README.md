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

- Static HTML, CSS, JS at the repo root. No framework, no bundler, no build step.
- Self-hosted Fraunces and Inter fonts in `assets/fonts/`.
- Images optimized via `scripts/optimize-images.sh` (uses macOS `sips` and `cwebp`).
- Hosted on GitHub Pages, deploy from a branch, branch root.
- No backend. Contact happens via `mailto:` to paul@blueridgegoldwings.com.

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

Local-only material (gitignored, kept on disk for re-running the optimization step):

```
_source/
├── images/                         (original full-size photography)
└── reference/
    └── current_wordpress_site.html (preserved WordPress export)
```

## Local preview

Any static-file server works. From the repo root:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/` in a browser. VS Code's Live Server extension also works against the repo root.

## Deployment

GitHub Pages, deploy from a branch, branch root. The `.nojekyll` file at the root tells Pages to skip Jekyll processing.

To configure: in the repo's GitHub Settings, choose Pages, set Source to "Deploy from a branch," choose `main`, and root (`/`). Pages will publish at `https://<username>.github.io/<repo-name>/`. A custom domain can be added later by creating a `CNAME` file at the root and pointing DNS.

## Status

Site is implemented. Ongoing tasks before launch:
- Replace placeholder text wordmark with the final logo asset (planned to be provided by Paul).
- Optional: confirm pull-quote text on the about page.
- Configure GitHub Pages and (optional) custom domain.

## Going live (one-time setup)

1. Push the repo to GitHub: `git remote add origin git@github.com:<owner>/blue_ridge_gold_wings.git && git push -u origin main`.
2. In the repo's GitHub Settings, Pages, set Source to "Deploy from a branch," branch `main`, folder `/ (root)`.
3. Wait for the first build to publish (under a minute). The site will be live at `https://<owner>.github.io/blue_ridge_gold_wings/`.
4. To add a custom domain: create a `CNAME` file at the repo root containing the domain, configure DNS per GitHub's docs, and re-verify in Settings, Pages.
