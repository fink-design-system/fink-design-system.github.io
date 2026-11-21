import {
  SpanFC
} from "./chunk-AVJUB7OE.js";
import {
  createPropDefinition,
  isEnumOption,
  normalizeString
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/component-D5yKRPCZ.js
var horizontalAlignOptions = ["left", "right"];
var verticalAlignOptions = ["top", "bottom"];
var alignPropTypeOptions = [...horizontalAlignOptions, ...verticalAlignOptions];
function createAlignPropDefinition(propName, defaultValue) {
  return createPropDefinition(propName, defaultValue, (value) => {
    const str = normalizeString(value);
    if (isEnumOption(str, alignPropTypeOptions)) {
      return str;
    }
    throw new Error(`Invalid ${propName} value: ${str}`);
  });
}
var tooltipBem = bem.forBlock("kol-tooltip");
var TooltipFC = ({ label, badgeText, id, refFloating }) => {
  return h("div", { class: tooltipBem("floating"), hidden: !label, ref: refFloating }, h("div", { class: tooltipBem("arrow") }), h(SpanFC, { class: tooltipBem("content"), badgeText, id, label }));
};

export {
  createAlignPropDefinition,
  TooltipFC
};
//# sourceMappingURL=chunk-7Q2QTJQF.js.map
