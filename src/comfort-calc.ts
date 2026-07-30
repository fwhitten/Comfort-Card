import type { ComfortState } from "./types";

export interface AxisRange {
  min: number;
  max: number;
  outerMin: number;
  outerMax: number;
}

interface AxisResult {
  /** How many comfort-half-ranges the value is from the comfort center. >1 (or <-1) is outside comfort. */
  deviationRatio: number;
  /** Position on the gauge, -1..1, clamped to the outer circle edge. */
  positionRatio: number;
  /** Radius of the comfort (inner) circle as a fraction of the outer circle, 0..1. */
  radiusRatio: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function computeAxis(value: number, range: AxisRange): AxisResult {
  const center = (range.min + range.max) / 2;
  const comfortHalf = Math.max(0.0001, (range.max - range.min) / 2);
  const outerHalf = Math.max(0.0001, (range.outerMax - range.outerMin) / 2);

  return {
    deviationRatio: (value - center) / comfortHalf,
    positionRatio: clamp((value - center) / outerHalf, -1, 1),
    radiusRatio: clamp(comfortHalf / outerHalf, 0, 1),
  };
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
  const tempAxis = computeAxis(temperature, tempRange);
  const humidityAxis = computeAxis(humidity, humidityRange);

  const tempOutside = Math.abs(tempAxis.deviationRatio) > 1;
  const humidityOutside = Math.abs(humidityAxis.deviationRatio) > 1;

  let state: ComfortState;
  if (!tempOutside && !humidityOutside) {
    state = "pleasant";
  } else if (Math.abs(tempAxis.deviationRatio) >= Math.abs(humidityAxis.deviationRatio)) {
    state = tempAxis.deviationRatio > 0 ? "too_warm" : "cold";
  } else {
    state = humidityAxis.deviationRatio > 0 ? "humid" : "dry";
  }

  return {
    state,
    dotX: humidityAxis.positionRatio,
    dotY: -tempAxis.positionRatio,
    innerRadiusRatio: (tempAxis.radiusRatio + humidityAxis.radiusRatio) / 2,
  };
}
