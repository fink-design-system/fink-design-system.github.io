import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
import "./chunk-FGYUAXNO.js";
import {
  TooltipFC
} from "./chunk-7Q2QTJQF.js";
import "./chunk-MIXJLZBB.js";
import "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import "./chunk-7UI7W6EF.js";
import "./chunk-QVVQWVZC.js";
import "./chunk-KDS3LTFQ.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import "./chunk-KPGE6Z2R.js";
import "./chunk-MQNHCCSC.js";
import {
  Host,
  getElement,
  h,
  registerInstance
} from "./chunk-VUP4WNL7.js";
import "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-tooltip-wc.entry.js
var KolTooltipWc = class {
  constructor(hostRef) {
    if (new.target === KolTooltipWc)
      registerInstance(this, hostRef);
    this.tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
    this._badgeText = void 0;
    this._align = "top";
    this._id = void 0;
  }
  validateAlign(value) {
    var _a;
    (_a = this.tooltipBehavior) === null || _a === void 0 ? void 0 : _a.watchAlign(value);
  }
  validateId(value) {
    var _a;
    (_a = this.tooltipBehavior) === null || _a === void 0 ? void 0 : _a.watchId(value);
  }
  validateLabel(value) {
    var _a;
    (_a = this.tooltipBehavior) === null || _a === void 0 ? void 0 : _a.watchLabel(value);
  }
  hideTooltip() {
    var _a;
    return Promise.resolve((_a = this.tooltipBehavior) === null || _a === void 0 ? void 0 : _a.hideTooltip());
  }
  connectedCallback() {
    var _a, _b, _c;
    (_a = this.tooltipBehavior) === null || _a === void 0 ? void 0 : _a.initContext((_c = (_b = this.host) === null || _b === void 0 ? void 0 : _b.previousElementSibling) !== null && _c !== void 0 ? _c : void 0);
  }
  componentWillLoad() {
    this.tooltipBehavior.componentWillLoad({
      label: this._label,
      align: this._align,
      badgeText: this._badgeText,
      id: this._id
    });
  }
  componentDidRender() {
    var _a;
    if (this.host) {
      (_a = this.tooltipBehavior) === null || _a === void 0 ? void 0 : _a.handleEventListeners(this.host);
    }
  }
  disconnectedCallback() {
    var _a;
    (_a = this.tooltipBehavior) === null || _a === void 0 ? void 0 : _a.destroy();
  }
  render() {
    return h(Host, { key: "a0f2a8ea9f13c720320d69166664f24875b6a92e", class: "kol-tooltip" }, h(TooltipFC, { key: "b0459c0faf4862e66e4704503a47bd9499e5181e", label: this.tooltipBehavior.getRenderProp("label"), badgeText: this._badgeText, id: this.tooltipBehavior.getRenderProp("id"), refFloating: (el) => {
      var _a;
      return (_a = this.tooltipBehavior) === null || _a === void 0 ? void 0 : _a.setTooltipElementRef(el);
    } }));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_align": [{
        "validateAlign": 0
      }],
      "_id": [{
        "validateId": 0
      }],
      "_label": [{
        "validateLabel": 0
      }]
    };
  }
};
export {
  KolTooltipWc as kol_tooltip_wc
};
//# sourceMappingURL=kol-tooltip-wc.entry-OT6ODEHA.js.map
