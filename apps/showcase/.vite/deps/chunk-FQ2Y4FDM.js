import {
  Env
} from "./chunk-VUP4WNL7.js";
import {
  Log,
  getDocument,
  getWindow,
  isTestMode,
  setColorContrastAnalysis,
  setExperimentalMode
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/dev.utils-DM7Qhcet.js
var initMeta = () => {
  try {
    const document = getDocument();
    if (!document || typeof document.querySelector !== "function") {
      return;
    }
    const meta = document.querySelector('meta[name="kolibri"]');
    if (meta && meta.hasAttribute("content")) {
      const content = meta.getAttribute("content");
      if (typeof content === "string") {
        setExperimentalMode(content.includes("experimental-mode=true"));
        setColorContrastAnalysis(content.includes("color-contrast-analysis=true"));
      }
    }
  } catch (_a) {
  }
};
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
var LOGO = `
,--. ,--.         ,--. ,--. ,-----.           ,--.
|  .'   /  ,---.  |  | \`--' |  |) /_  ,--.--. \`--'
|  .   '  | .-. | |  | ,--. |  .-.  \\ |  .--' ,--.
|  |\\   \\ | '-' | |  | |  | |  '--' / |  |    |  |
\`--' \`--´  \`---´  \`--' \`--' \`------´  \`--'    \`--'`.replace(/ /g, " ");
var initKoliBri = () => {
  initMeta();
  Log.debug(`${LOGO}
🚹 The accessible HTML-Standard | 👉 https://public-ui.github.io | ${Env.kolibriVersion}
	`, {
    forceLog: true
  });
};
var renderDevAdvice = () => {
  if (getKoliBri().adviceShown !== true) {
    Object.defineProperty(getKoliBri(), "adviceShown", {
      get: function() {
        return true;
      }
    });
    Log.debug(`
You are using the KoliBri component library. If you have any suggestions for improvement or find a problem, please contact us:

Ticket: https://github.com/public-ui/kolibri/issues/new/choose (for privacy reasons, please use email)
Email: kolibri@itzbund.de
`);
  }
};
var nonce = () => Math.floor(Math.random() * 16777215).toString(16);
if (isTestMode()) {
  nonce = () => "nonce";
}
var createUniqueId = (prefix) => `${prefix}-${nonce()}`;
var createRelatedUniqueId = (baseId, suffix) => {
  const separatorIndex = baseId.lastIndexOf("-");
  if (separatorIndex === -1)
    return `${baseId}-${suffix}`;
  const lastSegment = baseId.slice(separatorIndex + 1);
  const isNonce = lastSegment === "nonce" || /^[0-9a-f]+$/.test(lastSegment);
  return isNonce ? `${baseId.slice(0, separatorIndex)}-${suffix}-${lastSegment}` : `${baseId}-${suffix}`;
};

export {
  initKoliBri,
  renderDevAdvice,
  nonce,
  createUniqueId,
  createRelatedUniqueId
};
//# sourceMappingURL=chunk-FQ2Y4FDM.js.map
