# Portfolio ideas

What the October 2026 grilling decided for phurushekar.com. Nothing here is built yet.
General rules live in `~/code/design-principles`; exact color and type values live in
`DESIGN.md` next to this file.

| Section | One line |
|---|---|
| Colors | Forest green, orange, gold; light and dark |
| Fonts | Bricolage Grotesque headings, Geist body |
| Page layers | Who I am at a glance, projects to scan, hobbies to explore |
| Projects | Tiles that expand in place, with deep links |
| Explore tabs | Food, Hikes, Photography, Music |
| Analytics and privacy | GoatCounter, no trackers, no consent banner |
| Music pipeline explainer | A private page for me, not part of the site |
| Order of work | What to build first |

## Colors

- Green carries the identity, orange marks the one action, gold is the accent (Q6, Q20).
  Tailwind and Cloudscape palettes were the contrast references.
- Light: cream ground `#fffdf8`, forest field `#173b2a`, headlines `#2f6b4f`.
- Dark (Q40): ground `#0d2419`, surface `#173b2a`, text `#e8f2ec`, mint `#6ee7b7`,
  orange `#e07a2f`, gold `#fbbf24`.
- Medium green next to medium orange vanishes for protanopes, so the two never mean
  different things side by side; full pairs and contrast numbers are in `DESIGN.md` B2.

## Fonts

- Bricolage Grotesque for headings, Geist for body (Q23, Q33). Geist Mono was dropped.
- Before switching from the current DM fonts, check Geist's "Il1 0O" on the real page.

## Page layers

- **Glance:** name, role, résumé button, email/GitHub/LinkedIn, theme toggle.
- **Scan:** journey, projects (Q15), skills, contact.
- **Explore:** hobbies, opt-in, after everything important (Q5).
- Show off the design-principles repo as one of the projects (Q11).

## Projects

- Tiles stay (Q43). Desktop keeps a grid; phones get compact horizontal cards: thumbnail
  left; title, one line and links right.
- A collapsed tile shows title, one line and GitHub/Devpost links, so the link is one tap
  away. Expanding adds the longer story and screenshots (Q41, Q47).
- Each tile has an anchor: `phurushekar.com/#hark` opens with that tile expanded.

## Explore tabs

Four tabs, the open one in the URL (`#explore/hikes`) (Q48).

- **Food:** map + list of favorite restaurants in places I've been, plus a link to my Beli
  profile (`pshek`).
- **Hikes:** same map + list component, my completed hikes with a short review and photo.
  AllTrails has no API, so both tabs read a hand-written `places.json`.
- **Photography:** a grid of compressed photos that load as you scroll.
- **Music:** "last played" at the top, fetched from Last.fm only when the tab opens, then my
  top 5 for the month from `music.json`, which a daily GitHub Action builds (Q44). Keep
  scrobbling to Last.fm so there's data by the time this gets built.

## Analytics and privacy

Moved here from the general principles: these are this site's choices.

- GoatCounter (Q38, Q45): no cookies, no IP storage, nothing personal, so no consent banner.
- Count features, never people: page views, outbound clicks (résumé, GitHub, LinkedIn,
  email), Explore tab opens, project expands, theme toggles. Event names in `DESIGN.md` B9.
- No third-party trackers. Maps and other embeds load only when someone opens them, and
  the Last.fm call happens only inside the Music tab (Q37, Q48).
- Load the script async; the site works the same when it's blocked.

## Music pipeline explainer

A single HTML page that explains how the daily GitHub Action pulls from Last.fm, writes
`music.json`, and how the site reads it (Q35). It's for me, so I understand the pipeline
well enough to talk about it. It isn't linked from the site: keep it in `docs/`, which
`_config.yml` already leaves out of the published site.

## Order of work

From Q46:

1. Rebuild the site: fonts, colors and dark mode, layers, project tiles, GoatCounter.
2. Then the Explore tabs, the music pipeline and its explainer page.

Each is its own session; nothing gets committed or pushed without my OK.
