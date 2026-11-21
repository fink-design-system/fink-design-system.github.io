import {
  trimLabel
} from "./chunk-KPGE6Z2R.js";
import {
  Log
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/unique-nav-labels-CZIyOzqJ.js
var UNIQUE_LABELS = /* @__PURE__ */ new Set();
function addNavLabel(ariaLabel) {
  const trimmedLabel = trimLabel(ariaLabel);
  if (UNIQUE_LABELS.has(trimmedLabel)) {
    Log.warn(`There already is a nav element with the label "${trimmedLabel}"`);
  } else {
    UNIQUE_LABELS.add(trimmedLabel);
  }
}
function removeNavLabel(ariaLabel) {
  const trimmedLabel = trimLabel(ariaLabel);
  UNIQUE_LABELS.delete(trimmedLabel);
}

export {
  addNavLabel,
  removeNavLabel
};
//# sourceMappingURL=chunk-WUIMGAAG.js.map
