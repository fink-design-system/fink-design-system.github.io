import {
  createOptionsPropDefinition
} from "./chunk-ZRC64XBS.js";
import {
  normalizeOrientation
} from "./chunk-E2FZTTZB.js";
import {
  fillKeyOptionMap,
  normalizeOptionValues
} from "./chunk-LS75FUCA.js";
import {
  FieldControlFC,
  isFieldControlLabelShownAsTooltip
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
import "./chunk-AEQ2DHFL.js";
import "./chunk-6OHARAC5.js";
import "./chunk-U3F5DQBF.js";
import "./chunk-Q4L7LM2W.js";
import "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import "./chunk-AIH4BWIT.js";
import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
import "./chunk-3C6UB25G.js";
import {
  variantProp
} from "./chunk-JIRF5MWS.js";
import "./chunk-FGYUAXNO.js";
import "./chunk-7Q2QTJQF.js";
import "./chunk-7C3Y25NJ.js";
import "./chunk-MIXJLZBB.js";
import {
  delegateClick$1,
  setClick
} from "./chunk-VFFG6S5V.js";
import {
  createRelatedUniqueId,
  createUniqueId
} from "./chunk-FQ2Y4FDM.js";
import "./chunk-SESBZTFK.js";
import {
  delegateFocus,
  setFocus
} from "./chunk-ZVS5ACKA.js";
import "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
import "./chunk-TR6JQWDR.js";
import "./chunk-QVVQWVZC.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  clsx,
  createPropDefinition
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

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-input-radio.entry.js
var radioOptionsProp = createOptionsPropDefinition();
var radioOrientationProp = createPropDefinition("orientation", "vertical", normalizeOrientation);
var radioValueProp = createPropDefinition("value", null, (value) => Array.isArray(value) ? value[0] : value);
var radioBem = bem.forBlock("kol-input-radio");
var RadioFC = (_a) => {
  var { class: classNames, inputProps } = _a, other = __rest(_a, ["class", "inputProps"]);
  const { class: inputClass } = inputProps, restInputProps = __rest(inputProps, ["class"]);
  return h(BemRootNodeFC, Object.assign({ component: "label", block: "kol-input-radio", modifiers: Object.assign({ checked: Boolean(inputProps.checked), disabled: Boolean(inputProps.disabled), required: Boolean(inputProps.required), touched: Boolean(inputProps.touched) }, isMsgDefinedAndInputTouched(inputProps.msg, inputProps.touched) ? { [getMsgType(inputProps.msg)]: true } : {}), class: classNames }, other), h(InputFC, Object.assign({ class: clsx(radioBem("input"), inputClass) }, restInputProps, { type: "radio" })));
};
var inputRadioPropsConfig = {
  required: [...formFieldBasePropsConfig.required],
  optional: [...formFieldBasePropsConfig.optional, radioOptionsProp, radioOrientationProp, radioValueProp, requiredProp, variantProp]
};
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   }   .kol-field-control {     display: grid;     min-height: var(--a11y-min-size);     align-items: center;     justify-content: left;     grid-template-areas: "input label";     grid-template-columns: auto 1fr;     grid-template-rows: auto;   }   .kol-field-control:has(.kol-field-control__hint) {     grid-template-areas: "input label" "hint hint";     grid-template-columns: auto 1fr;     grid-template-rows: auto auto;   }   .kol-field-control--label-align-left:not(.kol-field-control--hide-label) {     grid-template-areas: "label input";     grid-template-columns: 1fr auto;     grid-template-rows: auto;   }   .kol-field-control--label-align-left:not(.kol-field-control--hide-label):has(.kol-field-control__hint) {     grid-template-areas: "label input" "hint hint";     grid-template-columns: 1fr auto;     grid-template-rows: auto auto;   }   .kol-field-control__input {     display: flex;     min-height: var(--a11y-min-size);     align-items: center;     grid-area: input;   }   .kol-field-control__label {     display: flex;     min-height: var(--a11y-min-size);     flex-grow: 1;     align-items: center;     cursor: pointer;     grid-area: label;   }   .kol-field-control__label--visually-hidden {     display: none;     height: 0;     margin: 0;     padding: 0;     visibility: hidden;   }   .kol-field-control__label-text {     flex-flow: row;     align-items: flex-start;     justify-content: flex-start;   }   .kol-field-control__hint {     grid-area: hint;   }   .kol-field-control--disabled .kol-field-control__label {     cursor: not-allowed;   }   .kol-field-control--required .kol-field-control__label-text:has(.kol-span__slot[hidden])::after,   .kol-field-control--required .kol-tooltip__content .kol-span__label::after {     content: "*"/"";   }   .kol-form-field .kol-popover-button {          display: inline;   }   .kol-form-field .kol-popover-button__popover {     margin: 0;     padding: 0;     border: 0;   }   .kol-form-field .kol-popover-button--open .kol-button__tooltip {     display: none;   }   .kol-form-field .kol-popover-button--inline {     display: inline-block;        }   .kol-form-field .kol-popover-button--inline .kol-button,   .kol-form-field .kol-popover-button--inline .kol-button .kol-button__interactive-element {     min-width: 0;     min-height: 1em;   }   .kol-form-field .kol-popover {     opacity: 0;     transition: 0.2s ease-out opacity;   }   .kol-form-field .kol-popover-button--open .kol-popover-button__popover {     opacity: 1;   }   .kol-form-field {     display: grid;   }   .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {     cursor: pointer;   }   .kol-form-field__label {     display: flex;   }   .kol-form-field__label-text {     flex-flow: row;     align-items: flex-start;     justify-content: flex-start;   }   .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden]) .kol-span__label::after, .kol-form-field--required:not(:has(.kol-form-field__label--legend)) .kol-form-field__input .kol-tooltip__content .kol-span__label::after {     content: "*"/"";   }   .kol-input-container {     background-color: transparent;     display: grid;     position: relative;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     grid-template-columns: 1fr;   }   .kol-input-container:has(> .kol-input-container__adornment--start) {     grid-template-columns: auto 1fr auto;   }   .kol-input-container__container {     position: relative;     z-index: 1;   }   .kol-input-container__adornment {     display: flex;     align-items: center;   }   .kol-input-container__adornment .kol-icon {     display: grid;     place-items: center;   }   .kol-form-field {     --border-width: 2px;     --input-size: 1.5em;   }   .kol-form-field__label {     display: contents;   }   .kol-form-field__label-text {     display: ruby;   }   .kol-form-field__input {     display: flex;     flex-direction: column;   }   .kol-form-field__input--orientation-horizontal {     flex-direction: row;     flex-wrap: wrap;     align-items: flex-start;   }   .kol-form-field--disabled {     opacity: unset;   }   .kol-input-radio {     display: flex;     position: relative;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     justify-content: center;     cursor: pointer;   }   .kol-input-radio__input {     border-style: solid;     border-radius: 100%;     display: flex;     width: var(--input-size);     min-width: var(--input-size);     height: var(--input-size);     min-height: var(--input-size);     margin: 0;     padding: 0;     border-width: var(--border-width);     appearance: none;     cursor: pointer;   }   .kol-input-radio__input:before {     border-radius: 100%;     width: calc(var(--input-size) / 2);     height: calc(var(--input-size) / 2);     margin: auto;     content: "";   }   .kol-input-radio__input:checked:before {     background-color: black;   }   @media (forced-colors: active) {     .kol-input-radio__input:checked:before {              background-color: selectedItem !important;     }   }   .kol-input-radio__input:disabled {     cursor: not-allowed;   }   .kol-input-radio--disabled {     cursor: not-allowed;   } }`;
var KolInputRadio = class extends BaseFormFieldWebComponent {
  constructor(hostRef) {
    super();
    if (new.target === KolInputRadio)
      registerInstance(this, hostRef);
    this.id = createUniqueId("input-radio");
    this.infoPopoverOpen = false;
    this.inputHasFocus = false;
    this.inputRefs = /* @__PURE__ */ new Map();
    this.keyOptionMap = /* @__PURE__ */ new Map();
    this.optionTooltips = /* @__PURE__ */ new Map();
    this.propsConfig = inputRadioPropsConfig;
    this._ariaDetails = void 0;
    this._disabled = false;
    this._hideMsg = false;
    this._hideLabel = false;
    this._hint = "";
    this._infoPopover = void 0;
    this._msg = void 0;
    this._name = void 0;
    this._on = void 0;
    this._options = void 0;
    this._orientation = "vertical";
    this._required = false;
    this._syncValueBySelector = void 0;
    this._tooltipAlign = "top";
    this._touched = false;
    this._value = null;
    this._variant = void 0;
    this.setSelectedInputRef = (ref) => {
      this.inputRef = ref;
    };
    this.setOptionInputRef = (index) => (ref) => {
      if (ref) {
        this.inputRefs.set(index, ref);
      } else {
        this.inputRefs.delete(index);
      }
    };
    this.handleRadioInput = (event) => {
      const option = this.getOptionOfEvent(event);
      if (option !== void 0) {
        this.handleInput(event, option.value);
      }
    };
    this.handleRadioChange = (event) => {
      const option = this.getOptionOfEvent(event);
      if (option !== void 0) {
        this.handleChange(event, option.value);
        this._value = option.value;
      }
    };
    this.handleRadioKeyDown = (event) => {
      this.handleKeyDown(event);
      submitFormOnEnter(event, { form: this.host, ref: this.inputRef });
    };
    this.initFormAssociation("radio", this._name);
  }
  watchAriaDetails(value) {
    this.applyAriaDetails(value);
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
    radioOptionsProp.apply(value, (v) => {
      this.setRenderProp("options", v);
      if (v.length > 0) {
        this.keyOptionMap.clear();
        fillKeyOptionMap(this.keyOptionMap, normalizeOptionValues(v));
      }
    });
  }
  watchOrientation(value) {
    radioOrientationProp.apply(value, (v) => this.setRenderProp("orientation", v));
  }
  watchRequired(value) {
    requiredProp.apply(value, (v) => this.setRenderProp("required", v));
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
      radioValueProp.apply(value, (v) => this.setRenderProp("value", v));
    }
    this.formAssociation.setFormAssociatedValue(this.getRenderProp("value"));
  }
  watchVariant(value) {
    variantProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  getValue() {
    return Promise.resolve(this._value);
  }
  async focus(options) {
    const input = this.getFocusableInput();
    return delegateFocus(this.host, () => setFocus(input, options));
  }
  async click() {
    return delegateClick$1(this.host, async () => setClick(this.getFocusableInput()));
  }
  componentWillLoad() {
    this._touched = this._touched === true;
    this.watchAriaDetails(this._ariaDetails);
    this.watchName(this._name);
    this.watchSyncValueBySelector(this._syncValueBySelector);
    this.watchTouched(this._touched);
    this.watchMsg(this._msg);
    this.watchDisabled(this._disabled);
    this.watchHideMsg(this._hideMsg);
    this.watchHideLabel(this._hideLabel);
    this.watchHint(this._hint);
    this.watchInfoPopover(this._infoPopover);
    this.watchLabel(this._label);
    this.watchOn(this._on);
    this.watchTooltipAlign(this._tooltipAlign);
    this.watchVariant(this._variant);
    this.watchRequired(this._required);
    this.watchOrientation(this._orientation);
    this.watchOptions(this._options);
    this.watchValue(this._value);
  }
  componentDidRender() {
    this.syncFormField();
  }
  disconnectedCallback() {
    this.destroyFormField();
    this.optionTooltips.forEach((tooltipBehavior) => tooltipBehavior.destroy());
    this.optionTooltips.clear();
  }
  isOptionSelected(option) {
    var _a;
    return this.getRenderProp("value") === ((_a = option.value) !== null && _a !== void 0 ? _a : option.label);
  }
  getFocusableInput() {
    const options = this.getRenderProp("options");
    const isComponentDisabled = Boolean(this.getRenderProp("disabled"));
    const selectedIndex = options.findIndex((option) => this.isOptionSelected(option) && !isComponentDisabled && !option.disabled);
    if (selectedIndex !== -1) {
      const input = this.inputRefs.get(selectedIndex);
      if (input) {
        return input;
      }
    }
    const firstEnabledIndex = options.findIndex((option) => !isComponentDisabled && !option.disabled);
    if (firstEnabledIndex !== -1) {
      return this.inputRefs.get(firstEnabledIndex);
    }
    return void 0;
  }
  getOptionOfEvent(event) {
    return event.target instanceof HTMLInputElement ? this.keyOptionMap.get(event.target.value) : void 0;
  }
  getOptionTooltipRefs(id, label) {
    let tooltipBehavior = this.optionTooltips.get(id);
    if (isFieldControlLabelShownAsTooltip({ hideLabel: this.getRenderProp("hideLabel"), label })) {
      if (!tooltipBehavior) {
        tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
        tooltipBehavior.componentWillLoad({ label: "" });
        this.optionTooltips.set(id, tooltipBehavior);
      }
      tooltipBehavior.watchAlign(this.getRenderProp("tooltipAlign"));
      tooltipBehavior.watchBadgeText("");
      tooltipBehavior.watchId(createRelatedUniqueId(id, "label"));
      tooltipBehavior.watchLabel(label);
    } else if (tooltipBehavior) {
      tooltipBehavior.destroy();
      this.optionTooltips.delete(id);
      tooltipBehavior = void 0;
    }
    const shownTooltipBehavior = tooltipBehavior;
    return {
      refInput: (el) => {
        if (shownTooltipBehavior && el) {
          shownTooltipBehavior.initContext(el);
          shownTooltipBehavior.syncListeners(void 0, el, true);
        }
      },
      refTooltip: (el) => {
        shownTooltipBehavior === null || shownTooltipBehavior === void 0 ? void 0 : shownTooltipBehavior.setTooltipElementRef(el);
      }
    };
  }
  isOptionDisabled(option) {
    return Boolean(this.getRenderProp("disabled")) || Boolean(option.disabled);
  }
  getInputProps(option, id, index, selected) {
    const { hasError } = this.getAria();
    const hideLabel = this.getRenderProp("hideLabel");
    return {
      id,
      hideLabel,
      label: this.getRenderProp("label"),
      value: `-${index}`,
      disabled: this.isOptionDisabled(option),
      name: this.getRenderProp("name") || this.id,
      required: this.getRenderProp("required"),
      touched: this.getRenderProp("touched"),
      msg: this.getRenderProp("msg"),
      ref: (ref) => {
        this.setOptionInputRef(index)(ref);
        if (selected) {
          this.setSelectedInputRef(ref);
        }
      },
      "aria-label": hideLabel && typeof option.label === "string" ? option.label : void 0,
      type: "radio",
      checked: selected,
      onBlur: this.handleBlur,
      onChange: this.handleRadioChange,
      onFocus: this.handleFocus,
      onInput: this.handleRadioInput,
      onKeyDown: this.handleRadioKeyDown,
      "aria-invalid": hasError ? "true" : void 0
    };
  }
  renderOption(option, index) {
    const customId = createRelatedUniqueId(this.id, String(index));
    const selected = this.isOptionSelected(option);
    const label = option.label;
    return h(FieldControlFC, Object.assign({ key: customId, id: customId, label, hint: option.hint, hideLabel: this.getRenderProp("hideLabel"), tooltipAlign: this.getRenderProp("tooltipAlign"), disabled: this.isOptionDisabled(option), msg: this.getRenderProp("msg"), touched: this.getRenderProp("touched"), required: false, labelProps: { showBadge: false } }, this.getOptionTooltipRefs(customId, label)), h(RadioFC, { inputProps: this.getInputProps(option, customId, index, selected) }));
  }
  render() {
    const { ariaDescribedBy } = this.getAria();
    return h(Host, { key: "e42fbdf89edfc2f6a343096f5725dec6980d5b9f" }, h(FormFieldFC, Object.assign({ key: "22f7a6684edce31a1d8d2a28f1909ad111ea177d" }, this.getFormFieldProps({
      class: "kol-form-field--radio",
      required: this.getRenderProp("required"),
      variant: this.getRenderProp("variant"),
      renderNoTooltip: true
    }), { component: "fieldset", orientation: this.getRenderProp("orientation"), hideLabel: false, ariaDescribedBy: ariaDescribedBy.length > 0 ? ariaDescribedBy.join(" ") : void 0 }), this.getRenderProp("options").map((option, index) => this.renderOption(option, index))));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_ariaDetails": [{
        "watchAriaDetails": 0
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
      "_orientation": [{
        "watchOrientation": 0
      }],
      "_required": [{
        "watchRequired": 0
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
KolInputRadio.style = {
  default: defaultStyleCss()
};
export {
  KolInputRadio as kol_input_radio
};
//# sourceMappingURL=kol-input-radio.entry-O57IAQK2.js.map
