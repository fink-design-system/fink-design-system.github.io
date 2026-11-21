import {
  KeyboardKey
} from "./chunk-E2XMBNEJ.js";
import {
  labelProp
} from "./chunk-PVPG337L.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import {
  resolveButtonProps
} from "./chunk-AIH4BWIT.js";
import {
  TooltipBehavior,
  alignProp
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
import "./chunk-QVVQWVZC.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  createPropDefinition,
  isEnumOption,
  normalizeArray,
  normalizeBoolean,
  normalizeCallbacksObject,
  normalizeNumber,
  normalizeString
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
  devHint,
  koliBriQuerySelector,
  setEventTarget,
  uiUxHintMillerscheZahl
} from "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-tabs.entry.js
var hasCreateButtonProp = createPropDefinition("hasCreateButton", false, normalizeBoolean);
var selectedProp = createPropDefinition("selected", 0, normalizeNumber);
var tabBehaviorOptions = ["select-automatic", "select-manual"];
var tabBehaviorProp = createPropDefinition("behavior", "select-automatic", (value) => normalizeString(value), (v) => isEnumOption(v, tabBehaviorOptions));
var tabsProp = createPropDefinition("tabs", [], (value) => normalizeArray(value), (items) => items.every((item) => typeof item === "object" && item !== null && (Array.isArray(item._label) || typeof item._label === "string" && item._label.length > 0)), {
  hints: (_propName, items) => uiUxHintMillerscheZahl("KolTabs", items.length)
});
var tabsCallbacksProp = createPropDefinition("on", {}, (value) => {
  const callbacks = normalizeCallbacksObject(value);
  const normalized = {};
  if (typeof callbacks.onCreate === "function") {
    normalized.onCreate = callbacks.onCreate;
  }
  if (typeof callbacks.onSelect === "function") {
    normalized.onSelect = callbacks.onSelect;
  }
  return normalized;
});
var tabsPropsConfig = {
  required: [labelProp, tabsProp],
  optional: [alignProp, hasCreateButtonProp, selectedProp, tabBehaviorProp, tabsCallbacksProp]
};
var createTabsButtonItem = () => {
  const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
  const ariaDescriptionId = nonce();
  let resolved;
  let value;
  let boxElement;
  let buttonElement;
  const dispatch = (event, detail) => {
    if (boxElement) {
      dispatchDomEvent(boxElement, event, detail);
    }
  };
  const handleClick = (event) => {
    event.stopPropagation();
    tooltipBehavior.hideTooltip();
    const onClick = resolved === null || resolved === void 0 ? void 0 : resolved.on.onClick;
    if (typeof onClick === "function") {
      setEventTarget(event, buttonElement);
      onClick(event, value);
    }
    dispatch(KolEvent.click, value);
  };
  const handleMouseDown = (event) => {
    var _a, _b;
    (_b = resolved === null || resolved === void 0 ? void 0 : (_a = resolved.on).onMouseDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    dispatch(KolEvent.mousedown);
  };
  const handleFocus = (event) => {
    var _a, _b;
    (_b = resolved === null || resolved === void 0 ? void 0 : (_a = resolved.on).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    dispatch(KolEvent.focus);
  };
  const handleBlur = (event) => {
    var _a, _b;
    (_b = resolved === null || resolved === void 0 ? void 0 : (_a = resolved.on).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    dispatch(KolEvent.blur);
  };
  const refBox = (element) => {
    boxElement = element;
  };
  const refButton = (element) => {
    buttonElement = element;
  };
  return {
    getButton: (props, flagHost) => {
      resolved = resolveButtonProps(props, flagHost);
      value = props._value;
      tooltipBehavior.componentWillLoad({
        label: resolved.label,
        align: resolved.tooltipAlign
      });
      return {
        buttonProps: Object.assign(Object.assign({}, resolved), {
          ariaDescriptionId,
          handleBlur,
          handleClick,
          handleFocus,
          handleMouseDown,
          refButton,
          refTooltip: tooltipBehavior.setTooltipElementRef
        }),
        refBox
      };
    },
    getButtonElement: () => buttonElement,
    syncListeners: () => {
      if (buttonElement) {
        tooltipBehavior.syncListeners(void 0, buttonElement, true);
      }
    },
    destroy: () => {
      tooltipBehavior.destroy();
    }
  };
};
var tabsBem = bem.forBlock("kol-tabs");
var BEM_CLASS_TABS__BUTTON_CREATE = tabsBem("button-create");
var BEM_CLASS_TABS__BUTTON_GROUP = tabsBem("button-group");
var BEM_CLASS_TABS__CONTENT = tabsBem("content");
var BEM_CLASS_TABS__TAB = tabsBem("tab");
var BEM_CLASS_TABS__TABLIST = tabsBem("tablist");
var TabsFC = (props) => {
  const { align, class: hostClass, createButton, handleBlur, handleKeyDown, hasCreateButton, label, refContent, refRoot, tabButtons } = props;
  const handleFocusOut = (event) => {
    const tablist = event.currentTarget;
    if (!(event.relatedTarget instanceof Node && tablist.contains(event.relatedTarget))) {
      handleBlur();
    }
  };
  return h(BemRootNodeFC, { block: "kol-tabs", modifiers: { [`align-${align}`]: true }, class: hostClass, ref: refRoot }, h("div", { class: BEM_CLASS_TABS__BUTTON_GROUP }, h("div", { "aria-label": label, class: BEM_CLASS_TABS__TABLIST, role: "tablist", tabIndex: -1, onKeyDown: handleKeyDown, onFocusout: handleFocusOut }, tabButtons.map(({ buttonProps, refBox }) => h("div", { class: BEM_CLASS_TABS__TAB, ref: refBox }, h(ButtonFC, Object.assign({}, buttonProps))))), hasCreateButton && h("div", { class: BEM_CLASS_TABS__BUTTON_CREATE, ref: createButton.refBox }, h(ButtonFC, Object.assign({}, createButton.buttonProps)))), h("div", { class: BEM_CLASS_TABS__CONTENT, ref: refContent }));
};
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-button {     background-color: transparent;     display: inline-block;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     margin: 0;     padding: 0;          text-align: center;        }   .kol-button__interactive-element {     border-style: none;     display: block;     border-width: medium;          font-weight: inherit;     font-style: inherit;     text-align: inherit;   }   .kol-button {        }   .kol-button__tooltip {     height: 0;   }   .kol-tabs {     display: var(--display);     grid-template-columns: var(--grid-template-columns);     grid-template-rows: var(--grid-template-rows);   }   .kol-tabs--align-right {     --display: grid;     --grid-template-columns: 1fr auto;     --button-group-flex-direction: column;     --button-group-order: 2;   }   .kol-tabs--align-left {     --display: grid;     --grid-template-columns: auto 1fr;     --button-group-flex-direction: column;     --button-group-order: 0;   }   .kol-tabs--align-bottom {     --display: grid;     --grid-template-rows: 1fr auto;     --button-group-order: 2;   }   .kol-tabs__tabs-align-top {     --display: grid;     --grid-template-rows: auto 1fr;     --button-group-order: 0;   }   .kol-tabs__button-group {     display: flex;     order: var(--button-group-order);     flex-direction: var(--button-group-flex-direction);     flex-wrap: wrap;   }   .kol-tabs__button-group .kol-button {     display: block;        }   .kol-tabs__button-group .kol-button .kol-button__interactive-element {     border-bottom-color: transparent;     border-bottom-style: solid;   }   @media (forced-colors: active) {     .kol-tabs__button-group .kol-button.selected {       outline: 3px solid Highlight;       outline-offset: -3px;            }     .kol-tabs__button-group .kol-button.selected:has(.kol-button__interactive-element:focus-visible) {       outline-style: dashed;     }   }   .kol-tabs__tablist {     display: flex;     flex-direction: var(--button-group-flex-direction);     flex-wrap: wrap;   }   .kol-tabs__panel {     height: 100%;   } }`;
var KolTabs = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolTabs)
      registerInstance(this, hostRef);
    this.onCreateLabel = `${translate("kol-new")} …`;
    this.ctaRef = createCtaRef();
    this.id = createUniqueId("tabs");
    this.tabButtonItems = [];
    this.createButtonItem = createTabsButtonItem();
    this.onClickSelect = (event, index) => {
      this.selectNextTabEvent(event, index);
    };
    this.onMouseDown = (event) => {
      event.preventDefault();
    };
    this.tabButtonCallbacks = {
      onClick: this.onClickSelect,
      onMouseDown: this.onMouseDown
    };
    this.tabButtons = [];
    this.propsConfig = tabsPropsConfig;
    this._align = "top";
    this._behavior = void 0;
    this._hasCreateButton = false;
    this._on = void 0;
    this._selected = 0;
    this.nextPossibleTabIndex = (tabs, offset, step = 1) => {
      const nextOffset = offset + step;
      return this.selectNextNotDisabledTab(nextOffset, tabs, true);
    };
    this.prevPossibleTabIndex = (tabs, offset, step = 1) => {
      const nextOffset = offset - step;
      return this.selectNextNotDisabledTab(nextOffset, tabs, false);
    };
    this.selectNextNotDisabledTab = (selected, tabs, upOrDown = true, initialSelected) => {
      if (selected > tabs.length - 1) {
        selected = 0;
      }
      if (selected < 0) {
        selected = tabs.length - 1;
      }
      if (Array.isArray(tabs) && tabs[selected]) {
        if (tabs[selected]._disabled) {
          if (upOrDown === true) {
            if (selected < tabs.length - 1) {
              return this.selectNextNotDisabledTab(selected + 1, tabs, true, initialSelected || selected);
            } else {
              selected = initialSelected || selected;
              upOrDown = false;
            }
          }
          if (upOrDown === false) {
            if (selected > 0) {
              return this.selectNextNotDisabledTab(selected - 1, tabs, false, initialSelected || selected);
            } else {
              devHint(`[KolTabs] All tabs are disabled, and therefore no tab can be displayed.`);
            }
          }
        }
      }
      return selected;
    };
    this.handleKeyDown = (event) => {
      switch (event.key) {
        case KeyboardKey.ArrowRight:
          this.goToNextTab(event);
          break;
        case KeyboardKey.ArrowLeft:
          this.goToPreviousTab(event);
          break;
      }
    };
    this.handleBlur = () => {
      this.currentFocusIndex = void 0;
    };
    this.onCreate = (event) => {
      var _a, _b;
      event.preventDefault();
      (_b = (_a = this.getRenderProp("on")).onCreate) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.create);
      }
    };
    this.setRootRef = (element) => {
      this.rootElement = element;
    };
    this.setContentRef = (element) => {
      this.tabPanelHost = element;
    };
  }
  watchAlign(value) {
    alignProp.apply(value, (v) => this.setRenderProp("align", v));
  }
  watchBehavior(value) {
    tabBehaviorProp.apply(value, (v) => this.setRenderProp("behavior", v));
  }
  watchHasCreateButton(value) {
    hasCreateButtonProp.apply(value, (v) => this.setRenderProp("hasCreateButton", v));
  }
  watchLabel(value) {
    labelProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  watchOn(value) {
    tabsCallbacksProp.apply(value, (v) => this.setRenderProp("on", v));
  }
  watchSelected(value) {
    this.applySelected(value);
  }
  watchTabs(value) {
    this.applyTabs(value);
  }
  focus(options) {
    return Promise.resolve();
  }
  click() {
    return Promise.resolve();
  }
  componentWillLoad() {
    alignProp.apply(this._align, (v) => this.setRenderProp("align", v));
    tabBehaviorProp.apply(this._behavior, (v) => this.setRenderProp("behavior", v));
    hasCreateButtonProp.apply(this._hasCreateButton, (v) => this.setRenderProp("hasCreateButton", v));
    labelProp.apply(this._label, (v) => this.setRenderProp("label", v), this.isRequired("label"));
    tabsCallbacksProp.apply(this._on, (v) => this.setRenderProp("on", v));
    this.applySelected(this._selected);
    this.applyTabs(this._tabs);
  }
  componentWillRender() {
    this.resolveButtons();
  }
  componentDidRender() {
    var _a;
    this.ctaRef((_a = this.tabButtonItems[this.getRenderProp("selected")]) === null || _a === void 0 ? void 0 : _a.getButtonElement());
    this.tabButtonItems.forEach((item) => item.syncListeners());
    this.createButtonItem.syncListeners();
    this.refreshTabPanels();
  }
  disconnectedCallback() {
    this.tabButtonItems.forEach((item) => item.destroy());
    this.createButtonItem.destroy();
  }
  syncSelected() {
    const tabs = this.getRenderProp("tabs");
    if (tabs.length > 0) {
      this.setRenderProp("selected", this.selectNextNotDisabledTab(this.getRenderProp("selected"), tabs));
    }
  }
  getCurrentFocusIndex() {
    if (typeof this.currentFocusIndex === "number") {
      return this.currentFocusIndex;
    }
    return this.getRenderProp("selected");
  }
  getKeyboardTabChangeMode() {
    if (this.getRenderProp("behavior") === "select-manual") {
      return "selectFocusOnly";
    }
    return "activateCompletely";
  }
  goToNextTab(event) {
    const nextFocusIndex = this.nextPossibleTabIndex(this.getRenderProp("tabs"), this.getCurrentFocusIndex());
    this.selectNextTabEvent(event, nextFocusIndex, this.getKeyboardTabChangeMode());
  }
  goToPreviousTab(event) {
    const nextFocusIndex = this.prevPossibleTabIndex(this.getRenderProp("tabs"), this.getCurrentFocusIndex());
    this.selectNextTabEvent(event, nextFocusIndex, this.getKeyboardTabChangeMode());
  }
  selectNextTabEvent(event, nextTabIndex, changeMode = "activateCompletely") {
    var _a, _b;
    this.currentFocusIndex = nextTabIndex;
    this.focusTabById(nextTabIndex);
    if (changeMode === "activateCompletely") {
      this._selected = nextTabIndex;
      const tab = this.getRenderProp("tabs")[nextTabIndex];
      (_b = (_a = tab._on) === null || _a === void 0 ? void 0 : _a.onSelect) === null || _b === void 0 ? void 0 : _b.call(_a, event, nextTabIndex);
      this.onSelect(event, nextTabIndex);
    }
  }
  focusTabById(index) {
    if (this.rootElement) {
      const button = koliBriQuerySelector(`button#${this.id}-tab-${index}`, this.rootElement);
      button === null || button === void 0 ? void 0 : button.focus();
    }
  }
  onSelect(event, index) {
    var _a, _b;
    (_b = (_a = this.getRenderProp("on")).onSelect) === null || _b === void 0 ? void 0 : _b.call(_a, event, index);
    if (this.host) {
      dispatchDomEvent(this.host, KolEvent.select, index);
    }
    this.focusTabById(index);
  }
  refreshTabPanels() {
    var _a, _b;
    if (!this.tabPanelHost)
      return;
    while (this.tabPanelHost.firstChild) {
      this.tabPanelHost.removeChild(this.tabPanelHost.firstChild);
    }
    const tabs = this.getRenderProp("tabs");
    for (let i = 0; i < tabs.length; i++) {
      const div = document.createElement("div");
      div.setAttribute("aria-labelledby", `${this.id}-tab-${i}`);
      div.setAttribute("id", `${this.id}-panel-${i}`);
      div.setAttribute("role", "tabpanel");
      div.setAttribute("hidden", "");
      const slot = document.createElement("slot");
      slot.setAttribute("name", `tabpanel-slot-${i}`);
      div.appendChild(slot);
      this.tabPanelHost.appendChild(div);
      if (typeof HTMLCollection !== "undefined" && ((_a = this.host) === null || _a === void 0 ? void 0 : _a.children) instanceof HTMLCollection && ((_b = this.host) === null || _b === void 0 ? void 0 : _b.children[i])) {
        this.host.children[i].setAttribute("slot", `tabpanel-slot-${i}`);
      }
    }
    this.updateVisiblePanel();
  }
  updateVisiblePanel() {
    if (!this.tabPanelHost)
      return;
    const selected = this.getRenderProp("selected");
    Array.from(this.tabPanelHost.children).forEach((child, i) => {
      if (i === selected) {
        child.removeAttribute("hidden");
      } else {
        child.setAttribute("hidden", "");
      }
    });
  }
  resolveButtons() {
    const selected = this.getRenderProp("selected");
    const tabs = this.getRenderProp("tabs");
    this.tabButtons = this.tabButtonItems.map((item, index) => {
      const tab = tabs[index];
      const isSelected = selected === index;
      return item.getButton({
        _ariaControls: `${this.id}-panel-${index}`,
        _ariaSelected: isSelected,
        _customClass: isSelected ? "selected" : "",
        _disabled: tab._disabled,
        _hideLabel: tab._hideLabel,
        _icons: tab._icons,
        _id: `${this.id}-tab-${index}`,
        _label: tab._label,
        _on: this.tabButtonCallbacks,
        _role: "tab",
        _tabIndex: isSelected ? 0 : -1,
        _tooltipAlign: tab._tooltipAlign,
        _value: index,
        _variant: isSelected ? "custom" : void 0
      }, this.host);
    });
    this.createButton = this.createButtonItem.getButton({
      _icons: "kolicon-plus",
      _label: this.onCreateLabel,
      _on: { onClick: this.onCreate }
    }, this.host);
  }
  applySelected(value) {
    selectedProp.apply(value, (v) => {
      this.setRenderProp("selected", v);
      this.syncSelected();
    });
  }
  applyTabs(value) {
    tabsProp.apply(value, (tabs) => {
      this.setRenderProp("tabs", tabs);
      this.tabButtonItems.forEach((item) => item.destroy());
      this.tabButtonItems = tabs.map(() => createTabsButtonItem());
      this.syncSelected();
    });
  }
  render() {
    return h(Host, { key: "f42c56ba7918ef6a33a6a354e2f9c4de5ca8fcb4" }, h(TabsFC, { key: "9691fd92c0782719c4c343e663cde270c907449c", align: this.getRenderProp("align"), behavior: this.getRenderProp("behavior"), createButton: this.createButton, handleBlur: this.handleBlur, handleKeyDown: this.handleKeyDown, hasCreateButton: this.getRenderProp("hasCreateButton"), label: this.getRenderProp("label"), on: this.getRenderProp("on"), refContent: this.setContentRef, refRoot: this.setRootRef, selected: this.getRenderProp("selected"), tabButtons: this.tabButtons, tabs: this.getRenderProp("tabs") }));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_align": [{
        "watchAlign": 0
      }],
      "_behavior": [{
        "watchBehavior": 0
      }],
      "_hasCreateButton": [{
        "watchHasCreateButton": 0
      }],
      "_label": [{
        "watchLabel": 0
      }],
      "_on": [{
        "watchOn": 0
      }],
      "_selected": [{
        "watchSelected": 0
      }],
      "_tabs": [{
        "watchTabs": 0
      }]
    };
  }
};
__decorate([
  delegateFocus("ctaRef")
], KolTabs.prototype, "focus", null);
__decorate([
  delegateClick("ctaRef")
], KolTabs.prototype, "click", null);
KolTabs.style = {
  default: defaultStyleCss()
};
export {
  KolTabs as kol_tabs
};
//# sourceMappingURL=kol-tabs.entry-TALMVDXS.js.map
