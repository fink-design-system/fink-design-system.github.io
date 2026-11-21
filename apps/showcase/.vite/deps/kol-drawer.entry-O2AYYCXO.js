import {
  DialogFC,
  lockScroll,
  unlockScroll
} from "./chunk-N4RN2MQH.js";
import {
  CardFC,
  resolveCardCloseButtonProps
} from "./chunk-LWHH35DI.js";
import "./chunk-ETC363DC.js";
import "./chunk-U2POW5WN.js";
import {
  openProp
} from "./chunk-OJ2SEHMP.js";
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
  TooltipBehavior,
  alignProp
} from "./chunk-IGUFDWYR.js";
import "./chunk-3C6UB25G.js";
import "./chunk-JIRF5MWS.js";
import "./chunk-FGYUAXNO.js";
import "./chunk-7Q2QTJQF.js";
import "./chunk-7C3Y25NJ.js";
import {
  handleCancelOverlay
} from "./chunk-MIXJLZBB.js";
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
  BemRootNodeFC,
  createPropDefinition,
  resolveFcProps
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
import "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-drawer.entry.js
function normalizeDrawerCallbacks(value) {
  if (typeof value !== "object" || value === null) {
    throw new Error(`Invalid on callbacks: expected object, got ${typeof value}`);
  }
  const { onCancel, onClose, onToggle } = value;
  const callbacks = {};
  if (typeof onCancel === "function") {
    callbacks.onCancel = onCancel;
  }
  if (typeof onClose === "function") {
    callbacks.onClose = onClose;
  }
  if (typeof onToggle === "function") {
    callbacks.onToggle = onToggle;
  }
  return callbacks;
}
var drawerCallbacksProp = createPropDefinition("on", {}, normalizeDrawerCallbacks);
var drawerPropsConfig = {
  required: [labelLangSegmentsProp],
  optional: [alignProp, drawerCallbacksProp, hasCloserProp, levelProp]
};
var drawerBem = bem.forBlock("kol-drawer");
var BEM_CLASS_DRAWER__CONTENT = drawerBem("content");
var BEM_CLASS_DRAWER__DIALOG = drawerBem("dialog");
var DrawerFC = (props, children) => {
  const { align, cardProps, expanded, handleAnimationEnd, handleCancel, handleClose, headingId, label, modal, refDialog, refWrapper } = resolveFcProps(drawerPropsConfig, props);
  return h(BemRootNodeFC, { block: "kol-drawer" }, h(DialogFC, { elementClass: BEM_CLASS_DRAWER__DIALOG, handleCancel, handleClose, label, labelledBy: headingId, modal, refDialog }, h("div", { class: drawerBem("wrapper", { [align]: true, "is-closing": !expanded, open: expanded }), onAnimationEnd: handleAnimationEnd, ref: refWrapper }, h(CardFC, Object.assign({}, cardProps), h("div", { class: BEM_CLASS_DRAWER__CONTENT }, children)))));
};
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-card .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-card :host {     display: inline-block;   }   .kol-card .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-card .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-card .kol-button__interactive-element::before {     content: "​";   }   .kol-card .kol-button__text {     flex: 1 0 100%;   }   .kol-card .kol-button {        }   .kol-card .kol-button__tooltip {     height: 0;   }   .kol-card .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-card .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-card {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     display: grid;     height: 100%;     overflow: visible;     grid-template-areas: "header  close" "content content";     grid-template-columns: 1fr min-content;     grid-template-rows: min-content 1fr;   }   .kol-card__header {     align-self: start;     grid-area: header;   }   .kol-card__content {     align-self: stretch;     grid-area: content;   }   .kol-card__close-button {          position: relative;     z-index: 1;     grid-area: close;   }   .kol-card:has(.kol-card__link) {     position: relative;   }   .kol-card__link::after {     position: absolute;     inset: 0;     content: "";     cursor: pointer;   }   .kol-drawer__dialog {     padding: 0;     border: none;          overscroll-behavior: contain;   }   .kol-drawer__wrapper {     position: fixed;     overflow: auto;     overscroll-behavior: contain;   }   .kol-drawer__wrapper--left, .kol-drawer__wrapper--right {     top: 0;     max-width: 100vw;     height: 100vh;   }   .kol-drawer__wrapper--left .kol-drawer__content, .kol-drawer__wrapper--right .kol-drawer__content {     height: 100%;   }   .kol-drawer__wrapper--left {     left: 0;   }   .kol-drawer__wrapper--right {     right: 0;   }   .kol-drawer__wrapper--bottom, .kol-drawer__wrapper--top {     left: 0;     width: 100vw;     max-height: 100vh;   }   .kol-drawer__wrapper--bottom .kol-drawer__content, .kol-drawer__wrapper--top .kol-drawer__content {     width: 100%;   }   .kol-drawer__wrapper--bottom {     bottom: 0;   }   .kol-drawer__wrapper--top {     top: 0;   }   .kol-drawer__content {     position: relative;   }   .kol-drawer__dialog .kol-card__content {     overflow-y: auto;     overscroll-behavior: contain;   } }`;
var KolDrawer = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolDrawer)
      registerInstance(this, hostRef);
    this.ariaDescriptionId = nonce();
    this.expanded = false;
    this.headingId = createUniqueId("drawer-heading");
    this.modal = true;
    this.dialogRef = createCtaRef();
    this.wrapperRef = createCtaRef();
    this.cardCloseButtonRef = createCtaRef();
    this.cardCloseTooltipBehavior = new TooltipBehavior(this.stateAccess);
    this.propsConfig = drawerPropsConfig;
    this._align = void 0;
    this._hasCloser = false;
    this._level = 0;
    this._on = void 0;
    this._open = void 0;
    this.handleAnimationEnd = (event) => {
      var _a, _b;
      if (event.animationName.includes("slideOut")) {
        (_b = (_a = this.dialogRef.el) === null || _a === void 0 ? void 0 : _a.close) === null || _b === void 0 ? void 0 : _b.call(_a);
      }
    };
    this.handleCancel = (event) => {
      var _a, _b;
      handleCancelOverlay(event);
      if (event.defaultPrevented)
        return;
      (_b = (_a = this.getRenderProp("on")).onCancel) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      if (event.defaultPrevented)
        return;
      if (this.host && !dispatchDomEvent(this.host, KolEvent.cancel)) {
        event.preventDefault();
      }
    };
    this.handleClose = (event) => {
      var _a, _b;
      if (event.target !== this.dialogRef.el) {
        return;
      }
      unlockScroll(this);
      this.closeDrawer();
      const on = this.getRenderProp("on");
      (_a = on.onClose) === null || _a === void 0 ? void 0 : _a.call(on);
      (_b = on.onToggle) === null || _b === void 0 ? void 0 : _b.call(on, false);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.close);
        dispatchDomEvent(this.host, KolEvent.toggle);
      }
    };
    this.handleCardClose = () => {
      this.cardCloseTooltipBehavior.hideTooltip();
      this.closeDrawer();
    };
  }
  watchAlign(value) {
    alignProp.apply(value, (v) => this.setRenderProp("align", v));
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
    drawerCallbacksProp.apply(value, (v) => this.setRenderProp("on", v));
  }
  watchOpen(value) {
    openProp.apply(value, (v) => {
      this.setState("expanded", v);
      if (this.dialogRef.el) {
        this.openOrCloseBasedOnState();
      }
    });
  }
  show(modal = false) {
    this.showDrawer(modal);
    return Promise.resolve();
  }
  async showModal() {
    await this.show(true);
  }
  async open() {
    await this.show(false);
  }
  close() {
    this.closeDrawer();
    return Promise.resolve();
  }
  componentWillLoad() {
    this.cardCloseButtonProps = resolveCardCloseButtonProps(this.host);
    this.cardCloseTooltipBehavior.componentWillLoad({
      label: this.cardCloseButtonProps.label,
      align: "left"
    });
    this.watchAlign(this._align);
    this.watchHasCloser(this._hasCloser);
    this.watchLabel(this._label);
    this.watchLevel(this._level);
    this.watchOn(this._on);
    this.watchOpen(this._open);
  }
  componentDidLoad() {
    this.openOrCloseBasedOnState();
  }
  componentDidRender() {
    if (this.cardCloseButtonRef.el) {
      this.cardCloseTooltipBehavior.syncListeners(void 0, this.cardCloseButtonRef.el, true);
    }
  }
  disconnectedCallback() {
    unlockScroll(this);
    this.cardCloseTooltipBehavior.destroy();
  }
  showDrawer(modal) {
    var _a, _b, _c, _d;
    const dialog = this.dialogRef.el;
    if (dialog === null || dialog === void 0 ? void 0 : dialog.open) {
      return;
    }
    this.setState("modal", modal);
    this.setState("expanded", true);
    if (modal) {
      (_a = dialog === null || dialog === void 0 ? void 0 : dialog.showModal) === null || _a === void 0 ? void 0 : _a.call(dialog);
      if (dialog) {
        lockScroll(this);
      }
    } else {
      (_b = dialog === null || dialog === void 0 ? void 0 : dialog.show) === null || _b === void 0 ? void 0 : _b.call(dialog);
    }
    (_d = (_c = this.getRenderProp("on")).onToggle) === null || _d === void 0 ? void 0 : _d.call(_c, true);
    if (this.host) {
      dispatchDomEvent(this.host, KolEvent.toggle);
    }
  }
  closeDrawer() {
    var _a, _b;
    this.setState("expanded", false);
    const wrapper = this.wrapperRef.el;
    if (!wrapper) {
      return;
    }
    if (window.getComputedStyle(wrapper).animationName === "none") {
      (_b = (_a = this.dialogRef.el) === null || _a === void 0 ? void 0 : _a.close) === null || _b === void 0 ? void 0 : _b.call(_a);
    }
  }
  openOrCloseBasedOnState() {
    if (this.getState("expanded")) {
      this.showDrawer(this.getState("modal"));
    } else {
      this.closeDrawer();
    }
  }
  buildCardProps() {
    return {
      ariaDescriptionId: this.getState("ariaDescriptionId"),
      closeButtonProps: this.cardCloseButtonProps,
      handleClose: this.handleCardClose,
      hasCloser: this.getRenderProp("hasCloser"),
      headingId: this.getState("headingId"),
      label: this.getRenderProp("label"),
      level: this.getRenderProp("level"),
      refCloseButton: this.cardCloseButtonRef,
      refTooltip: this.cardCloseTooltipBehavior.setTooltipElementRef
    };
  }
  render() {
    return h(Host, { key: "ad4de4ff863ff47eabe84d49a1cec176e5bcbcc4" }, h(DrawerFC, { key: "5efc03976a9adcc7a0fac3477ffe3065496b3eb0", align: this.getRenderProp("align"), ariaDescriptionId: this.getState("ariaDescriptionId"), cardProps: this.buildCardProps(), expanded: this.getState("expanded"), handleAnimationEnd: this.handleAnimationEnd, handleCancel: this.handleCancel, handleClose: this.handleClose, hasCloser: this.getRenderProp("hasCloser"), headingId: this.getState("headingId"), label: this.getRenderProp("label"), level: this.getRenderProp("level"), modal: this.getState("modal"), on: this.getRenderProp("on"), refDialog: this.dialogRef, refWrapper: this.wrapperRef }, h("slot", { key: "de3f2fb2326f7b3e707c4ad46e3d01b326ab2c27" })));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_align": [{
        "watchAlign": 0
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
      "_open": [{
        "watchOpen": 0
      }]
    };
  }
};
KolDrawer.style = {
  default: defaultStyleCss()
};
export {
  KolDrawer as kol_drawer
};
//# sourceMappingURL=kol-drawer.entry-O2AYYCXO.js.map
