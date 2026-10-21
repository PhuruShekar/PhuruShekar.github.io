# Portfolio design guide

Research notes and rules for phurushekar.com. Compiled October 2026 from the award-winning sites, the most-visited sites, luxury brand sites, the personal sites Phuru picked as references, and what we learned building the current redesign. The five samples in [`docs/samples/`](samples/) are built from this guide.

---

## 1. What we looked at

### Award winners (the "wow" end)

| Site | Why it matters | What it does |
|---|---|---|
| **Lando Norris** (landonorris.com, OFF+BRAND), Awwwards Site of the Year 2025 | The current benchmark for a personal site | A portrait sits on a faint **topographic contour-line** background. Rows of huge type mix serif and sans and slide behind the photo. A handwritten **signature draws itself** as you scroll. There is one loud accent (lime) on a dark olive base, and the UI chrome is tiny and pushed to the corners ("Store" pill, menu button, next-race badge). |
| **Messenger** (messenger.abeto.co), Awwwards Developer Site of the Year 2025 | Shows that play is a valid goal | An illustrated 3D world you enter with one "Begin" button. It's a game, not a document. |
| **By-Kin, Iventions, Mat Voyce, Uncommon Studio, Minh Pham** (a 2026 Awwwards juror's top-10 write-up) | What jurors reward | Editorial type, weighted smooth scroll, pages that feel like one continuous surface, kinetic type that stretches and recombines on scroll without blocking reading, grids that break on purpose, and 3D that *frames* the work instead of burying it. |
| **The Cosmic Stage, San Rita, Koto** (2026 roundups) | Recurring themes | Horizontal scroll used for storytelling, white space used "as a breath", and oversized brand type. |

**What jurors say they judge** (from the same juror's write-up):
1. **Art direction**: a point of view that still works with the animation turned off.
2. **Directed motion**: choreographed, never decoration for its own sake.
3. **Performance**: smooth on mid-range hardware, fast first paint.
4. **Accessibility**: a real `prefers-reduced-motion` path.

### Most-visited sites (the usability end)

Google, YouTube, Facebook, Instagram, ChatGPT, Reddit, Wikipedia, X, WhatsApp and TikTok lead 2026 traffic (Similarweb/Semrush via Wikipedia and others). None of them are "beautiful" in the award sense. They win on:
- **One obvious primary action per screen** (search box, play, compose).
- **Instant feedback**: everything responds in under 100 ms, with skeletons instead of spinners.
- **Familiar placement**: logo top-left, nav top, account top-right. People don't have to learn your site.
- **Readable defaults**: 16 px+ body text, high contrast, system-like spacing.
- **Mobile first**: most of their traffic is phones.

Lesson: the wow goes in the **hero and transitions**. Everything after that should work like Google: fast, obvious, readable.

### Luxury sites (the "expensive" feel)

Bottega Veneta, Hermès and Aesop (visited directly), plus research on 81 luxury homepages (Emerald, *IJRDM*):
- **Darker or more restrained backgrounds, full-screen stage imagery, a horizontal nav, and far fewer elements** than normal sites. These four traits are what made people read a homepage as "luxury" in that study.
- **Achromatic UI chrome**: Bottega Veneta keeps the interface black, graphite and white and lets the photography carry the color. The wordmark is small, top-left.
- **Off-grid layouts and slow entrance animations** (Hermès), with crisp subject and soft background in photography.
- **Serif display type at huge sizes, tiny uppercase labels with wide letter-spacing, generous margins.**
- **Anti-pattern seen live**: both Aesop and Bottega Veneta opened behind a **country-selector modal and a cookie banner**. Before anything else, the first impression was a form. Never gate a portfolio.

### Phuru's references

| Site | Takeaway |
|---|---|
| **aidanjs.com** | A playful illustrated hero with eyes that track the cursor and the owner's photo inside one pupil. Personality beats polish. |
| **theodore.net** | A dark base, a hand-drawn face logo, mono labels, numbered nav (01 Home…), a "More Work –" marquee, and content that fades in. |
| **andrew.net** | One giant ampersand drawn in ASCII characters, almost no other UI. A single strong idea. |
| Friends' sites linked from aidanjs (kognise.dev, lev.la, huxley.sh, nilsand.re…) | Small personal sites with one signature interaction each. |

---

## 2. Principles

1. **One signature idea, executed perfectly.** Lando has the contour lines and signature, Andrew the ASCII ampersand, Aidan the eyes. Pick one hero moment and make everything else quieter.
2. **Personal, not generic.** The idea should come from *your* life: the mountain photo, photography, food rating, IoT devices, Rutgers, AWS consoles. A WebGL blob says nothing about you; an ASCII rendering of your own mountain does.
3. **The page has to work with motion turned off.** Type, layout and color must carry it alone. Motion is the second layer.
4. **Restraint = luxury.** Fewer elements, more space, one accent color, small chrome. If in doubt, remove it.
5. **Big type, small labels.** Display serif at 100–200 px set against 11–13 px mono uppercase labels. That contrast in scale is most of the "designed" look.
6. **Directed motion.** Every animation either reveals content, shows a relationship (timeline filling, path climbing), or responds to the user. Nothing loops forever without a way to stop it.
7. **Fast and boring underneath.** Plain HTML/CSS/JS, no framework, images sized correctly, and the hero paints before fonts and scripts finish.
8. **No gates.** No modals, splash screens or "click to enter" (Messenger gets away with it because it *is* a game).

---

## 3. The house style (keep across every variant)

### Color: the existing palette

| Token | Hex | Use |
|---|---|---|
| `--green-dark` | `#173b2a` | Dark stage backgrounds, hero |
| `--green` | `#2f6b4f` | Headings and secondary surfaces |
| `--orange` | `#e07a2f` | **The one accent.** Fills, lines, large text, focus rings |
| `--orange-ink` | `#b25a17` | Orange for *any text* on light backgrounds (4.7:1) |
| `--peach` | `#ffc89a` | Accent on dark green (8.3:1) |
| `--cream` | `#fffdf8` | Light background |
| `--mint` | `#e8f2ec` | Body text on dark green |
| `--ink` / `--muted` | `#1d2621` / `#5c6a62` | Body text on light backgrounds |
| `--deep` | `#0d2419` | Text *on* orange fills (5.45:1) |

Contrast rules we measured during the a11y pass:
- `#e07a2f` on cream is **2.95:1**. That fails even the 3:1 large-text bar, so on light backgrounds **all** orange text, including giant headings, uses `--orange-ink`. Keep `--orange` for fills, lines and decoration there.
- `#e07a2f` on `--green-dark` is **4.13:1**: fine for large text (the hero "Shekar"), but use `--peach` for small text on dark green.
- White on orange is **3.0:1**, so text on orange buttons uses `--deep`.
- Peach on `--green` is **4.19:1**, so peach on mid-green needs large text only.

### Type
- **Display:** DM Serif Display, italic for the accent word (*Shekar*, *chat?*).
- **Body:** DM Sans 400/500/700.
- **Labels, dates, numbers:** DM Mono, uppercase, 0.08–0.12em tracking.
- Scale: hero 64–200 px `clamp()`, section titles 44–96 px, body 16–19 px, labels 11–13 px.

### Layout
- Content max width around 920 px, while hero, marquee and full-bleed moments run edge to edge.
- Numbered sections (`01 — The path so far`), carried over from theodore.net.
- Fixed, small top nav that turns into a frosted cream bar once you scroll past the hero.
- Mobile layout at 375 px with a 16 px gutter and no horizontal scroll.

### Motion
- Ease `cubic-bezier(.2,.7,.2,1)`, 0.6–0.9 s for reveals, staggered 80 ms.
- Respect `prefers-reduced-motion` by disabling transforms and loops and showing everything.
- Anything that moves for more than 5 s gets a pause control (WCAG 2.2.2), or stops by itself.
- Only animate `transform` and `opacity`. Pause canvases when they're off-screen or idle.

---

## 4. Accessibility and web standards checklist

From the a11y pass on the current site (axe-core, WCAG 2.2 AA + best practices: 0 violations):

- [ ] `lang`, `<meta viewport>` without zoom locks, `<title>`, `meta description`, `canonical`.
- [ ] Landmarks: `header` / `nav[aria-label]` / `main` / `footer`, with all content inside one.
- [ ] One `h1`, then `h2` per section and `h3` per item. Eyebrow labels go *outside* the heading, so the heading reads "Journey", not "01 — The path so far Journey".
- [ ] Skip link to the main content. `scroll-padding-top` so a fixed header doesn't cover focused elements (WCAG 2.4.11).
- [ ] `:focus-visible` outline on everything focusable, including buttons on orange (use `--deep`).
- [ ] Icon-only links have `aria-label`, and icon `<i>` elements are `aria-hidden="true"`.
- [ ] Decorative canvases, marquees and duplicated text are `aria-hidden`.
- [ ] `target="_blank"` links carry `aria-describedby` pointing to a hidden "Opens in a new tab" note. `mailto:` links never open a new tab.
- [ ] Text contrast is 4.5:1 for normal and 3:1 for large text. See the palette rules above.
- [ ] Touch targets are at least 24 px (we use 44 px for social icons).
- [ ] Reduced-motion path and a pause toggle (remembered in `localStorage` inside `try/catch`).
- [ ] CDN assets: pin exact versions and add SRI `integrity` + `crossorigin` where the CDN supports it (cdnjs does, Google Fonts doesn't).
- [ ] Open Graph: `og:title`, `og:description`, `og:image`, `og:image:alt`, `og:site_name`, `twitter:card`.
- [ ] Print stylesheet that shows content hidden behind scroll reveals.
- [ ] Works without JS: `.js` class gates the hidden-until-revealed states.

Nice-to-haves not done yet: `robots.txt`, `sitemap.xml`, a custom `404.html`, `apple-touch-icon`, W3C validator pass, and a real screen-reader run-through (NVDA/VoiceOver).

---

## 5. Ideas bank

Ideas that fit Phuru specifically, ranked roughly by wow per effort:

1. **ASCII mountain** (shipped): `mtnpix.png` redrawn as glyphs, stirred by the cursor.
2. **Topographic contour lines** (Lando): generated contours of the mountain behind the hero. The lines bend away from the cursor.
3. **Climb the mountain on scroll**: an SVG trail path that draws as you scroll, with career milestones as elevation markers and "summit" at AWS.
4. **IoT console as a portfolio**: the site *is* a mock AWS IoT-style console. Devices = projects, MQTT test client = contact form, shadow document = résumé JSON.
5. **Command palette (⌘K)**: a keyboard-first terminal for developers. Type `projects`, `resume` or `email`.
6. **Bento grid "about me" dashboard**: live local time, "currently" cards, a photo tile, a food-rating card with stars, skills meter.
7. **Food rating cards**: a "Rating food" hobby as a playful scored card (8.7/10 with a short line).
8. **Photography strip**: a horizontal-scroll film strip of Phuru's photos (needs real photos added to `assets/`).
9. **Cursor-follow project previews**: an index list of projects with an image or ASCII thumbnail floating near the cursor on hover (Obys / editorial studios).
10. **Kinetic name**: letters of PHURU that stretch with scroll velocity (Mat Voyce).
11. **Signature draw**: an SVG handwritten "Phuru" that draws itself (Lando).
12. **Eyes that follow the cursor in the PS logo** (Aidan).

---

## 6. The five samples

Each one is a single self-contained `index.html` in [`docs/samples/`](samples/). All five use the house palette and type, share the same content, and follow the checklist above. Each is built around a different signature idea:

| # | Name | Signature idea | Draws from |
|---|---|---|---|
| 1 | **Editorial** | Luxury restraint: cream, huge serif, numbered index of projects with a cursor-following preview | Hermès, Bottega Veneta, Obys, By-Kin |
| 2 | **Terminal** | Dark green console with a working ⌘K command palette and typed boot sequence | theodore.net, andrew.net, developer sites |
| 3 | **Bento** | "About me" dashboard of tiles: live clock, currently-building, food rating, skills, photo | Apple, Linear, most-visited-site clarity |
| 4 | **Summit** | Contour-line hero + a trail that climbs the mountain as you scroll through the journey | Lando Norris, The Cosmic Stage, the mountain photo |
| 5 | **Kinetic** | Giant name that reacts to scroll speed and the cursor, marquee rows of huge mixed type | Mat Voyce, Lando's type rows, Koto |

Preview locally from the repo root with any static server, then open `/docs/archive/samples/<name>/`. `docs/` is excluded from the published site by `_config.yml`, so the samples won't go live by accident.

---

## Sources

- [Awwwards Annual Awards winners](https://www.awwwards.com/annual-awards/winners)
- [Awwwards Sites of the Year](https://www.awwwards.com/websites/sites_of_the_year/)
- [10 Best Award-Winning Websites of 2026 (Judged by a Juror), hontran.dev](https://www.hontran.dev/blog/best-award-winning-websites-2026)
- [59 Award-Winning Best Website Designs in 2026, Spinx Digital](https://www.spinxdigital.com/blog/best-website-design/)
- [15 Award-Winning Best Website Designs to Inspire Your 2026, The Source](https://thesource.com/2026/04/03/best-website-designs-2026/)
- [Best Website Designs of 2026, DesignRush](https://www.designrush.com/best-designs/websites)
- [List of most-visited websites, Wikipedia](https://en.wikipedia.org/wiki/List_of_most-visited_websites)
- [Top 100 Most Visited Websites (2026), WSCubeTech](https://www.wscubetech.com/blog/most-visited-websites/)
- [Luxury web atmospherics: an examination of homepage design, IJRDM](https://www.emerald.com/insight/content/doi/10.1108/IJRDM-01-2013-0013/full/html)
- [The Best Luxury Websites for Design Inspiration, KIJO](https://kijo.london/blog/luxury-website-design-examples-to-inspire)
- [Bottega Veneta design system notes, shadcn.io](https://www.shadcn.io/design/bottega-veneta/raw)
- Visited directly: landonorris.com, messenger.abeto.co, aesop.com, bottegaveneta.com, aidanjs.com/about, theodore.net, andrew.net
