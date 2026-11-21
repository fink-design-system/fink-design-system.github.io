import {
  ariaSelectedProp,
  buttonCallbacksProp,
  buttonPropsConfig,
  buttonTypeProp,
  nameProp
} from "./chunk-3C6UB25G.js";
import {
  accessKeyProp,
  ariaControlsProp,
  ariaDescriptionProp,
  ariaExpandedProp,
  customClassProp,
  hideLabelProp,
  inlineProp,
  linkRoleProp,
  shortKeyProp,
  spanIconsProp,
  tabIndexProp,
  tooltipAlignProp,
  variantProp
} from "./chunk-JIRF5MWS.js";
import {
  idProp
} from "./chunk-FGYUAXNO.js";
import {
  labelWithExpertSlotProp
} from "./chunk-7C3Y25NJ.js";
import {
  disabledProp
} from "./chunk-SESBZTFK.js";
import {
  buildDefaultPropsFromConfig
} from "./chunk-KPGE6Z2R.js";
import {
  X
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/resolve-props-0xfjG6h5.js
var BUTTON_ELEMENT_DEFAULTS = {
  disabled: false,
  hideLabel: false,
  inline: false,
  tooltipAlign: "top",
  type: "button"
};
function resolveButtonProps(props, host) {
  var _a, _b, _c, _d, _e, _f, _g;
  const resolved = buildDefaultPropsFromConfig(buttonPropsConfig);
  const set = (key) => {
    return (value) => {
      resolved[key] = value;
    };
  };
  labelWithExpertSlotProp.apply(props._label, set("label"));
  accessKeyProp.apply(props._accessKey, set("accessKey"));
  ariaControlsProp.apply(props._ariaControls, set("ariaControls"));
  ariaDescriptionProp.apply(props._ariaDescription, set("ariaDescription"));
  ariaExpandedProp.apply(props._ariaExpanded, set("ariaExpanded"));
  ariaSelectedProp.apply(props._ariaSelected, set("ariaSelected"));
  buttonCallbacksProp.apply(props._on, set("on"));
  buttonTypeProp.apply((_a = props._type) !== null && _a !== void 0 ? _a : BUTTON_ELEMENT_DEFAULTS.type, set("type"));
  customClassProp.apply(props._customClass, set("customClass"));
  disabledProp.apply((_b = props._disabled) !== null && _b !== void 0 ? _b : BUTTON_ELEMENT_DEFAULTS.disabled, set("disabled"));
  hideLabelProp.apply((_c = props._hideLabel) !== null && _c !== void 0 ? _c : BUTTON_ELEMENT_DEFAULTS.hideLabel, set("hideLabel"));
  idProp.apply(props._id, set("id"));
  inlineProp.apply((_d = props._inline) !== null && _d !== void 0 ? _d : BUTTON_ELEMENT_DEFAULTS.inline, set("inline"));
  linkRoleProp.apply(props._role, set("role"));
  nameProp.apply(props._name, set("name"));
  shortKeyProp.apply(props._shortKey, set("shortKey"));
  spanIconsProp.apply(props._icons, set("icons"));
  tooltipAlignProp.apply((_e = props._tooltipAlign) !== null && _e !== void 0 ? _e : BUTTON_ELEMENT_DEFAULTS.tooltipAlign, set("tooltipAlign"));
  if (typeof props._tabIndex === "number") {
    tabIndexProp.apply(props._tabIndex, set("tabIndex"));
  } else {
    resolved.tabIndex = void 0;
  }
  variantProp.apply((_g = (_f = props._variant) !== null && _f !== void 0 ? _f : X("buttonVariantDefault", host)) !== null && _g !== void 0 ? _g : "normal", set("variant"));
  return resolved;
}

export {
  resolveButtonProps
};
//# sourceMappingURL=chunk-AIH4BWIT.js.map
