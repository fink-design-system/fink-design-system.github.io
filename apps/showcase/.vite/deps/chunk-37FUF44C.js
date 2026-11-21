// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/common-BdSzSIXg.js
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var loglevel$1 = { exports: {} };
var loglevel = loglevel$1.exports;
var hasRequiredLoglevel;
function requireLoglevel() {
  if (hasRequiredLoglevel) return loglevel$1.exports;
  hasRequiredLoglevel = 1;
  (function(module) {
    (function(root, definition) {
      if (module.exports) {
        module.exports = definition();
      } else {
        root.log = definition();
      }
    })(loglevel, function() {
      var noop = function() {
      };
      var undefinedType = "undefined";
      var isIE = typeof window !== undefinedType && typeof window.navigator !== undefinedType && /Trident\/|MSIE /.test(window.navigator.userAgent);
      var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
      ];
      var _loggersByName = {};
      var defaultLogger = null;
      function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === "function") {
          return method.bind(obj);
        } else {
          try {
            return Function.prototype.bind.call(method, obj);
          } catch (e2) {
            return function() {
              return Function.prototype.apply.apply(method, [obj, arguments]);
            };
          }
        }
      }
      function traceForIE() {
        if (console.log) {
          if (console.log.apply) {
            console.log.apply(console, arguments);
          } else {
            Function.prototype.apply.apply(console.log, [console, arguments]);
          }
        }
        if (console.trace) console.trace();
      }
      function realMethod(methodName) {
        if (methodName === "debug") {
          methodName = "log";
        }
        if (typeof console === undefinedType) {
          return false;
        } else if (methodName === "trace" && isIE) {
          return traceForIE;
        } else if (console[methodName] !== void 0) {
          return bindMethod(console, methodName);
        } else if (console.log !== void 0) {
          return bindMethod(console, "log");
        } else {
          return noop;
        }
      }
      function replaceLoggingMethods() {
        var level = this.getLevel();
        for (var i2 = 0; i2 < logMethods.length; i2++) {
          var methodName = logMethods[i2];
          this[methodName] = i2 < level ? noop : this.methodFactory(methodName, level, this.name);
        }
        this.log = this.debug;
        if (typeof console === undefinedType && level < this.levels.SILENT) {
          return "No console available for logging";
        }
      }
      function enableLoggingWhenConsoleArrives(methodName) {
        return function() {
          if (typeof console !== undefinedType) {
            replaceLoggingMethods.call(this);
            this[methodName].apply(this, arguments);
          }
        };
      }
      function defaultMethodFactory(methodName, _level, _loggerName) {
        return realMethod(methodName) || enableLoggingWhenConsoleArrives.apply(this, arguments);
      }
      function Logger2(name, factory) {
        var self = this;
        var inheritedLevel;
        var defaultLevel;
        var userLevel;
        var storageKey = "loglevel";
        if (typeof name === "string") {
          storageKey += ":" + name;
        } else if (typeof name === "symbol") {
          storageKey = void 0;
        }
        function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || "silent").toUpperCase();
          if (typeof window === undefinedType || !storageKey) return;
          try {
            window.localStorage[storageKey] = levelName;
            return;
          } catch (ignore) {
          }
          try {
            window.document.cookie = encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {
          }
        }
        function getPersistedLevel() {
          var storedLevel;
          if (typeof window === undefinedType || !storageKey) return;
          try {
            storedLevel = window.localStorage[storageKey];
          } catch (ignore) {
          }
          if (typeof storedLevel === undefinedType) {
            try {
              var cookie = window.document.cookie;
              var cookieName = encodeURIComponent(storageKey);
              var location = cookie.indexOf(cookieName + "=");
              if (location !== -1) {
                storedLevel = /^([^;]+)/.exec(
                  cookie.slice(location + cookieName.length + 1)
                )[1];
              }
            } catch (ignore) {
            }
          }
          if (self.levels[storedLevel] === void 0) {
            storedLevel = void 0;
          }
          return storedLevel;
        }
        function clearPersistedLevel() {
          if (typeof window === undefinedType || !storageKey) return;
          try {
            window.localStorage.removeItem(storageKey);
          } catch (ignore) {
          }
          try {
            window.document.cookie = encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch (ignore) {
          }
        }
        function normalizeLevel(input) {
          var level = input;
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== void 0) {
            level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
            return level;
          } else {
            throw new TypeError("log.setLevel() called with invalid level: " + input);
          }
        }
        self.name = name;
        self.levels = {
          "TRACE": 0,
          "DEBUG": 1,
          "INFO": 2,
          "WARN": 3,
          "ERROR": 4,
          "SILENT": 5
        };
        self.methodFactory = factory || defaultMethodFactory;
        self.getLevel = function() {
          if (userLevel != null) {
            return userLevel;
          } else if (defaultLevel != null) {
            return defaultLevel;
          } else {
            return inheritedLevel;
          }
        };
        self.setLevel = function(level, persist) {
          userLevel = normalizeLevel(level);
          if (persist !== false) {
            persistLevelIfPossible(userLevel);
          }
          return replaceLoggingMethods.call(self);
        };
        self.setDefaultLevel = function(level) {
          defaultLevel = normalizeLevel(level);
          if (!getPersistedLevel()) {
            self.setLevel(level, false);
          }
        };
        self.resetLevel = function() {
          userLevel = null;
          clearPersistedLevel();
          replaceLoggingMethods.call(self);
        };
        self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
        };
        self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
        };
        self.rebuild = function() {
          if (defaultLogger !== self) {
            inheritedLevel = normalizeLevel(defaultLogger.getLevel());
          }
          replaceLoggingMethods.call(self);
          if (defaultLogger === self) {
            for (var childName in _loggersByName) {
              _loggersByName[childName].rebuild();
            }
          }
        };
        inheritedLevel = normalizeLevel(
          defaultLogger ? defaultLogger.getLevel() : "WARN"
        );
        var initialLevel = getPersistedLevel();
        if (initialLevel != null) {
          userLevel = normalizeLevel(initialLevel);
        }
        replaceLoggingMethods.call(self);
      }
      defaultLogger = new Logger2();
      defaultLogger.getLogger = function getLogger(name) {
        if (typeof name !== "symbol" && typeof name !== "string" || name === "") {
          throw new TypeError("You must supply a name when creating a logger.");
        }
        var logger = _loggersByName[name];
        if (!logger) {
          logger = _loggersByName[name] = new Logger2(
            name,
            defaultLogger.methodFactory
          );
        }
        return logger;
      };
      var _log = typeof window !== undefinedType ? window.log : void 0;
      defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType && window.log === defaultLogger) {
          window.log = _log;
        }
        return defaultLogger;
      };
      defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
      };
      defaultLogger["default"] = defaultLogger;
      return defaultLogger;
    });
  })(loglevel$1);
  return loglevel$1.exports;
}
var loglevelExports = requireLoglevel();
var f$1 = getDefaultExportFromCjs(loglevelExports);
var k = (t2, e2) => (s2) => s2(t2, e2);
var G = (t2, e2, s2) => (o2) => o2(t2, e2, { append: false }, s2);
var x = () => {
  const t2 = typeof process < "u" && process.env ? process.env : {}, e2 = t2.NODE_ENV === "test", s2 = "VITEST" in t2, o2 = "JEST_WORKER_ID" in t2, a2 = "PLAYWRIGHT_TEST_BASE_URL" in t2, r2 = t2.CI === "true", i2 = t2.TEST === "true" || t2.IS_TEST === "true", c2 = typeof navigator < "u" && navigator.webdriver === true, m = typeof navigator < "u" && /playwright|puppeteer|webdriver|selenium|testcafe/i.test(navigator.userAgent);
  return e2 || s2 || o2 || a2 || r2 || i2 || c2 || m;
};
var n$1 = { A11yUi: { CSS_STYLE_CACHE: /* @__PURE__ */ new Map(), FEATURES: {}, IS_TEST_ENVIRONMENT: x(), PERFORMANCE_MEASURES: /* @__PURE__ */ new Map(), STYLING_TASK_QUEUE: /* @__PURE__ */ new Map(), THEMES: /* @__PURE__ */ new Map(), THEME_FEATURES: {}, showAverageTimes: () => {
  const t2 = {};
  for (const [s2, o2] of n$1.A11yUi.PERFORMANCE_MEASURES.entries()) t2[s2] = [o2.totalTime / o2.count, o2.count];
  const e2 = Object.entries(t2).sort((s2, o2) => o2[1][0] - s2[1][0]);
  return console.table(Object.fromEntries(e2.map(([s2, [o2, a2]]) => [s2, { "avg (ms)": parseFloat(o2.toFixed(2)), count: a2 }]))), t2;
} } };
var E = true;
var u$1 = false;
var K = /^[a-z][a-z0-9]{1,}(-[a-z0-9]+)?$/;
var B = (t2) => typeof t2 == "string" && K.test(t2);
var U = (t2) => {
  if (!B(t2)) throw new Error(`[Theming] The theme identifier "${typeof t2 == "string" ? t2 : ""}" (Type: ${typeof t2}) is not valid. Please use only follow this pattern: /^[a-z][a-z0-9]{1,}(-[a-z0-9]+)?$/`);
};
var b = (t2) => t2.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*([{},;])\s*/g, "$1").replace(/:\s+/g, ":").replace(/\s+/g, " ").replace(/;\}/g, "}").trim();
var D = (t2, e2, s2, o2) => p(t2, e2, s2, o2);
var p = (t2, e2, s2, o2) => {
  o2 = o2 ?? {}, o2.append = o2.append ?? false, U(t2), E && !u$1 && (u$1 = true, f$1.warn(`[Theming] The theme process is locked. This means that the theme "${t2}" should not be patched.

    import { register } from 'adopted-style-sheets';
    import { defineCustomElements } from '...';
    import { THEME } from '...';

    register(THEME, defineCustomElements)
    .then(() => {
        // run your app or website
    })
    .catch(console.warn);`));
  let a2 = n$1.A11yUi.THEMES.get(t2);
  if (a2 || (a2 = /* @__PURE__ */ new Map(), n$1.A11yUi.THEMES.set(t2, a2)), o2.append && a2.has(e2)) {
    const r2 = a2.get(e2);
    a2.set(e2, b(`${r2}${s2}`));
  } else a2.set(e2, b(s2));
};
var z = (t2, e2, s2, o2) => g(t2, e2, s2, o2);
var g = (t2, e2, s2, o2) => (U(t2), typeof e2 == "object" && e2 !== null && Object.getOwnPropertyNames(e2).forEach((a2) => {
  const r2 = e2[a2], i2 = a2.toLowerCase(), c2 = typeof o2?.transformTagName == "function" && !["GLOBAL", "PROPERTIES"].includes(a2) ? o2.transformTagName(i2) : a2;
  typeof r2 == "string" && r2.length > 0 && p(t2, c2.toUpperCase(), r2, s2);
}), t2);
var C = (t2) => {
  if (t2 instanceof HTMLElement) {
    if (typeof t2.dataset.theme == "string") return t2;
    {
      let e2 = t2.parentNode;
      for (; typeof ShadowRoot < "u" && e2 instanceof ShadowRoot; ) e2 = e2.host;
      return C(e2);
    }
  } else return null;
};
var M = (t2 = {}) => t2.themeEncroachCss === "false" || t2.themeReset === "true" ? false : { mode: t2.themeEncroachCssMode === "after" || t2.themeEncroachCssMode === "before" ? t2.themeEncroachCssMode : "before" };
var y = () => typeof n$1.A11yUi.Theme == "object" && n$1.A11yUi.Theme !== null && typeof n$1.A11yUi.Theme.cache == "boolean" && typeof n$1.A11yUi.Theme.encroachCss == "object" && n$1.A11yUi.Theme.encroachCss !== null && typeof n$1.A11yUi.Theme.encroachCss.mode == "string" && typeof n$1.A11yUi.Theme.name == "string";
var Q = () => !(typeof n$1.A11yUi.Theme == "object" && n$1.A11yUi.Theme !== null) || n$1.A11yUi.Theme.name !== "default";
var w = (t2) => {
  if (y()) return n$1.A11yUi.Theme;
  {
    const e2 = { cache: true, encroachCss: M(), loglevel: "silent", mode: "csr", name: null }, s2 = C(t2);
    return s2 instanceof HTMLElement && (e2.cache = s2.dataset.themeCache !== "false", e2.encroachCss = M(s2.dataset), e2.loglevel = s2.dataset.themeLoglevel === "debug" ? s2.dataset.themeLoglevel : "silent", e2.mode = s2.dataset.themeMode === "ssr" ? s2.dataset.themeMode : "csr", e2.name = s2.dataset.theme || null), e2;
  }
};
var v = (t2) => w(t2).name;
var R = () => y() ? n$1.A11yUi.Theme.name : null;
var W = (t2, e2) => ({ cache: e2.cache !== false, detect: e2.detect === "auto" ? "auto" : "fixed", encroachCss: e2.encroachCss === false ? false : typeof e2.encroachCss == "object" && e2.encroachCss != null && (e2.encroachCss.mode === "after" || e2.encroachCss.mode === "before") ? e2.encroachCss : { mode: "before" }, loglevel: e2.loglevel === "debug" ? e2.loglevel : "silent", mode: e2.mode === "ssr" ? e2.mode : "csr", name: typeof e2.name == "string" ? e2.name : t2 });
var q = (t2, e2) => {
  y() === false && Q() && typeof e2 == "object" && e2 !== null && (e2 = W(t2, e2), e2.detect === "fixed" ? (e2.name === null && typeof t2 == "string" && (e2.name = t2), t2 === e2.name && (n$1.A11yUi.Theme = e2, f$1.info(`[Theming] Theme "${t2}" was set as default theme.`))) : u$1 || (u$1 = true, f$1.warn("[Theming] The presetting of theme options is only relevant by using 'fixed' detection mode.")));
};
var A = (...t2) => {
  const e2 = {};
  for (const s2 of t2) s2 && Object.assign(e2, s2);
  return e2;
};
var X = (t2, e2) => {
  const s2 = n$1.A11yUi.FEATURES[t2];
  if (s2 !== void 0) return s2;
  const o2 = v(e2 ?? null) ?? R();
  if (o2 !== null) {
    const a2 = n$1.A11yUi.THEME_FEATURES[o2];
    if (a2 && a2[t2] !== void 0) return a2[t2];
  }
};
var N = false;
var se = (t2, e2, s2 = {}) => {
  N || (N = true, E = false, typeof window < "u" && (window.A11yUi = n$1.A11yUi)), typeof t2 == "function" ? t2 = /* @__PURE__ */ new Set([t2]) : Array.isArray(t2) && (t2 = new Set(t2)), t2 instanceof Set && t2.forEach((a2) => {
    typeof a2 == "function" && a2.length === 1 ? q(a2((r2, i2, c2, m) => (m && (n$1.A11yUi.THEME_FEATURES[r2] = A(n$1.A11yUi.THEME_FEATURES[r2], m)), g(r2, i2, c2, s2))), { cache: s2.theme?.cache, detect: s2.theme?.detect, encroachCss: s2.theme?.encroachCss, mode: s2.theme?.mode, name: s2.theme?.name }) : f$1.error("[Theming] An attempt was made to load an incompatible theme.");
  }), E = true, s2.features && (n$1.A11yUi.FEATURES = A(n$1.A11yUi.FEATURES, s2.features)), typeof e2 == "function" ? e2 = /* @__PURE__ */ new Set([e2]) : Array.isArray(e2) && (e2 = new Set(e2));
  const o2 = [];
  return e2.forEach((a2) => {
    const r2 = a2();
    r2 instanceof Promise && o2.push(r2);
  }), Promise.all(o2);
};
var _ = /* @__PURE__ */ new Set();
var L = /* @__PURE__ */ new Map();
var oe = /--[^;]+/g;
var ae = /:/;
var ne = typeof MutationObserver < "u";
var F = 25;
var H = () => {
  F = Math.min(25 + Math.log2(n$1.A11yUi.STYLING_TASK_QUEUE.size + 1) * 20, 250);
};
var re = (t2, e2) => {
  let s2 = e2.match(oe);
  if (Array.isArray(s2)) {
    s2 = s2.filter((a2) => ae.test(a2));
    const o2 = document.createElement("style");
    o2.innerHTML = `.${t2} {${s2.join(";")}}`, document.querySelector("head")?.appendChild(o2);
  }
  _.add(t2);
};
var T = (t2, e2) => {
  const s2 = n$1.A11yUi.THEMES.get(t2);
  if (s2 instanceof Map) {
    const o2 = s2.get(e2);
    if (o2 !== void 0) return o2;
  }
  return "";
};
var ie = (t2) => {
  const e2 = t2.firstChild;
  if (!(!(e2 instanceof HTMLStyleElement) || e2.dataset.themingFallback !== void 0)) for (const s2 of Array.from(t2.childNodes)) if (s2 instanceof HTMLStyleElement && s2.tagName === "STYLE" && s2.dataset.themingFallback === void 0) t2.removeChild(s2);
  else break;
};
var ce = (t2, e2) => {
  try {
    if (n$1.A11yUi.Theme?.mode === "ssr") throw new Error("SSR");
    const s2 = e2.filter((o2) => typeof o2 == "string" && o2.length > 0).map((o2) => {
      let a2 = L.get(o2);
      return a2 || (a2 = new CSSStyleSheet(), a2.replaceSync(o2), L.set(o2, a2)), a2;
    });
    t2.adoptedStyleSheets = s2;
  } catch {
    for (let o2 = e2.length - 1; o2 >= 0; o2--) {
      const a2 = e2[o2];
      if (typeof a2 != "string" || a2.length === 0) continue;
      const r2 = e2.length - 1 - o2, i2 = document.createElement("style");
      switch (i2.dataset.themingFallback = "", r2) {
        case 4:
          i2.dataset.themingBaseA11y = "";
          break;
        case 3:
          i2.dataset.themingBaseGlobal = "";
          break;
        case 2:
          i2.dataset.themingBaseComponent = "";
          break;
        case 1:
          i2.dataset.themingCustomGlobal = "";
          break;
        case 0:
          i2.dataset.themingCustomComponent = "";
          break;
        default:
          i2.dataset.themingUnknown = "";
          break;
      }
      i2.innerHTML = a2, t2.insertBefore(i2, t2.firstChild);
    }
  }
};
var le = (t2, e2, s2) => {
  if (s2 === false || s2?.mode !== "before" && s2?.mode !== "after") return;
  const o2 = Array.from(t2.childNodes).filter((r2) => r2 instanceof HTMLStyleElement && r2.tagName === "STYLE");
  let a2;
  try {
    a2 = Array.from(t2.adoptedStyleSheets);
  } catch {
    a2 = [];
  }
  if (!(o2.length === 0 && a2.length === 0)) if (s2.mode === "before") {
    const r2 = [...a2.map((i2) => Array.from(i2.cssRules).map((c2) => c2.cssText).join("")), ...o2.map((i2) => i2.innerHTML)];
    e2.unshift(...r2);
  } else o2.forEach((r2) => e2.push(r2.innerHTML)), a2.forEach((r2) => e2.push(Array.from(r2.cssRules).map((i2) => i2.cssText).join("")));
};
var me = (t2, e2, s2) => {
  const o2 = e2.name || "default";
  let a2;
  try {
    if (t2.shadowRoot === null) throw new Error("ShadowRoot is null");
    a2 = t2.shadowRoot;
  } catch {
    a2 = t2;
  }
  const r2 = n$1.A11yUi.CSS_STYLE_CACHE.get(o2)?.get(t2.tagName);
  if (r2) O(t2, a2, r2, s2);
  else {
    const i2 = T(o2, "PROPERTIES"), c2 = T(o2, "GLOBAL"), m = T(o2, t2.tagName);
    _.has(o2) === false && re(o2, c2);
    const d = [i2, c2, m];
    if (le(a2, d, e2.encroachCss), e2.cache === true) {
      let h = n$1.A11yUi.CSS_STYLE_CACHE.get(o2);
      h || (h = /* @__PURE__ */ new Map(), n$1.A11yUi.CSS_STYLE_CACHE.set(o2, h)), h.set(t2.tagName, d);
    }
    O(t2, a2, d, s2);
  }
};
var O = (t2, e2, s2, o2) => {
  const a2 = n$1.A11yUi.Theme?.loglevel === "debug", r2 = a2 ? performance.now() : 0;
  if (ie(e2), ce(e2, s2), Te(t2), requestAnimationFrame(o2), a2) {
    const i2 = performance.now() - r2, c2 = n$1.A11yUi.PERFORMANCE_MEASURES.get(t2.tagName);
    c2 ? (c2.count += 1, c2.totalTime += i2) : n$1.A11yUi.PERFORMANCE_MEASURES.set(t2.tagName, { count: 1, totalTime: i2 });
  }
};
var I = (t2) => {
  const e2 = n$1.A11yUi.STYLING_TASK_QUEUE.get(t2);
  if (e2) {
    const { resetCss: s2, themeDetails: o2 } = e2;
    me(t2, o2, s2);
  }
};
var he = 100;
var S = (t2, e2 = 0) => {
  if (e2 >= he) return;
  const s2 = setTimeout(() => {
    clearTimeout(s2), t2.classList.contains("hydrated") ? I(t2) : S(t2, e2 + 1);
  }, F);
};
var fe = { attributes: true, attributeFilter: ["class"], childList: false, subtree: false };
var ue = { attributes: true, attributeFilter: [], childList: false, subtree: false };
var P = ne ? new MutationObserver((t2, e2) => {
  const s2 = [];
  for (const o2 of t2) {
    const a2 = o2.target;
    a2.classList.contains("hydrated") && n$1.A11yUi.STYLING_TASK_QUEUE.has(a2) && (I(a2), s2.push(a2));
  }
  for (const o2 of s2) e2.observe(o2, ue);
}) : null;
P && (S = (t2) => P.observe(t2, fe), H = () => {
});
var $ = /* @__PURE__ */ new Map();
var j = (t2, e2) => {
  if (e2) {
    const a2 = $.get(e2);
    if (a2 !== void 0) return a2;
  }
  const s2 = getComputedStyle(t2).getPropertyValue("--theme-visibility-delay").trim();
  let o2;
  if (s2.endsWith("ms")) o2 = parseFloat(s2);
  else if (s2.endsWith("s")) o2 = parseFloat(s2) * 1e3;
  else {
    const a2 = parseFloat(s2);
    o2 = isNaN(a2) ? 0 : a2;
  }
  return e2 && $.set(e2, o2), o2;
};
n$1.A11yUi.IS_TEST_ENVIRONMENT && (j = () => 0);
var Y = (t2, e2) => {
  t2.style.setProperty("visibility", e2), t2.dataset.themed = "";
};
var ye = (t2, e2) => {
  const s2 = t2.style.visibility || null, o2 = e2.name || "default";
  n$1.A11yUi.STYLING_TASK_QUEUE.set(t2, { resetCss: () => {
    const a2 = j(t2, o2);
    a2 > 0 ? setTimeout(() => {
      Y(t2, s2);
    }, a2) : Y(t2, s2);
  }, themeDetails: e2 }), e2.mode !== "ssr" && t2.style.setProperty("visibility", "hidden", "important"), S(t2);
};
var Te = (t2) => {
  n$1.A11yUi.STYLING_TASK_QUEUE.delete(t2), H();
};
var de = (t2, e2) => {
  ye(t2, { ...n$1.A11yUi.Theme, ...e2 });
};
var Ee = class {
  Prefix;
  Key;
  Tag;
  createTheme = (e2, s2, o2) => G(e2, s2, o2);
  createTranslation = (e2, s2) => k(e2, s2);
  constructor(e2, s2, o2) {
    this.Prefix = e2, this.Key = Object.getOwnPropertyNames(s2), this.Tag = Object.getOwnPropertyNames(o2);
  }
};
var KeyEnum;
(function(KeyEnum2) {
  KeyEnum2[KeyEnum2["action-done"] = 0] = "action-done";
  KeyEnum2[KeyEnum2["action-running"] = 1] = "action-running";
  KeyEnum2[KeyEnum2["avatar-alt"] = 2] = "avatar-alt";
  KeyEnum2[KeyEnum2["character-counter-current"] = 3] = "character-counter-current";
  KeyEnum2[KeyEnum2["character-counter-current-of-max"] = 4] = "character-counter-current-of-max";
  KeyEnum2[KeyEnum2["character-counter-current-of-max-aria"] = 5] = "character-counter-current-of-max-aria";
  KeyEnum2[KeyEnum2["character-counter-max-aria"] = 6] = "character-counter-max-aria";
  KeyEnum2[KeyEnum2["character-limit-exceeded"] = 7] = "character-limit-exceeded";
  KeyEnum2[KeyEnum2["character-limit-hint"] = 8] = "character-limit-hint";
  KeyEnum2[KeyEnum2["character-limit-remaining"] = 9] = "character-limit-remaining";
  KeyEnum2[KeyEnum2["clear-search"] = 10] = "clear-search";
  KeyEnum2[KeyEnum2["close"] = 11] = "close";
  KeyEnum2[KeyEnum2["close-alert"] = 12] = "close-alert";
  KeyEnum2[KeyEnum2["data-browse-text"] = 13] = "data-browse-text";
  KeyEnum2[KeyEnum2["delete-selection"] = 14] = "delete-selection";
  KeyEnum2[KeyEnum2["entries-per-site"] = 15] = "entries-per-site";
  KeyEnum2[KeyEnum2["error"] = 16] = "error";
  KeyEnum2[KeyEnum2["error-list"] = 17] = "error-list";
  KeyEnum2[KeyEnum2["error-list-message"] = 18] = "error-list-message";
  KeyEnum2[KeyEnum2["filename-text"] = 19] = "filename-text";
  KeyEnum2[KeyEnum2["form-description"] = 20] = "form-description";
  KeyEnum2[KeyEnum2["hide-password"] = 21] = "hide-password";
  KeyEnum2[KeyEnum2["info"] = 22] = "info";
  KeyEnum2[KeyEnum2["kolibri-logo"] = 23] = "kolibri-logo";
  KeyEnum2[KeyEnum2["live-value"] = 24] = "live-value";
  KeyEnum2[KeyEnum2["live-value-bounded"] = 25] = "live-value-bounded";
  KeyEnum2[KeyEnum2["message"] = 26] = "message";
  KeyEnum2[KeyEnum2["meter-state-critical"] = 27] = "meter-state-critical";
  KeyEnum2[KeyEnum2["meter-state-optimum"] = 28] = "meter-state-optimum";
  KeyEnum2[KeyEnum2["meter-state-suboptimal"] = 29] = "meter-state-suboptimal";
  KeyEnum2[KeyEnum2["nav-maximize"] = 30] = "nav-maximize";
  KeyEnum2[KeyEnum2["nav-minimize"] = 31] = "nav-minimize";
  KeyEnum2[KeyEnum2["new"] = 32] = "new";
  KeyEnum2[KeyEnum2["no-entries"] = 33] = "no-entries";
  KeyEnum2[KeyEnum2["no-results-message"] = 34] = "no-results-message";
  KeyEnum2[KeyEnum2["open-link-in-tab"] = 35] = "open-link-in-tab";
  KeyEnum2[KeyEnum2["page"] = 36] = "page";
  KeyEnum2[KeyEnum2["page-back"] = 37] = "page-back";
  KeyEnum2[KeyEnum2["page-first"] = 38] = "page-first";
  KeyEnum2[KeyEnum2["page-last"] = 39] = "page-last";
  KeyEnum2[KeyEnum2["page-next"] = 40] = "page-next";
  KeyEnum2[KeyEnum2["pagination"] = 41] = "pagination";
  KeyEnum2[KeyEnum2["pagination-position-bottom"] = 42] = "pagination-position-bottom";
  KeyEnum2[KeyEnum2["pagination-position-top"] = 43] = "pagination-position-top";
  KeyEnum2[KeyEnum2["progress"] = 44] = "progress";
  KeyEnum2[KeyEnum2["readonly"] = 45] = "readonly";
  KeyEnum2[KeyEnum2["show-password"] = 46] = "show-password";
  KeyEnum2[KeyEnum2["show-suggestions"] = 47] = "show-suggestions";
  KeyEnum2[KeyEnum2["sort"] = 48] = "sort";
  KeyEnum2[KeyEnum2["split-button-dropdown-label-open"] = 49] = "split-button-dropdown-label-open";
  KeyEnum2[KeyEnum2["success"] = 50] = "success";
  KeyEnum2[KeyEnum2["table-data-loading"] = 51] = "table-data-loading";
  KeyEnum2[KeyEnum2["table-data-loaded"] = 52] = "table-data-loaded";
  KeyEnum2[KeyEnum2["table-pagination-label"] = 53] = "table-pagination-label";
  KeyEnum2[KeyEnum2["table-selection"] = 54] = "table-selection";
  KeyEnum2[KeyEnum2["table-selection-all"] = 55] = "table-selection-all";
  KeyEnum2[KeyEnum2["table-selection-indeterminate"] = 56] = "table-selection-indeterminate";
  KeyEnum2[KeyEnum2["table-selection-none"] = 57] = "table-selection-none";
  KeyEnum2[KeyEnum2["table-settings"] = 58] = "table-settings";
  KeyEnum2[KeyEnum2["table-settings-apply"] = 59] = "table-settings-apply";
  KeyEnum2[KeyEnum2["table-settings-cancel"] = 60] = "table-settings-cancel";
  KeyEnum2[KeyEnum2["table-settings-column-hidable"] = 61] = "table-settings-column-hidable";
  KeyEnum2[KeyEnum2["table-settings-column-not-hidable"] = 62] = "table-settings-column-not-hidable";
  KeyEnum2[KeyEnum2["table-settings-column-width"] = 63] = "table-settings-column-width";
  KeyEnum2[KeyEnum2["table-settings-error-all-invisible"] = 64] = "table-settings-error-all-invisible";
  KeyEnum2[KeyEnum2["table-settings-move-down"] = 65] = "table-settings-move-down";
  KeyEnum2[KeyEnum2["table-settings-move-up"] = 66] = "table-settings-move-up";
  KeyEnum2[KeyEnum2["table-settings-not-move"] = 67] = "table-settings-not-move";
  KeyEnum2[KeyEnum2["table-sort-order"] = 68] = "table-sort-order";
  KeyEnum2[KeyEnum2["table-visible-range"] = 69] = "table-visible-range";
  KeyEnum2[KeyEnum2["toast-close-all"] = 70] = "toast-close-all";
  KeyEnum2[KeyEnum2["version"] = 71] = "version";
  KeyEnum2[KeyEnum2["warning"] = 72] = "warning";
})(KeyEnum || (KeyEnum = {}));
var TagEnum;
(function(TagEnum2) {
  TagEnum2[TagEnum2["abbr"] = 0] = "abbr";
  TagEnum2[TagEnum2["accordion"] = 1] = "accordion";
  TagEnum2[TagEnum2["alert"] = 2] = "alert";
  TagEnum2[TagEnum2["avatar"] = 3] = "avatar";
  TagEnum2[TagEnum2["badge"] = 4] = "badge";
  TagEnum2[TagEnum2["breadcrumb"] = 5] = "breadcrumb";
  TagEnum2[TagEnum2["button"] = 6] = "button";
  TagEnum2[TagEnum2["button-link"] = 7] = "button-link";
  TagEnum2[TagEnum2["card"] = 8] = "card";
  TagEnum2[TagEnum2["combobox"] = 9] = "combobox";
  TagEnum2[TagEnum2["details"] = 10] = "details";
  TagEnum2[TagEnum2["dialog"] = 11] = "dialog";
  TagEnum2[TagEnum2["drawer"] = 12] = "drawer";
  TagEnum2[TagEnum2["form"] = 13] = "form";
  TagEnum2[TagEnum2["heading"] = 14] = "heading";
  TagEnum2[TagEnum2["icon"] = 15] = "icon";
  TagEnum2[TagEnum2["image"] = 16] = "image";
  TagEnum2[TagEnum2["input-checkbox"] = 17] = "input-checkbox";
  TagEnum2[TagEnum2["input-color"] = 18] = "input-color";
  TagEnum2[TagEnum2["input-date"] = 19] = "input-date";
  TagEnum2[TagEnum2["input-email"] = 20] = "input-email";
  TagEnum2[TagEnum2["input-file"] = 21] = "input-file";
  TagEnum2[TagEnum2["input-number"] = 22] = "input-number";
  TagEnum2[TagEnum2["input-password"] = 23] = "input-password";
  TagEnum2[TagEnum2["input-radio"] = 24] = "input-radio";
  TagEnum2[TagEnum2["input-range"] = 25] = "input-range";
  TagEnum2[TagEnum2["input-text"] = 26] = "input-text";
  TagEnum2[TagEnum2["kolibri"] = 27] = "kolibri";
  TagEnum2[TagEnum2["link"] = 28] = "link";
  TagEnum2[TagEnum2["link-button"] = 29] = "link-button";
  TagEnum2[TagEnum2["logo"] = 30] = "logo";
  TagEnum2[TagEnum2["meter"] = 31] = "meter";
  TagEnum2[TagEnum2["modal"] = 32] = "modal";
  TagEnum2[TagEnum2["nav"] = 33] = "nav";
  TagEnum2[TagEnum2["pagination"] = 34] = "pagination";
  TagEnum2[TagEnum2["popover-button"] = 35] = "popover-button";
  TagEnum2[TagEnum2["progress"] = 36] = "progress";
  TagEnum2[TagEnum2["quote"] = 37] = "quote";
  TagEnum2[TagEnum2["select"] = 38] = "select";
  TagEnum2[TagEnum2["single-select"] = 39] = "single-select";
  TagEnum2[TagEnum2["skip-nav"] = 40] = "skip-nav";
  TagEnum2[TagEnum2["spin"] = 41] = "spin";
  TagEnum2[TagEnum2["split-button"] = 42] = "split-button";
  TagEnum2[TagEnum2["symbol"] = 43] = "symbol";
  TagEnum2[TagEnum2["table"] = 44] = "table";
  TagEnum2[TagEnum2["table-stateful"] = 45] = "table-stateful";
  TagEnum2[TagEnum2["table-stateless"] = 46] = "table-stateless";
  TagEnum2[TagEnum2["tabs"] = 47] = "tabs";
  TagEnum2[TagEnum2["textarea"] = 48] = "textarea";
  TagEnum2[TagEnum2["toast-container"] = 49] = "toast-container";
  TagEnum2[TagEnum2["toolbar"] = 50] = "toolbar";
  TagEnum2[TagEnum2["tooltip"] = 51] = "tooltip";
  TagEnum2[TagEnum2["tree"] = 52] = "tree";
  TagEnum2[TagEnum2["tree-item"] = 53] = "tree-item";
  TagEnum2[TagEnum2["version"] = 54] = "version";
})(TagEnum || (TagEnum = {}));
var getWindow = () => {
  if (typeof window !== "undefined")
    return window;
  return {};
};
var getDocument = () => {
  const win = getWindow();
  if (win && typeof win.document !== "undefined")
    return win.document;
  return {};
};
var MODES = ["development", "production", "test"];
var runtimeMode = "production";
var setRuntimeMode = (mode) => {
  try {
    if (MODES.includes(mode)) {
      runtimeMode = mode;
    } else {
      throw new Error(`Invalid NODE_ENV value: ${mode}. Expected one of ${MODES.join(", ")}.`);
    }
  } catch (_a) {
    runtimeMode = "production";
  }
};
var getNodeEnv = () => {
  try {
    return typeof process !== "undefined" && process.env ? "development" : void 0;
  } catch (_a) {
    return void 0;
  }
};
var getInitialMode = () => {
  const nodeEnv = getNodeEnv();
  return nodeEnv && MODES.includes(nodeEnv) ? nodeEnv : "production";
};
setRuntimeMode(getInitialMode());
var EXPERIMENTAL_MODE = false;
var COLOR_CONTRAST_ANALYSIS = false;
var isDevMode = () => runtimeMode === "development";
var isTestMode = () => runtimeMode === "test";
var isValidationEnabled = () => runtimeMode !== "production" || getNodeEnv() !== "production";
var getExperimentalMode = () => EXPERIMENTAL_MODE === true;
var setExperimentalMode = (mode) => {
  EXPERIMENTAL_MODE = mode === true;
};
var getColorContrastAnalysis = () => COLOR_CONTRAST_ANALYSIS === true;
var setColorContrastAnalysis = (mode) => {
  COLOR_CONTRAST_ANALYSIS = mode === true;
};
var LOG_STYLE = "color: white; background: #666; font-weight: bold; padding: .25em .5em; border-radius: 3px; border: 1px solid #000";
var mapToArray = (msg) => {
  return Array.isArray(msg) ? msg : [msg];
};
var getLogLabel = (label) => {
  return `%c${label}`;
};
var handleClassifier = (label, classifier) => {
  if (typeof classifier === "string" && classifier.length > 0) {
    return `${getLogLabel(label)} | ${classifier}`;
  } else {
    return getLogLabel(label);
  }
};
var getShield = (label, options) => {
  return [handleClassifier(label, options === null || options === void 0 ? void 0 : options.classifier), `${LOG_STYLE};${(options === null || options === void 0 ? void 0 : options.overwriteStyle) || ""}`];
};
var isDevModeOrForceLog = (forceLog) => isDevMode() || forceLog === true;
var Logger = class {
  constructor(label) {
    this.label = label;
  }
  debug(msg, options) {
    if (isDevModeOrForceLog(options === null || options === void 0 ? void 0 : options.forceLog)) {
      console.debug(...getShield(this.label, options), ...mapToArray(msg));
    }
  }
  info(msg, options) {
    if (isDevModeOrForceLog(options === null || options === void 0 ? void 0 : options.forceLog)) {
      console.info(...getShield(this.label, options), ...mapToArray(msg));
    }
  }
  trace(msg, options) {
    if (isDevModeOrForceLog(options === null || options === void 0 ? void 0 : options.forceLog)) {
      console.trace(...getShield(this.label, options), ...mapToArray(msg));
    }
  }
  warn(msg, options) {
    if (isDevModeOrForceLog(options === null || options === void 0 ? void 0 : options.forceLog)) {
      console.warn(...getShield(this.label, options), ...mapToArray(msg));
    }
  }
  error(msg, options) {
    console.error(...getShield(this.label, options), ...mapToArray(msg));
  }
  throw(msg, options) {
    if (isDevModeOrForceLog(options === null || options === void 0 ? void 0 : options.forceLog)) {
      throw new Error(...getShield(this.label, options), ...mapToArray(msg));
    }
  }
};
var Log = new Logger("KoliBri");
var a11yCache = /* @__PURE__ */ new Set();
var a11yHint = (msg, options) => {
  if (a11yCache.has(msg) === false || false) {
    a11yCache.add(msg);
    Log.debug([msg].concat([]), {
      classifier: `✋ a11y`,
      forceLog: false,
      overwriteStyle: "; background-color: #09f"
    });
  }
};
var deprecatedCache = /* @__PURE__ */ new Set();
var deprecatedHint = (msg, options) => {
  if (deprecatedCache.has(msg) === false || false) {
    deprecatedCache.add(msg);
    Log.warn([msg].concat([]), {
      classifier: `🔥 deprecated`,
      forceLog: false,
      overwriteStyle: "; background-color: #f00"
    });
  }
};
var devCache = /* @__PURE__ */ new Set();
var devHint = (msg, options) => {
  if (devCache.has(msg) === false || !!(options === null || options === void 0 ? void 0 : options.force)) {
    devCache.add(msg);
    Log.debug([msg].concat((options === null || options === void 0 ? void 0 : options.details) || []), {
      classifier: `💻 dev`,
      forceLog: !!(options === null || options === void 0 ? void 0 : options.force),
      overwriteStyle: "; background-color: #f09"
    });
  }
};
var devWarning = (msg, options) => {
  if (devCache.has(msg) === false || false) {
    devCache.add(msg);
    Log.warn([msg].concat([]), {
      classifier: `⚠️ dev`,
      forceLog: false,
      overwriteStyle: "; background-color: #f09"
    });
  }
};
var featureCache = /* @__PURE__ */ new Set();
var featureHint = (msg, done = false, options) => {
  if (featureCache.has(msg) === false || false) {
    featureCache.add(msg);
    msg += done === true ? " ✅" : "";
    Log.debug([msg].concat([]), {
      classifier: `🌟 feature`,
      forceLog: false,
      overwriteStyle: "; background-color: #309"
    });
  }
};
devHint(`We appreciate any feedback, comments, screenshots, or demo links of an application based on KoliBri (kolibri@itzbund.de). Thank you!`);
var uiUxCache = /* @__PURE__ */ new Set();
var uiUxHint = (msg, options) => {
  if (uiUxCache.has(msg) === false || false) {
    uiUxCache.add(msg);
    Log.debug([msg].concat([]), {
      classifier: `📑 ui/ux`,
      forceLog: false,
      overwriteStyle: "; background-color: #060;"
    });
  }
};
var a11yHintLabelingLandmarks = (value) => {
  if (typeof value !== "string" || value === "") {
    a11yHint(`Some structural elements, such as the nav tag, can be used multiple times on a webpage. To distinguish between similarly named structural elements, it is necessary to set an ARIA label.
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Navigation_Role#accessibility_concerns`);
  }
};
var uiUxHintMillerscheZahl = (className, length = 8) => {
  if (length > 7) {
    uiUxHint(`[${className}] Within navigation structures, it is recommended to use no more than 7 menu items.

Link:
- https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two`);
  }
};
var n = 0.2126;
var r = 0.7152;
var t = 0.0722;
var e = 1 / 12.92;
function u(n2) {
  return Math.pow((n2 + 0.055) / 1.055, 2.4);
}
function a(a2) {
  var i2 = a2[0] / 255, c2 = a2[1] / 255, o2 = a2[2] / 255, s2 = i2 <= 0.03928 ? i2 * e : u(i2), f2 = c2 <= 0.03928 ? c2 * e : u(c2), l = o2 <= 0.03928 ? o2 * e : u(o2);
  return s2 * n + f2 * r + l * t;
}
function i(n2) {
  var r2 = 255;
  8 === (n2 = n2.replace(/^#/, "")).length && (r2 = parseInt(n2.slice(6, 8), 16), n2 = n2.substring(0, 6)), 4 === n2.length && (r2 = parseInt(n2.slice(3, 4).repeat(2), 16), n2 = n2.substring(0, 3)), 3 === n2.length && (n2 = n2[0] + n2[0] + n2[1] + n2[1] + n2[2] + n2[2]);
  var t2 = parseInt(n2, 16);
  return [t2 >> 16, t2 >> 8 & 255, 255 & t2, r2];
}
function c(n2, r2) {
  return (Math.max(n2, r2) + 0.05) / (Math.min(n2, r2) + 0.05);
}
function o(n2, r2) {
  return c(a(n2), a(r2));
}
function s(n2, r2) {
  return o(i(n2), i(r2));
}
function f(n2) {
  return n2 >= 7 ? "AAA" : n2 >= 4.5 ? "AA" : n2 >= 3 ? "AA Large" : "Fail";
}
var colorName;
var hasRequiredColorName;
function requireColorName() {
  if (hasRequiredColorName) return colorName;
  hasRequiredColorName = 1;
  colorName = {
    "aliceblue": [240, 248, 255],
    "antiquewhite": [250, 235, 215],
    "aqua": [0, 255, 255],
    "aquamarine": [127, 255, 212],
    "azure": [240, 255, 255],
    "beige": [245, 245, 220],
    "bisque": [255, 228, 196],
    "black": [0, 0, 0],
    "blanchedalmond": [255, 235, 205],
    "blue": [0, 0, 255],
    "blueviolet": [138, 43, 226],
    "brown": [165, 42, 42],
    "burlywood": [222, 184, 135],
    "cadetblue": [95, 158, 160],
    "chartreuse": [127, 255, 0],
    "chocolate": [210, 105, 30],
    "coral": [255, 127, 80],
    "cornflowerblue": [100, 149, 237],
    "cornsilk": [255, 248, 220],
    "crimson": [220, 20, 60],
    "cyan": [0, 255, 255],
    "darkblue": [0, 0, 139],
    "darkcyan": [0, 139, 139],
    "darkgoldenrod": [184, 134, 11],
    "darkgray": [169, 169, 169],
    "darkgreen": [0, 100, 0],
    "darkgrey": [169, 169, 169],
    "darkkhaki": [189, 183, 107],
    "darkmagenta": [139, 0, 139],
    "darkolivegreen": [85, 107, 47],
    "darkorange": [255, 140, 0],
    "darkorchid": [153, 50, 204],
    "darkred": [139, 0, 0],
    "darksalmon": [233, 150, 122],
    "darkseagreen": [143, 188, 143],
    "darkslateblue": [72, 61, 139],
    "darkslategray": [47, 79, 79],
    "darkslategrey": [47, 79, 79],
    "darkturquoise": [0, 206, 209],
    "darkviolet": [148, 0, 211],
    "deeppink": [255, 20, 147],
    "deepskyblue": [0, 191, 255],
    "dimgray": [105, 105, 105],
    "dimgrey": [105, 105, 105],
    "dodgerblue": [30, 144, 255],
    "firebrick": [178, 34, 34],
    "floralwhite": [255, 250, 240],
    "forestgreen": [34, 139, 34],
    "fuchsia": [255, 0, 255],
    "gainsboro": [220, 220, 220],
    "ghostwhite": [248, 248, 255],
    "gold": [255, 215, 0],
    "goldenrod": [218, 165, 32],
    "gray": [128, 128, 128],
    "green": [0, 128, 0],
    "greenyellow": [173, 255, 47],
    "grey": [128, 128, 128],
    "honeydew": [240, 255, 240],
    "hotpink": [255, 105, 180],
    "indianred": [205, 92, 92],
    "indigo": [75, 0, 130],
    "ivory": [255, 255, 240],
    "khaki": [240, 230, 140],
    "lavender": [230, 230, 250],
    "lavenderblush": [255, 240, 245],
    "lawngreen": [124, 252, 0],
    "lemonchiffon": [255, 250, 205],
    "lightblue": [173, 216, 230],
    "lightcoral": [240, 128, 128],
    "lightcyan": [224, 255, 255],
    "lightgoldenrodyellow": [250, 250, 210],
    "lightgray": [211, 211, 211],
    "lightgreen": [144, 238, 144],
    "lightgrey": [211, 211, 211],
    "lightpink": [255, 182, 193],
    "lightsalmon": [255, 160, 122],
    "lightseagreen": [32, 178, 170],
    "lightskyblue": [135, 206, 250],
    "lightslategray": [119, 136, 153],
    "lightslategrey": [119, 136, 153],
    "lightsteelblue": [176, 196, 222],
    "lightyellow": [255, 255, 224],
    "lime": [0, 255, 0],
    "limegreen": [50, 205, 50],
    "linen": [250, 240, 230],
    "magenta": [255, 0, 255],
    "maroon": [128, 0, 0],
    "mediumaquamarine": [102, 205, 170],
    "mediumblue": [0, 0, 205],
    "mediumorchid": [186, 85, 211],
    "mediumpurple": [147, 112, 219],
    "mediumseagreen": [60, 179, 113],
    "mediumslateblue": [123, 104, 238],
    "mediumspringgreen": [0, 250, 154],
    "mediumturquoise": [72, 209, 204],
    "mediumvioletred": [199, 21, 133],
    "midnightblue": [25, 25, 112],
    "mintcream": [245, 255, 250],
    "mistyrose": [255, 228, 225],
    "moccasin": [255, 228, 181],
    "navajowhite": [255, 222, 173],
    "navy": [0, 0, 128],
    "oldlace": [253, 245, 230],
    "olive": [128, 128, 0],
    "olivedrab": [107, 142, 35],
    "orange": [255, 165, 0],
    "orangered": [255, 69, 0],
    "orchid": [218, 112, 214],
    "palegoldenrod": [238, 232, 170],
    "palegreen": [152, 251, 152],
    "paleturquoise": [175, 238, 238],
    "palevioletred": [219, 112, 147],
    "papayawhip": [255, 239, 213],
    "peachpuff": [255, 218, 185],
    "peru": [205, 133, 63],
    "pink": [255, 192, 203],
    "plum": [221, 160, 221],
    "powderblue": [176, 224, 230],
    "purple": [128, 0, 128],
    "rebeccapurple": [102, 51, 153],
    "red": [255, 0, 0],
    "rosybrown": [188, 143, 143],
    "royalblue": [65, 105, 225],
    "saddlebrown": [139, 69, 19],
    "salmon": [250, 128, 114],
    "sandybrown": [244, 164, 96],
    "seagreen": [46, 139, 87],
    "seashell": [255, 245, 238],
    "sienna": [160, 82, 45],
    "silver": [192, 192, 192],
    "skyblue": [135, 206, 235],
    "slateblue": [106, 90, 205],
    "slategray": [112, 128, 144],
    "slategrey": [112, 128, 144],
    "snow": [255, 250, 250],
    "springgreen": [0, 255, 127],
    "steelblue": [70, 130, 180],
    "tan": [210, 180, 140],
    "teal": [0, 128, 128],
    "thistle": [216, 191, 216],
    "tomato": [255, 99, 71],
    "turquoise": [64, 224, 208],
    "violet": [238, 130, 238],
    "wheat": [245, 222, 179],
    "white": [255, 255, 255],
    "whitesmoke": [245, 245, 245],
    "yellow": [255, 255, 0],
    "yellowgreen": [154, 205, 50]
  };
  return colorName;
}
var colorParse;
var hasRequiredColorParse;
function requireColorParse() {
  if (hasRequiredColorParse) return colorParse;
  hasRequiredColorParse = 1;
  var names = requireColorName();
  colorParse = parse2;
  var baseHues = {
    red: 0,
    orange: 60,
    yellow: 120,
    green: 180,
    blue: 240,
    purple: 300
  };
  function parse2(cstr) {
    var m, parts = [], alpha = 1, space;
    if (typeof cstr === "string") {
      cstr = cstr.toLowerCase();
      if (names[cstr]) {
        parts = names[cstr].slice();
        space = "rgb";
      } else if (cstr === "transparent") {
        alpha = 0;
        space = "rgb";
        parts = [0, 0, 0];
      } else if (/^#[A-Fa-f0-9]+$/.test(cstr)) {
        var base = cstr.slice(1);
        var size = base.length;
        var isShort = size <= 4;
        alpha = 1;
        if (isShort) {
          parts = [
            parseInt(base[0] + base[0], 16),
            parseInt(base[1] + base[1], 16),
            parseInt(base[2] + base[2], 16)
          ];
          if (size === 4) {
            alpha = parseInt(base[3] + base[3], 16) / 255;
          }
        } else {
          parts = [
            parseInt(base[0] + base[1], 16),
            parseInt(base[2] + base[3], 16),
            parseInt(base[4] + base[5], 16)
          ];
          if (size === 8) {
            alpha = parseInt(base[6] + base[7], 16) / 255;
          }
        }
        if (!parts[0]) parts[0] = 0;
        if (!parts[1]) parts[1] = 0;
        if (!parts[2]) parts[2] = 0;
        space = "rgb";
      } else if (m = /^((?:rgb|hs[lvb]|hwb|cmyk?|xy[zy]|gray|lab|lchu?v?|[ly]uv|lms)a?)\s*\(([^\)]*)\)/.exec(cstr)) {
        var name = m[1];
        var isRGB = name === "rgb";
        var base = name.replace(/a$/, "");
        space = base;
        var size = base === "cmyk" ? 4 : base === "gray" ? 1 : 3;
        parts = m[2].trim().split(/\s*[,\/]\s*|\s+/).map(function(x2, i2) {
          if (/%$/.test(x2)) {
            if (i2 === size) return parseFloat(x2) / 100;
            if (base === "rgb") return parseFloat(x2) * 255 / 100;
            return parseFloat(x2);
          } else if (base[i2] === "h") {
            if (/deg$/.test(x2)) {
              return parseFloat(x2);
            } else if (baseHues[x2] !== void 0) {
              return baseHues[x2];
            }
          }
          return parseFloat(x2);
        });
        if (name === base) parts.push(1);
        alpha = isRGB ? 1 : parts[size] === void 0 ? 1 : parts[size];
        parts = parts.slice(0, size);
      } else if (cstr.length > 10 && /[0-9](?:\s|\/)/.test(cstr)) {
        parts = cstr.match(/([0-9]+)/g).map(function(value) {
          return parseFloat(value);
        });
        space = cstr.match(/([a-z])/ig).join("").toLowerCase();
      }
    } else if (!isNaN(cstr)) {
      space = "rgb";
      parts = [cstr >>> 16, (cstr & 65280) >>> 8, cstr & 255];
    } else if (Array.isArray(cstr) || cstr.length) {
      parts = [cstr[0], cstr[1], cstr[2]];
      space = "rgb";
      alpha = cstr.length === 4 ? cstr[3] : 1;
    } else if (cstr instanceof Object) {
      if (cstr.r != null || cstr.red != null || cstr.R != null) {
        space = "rgb";
        parts = [
          cstr.r || cstr.red || cstr.R || 0,
          cstr.g || cstr.green || cstr.G || 0,
          cstr.b || cstr.blue || cstr.B || 0
        ];
      } else {
        space = "hsl";
        parts = [
          cstr.h || cstr.hue || cstr.H || 0,
          cstr.s || cstr.saturation || cstr.S || 0,
          cstr.l || cstr.lightness || cstr.L || cstr.b || cstr.brightness
        ];
      }
      alpha = cstr.a || cstr.alpha || cstr.opacity || 1;
      if (cstr.opacity != null) alpha /= 100;
    }
    return {
      space,
      values: parts,
      alpha
    };
  }
  return colorParse;
}
var colorParseExports = requireColorParse();
var parse = getDefaultExportFromCjs(colorParseExports);
var rgb = {
  min: [0, 0, 0],
  max: [255, 255, 255]
};
var hsl = {
  name: "hsl",
  min: [0, 0, 0],
  max: [360, 100, 100],
  channel: ["hue", "saturation", "lightness"],
  alias: ["HSL"],
  rgb: function(hsl2) {
    var h = hsl2[0] / 360, s2 = hsl2[1] / 100, l = hsl2[2] / 100, t1, t2, t3, rgb2, val, i2 = 0;
    if (s2 === 0) return val = l * 255, [val, val, val];
    t2 = l < 0.5 ? l * (1 + s2) : l + s2 - l * s2;
    t1 = 2 * l - t2;
    rgb2 = [0, 0, 0];
    for (; i2 < 3; ) {
      t3 = h + 1 / 3 * -(i2 - 1);
      t3 < 0 ? t3++ : t3 > 1 && t3--;
      val = 6 * t3 < 1 ? t1 + (t2 - t1) * 6 * t3 : 2 * t3 < 1 ? t2 : 3 * t3 < 2 ? t1 + (t2 - t1) * (2 / 3 - t3) * 6 : t1;
      rgb2[i2++] = val * 255;
    }
    return rgb2;
  }
};
rgb.hsl = function(rgb2) {
  var r2 = rgb2[0] / 255, g2 = rgb2[1] / 255, b2 = rgb2[2] / 255, min = Math.min(r2, g2, b2), max = Math.max(r2, g2, b2), delta = max - min, h, s2, l;
  if (max === min) {
    h = 0;
  } else if (r2 === max) {
    h = (g2 - b2) / delta;
  } else if (g2 === max) {
    h = 2 + (b2 - r2) / delta;
  } else if (b2 === max) {
    h = 4 + (r2 - g2) / delta;
  }
  h = Math.min(h * 60, 360);
  if (h < 0) {
    h += 360;
  }
  l = (min + max) / 2;
  if (max === min) {
    s2 = 0;
  } else if (l <= 0.5) {
    s2 = delta / (max + min);
  } else {
    s2 = delta / (2 - max - min);
  }
  return [h, s2 * 100, l * 100];
};
var rgbaConvert = { exports: {} };
var hasRequiredRgbaConvert;
function requireRgbaConvert() {
  if (hasRequiredRgbaConvert) return rgbaConvert.exports;
  hasRequiredRgbaConvert = 1;
  rgbaConvert.exports = arr;
  rgbaConvert.exports.arr = arr;
  rgbaConvert.exports.obj = obj;
  rgbaConvert.exports.css = css;
  rgbaConvert.exports.hex = hex;
  rgbaConvert.exports.num = num;
  function arr(data) {
    var a2 = parse2(data);
    if (a2.length == 3) {
      return a2.concat(255);
    } else {
      a2[3] = Math.round(a2[3]);
      return a2;
    }
  }
  function obj(data) {
    var a2 = parse2(data);
    return {
      r: a2[0],
      g: a2[1],
      b: a2[2],
      a: a2.length == 3 ? 255 : Math.round(a2[3])
    };
  }
  function css(data) {
    var a2 = parse2(data);
    if (a2.length == 3) a2.push(255);
    return a2[3] == 255 ? "rgb(" + a2[0] + ", " + a2[1] + ", " + a2[2] + ")" : a2[3] == 0 ? "rgba(" + a2[0] + ", " + a2[1] + ", " + a2[2] + ", 0)" : "rgba(" + a2[0] + ", " + a2[1] + ", " + a2[2] + ", " + String(a2[3] / 255).substr(1) + ")";
  }
  function hex(data) {
    var a2 = parse2(data);
    if (a2.length == 3) a2.push(255);
    var opaque = a2[3] == 255;
    var r2 = num2hex(a2[0]);
    var g2 = num2hex(a2[1]);
    var b2 = num2hex(a2[2]);
    var a2 = num2hex(Math.round(a2[3]));
    var is = isshort(r2, g2, b2, a2);
    if (opaque) {
      return is ? "#" + r2.charAt(0) + g2.charAt(0) + b2.charAt(0) : "#" + r2 + g2 + b2;
    }
    return is ? "#" + r2.charAt(0) + g2.charAt(0) + b2.charAt(0) + a2.charAt(0) : "#" + r2 + g2 + b2 + a2;
  }
  function num(data) {
    var a2 = parse2(data);
    if (a2.length == 3) a2.push(255);
    else a2[3] = Math.round(a2[3]);
    return (a2[3] << 24 >>> 0 | a2[0] << 16 | a2[1] << 8 | a2[2]) >>> 0;
  }
  function parse2(data) {
    if (typeof data == "string") {
      data = data.toLowerCase();
      return name(data) || hex3(data) || hex6(data) || rgb2(data) || rgba2(data) || [0, 0, 0, 255];
    }
    return object(data) || array(data) || number(data) || [0, 0, 0, 255];
  }
  function num2hex(num2) {
    var s2 = num2.toString(16);
    return s2.length == 1 ? "0" + s2 : s2;
  }
  function isshort(r2, g2, b2, a2) {
    var h = [
      "ff",
      "00",
      "11",
      "22",
      "33",
      "44",
      "55",
      "66",
      "77",
      "88",
      "99",
      "aa",
      "bb",
      "cc",
      "dd",
      "ee"
    ];
    return h.indexOf(r2) != -1 && h.indexOf(g2) != -1 && h.indexOf(b2) != -1 && h.indexOf(a2) != -1;
  }
  function name(str) {
    if (str == "red") return [255, 0, 0];
    if (str == "green") return [0, 255, 0];
    if (str == "blue") return [0, 0, 255];
    if (str == "black") return [0, 0, 0];
    if (str == "white") return [255, 255, 255];
    if (str == "cyan") return [0, 255, 255];
    if (str == "gray") return [128, 128, 128];
    if (str == "grey") return [128, 128, 128];
    if (str == "magenta") return [255, 0, 255];
    if (str == "pink") return [255, 0, 255];
    if (str == "yellow") return [255, 255, 0];
  }
  function hex2num(str) {
    return str.length == 1 ? parseInt(str + str, 16) : parseInt(str, 16);
  }
  function hex3(str) {
    var s2 = str.replace(/^#/, "");
    var l = s2.length;
    if (l == 3 || l == 4) {
      var r2 = hex2num(s2[0]);
      var g2 = hex2num(s2[1]);
      var b2 = hex2num(s2[2]);
      var a2 = l == 3 ? 255 : hex2num(s2[3]);
      if (isNaN(r2) || isNaN(g2) || isNaN(b2) || isNaN(a2)) return;
      return [r2, g2, b2, a2];
    }
  }
  function hex6(str) {
    var s2 = str.replace(/^#/, "");
    var l = s2.length;
    if (l == 6 || l == 8) {
      var r2 = hex2num(s2.slice(0, 2));
      var g2 = hex2num(s2.slice(2, 4));
      var b2 = hex2num(s2.slice(4, 6));
      var a2 = l == 6 ? 255 : hex2num(s2.slice(6, 8));
      if (isNaN(r2) || isNaN(g2) || isNaN(b2) || isNaN(a2)) return;
      return [r2, g2, b2, a2];
    }
  }
  function getnum(val, integer) {
    if (typeof val != "number") return -1;
    if (integer === true && Math.floor(val) !== val) return -1;
    return val >= 0 && val <= 255 ? val : -1;
  }
  function object(obj2) {
    if (Object.prototype.toString.call(obj2) === "[object Object]" && Object.getPrototypeOf(obj2) === Object.getPrototypeOf({})) {
      var r2 = getnum(obj2.r != void 0 ? obj2.r : obj2.red != void 0 ? obj2.red : 0, true);
      var g2 = getnum(obj2.g != void 0 ? obj2.g : obj2.green != void 0 ? obj2.green : 0, true);
      var b2 = getnum(obj2.b != void 0 ? obj2.b : obj2.blue != void 0 ? obj2.blue : 0, true);
      var a2 = getnum(obj2.a != void 0 ? obj2.a : obj2.alpha != void 0 ? obj2.alpha : 255, true);
      if (r2 != -1 && g2 != -1 && b2 != -1 && a2 != -1) {
        return [r2, g2, b2, a2];
      }
    }
  }
  function array(arr2) {
    if (Array.isArray(arr2) && (arr2.length == 3 || arr2.length == 4)) {
      var r2 = getnum(arr2[0], true);
      var g2 = getnum(arr2[1], true);
      var b2 = getnum(arr2[2], true);
      var a2 = getnum(arr2[3] != void 0 ? arr2[3] : 255, true);
      if (r2 != -1 && g2 != -1 && b2 != -1 && a2 != -1) {
        return [r2, g2, b2, a2];
      }
    }
  }
  function number(num2) {
    if (typeof num2 == "number" && Math.floor(num2) == num2 && num2 <= 4294967295 && num2 >= 0) {
      var a2 = num2 >> 24 & 255;
      var r2 = num2 >> 16 & 255;
      var g2 = num2 >> 8 & 255;
      var b2 = num2 & 255;
      return [r2, g2, b2, a2];
    }
  }
  function rgb2(str) {
    if (str.substr(0, 4) == "rgb(") {
      str = str.match(/^rgb\(([^)]+)\)/)[1];
      var t2 = str.split(/ *, */).map(Number);
      var r2 = getnum(t2[0], true);
      var g2 = getnum(t2[1], true);
      var b2 = getnum(t2[2], true);
      if (r2 != -1 && g2 != -1 && b2 != -1) {
        return [r2, g2, b2, 255];
      }
    }
  }
  function rgba2(str) {
    if (str.substr(0, 5) == "rgba(") {
      str = str.match(/^rgba\(([^)]+)\)/)[1];
      var t2 = str.split(/ *, */).map(Number);
      var r2 = getnum(t2[0], true);
      var g2 = getnum(t2[1], true);
      var b2 = getnum(t2[2], true);
      var a2 = getnum(t2[3] * 255);
      if (r2 != -1 && g2 != -1 && b2 != -1 && a2 != -1) {
        return [r2, g2, b2, a2];
      }
    }
  }
  return rgbaConvert.exports;
}
var rgbaConvertExports = requireRgbaConvert();
var rgba = getDefaultExportFromCjs(rgbaConvertExports);
var OBJECT_OBJECT = /\[object Object\]/;
var objectObjectHandler = (value, cb) => {
  if (typeof value === "string" && OBJECT_OBJECT.test(value)) {
    return;
  }
  cb();
};
var setEventTarget = (event, target) => {
  if (getExperimentalMode()) {
    Log.debug([event, target]);
    Log.debug(`↑ We propagate the (submit) event to this target.`);
  }
  Object.defineProperty(event, "target", {
    value: target,
    writable: false
  });
};
var patchState = (component) => {
  var _a, _b, _c;
  (_a = component.nextHooks) === null || _a === void 0 ? void 0 : _a.forEach((hooks, key) => {
    var _a2;
    const beforePatch = hooks.get("beforePatch");
    if (typeof beforePatch === "function") {
      beforePatch((_a2 = component.nextState) === null || _a2 === void 0 ? void 0 : _a2.get(key), component.nextState, component, key);
    }
  });
  if (((_b = component.nextState) === null || _b === void 0 ? void 0 : _b.size) > 0) {
    component.state = Object.assign(Object.assign({}, component.state), Object.fromEntries(component.nextState));
    delete component.nextState;
    (_c = component.nextHooks) === null || _c === void 0 ? void 0 : _c.forEach((hooks, key) => {
      const afterPatch = hooks.get("afterPatch");
      if (typeof afterPatch === "function") {
        afterPatch(component.state[key], component.state, component, key);
      }
    });
  }
  delete component.nextHooks;
};
var setState = (component, propName, value, hooks = {}) => {
  var _a, _b;
  if (component.nextHooks === void 0) {
    component.nextHooks = /* @__PURE__ */ new Map();
  }
  if (component.nextState === void 0) {
    component.nextState = /* @__PURE__ */ new Map();
  }
  const nextHooks = component.nextHooks.get(propName);
  if (nextHooks instanceof Map === false) {
    component.nextHooks.set(propName, /* @__PURE__ */ new Map());
  }
  if (typeof hooks.afterPatch === "function") {
    (_a = component.nextHooks.get(propName)) === null || _a === void 0 ? void 0 : _a.set("afterPatch", hooks.afterPatch);
  }
  if (typeof hooks.beforePatch === "function") {
    (_b = component.nextHooks.get(propName)) === null || _b === void 0 ? void 0 : _b.set("beforePatch", hooks.beforePatch);
  }
  component.nextState.set(propName, value);
  patchState(component);
};
var logWarn = (component, propName, value, requiredGeneric) => {
  devHint(`[${component.constructor.name}] The property value: (${value}) for '${propName}' is not valid. Allowed values are: ${Array.from(requiredGeneric).join(", ")}`);
};
function watchValidator(component, propName, validationFunction, requiredGeneric, value, options = {}) {
  if (!isValidationEnabled()) {
    if (value !== void 0) {
      setState(component, propName, value, options.hooks);
    } else if (validationFunction(void 0)) {
      setState(component, propName, void 0, options.hooks);
    } else if (options.required !== true && validationFunction(options.defaultValue)) {
      setState(component, propName, options.defaultValue, options.hooks);
    }
    return;
  }
  if (validationFunction(value)) {
    setState(component, propName, value, options.hooks);
  } else if (value === void 0 && options.required !== true && validationFunction(options.defaultValue)) {
    setState(component, propName, options.defaultValue, options.hooks);
  } else {
    const allowedValues = new Set(requiredGeneric);
    if (!options.required) {
      allowedValues.add(null);
    }
    logWarn(component, propName, value, allowedValues);
  }
}
var stringifyJson = (value) => {
  try {
    return JSON.stringify(value).replace(/"/g, "'");
  } catch (_a) {
    Log.warn(["stringifyJson", value]);
    Log.error(`↑ The JSON could not be converted to a string. A stringifiable JSON is expected.`);
    throw new Error();
  }
};
var JSON_CHARS = /^[{[]/;
var parseJson = (value) => {
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (_a) {
      if (JSON_CHARS.test(value)) {
        try {
          return JSON.parse(value.replace(/'/g, '"'));
        } catch (_b) {
          Log.warn(["parseJson", value]);
          Log.error(`↑ The JSON string could not be parsed. Make sure that single quotes in the text are escaped (&#8216;).`);
        }
      }
    }
  }
  throw new Error();
};
var traverseShadowDom = (rootNode, onNode) => {
  if (!rootNode) {
    return;
  }
  const visited = /* @__PURE__ */ new Set();
  const queue = [rootNode];
  let index = 0;
  while (index < queue.length) {
    const current = queue[index++];
    if (visited.has(current)) {
      continue;
    }
    visited.add(current);
    if (onNode(current)) {
      return;
    }
    const children = Array.from(current.children || []);
    for (let i2 = 0; i2 < children.length; i2++) {
      queue.push(children[i2]);
    }
    if (current instanceof HTMLElement && current.shadowRoot) {
      queue.push(current.shadowRoot);
    }
    if (current instanceof HTMLSlotElement) {
      const assigned = current.assignedNodes({ flatten: true });
      for (let i2 = 0; i2 < assigned.length; i2++) {
        if (assigned[i2] instanceof Element) {
          queue.push(assigned[i2]);
        }
      }
    }
  }
};
var querySelectorShadow = (selector, rootNode) => {
  let result = null;
  traverseShadowDom(rootNode, (current) => {
    if (current instanceof Element && current.matches(selector)) {
      result = current;
      return true;
    }
    return false;
  });
  return result;
};
var querySelectorAllShadow = (selector, rootNode) => {
  const results = [];
  traverseShadowDom(rootNode, (current) => {
    if (current instanceof Element && current.matches(selector)) {
      results.push(current);
    }
    return false;
  });
  return results;
};
var koliBriQuerySelector = (selector, node) => querySelectorShadow(selector, node || getDocument());
var koliBriQuerySelectorAll = (selector, node) => querySelectorAllShadow(selector, node || getDocument());
var DEFAULT_COLOR_CONTRAST = null;
var getDefaultColorContrast = () => {
  DEFAULT_COLOR_CONTRAST = DEFAULT_COLOR_CONTRAST || {
    backgroundColor: "#00000000",
    color: "#00000000",
    domNode: getDocument().body,
    level: "Fail",
    score: 1
  };
  return DEFAULT_COLOR_CONTRAST;
};
var TRANSPARENT_REGEXP = /(\d+, ){3}0\)/;
var koliBriA11yColorContrast = (domNode, a11yColorContrast = getDefaultColorContrast()) => {
  const computedStyle = getComputedStyle(domNode);
  const hexBG = TRANSPARENT_REGEXP.test(computedStyle.backgroundColor) ? a11yColorContrast.backgroundColor : rgba.hex(computedStyle.backgroundColor);
  const hexC = TRANSPARENT_REGEXP.test(computedStyle.color) ? a11yColorContrast.color : rgba.hex(computedStyle.color);
  const diff = s(hexBG, hexC);
  const contrast = {
    backgroundColor: hexBG,
    color: hexC,
    domNode,
    level: f(diff),
    score: diff
  };
  if (diff < 4.5) {
    Log.error([
      "Color-Contrast-Error",
      {
        backgroundColor: contrast.backgroundColor,
        color: contrast.color,
        level: contrast.level,
        score: contrast.score
      },
      contrast.domNode
    ]);
  }
  return contrast;
};
var koliBriQuerySelectorColors = (selector, a11yColorContrast = getDefaultColorContrast()) => {
  if (a11yColorContrast.domNode instanceof HTMLElement) {
    a11yColorContrast = koliBriA11yColorContrast(a11yColorContrast.domNode, a11yColorContrast);
  }
  const selectedNode = a11yColorContrast.domNode.querySelector(selector);
  if (selectedNode === null) {
    const nodeList = a11yColorContrast.domNode.querySelectorAll('[class="hydrated"]');
    for (let i2 = 0; i2 < nodeList.length; i2++) {
      a11yColorContrast.domNode = nodeList[i2];
      a11yColorContrast = koliBriQuerySelectorColors(selector, a11yColorContrast);
      if (a11yColorContrast.domNode !== null) {
        break;
      }
    }
    return a11yColorContrast;
  } else {
    return koliBriA11yColorContrast(selectedNode, a11yColorContrast);
  }
};
var KoliBriUtils = class _KoliBriUtils {
  static queryHtmlElementColors(targetNode, a11yColorContrast, recursion = false, log = true) {
    let returnValue = null;
    if (recursion === true || _KoliBriUtils.executionLock === false) {
      if (recursion === false) {
        _KoliBriUtils.cache.clear();
        _KoliBriUtils.cache.set(a11yColorContrast.domNode, a11yColorContrast);
        _KoliBriUtils.executionLock = true;
        if (log === true) {
          Log.debug(`[KoliBriUtils] Color contrast analysis started...`);
        }
      }
      if (targetNode === a11yColorContrast.domNode) {
        returnValue = a11yColorContrast;
      } else {
        const children = /* @__PURE__ */ new Set();
        if (a11yColorContrast.domNode.shadowRoot) {
          const shadowChildren = a11yColorContrast.domNode.shadowRoot.children;
          for (let i2 = 0; i2 < shadowChildren.length; i2++) {
            children.add(shadowChildren[i2]);
          }
        }
        const slotElement = a11yColorContrast.domNode;
        if (typeof slotElement.assignedNodes === "function") {
          const slotChildren = slotElement.assignedNodes();
          for (let i2 = 0; i2 < slotChildren.length; i2++) {
            if (slotChildren[i2] instanceof HTMLElement) {
              children.add(slotChildren[i2]);
            }
          }
        }
        const domChildren = a11yColorContrast.domNode.children;
        for (let i2 = 0; i2 < domChildren.length; i2++) {
          children.add(domChildren[i2]);
        }
        const arrayChildren = Array.from(children);
        for (let i2 = 0; i2 < arrayChildren.length; i2++) {
          let colorContrast = _KoliBriUtils.cache.get(arrayChildren[i2]);
          if (colorContrast === void 0) {
            colorContrast = koliBriA11yColorContrast(arrayChildren[i2], a11yColorContrast);
          }
          _KoliBriUtils.cache.set(arrayChildren[i2], colorContrast);
          const colors = _KoliBriUtils.queryHtmlElementColors(targetNode, colorContrast, true, false);
          if (colors !== null) {
            returnValue = colors;
            break;
          }
        }
      }
    } else {
      Log.debug(`[KoliBriUtils] Call aborted because a color contrast analysis is currently being executed.`);
    }
    if (recursion === false) {
      if (log === true) {
        Log.debug(`[KoliBriUtils] Color contrast analysis finished (${_KoliBriUtils.cache.size} DOM elements are analysed).`);
      }
      _KoliBriUtils.executionLock = false;
      _KoliBriUtils.cache.clear();
    }
    return returnValue;
  }
};
KoliBriUtils.executionLock = false;
KoliBriUtils.cache = /* @__PURE__ */ new Map();
var KoliBriDevHelper = class {
};
KoliBriDevHelper.getCssStyle = T;
KoliBriDevHelper.patchTheme = z;
KoliBriDevHelper.patchThemeTag = D;
KoliBriDevHelper.querySelector = koliBriQuerySelector;
KoliBriDevHelper.querySelectorAll = koliBriQuerySelectorAll;
KoliBriDevHelper.stringifyJson = stringifyJson;
var isObject = (value) => typeof value === "object" && value !== null;
var isString = (value, minLength = 0) => typeof value === "string" && value.length >= minLength;
var isStyle = (style) => {
  if (typeof style === "object" && style !== null) {
    for (const property in style) {
      if (isString(property, 1) === false) {
        return false;
      }
    }
  } else {
    return isString(style, 1);
  }
  return true;
};
var STATE_CHANGE_EVENT = new Event("StateChange");

export {
  getDefaultExportFromCjs,
  w,
  R,
  X,
  se,
  de,
  Ee,
  KeyEnum,
  TagEnum,
  getWindow,
  getDocument,
  setRuntimeMode,
  isDevMode,
  isTestMode,
  getExperimentalMode,
  setExperimentalMode,
  getColorContrastAnalysis,
  setColorContrastAnalysis,
  Log,
  a11yHint,
  deprecatedHint,
  devHint,
  devWarning,
  featureHint,
  uiUxHint,
  a11yHintLabelingLandmarks,
  uiUxHintMillerscheZahl,
  s,
  parse,
  rgb,
  hsl,
  rgba,
  objectObjectHandler,
  setEventTarget,
  watchValidator,
  stringifyJson,
  parseJson,
  koliBriQuerySelector,
  koliBriQuerySelectorAll,
  koliBriA11yColorContrast,
  koliBriQuerySelectorColors,
  KoliBriUtils,
  KoliBriDevHelper,
  isObject,
  isString,
  isStyle,
  STATE_CHANGE_EVENT
};
//# sourceMappingURL=chunk-37FUF44C.js.map
