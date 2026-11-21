import {
  createItemPool
} from "./chunk-HRRUQDE3.js";
import {
  BaseSelectWebComponent,
  selectPropsConfig
} from "./chunk-G6SSZF6U.js";
import {
  createButtonItem
} from "./chunk-RSHHA2HG.js";
import {
  addNavLabel,
  removeNavLabel
} from "./chunk-WUIMGAAG.js";
import {
  labelProp
} from "./chunk-PVPG337L.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import {
  ButtonFC
} from "./chunk-3C6UB25G.js";
import {
  customClassProp,
  tooltipAlignProp
} from "./chunk-JIRF5MWS.js";
import {
  createCtaRef
} from "./chunk-VFFG6S5V.js";
import {
  createUniqueId
} from "./chunk-FQ2Y4FDM.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import {
  BemRootNodeFC,
  buildDefaultPropsFromConfig,
  createCallbacksPropDefinition,
  createPropDefinition,
  normalizeNumberType,
  resolveFcProps,
  trimLabel
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  h
} from "./chunk-VUP4WNL7.js";
import {
  STATE_CHANGE_EVENT,
  parseJson
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/item-BANfM_Mo.js
var boundaryCountProp = createPropDefinition("boundaryCount", 1, (value) => Math.max(0, value));
var pageProp = createPropDefinition("page", 0, normalizeNumberType);
var pageSizeProp = createPropDefinition("pageSize", 1, normalizeNumberType);
var OBJECT_OBJECT = /^\[object Object\]$/;
function normalizePageSizeOptions(value) {
  if (value === "" || typeof value === "string" && OBJECT_OBJECT.test(value)) {
    throw new Error("Unreflected page size options");
  }
  const parsed = typeof value === "string" ? parseJson(value) : value;
  if (Array.isArray(parsed) && parsed.every((item) => typeof item === "number")) {
    return parsed.map((size) => ({ label: `${size}`, value: size }));
  }
  throw new Error("Invalid page size options");
}
var pageSizeOptionsProp = createPropDefinition("pageSizeOptions", [], normalizePageSizeOptions);
var paginationCallbacksProp = createCallbacksPropDefinition();
var BUTTONS = ["first", "last", "next", "previous"];
var allButtons = (shown) => ({ first: shown, last: shown, next: shown, previous: shown });
function normalizeHasButtons(value) {
  if (typeof value === "boolean") {
    return allButtons(value);
  }
  if (typeof value === "object" && value !== null) {
    const buttons = {};
    BUTTONS.forEach((button) => {
      const shown = value[button];
      if (typeof shown === "boolean") {
        buttons[button] = shown;
      }
    });
    return buttons;
  }
  if (typeof value === "string") {
    const parsed = parseJson(value);
    return typeof parsed === "object" && parsed !== null ? normalizeHasButtons(parsed) : allButtons(false);
  }
  throw new Error("Invalid pagination buttons");
}
var paginationHasButtonsProp = createPropDefinition("hasButtons", allButtons(true), normalizeHasButtons);
var paginationMaxProp = createPropDefinition("max", 0, normalizeNumberType);
var siblingCountProp = createPropDefinition("siblingCount", 1, (value) => Math.max(0, value));
var paginationPropsConfig = {
  required: [labelProp, pageProp, paginationCallbacksProp, paginationMaxProp],
  optional: [boundaryCountProp, customClassProp, pageSizeOptionsProp, pageSizeProp, paginationHasButtonsProp, siblingCountProp, tooltipAlignProp]
};
var getPageCount = (max, pageSize = 1) => Math.ceil(max / pageSize);
var clampPage = (page, pageSize, max) => {
  if (max > 0) {
    const count = getPageCount(max, pageSize);
    if (count > 0) {
      if (page > count) {
        return count;
      }
      if (page < 1) {
        return 1;
      }
    }
  }
  return void 0;
};
var resolvePageSize = (pageSize, options) => {
  var _a, _b;
  if (options.length > 0) {
    return (_b = (_a = options.find((option) => option.value === pageSize)) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : options[0].value;
  }
  return pageSize;
};
var getPageItems = (page, count, boundaryCount, siblingCount) => {
  const items = [];
  let afterPage = false;
  for (let item = 1; item <= count; item++) {
    if (item <= boundaryCount || item > count - boundaryCount || item >= page - siblingCount && item <= page + siblingCount) {
      afterPage = true;
      items.push({ page: item, selected: item === page });
    } else if (afterPage) {
      afterPage = false;
      items.push("separator");
    } else {
      items.push(null);
    }
  }
  return items;
};
var getVisibleRange = (page, pageSize, max) => {
  const highest = page * pageSize;
  return {
    start: Math.max(0, (page - 1) * pageSize + 1),
    end: max < highest ? max : highest
  };
};
var paginationBem = bem.forBlock("kol-pagination");
var leftDoubleArrowIcon = { left: "kolicon-chevron-double-left" };
var leftSingleArrowIcon = { left: "kolicon-chevron-left" };
var rightSingleArrowIcon = { right: "kolicon-chevron-right" };
var rightDoubleArrowIcon = { right: "kolicon-chevron-double-right" };
var userLanguage = ((language) => language.includes("-") ? language : `${language}-${language.toUpperCase()}`)(navigator.language || "de-DE");
var NUMBER_FORMATTER = new Intl.NumberFormat(userLanguage, {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
});
var PaginationContentFC = (props) => {
  const { boundaryCount, customClass, getButtonFcProps, handlePageClick, hasButtons, label, max, navigationCallbacks, page, pageSize, pageSizeOptions, renderPageSizeSelect, siblingCount, tooltipAlign } = resolveFcProps(paginationPropsConfig, props);
  const count = getPageCount(max, pageSize);
  const { start, end } = getVisibleRange(page, pageSize, max);
  const navigationButton = (position, icons, buttonLabel, disabled) => h("li", null, h(ButtonFC, Object.assign({}, getButtonFcProps(`navigation-${position}`, {
    _customClass: customClass,
    _disabled: disabled,
    _icons: icons,
    _hideLabel: true,
    _label: buttonLabel,
    _on: navigationCallbacks[position],
    _tooltipAlign: tooltipAlign
  }, { class: paginationBem("button", { [position]: true }) }))));
  const pageButton = (item, selected) => {
    const pageText = NUMBER_FORMATTER.format(item);
    const ariaDescription = `${translate("kol-page")} ${pageText}`;
    return h("li", { key: `page-${item}` }, selected ? h(ButtonFC, Object.assign({}, getButtonFcProps(`page-${item}`, { _ariaDescription: ariaDescription, _customClass: customClass, _label: pageText }, { "aria-current": "page", class: `${paginationBem("button", { selected: true })} selected` }))) : h(ButtonFC, Object.assign({}, getButtonFcProps(`page-${item}`, {
      _ariaDescription: ariaDescription,
      _customClass: customClass,
      _label: pageText,
      _on: { onClick: (event) => handlePageClick(event, item) }
    }, { class: paginationBem("button", { numbers: true }) }))));
  };
  return [
    h("span", { role: "status", "aria-live": "polite", class: paginationBem("entries") }, translate("kol-table-visible-range", {
      placeholders: {
        start: NUMBER_FORMATTER.format(start),
        end: NUMBER_FORMATTER.format(end),
        total: NUMBER_FORMATTER.format(max)
      }
    })),
    h("nav", { class: paginationBem("navigation"), "aria-label": trimLabel(label) }, h("ul", { class: paginationBem("navigation-list") }, hasButtons.first && navigationButton("first", leftDoubleArrowIcon, translate("kol-page-first"), page <= 1), hasButtons.previous && navigationButton("previous", leftSingleArrowIcon, translate("kol-page-back"), page <= 1), getPageItems(page, count, boundaryCount, siblingCount).map((item, index) => item === null ? null : item === "separator" ? h("li", { key: index + 1 < page ? "separator-left" : "separator-right" }, h("span", { class: paginationBem("separator"), "aria-hidden": "true" })) : pageButton(item.page, item.selected)), hasButtons.next && navigationButton("next", rightSingleArrowIcon, translate("kol-page-next"), count <= page), hasButtons.last && navigationButton("last", rightDoubleArrowIcon, translate("kol-page-last"), count <= page))),
    (pageSizeOptions === null || pageSizeOptions === void 0 ? void 0 : pageSizeOptions.length) > 0 && h("div", { class: "page-size" }, h("div", { class: paginationBem("page-size-select") }, renderPageSizeSelect({ label: translate("kol-entries-per-site"), options: pageSizeOptions, value: pageSize })))
  ];
};
var PaginationFC = (props) => h(BemRootNodeFC, { block: "kol-pagination" }, h(PaginationContentFC, Object.assign({}, props)));
var PageSizeSelect = class extends BaseSelectWebComponent {
  constructor(getHost, requestRender) {
    super();
    this.getHost = getHost;
    this.requestRender = requestRender;
    this._disabled = false;
    this._multiple = false;
    this.ctaRef = createCtaRef();
    this.id = createUniqueId("select");
    this.loaded = false;
    this.focused = false;
    this.touched = false;
    this.propsConfig = selectPropsConfig;
    this.initFormAssociation("select");
  }
  get host() {
    var _a;
    return (_a = this.getHost) === null || _a === void 0 ? void 0 : _a.call(this);
  }
  get inputHasFocus() {
    return this.focused;
  }
  set inputHasFocus(value) {
    if (value !== this.focused) {
      this.focused = value;
      this.requestRender();
    }
  }
  get _touched() {
    return this.touched;
  }
  set _touched(value) {
    if (value !== this.touched) {
      this.touched = value === true;
      this.applyTouched(value);
      this.requestRender();
    }
  }
  get _value() {
    return this.value;
  }
  set _value(value) {
    if (value !== this.value) {
      this.value = value;
      this.applyValue(value);
      this.requestRender();
    }
  }
  getAccessKeyProp() {
    return void 0;
  }
  getShortKeyProp() {
    return void 0;
  }
  render(input) {
    if (this.loaded) {
      this.update(input);
    } else {
      this.load(input);
    }
    return this.renderSelectField();
  }
  sync() {
    this.syncFormField();
  }
  destroy() {
    this.destroyFormField();
  }
  load(input) {
    this.passed = input;
    this._on = input.on;
    this.value = input.value;
    this.applyAriaDetails(void 0);
    this.applyName(void 0);
    this.applySyncValueBySelector(void 0);
    this.applyTouched(false);
    this.applyAccessKey(void 0);
    this.applyMsg(void 0);
    this.applyDisabled(false);
    this.applyHideMsg(false);
    this.applyHideLabel(false);
    this.applyHint("");
    this.applyInfoPopover(void 0);
    this.applyLabel(input.label);
    this.applyShortKey(void 0);
    this.applyOn(input.on);
    this.applyTooltipAlign("top");
    this.applyVariant(void 0);
    this.applyTabIndex(void 0);
    this.applyIcons(void 0);
    this.applyOptions(input.options);
    this.applyMultiple(false);
    this.applyRequired(false);
    this.applyRows(void 0);
    this.applyValue(input.value);
    this.loaded = true;
  }
  update(input) {
    const passed = this.passed;
    this.passed = input;
    if (input.label !== passed.label) {
      this.applyLabel(input.label);
    }
    if (input.options !== passed.options) {
      this.applyOptions(input.options);
    }
    if (input.on !== passed.on) {
      this._on = input.on;
      this.applyOn(input.on);
    }
    if (input.value !== passed.value && input.value !== this.value) {
      this.value = input.value;
      this.applyValue(input.value);
    }
  }
};
var UPDATE_ORDER = [
  "boundaryCount",
  "customClass",
  "hasButtons",
  "on",
  "page",
  "pageSize",
  "pageSizeOptions",
  "siblingCount",
  "tooltipAlign",
  "max",
  "label"
];
var createLocalStore = () => {
  const props = buildDefaultPropsFromConfig(paginationPropsConfig);
  return {
    get: (key) => props[key],
    set: (key, value) => {
      props[key] = value;
    }
  };
};
var createPaginationItem = (options) => {
  var _a;
  const store = (_a = options.store) !== null && _a !== void 0 ? _a : createLocalStore();
  const translatePagination = translate("kol-pagination");
  const buttons = createItemPool(() => createButtonItem(options.getEventTarget), (button) => button.syncListeners(), (button) => button.destroy());
  const getButtonFcProps = (key, props, rootAttributes) => buttons.get(key).getFcProps(props, rootAttributes);
  const pageSizeSelects = createItemPool(() => new PageSizeSelect(options.getEventTarget, options.requestRender), (select) => select.sync(), (select) => select.destroy());
  let pageSizeValue = 1;
  let applied = {};
  let pendingFocusPage;
  store.set("label", translatePagination);
  const reportPageChange = (event, page) => {
    setTimeout(() => {
      var _a2, _b;
      (_b = (_a2 = store.get("on")).onChangePage) === null || _b === void 0 ? void 0 : _b.call(_a2, event, page);
      const target = options.getEventTarget();
      if (target) {
        dispatchDomEvent(target, KolEvent.changePage, page);
      }
    });
  };
  const syncPage = (page, pageSize, max) => {
    const clamped = clampPage(page, pageSize, max);
    if (clamped !== void 0) {
      store.set("page", clamped);
      reportPageChange(STATE_CHANGE_EVENT, clamped);
    }
  };
  const applyPageSizeValue = (value) => {
    if (value === void 0 || value === null) {
      return;
    }
    pageSizeProp.apply(value, (pageSize) => {
      const resolved = resolvePageSize(pageSize, store.get("pageSizeOptions"));
      store.set("pageSize", resolved);
      syncPage(store.get("page"), resolved, store.get("max"));
    });
  };
  const applyLabel = (value, initial, required) => {
    if (!initial) {
      removeNavLabel(store.get("label"));
    }
    labelProp.apply(value, (v) => store.set("label", v !== null && v !== void 0 ? v : translatePagination), required);
    addNavLabel(store.get("label"));
  };
  const restorePageFocus = () => {
    if (pendingFocusPage === void 0 || pendingFocusPage !== store.get("page")) {
      return;
    }
    pendingFocusPage = void 0;
    const button = buttons.get(`page-${store.get("page")}`).getElement();
    const root = button === null || button === void 0 ? void 0 : button.getRootNode();
    const focusLost = !(root === null || root === void 0 ? void 0 : root.activeElement) && (document.activeElement === null || document.activeElement === document.body);
    if ((button === null || button === void 0 ? void 0 : button.isConnected) && focusLost) {
      button.focus();
    }
  };
  const handlePageClick = (event, page) => {
    var _a2, _b;
    pendingFocusPage = page;
    (_b = (_a2 = store.get("on")).onClick) === null || _b === void 0 ? void 0 : _b.call(_a2, event, page);
    const target = options.getEventTarget();
    if (target) {
      dispatchDomEvent(target, KolEvent.click, page);
    }
    reportPageChange(event, page);
  };
  const handlePageSizeChange = (event, value) => {
    const pageSize = parseInt(value);
    if (pageSize > 0 && pageSizeValue !== pageSize) {
      applyPageSizeValue(pageSize);
      pageSizeValue = pageSize;
      options.requestRender();
      setTimeout(() => {
        var _a2, _b;
        const current = pageSizeValue;
        (_b = (_a2 = store.get("on")).onChangePageSize) === null || _b === void 0 ? void 0 : _b.call(_a2, event, current);
        const target = options.getEventTarget();
        if (target) {
          dispatchDomEvent(target, KolEvent.changePageSize, current);
        }
      });
    }
  };
  const pageSizeSelectCallbacks = { onChange: handlePageSizeChange };
  const renderPageSizeSelect = (input) => pageSizeSelects.get("page-size").render(Object.assign(Object.assign({}, input), { on: pageSizeSelectCallbacks }));
  const navigationCallbacks = {
    first: { onClick: (event) => handlePageClick(event, 1) },
    last: { onClick: (event) => handlePageClick(event, getPageCount(store.get("max"), store.get("pageSize"))) },
    next: { onClick: (event) => handlePageClick(event, store.get("page") + 1) },
    previous: { onClick: (event) => handlePageClick(event, store.get("page") - 1) }
  };
  const item = {
    applyBoundaryCount: (value) => boundaryCountProp.apply(value, (v) => store.set("boundaryCount", v)),
    applyCustomClass: (value) => customClassProp.apply(value, (v) => store.set("customClass", v)),
    applyHasButtons: (value) => paginationHasButtonsProp.apply(value, (v) => store.set("hasButtons", Object.assign(Object.assign({}, store.get("hasButtons")), v))),
    applyLabel: (value, required) => applyLabel(value, false, required),
    applyMax: (value, required) => {
      if ((value === void 0 || value === null) && !required) {
        return;
      }
      paginationMaxProp.apply(value, (max) => {
        store.set("max", max);
        syncPage(store.get("page"), store.get("pageSize"), max);
      }, required);
    },
    applyOn: (value) => paginationCallbacksProp.apply(value, (v) => store.set("on", v)),
    applyPage: (value) => {
      if (value === void 0 || value === null) {
        return;
      }
      pageProp.apply(value, (page) => {
        store.set("page", page);
        syncPage(page, store.get("pageSize"), store.get("max"));
      });
    },
    applyPageSize: (value) => {
      applyPageSizeValue(value);
      pageSizeValue = value;
    },
    applyPageSizeOptions: (value) => pageSizeOptionsProp.apply(value, (pageSizeOptions) => {
      store.set("pageSizeOptions", pageSizeOptions);
      let pageSize;
      if (pageSizeOptions.length > 0) {
        pageSize = resolvePageSize(store.get("pageSize"), pageSizeOptions);
        store.set("pageSize", pageSize);
      }
      syncPage(store.get("page"), pageSize, store.get("max"));
    }),
    applySiblingCount: (value) => siblingCountProp.apply(value, (v) => store.set("siblingCount", v)),
    applyTooltipAlign: (value) => tooltipAlignProp.apply(value !== null && value !== void 0 ? value : "top", (v) => store.set("tooltipAlign", v)),
    load: (input, required) => {
      applied = Object.assign({}, input);
      item.applyBoundaryCount(input.boundaryCount);
      item.applyCustomClass(input.customClass);
      item.applyHasButtons(input.hasButtons);
      applyLabel(input.label, true, required === null || required === void 0 ? void 0 : required.label);
      item.applyOn(input.on);
      item.applyPage(input.page);
      item.applyPageSize(input.pageSize);
      item.applyPageSizeOptions(input.pageSizeOptions);
      item.applySiblingCount(input.siblingCount);
      item.applyTooltipAlign(input.tooltipAlign);
      item.applyMax(input.max, required === null || required === void 0 ? void 0 : required.max);
      item.applyPage(input.page);
    },
    update: (input) => {
      for (const key of UPDATE_ORDER) {
        if (input[key] !== applied[key]) {
          applied = Object.assign(Object.assign({}, applied), { [key]: input[key] });
          if (key !== "pageSize" || input.pageSize !== pageSizeValue) {
            appliers[key](input[key]);
          }
        }
      }
    },
    getFcProps: () => {
      buttons.beginRender();
      pageSizeSelects.beginRender();
      return {
        boundaryCount: store.get("boundaryCount"),
        customClass: store.get("customClass"),
        getButtonFcProps,
        handlePageClick,
        handlePageSizeChange,
        hasButtons: store.get("hasButtons"),
        label: store.get("label"),
        max: store.get("max"),
        navigationCallbacks,
        on: store.get("on"),
        page: store.get("page"),
        pageSize: store.get("pageSize"),
        pageSizeOptions: store.get("pageSizeOptions"),
        renderPageSizeSelect,
        siblingCount: store.get("siblingCount"),
        tooltipAlign: store.get("tooltipAlign")
      };
    },
    sync: () => {
      buttons.endRender();
      pageSizeSelects.endRender();
      restorePageFocus();
    },
    destroy: () => {
      removeNavLabel(store.get("label"));
      buttons.destroy();
      pageSizeSelects.destroy();
    }
  };
  const appliers = {
    boundaryCount: item.applyBoundaryCount,
    customClass: item.applyCustomClass,
    hasButtons: item.applyHasButtons,
    label: item.applyLabel,
    max: item.applyMax,
    on: item.applyOn,
    page: item.applyPage,
    pageSize: item.applyPageSize,
    pageSizeOptions: item.applyPageSizeOptions,
    siblingCount: item.applySiblingCount,
    tooltipAlign: item.applyTooltipAlign
  };
  return item;
};

export {
  paginationPropsConfig,
  PaginationFC,
  createPaginationItem
};
//# sourceMappingURL=chunk-PR5JGMZ5.js.map
