import {
  openProp
} from "./chunk-OJ2SEHMP.js";
import {
  levelProp
} from "./chunk-AXVYILGE.js";
import {
  KolHeadingFc
} from "./chunk-Q4L7LM2W.js";
import {
  preventFocus
} from "./chunk-VFFG6S5V.js";
import {
  disabledProp
} from "./chunk-SESBZTFK.js";
import {
  SpanFC
} from "./chunk-AVJUB7OE.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import {
  labelLangSegmentsProp
} from "./chunk-QVVQWVZC.js";
import {
  BemRootNodeFC,
  clsx,
  createCallbacksPropDefinition,
  getBlockBem
} from "./chunk-KPGE6Z2R.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/toggle-handler-CtJ2Z7Us.js
var collapsibleCallbacksProp = createCallbacksPropDefinition();
var collapsiblePropsConfig = {
  optional: [collapsibleCallbacksProp, disabledProp, levelProp, openProp],
  required: [labelLangSegmentsProp]
};
var CollapsibleFC = ({ block, contentClass, controlId, detailsOpen, disabled, expanded, handleToggle, headingId, icons, label, level, refHeadingButton, transitionMs }, children) => {
  const blockBem = getBlockBem(block);
  return h(BemRootNodeFC, { component: "details", block, modifiers: {
    disabled: disabled === true,
    open: expanded === true
  }, open: detailsOpen === true, style: { "--collapsible-transition-duration": `${transitionMs}ms` } }, h("summary", { "aria-controls": controlId, "aria-disabled": disabled === true ? "true" : void 0, class: blockBem("heading"), id: headingId, onClick: handleToggle, onMouseDown: disabled === true ? preventFocus : void 0, ref: refHeadingButton, tabIndex: disabled === true ? -1 : void 0 }, h(KolHeadingFc, { level: level !== null && level !== void 0 ? level : 0 }, h(SpanFC, { icons, label }))), h("div", { class: blockBem("wrapper") }, h("div", { class: blockBem("wrapper-animation") }, h("div", { "aria-hidden": expanded === false ? "true" : void 0, "aria-labelledby": headingId, class: clsx(blockBem("content"), contentClass), id: controlId, role: "region" }, children))));
};
var DEFAULT_COLLAPSIBLE_TRANSITION_MS = 300;
function onNextFrame(callback) {
  if (typeof requestAnimationFrame === "function") {
    const handle2 = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(handle2);
  }
  const handle = setTimeout(callback, 0);
  return () => clearTimeout(handle);
}
function createCollapsibleOpenAnimation({ getTransitionMs, setDetailsOpen, setExpanded }) {
  let cancelPendingFrame;
  let collapseTimeout;
  const clearPending = () => {
    cancelPendingFrame === null || cancelPendingFrame === void 0 ? void 0 : cancelPendingFrame();
    cancelPendingFrame = void 0;
    clearTimeout(collapseTimeout);
    collapseTimeout = void 0;
  };
  return {
    syncOpen(open, animate) {
      clearPending();
      if (open) {
        setDetailsOpen(true);
        if (animate) {
          cancelPendingFrame = onNextFrame(() => setExpanded(true));
        } else {
          setExpanded(true);
        }
        return;
      }
      setExpanded(false);
      if (animate) {
        collapseTimeout = setTimeout(() => setDetailsOpen(false), getTransitionMs());
      } else {
        setDetailsOpen(false);
      }
    },
    dispose: clearPending
  };
}
var ANNOUNCE_DELAY_MS = 25;
function createCollapsibleToggleHandler({ getHost, getOn, isDisabled, isOpen, setOpen }) {
  return (event) => {
    event.preventDefault();
    if (isDisabled()) {
      return;
    }
    const open = !isOpen();
    setOpen(open);
    setTimeout(() => {
      var _a, _b;
      const host = getHost();
      if (host) {
        dispatchDomEvent(host, KolEvent.click, open);
        dispatchDomEvent(host, KolEvent.toggle, open);
      }
      const on = getOn();
      (_a = on.onClick) === null || _a === void 0 ? void 0 : _a.call(on, event, open);
      (_b = on.onToggle) === null || _b === void 0 ? void 0 : _b.call(on, event, open);
    }, ANNOUNCE_DELAY_MS);
  };
}

export {
  collapsibleCallbacksProp,
  collapsiblePropsConfig,
  CollapsibleFC,
  DEFAULT_COLLAPSIBLE_TRANSITION_MS,
  createCollapsibleOpenAnimation,
  createCollapsibleToggleHandler
};
//# sourceMappingURL=chunk-ZQ54ZFWS.js.map
