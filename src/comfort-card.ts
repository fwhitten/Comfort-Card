import { LitElement, html, svg, css, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  handleAction,
  type HomeAssistant,
  type LovelaceCard,
  type LovelaceCardEditor,
} from "custom-card-helpers";

import type {
  CardLayout,
  ComfortCardConfig,
  ComfortState,
  HomeAssistantWithRegistry,
  RegistryEntity,
} from "./types";
import {
  ARC_LABELS,
  CARD_VERSION,
  DEFAULT_COLORS,
  DEFAULT_COMFORT,
  DEFAULT_HISTORY_HOURS,
  HUMIDITY_ICON,
  MAX_HISTORY_HOURS,
  STATE_LABELS,
  TEMPERATURE_ICON,
} from "./const";
import { computeComfort, type AxisRange } from "./comfort-calc";
import { fadedRibbon, fetchTrail, simplify, smooth, type TrailBand } from "./history";
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

// Gauge geometry, in viewBox units.
const VIEW = 200;
const CENTER = VIEW / 2;
const RING_RADIUS = 84;
/** Keeps the dot (and trail) clear of the ring stroke at full deflection. */
const PLOT_RADIUS = 64;
const DOT_RADIUS = 11;

/** Half-width of the ring gap each label sits in, in degrees. */
const LABEL_GAPS = { top: 21, right: 25, bottom: 21, left: 19 };

const TRAIL_MIN_DISTANCE = 0.06;
const TRAIL_SAMPLES_PER_SEGMENT = 8;
/** Enough steps to read as a smooth fade, few enough that bands stay long
    relative to their width (short wide bands make the seams obvious). */
const TRAIL_BANDS = 36;
const TRAIL_MAX_OPACITY = 0.34;
const TRAIL_MIN_WIDTH = 10;
/** Kept under the dot's diameter so the dot hides the ribbon's flat head. */
const TRAIL_MAX_WIDTH = 19;

const HISTORY_REFRESH_MS = 5 * 60 * 1000;

/** Point on the ring; angles run clockwise from 12 o'clock. */
function pointOnRing(radius: number, degrees: number): [number, number] {
  const radians = (degrees * Math.PI) / 180;
  return [CENTER + radius * Math.sin(radians), CENTER - radius * Math.cos(radians)];
}

