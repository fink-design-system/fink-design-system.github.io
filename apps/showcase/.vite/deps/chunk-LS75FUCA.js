// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/options-B0rBHetL.js
var fillKeyOptionMap = (keyOptionMap, options, preKey = "") => {
  options.forEach((option, index) => {
    const key = `${preKey}-${index}`;
    if (typeof option === "object" && option !== null && typeof option.label === "string" && option.label.length > 0) {
      if (Array.isArray(option.options)) {
        fillKeyOptionMap(keyOptionMap, option.options, key);
      } else {
        keyOptionMap.set(key, option);
      }
    }
  });
};
var normalizeOptionValues = (options) => options.map((option) => {
  var _a;
  if (typeof option === "object" && option !== null && typeof option.label === "string") {
    return Object.assign(Object.assign({}, option), { value: (_a = option.value) !== null && _a !== void 0 ? _a : option.label });
  }
  return option;
});

export {
  fillKeyOptionMap,
  normalizeOptionValues
};
//# sourceMappingURL=chunk-LS75FUCA.js.map
