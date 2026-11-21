import {
  LinkFC,
  linkCallbacksProp,
  linkPropsConfig
} from "./chunk-JLURN3RE.js";
import "./chunk-ETC363DC.js";
import {
  hrefProp
} from "./chunk-U2POW5WN.js";
import {
  AlertFC
} from "./chunk-U3F5DQBF.js";
import "./chunk-Q4L7LM2W.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import "./chunk-3C6UB25G.js";
import "./chunk-JIRF5MWS.js";
import "./chunk-FGYUAXNO.js";
import "./chunk-7Q2QTJQF.js";
import {
  labelWithExpertSlotProp
} from "./chunk-7C3Y25NJ.js";
import "./chunk-VFFG6S5V.js";
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
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  buildDefaultPropsFromConfig,
  createCallbacksPropDefinition,
  createPropDefinition,
  normalizeArray
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  Host,
  getElement,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import {
  setEventTarget
} from "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-form.entry.js
function isErrorListEntry(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const { message, selector } = value;
  return typeof message === "string" && (typeof selector === "string" || typeof selector === "function");
}
var errorListProp = createPropDefinition("errorList", [], (value) => normalizeArray(value), (items) => items.every(isErrorListEntry));
var formCallbacksProp = createCallbacksPropDefinition();
function normalizeRequiredText(value) {
  if (typeof value === "boolean" || typeof value === "string") {
    return value;
  }
  throw new Error(`Invalid requiredText: expected boolean or string, got ${typeof value}`);
}
var requiredTextProp = createPropDefinition("requiredText", true, normalizeRequiredText);
var formPropsConfig = {
  optional: [errorListProp, formCallbacksProp, requiredTextProp]
};
var formBem$1 = bem.forBlock("kol-form");
var BEM_CLASS_FORM__ALERT = formBem$1("alert");
var BEM_CLASS_FORM__LINK = formBem$1("link");
var FormErrorListFC = ({ alertHeadingId, closerAriaDescriptionId, errorLinkItems }) => h(AlertFC, { alert: false, class: BEM_CLASS_FORM__ALERT, closerAriaDescriptionId, handleCloserClick: () => void 0, hasCloser: false, headingId: alertHeadingId, label: translate("kol-error-list-message"), level: 0, refCloserButton: () => void 0, refCloserTooltip: () => void 0, type: "error", variant: "card" }, h("nav", { "aria-label": translate("kol-error-list") }, h("ul", null, errorLinkItems.map((item, index) => h("li", { key: index }, h("span", { class: BEM_CLASS_FORM__LINK }, h(LinkFC, Object.assign({}, item.fcProps))))))));
var formBem = bem.forBlock("kol-form");
var BEM_CLASS_FORM__FORM = formBem("form");
var BEM_CLASS_FORM__MANDATORY_FIELDS_HINT = formBem("mandatory-fields-hint");
var FormFC = ({ alertHeadingId, closerAriaDescriptionId, errorLinkItems, handleReset, handleSubmit, requiredText }) => {
  const hintText = requiredText === true ? translate("kol-form-description") : typeof requiredText === "string" && requiredText.length > 0 ? requiredText : "";
  return h(BemRootNodeFC, { block: "kol-form" }, errorLinkItems.length > 0 && h(FormErrorListFC, { alertHeadingId, closerAriaDescriptionId, errorLinkItems }), h("form", { class: BEM_CLASS_FORM__FORM, method: "post", onSubmit: handleSubmit, onReset: handleReset, noValidate: true }, hintText.length > 0 && h("p", { class: BEM_CLASS_FORM__MANDATORY_FIELDS_HINT }, hintText), h("slot", null)));
};
var createFormErrorLinkItem = (error, handleSelector) => {
  const renderProps = buildDefaultPropsFromConfig(linkPropsConfig);
  let anchorElement;
  renderProps.tabIndex = void 0;
  hrefProp.apply("", (href) => renderProps.href = href);
  labelWithExpertSlotProp.apply(error.message, (label) => renderProps.label = label);
  linkCallbacksProp.apply({
    onClick: typeof error.selector === "string" ? () => handleSelector(String(error.selector), error.options) : error.selector
  }, (on) => renderProps.on = on);
  renderProps.ariaCurrent = "";
  renderProps.ariaDescriptionId = nonce();
  renderProps.expertSlot = error.message === "";
  renderProps.handleAnchorClick = (event) => {
    var _a;
    const onClick = (_a = renderProps.on) === null || _a === void 0 ? void 0 : _a.onClick;
    if (typeof onClick === "function") {
      setEventTarget(event, anchorElement);
      onClick(event, renderProps.href);
    }
  };
  renderProps.refAnchor = (element) => {
    anchorElement = element;
  };
  renderProps.refTooltip = () => void 0;
  return {
    fcProps: renderProps,
    focus: (options) => anchorElement === null || anchorElement === void 0 ? void 0 : anchorElement.focus(options)
  };
};
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }    @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   :host {     display: inline-block;   }   .kol-link {     display: inline-flex;     max-width: fit-content;   }   .kol-link--standalone {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: stretch;        }   .kol-link--standalone .kol-link__interactive-element {     align-items: stretch;   }   .kol-link--standalone .kol-link__text {     display: inline-flex;     flex: 1 1 100%;     place-items: center;   }   .kol-link__interactive-element {     display: inline-flex;     flex: 1;     align-items: baseline;     place-items: center;     text-align: left;     text-decoration-line: none;   }   .kol-link__interactive-element:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-link__interactive-element:hover:not([aria-disabled], [disabled]) .kol-span__label {     text-decoration-thickness: 0.2em;   }   .kol-link .kol-span__label {     text-decoration-line: underline;   }   .kol-link__icon {     display: inline-flex;   }   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   } }`;
var SCROLL_OPTIONS_FALLBACK = {
  behavior: "smooth",
  block: "nearest"
};
var FOCUS_ERROR_LIST_DELAY = 250;
var KolForm = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolForm)
      registerInstance(this, hostRef);
    this.errorLinkItems = [];
    this.alertHeadingId = createUniqueId("alert-heading");
    this.closerAriaDescriptionId = nonce();
    this.propsConfig = formPropsConfig;
    this._errorList = void 0;
    this._on = void 0;
    this._requiredText = true;
    this.handleSubmit = (event) => {
      event.preventDefault();
      const onSubmit = this.getRenderProp("on").onSubmit;
      if (typeof onSubmit === "function") {
        onSubmit(event);
      }
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.submit);
      }
    };
    this.handleReset = (event) => {
      event.preventDefault();
      const onReset = this.getRenderProp("on").onReset;
      if (typeof onReset === "function") {
        onReset(event);
      }
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.reset);
      }
    };
    this.focusErrorTarget = (selector, options) => {
      const targetElement = document.querySelector(selector);
      if (targetElement && typeof targetElement.focus === "function") {
        targetElement.focus(options !== null && options !== void 0 ? options : SCROLL_OPTIONS_FALLBACK);
      }
    };
  }
  watchErrorList(value) {
    errorListProp.apply(value, (errorList) => {
      this.setRenderProp("errorList", errorList);
      this.errorLinkItems = errorList.map((error) => createFormErrorLinkItem(error, this.focusErrorTarget));
    });
  }
  watchOn(value) {
    formCallbacksProp.apply(value, (on) => this.setRenderProp("on", on));
  }
  watchRequiredText(value) {
    requiredTextProp.apply(value, (requiredText) => this.setRenderProp("requiredText", requiredText));
  }
  focusErrorList(options) {
    setTimeout(() => {
      var _a;
      (_a = this.errorLinkItems[0]) === null || _a === void 0 ? void 0 : _a.focus(options !== null && options !== void 0 ? options : SCROLL_OPTIONS_FALLBACK);
    }, FOCUS_ERROR_LIST_DELAY);
    return Promise.resolve();
  }
  componentWillLoad() {
    this.watchErrorList(this._errorList);
    this.watchOn(this._on);
    this.watchRequiredText(this._requiredText);
  }
  render() {
    return h(Host, { key: "2284d41789f347a59938107849bd2e8210b4cd09" }, h(FormFC, { key: "1f534946f50caf5d70d43b48dae7deec2105b714", alertHeadingId: this.alertHeadingId, closerAriaDescriptionId: this.closerAriaDescriptionId, errorList: this.getRenderProp("errorList"), errorLinkItems: this.errorLinkItems, handleReset: this.handleReset, handleSubmit: this.handleSubmit, on: this.getRenderProp("on"), requiredText: this.getRenderProp("requiredText") }));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_errorList": [{
        "watchErrorList": 0
      }],
      "_on": [{
        "watchOn": 0
      }],
      "_requiredText": [{
        "watchRequiredText": 0
      }]
    };
  }
};
KolForm.style = {
  default: defaultStyleCss()
};
export {
  KolForm as kol_form
};
//# sourceMappingURL=kol-form.entry-PDH5Z35Y.js.map
