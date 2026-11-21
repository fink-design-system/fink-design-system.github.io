import {
  linkTargetProp
} from "./chunk-ETC363DC.js";
import {
  hrefProp
} from "./chunk-U2POW5WN.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
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
  TooltipFC
} from "./chunk-7Q2QTJQF.js";
import {
  labelWithExpertSlotProp
} from "./chunk-7C3Y25NJ.js";
import {
  preventFocus
} from "./chunk-VFFG6S5V.js";
import {
  disabledProp
} from "./chunk-SESBZTFK.js";
import {
  SpanFC
} from "./chunk-AVJUB7OE.js";
import {
  IconFC
} from "./chunk-NQNQ4CHG.js";
import {
  BemRootNodeFC,
  clsx,
  createCallbacksPropDefinition,
  createPropDefinition,
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
import {
  devHint
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/component-ZJiUl6kZ.js
var ARIA_CURRENT_VALUE_OPTIONS = ["date", "location", "page", "step", "time", "true", "false"];
function normalizeAriaCurrentValue(value) {
  const str = normalizeString(value);
  return ARIA_CURRENT_VALUE_OPTIONS.includes(str) ? str : "page";
}
var ariaCurrentValueProp = createPropDefinition("ariaCurrentValue", "page", normalizeAriaCurrentValue);
var ariaOwnsProp = createPropDefinition("ariaOwns", "", normalizeString);
var downloadProp = createPropDefinition("download", void 0, normalizeString);
var linkCallbacksProp = createCallbacksPropDefinition();
var linkPropsConfig = {
  required: [hrefProp],
  optional: [
    accessKeyProp,
    ariaControlsProp,
    ariaCurrentValueProp,
    ariaDescriptionProp,
    ariaExpandedProp,
    ariaOwnsProp,
    customClassProp,
    disabledProp,
    downloadProp,
    hideLabelProp,
    spanIconsProp,
    inlineProp,
    labelWithExpertSlotProp,
    linkCallbacksProp,
    linkRoleProp,
    linkTargetProp,
    shortKeyProp,
    tabIndexProp,
    tooltipAlignProp,
    variantProp
  ]
};
var linkBem = bem.forBlock("kol-link");
var LinkFC = (props, children) => {
  const { accessKey, ariaControls, ariaCurrent, ariaDescription, ariaDescriptionId, ariaExpanded, ariaOwns, class: hostClass, customClass, disabled, download, handleAnchorClick, hideLabel, href, icons, inline, label, on, ref, refAnchor, refTooltip, role, shortKey, tabIndex, target, variant, expertSlot } = resolveFcProps(linkPropsConfig, props);
  const translateOpenLinkInTab = translate("kol-open-link-in-tab");
  const isExternal = typeof target === "string" && target.length > 0 && target !== "_self";
  const tagAttrs = {
    href: typeof href === "string" && href.length > 0 ? href : "javascript:void(0);",
    target: typeof target === "string" && target.length > 0 ? target : void 0,
    rel: isExternal ? "noopener" : void 0,
    download: typeof download === "string" ? download : void 0
  };
  if (hideLabel === true && trimLabel(label) === "") {
    devHint(`[KolLink] An aria-label must be set when _hide-label is set.`);
  }
  const trimmedAriaDescription = ariaDescription === null || ariaDescription === void 0 ? void 0 : ariaDescription.trim();
  const roleValue = role || void 0;
  return h(BemRootNodeFC, { block: "kol-link", ref, class: clsx(hostClass, {
    [customClass]: variant.includes("custom") && customClass.length > 0,
    [classNameFromVariant(variant, "link")]: variant.length > 0
  }), modifiers: {
    disabled: disabled === true,
    "external-link": isExternal,
    "hide-label": hideLabel === true,
    inline: inline === true,
    standalone: inline === false
  } }, h("a", Object.assign({ ref: refAnchor }, tagAttrs, { href: tagAttrs.href, accessKey: accessKey || void 0, "aria-current": ariaCurrent || void 0, "aria-controls": ariaControls || void 0, "aria-describedby": trimmedAriaDescription ? ariaDescriptionId : void 0, "aria-disabled": disabled ? "true" : void 0, "aria-expanded": ariaExpanded === "" ? void 0 : ariaExpanded, "aria-owns": ariaOwns || void 0, "aria-label": hideLabel && trimLabel(label) !== "" ? `${trimLabel(label)}${isExternal ? ` (${translateOpenLinkInTab})` : ""}` : void 0, "aria-keyshortcuts": shortKey || void 0, class: linkBem("interactive-element") }, on, { onClick: handleAnchorClick, onMouseDown: disabled ? preventFocus : void 0, role: roleValue, tabIndex: disabled ? -1 : tabIndex }), h(SpanFC, { class: "kol-link__text", badgeText: accessKey || shortKey, icons, hideLabel, label: expertSlot ? "" : label || href }, children.length > 0 ? children : h("slot", { name: "expert", slot: "expert" })), isExternal && h(IconFC, { class: "kol-link__icon", label: hideLabel ? "" : translateOpenLinkInTab, icons: "kolicon-link-external", "aria-hidden": hideLabel })), hideLabel === true && !expertSlot && h("div", { class: linkBem("tooltip") }, h(TooltipFC, { badgeText: accessKey || shortKey || "", label: trimLabel(label) !== "" ? label : typeof href === "string" ? href : "", refFloating: refTooltip })), trimmedAriaDescription && h(AriaDescriptionSpanFC, { description: trimmedAriaDescription, descriptionId: ariaDescriptionId }));
};

export {
  ariaCurrentValueProp,
  ariaOwnsProp,
  downloadProp,
  linkCallbacksProp,
  linkPropsConfig,
  LinkFC
};
//# sourceMappingURL=chunk-JLURN3RE.js.map
