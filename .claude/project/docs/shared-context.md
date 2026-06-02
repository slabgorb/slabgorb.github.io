# Shared Context — slabgorb.github.io

Loaded by all Pennyfarthing agents. Keep accurate.

## Project

- **Name:** slabgorb.github.io (served at **slabgorb.com**)
- **What:** Keith Avery's personal art & AI portfolio — digital artwork
  galleries and writing on multi-agent AI systems built on Claude.
- **Structure:** Single Git repo (no orchestrator/subrepos)
- **Sprint Status:** `sprint/current-sprint.yaml`
- **Active Work:** `.session/{story-id}-session.md`
- **Agent Framework:** Pennyfarthing (pf CLI)

### Tech Stack

| Component | Language | Framework | Notes |
|-----------|----------|-----------|-------|
| Site | Ruby + Markdown/SCSS | Jekyll (`github-pages`, midnight theme) | Built to `_site/` |
| Worker | JavaScript | Cloudflare Workers | Serves `_site` from R2 bucket `slabgorb` |

### Repo Structure

```
slabgorb.github.io/
├── *.markdown            # Numbered content pages (01_index, 02_wmata, ...)
├── _config.yml           # Jekyll config
├── _includes/  _sass/    # Partials + styles
├── _site/                # Build output (generated)
├── assets/               # Images & static assets
├── worker/index.js       # Cloudflare Worker
├── wrangler.toml         # Worker + R2 + routes
├── deploy.sh             # Build → R2 upload → wrangler deploy
├── justfile              # Task runner (imports .pennyfarthing/justfile.pf)
├── .claude/  .pennyfarthing/
```

## Git Branch Strategy

- **All work:** feature branches
- **Branch from / PRs target:** `main` (no `develop`)
- **Naming:** `feat/{description}` or `fix/{description}`

## Build & Deploy Commands

```bash
bundle exec jekyll build      # Build into _site/
bundle exec jekyll serve      # Local dev server
./deploy.sh                   # Production deploy (build → R2 → Worker)
```

Use Homebrew **Ruby 3.3** for Jekyll work — other versions break the gem set
or the midnight theme. `deploy.sh` authenticates via `wrangler login` OAuth.

## Notes

- Serving moved off GitHub Pages to Cloudflare Worker + R2 (CNAME removed).
- `_site/` is generated output — avoid hand edits there.
