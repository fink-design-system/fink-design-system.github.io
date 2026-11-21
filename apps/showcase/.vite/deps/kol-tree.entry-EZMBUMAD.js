import {
  registerOpenItemsCache,
  unregisterOpenItemsCache
} from "./chunk-CB5QJJ3Z.js";
import {
  KolTreeItemTag,
  KolTreeTag
} from "./chunk-6OHARAC5.js";
import {
  labelProp
} from "./chunk-PVPG337L.js";
import {
  delegateFocus
} from "./chunk-ZVS5ACKA.js";
import "./chunk-7UI7W6EF.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  Host,
  getElement,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-tree.entry.js
var treePropsConfig = {
  required: [labelProp]
};
var treeBem = bem.forBlock("kol-tree");
var BEM_CLASS_TREE__TREEVIEW_NAVIGATION = treeBem("treeview-navigation");
var TreeFC = ({ handleSlotchange, label }) => h(BemRootNodeFC, { component: "nav", block: "kol-tree", "aria-label": label }, h("ul", { class: BEM_CLASS_TREE__TREEVIEW_NAVIGATION, role: "tree", "aria-label": label }, h("slot", { onSlotchange: handleSlotchange })));
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   .kol-tree__treeview-navigation {     margin: 0;     padding: 0;     list-style: none;   }   .kol-tree:focus-within {     outline: 1px solid;     outline-offset: 2px;   } }`;
var isTreeItem = (element) => (element === null || element === void 0 ? void 0 : element.tagName) === KolTreeItemTag.toUpperCase();
var KolTree = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolTree)
      registerInstance(this, hostRef);
    this.cacheValid = false;
    this.propsConfig = treePropsConfig;
    this.invalidateOpenItemsCache = () => {
      this.cacheValid = false;
    };
    this.handleSlotchange = () => {
      this.observeTopLevelItems();
      this.scheduleTreeChange();
    };
  }
  watchLabel(value) {
    labelProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  async focus(options) {
    if (this.host) {
      await delegateFocus(this.host, async () => {
        var _a;
        const openItems = await this.getOpenTreeItemElements();
        await ((_a = openItems === null || openItems === void 0 ? void 0 : openItems[0]) === null || _a === void 0 ? void 0 : _a.focus(options));
      });
    }
  }
  connectedCallback() {
    if (this.host) {
      registerOpenItemsCache(this.host, this.invalidateOpenItemsCache);
    }
  }
  componentWillLoad() {
    this.watchLabel(this._label);
    this.handleTreeChange();
    this.observeChildListMutations();
  }
  disconnectedCallback() {
    var _a;
    if (this.host) {
      unregisterOpenItemsCache(this.host);
    }
    (_a = this.observer) === null || _a === void 0 ? void 0 : _a.disconnect();
    if (this.rafHandle !== void 0) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = void 0;
    }
  }
  async handleKeyDown(event) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (event.key === "Tab" && event.shiftKey && event.target !== this.host) {
      (_a = this.host) === null || _a === void 0 ? void 0 : _a.setAttribute("tabindex", "-1");
      return;
    }
    const currentTreeItem = event.composedPath().find(isTreeItem);
    const openItems = await this.getOpenTreeItemElements();
    const hasModifierKeyPressed = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
    if (!openItems || !currentTreeItem) {
      return;
    }
    const currentIndex = openItems.findIndex((elem) => elem === currentTreeItem);
    switch (event.key) {
      case "ArrowDown": {
        await ((_b = openItems[currentIndex + 1]) === null || _b === void 0 ? void 0 : _b.focus());
        event.preventDefault();
        break;
      }
      case "ArrowUp": {
        await ((_c = openItems[currentIndex - 1]) === null || _c === void 0 ? void 0 : _c.focus());
        event.preventDefault();
        break;
      }
      case "Right":
      case "ArrowRight": {
        event.preventDefault();
        if (await currentTreeItem.isOpen()) {
          await ((_d = openItems[currentIndex + 1]) === null || _d === void 0 ? void 0 : _d.focus());
        } else {
          await currentTreeItem.expand();
        }
        break;
      }
      case "Left":
      case "ArrowLeft": {
        event.preventDefault();
        if (await currentTreeItem.isOpen()) {
          await currentTreeItem.collapse();
        } else {
          const parentItem = currentTreeItem.parentElement;
          const parentIndex = parentItem ? openItems.indexOf(parentItem) : -1;
          if (parentIndex !== -1) {
            await ((_e = openItems[parentIndex]) === null || _e === void 0 ? void 0 : _e.focus());
          }
        }
        break;
      }
      case "Home": {
        await ((_f = openItems[0]) === null || _f === void 0 ? void 0 : _f.focus());
        event.preventDefault();
        break;
      }
      case "End": {
        await ((_g = openItems[openItems.length - 1]) === null || _g === void 0 ? void 0 : _g.focus());
        event.preventDefault();
        break;
      }
      case ((_h = event.key.match(/^[a-zA-Z0-9]$/)) === null || _h === void 0 ? void 0 : _h.input): {
        if (!hasModifierKeyPressed) {
          const char = event.key.toLowerCase();
          const startIndex = currentIndex + 1;
          const startsWithChar = (item) => {
            var _a2, _b2;
            return (_b2 = (_a2 = item.getAttribute("_label")) === null || _a2 === void 0 ? void 0 : _a2.trim().toLowerCase().startsWith(char)) !== null && _b2 !== void 0 ? _b2 : false;
          };
          let matchIndex = openItems.slice(startIndex).findIndex(startsWithChar);
          if (matchIndex === -1) {
            matchIndex = openItems.slice(0, startIndex).findIndex(startsWithChar);
          } else {
            matchIndex += startIndex;
          }
          if (matchIndex !== -1) {
            await ((_j = openItems[matchIndex]) === null || _j === void 0 ? void 0 : _j.focus());
            event.preventDefault();
          }
        }
        break;
      }
      case "*": {
        const siblings = (_k = currentTreeItem.parentElement) === null || _k === void 0 ? void 0 : _k.querySelectorAll(KolTreeItemTag);
        siblings === null || siblings === void 0 ? void 0 : siblings.forEach((element) => {
          void element.expand();
        });
        break;
      }
    }
  }
  handleFocusIn(event) {
    if (event.target === this.host && !this.isWithinTree(event.relatedTarget)) {
      requestAnimationFrame(() => {
        void this.focus();
      });
    }
  }
  handleFocusOut(event) {
    var _a;
    if (!this.isWithinTree(event.relatedTarget)) {
      (_a = this.host) === null || _a === void 0 ? void 0 : _a.setAttribute("tabindex", "0");
    }
    if (event.relatedTarget && !event.relatedTarget.closest(KolTreeTag)) {
      this.ensureActiveItemVisibility();
    }
  }
  isWithinTree(node) {
    var _a, _b;
    return node instanceof Node && node !== this.host && ((_b = (_a = this.host) === null || _a === void 0 ? void 0 : _a.contains(node)) !== null && _b !== void 0 ? _b : false);
  }
  observeChildListMutations() {
    this.observer = new MutationObserver(() => this.scheduleTreeChange());
    this.observeTopLevelItems();
  }
  observeTopLevelItems() {
    this.getTopLevelTreeItems().forEach((treeItem) => {
      var _a;
      (_a = this.observer) === null || _a === void 0 ? void 0 : _a.observe(treeItem, { childList: true, subtree: true });
    });
  }
  scheduleTreeChange() {
    if (this.rafHandle)
      cancelAnimationFrame(this.rafHandle);
    this.rafHandle = requestAnimationFrame(() => {
      this.handleTreeChange();
    });
  }
  getTopLevelTreeItems() {
    var _a, _b;
    return Array.from((_b = (_a = this.host) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : []).filter((element) => isTreeItem(element) && !element.slot);
  }
  handleTreeChange() {
    this.treeItemElements = this.getTreeItemElements();
    this.cacheValid = false;
    this.ensureActiveItemVisibility();
  }
  getTreeItemElements() {
    return this.getTopLevelTreeItems().reduce((accumulator, currentValue) => {
      const children = currentValue.querySelectorAll(KolTreeItemTag);
      return [...accumulator, currentValue, ...children];
    }, []);
  }
  async getOpenTreeItemElements() {
    if (!this.treeItemElements) {
      return;
    }
    if (this.cacheValid && this.cachedOpenItems) {
      return this.cachedOpenItems;
    }
    const areAllParentsOpen = async (element) => {
      let parent = element.parentElement;
      while (isTreeItem(parent)) {
        if (!await parent.isOpen()) {
          return false;
        }
        parent = parent.parentElement;
      }
      return true;
    };
    this.cachedOpenItems = await Promise.all(this.treeItemElements.map(async (item) => ({
      item,
      isOpen: await areAllParentsOpen(item)
    }))).then((results) => results.filter(({ isOpen }) => isOpen).map(({ item }) => item));
    this.cacheValid = true;
    return this.cachedOpenItems;
  }
  ensureActiveItemVisibility() {
    const findActiveItem = () => {
      for (const rootNode of this.getTopLevelTreeItems()) {
        if (rootNode._active) {
          return rootNode;
        }
        const childMatch = rootNode.querySelector(`${KolTreeItemTag}[_active="true"]`);
        if (childMatch === null || childMatch === void 0 ? void 0 : childMatch._active) {
          return childMatch;
        }
      }
    };
    const expandParentElements = (element) => {
      if (isTreeItem(element.parentElement)) {
        void element.parentElement.expand();
        expandParentElements(element.parentElement);
      }
    };
    const target = findActiveItem();
    if (target) {
      expandParentElements(target);
    }
  }
  render() {
    return h(Host, { key: "df55eb6b968ef985ef6c738815e66aa9cd88b9e1", tabindex: "0" }, h(TreeFC, { key: "e874b2de9b9e9e7e4f757bb418b698e9e06c239f", handleSlotchange: this.handleSlotchange, label: this.getRenderProp("label") }));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_label": [{
        "watchLabel": 0
      }]
    };
  }
};
KolTree.style = {
  default: defaultStyleCss()
};
export {
  KolTree as kol_tree
};
//# sourceMappingURL=kol-tree.entry-EZMBUMAD.js.map
