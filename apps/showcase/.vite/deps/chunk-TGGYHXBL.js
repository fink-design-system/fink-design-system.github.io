import {
  resolveLinkProps
} from "./chunk-5NZISYSR.js";
import {
  onLocationChange
} from "./chunk-L5RCXHD3.js";
import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
import {
  createCtaRef
} from "./chunk-VFFG6S5V.js";
import {
  nonce
} from "./chunk-FQ2Y4FDM.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  setEventTarget
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/item-C2HHBTvm.js
var createLinkItem = (requestRender) => {
  const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
  const ctaRef = createCtaRef();
  const ariaDescriptionId = nonce();
  let resolved;
  let ariaCurrent = "";
  let rootElement;
  let unsubscribe;
  let subscribing = false;
  const getHref = () => typeof (resolved === null || resolved === void 0 ? void 0 : resolved.href) === "string" ? resolved.href : "";
  const getTooltipLabel = () => {
    const label = resolved === null || resolved === void 0 ? void 0 : resolved.label;
    return typeof label === "string" && label.length > 0 ? label : getHref();
  };
  const handleLocationChange = (location) => {
    const next = location === (resolved === null || resolved === void 0 ? void 0 : resolved.href) ? resolved.ariaCurrentValue : "";
    if (ariaCurrent !== next) {
      ariaCurrent = next;
      if (!subscribing) {
        requestRender();
      }
    }
  };
  const handleAnchorClick = (event) => {
    tooltipBehavior.hideTooltip();
    if ((resolved === null || resolved === void 0 ? void 0 : resolved.disabled) === true) {
      event.preventDefault();
      return;
    }
    const href = getHref();
    const on = resolved === null || resolved === void 0 ? void 0 : resolved.on;
    if (typeof (on === null || on === void 0 ? void 0 : on.onClick) === "function") {
      setEventTarget(event, ctaRef.el);
      on.onClick(event, href);
    }
    if (rootElement) {
      dispatchDomEvent(rootElement, KolEvent.click, href);
    }
  };
  const refRoot = (element) => {
    if (element) {
      rootElement = element;
    }
  };
  return {
    getFcProps: (props, rootAttributes) => {
      resolved = resolveLinkProps(props);
      if (!unsubscribe) {
        subscribing = true;
        unsubscribe = onLocationChange(handleLocationChange);
        subscribing = false;
      }
      tooltipBehavior.componentWillLoad({
        label: getTooltipLabel(),
        align: resolved.tooltipAlign
      });
      return Object.assign(Object.assign(Object.assign({}, resolved), rootAttributes), {
        ariaCurrent,
        ariaDescriptionId,
        expertSlot: props._label === "",
        handleAnchorClick,
        ref: refRoot,
        refAnchor: ctaRef,
        refTooltip: tooltipBehavior.setTooltipElementRef
      });
    },
    syncListeners: () => {
      if (ctaRef.el) {
        tooltipBehavior.syncListeners(void 0, ctaRef.el, true);
      }
    },
    destroy: () => {
      unsubscribe === null || unsubscribe === void 0 ? void 0 : unsubscribe();
      unsubscribe = void 0;
      tooltipBehavior.destroy();
    }
  };
};

export {
  createLinkItem
};
//# sourceMappingURL=chunk-TGGYHXBL.js.map
