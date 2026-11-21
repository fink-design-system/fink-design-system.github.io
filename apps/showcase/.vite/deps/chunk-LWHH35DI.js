import {
  linkTargetProp
} from "./chunk-ETC363DC.js";
import {
  hrefProp
} from "./chunk-U2POW5WN.js";
import {
  hasCloserProp
} from "./chunk-7OTVGI43.js";
import {
  levelProp
} from "./chunk-AXVYILGE.js";
import {
  KolHeadingFc
} from "./chunk-Q4L7LM2W.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import {
  resolveButtonProps
} from "./chunk-AIH4BWIT.js";
import {
  ButtonFC
} from "./chunk-3C6UB25G.js";
import {
  renderLabelWithLang
} from "./chunk-AVJUB7OE.js";
import {
  labelLangSegmentsProp
} from "./chunk-QVVQWVZC.js";
import {
  BemRootNodeFC,
  clsx,
  createCallbacksPropDefinition,
  resolveFcProps
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/component-BUzgs8fh.js
var cardCallbacksProp = createCallbacksPropDefinition();
var cardPropsConfig = {
  required: [labelLangSegmentsProp],
  optional: [cardCallbacksProp, hasCloserProp, hrefProp, levelProp, linkTargetProp]
};
function resolveCardCloseButtonProps(host) {
  return resolveButtonProps({
    _hideLabel: true,
    _icons: { left: { icon: "kolicon-cross" } },
    _label: translate("kol-close"),
    _tooltipAlign: "top"
  }, host);
}
var cardBem = bem.forBlock("kol-card");
var BEM_CLASS_CARD__CLOSE_BUTTON = cardBem("close-button");
var BEM_CLASS_CARD__CONTENT = cardBem("content");
var BEM_CLASS_CARD__HEADER = cardBem("header");
var BEM_CLASS_CARD__LINK = cardBem("link");
var BEM_CLASS_CLOSE_BUTTON = bem.forBlock("kol-close-button")();
var NOOP = () => {
};
var CardHeadingFC = ({ headingId, label, level }) => h(KolHeadingFc, { class: BEM_CLASS_CARD__HEADER, id: headingId, level }, renderLabelWithLang(label));
var CardFC = (props, children) => {
  const { ariaDescriptionId, class: hostClass, closeButtonProps, handleBlur, handleClose, handleFocus, hasCloser, headingId, href, label, level, refCloseButton, refCta, refTooltip, target } = resolveFcProps(cardPropsConfig, props);
  return h(BemRootNodeFC, { component: "article", "aria-labelledby": headingId, block: "kol-card", class: hostClass }, href.length > 0 ? h("a", { class: BEM_CLASS_CARD__LINK, href, target: target || void 0, onBlur: handleBlur, onFocus: handleFocus, ref: refCta }, h(CardHeadingFC, { headingId, label, level })) : h(CardHeadingFC, { headingId, label, level }), h("div", { class: BEM_CLASS_CARD__CONTENT }, children), hasCloser && h("div", { class: clsx(BEM_CLASS_CARD__CLOSE_BUTTON, BEM_CLASS_CLOSE_BUTTON) }, h(ButtonFC, Object.assign({}, closeButtonProps, { ariaDescriptionId, handleBlur: NOOP, handleClick: handleClose, handleFocus: NOOP, handleMouseDown: NOOP, refButton: refCloseButton, refTooltip }))));
};

export {
  cardCallbacksProp,
  cardPropsConfig,
  resolveCardCloseButtonProps,
  CardFC
};
//# sourceMappingURL=chunk-LWHH35DI.js.map
