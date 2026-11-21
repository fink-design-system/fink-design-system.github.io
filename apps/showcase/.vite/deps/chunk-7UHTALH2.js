import {
  createRelatedUniqueId
} from "./chunk-FQ2Y4FDM.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
import {
  createPropDefinition,
  normalizeString
} from "./chunk-KPGE6Z2R.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/suggestions-fWMdnACm.js
var autoCompleteProp = createPropDefinition("autoComplete", "off", normalizeString, (value) => value.length > 0);
var SuggestionsFC = (_a) => {
  var { id, suggestions } = _a, other = __rest(_a, ["id", "suggestions"]);
  if (!suggestions) {
    return null;
  }
  return h("datalist", Object.assign({ id: createRelatedUniqueId(id, "list") }, other), suggestions.map((option) => h("option", { value: option })));
};

export {
  autoCompleteProp,
  SuggestionsFC
};
//# sourceMappingURL=chunk-7UHTALH2.js.map
