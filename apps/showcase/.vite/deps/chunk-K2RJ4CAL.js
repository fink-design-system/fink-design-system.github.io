import {
  dialogCallbacksProp,
  widthProp
} from "./chunk-ECNWMIMC.js";
import {
  DialogFC,
  lockScroll,
  unlockScroll
} from "./chunk-N4RN2MQH.js";
import {
  CardFC,
  resolveCardCloseButtonProps
} from "./chunk-LWHH35DI.js";
import {
  levelProp
} from "./chunk-AXVYILGE.js";
import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
import {
  handleCancelOverlay
} from "./chunk-MIXJLZBB.js";
import {
  createCtaRef
} from "./chunk-VFFG6S5V.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import {
  labelLangSegmentsProp
} from "./chunk-QVVQWVZC.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  trimLabel,
  variantDialogProp
} from "./chunk-KPGE6Z2R.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/base-DZBnXHZh.js
var dialogPropsConfig = {
  required: [labelLangSegmentsProp],
  optional: [dialogCallbacksProp, levelProp, variantDialogProp, widthProp]
};
var BaseDialogWebComponent = class extends BaseWebComponent {
  constructor() {
    super(...arguments);
    this.dialogRef = createCtaRef();
    this.cardCloseButtonRef = createCtaRef();
    this.cardCloseTooltipBehavior = new TooltipBehavior(this.stateAccess);
    this.propsConfig = dialogPropsConfig;
    this.handleCancel = (event) => {
      var _a, _b;
      handleCancelOverlay(event);
      if (event.defaultPrevented)
        return;
      (_b = (_a = this.getRenderProp("on")).onCancel) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      if (event.defaultPrevented)
        return;
      if (this.host && !dispatchDomEvent(this.host, KolEvent.cancel)) {
        event.preventDefault();
      }
    };
    this.handleClose = (event) => {
      var _a, _b, _c, _d;
      if (event.target !== this.dialogRef.el) {
        return;
      }
      unlockScroll(this);
      (_b = (_a = this.getRenderProp("on")).onClose) === null || _b === void 0 ? void 0 : _b.call(_a);
      (_d = (_c = this.getRenderProp("on")).onToggle) === null || _d === void 0 ? void 0 : _d.call(_c, false);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.close);
        dispatchDomEvent(this.host, KolEvent.toggle);
      }
    };
    this.handleCardClose = () => {
      this.cardCloseTooltipBehavior.hideTooltip();
      this.closeDialog();
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.close);
      }
    };
  }
  initCardCloseButton() {
    this.cardCloseButtonProps = resolveCardCloseButtonProps(this.host);
    this.cardCloseTooltipBehavior.componentWillLoad({
      label: this.cardCloseButtonProps.label,
      align: this.cardCloseButtonProps.tooltipAlign
    });
  }
  syncCardCloseTooltipListeners() {
    if (this.cardCloseButtonRef.el) {
      this.cardCloseTooltipBehavior.syncListeners(void 0, this.cardCloseButtonRef.el, true);
    }
  }
  teardownDialog() {
    this.closeDialog();
    unlockScroll(this);
    this.cardCloseTooltipBehavior.destroy();
  }
  applyLabel(value) {
    labelLangSegmentsProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  applyLevel(value) {
    levelProp.apply(value, (v) => this.setRenderProp("level", v));
  }
  applyOn(value) {
    dialogCallbacksProp.apply(value, (v) => this.setRenderProp("on", v));
  }
  applyVariant(value) {
    variantDialogProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  applyWidth(value) {
    widthProp.apply(value, (v) => this.setRenderProp("width", v));
  }
  showDialog(modal) {
    var _a, _b, _c, _d;
    const dialog = this.dialogRef.el;
    if (dialog === null || dialog === void 0 ? void 0 : dialog.open) {
      return;
    }
    this.setState("modal", modal);
    if (modal) {
      (_a = dialog === null || dialog === void 0 ? void 0 : dialog.showModal) === null || _a === void 0 ? void 0 : _a.call(dialog);
      if (dialog) {
        lockScroll(this);
      }
    } else {
      (_b = dialog === null || dialog === void 0 ? void 0 : dialog.show) === null || _b === void 0 ? void 0 : _b.call(dialog);
    }
    (_d = (_c = this.getRenderProp("on")).onToggle) === null || _d === void 0 ? void 0 : _d.call(_c, true);
    if (this.host) {
      dispatchDomEvent(this.host, KolEvent.toggle);
    }
  }
  closeDialog() {
    var _a, _b;
    (_b = (_a = this.dialogRef.el) === null || _a === void 0 ? void 0 : _a.close) === null || _b === void 0 ? void 0 : _b.call(_a);
  }
  buildCardProps() {
    return {
      ariaDescriptionId: this.getState("ariaDescriptionId"),
      closeButtonProps: this.cardCloseButtonProps,
      handleClose: this.handleCardClose,
      hasCloser: true,
      headingId: this.getState("headingId"),
      label: this.getRenderProp("label"),
      level: this.getRenderProp("level"),
      refCloseButton: this.cardCloseButtonRef,
      refTooltip: this.cardCloseTooltipBehavior.setTooltipElementRef
    };
  }
  renderDialogFC() {
    const variant = this.getRenderProp("variant");
    const isCard = variant === "card";
    return h(DialogFC, { handleCancel: this.handleCancel, handleClose: this.handleClose, label: trimLabel(this.getRenderProp("label")), labelledBy: isCard ? this.getState("headingId") : void 0, modal: this.getState("modal"), refDialog: this.dialogRef, variant, width: this.getRenderProp("width") }, isCard ? h(CardFC, Object.assign({}, this.buildCardProps()), this.renderSlot()) : this.renderSlot());
  }
};

export {
  BaseDialogWebComponent
};
//# sourceMappingURL=chunk-K2RJ4CAL.js.map
