import {
  CollapsibleFC,
  DEFAULT_COLLAPSIBLE_TRANSITION_MS,
  collapsibleCallbacksProp,
  collapsiblePropsConfig,
  createCollapsibleOpenAnimation,
  createCollapsibleToggleHandler
} from "./chunk-ZQ54ZFWS.js";
import {
  openProp
} from "./chunk-OJ2SEHMP.js";
import {
  levelProp
} from "./chunk-AXVYILGE.js";
import "./chunk-Q4L7LM2W.js";
import {
  createCtaRef,
  delegateClick,
  delegateFocus
} from "./chunk-VFFG6S5V.js";
import {
  createRelatedUniqueId,
  createUniqueId
} from "./chunk-FQ2Y4FDM.js";
import {
  disabledProp
} from "./chunk-SESBZTFK.js";
import "./chunk-ZVS5ACKA.js";
import "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import {
  __decorate
} from "./chunk-7UI7W6EF.js";
import "./chunk-TR6JQWDR.js";
import {
  labelLangSegmentsProp
} from "./chunk-QVVQWVZC.js";
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
  X
} from "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-details.entry.js
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } }   @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {      :host {     display: inline-block;   }   .kol-details {        }   .kol-details__heading {     display: flex;     min-height: var(--a11y-min-size);        }   .kol-details__heading:not([aria-disabled=true]) {     cursor: pointer;   }   .kol-details__heading {        }   .kol-details__heading::before {     content: "​";   }   .kol-details__heading {        }   .kol-details__heading > .kol-headline {     display: flex;     flex: 1;     margin: 0;     text-align: left;          font-weight: 400;   }   .kol-details__heading > .kol-headline > .kol-span {     flex: 1 0 100%;          align-items: flex-start;   }   @media (prefers-reduced-motion) {     .kol-details__wrapper-animation, .kol-details__wrapper {       transition: none !important;     }   }   .kol-details {        }   @media print {     .kol-details:not(.kol-details--open) .kol-details__wrapper-animation {       display: none;     }   }   .kol-details__wrapper {          transform: translateZ(0);     display: grid;     grid-template-columns: minmax(0, 1fr);     grid-template-rows: 0fr;     transition: grid-template-rows var(--collapsible-transition-duration, 0.3s);   }   .kol-details__wrapper-animation {     opacity: 0;     transform: scaleY(0);     transform-origin: top;     min-height: 0;          visibility: hidden;     transition: transform var(--collapsible-transition-duration, 0.3s), opacity var(--collapsible-transition-duration, 0.3s), visibility var(--collapsible-transition-duration, 0.3s);   }   .kol-details--open .kol-details__wrapper {     grid-template-rows: 1fr;   }   .kol-details--open .kol-details__wrapper-animation {     opacity: 1;     transform: scaleY(1);     visibility: visible;   }   .kol-details--open:focus-within {     position: relative;     z-index: 100;   }   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-details--open .kol-details__heading .kol-icon {     transform: rotate(90deg);   } }`;
var KolDetails = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolDetails)
      registerInstance(this, hostRef);
    this.detailsId = createUniqueId("details");
    this.controlId = createRelatedUniqueId(this.detailsId, "control");
    this.detailsOpen = false;
    this.expanded = false;
    this.headingId = createRelatedUniqueId(this.detailsId, "heading");
    this.transitionMs = DEFAULT_COLLAPSIBLE_TRANSITION_MS;
    this.ctaRef = createCtaRef(() => this.getRenderProp("disabled") === true);
    this.hasLoaded = false;
    this.openAnimation = createCollapsibleOpenAnimation({
      getTransitionMs: () => this.transitionMs,
      setDetailsOpen: (value) => this.detailsOpen = value,
      setExpanded: (value) => this.expanded = value
    });
    this.handleToggle = createCollapsibleToggleHandler({
      getHost: () => this.host,
      getOn: () => this.getRenderProp("on"),
      isDisabled: () => this.getRenderProp("disabled") === true,
      isOpen: () => this.getRenderProp("open") === true,
      setOpen: (open) => this._open = open
    });
    this.propsConfig = collapsiblePropsConfig;
    this._disabled = false;
    this._level = 0;
    this._on = void 0;
    this._open = false;
  }
  watchDisabled(value) {
    disabledProp.apply(value, (v) => this.setRenderProp("disabled", v));
  }
  watchLabel(value) {
    labelLangSegmentsProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  watchLevel(value) {
    levelProp.apply(value, (v) => this.setRenderProp("level", v));
  }
  watchOn(value) {
    collapsibleCallbacksProp.apply(value, (v) => this.setRenderProp("on", v));
  }
  watchOpen(value) {
    openProp.apply(value, (v) => {
      this.setRenderProp("open", v);
      this.openAnimation.syncOpen(v, this.hasLoaded);
    });
  }
  focus(options) {
    return Promise.resolve();
  }
  click() {
    return Promise.resolve();
  }
  componentWillLoad() {
    var _a;
    this.transitionMs = (_a = X("collapsibleTransitionMs", this.host)) !== null && _a !== void 0 ? _a : DEFAULT_COLLAPSIBLE_TRANSITION_MS;
    this.watchDisabled(this._disabled);
    this.watchLabel(this._label);
    this.watchLevel(this._level);
    this.watchOn(this._on);
    this.watchOpen(this._open);
  }
  componentDidLoad() {
    this.hasLoaded = true;
  }
  disconnectedCallback() {
    this.openAnimation.dispose();
  }
  render() {
    return h(Host, { key: "b5a35968058d7262f0d4fc0f1d13b49e02f4033e" }, h(CollapsibleFC, { key: "f82fdcb5684df1d8d2182fd142c41941a53350c3", block: "kol-details", contentClass: "indented-text", controlId: this.controlId, detailsOpen: this.detailsOpen, disabled: this.getRenderProp("disabled"), expanded: this.expanded, handleToggle: this.handleToggle, headingId: this.headingId, icons: "kolicon-chevron-right", label: this.getRenderProp("label"), level: this.getRenderProp("level"), on: this.getRenderProp("on"), open: this.getRenderProp("open"), refHeadingButton: this.ctaRef, transitionMs: this.transitionMs }, h("slot", { key: "33775c434926dcb6dfa6471c80f39ffe5aabc29c" })));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_disabled": [{
        "watchDisabled": 0
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
      "_open": [{
        "watchOpen": 0
      }]
    };
  }
};
__decorate([
  delegateFocus("ctaRef")
], KolDetails.prototype, "focus", null);
__decorate([
  delegateClick("ctaRef")
], KolDetails.prototype, "click", null);
KolDetails.style = {
  default: defaultStyleCss()
};
export {
  KolDetails as kol_details
};
//# sourceMappingURL=kol-details.entry-2OBDG2ST.js.map
