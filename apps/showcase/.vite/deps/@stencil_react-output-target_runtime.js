import {
  require_react
} from "./chunk-MTCZB3O7.js";
import {
  __toESM
} from "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@lit+react@1.0.8_@types+react@19.2.2/node_modules/@lit/react/development/create-component.js
var NODE_MODE = false;
var DEV_MODE = true;
var reservedReactProperties = /* @__PURE__ */ new Set([
  "children",
  "localName",
  "ref",
  "style",
  "className"
]);
var listenedEvents = /* @__PURE__ */ new WeakMap();
var addOrUpdateEventListener = (node, event, listener) => {
  let events = listenedEvents.get(node);
  if (events === void 0) {
    listenedEvents.set(node, events = /* @__PURE__ */ new Map());
  }
  let handler = events.get(event);
  if (listener !== void 0) {
    if (handler === void 0) {
      events.set(event, handler = { handleEvent: listener });
      node.addEventListener(event, handler);
    } else {
      handler.handleEvent = listener;
    }
  } else if (handler !== void 0) {
    events.delete(event);
    node.removeEventListener(event, handler);
  }
};
var setProperty = (node, name, value, old, events) => {
  const event = events?.[name];
  if (event !== void 0) {
    if (value !== old) {
      addOrUpdateEventListener(node, event, value);
    }
    return;
  }
  node[name] = value;
  if ((value === void 0 || value === null) && name in HTMLElement.prototype) {
    node.removeAttribute(name);
  }
};
var createComponent = ({ react: React, tagName, elementClass, events, displayName }) => {
  const eventProps = new Set(Object.keys(events ?? {}));
  if (DEV_MODE && !NODE_MODE) {
    for (const p2 of reservedReactProperties) {
      if (p2 in elementClass.prototype && !(p2 in HTMLElement.prototype)) {
        console.warn(`${tagName} contains property ${p2} which is a React reserved property. It will be used by React and not set on the element.`);
      }
    }
  }
  const ReactComponent = React.forwardRef((props, ref) => {
    const prevElemPropsRef = React.useRef(/* @__PURE__ */ new Map());
    const elementRef = React.useRef(null);
    const reactProps = {};
    const elementProps = {};
    for (const [k, v] of Object.entries(props)) {
      if (reservedReactProperties.has(k)) {
        reactProps[k === "className" ? "class" : k] = v;
        continue;
      }
      if (eventProps.has(k) || k in elementClass.prototype) {
        elementProps[k] = v;
        continue;
      }
      reactProps[k] = v;
    }
    if (!NODE_MODE) {
      React.useLayoutEffect(() => {
        if (elementRef.current === null) {
          return;
        }
        const newElemProps = /* @__PURE__ */ new Map();
        for (const key in elementProps) {
          setProperty(elementRef.current, key, props[key], prevElemPropsRef.current.get(key), events);
          prevElemPropsRef.current.delete(key);
          newElemProps.set(key, props[key]);
        }
        for (const [key, value] of prevElemPropsRef.current) {
          setProperty(elementRef.current, key, void 0, value, events);
        }
        prevElemPropsRef.current = newElemProps;
      });
      React.useLayoutEffect(() => {
        elementRef.current?.removeAttribute("defer-hydration");
      }, []);
    }
    if (NODE_MODE) {
      if ((React.createElement.name === "litPatchedCreateElement" || globalThis.litSsrReactEnabled) && Object.keys(elementProps).length) {
        reactProps["_$litProps$"] = elementProps;
      }
    } else {
      reactProps["suppressHydrationWarning"] = true;
    }
    return React.createElement(tagName, {
      ...reactProps,
      ref: React.useCallback((node) => {
        elementRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref !== null) {
          ref.current = node;
        }
      }, [ref])
    });
  });
  ReactComponent.displayName = displayName ?? elementClass.name;
  return ReactComponent;
};

// ../../node_modules/.pnpm/@stencil+react-output-target@1.8.1_@stencil+core@4.45.3_@types+react@19.2.2_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/@stencil/react-output-target/dist/create-component-ICzm58MY.js
var import_react2 = __toESM(require_react(), 1);
var p = (s) => s ? s.split(/\s+/).filter(Boolean) : [];
var w = (s, r, l) => {
  const o = new Set(p(r)), f = new Set(p(l)), c = [];
  for (const e of s)
    o.has(e) ? (c.push(e), o.delete(e)) : f.has(e) || c.push(e);
  for (const e of o)
    c.push(e);
  return c.join(" ");
};
var g = typeof window < "u" ? import_react2.default.useLayoutEffect : import_react2.default.useEffect;
var L = ({
  defineCustomElement: s,
  tagName: r,
  transformTag: l,
  ...o
}) => {
  typeof s < "u" && s();
  const f = l ? l(r) : r, c = createComponent({ ...o, tagName: f }), e = import_react2.default.forwardRef((N, a) => {
    const {
      className: C,
      class: d,
      ...y
    } = N, u = C ?? d ?? "", m = import_react2.default.useRef(null), i = import_react2.default.useRef("");
    g(() => {
      const t = m.current;
      t === null || u === i.current || (t.className = w(Array.from(t.classList), u, i.current), i.current = u);
    });
    const R = import_react2.default.useCallback(
      (t) => {
        m.current = t, typeof a == "function" ? a(t) : a != null && (a.current = t);
      },
      [a]
    );
    return import_react2.default.createElement(c, { ...y, ref: R });
  });
  return e.displayName = o.displayName ?? f, e;
};
export {
  L as createComponent
};
//# sourceMappingURL=@stencil_react-output-target_runtime.js.map
