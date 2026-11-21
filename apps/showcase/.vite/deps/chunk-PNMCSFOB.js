import {
  labelProp
} from "./chunk-PVPG337L.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import {
  BemRootNodeFC,
  createPropDefinition,
  normalizeBoolean,
  normalizeString,
  resolveFcProps
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  Fragment,
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/component-DisuGN16.js
var showProp = createPropDefinition("show", false, normalizeBoolean);
var spinVariantOptions = ["dot", "cycle", "none"];
var variantSpinProp = createPropDefinition("variant", "dot", (value) => {
  const str = normalizeString(value);
  if (spinVariantOptions.includes(str)) {
    return str;
  }
  throw new Error(`Invalid spin variant: ${str}`);
}, () => true);
var spinPropsConfig = {
  optional: [labelProp, showProp, variantSpinProp]
};
var spinBem = bem.forBlock("kol-spin");
var BEM_CLASS_SPIN__LOADER = spinBem("loader");
var DOT_ELEMENTS = ["1", "2", "3", "neutral"];
function renderSpinVariant(variant) {
  switch (variant) {
    case "cycle":
      return h("span", { class: BEM_CLASS_SPIN__LOADER });
    case "none":
      return h("slot", { name: "expert" });
    default:
      return DOT_ELEMENTS.map((element) => h("span", { class: spinBem("spinner-element", { [element]: true }) }));
  }
}
var SpinFC = (props) => {
  const { show, label, variant } = resolveFcProps(spinPropsConfig, props);
  return h(BemRootNodeFC, { block: "kol-spin" }, show ? h(Fragment, null, h("span", { class: spinBem("spinner", { [variant]: true }) }, renderSpinVariant(variant)), h("span", { "aria-busy": "true", class: "visually-hidden", role: "alert" }, label || translate("kol-action-running"))) : h("span", { "aria-busy": "false", class: "visually-hidden", role: "alert" }, label || translate("kol-action-done")));
};

export {
  showProp,
  variantSpinProp,
  spinPropsConfig,
  SpinFC
};
//# sourceMappingURL=chunk-PNMCSFOB.js.map
