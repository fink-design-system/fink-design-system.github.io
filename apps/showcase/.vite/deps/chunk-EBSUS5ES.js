import {
  PopoverBehavior,
  popoverAlignProp
} from "./chunk-T3QCMHNQ.js";
import {
  resolveButtonProps
} from "./chunk-AIH4BWIT.js";
import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
import {
  ariaHasPopupProp,
  ariaSelectedProp,
  buttonCallbacksProp,
  buttonTypeProp,
  nameProp
} from "./chunk-3C6UB25G.js";
import {
  accessKeyProp,
  ariaDescriptionProp,
  customClassProp,
  hideLabelProp,
  inlineProp,
  linkRoleProp,
  shortKeyProp,
  spanIconsProp,
  tabIndexProp,
  tooltipAlignProp,
  variantProp
} from "./chunk-JIRF5MWS.js";
import {
  idProp
} from "./chunk-FGYUAXNO.js";
import {
  labelWithExpertSlotProp
} from "./chunk-7C3Y25NJ.js";
import {
  createCtaRef
} from "./chunk-VFFG6S5V.js";
import {
  createUniqueId,
  nonce
} from "./chunk-FQ2Y4FDM.js";
import {
  disabledProp
} from "./chunk-SESBZTFK.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  buildDefaultPropsFromConfig
} from "./chunk-KPGE6Z2R.js";
import {
  X
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/item-gvmzMXYb.js
var popoverButtonPropsConfig = {
  required: [labelWithExpertSlotProp],
  optional: [
    accessKeyProp,
    ariaDescriptionProp,
    ariaHasPopupProp,
    ariaSelectedProp,
    buttonCallbacksProp,
    buttonTypeProp,
    customClassProp,
    disabledProp,
    hideLabelProp,
    idProp,
    inlineProp,
    linkRoleProp,
    nameProp,
    popoverAlignProp,
    shortKeyProp,
    spanIconsProp,
    tabIndexProp,
    tooltipAlignProp,
    variantProp
  ]
};
var createPopoverButtonItem = (options) => {
  var _a;
  const popoverBehavior = new PopoverBehavior(BaseWebComponent.stateLess);
  const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
  const ctaRef = createCtaRef();
  let popoverElement;
  let rootElement;
  const props = buildDefaultPropsFromConfig(popoverButtonPropsConfig);
  delete props.tabIndex;
  const applyDisabled = (value) => {
    disabledProp.apply(value, (v) => {
      props.disabled = v;
    });
  };
  applyDisabled(options.disabled);
  hideLabelProp.apply(options.hideLabel, (v) => {
    props.hideLabel = v;
  });
  spanIconsProp.apply(options.icons, (v) => {
    props.icons = v;
  });
  inlineProp.apply(false, (v) => {
    props.inline = v;
  });
  tooltipAlignProp.apply("top", (v) => {
    props.tooltipAlign = v;
  });
  buttonTypeProp.apply("button", (v) => {
    props.type = v;
  });
  labelWithExpertSlotProp.apply(options.label, (v) => {
    props.label = v;
  });
  let popoverAlign = popoverAlignProp.getDefaultValue();
  popoverAlignProp.apply(options.popoverAlign, (v) => {
    popoverAlign = v;
  });
  props.popoverAlign = popoverAlign;
  popoverBehavior.componentWillLoad({ align: popoverAlign });
  variantProp.apply((_a = X("buttonVariantDefault", options.getFlagHost())) !== null && _a !== void 0 ? _a : "normal", (v) => {
    props.variant = v;
  });
  props.ariaDescriptionId = nonce();
  props.popoverId = createUniqueId("popover");
  const dispatch = (event) => {
    const target = options.getEventTarget ? options.getEventTarget() : rootElement;
    if (target) {
      dispatchDomEvent(target, event);
    }
  };
  const handleToggle = (event) => {
    options.setOpen(event.newState === "open");
  };
  props.handleClick = (event) => {
    event.stopPropagation();
    tooltipBehavior.hideTooltip();
    popoverBehavior.setShow(!options.getOpen());
    dispatch(KolEvent.click);
  };
  props.handleMouseDown = () => dispatch(KolEvent.mousedown);
  props.handleFocus = () => dispatch(KolEvent.focus);
  props.handleBlur = () => dispatch(KolEvent.blur);
  props.refButton = (element) => {
    ctaRef(element);
    popoverBehavior.setTriggerElement(element);
  };
  props.refPopover = (element) => {
    popoverElement = element;
    popoverBehavior.setPopoverElementRef(element);
  };
  props.refTooltip = tooltipBehavior.setTooltipElementRef;
  const refRoot = (element) => {
    rootElement = element;
  };
  const loadTooltip = () => {
    tooltipBehavior.componentWillLoad({
      label: props.label,
      align: props.tooltipAlign
    });
  };
  const applyPopoverButtonProps = (popoverButtonProps) => {
    var _a2, _b;
    const resolved = resolveButtonProps(Object.assign(Object.assign({}, popoverButtonProps), { _on: void 0, _variant: (_a2 = popoverButtonProps._variant) !== null && _a2 !== void 0 ? _a2 : "normal" }), options.getFlagHost());
    props.accessKey = resolved.accessKey;
    props.ariaDescription = resolved.ariaDescription;
    props.customClass = resolved.customClass;
    props.disabled = resolved.disabled;
    props.hideLabel = resolved.hideLabel;
    props.icons = resolved.icons;
    props.id = resolved.id;
    props.inline = resolved.inline;
    props.label = resolved.label;
    props.name = resolved.name;
    props.shortKey = resolved.shortKey;
    props.tabIndex = resolved.tabIndex;
    props.tooltipAlign = resolved.tooltipAlign;
    props.type = resolved.type;
    props.variant = resolved.variant;
    popoverAlignProp.apply((_b = popoverButtonProps._popoverAlign) !== null && _b !== void 0 ? _b : "bottom", (v) => {
      props.popoverAlign = v;
      popoverBehavior.watchAlign(v);
    });
    loadTooltip();
  };
  loadTooltip();
  return {
    getFcProps: (popoverButtonProps) => {
      if (popoverButtonProps) {
        applyPopoverButtonProps(popoverButtonProps);
      }
      return Object.assign(Object.assign({}, props), { popoverOpen: options.getOpen(), ref: refRoot });
    },
    hide: () => popoverBehavior.setShow(false),
    setDisabled: applyDisabled,
    syncListeners: () => {
      if (ctaRef.el) {
        tooltipBehavior.syncListeners(void 0, ctaRef.el, true);
      }
      popoverElement === null || popoverElement === void 0 ? void 0 : popoverElement.addEventListener("toggle", handleToggle);
    },
    destroy: () => {
      tooltipBehavior.destroy();
      if (popoverElement) {
        popoverElement.removeEventListener("toggle", handleToggle);
        popoverElement = void 0;
      }
      popoverBehavior.destroy();
    }
  };
};

export {
  createPopoverButtonItem
};
//# sourceMappingURL=chunk-EBSUS5ES.js.map
