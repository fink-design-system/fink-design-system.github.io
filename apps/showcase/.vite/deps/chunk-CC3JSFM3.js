import {
  createPropDefinition,
  normalizeArray
} from "./chunk-KPGE6Z2R.js";
import {
  uiUxHintMillerscheZahl
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/links-Dy9WkOJ-.js
function createLinksPropDefinition(componentName) {
  return createPropDefinition("links", [], (value) => normalizeArray(value), (items) => items.every((item) => typeof item === "object" && item !== null && (typeof item._href === "string" || typeof item._label === "string")), {
    hints: (_propName, items) => uiUxHintMillerscheZahl(componentName, items.length)
  });
}

export {
  createLinksPropDefinition
};
//# sourceMappingURL=chunk-CC3JSFM3.js.map
