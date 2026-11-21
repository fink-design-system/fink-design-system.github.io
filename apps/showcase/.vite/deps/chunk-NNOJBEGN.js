import {
  translate
} from "./chunk-ZFTINDKO.js";
import {
  BaseBehavior
} from "./chunk-IGUFDWYR.js";
import {
  createRelatedUniqueId
} from "./chunk-FQ2Y4FDM.js";
import {
  createPropDefinition,
  isEnumOption,
  normalizeBoolean,
  normalizeNumber,
  normalizeString
} from "./chunk-KPGE6Z2R.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/behavior-Cw8QfOcm.js
var hasCounterProp = createPropDefinition("hasCounter", false, normalizeBoolean);
var maxLengthProp = createPropDefinition("maxLength", void 0, normalizeNumber, (value) => value >= 0);
var MAX_LENGTH_BEHAVIOR_OPTIONS = ["hard", "soft"];
function normalizeMaxLengthBehavior(value) {
  const str = normalizeString(value);
  if (isEnumOption(str, MAX_LENGTH_BEHAVIOR_OPTIONS)) {
    return str;
  }
  throw new Error(`Invalid max length behavior: ${str}`);
}
var maxLengthBehaviorProp = createPropDefinition("maxLengthBehavior", "hard", normalizeMaxLengthBehavior);
var counterPropsConfig = {
  optional: [hasCounterProp, maxLengthProp, maxLengthBehaviorProp]
};
var getCounterVisualText = (maxLengthBehavior, maxLength, currentLength) => {
  if (typeof maxLength !== "number") {
    return translate("kol-character-counter-current", { placeholders: { current: String(currentLength) } });
  }
  if (maxLengthBehavior === "soft") {
    const remaining = maxLength - currentLength;
    return remaining < 0 ? translate("kol-character-limit-exceeded", { placeholders: { over: String(Math.abs(remaining)) } }) : translate("kol-character-limit-remaining", { placeholders: { remaining: String(remaining) } });
  }
  return translate("kol-character-counter-current-of-max", { placeholders: { current: String(currentLength), max: String(maxLength) } });
};
var getCounterAriaText = (maxLengthBehavior, maxLength, currentLength) => {
  if (typeof maxLength !== "number") {
    return translate("kol-character-counter-current", { placeholders: { current: String(currentLength) } });
  }
  if (maxLengthBehavior === "soft") {
    const remaining = maxLength - currentLength;
    return remaining < 0 ? translate("kol-character-limit-exceeded", { placeholders: { over: String(Math.abs(remaining)) } }) : translate("kol-character-limit-remaining", { placeholders: { remaining: String(remaining) } });
  }
  return translate("kol-character-counter-current-of-max-aria", { placeholders: { current: String(currentLength), max: String(maxLength) } });
};
var getCounterMaxText = (maxLengthBehavior, maxLength, currentLength) => {
  if (maxLengthBehavior === "hard" && typeof maxLength === "number" && currentLength >= maxLength) {
    return translate("kol-character-counter-max-aria");
  }
  return "";
};
var isCharacterInputKey = (event) => event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
var REANNOUNCE_MARKER = " ";
var ARIA_DEBOUNCE_MS = 1e3;
var CounterBehavior = class extends BaseBehavior {
  constructor(stateAccess) {
    super(stateAccess, counterPropsConfig);
    this.reannounceToggle = false;
    this.setVisualRef = (el) => {
      this.visualSpan = el;
    };
    this.setAriaRef = (el) => {
      this.ariaSpan = el;
    };
    this.handleKeyDown = (event, currentLength) => {
      const { maxLength, maxLengthBehavior } = this.getLimit();
      if (maxLengthBehavior !== "hard" || typeof maxLength !== "number" || currentLength < maxLength)
        return;
      if (!isCharacterInputKey(event))
        return;
      this.retriggerAria(currentLength);
    };
  }
  componentWillLoad(props) {
    this.watchHasCounter(props.hasCounter);
    this.watchMaxLength(props.maxLength);
    this.watchMaxLengthBehavior(props.maxLengthBehavior);
  }
  watchHasCounter(value) {
    hasCounterProp.apply(value, (v) => this.setRenderProp("hasCounter", v));
  }
  watchMaxLength(value) {
    maxLengthProp.apply(value, (v) => this.setRenderProp("maxLength", v));
  }
  watchMaxLengthBehavior(value) {
    maxLengthBehaviorProp.apply(value, (v) => this.setRenderProp("maxLengthBehavior", v));
  }
  hasCounter() {
    return this.getRenderProp("hasCounter") === true;
  }
  hasSoftLimit() {
    const { maxLength, maxLengthBehavior } = this.getLimit();
    return typeof maxLength === "number" && maxLengthBehavior === "soft";
  }
  getMaxLengthAttribute() {
    const { maxLength, maxLengthBehavior } = this.getLimit();
    return maxLengthBehavior === "hard" ? maxLength : void 0;
  }
  getCounterProps() {
    if (!this.hasCounter()) {
      return void 0;
    }
    const { maxLength, maxLengthBehavior } = this.getLimit();
    return { maxLength, maxLengthBehavior, visualRef: this.setVisualRef, ariaRef: this.setAriaRef };
  }
  getCharacterLimitHintId(id) {
    return typeof this.getRenderProp("maxLength") === "number" && !this.hasCounter() ? createRelatedUniqueId(id, "character-limit-hint") : void 0;
  }
  update(currentLength) {
    const limit = this.getLimit();
    this.updateVisual(currentLength, limit);
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.updateAria(currentLength, limit), ARIA_DEBOUNCE_MS);
  }
  updateImmediate(currentLength) {
    const limit = this.getLimit();
    this.updateVisual(currentLength, limit);
    clearTimeout(this.debounceTimer);
    this.updateAria(currentLength, limit);
  }
  retriggerAria(currentLength) {
    if (!this.ariaSpan)
      return;
    const limit = this.getLimit();
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.updateAria(currentLength, limit, true), ARIA_DEBOUNCE_MS);
  }
  destroy() {
    clearTimeout(this.debounceTimer);
  }
  getLimit() {
    return { maxLength: this.getRenderProp("maxLength"), maxLengthBehavior: this.getRenderProp("maxLengthBehavior") };
  }
  updateVisual(currentLength, { maxLength, maxLengthBehavior }) {
    if (!this.visualSpan)
      return;
    this.visualSpan.innerText = getCounterVisualText(maxLengthBehavior, maxLength, currentLength);
    this.visualSpan.classList.toggle("kol-form-field__counter--exceeded", maxLengthBehavior === "soft" && typeof maxLength === "number" && currentLength > maxLength);
  }
  updateAria(currentLength, { maxLength, maxLengthBehavior }, forceReannounce = false) {
    if (!this.ariaSpan)
      return;
    let text = [getCounterAriaText(maxLengthBehavior, maxLength, currentLength), getCounterMaxText(maxLengthBehavior, maxLength, currentLength)].filter(Boolean).join(" ");
    if (forceReannounce) {
      this.reannounceToggle = !this.reannounceToggle;
      if (this.reannounceToggle) {
        text += REANNOUNCE_MARKER;
      }
    }
    this.ariaSpan.innerText = text;
  }
};

export {
  CounterBehavior
};
//# sourceMappingURL=chunk-NNOJBEGN.js.map
