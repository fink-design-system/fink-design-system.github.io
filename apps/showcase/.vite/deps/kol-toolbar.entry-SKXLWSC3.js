import {
  KeyboardKey
} from "./chunk-E2XMBNEJ.js";
import {
  resolveLinkProps
} from "./chunk-5NZISYSR.js";
import {
  orientationProp
} from "./chunk-E2FZTTZB.js";
import {
  propagateResetEventToForm,
  propagateSubmitEventToForm
} from "./chunk-SR6CIZZ2.js";
import "./chunk-TXIZUTEV.js";
import {
  LinkFC
} from "./chunk-JLURN3RE.js";
import "./chunk-ETC363DC.js";
import "./chunk-U2POW5WN.js";
import {
  onLocationChange
} from "./chunk-L5RCXHD3.js";
import "./chunk-6OHARAC5.js";
import {
  labelProp
} from "./chunk-PVPG337L.js";
import "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import {
  resolveButtonProps
} from "./chunk-AIH4BWIT.js";
import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
import {
  ButtonFC
} from "./chunk-3C6UB25G.js";
import "./chunk-JIRF5MWS.js";
import "./chunk-FGYUAXNO.js";
import "./chunk-7Q2QTJQF.js";
import "./chunk-7C3Y25NJ.js";
import "./chunk-MIXJLZBB.js";
import {
  createCtaRef,
  delegateClick$1,
  setClick
} from "./chunk-VFFG6S5V.js";
import {
  nonce
} from "./chunk-FQ2Y4FDM.js";
import "./chunk-SESBZTFK.js";
import {
  delegateFocus,
  setFocus
} from "./chunk-ZVS5ACKA.js";
import "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import "./chunk-7UI7W6EF.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import "./chunk-QVVQWVZC.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
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
  X,
  setEventTarget
} from "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-toolbar.entry.js
var toolbarItemsProp = createPropDefinition("items", [], (value) => normalizeArray(value), (items) => items.every((item) => typeof item === "object" && item !== null));
var toolbarPropsConfig = {
  required: [labelProp, toolbarItemsProp],
  optional: [orientationProp]
};
var BEM_CLASS_TOOLBAR__ITEM = bem.forBlock("kol-toolbar")("item");
var renderItem = (record, index, currentIndex, location) => {
  const tabIndex = index === currentIndex && !record.disabled ? 0 : -1;
  return h("div", { class: BEM_CLASS_TOOLBAR__ITEM, key: index, ref: record.refWrapper }, record.type === "link" ? h(LinkFC, Object.assign({}, record.getFcProps(tabIndex, location))) : record.type === "button" ? h(ButtonFC, Object.assign({}, record.getFcProps(tabIndex))) : h("hr", null));
};
var ToolbarFC = ({ class: hostClass, currentIndex, itemRecords, label, location, orientation }) => h(BemRootNodeFC, { block: "kol-toolbar", class: hostClass, modifiers: { "orientation-horizontal": orientation === "horizontal", "orientation-vertical": orientation === "vertical" }, role: "toolbar", "aria-label": label }, itemRecords.map((record, index) => renderItem(record, index, currentIndex, location)));
var createToolbarItem = (item, getFlagHost) => {
  if (item.type === "link") {
    return createLinkItem(item, getFlagHost);
  } else if (item.type === "button") {
    return createButtonItem(item, getFlagHost);
  }
  return createHRItem();
};
var createButtonItem = (item, getFlagHost) => {
  const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
  const ctaRef = createCtaRef();
  const ariaDescriptionId = nonce();
  let wrapper;
  const props = resolveButtonProps(item, getFlagHost());
  const value = item._value;
  tooltipBehavior.componentWillLoad({ label: props.label, align: props.tooltipAlign });
  const dispatch = (event, detail) => {
    if (wrapper) {
      dispatchDomEvent(wrapper, event, detail);
    }
  };
  const handleClick = (event) => {
    event.stopPropagation();
    tooltipBehavior.hideTooltip();
    if (props.type === "submit") {
      propagateSubmitEventToForm({ form: wrapper });
    } else if (props.type === "reset") {
      propagateResetEventToForm({ form: wrapper });
    } else if (typeof props.on.onClick === "function") {
      setEventTarget(event, ctaRef.el);
      props.on.onClick(event, value);
    }
    dispatch(KolEvent.click, value);
  };
  const handleMouseDown = (event) => {
    var _a, _b;
    (_b = (_a = props.on).onMouseDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    dispatch(KolEvent.mousedown);
  };
  const handleFocus = (event) => {
    var _a, _b;
    (_b = (_a = props.on).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    dispatch(KolEvent.focus);
  };
  const handleBlur = (event) => {
    var _a, _b;
    (_b = (_a = props.on).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    dispatch(KolEvent.blur);
  };
  return {
    type: "button",
    disabled: props.disabled,
    getElement: () => ctaRef.el,
    getFcProps: (tabIndex) => Object.assign(Object.assign({}, props), {
      ariaDescriptionId,
      handleBlur,
      handleClick,
      handleFocus,
      handleMouseDown,
      refButton: ctaRef,
      refTooltip: tooltipBehavior.setTooltipElementRef,
      tabIndex: typeof item._tabIndex === "number" ? props.tabIndex : tabIndex
    }),
    refWrapper: (element) => {
      wrapper = element;
    },
    syncListeners: () => {
      if (ctaRef.el) {
        tooltipBehavior.syncListeners(void 0, ctaRef.el, true);
      }
    },
    destroy: () => tooltipBehavior.destroy()
  };
};
var createLinkItem = (item, getFlagHost) => {
  var _a, _b, _c;
  const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
  const ctaRef = createCtaRef();
  const ariaDescriptionId = nonce();
  let wrapper;
  const link = item;
  const props = resolveLinkProps(Object.assign(Object.assign({}, link), { _inline: (_a = link._inline) !== null && _a !== void 0 ? _a : false, _variant: (_c = (_b = link._variant) !== null && _b !== void 0 ? _b : X("buttonVariantDefault", getFlagHost())) !== null && _c !== void 0 ? _c : "normal" }));
  tooltipBehavior.componentWillLoad({ label: props.label.length > 0 ? props.label : props.href, align: props.tooltipAlign });
  const handleAnchorClick = (event) => {
    tooltipBehavior.hideTooltip();
    if (props.disabled) {
      event.preventDefault();
      return;
    }
    if (typeof props.on.onClick === "function") {
      setEventTarget(event, ctaRef.el);
      props.on.onClick(event, props.href);
    }
    if (wrapper) {
      dispatchDomEvent(wrapper, KolEvent.click, props.href);
    }
  };
  return {
    type: "link",
    disabled: props.disabled,
    getElement: () => ctaRef.el,
    getFcProps: (tabIndex, location) => Object.assign(Object.assign({}, props), { ariaCurrent: location !== "" && location === props.href ? props.ariaCurrentValue : "", ariaDescriptionId, expertSlot: item._label === "", handleAnchorClick, refAnchor: ctaRef, refTooltip: tooltipBehavior.setTooltipElementRef, tabIndex: typeof item._tabIndex === "number" ? props.tabIndex : tabIndex }),
    refWrapper: (element) => {
      wrapper = element;
    },
    syncListeners: () => {
      if (ctaRef.el) {
        tooltipBehavior.syncListeners(void 0, ctaRef.el, true);
      }
    },
    destroy: () => tooltipBehavior.destroy()
  };
};
var createHRItem = () => {
  const ctaRef = createCtaRef();
  return {
    type: "hr",
    disabled: true,
    getElement: () => ctaRef.el,
    refWrapper: () => {
    },
    syncListeners: () => {
    },
    destroy: () => {
    }
  };
};
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   :host {     display: inline-block;   }   .kol-link {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-link__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-link__interactive-element::before {     content: "​";   }   .kol-link__text {     flex: 1 0 100%;   }   .kol-link {        }   .kol-link__tooltip {     height: 0;   }   .kol-link--external-link > .kolicon-link-external::before {     content: none;   }   .kol-link--external-link .kol-link__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   :host {     display: inline-block;   }   .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-button__interactive-element::before {     content: "​";   }   .kol-button__text {     flex: 1 0 100%;   }   .kol-button {        }   .kol-button__tooltip {     height: 0;   }   .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-toolbar {     display: flex;     flex-wrap: wrap;     align-items: stretch;   }   .kol-toolbar--orientation-horizontal .kol-toolbar__item hr {     height: 100%;   }   .kol-toolbar--orientation-vertical {     flex-direction: column;     align-items: stretch;   }   .kol-toolbar--orientation-vertical .kol-span {     align-items: flex-start;   }   .kol-toolbar__item hr {     margin: 0;   }   .kol-toolbar:focus-within {     outline: 1px solid;     outline-offset: 2px;   } }`;
var ARROW_KEYS = [KeyboardKey.ArrowUp, KeyboardKey.ArrowDown, KeyboardKey.ArrowRight, KeyboardKey.ArrowLeft];
var KolToolbar = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolToolbar)
      registerInstance(this, hostRef);
    this.currentIndex = 0;
    this.itemRecords = [];
    this.location = "";
    this.propsConfig = toolbarPropsConfig;
    this._orientation = void 0;
  }
  watchLabel(value) {
    labelProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  watchItems(value) {
    toolbarItemsProp.apply(value, (items) => {
      this.setRenderProp("items", items);
      this.itemRecords.forEach((record) => record.destroy());
      this.itemRecords = items.map((item) => createToolbarItem(item, () => this.host));
      this.setFirstEnabledItemIndex();
    });
  }
  watchOrientation(value) {
    orientationProp.apply(value, (v) => this.setRenderProp("orientation", v));
  }
  async focus(options) {
    const element = this.getCurrentItemElement();
    if (element) {
      return delegateFocus(this.host, () => setFocus(element, options));
    }
  }
  async click() {
    const element = this.getCurrentItemElement();
    if (element) {
      return delegateClick$1(this.host, async () => setClick(element));
    }
  }
  componentWillLoad() {
    this.watchLabel(this._label);
    this.watchItems(this._items);
    this.watchOrientation(this._orientation);
    this.unsubscribeOnLocationChange = onLocationChange((location) => {
      this.location = location;
    });
  }
  componentDidRender() {
    this.itemRecords.forEach((record) => record.syncListeners());
  }
  disconnectedCallback() {
    if (this.unsubscribeOnLocationChange) {
      this.unsubscribeOnLocationChange();
      this.unsubscribeOnLocationChange = void 0;
    }
    this.itemRecords.forEach((record) => record.destroy());
  }
  handleKeyDown(event) {
    var _a;
    const pressedKey = event.code;
    if (!ARROW_KEYS.includes(pressedKey))
      return;
    event.preventDefault();
    if (this.itemRecords.length === 0)
      return;
    const step = pressedKey === KeyboardKey.ArrowUp || pressedKey === KeyboardKey.ArrowLeft ? -1 : 1;
    const nextIndex = this.findNextEnabledItemIndex(this.currentIndex, step);
    if (nextIndex === void 0 || nextIndex === this.currentIndex) {
      return;
    }
    this.currentIndex = nextIndex;
    void ((_a = this.itemRecords[nextIndex].getElement()) === null || _a === void 0 ? void 0 : _a.focus());
  }
  handleFocusout(event) {
    if (event.target === this.host)
      this.setFirstEnabledItemIndex();
  }
  getCurrentItemElement() {
    const record = this.itemRecords[this.currentIndex];
    return record && !record.disabled ? record.getElement() : void 0;
  }
  setFirstEnabledItemIndex() {
    this.currentIndex = this.itemRecords.findIndex((record) => !record.disabled);
  }
  findNextEnabledItemIndex(fromIndex, step) {
    const itemCount = this.itemRecords.length;
    for (let offset = 1; offset <= itemCount; offset++) {
      const candidate = ((fromIndex + step * offset) % itemCount + itemCount) % itemCount;
      if (!this.itemRecords[candidate].disabled) {
        return candidate;
      }
    }
    return void 0;
  }
  render() {
    return h(Host, { key: "10c807156e0a9f91b26ffb26ac01768029106dab" }, h(ToolbarFC, { key: "7ebbb8a2e88664afddf0c66e046003b21ba0e3d5", currentIndex: this.currentIndex, itemRecords: this.itemRecords, label: this.getRenderProp("label"), location: this.location, orientation: this.getRenderProp("orientation") }));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_label": [{
        "watchLabel": 0
      }],
      "_items": [{
        "watchItems": 0
      }],
      "_orientation": [{
        "watchOrientation": 0
      }]
    };
  }
};
KolToolbar.style = {
  default: defaultStyleCss()
};
export {
  KolToolbar as kol_toolbar
};
//# sourceMappingURL=kol-toolbar.entry-SKXLWSC3.js.map
