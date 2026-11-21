import {
  KolFormTag
} from "./chunk-6OHARAC5.js";
import {
  KoliBriDevHelper,
  Log,
  devHint,
  getExperimentalMode,
  setEventTarget
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/controller-CZcQ57AP.js
var searchFormElement = (el) => {
  if (getExperimentalMode()) {
    devHint(`↓ Search form element start.`);
    Log.debug(el);
  }
  while (el instanceof HTMLElement && el.tagName !== "FORM" && el.tagName !== KolFormTag.toUpperCase()) {
    try {
      if (el.parentElement instanceof HTMLElement) {
        el = el.parentElement;
      } else if (el.parentNode instanceof ShadowRoot) {
        el = el.parentNode.host;
      } else {
        el = null;
      }
    } catch (_a) {
    }
    if (getExperimentalMode()) {
      Log.debug(el);
    }
  }
  if (getExperimentalMode()) {
    devHint(`↑ Search form element finished.`);
  }
  return el;
};
var propagateResetEventToForm = (options = {}) => {
  const form = searchFormElement(options.form);
  if (form instanceof HTMLElement) {
    const event = new Event("reset", {
      bubbles: true,
      cancelable: true
    });
    if (form.tagName === "FORM") {
      setEventTarget(event, form);
      form.dispatchEvent(event);
    } else if (form.tagName === KolFormTag.toUpperCase()) {
      const innerForm = KoliBriDevHelper.querySelector("form", form);
      if (innerForm) {
        setEventTarget(event, innerForm);
        innerForm.dispatchEvent(event);
      }
    }
  }
};
var propagateSubmitEventToForm = (options = {}) => {
  var _a;
  const shouldSubmit = (_a = options.shouldSubmit) !== null && _a !== void 0 ? _a : (() => true);
  const form = searchFormElement(options.form);
  if (form instanceof HTMLElement) {
    const event = new SubmitEvent("submit", {
      bubbles: true,
      cancelable: true,
      submitter: form
    });
    if (form.tagName === "FORM") {
      if (getExperimentalMode() && form.noValidate === false) {
        devHint(`If you have not focusable or hidden form fields in your form, you should enable noValidate for your form.`, {
          force: true
        });
      }
      setTimeout(() => {
        if (!shouldSubmit()) {
          return;
        }
        if (typeof form.requestSubmit === "function") {
          form.requestSubmit();
        } else {
          setEventTarget(event, form);
          form.dispatchEvent(event);
        }
      });
    } else if (form.tagName === KolFormTag.toUpperCase()) {
      const innerForm = KoliBriDevHelper.querySelector("form", form);
      if (innerForm) {
        setEventTarget(event, innerForm);
        setTimeout(() => {
          if (shouldSubmit()) {
            innerForm.dispatchEvent(event);
          }
        });
      }
    }
  }
};
var isPickerOpen = (ref) => {
  var _a;
  try {
    return (_a = ref === null || ref === void 0 ? void 0 : ref.matches(":open")) !== null && _a !== void 0 ? _a : false;
  } catch (_b) {
    return false;
  }
};
var submitFormOnEnter = (event, options) => {
  if ((event.code === "Enter" || event.code === "NumpadEnter") && !event.isComposing) {
    propagateSubmitEventToForm(Object.assign(Object.assign({}, options), { shouldSubmit: () => !event.defaultPrevented && !isPickerOpen(options.ref) }));
  }
};

export {
  propagateResetEventToForm,
  propagateSubmitEventToForm,
  submitFormOnEnter
};
//# sourceMappingURL=chunk-SR6CIZZ2.js.map
