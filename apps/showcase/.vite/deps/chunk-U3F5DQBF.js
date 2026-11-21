import {
  getHeadlineTag
} from "./chunk-Q4L7LM2W.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import {
  ButtonFC
} from "./chunk-3C6UB25G.js";
import {
  renderLabelWithLang
} from "./chunk-AVJUB7OE.js";
import {
  IconFC
} from "./chunk-NQNQ4CHG.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
import {
  BemRootNodeFC,
  clsx,
  trimLabel
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  Fragment,
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/component-vxdandl4.js
var alertBem$1 = bem.forBlock("kol-alert");
var BEM_CLASS_ALERT__ICON = alertBem$1("icon");
var ALERT_ICON_CONFIG = {
  error: {
    label: translate("kol-error"),
    icon: "kolicon-alert-error"
  },
  info: {
    label: translate("kol-info"),
    icon: "kolicon-alert-info"
  },
  warning: {
    label: translate("kol-warning"),
    icon: "kolicon-alert-warning"
  },
  success: {
    label: translate("kol-success"),
    icon: "kolicon-alert-success"
  },
  default: {
    label: translate("kol-message"),
    icon: "kolicon-alert-info"
  }
};
var AlertIconFC = ({ type = "default" }) => {
  const config = ALERT_ICON_CONFIG[type || "default"];
  return h(Fragment, null, h("span", { class: "visually-hidden" }, config.label), h(IconFC, { class: BEM_CLASS_ALERT__ICON, label: "", icons: config.icon }));
};
var alertBem = bem.forBlock("kol-alert");
var BEM_CLASS_ALERT__CLOSER = alertBem("closer");
var BEM_CLASS_ALERT__CONTENT = alertBem("content");
var BEM_CLASS_CLOSE_BUTTON = bem.forBlock("kol-close-button")();
var UNSET_BUTTON_PROP = void 0;
var AlertFC = (props, children) => {
  const { alert, class: classNames, closerAriaDescriptionId, handleCloserClick, hasCloser, headingId, label, level, refCloserButton, refCloserTooltip, type, variant } = props, other = __rest(props, ["alert", "class", "closerAriaDescriptionId", "handleCloserClick", "hasCloser", "headingId", "label", "level", "refCloserButton", "refCloserTooltip", "type", "variant"]);
  const translateCloseAlert = translate("kol-close-alert");
  const HeadlineTag = getHeadlineTag(level !== null && level !== void 0 ? level : 0);
  return h(BemRootNodeFC, Object.assign({ block: "kol-alert", class: classNames, modifiers: {
    hasCloser: hasCloser === true,
    [`type-${type}`]: true,
    [`variant-${variant}`]: true
  }, role: alert ? "alert" : void 0 }, other), h(AlertIconFC, { type }), !!(label === null || label === void 0 ? void 0 : label.length) && h(HeadlineTag, { class: clsx("kol-headline", `kol-headline--${HeadlineTag}`, alertBem("heading", { [`h${level}`]: true }), "kol-headline--single"), id: headingId }, renderLabelWithLang(label)), hasCloser && h(ButtonFC, { accessKey: "", ariaControls: "", ariaDescription: trimLabel(label), ariaDescriptionId: closerAriaDescriptionId, ariaExpanded: UNSET_BUTTON_PROP, ariaHasPopup: "", ariaSelected: UNSET_BUTTON_PROP, class: clsx(BEM_CLASS_ALERT__CLOSER, BEM_CLASS_CLOSE_BUTTON), customClass: "", disabled: false, handleBlur: () => void 0, handleClick: handleCloserClick, handleFocus: () => void 0, handleMouseDown: () => void 0, hideLabel: true, icons: {
    left: {
      icon: "kolicon-cross"
    }
  }, id: "", inline: false, label: translateCloseAlert, name: "", on: {}, refButton: refCloserButton, refTooltip: refCloserTooltip, role: UNSET_BUTTON_PROP, shortKey: "", tabIndex: UNSET_BUTTON_PROP, tooltipAlign: "top", type: "button", variant: ["normal"] }), h("div", { "aria-describedby": (label === null || label === void 0 ? void 0 : label.length) ? headingId : void 0, class: BEM_CLASS_ALERT__CONTENT }, children));
};

export {
  AlertFC
};
//# sourceMappingURL=chunk-U3F5DQBF.js.map
