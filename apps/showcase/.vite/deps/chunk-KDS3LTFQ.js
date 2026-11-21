import {
  containsOnlyNumbers,
  hasEnoughReadableChars,
  trimLabel
} from "./chunk-KPGE6Z2R.js";
import {
  a11yHint,
  uiUxHint
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/label-hints-BUADjqKF.js
function labelHints(_propName, value) {
  const text = typeof value === "string" ? value : Array.isArray(value) ? trimLabel(value) : "";
  if (text === "") {
    return;
  }
  if (hasEnoughReadableChars(text, 3) === false && containsOnlyNumbers(text) === false) {
    a11yHint(`The heading or label ("${text}") is inaccessible. A label should consist of at least three readable characters.`);
  }
  if (text.length > 80) {
    uiUxHint(`A heading or label should not be longer than 80 characters.`);
  }
}

export {
  labelHints
};
//# sourceMappingURL=chunk-KDS3LTFQ.js.map
