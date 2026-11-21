import {
  LinkFC,
  ariaCurrentValueProp,
  ariaOwnsProp,
  downloadProp,
  linkCallbacksProp,
  linkPropsConfig
} from "./chunk-JLURN3RE.js";
import {
  linkTargetProp
} from "./chunk-ETC363DC.js";
import {
  hrefProp
} from "./chunk-U2POW5WN.js";
import {
  onLocationChange
} from "./chunk-L5RCXHD3.js";
import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
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
  setEventTarget
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/base-DP9yHJOV.js
var BaseLinkWebComponent = class extends BaseWebComponent {
  constructor() {
    super(...arguments);
    this.ctaRef = createCtaRef(() => this.getRenderProp("disabled") === true);
    this.tooltipBehavior = new TooltipBehavior(this.stateAccess);
    this.propsConfig = linkPropsConfig;
    this.handleAnchorClick = (event) => {
      this.tooltipBehavior.hideTooltip();
      const disabled = this.getRenderProp("disabled");
      if (disabled === true) {
        event.preventDefault();
        return;
      }
      const href = this.getRenderProp("href");
      const on = this.getRenderProp("on");
      if (typeof (on === null || on === void 0 ? void 0 : on.onClick) === "function") {
        setEventTarget(event, this.ctaRef.el);
        on.onClick(event, href);
      }
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.click, href);
      }
    };
    this.setAnchorRef = (el) => {
      this.ctaRef(el);
    };
  }
  unsetLinkTabIndex() {
    this.unsetRenderProp("tabIndex");
  }
  initLinkBehaviors() {
    this.unsubscribeOnLocationChange = onLocationChange((location) => {
      const href = this.getRenderProp("href");
      const ariaCurrentValue = this.getRenderProp("ariaCurrentValue");
      const newValue = location === href ? ariaCurrentValue : "";
      if (this.getState("ariaCurrent") !== newValue) {
        this.setState("ariaCurrent", newValue);
      }
    });
    this.tooltipBehavior.componentWillLoad({
      label: this.getTooltipLabel(),
      align: this.getRenderProp("tooltipAlign")
    });
  }
  syncTooltipListeners() {
    if (this.ctaRef.el) {
      this.tooltipBehavior.syncListeners(void 0, this.ctaRef.el, true);
    }
  }
  destroyLinkBehaviors() {
    if (this.unsubscribeOnLocationChange) {
      this.unsubscribeOnLocationChange();
      this.unsubscribeOnLocationChange = void 0;
    }
    this.tooltipBehavior.destroy();
  }
  getTooltipLabel() {
    const label = this.getRenderProp("label");
    if (typeof label === "string" && label.length > 0) {
      return label;
    }
    const href = this.getRenderProp("href");
    return typeof href === "string" ? href : "";
  }
  applyAccessKey(value) {
    accessKeyProp.apply(value, (v) => this.setRenderProp("accessKey", v));
  }
  applyAriaControls(value) {
    ariaControlsProp.apply(value, (v) => this.setRenderProp("ariaControls", v));
  }
  applyAriaCurrentValue(value) {
    ariaCurrentValueProp.apply(value, (v) => this.setRenderProp("ariaCurrentValue", v));
  }
  applyAriaDescription(value) {
    ariaDescriptionProp.apply(value, (v) => this.setRenderProp("ariaDescription", v));
  }
  applyAriaExpanded(value) {
    ariaExpandedProp.apply(value, (v) => this.setRenderProp("ariaExpanded", v));
  }
  applyAriaOwns(value) {
    ariaOwnsProp.apply(value, (v) => this.setRenderProp("ariaOwns", v));
  }
  applyCustomClass(value) {
    customClassProp.apply(value, (v) => this.setRenderProp("customClass", v));
  }
  applyDisabled(value) {
    disabledProp.apply(value, (v) => this.setRenderProp("disabled", v));
  }
  applyDownload(value) {
    downloadProp.apply(value, (v) => this.setRenderProp("download", v));
  }
  applyHideLabel(value) {
    hideLabelProp.apply(value, (v) => this.setRenderProp("hideLabel", v));
  }
  applyHref(value) {
    hrefProp.apply(value, (v) => this.setRenderProp("href", v), this.isRequired("href"));
  }
  applyIcons(value) {
    spanIconsProp.apply(value, (v) => this.setRenderProp("icons", v));
  }
  applyInline(value) {
    inlineProp.apply(value, (v) => this.setRenderProp("inline", v));
  }
  applyLabel(value) {
    labelWithExpertSlotProp.apply(value, (v) => {
      this.setRenderProp("label", v);
      this.setState("expertSlot", value === "");
      this.tooltipBehavior.watchLabel(this.getTooltipLabel());
    }, this.isRequired("label"));
  }
  applyOn(value) {
    linkCallbacksProp.apply(value, (v) => this.setRenderProp("on", v));
  }
  applyRole(value) {
    linkRoleProp.apply(value, (v) => this.setRenderProp("role", v));
  }
  applyShortKey(value) {
    shortKeyProp.apply(value, (v) => this.setRenderProp("shortKey", v));
  }
  applyTabIndex(value) {
    if (typeof value === "number") {
      tabIndexProp.apply(value, (v) => this.setRenderProp("tabIndex", v));
    } else {
      this.unsetRenderProp("tabIndex");
    }
  }
  applyTarget(value) {
    linkTargetProp.apply(value, (v) => this.setRenderProp("target", v));
  }
  applyTooltipAlign(value) {
    tooltipAlignProp.apply(value, (v) => {
      this.setRenderProp("tooltipAlign", v);
      this.tooltipBehavior.watchAlign(v);
    });
  }
  applyVariant(value) {
    variantProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  renderLinkFC() {
    return h(LinkFC, { accessKey: this.getRenderProp("accessKey"), ariaControls: this.getRenderProp("ariaControls"), ariaCurrent: this.getState("ariaCurrent"), ariaCurrentValue: this.getRenderProp("ariaCurrentValue"), ariaDescription: this.getRenderProp("ariaDescription"), ariaDescriptionId: this.getState("ariaDescriptionId"), ariaExpanded: this.getRenderProp("ariaExpanded"), ariaOwns: this.getRenderProp("ariaOwns"), customClass: this.getRenderProp("customClass"), disabled: this.getRenderProp("disabled"), download: this.getRenderProp("download"), handleAnchorClick: this.handleAnchorClick, hideLabel: this.getRenderProp("hideLabel"), href: this.getRenderProp("href"), icons: this.getRenderProp("icons"), inline: this.getRenderProp("inline"), label: this.getRenderProp("label"), on: this.getRenderProp("on"), refAnchor: this.setAnchorRef, refTooltip: this.tooltipBehavior.setTooltipElementRef, role: this.getRenderProp("role"), shortKey: this.getRenderProp("shortKey"), tabIndex: this.getRenderProp("tabIndex"), target: this.getRenderProp("target"), tooltipAlign: this.getRenderProp("tooltipAlign"), variant: this.getRenderProp("variant"), expertSlot: this.getState("expertSlot") });
  }
};

export {
  BaseLinkWebComponent
};
//# sourceMappingURL=chunk-BGPG45N7.js.map
