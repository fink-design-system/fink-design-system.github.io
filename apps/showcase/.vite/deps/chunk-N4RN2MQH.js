import {
  BemRootNodeFC,
  clsx
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/scroll-lock-CIv7iOPB.js
var dialogBem = bem.forBlock("kol-dialog");
var modalBem = bem.forBlock("kol-modal");
var DialogFC = (props, children) => {
  const { class: hostClass, elementClass, handleCancel, handleClose, label, labelledBy, modal, refDialog, variant, width } = props;
  if (variant !== void 0) {
    return h(BemRootNodeFC, { component: "dialog", "aria-label": labelledBy ? void 0 : label, "aria-labelledby": labelledBy, "aria-modal": modal ? "true" : "false", block: "kol-dialog", class: clsx(modalBem(), dialogBem(variant), modalBem(variant), hostClass), onCancel: handleCancel, onClose: handleClose, ref: refDialog, style: width ? { width } : void 0 }, children);
  }
  return h("dialog", { "aria-label": labelledBy ? void 0 : label, "aria-labelledby": labelledBy, "aria-modal": modal ? "true" : "false", class: clsx(elementClass, hostClass), onCancel: handleCancel, onClose: handleClose, ref: refDialog, style: width ? { width } : void 0 }, children);
};
var SCROLL_LOCK_OWNERS = /* @__PURE__ */ new Set();
var previousOverflow = null;
var previousPaddingRight = null;
function lockScroll(owner) {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }
  if (SCROLL_LOCK_OWNERS.has(owner)) {
    return;
  }
  if (SCROLL_LOCK_OWNERS.size === 0) {
    const docEl = document.documentElement;
    previousOverflow = docEl.style.getPropertyValue("overflow");
    previousPaddingRight = docEl.style.getPropertyValue("padding-right");
    const scrollbarWidth = window.innerWidth - docEl.clientWidth;
    if (scrollbarWidth > 0) {
      const currentPaddingRight = Number.parseFloat(window.getComputedStyle(docEl).paddingRight) || 0;
      docEl.style.setProperty("padding-right", `${currentPaddingRight + scrollbarWidth}px`);
    }
    docEl.style.setProperty("overflow", "hidden");
  }
  SCROLL_LOCK_OWNERS.add(owner);
}
function unlockScroll(owner) {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return;
  }
  if (!SCROLL_LOCK_OWNERS.delete(owner)) {
    return;
  }
  if (SCROLL_LOCK_OWNERS.size === 0) {
    const docEl = document.documentElement;
    if (previousOverflow) {
      docEl.style.setProperty("overflow", previousOverflow);
    } else {
      docEl.style.removeProperty("overflow");
    }
    if (previousPaddingRight) {
      docEl.style.setProperty("padding-right", previousPaddingRight);
    } else {
      docEl.style.removeProperty("padding-right");
    }
    previousOverflow = null;
    previousPaddingRight = null;
  }
}

export {
  DialogFC,
  lockScroll,
  unlockScroll
};
//# sourceMappingURL=chunk-N4RN2MQH.js.map
