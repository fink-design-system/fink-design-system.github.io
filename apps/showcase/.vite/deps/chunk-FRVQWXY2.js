// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/aria-labelledby-DqJY_4G-.js
var escapeCssIdentifier = (value) => {
  var _a;
  if ((_a = globalThis.CSS) === null || _a === void 0 ? void 0 : _a.escape) {
    return globalThis.CSS.escape(value);
  }
  return value.replace(/[^a-zA-Z0-9_-]/g, "\\$&");
};
var resolveTargets = (host, value) => {
  const ids = (value !== null && value !== void 0 ? value : "").trim().split(/\s+/).filter(Boolean);
  if (!ids.length)
    return [];
  const root = host === null || host === void 0 ? void 0 : host.getRootNode();
  const getById = (id) => {
    if (typeof Document !== "undefined" && root instanceof Document)
      return root.getElementById(id);
    if (typeof ShadowRoot !== "undefined" && root instanceof ShadowRoot)
      return root.querySelector(`#${escapeCssIdentifier(id)}`);
    return typeof document !== "undefined" ? document.getElementById(id) : null;
  };
  return ids.map(getById).filter((el) => !!el);
};

export {
  resolveTargets
};
//# sourceMappingURL=chunk-FRVQWXY2.js.map
