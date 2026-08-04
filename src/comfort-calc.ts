import type { ComfortState } from "./types";

export interface AxisRange {
  min: number;
  max: number;
  outerMin: number;
  outerMax: number;
}

export interface GaugePoint {
  x: number;
  y: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** How many comfort-half-ranges the value sits from the comfort centre. */
function deviationRatio(value: number, range: AxisRange): number {
  const center = (range.min + range.max) / 2;
  const comfortHalf = Math.max(0.0001, (range.max - range.min) / 2);
  return (value - center) / comfortHalf;
}

/** Position along the gauge axis, -1..1, relative to the outer range. */
function positionRatio(value: number, range: AxisRange): number {
  const center = (range.min + range.max) / 2;
  const outerHalf = Math.max(0.0001, (range.outerMax - range.outerMin) / 2);
  return clamp((value - center) / outerHalf, -1, 1);
}

/** Radius of the comfort circle as a fraction of the outer circle. */
function radiusRatio(range: AxisRange): number {
  const comfortHalf = Math.max(0.0001, (range.max - range.min) / 2);
  const outerHalf = Math.max(0.0001, (range.outerMax - range.outerMin) / 2);
  return clamp(comfortHalf / outerHalf, 0, 1);
}

/**
 * Maps a temperature/humidity pair onto the gauge, as x/y in -1..1 where the
 * unit circle is the outer ring. Humidity runs left(dry) to right(humid) and
 * temperature runs bottom(cold) to top(warm).
 *
 * The magnitude is clamped radially, not just per-axis: clamping each axis
 * alone lets a reading that is extreme on both axes land at (1, 1), which is
 * sqrt(2) from the centre and would draw outside the ring.
 */
export function gaugePoint(
  temperature: number,
  humidity: number,
  tempRange: AxisRange,
  humidityRange: AxisRange
): GaugePoint {
  let x = positionRatio(humidity, humidityRange);
  let y = -positionRatio(temperature, tempRange);
  const length = Math.hypot(x, y);
  if (length > 1) {
    x /= length;
    y /= length;
  }
  return { x, y };
}

export interface ComfortResult {
  state: ComfortState;
  dotX: number;
  dotY: number;
  innerRadiusRatio: number;
}

export function computeComfort(
  temperature: number,
  humidity: number,
  tempRange: AxisRange,
  humidityRange: AxisRange
): ComfortResult {
  const tempDeviation = deviationRatio(temperature, tempRange);
  const humidityDeviation = deviationRatio(humidity, humidityRange);

  const tempOutside = Math.abs(tempDeviation) > 1;
  const humidityOutside = Math.abs(humidityDeviation) > 1;

  let state: ComfortState;
  if (!tempOutside && !humidityOutside) {
    state = "pleasant";
  } else if (Math.abs(tempDeviation) >= Math.abs(humidityDeviation)) {
    state = tempDeviation > 0 ? "too_warm" : "cold";
  } else {
    state = humidityDeviation > 0 ? "humid" : "dry";
  }

  const point = gaugePoint(temperature, humidity, tempRange, humidityRange);

  return {
    state,
    dotX: point.x,
    dotY: point.y,
    innerRadiusRatio: (radiusRatio(tempRange) + radiusRatio(humidityRange)) / 2,
  };
}
