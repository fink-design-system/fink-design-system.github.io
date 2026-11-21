import {
  delegateFocus,
  setFocus,
  waitForThemed
} from "./chunk-ZVS5ACKA.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/element-interaction-sGYdEpmv.js
var MAX_CLICK_ATTEMPTS = 3;
async function delegateClick$1(host, callback) {
  try {
    if (!host.hasAttribute("data-themed")) {
      await waitForThemed(host);
    }
    await callback();
  } catch (_a) {
    throw new Error(`The interactive element inside the KoliBri web component could not be clicked. Try calling the click method on the web component after a short delay again.`);
  }
}
function isElementVisible(element) {
  if (!element)
    return false;
  const rect = element.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}
async function setClick(element) {
  let attempts = 0;
  do {
    if (element) {
      element.click();
    }
    await new Promise((r) => requestAnimationFrame(r));
    attempts++;
  } while (!isElementVisible(element) && attempts < MAX_CLICK_ATTEMPTS);
}
function createCtaRef(isInactive) {
  let element;
  const ref = ((el) => {
    element = el;
  });
  Object.defineProperty(ref, "el", {
    get: () => (isInactive === null || isInactive === void 0 ? void 0 : isInactive()) === true ? void 0 : element,
    set: (el) => {
      element = el;
    }
  });
  return ref;
}
var preventFocus = (event) => event.preventDefault();
function makeMethodDecorator(fn) {
  return (_target, _key, descriptor) => {
    descriptor.value = async function() {
      return fn(this);
    };
    return descriptor;
  };
}
function makeFocusDecorator(fn) {
  return (_target, _key, descriptor) => {
    descriptor.value = async function(options) {
      return fn(this, options);
    };
    return descriptor;
  };
}
function directFocus(refPropName) {
  return makeFocusDecorator((self, options) => {
    var _a;
    const element = (_a = self[refPropName]) === null || _a === void 0 ? void 0 : _a.el;
    return element ? setFocus(element, options) : Promise.resolve();
  });
}
function delegateFocus2(refPropName) {
  return makeFocusDecorator((self, options) => {
    const host = self["host"];
    if (!host)
      return Promise.resolve();
    return delegateFocus(host, () => {
      var _a;
      const element = (_a = self[refPropName]) === null || _a === void 0 ? void 0 : _a.el;
      return element ? setFocus(element, options) : Promise.resolve();
    });
  });
}
function delegateClick(refPropName) {
  return makeMethodDecorator((self) => delegateClick$1(self["host"], () => {
    const element = self[refPropName].el;
    return element ? setClick(element) : Promise.resolve();
  }));
}

export {
  delegateClick$1,
  setClick,
  createCtaRef,
  preventFocus,
  directFocus,
  delegateFocus2 as delegateFocus,
  delegateClick
};
//# sourceMappingURL=chunk-VFFG6S5V.js.map
