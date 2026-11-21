import {
  hasCloserProp
} from "./chunk-7OTVGI43.js";
import {
  AlertFC
} from "./chunk-U3F5DQBF.js";
import {
  levelProp
} from "./chunk-AXVYILGE.js";
import "./chunk-Q4L7LM2W.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
import "./chunk-3C6UB25G.js";
import "./chunk-JIRF5MWS.js";
import "./chunk-FGYUAXNO.js";
import "./chunk-7Q2QTJQF.js";
import "./chunk-7C3Y25NJ.js";
import "./chunk-MIXJLZBB.js";
import {
  createCtaRef
} from "./chunk-VFFG6S5V.js";
import {
  createUniqueId,
  nonce
} from "./chunk-FQ2Y4FDM.js";
import "./chunk-SESBZTFK.js";
import "./chunk-ZVS5ACKA.js";
import "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import "./chunk-7UI7W6EF.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import {
  labelLangSegmentsProp
} from "./chunk-QVVQWVZC.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  createCallbacksPropDefinition,
  createPropDefinition,
  normalizeBoolean,
  normalizeString
} from "./chunk-KPGE6Z2R.js";
import "./chunk-MQNHCCSC.js";
import {
  Host,
  getElement,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-alert.entry.js
var alertTypeOptions = ["default", "info", "success", "warning", "error"];
var alertVariantOptions = ["card", "msg"];
var alertProp = createPropDefinition("alert", false, normalizeBoolean);
var alertCallbacksProp = createCallbacksPropDefinition();
var alertTypeProp = createPropDefinition("type", "default", (value) => {
  const str = normalizeString(value);
  if (alertTypeOptions.includes(str)) {
    return str;
  }
  throw new Error(`Invalid alert type: ${str}`);
}, () => true);
var alertVariantProp = createPropDefinition("variant", "msg", (value) => {
  const str = normalizeString(value);
  if (alertVariantOptions.includes(str)) {
    return str;
  }
  throw new Error(`Invalid alert variant: ${str}`);
}, () => true);
var alertPropsConfig = {
  optional: [alertCallbacksProp, alertProp, alertTypeProp, alertVariantProp, hasCloserProp, labelLangSegmentsProp, levelProp]
};
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   } }`;
var KolAlert = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolAlert)
      registerInstance(this, hostRef);
    this.headingId = createUniqueId("alert-heading");
    this.closerAriaDescriptionId = nonce();
    this.showAlert = false;
    this.translateCloseAlert = translate("kol-close-alert");
    this.closerRef = createCtaRef();
    this.closerTooltipBehavior = new TooltipBehavior(this.stateAccess);
    this.propsConfig = alertPropsConfig;
    this._alert = false;
    this._hasCloser = false;
    this._label = void 0;
    this._level = 0;
    this._on = void 0;
    this._type = "default";
    this._variant = "msg";
    this.handleAlertTimeout = () => {
      this.watchAlert(false);
    };
    this.handleCloserClick = (event) => {
      var _a, _b;
      event.stopPropagation();
      this.closerTooltipBehavior.hideTooltip();
      (_b = (_a = this.getRenderProp("on")).onClose) === null || _b === void 0 ? void 0 : _b.call(_a, new Event("Close"));
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.close);
      }
    };
  }
  watchAlert(value) {
    alertProp.apply(value, (v) => {
      this.showAlert = v;
      this.syncAlertEffects(v);
    });
  }
  watchHasCloser(value) {
    hasCloserProp.apply(value, (v) => this.setRenderProp("hasCloser", v));
  }
  watchLabel(value) {
    labelLangSegmentsProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  watchLevel(value) {
    levelProp.apply(value, (v) => this.setRenderProp("level", v));
  }
  watchOn(value) {
    alertCallbacksProp.apply(value, (v) => this.setRenderProp("on", v));
  }
  watchType(value) {
    alertTypeProp.apply(value, (v) => this.setRenderProp("type", v));
  }
  watchVariant(value) {
    alertVariantProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  componentWillLoad() {
    this.watchAlert(this._alert);
    this.watchHasCloser(this._hasCloser);
    this.watchLabel(this._label);
    this.watchLevel(this._level);
    this.watchOn(this._on);
    this.watchType(this._type);
    this.watchVariant(this._variant);
    this.closerTooltipBehavior.componentWillLoad({ label: this.translateCloseAlert });
  }
  componentDidRender() {
    if (this.closerRef.el) {
      this.closerTooltipBehavior.syncListeners(void 0, this.closerRef.el, true);
    }
  }
  disconnectedCallback() {
    this.closerTooltipBehavior.destroy();
    this.syncAlertEffects(false);
  }
  syncAlertEffects(active) {
    clearTimeout(this.alertTimeout);
    if (!active) {
      return;
    }
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      const ua = navigator.userActivation;
      const hasGesture = (ua === null || ua === void 0 ? void 0 : ua.isActive) || (ua === null || ua === void 0 ? void 0 : ua.hasBeenActive);
      if (hasGesture && matchMedia("(any-pointer: coarse)").matches) {
        try {
          navigator.vibrate([100, 75, 100, 75, 100]);
        } catch (_a) {
        }
      }
    }
    this.alertTimeout = setTimeout(() => this.handleAlertTimeout(), 1e4);
  }
  render() {
    return h(Host, { key: "ce55315b0678fff0752a03d4b5476d9ce651a8b4" }, h(AlertFC, { key: "09c11fd71d7d740033b93b1e85572b47bb896b82", alert: this.showAlert, handleCloserClick: this.handleCloserClick, closerAriaDescriptionId: this.closerAriaDescriptionId, hasCloser: this.getRenderProp("hasCloser"), headingId: this.headingId, label: this.getRenderProp("label"), level: this.getRenderProp("level"), refCloserButton: this.closerRef, refCloserTooltip: this.closerTooltipBehavior.setTooltipElementRef, type: this.getRenderProp("type"), variant: this.getRenderProp("variant") }, h("slot", { key: "0d16b52af889190054a28d16736382fee9e67f22" })));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_alert": [{
        "watchAlert": 0
      }],
      "_hasCloser": [{
        "watchHasCloser": 0
      }],
      "_label": [{
        "watchLabel": 0
      }],
      "_level": [{
        "watchLevel": 0
      }],
      "_on": [{
        "watchOn": 0
      }],
      "_type": [{
        "watchType": 0
      }],
      "_variant": [{
        "watchVariant": 0
      }]
    };
  }
};
KolAlert.style = {
  default: defaultStyleCss()
};
export {
  KolAlert as kol_alert
};
//# sourceMappingURL=kol-alert.entry-73ZTSRBC.js.map
