import {
  rgba as rgba2
} from "./chunk-KPGE6Z2R.js";
import {
  rgba,
  s
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/contrast-pfwNxK_L.js
var getContrastYIQ = (r, g, b) => {
  const yiq = (r * 299 + g * 587 + b * 114) / 1e3;
  return yiq >= 128 ? -1 : 1;
};
var calcColorContrast = (baseColor, contrastColor, ratio, dir = 1) => {
  const color = [
    Math.max(Math.min(Math.round(contrastColor[0] + dir * Math.max(1, contrastColor[0] / 100)), 255), 0),
    Math.max(Math.min(Math.round(contrastColor[1] + dir * Math.max(1, contrastColor[1] / 100)), 255), 0),
    Math.max(Math.min(Math.round(contrastColor[2] + dir * Math.max(1, contrastColor[2] / 100)), 255), 0)
  ];
  const contrast = s(rgba.hex(`rgba(${baseColor.join(",")},1)`), rgba.hex(`rgba(${color.join(",")},1)`));
  const summe = color[0] + color[1] + color[2];
  if (summe === 0 || summe === 765 || contrast > ratio) {
    return {
      background: baseColor,
      foreground: color,
      contrast
    };
  } else {
    return calcColorContrast(baseColor, color, ratio, dir);
  }
};
var chooseColorContrast = (baseColor, contrastColor, ratio) => {
  const dir = getContrastYIQ(baseColor[0], baseColor[1], baseColor[2]);
  const suggested = calcColorContrast(baseColor, contrastColor, ratio, dir);
  if (suggested.contrast >= ratio) {
    return suggested;
  }
  const opposite = calcColorContrast(baseColor, contrastColor, ratio, -dir);
  return opposite.contrast > suggested.contrast ? opposite : suggested;
};
var createContrastColorPair = (color, contrastRatio = 7) => {
  let baseColor = [0, 0, 0, 1];
  let contrastColor = [255, 255, 255, 1];
  if (typeof color === "string") {
    baseColor = rgba2(color);
    contrastColor = baseColor;
  } else if (typeof color === "object" && color !== null && typeof color.background === "string" && typeof color.foreground === "string") {
    baseColor = rgba2(color.background);
    if (typeof color.foreground === "string") {
      contrastColor = rgba2(color.foreground);
    } else {
      contrastColor = baseColor;
    }
  }
  const colorContrast = chooseColorContrast([baseColor[0], baseColor[1], baseColor[2]], [contrastColor[0], contrastColor[1], contrastColor[2]], contrastRatio);
  contrastColor = [...colorContrast.foreground, 1];
  return {
    background: rgba.hex(`rgba(${baseColor.join(",")})`),
    foreground: rgba.hex(`rgba(${contrastColor.join(",")})`),
    contrast: colorContrast.contrast
  };
};

export {
  createContrastColorPair
};
//# sourceMappingURL=chunk-ONIQ4NI3.js.map
