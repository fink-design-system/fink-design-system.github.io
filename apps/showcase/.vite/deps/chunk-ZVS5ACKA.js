import {
  __rest
} from "./chunk-7UI7W6EF.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/element-focus-BIRmGg5W.js
var MAX_TIMEOUT_DURATION = 5e3;
function waitForThemed(host) {
  return new Promise((resolve, reject) => {
    let timeoutId;
    const observer = new MutationObserver(() => {
      if (host.hasAttribute("data-themed")) {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(host, {
      attributes: true,
      attributeFilter: ["data-themed"]
    });
    if (host.hasAttribute("data-themed")) {
      observer.disconnect();
      resolve();
      return;
    }
    timeoutId = setTimeout(() => {
      observer.disconnect();
      reject(new Error("Timeout waiting for data-themed attribute"));
    }, MAX_TIMEOUT_DURATION);
  });
}
var MAX_FOCUS_ATTEMPTS = 10;
function waitForElementInViewport(element, timeoutMs = 2e3) {
  return new Promise((resolve) => {
    let resolved = false;
    let observer;
    let removeScrollEndListener;
    const done = () => {
      if (resolved) {
        return;
      }
      resolved = true;
      clearTimeout(timeoutId);
      removeScrollEndListener === null || removeScrollEndListener === void 0 ? void 0 : removeScrollEndListener();
      removeScrollEndListener = void 0;
      observer === null || observer === void 0 ? void 0 : observer.disconnect();
      resolve();
    };
    const timeoutId = setTimeout(done, timeoutMs);
    if (typeof window !== "undefined" && "onscrollend" in window) {
      const handleScrollEnd = (event) => {
        const target = event.target;
        if (!(target instanceof Node) || !target.contains(element)) {
          return;
        }
        done();
      };
      document.addEventListener("scrollend", handleScrollEnd, { capture: true });
      removeScrollEndListener = () => {
        document.removeEventListener("scrollend", handleScrollEnd, { capture: true });
      };
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      done();
      return;
    }
    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        done();
      }
    }, { threshold: 0 });
    observer.observe(element);
  });
}
async function delegateFocus(host, callback) {
  try {
    if (!host.hasAttribute("data-themed")) {
      await waitForThemed(host);
    }
    await callback();
  } catch (_a) {
    throw new Error(`The interactive element inside the KoliBri web component could not be focused. Try calling the focus method on the web component after a short delay again.`);
  }
}
function isActiveElement(element) {
  const root = element.getRootNode();
  if (root instanceof ShadowRoot) {
    return root.activeElement === element;
  }
  return document.activeElement === element;
}
function deepActiveElement(document_ = document) {
  var _a;
  let active = document_.activeElement;
  while ((_a = active === null || active === void 0 ? void 0 : active.shadowRoot) === null || _a === void 0 ? void 0 : _a.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active;
}
function containsDeepActiveElement(container) {
  const active = deepActiveElement();
  if (!active || !container) {
    return false;
  }
  let node = active;
  while (node) {
    if (node === container) {
      return true;
    }
    const root = node.getRootNode();
    node = root instanceof ShadowRoot ? root.host : node.parentElement;
  }
  return false;
}
var FOCUS_OPTIONS = {
  preventScroll: true
};
async function setFocus(element, options) {
  if (!element) {
    return;
  }
  const _a = options !== null && options !== void 0 ? options : {}, { afterFocus } = _a, scrollOptions = __rest(_a, ["afterFocus"]);
  const hasScrollOptions = options && ("behavior" in scrollOptions || "block" in scrollOptions || "inline" in scrollOptions);
  let attempts = 0;
  do {
    if (element) {
      element.focus(FOCUS_OPTIONS);
    }
    await new Promise((r) => requestAnimationFrame(r));
    attempts++;
  } while (!isActiveElement(element) && attempts < MAX_FOCUS_ATTEMPTS);
  const focused = isActiveElement(element);
  if (hasScrollOptions) {
    const scrollIntoViewOptions = Object.assign(Object.assign({}, scrollOptions), { behavior: scrollOptions.behavior });
    element.scrollIntoView(scrollIntoViewOptions);
  }
  if (afterFocus && focused) {
    if (hasScrollOptions && scrollOptions.behavior === "smooth") {
      await waitForElementInViewport(element);
    }
    afterFocus();
  }
}

export {
  waitForThemed,
  delegateFocus,
  containsDeepActiveElement,
  setFocus
};
//# sourceMappingURL=chunk-ZVS5ACKA.js.map
