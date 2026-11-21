import {
  FormAssociationBehavior
} from "./chunk-XV6TVAFR.js";
import {
  propagateResetEventToForm,
  propagateSubmitEventToForm
} from "./chunk-SR6CIZZ2.js";
import {
  validateAccessAndShortKey
} from "./chunk-TXIZUTEV.js";
import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
import {
  ButtonFC,
  ariaHasPopupProp,
  ariaSelectedProp,
  buttonCallbacksProp,
  buttonPropsConfig,
  buttonTypeProp,
  nameProp
} from "./chunk-3C6UB25G.js";
import {
  accessKeyProp,
  ariaControlsProp,
  ariaDescriptionProp,
  ariaExpandedProp,
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
  h
} from "./chunk-VUP4WNL7.js";
import {
  X,
  setEventTarget
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/base-D-me6QDT.js
var BaseButtonWebComponent = class extends BaseWebComponent {
  constructor() {
    super(...arguments);
    this.ctaRef = createCtaRef();
    this.propsConfig = buttonPropsConfig;
    this.tooltipBehavior = new TooltipBehavior(this.stateAccess);
    this.handleClick = (event) => {
      event.stopPropagation();
      this.tooltipBehavior.hideTooltip();
      const type = this.getRenderProp("type");
      if (type === "submit") {
        propagateSubmitEventToForm({ form: this.host });
      } else if (type === "reset") {
        propagateResetEventToForm({ form: this.host });
      } else {
        this.formAssociation.setFormAssociatedValue(this.formValue);
        const onClick = this.getRenderProp("on").onClick;
        if (typeof onClick === "function") {
          setEventTarget(event, this.ctaRef.el);
          onClick(event, this.formValue);
        }
      }
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.click, this.formValue);
      }
    };
    this.handleMouseDown = (event) => {
      var _a, _b;
      (_b = (_a = this.getRenderProp("on")).onMouseDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.mousedown);
      }
    };
    this.handleFocus = (event) => {
      var _a, _b;
      (_b = (_a = this.getRenderProp("on")).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.focus);
      }
    };
    this.handleBlur = (event) => {
      var _a, _b;
      (_b = (_a = this.getRenderProp("on")).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.blur);
      }
    };
  }
  initFormAssociation() {
    this.formAssociation = new FormAssociationBehavior(BaseWebComponent.stateLess, { host: this.host, type: "button" });
  }
  unsetButtonTabIndex() {
    this.unsetRenderProp("tabIndex");
  }
  initTooltipBehavior() {
    this.tooltipBehavior.componentWillLoad({
      label: this.getRenderProp("label"),
      align: this.getRenderProp("tooltipAlign")
    });
  }
  syncTooltipListeners() {
    if (this.ctaRef.el) {
      this.tooltipBehavior.syncListeners(void 0, this.ctaRef.el, true);
    }
  }
  destroyTooltipBehavior() {
    this.tooltipBehavior.destroy();
  }
  applyAccessKey(value, shortKey) {
    accessKeyProp.apply(value, (v) => this.setRenderProp("accessKey", v));
    validateAccessAndShortKey(value, shortKey);
  }
  applyAriaControls(value) {
    ariaControlsProp.apply(value, (v) => this.setRenderProp("ariaControls", v));
  }
  applyAriaDescription(value) {
    ariaDescriptionProp.apply(value, (v) => this.setRenderProp("ariaDescription", v));
  }
  applyAriaExpanded(value) {
    ariaExpandedProp.apply(value, (v) => this.setRenderProp("ariaExpanded", v));
  }
  applyAriaHasPopup(value) {
    ariaHasPopupProp.apply(value, (v) => this.setRenderProp("ariaHasPopup", v));
  }
  applyAriaSelected(value) {
    ariaSelectedProp.apply(value, (v) => this.setRenderProp("ariaSelected", v));
  }
  applyCustomClass(value) {
    customClassProp.apply(value, (v) => this.setRenderProp("customClass", v));
  }
  applyDisabled(value) {
    disabledProp.apply(value, (v) => this.setRenderProp("disabled", v));
  }
  applyHideLabel(value) {
    hideLabelProp.apply(value, (v) => this.setRenderProp("hideLabel", v));
  }
  applyIcons(value) {
    spanIconsProp.apply(value, (v) => this.setRenderProp("icons", v));
  }
  applyId(value) {
    idProp.apply(value, (v) => this.setRenderProp("id", v));
  }
  applyInline(value) {
    inlineProp.apply(value, (v) => this.setRenderProp("inline", v));
  }
  applyLabel(value) {
    labelWithExpertSlotProp.apply(value, (v) => {
      this.setRenderProp("label", v);
      this.tooltipBehavior.watchLabel(v);
    }, this.isRequired("label"));
  }
  applyName(value) {
    nameProp.apply(value, (v) => this.setRenderProp("name", v));
    this.formAssociation.watchName(value);
  }
  applyOn(value) {
    buttonCallbacksProp.apply(value, (v) => this.setRenderProp("on", v));
  }
  applyRole(value) {
    linkRoleProp.apply(value, (v) => this.setRenderProp("role", v));
  }
  applyShortKey(value, accessKey) {
    shortKeyProp.apply(value, (v) => this.setRenderProp("shortKey", v));
    validateAccessAndShortKey(accessKey, value);
  }
  applySyncValueBySelector(value) {
    this.formAssociation.watchSyncValueBySelector(value);
  }
  applyTabIndex(value) {
    if (typeof value === "number") {
      tabIndexProp.apply(value, (v) => this.setRenderProp("tabIndex", v));
    } else {
      this.unsetRenderProp("tabIndex");
    }
  }
  applyTooltipAlign(value) {
    tooltipAlignProp.apply(value !== null && value !== void 0 ? value : "top", (v) => {
      this.setRenderProp("tooltipAlign", v);
      this.tooltipBehavior.watchAlign(v);
    });
  }
  applyType(value) {
    buttonTypeProp.apply(value, (v) => this.setRenderProp("type", v));
  }
  applyValue(value) {
    this.formValue = value;
    this.formAssociation.setFormAssociatedValue(value);
  }
  applyVariant(value) {
    var _a;
    variantProp.apply((_a = value !== null && value !== void 0 ? value : X("buttonVariantDefault", this.host)) !== null && _a !== void 0 ? _a : "normal", (v) => this.setRenderProp("variant", v));
  }
  getButtonFCProps() {
    return {
      accessKey: this.getRenderProp("accessKey"),
      ariaControls: this.getRenderProp("ariaControls"),
      ariaDescription: this.getRenderProp("ariaDescription"),
      ariaDescriptionId: this.getState("ariaDescriptionId"),
      ariaExpanded: this.getRenderProp("ariaExpanded"),
      ariaHasPopup: this.getRenderProp("ariaHasPopup"),
      ariaSelected: this.getRenderProp("ariaSelected"),
      customClass: this.getRenderProp("customClass"),
      disabled: this.getRenderProp("disabled"),
      handleBlur: this.handleBlur,
      handleClick: this.handleClick,
      handleFocus: this.handleFocus,
      handleMouseDown: this.handleMouseDown,
      hideLabel: this.getRenderProp("hideLabel"),
      icons: this.getRenderProp("icons"),
      id: this.getRenderProp("id"),
      inline: this.getRenderProp("inline"),
      label: this.getRenderProp("label"),
      name: this.getRenderProp("name"),
      on: this.getRenderProp("on"),
      refButton: this.ctaRef,
      refTooltip: this.tooltipBehavior.setTooltipElementRef,
      role: this.getRenderProp("role"),
      shortKey: this.getRenderProp("shortKey"),
      tabIndex: this.getRenderProp("tabIndex"),
      tooltipAlign: this.getRenderProp("tooltipAlign"),
      type: this.getRenderProp("type"),
      variant: this.getRenderProp("variant")
    };
  }
  renderButtonFC() {
    return h(ButtonFC, Object.assign({}, this.getButtonFCProps()));
  }
};

export {
  BaseButtonWebComponent
};
//# sourceMappingURL=chunk-K6R2Z5HA.js.map
