import {
  __rest
} from "./chunk-7UI7W6EF.js";
import {
  BemRootNodeFC,
  clsx
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/component-LadkF9an.js
var iconBem = bem.forBlock("kol-icon");
var BEM_CLASS_ICON__ICON = iconBem("icon");
var IconFC = (_a) => {
  var { class: classNames, icons, label } = _a, htmlAttributes = __rest(_a, ["class", "icons", "label"]);
  const hasAriaLabel = (label === null || label === void 0 ? void 0 : label.length) > 0;
  return h(BemRootNodeFC, Object.assign({ component: "i" }, htmlAttributes, { "aria-hidden": hasAriaLabel ? void 0 : "true", "aria-label": hasAriaLabel ? label : void 0, block: "kol-icon", class: clsx(BEM_CLASS_ICON__ICON, icons, classNames), role: hasAriaLabel ? "img" : "presentation" }));
};

export {
  IconFC
};
//# sourceMappingURL=chunk-NQNQ4CHG.js.map
