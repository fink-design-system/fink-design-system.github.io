import {
  createAlignPropDefinition
} from "./chunk-7Q2QTJQF.js";
import {
  isSafeClassName
} from "./chunk-4323FHT3.js";
import {
  createPropDefinition,
  isEnumOption,
  normalizeBoolean,
  normalizeBooleanToken,
  normalizeInteger,
  normalizeObject,
  normalizeString
} from "./chunk-KPGE6Z2R.js";
import {
  h
} from "./chunk-VUP4WNL7.js";
import {
  a11yHint
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/component-Bldy_ShO.js
var classNameFromVariant = (variants, componentName) => {
  let className = "";
  if (Array.isArray(variants)) {
    variants.forEach((variant) => {
      className += "kol-" + componentName + "--" + variant + " ";
    });
  }
  return className;
};
var accessKeyProp = createPropDefinition("accessKey", "", normalizeString);
var ariaControlsProp = createPropDefinition("ariaControls", "", normalizeString);
var ariaDescriptionProp = createPropDefinition("ariaDescription", "", normalizeString);
function normalizeAriaExpanded(value) {
  return normalizeBooleanToken(value, "aria-expanded");
}
var ariaExpandedProp = createPropDefinition("ariaExpanded", "", normalizeAriaExpanded);
function validateCustomClass(value) {
  return value === "" || isSafeClassName(value);
}
var customClassProp = createPropDefinition("customClass", "", normalizeString, validateCustomClass);
var hideLabelProp = createPropDefinition("hideLabel", false, normalizeBoolean);
var inlineProp = createPropDefinition("inline", true, normalizeBoolean);
var LINK_ROLE_OPTIONS = ["tab", "treeitem"];
function normalizeLinkRole(value) {
  if (value === "") {
    return "";
  }
  if (isEnumOption(value, LINK_ROLE_OPTIONS)) {
    return value;
  }
  throw new Error(`Invalid role: expected one of ${LINK_ROLE_OPTIONS.join(", ")}, got ${JSON.stringify(value)}`);
}
var linkRoleProp = createPropDefinition("role", "", normalizeLinkRole);
var shortKeyProp = createPropDefinition("shortKey", "", normalizeString);
function normalizeSpanIcons(value) {
  if (!value || typeof value === "string" && value === "") {
    return {};
  }
  if (typeof value === "string" && /^[{[]/.test(value.trim())) {
    return normalizeObject(value);
  }
  if (typeof value === "string") {
    return normalizeString(value);
  }
  if (typeof value === "object") {
    return normalizeObject(value);
  }
  throw new Error(`Invalid icons: ${typeof value}`);
}
function validateSpanIcons(value) {
  if (typeof value === "string") {
    return value.length > 0;
  }
  return typeof value === "object" && value !== null;
}
var spanIconsProp = createPropDefinition("icons", {}, normalizeSpanIcons, validateSpanIcons);
var tabIndexProp = createPropDefinition("tabIndex", 0, normalizeInteger, void 0, {
  hints: (_propName, value) => {
    if (typeof value === "number" && value > 0) {
      a11yHint(`Positive tabIndex values ("${value}") can disrupt the natural tab order. Use 0 for tabbable elements or rely on DOM order.`);
    }
  }
});
var tooltipAlignProp = createAlignPropDefinition("tooltipAlign", "right");
function normalizeVariant(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "string") {
    return value.split(" ");
  }
  return [];
}
function validateVariant(value) {
  return value.length === 0 || value.every(isSafeClassName);
}
var variantProp = createPropDefinition("variant", [], normalizeVariant, validateVariant);
var AriaDescriptionSpanFC = ({ description, descriptionId }) => description ? h("span", { class: "visually-hidden", id: descriptionId }, description) : null;

export {
  classNameFromVariant,
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
  variantProp,
  AriaDescriptionSpanFC
};
//# sourceMappingURL=chunk-JIRF5MWS.js.map
