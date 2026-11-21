import {
  isValidLabelSegments,
  isValidLabelString
} from "./chunk-KPGE6Z2R.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/validators-ByUMEUYD.js
var SAFE_CLASS_NAME_RE = /^[a-zA-Z][a-zA-Z0-9_-]{0,60}$/;
var isSafeClassName = (value) => typeof value === "string" && SAFE_CLASS_NAME_RE.test(value);
var isValidLabel = isValidLabelString;
var isValidLabelWithExpertSlot = (value) => value === "" || isValidLabelSegments(value);
var isValidLabelDecorative = (value) => value === "" || isValidLabel(value);

export {
  isSafeClassName,
  isValidLabel,
  isValidLabelWithExpertSlot,
  isValidLabelDecorative
};
//# sourceMappingURL=chunk-4323FHT3.js.map
