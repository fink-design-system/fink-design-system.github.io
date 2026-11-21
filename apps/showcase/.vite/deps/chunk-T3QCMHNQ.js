import {
  BaseBehavior,
  alignFloatingElements,
  alignProp,
  autoUpdate
} from "./chunk-IGUFDWYR.js";
import {
  ButtonFC
} from "./chunk-3C6UB25G.js";
import {
  createAlignPropDefinition
} from "./chunk-7Q2QTJQF.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
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

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/component-B4CDonzN.js
var popoverAlignProp = createAlignPropDefinition("popoverAlign", "bottom");
var popoverPropsConfig = {
  optional: [alignProp]
};
var PopoverBehavior = class extends BaseBehavior {
  constructor(stateAccess) {
    super(stateAccess, popoverPropsConfig);
    this.show = false;
    this.setPopoverElementRef = (element) => {
      this.popoverElement = element;
      this.arrowElement = element === null || element === void 0 ? void 0 : element.querySelector(".kol-popover__arrow");
    };
    this.setTriggerElement = (element) => {
      this.triggerElement = element;
    };
    this.alignPopover = async () => {
      if (!this.popoverElement || !this.triggerElement) {
        return;
      }
      await alignFloatingElements({
        align: this.getRenderProp("align"),
        referenceElement: this.triggerElement,
        arrowElement: this.arrowElement,
        floatingElement: this.popoverElement
      });
    };
    this.setupAutoUpdate = () => {
      if (!this.popoverElement || !this.triggerElement || this.cleanupAutoUpdate) {
        return;
      }
      this.cleanupAutoUpdate = autoUpdate(this.triggerElement, this.popoverElement, () => {
        void this.alignPopover();
      });
    };
  }
  componentWillLoad(props) {
    this.watchAlign(props.align);
  }
  watchAlign(value) {
    alignProp.apply(value, (v) => {
      this.setRenderProp("align", v);
    });
  }
  setShow(value) {
    this.show = value;
    if (!this.popoverElement) {
      return;
    }
    if (this.popoverElement.isConnected) {
      this.toggleVisibility();
    } else {
      requestAnimationFrame(() => {
        this.toggleVisibility();
      });
    }
  }
  destroy() {
    var _a;
    (_a = this.cleanupAutoUpdate) === null || _a === void 0 ? void 0 : _a.call(this);
    this.cleanupAutoUpdate = void 0;
    this.popoverElement = void 0;
    this.arrowElement = void 0;
    this.triggerElement = void 0;
  }
  toggleVisibility() {
    var _a;
    if (!this.popoverElement) {
      return;
    }
    const isOpen = this.popoverElement.matches(":popover-open");
    if (this.show) {
      if (!isOpen) {
        try {
          this.popoverElement.showPopover();
          this.setupAutoUpdate();
          void this.alignPopover();
        } catch (_b) {
        }
      }
    } else if (isOpen) {
      try {
        this.popoverElement.hidePopover();
        (_a = this.cleanupAutoUpdate) === null || _a === void 0 ? void 0 : _a.call(this);
        this.cleanupAutoUpdate = void 0;
      } catch (_c) {
      }
    }
  }
};
var popoverBem = bem.forBlock("kol-popover");
var PopoverFC = (props, children) => {
  const { align = "bottom", popoverRef, arrowRef, class: classNames } = props, rest = __rest(props, ["align", "popoverRef", "arrowRef", "class"]);
  return h("div", Object.assign({}, rest, { class: clsx(popoverBem(), classNames), ref: popoverRef, popover: "auto" }), h("div", { class: clsx(popoverBem("arrow"), popoverBem("arrow", { [align]: true })), ref: arrowRef }), children.length > 0 ? children : h("slot", null));
};
var PopoverButtonFC = (props, children) => {
  const { accessKey, ariaDescription, ariaDescriptionId, ariaHasPopup, ariaSelected, customClass, disabled, handleBlur, handleClick, handleFocus, handleMouseDown, hideLabel, icons, id, inline, label, name, on, popoverAlign, popoverOpen, popoverId, ref, refButton, refPopover, refTooltip, role, shortKey, tabIndex, tooltipAlign, type, variant } = props;
  return h(BemRootNodeFC, { block: "kol-popover-button", class: props.class, ref, modifiers: {
    open: popoverOpen,
    inline: inline === true
  } }, h(ButtonFC, { accessKey, ariaControls: popoverId, ariaDescription, ariaDescriptionId, ariaExpanded: popoverOpen ? "true" : "false", ariaHasPopup, ariaSelected, customClass, disabled, handleBlur, handleClick, handleFocus, handleMouseDown, hideLabel, icons, id, inline, label, name, on, refButton, refTooltip, role, shortKey, tabIndex, tooltipAlign, type, variant }), h(PopoverFC, { align: popoverAlign, class: "kol-popover-button__popover", id: popoverId, popoverRef: refPopover }, children));
};

export {
  popoverAlignProp,
  PopoverBehavior,
  PopoverButtonFC
};
//# sourceMappingURL=chunk-T3QCMHNQ.js.map
