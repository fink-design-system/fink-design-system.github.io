import {
  AriaDescriptionSpanFC,
  accessKeyProp,
  ariaControlsProp,
  ariaDescriptionProp,
  ariaExpandedProp,
  classNameFromVariant,
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
  TooltipFC
} from "./chunk-7Q2QTJQF.js";
import {
  labelWithExpertSlotProp
} from "./chunk-7C3Y25NJ.js";
import {
  disabledProp
} from "./chunk-SESBZTFK.js";
import {
  SpanFC
} from "./chunk-AVJUB7OE.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
import {
  BemRootNodeFC,
  clsx,
  createCallbacksPropDefinition,
  createPropDefinition,
  isEnumOption,
  normalizeBooleanToken,
  normalizeString,
  resolveFcProps,
  trimLabel
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/component-BC1TpQVD.js
var ARIA_HAS_POPUP_OPTIONS = ["dialog", "false", "grid", "listbox", "menu", "tree", "true"];
function normalizeAriaHasPopup(value) {
  if (value === "") {
    return "";
  }
  if (isEnumOption(value, ARIA_HAS_POPUP_OPTIONS)) {
    return value;
  }
  throw new Error(`Invalid aria-haspopup value: expected one of ${ARIA_HAS_POPUP_OPTIONS.join(", ")}, got ${JSON.stringify(value)}`);
}
var ariaHasPopupProp = createPropDefinition("ariaHasPopup", "", normalizeAriaHasPopup);
function normalizeAriaSelected(value) {
  return normalizeBooleanToken(value, "aria-selected");
}
var ariaSelectedProp = createPropDefinition("ariaSelected", "", normalizeAriaSelected);
var buttonCallbacksProp = createCallbacksPropDefinition();
var BUTTON_TYPE_OPTIONS = ["button", "reset", "submit"];
function normalizeButtonType(value) {
  const str = normalizeString(value);
  if (isEnumOption(str, BUTTON_TYPE_OPTIONS)) {
    return str;
  }
  throw new Error(`Invalid button type: ${str}`);
}
var buttonTypeProp = createPropDefinition("type", "button", normalizeButtonType, (v) => BUTTON_TYPE_OPTIONS.includes(v));
var nameProp = createPropDefinition("name", "", normalizeString);
var buttonPropsConfig = {
  required: [labelWithExpertSlotProp],
  optional: [
    accessKeyProp,
    ariaControlsProp,
    ariaDescriptionProp,
    ariaExpandedProp,
    ariaHasPopupProp,
    ariaSelectedProp,
    buttonCallbacksProp,
    buttonTypeProp,
    customClassProp,
    disabledProp,
    hideLabelProp,
    idProp,
    inlineProp,
    linkRoleProp,
    nameProp,
    shortKeyProp,
    spanIconsProp,
    tabIndexProp,
    tooltipAlignProp,
    variantProp
  ]
};
var buttonBem = bem.forBlock("kol-button");
var BEM_CLASS_BUTTON__INTERACTIVE_ELEMENT = buttonBem("interactive-element");
var BEM_CLASS_BUTTON__TEXT = buttonBem("text");
var BEM_CLASS_BUTTON__TOOLTIP = buttonBem("tooltip");
var ButtonFC = (props) => {
  const _a = resolveFcProps(buttonPropsConfig, props), { accessKey, ariaControls, ariaDescription, ariaDescriptionId, ariaExpanded, ariaHasPopup, ariaSelected, class: hostClass, customClass, disabled, handleBlur, handleClick, handleFocus, handleMouseDown, hideLabel, icons, id, inline, label, name, refButton, refTooltip, role, shortKey, tabIndex, type, variant } = _a, rest = __rest(_a, ["accessKey", "ariaControls", "ariaDescription", "ariaDescriptionId", "ariaExpanded", "ariaHasPopup", "ariaSelected", "class", "customClass", "disabled", "handleBlur", "handleClick", "handleFocus", "handleMouseDown", "hideLabel", "icons", "id", "inline", "label", "name", "refButton", "refTooltip", "role", "shortKey", "tabIndex", "type", "variant", "on", "tooltipAlign"]);
  const badgeText = accessKey || shortKey;
  const hasLabelText = trimLabel(label).length > 0;
  const hasAriaDescription = ariaDescription.trim().length > 0;
  return h(BemRootNodeFC, Object.assign({ block: "kol-button", class: clsx(hostClass, {
    [classNameFromVariant(variant, "button")]: variant.length > 0,
    [customClass]: customClass.length > 0
  }), modifiers: {
    disabled,
    "hide-label": hideLabel,
    inline: inline === true,
    standalone: inline === false
  } }, rest), h("button", { ref: refButton, accessKey: accessKey || void 0, "aria-controls": ariaControls || void 0, "aria-describedby": hasAriaDescription ? ariaDescriptionId : void 0, "aria-expanded": ariaExpanded || void 0, "aria-haspopup": ariaHasPopup || void 0, "aria-keyshortcuts": shortKey || void 0, "aria-label": hideLabel && hasLabelText ? trimLabel(label) : void 0, "aria-selected": ariaSelected || void 0, class: BEM_CLASS_BUTTON__INTERACTIVE_ELEMENT, disabled, id: id || void 0, name: name || void 0, onBlur: handleBlur, onClick: handleClick, onFocus: handleFocus, onMouseDown: handleMouseDown, role: role || void 0, tabIndex, type }, h(SpanFC, { class: BEM_CLASS_BUTTON__TEXT, badgeText, icons, hideLabel, label }, h("slot", { name: "expert", slot: "expert" }))), hideLabel && hasLabelText && h("div", { class: BEM_CLASS_BUTTON__TOOLTIP }, h(TooltipFC, { badgeText, label, refFloating: refTooltip })), hasAriaDescription && h(AriaDescriptionSpanFC, { description: ariaDescription, descriptionId: ariaDescriptionId }));
};

export {
  ariaHasPopupProp,
  ariaSelectedProp,
  buttonCallbacksProp,
  buttonTypeProp,
  nameProp,
  buttonPropsConfig,
  ButtonFC
};
//# sourceMappingURL=chunk-3C6UB25G.js.map
