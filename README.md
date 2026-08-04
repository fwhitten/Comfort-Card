# Room Comfort Card

A Home Assistant Lovelace card that shows a room's temperature/humidity
comfort at a glance: a circular gauge (comfort zone + current position),
a comfort-state label ("Pleasant", "Too warm", "Cold", "Dry", "Humid"),
and a card background colour that changes with the comfort state — with
separate light/dark theme colours.

The gauge plots humidity left-to-right (DRY → HUMID) and temperature
bottom-to-top (COLD → WARM), so the dot's position tells you both
readings at once, and optionally trails where the room has been over the
last few hours.

## Installation

### Via HACS (custom repository)

1. Push this folder to a GitHub repository.
2. In Home Assistant: HACS → the "..." menu → **Custom repositories**.
3. Add your repo URL, category **Dashboard**.
4. Install "Room Comfort Card" from HACS. It will place
   `comfort-card.js` in `config/www/community/comfort-card/` and
   register the Lovelace resource automatically.

### Manual

1. Take the pre-built `comfort-card.js` from the repo root (or run
   `npm install && npm run build` to produce your own).
2. Copy it into `config/www/comfort-card.js`.
3. In Home Assistant: **Settings → Dashboards → Resources → Add
   Resource**, URL `/local/comfort-card.js`, type **JavaScript Module**.
4. Reload the browser.

## Adding the card

In any dashboard: **Add Card → Search → "Room Comfort"**. The GUI
editor lets you:

- Pick an **Area** (the card auto-finds a `sensor` entity in that area
  with `device_class: temperature` and one with `device_class:
  humidity`), or turn on **manually choose entities** to pick any two
  sensors directly.
- Override the displayed **name** (defaults to the area name).
- Adjust **comfort thresholds**: the inner-circle "comfort" min/max and
  the outer-circle gauge min/max, independently for temperature and
  humidity.
- Set **Hours of history** (0–24, default 0) to trail the recent
  readings as a fading curve behind the current dot. See below.
- Set a **tap action** / **hold action** (defaults to opening the
  temperature sensor's more-info dialog on tap).
- Under **Colours**, override the light/dark background colour for each
  of the five comfort states.

### YAML example

```yaml
type: custom:comfort-card
area: bedroom
history_hours: 6
temp_min: 20
temp_max: 24
temp_outer_min: 16
temp_outer_max: 28
humidity_min: 40
humidity_max: 60
humidity_outer_min: 20
humidity_outer_max: 80
tap_action:
  action: more-info
```

## Responsive layouts

The card measures its own width and height and picks one of three
arrangements, so it reads well at any size the layout editor allows:

| Layout | When | Arrangement |
| --- | --- | --- |
| Horizontal | wide and short | name + state top-left, values bottom-left, gauge right |
| Square | roughly square | name left / state right, gauge centred, values across the bottom |
| Vertical | tall or narrow | name and state stacked, gauge centred, values across the bottom |

## The history trail

With `history_hours` above 0, the card plots where the room has been
over that window as a curve trailing the current reading, fading to
fully transparent at the oldest end.

**This needs long-term statistics.** The data comes from the recorder's
`statistics_during_period`, which only covers entities that have
`state_class: measurement`. Most integration-provided temperature and
humidity sensors set this, but some template sensors don't — those show
no trail, with everything else on the card unaffected.

Readings are taken as 5-minute means, so the trail is inherently
smoothed. On top of that, samples closer together than a minimum
distance in gauge space are dropped before a Catmull-Rom spline is
fitted through what remains: sensor jitter otherwise produces clusters
of near-identical points that make the curve kink and self-intersect.
The trail refreshes every 5 minutes, matching how often the statistics
themselves update.

## How the comfort state is calculated

Each of temperature and humidity has a "comfort" range (the filled
inner circle) and a wider "gauge" range (the outer circle, used purely
for scaling the dot's position). If both readings are within their
comfort range, the state is **Pleasant**. Otherwise, whichever reading
is furthest outside its comfort range (as a fraction of that range)
decides the state — e.g. a room that's mildly warm but very dry shows
**Dry**, not **Too Warm**.

## Development

```bash
npm install
npm run watch   # rebuilds comfort-card.js on change
```
