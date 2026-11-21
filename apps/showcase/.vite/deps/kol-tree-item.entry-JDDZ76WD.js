import {
  invalidateOpenItemsCache
} from "./chunk-CB5QJJ3Z.js";
import {
  LinkFC,
  ariaCurrentValueProp,
  linkPropsConfig
} from "./chunk-JLURN3RE.js";
import "./chunk-ETC363DC.js";
import {
  hrefProp
} from "./chunk-U2POW5WN.js";
import {
  onLocationChange
} from "./chunk-L5RCXHD3.js";
import {
  KolTreeTag
} from "./chunk-6OHARAC5.js";
import {
  openProp
} from "./chunk-OJ2SEHMP.js";
import "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import "./chunk-JIRF5MWS.js";
import "./chunk-7Q2QTJQF.js";
import "./chunk-7C3Y25NJ.js";
import {
  createCtaRef,
  directFocus
} from "./chunk-VFFG6S5V.js";
import {
  createUniqueId
} from "./chunk-FQ2Y4FDM.js";
import "./chunk-SESBZTFK.js";
import "./chunk-ZVS5ACKA.js";
import {
  renderLabelWithLang
} from "./chunk-AVJUB7OE.js";
import {
  IconFC
} from "./chunk-NQNQ4CHG.js";
import {
  __decorate
} from "./chunk-7UI7W6EF.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import {
  labelLangSegmentsProp
} from "./chunk-QVVQWVZC.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  buildDefaultPropsFromConfig,
  createPropDefinition,
  normalizeBoolean
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

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-tree-item.entry.js
var activeProp = createPropDefinition("active", false, normalizeBoolean);
var treeItemPropsConfig = {
  required: [hrefProp, labelLangSegmentsProp],
  optional: [activeProp]
};
var treeItemBem = bem.forBlock("kol-tree-item");
var BEM_CLASS_TREE_ITEM__CHILDREN = treeItemBem("children");
var BEM_CLASS_TREE_ITEM__LINK_INNER = treeItemBem("link-inner");
var BEM_CLASS_TREE_ITEM__TEXT = treeItemBem("text");
var BEM_CLASS_TREE_ITEM__TOGGLE_BUTTON = treeItemBem("toggle-button");
var BEM_CLASS_TREE_ITEM__TOGGLE_BUTTON_ICON = treeItemBem("toggle-button-icon");
var BEM_CLASS_TREE_ITEM__TOGGLE_BUTTON_PLACEHOLDER = treeItemBem("toggle-button-placeholder");
var LINK_DEFAULTS = Object.freeze(buildDefaultPropsFromConfig(linkPropsConfig));
var noop = () => void 0;
var TreeItemFC = ({ active, ariaCurrent, groupId, handleAnchorClick, handleSlotchange, handleToggleClick, hasChildren, href, label, level, open, refAnchor }) => h(BemRootNodeFC, { component: "li", block: "kol-tree-item", role: "none", style: { "--level": `${level}` } }, h("span", { class: treeItemBem("link", { active, "first-level": level === 0 }) }, h(LinkFC, Object.assign({}, LINK_DEFAULTS, { ariaCurrent, ariaDescriptionId: "", ariaExpanded: hasChildren ? open ? "true" : "false" : "", ariaOwns: hasChildren ? groupId : "", expertSlot: true, handleAnchorClick, href, label: "", refAnchor, refTooltip: noop, role: "treeitem", tabIndex: active ? 0 : -1 }), h("span", { class: BEM_CLASS_TREE_ITEM__LINK_INNER }, hasChildren ? h("span", { class: BEM_CLASS_TREE_ITEM__TOGGLE_BUTTON, onClick: handleToggleClick }, h(IconFC, { class: BEM_CLASS_TREE_ITEM__TOGGLE_BUTTON_ICON, icons: `kolicon kolicon-${open ? "chevron-down" : "chevron-right"}`, label: "" })) : h("span", { class: BEM_CLASS_TREE_ITEM__TOGGLE_BUTTON_PLACEHOLDER }), h("span", { class: BEM_CLASS_TREE_ITEM__TEXT }, renderLabelWithLang(label))))), h("ul", { class: BEM_CLASS_TREE_ITEM__CHILDREN, hidden: !hasChildren || !open, role: "group", id: groupId }, h("slot", { onSlotchange: handleSlotchange })));
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tree-item__link .kol-link {     display: inline-flex;     width: 100%;     min-height: var(--a11y-min-size);     align-items: center;     text-decoration: none;        }   .kol-tree-item__link .kol-link__interactive-element {     flex: 1 1 auto;     text-decoration: none;   }   .kol-tree-item__link-inner {     display: flex;     align-items: center;   }   .kol-tree-item__children {     margin: 0;     padding: 0;     list-style: none;   }   .kol-tree-item .kol-span {     place-items: unset;   }   .kol-tree-item__toggle-button, .kol-tree-item__toggle-button-placeholder {     display: inline-flex;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     justify-content: center;   }   .kol-tree-item__text {     text-decoration: underline;   } }`;
var KolTreeItem = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolTreeItem)
      registerInstance(this, hostRef);
    this.ariaCurrent = "";
    this.groupId = createUniqueId("tree-group");
    this.hasChildren = false;
    this.level = 0;
    this.open = false;
    this.anchorRef = createCtaRef();
    this.propsConfig = treeItemPropsConfig;
    this._active = void 0;
    this._open = void 0;
    this.handleAnchorClick = () => {
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.click, this.getRenderProp("href"));
      }
    };
    this.handleSlotchange = () => {
      this.checkForChildren();
    };
    this.handleToggleClick = (event) => {
      event.preventDefault();
      const open = this.open;
      void this.focus().then(() => this.setOpen(!open));
    };
  }
  watchActive(value) {
    activeProp.apply(value, (v) => this.setRenderProp("active", v));
  }
  watchLabel(value) {
    labelLangSegmentsProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  watchOpen(value) {
    openProp.apply(value, (v) => {
      this.open = v;
      invalidateOpenItemsCache(this.getTree());
    });
  }
  watchHref(value) {
    hrefProp.apply(value, (v) => this.setRenderProp("href", v), this.isRequired("href"));
  }
  focus(options) {
    return Promise.resolve();
  }
  expand() {
    this.setOpen(true);
    return Promise.resolve();
  }
  collapse() {
    this.setOpen(false);
    return Promise.resolve();
  }
  isOpen() {
    return Promise.resolve(this.open);
  }
  componentWillLoad() {
    this.watchActive(this._active);
    this.watchHref(this._href);
    this.watchLabel(this._label);
    this.watchOpen(this._open);
    this.checkForChildren();
    this.determineTreeItemDepth();
    this.unsubscribeOnLocationChange = onLocationChange((location) => {
      const ariaCurrent = location === this.getRenderProp("href") ? ariaCurrentValueProp.getDefaultValue() : "";
      if (this.ariaCurrent !== ariaCurrent) {
        this.ariaCurrent = ariaCurrent;
      }
    });
  }
  disconnectedCallback() {
    if (this.unsubscribeOnLocationChange) {
      this.unsubscribeOnLocationChange();
      this.unsubscribeOnLocationChange = void 0;
    }
  }
  determineTreeItemDepth() {
    var _a, _b;
    let level = 0;
    let traverseItem = (_b = (_a = this.host) === null || _a === void 0 ? void 0 : _a.parentElement) !== null && _b !== void 0 ? _b : null;
    while (traverseItem !== null && traverseItem.tagName.toLowerCase() !== KolTreeTag && traverseItem !== document.body) {
      traverseItem = traverseItem.parentElement;
      level += 1;
    }
    this.level = level;
  }
  checkForChildren() {
    var _a, _b;
    this.hasChildren = Array.from((_b = (_a = this.host) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : []).some((element) => !element.slot);
  }
  getTree() {
    var _a;
    let element = this.host;
    while (element) {
      const tree = element.closest(KolTreeTag);
      if (tree) {
        return tree;
      }
      const shadowHost = (_a = element.getRootNode()) === null || _a === void 0 ? void 0 : _a.host;
      if (!shadowHost || shadowHost === document.body) {
        break;
      }
      element = shadowHost;
    }
    return void 0;
  }
  setOpen(open) {
    if (this.hasChildren) {
      this.open = open;
      invalidateOpenItemsCache(this.getTree());
    }
  }
  render() {
    return h(Host, { key: "ef8d3be5e78ab5bf78a56cfb3a7a598dff63b129" }, h(TreeItemFC, { key: "e180a324da3af9afd90821a831aa3b394b009f0e", active: this.getRenderProp("active"), ariaCurrent: this.ariaCurrent, groupId: this.groupId, handleAnchorClick: this.handleAnchorClick, handleSlotchange: this.handleSlotchange, handleToggleClick: this.handleToggleClick, hasChildren: this.hasChildren, href: this.getRenderProp("href"), label: this.getRenderProp("label"), level: this.level, open: this.open, refAnchor: this.anchorRef }));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_active": [{
        "watchActive": 0
      }],
      "_label": [{
        "watchLabel": 0
      }],
      "_open": [{
        "watchOpen": 0
      }],
      "_href": [{
        "watchHref": 0
      }]
    };
  }
};
__decorate([
  directFocus("anchorRef")
], KolTreeItem.prototype, "focus", null);
KolTreeItem.style = {
  default: defaultStyleCss()
};
export {
  KolTreeItem as kol_tree_item
};
//# sourceMappingURL=kol-tree-item.entry-JDDZ76WD.js.map
