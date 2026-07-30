import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  handleAction,
  hasConfigOrEntityChanged,
  type HomeAssistant,
  type LovelaceCard,
  type LovelaceCardEditor,
} from "custom-card-helpers";

import type { ComfortCardConfig, ComfortState, HomeAssistantWithRegistry, RegistryEntity } from "./types";
import { DEFAULT_COMFORT, DEFAULT_COLORS, DEFAULT_ICONS, STATE_LABELS, CARD_VERSION } from "./const";
import { computeComfort } from "./comfort-calc";
import "./comfort-card-editor";

console.info(
  `%c COMFORT-CARD %c v${CARD_VERSION} `,
  "color: white; background: #1c3829; font-weight: 700;",
  "color: #1c3829; background: white; font-weight: 700;"
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "comfort-card",
  name: "Room Comfort",
  description: "Shows a room's temperature/humidity comfort at a glance.",
  preview: true,
});

function findEntityForArea(
  hass: HomeAssistant & HomeAssistantWithRegistry,
  areaId: string,
  deviceClass: "temperature" | "humidity"
): string | undefined {
  const entities = Object.values(hass.entities || {}) as RegistryEntity[];
  const candidates = entities.filter((entity: RegistryEntity) => {
    if (entity.hidden || entity.disabled_by) return false;
    if (!entity.entity_id.startsWith("sensor.")) return false;
    const entityAreaId =
      entity.area_id || (entity.device_id ? hass.devices?.[entity.device_id]?.area_id : undefined);
    if (entityAreaId !== areaId) return false;
    const stateObj = hass.states[entity.entity_id];
    return stateObj?.attributes?.device_class === deviceClass;
  });
  return candidates[0]?.entity_id;
}

function formatNumber(value: number, decimals: number): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

