import {
  createLinkItem
} from "./chunk-TGGYHXBL.js";
import "./chunk-5NZISYSR.js";
import {
  createItemPool
} from "./chunk-HRRUQDE3.js";
import {
  createButtonItem
} from "./chunk-RSHHA2HG.js";
import {
  createLinksPropDefinition
} from "./chunk-CC3JSFM3.js";
import {
  addNavLabel,
  removeNavLabel
} from "./chunk-WUIMGAAG.js";
import "./chunk-SR6CIZZ2.js";
import "./chunk-TXIZUTEV.js";
import {
  LinkFC
} from "./chunk-JLURN3RE.js";
import "./chunk-ETC363DC.js";
import "./chunk-U2POW5WN.js";
import "./chunk-L5RCXHD3.js";
import "./chunk-6OHARAC5.js";
import {
  labelProp
} from "./chunk-PVPG337L.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import "./chunk-AIH4BWIT.js";
import "./chunk-IGUFDWYR.js";
import {
  ButtonFC
} from "./chunk-3C6UB25G.js";
import {
  hideLabelProp
} from "./chunk-JIRF5MWS.js";
import "./chunk-FGYUAXNO.js";
import "./chunk-7Q2QTJQF.js";
import "./chunk-7C3Y25NJ.js";
import "./chunk-MIXJLZBB.js";
import "./chunk-VFFG6S5V.js";
import {
  createRelatedUniqueId,
  createUniqueId
} from "./chunk-FQ2Y4FDM.js";
import "./chunk-SESBZTFK.js";
import "./chunk-ZVS5ACKA.js";
import "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import "./chunk-7UI7W6EF.js";
import "./chunk-TR6JQWDR.js";
import "./chunk-QVVQWVZC.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  clsx,
  createPropDefinition,
  normalizeBoolean,
  resolveFcProps
} from "./chunk-KPGE6Z2R.js";
import "./chunk-MQNHCCSC.js";
import {
  Host,
  forceUpdate,
  getElement,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import {
  a11yHintLabelingLandmarks,
  devHint
} from "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-nav.entry.js
var collapsibleProp = createPropDefinition("collapsible", true, normalizeBoolean);
var hasCompactButtonProp = createPropDefinition("hasCompactButton", false, normalizeBoolean);
var hasIconsWhenExpandedProp = createPropDefinition("hasIconsWhenExpanded", false, normalizeBoolean);
var navLinksProp = createLinksPropDefinition("KolNav");
var navPropsConfig = {
  required: [labelProp, navLinksProp],
  optional: [collapsibleProp, hasCompactButtonProp, hasIconsWhenExpandedProp, hideLabelProp]
};
var isLinkEntry = (entry) => typeof entry._href === "string";
var isButtonEntry = (entry) => {
  var _a;
  return entry._href === void 0 && typeof ((_a = entry._on) === null || _a === void 0 ? void 0 : _a.onClick) === "function";
};
function getInitiallyExpanded(links) {
  const expanded = [];
  const handleBranch = (branch) => {
    if (branch._active) {
      if (branch._children) {
        expanded.push(branch._children);
      }
      return true;
    }
    if (branch._children) {
      for (const child of branch._children) {
        if (handleBranch(child)) {
          expanded.push(branch._children);
          return true;
        }
      }
    }
    return false;
  };
  links.forEach(handleBranch);
  return expanded;
}
function toggleExpanded(expanded, children) {
  return expanded.includes(children) ? expanded.filter((item) => item !== children) : [...expanded, children];
}
function getLeftIcon(entry) {
  var _a;
  if (typeof entry._icons === "string") {
    return entry._icons;
  }
  return typeof ((_a = entry._icons) === null || _a === void 0 ? void 0 : _a.left) === "string" ? entry._icons.left : void 0;
}
function buildEntryIcons({ collapsible, expanded, hasIconsWhenExpanded, hideLabel, leftIcon }) {
  const icons = { left: "", right: "" };
  if (hasIconsWhenExpanded && leftIcon) {
    icons.left = leftIcon;
  }
  if (hideLabel) {
    icons.left = leftIcon || "kolicon-link";
  }
  if (collapsible) {
    icons.right = expanded ? "kolicon-minus" : "kolicon-plus";
  }
  return icons;
}
var renderEntry = (props, entry, hasChildren, expanded, ariaId) => {
  const { collapsible, compact, getButtonFcProps, getLinkFcProps, handleToggleExpansion, hasIconsWhenExpanded } = props;
  const icons = buildEntryIcons({
    collapsible: collapsible && hasChildren,
    expanded,
    hasIconsWhenExpanded,
    hideLabel: compact,
    leftIcon: getLeftIcon(entry)
  });
  return h("div", { class: "kol-nav__entry-wrapper" }, isLinkEntry(entry) ? h("div", { class: clsx("kol-nav__entry kol-nav__entry--link", {
    "kol-nav__entry--collapsible": collapsible
  }) }, h(LinkFC, Object.assign({}, getLinkFcProps(`link-${ariaId}`, Object.assign(Object.assign({}, entry), { _hideLabel: compact, _icons: icons, _ariaControls: collapsible && hasChildren && expanded ? ariaId : void 0, _ariaExpanded: collapsible && hasChildren ? expanded : void 0 }))))) : h("div", { class: clsx("kol-nav__entry kol-nav__entry--button", {
    "kol-nav__entry--collapsible": collapsible
  }) }, h(ButtonFC, Object.assign({}, getButtonFcProps(`button-${ariaId}`, {
    _label: entry._label,
    _disabled: isButtonEntry(entry) ? entry._disabled : void 0,
    _hideLabel: compact,
    _icons: icons,
    _ariaControls: collapsible && hasChildren && expanded ? ariaId : void 0,
    _ariaExpanded: collapsible && hasChildren ? expanded : void 0,
    _on: {
      onClick: (event, value) => {
        if (isButtonEntry(entry) && typeof entry._on.onClick === "function") {
          entry._on.onClick(event, value);
        }
        handleToggleExpansion(entry._children);
      }
    }
  })))));
};
var NavListFC = (props) => h("ul", { class: clsx("kol-nav__list", {
  "kol-nav__list--nested": props.deep > 0,
  "kol-nav__list--vertical": props.deep !== 0
}), id: props.deep > 0 ? props.id : void 0 }, props.links.map((link, index) => {
  const hasChildren = Array.isArray(link._children) && link._children.length > 0;
  const expanded = Boolean(link._children && props.expandedChildren.includes(link._children));
  const ariaId = createRelatedUniqueId(props.id, `${props.deep}-${index}`);
  return h("li", { class: clsx("kol-nav__list-item", {
    "kol-nav__list-item--active": !!link._active,
    "kol-nav__list-item--expanded": expanded,
    "kol-nav__list-item--has-children": hasChildren
  }), key: index }, renderEntry(props, link, hasChildren, expanded, ariaId), expanded && h(NavListFC, Object.assign({}, props, { deep: props.deep + 1, links: link._children || [], id: ariaId })));
}));
var NavFC = (props) => {
  const { collapsible, compact, expandedChildren, getButtonFcProps, getLinkFcProps, handleToggleCompact, handleToggleExpansion, hasCompactButton, hasIconsWhenExpanded, label, links, listId, navId } = resolveFcProps(navPropsConfig, props);
  return h(BemRootNodeFC, { block: "kol-nav", modifiers: { "is-compact": compact } }, h("nav", { "aria-label": label, class: "kol-nav__navigation", id: navId }, h(NavListFC, { collapsible, compact, deep: 0, expandedChildren, getButtonFcProps, getLinkFcProps, handleToggleExpansion, hasIconsWhenExpanded, id: listId, links })), hasCompactButton && h("div", { class: "kol-nav__compact" }, h("div", { class: "kol-nav__toggle-button" }, h(ButtonFC, Object.assign({}, getButtonFcProps("compact-toggle", {
    _ariaControls: navId,
    _ariaExpanded: !compact,
    _icons: compact ? "kolicon-chevron-right" : "kolicon-chevron-left",
    _hideLabel: true,
    _label: compact ? translate("kol-nav-maximize") : translate("kol-nav-minimize"),
    _on: { onClick: handleToggleCompact },
    _tooltipAlign: "right"
  }))))));
};
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }   @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-button {     background-color: transparent;     display: inline-block;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     margin: 0;     padding: 0;          text-align: center;        }   .kol-button__interactive-element {     border-style: none;     display: block;     border-width: medium;          font-weight: inherit;     font-style: inherit;     text-align: inherit;   }   .kol-button {        }   .kol-button__tooltip {     height: 0;   }   .kol-nav {     display: grid;     place-items: center;   }   .kol-nav:not(.kol-nav--is-compact) .kol-nav__navigation {     width: 100%;   }   .kol-nav__navigation .kol-span {     width: 100%;     justify-content: flex-start;   }   .kol-nav__navigation .kol-span__container {     width: 100%;   }   .kol-nav__navigation .kol-span__container .kol-span__label {     flex: 1;   }   .kol-nav__list {     display: flex;     margin: 0;     padding: 0;     flex-direction: column;     list-style: none;   }   .kol-nav__entry-wrapper {     display: flex;   }   .kol-nav__entry {     flex-grow: 1;   }   .kol-button {     text-align: left;   } }`;
var KolNav = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolNav)
      registerInstance(this, hostRef);
    this.compact = false;
    this.expandedChildren = [];
    this.navId = createUniqueId("kol-nav");
    this.listId = createRelatedUniqueId(this.navId, "list");
    this.buttonItems = createItemPool(() => createButtonItem(() => this.host), (item) => item.syncListeners(), (item) => item.destroy());
    this.linkItems = createItemPool(() => createLinkItem(() => forceUpdate(this)), (item) => item.syncListeners(), (item) => item.destroy());
    this.propsConfig = navPropsConfig;
    this._collapsible = true;
    this._hasCompactButton = false;
    this._hasIconsWhenExpanded = false;
    this._hideLabel = false;
    this.getButtonFcProps = (key, props) => this.buttonItems.get(key).getFcProps(props);
    this.getLinkFcProps = (key, props) => this.linkItems.get(key).getFcProps(props);
    this.handleToggleExpansion = (children) => {
      if (children) {
        this.expandedChildren = toggleExpanded(this.expandedChildren, children);
      }
    };
    this.handleToggleCompact = () => {
      this.compact = !this.compact;
    };
  }
  watchCollapsible(value) {
    collapsibleProp.apply(value, (v) => this.setRenderProp("collapsible", v));
  }
  watchHasCompactButton(value) {
    hasCompactButtonProp.apply(value, (v) => this.setRenderProp("hasCompactButton", v));
  }
  watchHasIconsWhenExpanded(value) {
    hasIconsWhenExpandedProp.apply(value, (v) => this.setRenderProp("hasIconsWhenExpanded", v));
  }
  watchHideLabel(value) {
    hideLabelProp.apply(value, (v) => {
      this.compact = v;
    });
  }
  watchLabel(value) {
    this.applyLabel(value);
  }
  watchLinks(value) {
    navLinksProp.apply(value, (v) => this.setRenderProp("links", v));
    devHint(`[KolNav] The navigation structure is not yet validated recursively.`);
    this.expandedChildren = getInitiallyExpanded(this.getRenderProp("links"));
  }
  componentWillLoad() {
    this.watchCollapsible(this._collapsible);
    this.watchHideLabel(this._hideLabel);
    this.watchHasCompactButton(this._hasCompactButton);
    this.watchHasIconsWhenExpanded(this._hasIconsWhenExpanded);
    this.applyLabel(this._label, true);
    this.watchLinks(this._links);
  }
  componentDidRender() {
    this.buttonItems.endRender();
    this.linkItems.endRender();
  }
  disconnectedCallback() {
    removeNavLabel(this.getRenderProp("label"));
    this.buttonItems.destroy();
    this.linkItems.destroy();
  }
  applyLabel(value, initial = false) {
    if (!initial) {
      removeNavLabel(this.getRenderProp("label"));
    }
    labelProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
    a11yHintLabelingLandmarks(value);
    addNavLabel(this.getRenderProp("label"));
  }
  render() {
    this.buttonItems.beginRender();
    this.linkItems.beginRender();
    return h(Host, { key: "b6060fa9735e6b48fdf405b78f88b7228d5b3025" }, h(NavFC, { key: "a6e3be60d059c75e5e868e009a83530e34e01b1d", collapsible: this.getRenderProp("collapsible"), compact: this.compact, expandedChildren: this.expandedChildren, getButtonFcProps: this.getButtonFcProps, getLinkFcProps: this.getLinkFcProps, handleToggleCompact: this.handleToggleCompact, handleToggleExpansion: this.handleToggleExpansion, hasCompactButton: this.getRenderProp("hasCompactButton"), hasIconsWhenExpanded: this.getRenderProp("hasIconsWhenExpanded"), label: this.getRenderProp("label"), links: this.getRenderProp("links"), listId: this.listId, navId: this.navId }));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_collapsible": [{
        "watchCollapsible": 0
      }],
      "_hasCompactButton": [{
        "watchHasCompactButton": 0
      }],
      "_hasIconsWhenExpanded": [{
        "watchHasIconsWhenExpanded": 0
      }],
      "_hideLabel": [{
        "watchHideLabel": 0
      }],
      "_label": [{
        "watchLabel": 0
      }],
      "_links": [{
        "watchLinks": 0
      }]
    };
  }
};
KolNav.style = {
  default: defaultStyleCss()
};
export {
  KolNav as kol_nav
};
//# sourceMappingURL=kol-nav.entry-DDQHX3PY.js.map
