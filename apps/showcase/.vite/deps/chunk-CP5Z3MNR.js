import {
  ButtonFC
} from "./chunk-3C6UB25G.js";
import {
  SpanFC
} from "./chunk-AVJUB7OE.js";
import {
  BemRootNodeFC
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/component-DxnezN7K.js
var badgeBem = bem.forBlock("kol-badge");
var BEM_CLASS_BADGE__LABEL = badgeBem("label");
var BEM_CLASS_BADGE__SMART_BUTTON = badgeBem("smart-button");
var BadgeFC = ({ color, icons, label, smartButton }) => {
  return h(BemRootNodeFC, { block: "kol-badge", modifiers: { "has-smart-button": smartButton !== void 0 }, style: {
    backgroundColor: color.backgroundColor,
    color: color.foregroundColor
  } }, h(SpanFC, { class: BEM_CLASS_BADGE__LABEL, id: smartButton === null || smartButton === void 0 ? void 0 : smartButton.labelId, allowMarkdown: true, icons, label }), smartButton && h(ButtonFC, Object.assign({}, smartButton.resolvedButton, { class: BEM_CLASS_BADGE__SMART_BUTTON, ariaDescriptionId: smartButton.ariaDescriptionId, handleBlur: smartButton.handleBlur, handleClick: smartButton.handleClick, handleFocus: smartButton.handleFocus, handleMouseDown: smartButton.handleMouseDown, refButton: smartButton.refSmartButton, refTooltip: smartButton.refTooltip })), h("br", null));
};

export {
  BadgeFC
};
//# sourceMappingURL=chunk-CP5Z3MNR.js.map
