import {
  getMsgType,
  isMsgDefinedAndInputTouched
} from "./chunk-JCU3O6PN.js";
import {
  ButtonFC
} from "./chunk-3C6UB25G.js";
import {
  IconFC
} from "./chunk-NQNQ4CHG.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
import {
  BemRootNodeFC,
  clsx,
  createPropDefinition
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
  isStyle,
  parseJson
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/input-container-Cb2xJUCl.js
var mapCustomIcon = (state, alignment, icon) => {
  if (isObject(icon)) {
    state[alignment] = icon;
  } else if (isString(icon, 1)) {
    state[alignment] = {
      icon
    };
  }
};
var mapIconProp2State = (icon) => {
  let state = {};
  if (isString(icon, 1)) {
    state = {
      left: {
        icon
      }
    };
  } else if (typeof icon === "object" && icon !== null) {
    mapCustomIcon(state, "top", icon.top);
    mapCustomIcon(state, "right", icon.right);
    mapCustomIcon(state, "bottom", icon.bottom);
    mapCustomIcon(state, "left", icon.left);
  }
  return state;
};
var isIcon = (value) => typeof value === "object" && value !== null && (typeof value.style === "undefined" || isStyle(value.style)) && (typeof value.label === "undefined" || isString(value.label)) && isString(value.icon, 1);
var isIconPosition = (value) => isString(value, 0) || isIcon(value);
function normalizeHorizontalIcons(value) {
  let parsed = value;
  if (typeof value === "string") {
    try {
      parsed = parseJson(value);
    } catch (_a) {
    }
  }
  if (isString(parsed, 1)) {
    return mapIconProp2State(parsed);
  }
  if (typeof parsed === "object" && parsed !== null) {
    const icons = parsed;
    if (Object.keys(icons).length === 0 || ["left", "right", "top", "bottom"].some((position) => isIconPosition(icons[position]))) {
      return mapIconProp2State(parsed);
    }
  }
  throw new Error(`Invalid icons: ${typeof value}`);
}
var horizontalIconsProp = createPropDefinition("icons", {}, normalizeHorizontalIcons);
var renderIcon = (icon) => {
  var _a;
  if (!icon) {
    return null;
  }
  return typeof icon === "string" ? h(IconFC, { class: "kol-input-container__icon", icons: icon, label: "" }) : h(IconFC, { class: "kol-input-container__icon", icons: icon.icon, label: (_a = icon.label) !== null && _a !== void 0 ? _a : "", style: icon.style });
};
var getInputAdornments = ({ icons, smartButton, startAdornment, endAdornment }) => ({
  startAdornment: [startAdornment !== null && startAdornment !== void 0 ? startAdornment : null, renderIcon(icons === null || icons === void 0 ? void 0 : icons.left)].filter(Boolean),
  endAdornment: [smartButton ? h(ButtonFC, Object.assign({}, smartButton)) : null, renderIcon(icons === null || icons === void 0 ? void 0 : icons.right), endAdornment !== null && endAdornment !== void 0 ? endAdornment : null].filter(Boolean)
});
var inputContainerBem = bem.forBlock("kol-input-container");
var InputAdornmentFC = (_a, children) => {
  var { position = "start", class: className } = _a, other = __rest(_a, ["position", "class"]);
  return h("div", Object.assign({ class: clsx(inputContainerBem("adornment", { [position]: true }), className) }, other), children);
};
function hasItems(items) {
  if (!items) {
    return false;
  }
  return Array.isArray(items) ? items.length > 0 : Boolean(items);
}
var InputContainerFC = (props, children) => {
  const { class: classNames, startAdornment, endAdornment, disabled, msg, touched } = props, other = __rest(props, ["class", "startAdornment", "endAdornment", "disabled", "msg", "touched"]);
  const withAdornments = hasItems(startAdornment) || hasItems(endAdornment);
  return h(BemRootNodeFC, Object.assign({ block: "kol-input-container", modifiers: Object.assign({ disabled: Boolean(disabled) }, isMsgDefinedAndInputTouched(msg, touched) ? { [getMsgType(msg)]: true } : {}), class: classNames }, other), withAdornments && h(InputAdornmentFC, { position: "start" }, startAdornment), h("div", { class: inputContainerBem("container") }, children), withAdornments && h(InputAdornmentFC, { position: "end" }, endAdornment));
};

export {
  horizontalIconsProp,
  getInputAdornments,
  InputContainerFC
};
//# sourceMappingURL=chunk-YCYFPTWS.js.map
