import {
  require_react
} from "./chunk-MTCZB3O7.js";
import {
  __toESM
} from "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+react-v19@4.7.0-rc.0_@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1_fc9531035b0e7b8cb0cf82819468efb3/node_modules/@public-ui/react-v19/dist/index.mjs
var import_react = __toESM(require_react(), 1);
var dashToPascalCase = (str) => str.toLowerCase().split("-").map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join("");
var camelToDashCase = (str) => str.replace(/([A-Z])/g, (m) => `-${m[0].toLowerCase()}`);
var attachProps = (node, newProps, oldProps = {}) => {
  if (node instanceof Element) {
    const className = getClassName(node.classList, newProps, oldProps);
    if (className !== "") {
      node.className = className;
    }
    Object.keys(newProps).forEach((name) => {
      if (name === "children" || name === "style" || name === "ref" || name === "class" || name === "className" || name === "forwardedRef") {
        return;
      }
      if (name.indexOf("on") === 0 && name[2] === name[2].toUpperCase()) {
        const eventName = name.substring(2);
        const eventNameLc = eventName[0].toLowerCase() + eventName.substring(1);
        if (!isCoveredByReact(eventNameLc)) {
          syncEvent(node, eventNameLc, newProps[name]);
        }
      } else {
        node[name] = newProps[name];
        const propType = typeof newProps[name];
        if (propType === "string") {
          node.setAttribute(camelToDashCase(name), newProps[name]);
        }
      }
    });
  }
};
var getClassName = (classList, newProps, oldProps) => {
  const newClassProp = newProps.className || newProps.class;
  const oldClassProp = oldProps.className || oldProps.class;
  const currentClasses = arrayToMap(classList);
  const incomingPropClasses = arrayToMap(newClassProp ? newClassProp.split(" ") : []);
  const oldPropClasses = arrayToMap(oldClassProp ? oldClassProp.split(" ") : []);
  const finalClassNames = [];
  currentClasses.forEach((currentClass) => {
    if (incomingPropClasses.has(currentClass)) {
      finalClassNames.push(currentClass);
      incomingPropClasses.delete(currentClass);
    } else if (!oldPropClasses.has(currentClass)) {
      finalClassNames.push(currentClass);
    }
  });
  incomingPropClasses.forEach((s) => finalClassNames.push(s));
  return finalClassNames.join(" ");
};
var transformReactEventName = (eventNameSuffix) => {
  switch (eventNameSuffix) {
    case "doubleclick":
      return "dblclick";
  }
  return eventNameSuffix;
};
var isCoveredByReact = (eventNameSuffix) => {
  if (typeof document === "undefined") {
    return true;
  } else {
    const eventName = "on" + transformReactEventName(eventNameSuffix);
    let isSupported = eventName in document;
    if (!isSupported) {
      const element = document.createElement("div");
      element.setAttribute(eventName, "return;");
      isSupported = typeof element[eventName] === "function";
    }
    return isSupported;
  }
};
var syncEvent = (node, eventName, newEventHandler) => {
  const eventStore = node.__events || (node.__events = {});
  const oldEventHandler = eventStore[eventName];
  if (oldEventHandler) {
    node.removeEventListener(eventName, oldEventHandler);
  }
  node.addEventListener(
    eventName,
    eventStore[eventName] = function handler(e) {
      if (newEventHandler) {
        newEventHandler.call(this, e);
      }
    }
  );
};
var arrayToMap = (arr) => {
  const map = /* @__PURE__ */ new Map();
  arr.forEach((s) => map.set(s, s));
  return map;
};
var tagNameTransformer;
var setTagNameTransformer = (_tagNameTransformer) => {
  tagNameTransformer = _tagNameTransformer;
};
var setRef = (ref, value) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref != null) {
    ref.current = value;
  }
};
var mergeRefs = (...refs) => {
  return (value) => {
    refs.forEach((ref) => {
      setRef(ref, value);
    });
  };
};
var createForwardRef = (ReactComponent, displayName) => {
  const forwardRef = (props, ref) => {
    return import_react.default.createElement(ReactComponent, { ...props, forwardedRef: ref });
  };
  forwardRef.displayName = displayName;
  return import_react.default.forwardRef(forwardRef);
};
var createReactComponent = (tagName, ReactComponentContext, manipulatePropsFunction, defineCustomElement) => {
  const displayName = dashToPascalCase(tagName);
  const ReactComponent = class extends import_react.default.Component {
    componentEl;
    setComponentElRef = (element) => {
      this.componentEl = element;
    };
    constructor(props) {
      super(props);
    }
    componentDidMount() {
      this.componentDidUpdate(this.props);
    }
    componentDidUpdate(prevProps) {
      attachProps(this.componentEl, this.props, prevProps);
    }
    render() {
      const { children, forwardedRef, style, className, ref, ...cProps } = this.props;
      let propsToPass = Object.keys(cProps).reduce((acc, name) => {
        const value = cProps[name];
        if (name.indexOf("on") === 0 && name[2] === name[2].toUpperCase()) {
          const eventName = name.substring(2).toLowerCase();
          if (typeof document !== "undefined" && isCoveredByReact(eventName)) {
            acc[name] = value;
          }
        } else {
          const type = typeof value;
          if (type === "string" || type === "boolean" || type === "number") {
            acc[camelToDashCase(name)] = value;
          }
        }
        return acc;
      }, {});
      const newProps = {
        ...propsToPass,
        ref: mergeRefs(forwardedRef, this.setComponentElRef),
        style
      };
      const newTagName = typeof tagNameTransformer === "function" ? tagNameTransformer(tagName) : tagName;
      return (0, import_react.createElement)(newTagName, newProps, children);
    }
    static get displayName() {
      return displayName;
    }
  };
  return createForwardRef(ReactComponent, displayName);
};
var KolAbbr = createReactComponent("kol-abbr");
var KolAccordion = createReactComponent("kol-accordion");
var KolAlert = createReactComponent("kol-alert");
var KolAvatar = createReactComponent("kol-avatar");
var KolBadge = createReactComponent("kol-badge");
var KolBreadcrumb = createReactComponent("kol-breadcrumb");
var KolButton = createReactComponent("kol-button");
var KolButtonLink = createReactComponent("kol-button-link");
var KolCard = createReactComponent("kol-card");
var KolCombobox = createReactComponent("kol-combobox");
var KolDetails = createReactComponent("kol-details");
var KolDialog = createReactComponent("kol-dialog");
var KolDrawer = createReactComponent("kol-drawer");
var KolForm = createReactComponent("kol-form");
var KolHeading = createReactComponent("kol-heading");
var KolIcon = createReactComponent("kol-icon");
var KolImage = createReactComponent("kol-image");
var KolInputCheckbox = createReactComponent("kol-input-checkbox");
var KolInputColor = createReactComponent("kol-input-color");
var KolInputDate = createReactComponent("kol-input-date");
var KolInputEmail = createReactComponent("kol-input-email");
var KolInputFile = createReactComponent("kol-input-file");
var KolInputNumber = createReactComponent("kol-input-number");
var KolInputPassword = createReactComponent("kol-input-password");
var KolInputRadio = createReactComponent("kol-input-radio");
var KolInputRange = createReactComponent("kol-input-range");
var KolInputText = createReactComponent("kol-input-text");
var KolKolibri = createReactComponent("kol-kolibri");
var KolLink = createReactComponent("kol-link");
var KolLinkButton = createReactComponent("kol-link-button");
var KolMeter = createReactComponent("kol-meter");
var KolModal = createReactComponent("kol-modal");
var KolNav = createReactComponent("kol-nav");
var KolPagination = createReactComponent("kol-pagination");
var KolPopoverButton = createReactComponent("kol-popover-button");
var KolProgress = createReactComponent("kol-progress");
var KolQuote = createReactComponent("kol-quote");
var KolSelect = createReactComponent("kol-select");
var KolSingleSelect = createReactComponent("kol-single-select");
var KolSkipNav = createReactComponent("kol-skip-nav");
var KolSpin = createReactComponent("kol-spin");
var KolSplitButton = createReactComponent("kol-split-button");
var KolTableStateful = createReactComponent("kol-table-stateful");
var KolTableStateless = createReactComponent("kol-table-stateless");
var KolTabs = createReactComponent("kol-tabs");
var KolTextarea = createReactComponent("kol-textarea");
var KolToolbar = createReactComponent("kol-toolbar");
var KolTree = createReactComponent("kol-tree");
var KolTreeItem = createReactComponent("kol-tree-item");
var KolVersion = createReactComponent("kol-version");
function createReactRenderElement(hostElement) {
  const renderElement = document.createElement("div");
  renderElement.setAttribute("role", "presentation");
  hostElement.innerHTML = "";
  hostElement.appendChild(renderElement);
  return renderElement;
}
export {
  KolAbbr,
  KolAccordion,
  KolAlert,
  KolAvatar,
  KolBadge,
  KolBreadcrumb,
  KolButton,
  KolButtonLink,
  KolCard,
  KolCombobox,
  KolDetails,
  KolDialog,
  KolDrawer,
  KolForm,
  KolHeading,
  KolIcon,
  KolImage,
  KolInputCheckbox,
  KolInputColor,
  KolInputDate,
  KolInputEmail,
  KolInputFile,
  KolInputNumber,
  KolInputPassword,
  KolInputRadio,
  KolInputRange,
  KolInputText,
  KolKolibri,
  KolLink,
  KolLinkButton,
  KolMeter,
  KolModal,
  KolNav,
  KolPagination,
  KolPopoverButton,
  KolProgress,
  KolQuote,
  KolSelect,
  KolSingleSelect,
  KolSkipNav,
  KolSpin,
  KolSplitButton,
  KolTableStateful,
  KolTableStateless,
  KolTabs,
  KolTextarea,
  KolToolbar,
  KolTree,
  KolTreeItem,
  KolVersion,
  createReactRenderElement,
  setTagNameTransformer
};
//# sourceMappingURL=@public-ui_react-v19.js.map
