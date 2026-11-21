import {
  buildDefaultPropsFromConfig
} from "./chunk-KPGE6Z2R.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/base-web-component-Bh2NCN7p.js
function throwNoStateAccess() {
  throw new Error("This behavior does not use component state.");
}
var BaseWebComponent = class {
  constructor() {
    this.rawProps = {};
    this.renderProps = {};
    this.requiredPropNames = /* @__PURE__ */ new Set();
    this.renderPropsSeeded = false;
    this.setState = (key, value) => {
      this[key] = value;
    };
    this.getState = (key) => {
      return this[key];
    };
    this.stateAccess = {
      setState: this.setState,
      getState: this.getState
    };
  }
  seedRenderProps() {
    var _a;
    if (this.renderPropsSeeded) {
      return;
    }
    this.renderPropsSeeded = true;
    this.renderProps = buildDefaultPropsFromConfig(this.propsConfig);
    this.requiredPropNames = new Set(((_a = this.propsConfig.required) !== null && _a !== void 0 ? _a : []).map((definition) => definition.propName));
  }
  isRequired(key) {
    this.seedRenderProps();
    return this.requiredPropNames.has(key);
  }
  setRawProp(key, value) {
    this.rawProps[key] = value;
  }
  getRawProp(key) {
    return this.rawProps[key];
  }
  setRenderProp(key, value) {
    this.seedRenderProps();
    this.renderProps[key] = value;
  }
  unsetRenderProp(key) {
    this.seedRenderProps();
    this.renderProps[key] = void 0;
  }
  getRenderProp(key) {
    this.seedRenderProps();
    return this.renderProps[key];
  }
};
BaseWebComponent.stateLess = Object.freeze({
  setState: throwNoStateAccess,
  getState: throwNoStateAccess
});

export {
  BaseWebComponent
};
//# sourceMappingURL=chunk-MS3MLDFB.js.map
