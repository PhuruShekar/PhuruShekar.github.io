# Adding to the Explore tabs

How to fill Food, Hikes and Photography. Music fills itself: see `music-pipeline.html`.
Until a tab has entries it shows its empty state, so the site is fine to release as is.

## Food: `food.json`

A list of places at the repo root, set like a menu: restaurants (`"type": "food"`) under
“Mains”, cafés and desserts (`"type": "sweet"`) under “Dessert & coffee”, each best rated first.

```json
[
  { "type": "food", "name": "Taneda", "area": "Seattle, WA", "date": "2023-11-01", "rating": 10.0,
    "review": "One or two plain sentences.", "link": "https://www.google.com/maps/search/?api=1&query=…" }
]
```

| Field | Needed | Notes |
|---|---|---|
| `type` | yes | `food` (restaurant) or `sweet` (café or dessert) |
| `name` | yes | |
| `area` | no | City, shown under the name |
| `date` | no | `YYYY-MM-DD`, `YYYY-MM`, or free text like "Too many times", shown after the area |
| `rating` | no | 0–10, one decimal. Use the Beli score |
| `review` | no | A sentence or two |
| `link` | no | A Google Maps link; makes the name a link |

## Hikes: `hikes.json`

A list of hikes at the repo root: one dot each on the map, and a table of names and places
under it, grouped by province or state.

```json
[
  { "name": "Pump Peak", "area": "Mount Seymour, BC", "coords": [49.3872, -122.9411],
    "link": "https://www.alltrails.com/trail/…" }
]
```

| Field | Needed | Notes |
|---|---|---|
| `name` | yes | |
| `area` | no | Place ending in the province or state (“Squamish, BC”); the table groups by that last part |
| `coords` | no | `[latitude, longitude]` of the summit or end point; right-click a spot in Google Maps to copy them. Without it the hike is in the table but has no dot |
| `link` | no | The AllTrails page; makes the name a link |

## Both files

Each file is one `[ … ]` list. A missing comma breaks the whole file: the tab then shows
"Couldn't load my restaurants" (or hikes) with a Try again button, so check the page after
editing.

The map loads Leaflet from cdnjs and tiles from OpenStreetMap, only when the Hikes tab
opens with at least one hike that has coordinates.

## Photography: `index.html`

Photos are plain HTML so they show without JavaScript. In the `<ul class="photos">` inside
`#explore-photography`, add one item per photo:

```html
<li><a href="assets/photos/rainier.jpg"><picture><source type="image/webp" srcset="assets/photos/thumbs/rainier.webp"><img src="assets/photos/thumbs/rainier.jpg"
  width="800" height="1200" loading="lazy" alt="What the photo shows, in one sentence"></picture></a></li>
```

- Put the full photo (Lightroom export, ~2048px long side) in `assets/photos/`. Clicking a
  grid photo opens it in a pop-up over a darkened page; without JavaScript the link opens the file.
- Put a small copy with the same name in `assets/photos/thumbs/`: scaled so it covers 800×1000,
  JPEG quality ~78 (about 100–200 KB). The gallery shows it uncropped, and the pop-up
  shows it while the full photo loads. `width`/`height` are the thumbnail's real size.
- Also put a WebP copy of the thumbnail next to it (same name, `.webp`, 600px wide, under
  150 KB): browsers load it instead of the JPEG. [Squoosh](https://squoosh.app) makes one
  (WebP, quality ~80).
- The "No photos up yet" line hides itself once the list has an item.
