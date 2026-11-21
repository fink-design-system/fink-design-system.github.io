import {
  createLinksPropDefinition
} from "./chunk-CC3JSFM3.js";
import {
  addNavLabel,
  removeNavLabel
} from "./chunk-WUIMGAAG.js";
import {
  validateAccessAndShortKey
} from "./chunk-TXIZUTEV.js";
import {
  LinkFC,
  ariaCurrentValueProp,
  downloadProp,
  linkCallbacksProp,
  linkPropsConfig
} from "./chunk-JLURN3RE.js";
import {
  linkTargetProp
} from "./chunk-ETC363DC.js";
import {
  hrefProp
} from "./chunk-U2POW5WN.js";
import {
  onLocationChange
} from "./chunk-L5RCXHD3.js";
import {
  labelProp
} from "./chunk-PVPG337L.js";
import "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
import {
  accessKeyProp,
  ariaControlsProp,
  ariaDescriptionProp,
  hideLabelProp,
  inlineProp,
  shortKeyProp,
  spanIconsProp,
  tabIndexProp,
  tooltipAlignProp
} from "./chunk-JIRF5MWS.js";
import "./chunk-FGYUAXNO.js";
import "./chunk-7Q2QTJQF.js";
import {
  labelWithExpertSlotProp
} from "./chunk-7C3Y25NJ.js";
import "./chunk-MIXJLZBB.js";
import {
  createCtaRef
} from "./chunk-VFFG6S5V.js";
import {
  nonce
} from "./chunk-FQ2Y4FDM.js";
import {
  disabledProp
} from "./chunk-SESBZTFK.js";
import "./chunk-ZVS5ACKA.js";
import {
  renderLabelWithLang
} from "./chunk-AVJUB7OE.js";
import {
  IconFC
} from "./chunk-NQNQ4CHG.js";
import "./chunk-7UI7W6EF.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import "./chunk-QVVQWVZC.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  buildDefaultPropsFromConfig,
  trimLabel
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  Fragment,
  Host,
  getElement,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import {
  X,
  a11yHintLabelingLandmarks,
  setEventTarget
} from "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-breadcrumb.entry.js
var breadcrumbLinksProp = createLinksPropDefinition("KolBreadcrumb");
var breadcrumbPropsConfig = {
  required: [breadcrumbLinksProp, labelProp]
};
var breadcrumbBem = bem.forBlock("kol-breadcrumb");
var BEM_CLASS_BREADCRUMB__ICON = breadcrumbBem("icon");
var BEM_CLASS_BREADCRUMB__LINK = breadcrumbBem("link");
var BEM_CLASS_BREADCRUMB__LIST = breadcrumbBem("list");
var BEM_CLASS_BREADCRUMB__LIST_ELEMENT = breadcrumbBem("list-element");
var BEM_CLASS_BREADCRUMB__LIST_ELEMENT_SPAN = breadcrumbBem("list-element-span");
var BEM_CLASS_BREADCRUMB__SEPARATOR = breadcrumbBem("separator");
var CLASS_BREADCRUMB_EMPTY_STATE_ICON = "kol-breadcrumb_icon";
var renderLink = (item, index, lastIndex, showCurrentPage) => {
  const showSeparator = showCurrentPage ? index !== lastIndex : index < lastIndex - 1;
  if (index === lastIndex && !showCurrentPage) {
    return h(Fragment, null);
  }
  const { link } = item;
  return h("li", { class: BEM_CLASS_BREADCRUMB__LIST_ELEMENT, key: index }, index === lastIndex ? h("span", { class: BEM_CLASS_BREADCRUMB__LIST_ELEMENT_SPAN, "aria-current": "page" }, link._hideLabel ? h(IconFC, { class: BEM_CLASS_BREADCRUMB__ICON, icons: typeof link._icons === "string" ? link._icons : "kolicon-link", label: link._label ? trimLabel(link._label) : link._href }) : h(Fragment, null, renderLabelWithLang(link._label))) : h("div", { class: BEM_CLASS_BREADCRUMB__LINK }, h(LinkFC, Object.assign({}, item.fcProps))), showSeparator && h(IconFC, { class: BEM_CLASS_BREADCRUMB__SEPARATOR, icons: "kolicon-chevron-right", label: "" }));
};
var BreadcrumbFC = ({ label, linkItems, showCurrentPage }) => {
  const lastIndex = linkItems.length - 1;
  return h(BemRootNodeFC, { component: "nav", block: "kol-breadcrumb", "aria-label": label }, h("ul", { class: BEM_CLASS_BREADCRUMB__LIST }, linkItems.length === 0 && h("li", null, h(IconFC, { class: CLASS_BREADCRUMB_EMPTY_STATE_ICON, icons: "kolicon-house", label: "" }), "…"), linkItems.map((item, index) => renderLink(item, index, lastIndex, showCurrentPage))));
};
var createBreadcrumbLinkItem = (link, getHost) => {
  var _a;
  const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
  const ctaRef = createCtaRef();
  const renderProps = buildDefaultPropsFromConfig(linkPropsConfig);
  renderProps.tabIndex = void 0;
  const apply = (prop, value) => prop.apply(value, (v) => {
    renderProps[prop.propName] = v;
  });
  apply(accessKeyProp, link._accessKey);
  apply(ariaControlsProp, link._ariaControls);
  apply(ariaCurrentValueProp, link._ariaCurrentValue);
  apply(ariaDescriptionProp, link._ariaDescription);
  apply(disabledProp, link._disabled);
  apply(downloadProp, link._download);
  apply(hideLabelProp, link._hideLabel);
  apply(hrefProp, link._href);
  apply(spanIconsProp, link._icons);
  apply(inlineProp, (_a = link._inline) !== null && _a !== void 0 ? _a : false);
  apply(labelWithExpertSlotProp, link._label);
  apply(linkCallbacksProp, link._on);
  apply(shortKeyProp, link._shortKey);
  if (typeof link._tabIndex === "number") {
    apply(tabIndexProp, link._tabIndex);
  }
  apply(linkTargetProp, link._target);
  apply(tooltipAlignProp, link._tooltipAlign);
  validateAccessAndShortKey(link._accessKey, link._shortKey);
  const getTooltipLabel = () => {
    const label = renderProps.label;
    if (typeof label === "string" && label.length > 0) {
      return label;
    }
    const href = renderProps.href;
    return typeof href === "string" ? href : "";
  };
  tooltipBehavior.componentWillLoad({
    label: getTooltipLabel(),
    align: renderProps.tooltipAlign
  });
  renderProps.ariaCurrent = "";
  renderProps.ariaDescriptionId = nonce();
  renderProps.expertSlot = link._label === "";
  const getResolvedHref = () => typeof renderProps.href === "string" ? renderProps.href : "";
  const handleAnchorClick = (event) => {
    tooltipBehavior.hideTooltip();
    if (renderProps.disabled === true) {
      event.preventDefault();
      return;
    }
    const href = getResolvedHref();
    const on = renderProps.on;
    if (typeof (on === null || on === void 0 ? void 0 : on.onClick) === "function") {
      setEventTarget(event, ctaRef.el);
      on.onClick(event, href);
    }
    const host = getHost();
    if (host) {
      dispatchDomEvent(host, KolEvent.click, href);
    }
  };
  renderProps.handleAnchorClick = handleAnchorClick;
  renderProps.refAnchor = (el) => {
    ctaRef(el);
  };
  renderProps.refTooltip = tooltipBehavior.setTooltipElementRef;
  return {
    link,
    fcProps: renderProps,
    syncTooltipListeners: () => {
      if (ctaRef.el) {
        tooltipBehavior.syncListeners(void 0, ctaRef.el, true);
      }
    },
    destroy: () => {
      tooltipBehavior.destroy();
    }
  };
};
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }  @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   :host {     display: inline-block;   }   .kol-link {     display: inline-flex;     max-width: fit-content;   }   .kol-link--standalone {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: stretch;        }   .kol-link--standalone .kol-link__interactive-element {     align-items: stretch;   }   .kol-link--standalone .kol-link__text {     display: inline-flex;     flex: 1 1 100%;     place-items: center;   }   .kol-link__interactive-element {     display: inline-flex;     flex: 1;     align-items: baseline;     place-items: center;     text-align: left;     text-decoration-line: none;   }   .kol-link__interactive-element:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-link__interactive-element:hover:not([aria-disabled], [disabled]) .kol-span__label {     text-decoration-thickness: 0.2em;   }   .kol-link .kol-span__label {     text-decoration-line: underline;   }   .kol-link__icon {     display: inline-flex;   }   .kol-breadcrumb__list, .kol-breadcrumb__list-element {     display: flex;     margin: 0;     padding: 0;     flex-wrap: wrap;     place-items: center;     list-style: none;   }   .kol-breadcrumb__list-element:first-child:last-child {     min-height: var(--a11y-min-size);   } }`;
var KolBreadcrumb = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolBreadcrumb)
      registerInstance(this, hostRef);
    this.linkItems = [];
    this.showCurrentPage = true;
    this.propsConfig = breadcrumbPropsConfig;
  }
  watchLabel(value) {
    this.applyLabel(value);
  }
  watchLinks(value) {
    this.applyLinks(value);
  }
  componentWillLoad() {
    this.applyLabel(this._label, true);
    this.applyLinks(this._links);
    this.unsubscribeOnLocationChange = onLocationChange((location) => {
      this.linkItems = this.linkItems.map((item) => {
        var _a;
        const newValue = location === item.fcProps.href ? (_a = item.fcProps.ariaCurrentValue) !== null && _a !== void 0 ? _a : "" : "";
        if (item.fcProps.ariaCurrent === newValue) {
          return item;
        }
        return Object.assign(Object.assign({}, item), { fcProps: Object.assign(Object.assign({}, item.fcProps), { ariaCurrent: newValue }) });
      });
    });
  }
  componentDidRender() {
    this.linkItems.forEach((item) => item.syncTooltipListeners());
  }
  disconnectedCallback() {
    if (this.unsubscribeOnLocationChange) {
      this.unsubscribeOnLocationChange();
      this.unsubscribeOnLocationChange = void 0;
    }
    this.linkItems.forEach((item) => item.destroy());
    removeNavLabel(this.getRenderProp("label"));
  }
  applyLabel(value, initial = false) {
    if (!initial) {
      removeNavLabel(this.getRenderProp("label"));
    }
    labelProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
    a11yHintLabelingLandmarks(value);
    addNavLabel(this.getRenderProp("label"));
  }
  applyLinks(value) {
    breadcrumbLinksProp.apply(value, (links) => {
      this.setRenderProp("links", links);
      this.linkItems.forEach((item) => item.destroy());
      this.linkItems = links.map((link) => createBreadcrumbLinkItem(link, () => this.host));
    });
  }
  render() {
    this.showCurrentPage = X("breadcrumbCurrentPage", this.host) !== "hide";
    return h(Host, { key: "8a8c9137c0491103f54d65dfe8db53c0c7d629b6" }, h(BreadcrumbFC, { key: "ab994f68a8b57e4dae385927a592db76907537cc", label: this.getRenderProp("label"), links: this.getRenderProp("links"), linkItems: this.linkItems, showCurrentPage: this.showCurrentPage }));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_label": [{
        "watchLabel": 0
      }],
      "_links": [{
        "watchLinks": 0
      }]
    };
  }
};
KolBreadcrumb.style = {
  default: defaultStyleCss()
};
export {
  KolBreadcrumb as kol_breadcrumb
};
//# sourceMappingURL=kol-breadcrumb.entry-RQZQMSRV.js.map
