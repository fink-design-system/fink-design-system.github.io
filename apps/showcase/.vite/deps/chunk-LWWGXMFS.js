import {
  createPropDefinition,
  isNumberString,
  normalizeInputNumber
} from "./chunk-KPGE6Z2R.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/number-value-DncK2_pC.js
var inputMaxProp = createPropDefinition("max", void 0, normalizeInputNumber);
var inputMinProp = createPropDefinition("min", void 0, normalizeInputNumber);
var inputNumberValueProp = createPropDefinition("value", void 0, normalizeInputNumber);
function getNumberValueType(value) {
  if (isNumberString(value)) {
    return "NumberString";
  }
  if (typeof value === "number" && !isNaN(value)) {
    return "number";
  }
  return "null";
}
function remapNumberValue(value, type) {
  if (value === void 0 || value === null) {
    return null;
  }
  if (type === "NumberString") {
    return String(value);
  }
  return value;
}
function parseInputNumberValue(raw) {
  return raw === "" ? null : Number(raw);
}
function clampRangeValue(raw, min, max) {
  const value = parseFloat(raw);
  if (max && value > max) {
    return max;
  }
  if (min && value < min) {
    return min;
  }
  return value;
}

export {
  inputMaxProp,
  inputMinProp,
  inputNumberValueProp,
  getNumberValueType,
  remapNumberValue,
  parseInputNumberValue,
  clampRangeValue
};
//# sourceMappingURL=chunk-LWWGXMFS.js.map
