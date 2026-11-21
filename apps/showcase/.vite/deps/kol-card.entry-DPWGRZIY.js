import {
  CardFC,
  cardCallbacksProp,
  cardPropsConfig,
  resolveCardCloseButtonProps
} from "./chunk-LWHH35DI.js";
import {
  linkTargetProp
} from "./chunk-ETC363DC.js";
import {
  hrefProp
} from "./chunk-U2POW5WN.js";
import {
  hasCloserProp
} from "./chunk-7OTVGI43.js";
import {
  levelProp
} from "./chunk-AXVYILGE.js";
import "./chunk-Q4L7LM2W.js";
import "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import "./chunk-AIH4BWIT.js";
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
  createCtaRef,
  delegateClick,
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
import {
  labelLangSegmentsProp
} from "./chunk-QVVQWVZC.js";
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
import "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-card.entry.js
var BaseCardWebComponent = class extends BaseWebComponent {
  constructor() {
    super(...arguments);
    this.ctaRef = createCtaRef();
    this.closeButtonRef = createCtaRef();
    this.tooltipBehavior = new TooltipBehavior(this.stateAccess);
    this.propsConfig = cardPropsConfig;
    this.handleClose = () => {
      var _a, _b;
      this.tooltipBehavior.hideTooltip();
      (_b = (_a = this.getRenderProp("on")).onClose) === null || _b === void 0 ? void 0 : _b.call(_a, new Event("Close"));
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.close);
      }
    };
    this.handleFocus = (event) => {
      var _a, _b;
      (_b = (_a = this.getRenderProp("on")).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.focus);
      }
    };
    this.handleBlur = (event) => {
      var _a, _b;
      (_b = (_a = this.getRenderProp("on")).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.blur);
      }
    };
  }
  initCardCloseButton() {
    this.closeButtonProps = resolveCardCloseButtonProps(this.host);
    this.tooltipBehavior.componentWillLoad({
      label: this.closeButtonProps.label,
      align: this.closeButtonProps.tooltipAlign
    });
  }
  syncTooltipListeners() {
    if (this.closeButtonRef.el) {
      this.tooltipBehavior.syncListeners(void 0, this.closeButtonRef.el, true);
    }
  }
  destroyTooltipBehavior() {
    this.tooltipBehavior.destroy();
  }
  applyHasCloser(value) {
    hasCloserProp.apply(value, (v) => this.setRenderProp("hasCloser", v));
  }
  applyHref(value) {
    hrefProp.apply(value, (v) => this.setRenderProp("href", v), this.isRequired("href"));
  }
  applyLabel(value) {
    labelLangSegmentsProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  applyLevel(value) {
    levelProp.apply(value, (v) => this.setRenderProp("level", v));
  }
  applyOn(value) {
    cardCallbacksProp.apply(value, (v) => this.setRenderProp("on", v));
  }
  applyTarget(value) {
    linkTargetProp.apply(value, (v) => this.setRenderProp("target", v));
  }
  renderCardFC() {
    return h(CardFC, { ariaDescriptionId: this.getState("ariaDescriptionId"), closeButtonProps: this.closeButtonProps, handleBlur: this.handleBlur, handleClose: this.handleClose, handleFocus: this.handleFocus, hasCloser: this.getRenderProp("hasCloser"), headingId: this.getState("headingId"), href: this.getRenderProp("href"), label: this.getRenderProp("label"), level: this.getRenderProp("level"), on: this.getRenderProp("on"), refCloseButton: this.closeButtonRef, refCta: this.ctaRef, refTooltip: this.tooltipBehavior.setTooltipElementRef, target: this.getRenderProp("target") }, this.renderSlot());
  }
};
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-card .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-card :host {     display: inline-block;   }   .kol-card .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-card .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-card .kol-button__interactive-element::before {     content: "​";   }   .kol-card .kol-button__text {     flex: 1 0 100%;   }   .kol-card .kol-button {        }   .kol-card .kol-button__tooltip {     height: 0;   }   .kol-card .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-card .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-card {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     display: grid;     height: 100%;     overflow: visible;     grid-template-areas: "header  close" "content content";     grid-template-columns: 1fr min-content;     grid-template-rows: min-content 1fr;   }   .kol-card__header {     align-self: start;     grid-area: header;   }   .kol-card__content {     align-self: stretch;     grid-area: content;   }   .kol-card__close-button {          position: relative;     z-index: 1;     grid-area: close;   }   .kol-card:has(.kol-card__link) {     position: relative;   }   .kol-card__link::after {     position: absolute;     inset: 0;     content: "";     cursor: pointer;   } }`;
var KolCard = class extends BaseCardWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolCard)
      registerInstance(this, hostRef);
    this.ariaDescriptionId = nonce();
    this.headingId = createUniqueId("card-heading");
    this._hasCloser = false;
    this._href = void 0;
    this._level = 0;
    this._on = void 0;
    this._target = void 0;
  }
  watchHasCloser(value) {
    this.applyHasCloser(value);
  }
  watchHref(value) {
    this.applyHref(value);
  }
  watchLabel(value) {
    this.applyLabel(value);
  }
  watchLevel(value) {
    this.applyLevel(value);
  }
  watchOn(value) {
    this.applyOn(value);
  }
  watchTarget(value) {
    this.applyTarget(value);
  }
  focus(options) {
    return Promise.resolve();
  }
  click() {
    return Promise.resolve();
  }
  componentWillLoad() {
    this.initCardCloseButton();
    this.watchHasCloser(this._hasCloser);
    this.watchHref(this._href);
    this.watchLabel(this._label);
    this.watchLevel(this._level);
    this.watchOn(this._on);
    this.watchTarget(this._target);
  }
  componentDidRender() {
    this.syncTooltipListeners();
  }
  disconnectedCallback() {
    this.destroyTooltipBehavior();
  }
  renderSlot() {
    return h("slot", null);
  }
  render() {
    return h(Host, { key: "916261d714a813041360e0b82ffa1d3fc26d56e8" }, this.renderCardFC());
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_hasCloser": [{
        "watchHasCloser": 0
      }],
      "_href": [{
        "watchHref": 0
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
      "_target": [{
        "watchTarget": 0
      }]
    };
  }
};
__decorate([
  delegateFocus("ctaRef")
], KolCard.prototype, "focus", null);
__decorate([
  delegateClick("ctaRef")
], KolCard.prototype, "click", null);
KolCard.style = {
  default: defaultStyleCss()
};
export {
  KolCard as kol_card
};
//# sourceMappingURL=kol-card.entry-DPWGRZIY.js.map
