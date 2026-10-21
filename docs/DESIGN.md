---
name: portfolio
site: phurushekar.com
version: "2 (editorial, draft 2026-10-20)"
colors:
  light: { ground: "#fffdf8", surface: "#f6f9f7", field: "#173b2a", ink: "#1d2621", muted: "#5c6a62",
           primary: "#2f6b4f", action: "#b25a17", action-fill: "#e07a2f", on-action: "#0d2419",
           peach: "#ffc89a", highlight: "#fbbf24", border-ui: "#5c6a62", focus: "#b25a17" }
  dark:  { ground: "#0d2419", surface: "#173b2a", field: "#1f4a36", ink: "#e8f2ec", muted: "#a9bfb2",
           primary: "#6ee7b7", action: "#f4a261", action-fill: "#e07a2f", on-action: "#0d2419",
           peach: "#ffc89a", highlight: "#fbbf24", border-ui: "#5f8a74", focus: "#f4a261" }
type:
  display: "Bricolage Grotesque, system-ui, sans-serif"   # opsz 12..96, weight 700
  text: "Geist, system-ui, sans-serif"           # 400 / 500
  sizes: { display: "clamp(3.5rem, 11vw, 9rem)", large: "clamp(2.25rem, 5vw, 4rem)", medium: "1.5rem",
           body: "1.125rem", small: "0.9375rem" }
radius: { button: 0, picture: 0, portrait: "circle (50%), 3px gold ring", input: 0, pill: 9999 }
space: { margin: "clamp(16px, 4vw, 32px)", rail: "clamp(14rem, 21vw, 19rem)", section: "clamp(96px, 14vw, 200px)" }
---

# Portfolio design language

Rules come from `~/code/design-principles` (IDs like T2, C4, PT3 point there); this file
only picks values for phurushekar.com. IDs: B1–B9. Earlier research and plans: `archive/`;
what was taken from outside sites and why: `redesign-sources.md`.

Version 2 (owner 2026-10-20) keeps the palette, the ASCII mountain and the content, and
changes the layout from a chunky poster to an **editorial page**: a
label rail down the left of every section, statements and project names set large, and
the Journey drawn as a trail. Draft until the owner signs off.

## B1 Visual theme and atmosphere

Outdoorsy engineer, written like a well-set field journal: a forest-green and cream page
with one warm orange spark, big playful type, and a lot of air. Confident, made by hand.
The idea: **the mountain I hike becomes the ASCII backdrop, and the trail up it becomes the
line of the journey.** Real photos, flat color fields instead of boxes, words set large
instead of cards. Feels like a printed trail guide, not a SaaS template.

## B2 Color palette and roles

Unchanged from version 1.

| Role | Light | Dark | Use |
|---|---|---|---|
| Ground | `#fffdf8` | `#0d2419` | ≈ 60% of the page |
| Field | `#173b2a` (text `#fffdf8`, 12.2) | `#1f4a36` | Whole chapters (Journey, the close): ≈ 30% |
| Surface | `#f6f9f7` (Action 4.5, Ink 14) | `#173b2a` | Tone step for grouped content |
| Ink | `#1d2621` (15.3) | `#e8f2ec` (14.3) | All running text, the selected project name |
| Muted | `#5c6a62` (5.6) | `#a9bfb2` (8.4) | Notes, captions, project names at rest |
| Primary | `#2f6b4f` (6.2) | `#6ee7b7` (10.7) | The name, section headings |
| Action | `#b25a17` (4.7) | `#f4a261` (7.9) | Links |
| Action fill | `#e07a2f` + `#0d2419` text (5.5) | same | The one primary button per screen |
| Highlight | `#fbbf24` (7.4 on Field) | same (6.0) | "Now": the last waypoint of the trail |
| Peach | `#ffc89a` (8.3 on Field) | same (6.7) | Text and the trail line on Field sections |

- Orange stays under ≈ 5% of any screen. Big type on cream with orange is one step from the
  "assistant palette" (T2), so green has to carry the identity: the name, section headings and
  both Field chapters are green.
- Never as two different meanings: `#2f6b4f` vs `#b25a17` (protan 1.0). Safe pairs:
  `#173b2a` vs `#e07a2f` (3.3), `#2f6b4f` vs `#ffc89a` (3.7) (C4).
- On Field sections links use Peach (8.3); on mint tones like `#e8f2ec` orange text fails
  (4.2), so links there use Primary.

## B3 Typography rules

- Two families: **Bricolage Grotesque** for display (weight 700; owner 2026-10-21: kept
  over the Newsreader serif the v2 draft named, because it is more playful)
  and **Geist** for text (400/500). No italics for emphasis, no mono except code; numbers use
  Geist's tabular figures.
