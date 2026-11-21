import {
  multipleProp
} from "./chunk-ETF7DHO3.js";
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
import {
  smartButtonProp
} from "./chunk-FEDQEKWE.js";
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
  createPropDefinition,
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

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-input-file.entry.js
var acceptProp = createPropDefinition("accept", void 0, normalizeString);
function getFileNames(files) {
  if (!(files === null || files === void 0 ? void 0 : files.length)) {
    return void 0;
  }
  return Array.from(files).map((file) => file.name).join(", ");
}
var inputFilePropsConfig = {
  required: [...formFieldBasePropsConfig.required],
  optional: [
    ...formFieldBasePropsConfig.optional,
    acceptProp,
    accessKeyProp,
    horizontalIconsProp,
    multipleProp,
    requiredProp,
    shortKeyProp,
    smartButtonProp,
    variantProp
  ]
};
var inputContainerBem = bem.forBlock("kol-input-container");
var BEM_CLASS_INPUT_CONTAINER__BUTTON = inputContainerBem("button");
var InputFileNameFC = ({ filename, hasFile }) => h("span", { class: inputContainerBem("filename", { "has-file": hasFile }) }, filename);
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   }   .kol-form-field .kol-popover-button {          display: inline;   }   .kol-form-field .kol-popover-button__popover {     margin: 0;     padding: 0;     border: 0;   }   .kol-form-field .kol-popover-button--open .kol-button__tooltip {     display: none;   }   .kol-form-field .kol-popover-button--inline {     display: inline-block;        }   .kol-form-field .kol-popover-button--inline .kol-button,   .kol-form-field .kol-popover-button--inline .kol-button .kol-button__interactive-element {     min-width: 0;     min-height: 1em;   }   .kol-form-field .kol-popover {     opacity: 0;     transition: 0.2s ease-out opacity;   }   .kol-form-field .kol-popover-button--open .kol-popover-button__popover {     opacity: 1;   }   .kol-form-field {     display: grid;   }   .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {     cursor: pointer;   }   .kol-form-field__label {     display: flex;   }   .kol-form-field__label-text {     flex-flow: row;     align-items: flex-start;     justify-content: flex-start;   }   .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden]) .kol-span__label::after, .kol-form-field--required:not(:has(.kol-form-field__label--legend)) .kol-form-field__input .kol-tooltip__content .kol-span__label::after {     content: "*"/"";   }   .kol-input-container {     background-color: transparent;     display: grid;     position: relative;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     grid-template-columns: 1fr;   }   .kol-input-container:has(> .kol-input-container__adornment--start) {     grid-template-columns: auto 1fr auto;   }   .kol-input-container__container {     position: relative;     z-index: 1;   }   .kol-input-container__adornment {     display: flex;     align-items: center;   }   .kol-input-container__adornment .kol-icon {     display: grid;     place-items: center;   }   .kol-input {     background-color: transparent;     width: 100%;     min-width: var(--a11y-min-size);   }   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   :host {     display: inline-block;   }   .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-button__interactive-element::before {     content: "​";   }   .kol-button__text {     flex: 1 0 100%;   }   .kol-button {        }   .kol-button__tooltip {     height: 0;   }   .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-input {     opacity: 0;     position: absolute;     inset: 0;     width: 100%;     height: 100%;     cursor: pointer;   }   .kol-input::-webkit-file-upload-button, .kol-input::file-selector-button {     cursor: pointer;   }   .kol-input:disabled, .kol-input:disabled::-webkit-file-upload-button, .kol-input:disabled::file-selector-button {     cursor: not-allowed;     pointer-events: none;   }   .kol-input-container__container {     display: flex;     overflow: hidden;     align-items: center;   }   .kol-input-container__button {          height: auto;   }   .kol-input-container__filename {     overflow: hidden;     flex-grow: 1;     white-space: nowrap;     text-overflow: ellipsis;   }   .kol-input-container:has(> .kol-input-container__adornment--start):has(> .kol-input-container__adornment--end) {     grid-template-columns: auto 1fr;   } }`;
var fileBem = bem.forBlock("kol-input-file");
var KolInputFile = class extends BaseFormFieldWebComponent {
  constructor(hostRef) {
    super();
    if (new.target === KolInputFile)
      registerInstance(this, hostRef);
    this.id = createUniqueId("input-file");
    this.infoPopoverOpen = false;
    this.inputHasFocus = false;
    this.translateFilenameText = translate("kol-filename-text");
    this.filename = this.translateFilenameText;
    this.hasFileSelected = false;
    this.isDragover = false;
    this.ctaRef = createCtaRef();
    this.translateDataBrowseText = translate("kol-data-browse-text");
    this.browseButton = createButtonItem(() => this.host);
    this.propsConfig = inputFilePropsConfig;
    this._accept = void 0;
    this._accessKey = void 0;
    this._ariaDetails = void 0;
    this._disabled = false;
    this._hideMsg = false;
    this._hideLabel = false;
    this._hint = "";
    this._icons = void 0;
    this._infoPopover = void 0;
    this._msg = void 0;
    this._multiple = false;
    this._name = void 0;
    this._on = void 0;
    this._required = false;
    this._shortKey = void 0;
    this._smartButton = void 0;
    this._syncValueBySelector = void 0;
    this._tooltipAlign = "top";
    this._touched = false;
    this._variant = void 0;
    this.handleFileChange = (event) => {
      var _a;
      if (this.ctaRef.el instanceof HTMLInputElement && this.ctaRef.el.type === "file") {
        const files = this.ctaRef.el.files;
        this.hasFileSelected = !!(files === null || files === void 0 ? void 0 : files.length);
        this.filename = (_a = getFileNames(files)) !== null && _a !== void 0 ? _a : this.translateFilenameText;
        this.handleChange(event, files);
        this.formAssociation.setFormAssociatedValue(files);
      }
    };
    this.handleFileInput = (event) => {
      if (this.ctaRef.el instanceof HTMLInputElement && this.ctaRef.el.type === "file") {
        this.handleInput(event, this.ctaRef.el.files);
      }
    };
    this.isDisabled = () => this._disabled === true;
    this.handleDragOver = (event) => {
      if (this.isDisabled()) {
        return;
      }
      event.preventDefault();
      this.isDragover = true;
    };
    this.handleDragLeave = () => {
      this.isDragover = false;
    };
    this.handleDrop = (event) => {
      var _a, _b;
      if (this.isDisabled()) {
        return;
      }
      event.preventDefault();
      if (!this.ctaRef.el) {
        return;
      }
      this.isDragover = false;
      if ((_a = event.dataTransfer) === null || _a === void 0 ? void 0 : _a.files.length) {
        const files = event.dataTransfer.files;
        this.ctaRef.el.files = files;
        this.filename = (_b = getFileNames(files)) !== null && _b !== void 0 ? _b : this.translateFilenameText;
        this.formAssociation.setFormAssociatedValue(files);
        this.handleChange(event, files);
        this.handleInput(event, files);
      }
    };
    this.initFormAssociation("file", this._name);
  }
  watchAccept(value) {
    acceptProp.apply(value, (v) => this.setRenderProp("accept", v));
  }
  watchAccessKey(value) {
    accessKeyProp.apply(value, (v) => this.setRenderProp("accessKey", v));
    validateAccessAndShortKey(value, this._shortKey);
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
  watchMsg(value) {
    this.applyMsg(value);
  }
  watchMultiple(value) {
    multipleProp.apply(value, (v) => this.setRenderProp("multiple", v));
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
  watchSyncValueBySelector(value) {
    this.applySyncValueBySelector(value);
  }
  watchTooltipAlign(value) {
    this.applyTooltipAlign(value);
  }
  watchTouched(value) {
    this.applyTouched(value);
  }
  watchVariant(value) {
    variantProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  getValue() {
    var _a;
    return Promise.resolve((_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.files);
  }
  focus(options) {
    return Promise.resolve();
  }
  async click() {
    return Promise.resolve();
  }
  reset() {
    this.formAssociation.setFormAssociatedValue("");
    this.filename = this.translateFilenameText;
    this.hasFileSelected = false;
    if (this.ctaRef.el) {
      this.ctaRef.el.value = "";
    }
    return Promise.resolve();
  }
  componentWillLoad() {
    this.unsetRenderProp("smartButton");
    this._touched = this._touched === true;
    this.watchAriaDetails(this._ariaDetails);
    this.watchName(this._name);
    this.watchSyncValueBySelector(this._syncValueBySelector);
    this.watchTouched(this._touched);
    this.watchAccept(this._accept);
    this.watchAccessKey(this._accessKey);
    this.watchMsg(this._msg);
    this.watchDisabled(this._disabled);
    this.watchHideMsg(this._hideMsg);
    this.watchHideLabel(this._hideLabel);
    this.watchHint(this._hint);
    this.watchIcons(this._icons);
    this.watchInfoPopover(this._infoPopover);
    this.watchLabel(this._label);
    this.watchMultiple(this._multiple);
    this.watchOn(this._on);
    this.watchRequired(this._required);
    this.watchShortKey(this._shortKey);
    this.watchSmartButton(this._smartButton);
    this.watchTooltipAlign(this._tooltipAlign);
    this.watchVariant(this._variant);
  }
  componentDidRender() {
    this.browseButton.syncListeners();
    this.syncFormField();
  }
  disconnectedCallback() {
    this.browseButton.destroy();
    this.destroyFormField();
  }
  getInputProps() {
    const accessKey = this.getRenderProp("accessKey");
    const shortKey = this.getRenderProp("shortKey");
    const { ariaDescribedBy, hasError } = this.getAria();
    return Object.assign(Object.assign(Object.assign(Object.assign({ id: this.id, hideLabel: this.getRenderProp("hideLabel"), label: this.getRenderProp("label"), disabled: this.getRenderProp("disabled"), name: this.getRenderProp("name") || void 0 }, accessKey ? { accessKey } : {}), { required: this.getRenderProp("required"), multiple: this.getRenderProp("multiple"), touched: this.getRenderProp("touched"), msg: this.getRenderProp("msg") }), shortKey ? { "aria-keyshortcuts": shortKey } : {}), { ref: this.ctaRef, type: "file", accept: this.getRenderProp("accept"), onBlur: this.handleBlur, onChange: this.handleFileChange, onClick: this.handleClick, onFocus: this.handleFocus, onInput: this.handleFileInput, onKeyDown: this.handleKeyDown, ariaDescribedBy, "aria-invalid": hasError ? "true" : void 0 });
  }
  render() {
    const disabled = this.getRenderProp("disabled");
    const { startAdornment, endAdornment } = getInputAdornments({
      icons: this.getRenderProp("icons"),
      smartButton: this.getSmartButtonFcProps(this.getRenderProp("smartButton"), disabled)
    });
    return h(Host, { key: "7cb436aa1aa1d44e3fc40a0260b9e5475007f1e4" }, h(FormFieldFC, Object.assign({ key: "ae061478a153821b070f274cc5c2cb508d290aa9" }, this.getFormFieldProps({
      class: clsx(fileBem(), "file"),
      accessKey: this.getRenderProp("accessKey") || void 0,
      shortKey: this.getRenderProp("shortKey") || void 0,
      variant: this.getRenderProp("variant"),
      required: this.getRenderProp("required")
    })), h(InputContainerFC, { key: "3d636959f1b5dabb5d083774a5045834afa27678", class: { "kol-input-container--is-dragover": this.isDragover }, disabled, msg: this.getRenderProp("msg"), touched: this.getRenderProp("touched"), startAdornment, endAdornment, onDragOver: this.handleDragOver, onDragLeave: this.handleDragLeave, onDrop: this.handleDrop }, h(InputFileNameFC, { key: "37431aa753621fbe4fbc02b8f8aa11e04b8ffb8d", filename: this.filename, hasFile: this.hasFileSelected }), h(InputFC, Object.assign({ key: "e85b80d96ac69719f8539797958c61f286139d46" }, this.getInputProps())), h(ButtonFC, Object.assign({ key: "b1082af32631fba64378917cfde6d092ba5acc24" }, this.browseButton.getFcProps({ _label: this.translateDataBrowseText, _variant: "primary", _disabled: disabled, _tabIndex: -1 }, { class: BEM_CLASS_INPUT_CONTAINER__BUTTON, "aria-hidden": "true" }))))));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_accept": [{
        "watchAccept": 0
      }],
      "_accessKey": [{
        "watchAccessKey": 0
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
      "_msg": [{
        "watchMsg": 0
      }],
      "_multiple": [{
        "watchMultiple": 0
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
      "_shortKey": [{
        "watchShortKey": 0
      }],
      "_smartButton": [{
        "watchSmartButton": 0
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
      "_variant": [{
        "watchVariant": 0
      }]
    };
  }
};
__decorate([
  delegateFocus("ctaRef")
], KolInputFile.prototype, "focus", null);
__decorate([
  delegateClick("ctaRef")
], KolInputFile.prototype, "click", null);
KolInputFile.style = {
  default: defaultStyleCss()
};
export {
  KolInputFile as kol_input_file
};
//# sourceMappingURL=kol-input-file.entry-2KCIJEZO.js.map
