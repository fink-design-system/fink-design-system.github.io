import {
  createPopoverButtonItem
} from "./chunk-EBSUS5ES.js";
import {
  resolveTargets
} from "./chunk-FRVQWXY2.js";
import {
  createButtonItem
} from "./chunk-RSHHA2HG.js";
import {
  PopoverButtonFC
} from "./chunk-T3QCMHNQ.js";
import {
  FormAssociationBehavior
} from "./chunk-XV6TVAFR.js";
import {
  AlertFC
} from "./chunk-U3F5DQBF.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
import {
  nameProp
} from "./chunk-3C6UB25G.js";
import {
  classNameFromVariant,
  hideLabelProp,
  tooltipAlignProp
} from "./chunk-JIRF5MWS.js";
import {
  TooltipFC
} from "./chunk-7Q2QTJQF.js";
import {
  labelWithExpertSlotProp
} from "./chunk-7C3Y25NJ.js";
import {
  createRelatedUniqueId,
  createUniqueId,
  nonce
} from "./chunk-FQ2Y4FDM.js";
import {
  disabledProp
} from "./chunk-SESBZTFK.js";
import {
  SpanFC,
  buildBadgeTextString,
  showExpertSlot
} from "./chunk-AVJUB7OE.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  clsx,
  createCallbacksPropDefinition,
  createPropDefinition,
  normalizeBoolean,
  normalizeString,
  trimLabel
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  h
} from "./chunk-VUP4WNL7.js";
import {
  isObject,
  isString,
  parseJson
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/api-MBSY9afi.js
function isMsgDefinedAndInputTouched(msg, touched) {
  return Boolean(msg) && touched === true;
}
function normalizeMsg$1(msg) {
  if (typeof msg === "string") {
    try {
      return parseJson(msg);
    } catch (_a) {
      return { _description: msg, _type: "error" };
    }
  }
  if (msg && typeof msg === "object" && !("_type" in msg)) {
    return Object.assign(Object.assign({}, msg), { _type: "error" });
  }
  return msg;
}
function getMsgType(msg) {
  var _a;
  if (typeof msg === "string") {
    return "error";
  }
  return (_a = msg === null || msg === void 0 ? void 0 : msg._type) !== null && _a !== void 0 ? _a : "error";
}
var ariaDetailsProp = createPropDefinition("ariaDetails", "", normalizeString);
var hideMsgProp = createPropDefinition("hideMsg", false, normalizeBoolean);
var hintProp = createPropDefinition("hint", "", normalizeString);
function normalizeInfoPopover(value) {
  if (typeof value === "object" && value !== null) {
    return value;
  }
  throw new Error(`Invalid info popover: ${typeof value}`);
}
var infoPopoverProp = createPropDefinition("infoPopover", void 0, normalizeInfoPopover);
var inputCallbacksProp = createCallbacksPropDefinition();
function normalizeMsg(value) {
  if (typeof value === "string") {
    try {
      return parseJson(value);
    } catch (_a) {
      return value;
    }
  }
  return value;
}
function validateMsg(value) {
  if (value === void 0) {
    return true;
  }
  if (typeof value === "string") {
    return value.length > 0;
  }
  return isObject(value) && isString(value._description, 1);
}
var msgProp = createPropDefinition("msg", void 0, normalizeMsg, validateMsg);
var touchedProp = createPropDefinition("touched", false, normalizeBoolean);
var getFormFieldAria = ({ id, msg, hint, touched }) => {
  const description = typeof msg === "string" ? msg : msg === null || msg === void 0 ? void 0 : msg._description;
  const hasMessage = Boolean(description && description.length > 0);
  const hasError = getMsgType(msg) === "error" && hasMessage && touched === true;
  const hasHint = typeof hint === "string" && hint.length > 0;
  const ariaDescribedBy = [];
  if (hasMessage && touched === true) {
    ariaDescribedBy.push(createRelatedUniqueId(id, "msg"));
  }
  if (hasHint) {
    ariaDescribedBy.push(createRelatedUniqueId(id, "hint"));
  }
  return { hasError, hasHint, ariaDescribedBy };
};
var FormFieldHintFC = (_a) => {
  var { id, class: classNames, hint, baseClassName = "kol-form-field" } = _a, other = __rest(_a, ["id", "class", "hint", "baseClassName"]);
  if (!hint) {
    return null;
  }
  return h("span", Object.assign({ class: clsx(`${baseClassName}__hint`, classNames), id: createRelatedUniqueId(id || "", "hint") }, other), hint);
};
var FormFieldLabelFC = (_a) => {
  var { component: Component = "label", id, baseClassName = "kol-form-field", class: classNames, accessKey, shortKey, label, hideLabel, hasExpertSlot, omitId, showBadge = true, readOnly, infoPopover } = _a, other = __rest(_a, ["component", "id", "baseClassName", "class", "accessKey", "shortKey", "label", "hideLabel", "hasExpertSlot", "omitId", "showBadge", "readOnly", "infoPopover"]);
  const useTooltipInsteadOfLabel = !hasExpertSlot && hideLabel;
  const badgeText = showBadge === false ? void 0 : buildBadgeTextString(accessKey, shortKey);
  return h(Component, Object.assign({}, other, { class: clsx(`${baseClassName}__label`, classNames), id: !useTooltipInsteadOfLabel && !omitId ? createRelatedUniqueId(id, "label") : void 0, hidden: useTooltipInsteadOfLabel, htmlFor: Component === "legend" ? void 0 : id }), h(SpanFC, { class: `${baseClassName}__label-text`, label: hasExpertSlot ? "" : label !== null && label !== void 0 ? label : "", badgeText }, h("slot", { name: "expert" })), !hasExpertSlot && readOnly && h("span", { class: `${baseClassName}__label__read-only`, "aria-hidden": "true" }, "(", translate("kol-readonly"), ")"), !hasExpertSlot && infoPopover && h("span", null, h(PopoverButtonFC, Object.assign({}, infoPopover.popoverButton), h("div", { class: "kol-popover-button__popover--styled" }, infoPopover.content))));
};
var FormFieldMsgFC = (_a) => {
  var _b, _c;
  var { alert, hideMsg, msg, id, class: classNames } = _a, other = __rest(_a, ["alert", "hideMsg", "msg", "id", "class"]);
  const message = normalizeMsg$1(msg);
  return h(AlertFC, Object.assign({ alert: hideMsg ? false : (_b = message === null || message === void 0 ? void 0 : message._alert) !== null && _b !== void 0 ? _b : alert === true, class: clsx("kol-form-field__msg", hideMsg && "visually-hidden", classNames), closerAriaDescriptionId: nonce(), handleCloserClick: () => void 0, hasCloser: false, headingId: createUniqueId("alert-heading"), id: createRelatedUniqueId(id, "msg"), label: "", level: 0, refCloserButton: () => void 0, refCloserTooltip: () => void 0, type: (_c = message === null || message === void 0 ? void 0 : message._type) !== null && _c !== void 0 ? _c : "error", variant: "msg" }, other), (message === null || message === void 0 ? void 0 : message._description) || void 0);
};
var formFieldBem = bem.forBlock("kol-form-field");
var isLabelShownAsTooltip = ({ hideLabel, label, renderNoTooltip }) => !renderNoTooltip && !showExpertSlot(label) && hideLabel === true;
var getMsgTypeModifiers = (msg) => {
  const msgType = getMsgType(msg);
  return { [msgType]: true, [`msg-type-${msgType}`]: true };
};
var FormFieldFC = (props, children) => {
  const { renderNoLabel, renderNoTooltip, renderNoHint, id, required, alert, disabled, class: classNames, msg, hideMsg, hideLabel, label, infoPopover, hint, accessKey, shortKey, counter, readOnly, touched, maxLength, ariaDescribedBy, showBadge, tooltipAlign, variant, component = "div", orientation, refInput, refTooltip } = props, other = __rest(props, ["renderNoLabel", "renderNoTooltip", "renderNoHint", "id", "required", "alert", "disabled", "class", "msg", "hideMsg", "hideLabel", "label", "infoPopover", "hint", "accessKey", "shortKey", "counter", "readOnly", "touched", "maxLength", "ariaDescribedBy", "showBadge", "tooltipAlign", "variant", "component", "orientation", "refInput", "refTooltip"]);
  const hasExpertSlot = showExpertSlot(label);
  const showMsg = isMsgDefinedAndInputTouched(msg, touched);
  const badgeText = buildBadgeTextString(accessKey, shortKey);
  const showTooltip = isLabelShownAsTooltip({ hideLabel, label, renderNoTooltip });
  const isFieldset = component === "fieldset";
  return h(BemRootNodeFC, Object.assign({ component, block: "kol-form-field", modifiers: Object.assign({ disabled: Boolean(disabled), required: Boolean(required), touched: Boolean(touched), "hide-label": Boolean(hideLabel), "read-only": Boolean(readOnly), "hidden-msg": Boolean(hideMsg) }, showMsg ? getMsgTypeModifiers(msg) : {}), class: clsx(variant && classNameFromVariant(variant, "form-field"), classNames), disabled: isFieldset && disabled ? true : void 0, "aria-describedby": ariaDescribedBy }, other), !renderNoLabel && h(FormFieldLabelFC, { component: isFieldset ? "legend" : "label", class: isFieldset ? "kol-form-field__label--legend" : void 0, id, hasExpertSlot, hideLabel, label, accessKey, shortKey, readOnly, showBadge, infoPopover }), h("div", { class: formFieldBem("input", {
    "orientation-horizontal": orientation === "horizontal",
    "orientation-vertical": orientation === "vertical"
  }), ref: refInput }, children, showTooltip && h("div", { class: formFieldBem("tooltip") }, h(TooltipFC, { badgeText: badgeText || "", label, align: tooltipAlign, id: createRelatedUniqueId(id, "label"), refFloating: refTooltip }))), counter && !(counter.maxLengthBehavior === "soft" && typeof counter.maxLength !== "number") && h("div", { class: formFieldBem("counter") }, h("span", { "aria-hidden": "true", class: formFieldBem("counter"), ref: counter.visualRef }), h("span", { "aria-live": "polite", class: "visually-hidden", id: createRelatedUniqueId(id, "counter"), ref: counter.ariaRef })), showMsg && h(FormFieldMsgFC, { id, alert, hideMsg, msg }), !renderNoHint && h(FormFieldHintFC, { id, hint }), typeof maxLength === "number" && !counter && h("span", { id: createRelatedUniqueId(id, "character-limit-hint"), class: "visually-hidden" }, translate("kol-character-limit-hint", { placeholders: { limit: String(maxLength) } })));
};
var BaseFormFieldWebComponent = class extends BaseWebComponent {
  constructor() {
    super(...arguments);
    this.tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
    this.smartButton = createButtonItem(() => this.host);
    this.infoPopover = createPopoverButtonItem({
      getFlagHost: () => this.host,
      getOpen: () => this.infoPopoverOpen === true,
      setOpen: (open) => {
        this.infoPopoverOpen = open;
      }
    });
    this.focusEventSent = false;
    this.handleChange = (event, value) => {
      var _a, _b;
      event.stopPropagation();
      if (typeof value === "undefined") {
        value = event.target.value;
      }
      this.emit(KolEvent.change, value);
      (_b = (_a = this._on) === null || _a === void 0 ? void 0 : _a.onChange) === null || _b === void 0 ? void 0 : _b.call(_a, event, value);
    };
    this.handleInput = (event, value) => {
      var _a, _b;
      event.stopPropagation();
      if (typeof value === "undefined") {
        value = event.target.value;
      }
      this.emit(KolEvent.input, value);
      this.formAssociation.setFormAssociatedValue(value);
      (_b = (_a = this._on) === null || _a === void 0 ? void 0 : _a.onInput) === null || _b === void 0 ? void 0 : _b.call(_a, event, value);
    };
    this.handleClick = (event) => {
      var _a, _b;
      this.emit(KolEvent.click);
      (_b = (_a = this._on) === null || _a === void 0 ? void 0 : _a.onClick) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    };
    this.handleFocus = (event) => {
      var _a, _b;
      if (!this.focusEventSent) {
        this.emit(KolEvent.focus);
        (_b = (_a = this._on) === null || _a === void 0 ? void 0 : _a.onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, event);
        this.focusEventSent = true;
      }
      this.shared.setState("inputHasFocus", true);
    };
    this.handleBlur = (event) => {
      this.handleFocusLeave(event);
      this.shared.setState("inputHasFocus", false);
    };
    this.handleKeyDown = (event) => {
      var _a, _b;
      this.emit(KolEvent.keydown);
      (_b = (_a = this._on) === null || _a === void 0 ? void 0 : _a.onKeyDown) === null || _b === void 0 ? void 0 : _b.call(_a, event);
    };
    this.setInputRef = (el) => {
      this.tooltipAnchor = el;
      if (el && this.isTooltipShown()) {
        this.tooltipBehavior.initContext(el);
        this.tooltipBehavior.syncListeners(void 0, el, true);
      }
    };
    this.setTooltipRef = (el) => {
      this.tooltipBehavior.setTooltipElementRef(el);
    };
  }
  get shared() {
    return this;
  }
  initFormAssociation(type, name) {
    this.formAssociation = new FormAssociationBehavior(BaseWebComponent.stateLess, { host: this.host, type, name });
  }
  syncFormField() {
    this.smartButton.syncListeners();
    this.infoPopover.syncListeners();
    this.syncAriaDetails();
  }
  destroyFormField() {
    this.tooltipBehavior.destroy();
    this.smartButton.destroy();
    this.infoPopover.destroy();
  }
  connectedCallback() {
    this.syncFormField();
    if (this.tooltipAnchor && this.isTooltipShown()) {
      this.tooltipBehavior.initContext(this.tooltipAnchor);
      this.tooltipBehavior.syncListeners(void 0, this.tooltipAnchor, true);
    }
  }
  getInfoPopover() {
    const infoPopover = this.shared.getRenderProp("infoPopover");
    if (!infoPopover) {
      return void 0;
    }
    const { _content } = infoPopover, popoverButton = __rest(infoPopover, ["_content"]);
    return {
      popoverButton: this.infoPopover.getFcProps(Object.assign(Object.assign({ _variant: "ghost" }, popoverButton), { _hideLabel: true, _inline: true })),
      content: _content
    };
  }
  getSmartButtonFcProps(smartButton, disabled) {
    if (typeof smartButton !== "object" || smartButton === null) {
      return void 0;
    }
    return this.smartButton.getFcProps(Object.assign({ _hideLabel: true, _disabled: disabled }, smartButton), { class: "kol-input-container__smart-button" });
  }
  applyAriaDetails(value) {
    ariaDetailsProp.apply(value, (v) => this.shared.setRenderProp("ariaDetails", v));
    this.syncAriaDetails();
  }
  syncAriaDetails() {
    var _a, _b, _c, _d;
    const target = (_b = (_a = this.host) === null || _a === void 0 ? void 0 : _a.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector("input, select, textarea");
    if (!target || !("ariaDetailsElements" in target)) {
      return;
    }
    const elements = resolveTargets(this.host, this.shared.getRenderProp("ariaDetails"));
    const pushed = this.pushedDetailsElements;
    const changed = target !== this.ariaDetailsTarget || ((_c = pushed === null || pushed === void 0 ? void 0 : pushed.length) !== null && _c !== void 0 ? _c : 0) !== elements.length || ((_d = pushed === null || pushed === void 0 ? void 0 : pushed.some((element, index) => element !== elements[index])) !== null && _d !== void 0 ? _d : false);
    if (!changed) {
      return;
    }
    this.ariaDetailsTarget = target;
    this.pushedDetailsElements = elements;
    target.ariaDetailsElements = elements.length ? elements : null;
  }
  applyDisabled(value) {
    disabledProp.apply(value, (v) => this.shared.setRenderProp("disabled", v));
  }
  applyHideLabel(value) {
    hideLabelProp.apply(value, (v) => this.shared.setRenderProp("hideLabel", v));
  }
  applyHideMsg(value) {
    hideMsgProp.apply(value, (v) => this.shared.setRenderProp("hideMsg", v));
  }
  applyHint(value) {
    hintProp.apply(value, (v) => this.shared.setRenderProp("hint", v));
  }
  applyInfoPopover(value) {
    infoPopoverProp.apply(value, (v) => this.shared.setRenderProp("infoPopover", v));
  }
  applyLabel(value) {
    labelWithExpertSlotProp.apply(value, (v) => this.shared.setRenderProp("label", v), this.isRequired("label"));
  }
  applyMsg(value) {
    msgProp.apply(value, (v) => this.shared.setRenderProp("msg", v));
  }
  applyName(value) {
    nameProp.apply(value, (v) => this.shared.setRenderProp("name", v));
    this.formAssociation.watchName(value);
  }
  applyOn(value) {
    inputCallbacksProp.apply(value, (v) => this.shared.setRenderProp("on", v));
  }
  applySyncValueBySelector(value) {
    this.formAssociation.watchSyncValueBySelector(value);
  }
  applyTooltipAlign(value) {
    tooltipAlignProp.apply(value !== null && value !== void 0 ? value : "top", (v) => this.shared.setRenderProp("tooltipAlign", v));
  }
  applyTouched(value) {
    touchedProp.apply(value, (v) => this.shared.setRenderProp("touched", v));
  }
  get eventHost() {
    var _a, _b;
    return (_b = (_a = this.formAssociation) === null || _a === void 0 ? void 0 : _a.host) !== null && _b !== void 0 ? _b : this.host;
  }
  emit(type, value) {
    if (this.eventHost) {
      dispatchDomEvent(this.eventHost, type, value);
    }
  }
  handleFocusLeave(event) {
    var _a, _b;
    if (this._disabled) {
      return;
    }
    const host = this.eventHost;
    const root = (host === null || host === void 0 ? void 0 : host.shadowRoot) || host;
    const isFocusInside = (root === null || root === void 0 ? void 0 : root.contains(event.relatedTarget)) || host === event.relatedTarget;
    if (this.focusEventSent && !isFocusInside) {
      this._touched = true;
      this.emit(KolEvent.blur);
      (_b = (_a = this._on) === null || _a === void 0 ? void 0 : _a.onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      this.focusEventSent = false;
    }
  }
  getAria() {
    const shared = this.shared;
    return getFormFieldAria({
      id: shared.getState("id"),
      msg: shared.getRenderProp("msg"),
      hint: shared.getRenderProp("hint"),
      touched: shared.getRenderProp("touched")
    });
  }
  showAsAlert() {
    return Boolean(this.shared.getRenderProp("touched")) && !this.shared.getState("inputHasFocus");
  }
  isTooltipShown() {
    const shared = this.shared;
    return isLabelShownAsTooltip({ hideLabel: shared.getRenderProp("hideLabel"), label: trimLabel(shared.getRenderProp("label")) });
  }
  getLabelTooltipRefs() {
    return { refInput: this.setInputRef, refTooltip: this.setTooltipRef };
  }
  getFormFieldProps({ class: classNames, accessKey, shortKey, variant, counter, maxLength, readOnly, renderNoLabel, renderNoTooltip, required }) {
    const shared = this.shared;
    const id = shared.getState("id");
    const label = shared.getRenderProp("label");
    const tooltipAlign = shared.getRenderProp("tooltipAlign");
    if (this.isTooltipShown()) {
      this.tooltipBehavior.watchAlign(tooltipAlign);
      this.tooltipBehavior.watchBadgeText(buildBadgeTextString(accessKey, shortKey) || "");
      this.tooltipBehavior.watchId(createRelatedUniqueId(id, "label"));
      this.tooltipBehavior.watchLabel(label);
    } else {
      this.tooltipBehavior.destroy();
    }
    return {
      id,
      disabled: shared.getRenderProp("disabled"),
      msg: shared.getRenderProp("msg"),
      hint: shared.getRenderProp("hint"),
      label,
      hideLabel: shared.getRenderProp("hideLabel"),
      hideMsg: shared.getRenderProp("hideMsg"),
      touched: shared.getRenderProp("touched"),
      showBadge: Boolean(accessKey) || Boolean(shortKey),
      required,
      readOnly,
      accessKey,
      shortKey,
      maxLength,
      counter,
      variant,
      class: classNames,
      tooltipAlign,
      alert: this.showAsAlert(),
      infoPopover: this.getInfoPopover(),
      renderNoLabel,
      renderNoTooltip,
      refInput: renderNoTooltip ? void 0 : this.setInputRef,
      refTooltip: this.setTooltipRef
    };
  }
};
function getDefaultInputProps({ ariaDescribedBy, hideLabel, label }) {
  return {
    title: "",
    autoCapitalize: "off",
    autoCorrect: "off",
    "aria-describedby": (ariaDescribedBy === null || ariaDescribedBy === void 0 ? void 0 : ariaDescribedBy.length) ? ariaDescribedBy.join(" ") : void 0,
    "aria-label": hideLabel && label ? trimLabel(label) : void 0
  };
}
var formFieldBasePropsConfig = {
  required: [labelWithExpertSlotProp],
  optional: [
    ariaDetailsProp,
    disabledProp,
    hideLabelProp,
    hideMsgProp,
    hintProp,
    infoPopoverProp,
    inputCallbacksProp,
    msgProp,
    nameProp,
    tooltipAlignProp,
    touchedProp
  ]
};

export {
  isMsgDefinedAndInputTouched,
  getMsgType,
  FormFieldHintFC,
  FormFieldLabelFC,
  FormFieldFC,
  BaseFormFieldWebComponent,
  getDefaultInputProps,
  formFieldBasePropsConfig
};
//# sourceMappingURL=chunk-JCU3O6PN.js.map
