## Site

Personal portfolio at phurushekar.com: plain `index.html` + `style.css`, no build step or dependencies. Fonts come from Google Fonts and icons from Font Awesome on cdnjs. Images and the résumé PDF live in `assets/`; keep `assets/me.jpg` a 750×750 square.

## Branches and releasing

- `gh-pages` is the working branch (and the repo default). Make changes and commits here.
- `master` is what GitHub Pages serves. Release with `git push origin gh-pages:master`; the site updates about a minute later.
- Keep `CNAME` (phurushekar.com) at the root, or the custom domain breaks.
- `_config.yml` keeps `CLAUDE.md`, `README.md` and `docs/` out of the published site.
- Only commit or push when the owner asks.

## Agent skills

### Issue tracker

Issues are tracked as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Domain docs

Single-context: one `CONTEXT.md` plus `docs/adr/` at the repo root. See `docs/agents/domain.md`.
