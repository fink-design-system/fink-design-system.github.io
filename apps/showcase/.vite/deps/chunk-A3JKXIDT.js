import {
  createPropDefinition
} from "./chunk-KPGE6Z2R.js";
import {
  a11yHint,
  parseJson
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/suggestions-BsWy2U2z.js
function normalizeSuggestions(value) {
  const parsed = typeof value === "string" ? parseJson(value) : value;
  if (Array.isArray(parsed)) {
    return parsed;
  }
  throw new Error(`Invalid suggestions: ${typeof value}`);
}
var suggestionsProp = createPropDefinition("suggestions", [], normalizeSuggestions, (value) => value.every((item) => typeof item === "string" || typeof item === "number"), {
  hints: (_, value) => {
    if (value.length > 0) {
      a11yHint("Property suggestions: Options have accessibility issues in how browsers implemented them and should not be used for now.");
    }
  }
});

export {
  suggestionsProp
};
//# sourceMappingURL=chunk-A3JKXIDT.js.map