- Bricolage sets: the name, statements, project names, section labels, job titles and the
  close. Geist sets everything you read in sentences, plus meta lines and buttons.
- Five sizes (YAML `sizes`):
  - **display**: the name, and “Want to chat?” at the close so the page ends at the scale it
    opens with (owner 2026-10-21). Tracking −0.02em (the close −0.03em), leading 0.95.
  - **large**: rail labels (the section `h2`s), statements (≤ 25 words, T3), project names, the close’s email (floor 1.5rem so it stays one line on a phone). Tracking −0.01em, leading 1.05.
  - **medium**: job titles, the open project's title.
  - **body**: running text, leading 1.55.
  - **small**: meta lines, dates, captions.
- Statements are hand-broken into lines that read as phrases (`<br>` only at ≥ 768px; phones
  reflow). Curly quotes and real dashes (T3).
- The name is one face, one color: no italic or colored second word (T2).
- Preload only Bricolage 700 and Geist 400 (PF3); match fallback metrics for system-ui
  so the swap doesn’t shift the hero.

## B4 Component stylings

- **Rail label**: the section `h2`, display face at large, Primary (on Field: the Field
  text color), sentence case, top-aligned with the first line of the content beside it and
  sticky while its section scrolls (owner 2026-10-21: bright and large, not Muted, per C5
  and T3). It is the heading itself, not a label above one, so it isn't an eyebrow (T2). It
  never says "01", and never uppercase. Below 1024px it steps up to `clamp(3rem, 9vw, 4rem)`
  so it stays above the project names, which share the large size.
- **Statement**: display face at large in Ink (owner 2026-10-21: in Primary it fought the
  green rail label beside it), ≤ 25 words, left-aligned in the content column, measure
  ≈ 22ch so it breaks into 3–4 lines. Used for the Projects and About me intros. Its
  floor is 1.75rem (`clamp(1.75rem, 5vw, 4rem)`) so on phones it sits under the 48px
  heading and the 36px project names.
