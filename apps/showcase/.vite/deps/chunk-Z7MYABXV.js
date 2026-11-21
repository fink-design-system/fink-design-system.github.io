import {
  createContrastColorPair
} from "./chunk-ONIQ4NI3.js";
import {
  createPropDefinition
} from "./chunk-KPGE6Z2R.js";
import {
  parseJson
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/color-CnRQPMm_.js
var HEX_REGEX = /^#((\d|[a-f]){8}|(\d|[a-f]){6}|(\d|[a-f]){3,4})$/i;
function isHexString(value) {
  return HEX_REGEX.test(value);
}
function normalizer(value) {
  if (typeof value === "string" && isHexString(value)) {
    const colors = createContrastColorPair(value);
    return {
      backgroundColor: colors.background,
      foregroundColor: colors.foreground
    };
  }
  const candidate = typeof value === "string" ? parseJson(value) : value;
  if (Array.isArray(candidate)) {
    const [background, foreground] = candidate;
    if (typeof background === "string" && typeof foreground === "string" && isHexString(background) && isHexString(foreground)) {
      const colors = createContrastColorPair({ background, foreground });
      return {
        backgroundColor: colors.background,
        foregroundColor: colors.foreground
      };
    }
  }
  if (typeof candidate === "object" && candidate) {
    const colorPair = candidate;
    if (typeof colorPair.backgroundColor === "string" && typeof colorPair.foregroundColor === "string" && isHexString(colorPair.backgroundColor) && isHexString(colorPair.foregroundColor)) {
      const colors = createContrastColorPair({
        background: colorPair.backgroundColor,
        foreground: colorPair.foregroundColor
      });
      return {
        backgroundColor: colors.background,
        foregroundColor: colors.foreground
      };
    }
  }
  throw new Error(`Invalid color ${value}`);
}
function validator(value) {
  return isHexString(value.foregroundColor) && isHexString(value.backgroundColor);
}
var colorProp = createPropDefinition("color", {
  backgroundColor: "#d3d3d3",
  foregroundColor: "#3f3f3f"
}, normalizer, validator);

export {
  colorProp
};
//# sourceMappingURL=chunk-Z7MYABXV.js.map
