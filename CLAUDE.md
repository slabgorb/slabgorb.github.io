# CLAUDE.md - slabgorb.github.io

This file provides guidance to Claude Code when working on this project.

## Project Overview

Keith Avery's personal art & AI portfolio site, served at **slabgorb.com**. It
is a Jekyll static site (digital artwork galleries plus writing on multi-agent
AI systems built on Claude). The built site is served from a Cloudflare R2
bucket by an edge Worker — GitHub Pages is no longer the serving path.

**Type:** Static site (Jekyll) + Cloudflare Worker
**Site engine:** Jekyll via the `github-pages` gem, `jekyll-theme-midnight`
**Ruby:** 3.3 (Homebrew `ruby@3.3`) — system 2.6 is too old, 4.x too new
**Hosting:** Cloudflare Worker serving `_site` from R2 bucket `slabgorb`

## Repository Structure

```
slabgorb.github.io/
├── *.markdown            # Numbered content pages (01_index, 02_wmata, ...)
├── _config.yml           # Jekyll site config
├── _includes/            # Jekyll partials
├── _sass/                # Stylesheets
├── _site/                # Built output (generated — do not edit by hand)
├── assets/               # Images and static assets
├── 404.html
├── Gemfile / Gemfile.lock
├── worker/index.js       # Cloudflare Worker (serves _site from R2)
├── wrangler.toml         # Worker + R2 + routes config
├── deploy.sh             # Build → upload to R2 → wrangler deploy
├── justfile              # Task runner (imports .pennyfarthing/justfile.pf)
├── .claude/              # Claude Code configuration
└── .pennyfarthing/       # Pennyfarthing framework
```

Content pages are ordered by their numeric filename prefix (`01_`, `02_`, …),
which drives navigation ordering.

## Build & Deploy Commands

```bash
bundle exec jekyll build           # Build the site into _site/
bundle exec jekyll serve           # Local dev server with live reload
./deploy.sh                        # Production: build → upload _site to R2 → deploy Worker
```

`deploy.sh` pins Homebrew Ruby 3.3, builds with `JEKYLL_ENV=production`,
uploads every file under `_site/` to the `slabgorb` R2 bucket in parallel
(`PARALLEL=8` default), then runs `wrangler deploy`. It authenticates via the
`wrangler login` OAuth session and unsets `CLOUDFLARE_API_TOKEN` so a partial
token can't shadow OAuth.

## Cloudflare Worker

`worker/index.js` serves objects from the R2 bucket bound as `env.BUCKET`,
setting Content-Type on serve. `wrangler.toml` routes the apex `slabgorb.com`
and `www.slabgorb.com` (both custom domains on the Cloudflare zone). The Worker
only needs redeploying when `worker/index.js` or `wrangler.toml` change, but
`deploy.sh` redeploys every time (harmless).

## Git Workflow

- **Feature branches:** `feat/{description}`
- **Bug fixes:** `fix/{description}`
- **PRs target:** `main` (no `develop` branch)
- `_site/` is build output; prefer not to commit hand edits there.

## Developer Guidance

### Getting Started

- Run `/pf-help` for context-aware help on any command or agent
- Run `/pf-sprint status` to see current sprint progress
- Run `/pf-sprint work` to pick up your next story

### Daily Workflow

1. `/sm` — Start or resume a story (Scrum Master handles setup)
2. Agent handoffs guide you through the workflow automatically
3. `/reviewer` — Code review when implementation is complete
4. `/sm` — Finish the story (archive, merge, Jira update)

### Key Commands

| Command | Purpose |
|---------|---------|
| `/pf-help` | Context-aware help |
| `/pf-sprint backlog` | See available work |
| `/pf-sprint work STORY` | Start a specific story |
| `/pf-theme show` | See your current persona theme |
| `/pf-workflow` | Check active workflow status |

## Important Notes

- This is a **single repo** despite the presence of `.session/` — there is no
  orchestrator/subrepo pattern.
- Use Homebrew **Ruby 3.3** for any Jekyll work; other versions break the GH
  Pages gem set or the midnight theme.
- The `slabgorb.com` zone must exist on the Cloudflare account for the custom
  domain routes to resolve.
- `CNAME` was removed deliberately — serving moved off GitHub Pages to the
  Cloudflare Worker + R2 path.
