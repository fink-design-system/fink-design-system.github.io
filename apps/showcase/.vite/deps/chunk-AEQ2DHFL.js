import {
  setCustomTagNames
} from "./chunk-6OHARAC5.js";
import {
  initializeI18n
} from "./chunk-4KQM2UAA.js";
import {
  Log,
  se,
  setRuntimeMode
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/bootstrap-Bp7i4RJQ.js
var initialized = false;
var options;
var bootstrap = async (themes, loaders, koliBriOptions) => {
  var _a, _b;
  const nodeEnv = typeof process !== "undefined" && process.env ? "production" : void 0;
  setRuntimeMode((koliBriOptions === null || koliBriOptions === void 0 ? void 0 : koliBriOptions.environment) || nodeEnv || "production");
  initializeI18n((_b = (_a = koliBriOptions === null || koliBriOptions === void 0 ? void 0 : koliBriOptions.translation) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : "de", koliBriOptions === null || koliBriOptions === void 0 ? void 0 : koliBriOptions.translations);
  if (koliBriOptions === null || koliBriOptions === void 0 ? void 0 : koliBriOptions.transformTagName) {
    setCustomTagNames(koliBriOptions === null || koliBriOptions === void 0 ? void 0 : koliBriOptions.transformTagName);
  }
  const coreRegisterReturnValue = await se(themes, loaders, koliBriOptions);
  initialized = true;
  options = koliBriOptions;
  Log.info("Development mode active - Enhanced debugging features available");
  return coreRegisterReturnValue;
};
var register = bootstrap;
var isInitialized = () => initialized;
var getOptions = () => options;

export {
  bootstrap,
  register,
  isInitialized,
  getOptions
};
//# sourceMappingURL=chunk-AEQ2DHFL.js.map
