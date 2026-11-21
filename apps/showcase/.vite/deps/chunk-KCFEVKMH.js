import {
  getDefaultInputProps,
  getMsgType,
  isMsgDefinedAndInputTouched
} from "./chunk-JCU3O6PN.js";
import {
  createRelatedUniqueId
} from "./chunk-FQ2Y4FDM.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
import {
  clsx,
  getBlockBem
} from "./chunk-KPGE6Z2R.js";
import {
  Fragment,
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/input-C4yo-d7N.js
var InputFC = (props) => {
  const { class: classNames, msg, required, disabled, touched, readonly, ariaDescribedBy, hideLabel, label, suggestions, value } = props, other = __rest(props, ["class", "msg", "required", "disabled", "touched", "readonly", "ariaDescribedBy", "hideLabel", "label", "suggestions", "value"]);
  const inputProps = Object.assign(Object.assign({ class: clsx(getBlockBem("kol-input")(Object.assign({ disabled: Boolean(disabled), required: Boolean(required), touched: Boolean(touched), readonly: Boolean(readonly) }, isMsgDefinedAndInputTouched(msg, touched) ? { [getMsgType(msg)]: true } : {})), classNames), required, disabled, readonly, type: "text", list: suggestions && typeof other.id === "string" ? createRelatedUniqueId(other.id, "list") : void 0 }, getDefaultInputProps({ ariaDescribedBy, hideLabel, label })), other);
  return h(Fragment, null, h("input", Object.assign({}, inputProps, { value })), suggestions);
};

export {
  InputFC
};
//# sourceMappingURL=chunk-KCFEVKMH.js.map
