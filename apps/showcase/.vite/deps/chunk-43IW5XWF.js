import {
  BaseFormFieldWebComponent
} from "./chunk-JCU3O6PN.js";
import {
  createRelatedUniqueId
} from "./chunk-FQ2Y4FDM.js";
import {
  createPropDefinition,
  getBlockBem,
  normalizeBoolean
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/group-DCoICCiG.js
var hasClearButtonProp = createPropDefinition("hasClearButton", true, normalizeBoolean);
var optionsGroupBem = getBlockBem("kol-custom-suggestions-options-group");
var optionBem = getBlockBem("kol-custom-suggestions-option");
var CustomSuggestionsOptionsGroupFC = ({ "aria-labelledby": ariaLabelledBy, blockSuggestionMouseOver, onKeyDown, style, hidden, id }, children) => h("ul", { "aria-labelledby": ariaLabelledBy, id, role: "listbox", style, class: optionsGroupBem({ "cursor-hidden": blockSuggestionMouseOver, open: !hidden }), hidden, onKeyDown }, children);
var highlightSearchTerm = (text, searchTerm) => {
  if (!(searchTerm === null || searchTerm === void 0 ? void 0 : searchTerm.trim()))
    return text;
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, partIndex) => partIndex % 2 === 1 ? h("mark", null, part) : part);
};
var CustomSuggestionsOptionFC = ({ disabled, id, index, ref, selected, onClick, onMouseOver, onFocus, onKeyDown, option, searchTerm }) => h("li", { id, key: `-${index}`, ref, "data-index": index, tabIndex: -1, role: "option", "aria-selected": selected ? "true" : void 0, "aria-disabled": disabled ? "true" : void 0, onClick, onMouseOver, onFocus, class: optionBem({ disabled: Boolean(disabled) }), onKeyDown }, h("span", null, highlightSearchTerm(String(option), searchTerm || "")));
var BaseListboxWebComponent = class extends BaseFormFieldWebComponent {
  constructor() {
    super(...arguments);
    this.focusedIndex = -1;
    this.clearButtonFocused = false;
    this.optionRefs = [];
    this.handleClearButtonFocus = () => {
      this.clearButtonFocused = true;
    };
    this.handleClearButtonBlur = () => {
      this.clearButtonFocused = false;
    };
  }
  getOptionId(index) {
    return createRelatedUniqueId(this.id, `option-${index}`);
  }
  getActiveDescendant() {
    return this.isOpen && this.focusedIndex >= 0 ? this.getOptionId(this.focusedIndex) : void 0;
  }
  focusOption(index) {
    var _a;
    this.focusedIndex = index;
    (_a = this.optionRefs[index]) === null || _a === void 0 ? void 0 : _a.focus();
  }
  moveFocusWrapping(delta) {
    let index = this.focusedIndex + delta;
    const count = this.getOptionCount();
    if (index >= count) {
      index = 0;
    }
    if (index < 0) {
      index = count - 1;
    }
    this.focusOption(index);
  }
  moveFocusSkippingDisabled(delta, searchStep, isDisabled) {
    const count = this.getOptionCount();
    let index = this.focusedIndex + delta;
    for (let iteration = 0; iteration < count; iteration++) {
      if (index >= count) {
        index = 0;
      }
      if (index < 0) {
        index = count - 1;
      }
      if (!isDisabled(index)) {
        this.focusOption(index);
        return;
      }
      index += searchStep;
    }
  }
  handleListboxEvent(event, isOpen, callback) {
    var _a;
    event.preventDefault();
    if (isOpen !== void 0) {
      this.isOpen = isOpen;
      if (!isOpen) {
        (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.focus();
      }
    }
    callback === null || callback === void 0 ? void 0 : callback();
  }
  handleListboxKeyDown(event) {
    var _a, _b;
    switch (event.key) {
      case "Down":
      case "ArrowDown":
        this.blockSuggestionMouseOver = true;
        this.handleListboxEvent(event, true, () => this.moveFocus(1));
        break;
      case "Up":
      case "ArrowUp": {
        this.blockSuggestionMouseOver = true;
        const wasOpen = this.isOpen;
        this.handleListboxEvent(event, true, () => wasOpen ? this.moveFocus(-1, -1) : this.focusLastOption());
        break;
      }
      case "Tab":
        if (this.isOpen) {
          this.isOpen = false;
          (_a = this.ctaRef.el) === null || _a === void 0 ? void 0 : _a.focus();
        }
        break;
      case "Esc":
      case "Escape":
        if (this.isOpen) {
          event.preventDefault();
          this.isOpen = false;
          (_b = this.ctaRef.el) === null || _b === void 0 ? void 0 : _b.focus();
        }
        break;
      case " ":
      case "Enter":
      case "NumpadEnter":
        this.handleConfirmKey(event);
        break;
      case "Home":
        if (this.isOpen) {
          this.blockSuggestionMouseOver = true;
          this.handleListboxEvent(event, void 0, () => this.focusFirstOption());
        }
        break;
      case "End":
        if (this.isOpen) {
          this.blockSuggestionMouseOver = true;
          this.handleListboxEvent(event, void 0, () => this.focusLastOption());
        }
        break;
      case "PageUp":
        this.blockSuggestionMouseOver = true;
        this.handleListboxEvent(event, void 0, () => this.isOpen && this.moveFocus(-10));
        break;
      case "PageDown":
        this.blockSuggestionMouseOver = true;
        this.handleListboxEvent(event, void 0, () => this.isOpen && this.moveFocus(10, -1));
        break;
    }
  }
  handleListboxMouseMove() {
    this.blockSuggestionMouseOver = false;
  }
};
var GROUP_CLASSES = {
  "kol-combobox": bem.forBlock("kol-combobox")("group"),
  "kol-single-select": bem.forBlock("kol-single-select")("group")
};
var ListboxGroupFC = ({ block }, children) => h("div", { class: GROUP_CLASSES[block] }, children);

export {
  hasClearButtonProp,
  CustomSuggestionsOptionsGroupFC,
  CustomSuggestionsOptionFC,
  BaseListboxWebComponent,
  ListboxGroupFC
};
//# sourceMappingURL=chunk-43IW5XWF.js.map
