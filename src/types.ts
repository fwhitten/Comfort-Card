import type { ActionConfig, LovelaceCardConfig, LovelaceCardEditor } from "custom-card-helpers";

export type ComfortState = "pleasant" | "too_warm" | "cold" | "dry" | "humid";

/** Chosen from the card's measured aspect ratio, not its width alone. */
export type CardLayout = "horizontal" | "square" | "vertical";

export interface ComfortColorPair {
  light: string;
  dark: string;
}

export interface ComfortCardConfig extends LovelaceCardConfig {
  type: string;
  area?: string;
  name?: string;
  manual_entities?: boolean;
  temperature_entity?: string;
  humidity_entity?: string;

  temp_min?: number;
  temp_max?: number;
  temp_outer_min?: number;
  temp_outer_max?: number;

  humidity_min?: number;
  humidity_max?: number;
  humidity_outer_min?: number;
  humidity_outer_max?: number;

  colors?: Partial<Record<ComfortState, Partial<ComfortColorPair>>>;

  /** 0 disables the trail; capped at 24. */
  history_hours?: number;

  tap_action?: ActionConfig;
  hold_action?: ActionConfig;

  /** Written by the HA layout editor when the user resizes the card. */
  grid_options?: Record<string, number | string>;
}

// The frontend `hass` object exposes these entity/device/area registry maps
// for all connected clients (used by tile/area cards); custom-card-helpers'
// HomeAssistant type predates this, so it's extended locally.
export interface RegistryEntity {
  entity_id: string;
  device_id?: string | null;
  area_id?: string | null;
  hidden?: boolean;
  disabled_by?: string | null;
}

export interface RegistryDevice {
  id: string;
  area_id?: string | null;
}

export interface RegistryArea {
  area_id: string;
  name: string;
}

export interface HomeAssistantWithRegistry {
  entities: Record<string, RegistryEntity>;
  devices: Record<string, RegistryDevice>;
  areas: Record<string, RegistryArea>;
}

export interface ComfortCardEditorElement extends LovelaceCardEditor {
  setConfig(config: ComfortCardConfig): void;
}
