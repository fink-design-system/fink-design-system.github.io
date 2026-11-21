import {
  BaseListboxWebComponent,
  CustomSuggestionsOptionFC,
  CustomSuggestionsOptionsGroupFC,
  ListboxGroupFC,
  hasClearButtonProp
} from "./chunk-43IW5XWF.js";
import {
  placeholderProp
} from "./chunk-EXSFFQD5.js";
import {
  stringValueProp
} from "./chunk-6BANYKWN.js";
import {
  suggestionsProp
} from "./chunk-A3JKXIDT.js";
import {
  requiredProp
} from "./chunk-EO54MTV4.js";
import {
  InputContainerFC,
  getInputAdornments,
  horizontalIconsProp
} from "./chunk-YCYFPTWS.js";
import {
  InputFC
} from "./chunk-KCFEVKMH.js";
import {
  FormFieldFC,
  formFieldBasePropsConfig
} from "./chunk-JCU3O6PN.js";
import "./chunk-EBSUS5ES.js";
import "./chunk-FRVQWXY2.js";
import {
  createButtonItem
} from "./chunk-RSHHA2HG.js";
import "./chunk-T3QCMHNQ.js";
import "./chunk-XV6TVAFR.js";
import "./chunk-SR6CIZZ2.js";
import {
  validateAccessAndShortKey
} from "./chunk-TXIZUTEV.js";
import "./chunk-AEQ2DHFL.js";
import "./chunk-6OHARAC5.js";
import "./chunk-U3F5DQBF.js";
import "./chunk-Q4L7LM2W.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import "./chunk-AIH4BWIT.js";
import "./chunk-IGUFDWYR.js";
import {
  ButtonFC
} from "./chunk-3C6UB25G.js";
import {
  accessKeyProp,
  shortKeyProp,
  variantProp
} from "./chunk-JIRF5MWS.js";
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
  createRelatedUniqueId,
  createUniqueId
} from "./chunk-FQ2Y4FDM.js";
import "./chunk-SESBZTFK.js";
import {
  containsDeepActiveElement
} from "./chunk-ZVS5ACKA.js";
import "./chunk-AVJUB7OE.js";
import {
  IconFC
} from "./chunk-NQNQ4CHG.js";
import {
  __decorate
} from "./chunk-7UI7W6EF.js";
import {
  KolEvent,
  createEventWithTarget
} from "./chunk-TR6JQWDR.js";
import "./chunk-QVVQWVZC.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import "./chunk-MS3MLDFB.js";
import {
  clsx
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

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-combobox.entry.js
var comboboxPropsConfig = {
  required: [...formFieldBasePropsConfig.required, suggestionsProp],
  optional: [
    ...formFieldBasePropsConfig.optional,
    accessKeyProp,
    hasClearButtonProp,
    horizontalIconsProp,
    placeholderProp,
    requiredProp,
    shortKeyProp,
    stringValueProp,
    variantProp
  ]
};
var comboboxBem = bem.forBlock("kol-combobox");
var BEM_CLASS_COMBOBOX__DELETE = comboboxBem("delete");
var BEM_CLASS_COMBOBOX_TOGGLE = bem.forBlock("kol-combobox-toggle")();
var ComboboxToggleFC = ({ disabled, expanded, handleClick, label, listboxId }) => h("button", { type: "button", tabIndex: -1, class: BEM_CLASS_COMBOBOX_TOGGLE, "aria-controls": listboxId, "aria-expanded": expanded ? "true" : "false", "aria-label": label, onClick: handleClick, disabled, hidden: disabled }, h(IconFC, { icons: "kolicon-chevron-down", label: "" }));
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   }   .kol-custom-suggestions-option {     line-height: 1.5;     white-space: normal;     overflow-wrap: break-word;        }   .kol-custom-suggestions-option:not(.kol-custom-suggestions-option--disabled) {     cursor: pointer;   }   .kol-custom-suggestions-options-group--cursor-hidden .kol-custom-suggestions-option {     cursor: none !important;   }   .kol-custom-suggestions-option--disabled, .kol-custom-suggestions-option--disabled * {     cursor: not-allowed;   }   .kol-custom-suggestions-options-group {     background-color: white;     display: block;     position: absolute;     z-index: 2;     max-height: calc(250 * 1rem / var(--kolibri-root-font-size, 16));     margin: 0;     padding: 0;     overflow-x: hidden;     overflow-y: auto;     list-style-type: none;   }   .kol-input-container:has(.kol-custom-suggestions-options-group--open) {     z-index: 10;   }   .kol-custom-suggestions-toggle {     display: flex;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     justify-content: center;     cursor: default;   }   .kol-custom-suggestions-toggle.kol-custom-suggestions-toggle--disabled {     cursor: not-allowed;   }   .kol-form-field .kol-popover-button {          display: inline;   }   .kol-form-field .kol-popover-button__popover {     margin: 0;     padding: 0;     border: 0;   }   .kol-form-field .kol-popover-button--open .kol-button__tooltip {     display: none;   }   .kol-form-field .kol-popover-button--inline {     display: inline-block;        }   .kol-form-field .kol-popover-button--inline .kol-button,   .kol-form-field .kol-popover-button--inline .kol-button .kol-button__interactive-element {     min-width: 0;     min-height: 1em;   }   .kol-form-field .kol-popover {     opacity: 0;     transition: 0.2s ease-out opacity;   }   .kol-form-field .kol-popover-button--open .kol-popover-button__popover {     opacity: 1;   }   .kol-form-field {     display: grid;   }   .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {     cursor: pointer;   }   .kol-form-field__label {     display: flex;   }   .kol-form-field__label-text {     flex-flow: row;     align-items: flex-start;     justify-content: flex-start;   }   .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden]) .kol-span__label::after, .kol-form-field--required:not(:has(.kol-form-field__label--legend)) .kol-form-field__input .kol-tooltip__content .kol-span__label::after {     content: "*"/"";   }   .kol-input-container {     background-color: transparent;     display: grid;     position: relative;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     grid-template-columns: 1fr;   }   .kol-input-container:has(> .kol-input-container__adornment--start) {     grid-template-columns: auto 1fr auto;   }   .kol-input-container__container {     position: relative;     z-index: 1;   }   .kol-input-container__adornment {     display: flex;     align-items: center;   }   .kol-input-container__adornment .kol-icon {     display: grid;     place-items: center;   }   .kol-input {     background-color: transparent;     width: 100%;     min-width: var(--a11y-min-size);   }   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-combobox {        }   .kol-combobox__group .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-combobox__group :host {     display: inline-block;   }   .kol-combobox__group .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-combobox__group .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-combobox__group .kol-button__interactive-element::before {     content: "​";   }   .kol-combobox__group .kol-button__text {     flex: 1 0 100%;   }   .kol-combobox__group .kol-button {        }   .kol-combobox__group .kol-button__tooltip {     height: 0;   }   .kol-combobox__group .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-combobox__group .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-combobox-toggle {     min-height: 0;     flex: 0;     align-self: stretch;   }   .kol-combobox--open .kol-combobox-toggle {     transform: rotate(180deg);   } }`;
var KolCombobox = class extends BaseListboxWebComponent {
  constructor(hostRef) {
    super();
    if (new.target === KolCombobox)
      registerInstance(this, hostRef);
    this.id = createUniqueId("combobox");
    this.infoPopoverOpen = false;
    this.inputHasFocus = false;
    this.isOpen = false;
    this.blockSuggestionMouseOver = false;
    this.ctaRef = createCtaRef();
    this.clearButton = createButtonItem(() => this.host);
    this.translateDeleteSelection = translate("kol-delete-selection");
    this.translateShowSuggestions = translate("kol-show-suggestions");
    this.hasValue = false;
    this.propsConfig = comboboxPropsConfig;
    this._accessKey = void 0;
    this._ariaDetails = void 0;
    this._placeholder = void 0;
    this._disabled = false;
    this._hideMsg = false;
    this._hideLabel = false;
    this._hint = "";
    this._icons = void 0;
    this._infoPopover = void 0;
    this._msg = void 0;
    this._name = void 0;
    this._on = void 0;
    this._hasClearButton = true;
    this._required = false;
    this._shortKey = void 0;
    this._syncValueBySelector = void 0;
    this._tooltipAlign = "top";
    this._touched = false;
    this._value = void 0;
    this._variant = void 0;
    this.toggleListbox = () => {
      var _a;
      if (this.getRenderProp("disabled") === true) {
        this.isOpen = false;
      } else {
        (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.focus();
        if (this.isOpen) {
          this.isOpen = false;
        } else if (Array.isArray(this.filteredSuggestions) && this.filteredSuggestions.length > 0) {
          this.isOpen = true;
          const selectedIndex = this.filteredSuggestions.findIndex((option) => option === this.getRenderProp("value"));
          this.focusedIndex = selectedIndex >= 0 ? selectedIndex : -1;
          this.focusOption(this.focusedIndex);
        }
      }
    };
    this.handleComboboxInput = (event) => {
      const value = event.target.value;
      this.setRenderProp("value", value);
      this._value = value;
      this.handleInput(event, value);
      this.setFilteredSuggestionsByQuery(value);
      this.focusedIndex = -1;
      event.stopImmediatePropagation();
    };
    this.handleComboboxChange = (event) => {
      event.stopPropagation();
      const value = this.getRenderProp("value");
      this.handleChange(event, value);
      this.hasValue = !!value;
      this.formAssociation.setFormAssociatedValue(value);
    };
    this.handleInputBlur = (event) => {
      this.handleFocusLeave(event);
    };
    this.stopClearButtonFocusEvent = (event) => {
      event.stopPropagation();
    };
    this.handleDropdownKeyDown = (event) => {
      if (event.key.length === 1 && /[a-z0-9]/i.test(event.key)) {
        this.isOpen = true;
        this.focusSuggestionStartingWith(event.key);
      }
    };
    this.initFormAssociation("combobox", this._name);
  }
  watchAccessKey(value) {
    accessKeyProp.apply(value, (v) => this.setRenderProp("accessKey", v));
    validateAccessAndShortKey(value, this._shortKey);
  }
  watchAriaDetails(value) {
    this.applyAriaDetails(value);
  }
  watchPlaceholder(value) {
    placeholderProp.apply(value, (v) => this.setRenderProp("placeholder", v));
  }
  watchDisabled(value) {
    this.applyDisabled(value);
  }
  watchHideMsg(value) {
    this.applyHideMsg(value);
  }
  watchHideLabel(value) {
    this.applyHideLabel(value);
  }
  watchHint(value) {
    this.applyHint(value);
  }
  watchIcons(value) {
    horizontalIconsProp.apply(value, (v) => this.setRenderProp("icons", v));
  }
  watchInfoPopover(value) {
    this.applyInfoPopover(value);
  }
  watchLabel(value) {
    this.applyLabel(value);
  }
  watchMsg(value) {
    this.applyMsg(value);
  }
  watchName(value) {
    this.applyName(value);
  }
  watchOn(value) {
    this.applyOn(value);
  }
  watchHasClearButton(value) {
    hasClearButtonProp.apply(value, (v) => this.setRenderProp("hasClearButton", v));
  }
  watchSuggestions(value) {
    var _a;
    this.applySuggestions(value);
    this.setFilteredSuggestionsByQuery((_a = this._value) !== null && _a !== void 0 ? _a : "");
  }
  watchRequired(value) {
    requiredProp.apply(value, (v) => this.setRenderProp("required", v));
  }
  watchShortKey(value) {
    shortKeyProp.apply(value, (v) => this.setRenderProp("shortKey", v));
    validateAccessAndShortKey(this._accessKey, value);
  }
  watchSyncValueBySelector(value) {
    this.applySyncValueBySelector(value);
  }
  watchTooltipAlign(value) {
    this.applyTooltipAlign(value);
  }
  watchTouched(value) {
    this.applyTouched(value);
  }
  watchValue(value) {
    this.applyValue(value);
    this.formAssociation.setFormAssociatedValue(value);
  }
  watchVariant(value) {
    variantProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  getValue() {
    return Promise.resolve(this.getRenderProp("value"));
  }
  focus(options) {
    return Promise.resolve();
  }
  async click() {
    return Promise.resolve();
  }
  componentWillLoad() {
    this.setRenderProp("value", "");
    this.optionRefs = [];
    this._touched = this._touched === true;
    this.watchAriaDetails(this._ariaDetails);
    this.watchName(this._name);
    this.watchSyncValueBySelector(this._syncValueBySelector);
    this.watchTouched(this._touched);
    this.watchAccessKey(this._accessKey);
    this.watchMsg(this._msg);
    this.watchDisabled(this._disabled);
    this.watchHideMsg(this._hideMsg);
    this.watchHideLabel(this._hideLabel);
    this.watchHint(this._hint);
    this.watchInfoPopover(this._infoPopover);
    this.watchLabel(this._label);
    this.watchShortKey(this._shortKey);
    this.watchOn(this._on);
    this.watchTooltipAlign(this._tooltipAlign);
    this.watchVariant(this._variant);
    this.watchIcons(this._icons);
    this.watchHasClearButton(this._hasClearButton);
    this.watchPlaceholder(this._placeholder);
    this.watchRequired(this._required);
    this.applySuggestions(this._suggestions);
    this.applyValue(this._value);
    this.hasValue = !!this.getRenderProp("value");
    this.filteredSuggestions = this.getRenderProp("suggestions");
  }
  componentDidRender() {
    this.syncFormField();
    this.clearButton.syncListeners();
  }
  disconnectedCallback() {
    this.clearButton.destroy();
    this.destroyFormField();
  }
  handleHostKeyDown(event) {
    this.handleListboxKeyDown(event);
  }
  handleMouseEvent() {
    this.handleListboxMouseMove();
  }
  handleFocusIn(event) {
    if (containsDeepActiveElement(this.host) && !this.inputHasFocus) {
      this.handleFocus(event);
    }
  }
  handleFocusOut(event) {
    var _a;
    const relatedTarget = event.relatedTarget;
    const isFocusInside = relatedTarget && (relatedTarget === this.host || ((_a = this.host) === null || _a === void 0 ? void 0 : _a.contains(relatedTarget)));
    if (this.inputHasFocus && !isFocusInside) {
      this.handleBlur(event);
      if (this.isOpen) {
        this.isOpen = false;
      }
    }
  }
  getOptionCount() {
    return Array.isArray(this.filteredSuggestions) ? this.filteredSuggestions.length : 0;
  }
  moveFocus(delta) {
    if (!this.filteredSuggestions) {
      return;
    }
    this.moveFocusWrapping(delta);
  }
  focusFirstOption() {
    this.focusOption(0);
  }
  focusLastOption() {
    this.focusOption(this.filteredSuggestions ? this.filteredSuggestions.length - 1 : 0);
  }
  handleConfirmKey(event) {
    const clearButtonRoot = this.clearButton.getRootElement();
    if (clearButtonRoot && event.composedPath().includes(clearButtonRoot)) {
      return;
    }
    if (event.key === " ") {
      if (this.isOpen && this.selectFocusedOption()) {
        this.isOpen = false;
        event.preventDefault();
      }
      return;
    }
    if (this.isOpen && this.selectFocusedOption()) {
      this.isOpen = false;
    } else {
      this.toggleListbox();
    }
    event.preventDefault();
  }
  selectFocusedOption() {
    if (this.filteredSuggestions && this.focusedIndex >= 0 && this.focusedIndex < this.filteredSuggestions.length) {
      this.selectOption(this.filteredSuggestions[this.focusedIndex]);
      return true;
    }
    return false;
  }
  focusSuggestionStartingWith(char) {
    const charLowerCase = char.toLowerCase();
    const index = Array.isArray(this.filteredSuggestions) && this.filteredSuggestions.length > 0 && this.filteredSuggestions.findIndex((option) => option.toLowerCase().startsWith(charLowerCase));
    if (typeof index === "number") {
      this.focusOption(index);
    }
  }
  setFilteredSuggestionsByQuery(query) {
    var _a;
    if (query === void 0) {
      return;
    }
    const suggestions = this.getRenderProp("suggestions");
    if (query.trim() === "") {
      this.filteredSuggestions = [...suggestions];
    } else {
      this.filteredSuggestions = Array.isArray(suggestions) ? suggestions.filter((option) => option.toLowerCase().includes(query.trim().toLowerCase())) : this.filteredSuggestions;
      if (((_a = this.filteredSuggestions) === null || _a === void 0 ? void 0 : _a.length) === 1 && this.filteredSuggestions[0] === query) {
        this.isOpen = false;
      } else if (this.filteredSuggestions && this.filteredSuggestions.length > 0) {
        this.isOpen = true;
      } else {
        this.isOpen = false;
      }
    }
  }
  selectOption(option) {
    var _a;
    const name = this.getRenderProp("name");
    this._value = option;
    this.handleInput(createEventWithTarget(KolEvent.input, { name, value: option }, this.ctaRef.el), option);
    this.handleChange(createEventWithTarget(KolEvent.change, { name, value: option }, this.ctaRef.el), option);
    this.hasValue = !!option;
    this.formAssociation.setFormAssociatedValue(option);
    this.filteredSuggestions = [...this.getRenderProp("suggestions")];
    this.setRenderProp("value", option);
    (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.focus();
  }
  clearSelection() {
    var _a;
    if (this.getRenderProp("disabled") === true) {
      return;
    }
    (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.focus();
    const emptyValue = "";
    this.focusedIndex = -1;
    this._value = emptyValue;
    this.setRenderProp("value", emptyValue);
    this.filteredSuggestions = [...this.getRenderProp("suggestions")];
    this.isOpen = false;
    const detail = { name: this.getRenderProp("name"), value: emptyValue };
    this.handleInput(createEventWithTarget(KolEvent.input, detail, this.ctaRef.el), emptyValue);
    this.handleChange(createEventWithTarget(KolEvent.change, detail, this.ctaRef.el), emptyValue);
    this.hasValue = false;
    this.formAssociation.setFormAssociatedValue(emptyValue);
  }
  getInputProps() {
    const { ariaDescribedBy, hasError } = this.getAria();
    const id = this.id;
    const disabled = this.getRenderProp("disabled") === true;
    const accessKey = this.getRenderProp("accessKey") || void 0;
    const placeholder = this.getRenderProp("placeholder");
    const shortKey = this.getRenderProp("shortKey") || void 0;
    const hideLabel = this.getRenderProp("hideLabel");
    const label = this.getRenderProp("label");
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({
      id,
      hideLabel,
      label,
      disabled,
      name: this.getRenderProp("name") || void 0
    }, accessKey ? { accessKey } : {}), { value: this.getRenderProp("value"), required: this.getRenderProp("required") }), placeholder ? { placeholder } : {}), { touched: this.getRenderProp("touched"), msg: this.getRenderProp("msg") }), shortKey ? { "aria-keyshortcuts": shortKey } : {}), { ref: this.ctaRef, class: "kol-combobox__input", type: "text", role: "combobox", "aria-activedescendant": this.getActiveDescendant(), "aria-autocomplete": "list", "aria-controls": createRelatedUniqueId(id, "listbox"), "aria-describedby": ariaDescribedBy.length > 0 ? ariaDescribedBy.join(" ") : void 0, "aria-expanded": this.isOpen ? "true" : "false", "aria-label": hideLabel && typeof label === "string" ? label : void 0, "aria-labelledby": createRelatedUniqueId(id, "label"), autocapitalize: "off", autocorrect: "off", autocomplete: "off", onBlur: this.handleInputBlur, onChange: this.handleComboboxChange, onClick: this.handleClick, onFocus: this.handleFocus, onInput: this.handleComboboxInput, onKeyDown: this.handleKeyDown, ariaDescribedBy, "aria-invalid": hasError ? "true" : void 0 });
  }
  renderOptions() {
    const value = this.getRenderProp("value");
    return Array.isArray(this.filteredSuggestions) && this.filteredSuggestions.length > 0 && this.filteredSuggestions.map((option, index) => h(CustomSuggestionsOptionFC, { id: this.getOptionId(index), disabled: false, index, option, searchTerm: value, ref: (el) => {
      if (el)
        this.optionRefs[index] = el;
    }, selected: value === option, onClick: () => {
      this.selectOption(option);
      this.toggleListbox();
      this.isOpen = false;
    }, onMouseOver: () => {
      if (!this.blockSuggestionMouseOver) {
        this.focusOption(index);
      }
    }, onFocus: () => {
      this.focusOption(index);
    } }));
  }
  applySuggestions(value) {
    suggestionsProp.apply(value, (v) => this.setRenderProp("suggestions", v));
  }
  applyValue(value) {
    if (value !== void 0 && value !== null) {
      stringValueProp.apply(value, (v) => this.setRenderProp("value", v));
    }
  }
  render() {
    const isDisabled = this.getRenderProp("disabled") === true;
    const { startAdornment, endAdornment } = getInputAdornments({ icons: this.getRenderProp("icons") });
    return h(Host, { key: "0c05822b15984bdc3532b9a79fb5c059de9bff57" }, h(FormFieldFC, Object.assign({ key: "145a6885cf2091df4928d7b814a7a323913ab8a2" }, this.getFormFieldProps({
      class: clsx("kol-combobox", { "has-value": this.hasValue, "kol-combobox--open": this.isOpen }),
      accessKey: this.getRenderProp("accessKey") || void 0,
      shortKey: this.getRenderProp("shortKey") || void 0,
      required: this.getRenderProp("required"),
      variant: this.getRenderProp("variant")
    })), h(InputContainerFC, { key: "4f401e2b893d91ddbb1b0a46405445182c1c77ce", disabled: isDisabled, msg: this.getRenderProp("msg"), touched: this.getRenderProp("touched"), startAdornment, endAdornment }, h(ListboxGroupFC, { key: "8f6c478ef7575f0048b29a0c3c0b2d7d6f0bc955", block: "kol-combobox" }, h(InputFC, Object.assign({ key: "fd611d1eac02a9506f3ae771722fabae0fdd3d80" }, this.getInputProps())), this.getRenderProp("value") && this.getRenderProp("hasClearButton") && h(ButtonFC, Object.assign({ key: "4f2a719306f763c44fa0db9a41eea881a8ef6c7a" }, this.clearButton.getFcProps({
      _icons: "kolicon-cross",
      _label: this.translateDeleteSelection,
      _hideLabel: true,
      _variant: "ghost",
      _disabled: isDisabled,
      _on: {
        onClick: () => {
          this.clearSelection();
        }
      }
    }, {
      class: BEM_CLASS_COMBOBOX__DELETE,
      hidden: isDisabled,
      onBlur: this.stopClearButtonFocusEvent,
      onFocus: this.stopClearButtonFocusEvent
    }))), h(ComboboxToggleFC, { key: "606aa1a136ee653ccdc5d08f0bc7c63345956f7c", disabled: isDisabled, expanded: this.isOpen, handleClick: this.toggleListbox, label: this.translateShowSuggestions, listboxId: createRelatedUniqueId(this.id, "listbox") })), h(CustomSuggestionsOptionsGroupFC, { key: "fdd860c7e3fe2f58931054edb1d6399c18ff7a39", blockSuggestionMouseOver: this.blockSuggestionMouseOver, onKeyDown: this.handleDropdownKeyDown, hidden: !this.isOpen || isDisabled, id: createRelatedUniqueId(this.id, "listbox"), "aria-labelledby": createRelatedUniqueId(this.id, "label") }, this.renderOptions()))));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_accessKey": [{
        "watchAccessKey": 0
      }],
      "_ariaDetails": [{
        "watchAriaDetails": 0
      }],
      "_placeholder": [{
        "watchPlaceholder": 0
      }],
      "_disabled": [{
        "watchDisabled": 0
      }],
      "_hideMsg": [{
        "watchHideMsg": 0
      }],
      "_hideLabel": [{
        "watchHideLabel": 0
      }],
      "_hint": [{
        "watchHint": 0
      }],
      "_icons": [{
        "watchIcons": 0
      }],
      "_infoPopover": [{
        "watchInfoPopover": 0
      }],
      "_label": [{
        "watchLabel": 0
      }],
      "_msg": [{
        "watchMsg": 0
      }],
      "_name": [{
        "watchName": 0
      }],
      "_on": [{
        "watchOn": 0
      }],
      "_hasClearButton": [{
        "watchHasClearButton": 0
      }],
      "_suggestions": [{
        "watchSuggestions": 0
      }],
      "_required": [{
        "watchRequired": 0
      }],
      "_shortKey": [{
        "watchShortKey": 0
      }],
      "_syncValueBySelector": [{
        "watchSyncValueBySelector": 0
      }],
      "_tooltipAlign": [{
        "watchTooltipAlign": 0
      }],
      "_touched": [{
        "watchTouched": 0
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
__decorate([
  delegateFocus("ctaRef")
], KolCombobox.prototype, "focus", null);
__decorate([
  delegateClick("ctaRef")
], KolCombobox.prototype, "click", null);
KolCombobox.style = {
  default: defaultStyleCss()
};
export {
  KolCombobox as kol_combobox
};
//# sourceMappingURL=kol-combobox.entry-5LQI7EQB.js.map
