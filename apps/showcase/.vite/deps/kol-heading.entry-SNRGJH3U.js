import {
  levelProp
} from "./chunk-AXVYILGE.js";
import {
  labelWithExpertSlotProp
} from "./chunk-7C3Y25NJ.js";
import {
  renderLabelWithLang
} from "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import "./chunk-7UI7W6EF.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  createPropDefinition,
  normalizeString,
  resolveFcProps
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

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-heading.entry.js
var secondaryHeadlineProp = createPropDefinition("secondaryHeadline", "", normalizeString);
var headingPropsConfig = {
  optional: [levelProp, secondaryHeadlineProp],
  required: [labelWithExpertSlotProp]
};
var headlineBem = bem.forBlock("kol-headline");
function getHeadlineTag(level) {
  return level >= 1 && level <= 6 ? `h${level}` : "strong";
}
var HeadingFC = (props) => {
  const { label, level, secondaryHeadline } = resolveFcProps(headingPropsConfig, props);
  const HeadlineTag = getHeadlineTag(level);
  if (!secondaryHeadline) {
    return h(BemRootNodeFC, { component: HeadlineTag, block: "kol-heading", class: headlineBem({ [HeadlineTag]: true, single: true }) }, renderLabelWithLang(label), h("slot", { name: "expert", slot: "expert" }));
  }
  return h(BemRootNodeFC, { component: "hgroup", block: "kol-heading", modifiers: { group: true } }, h(HeadlineTag, { class: headlineBem({ [HeadlineTag]: true, group: true, primary: true }) }, renderLabelWithLang(label), h("slot", { name: "expert", slot: "expert" })), h("p", { class: headlineBem({ group: true, secondary: true }) }, secondaryHeadline));
};
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   .kol-headline--secondary {     margin: 0;   } }`;
var KolHeading = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolHeading)
      registerInstance(this, hostRef);
    this.propsConfig = headingPropsConfig;
    this._level = 0;
    this._secondaryHeadline = void 0;
  }
  watchLabel(value) {
    labelWithExpertSlotProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  watchLevel(value) {
    levelProp.apply(value, (v) => this.setRenderProp("level", v));
  }
  watchSecondaryHeadline(value) {
    secondaryHeadlineProp.apply(value, (v) => this.setRenderProp("secondaryHeadline", v));
  }
  componentWillLoad() {
    labelWithExpertSlotProp.apply(this._label, (v) => this.setRenderProp("label", v), this.isRequired("label"));
    levelProp.apply(this._level, (v) => this.setRenderProp("level", v));
    secondaryHeadlineProp.apply(this._secondaryHeadline, (v) => this.setRenderProp("secondaryHeadline", v));
  }
  render() {
    return h(Host, { key: "63a24d9208c82a7f3b7cbbe9c2fd475ae2a8a37c" }, h(HeadingFC, { key: "26af307dd787477b1842dfcdab9302c8506ce7bb", label: this.getRenderProp("label"), level: this.getRenderProp("level"), secondaryHeadline: this.getRenderProp("secondaryHeadline") }));
  }
  static get watchers() {
    return {
      "_label": [{
        "watchLabel": 0
      }],
      "_level": [{
        "watchLevel": 0
      }],
      "_secondaryHeadline": [{
        "watchSecondaryHeadline": 0
      }]
    };
  }
};
KolHeading.style = {
  default: defaultStyleCss()
};
export {
  KolHeading as kol_heading
};
//# sourceMappingURL=kol-heading.entry-SNRGJH3U.js.map
