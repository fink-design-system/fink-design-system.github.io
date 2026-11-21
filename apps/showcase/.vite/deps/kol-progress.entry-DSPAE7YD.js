import {
  maxProp,
  unitProp
} from "./chunk-7ADCU3GL.js";
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
  normalizeString,
  resolveFcProps,
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

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-progress.entry.js
var progressVariantOptions = ["bar", "cycle"];
var variantProgressProp = createPropDefinition("variant", "bar", (value) => {
  const str = normalizeString(value);
  if (progressVariantOptions.includes(str)) {
    return str;
  }
  throw new Error(`Invalid progress variant: ${str}`);
}, () => true);
var progressPropsConfig = {
  optional: [labelLangSegmentsProp, unitProp, variantProgressProp],
  required: [maxProp, clampedNumberValueProp]
};
var FULL_CIRCLE = 342;
var progressBem = bem.forBlock("kol-progress");
var CycleSvg = ({ max, value }) => h("svg", { width: "100", viewBox: "0 0 120 120", xmlns: "http://www.w3.org/2000/svg" }, h("circle", { class: progressBem("cycle-background"), cx: "60", cy: "60", r: "54.5", fill: "currentColor", stroke: "currentColor", "stroke-width": "8" }), h("circle", { class: progressBem("cycle-whitespace"), cx: "60", cy: "60", r: "59", fill: "currentColor", stroke: "currentColor", "stroke-width": "3" }), h("circle", { class: progressBem("cycle-border"), cx: "60", cy: "60", r: "59", fill: "currentColor", stroke: "currentColor", "stroke-width": "1" }), h("circle", { class: progressBem("cycle-whitespace"), cx: "60", cy: "60", r: "51", fill: "currentColor", stroke: "currentColor", "stroke-width": "1" }), h("circle", { class: progressBem("cycle-border"), cx: "60", cy: "60", r: "50", fill: "currentColor", stroke: "currentColor", "stroke-width": "1" }), h("circle", { class: progressBem("cycle-progress"), fill: "currentColor", stroke: "currentColor", "stroke-linecap": "round", "stroke-dasharray": `${Math.round(value / max * FULL_CIRCLE)}px ${FULL_CIRCLE}px`, "stroke-width": "6", cx: "60", cy: "60", r: "54.5" }));
var BarSvg = ({ max, value }) => {
  const percentage = 100 * (value / max);
  return h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "100%", height: "12", overflow: "visible" }, h("rect", { class: progressBem("bar-background"), x: "1", y: "1", height: "11", rx: "5", fill: "currentColor", stroke: "currentColor", "stroke-width": "3", width: "100%" }), h("rect", { class: progressBem("bar-border"), x: "1", y: "1", height: "11", rx: "5", fill: "currentColor", stroke: "currentColor", "stroke-width": "1", width: "100%" }), h("rect", { class: progressBem("bar-progress"), x: "3", y: "3", height: "7", rx: "3.5", fill: "currentColor", stroke: "currentColor", "stroke-width": "3", style: { width: `calc(${percentage}% - 4px)` } }));
};
var createProgressSVG = (variant, max, value) => {
  switch (variant) {
    case "cycle":
      return h(CycleSvg, { max, value });
    case "bar":
      return h(BarSvg, { max, value });
    default:
      throw new Error(`Progress variant ${variant} not implemented.`);
  }
};
var ProgressFC = (props) => {
  const { label, max, unit, value, variant, liveValue } = resolveFcProps(progressPropsConfig, props);
  const isPercentage = unit === "%";
  const liveProgressValue = isPercentage ? `${Math.round(liveValue / max * 100)}` : liveValue;
  const displayValue = isPercentage ? Math.round(value / max * 100) : value;
  const valueColumnWidth = `${`${(isPercentage ? 100 : max) + 1}`.length}ch`;
  const liveValueText = isPercentage ? translate("kol-live-value", { placeholders: { value: String(liveProgressValue), unit } }) : translate("kol-live-value-bounded", { placeholders: { value: String(liveProgressValue), max: String(max), unit } });
  return h(BemRootNodeFC, { block: "kol-progress" }, h("div", { "aria-hidden": "true", class: progressBem(variant === "cycle" ? "cycle" : "bar") }, variant === "bar" && label && h("div", { class: progressBem("bar-label") }, renderLabelWithLang(label)), createProgressSVG(variant, max, value), variant === "cycle" && h("div", { class: progressBem("cycle-text") }, label && h("div", { class: progressBem("cycle-label") }, renderLabelWithLang(label)), h("div", { class: progressBem("cycle-value") }, `${displayValue} ${unit}`)), variant === "bar" && h("div", { class: progressBem("bar-value"), style: { width: valueColumnWidth } }, displayValue), variant === "bar" && h("div", { class: progressBem("bar-unit") }, unit)), h("progress", { "aria-busy": value < max ? "true" : "false", "aria-label": trimLabel(label) || translate("kol-progress"), class: "visually-hidden", max, value }), h("span", { "aria-live": "polite", "aria-relevant": "removals text", class: "visually-hidden" }, liveValueText));
};
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   .kol-progress {     --color-bar: var(--kol-progress-color-bar, #0075ff);   }   .kol-progress__bar {     display: grid;     align-items: center;     grid-template-areas: "LABEL LABEL LABEL" "BAR VALUE UNIT";     grid-template-columns: 1fr auto;   }   .kol-progress__bar-label {     grid-column-end: 2;     grid-area: LABEL;   }   .kol-progress__bar svg {     grid-area: BAR;   }   .kol-progress__bar-value {     grid-area: VALUE;     text-align: right;   }   .kol-progress__bar-unit {     grid-area: UNIT;   }   .kol-progress__bar-border {     fill: transparent;     stroke: black;   }   .kol-progress__bar-background {     fill: white;     stroke: white;   }   .kol-progress__bar-progress {     fill: var(--color-bar);     stroke: transparent;   }   @media (prefers-reduced-motion: no-preference) {     .kol-progress__bar-progress {       transition: 250ms ease-in-out 50ms;     }   }   .kol-progress__cycle {     display: grid;     align-content: center;     justify-items: center;     grid-template-areas: "ALL";     grid-template-columns: auto;   }   .kol-progress__cycle > * {     grid-area: ALL;   }   .kol-progress__cycle-text {     display: flex;     flex-direction: column;     justify-content: center;     font-size: x-small;     text-align: center;   }   .kol-progress__cycle-text * {     background-color: white;   }   .kol-progress__cycle-background {     fill: transparent;     stroke: white;   }   .kol-progress__cycle-border {     fill: transparent;     stroke: black;   }   .kol-progress__cycle-whitespace {     fill: transparent;     stroke: white;   }   .kol-progress__cycle-progress {     transform: rotate(-90deg);     transform-origin: 50% 50%;     fill: transparent;     stroke: var(--color-bar);   }   @media (prefers-reduced-motion: no-preference) {     .kol-progress__cycle-progress {       transition: 250ms ease-in-out 50ms;     }   } }`;
var KolProgress = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolProgress)
      registerInstance(this, hostRef);
    this.liveValue = 0;
    this.propsConfig = progressPropsConfig;
    this._label = void 0;
    this._unit = void 0;
    this._variant = void 0;
  }
  watchLabel(value) {
    labelLangSegmentsProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  watchMax(value) {
    maxProp.apply(value, (v) => {
      this.setRenderProp("max", v);
      this.watchValue(this.getRawProp("value"));
    });
  }
  watchUnit(value) {
    unitProp.apply(value, (v) => this.setRenderProp("unit", v));
  }
  watchValue(value) {
    this.setRawProp("value", value);
    clampedNumberValueProp.apply(value, (v) => {
      this.setRenderProp("value", v);
    }, { min: 0, max: this.getRenderProp("max") });
  }
  watchVariant(value) {
    variantProgressProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  connectedCallback() {
    this.startLiveValueInterval();
  }
  componentWillLoad() {
    labelLangSegmentsProp.apply(this._label, (v) => this.setRenderProp("label", v), this.isRequired("label"));
    maxProp.apply(this._max, (v) => {
      this.setRenderProp("max", v);
      this.watchValue(this.getRawProp("value"));
    });
    unitProp.apply(this._unit, (v) => this.setRenderProp("unit", v));
    this.watchValue(this._value);
    variantProgressProp.apply(this._variant, (v) => this.setRenderProp("variant", v));
    this.setState("liveValue", this.getRenderProp("value"));
  }
  disconnectedCallback() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = void 0;
    }
  }
  startLiveValueInterval() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      const value = this.getRenderProp("value");
      this.setState("liveValue", value);
    }, 5e3);
  }
  render() {
    return h(Host, { key: "28feb371878c4752f632384d8ae056924bcee1a6" }, h(ProgressFC, { key: "3371391ceac0c5940d67445c8cf5ce2a057a7fee", label: this.getRenderProp("label"), max: this.getRenderProp("max"), unit: this.getRenderProp("unit"), value: this.getRenderProp("value"), variant: this.getRenderProp("variant"), liveValue: this.liveValue }));
  }
  static get watchers() {
    return {
      "_label": [{
        "watchLabel": 0
      }],
      "_max": [{
        "watchMax": 0
      }],
      "_unit": [{
        "watchUnit": 0
      }],
      "_value": [{
        "watchValue": 0
      }],
      "_variant": [{
        "watchVariant": 0
      }]
    };
  }
};
KolProgress.style = {
  default: defaultStyleCss()
};
export {
  KolProgress as kol_progress
};
//# sourceMappingURL=kol-progress.entry-DSPAE7YD.js.map
