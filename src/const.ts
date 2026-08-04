import type { ComfortState, ComfortColorPair } from "./types";

export const CARD_VERSION = "0.2.0";

export const DEFAULT_COMFORT = {
  temp_min: 20,
  temp_max: 24,
  temp_outer_min: 16,
  temp_outer_max: 28,
  humidity_min: 40,
  humidity_max: 60,
  humidity_outer_min: 20,
  humidity_outer_max: 80,
};

export const DEFAULT_HISTORY_HOURS = 0;
export const MAX_HISTORY_HOURS = 24;

// Light-mode colors are a brighter tint of the dark-mode color, but kept dark
// enough (relative luminance <= ~0.17) that white card text stays readable
// (WCAG AA, >= 4.5:1 contrast against white).
export const DEFAULT_COLORS: Record<ComfortState, ComfortColorPair> = {
  pleasant: { dark: "#1c3829", light: "#2f6b47" },
  too_warm: { dark: "#4a2416", light: "#8a4321" },
  cold: { dark: "#17324c", light: "#2d5a86" },
  dry: { dark: "#4a3c14", light: "#8a6f1f" },
  humid: { dark: "#123f42", light: "#1f6d72" },
};

export const STATE_LABELS: Record<ComfortState, string> = {
  pleasant: "Pleasant",
  too_warm: "Too warm",
  cold: "Cold",
  dry: "Dry",
  humid: "Humid",
};

/** Labels sitting in the gaps of the ring, at the four cardinal points. */
export const ARC_LABELS = {
  top: "WARM",
  right: "HUMID",
  bottom: "COLD",
  left: "DRY",
};

export const TEMPERATURE_ICON = "mdi:thermometer";
export const HUMIDITY_ICON = "mdi:water-percent";
