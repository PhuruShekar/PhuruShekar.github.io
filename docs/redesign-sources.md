# Redesign sources (2026-10-20)

What's worth taking from four sites the owner picked, checked against `~/code/design-principles`
(IDs like T2 point there) and `DESIGN.md` (B-IDs). Nothing here is built yet.

| Source | What it is | License |
|---|---|---|
| ui.watermelon.sh | ~850 React/Tailwind/Motion components, blocks, dashboards; dark, neon-green, mono | MIT |
| manus.im | AI product site; warm off-white, Libre Baskerville serif headings, very sparse | n/a (a product site, ideas only) |
| cult-ui.com | ~150 shadcn components, heavy on effects and illustrations | MIT |
| skiper-ui.com (the owner wrote "skipper-ui.com", which doesn't resolve) | ~107 "uncommon" components, most paid | Paid: ideas only, no code |

All four are React + Tailwind + Motion. This site has no build step, so anything we take is
rebuilt in plain CSS and JS, never copied. That also keeps us clear of Skiper's paid license.

## Take

| # | Idea | From | Where it goes | Rules it serves | Caveats |
|---|---|---|---|---|---|
| 1 | **Project index as big type.** Project names set large in a list; hovering or focusing one shows its picture beside the list | Skiper "Projects Showcase" | Projects, replacing the tile mosaic | T2 (a list instead of cards), settles the B7/K9 clash | Needs ≥ 1 real picture per project (ties to the photos step). Hover is a bonus only: on touch and keyboard the picture shows inline, and `/#slug` still opens the story |
| 2 | **A trail line drawn on scroll.** One thick path along the Journey timeline, drawn as you read, with a dot at each job | Skiper "SVG follow scroll" | Journey | B1 ("the mountain becomes… the shape of the journey"), T1 | It would be a second signature move next to the ASCII mountain (T8), so it replaces the Journey's scroll entrances. Reduced motion shows the full line, already drawn |
| 3 | **Label column + large statement.** A small sentence-case label in the left column, a big statement on the right with hand-set line breaks | Manus About page | An "About" or "Now" beat between the hero and Journey | T3 (statement ≤ 25 words), T4 (two left edges) | The label sits in its own column in normal case, never as an uppercase eyebrow above a heading (T2) |
| 4 | **Dithered photos as the house treatment.** Photos shown as a 2-tone Bayer dither in the green ink; full color on hover, focus or tap | Cult "Dither Image" | Project pictures, Photography | T6 (one consistent grade), echoes the ASCII mountain | Pure CSS, so no cost. The full-color picture must be one action away on touch. Try it on 3 photos before committing to it |
| 5 | **Now playing, in the header.** The latest Last.fm track as one line of text ("Listening to … by …") | Cult/Watermelon "Dynamic Island", Skiper "Music toggle" | Header, or the close | T1 ("one live thing" from real content) | In-flow text, not a floating black pill (T2 glass/pill ban). Reads `music.json`, so no new requests; hidden when the data is stale |
| 6 | **Sliding tab indicator.** The 3px bar slides to the selected tab | Cult "Direction-aware tabs", Watermelon "Continuous tabs" | Explore tabs | B4 tabs, T8 feedback | Transform only; it jumps instead with reduced motion |
| 7 | **Rolling numbers, once.** Real counts tick up when first seen | Cult "Rolling number", Skiper "Number flow" | Explore (hikes, km, scrobbles) | T8 entrances | Only for real numbers (T9), never "600+"-style stat cards |
| 8 | **Copy confirm in place.** The Copy button itself turns into "Copied" | Watermelon "Copy confirm" / "Inline toast" | The close's copy-email | T8 feedback | Small; keeps the `role=status` announcement |
| 9 | **Muted demo loop with a poster.** Plays on hover or tap | Cult "Hover video player" | The hARk feature | T6 (one honest loop) | Only once a real hARk clip exists; poster frame doubles as its picture |

## Consider

- **Serif display face** (Manus: Libre Baskerville headings on a warm off-white, sans for text). A real
  change of voice: more editorial and quiet than Bricolage's chunky grotesque. Pairs well with #1 and #3.
- **Sticky list + panel** (Cult "Feature sticky section", Manus's left category rail on /features): the
  Explore tabs on desktop as a sticky left list with the panel scrolling beside it. Tabs stay on phones.
- **Letter-roll nav hover** (Skiper "Text roll navigation"): letters roll up on hover. Pleasant, but it's
  only decoration on four links; only if the rest of the page stays plain.

## Skip

| Pattern | Seen on | Why |
|---|---|---|
| Mono uppercase labels, `//` eyebrows, `[ BRACKET ]` tags | Watermelon, Cult | T2 eyebrows and mono labels |
| Glowing or colored accent word in the headline | Watermelon, Skiper | T2 styled accent word |
| Bento grids, stat cards, identical feature cards | Watermelon, Manus /features | T2 identical cards |
| Testimonial marquees, "trusted by" rows | Watermelon, Skiper | T9 (no invented proof) and T2 |
| Gradient and liquid-metal heroes, glass, border beams, neumorphic buttons | Cult | T2 gradients, glass, shadows |
| Preloaders (Nike, stairs, pixel) | Skiper | Delays the first view (P4) |
| Cursor trails, gooey blobs, mouse-follow | Skiper, Watermelon | Pointer-only; nothing on a phone; distracting (P8) |
| Device mockups (iPhone, Mac, keyboard) | Cult | Heavy SVG chrome around a screenshot; crop the real screenshot instead (T6) |
| Floating scroll island / pill nav | Watermelon "Scroll island" | T2 floating pill nav |
| Kinetic letter-stack hero | Skiper home | Would compete with the ASCII mountain as the one signature move (T8) |
