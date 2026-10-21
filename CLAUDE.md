## Site

Personal portfolio at phurushekar.com: plain `index.html` + `style.css` + `script.js`, no build step or dependencies. `script.js` draws the hero's ASCII mountain from `assets/mtnpix.jpg` (a 960px copy of `mtnpix.png`) on a canvas (needs an http server locally; `file://` falls back to a generated ridge) and handles the theme toggle, the project index (`/#slug` opens one), the Explore tabs, scroll entrances and GoatCounter events. The Explore tabs read hand-edited `food.json` and `hikes.json` (format and how to add entries: `docs/explore-content.md`; a push with invalid JSON fails the Data workflow) and a `music.json` that a daily Action builds from Last.fm (`docs/music-pipeline.html`). Fonts (Bricolage Grotesque, Geist) come from Google Fonts; there is no icon font. Images and the résumé PDF live in `assets/`; keep `assets/me.jpg` a 750×750 square, with a 560×560 `assets/me.webp` copy that browsers load first.

## Design rules

UI work follows `~/code/design-principles` (start at its `SKILL.md`). This site's design language is `docs/DESIGN.md`.

## Branches and releasing

- `gh-pages` is the working branch (and the repo default). Make changes and commits here.
- `master` is what GitHub Pages serves. Release with `git push origin gh-pages:master`; the site updates about a minute later.
- Keep `CNAME` (phurushekar.com) at the root, or the custom domain breaks.
- `_config.yml` keeps `CLAUDE.md`, `README.md` and `docs/` out of the published site.
- Only commit or push when the owner asks.

