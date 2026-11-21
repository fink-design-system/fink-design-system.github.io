import {
  IconFC
} from "./chunk-NQNQ4CHG.js";
import "./chunk-7UI7W6EF.js";
import {
  isValidLabelDecorative
} from "./chunk-4323FHT3.js";
import {
  labelHints
} from "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  createPropDefinition,
  normalizeString
} from "./chunk-KPGE6Z2R.js";
import "./chunk-MQNHCCSC.js";
import {
  Host,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-icon.entry.js
var iconsProp = createPropDefinition("icons", "kolicon-logo", normalizeString);
var labelDecorativeProp = createPropDefinition("label", void 0, normalizeString, isValidLabelDecorative, {
  hints: labelHints
});
var iconPropsConfig = {
  required: [iconsProp, labelDecorativeProp]
};
var defaultStyleCss = () => `@font-face{font-family:"kolicons";src:url("kolicons.eot?t=1795160658049");src:url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");}@layer kol-component{[class^=kolicon-],[class*=" kolicon-"]{font-family:"kolicons";font-style:normal;font-weight:400;line-height:1em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.kolicon-alert-error::before{content:"\\ea01"}.kolicon-alert-info::before{content:"\\ea02"}.kolicon-alert-success::before{content:"\\ea03"}.kolicon-alert-warning::before{content:"\\ea04"}.kolicon-check::before{content:"\\ea05"}.kolicon-chevron-double-left::before{content:"\\ea06"}.kolicon-chevron-double-right::before{content:"\\ea07"}.kolicon-chevron-down::before{content:"\\ea08"}.kolicon-chevron-left::before{content:"\\ea09"}.kolicon-chevron-right::before{content:"\\ea0a"}.kolicon-chevron-up::before{content:"\\ea0b"}.kolicon-cogwheel::before{content:"\\ea0c"}.kolicon-cross::before{content:"\\ea0d"}.kolicon-eye-closed::before{content:"\\ea0e"}.kolicon-eye::before{content:"\\ea0f"}.kolicon-house::before{content:"\\ea10"}.kolicon-kolibri::before{content:"\\ea11"}.kolicon-link-external::before{content:"\\ea12"}.kolicon-link::before{content:"\\ea13"}.kolicon-minus::before{content:"\\ea14"}.kolicon-pin-pinned::before{content:"\\ea15"}.kolicon-pin-unpinned::before{content:"\\ea16"}.kolicon-plus::before{content:"\\ea17"}.kolicon-settings::before{content:"\\ea18"}.kolicon-sort-asc::before{content:"\\ea19"}.kolicon-sort-desc::before{content:"\\ea1a"}.kolicon-sort-neutral::before{content:"\\ea1b"}.kolicon-up::before{content:"\\ea1c"}.kolicon-version::before{content:"\\ea1d"}}@layer kol-component{.kol-icon{color:inherit;display:inline-block;font-size:inherit;font-weight:inherit;line-height:inherit}}`;
var KolIcon = class extends BaseWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolIcon)
      registerInstance(this, hostRef);
    this.propsConfig = iconPropsConfig;
  }
  watchIcons(value) {
    iconsProp.apply(value, (v) => this.setRenderProp("icons", v));
  }
  watchLabel(value) {
    labelDecorativeProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  componentWillLoad() {
    iconsProp.apply(this._icons, (v) => this.setRenderProp("icons", v));
    labelDecorativeProp.apply(this._label, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  render() {
    return h(Host, { key: "a53255b542b20f7d10c3fc81c430f8e49885991b" }, h(IconFC, { key: "c5863392f1de5f8c37f8a90458e641141a525528", icons: this.getRenderProp("icons"), label: this.getRenderProp("label") }));
  }
  static get watchers() {
    return {
      "_icons": [{
        "watchIcons": 0
      }],
      "_label": [{
        "watchLabel": 0
      }]
    };
  }
};
KolIcon.style = {
  default: defaultStyleCss()
};
export {
  KolIcon as kol_icon
};
//# sourceMappingURL=kol-icon.entry-WGCAKYSZ.js.map
