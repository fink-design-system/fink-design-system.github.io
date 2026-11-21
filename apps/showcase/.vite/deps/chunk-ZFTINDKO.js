import {
  getI18nInstance,
  initializeI18n
} from "./chunk-4KQM2UAA.js";
import {
  isTestMode
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/i18n-BLkzMf6D.js
var translate = (key, options) => {
  var _a;
  const i18n = (_a = getI18nInstance()) !== null && _a !== void 0 ? _a : initializeI18n("de");
  return i18n.translate(key, options);
};
if (isTestMode()) {
  translate = (key) => key;
}

export {
  translate
};
//# sourceMappingURL=chunk-ZFTINDKO.js.map
