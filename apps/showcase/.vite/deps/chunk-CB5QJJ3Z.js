// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/open-items-cache-D-kml1h6.js
var invalidators = /* @__PURE__ */ new WeakMap();
var registerOpenItemsCache = (tree, invalidate) => {
  invalidators.set(tree, invalidate);
};
var unregisterOpenItemsCache = (tree) => {
  invalidators.delete(tree);
};
var invalidateOpenItemsCache = (tree) => {
  var _a;
  if (tree) {
    (_a = invalidators.get(tree)) === null || _a === void 0 ? void 0 : _a();
  }
};

export {
  registerOpenItemsCache,
  unregisterOpenItemsCache,
  invalidateOpenItemsCache
};
//# sourceMappingURL=chunk-CB5QJJ3Z.js.map
