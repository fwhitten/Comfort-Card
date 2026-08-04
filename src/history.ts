import type { HomeAssistant } from "custom-card-helpers";

import { gaugePoint, type AxisRange, type GaugePoint } from "./comfort-calc";

interface StatisticEntry {
  start: number | string;
  mean?: number | null;
}

type StatisticsResponse = Record<string, StatisticEntry[] | undefined>;

const toMillis = (start: number | string): number =>
  typeof start === "number" ? start : new Date(start).getTime();

/**
 * Pulls the recorder's 5-minute statistics for both sensors and maps them into
 * gauge space, oldest first.
 *
 * Only entities with long-term statistics (state_class: measurement) appear in
 * this API, so an empty result is expected for sensors without it and simply
 * means no trail.
 */
export async function fetchTrail(
  hass: HomeAssistant,
  temperatureEntity: string,
  humidityEntity: string,
  hours: number,
  tempRange: AxisRange,
  humidityRange: AxisRange
): Promise<GaugePoint[]> {
  if (hours <= 0) return [];

  const end = new Date();
  const start = new Date(end.getTime() - hours * 3600 * 1000);

  let response: StatisticsResponse;
  try {
    response = await hass.callWS<StatisticsResponse>({
      type: "recorder/statistics_during_period",
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      statistic_ids: [temperatureEntity, humidityEntity],
      period: "5minute",
      types: ["mean"],
    });
  } catch (_err) {
    return [];
  }

  const temperatures = response?.[temperatureEntity] ?? [];
  const humidities = response?.[humidityEntity] ?? [];
  if (!temperatures.length || !humidities.length) return [];

  // Both series use the same 5-minute bucket boundaries, so an exact timestamp
  // match is the common case; carrying the last known humidity forward covers
  // buckets where only one of the two sensors reported.
  const humidityByTime = new Map<number, number>();
  for (const entry of humidities) {
    if (entry.mean != null) humidityByTime.set(toMillis(entry.start), entry.mean);
  }
  const humidityTimeline = [...humidityByTime.entries()].sort((a, b) => a[0] - b[0]);

  const points: GaugePoint[] = [];
  let cursor = 0;
  let lastHumidity: number | undefined;

  for (const entry of temperatures) {
    if (entry.mean == null) continue;
    const time = toMillis(entry.start);
    while (cursor < humidityTimeline.length && humidityTimeline[cursor][0] <= time) {
      lastHumidity = humidityTimeline[cursor][1];
      cursor++;
    }
    const humidity = humidityByTime.get(time) ?? lastHumidity;
    if (humidity == null) continue;
    points.push(gaugePoint(entry.mean, humidity, tempRange, humidityRange));
  }

  return points;
}

/**
 * Drops samples that sit closer than `minDistance` (in gauge units) to the
 * previously kept one. Sensor jitter produces clusters of near-identical
 * readings, and feeding those to a spline creates the tight kinks and
 * self-intersections that read as artefacts.
 */
export function simplify(points: GaugePoint[], minDistance: number): GaugePoint[] {
  if (points.length <= 2) return points;

  const kept: GaugePoint[] = [points[0]];
  for (let i = 1; i < points.length - 1; i++) {
    const point = points[i];
    const previous = kept[kept.length - 1];
    if (Math.hypot(point.x - previous.x, point.y - previous.y) >= minDistance) {
      kept.push(point);
    }
  }

  // The newest sample is always kept so the trail meets the dot; if that leaves
  // it crowding its neighbour, drop the neighbour instead.
  const newest = points[points.length - 1];
  if (kept.length > 1) {
    const previous = kept[kept.length - 1];
    if (Math.hypot(newest.x - previous.x, newest.y - previous.y) < minDistance * 0.5) {
      kept.pop();
    }
  }
  kept.push(newest);

  return kept;
}

/** Samples a Catmull-Rom spline through the points for a smooth, rounded trail. */
export function smooth(points: GaugePoint[], perSegment: number): GaugePoint[] {
  if (points.length < 3) return points;

  const at = (index: number): GaugePoint =>
    points[Math.max(0, Math.min(points.length - 1, index))];

  const sampled: GaugePoint[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = at(i - 1);
    const p1 = at(i);
    const p2 = at(i + 1);
    const p3 = at(i + 2);

    for (let step = 0; step < perSegment; step++) {
      const t = step / perSegment;
      const t2 = t * t;
      const t3 = t2 * t;
      sampled.push({
        x:
          0.5 *
          (2 * p1.x +
            (-p0.x + p2.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y:
          0.5 *
          (2 * p1.y +
            (-p0.y + p2.y) * t +
            (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
            (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      });
    }
  }
  sampled.push(points[points.length - 1]);

  return sampled;
}

export interface TrailBand {
  d: string;
  opacity: number;
}

/**
 * Builds the trail as filled ribbon bands of decreasing opacity.
 *
 * An SVG gradient fades along a bounding-box axis rather than along the path,
 * which looks wrong on a trail that loops back on itself, so the fade has to be
 * built from discrete pieces. Stroking those pieces doesn't work either: round
 * caps overhang into the neighbouring piece and double the alpha (visible
 * banding), while butt caps leave wedge gaps on the outside of every bend.
 *
 * Filling instead sidesteps both. Each vertex is offset along its own normal to
 * give left and right edges, and each band is closed by running up one edge and
 * back down the other. Neighbouring bands share their boundary vertices
 * exactly, so they tile with no overlap and no seam.
 */
export function fadedRibbon(
  points: GaugePoint[],
  bandCount: number,
  maxOpacity: number,
  width: number
): TrailBand[] {
  const total = points.length;
  if (total < 3) return [];

  const left: GaugePoint[] = [];
  const right: GaugePoint[] = [];
  const halfWidth = width / 2;
  let previousNormal = { x: 0, y: -1 };

  for (let i = 0; i < total; i++) {
    // Central difference, so the normal at a shared vertex is identical from
    // either side and the bands meet cleanly.
    const before = points[Math.max(0, i - 1)];
    const after = points[Math.min(total - 1, i + 1)];
    let tx = after.x - before.x;
    let ty = after.y - before.y;
    const length = Math.hypot(tx, ty);

    let normal: GaugePoint;
    if (length < 1e-6) {
      normal = previousNormal;
    } else {
      tx /= length;
      ty /= length;
      normal = { x: -ty, y: tx };
      previousNormal = normal;
    }

    left.push({ x: points[i].x + normal.x * halfWidth, y: points[i].y + normal.y * halfWidth });
    right.push({ x: points[i].x - normal.x * halfWidth, y: points[i].y - normal.y * halfWidth });
  }

  const perBand = Math.max(1, Math.floor((total - 1) / bandCount));
  const bands: TrailBand[] = [];
  const xy = (p: GaugePoint) => `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;

  for (let start = 0; start < total - 1; start += perBand) {
    const end = Math.min(total - 1, start + perBand);

    const outward: string[] = [];
    for (let i = start; i <= end; i++) outward.push(xy(left[i]));
    const back: string[] = [];
    for (let i = end; i >= start; i--) back.push(xy(right[i]));

    const progress = end / (total - 1);
    bands.push({
      d: `M ${outward.join(" L ")} L ${back.join(" L ")} Z`,
      // Squared so the tail disappears well before the head starts dimming.
      opacity: Number((maxOpacity * progress * progress).toFixed(3)),
    });
  }

  return bands;
}
