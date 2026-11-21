import {
  srcProp
} from "./chunk-EZQVZM2F.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  createCallbacksPropDefinition,
  createPropDefinition,
  loadingProp,
  normalizeString
} from "./chunk-KPGE6Z2R.js";
import "./chunk-MQNHCCSC.js";
import {
  Host,
  getElement,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-image.entry.js
var altProp = createPropDefinition("alt", "", normalizeString, (v) => typeof v === "string");
var imageCallbacksProp = createCallbacksPropDefinition();
var sizesProp = createPropDefinition("sizes", "", normalizeString);
var srcsetProp = createPropDefinition("srcset", "", normalizeString);
var imagePropsConfig = {
  optional: [imageCallbacksProp, loadingProp, sizesProp, srcsetProp],
  required: [altProp, srcProp]
};
var ImageFC = (props) => {
  const { alt, loading, sizes, src, srcset, handleError, handleLoad } = props;
  return h(BemRootNodeFC, { component: "img", block: "kol-image", alt, loading, sizes: sizes || void 0, src, srcset: srcset || void 0, onError: (e) => handleError(e), onLoad: (e) => handleLoad(e) });
};
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   .kol-image {     display: inline-block;     max-width: 100%;     max-height: 100%;   } }`;
var KolImage = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolImage)
      registerInstance(this, hostRef);
    this.propsConfig = imagePropsConfig;
    this._loading = void 0;
    this._sizes = void 0;
    this._srcset = void 0;
    this._on = void 0;
    this.handleError = (event) => {
      var _a, _b;
      (_b = (_a = this.getRenderProp("on")).onError) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.error, event);
      }
    };
    this.handleLoad = (event) => {
      var _a, _b;
      (_b = (_a = this.getRenderProp("on")).onLoad) === null || _b === void 0 ? void 0 : _b.call(_a, event);
      if (this.host) {
        dispatchDomEvent(this.host, KolEvent.load, event);
      }
    };
  }
  watchAlt(value) {
    altProp.apply(value, (v) => this.setRenderProp("alt", v));
  }
  watchLoading(value) {
    loadingProp.apply(value, (v) => this.setRenderProp("loading", v));
  }
  watchSizes(value) {
    sizesProp.apply(value, (v) => this.setRenderProp("sizes", v));
  }
  watchSrc(value) {
    srcProp.apply(value, (v) => this.setRenderProp("src", v));
  }
  watchSrcset(value) {
    srcsetProp.apply(value, (v) => this.setRenderProp("srcset", v));
  }
  watchOn(value) {
    imageCallbacksProp.apply(value, (v) => this.setRenderProp("on", v));
  }
  componentWillLoad() {
    altProp.apply(this._alt, (v) => this.setRenderProp("alt", v));
    loadingProp.apply(this._loading, (v) => this.setRenderProp("loading", v));
    imageCallbacksProp.apply(this._on, (v) => this.setRenderProp("on", v));
    sizesProp.apply(this._sizes, (v) => this.setRenderProp("sizes", v));
    srcProp.apply(this._src, (v) => this.setRenderProp("src", v));
    srcsetProp.apply(this._srcset, (v) => this.setRenderProp("srcset", v));
  }
  render() {
    return h(Host, { key: "ac348dc672f7785f384470b77120889410349503" }, h(ImageFC, { key: "0812cc9b1a6770e3462f9d6f7bc33237ccf4dac3", alt: this.getRenderProp("alt"), loading: this.getRenderProp("loading"), sizes: this.getRenderProp("sizes"), src: this.getRenderProp("src"), srcset: this.getRenderProp("srcset"), handleError: this.handleError, handleLoad: this.handleLoad }));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_alt": [{
        "watchAlt": 0
      }],
      "_loading": [{
        "watchLoading": 0
      }],
      "_sizes": [{
        "watchSizes": 0
      }],
      "_src": [{
        "watchSrc": 0
      }],
      "_srcset": [{
        "watchSrcset": 0
      }],
      "_on": [{
        "watchOn": 0
      }]
    };
  }
};
KolImage.style = {
  default: defaultStyleCss()
};
export {
  KolImage as kol_image
};
//# sourceMappingURL=kol-image.entry-2SGRI2PU.js.map