@customElement("comfort-card")
export class ComfortCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant & HomeAssistantWithRegistry;

  @state() private _config?: ComfortCardConfig;

  private _holdTimer?: number;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("comfort-card-editor") as unknown as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<ComfortCardConfig> {
    return {
      type: "custom:comfort-card",
    };
  }

  public setConfig(config: ComfortCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    if (!config.area && !config.manual_entities) {
      throw new Error("Please select an area, or enable manual entity selection.");
    }
    if (config.manual_entities && (!config.temperature_entity || !config.humidity_entity)) {
      throw new Error("Please select both a temperature and a humidity entity.");
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 4;
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this._config) return false;
    return hasConfigOrEntityChanged(this as unknown as LovelaceCard, changedProps, false);
  }

  private get _temperatureEntity(): string | undefined {
    if (!this._config || !this.hass) return undefined;
    if (this._config.manual_entities || !this._config.area) {
      return this._config.temperature_entity;
    }
    return findEntityForArea(this.hass, this._config.area, "temperature") ?? this._config.temperature_entity;
  }

  private get _humidityEntity(): string | undefined {
    if (!this._config || !this.hass) return undefined;
    if (this._config.manual_entities || !this._config.area) {
      return this._config.humidity_entity;
    }
    return findEntityForArea(this.hass, this._config.area, "humidity") ?? this._config.humidity_entity;
  }

  private get _name(): string {
    if (this._config?.name) return this._config.name;
    if (this._config?.area && this.hass?.areas?.[this._config.area]) {
      return this.hass.areas[this._config.area].name;
    }
    return "Room Comfort";
  }

  private _handleAction(action: "tap" | "hold"): void {
    if (!this.hass || !this._config) return;
    handleAction(
      this as unknown as any,
      this.hass,
      { ...this._config, entity: this._temperatureEntity },
      action
    );
  }

  private _onPointerDown(): void {
    this._holdTimer = window.setTimeout(() => {
      this._holdTimer = undefined;
      this._handleAction("hold");
    }, 500);
  }

  private _onPointerUp(): void {
    if (this._holdTimer) {
      window.clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
      this._handleAction("tap");
    }
  }

  private _onPointerCancel(): void {
    if (this._holdTimer) {
      window.clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const tempEntityId = this._temperatureEntity;
    const humidityEntityId = this._humidityEntity;
    const tempState = tempEntityId ? this.hass.states[tempEntityId] : undefined;
    const humidityState = humidityEntityId ? this.hass.states[humidityEntityId] : undefined;

    const isDark = (this.hass.themes as any)?.darkMode ?? false;

    if (!tempState || !humidityState || tempState.state === "unavailable" || humidityState.state === "unavailable") {
      return html`
        <ha-card>
          <div class="unavailable">
            <ha-icon icon="mdi:thermometer-off"></ha-icon>
            <span>${this._name}: sensors unavailable</span>
          </div>
        </ha-card>
      `;
    }

    const temperature = parseFloat(tempState.state);
    const humidity = parseFloat(humidityState.state);

    const c = { ...DEFAULT_COMFORT, ...this._config };
    const comfort = computeComfort(
      temperature,
      humidity,
      { min: c.temp_min!, max: c.temp_max!, outerMin: c.temp_outer_min!, outerMax: c.temp_outer_max! },
      { min: c.humidity_min!, max: c.humidity_max!, outerMin: c.humidity_outer_min!, outerMax: c.humidity_outer_max! }
    );

    const state: ComfortState = comfort.state;
    const colorPair = { ...DEFAULT_COLORS[state], ...(this._config.colors?.[state] || {}) };
    const bgColor = isDark ? colorPair.dark : colorPair.light;
    const icon = this._config.icons?.[state] || DEFAULT_ICONS[state];

    const size = 220;
    const cx = size / 2;
    const cy = size / 2;
    const outerR = 92;
    const scale = outerR - 14;
    const innerR = Math.max(20, comfort.innerRadiusRatio * outerR);
    const dotX = cx + comfort.dotX * scale;
    const dotY = cy + comfort.dotY * scale;

    const tempUnit = tempState.attributes.unit_of_measurement || "°";
    const tempFormatted = formatNumber(temperature, 1);
    const [tempInt, tempDec] = tempFormatted.split(/[.,]/);
    const humidityFormatted = Math.round(humidity);

    return html`
      <ha-card
        style="background: ${bgColor}"
        class=${isDark ? "dark" : "light"}
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @pointercancel=${this._onPointerCancel}
        @pointerleave=${this._onPointerCancel}
      >
        <div class="header">
          <div class="name">${this._name}</div>
          <div class="state">
            <ha-icon .icon=${icon}></ha-icon>
            <span>${STATE_LABELS[state]}</span>
          </div>
        </div>

        <div class="gauge-label top">TOO WARM</div>
        <div class="gauge-row">
          <div class="gauge-label left">DRY</div>
          <svg viewBox="0 0 ${size} ${size}" class="gauge">
            <circle class="outer" cx=${cx} cy=${cy} r=${outerR}></circle>
            <circle class="inner" cx=${cx} cy=${cy} r=${innerR}></circle>
            <circle class="dot" cx=${dotX} cy=${dotY} r="9"></circle>
          </svg>
          <div class="gauge-label right">HUMID</div>
        </div>
        <div class="gauge-label bottom">COLD</div>

        <div class="footer">
          <div class="stat">
            <div class="stat-label">TEMPERATURE</div>
            <div class="stat-value">
              ${tempInt}${tempDec ? html`<span class="unit-deg">°</span><span class="stat-dec">.${tempDec}</span>` : html`<span class="unit-deg">${tempUnit}</span>`}
            </div>
          </div>
          <div class="stat">
            <div class="stat-label">HUMIDITY</div>
            <div class="stat-value">${humidityFormatted}<span class="unit-deg">%</span></div>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      display: block;
      padding: 20px 24px 24px;
      border-radius: var(--ha-card-border-radius, 12px);
      color: white;
      transition: background-color 0.3s ease-in-out;
      cursor: pointer;
      overflow: hidden;
    }

    .unavailable {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      color: var(--secondary-text-color);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .name {
      font-size: 22px;
      font-weight: 700;
    }

    .state {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 18px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .gauge-label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      opacity: 0.85;
      text-align: center;
    }

    .gauge-label.top {
      margin-bottom: 4px;
    }

    .gauge-label.bottom {
      margin-top: 4px;
    }

    .gauge-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }

    .gauge {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
    }

    .gauge .outer {
      fill: none;
      stroke: white;
      stroke-width: 2;
    }

    .gauge .inner {
      fill: rgba(255, 255, 255, 0.28);
    }

    .gauge .dot {
      fill: white;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .stat-label {
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      opacity: 0.85;
      margin-bottom: 4px;
    }

    .stat-value {
      font-size: 34px;
      font-weight: 700;
      line-height: 1;
    }

    .unit-deg {
      font-size: 16px;
      vertical-align: top;
    }

    .stat-dec {
      font-size: 20px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comfort-card": ComfortCard;
  }
}
