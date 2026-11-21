import {
  hrefProp
} from "./chunk-U2POW5WN.js";
import {
  KolLinkTag
} from "./chunk-6OHARAC5.js";
import {
  labelLangSegmentsProp
} from "./chunk-QVVQWVZC.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  createPropDefinition,
  normalizeString,
  resolveFcProps,
  variantQuoteProp
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  Host,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-quote.entry.js
var quoteProp = createPropDefinition("quote", "", normalizeString);
var quotePropsConfig = {
  optional: [labelLangSegmentsProp, variantQuoteProp],
  required: [hrefProp, quoteProp]
};
var quoteBem = bem.forBlock("kol-quote");
var BEM_CLASS_QUOTE__BLOCKQUOTE = quoteBem("blockquote");
var BEM_CLASS_QUOTE__CITE = quoteBem("cite");
var BEM_CLASS_QUOTE__FIGCAPTION = quoteBem("figcaption");
var BEM_CLASS_QUOTE__QUOTE = quoteBem("quote");
var QuoteFC = (props) => {
  const { href, label, quote, variant } = resolveFcProps(quotePropsConfig, props);
  const hasExpertSlot = quote === "";
  return h(BemRootNodeFC, { component: "figure", block: "kol-quote", modifiers: { [variant]: true } }, variant === "block" ? h("blockquote", { class: BEM_CLASS_QUOTE__BLOCKQUOTE, cite: href }, quote, h("span", { "aria-hidden": !hasExpertSlot ? "true" : void 0, hidden: !hasExpertSlot }, h("slot", { name: "expert" }))) : h("q", { class: BEM_CLASS_QUOTE__QUOTE, cite: href }, quote, h("span", { "aria-hidden": !hasExpertSlot ? "true" : void 0, hidden: !hasExpertSlot }, h("slot", { name: "expert" }))), !!label && h("figcaption", { class: BEM_CLASS_QUOTE__FIGCAPTION }, h("cite", { class: BEM_CLASS_QUOTE__CITE }, h(KolLinkTag, { _href: href, _label: label, _target: "_blank" }))));
};
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   .kol-quote {     display: inline;     margin: 0;     padding: 0;   }   .kol-quote__cite::before {     content: "—";   }   .kol-quote--block .kol-quote__figcaption {     display: inline;     margin: 0;     padding: 0;   }   .kol-quote__blockquote::before {     content: open-quote;   }   .kol-quote__blockquote::after {     content: close-quote;   } }`;
var KolQuote = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolQuote)
      registerInstance(this, hostRef);
    this.propsConfig = quotePropsConfig;
    this._label = void 0;
    this._variant = "inline";
  }
  watchHref(value) {
    hrefProp.apply(value, (v) => this.setRenderProp("href", v), this.isRequired("href"));
  }
  watchLabel(value) {
    labelLangSegmentsProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  watchQuote(value) {
    quoteProp.apply(value, (v) => this.setRenderProp("quote", v));
  }
  watchVariant(value) {
    variantQuoteProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  componentWillLoad() {
    hrefProp.apply(this._href, (v) => this.setRenderProp("href", v), this.isRequired("href"));
    labelLangSegmentsProp.apply(this._label, (v) => this.setRenderProp("label", v), this.isRequired("label"));
    quoteProp.apply(this._quote, (v) => this.setRenderProp("quote", v));
    variantQuoteProp.apply(this._variant, (v) => this.setRenderProp("variant", v));
  }
  render() {
    return h(Host, { key: "52c8ca2c634034fa8ad7347a66d04e731f2c661c" }, h(QuoteFC, { key: "f1068378b769a5b4645ca5e97d0e641442d7f6b4", href: this.getRenderProp("href"), label: this.getRenderProp("label"), quote: this.getRenderProp("quote"), variant: this.getRenderProp("variant") }));
  }
  static get watchers() {
    return {
      "_href": [{
        "watchHref": 0
      }],
      "_label": [{
        "watchLabel": 0
      }],
      "_quote": [{
        "watchQuote": 0
      }],
      "_variant": [{
        "watchVariant": 0
      }]
    };
  }
};
KolQuote.style = {
  default: defaultStyleCss()
};
export {
  KolQuote as kol_quote
};
//# sourceMappingURL=kol-quote.entry-QY4KEFH4.js.map
