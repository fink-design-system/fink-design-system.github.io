import {
  createPropDefinition
} from "./chunk-KPGE6Z2R.js";
import {
  parseJson
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/smart-button-p4avK7MS.js
function normalizeSmartButton(value) {
  const parsed = typeof value === "string" ? parseJson(value) : value;
  if (typeof parsed === "object" && parsed !== null) {
    return parsed;
  }
  throw new Error(`Invalid smart button: ${typeof value}`);
}
var smartButtonProp = createPropDefinition("smartButton", { _label: "" }, normalizeSmartButton);

export {
  smartButtonProp
};
//# sourceMappingURL=chunk-FEDQEKWE.js.map
