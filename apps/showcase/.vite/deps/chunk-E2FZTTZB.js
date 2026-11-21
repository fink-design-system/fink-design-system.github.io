import {
  createPropDefinition,
  normalizeString
} from "./chunk-KPGE6Z2R.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/orientation-tX0FldEu.js
var orientationOptions = ["horizontal", "vertical"];
function normalizeOrientation(value) {
  const str = normalizeString(value);
  if (orientationOptions.includes(str)) {
    return str;
  }
  throw new Error(`Invalid orientation: ${str}`);
}
var orientationProp = createPropDefinition("orientation", "horizontal", normalizeOrientation);

export {
  normalizeOrientation,
  orientationProp
};
//# sourceMappingURL=chunk-E2FZTTZB.js.map