- **Project list** (PT3 index with preview): every project name in the display face at large, one per
  line, newest first, with its year and event in small Muted after it. At rest names are Muted;
  the one being previewed is Ink. The preview panel (story, Built with, Team, links) sits
  beside the list and stays in view while the list scrolls.
  - Pointer: hovering a name previews it after 120 ms (passing over doesn't flicker); moving
    off the list goes back to the picked one.
  - Keyboard: focusing a name previews it; Enter picks it.
  - Click or Enter picks it and sets `/#slug`; `/#slug` on load picks that one.
  - No pictures in the panel: projects are words only (owner 2026-10-21). No stand-in art (T6).
  - Picking a name decodes it in the panel: for 300 ms the letters resolve left to right out
    of the hero's ASCII characters (in ASCII warm). The real name stays in the heading under an
    `aria-hidden` layer, so screen readers and the layout never see the scramble. Off under
    reduced motion and on phones; a click mid-decode lets it finish.
- **Trail** (Journey): one Peach line, 4px, round caps, winding gently down beside
  the timeline like a switchback, with a waypoint at each job: a 14px Peach ring, filled
  once the line reaches it. The current job's waypoint is a filled Highlight dot with the
  word "now" (C3: meaning never by color alone). Decorative: `aria-hidden`, and the
  timeline text carries every fact.
- **Summit** (close): the hero's mountain again, in the On-Field ink, filling the close from
  just under the links to the bottom of the page, with a Highlight flag on the highest rock.
  It parts around the © line the way the hero parts around the name, and the flag never sits
  on it. Rises once from the bottom (under 2 s) when scrolled to; drawn whole under reduced
  motion; hidden in print; `aria-hidden`.
- **Buttons**: square corners, flat Action fill, `#0d2419` text, 48px tall, 20px side
  padding; hover lightens to Peach, press moves 1px down. Secondary actions are text links.
- **Links**: Action color, underline offset 3px, thicker underline on hover.
- **Pictures**: square corners, one ratio family (3:2 landscape, 4:5 portrait; Photography
  keeps each photo's own shape), same grade. The hero portrait alone is a circle in a 3px
  Highlight ring with a gap (owner 2026-10-20); the ASCII mask follows its curve.
- **Theme toggle**: text button in the header, "Dark", `aria-pressed`.
- **Tabs** (Explore): words with a 3px Primary bar under the selected one.
- **Focus**: 3px `focus` outline, 3px offset.

## B5 Layout principles

- One 12-column grid, equal outer margins (YAML `margin`), max text measure 68ch.
- **The rail.** From 1024px (768 was too tight for the Projects index and panel), Journey,
  Projects and About me have two columns: a `rail`-wide left column holding the label, and
  the content on the right (the Journey's dates and trail sit in the content). The close
  keeps its large heading above the content. That gives the page exactly two left edges below the hero: the
  margin and the content column (T4).
- Compositions differ inside the content column so neighbors never repeat (T4, V2):
  Journey = trail + timeline on Field · Projects = big-type list + panel on Ground ·
  About me = statement, then tabs · close = the heading at display size, the email large, then links, then the summit, on Field.
- Section gap per YAML `section`.

## B6 Depth and elevation

- Flat. Depth comes from Field and Surface tone steps.
- Shadows only on floating UI (the photo viewer, map popups): two layers, tinted green.

## B7 Do's and don'ts

- Do let a whole Field section carry the Journey and the closing invitation.
- Do use real photos: the portrait and the Photography tab. Never on projects (owner 2026-10-21) (T6).
- Do keep the ASCII mountain as the one wow, static under reduced motion. The summit at the
  close is the same mountain coming back, not a second wow; the project decode borrows its
  characters. The trail is quieter: it draws once, follows your scroll, and never loops.
- Do let type do the work: a project is a name set large, not a card.
- Don't use eyebrow labels, "01 / 02" numbering, mono labels or uppercase tracking.
- Don't italicize or color one word of a headline or statement.
- Don't add gradients, glows, outlined boxes, glass headers, cursor-following pictures or
  preloaders (see `redesign-sources.md`, Skip).
- Don't use orange text on light backgrounds except Action `#b25a17`.

## B8 Responsive behavior

- Breakpoints by content, checked at 390, 768, 1440.
- Below 1024px the rail stacks: the label sits above its content, one step larger (B4).
- Phone: name ≤ 2 lines at 320px; ASCII backdrop crops to the summit; statements reflow
  with no forced breaks; projects show as rows, all open, each name still set large; the
  trail runs down the left edge of the timeline at 3px.
- Touch targets ≥ 44px; hover is never the only way to see a preview.

## B9 Agent prompt guide

Page map (P5):

- **Glance**: name (display face, display size); "Software Development Engineer at AWS IoT, building
  the IoT Core console" plus one specific sentence (owner to confirm wording); résumé button
  (the one action fill); email, GitHub, LinkedIn as links; theme toggle.
- **Scan**: journey timeline on a Field chapter with the trail drawn beside it (PT2) ·
  projects as a big-type list with a preview panel, GitHub/Devpost links and `/#slug`
  anchors (PT3) · no Skills section: each job and project has a "Built with" line (PT4) ·
  contact close on a Field chapter (PT8).
- **Explore** ("About me"): opens with one statement in the content column (owner writes it,
  ≤ 25 words), then tabs Food / Hikes / Photography / Music in the URL (`#explore/<tab>`).
  Food: a menu card on Surface from `food.json` (owner 2026-10-20): restaurants (`food`) as
  “Mains”, cafés and desserts (`sweet`) as “Dessert & coffee”, name … dotted leader … score,
  best first, no map (the places are worldwide); Beli profile link. Hikes: a dot per trail on
  the map, then a scrolling table of name + place linked to AllTrails (`hikes.json`: name,
  area, coords, link). Photography: masonry columns, each photo in its own shape, columns
  ending unevenly; a click opens the full photo in a modal on a darkened page, with ‹ › (and
  arrow keys) to step through, wrapping at the ends. Music: last played from Last.fm on tab
  open (a gold dot beats unevenly for under 5 s while playing), then the top artist and top 5
  songs for the last 30 days from `music.json` (built by a daily GitHub Action, credited), all
  on one Field card ("Wrapped" style, owner 2026-10-20): ranks share on ties, a tie for top
  artist says "A tie", and gold marks only "now".
- **Motion** (T8): the ASCII mountain is the signature; the hero enters in stages; the trail
  draws with scroll (a scroll listener in `script.js` sets the line's dash offset; reduced
  motion or print: drawn in full; no JS: no trail, the gold "now" bar stays);
  project previews cross-fade in 150 ms (opacity only) and the picked name decodes in 300 ms;
  the summit rises once at the close.
- Analytics: GoatCounter events `link-resume`, `link-github`, `link-linkedin`,
  `link-email`, `project-open-<slug>`, `explore-<tab>`, `theme-toggle`. Count features,
  never people: no cookies, no IP storage, so no consent banner; no third-party trackers;
  maps, embeds and the Last.fm call load only when opened; the script loads async and the
  site works the same when it's blocked.

When editing: change one component at a time by its role name, keep orange scarce, run the
`5-ship.md` checklist, then add any lesson to `learnings.md`.
