import {
  rowsProp
} from "./chunk-2ULWEJIA.js";
import {
  spellCheckProp
} from "./chunk-4RZZGLWS.js";
import {
  CounterBehavior
} from "./chunk-NNOJBEGN.js";
import {
  placeholderProp
} from "./chunk-EXSFFQD5.js";
import {
  stringValueProp
} from "./chunk-6BANYKWN.js";
import {
  readOnlyProp
} from "./chunk-JCDFPB6R.js";
import {
  requiredProp
} from "./chunk-EO54MTV4.js";
import {
  InputContainerFC,
  getInputAdornments,
  horizontalIconsProp
} from "./chunk-YCYFPTWS.js";
import {
  BaseFormFieldWebComponent,
  FormFieldFC,
  formFieldBasePropsConfig,
  getDefaultInputProps,
  getMsgType,
  isMsgDefinedAndInputTouched
} from "./chunk-JCU3O6PN.js";
import "./chunk-EBSUS5ES.js";
import "./chunk-FRVQWXY2.js";
import "./chunk-RSHHA2HG.js";
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
  createUniqueId
} from "./chunk-FQ2Y4FDM.js";
import "./chunk-SESBZTFK.js";
import "./chunk-ZVS5ACKA.js";
import "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import {
  __decorate,
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
  clsx,
  createPropDefinition,
  getBlockBem,
  isEnumOption,
  normalizeBoolean,
  normalizeString
} from "./chunk-KPGE6Z2R.js";
import "./chunk-MQNHCCSC.js";
import {
  Host,
  getElement,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-textarea.entry.js
var textareaResizeOptions = ["vertical", "none"];
var adjustHeightProp = createPropDefinition("adjustHeight", false, normalizeBoolean);
function normalizeResize(value) {
  const str = normalizeString(value);
  if (isEnumOption(str, textareaResizeOptions)) {
    return str;
  }
  throw new Error(`Invalid resize option: ${str}`);
}
var resizeProp = createPropDefinition("resize", "vertical", normalizeResize);
var TextAreaFC = (props) => {
  const { class: classNames, msg, touched, readonly, disabled, required, ariaDescribedBy, hideLabel, label } = props, other = __rest(props, ["class", "msg", "touched", "readonly", "disabled", "required", "ariaDescribedBy", "hideLabel", "label"]);
  const textareaProps = Object.assign(Object.assign({ class: clsx(getBlockBem("kol-textarea")(Object.assign({ disabled: Boolean(disabled), required: Boolean(required), touched: Boolean(touched), readonly: Boolean(readonly) }, isMsgDefinedAndInputTouched(msg, touched) ? { [getMsgType(msg)]: true } : {})), classNames), required, disabled, readonly }, getDefaultInputProps({ ariaDescribedBy, hideLabel, label })), other);
  return h("textarea", Object.assign({}, textareaProps));
};
var textareaPropsConfig = {
  required: [...formFieldBasePropsConfig.required],
  optional: [
    ...formFieldBasePropsConfig.optional,
    accessKeyProp,
    adjustHeightProp,
    horizontalIconsProp,
    placeholderProp,
    readOnlyProp,
    requiredProp,
    resizeProp,
    rowsProp,
    shortKeyProp,
    spellCheckProp,
    stringValueProp,
    variantProp
  ]
};
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-button {     background-color: transparent;     display: inline-block;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     margin: 0;     padding: 0;          text-align: center;        }   .kol-button__interactive-element {     border-style: none;     display: block;     border-width: medium;          font-weight: inherit;     font-style: inherit;     text-align: inherit;   }   .kol-button {        }   .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   }   .kol-form-field .kol-popover-button {          display: inline;   }   .kol-form-field .kol-popover-button__popover {     margin: 0;     padding: 0;     border: 0;   }   .kol-form-field .kol-popover-button--open .kol-button__tooltip {     display: none;   }   .kol-form-field .kol-popover-button--inline {     display: inline-block;        }   .kol-form-field .kol-popover-button--inline .kol-button,   .kol-form-field .kol-popover-button--inline .kol-button .kol-button__interactive-element {     min-width: 0;     min-height: 1em;   }   .kol-form-field .kol-popover {     opacity: 0;     transition: 0.2s ease-out opacity;   }   .kol-form-field .kol-popover-button--open .kol-popover-button__popover {     opacity: 1;   }   .kol-form-field {     display: grid;   }   .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {     cursor: pointer;   }   .kol-form-field__label {     display: flex;   }   .kol-form-field__label-text {     flex-flow: row;     align-items: flex-start;     justify-content: flex-start;   }   .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden]) .kol-span__label::after, .kol-form-field--required:not(:has(.kol-form-field__label--legend)) .kol-form-field__input .kol-tooltip__content .kol-span__label::after {     content: "*"/"";   }   .kol-input-container {     background-color: transparent;     display: grid;     position: relative;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     grid-template-columns: 1fr;   }   .kol-input-container:has(> .kol-input-container__adornment--start) {     grid-template-columns: auto 1fr auto;   }   .kol-input-container__container {     position: relative;     z-index: 1;   }   .kol-input-container__adornment {     display: flex;     align-items: center;   }   .kol-input-container__adornment .kol-icon {     display: grid;     place-items: center;   }   .kol-textarea {     width: 100%;   } }`;
var KolTextarea = class extends BaseFormFieldWebComponent {
  constructor(hostRef) {
    super();
    if (new.target === KolTextarea)
      registerInstance(this, hostRef);
    this.id = createUniqueId("textarea");
    this.infoPopoverOpen = false;
    this.inputHasFocus = false;
    this.ctaRef = createCtaRef();
    this.counter = new CounterBehavior(BaseWebComponent.stateLess);
    this.needsImmediateCounterUpdate = false;
    this.hasValue = false;
    this.isWritingRows = false;
    this.propsConfig = textareaPropsConfig;
    this._accessKey = void 0;
    this._adjustHeight = false;
    this._ariaDetails = void 0;
    this._disabled = false;
    this._hideMsg = false;
    this._hideLabel = false;
    this._hint = "";
    this._icons = void 0;
    this._infoPopover = void 0;
    this._maxLength = void 0;
    this._hasCounter = false;
    this._maxLengthBehavior = "hard";
    this._msg = void 0;
    this._name = void 0;
    this._on = void 0;
    this._placeholder = void 0;
    this._readOnly = false;
    this._resize = "vertical";
    this._required = false;
    this._rows = void 0;
    this._shortKey = void 0;
    this._spellCheck = void 0;
    this._syncValueBySelector = void 0;
    this._tooltipAlign = "top";
    this._touched = false;
    this._value = void 0;
    this._variant = void 0;
    this.handleTextareaInput = (event) => {
      if (this.ctaRef.el instanceof HTMLTextAreaElement) {
        this._value = this.ctaRef.el.value;
        if (this.getRenderProp("adjustHeight")) {
          this.writeRows(this.measureTextareaRows(this.ctaRef.el));
        }
        this.handleInput(event);
      }
    };
    this.handleTextareaChange = (event) => {
      this.handleChange(event);
    };
    this.handleTextareaFocus = (event) => {
      var _a, _b;
      this.handleFocus(event);
      this.counter.retriggerAria((_b = (_a = this._value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0);
    };
    this.handleTextareaKeyDown = (event) => {
      var _a, _b;
      this.handleKeyDown(event);
      this.counter.handleKeyDown(event, (_b = (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.value.length) !== null && _b !== void 0 ? _b : 0);
    };
    this.initFormAssociation("textarea", this._name);
  }
  watchAccessKey(value) {
    accessKeyProp.apply(value, (v) => this.setRenderProp("accessKey", v));
    validateAccessAndShortKey(value, this._shortKey);
  }
  watchAdjustHeight(value) {
    adjustHeightProp.apply(value, (v) => this.setRenderProp("adjustHeight", v));
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
  watchIcons(value) {
    horizontalIconsProp.apply(value, (v) => this.setRenderProp("icons", v));
  }
  watchInfoPopover(value) {
    this.applyInfoPopover(value);
  }
  watchLabel(value) {
    this.applyLabel(value);
  }
  watchMaxLength(value) {
    var _a, _b;
    this.counter.watchMaxLength(value);
    this.counter.updateImmediate((_b = (_a = this._value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0);
  }
  watchHasCounter(value) {
    this.counter.watchHasCounter(value);
    this.needsImmediateCounterUpdate = true;
  }
  watchMaxLengthBehavior(value) {
    this.counter.watchMaxLengthBehavior(value);
    this.needsImmediateCounterUpdate = true;
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
  watchPlaceholder(value) {
    placeholderProp.apply(value, (v) => this.setRenderProp("placeholder", v));
  }
  watchReadOnly(value) {
    readOnlyProp.apply(value, (v) => this.setRenderProp("readOnly", v));
  }
  watchResize(value) {
    resizeProp.apply(value, (v) => this.setRenderProp("resize", v));
  }
  watchRequired(value) {
    requiredProp.apply(value, (v) => this.setRenderProp("required", v));
  }
  watchRows(value) {
    rowsProp.apply(value, (v) => {
      this.setRenderProp("rows", v);
      if (!this.isWritingRows) {
        this.minRows = v;
      }
    });
  }
  watchShortKey(value) {
    shortKeyProp.apply(value, (v) => this.setRenderProp("shortKey", v));
    validateAccessAndShortKey(this._accessKey, value);
  }
  watchSpellCheck(value) {
    spellCheckProp.apply(value, (v) => this.setRenderProp("spellCheck", v));
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
    this.applyValue(value);
    this.counter.update((_a = value === null || value === void 0 ? void 0 : value.length) !== null && _a !== void 0 ? _a : 0);
  }
  watchVariant(value) {
    variantProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  getValue() {
    var _a;
    return Promise.resolve((_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.value);
  }
  focus(options) {
    return Promise.resolve();
  }
  async click() {
    return Promise.resolve();
  }
  componentWillLoad() {
    this.watchAriaDetails(this._ariaDetails);
    this._touched = this._touched === true;
    this.watchName(this._name);
    this.watchSyncValueBySelector(this._syncValueBySelector);
    this.watchTouched(this._touched);
    this.watchAccessKey(this._accessKey);
    this.watchAdjustHeight(this._adjustHeight);
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
    this.watchHasCounter(this._hasCounter);
    this.watchMaxLengthBehavior(this._maxLengthBehavior);
    this.counter.watchMaxLength(this._maxLength);
    this.watchPlaceholder(this._placeholder);
    this.watchReadOnly(this._readOnly);
    this.watchRequired(this._required);
    this.watchResize(this._resize);
    this.watchRows(this._rows);
    this.watchSpellCheck(this._spellCheck);
    this.applyValue(this._value);
  }
  componentDidLoad() {
    var _a, _b;
    this.needsImmediateCounterUpdate = false;
    if (this.counter.hasCounter() || this.counter.hasSoftLimit()) {
      this.counter.updateImmediate((_b = (_a = this._value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0);
    }
    setTimeout(() => {
      if (this._adjustHeight === true && this.ctaRef.el) {
        this.writeRows(this.measureTextareaRows(this.ctaRef.el));
      } else if (!this._rows) {
        this.writeRows(1);
      }
    });
  }
  componentDidUpdate() {
    var _a, _b;
    if (this.needsImmediateCounterUpdate) {
      this.needsImmediateCounterUpdate = false;
      if (this.counter.hasCounter() || this.counter.hasSoftLimit()) {
        this.counter.updateImmediate((_b = (_a = this._value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0);
      }
    }
  }
  componentDidRender() {
    this.syncFormField();
  }
  disconnectedCallback() {
    this.destroyFormField();
    this.counter.destroy();
  }
  writeRows(rows) {
    this.isWritingRows = true;
    this._rows = rows;
    this.isWritingRows = false;
  }
  measureTextareaRows(el) {
    const { overflow, padding } = el.style;
    el.style.overflow = "hidden";
    el.style.padding = "0";
    const currentRows = el.rows;
    const rowHeight = el.clientHeight / currentRows;
    el.rows = 1;
    const nextRows = Math.round(el.scrollHeight / rowHeight);
    el.rows = currentRows;
    el.style.overflow = overflow;
    el.style.padding = padding;
    const minRows = this.minRows;
    return minRows && minRows > nextRows ? minRows : nextRows;
  }
  getTextareaProps() {
    const id = this.id;
    const shortKey = this.getRenderProp("shortKey");
    const maxLength = this.counter.getMaxLengthAttribute();
    const characterLimitHintId = this.counter.getCharacterLimitHintId(id);
    const { ariaDescribedBy, hasError } = this.getAria();
    return Object.assign(Object.assign({ id, hideLabel: this.getRenderProp("hideLabel"), label: this.getRenderProp("label"), value: this.getRenderProp("value"), accessKey: this.getRenderProp("accessKey") || void 0, disabled: this.getRenderProp("disabled"), name: this.getRenderProp("name") || void 0, rows: this.getRenderProp("rows"), readonly: this.getRenderProp("readOnly"), required: this.getRenderProp("required"), placeholder: this.getRenderProp("placeholder"), spellcheck: this.getRenderProp("spellCheck"), touched: this.getRenderProp("touched"), msg: this.getRenderProp("msg"), ref: this.ctaRef, style: {
      resize: this.getRenderProp("resize")
    }, onBlur: this.handleBlur, onChange: this.handleTextareaChange, onClick: this.handleClick, onFocus: this.handleTextareaFocus, onInput: this.handleTextareaInput, onKeyDown: this.handleTextareaKeyDown, ariaDescribedBy: characterLimitHintId ? [...ariaDescribedBy, characterLimitHintId] : ariaDescribedBy, "aria-invalid": hasError ? "true" : void 0 }, maxLength !== void 0 ? { maxLength } : {}), shortKey ? { "aria-keyshortcuts": shortKey } : {});
  }
  applyValue(value) {
    stringValueProp.apply(value, (v) => this.setRenderProp("value", v));
    this.hasValue = Boolean(this.getRenderProp("value"));
    this.formAssociation.setFormAssociatedValue(this.getRenderProp("value"));
  }
  render() {
    const disabled = this.getRenderProp("disabled");
    const { startAdornment, endAdornment } = getInputAdornments({ icons: this.getRenderProp("icons") });
    return h(Host, { key: "f213a17cb37e5957ab505f30bb9a16f4d540277a" }, h(FormFieldFC, Object.assign({ key: "f30d7ffa05b8f88949b05967af1270a26de84dff" }, this.getFormFieldProps({
      class: clsx("kol-form-field-textarea", {
        "kol-form-field--has-value": this.hasValue,
        "kol-form-field--has-counter": this.counter.hasSoftLimit() || this.counter.hasCounter()
      }),
      accessKey: this.getRenderProp("accessKey") || void 0,
      shortKey: this.getRenderProp("shortKey") || void 0,
      variant: this.getRenderProp("variant"),
      required: this.getRenderProp("required"),
      readOnly: this.getRenderProp("readOnly"),
      maxLength: this.counter.getRenderProp("maxLength"),
      counter: this.counter.getCounterProps()
    })), h(InputContainerFC, { key: "0d9be56a253943f934a0e0c00f4c879ce50459e5", disabled, msg: this.getRenderProp("msg"), touched: this.getRenderProp("touched"), startAdornment, endAdornment }, h(TextAreaFC, Object.assign({ key: "2151d1aa605a6fd3c3899b106270fc16c432d0dc" }, this.getTextareaProps())))));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_accessKey": [{
        "watchAccessKey": 0
      }],
      "_adjustHeight": [{
        "watchAdjustHeight": 0
      }],
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
      "_icons": [{
        "watchIcons": 0
      }],
      "_infoPopover": [{
        "watchInfoPopover": 0
      }],
      "_label": [{
        "watchLabel": 0
      }],
      "_maxLength": [{
        "watchMaxLength": 0
      }],
      "_hasCounter": [{
        "watchHasCounter": 0
      }],
      "_maxLengthBehavior": [{
        "watchMaxLengthBehavior": 0
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
      "_placeholder": [{
        "watchPlaceholder": 0
      }],
      "_readOnly": [{
        "watchReadOnly": 0
      }],
      "_resize": [{
        "watchResize": 0
      }],
      "_required": [{
        "watchRequired": 0
      }],
      "_rows": [{
        "watchRows": 0
      }],
      "_shortKey": [{
        "watchShortKey": 0
      }],
      "_spellCheck": [{
        "watchSpellCheck": 0
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
], KolTextarea.prototype, "focus", null);
__decorate([
  delegateClick("ctaRef")
], KolTextarea.prototype, "click", null);
KolTextarea.style = {
  default: defaultStyleCss()
};
export {
  KolTextarea as kol_textarea
};
//# sourceMappingURL=kol-textarea.entry-DOUXJEY6.js.map
