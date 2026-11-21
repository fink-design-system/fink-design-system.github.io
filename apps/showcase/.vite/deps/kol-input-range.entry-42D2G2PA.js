import {
  clampRangeValue,
  getNumberValueType,
  inputMaxProp,
  inputMinProp,
  inputNumberValueProp,
  remapNumberValue
} from "./chunk-LWWGXMFS.js";
import {
  stepProp
} from "./chunk-IUICCRRD.js";
import {
  suggestionsProp
} from "./chunk-A3JKXIDT.js";
import {
  SuggestionsFC,
  autoCompleteProp
} from "./chunk-7UHTALH2.js";
import {
  InputContainerFC,
  getInputAdornments,
  horizontalIconsProp
} from "./chunk-YCYFPTWS.js";
import {
  InputFC
} from "./chunk-KCFEVKMH.js";
import {
  BaseFormFieldWebComponent,
  FormFieldFC,
  formFieldBasePropsConfig
} from "./chunk-JCU3O6PN.js";
import "./chunk-EBSUS5ES.js";
import "./chunk-FRVQWXY2.js";
import "./chunk-RSHHA2HG.js";
import "./chunk-T3QCMHNQ.js";
import "./chunk-XV6TVAFR.js";
import {
  submitFormOnEnter
} from "./chunk-SR6CIZZ2.js";
import {
  validateAccessAndShortKey
} from "./chunk-TXIZUTEV.js";
import "./chunk-AEQ2DHFL.js";
import "./chunk-6OHARAC5.js";
import "./chunk-U3F5DQBF.js";
import "./chunk-Q4L7LM2W.js";
import "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import "./chunk-AIH4BWIT.js";
import "./chunk-IGUFDWYR.js";
import "./chunk-3C6UB25G.js";
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
import "./chunk-ZVS5ACKA.js";
import "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import {
  __decorate
} from "./chunk-7UI7W6EF.js";
import "./chunk-TR6JQWDR.js";
import "./chunk-QVVQWVZC.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import "./chunk-MS3MLDFB.js";
import "./chunk-KPGE6Z2R.js";
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

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-input-range.entry.js
var inputRangePropsConfig = {
  required: [...formFieldBasePropsConfig.required],
  optional: [
    ...formFieldBasePropsConfig.optional,
    accessKeyProp,
    autoCompleteProp,
    horizontalIconsProp,
    inputMaxProp,
    inputMinProp,
    inputNumberValueProp,
    shortKeyProp,
    stepProp,
    suggestionsProp,
    variantProp
  ]
};
var inputRangeBem = bem.forBlock("kol-input-range");
var BEM_CLASS_INPUT_RANGE__INPUT_NUMBER = inputRangeBem("input", { number: true });
var BEM_CLASS_INPUT_RANGE__INPUT_RANGE = inputRangeBem("input", { range: true });
var BEM_CLASS_INPUT_RANGE__INPUTS_WRAPPER = inputRangeBem("inputs-wrapper");
var InputRangeInputsFC = ({ max, min }, children) => h("div", { class: BEM_CLASS_INPUT_RANGE__INPUTS_WRAPPER, style: { "--kolibri-input-range--input-number--width": `calc(${Math.max(String(max !== null && max !== void 0 ? max : 100).length, String(min !== null && min !== void 0 ? min : 0).length, 4)}ch + 2em)` } }, children);
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-button {     background-color: transparent;     display: inline-block;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     margin: 0;     padding: 0;          text-align: center;        }   .kol-button__interactive-element {     border-style: none;     display: block;     border-width: medium;          font-weight: inherit;     font-style: inherit;     text-align: inherit;   }   .kol-button {        }   .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   }   .kol-form-field .kol-popover-button {          display: inline;   }   .kol-form-field .kol-popover-button__popover {     margin: 0;     padding: 0;     border: 0;   }   .kol-form-field .kol-popover-button--open .kol-button__tooltip {     display: none;   }   .kol-form-field .kol-popover-button--inline {     display: inline-block;        }   .kol-form-field .kol-popover-button--inline .kol-button,   .kol-form-field .kol-popover-button--inline .kol-button .kol-button__interactive-element {     min-width: 0;     min-height: 1em;   }   .kol-form-field .kol-popover {     opacity: 0;     transition: 0.2s ease-out opacity;   }   .kol-form-field .kol-popover-button--open .kol-popover-button__popover {     opacity: 1;   }   .kol-form-field {     display: grid;   }   .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {     cursor: pointer;   }   .kol-form-field__label {     display: flex;   }   .kol-form-field__label-text {     flex-flow: row;     align-items: flex-start;     justify-content: flex-start;   }   .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden]) .kol-span__label::after, .kol-form-field--required:not(:has(.kol-form-field__label--legend)) .kol-form-field__input .kol-tooltip__content .kol-span__label::after {     content: "*"/"";   }   .kol-input-container {     background-color: transparent;     display: grid;     position: relative;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     grid-template-columns: 1fr;   }   .kol-input-container:has(> .kol-input-container__adornment--start) {     grid-template-columns: auto 1fr auto;   }   .kol-input-container__container {     position: relative;     z-index: 1;   }   .kol-input-container__adornment {     display: flex;     align-items: center;   }   .kol-input-container__adornment .kol-icon {     display: grid;     place-items: center;   }   .kol-input {     background-color: transparent;     width: 100%;     min-width: var(--a11y-min-size);   }   .kol-input-range__inputs-wrapper {     display: flex;     flex-grow: 1;     flex-direction: row;     flex-wrap: wrap;     align-items: center;   }   .kol-input-range__input--number {     width: var(--kolibri-input-range--input-number--width);     text-align: right;   }   .kol-input-range__input--range {     background-color: white;     display: inline-block;          width: 0;     min-width: calc(128 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     margin: 0;     padding: 0;     flex-grow: 1;     line-height: 1.5;     appearance: none;     border: 1px solid black;   }   .kol-input-range__input:not(:disabled).kol-input-range__input--range::-webkit-slider-thumb {     cursor: pointer;   }   .kol-input-range__input--range::-webkit-slider-thumb {     background-color: black;     border-radius: 20px;     width: calc(20 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(20 * 1rem / var(--kolibri-root-font-size, 16));     -webkit-appearance: none;   }   @media (prefers-contrast: more) or (forced-colors: active) {     .kol-input-range__input--range::-webkit-slider-thumb {       outline: 1px solid currentColor;     }   }   .kol-input-range__input:not(:disabled).kol-input-range__input--range::-moz-range-thumb {     cursor: pointer;   }   .kol-input-range__input--range::-moz-range-thumb {     background-color: black;     border-radius: 20px;     width: calc(20 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(20 * 1rem / var(--kolibri-root-font-size, 16));     -moz-appearance: none;   } }`;
var KolInputRange = class extends BaseFormFieldWebComponent {
  constructor(hostRef) {
    super();
    if (new.target === KolInputRange)
      registerInstance(this, hostRef);
    this.id = createUniqueId("input-range");
    this.infoPopoverOpen = false;
    this.inputHasFocus = false;
    this.ctaRef = createCtaRef();
    this.valueIsNumberString = false;
    this.propsConfig = inputRangePropsConfig;
    this._accessKey = void 0;
    this._ariaDetails = void 0;
    this._autoComplete = "off";
    this._disabled = false;
    this._hideMsg = false;
    this._hideLabel = false;
    this._hint = "";
    this._icons = void 0;
    this._infoPopover = void 0;
    this._max = 100;
    this._min = 0;
    this._msg = void 0;
    this._name = void 0;
    this._on = void 0;
    this._shortKey = void 0;
    this._step = void 0;
    this._suggestions = void 0;
    this._syncValueBySelector = void 0;
    this._tooltipAlign = "top";
    this._touched = false;
    this._value = void 0;
    this._variant = void 0;
    this.handleRangeInput = (event) => {
      const target = event.target;
      const value = this.readValue(target.value);
      if (target === this.rangeRef) {
        this._value = value;
      } else if (this.rangeRef && Number.isFinite(Number(value))) {
        this.rangeRef.value = String(value);
      }
      this.handleInput(event, value);
    };
    this.handleRangeChange = (event) => {
      const value = this.readValue(event.target.value);
      this._value = value;
      this.handleChange(event, value);
    };
    this.handleNumberKeyDown = (event) => {
      this.handleKeyDown(event);
      submitFormOnEnter(event, { form: this.host, ref: this.ctaRef.el });
    };
    this.setRangeRef = (element) => {
      if (element) {
        this.rangeRef = element;
      }
    };
    this.initFormAssociation("range", this._name);
  }
  watchAccessKey(value) {
    accessKeyProp.apply(value, (v) => this.setRenderProp("accessKey", v));
    validateAccessAndShortKey(value, this._shortKey);
  }
  watchAriaDetails(value) {
    this.applyAriaDetails(value);
  }
  watchAutoComplete(value) {
    autoCompleteProp.apply(value, (v) => this.setRenderProp("autoComplete", v));
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
  watchMax(value) {
    inputMaxProp.apply(value, (v) => this.setRenderProp("max", v));
  }
  watchMin(value) {
    inputMinProp.apply(value, (v) => this.setRenderProp("min", v));
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
  watchShortKey(value) {
    shortKeyProp.apply(value, (v) => this.setRenderProp("shortKey", v));
    validateAccessAndShortKey(this._accessKey, value);
  }
  watchStep(value) {
    stepProp.apply(value, (v) => this.setRenderProp("step", v));
  }
  watchSuggestions(value) {
    suggestionsProp.apply(value, (v) => this.setRenderProp("suggestions", v));
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
    var _a;
    inputNumberValueProp.apply(value, (v) => this.setRenderProp("value", v));
    this.formAssociation.setFormAssociatedValue((_a = this.getRenderProp("value")) !== null && _a !== void 0 ? _a : null);
    if (value !== void 0) {
      this.valueIsNumberString = getNumberValueType(value) === "NumberString";
    }
  }
  watchVariant(value) {
    variantProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  getValue() {
    if (this.ctaRef.el !== void 0) {
      return Promise.resolve(this.readValue(this.ctaRef.el.value));
    }
    return Promise.resolve(void 0);
  }
  focus(options) {
    return Promise.resolve();
  }
  click() {
    return Promise.resolve();
  }
  componentWillLoad() {
    this.setRenderProp("min", 0);
    this.setRenderProp("max", 100);
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
    this.watchAutoComplete(this._autoComplete);
    this.watchMax(this._max);
    this.watchMin(this._min);
    this.watchStep(this._step);
    this.watchSuggestions(this._suggestions);
    this.watchValue(this._value);
  }
  componentDidLoad() {
    var _a;
    if (!this._value && ((_a = this.rangeRef) === null || _a === void 0 ? void 0 : _a.value)) {
      this._value = parseFloat(this.rangeRef.value);
    }
  }
  componentDidRender() {
    this.syncFormField();
  }
  disconnectedCallback() {
    this.destroyFormField();
  }
  readValue(raw) {
    var _a;
    const value = clampRangeValue(raw, this.getRenderProp("min"), this.getRenderProp("max"));
    return (_a = remapNumberValue(value, this.valueIsNumberString ? "NumberString" : "number")) !== null && _a !== void 0 ? _a : value;
  }
  getSharedInputProps() {
    var _a, _b, _c, _d;
    const accessKey = this.getRenderProp("accessKey");
    const shortKey = this.getRenderProp("shortKey");
    return Object.assign(Object.assign(Object.assign(Object.assign({ id: this.id, hideLabel: this.getRenderProp("hideLabel"), label: this.getRenderProp("label"), disabled: this.getRenderProp("disabled"), name: void 0 }, accessKey ? { accessKey } : {}), { value: (_a = this.getRenderProp("value")) !== null && _a !== void 0 ? _a : null, autoComplete: this.getRenderProp("autoComplete"), min: (_b = this.getRenderProp("min")) !== null && _b !== void 0 ? _b : null, max: (_c = this.getRenderProp("max")) !== null && _c !== void 0 ? _c : null, step: (_d = this.getRenderProp("step")) !== null && _d !== void 0 ? _d : null, touched: this.getRenderProp("touched"), msg: this.getRenderProp("msg") }), shortKey ? { "aria-keyshortcuts": shortKey } : {}), { onBlur: this.handleBlur, onChange: this.handleRangeChange, onClick: this.handleClick, onFocus: this.handleFocus, onInput: this.handleRangeInput, onKeyDown: this.handleKeyDown });
  }
  render() {
    const disabled = this.getRenderProp("disabled");
    const name = this.getRenderProp("name");
    const min = this.getRenderProp("min");
    const max = this.getRenderProp("max");
    const suggestions = this.getRenderProp("suggestions");
    const hasSuggestions = suggestions.length > 0;
    const list = hasSuggestions ? createRelatedUniqueId(this.id, "list") : void 0;
    const shared = this.getSharedInputProps();
    const { ariaDescribedBy, hasError } = this.getAria();
    const ariaInvalid = hasError ? "true" : void 0;
    const { startAdornment, endAdornment } = getInputAdornments({ icons: this.getRenderProp("icons") });
    return h(Host, { key: "33ca7883c15dd0f3f586e86ffd7dc37a935a5f55" }, h(FormFieldFC, Object.assign({ key: "54f2bf977693fcab734c72869173cae429634352" }, this.getFormFieldProps({
      class: "kol-input-range range",
      accessKey: this.getRenderProp("accessKey") || void 0,
      shortKey: this.getRenderProp("shortKey") || void 0,
      variant: this.getRenderProp("variant")
    })), h(InputContainerFC, { key: "8d6325bb3aae8b11bf039659e79fd3408251550b", disabled, msg: this.getRenderProp("msg"), touched: this.getRenderProp("touched"), startAdornment, endAdornment }, h(InputRangeInputsFC, { key: "79f44d08ab2bf23009a193fa45bed001cbe02d40", max, min }, h(InputFC, Object.assign({ key: "322eb34d3d5235fcc95aad49f3e9bcd3ae1155d3" }, shared, { class: BEM_CLASS_INPUT_RANGE__INPUT_RANGE, name: name ? `${name}-range` : void 0, list, type: "range", tabIndex: -1, id: void 0, accessKey: void 0, "aria-hidden": "true", ref: this.setRangeRef, ariaDescribedBy, "aria-invalid": ariaInvalid })), h(InputFC, Object.assign({ key: "c2aef5eb5883a1e71f4663e36a074e76464d3d35" }, shared, { class: BEM_CLASS_INPUT_RANGE__INPUT_NUMBER, name: name ? `${name}-number` : void 0, list, type: "number", ref: this.ctaRef, onKeyDown: this.handleNumberKeyDown, ariaDescribedBy, "aria-invalid": ariaInvalid }))), hasSuggestions && h(SuggestionsFC, { key: "0c8cd329f52708c644cf72b1db36dc2848b50e49", id: this.id, suggestions }))));
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
      "_autoComplete": [{
        "watchAutoComplete": 0
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
      "_max": [{
        "watchMax": 0
      }],
      "_min": [{
        "watchMin": 0
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
      "_shortKey": [{
        "watchShortKey": 0
      }],
      "_step": [{
        "watchStep": 0
      }],
      "_suggestions": [{
        "watchSuggestions": 0
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
], KolInputRange.prototype, "focus", null);
__decorate([
  delegateClick("ctaRef")
], KolInputRange.prototype, "click", null);
KolInputRange.style = {
  default: defaultStyleCss()
};
export {
  KolInputRange as kol_input_range
};
//# sourceMappingURL=kol-input-range.entry-42D2G2PA.js.map
