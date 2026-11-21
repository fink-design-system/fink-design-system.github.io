import {
  FieldControlFC
} from "./chunk-TARLL3CL.js";
import {
  requiredProp
} from "./chunk-EO54MTV4.js";
import {
  InputFC
} from "./chunk-KCFEVKMH.js";
import {
  BaseFormFieldWebComponent,
  FormFieldFC,
  formFieldBasePropsConfig,
  getMsgType,
  isMsgDefinedAndInputTouched
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
  shortKeyProp
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
import {
  IconFC
} from "./chunk-NQNQ4CHG.js";
import {
  __decorate,
  __rest
} from "./chunk-7UI7W6EF.js";
import "./chunk-TR6JQWDR.js";
import "./chunk-QVVQWVZC.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  clsx,
  createPropDefinition,
  normalizeBoolean,
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
import "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-input-checkbox.entry.js
var inputCheckboxVariantOptions = ["button", "default", "switch"];
var checkboxValueProp = createPropDefinition("value", true, (value) => value);
var checkedProp = createPropDefinition("checked", false, normalizeBoolean);
var iconKeys = ["checked", "indeterminate", "unchecked"];
var isIconClass = (value) => typeof value === "string" && value.length > 0;
var iconsInputCheckboxProp = createPropDefinition("icons", {
  checked: "kolicon-check",
  indeterminate: "kolicon-minus",
  unchecked: "kolicon-cross"
}, (value) => {
  if (typeof value === "object" && value !== null && iconKeys.some((key) => isIconClass(value[key]))) {
    return value;
  }
  throw new Error("Expected an object with at least one icon class of checked, indeterminate or unchecked");
});
var indeterminateProp = createPropDefinition("indeterminate", false, normalizeBoolean);
var labelAlignOptions = ["left", "right"];
var labelAlignProp = createPropDefinition("labelAlign", "right", (value) => {
  const str = normalizeString(value);
  if (labelAlignOptions.includes(str)) {
    return str;
  }
  throw new Error(`Invalid label alignment: ${str}`);
});
var variantInputCheckboxProp = createPropDefinition("variant", "default", (value) => {
  const str = normalizeString(value);
  if (inputCheckboxVariantOptions.includes(str)) {
    return str;
  }
  throw new Error(`Invalid checkbox variant: ${str}`);
});
var checkboxBem$1 = bem.forBlock("kol-checkbox");
var CheckboxFC = (_a) => {
  var { class: classNames, variant = "default", icon, inputProps } = _a, other = __rest(_a, ["class", "variant", "icon", "inputProps"]);
  const { class: inputClass } = inputProps, restInputProps = __rest(inputProps, ["class"]);
  return h(BemRootNodeFC, Object.assign({ component: "label", block: "kol-checkbox", modifiers: Object.assign({ "variant-button": variant === "button", "variant-default": variant === "default", "variant-switch": variant === "switch", checked: Boolean(inputProps.checked), indeterminate: Boolean(inputProps.indeterminate), disabled: Boolean(inputProps.disabled), required: Boolean(inputProps.required), touched: Boolean(inputProps.touched) }, isMsgDefinedAndInputTouched(inputProps.msg, inputProps.touched) ? { [getMsgType(inputProps.msg)]: true } : {}), class: classNames }, other), h(IconFC, { label: "", icons: icon, class: checkboxBem$1("icon") }), h(InputFC, Object.assign({ class: clsx(checkboxBem$1("input"), inputClass) }, restInputProps, { type: "checkbox" })));
};
var inputCheckboxPropsConfig = {
  required: [...formFieldBasePropsConfig.required],
  optional: [
    ...formFieldBasePropsConfig.optional,
    accessKeyProp,
    checkboxValueProp,
    checkedProp,
    iconsInputCheckboxProp,
    indeterminateProp,
    labelAlignProp,
    requiredProp,
    shortKeyProp,
    variantInputCheckboxProp
  ]
};
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   }   .kol-form-field .kol-popover-button {          display: inline;   }   .kol-form-field .kol-popover-button__popover {     margin: 0;     padding: 0;     border: 0;   }   .kol-form-field .kol-popover-button--open .kol-button__tooltip {     display: none;   }   .kol-form-field .kol-popover-button--inline {     display: inline-block;        }   .kol-form-field .kol-popover-button--inline .kol-button,   .kol-form-field .kol-popover-button--inline .kol-button .kol-button__interactive-element {     min-width: 0;     min-height: 1em;   }   .kol-form-field .kol-popover {     opacity: 0;     transition: 0.2s ease-out opacity;   }   .kol-form-field .kol-popover-button--open .kol-popover-button__popover {     opacity: 1;   }   .kol-form-field {     display: grid;   }   .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {     cursor: pointer;   }   .kol-form-field__label {     display: flex;   }   .kol-form-field__label-text {     flex-flow: row;     align-items: flex-start;     justify-content: flex-start;   }   .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden]) .kol-span__label::after, .kol-form-field--required:not(:has(.kol-form-field__label--legend)) .kol-form-field__input .kol-tooltip__content .kol-span__label::after {     content: "*"/"";   }   .kol-field-control {     display: grid;     min-height: var(--a11y-min-size);     align-items: center;     justify-content: left;     grid-template-areas: "input label";     grid-template-columns: auto 1fr;     grid-template-rows: auto;   }   .kol-field-control:has(.kol-field-control__hint) {     grid-template-areas: "input label" "hint hint";     grid-template-columns: auto 1fr;     grid-template-rows: auto auto;   }   .kol-field-control--label-align-left:not(.kol-field-control--hide-label) {     grid-template-areas: "label input";     grid-template-columns: 1fr auto;     grid-template-rows: auto;   }   .kol-field-control--label-align-left:not(.kol-field-control--hide-label):has(.kol-field-control__hint) {     grid-template-areas: "label input" "hint hint";     grid-template-columns: 1fr auto;     grid-template-rows: auto auto;   }   .kol-field-control__input {     display: flex;     min-height: var(--a11y-min-size);     align-items: center;     grid-area: input;   }   .kol-field-control__label {     display: flex;     min-height: var(--a11y-min-size);     flex-grow: 1;     align-items: center;     cursor: pointer;     grid-area: label;   }   .kol-field-control__label--visually-hidden {     display: none;     height: 0;     margin: 0;     padding: 0;     visibility: hidden;   }   .kol-field-control__label-text {     flex-flow: row;     align-items: flex-start;     justify-content: flex-start;   }   .kol-field-control__hint {     grid-area: hint;   }   .kol-field-control--disabled .kol-field-control__label {     cursor: not-allowed;   }   .kol-field-control--required .kol-field-control__label-text:has(.kol-span__slot[hidden])::after,   .kol-field-control--required .kol-tooltip__content .kol-span__label::after {     content: "*"/"";   }   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-form-field {     display: grid;   }   .kol-form-field__label-text {     display: ruby;   }   .kol-checkbox {     display: flex;     position: relative;     align-items: center;     cursor: pointer;   }   .kol-checkbox--disabled {     cursor: not-allowed;   }   .kol-checkbox .kol-input {     background-color: white;     border-style: solid;     margin: 0;     border-width: 2px;     appearance: none;     cursor: inherit;   }   .kol-checkbox .kol-input:before {     content: "";   }      .kol-checkbox--variant-default {     position: relative;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     justify-content: center;   }   .kol-checkbox--variant-default .kol-icon {     display: none;     position: absolute;     inset: auto;     z-index: 1;     pointer-events: none;   }   .kol-checkbox--variant-default .kol-input {     width: calc(22 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(22 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-checkbox--variant-default.kol-checkbox--checked .kol-icon, .kol-checkbox--variant-default.kol-checkbox--indeterminate .kol-icon {     display: block;   }      .kol-checkbox--variant-switch {     position: relative;   }   .kol-checkbox--variant-switch .kol-input {     display: inline-block;     position: relative;     width: 3.2em;     min-width: 3.2em;     height: 1.7em;   }   .kol-checkbox--variant-switch .kol-input::before {     background-color: black;     position: absolute;     top: calc(0.25em - 2 * 1rem / var(--kolibri-root-font-size, 16));     left: calc(0.25em - 2 * 1rem / var(--kolibri-root-font-size, 16));     width: 1.2em;     height: 1.2em;     transition: 0.5s;   }   .kol-checkbox--variant-switch .kol-input:checked::before {     transform: translateX(1.5em);   }   .kol-checkbox--variant-switch .kol-input:indeterminate::before {     transform: translateX(0.75em);   }   .kol-checkbox--variant-switch .kol-icon {     transform: translate(0, -50%);     color: black;     display: flex;     position: absolute;     top: 50%;     left: calc(4 * 1rem / var(--kolibri-root-font-size, 16));     z-index: 1;     width: 1.2em;     height: 1.2em;     align-items: center;     justify-content: center;     transition: 0.5s;   }   .kol-checkbox--variant-switch.kol-checkbox--checked .kol-icon {     transform: translate(1.5em, -50%);   }   .kol-checkbox--variant-switch.kol-checkbox--indeterminate .kol-icon {     transform: translate(0.75em, -50%);   }      .kol-checkbox--variant-button {     min-width: var(--a11y-min-size);   }   .kol-checkbox--variant-button .kol-icon {     display: flex;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     justify-content: center;   } }`;
var checkboxBem = bem.forBlock("kol-input-checkbox");
var KolInputCheckbox = class extends BaseFormFieldWebComponent {
  constructor(hostRef) {
    super();
    if (new.target === KolInputCheckbox)
      registerInstance(this, hostRef);
    this.id = createUniqueId("input-checkbox");
    this.infoPopoverOpen = false;
    this.inputHasFocus = false;
    this.ctaRef = createCtaRef();
    this.propsConfig = inputCheckboxPropsConfig;
    this._accessKey = void 0;
    this._checked = false;
    this._hideMsg = false;
    this._disabled = false;
    this._hideLabel = false;
    this._hint = "";
    this._icons = void 0;
    this._infoPopover = void 0;
    this._indeterminate = void 0;
    this._labelAlign = "right";
    this._msg = void 0;
    this._name = void 0;
    this._on = void 0;
    this._required = false;
    this._ariaDetails = void 0;
    this._shortKey = void 0;
    this._syncValueBySelector = void 0;
    this._tooltipAlign = "top";
    this._touched = false;
    this._value = true;
    this._variant = "default";
    this.handleCheckboxInput = (event) => {
      this._checked = !this._checked;
      this._indeterminate = false;
      this.handleInput(event, this.getModelValue());
    };
    this.handleCheckboxChange = (event) => {
      this.handleChange(event, this.getModelValue());
    };
    this.handleCheckboxKeyDown = (event) => {
      this.handleKeyDown(event);
      submitFormOnEnter(event, { form: this.host, ref: this.ctaRef.el });
    };
    this.handleCheckboxBlur = (event) => {
      if (this._disabled) {
        return;
      }
      this.handleBlur(event);
    };
    this.handleLabelMouseDown = (event) => {
      if (this.inputHasFocus) {
        event.preventDefault();
      }
    };
    this.handleCheckboxMouseDown = (event) => {
      if (this.inputHasFocus && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault();
      }
    };
    this.initFormAssociation("checkbox", this._name);
  }
  watchAccessKey(value) {
    accessKeyProp.apply(value, (v) => this.setRenderProp("accessKey", v));
    validateAccessAndShortKey(value, this._shortKey);
  }
  watchChecked(value) {
    checkedProp.apply(value, (v) => this.setRenderProp("checked", v));
    this.syncFormAssociatedValue();
  }
  watchHideMsg(value) {
    this.applyHideMsg(value);
  }
  watchDisabled(value) {
    this.applyDisabled(value);
  }
  watchHideLabel(value) {
    this.applyHideLabel(value);
  }
  watchHint(value) {
    this.applyHint(value);
  }
  watchIcons(value) {
    iconsInputCheckboxProp.apply(value, (v) => this.setRenderProp("icons", Object.assign(Object.assign({}, this.getRenderProp("icons")), v)));
  }
  watchInfoPopover(value) {
    this.applyInfoPopover(value);
  }
  watchIndeterminate(value) {
    indeterminateProp.apply(value, (v) => this.setRenderProp("indeterminate", v));
  }
  watchLabel(value) {
    this.applyLabel(value);
  }
  watchLabelAlign(value) {
    labelAlignProp.apply(value, (v) => this.setRenderProp("labelAlign", v));
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
  watchRequired(value) {
    requiredProp.apply(value, (v) => this.setRenderProp("required", v));
  }
  watchAriaDetails(value) {
    this.applyAriaDetails(value);
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
    if (value === null || value === void 0) {
      this.setRenderProp("value", value);
    } else {
      checkboxValueProp.apply(value, (v) => this.setRenderProp("value", v));
    }
    this.syncFormAssociatedValue();
  }
  watchVariant(value) {
    variantInputCheckboxProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  getValue() {
    return Promise.resolve(this.getModelValue());
  }
  focus(options) {
    return Promise.resolve();
  }
  async click() {
    return Promise.resolve();
  }
  componentWillLoad() {
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
    this.watchRequired(this._required);
    this.watchChecked(this._checked);
    this.watchIcons(this._icons);
    this.watchIndeterminate(this._indeterminate);
    this.watchValue(this._value);
    this.watchVariant(this._variant);
    this.watchLabelAlign(this._labelAlign);
  }
  componentDidRender() {
    this.syncFormField();
  }
  disconnectedCallback() {
    this.destroyFormField();
  }
  getModelValue() {
    return this._checked ? this.getRenderProp("value") : null;
  }
  syncFormAssociatedValue() {
    this.formAssociation.setFormAssociatedValue(this.getModelValue());
  }
  getIcon() {
    const icons = this.getRenderProp("icons");
    if (this.getRenderProp("indeterminate"))
      return icons.indeterminate;
    if (this.getRenderProp("checked"))
      return icons.checked;
    return icons.unchecked;
  }
  getInputProps() {
    const shortKey = this.getRenderProp("shortKey");
    const { ariaDescribedBy, hasError } = this.getAria();
    return Object.assign(Object.assign({ id: this.id, hideLabel: this.getRenderProp("hideLabel"), label: this.getRenderProp("label"), value: this.getRenderProp("value"), accessKey: this.getRenderProp("accessKey") || void 0, disabled: this.getRenderProp("disabled"), name: this._name === void 0 || this._name === null ? void 0 : this.getRenderProp("name"), ariaDescribedBy, required: this.getRenderProp("required"), checked: this.getRenderProp("checked"), indeterminate: this.getRenderProp("indeterminate"), touched: this.getRenderProp("touched"), msg: this.getRenderProp("msg") }, shortKey ? { "aria-keyshortcuts": shortKey } : {}), { class: clsx({
      "visually-hidden": this.getRenderProp("variant") === "button"
    }), ref: this.ctaRef, onBlur: this.handleCheckboxBlur, onChange: this.handleCheckboxChange, onFocus: this.handleFocus, onInput: this.handleCheckboxInput, onKeyDown: this.handleCheckboxKeyDown, "aria-invalid": hasError ? "true" : void 0 });
  }
  render() {
    const checked = this.getRenderProp("checked");
    const indeterminate = this.getRenderProp("indeterminate");
    const variant = this.getRenderProp("variant");
    const accessKey = this.getRenderProp("accessKey") || void 0;
    const shortKey = this.getRenderProp("shortKey") || void 0;
    const required = this.getRenderProp("required");
    return h(Host, { key: "9d8f9f1a76d6136279e2a16390c26d358de089cf" }, h(FormFieldFC, Object.assign({ key: "bc3e19723334f11f76b6f41881aae1eb1896e0a7" }, this.getFormFieldProps({
      class: checkboxBem({
        checked,
        indeterminate,
        [`variant-${variant}`]: true,
        [`label-align-${this.getRenderProp("labelAlign")}`]: true
      }),
      accessKey,
      shortKey,
      required,
      renderNoLabel: true,
      renderNoTooltip: true
    })), h(FieldControlFC, Object.assign({ key: "189767fc96708075bd579d260a4d1425fe243a28", class: checkboxBem("field-control", {
      checked,
      indeterminate,
      [`variant-${variant}`]: true
    }), id: this.id, label: this.getRenderProp("label"), hint: this.getRenderProp("hint"), hideLabel: this.getRenderProp("hideLabel"), labelAlign: this.getRenderProp("labelAlign"), infoPopover: this.getInfoPopover(), accessKey, shortKey, tooltipAlign: this.getRenderProp("tooltipAlign"), disabled: this.getRenderProp("disabled"), msg: this.getRenderProp("msg"), touched: this.getRenderProp("touched"), required, renderNoHint: true, labelProps: { onMouseDown: this.handleLabelMouseDown } }, this.getLabelTooltipRefs()), h(CheckboxFC, { key: "f15b1f35a6abd220c7af82c6e07378d4e88713ff", variant, icon: this.getIcon(), onMouseDown: this.handleCheckboxMouseDown, inputProps: this.getInputProps() }))));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_accessKey": [{
        "watchAccessKey": 0
      }],
      "_checked": [{
        "watchChecked": 0
      }],
      "_hideMsg": [{
        "watchHideMsg": 0
      }],
      "_disabled": [{
        "watchDisabled": 0
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
      "_indeterminate": [{
        "watchIndeterminate": 0
      }],
      "_label": [{
        "watchLabel": 0
      }],
      "_labelAlign": [{
        "watchLabelAlign": 0
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
      "_required": [{
        "watchRequired": 0
      }],
      "_ariaDetails": [{
        "watchAriaDetails": 0
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
], KolInputCheckbox.prototype, "focus", null);
__decorate([
  delegateClick("ctaRef")
], KolInputCheckbox.prototype, "click", null);
KolInputCheckbox.style = {
  default: defaultStyleCss()
};
export {
  KolInputCheckbox as kol_input_checkbox
};
//# sourceMappingURL=kol-input-checkbox.entry-WZJNEA23.js.map
