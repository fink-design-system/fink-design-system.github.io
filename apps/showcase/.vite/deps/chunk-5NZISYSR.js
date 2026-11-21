import {
  validateAccessAndShortKey
} from "./chunk-TXIZUTEV.js";
import {
  ariaCurrentValueProp,
  ariaOwnsProp,
  downloadProp,
  linkCallbacksProp,
  linkPropsConfig
} from "./chunk-JLURN3RE.js";
import {
  linkTargetProp
} from "./chunk-ETC363DC.js";
import {
  hrefProp
} from "./chunk-U2POW5WN.js";
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
  labelWithExpertSlotProp
} from "./chunk-7C3Y25NJ.js";
import {
  disabledProp
} from "./chunk-SESBZTFK.js";
import {
  buildDefaultPropsFromConfig
} from "./chunk-KPGE6Z2R.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/resolve-props-BQa6SjZU.js
var LINK_ELEMENT_DEFAULTS = {
  disabled: false,
  hideLabel: false,
  inline: true,
  tooltipAlign: "right"
};
function resolveLinkProps(props) {
  var _a, _b, _c, _d;
  const resolved = buildDefaultPropsFromConfig(linkPropsConfig);
  const set = (key) => {
    return (value) => {
      resolved[key] = value;
    };
  };
  hrefProp.apply(props._href, set("href"));
  accessKeyProp.apply(props._accessKey, set("accessKey"));
  ariaControlsProp.apply(props._ariaControls, set("ariaControls"));
  ariaCurrentValueProp.apply(props._ariaCurrentValue, set("ariaCurrentValue"));
  ariaDescriptionProp.apply(props._ariaDescription, set("ariaDescription"));
  ariaExpandedProp.apply(props._ariaExpanded, set("ariaExpanded"));
  ariaOwnsProp.apply(props._ariaOwns, set("ariaOwns"));
  customClassProp.apply(props._customClass, set("customClass"));
  disabledProp.apply((_a = props._disabled) !== null && _a !== void 0 ? _a : LINK_ELEMENT_DEFAULTS.disabled, set("disabled"));
  downloadProp.apply(props._download, set("download"));
  hideLabelProp.apply((_b = props._hideLabel) !== null && _b !== void 0 ? _b : LINK_ELEMENT_DEFAULTS.hideLabel, set("hideLabel"));
  spanIconsProp.apply(props._icons, set("icons"));
  inlineProp.apply((_c = props._inline) !== null && _c !== void 0 ? _c : LINK_ELEMENT_DEFAULTS.inline, set("inline"));
  labelWithExpertSlotProp.apply(props._label, set("label"));
  linkCallbacksProp.apply(props._on, set("on"));
  linkRoleProp.apply(props._role, set("role"));
  shortKeyProp.apply(props._shortKey, set("shortKey"));
  linkTargetProp.apply(props._target, set("target"));
  tooltipAlignProp.apply((_d = props._tooltipAlign) !== null && _d !== void 0 ? _d : LINK_ELEMENT_DEFAULTS.tooltipAlign, set("tooltipAlign"));
  variantProp.apply(props._variant, set("variant"));
  if (typeof props._tabIndex === "number") {
    tabIndexProp.apply(props._tabIndex, set("tabIndex"));
  } else {
    resolved.tabIndex = void 0;
  }
  validateAccessAndShortKey(props._accessKey, props._shortKey);
  return resolved;
}

export {
  resolveLinkProps
};
//# sourceMappingURL=chunk-5NZISYSR.js.map
