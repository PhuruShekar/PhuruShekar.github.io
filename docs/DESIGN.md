---
name: portfolio
site: phurushekar.com
colors:
  light: { ground: "#fffdf8", surface: "#f6f9f7", field: "#173b2a", ink: "#1d2621", muted: "#5c6a62",
           primary: "#2f6b4f", action: "#b25a17", action-fill: "#e07a2f", on-action: "#0d2419",
           peach: "#ffc89a", highlight: "#fbbf24", border-ui: "#5c6a62", focus: "#b25a17" }
  dark:  { ground: "#0d2419", surface: "#173b2a", field: "#1f4a36", ink: "#e8f2ec", muted: "#a9bfb2",
           primary: "#6ee7b7", action: "#f4a261", action-fill: "#e07a2f", on-action: "#0d2419",
           peach: "#ffc89a", highlight: "#fbbf24", border-ui: "#5f8a74", focus: "#f4a261" }
type:
  display: "Bricolage Grotesque, system-ui, sans-serif"
  text: "Geist, system-ui, sans-serif"
  sizes: { display: "clamp(3.5rem, 11vw, 9rem)", h2: "clamp(2.25rem, 5vw, 4rem)", h3: "1.5rem",
           body: "1.125rem", small: "0.9375rem" }
radius: { button: 0, picture: 0, input: 0, pill: 9999 }
space: { margin: "clamp(16px, 4vw, 32px)", section: "clamp(96px, 14vw, 200px)" }
---

# Portfolio design language

Rules come from `~/code/design-principles` (IDs like T2, C4, PT3 point there); this file
only picks values for phurushekar.com. IDs: B1–B9. Feature ideas: `portfolio-ideas.md`.

## B1 Visual theme and atmosphere

Outdoorsy engineer: a forest-green and cream page with one warm orange spark. Calm,
confident, made by hand. The idea: **the mountain I hike becomes the ASCII backdrop and
the shape of the journey.** Big type, real photos from hikes and projects, flat color
fields instead of boxes. Feels like a trail guide printed well, not a SaaS template.

## B2 Color palette and roles

| Role | Light | Dark | Use |
|---|---|---|---|
| Ground | `#fffdf8` | `#0d2419` | ≈ 60% of the page |
| Field | `#173b2a` (text `#fffdf8`, 12.2) | `#1f4a36` | Whole chapters (Journey, the close): ≈ 30% |
| Surface | `#f6f9f7` (Action 4.5, Ink 14) | `#173b2a` | Tone step for grouped content |
| Ink | `#1d2621` (15.3) | `#e8f2ec` (14.3) | All running text |
| Muted | `#5c6a62` (5.6) | `#a9bfb2` (8.4) | Notes and captions only |
| Primary | `#2f6b4f` (6.2) | `#6ee7b7` (10.7) | Headlines |
| Action | `#b25a17` (4.7) | `#f4a261` (7.9) | Links |
| Action fill | `#e07a2f` + `#0d2419` text (5.5) | same | The one primary button per screen |
| Highlight | `#fbbf24` + ink text (9.3) | same | "Now" in the journey, one featured project |
| Peach | `#ffc89a` + `#173b2a` text | same | Text on Field sections, soft fills |

- Orange stays under ≈ 5% of any screen, so cream + orange never reads as the generic
  "assistant palette" (T2): green carries the identity.
- Never as two different meanings: `#2f6b4f` vs `#b25a17` (protan 1.0). Safe pairs:
  `#173b2a` vs `#e07a2f` (3.3), `#2f6b4f` vs `#ffc89a` (3.7) (C4).
- On Field sections links use Peach (8.3); on mint tones like `#e8f2ec` orange text fails
  (4.2), so links there use Primary.

## B3 Typography rules

- Two families: **Bricolage Grotesque** (display, `opsz` 96, weight 700) and **Geist**
  (text, 400/500). No mono except code; numbers use Geist's tabular figures.
- Five sizes (YAML `sizes`). Display tracking −0.035em, leading 0.9; h2 −0.02em, 1.0.
- The name is one face, one color: no italic or colored second word.
- Confirm Geist's "Il1 0O" against Atkinson Hyperlegible Next on the real page before
  switching from the current DM fonts.

## B4 Component stylings

- **Buttons**: square corners, flat Action fill, `#0d2419` text, 48px tall, 20px side
  padding; hover darkens fill, press moves 1px down. Secondary actions are text links.
- **Links**: Action color, underline offset 3px, thicker underline on hover.
- **Pictures**: square corners, one ratio family (3:2 landscape, 4:5 portrait), same grade.
- **Theme toggle**: text button in the header ("Dark" / "Light"), `aria-pressed`.
- **Tabs** (Explore): words with a 3px Primary bar under the selected one.
- **Focus**: 3px `focus` outline, 3px offset.

## B5 Layout principles

- One 12-column grid, equal outer margins (YAML `margin`), max text measure 68ch.
- Section gap per YAML `section`; neighbors use different compositions (V2).
- Headings align to the same left edge as body text; at most three left edges per page.

## B6 Depth and elevation

- Flat. Depth comes from Field and Surface tone steps.
- Shadows only on floating UI (command palette, map popups): two layers, tinted green.

## B7 Do's and don'ts

- Do let a whole Field section carry the Journey and the closing invitation.
- Do use real photos: hikes, projects, the portrait. At least four on the page.
- Do keep the ASCII mountain as the one wow, pausable and static under reduced motion.
- Don't use eyebrow labels, "01 / 02" numbering or mono labels (the current site does; remove them).
- Do show projects as tiles (owner's choice, Q43): each tile has a picture, title, one line
  and links, and expands in place (V7). This overrides the T2 "identical cards" tell here.
- Don't add gradients, glows, outlined boxes, or glass headers.
- Don't use orange text on light backgrounds except Action `#b25a17`.

## B8 Responsive behavior

- Breakpoints by content, checked at 390, 768, 1440.
- Phone: name ≤ 2 lines at 320px; ASCII backdrop crops to the summit; project
  tiles become compact horizontal cards (thumbnail left; title, one line, links right).
- Touch targets ≥ 44px; no hover-only previews.

## B9 Agent prompt guide

Page map (P5):

- **Glance**: name; "Software Development Engineer at AWS IoT, building the IoT Core
  console" plus one specific sentence (owner to confirm wording);
  résumé button (the one action fill); email, GitHub, LinkedIn as links; theme toggle.
- **Scan**: journey timeline on a Field chapter (PT2) · projects as expandable
  tiles with GitHub/Devpost links and `/#slug` anchors (V7) · skills as grouped lists
  linked to projects (PT4) · contact close on a Field chapter (PT8).
- **Explore**: tabs Food / Hikes / Photography / Music in the URL (`#explore/<tab>`).
  Food and Hikes: map + list from `places.json` (`hike` | `food`, name, coords, date,
  rating, review, photo), Beli profile link on Food. Photography: photo grid. Music: last
  played from Last.fm on tab open, then top 5 for the month from `music.json` (built by a
  daily GitHub Action, credited). Optional: the climbing-trail view of the journey.
- Analytics: GoatCounter events `link-resume`, `link-github`, `link-linkedin`,
  `link-email`, `project-open-<slug>`, `explore-<tab>`, `theme-toggle`.

When editing: change one component at a time by its role name, keep orange scarce, run the
`checklist.md` gate, then add any lesson to `learnings.md`.
