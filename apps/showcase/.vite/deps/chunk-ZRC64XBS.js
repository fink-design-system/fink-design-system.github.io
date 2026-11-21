import {
  createPropDefinition
} from "./chunk-KPGE6Z2R.js";
import {
  parseJson
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/options-DcIQ-KB2.js
var getLabel = (option) => typeof option === "object" && option !== null ? option.label : void 0;
var isValidOption = (option) => {
  const label = getLabel(option);
  return typeof label === "string" && label.length > 0 || typeof label === "number" && Number.isFinite(label);
};
function createOptionsPropDefinition() {
  return createPropDefinition("options", [], (value) => {
    const parsed = typeof value === "string" ? parseJson(value) : value;
    if (Array.isArray(parsed) && parsed.every(isValidOption)) {
      const options = parsed;
      return options.some((option) => typeof option.label === "number") ? options.map((option) => Object.assign(Object.assign({}, option), { label: String(option.label) })) : options;
    }
    throw new Error("Invalid options");
  });
}

export {
  createOptionsPropDefinition
};
//# sourceMappingURL=chunk-ZRC64XBS.js.map
