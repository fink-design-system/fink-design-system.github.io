// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/item-pool-BOxAYePG.js
var createItemPool = (create, sync, destroy) => {
  const items = /* @__PURE__ */ new Map();
  const used = /* @__PURE__ */ new Set();
  return {
    beginRender: () => {
      used.clear();
    },
    get: (key) => {
      used.add(key);
      let item = items.get(key);
      if (item === void 0) {
        item = create();
        items.set(key, item);
      }
      return item;
    },
    endRender: () => {
      for (const [key, item] of items) {
        if (used.has(key)) {
          sync(item);
        } else {
          destroy(item);
          items.delete(key);
        }
      }
    },
    destroy: () => {
      for (const item of items.values()) {
        destroy(item);
      }
      items.clear();
      used.clear();
    }
  };
};

export {
  createItemPool
};
//# sourceMappingURL=chunk-HRRUQDE3.js.map
