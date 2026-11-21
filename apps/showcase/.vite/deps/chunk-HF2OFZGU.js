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
  SuggestionsFC,
  autoCompleteProp
} from "./chunk-7UHTALH2.js";
import {
  requiredProp
} from "./chunk-EO54MTV4.js";
import {
  getInputAdornments,
  horizontalIconsProp
} from "./chunk-YCYFPTWS.js";
import {
  BaseFormFieldWebComponent,
  formFieldBasePropsConfig
} from "./chunk-JCU3O6PN.js";
import {
  submitFormOnEnter
} from "./chunk-SR6CIZZ2.js";
import {
  validateAccessAndShortKey
} from "./chunk-TXIZUTEV.js";
import {
  smartButtonProp
} from "./chunk-FEDQEKWE.js";
import {
  accessKeyProp,
  shortKeyProp,
  variantProp
} from "./chunk-JIRF5MWS.js";
import {
  createCtaRef
} from "./chunk-VFFG6S5V.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  clsx,
  createPropDefinition,
  normalizeString
} from "./chunk-KPGE6Z2R.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/base-web-component-DwY54ppZ.js
var patternProp = createPropDefinition("pattern", void 0, normalizeString);
var textInputBasePropsConfig = {
  required: [...formFieldBasePropsConfig.required],
  optional: [
    ...formFieldBasePropsConfig.optional,
    accessKeyProp,
    autoCompleteProp,
    horizontalIconsProp,
    patternProp,
    placeholderProp,
    readOnlyProp,
    requiredProp,
    shortKeyProp,
    smartButtonProp,
    stringValueProp,
    variantProp
  ]
};
var BaseTextInputWebComponent = class extends BaseFormFieldWebComponent {
  constructor() {
    super(...arguments);
    this.ctaRef = createCtaRef();
    this.counter = new CounterBehavior(BaseWebComponent.stateLess);
    this.needsImmediateCounterUpdate = false;
    this.hasValue = false;
    this.handleTextInput = (event) => {
      this._value = event.target.value;
      this.handleInput(event);
    };
    this.handleTextChange = (event, value) => {
      this.handleChange(event, value);
    };
    this.handleTextFocus = (event) => {
      var _a, _b;
      this.handleFocus(event);
      this.counter.retriggerAria((_b = (_a = this._value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0);
    };
    this.handleTextKeyDown = (event) => {
      var _a, _b;
      this.handleKeyDown(event);
      this.counter.handleKeyDown(event, (_b = (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.value.length) !== null && _b !== void 0 ? _b : 0);
      submitFormOnEnter(event, { form: this.host, ref: this.ctaRef.el });
    };
  }
  get textShared() {
    return this;
  }
  initHasValue() {
    this.hasValue = Boolean(this.textShared.getRenderProp("value"));
  }
  didLoadTextInput() {
    var _a, _b;
    this.needsImmediateCounterUpdate = false;
    if (this.counter.hasCounter() || this.counter.hasSoftLimit()) {
      this.counter.updateImmediate((_b = (_a = this._value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0);
    }
  }
  didUpdateTextInput() {
    var _a, _b;
    if (this.needsImmediateCounterUpdate) {
      this.needsImmediateCounterUpdate = false;
      if (this.counter.hasCounter() || this.counter.hasSoftLimit()) {
        this.counter.updateImmediate((_b = (_a = this._value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0);
      }
    }
  }
  destroyTextInput() {
    this.destroyFormField();
    this.counter.destroy();
  }
  applyAccessKey(value) {
    accessKeyProp.apply(value, (v) => this.textShared.setRenderProp("accessKey", v));
    validateAccessAndShortKey(value, this._shortKey);
  }
  applyAutoComplete(value) {
    autoCompleteProp.apply(value, (v) => this.textShared.setRenderProp("autoComplete", v));
  }
  applyIcons(value) {
    horizontalIconsProp.apply(value, (v) => this.textShared.setRenderProp("icons", v));
  }
  applyPattern(value) {
    patternProp.apply(value, (v) => this.textShared.setRenderProp("pattern", v));
  }
  applyPlaceholder(value) {
    placeholderProp.apply(value, (v) => this.textShared.setRenderProp("placeholder", v));
  }
  applyReadOnly(value) {
    readOnlyProp.apply(value, (v) => this.textShared.setRenderProp("readOnly", v));
  }
  applyRequired(value) {
    requiredProp.apply(value, (v) => this.textShared.setRenderProp("required", v));
  }
  applyShortKey(value) {
    shortKeyProp.apply(value, (v) => this.textShared.setRenderProp("shortKey", v));
    validateAccessAndShortKey(this._accessKey, value);
  }
  applySmartButton(value) {
    if (value === void 0 || value === null) {
      this.textShared.unsetRenderProp("smartButton");
    } else {
      smartButtonProp.apply(value, (v) => this.textShared.setRenderProp("smartButton", v));
    }
  }
  applyValue(value) {
    var _a;
    this.initValue(value);
    this.hasValue = Boolean(this.textShared.getRenderProp("value"));
    this.counter.update((_a = value === null || value === void 0 ? void 0 : value.length) !== null && _a !== void 0 ? _a : 0);
  }
  initValue(value) {
    stringValueProp.apply(value, (v) => this.textShared.setRenderProp("value", v));
    this.formAssociation.setFormAssociatedValue(this.textShared.getRenderProp("value"));
  }
  initMaxLength(value) {
    this.counter.watchMaxLength(value);
  }
  applyVariant(value) {
    variantProp.apply(value, (v) => this.textShared.setRenderProp("variant", v));
  }
  applyHasCounter(value) {
    this.counter.watchHasCounter(value);
    this.needsImmediateCounterUpdate = true;
  }
  applyMaxLength(value) {
    var _a, _b;
    this.counter.watchMaxLength(value);
    this.counter.updateImmediate((_b = (_a = this._value) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0);
  }
  applyMaxLengthBehavior(value) {
    this.counter.watchMaxLengthBehavior(value);
    this.needsImmediateCounterUpdate = true;
  }
  getTextFormFieldProps(classNames) {
    const shared = this.textShared;
    return this.getFormFieldProps({
      class: clsx(classNames, {
        "has-value": this.hasValue,
        "kol-form-field--has-counter": this.counter.hasSoftLimit() || this.counter.hasCounter()
      }),
      accessKey: shared.getRenderProp("accessKey") || void 0,
      shortKey: shared.getRenderProp("shortKey") || void 0,
      variant: shared.getRenderProp("variant"),
      required: shared.getRenderProp("required"),
      readOnly: shared.getRenderProp("readOnly"),
      maxLength: this.counter.getRenderProp("maxLength"),
      counter: this.counter.getCounterProps()
    });
  }
  getTextInputAdornments(endAdornment) {
    return getInputAdornments({
      icons: this.textShared.getRenderProp("icons"),
      smartButton: this.getSmartButtonFcProps(this.textShared.getRenderProp("smartButton"), this.textShared.getRenderProp("disabled")),
      endAdornment
    });
  }
  getTextInputProps({ type, spellcheck, multiple, suggestions }, overrides = {}) {
    const shared = this.textShared;
    const id = shared.getState("id");
    const accessKey = shared.getRenderProp("accessKey");
    const shortKey = shared.getRenderProp("shortKey");
    const placeholder = shared.getRenderProp("placeholder");
    const pattern = shared.getRenderProp("pattern");
    const maxLength = this.counter.getMaxLengthAttribute();
    const characterLimitHintId = this.counter.getCharacterLimitHintId(id);
    const { ariaDescribedBy, hasError } = this.getAria();
    return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ id, hideLabel: shared.getRenderProp("hideLabel"), label: shared.getRenderProp("label"), disabled: shared.getRenderProp("disabled"), name: shared.getRenderProp("name") || void 0 }, accessKey ? { accessKey } : {}), type !== void 0 ? { type } : {}), { value: shared.getRenderProp("value"), required: shared.getRenderProp("required") }), maxLength !== void 0 ? { maxlength: maxLength } : {}), placeholder !== void 0 ? { placeholder } : {}), { autoComplete: shared.getRenderProp("autoComplete") }), spellcheck !== void 0 ? { spellcheck } : {}), pattern !== void 0 ? { pattern } : {}), { readonly: shared.getRenderProp("readOnly") }), multiple !== void 0 ? { multiple } : {}), { touched: shared.getRenderProp("touched"), msg: shared.getRenderProp("msg") }), shortKey ? { "aria-keyshortcuts": shortKey } : {}), suggestions && suggestions.length > 0 ? { suggestions: h(SuggestionsFC, { id, suggestions }) } : {}), { ref: this.ctaRef, onBlur: this.handleBlur, onChange: this.handleTextChange, onClick: this.handleClick, onFocus: this.handleTextFocus, onInput: this.handleTextInput, onKeyDown: this.handleTextKeyDown }), overrides), { ariaDescribedBy: characterLimitHintId ? [...ariaDescribedBy, characterLimitHintId] : ariaDescribedBy, "aria-invalid": hasError ? "true" : void 0 });
  }
};

export {
  textInputBasePropsConfig,
  BaseTextInputWebComponent
};
//# sourceMappingURL=chunk-HF2OFZGU.js.map
