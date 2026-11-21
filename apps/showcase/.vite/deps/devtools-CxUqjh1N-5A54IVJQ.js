import {
  initKoliBri,
  renderDevAdvice
} from "./chunk-FQ2Y4FDM.js";
import "./chunk-VUP4WNL7.js";
import {
  KoliBriUtils,
  Log,
  getColorContrastAnalysis,
  getDocument,
  getExperimentalMode,
  getWindow,
  isDevMode,
  koliBriA11yColorContrast,
  koliBriQuerySelector,
  koliBriQuerySelectorAll,
  koliBriQuerySelectorColors,
  parseJson,
  stringifyJson
} from "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/devtools-CxUqjh1N.js
var getKoliBri = () => {
  let kolibri = getWindow().KoliBri;
  if (kolibri === void 0) {
    kolibri = {};
    Object.defineProperty(getWindow(), "KoliBri", {
      value: kolibri,
      writable: false
    });
  }
  return kolibri;
};
function prototypeKoliBri(name, cb) {
  try {
    Object.defineProperty(getKoliBri(), name, {
      get: function() {
        return cb;
      }
    });
  } catch (_a) {
    Log.debug(`KoliBri property ${name} is already bind.`);
  }
}
var metaModeLog = (name, active) => Log.debug(`${name} ${active ? "" : "not "}activated`);
var initialize = () => {
  initKoliBri();
  if (isDevMode()) {
    renderDevAdvice();
    prototypeKoliBri("a11yColorContrast", koliBriA11yColorContrast);
    prototypeKoliBri("querySelector", koliBriQuerySelector);
    prototypeKoliBri("querySelectorAll", koliBriQuerySelectorAll);
    prototypeKoliBri("querySelectorColors", koliBriQuerySelectorColors);
    prototypeKoliBri("utils", function() {
      return KoliBriUtils;
    });
    prototypeKoliBri("parseJson", parseJson);
    prototypeKoliBri("stringifyJson", stringifyJson);
    metaModeLog("Development mode", isDevMode());
    metaModeLog("Experimental mode", getExperimentalMode());
    metaModeLog("Color contrast analysis", getColorContrastAnalysis());
    setTimeout(() => {
      try {
        const document = getDocument();
        const body = document === null || document === void 0 ? void 0 : document.body;
        if (document && body && typeof document.createElement === "function") {
          const div = document.createElement("svg");
          div.setAttribute("aria-label", "KoliBri-DevTools");
          div.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          div.setAttribute("role", "toolbar");
          div.setAttribute("style", "position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;");
          div.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="50"
  height="50"
  viewBox="0 0 600 600"
>
  <path d="M353 322L213 304V434L353 322Z" fill="#047" />
  <path d="M209 564V304L149 434L209 564Z" fill="#047" />
  <path d="M357 316L417 250L361 210L275 244L357 316Z" fill="#047" />
  <path d="M353 318L35 36L213 300L353 318Z" fill="#047" />
  <path d="M329 218L237 92L250 222L272 241L329 218Z" fill="#047" />
  <path d="M391 286L565 272L421 252L391 286Z" fill="#047" />
</svg>`;
          body.appendChild(div);
        }
      } catch (error) {
        Log.debug(["Could not initialize DevTools UI (likely in SSR/test environment):", error]);
      }
    }, 100);
    if (getColorContrastAnalysis()) {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        try {
          const document = getDocument();
          const body = document === null || document === void 0 ? void 0 : document.body;
          if (document && body && typeof document.createElement === "function") {
            setInterval(() => {
              KoliBriUtils.queryHtmlElementColors(document.createElement("div"), koliBriA11yColorContrast(body), false, false);
            }, 1e4);
          }
        } catch (error) {
          Log.debug(["Could not initialize color contrast analysis:", error]);
        }
      }, 2500);
    }
  }
};
export {
  initialize
};
//# sourceMappingURL=devtools-CxUqjh1N-5A54IVJQ.js.map
