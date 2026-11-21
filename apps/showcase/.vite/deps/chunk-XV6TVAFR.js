import {
  getOptions
} from "./chunk-AEQ2DHFL.js";
import {
  BaseBehavior
} from "./chunk-IGUFDWYR.js";
import {
  nameProp
} from "./chunk-3C6UB25G.js";
import {
  createPropDefinition,
  normalizeString
} from "./chunk-KPGE6Z2R.js";
import {
  devHint,
  devWarning,
  getExperimentalMode
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/behavior-DUy0X7U1.js
var syncValueBySelectorProp = createPropDefinition("syncValueBySelector", void 0, normalizeString);
var formAssociationPropsConfig = {
  optional: [nameProp, syncValueBySelectorProp]
};
var NODE_TYPE_ELEMENT = 1;
var NODE_TYPE_DOCUMENT_FRAGMENT = 11;
var ASSOCIATED_TAG_NAMES = /* @__PURE__ */ new Set([
  "KOL-COMBOBOX",
  "KOL-INPUT-CHECKBOX",
  "KOL-INPUT-COLOR",
  "KOL-INPUT-DATE",
  "KOL-INPUT-EMAIL",
  "KOL-INPUT-FILE",
  "KOL-INPUT-NUMBER",
  "KOL-INPUT-PASSWORD",
  "KOL-INPUT-RADIO",
  "KOL-INPUT-RANGE",
  "KOL-INPUT-TEXT",
  "KOL-SELECT",
  "KOL-SINGLE-SELECT",
  "KOL-TEXTAREA"
]);
var hintMissingName = () => {
  devHint(`A name on input fields or switches is not strictly required, but it might be relevant for the autocomplete function and for the static submission of the input field.`);
};
var FormAssociationBehavior = class extends BaseBehavior {
  constructor(stateAccess, { host, type, name }) {
    var _a, _b, _c, _d, _e;
    super(stateAccess, formAssociationPropsConfig);
    this.experimentalMode = getExperimentalMode();
    this.setFormAssociatedValue = (rawValue) => {
      var _a2;
      const name2 = (_a2 = this.formAssociated) === null || _a2 === void 0 ? void 0 : _a2.getAttribute("name");
      if (name2 === null || name2 === "") {
        devHint(` The form field (${this.type}) must have a name attribute to be form-associated. Please define the _name attribute.`);
      }
      const strValue = this.tryToStringifyValue(rawValue);
      this.syncValue(rawValue, strValue, this.formAssociated);
      this.syncValue(rawValue, strValue, this.syncToOwnInput);
    };
    this.host = this.findHostWithShadowRoot(host);
    this.type = type;
    if (((_a = getOptions()) === null || _a === void 0 ? void 0 : _a.reflectInputValues) && ASSOCIATED_TAG_NAMES.has((_c = (_b = this.host) === null || _b === void 0 ? void 0 : _b.tagName) !== null && _c !== void 0 ? _c : "") && name) {
      (_d = this.host) === null || _d === void 0 ? void 0 : _d.querySelectorAll("input,select,textarea").forEach((el) => {
        var _a2;
        (_a2 = this.host) === null || _a2 === void 0 ? void 0 : _a2.removeChild(el);
      });
      this.formAssociated = this.createFormAssociatedElement();
      this.formAssociated.setAttribute("data-form-associated", "");
      this.formAssociated.setAttribute("hidden", "");
      (_e = this.host) === null || _e === void 0 ? void 0 : _e.appendChild(this.formAssociated);
    }
  }
  componentWillLoad(props) {
    this.watchName(props.name);
    this.watchSyncValueBySelector(props.syncValueBySelector);
  }
  watchName(value) {
    nameProp.apply(value, (v) => {
      this.setRenderProp("name", v);
      this.setNameAttribute(v);
    });
    if (typeof value === "undefined") {
      hintMissingName();
    }
  }
  watchSyncValueBySelector(value) {
    if (this.experimentalMode && typeof value === "string") {
      this.setRenderProp("syncValueBySelector", value);
      const input = document.querySelector(value);
      if (input) {
        this.syncToOwnInput = input;
      }
    }
  }
  setNameAttribute(value) {
    this.setAttribute("name", this.formAssociated, value);
  }
  createFormAssociatedElement() {
    switch (this.type) {
      case "color":
      case "date":
      case "email":
      case "file":
      case "number":
      case "password":
      case "radio":
      case "range":
      case "text": {
        const input = document.createElement("input");
        input.setAttribute("type", this.type);
        return input;
      }
      case "select": {
        const select = document.createElement("select");
        select.setAttribute("multiple", "");
        return select;
      }
      case "textarea":
        return document.createElement("textarea");
      default: {
        const input = document.createElement("input");
        input.setAttribute("type", "hidden");
        return input;
      }
    }
  }
  findHostWithShadowRoot(host) {
    while ((host === null || host === void 0 ? void 0 : host.shadowRoot) === null && host !== document.body) {
      const parent = host.parentNode;
      if ((parent === null || parent === void 0 ? void 0 : parent.nodeType) === NODE_TYPE_DOCUMENT_FRAGMENT && "host" in parent) {
        host = parent.host;
      } else {
        host = (parent === null || parent === void 0 ? void 0 : parent.nodeType) === NODE_TYPE_ELEMENT ? parent : void 0;
      }
    }
    return host;
  }
  setAttribute(qualifiedName, element, value) {
    if (this.experimentalMode) {
      try {
        value = typeof value === "object" && value !== null ? JSON.stringify(value) : value;
        if (typeof value === "boolean" || typeof value === "number" || typeof value === "string") {
          element === null || element === void 0 ? void 0 : element.setAttribute(qualifiedName, `${value}`);
        } else {
          throw new Error(`Invalid value type: ${typeof value}`);
        }
      } catch (_a) {
        element === null || element === void 0 ? void 0 : element.removeAttribute(qualifiedName);
      }
    }
  }
  tryToStringifyValue(value) {
    try {
      return typeof value === "object" && value !== null ? JSON.stringify(value).toString() : value === null || value === void 0 ? null : value.toString();
    } catch (e) {
      devWarning(`The form field raw value is not able to stringify! ${e}`);
      return "";
    }
  }
  syncValue(rawValue, strValue, associatedElement) {
    if (associatedElement) {
      switch (this.type) {
        case "file":
          if (typeof FileList !== "undefined" && rawValue instanceof FileList) {
            associatedElement.files = rawValue;
          } else {
            associatedElement.value = "";
          }
          break;
        case "select":
          if (associatedElement.tagName === "SELECT") {
            this.syncSelectOptions(rawValue, associatedElement);
          } else {
            this.syncValueAttribute(strValue, associatedElement);
          }
          break;
        case "radio":
          if (typeof strValue === "string") {
            associatedElement.setAttribute("value", strValue);
            associatedElement.setAttribute("checked", "");
            associatedElement.value = strValue;
          }
          break;
        default:
          this.syncValueAttribute(strValue, associatedElement);
      }
    }
  }
  syncSelectOptions(rawValue, select) {
    select.querySelectorAll("option").forEach((el) => {
      select.removeChild(el);
    });
    const values = Array.isArray(rawValue) ? rawValue : rawValue === null || rawValue === void 0 ? [] : [rawValue];
    values.forEach((value) => {
      const strValueItem = this.tryToStringifyValue(value);
      if (typeof strValueItem === "string") {
        const option = document.createElement("option");
        option.setAttribute("value", strValueItem);
        option.setAttribute("selected", "");
        select.appendChild(option);
      }
    });
  }
  syncValueAttribute(strValue, element) {
    if (typeof strValue === "string") {
      element.setAttribute("value", strValue);
      element.value = strValue;
    } else {
      element.removeAttribute("value");
      element.value = "";
    }
  }
};

export {
  FormAssociationBehavior
};
//# sourceMappingURL=chunk-XV6TVAFR.js.map
