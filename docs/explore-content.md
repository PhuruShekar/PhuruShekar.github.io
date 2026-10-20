# Adding to the Explore tabs

How to fill Food, Hikes and Photography. Music fills itself: see `music-pipeline.html`.
Until a tab has entries it shows its empty state, so the site is fine to release as is.

## Food and Hikes: `places.json`

One file at the repo root feeds both tabs. Each entry:

```json
{
  "type": "food",
  "name": "Restaurant or trail name",
  "area": "Seattle, WA",
  "coords": [47.6145, -122.3205],
  "date": "2026-08-02",
  "rating": 9.1,
  "review": "One or two plain sentences.",
  "photo": "assets/places/noodle-house.jpg",
  "photoAlt": "Bowl of hand-pulled noodles in red chili oil",
  "link": "https://…"
}
```

| Field | Needed | Notes |
|---|---|---|
| `type` | yes | `food` or `hike` |
| `name` | yes | |
| `area` | no | City or park; shown under the name and in the map popup |
| `coords` | no | `[latitude, longitude]`; right-click a spot in Google Maps to copy them. Without it the place is listed but has no pin |
| `date` | yes | `YYYY-MM-DD` of the visit or hike; the list is newest first and shows "Aug 2026" |
| `rating` | no | 0–10, one decimal, shown as "9.1 / 10". Use the Beli score for food |
| `review` | no | Keep it to a sentence or two |
| `photo` + `photoAlt` | no | A 4:5 portrait crop, about 400×500 px, under 60 KB; `photoAlt` says what's in it |
| `link` | no | AllTrails page, restaurant site; makes the name a link |

Wrap them as `{ "places": [ … ] }`. A missing comma breaks the whole file: the tabs then
show "Couldn't load my restaurants/hikes" with a Try again button, so check the page after
editing.

The map loads Leaflet from cdnjs and tiles from OpenStreetMap, only when a Food or Hikes tab
with at least one pinned place opens. Nothing loads while the file is empty.

## Photography: `index.html`

Photos are plain HTML so they show without JavaScript. In the `<ul class="photos">` inside
`#explore-photography`, add one item per photo:

```html
<li><img src="assets/photos/rainier.jpg" width="800" height="1000" loading="lazy"
  alt="What the photo shows, in one sentence"></li>
```

- Crop every photo to 4:5 portrait (the grid crops anything else to 4:5 from the center).
- Export at 800×1000, JPEG quality ~75 (under ~150 KB each); a WebP copy beside it is a bonus.
- Put them in `assets/photos/`.
- The "No photos up yet" line hides itself once the list has an item.
