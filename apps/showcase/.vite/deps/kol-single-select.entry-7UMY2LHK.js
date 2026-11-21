import {
  BaseListboxWebComponent,
  CustomSuggestionsOptionFC,
  CustomSuggestionsOptionsGroupFC,
  ListboxGroupFC,
  hasClearButtonProp
} from "./chunk-43IW5XWF.js";
import {
  rowsProp
} from "./chunk-2ULWEJIA.js";
import {
  createOptionsPropDefinition
} from "./chunk-ZRC64XBS.js";
import {
  placeholderProp
} from "./chunk-EXSFFQD5.js";
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

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-single-select.entry.js
var singleSelectOptionsProp = createOptionsPropDefinition();
var singleSelectPropsConfig = {
  required: [...formFieldBasePropsConfig.required, singleSelectOptionsProp],
  optional: [
    ...formFieldBasePropsConfig.optional,
    accessKeyProp,
    hasClearButtonProp,
    horizontalIconsProp,
    placeholderProp,
    requiredProp,
    rowsProp,
    shortKeyProp,
    variantProp
  ]
};
var singleSelectBem = bem.forBlock("kol-single-select");
var customSuggestionsToggleBem = bem.forBlock("kol-custom-suggestions-toggle");
var BEM_CLASS_SINGLE_SELECT__DELETE = singleSelectBem("delete");
var BEM_CLASS_SINGLE_SELECT__NO_RESULTS_MESSAGE = singleSelectBem("no-results-message");
var SingleSelectToggleFC = ({ disabled, handleClick }) => h(IconFC, { icons: "kolicon-chevron-down", label: "", class: customSuggestionsToggleBem({ disabled }), onClick: handleClick });
var SingleSelectNoResultsFC = ({ message }) => h("div", { class: BEM_CLASS_SINGLE_SELECT__NO_RESULTS_MESSAGE }, message, " ");
var SingleSelectNoResultsStatusFC = ({ message }) => h("span", { class: "visually-hidden", role: "status" }, message);
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   }   .kol-custom-suggestions-option {     line-height: 1.5;     white-space: normal;     overflow-wrap: break-word;        }   .kol-custom-suggestions-option:not(.kol-custom-suggestions-option--disabled) {     cursor: pointer;   }   .kol-custom-suggestions-options-group--cursor-hidden .kol-custom-suggestions-option {     cursor: none !important;   }   .kol-custom-suggestions-option--disabled, .kol-custom-suggestions-option--disabled * {     cursor: not-allowed;   }   .kol-custom-suggestions-options-group {     background-color: white;     display: block;     position: absolute;     z-index: 2;     max-height: calc(250 * 1rem / var(--kolibri-root-font-size, 16));     margin: 0;     padding: 0;     overflow-x: hidden;     overflow-y: auto;     list-style-type: none;   }   .kol-input-container:has(.kol-custom-suggestions-options-group--open) {     z-index: 10;   }   .kol-custom-suggestions-toggle {     display: flex;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     justify-content: center;     cursor: default;   }   .kol-custom-suggestions-toggle.kol-custom-suggestions-toggle--disabled {     cursor: not-allowed;   }   .kol-form-field .kol-popover-button {          display: inline;   }   .kol-form-field .kol-popover-button__popover {     margin: 0;     padding: 0;     border: 0;   }   .kol-form-field .kol-popover-button--open .kol-button__tooltip {     display: none;   }   .kol-form-field .kol-popover-button--inline {     display: inline-block;        }   .kol-form-field .kol-popover-button--inline .kol-button,   .kol-form-field .kol-popover-button--inline .kol-button .kol-button__interactive-element {     min-width: 0;     min-height: 1em;   }   .kol-form-field .kol-popover {     opacity: 0;     transition: 0.2s ease-out opacity;   }   .kol-form-field .kol-popover-button--open .kol-popover-button__popover {     opacity: 1;   }   .kol-form-field {     display: grid;   }   .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {     cursor: pointer;   }   .kol-form-field__label {     display: flex;   }   .kol-form-field__label-text {     flex-flow: row;     align-items: flex-start;     justify-content: flex-start;   }   .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden]) .kol-span__label::after, .kol-form-field--required:not(:has(.kol-form-field__label--legend)) .kol-form-field__input .kol-tooltip__content .kol-span__label::after {     content: "*"/"";   }   .kol-input-container {     background-color: transparent;     display: grid;     position: relative;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     grid-template-columns: 1fr;   }   .kol-input-container:has(> .kol-input-container__adornment--start) {     grid-template-columns: auto 1fr auto;   }   .kol-input-container__container {     position: relative;     z-index: 1;   }   .kol-input-container__adornment {     display: flex;     align-items: center;   }   .kol-input-container__adornment .kol-icon {     display: grid;     place-items: center;   }   .kol-input {     background-color: transparent;     width: 100%;     min-width: var(--a11y-min-size);   }   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-single-select {        }   .kol-single-select__group .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-single-select__group :host {     display: inline-block;   }   .kol-single-select__group .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-single-select__group .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-single-select__group .kol-button__interactive-element::before {     content: "​";   }   .kol-single-select__group .kol-button__text {     flex: 1 0 100%;   }   .kol-single-select__group .kol-button {        }   .kol-single-select__group .kol-button__tooltip {     height: 0;   }   .kol-single-select__group .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-single-select__group .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-single-select__no-results-message {     display: flex;     min-height: calc(50 * 1rem / var(--kolibri-root-font-size, 16));     align-items: center;     justify-content: center;     cursor: default;   }   .kol-single-select .kol-custom-suggestions-options-group {     max-height: calc(40 * 1rem / var(--kolibri-root-font-size, 16) * var(--visible-options, 5) + 2 * 1rem / var(--kolibri-root-font-size, 16)) !important;   }   .kol-single-select--open .kol-custom-suggestions-toggle {     transform: rotate(180deg);   }   .kol-custom-suggestions-toggle:not(.kol-custom-suggestions-toggle--disabled) {     cursor: pointer;   } }`;
var KolSingleSelect = class extends BaseListboxWebComponent {
  constructor(hostRef) {
    super();
    if (new.target === KolSingleSelect)
      registerInstance(this, hostRef);
    this.id = createUniqueId("single-select");
    this.infoPopoverOpen = false;
    this.inputHasFocus = false;
    this.isOpen = false;
    this.blockSuggestionMouseOver = false;
    this.filteredOptions = [];
    this.inputValue = "";
    this.clearButton = createButtonItem(() => this.host);
    this.ctaRef = createCtaRef();
    this.translateDeleteSelection = translate("kol-delete-selection");
    this.translateNoResultsMessage = translate("kol-no-results-message");
    this.propsConfig = singleSelectPropsConfig;
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
    this._required = false;
    this._shortKey = void 0;
    this._syncValueBySelector = void 0;
    this._tooltipAlign = "top";
    this._touched = false;
    this._value = null;
    this._hasClearButton = true;
    this._rows = void 0;
    this._variant = void 0;
    this.toggleListbox = (event) => {
      var _a;
      event === null || event === void 0 ? void 0 : event.preventDefault();
      if (this.getRenderProp("disabled") === true) {
        return;
      }
      (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.focus();
      if (this.isOpen) {
        this.isOpen = false;
      } else {
        this.isOpen = true;
        const selectedIndex = Array.isArray(this.filteredOptions) ? this.filteredOptions.findIndex((option) => option.label === this.inputValue) : -1;
        this.focusOption(selectedIndex >= 0 ? selectedIndex : -1);
      }
    };
    this.handleSingleSelectInput = (event) => {
      const value = event.target.value;
      this.inputValue = value;
      this.isOpen = true;
      this.setFilteredOptionsByQuery(value);
      this.focusedIndex = -1;
    };
    this.handleSingleSelectChange = (event) => {
      if (!this.isOpen) {
        this.handleChange(event, this._value);
      }
    };
    this.handleSingleSelectClick = (event) => {
      var _a;
      this.toggleListbox(event);
      (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.focus();
      this.handleClick(event);
    };
    this.handleInputBlur = (event) => {
      this.handleFocusLeave(event);
    };
    this.handleDropdownKeyDown = (event) => {
      if (event.key.length === 1 && /[a-z0-9]/i.test(event.key)) {
        event.preventDefault();
        this.isOpen = true;
        this.focusOptionStartingWith(event.key);
      }
    };
    this.handleClearButtonClick = () => {
      var _a;
      this.clearSelection();
      (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.focus();
      this.clearButtonFocused = false;
    };
    this.initFormAssociation("single-select", this._name);
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
  watchOptions(value) {
    var _a;
    this.applyOptions(value);
    this.filteredOptions = [...(_a = this.getRenderProp("options")) !== null && _a !== void 0 ? _a : []];
    if (this.isOpen) {
      this.setFilteredOptionsByQuery(this.inputValue);
    } else {
      this.updateInputValue(this._value);
    }
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
    this.updateInputValue(value);
  }
  watchHasClearButton(value) {
    hasClearButtonProp.apply(value, (v) => this.setRenderProp("hasClearButton", v));
  }
  watchRows(value) {
    rowsProp.apply(value, (v) => this.setRenderProp("rows", v));
  }
  watchVariant(value) {
    variantProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  getValue() {
    return Promise.resolve(this._value);
  }
  focus(options) {
    return Promise.resolve();
  }
  componentWillLoad() {
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
    this.applyOptions(this._options);
    this.watchRequired(this._required);
    this.watchPlaceholder(this._placeholder);
    this.watchHasClearButton(this._hasClearButton);
    this.watchRows(this._rows);
    this.filteredOptions = this.getRenderProp("options");
    this.updateInputValue(this._value);
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
    setTimeout(() => {
      if (containsDeepActiveElement(this.host) && !this.inputHasFocus) {
        this.handleFocus(event);
      }
    });
  }
  handleFocusOut(event) {
    this.selectOptionByInputValue();
    setTimeout(() => {
      if (this.inputHasFocus && !containsDeepActiveElement(this.host)) {
        this.handleBlur(event);
        this.isOpen = false;
      }
    });
  }
  getOptionCount() {
    return Array.isArray(this.filteredOptions) ? this.filteredOptions.length : 0;
  }
  moveFocus(delta, searchStep = 1) {
    if (!this.filteredOptions) {
      return;
    }
    this.moveFocusSkippingDisabled(delta, searchStep, (index) => Boolean(this.filteredOptions[index].disabled));
  }
  focusFirstOption() {
    this.moveFocus(this.focusedIndex * -1);
  }
  focusLastOption() {
    this.moveFocus(this.filteredOptions ? this.filteredOptions.length - 1 - this.focusedIndex : 0, -1);
  }
  handleConfirmKey(event) {
    var _a;
    if (this.clearButtonFocused) {
      this.clearSelection();
      event.preventDefault();
    } else if (this.isOpen) {
      if (this.selectFocusedOption()) {
        (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.focus();
        this.handleListboxEvent(event, false);
      }
    } else {
      this.toggleListbox(event);
    }
  }
  selectFocusedOption() {
    if (Array.isArray(this.filteredOptions) && this.filteredOptions.length > 0 && this.focusedIndex >= 0) {
      const option = this.filteredOptions[this.focusedIndex];
      if (option === null || option === void 0 ? void 0 : option.disabled) {
        return false;
      }
      this.selectOption(option);
      return true;
    }
    return false;
  }
  focusOptionStartingWith(char) {
    const charLowerCase = char.toLowerCase();
    const index = Array.isArray(this.filteredOptions) && this.filteredOptions.findIndex((option) => option.label.toLowerCase().startsWith(charLowerCase) && !option.disabled);
    if (typeof index === "number" && index >= 0) {
      this.focusOption(index);
    }
  }
  setFilteredOptionsByQuery(query) {
    if (query === void 0) {
      return;
    }
    const options = this.getRenderProp("options");
    if (query.trim() === "") {
      this.filteredOptions = [...options];
    } else if (Array.isArray(options) && options.length > 0 && query.length > 0) {
      this.filteredOptions = options.filter((option) => {
        var _a, _b;
        return (_b = (_a = option.label) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes(query.toLowerCase());
      });
    }
  }
  updateInputValue(value) {
    var _a;
    const matchedOption = (_a = this.getRenderProp("options")) === null || _a === void 0 ? void 0 : _a.find((option) => option.value === value);
    this.inputValue = matchedOption ? String(matchedOption.label) : "";
  }
  selectOption(option) {
    var _a;
    if (option.value === this._value) {
      this.inputValue = option.label;
      this.filteredOptions = [...this.getRenderProp("options")];
      return;
    }
    this._value = option.value;
    this.inputValue = option.label;
    const detail = { name: (_a = this.getRenderProp("name")) !== null && _a !== void 0 ? _a : "", value: option.value };
    this.handleInput(createEventWithTarget(KolEvent.input, detail, this.ctaRef.el), option.value);
    this.handleChange(createEventWithTarget(KolEvent.change, detail, this.ctaRef.el), option.value);
    this.filteredOptions = [...this.getRenderProp("options")];
    this.formAssociation.setFormAssociatedValue(this._value);
  }
  clearSelection() {
    var _a;
    if (this.getRenderProp("disabled") === true) {
      return;
    }
    const emptyValue = null;
    this.focusedIndex = -1;
    this._value = emptyValue;
    this.inputValue = "";
    this.filteredOptions = [...this.getRenderProp("options")];
    const detail = { name: this.getRenderProp("name"), value: emptyValue };
    this.handleInput(createEventWithTarget(KolEvent.input, detail, this.ctaRef.el), emptyValue);
    this.handleChange(createEventWithTarget(KolEvent.change, detail, this.ctaRef.el), emptyValue);
    (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.focus();
    this.isOpen = true;
  }
  selectOptionByInputValue() {
    const options = this.getRenderProp("options");
    const matchingOption = options === null || options === void 0 ? void 0 : options.find((option) => {
      var _a, _b;
      return ((_a = option.label) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = this.inputValue) === null || _b === void 0 ? void 0 : _b.toLowerCase());
    });
    if (matchingOption) {
      this.selectOption(matchingOption);
    } else if (this._value !== null && this._value !== void 0) {
      this.filteredOptions = [...options !== null && options !== void 0 ? options : []];
    }
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
    }, accessKey ? { accessKey } : {}), { value: this.inputValue, required: this.getRenderProp("required") }), placeholder ? { placeholder } : {}), { touched: this.getRenderProp("touched"), msg: this.getRenderProp("msg") }), shortKey ? { "aria-keyshortcuts": shortKey } : {}), { "aria-activedescendant": this.getActiveDescendant(), "aria-autocomplete": "both", "aria-controls": createRelatedUniqueId(id, "listbox"), "aria-describedby": ariaDescribedBy.length > 0 ? ariaDescribedBy.join(" ") : void 0, "aria-expanded": this.isOpen ? "true" : "false", "aria-label": hideLabel && typeof label === "string" ? label : void 0, "aria-labelledby": createRelatedUniqueId(id, "label"), autocapitalize: "off", autocorrect: "off", autocomplete: "off", class: "kol-single-select__input", ref: this.ctaRef, role: "combobox", type: "text", onBlur: this.handleInputBlur, onChange: this.handleSingleSelectChange, onClick: this.handleSingleSelectClick, onFocus: this.handleFocus, onInput: this.handleSingleSelectInput, onKeyDown: this.handleKeyDown, ariaDescribedBy, "aria-invalid": hasError ? "true" : void 0 });
  }
  hasNoResults() {
    return !Array.isArray(this.filteredOptions) || this.filteredOptions.length === 0;
  }
  renderOptions() {
    if (this.hasNoResults()) {
      return [];
    }
    return this.filteredOptions.map((option, index) => h(CustomSuggestionsOptionFC, { id: this.getOptionId(index), index, option: option.label, searchTerm: this.inputValue, ref: (el) => {
      if (el)
        this.optionRefs[index] = el;
    }, selected: this._value === option.value, disabled: option.disabled ? true : false, onClick: (event) => {
      var _a;
      if (option.disabled) {
        return;
      }
      event.preventDefault();
      this.selectOption(option);
      this.isOpen = false;
      (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.focus();
    }, onMouseOver: () => {
      if (!this.blockSuggestionMouseOver && !option.disabled) {
        this.focusOption(index);
      }
    }, onFocus: () => {
      if (!option.disabled) {
        this.focusOption(index);
      }
    } }));
  }
  applyOptions(value) {
    singleSelectOptionsProp.apply(value, (v) => this.setRenderProp("options", v));
  }
  render() {
    var _a;
    const isDisabled = this.getRenderProp("disabled") === true;
    const showNoResults = this.isOpen && !isDisabled && this.hasNoResults();
    const { startAdornment, endAdornment } = getInputAdornments({ icons: this.getRenderProp("icons") });
    return h(Host, { key: "e97d74740ca2641fc9e91808f9823a434f329ebe" }, h(FormFieldFC, Object.assign({ key: "427af456c8f187427acac404fec841b03e32fea4" }, this.getFormFieldProps({
      class: clsx("kol-single-select", { "kol-single-select--open": this.isOpen }),
      accessKey: this.getRenderProp("accessKey") || void 0,
      shortKey: this.getRenderProp("shortKey") || void 0,
      required: this.getRenderProp("required"),
      variant: this.getRenderProp("variant")
    })), h(InputContainerFC, { key: "0f292e23326941a0aab511890178b149dc9c4d44", disabled: isDisabled, msg: this.getRenderProp("msg"), touched: this.getRenderProp("touched"), startAdornment, endAdornment }, h(ListboxGroupFC, { key: "86094880cdb9246187fca259826e3a8d7772c7e9", block: "kol-single-select" }, h(InputFC, Object.assign({ key: "66de3c681eccffe2a7bad31fcf62b9af5a3be5ee" }, this.getInputProps())), this.inputValue && this.getRenderProp("hasClearButton") && h(ButtonFC, Object.assign({ key: "8c45914b4492116e1c3065b552a2bc03a5ae905f" }, this.clearButton.getFcProps({
      _icons: "kolicon-cross",
      _label: this.translateDeleteSelection,
      _hideLabel: true,
      _variant: "ghost",
      _disabled: isDisabled,
      _on: {
        onClick: this.handleClearButtonClick,
        onFocus: this.handleClearButtonFocus,
        onBlur: this.handleClearButtonBlur
      }
    }, { class: BEM_CLASS_SINGLE_SELECT__DELETE, hidden: isDisabled }))), h(SingleSelectToggleFC, { key: "149196f27fb6d7b239ec867c90665ac4d9f811e3", disabled: isDisabled, handleClick: this.toggleListbox })), h(CustomSuggestionsOptionsGroupFC, { key: "927d007b04a6e25651dd25abb2d2baba3b1b4375", blockSuggestionMouseOver: this.blockSuggestionMouseOver, onKeyDown: this.handleDropdownKeyDown, style: { "--visible-options": `${(_a = this.getRenderProp("rows")) !== null && _a !== void 0 ? _a : 5}` }, hidden: !this.isOpen || isDisabled, id: createRelatedUniqueId(this.id, "listbox"), "aria-labelledby": createRelatedUniqueId(this.id, "label") }, this.renderOptions()), showNoResults && h(SingleSelectNoResultsFC, { key: "98763dadb3abece49ebfcf4a0c07b73302cddd2f", message: this.translateNoResultsMessage }), h(SingleSelectNoResultsStatusFC, { key: "b8783feb1b6693c0ddab9add1e1123624f30a578", message: showNoResults ? this.translateNoResultsMessage : "" }))));
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
      "_options": [{
        "watchOptions": 0
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
      "_hasClearButton": [{
        "watchHasClearButton": 0
      }],
      "_rows": [{
        "watchRows": 0
      }],
      "_variant": [{
        "watchVariant": 0
      }]
    };
  }
};
__decorate([
  delegateFocus("ctaRef")
], KolSingleSelect.prototype, "focus", null);
KolSingleSelect.style = {
  default: defaultStyleCss()
};
export {
  KolSingleSelect as kol_single_select
};
//# sourceMappingURL=kol-single-select.entry-7UMY2LHK.js.map
