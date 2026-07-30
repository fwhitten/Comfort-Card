import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { fireEvent, type HomeAssistant } from "custom-card-helpers";

import type { ComfortCardConfig, ComfortCardEditorElement, ComfortState } from "./types";
import { DEFAULT_COMFORT, DEFAULT_COLORS, DEFAULT_ICONS, STATE_LABELS } from "./const";

const STATES: ComfortState[] = ["pleasant", "too_warm", "cold", "dry", "humid"];

const LABELS: Record<string, string> = {
  area: "Area",
  name: "Name (optional)",
  manual_entities: "Manually choose entities instead of an area",
  temperature_entity: "Temperature entity",
  humidity_entity: "Humidity entity",
  temp_min: "Comfort min (°)",
  temp_max: "Comfort max (°)",
  temp_outer_min: "Gauge min (°)",
  temp_outer_max: "Gauge max (°)",
  humidity_min: "Comfort min (%)",
  humidity_max: "Comfort max (%)",
  humidity_outer_min: "Gauge min (%)",
  humidity_outer_max: "Gauge max (%)",
  tap_action: "Tap action",
  hold_action: "Hold action",
};

function mainSchema(manual: boolean) {
  return [
    { name: "area", selector: { area: {} } },
    { name: "name", selector: { text: {} } },
    { name: "manual_entities", selector: { boolean: {} } },
    ...(manual
      ? [
          {
            name: "temperature_entity",
            selector: { entity: { domain: "sensor", device_class: "temperature" } },
          },
          {
            name: "humidity_entity",
            selector: { entity: { domain: "sensor", device_class: "humidity" } },
          },
        ]
      : []),
    {
      name: "thresholds",
      type: "expandable",
      title: "Comfort thresholds",
      flatten: true,
      schema: [
        {
          type: "grid",
          schema: [
            { name: "temp_min", selector: { number: { mode: "box", step: 0.5 } } },
            { name: "temp_max", selector: { number: { mode: "box", step: 0.5 } } },
            { name: "temp_outer_min", selector: { number: { mode: "box", step: 0.5 } } },
            { name: "temp_outer_max", selector: { number: { mode: "box", step: 0.5 } } },
            { name: "humidity_min", selector: { number: { mode: "box", step: 1 } } },
            { name: "humidity_max", selector: { number: { mode: "box", step: 1 } } },
            { name: "humidity_outer_min", selector: { number: { mode: "box", step: 1 } } },
            { name: "humidity_outer_max", selector: { number: { mode: "box", step: 1 } } },
          ],
        },
      ],
    },
    {
      name: "interactions",
      type: "expandable",
      title: "Interactions",
      flatten: true,
      schema: [
        { name: "tap_action", selector: { ui_action: {} } },
        { name: "hold_action", selector: { ui_action: {} } },
      ],
    },
  ];
}

@customElement("comfort-card-editor")
export class ComfortCardEditor extends LitElement implements ComfortCardEditorElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: ComfortCardConfig;

  public setConfig(config: ComfortCardConfig): void {
    this._config = config;
  }

  private _computeLabel = (schema: { name: string }): string => LABELS[schema.name] || schema.name;

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config) return;
    const newConfig: ComfortCardConfig = { ...this._config, ...ev.detail.value };
    fireEvent(this, "config-changed", { config: newConfig });
  }

  private _colorChanged(stateKey: ComfortState, mode: "light" | "dark", ev: Event): void {
    if (!this._config) return;
    const value = (ev.target as HTMLInputElement).value;
    const colors = { ...(this._config.colors || {}) };
    colors[stateKey] = { ...colors[stateKey], [mode]: value };
    const newConfig: ComfortCardConfig = { ...this._config, colors };
    fireEvent(this, "config-changed", { config: newConfig });
  }

  private _iconChanged(stateKey: ComfortState, ev: CustomEvent): void {
    if (!this._config) return;
    const icons = { ...(this._config.icons || {}), [stateKey]: ev.detail.value };
    const newConfig: ComfortCardConfig = { ...this._config, icons };
    fireEvent(this, "config-changed", { config: newConfig });
  }

  private _resetColors(): void {
    if (!this._config) return;
    const { colors, ...rest } = this._config;
    fireEvent(this, "config-changed", { config: rest });
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;

    const merged = { ...DEFAULT_COMFORT, ...this._config };
    const manual = !!this._config.manual_entities;

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${merged}
        .schema=${mainSchema(manual)}
        .computeLabel=${this._computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-expansion-panel outlined header="Appearance" class="appearance">
        <p class="hint">Card background colour and icon for each comfort state.</p>
        ${STATES.map((s) => {
          const color = { ...DEFAULT_COLORS[s], ...(this._config!.colors?.[s] || {}) };
          const icon = this._config!.icons?.[s] || DEFAULT_ICONS[s];
          return html`
            <div class="state-row">
              <div class="state-name">${STATE_LABELS[s]}</div>
              <ha-icon-picker
                .hass=${this.hass}
                .value=${icon}
                @value-changed=${(ev: CustomEvent) => this._iconChanged(s, ev)}
              ></ha-icon-picker>
              <label class="swatch">
                Light
                <input
                  type="color"
                  .value=${color.light}
                  @change=${(ev: Event) => this._colorChanged(s, "light", ev)}
                />
              </label>
              <label class="swatch">
                Dark
                <input
                  type="color"
                  .value=${color.dark}
                  @change=${(ev: Event) => this._colorChanged(s, "dark", ev)}
                />
              </label>
            </div>
          `;
        })}
        <mwc-button @click=${this._resetColors}>Reset colours & icons to defaults</mwc-button>
      </ha-expansion-panel>
    `;
  }

  static styles = css`
    ha-form {
      display: block;
      margin-bottom: 8px;
    }
    .appearance {
      display: block;
      margin-top: 8px;
    }
    .hint {
      color: var(--secondary-text-color);
      font-size: 13px;
      margin: 4px 0 12px;
    }
    .state-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 0;
    }
    .state-name {
      flex: 1;
      font-weight: 500;
    }
    ha-icon-picker {
      width: 160px;
    }
    .swatch {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .swatch input[type="color"] {
      width: 36px;
      height: 28px;
      border: none;
      background: none;
      padding: 0;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "comfort-card-editor": ComfortCardEditor;
  }
}
