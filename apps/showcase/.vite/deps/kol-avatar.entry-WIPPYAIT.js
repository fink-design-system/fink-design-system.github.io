import {
  srcProp
} from "./chunk-EZQVZM2F.js";
import {
  labelProp
} from "./chunk-PVPG337L.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import {
  colorProp
} from "./chunk-Z7MYABXV.js";
import "./chunk-ONIQ4NI3.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  resolveFcProps,
  trimLabel
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

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-avatar.entry.js
var avatarPropsConfig = {
  optional: [colorProp, srcProp],
  required: [labelProp]
};
var avatarBem = bem.forBlock("kol-avatar");
var BEM_CLASS_AVATAR__IMAGE = avatarBem("image");
var BEM_CLASS_AVATAR__INITIALS = avatarBem("initials");
var AvatarFC = (props) => {
  const { color, initials, label, src } = resolveFcProps(avatarPropsConfig, props);
  return h(BemRootNodeFC, { "aria-label": translate("kol-avatar-alt", { placeholders: { name: trimLabel(label) } }), block: "kol-avatar", role: "img", style: {
    backgroundColor: color.backgroundColor,
    color: color.foregroundColor
  } }, src ? h("img", { alt: "", "aria-hidden": "true", class: BEM_CLASS_AVATAR__IMAGE, src }) : h("span", { "aria-hidden": "true", class: BEM_CLASS_AVATAR__INITIALS }, initials));
};
var defaultStyleCss = () => `@charset "UTF-8";     @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;  @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @layer kol-component {   :host {     display: flex;     width: calc(100 * 1rem / var(--kolibri-root-font-size, 16));     aspect-ratio: 1;     align-items: center;     justify-content: center;     container-type: size;   }   .kol-avatar,   .kol-avatar__image,   .kol-avatar__initials {     border-radius: 50%;   }   .kol-avatar {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     display: flex;     width: max(100cqw, 100cqh);     height: max(100cqw, 100cqh);     flex-shrink: 0;     container-type: size;   }   .kol-avatar__initials {     background-color: inherit;     margin: auto;     font-size: 40cqh;   } }`;
var formatNameAsInitial = (name) => {
  if (name.length === 0) {
    return "";
  }
  return name[0].toUpperCase();
};
var normalizeInitials = (value) => {
  const trimmedVal = trimLabel(value);
  const names = trimmedVal.split(/\s+/);
  const first = names[0];
  const last = names[names.length - 1];
  if (names.length >= 2 && first && last) {
    return `${formatNameAsInitial(first)}${formatNameAsInitial(last)}`;
  }
  return formatNameAsInitial(trimmedVal);
};
var KolAvatar = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolAvatar)
      registerInstance(this, hostRef);
    this.initials = "";
    this.propsConfig = avatarPropsConfig;
    this._color = void 0;
    this._src = void 0;
  }
  watchColor(value) {
    colorProp.apply(value, (v) => this.setRenderProp("color", v));
  }
  watchLabel(value) {
    labelProp.apply(value, (v) => {
      this.setRenderProp("label", v);
      this.setState("initials", normalizeInitials(v));
    }, this.isRequired("label"));
  }
  watchSrc(value) {
    srcProp.apply(value, (v) => this.setRenderProp("src", v));
  }
  componentWillLoad() {
    colorProp.apply(this._color, (v) => this.setRenderProp("color", v));
    labelProp.apply(this._label, (v) => {
      this.setRenderProp("label", v);
      this.setState("initials", normalizeInitials(v));
    }, this.isRequired("label"));
    srcProp.apply(this._src, (v) => this.setRenderProp("src", v));
  }
  render() {
    return h(Host, { key: "e3616a4b07d13b3582a77d5bc8d64c9a6031e39b" }, h(AvatarFC, { key: "0f8a9d71c76d321e697119712e19effe2e9f35c4", color: this.getRenderProp("color"), label: this.getRenderProp("label"), src: this.getRenderProp("src"), initials: this.initials }));
  }
  static get watchers() {
    return {
      "_color": [{
        "watchColor": 0
      }],
      "_label": [{
        "watchLabel": 0
      }],
      "_src": [{
        "watchSrc": 0
      }]
    };
  }
};
KolAvatar.style = {
  default: defaultStyleCss()
};
export {
  KolAvatar as kol_avatar
};
//# sourceMappingURL=kol-avatar.entry-WIPPYAIT.js.map
