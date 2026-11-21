import {
  rowsProp
} from "./chunk-2ULWEJIA.js";
import {
  fillKeyOptionMap
} from "./chunk-LS75FUCA.js";
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
  BaseFormFieldWebComponent,
  FormFieldFC,
  formFieldBasePropsConfig,
  getDefaultInputProps,
  getMsgType,
  isMsgDefinedAndInputTouched
} from "./chunk-JCU3O6PN.js";
import {
  validateAccessAndShortKey
} from "./chunk-TXIZUTEV.js";
import {
  accessKeyProp,
  shortKeyProp,
  tabIndexProp,
  variantProp
} from "./chunk-JIRF5MWS.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
import {
  clsx,
  containsOnlyNumbers,
  createPropDefinition,
  getBlockBem,
  hasEnoughReadableChars
} from "./chunk-KPGE6Z2R.js";
import {
  Fragment,
  h
} from "./chunk-VUP4WNL7.js";
import {
  a11yHint,
  parseJson
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/base-web-component-BLA2cpyz.js
var validateInputSelectOptions = (option) => {
  if (typeof option === "object" && option !== null) {
    if (typeof option.label === "string" && option.label.length > 0) {
      option.disabled = option.disabled === true;
      option.label = `${option.label}`.trim();
      if (hasEnoughReadableChars(option.label, 3) === false && containsOnlyNumbers(option.label) === false) {
        a11yHint(`A differing Aria-Label (${option.label}) is inaccessible. A differing Aria-Label should consist of at least three readable characters.`);
      }
      if (Array.isArray(option.options)) {
        return option.options.find((item) => {
          return validateInputSelectOptions(item) === false;
        }) === void 0;
      }
      return true;
    } else if (typeof option.label === "number") {
      return true;
    }
  }
  return false;
};
function normalizeOptionsWithOptgroup(value) {
  const parsed = typeof value === "string" ? parseJson(value) : value;
  if (Array.isArray(parsed) && parsed.every((option) => validateInputSelectOptions(option))) {
    return parsed;
  }
  throw new Error("Invalid select options");
}
var optionsWithOptgroupProp = createPropDefinition("options", [], normalizeOptionsWithOptgroup);
var selectValueProp = createPropDefinition("value", [], (value) => Array.isArray(value) ? value : [value]);
var selectPropsConfig = {
  required: [...formFieldBasePropsConfig.required],
  optional: [
    ...formFieldBasePropsConfig.optional,
    accessKeyProp,
    horizontalIconsProp,
    multipleProp,
    optionsWithOptgroupProp,
    requiredProp,
    rowsProp,
    selectValueProp,
    shortKeyProp,
    tabIndexProp,
    variantProp
  ]
};
var selectBem = getBlockBem("kol-select");
var SelectOptionFC = (_a) => {
  var { class: classNames, index, selectedValue, selected, value, label, disabled } = _a, other = __rest(_a, ["class", "index", "selectedValue", "selected", "value", "label", "disabled"]);
  const selectedValues = selectedValue === void 0 ? [] : Array.isArray(selectedValue) ? selectedValue : [selectedValue];
  const isSelected = selected || selectedValues.includes(value);
  return h("option", Object.assign({ class: clsx(selectBem("option", { selected: Boolean(isSelected), disabled: Boolean(disabled) }), classNames), selected: isSelected, disabled, value: index }, other), label);
};
var SelectOptionListFC = ({ preKey, options, disabled, value: selectedValue, OptionProps = {}, OptionGroupProps = {} }) => {
  if (!(options === null || options === void 0 ? void 0 : options.length)) {
    return null;
  }
  return h(Fragment, null, options.map((option, index) => {
    const key = [preKey, `-${index}`].join("");
    if ("options" in option) {
      const isOptgroupDisabled = Boolean(disabled || option.disabled);
      const { label } = option, other = __rest(option, ["label"]);
      return h("optgroup", Object.assign({ class: selectBem("optgroup", { disabled: isOptgroupDisabled }), key }, OptionGroupProps, { label: label === null || label === void 0 ? void 0 : label.toString(), disabled: isOptgroupDisabled }), h(SelectOptionListFC, Object.assign({ OptionGroupProps, OptionProps, value: selectedValue, preKey: key }, other, { disabled: isOptgroupDisabled })));
    }
    if ("value" in option) {
      return h(SelectOptionFC, Object.assign({ key }, OptionProps, { index: key, selectedValue }, option, { disabled: Boolean(disabled || option.disabled) }));
    }
    return null;
  }));
};
var SelectFC = (props) => {
  const { class: classNames, msg, touched, disabled, required, options, value, OptionProps, OptionGroupProps, ariaDescribedBy, hideLabel, label } = props, other = __rest(props, ["class", "msg", "touched", "disabled", "required", "options", "value", "OptionProps", "OptionGroupProps", "ariaDescribedBy", "hideLabel", "label"]);
  const selectProps = Object.assign(Object.assign({ class: clsx(selectBem(Object.assign({ disabled: Boolean(disabled), required: Boolean(required), touched: Boolean(touched) }, isMsgDefinedAndInputTouched(msg, touched) ? { [getMsgType(msg)]: true } : {})), classNames), required, disabled }, getDefaultInputProps({ ariaDescribedBy, hideLabel, label })), other);
  return h("select", Object.assign({}, selectProps), h(SelectOptionListFC, { OptionGroupProps, OptionProps, disabled, options, value }));
};
var assertSelectValueMatchesMultiplicity = (value, multiple, source) => {
  const isArray = Array.isArray(value);
  if (multiple) {
    if (value !== void 0 && !isArray) {
      throw new Error(`↑ The schema for the property (_value) is not valid for multiple mode. Expected an array. The value will not be changed. (${source} = ${JSON.stringify(value)})`);
    }
  } else if (isArray) {
    throw new Error(`↑ The schema for the property (_value) is not valid for single mode. Expected a single value. The value will not be changed. (${source} = ${JSON.stringify(value)})`);
  }
};
var flattenSelectOptions = (options, groupDisabled = false) => options.flatMap((entry) => "options" in entry && Array.isArray(entry.options) ? flattenSelectOptions(entry.options, Boolean(groupDisabled || entry.disabled)) : [Object.assign(Object.assign({}, entry), { disabled: Boolean(groupDisabled || entry.disabled) })]);
var normalizeSelectValue = (value, options, multiple) => {
  if (options.length === 0) {
    return value;
  }
  const flatOptions = flattenSelectOptions(options);
  const optionValues = flatOptions.map((option) => option.value);
  const filtered = value.every((item) => optionValues.includes(item)) ? value : value.filter((item) => optionValues.includes(item));
  if (multiple === false && filtered.length === 0) {
    const firstEnabled = flatOptions.find((option) => option.disabled !== true);
    return firstEnabled ? [firstEnabled.value] : filtered;
  }
  return filtered;
};
var BaseSelectWebComponent = class extends BaseFormFieldWebComponent {
  constructor() {
    super(...arguments);
    this.keyOptionMap = /* @__PURE__ */ new Map();
    this.hasValue = true;
    this.handleSelectInput = (event) => {
      var _a;
      const selectedValues = Array.from(((_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.options) || []).filter((option) => option.selected).map((option) => {
        var _a2;
        return (_a2 = this.keyOptionMap.get(option.value)) === null || _a2 === void 0 ? void 0 : _a2.value;
      });
      if (this._multiple) {
        this._value = selectedValues;
        this.handleInput(event, selectedValues);
      } else {
        const singleValue = selectedValues.length > 0 ? selectedValues[0] : void 0;
        this._value = singleValue;
        this.handleInput(event, singleValue);
      }
    };
    this.handleSelectChange = (event) => {
      const value = this._value;
      this.handleChange(event, value);
      this.hasValue = !!value;
    };
  }
  applyAccessKey(value) {
    accessKeyProp.apply(value, (v) => this.setRenderProp("accessKey", v));
    validateAccessAndShortKey(value, this.getShortKeyProp());
  }
  applyShortKey(value) {
    shortKeyProp.apply(value, (v) => this.setRenderProp("shortKey", v));
    validateAccessAndShortKey(this.getAccessKeyProp(), value);
  }
  applyIcons(value) {
    horizontalIconsProp.apply(value, (v) => this.setRenderProp("icons", v));
  }
  applyMultiple(value) {
    assertSelectValueMatchesMultiplicity(this._value, value === true, "current");
    multipleProp.apply(value, (v) => {
      this.setRenderProp("multiple", v);
      this.setRenderProp("value", normalizeSelectValue(this.getRenderProp("value"), this.getRenderProp("options"), this._multiple));
    });
  }
  applyOptions(value) {
    optionsWithOptgroupProp.apply(value, (v) => {
      this.setRenderProp("options", v);
      if (v.length > 0) {
        this.keyOptionMap.clear();
        fillKeyOptionMap(this.keyOptionMap, v);
        this.setRenderProp("value", normalizeSelectValue(this.getRenderProp("value"), v, this._multiple));
      }
    });
  }
  applyRequired(value) {
    requiredProp.apply(value, (v) => this.setRenderProp("required", v));
  }
  applyRows(value) {
    rowsProp.apply(value, (v) => this.setRenderProp("rows", v));
  }
  applyTabIndex(value) {
    tabIndexProp.apply(value, (v) => this.setRenderProp("tabIndex", v));
  }
  applyValue(value) {
    assertSelectValueMatchesMultiplicity(value, this._multiple === true, "received");
    const setValue = (list) => {
      const normalized = normalizeSelectValue(list, this.getRenderProp("options"), this._multiple);
      this.setRenderProp("value", normalized);
      this.formAssociation.setFormAssociatedValue(this.getModelValue());
    };
    if (value === null) {
      setValue([null]);
    } else {
      selectValueProp.apply(value, setValue);
    }
  }
  applyVariant(value) {
    variantProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  getModelValue() {
    const value = this.getRenderProp("value");
    if (this._multiple) {
      return value;
    }
    return Array.isArray(value) && value.length > 0 ? value[0] : value;
  }
  getSelectProps() {
    const { ariaDescribedBy, hasError } = this.getAria();
    const multiple = this.getRenderProp("multiple");
    const shortKey = this.getRenderProp("shortKey");
    return Object.assign(Object.assign({ id: this.getState("id"), hideLabel: this.getRenderProp("hideLabel"), label: this.getRenderProp("label"), value: this.getRenderProp("value"), options: this.getRenderProp("options"), accessKey: this.getRenderProp("accessKey") || void 0, disabled: this.getRenderProp("disabled"), name: this.getRenderProp("name") || void 0, "aria-invalid": hasError ? "true" : void 0, ariaDescribedBy, size: multiple ? this.getRenderProp("rows") : void 0, multiple, required: this.getRenderProp("required"), touched: this.getRenderProp("touched"), msg: this.getRenderProp("msg") }, shortKey ? { "aria-keyshortcuts": shortKey } : {}), { ref: this.ctaRef, onBlur: this.handleBlur, onChange: this.handleSelectChange, onClick: this.handleClick, onFocus: this.handleFocus, onInput: this.handleSelectInput, onKeyDown: this.handleKeyDown });
  }
  renderSelectField() {
    const disabled = this.getRenderProp("disabled");
    const { startAdornment, endAdornment } = getInputAdornments({ icons: this.getRenderProp("icons") });
    return h(FormFieldFC, Object.assign({}, this.getFormFieldProps({
      class: clsx("kol-form-field-select", { "kol-form-field--has-value": this.hasValue }),
      accessKey: this.getRenderProp("accessKey") || void 0,
      shortKey: this.getRenderProp("shortKey") || void 0,
      required: this.getRenderProp("required"),
      variant: this.getRenderProp("variant")
    }), { onClick: () => {
      var _a;
      return (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.focus();
    } }), h(InputContainerFC, { disabled, msg: this.getRenderProp("msg"), touched: this.getRenderProp("touched"), startAdornment, endAdornment }, h(SelectFC, Object.assign({}, this.getSelectProps()))));
  }
};

export {
  selectPropsConfig,
  BaseSelectWebComponent
};
//# sourceMappingURL=chunk-G6SSZF6U.js.map
