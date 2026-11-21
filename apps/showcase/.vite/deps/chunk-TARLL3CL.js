import {
  FormFieldHintFC,
  FormFieldLabelFC,
  getMsgType,
  isMsgDefinedAndInputTouched
} from "./chunk-JCU3O6PN.js";
import {
  TooltipFC
} from "./chunk-7Q2QTJQF.js";
import {
  createRelatedUniqueId
} from "./chunk-FQ2Y4FDM.js";
import {
  buildBadgeTextString,
  showExpertSlot
} from "./chunk-AVJUB7OE.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
import {
  BemRootNodeFC
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/field-control-CQJgDAKK.js
var fieldControlBem = bem.forBlock("kol-field-control");
var isFieldControlLabelShownAsTooltip = ({ hideLabel, label, renderNoTooltip }) => !renderNoTooltip && !showExpertSlot(label) && hideLabel === true;
var FieldControlFC = (props, children) => {
  const { class: classNames, id, label, hint, hideLabel, labelAlign, infoPopover, accessKey, shortKey, tooltipAlign, disabled, msg, touched, required, readOnly, renderNoHint, renderNoTooltip, labelProps, refInput, refTooltip } = props, other = __rest(props, ["class", "id", "label", "hint", "hideLabel", "labelAlign", "infoPopover", "accessKey", "shortKey", "tooltipAlign", "disabled", "msg", "touched", "required", "readOnly", "renderNoHint", "renderNoTooltip", "labelProps", "refInput", "refTooltip"]);
  const hasExpertSlot = showExpertSlot(label);
  const showTooltip = isFieldControlLabelShownAsTooltip({ hideLabel, label, renderNoTooltip });
  const badgeText = buildBadgeTextString(accessKey, shortKey);
  const showMsg = isMsgDefinedAndInputTouched(msg, touched);
  const renderInput = () => h("div", { class: fieldControlBem("input"), ref: refInput }, children);
  const renderTooltip = () => showTooltip ? h("div", { class: "kol-form-field__tooltip" }, h(TooltipFC, { badgeText: badgeText || "", label, align: tooltipAlign, id: createRelatedUniqueId(id, "label"), refFloating: refTooltip })) : null;
  const renderLabel = () => h(FormFieldLabelFC, Object.assign({}, labelProps, { id, baseClassName: "kol-field-control", class: hideLabel ? "kol-field-control__label--visually-hidden" : void 0, omitId: showTooltip, hasExpertSlot, label, accessKey, shortKey, infoPopover }));
  return h(BemRootNodeFC, Object.assign({ block: "kol-field-control", modifiers: Object.assign(Object.assign({ disabled: Boolean(disabled), required: Boolean(required), touched: Boolean(touched), "hide-label": Boolean(hideLabel), "read-only": Boolean(readOnly) }, showMsg ? { [getMsgType(msg)]: true } : {}), { "label-align-left": labelAlign === "left", "label-align-right": labelAlign === "right" }), class: classNames }, other), labelAlign === "left" ? [renderLabel(), renderInput(), renderTooltip()] : [renderInput(), renderTooltip(), renderLabel()], !renderNoHint && h(FormFieldHintFC, { baseClassName: "kol-field-control", id, hint }));
};

export {
  isFieldControlLabelShownAsTooltip,
  FieldControlFC
};
//# sourceMappingURL=chunk-TARLL3CL.js.map
