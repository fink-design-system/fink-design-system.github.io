import {
  propagateResetEventToForm,
  propagateSubmitEventToForm
} from "./chunk-SR6CIZZ2.js";
import {
  resolveButtonProps
} from "./chunk-AIH4BWIT.js";
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

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/item-H09kNXn9.js
var createButtonItem = (getFlagHost) => {
  const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
  const ctaRef = createCtaRef();
  const ariaDescriptionId = nonce();
  let resolved;
  let value;
  let rootElement;
  const dispatch = (event, detail) => {
    if (rootElement) {
      dispatchDomEvent(rootElement, event, detail);
    }
  };
  const handleClick = (event) => {
    event.stopPropagation();
    tooltipBehavior.hideTooltip();
    if ((resolved === null || resolved === void 0 ? void 0 : resolved.type) === "submit") {
      propagateSubmitEventToForm({ form: rootElement });
    } else if ((resolved === null || resolved === void 0 ? void 0 : resolved.type) === "reset") {
      propagateResetEventToForm({ form: rootElement });
    } else {
      const onClick = resolved === null || resolved === void 0 ? void 0 : resolved.on.onClick;
      if (typeof onClick === "function") {
        setEventTarget(event, ctaRef.el);
        onClick(event, value);
      }
    }
    dispatch(KolEvent.click, value);
  };
  const handleMouseDown = (event) => {
    var _a, _b;
    (_b = resolved === null || resolved === void 0 ? void 0 : (_a = resolved.on).onMouseDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    dispatch(KolEvent.mousedown);
  };
  const handleFocus = (event) => {
    var _a, _b;
    (_b = resolved === null || resolved === void 0 ? void 0 : (_a = resolved.on).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    dispatch(KolEvent.focus);
  };
  const handleBlur = (event) => {
    var _a, _b;
    (_b = resolved === null || resolved === void 0 ? void 0 : (_a = resolved.on).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    dispatch(KolEvent.blur);
  };
  const refRoot = (element) => {
    if (element) {
      rootElement = element;
    }
  };
  return {
    getFcProps: (props, rootAttributes) => {
      resolved = resolveButtonProps(props, getFlagHost());
      value = props._value;
      tooltipBehavior.componentWillLoad({
        label: resolved.label,
        align: resolved.tooltipAlign
      });
      return Object.assign(Object.assign(Object.assign({}, resolved), rootAttributes), {
        ariaDescriptionId,
        handleBlur,
        handleClick,
        handleFocus,
        handleMouseDown,
        ref: refRoot,
        refButton: ctaRef,
        refTooltip: tooltipBehavior.setTooltipElementRef
      });
    },
    getElement: () => ctaRef.el,
    getRootElement: () => rootElement,
    syncListeners: () => {
      if (ctaRef.el) {
        tooltipBehavior.syncListeners(void 0, ctaRef.el, true);
      }
    },
    destroy: () => {
      tooltipBehavior.destroy();
    }
  };
};

export {
  createButtonItem
};
//# sourceMappingURL=chunk-RSHHA2HG.js.map