function arcPath(radius: number, from: number, to: number, clockwise = true): string {
  const [x0, y0] = pointOnRing(radius, from);
  const [x1, y1] = pointOnRing(radius, to);
  const sweep = clockwise ? 1 : 0;
  const delta = clockwise ? (to - from + 360) % 360 : (from - to + 360) % 360;
  const largeArc = delta > 180 ? 1 : 0;
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${x1.toFixed(
    2
  )} ${y1.toFixed(2)}`;
}

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
  @state() private _layout: CardLayout = "square";
  @state() private _trail: TrailBand[] = [];

  private _holdTimer?: number;
  private _resizeObserver?: ResizeObserver;
  private _historyTimer?: number;
  private _historyKey = "";
  private _historyPending = false;

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("comfort-card-editor") as unknown as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<ComfortCardConfig> {
    return { type: "custom:comfort-card" };
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
    return 6;
  }

  // Sections/grid layout (HA 2024.11+). These are defaults only: whatever the
  // user picks in the layout editor is stored in config.grid_options and must
  // win, otherwise the size sliders snap back on every re-render.
  public getGridOptions(): Record<string, number | string> {
    return {
      columns: 6,
      rows: 6,
      min_columns: 3,
      min_rows: 2,
      ...(this._config?.grid_options || {}),
    };
  }

  // Masonry/panel layout (pre-2024.11) still reads this.
  public getLayoutOptions(): Record<string, number> {
    return { grid_columns: 6, grid_min_columns: 3, grid_rows: 6, grid_min_rows: 2 };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    // Aspect ratio drives the layout, and CSS container size queries can't be
    // used for it: container-type: size needs a definite height, which HA's
    // auto-height grid mode never provides.
    this._resizeObserver = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box || !box.width || !box.height) return;
      this._layout = this._layoutFor(box.width, box.height);
    });
    this._resizeObserver.observe(this);
    this._historyTimer = window.setInterval(() => this._refreshHistory(true), HISTORY_REFRESH_MS);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    if (this._historyTimer) {
      window.clearInterval(this._historyTimer);
      this._historyTimer = undefined;
    }
  }

  /**
   * Picks a layout with hysteresis: the threshold to enter a layout is further
   * out than the threshold to leave it.
   *
   * In HA's auto-height mode the card's height comes from its content, so
   * switching layout (the header stacks or unstacks) changes the very height
   * that decided the layout. Symmetric thresholds let a card sitting near a
   * boundary flip back and forth forever; the dead zone stops that.
   */
  private _layoutFor(width: number, height: number): CardLayout {
    if (width < 240) return "vertical";

    const aspect = width / height;
    const current = this._layout;

    if (current === "horizontal") {
      return aspect < 1.15 ? "square" : "horizontal";
    }
    if (current === "vertical") {
      if (aspect >= 1.25) return "horizontal";
      return aspect > 0.95 ? "square" : "vertical";
    }
    if (aspect >= 1.25) return "horizontal";
    if (aspect <= 0.85) return "vertical";
    return "square";
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this._config) return false;
    if (
      changedProps.has("_config") ||
      changedProps.has("_layout") ||
      changedProps.has("_trail")
    ) {
      return true;
    }
    const oldHass = changedProps.get("hass") as (HomeAssistant & HomeAssistantWithRegistry) | undefined;
    if (!oldHass) return true;

    const tempEntity = this._temperatureEntity;
    const humidityEntity = this._humidityEntity;
    return (
      (tempEntity && oldHass.states[tempEntity] !== this.hass!.states[tempEntity]) ||
      (humidityEntity && oldHass.states[humidityEntity] !== this.hass!.states[humidityEntity]) ||
      oldHass.themes !== this.hass!.themes
    );
  }

  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
    if (changedProps.has("hass") || changedProps.has("_config")) {
      void this._refreshHistory();
    }
  }

  private get _historyHours(): number {
    const hours = this._config?.history_hours ?? DEFAULT_HISTORY_HOURS;
    return Math.max(0, Math.min(MAX_HISTORY_HOURS, hours));
  }

  private get _ranges(): { temp: AxisRange; humidity: AxisRange } {
    const c = { ...DEFAULT_COMFORT, ...this._config };
    return {
      temp: {
        min: c.temp_min!,
        max: c.temp_max!,
        outerMin: c.temp_outer_min!,
        outerMax: c.temp_outer_max!,
      },
      humidity: {
        min: c.humidity_min!,
        max: c.humidity_max!,
        outerMin: c.humidity_outer_min!,
        outerMax: c.humidity_outer_max!,
      },
    };
  }

  private async _refreshHistory(force = false): Promise<void> {
    const hours = this._historyHours;
    const tempEntity = this._temperatureEntity;
    const humidityEntity = this._humidityEntity;

    if (!this.hass || !hours || !tempEntity || !humidityEntity) {
      if (this._trail.length) this._trail = [];
      this._historyKey = "";
      return;
    }

    // Re-fetch only when the inputs change or the timer fires; hass updates on
    // every state change in the house and would otherwise hammer the recorder.
    const key = `${tempEntity}|${humidityEntity}|${hours}|${JSON.stringify(this._ranges)}`;
    if (!force && key === this._historyKey) return;
    if (this._historyPending) return;

    this._historyPending = true;
    this._historyKey = key;
    try {
      const { temp, humidity } = this._ranges;
      const raw = await fetchTrail(this.hass, tempEntity, humidityEntity, hours, temp, humidity);
      if (raw.length < 2) {
        this._trail = [];
        return;
      }

      const simplified = simplify(raw, TRAIL_MIN_DISTANCE);
      const smoothed = smooth(simplified, TRAIL_SAMPLES_PER_SEGMENT);
      const projected = smoothed.map((point) => ({
        x: CENTER + point.x * PLOT_RADIUS,
        y: CENTER + point.y * PLOT_RADIUS,
      }));
      this._trail = fadedRibbon(
        projected,
        TRAIL_BANDS,
        TRAIL_MAX_OPACITY,
        TRAIL_MIN_WIDTH,
        TRAIL_MAX_WIDTH
      );
    } finally {
      this._historyPending = false;
    }
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

  private _renderGauge(innerRadius: number, dotX: number, dotY: number): TemplateResult {
    const { top, right, bottom, left } = LABEL_GAPS;

    const ringArcs = [
      arcPath(RING_RADIUS, top, 90 - right),
      arcPath(RING_RADIUS, 90 + right, 180 - bottom),
      arcPath(RING_RADIUS, 180 + bottom, 270 - left),
      arcPath(RING_RADIUS, 270 + left, 360 - top),
    ];

    // Text runs along the path direction, so each label's arc is drawn in the
    // direction that keeps it upright: clockwise reads correctly everywhere
    // except the bottom, which is drawn anti-clockwise.
    const labelArcs = [
      { id: "arc-top", d: arcPath(RING_RADIUS, -top, top), label: ARC_LABELS.top },
      { id: "arc-right", d: arcPath(RING_RADIUS, 90 - right, 90 + right), label: ARC_LABELS.right },
      { id: "arc-bottom", d: arcPath(RING_RADIUS, 180 + bottom, 180 - bottom, false), label: ARC_LABELS.bottom },
      { id: "arc-left", d: arcPath(RING_RADIUS, 270 - left, 270 + left), label: ARC_LABELS.left },
    ];

    return html`
      <svg viewBox="0 0 ${VIEW} ${VIEW}" class="gauge" preserveAspectRatio="xMidYMid meet">
        <defs>
          ${labelArcs.map((arc) => svg`<path id=${arc.id} d=${arc.d} fill="none"></path>`)}
          <clipPath id="ring-clip">
            <circle cx=${CENTER} cy=${CENTER} r=${RING_RADIUS}></circle>
          </clipPath>
        </defs>

        ${ringArcs.map((d) => svg`<path class="ring" d=${d}></path>`)}

        <circle class="comfort-zone" cx=${CENTER} cy=${CENTER} r=${innerRadius}></circle>

        <g class="trail" clip-path="url(#ring-clip)">
          ${this._trail.map(
            (band) =>
              svg`<path d=${band.d} fill-opacity=${band.opacity}></path>`
          )}
        </g>

        <circle class="dot" cx=${dotX} cy=${dotY} r=${DOT_RADIUS}></circle>

        ${labelArcs.map(
          (arc) => svg`
            <text class="arc-label" dy="0.35em">
              <textPath href=${`#${arc.id}`} startOffset="50%" text-anchor="middle">
                ${arc.label}
              </textPath>
            </text>
          `
        )}
      </svg>
    `;
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    const tempEntityId = this._temperatureEntity;
    const humidityEntityId = this._humidityEntity;
    const tempState = tempEntityId ? this.hass.states[tempEntityId] : undefined;
    const humidityState = humidityEntityId ? this.hass.states[humidityEntityId] : undefined;

    const isDark = (this.hass.themes as any)?.darkMode ?? false;

    if (
      !tempState ||
      !humidityState ||
      tempState.state === "unavailable" ||
      humidityState.state === "unavailable"
    ) {
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

    const { temp: tempRange, humidity: humidityRange } = this._ranges;
    const comfort = computeComfort(temperature, humidity, tempRange, humidityRange);

    const state: ComfortState = comfort.state;
    const colorPair = { ...DEFAULT_COLORS[state], ...(this._config.colors?.[state] || {}) };
    const bgColor = isDark ? colorPair.dark : colorPair.light;

    const innerRadius = Math.max(12, comfort.innerRadiusRatio * RING_RADIUS);
    const dotX = CENTER + comfort.dotX * PLOT_RADIUS;
    const dotY = CENTER + comfort.dotY * PLOT_RADIUS;

    return html`
      <ha-card
        style="background: ${bgColor}"
        data-layout=${this._layout}
        @pointerdown=${this._onPointerDown}
        @pointerup=${this._onPointerUp}
        @pointercancel=${this._onPointerCancel}
        @pointerleave=${this._onPointerCancel}
      >
        <div class="header">
          <div class="name">${this._name}</div>
          <div class="state">${STATE_LABELS[state]}</div>
        </div>

        <div class="gauge-wrap">
          ${this._renderGauge(innerRadius, dotX, dotY)}
        </div>

        <div class="values">
          <div class="value">
            <ha-icon .icon=${TEMPERATURE_ICON}></ha-icon>
            <span>${formatNumber(temperature, 1)}°</span>
          </div>
          <div class="value">
            <ha-icon .icon=${HUMIDITY_ICON}></ha-icon>
            <span>${Math.round(humidity)}%</span>
          </div>
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    ha-card {
      container-type: inline-size;
      container-name: comfort-card;
      display: grid;
      height: 100%;
      box-sizing: border-box;
      padding: 16px 18px;
      gap: 8px;
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
      grid-area: header;
      min-width: 0;
    }

    .gauge-wrap {
      grid-area: gauge;
      /* Sized from width with an aspect ratio so it has an intrinsic height in
         auto-height mode; max-height then clamps it when the grid does supply
         a definite height. The SVG's preserveAspectRatio keeps the gauge round
         and centred if that clamp makes the box non-square. */
      aspect-ratio: 1;
      max-height: 100%;
      justify-self: center;
      align-self: center;
      min-height: 0;
    }

    .gauge {
      display: block;
      width: 100%;
      height: 100%;
    }

    .values {
      grid-area: values;
      min-width: 0;
    }

    .name {
      font-weight: 700;
      line-height: 1.2;
      font-size: clamp(15px, 7cqi, 26px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .state {
      font-weight: 700;
      line-height: 1.2;
      font-size: clamp(13px, 6cqi, 22px);
      color: rgba(255, 255, 255, 0.65);
      white-space: nowrap;
    }

    .value {
      display: flex;
      align-items: center;
      gap: 4px;
      font-weight: 700;
      line-height: 1.1;
      font-size: clamp(17px, 8cqi, 30px);
      white-space: nowrap;
    }

    .value ha-icon {
      --mdc-icon-size: 1em;
      color: rgba(255, 255, 255, 0.7);
      flex-shrink: 0;
    }

    .ring {
      fill: none;
      stroke: white;
      stroke-width: 2.2;
      stroke-linecap: round;
    }

    .comfort-zone {
      fill: rgba(255, 255, 255, 0.22);
    }

    /* Fill only. A hairline stroke to hide the anti-aliased seam backfires:
       bands are wider than they are long, so their shared edges are long and
       frequent, and the doubled stroke draws them as radial streaks. */
    .trail path {
      fill: white;
      stroke: none;
    }

    .dot {
      fill: white;
    }

    .arc-label {
      fill: white;
      font-size: 9.5px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }

    /* Wide and short: text stacks down the left, gauge fills the right. */
    ha-card[data-layout="horizontal"] {
      grid-template-columns: minmax(0, 1fr) auto;
      grid-template-rows: auto 1fr;
      grid-template-areas:
        "header gauge"
        "values gauge";
      column-gap: 12px;
    }

    ha-card[data-layout="horizontal"] .header {
      align-self: start;
    }

    ha-card[data-layout="horizontal"] .values {
      align-self: end;
    }

    ha-card[data-layout="horizontal"] .gauge-wrap {
      width: 46cqi;
    }

    ha-card[data-layout="square"],
    ha-card[data-layout="vertical"] {
      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: auto minmax(0, 1fr) auto;
      grid-template-areas:
        "header"
        "gauge"
        "values";
    }

    ha-card[data-layout="square"] .gauge-wrap,
    ha-card[data-layout="vertical"] .gauge-wrap {
      width: 100%;
    }

    /* Square: name and state share the top row. */
    ha-card[data-layout="square"] .header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
    }

    ha-card[data-layout="square"] .values,
    ha-card[data-layout="vertical"] .values {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comfort-card": ComfortCard;
  }
}
