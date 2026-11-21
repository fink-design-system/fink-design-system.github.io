import {
  stepProp
} from "./chunk-IUICCRRD.js";
import {
  readOnlyProp
} from "./chunk-JCDFPB6R.js";
import {
  suggestionsProp
} from "./chunk-A3JKXIDT.js";
import {
  SuggestionsFC,
  autoCompleteProp
} from "./chunk-7UHTALH2.js";
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
import {
  smartButtonProp
} from "./chunk-FEDQEKWE.js";
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
import {
  clsx,
  createDependentPropDefinition,
  createPropDefinition,
  isEnumOption,
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
  deprecatedHint
} from "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-input-date.entry.js
var inputDateTypeOptions = ["date", "datetime-local", "month", "time", "week"];
var ISO_DATE_PATTERN = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])/;
var ISO_LOCAL_DATE_TIME_PATTERN = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])[T ][0-2]\d:[0-5]\d(:[0-5]\d(?:\.\d+)?)?/;
var ISO_MONTH_PATTERN = /^\d{4}-([0]\d|1[0-2])/;
var ISO_TIME_PATTERN = /^[0-2]\d:[0-5]\d(:[0-5]\d(?:\.\d+)?)?/;
var ISO_WEEK_PATTERN = /^\d{4}-W(?:[0-4]\d|5[0-3])$/;
function getIsoWeekNumber(date) {
  const copiedDate = new Date(date);
  const nDay = (copiedDate.getDay() + 6) % 7;
  copiedDate.setDate(copiedDate.getDate() - nDay + 3);
  const n1stThursday = copiedDate.valueOf();
  copiedDate.setMonth(0, 1);
  if (copiedDate.getDay() !== 4) {
    copiedDate.setMonth(0, 1 + (4 - copiedDate.getDay() + 7) % 7);
  }
  const weekNumber = 1 + Math.ceil((n1stThursday - copiedDate.valueOf()) / 6048e5);
  return weekNumber.toString().padStart(2, "0");
}
function formatIsoDate(value, type, step) {
  if (typeof value === "string" || value === null) {
    return value;
  }
  if (value instanceof Date) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    const hours = String(value.getHours()).padStart(2, "0");
    const minutes = String(value.getMinutes()).padStart(2, "0");
    const seconds = String(value.getSeconds()).padStart(2, "0");
    const date = [year, month, day].join("-");
    const timeWithSeconds = [hours, minutes, seconds].join(":");
    switch (type) {
      case "date":
        return date;
      case "datetime-local":
        return `${date}T${timeWithSeconds}`;
      case "month":
        return `${year}-${month}`;
      case "time":
        return step === void 0 || String(step) === "60" ? `${hours}:${minutes}` : timeWithSeconds;
      case "week":
        return `${year}-W${getIsoWeekNumber(value)}`;
    }
  }
  return void 0;
}
function isIsoDateString(value, type) {
  switch (type) {
    case "date":
      return ISO_DATE_PATTERN.test(value);
    case "datetime-local":
      return ISO_LOCAL_DATE_TIME_PATTERN.test(value);
    case "month":
      return ISO_MONTH_PATTERN.test(value);
    case "time":
      return ISO_TIME_PATTERN.test(value);
    case "week":
      return ISO_WEEK_PATTERN.test(value);
    default:
      return false;
  }
}
function normalizeInputDate(value, { type, step }) {
  return formatIsoDate(value, type, step);
}
function isValidInputDate(value, { type }) {
  return value === void 0 || value === null || value === "" || isIsoDateString(value, type);
}
var inputDateMaxProp = createDependentPropDefinition("max", void 0, normalizeInputDate, isValidInputDate);
var inputDateMinProp = createDependentPropDefinition("min", void 0, normalizeInputDate, isValidInputDate);
function normalizeInputDateType(value) {
  const str = normalizeString(value);
  if (isEnumOption(str, inputDateTypeOptions)) {
    return str;
  }
  throw new Error(`Invalid input date type: ${str}`);
}
var inputDateTypeProp = createPropDefinition("type", "date", normalizeInputDateType);
var inputDateValueProp = createDependentPropDefinition("value", void 0, normalizeInputDate, isValidInputDate);
function getDateValueType(value) {
  if (value instanceof Date) {
    return "Date";
  }
  if (typeof value === "string") {
    return "String";
  }
  return null;
}
function remapDateValue(raw, type) {
  if (raw === "") {
    return null;
  }
  if (type !== "Date") {
    return raw;
  }
  return parseDateValue(raw);
}
var DATE_ONLY_ISO = /^(\d{4})-(\d{2})-(\d{2})$/;
function parseDateValue(raw) {
  const match = DATE_ONLY_ISO.exec(raw);
  if (!match) {
    return new Date(raw);
  }
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}
var inputDatePropsConfig = {
  required: [...formFieldBasePropsConfig.required],
  optional: [
    ...formFieldBasePropsConfig.optional,
    accessKeyProp,
    autoCompleteProp,
    horizontalIconsProp,
    inputDateMaxProp,
    inputDateMinProp,
    inputDateTypeProp,
    inputDateValueProp,
    readOnlyProp,
    requiredProp,
    shortKeyProp,
    smartButtonProp,
    stepProp,
    suggestionsProp,
    variantProp
  ]
};
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-button {     background-color: transparent;     display: inline-block;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     margin: 0;     padding: 0;          text-align: center;        }   .kol-button__interactive-element {     border-style: none;     display: block;     border-width: medium;          font-weight: inherit;     font-style: inherit;     text-align: inherit;   }   .kol-button {        }   .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   }   .kol-form-field .kol-popover-button {          display: inline;   }   .kol-form-field .kol-popover-button__popover {     margin: 0;     padding: 0;     border: 0;   }   .kol-form-field .kol-popover-button--open .kol-button__tooltip {     display: none;   }   .kol-form-field .kol-popover-button--inline {     display: inline-block;        }   .kol-form-field .kol-popover-button--inline .kol-button,   .kol-form-field .kol-popover-button--inline .kol-button .kol-button__interactive-element {     min-width: 0;     min-height: 1em;   }   .kol-form-field .kol-popover {     opacity: 0;     transition: 0.2s ease-out opacity;   }   .kol-form-field .kol-popover-button--open .kol-popover-button__popover {     opacity: 1;   }   .kol-form-field {     display: grid;   }   .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {     cursor: pointer;   }   .kol-form-field__label {     display: flex;   }   .kol-form-field__label-text {     flex-flow: row;     align-items: flex-start;     justify-content: flex-start;   }   .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden]) .kol-span__label::after, .kol-form-field--required:not(:has(.kol-form-field__label--legend)) .kol-form-field__input .kol-tooltip__content .kol-span__label::after {     content: "*"/"";   }   .kol-input-container {     background-color: transparent;     display: grid;     position: relative;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     grid-template-columns: 1fr;   }   .kol-input-container:has(> .kol-input-container__adornment--start) {     grid-template-columns: auto 1fr auto;   }   .kol-input-container__container {     position: relative;     z-index: 1;   }   .kol-input-container__adornment {     display: flex;     align-items: center;   }   .kol-input-container__adornment .kol-icon {     display: grid;     place-items: center;   }   .kol-input {     background-color: transparent;     width: 100%;     min-width: var(--a11y-min-size);   }   .kol-input {     cursor: text;   }   .kol-input::-webkit-calendar-picker-indicator {     cursor: pointer;   } }`;
var dateBem = bem.forBlock("kol-input-date");
var KolInputDate = class extends BaseFormFieldWebComponent {
  constructor(hostRef) {
    super();
    if (new.target === KolInputDate)
      registerInstance(this, hostRef);
    this.id = createUniqueId("input-date");
    this.infoPopoverOpen = false;
    this.inputHasFocus = false;
    this.hasValue = false;
    this.ctaRef = createCtaRef();
    this.valueType = null;
    this.propsConfig = inputDatePropsConfig;
    this._accessKey = void 0;
    this._ariaDetails = void 0;
    this._autoComplete = "off";
    this._disabled = false;
    this._hideMsg = false;
    this._hideLabel = false;
    this._hint = "";
    this._icons = void 0;
    this._infoPopover = void 0;
    this._max = void 0;
    this._min = void 0;
    this._msg = void 0;
    this._name = void 0;
    this._on = void 0;
    this._readOnly = false;
    this._required = false;
    this._shortKey = void 0;
    this._smartButton = void 0;
    this._suggestions = void 0;
    this._syncValueBySelector = void 0;
    this._step = void 0;
    this._tooltipAlign = "top";
    this._touched = false;
    this._type = "date";
    this._value = void 0;
    this._variant = void 0;
    this.handleDateInput = (event) => {
      const value = this.readValue(event);
      this._value = value;
      this.handleInput(event, value);
    };
    this.handleDateChange = (event) => {
      const value = this.readValue(event);
      this.handleChange(event, value);
      this.hasValue = Boolean(value);
    };
    this.handleDateBlur = (event) => {
      this.handleBlur(event);
      const value = event.target.value;
      if (Boolean(value) !== Boolean(this._value)) {
        this._value = value;
      }
    };
    this.handleDateKeyDown = (event) => {
      this.handleKeyDown(event);
      submitFormOnEnter(event, { form: this.host, ref: this.ctaRef.el });
      if (this.getRenderProp("readOnly") && event.code === "Space") {
        event.preventDefault();
      }
    };
    this.initFormAssociation("date", this._name);
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
    inputDateMaxProp.apply(value, (v) => this.setRenderProp("max", v), this.dateDeps);
  }
  watchMin(value) {
    inputDateMinProp.apply(value, (v) => this.setRenderProp("min", v), this.dateDeps);
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
  watchReadOnly(value) {
    readOnlyProp.apply(value, (v) => this.setRenderProp("readOnly", v));
  }
  watchRequired(value) {
    requiredProp.apply(value, (v) => this.setRenderProp("required", v));
  }
  watchShortKey(value) {
    shortKeyProp.apply(value, (v) => this.setRenderProp("shortKey", v));
    validateAccessAndShortKey(this._accessKey, value);
  }
  watchSmartButton(value) {
    if (value === void 0 || value === null) {
      this.unsetRenderProp("smartButton");
    } else {
      smartButtonProp.apply(value, (v) => this.setRenderProp("smartButton", v));
    }
  }
  watchSuggestions(value) {
    suggestionsProp.apply(value, (v) => this.setRenderProp("suggestions", v));
  }
  watchSyncValueBySelector(value) {
    this.applySyncValueBySelector(value);
  }
  watchStep(value) {
    stepProp.apply(value, (v) => this.setRenderProp("step", v));
  }
  watchTooltipAlign(value) {
    this.applyTooltipAlign(value);
  }
  watchTouched(value) {
    this.applyTouched(value);
  }
  watchType(value) {
    inputDateTypeProp.apply(value, (v) => this.setRenderProp("type", v));
  }
  watchValue(value) {
    var _a;
    if (value instanceof Date) {
      deprecatedHint("Date type will be removed in v3. Use `Iso8601` instead.");
    }
    inputDateValueProp.apply(value, (v) => this.setRenderProp("value", v), this.dateDeps);
    this.formAssociation.setFormAssociatedValue((_a = this.getRenderProp("value")) !== null && _a !== void 0 ? _a : null);
    if (value !== void 0 && value !== null) {
      this.valueType = getDateValueType(value);
    }
  }
  watchVariant(value) {
    variantProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  getValue() {
    return Promise.resolve(this.ctaRef.el && remapDateValue(this.ctaRef.el.value, this.valueType));
  }
  focus(options) {
    return Promise.resolve();
  }
  async click() {
    return Promise.resolve();
  }
  reset() {
    this.setRenderProp("value", void 0);
    this.hasValue = false;
    this.formAssociation.setFormAssociatedValue("");
    if (this.ctaRef.el) {
      this.ctaRef.el.value = "";
    }
    return Promise.resolve();
  }
  componentWillLoad() {
    this.unsetRenderProp("smartButton");
    if (this._value !== void 0) {
      this.valueType = getDateValueType(this._value);
    }
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
    this.watchSmartButton(this._smartButton);
    this.watchOn(this._on);
    this.watchTooltipAlign(this._tooltipAlign);
    this.watchVariant(this._variant);
    this.watchIcons(this._icons);
    this.watchAutoComplete(this._autoComplete);
    this.watchMax(this._max);
    this.watchMin(this._min);
    this.watchSuggestions(this._suggestions);
    this.watchReadOnly(this._readOnly);
    this.watchRequired(this._required);
    this.watchStep(this._step);
    this.watchType(this._type);
    this.watchValue(this._value);
    this.hasValue = Boolean(this.getRenderProp("value"));
  }
  componentDidRender() {
    this.syncFormField();
  }
  disconnectedCallback() {
    this.destroyFormField();
  }
  get dateDeps() {
    return { type: this._type, step: this._step };
  }
  readValue(event) {
    return remapDateValue(event.target.value, this.valueType);
  }
  getInputProps() {
    var _a, _b, _c, _d;
    const id = this.id;
    const accessKey = this.getRenderProp("accessKey");
    const shortKey = this.getRenderProp("shortKey");
    const suggestions = this.getRenderProp("suggestions");
    const { ariaDescribedBy, hasError } = this.getAria();
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ id, hideLabel: this.getRenderProp("hideLabel"), label: this.getRenderProp("label"), disabled: this.getRenderProp("disabled"), name: this.getRenderProp("name") || void 0 }, accessKey ? { accessKey } : {}), { type: this.getRenderProp("type"), value: (_a = this.getRenderProp("value")) !== null && _a !== void 0 ? _a : this._value === null ? null : void 0, required: this.getRenderProp("required"), autoComplete: this.getRenderProp("autoComplete"), readonly: this.getRenderProp("readOnly"), min: (_b = this.getRenderProp("min")) !== null && _b !== void 0 ? _b : this._min === null ? null : void 0, max: (_c = this.getRenderProp("max")) !== null && _c !== void 0 ? _c : this._max === null ? null : void 0, step: (_d = this.getRenderProp("step")) !== null && _d !== void 0 ? _d : null, touched: this.getRenderProp("touched"), msg: this.getRenderProp("msg") }), shortKey ? { "aria-keyshortcuts": shortKey } : {}), suggestions.length > 0 ? { suggestions: h(SuggestionsFC, { id, suggestions }) } : {}), { ref: this.ctaRef, onBlur: this.handleDateBlur, onChange: this.handleDateChange, onClick: this.handleClick, onFocus: this.handleFocus, onInput: this.handleDateInput, onKeyDown: this.handleDateKeyDown, ariaDescribedBy, "aria-invalid": hasError ? "true" : void 0 });
  }
  render() {
    const disabled = this.getRenderProp("disabled");
    const { startAdornment, endAdornment } = getInputAdornments({
      icons: this.getRenderProp("icons"),
      smartButton: this.getSmartButtonFcProps(this.getRenderProp("smartButton"), disabled)
    });
    return h(Host, { key: "5927ba049cedee1387da8ac344d45839bf7b5273" }, h(FormFieldFC, Object.assign({ key: "569e5d28c5a9cd6549156c2f55a65408246fc68f" }, this.getFormFieldProps({
      class: clsx(dateBem(), this.getRenderProp("type"), {
        "has-value": this.hasValue
      }),
      accessKey: this.getRenderProp("accessKey") || void 0,
      shortKey: this.getRenderProp("shortKey") || void 0,
      variant: this.getRenderProp("variant"),
      required: this.getRenderProp("required"),
      readOnly: this.getRenderProp("readOnly")
    })), h(InputContainerFC, { key: "1480cd1c9c6a8b4dc9a321c90a60c29e555292da", disabled, msg: this.getRenderProp("msg"), touched: this.getRenderProp("touched"), startAdornment, endAdornment }, h(InputFC, Object.assign({ key: "5fd31dcad9dade642ed77bc6117a085d9b03f7e2" }, this.getInputProps())))));
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
      "_readOnly": [{
        "watchReadOnly": 0
      }],
      "_required": [{
        "watchRequired": 0
      }],
      "_shortKey": [{
        "watchShortKey": 0
      }],
      "_smartButton": [{
        "watchSmartButton": 0
      }],
      "_suggestions": [{
        "watchSuggestions": 0
      }],
      "_syncValueBySelector": [{
        "watchSyncValueBySelector": 0
      }],
      "_step": [{
        "watchStep": 0
      }],
      "_tooltipAlign": [{
        "watchTooltipAlign": 0
      }],
      "_touched": [{
        "watchTouched": 0
      }],
      "_type": [{
        "watchType": 0
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
], KolInputDate.prototype, "focus", null);
__decorate([
  delegateClick("ctaRef")
], KolInputDate.prototype, "click", null);
KolInputDate.style = {
  default: defaultStyleCss()
};
export {
  KolInputDate as kol_input_date
};
//# sourceMappingURL=kol-input-date.entry-AFU3DQLO.js.map
