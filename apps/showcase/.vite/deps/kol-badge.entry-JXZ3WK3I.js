import {
  BadgeFC
} from "./chunk-CP5Z3MNR.js";
import {
  smartButtonProp
} from "./chunk-FEDQEKWE.js";
import {
  resolveButtonProps
} from "./chunk-AIH4BWIT.js";
import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
import "./chunk-3C6UB25G.js";
import {
  spanIconsProp
} from "./chunk-JIRF5MWS.js";
import "./chunk-FGYUAXNO.js";
import "./chunk-7Q2QTJQF.js";
import {
  labelWithExpertSlotProp
} from "./chunk-7C3Y25NJ.js";
import "./chunk-MIXJLZBB.js";
import {
  createCtaRef,
  delegateFocus
} from "./chunk-VFFG6S5V.js";
import {
  createUniqueId,
  nonce
} from "./chunk-FQ2Y4FDM.js";
import "./chunk-SESBZTFK.js";
import "./chunk-ZVS5ACKA.js";
import "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import {
  __decorate
} from "./chunk-7UI7W6EF.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import "./chunk-QVVQWVZC.js";
import {
  colorProp
} from "./chunk-Z7MYABXV.js";
import "./chunk-ONIQ4NI3.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import "./chunk-KPGE6Z2R.js";
import "./chunk-MQNHCCSC.js";
import {
  Host,
  getElement,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import {
  featureHint,
  objectObjectHandler,
  setEventTarget
} from "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-badge.entry.js
var badgePropsConfig = {
  required: [labelWithExpertSlotProp],
  optional: [colorProp, smartButtonProp, spanIconsProp]
};
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }    @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-badge {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     display: flex;     align-items: center;     justify-content: space-between;   }   .kol-badge > br {     user-select: none;   }   .kol-button {     background-color: transparent;     display: inline-block;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     margin: 0;     padding: 0;          text-align: center;        }   .kol-button__interactive-element {     border-style: none;     display: block;     border-width: medium;          font-weight: inherit;     font-style: inherit;     text-align: inherit;   }   .kol-button {        }   .kol-button__tooltip {     height: 0;   }   .kol-badge .kol-badge__smart-button {     width: auto;     order: 3;   } }`;
featureHint(`[KolBadge] Optimierung des _color-Properties (rgba, rgb, hex usw.).`);
var KolBadge = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolBadge)
      registerInstance(this, hostRef);
    this.labelId = createUniqueId("badge-label");
    this.ariaDescriptionId = nonce();
    this.ctaRef = createCtaRef();
    this.tooltipBehavior = new TooltipBehavior(this.stateAccess);
    this.propsConfig = badgePropsConfig;
    this._color = "#000";
    this._icons = void 0;
    this._smartButton = void 0;
    this.handleClick = (event) => {
      var _a;
      event.stopPropagation();
      this.tooltipBehavior.hideTooltip();
      const onClick = (_a = this.smartButtonProps) === null || _a === void 0 ? void 0 : _a.on.onClick;
      if (typeof onClick === "function") {
        setEventTarget(event, this.ctaRef.el);
        onClick(event, void 0);
      }
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.click);
      }
    };
    this.handleMouseDown = (event) => {
      var _a, _b, _c;
      (_c = (_a = this.smartButtonProps) === null || _a === void 0 ? void 0 : (_b = _a.on).onMouseDown) === null || _c === void 0 ? void 0 : _c.call(_b, event);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.mousedown);
      }
    };
    this.handleFocus = (event) => {
      var _a, _b, _c;
      (_c = (_a = this.smartButtonProps) === null || _a === void 0 ? void 0 : (_b = _a.on).onFocus) === null || _c === void 0 ? void 0 : _c.call(_b, event);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.focus);
      }
    };
    this.handleBlur = (event) => {
      var _a, _b, _c;
      (_c = (_a = this.smartButtonProps) === null || _a === void 0 ? void 0 : (_b = _a.on).onBlur) === null || _c === void 0 ? void 0 : _c.call(_b, event);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.blur);
      }
    };
  }
  watchColor(value) {
    colorProp.apply(value, (v) => this.setRenderProp("color", v));
  }
  watchIcons(value) {
    spanIconsProp.apply(value, (v) => this.setRenderProp("icons", v));
  }
  watchLabel(value) {
    labelWithExpertSlotProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  watchSmartButton(value) {
    this.applySmartButton(value);
  }
  focus(options) {
    return Promise.resolve();
  }
  componentWillLoad() {
    this.unsetRenderProp("smartButton");
    this.watchColor(this._color);
    this.watchIcons(this._icons);
    this.watchLabel(this._label);
    this.watchSmartButton(this._smartButton);
  }
  componentDidRender() {
    if (this.ctaRef.el) {
      this.tooltipBehavior.syncListeners(void 0, this.ctaRef.el, true);
    }
  }
  disconnectedCallback() {
    this.tooltipBehavior.destroy();
  }
  applySmartButton(value) {
    objectObjectHandler(value, () => {
      this.unsetRenderProp("smartButton");
      this.smartButtonProps = void 0;
      if (value !== void 0 && value !== null) {
        smartButtonProp.apply(value, (smartButton) => {
          this.setRenderProp("smartButton", smartButton);
          this.smartButtonProps = resolveButtonProps(Object.assign(Object.assign({}, smartButton), { _hideLabel: true, _ariaControls: this.labelId }), this.host);
          this.tooltipBehavior.componentWillLoad({
            label: this.smartButtonProps.label,
            align: this.smartButtonProps.tooltipAlign
          });
        });
      }
    });
  }
  render() {
    const smartButton = this.getRenderProp("smartButton");
    const resolvedButton = this.smartButtonProps;
    return h(Host, { key: "92a82608b8424d8b91480b7dd132afc12fec8717" }, h(BadgeFC, { key: "3a0ec94ab587dc7b6e49f2530ad61d7fb590b501", color: this.getRenderProp("color"), icons: this.getRenderProp("icons"), label: this.getRenderProp("label"), smartButton: typeof smartButton === "object" && smartButton !== null && resolvedButton !== void 0 ? {
      ariaDescriptionId: this.ariaDescriptionId,
      handleBlur: this.handleBlur,
      handleClick: this.handleClick,
      handleFocus: this.handleFocus,
      handleMouseDown: this.handleMouseDown,
      labelId: this.labelId,
      refSmartButton: this.ctaRef,
      refTooltip: this.tooltipBehavior.setTooltipElementRef,
      resolvedButton
    } : void 0 }));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_color": [{
        "watchColor": 0
      }],
      "_icons": [{
        "watchIcons": 0
      }],
      "_label": [{
        "watchLabel": 0
      }],
      "_smartButton": [{
        "watchSmartButton": 0
      }]
    };
  }
};
__decorate([
  delegateFocus("ctaRef")
], KolBadge.prototype, "focus", null);
KolBadge.style = {
  default: defaultStyleCss()
};
export {
  KolBadge as kol_badge
};
//# sourceMappingURL=kol-badge.entry-JXZ3WK3I.js.map
