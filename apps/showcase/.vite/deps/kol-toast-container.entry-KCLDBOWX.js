import {
  KolButtonTag
} from "./chunk-6OHARAC5.js";
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
import "./chunk-7C3Y25NJ.js";
import {
  createUniqueId,
  nonce
} from "./chunk-FQ2Y4FDM.js";
import "./chunk-SESBZTFK.js";
import "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  clsx
} from "./chunk-KPGE6Z2R.js";
import "./chunk-MQNHCCSC.js";
import {
  Host,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import {
  Log
} from "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-toast-container.entry.js
var ToastItemFc = (_a) => {
  var { status, toast, onClose } = _a, other = __rest(_a, ["status", "toast", "onClose"]);
  const { type, label, description, variant } = toast;
  return h("div", { class: clsx("kol-toast-item", `kol-toast-item--${status}`) }, h(AlertFC, { alert: true, class: "kol-toast-item__alert", closerAriaDescriptionId: nonce(), handleCloserClick: onClose, hasCloser: true, headingId: createUniqueId("alert-heading"), label, level: 0, refCloserButton: () => void 0, refCloserTooltip: () => void 0, type, variant: variant || "card" }, h("div", Object.assign({}, other), description)));
};
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   }   :host {     display: flex;     position: fixed;     z-index: 200;     max-width: 90vw;     flex-direction: column;   }   .kol-toast-container__close-all {     align-self: flex-end;   } }`;
var TRANSITION_TIMEOUT = 300;
var KolToastContainer = class {
  constructor(hostRef) {
    if (new.target === KolToastContainer)
      registerInstance(this, hostRef);
    this.state = {
      _toastStates: []
    };
    this.translateToastCloseAll = translate("kol-toast-close-all");
    this.knownRenderFunctions = /* @__PURE__ */ new Set();
  }
  enqueue(toast) {
    const newToastState = {
      toast: Object.assign(Object.assign({}, toast), { variant: "card" }),
      status: "adding",
      id: createUniqueId("toast")
    };
    this.state = Object.assign(Object.assign({}, this.state), { _toastStates: [newToastState, ...this.state._toastStates] });
    setTimeout(() => {
      this.state = Object.assign(Object.assign({}, this.state), { _toastStates: this.state._toastStates.map((localToastState) => localToastState.id === newToastState.id && localToastState.status !== "removing" ? Object.assign(Object.assign({}, localToastState), { status: "settled" }) : localToastState) });
    }, TRANSITION_TIMEOUT);
    return Promise.resolve(() => {
      this.handleClose(newToastState);
    });
  }
  closeAll(immediate = false) {
    if (immediate) {
      this.state = Object.assign(Object.assign({}, this.state), { _toastStates: [] });
      this.knownRenderFunctions.clear();
    } else {
      const toastsToClose = [...this.state._toastStates];
      this.state = Object.assign(Object.assign({}, this.state), { _toastStates: toastsToClose.map((localToastState) => Object.assign(Object.assign({}, localToastState), { status: "removing" })) });
      setTimeout(() => {
        this.state = Object.assign(Object.assign({}, this.state), { _toastStates: this.state._toastStates.filter((toastState) => toastsToClose.every((toastToClose) => toastToClose.id !== toastState.id)) });
        toastsToClose.forEach((toastState) => {
          var _a, _b;
          if (typeof toastState.toast.render === "function") {
            this.knownRenderFunctions.delete(toastState.toast.render);
          }
          (_b = (_a = toastState.toast).onClose) === null || _b === void 0 ? void 0 : _b.call(_a);
        });
      }, TRANSITION_TIMEOUT);
    }
    return Promise.resolve();
  }
  componentWillLoad() {
    Log.warn("kol-toast-container is deprecated and will be removed in the next major version. Use kol-alert for inline notifications or kol-dialog for interactive messages instead. See https://github.com/public-ui/kolibri/issues/8372");
  }
  handleClose(toastState) {
    const current = this.state._toastStates.find((t) => t.id === toastState.id);
    if (!current || current.status === "removing") {
      return;
    }
    this.state = Object.assign(Object.assign({}, this.state), { _toastStates: this.state._toastStates.map((localToastState) => localToastState.id === toastState.id ? Object.assign(Object.assign({}, localToastState), { status: "removing" }) : localToastState) });
    setTimeout(() => {
      var _a, _b;
      this.state = Object.assign(Object.assign({}, this.state), { _toastStates: this.state._toastStates.filter((localToastState) => localToastState.id !== toastState.id) });
      if (typeof toastState.toast.render === "function") {
        this.knownRenderFunctions.delete(toastState.toast.render);
      }
      (_b = (_a = toastState.toast).onClose) === null || _b === void 0 ? void 0 : _b.call(_a);
    }, TRANSITION_TIMEOUT);
  }
  handleToastRef(toastState, element) {
    if (element && typeof toastState.toast.render === "function" && !this.knownRenderFunctions.has(toastState.toast.render)) {
      this.knownRenderFunctions.add(toastState.toast.render);
      toastState.toast.render(element, { close: () => this.handleClose(toastState) });
    }
  }
  render() {
    return h(Host, { key: "7c3623651b8bb10e3b8b7670a53605890d04b9be", class: "kol-toast-container" }, this.state._toastStates.length > 1 && h(KolButtonTag, { key: "3bfb7ef93ead485aa7a2588ab92b4a49371fe80b", _label: this.translateToastCloseAll, class: "kol-toast-container__button-close-all", _on: {
      onClick: () => {
        void this.closeAll();
      }
    } }), this.state._toastStates.map((toastState) => h(ToastItemFc, { key: toastState.id, onClose: () => this.handleClose(toastState), ref: (element) => this.handleToastRef(toastState, element), toast: toastState.toast, status: toastState.status })));
  }
};
KolToastContainer.style = {
  default: defaultStyleCss()
};
export {
  KolToastContainer as kol_toast_container
};
//# sourceMappingURL=kol-toast-container.entry-KCLDBOWX.js.map
