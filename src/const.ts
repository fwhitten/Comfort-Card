import type { ComfortState, ComfortColorPair } from "./types";

export const CARD_VERSION = "0.1.0";

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

export const DEFAULT_COLORS: Record<ComfortState, ComfortColorPair> = {
  pleasant: { dark: "#1c3829", light: "#dcecdf" },
  too_warm: { dark: "#4a2416", light: "#f6dcc9" },
  cold: { dark: "#17324c", light: "#d3e4f2" },
  dry: { dark: "#4a3c14", light: "#f2e6bf" },
  humid: { dark: "#123f42", light: "#cde9ea" },
};

export const DEFAULT_ICONS: Record<ComfortState, string> = {
  pleasant: "mdi:emoticon-happy-outline",
  too_warm: "mdi:thermometer-high",
  cold: "mdi:thermometer-low",
  dry: "mdi:water-percent-alert",
  humid: "mdi:water-percent",
};

export const STATE_LABELS: Record<ComfortState, string> = {
  pleasant: "Pleasant",
  too_warm: "Too Warm",
  cold: "Cold",
  dry: "Dry",
  humid: "Humid",
};
