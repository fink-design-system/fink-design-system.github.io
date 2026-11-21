import {
  maxProp,
  unitProp
} from "./chunk-7ADCU3GL.js";
import {
  orientationProp
} from "./chunk-E2FZTTZB.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import {
  renderLabelWithLang
} from "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import "./chunk-7UI7W6EF.js";
import {
  labelLangSegmentsProp
} from "./chunk-QVVQWVZC.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  clampedNumberValueProp,
  createPropDefinition,
  normalizeNumber,
  trimLabel
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  Host,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-meter.entry.js
var highProp = createPropDefinition("high", 0, normalizeNumber);
var lowProp = createPropDefinition("low", 0, normalizeNumber);
var minProp = createPropDefinition("min", 0, normalizeNumber);
var optimumProp = createPropDefinition("optimum", 0, normalizeNumber);
var meterPropsConfig = {
  optional: [highProp, lowProp, minProp, optimumProp, orientationProp, unitProp],
  required: [clampedNumberValueProp, labelLangSegmentsProp, maxProp]
};
var meterBem = bem.forBlock("kol-meter");
function getMeterState(value, min, max, low, high, optimum) {
  const effectiveLow = low !== null && low !== void 0 ? low : min;
  const effectiveHigh = high !== null && high !== void 0 ? high : max;
  const effectiveOptimum = optimum !== null && optimum !== void 0 ? optimum : (min + max) / 2;
  const inLowRegion = value < effectiveLow;
  const inHighRegion = value > effectiveHigh;
  const inMidRegion = !inLowRegion && !inHighRegion;
  const optimumInLow = effectiveOptimum < effectiveLow;
  const optimumInHigh = effectiveOptimum > effectiveHigh;
  if (optimumInLow) {
    if (inLowRegion)
      return "optimum";
    if (inMidRegion)
      return "suboptimal";
    return "critical";
  } else if (optimumInHigh) {
    if (inHighRegion)
      return "optimum";
    if (inMidRegion)
      return "suboptimal";
    return "critical";
  } else {
    if (inMidRegion)
      return "optimum";
    return "suboptimal";
  }
}
var MeterFC = (props) => {
  const { high, label, low, max, min, optimum, orientation, unit, value } = props;
  const hasValue = value !== void 0 && value !== null;
  const isVertical = orientation === "vertical";
  const isPercentage = unit === "%";
  const displayValue = !hasValue ? "" : isPercentage ? max === min ? 0 : Math.round((value - min) / (max - min) * 100) : value;
  const state = getMeterState(hasValue ? value : min, min, max, low, high, optimum);
  const hasStateClassification = low !== void 0 || high !== void 0;
  let stateLabel = "";
  if (hasStateClassification) {
    if (state === "critical") {
      stateLabel = translate("kol-meter-state-critical");
    } else if (state === "optimum") {
      stateLabel = translate("kol-meter-state-optimum");
    } else {
      stateLabel = translate("kol-meter-state-suboptimal");
    }
  }
  const staticValueText = !hasValue ? "" : isPercentage ? translate("kol-live-value", { placeholders: { value: String(displayValue), unit } }) : translate("kol-live-value-bounded", { placeholders: { value: String(displayValue), max: String(max), unit } });
  const staticValueWithState = hasStateClassification ? `${staticValueText} – ${stateLabel}` : staticValueText;
  const charCount = max.toString().length > min.toString().length ? max.toString().length + "ch" : min.toString().length + "ch";
  return h(BemRootNodeFC, { block: "kol-meter", modifiers: { vertical: isVertical } }, h("div", { class: meterBem("bar") }, h("div", { class: meterBem("bar-label") }, renderLabelWithLang(label), hasStateClassification && h("span", { class: meterBem("bar-state", { [state]: true }) }, " – ", stateLabel)), h("div", { class: meterBem("bar-track") }, h("meter", { "aria-label": trimLabel(label), "aria-valuetext": staticValueWithState || void 0, high, low, max, min, optimum, value: hasValue ? value : void 0 })), h("span", { class: meterBem("value-unit") }, h("span", { class: meterBem("value"), style: { "min-width": charCount } }, displayValue), h("span", { class: meterBem("unit") }, unit))));
};
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   .kol-meter {     --color-optimal: var(--kol-meter-color-optimal, #2ea32e);     --color-suboptimal: var(--kol-meter-color-suboptimal, #c8a000);     --color-critical: var(--kol-meter-color-critical, #c00);     --vertical-height: var(--kol-meter-vertical-height, 128);     --horizontal-height: var(--kol-meter-horizontal-height, 12);   }   .kol-meter__bar {     display: grid;     align-items: center;     grid-template-areas: "label label" "bar value";     grid-template-columns: 1fr auto;   }   .kol-meter__bar-label {     grid-column-end: 2;     grid-area: label;   }   .kol-meter__bar-track {     display: flex;     min-width: 100%;     grid-area: bar;   }   .kol-meter__value-unit {     grid-area: value;   }   .kol-meter:not(.kol-meter--vertical) .kol-meter__value {     display: inline-block;     text-align: right;   }   .kol-meter--vertical {     min-height: 100%;   }   .kol-meter--vertical .kol-meter__bar {     min-height: 100%;     align-items: end;     justify-items: center;     grid-template-areas: "label" "bar" "value";     grid-template-columns: 1fr;     grid-template-rows: min-content 1fr min-content;   }   .kol-meter--vertical .kol-meter__bar-label {     text-align: center;   }   .kol-meter--vertical .kol-meter__bar-track {     position: relative;     min-width: 0;     min-height: calc(var(--vertical-height) * 1rem / var(--kolibri-root-font-size, 16));     align-items: center;   }   .kol-meter--vertical .kol-meter__bar meter {     transform: rotate(-90deg);     transform-origin: left bottom;     position: absolute;     bottom: 0;     width: calc(var(--vertical-height) * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-meter {        }   .kol-meter meter {     width: 100%;     height: calc(var(--horizontal-height) * 1rem / var(--kolibri-root-font-size, 16));          -webkit-appearance: none;     -moz-appearance: none;     appearance: none;   }   .kol-meter {        }   .kol-meter meter::-webkit-meter-bar {     background: white;     height: calc(var(--horizontal-height) * 1rem / var(--kolibri-root-font-size, 16));     border: 1px solid black;   }   .kol-meter meter::-webkit-meter-optimum-value {     background: var(--color-optimal);   }   .kol-meter meter::-webkit-meter-suboptimum-value {     background: var(--color-suboptimal);   }   .kol-meter meter::-webkit-meter-even-less-good-value {     background: var(--color-critical);   }   .kol-meter {        }   @supports (selector(::-moz-meter-bar)) {     .kol-meter meter {       background: white;       border: 1px solid black;     }   }   .kol-meter meter::-moz-meter-bar {     background: var(--color-optimal);   }   .kol-meter meter:-moz-meter-sub-optimum::-moz-meter-bar {     background: var(--color-suboptimal);   }   .kol-meter meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {     background: var(--color-critical);   } }`;
var KolMeter = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolMeter)
      registerInstance(this, hostRef);
    this.propsConfig = meterPropsConfig;
    this._high = void 0;
    this._low = void 0;
    this._max = 1;
    this._min = 0;
    this._optimum = void 0;
    this._orientation = "horizontal";
    this._unit = "%";
  }
  watchHigh(value) {
    if (value === void 0) {
      this.unsetRenderProp("high");
    } else {
      highProp.apply(value, (v) => this.setRenderProp("high", v));
    }
  }
  watchLabel(value) {
    labelLangSegmentsProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  watchLow(value) {
    if (value === void 0) {
      this.unsetRenderProp("low");
    } else {
      lowProp.apply(value, (v) => this.setRenderProp("low", v));
    }
  }
  watchMax(value) {
    maxProp.apply(value, (v) => {
      this.setRenderProp("max", v);
      this.watchValue(this.getRawProp("value"));
    });
  }
  watchMin(value) {
    minProp.apply(value, (v) => {
      this.setRenderProp("min", v);
      this.watchValue(this.getRawProp("value"));
    });
  }
  watchOptimum(value) {
    if (value === void 0) {
      this.unsetRenderProp("optimum");
    } else {
      optimumProp.apply(value, (v) => this.setRenderProp("optimum", v));
    }
  }
  watchOrientation(value) {
    orientationProp.apply(value, (v) => this.setRenderProp("orientation", v));
  }
  watchUnit(value) {
    unitProp.apply(value, (v) => this.setRenderProp("unit", v));
  }
  watchValue(value) {
    this.setRawProp("value", value);
    clampedNumberValueProp.apply(value, (v) => {
      this.setRenderProp("value", v);
    }, { min: this.getRenderProp("min"), max: this.getRenderProp("max") });
  }
  componentWillLoad() {
    this.watchHigh(this._high);
    labelLangSegmentsProp.apply(this._label, (v) => this.setRenderProp("label", v), this.isRequired("label"));
    this.watchLow(this._low);
    maxProp.apply(this._max, (v) => {
      this.setRenderProp("max", v);
      this.watchValue(this.getRawProp("value"));
    });
    minProp.apply(this._min, (v) => {
      this.setRenderProp("min", v);
      this.watchValue(this.getRawProp("value"));
    });
    this.watchOptimum(this._optimum);
    orientationProp.apply(this._orientation, (v) => this.setRenderProp("orientation", v));
    unitProp.apply(this._unit, (v) => this.setRenderProp("unit", v));
    this.watchValue(this._value);
  }
  render() {
    return h(Host, { key: "af6db6e2a3fc3bb34ceb903276c17768ab7b615d" }, h(MeterFC, { key: "219ba24361c2a573de1bf039c92193fb8813e9a4", high: this.getRenderProp("high"), label: this.getRenderProp("label"), low: this.getRenderProp("low"), max: this.getRenderProp("max"), min: this.getRenderProp("min"), optimum: this.getRenderProp("optimum"), orientation: this.getRenderProp("orientation"), unit: this.getRenderProp("unit"), value: this.getRenderProp("value") }));
  }
  static get watchers() {
    return {
      "_high": [{
        "watchHigh": 0
      }],
      "_label": [{
        "watchLabel": 0
      }],
      "_low": [{
        "watchLow": 0
      }],
      "_max": [{
        "watchMax": 0
      }],
      "_min": [{
        "watchMin": 0
      }],
      "_optimum": [{
        "watchOptimum": 0
      }],
      "_orientation": [{
        "watchOrientation": 0
      }],
      "_unit": [{
        "watchUnit": 0
      }],
      "_value": [{
        "watchValue": 0
      }]
    };
  }
};
KolMeter.style = {
  default: defaultStyleCss()
};
export {
  KolMeter as kol_meter
};
//# sourceMappingURL=kol-meter.entry-IUYN4TJZ.js.map
