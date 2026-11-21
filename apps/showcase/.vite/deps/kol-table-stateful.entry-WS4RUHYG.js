import {
  BaseTableStatelessWebComponent,
  tableDataFootProp,
  tableDataProp,
  validateAriaLabelledby
} from "./chunk-M7HZ2KT7.js";
import {
  Callback
} from "./chunk-E2XMBNEJ.js";
import "./chunk-TGGYHXBL.js";
import "./chunk-5NZISYSR.js";
import {
  PaginationFC,
  createPaginationItem
} from "./chunk-PR5JGMZ5.js";
import "./chunk-HRRUQDE3.js";
import "./chunk-G6SSZF6U.js";
import "./chunk-2ULWEJIA.js";
import "./chunk-PNMCSFOB.js";
import "./chunk-LS75FUCA.js";
import "./chunk-ETF7DHO3.js";
import "./chunk-EO54MTV4.js";
import "./chunk-YCYFPTWS.js";
import "./chunk-JCU3O6PN.js";
import "./chunk-EBSUS5ES.js";
import "./chunk-FRVQWXY2.js";
import "./chunk-RSHHA2HG.js";
import "./chunk-T3QCMHNQ.js";
import "./chunk-WUIMGAAG.js";
import "./chunk-XV6TVAFR.js";
import "./chunk-SR6CIZZ2.js";
import "./chunk-TXIZUTEV.js";
import "./chunk-ECNWMIMC.js";
import "./chunk-N4RN2MQH.js";
import "./chunk-LWHH35DI.js";
import "./chunk-JLURN3RE.js";
import "./chunk-ETC363DC.js";
import "./chunk-U2POW5WN.js";
import "./chunk-L5RCXHD3.js";
import "./chunk-AEQ2DHFL.js";
import "./chunk-6OHARAC5.js";
import "./chunk-7OTVGI43.js";
import "./chunk-U3F5DQBF.js";
import "./chunk-AXVYILGE.js";
import "./chunk-Q4L7LM2W.js";
import "./chunk-PVPG337L.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import "./chunk-4KQM2UAA.js";
import "./chunk-AIH4BWIT.js";
import "./chunk-IGUFDWYR.js";
import "./chunk-3C6UB25G.js";
import "./chunk-JIRF5MWS.js";
import "./chunk-FGYUAXNO.js";
import "./chunk-7Q2QTJQF.js";
import "./chunk-7C3Y25NJ.js";
import "./chunk-MIXJLZBB.js";
import "./chunk-VFFG6S5V.js";
import "./chunk-FQ2Y4FDM.js";
import "./chunk-SESBZTFK.js";
import "./chunk-ZVS5ACKA.js";
import "./chunk-AVJUB7OE.js";
import "./chunk-NQNQ4CHG.js";
import "./chunk-7UI7W6EF.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import "./chunk-QVVQWVZC.js";
import "./chunk-4323FHT3.js";
import "./chunk-KDS3LTFQ.js";
import "./chunk-MS3MLDFB.js";
import {
  createCallbacksPropDefinition,
  createPropDefinition,
  normalizeBoolean,
  normalizeString,
  trimLabel
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
import {
  devHint,
  parseJson
} from "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/kol-table-stateful.entry.js
var allowMultiSortProp = createPropDefinition("allowMultiSort", false, normalizeBoolean);
var paginationPositionOptions = ["both", "bottom", "top"];
var paginationPositionProp = createPropDefinition("paginationPosition", "bottom", (value) => {
  const str = normalizeString(value);
  if (paginationPositionOptions.includes(str)) {
    return str;
  }
  throw new Error(`Invalid pagination position: ${str}`);
});
var parseTablePagination = (value) => {
  try {
    return parseJson(value);
  } catch (_a) {
    return value;
  }
};
var isTablePaginationShown = (value) => {
  const parsed = parseTablePagination(value);
  return parsed === true || parsed === "" || typeof parsed === "object" && parsed !== null;
};
var tablePaginationProp = createPropDefinition("pagination", { _page: 1, _pageSize: 10, _max: 0 }, (value) => {
  const parsed = parseTablePagination(value);
  if (parsed === true || parsed === "") {
    return {};
  }
  if (typeof parsed === "object" && parsed !== null) {
    return parsed;
  }
  throw new Error("Invalid table pagination: expected true, an empty string or a pagination object.");
});
var tableStatefulCallbacksProp = createCallbacksPropDefinition();
var tableStatefulHeadersProp = createPropDefinition("headers", { horizontal: [], vertical: [] }, (value) => {
  const headers = typeof value === "string" ? parseJson(value) : value;
  if (typeof headers === "object" && headers !== null) {
    return headers;
  }
  throw new Error("Invalid table headers: expected an object.");
});
var isDefaultCell = (cell) => cell.type === void 0 || cell.type === "default";
function changeCellSort(sortData, headerCell, allowMultiSort) {
  var _a;
  if (!isDefaultCell(headerCell) || typeof headerCell.compareFn !== "function") {
    return void 0;
  }
  let next = !allowMultiSort && headerCell.key !== ((_a = sortData[0]) === null || _a === void 0 ? void 0 : _a.key) ? [] : sortData.map((entry) => Object.assign({}, entry));
  const index = next.findIndex((entry) => entry.key === headerCell.key);
  if (index >= 0) {
    const entry = next[index];
    switch (entry.direction) {
      case "ASC":
        entry.direction = "DESC";
        break;
      case "DESC":
        next = next.filter((_, position) => position !== index);
        break;
      default:
        entry.direction = "ASC";
        break;
    }
  } else if (headerCell.key) {
    next.push({ label: headerCell.label, key: headerCell.key, compareFn: headerCell.compareFn, direction: "ASC" });
  }
  return next;
}
function initializeSortFromHeaders(headers, allowMultiSort) {
  var _a, _b;
  let sortData = [];
  let hasSortedCells = false;
  let missingKey = false;
  const applySort = (cells) => {
    sortData = [];
    cells.forEach((cell) => {
      if (!isDefaultCell(cell)) {
        return;
      }
      if (typeof cell.compareFn === "function" && !cell.key) {
        missingKey = true;
        return;
      }
      const key = cell.key;
      if (!key) {
        return;
      }
      const direction = cell.sortDirection;
      if ((direction === "ASC" || direction === "DESC") && typeof cell.compareFn === "function") {
        if (allowMultiSort || sortData.length === 0) {
          sortData.push({ label: cell.label, key, compareFn: cell.compareFn, direction });
        }
        hasSortedCells = true;
      }
    });
  };
  (_a = headers.horizontal) === null || _a === void 0 ? void 0 : _a.forEach(applySort);
  (_b = headers.vertical) === null || _b === void 0 ? void 0 : _b.forEach(applySort);
  return { sortData, hasSortedCells, missingKey };
}
function hasHeadersInBothDirections(headers) {
  return Boolean(headers.horizontal && headers.vertical && headers.horizontal.length > 0 && headers.vertical.length > 0);
}
function sortRows(data, sortData, disableSort) {
  if (disableSort) {
    return data;
  }
  const sorted = [...data];
  if (sortData.length > 0) {
    sorted.sort((a, b) => {
      for (const entry of sortData) {
        const result = entry.compareFn(a, b, entry.direction);
        if (result !== 0) {
          return entry.direction === "ASC" ? result : -result;
        }
      }
      return 0;
    });
  }
  return sorted;
}
function selectDisplayedData(data, pageSize, page) {
  if (typeof pageSize === "number" && pageSize > 0 && typeof page === "number" && page > 0) {
    const end = pageSize * page > data.length ? data.length : pageSize * page;
    return { rows: data.slice(pageSize * (page - 1), end), end };
  }
  return { rows: data, end: data.length };
}
function getHeaderCellSortState(headerCell, sortData, disableSort) {
  if (!isDefaultCell(headerCell)) {
    return void 0;
  }
  if (!disableSort && typeof headerCell.compareFn === "function") {
    if (headerCell.key) {
      const entry = sortData.find((value) => value.key === headerCell.key);
      if (entry === null || entry === void 0 ? void 0 : entry.direction) {
        return entry.direction;
      }
    }
    return "NOS";
  }
  return void 0;
}
function getHeaderCellSortOrder(headerCell, sortData, disableSort, allowMultiSort) {
  if (!isDefaultCell(headerCell)) {
    return void 0;
  }
  if (!disableSort && allowMultiSort && typeof headerCell.compareFn === "function" && headerCell.key) {
    const index = sortData.findIndex((value) => value.key === headerCell.key);
    if (index >= 0) {
      return index + 1;
    }
  }
  return void 0;
}
function findHeaderCell(headers, key) {
  var _a, _b;
  const cells = [];
  for (const row of [...(_a = headers.horizontal) !== null && _a !== void 0 ? _a : [], ...(_b = headers.vertical) !== null && _b !== void 0 ? _b : []]) {
    if (Array.isArray(row)) {
      cells.push(...row);
    }
  }
  return cells.find((cell) => cell.key === key);
}
function headerKeysChanged(previous, next) {
  const getKeys = (headers) => {
    var _a, _b, _c, _d;
    return [
      ...(_b = (_a = headers.horizontal) === null || _a === void 0 ? void 0 : _a.flatMap((row) => row.map((cell) => cell === null || cell === void 0 ? void 0 : cell.key).filter((key) => Boolean(key)))) !== null && _b !== void 0 ? _b : [],
      ...(_d = (_c = headers.vertical) === null || _c === void 0 ? void 0 : _c.flatMap((column) => column.map((cell) => cell === null || cell === void 0 ? void 0 : cell.key).filter((key) => Boolean(key)))) !== null && _d !== void 0 ? _d : []
    ];
  };
  const previousKeys = getKeys(previous);
  const nextKeys = getKeys(next);
  return previousKeys.length !== nextKeys.length || previousKeys.some((key, index) => key !== nextKeys[index]);
}
function mergeAdjustedHeaderCells(headers, adjusted) {
  var _a;
  const originalByKey = /* @__PURE__ */ new Map();
  (_a = headers.horizontal) === null || _a === void 0 ? void 0 : _a.forEach((row) => row.forEach((cell) => {
    if (cell === null || cell === void 0 ? void 0 : cell.key) {
      originalByKey.set(cell.key, cell);
    }
  }));
  return adjusted.map((row) => row.map((cell) => {
    const original = (cell === null || cell === void 0 ? void 0 : cell.key) ? originalByKey.get(cell.key) : void 0;
    if (!original) {
      return cell;
    }
    const merged = Object.assign({}, original);
    if (cell.visible !== void 0)
      merged.visible = cell.visible;
    if (cell.width !== void 0)
      merged.width = cell.width;
    if (cell.hidable !== void 0)
      merged.hidable = cell.hidable;
    if (cell.sortable !== void 0)
      merged.sortable = cell.sortable;
    if (cell.resizable !== void 0)
      merged.resizable = cell.resizable;
    return merged;
  }));
}
function buildHeaderCells(headers, adjustedHeaderCells, sortData, disableSort, allowMultiSort) {
  var _a, _b, _c;
  const overlaySortState = (cell) => cell ? Object.assign(Object.assign({}, cell), { sortDirection: getHeaderCellSortState(cell, sortData, disableSort), sortOrder: getHeaderCellSortOrder(cell, sortData, disableSort, allowMultiSort) }) : cell;
  const horizontalHeaders = (adjustedHeaderCells === null || adjustedHeaderCells === void 0 ? void 0 : adjustedHeaderCells.horizontal) ? mergeAdjustedHeaderCells(headers, adjustedHeaderCells.horizontal) : headers.horizontal;
  return {
    horizontal: (_a = horizontalHeaders === null || horizontalHeaders === void 0 ? void 0 : horizontalHeaders.map((row) => row.map(overlaySortState))) !== null && _a !== void 0 ? _a : [],
    vertical: (_c = (_b = headers.vertical) === null || _b === void 0 ? void 0 : _b.map((column) => column.map(overlaySortState))) !== null && _c !== void 0 ? _c : []
  };
}
function getSelectedData(selection, sortedData, selectedKeys) {
  var _a;
  if (selection) {
    const keyPropertyName = (_a = selection.keyPropertyName) !== null && _a !== void 0 ? _a : "id";
    const keySet = new Set(selectedKeys.map(String));
    const data = sortedData.filter((item) => keySet.has(String(item[keyPropertyName])));
    if (keyPropertyName)
      return data;
  }
  return null;
}
var defaultStyleCss = () => `@charset "UTF-8";  @layer kol-a11y, kol-global, kol-component, kol-theme-global, kol-theme-component, kol-forced-colors, kol-theme-forced-colors;     @layer kol-a11y {   :host {          --a11y-min-size: max(calc(44 * 1rem / var(--kolibri-root-font-size, 16)), 44px);          --kol-a11y-font-color: black;     --kol-a11y-background-color: white;     color: var(--kol-a11y-font-color);     background-color: var(--kol-a11y-background-color);          --kol-a11y-font-family: Verdana;     font-family: var(--kol-a11y-font-family);          letter-spacing: inherit;          word-spacing: inherit;          text-align: left;   }   * {          hyphens: auto;          word-break: break-word;   }                  button,   .kol-input .input {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);   }      a,   button,   h1,   h2,   h3,   h4,   h5,   h6,   input,   option,   select,   textarea {          color: inherit;          font-family: inherit;          font-size: inherit;          letter-spacing: inherit;          word-spacing: inherit;   }      .visually-hidden {          position: fixed !important;     top: 0;     left: 0;     width: 1px;     height: 1px;     margin: 0 !important;     padding: 0 !important;     overflow: hidden;     white-space: nowrap;     border: 0;     clip-path: inset(50%);   } }  @layer kol-forced-colors {   @media (forced-colors: active) {     .kol-button__text {       color: ButtonText;       background-color: ButtonFace;       border: 2px solid ButtonBorder;     }     .kol-button--disabled .kol-button__text {       color: GrayText;       border-color: GrayText;     }          .kol-link__interactive-element[aria-disabled=true],     .kol-accordion__heading[aria-disabled=true],     .kol-details__heading[aria-disabled=true] {       color: GrayText;     }     .kol-link__interactive-element[aria-disabled=true] .kol-icon,     .kol-link__interactive-element[aria-disabled=true] .kol-span__label,     .kol-accordion__heading[aria-disabled=true] .kol-icon,     .kol-accordion__heading[aria-disabled=true] .kol-span__label,     .kol-details__heading[aria-disabled=true] .kol-icon,     .kol-details__heading[aria-disabled=true] .kol-span__label {       color: GrayText;     }     input:disabled,     select:disabled,     textarea:disabled {       color: GrayText;       border-color: GrayText;     }     .kol-card,     .kol-dialog,     .kol-modal {       color: CanvasText;       background-color: Canvas;       border: 1px solid ButtonBorder;     }          .kol-meter meter {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-bar {       background-color: Canvas;       border-color: CanvasText;     }     .kol-meter meter::-webkit-meter-optimum-value,     .kol-meter meter::-webkit-meter-suboptimum-value,     .kol-meter meter::-webkit-meter-even-less-good-value {       background-color: CanvasText;     }     .kol-meter meter::-moz-meter-bar {       background-color: CanvasText;     }     .kol-pagination__button--selected .kol-button {       opacity: 1;     }     .kol-pagination__button--selected .kol-button__text {       color: SelectedItemText;       background-color: SelectedItem;     }          .kol-button__interactive-element:focus-visible,     .kol-link__interactive-element:focus-visible {       outline: 2px solid Highlight;       outline-offset: 2px;     }   } } @layer kol-global {      :is(a, button) {     background-color: transparent;     width: 100%;     margin: 0;     padding: 0;     border: none;        }      [hidden] {     display: none !important;   }   .badge-text-hint {     color: black;     background-color: white;   } } @layer kol-global {   :host {          max-width: 100%;     font-size: calc(16 * 1rem / var(--kolibri-root-font-size, 16));   }   * {          box-sizing: border-box;   }   .kol-span {          display: flex;     flex-flow: column;     align-items: center;     justify-content: center;        }   .kol-span__container {     display: flex;     align-items: center;   }   a,   button {     cursor: pointer;   }      button:disabled {     color: unset;   }      .disabled label,   .disabled:focus-within label,   [aria-disabled=true],   [aria-disabled=true]:focus,   [disabled]:where(:not(fieldset)),   [disabled]:where(:not(fieldset)):focus {     outline: none;     cursor: not-allowed;   }   [aria-disabled=true]:focus .kol-span,   [disabled]:focus .kol-span {     outline: none !important;   }   .hastooltip {     z-index: 900 !important;   } } @layer kol-component {   :host {     display: block;   } } @font-face {   font-family: "kolicons";   src: url("kolicons.eot?t=1795160658049");    src: url("kolicons.eot?t=1795160658049#iefix") format("embedded-opentype"), url("kolicons.woff2?t=1795160658049") format("woff2"), url("kolicons.woff?t=1795160658049") format("woff"), url("kolicons.ttf?t=1795160658049") format("truetype"), url("kolicons.svg?t=1795160658049#kolicons") format("svg");  } @layer kol-component {   [class^=kolicon-], [class*=" kolicon-"] {     font-family: "kolicons";     font-style: normal;     font-weight: 400;     line-height: 1em;     -webkit-font-smoothing: antialiased;     -moz-osx-font-smoothing: grayscale;   }   .kolicon-alert-error::before {     content: "\\ea01";   }   .kolicon-alert-info::before {     content: "\\ea02";   }   .kolicon-alert-success::before {     content: "\\ea03";   }   .kolicon-alert-warning::before {     content: "\\ea04";   }   .kolicon-check::before {     content: "\\ea05";   }   .kolicon-chevron-double-left::before {     content: "\\ea06";   }   .kolicon-chevron-double-right::before {     content: "\\ea07";   }   .kolicon-chevron-down::before {     content: "\\ea08";   }   .kolicon-chevron-left::before {     content: "\\ea09";   }   .kolicon-chevron-right::before {     content: "\\ea0a";   }   .kolicon-chevron-up::before {     content: "\\ea0b";   }   .kolicon-cogwheel::before {     content: "\\ea0c";   }   .kolicon-cross::before {     content: "\\ea0d";   }   .kolicon-eye-closed::before {     content: "\\ea0e";   }   .kolicon-eye::before {     content: "\\ea0f";   }   .kolicon-house::before {     content: "\\ea10";   }   .kolicon-kolibri::before {     content: "\\ea11";   }   .kolicon-link-external::before {     content: "\\ea12";   }   .kolicon-link::before {     content: "\\ea13";   }   .kolicon-minus::before {     content: "\\ea14";   }   .kolicon-pin-pinned::before {     content: "\\ea15";   }   .kolicon-pin-unpinned::before {     content: "\\ea16";   }   .kolicon-plus::before {     content: "\\ea17";   }   .kolicon-settings::before {     content: "\\ea18";   }   .kolicon-sort-asc::before {     content: "\\ea19";   }   .kolicon-sort-desc::before {     content: "\\ea1a";   }   .kolicon-sort-neutral::before {     content: "\\ea1b";   }   .kolicon-up::before {     content: "\\ea1c";   }   .kolicon-version::before {     content: "\\ea1d";   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-tooltip {     display: contents;   }   .kol-tooltip__floating {     opacity: 0;     display: none;     position: fixed;          top: 0;     left: 0;          width: var(--kol-tooltip-width, max-content);     min-width: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     max-width: 90vw;     max-height: 90vh;     animation-direction: normal;          animation-duration: var(--kolibri-tooltip-animation-duration, 250ms);     animation-fill-mode: forwards;     animation-iteration-count: 1;     animation-timing-function: ease-in;   }   .kol-tooltip__floating.hide {     animation-name: hideTooltip;   }   .kol-tooltip__floating.show {     animation-name: showTooltip;   }   .kol-tooltip__arrow {     transform: rotate(45deg);     color: black;     background-color: white;     position: absolute;     z-index: 999;     width: calc(10 * 1rem / var(--kolibri-root-font-size, 16));     height: calc(10 * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-tooltip__content {     color: black;     background-color: white;     position: relative;     z-index: 1000;   }   @keyframes hideTooltip {     0% {       opacity: 1;     }     100% {       opacity: 0;       display: none;     }   }   @keyframes showTooltip {     0% {       opacity: 0;     }     100% {       opacity: 1;     }   } }    @layer kol-component {   @keyframes rotate {     to {       transform: rotate(1turn);     }   }   @keyframes growingCircle {     0% {       opacity: 0.5;       border-color: white;       clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);     }     25% {       opacity: 0.75;       border-color: var(--kol-spin-color, var(--kol-theme-spin-color, #000));       clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);     }     50% {       opacity: 1;       border-color: var(--kol-spin-color, var(--kol-theme-spin-color, black));       clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);     }     75% {       opacity: 1;       border-color: var(--kol-spin-color, var(--kol-theme-spin-color, black));       clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);     }     100% {       opacity: 0.1;       border-color: var(--kol-spin-color, var(--kol-theme-spin-color, black));       clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);     }   }   .kol-spin__spinner--cycle {     width: calc(var(--kol-spin-size, 48) * 1rem / var(--kolibri-root-font-size, 16));     height: calc(var(--kol-spin-size, 48) * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-spin__spinner--cycle .kol-spin__loader {     border-radius: 50%;     display: block;     position: relative;     width: 100%;     height: 100%;     animation: 2s linear infinite rotate;   }   @media (prefers-reduced-motion) {     .kol-spin__spinner--cycle .kol-spin__loader {       animation-duration: 4s !important;     }   }   .kol-spin__spinner--cycle .kol-spin__loader::before {     border-radius: 50%;     position: absolute;     inset: 0;     content: "";     animation: 3s linear infinite growingCircle;     border: 5px solid var(--kol-spin-color, var(--kol-theme-spin-color, #333));   }   @media (prefers-reduced-motion) {     .kol-spin__spinner--cycle .kol-spin__loader::before {       animation-duration: 6s !important;     }   } } @layer kol-component {   @keyframes spin1 {     0% {       transform: scale(0);     }     100% {       transform: scale(1);     }   }   @keyframes spin2 {     0% {       transform: translate(0, 0);     }     100% {       transform: translate(calc(var(--kol-spin-size, 13) * 1rem / var(--kolibri-root-font-size, 16)), 0);     }   }   @keyframes spin3 {     0% {       transform: scale(1);     }     100% {       transform: scale(0);     }   }      @media (prefers-reduced-motion) {     .kol-spin__spinner-element {       animation-duration: 2s !important;     }   }   .kol-spin__spinner--dot {     --kol-spin-border-width: calc(var(--kol-spin-size, 13) / 10);     width: calc(calc(var(--kol-spin-size, 13) * 3 + 2) * 1rem / var(--kolibri-root-font-size, 16));     height: calc(calc(var(--kol-spin-size, 13) + var(--kol-spin-border-width) * 2) * 1rem / var(--kolibri-root-font-size, 16));   }   .kol-spin__spinner--dot .kol-spin__spinner-element {     background-color: var(--kol-spin-color, var(--kol-theme-spin-color, #000));     border-radius: 50%;     position: absolute;     top: 1px;     width: calc(var(--kol-spin-size, 13) * 1rem / var(--kolibri-root-font-size, 16));     height: calc(var(--kol-spin-size, 13) * 1rem / var(--kolibri-root-font-size, 16));     animation-timing-function: cubic-bezier(0, 1, 1, 0);     border: calc(var(--kol-spin-border-width) * 1rem / var(--kolibri-root-font-size, 16)) solid white;   }   .kol-spin__spinner--dot .kol-spin__spinner-element--1 {     left: calc(var(--kol-spin-border-width) * 1rem / var(--kolibri-root-font-size, 16));     z-index: 0;     animation: 1s infinite spin1;   }   .kol-spin__spinner--dot .kol-spin__spinner-element--2 {     left: calc(var(--kol-spin-border-width) * 1rem / var(--kolibri-root-font-size, 16));     z-index: 1;     animation: 1s infinite spin2;   }   .kol-spin__spinner--dot .kol-spin__spinner-element--3 {     left: calc(calc(var(--kol-spin-size, 13) + var(--kol-spin-border-width)) * 1rem / var(--kolibri-root-font-size, 16));     z-index: 1;     animation: 1s infinite spin2;   }   .kol-spin__spinner--dot .kol-spin__spinner-element--neutral {     opacity: 0.6;     left: calc(calc(var(--kol-spin-size, 13) * 2 + var(--kol-spin-border-width)) * 1rem / var(--kolibri-root-font-size, 16));     z-index: 0;     animation: 1s infinite spin3;   } } @layer kol-component {   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-card .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-card :host {     display: inline-block;   }   .kol-card .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-card .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-card .kol-button__interactive-element::before {     content: "​";   }   .kol-card .kol-button__text {     flex: 1 0 100%;   }   .kol-card .kol-button {        }   .kol-card .kol-button__tooltip {     height: 0;   }   .kol-card .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-card .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-card {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     display: grid;     height: 100%;     overflow: visible;     grid-template-areas: "header  close" "content content";     grid-template-columns: 1fr min-content;     grid-template-rows: min-content 1fr;   }   .kol-card__header {     align-self: start;     grid-area: header;   }   .kol-card__content {     align-self: stretch;     grid-area: content;   }   .kol-card__close-button {          position: relative;     z-index: 1;     grid-area: close;   }   .kol-card:has(.kol-card__link) {     position: relative;   }   .kol-card__link::after {     position: absolute;     inset: 0;     content: "";     cursor: pointer;   }   .kol-dialog,   .kol-modal {     min-height: var(--a11y-min-size);     padding: 0;     border: 0;          overscroll-behavior: contain;   }   .kol-dialog__close-button,   .kol-modal__close-button {     position: absolute;     top: calc(1 * 1rem / var(--kolibri-root-font-size, 16));     right: calc(1 * 1rem / var(--kolibri-root-font-size, 16));     z-index: 1;   }   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   }   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   :host {     display: inline-block;   }   .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-button__interactive-element::before {     content: "​";   }   .kol-button__text {     flex: 1 0 100%;   }   .kol-button {        }   .kol-button__tooltip {     height: 0;   }   .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-popover-button {          display: inline;   }   .kol-popover-button__popover {     margin: 0;     padding: 0;     border: 0;   }   .kol-popover-button--open .kol-button__tooltip {     display: none;   }   .kol-popover-button--inline {     display: inline-block;        }   .kol-popover-button--inline .kol-button,   .kol-popover-button--inline .kol-button .kol-button__interactive-element {     min-width: 0;     min-height: 1em;   }   .kol-popover {     opacity: 0;     transition: 0.2s ease-out opacity;   }   .kol-popover-button--open .kol-popover-button__popover {     opacity: 1;   }   .kol-table-settings {     position: absolute;     top: 0;     right: 0;     z-index: 1;   }   .kol-table-settings .kol-popover-button__popover {     background: white;     box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);     border-radius: calc(8 * 1rem / var(--kolibri-root-font-size, 16));     border: 1px solid black;   }   .kol-table-settings__columns {     display: grid;     max-height: calc(200 * 1rem / var(--kolibri-root-font-size, 16));     overflow: auto;     grid-auto-rows: min-content;     grid-template-columns: min-content minmax(max-content, 1fr) calc(140 * 1rem / var(--kolibri-root-font-size, 16)) auto auto;   }   .kol-table-settings__column {     display: grid;     align-items: center;     grid-template-columns: subgrid;     grid-column: 1/6;   }   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-table {     --kol-table-selection-col-width: var(--a11y-min-size);     display: block;     position: relative;     max-width: 100%;   }   .kol-table:has(.kol-table__focus-element:focus) .kol-table__scroll-container {          outline: 5px auto Highlight;     outline: 5px auto -webkit-focus-ring-color;     outline-offset: 2px;   }   .kol-table__scroll-container {     overflow-x: auto;     overflow-y: hidden;   }   .kol-table__table {     table-layout: fixed;   }   .kol-table__caption {     min-height: var(--a11y-min-size);     text-align: start;   }   .kol-table__settings:not(:has(~ .kol-table__scroll-container .kol-table__caption)) {     min-height: var(--a11y-min-size);   }   .kol-table__sort-button.kol-button {     color: inherit;   }   .kol-table__sort {     display: inline-flex;     align-items: center;   }   .kol-table__sort-order {     display: inline-flex;     align-items: center;     justify-content: center;   }   .kol-table__body {     text-align: left;   }   .kol-table__body .kol-button__text {     justify-items: start;   }   .kol-table__body:has(.kol-table__loader--shown) {     position: relative;     min-height: calc(var(--a11y-min-size) * 3);   }   .kol-table__cell--align-left {     text-align: left;   }   .kol-table__cell--align-left .kol-table__sort-button .kol-button__text {     align-items: start;     text-align: start;   }   .kol-table__cell--align-left .kol-table__cell-actions {     justify-content: flex-start;   }   .kol-table__cell--align-center {     text-align: center;   }   .kol-table__cell--align-center .kol-table__sort-button .kol-button__text {     align-items: center;   }   .kol-table__cell--align-right {     text-align: right;   }   .kol-table__cell--align-right .kol-table__sort-button .kol-button__text {     align-items: end;     text-align: end;   }   .kol-table__cell--align-right .kol-table__cell-actions {     justify-content: flex-end;   }   .kol-table__cell--selection {     background-color: white;     position: sticky !important;     left: 0;     z-index: 2;     width: var(--kol-table-selection-col-width, auto);     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     white-space: nowrap;   }   .kol-table__cell--actions {     white-space: nowrap;   }   .kol-table__cell--actions .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-table__cell--actions :host {     display: inline-block;   }   .kol-table__cell--actions .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-table__cell--actions .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-table__cell--actions .kol-button__interactive-element::before {     content: "​";   }   .kol-table__cell--actions .kol-button__text {     flex: 1 0 100%;   }   .kol-table__cell--actions .kol-button {        }   .kol-table__cell--actions .kol-button__tooltip {     height: 0;   }   .kol-table__cell--actions .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-table__cell--actions .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-table__cell--actions .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-table__cell--actions :host {     display: inline-block;   }   .kol-table__cell--actions .kol-link {     display: inline-flex;     max-width: fit-content;   }   .kol-table__cell--actions .kol-link--standalone {     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: stretch;        }   .kol-table__cell--actions .kol-link--standalone .kol-link__interactive-element {     align-items: stretch;   }   .kol-table__cell--actions .kol-link--standalone .kol-link__text {     display: inline-flex;     flex: 1 1 100%;     place-items: center;   }   .kol-table__cell--actions .kol-link__interactive-element {     display: inline-flex;     flex: 1;     align-items: baseline;     place-items: center;     text-align: left;     text-decoration-line: none;   }   .kol-table__cell--actions .kol-link__interactive-element:focus:not([aria-disabled], [disabled]) .kol-span__label, .kol-table__cell--actions .kol-link__interactive-element:hover:not([aria-disabled], [disabled]) .kol-span__label {     text-decoration-thickness: 0.2em;   }   .kol-table__cell--actions .kol-link .kol-span__label {     text-decoration-line: underline;   }   .kol-table__cell--actions .kol-link__icon {     display: inline-flex;   }   .kol-table__cell--sticky-left, .kol-table__cell--sticky-right {     background-color: white;     position: sticky !important;     z-index: 1;   }   .kol-table__cell--sticky-left:nth-last-child(1 of .kol-table__cell--sticky-left) {     border-right: 2px solid black;   }   .kol-table__cell--sticky-right:nth-child(1 of .kol-table__cell--sticky-left) {     border-left: 2px solid black;   }   .kol-table__cell-actions {     display: flex;     flex-wrap: wrap;     align-items: center;     justify-content: center;   }   .kol-table__cell-states {     display: flex;     flex-wrap: wrap;     align-items: center;     justify-content: flex-start;   }   .kol-table__spacer {     display: none;   }   .kol-table__selection {     position: relative;   }   .kol-table__selection-label {     display: flex;     position: relative;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     justify-content: center;        }   .kol-table__selection-label:not(.kol-table__selection-label--disabled) {     cursor: pointer;   }   .kol-table__selection-label--disabled {     cursor: not-allowed;   }   .kol-table__selection-icon {     display: block;     position: absolute;     inset: auto;     z-index: 1;   }   .kol-table__selection-input {     border-style: solid;     margin: 0;     appearance: none;     cursor: pointer;   }   .kol-table__selection-input:disabled {     cursor: not-allowed;   }   .kol-table__selection-input:before {     content: "";   }   .kol-table__selection-input--checkbox {     background-color: white;     display: flex;     position: relative;     min-width: calc(var(--a11y-min-size) / 2);     min-height: calc(var(--a11y-min-size) / 2);     border-width: 2px;     align-items: center;     justify-content: center;     line-height: 1.5;   }   .kol-table__selection-input--radio {     border-radius: 100%;     display: flex;     width: 1.5em;     min-width: 1.5em;     height: 1.5em;     min-height: 1.5em;     padding: 0;     border-width: 2px;   }   .kol-table__selection-input--radio:before {     border-radius: 100%;     width: 0.75em;     height: 0.75em;     margin: auto;   }   .kol-table__selection-input--radio:checked:before {     background-color: black;   }   @media (forced-colors: active) {     .kol-table__selection-input--radio:checked:before {              background-color: selectedItem !important;     }   }   .kol-table__loader--shown {     background: white;     display: flex;     position: absolute;     top: 0;     right: 0;     bottom: 0;     left: 0;     z-index: 1;     align-items: center;     justify-content: center;   }   .kol-alert .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-alert :host {     display: inline-block;   }   .kol-alert .kol-button {     display: flex;     height: 100%;     min-height: var(--a11y-min-size);     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element {     display: flex;     flex: 1;     text-align: left;     text-decoration-line: none;        }   .kol-alert .kol-button__interactive-element::before {     content: "​";   }   .kol-alert .kol-button__text {     flex: 1 0 100%;   }   .kol-alert .kol-button {        }   .kol-alert .kol-button__tooltip {     height: 0;   }   .kol-alert .kol-button--external-link > .kolicon-link-external::before {     content: none;   }   .kol-alert .kol-button--external-link .kol-button__interactive-element > .kolicon-link-external::before {     content: none;   }   .kol-alert {     display: grid;     grid-template-areas: "icon heading close" "icon content close";     grid-template-columns: min-content 1fr min-content;     grid-template-rows: min-content min-content;   }   .kol-alert__icon {     grid-area: icon;   }   .kol-alert__heading {     grid-area: heading;   }   .kol-alert__closer {          outline: transparent solid calc(1 * 1rem / var(--kolibri-root-font-size, 16));     grid-area: close;   }   .kol-alert__content {     grid-area: content;   }   .kol-form-field .kol-popover-button {          display: inline;   }   .kol-form-field .kol-popover-button__popover {     margin: 0;     padding: 0;     border: 0;   }   .kol-form-field .kol-popover-button--open .kol-button__tooltip {     display: none;   }   .kol-form-field .kol-popover-button--inline {     display: inline-block;        }   .kol-form-field .kol-popover-button--inline .kol-button,   .kol-form-field .kol-popover-button--inline .kol-button .kol-button__interactive-element {     min-width: 0;     min-height: 1em;   }   .kol-form-field .kol-popover {     opacity: 0;     transition: 0.2s ease-out opacity;   }   .kol-form-field .kol-popover-button--open .kol-popover-button__popover {     opacity: 1;   }   .kol-form-field {     display: grid;   }   .kol-form-field:not(.kol-form-field--disabled) .kol-form-field__label {     cursor: pointer;   }   .kol-form-field__label {     display: flex;   }   .kol-form-field__label-text {     flex-flow: row;     align-items: flex-start;     justify-content: flex-start;   }   .kol-form-field--required .kol-form-field__label-text:has(.kol-span__slot[hidden]) .kol-span__label::after, .kol-form-field--required:not(:has(.kol-form-field__label--legend)) .kol-form-field__input .kol-tooltip__content .kol-span__label::after {     content: "*"/"";   }   .kol-input-container {     background-color: transparent;     display: grid;     position: relative;     width: 100%;     min-width: var(--a11y-min-size);     min-height: var(--a11y-min-size);     align-items: center;     grid-template-columns: 1fr;   }   .kol-input-container:has(> .kol-input-container__adornment--start) {     grid-template-columns: auto 1fr auto;   }   .kol-input-container__container {     position: relative;     z-index: 1;   }   .kol-input-container__adornment {     display: flex;     align-items: center;   }   .kol-input-container__adornment .kol-icon {     display: grid;     place-items: center;   }   .kol-select {     background-color: transparent;     width: 100%;     padding: 0;   }   .kol-select:not(:disabled) {     cursor: pointer;   }   .kol-select:not([multiple], [size]) {     height: 2.75em;   }   .kol-select[multiple][size="1"] {     height: 2.75em;   }   .kol-select__option:checked::before {     content: "✓ ";   }   .kol-select[multiple] option {     display: flex;     min-height: var(--a11y-min-size);     align-items: center;   }   .kol-select[multiple][size="1"] option::checkmark {     height: 100%;   }   .kol-select[multiple][size="1"] option:checked::before {     display: none;   }   .kol-icon {     color: inherit;     display: inline-block;     font-size: inherit;     font-weight: inherit;     line-height: inherit;   }   .kol-pagination {     display: flex;     flex-wrap: wrap;     align-items: center;     justify-content: center;     container: paging/inline-size;   }   .kol-pagination__navigation-list {     display: inline-flex;     margin: 0;     padding: 0;     flex-wrap: wrap;     align-items: center;     list-style: none;   }   .kol-pagination__separator:before {     content: "•••";   }   .kol-pagination__page-size-select .kol-form-field-select {     align-items: center;     grid-template-columns: 1fr max-content;   }   @container paging (width < 600px) {     .kol-pagination:has(.kol-pagination__button--first) li:has(.kol-pagination__button--numbers),     .kol-pagination:has(.kol-pagination__button--first) li:has(.kol-pagination__separator) {       display: none;     }   }   .kol-spin {          display: contents;   }   .kol-spin__spinner {     display: block;     position: relative;   } }`;
var tableStatefulBem = bem.forBlock("kol-table-stateful");
var BEM_CLASS_TABLE_STATEFUL__PAGINATION_WRAPPER = tableStatefulBem("pagination-wrapper");
var PAGINATION_OPTIONS = [10, 20, 50, 100];
var KolTableStateful = class extends BaseTableStatelessWebComponent {
  constructor(hostRef) {
    super(...arguments);
    if (new.target === KolTableStateful)
      registerInstance(this, hostRef);
    this.pagination = { _page: 1, _pageSize: 10, _max: 0 };
    this.renderCount = 0;
    this.externalLabelElements = [];
    this.hasScrollbar = false;
    this.settingsChangedCounter = 0;
    this.sortedData = [];
    this.stickyColsDisabled = false;
    this.data = [];
    this.headers = { horizontal: [], vertical: [] };
    this.allowMultiSort = false;
    this.paginationPosition = "bottom";
    this.statefulOn = {};
    this.sortData = [];
    this.disableSort = false;
    this.showPagination = false;
    this.pageEndSlice = 10;
    this.paginationItems = {};
    this.rowKeys = /* @__PURE__ */ new Map();
    this.statelessOn = {
      onSort: (_event, { key }) => {
        const headerCell = findHeaderCell(this.headers, key);
        if (headerCell) {
          const sortData = changeCellSort(this.sortData, headerCell, this.allowMultiSort);
          if (sortData) {
            this.sortData = sortData;
            this.updateSortedData();
          }
        }
      }
    };
    this.handlePagination = {
      onClick: (event, page) => {
        var _a;
        if (typeof ((_a = this.pagination._on) === null || _a === void 0 ? void 0 : _a.onClick) === "function") {
          this.pagination._on.onClick(event, page);
        }
        this.pagination = Object.assign(Object.assign({}, this.pagination), { _page: page });
      },
      onChangePage: (event, page) => {
        var _a;
        if (typeof ((_a = this.pagination._on) === null || _a === void 0 ? void 0 : _a.onChangePage) === "function") {
          this.pagination._on.onChangePage(event, page);
        }
        this.pagination = Object.assign(Object.assign({}, this.pagination), { _page: page });
      },
      onChangePageSize: (event, pageSize) => {
        var _a;
        if (typeof ((_a = this.pagination._on) === null || _a === void 0 ? void 0 : _a.onChangePageSize) === "function") {
          this.pagination._on.onChangePageSize(event, pageSize);
        }
        this.pagination = Object.assign(Object.assign({}, this.pagination), { _pageSize: pageSize });
      }
    };
    this._ariaLabelledby = void 0;
    this._allowMultiSort = void 0;
    this._dataFoot = void 0;
    this._fixedCols = void 0;
    this._loading = void 0;
    this._pagination = void 0;
    this._paginationPosition = "bottom";
    this._selection = void 0;
    this._on = void 0;
    this._hasSettingsMenu = void 0;
    this._variant = void 0;
    this.updateSortedData = () => {
      this.sortedData = sortRows(this.data, this.sortData, this.disableSort);
    };
    this.handleChangeHeaderCells = (headerCells) => {
      this.adjustedHeaderCells = headerCells;
    };
  }
  watchAriaLabelledby(value) {
    this.resolveExternalLabel(value);
  }
  watchAllowMultiSort(value) {
    allowMultiSortProp.apply(value, (v) => {
      this.allowMultiSort = v;
    });
  }
  watchData(value) {
    tableDataProp.apply(value, (rows) => {
      this.data = rows;
      setTimeout(this.updateSortedData);
    });
  }
  watchDataFoot(value) {
    tableDataFootProp.apply(value, (rows) => {
      this.setRenderProp("dataFoot", rows);
      setTimeout(this.updateSortedData);
    });
  }
  watchFixedCols(value) {
    this.applyFixedCols(value);
  }
  watchHeaders(value) {
    tableStatefulHeadersProp.apply(value, (headers) => {
      if (headerKeysChanged(this.headers, headers)) {
        this.adjustedHeaderCells = void 0;
      }
      if (this.initializeSort(headers)) {
        setTimeout(() => this.updateSortedData());
      }
      if (hasHeadersInBothDirections(headers)) {
        this.disableSort = true;
        devHint(`Table: You can not sort the table data, if horizontal and vertical headers are defined at the same time. (https://github.com/public-ui/kolibri/issues/2372)`);
      }
      this.headers = headers;
    });
  }
  watchLabel(value) {
    this.applyLabel(value);
  }
  watchLoading(value) {
    this.applyLoading(value);
  }
  watchPagination(value) {
    this.showPagination = isTablePaginationShown(value);
    tablePaginationProp.apply(value, (v) => {
      this.pagination = v;
    });
  }
  watchPaginationPosition(value) {
    paginationPositionProp.apply(value, (v) => {
      this.paginationPosition = v;
    });
  }
  watchSelection(value) {
    this.applySelection(value);
  }
  watchOn(value) {
    tableStatefulCallbacksProp.apply(value, (v) => {
      this.statefulOn = v;
    });
  }
  watchHasSettingsMenu(value) {
    this.applyHasSettingsMenu(value);
  }
  watchVariant(value) {
    this.applyVariant(value);
  }
  getSelection() {
    var _a;
    return Promise.resolve(this.getSelectedData(((_a = this.getRenderProp("selection") || void 0) === null || _a === void 0 ? void 0 : _a.selectedKeys) || []));
  }
  resetSort() {
    this.initializeSort(this.headers);
    this.updateSortedData();
    return Promise.resolve();
  }
  componentWillLoad() {
    this.applyOn(this.statelessOn);
    this.resolveExternalLabel(this._ariaLabelledby);
    this.watchAllowMultiSort(this._allowMultiSort);
    this.watchData(this._data);
    this.watchDataFoot(this._dataFoot);
    this.watchFixedCols(this._fixedCols);
    this.watchHeaders(this._headers);
    this.watchLabel(this._label);
    this.watchLoading(this._loading);
    this.watchOn(this._on);
    this.watchPagination(this._pagination);
    this.watchPaginationPosition(this._paginationPosition);
    this.watchSelection(this._selection);
    this.watchHasSettingsMenu(this._hasSettingsMenu);
    this.watchVariant(this._variant);
  }
  componentDidLoad() {
    if (!this.externalLabelElements.length) {
      this.resolveExternalLabel(this._ariaLabelledby);
    }
    this.observeScrollContainer();
  }
  componentWillRender() {
    var _a;
    const { rows, end } = selectDisplayedData(this.sortedData, this.showPagination ? (_a = this.pagination._pageSize) !== null && _a !== void 0 ? _a : 10 : this.sortedData.length, this.pagination._page || 1);
    this.pageEndSlice = end;
    this.applyData(rows);
    this.applyHeaders(this.buildHeaderCells());
    this.syncPagination("top", this._paginationPosition === "top" || this._paginationPosition === "both");
    this.syncPagination("bottom", this._paginationPosition === "bottom" || this._paginationPosition === "both");
  }
  componentDidRender() {
    var _a, _b;
    this.updateScrollbarState();
    this.syncTableItems();
    (_a = this.paginationItems.top) === null || _a === void 0 ? void 0 : _a.sync();
    (_b = this.paginationItems.bottom) === null || _b === void 0 ? void 0 : _b.sync();
  }
  disconnectedCallback() {
    var _a, _b;
    this.teardownTable();
    (_a = this.paginationItems.top) === null || _a === void 0 ? void 0 : _a.destroy();
    (_b = this.paginationItems.bottom) === null || _b === void 0 ? void 0 : _b.destroy();
  }
  onChangeHeaderCells(event) {
    this.handleChangeHeaderCells(Object.assign(Object.assign({}, this.getRenderProp("headers")), { horizontal: event.detail }));
    this.applyChangedHeaderCells(event);
  }
  onKeydown(event) {
    this.moveCheckboxFocus(event);
  }
  initializeSort(headers) {
    const { sortData, hasSortedCells, missingKey } = initializeSortFromHeaders(headers, this.allowMultiSort);
    if (missingKey) {
      devHint(`[KolTableStateful] A sortable column requires the 'key' property.`);
    }
    this.sortData = sortData;
    return hasSortedCells;
  }
  buildHeaderCells() {
    return buildHeaderCells(this.headers, this.adjustedHeaderCells, this.sortData, this.disableSort, this.allowMultiSort);
  }
  getSelectedData(selectedKeys) {
    return getSelectedData(this.getRenderProp("selection") || void 0, this.sortedData, selectedKeys);
  }
  emitSelectionChange(event, payload) {
    const selectedKeys = payload;
    const selection = this.getRenderProp("selection");
    if (selection) {
      this.applySelection(Object.assign(Object.assign({}, selection), { selectedKeys }));
      this.renderCount++;
    }
    const selectedData = this.getSelectedData(selectedKeys);
    const onSelectionChange = this.statefulOn[Callback.onSelectionChange];
    if (typeof onSelectionChange === "function") {
      onSelectionChange(event, selectedData);
    }
    if (this.host) {
      dispatchDomEvent(this.host, KolEvent.selectionChange, selectedData);
    }
  }
  getPaginationInput(position) {
    const positionLabel = position === "top" ? translate("kol-pagination-position-top") : translate("kol-pagination-position-bottom");
    return {
      boundaryCount: this.pagination._boundaryCount,
      customClass: this.pagination._customClass,
      hasButtons: this.pagination._hasButtons,
      on: this.handlePagination,
      page: this.pagination._page,
      pageSize: this.pagination._pageSize,
      pageSizeOptions: this.pagination._pageSizeOptions || PAGINATION_OPTIONS,
      siblingCount: this.pagination._siblingCount,
      tooltipAlign: "bottom",
      max: this.pagination._max || this.data.length,
      label: translate("kol-table-pagination-label", {
        placeholders: {
          label: `${trimLabel(this.getRenderProp("label"))} (${positionLabel})`
        }
      })
    };
  }
  syncPagination(position, atPosition) {
    const item = this.paginationItems[position];
    if (this.pageEndSlice > 0 && this.showPagination && atPosition) {
      const input = this.getPaginationInput(position);
      if (item) {
        item.update(input);
      } else {
        const created = createPaginationItem({
          getEventTarget: () => this.host,
          requestRender: () => {
            this.renderCount++;
          }
        });
        created.load(input);
        this.paginationItems[position] = created;
      }
    } else if (item) {
      item.destroy();
      delete this.paginationItems[position];
    }
  }
  resolveExternalLabel(value) {
    this.externalLabelElements = validateAriaLabelledby(this, this.host, value);
    this.syncTableLabel(this.externalLabelElements);
  }
  renderPagination(position) {
    const item = this.paginationItems[position];
    return item && h("div", { class: tableStatefulBem("pagination", { [this.paginationPosition]: true }) }, h("div", { class: BEM_CLASS_TABLE_STATEFUL__PAGINATION_WRAPPER }, h(PaginationFC, Object.assign({}, item.getFcProps()))));
  }
  render() {
    return h(Host, { key: "0bd29f01e9299380eff33e26d02fa1ca105e37a3", class: "kol-table-stateful" }, this.renderPagination("top"), this.renderTableStatelessFC(), this.renderPagination("bottom"));
  }
  get host() {
    return getElement(this);
  }
  static get watchers() {
    return {
      "_ariaLabelledby": [{
        "watchAriaLabelledby": 0
      }],
      "_allowMultiSort": [{
        "watchAllowMultiSort": 0
      }],
      "_data": [{
        "watchData": 0
      }],
      "_dataFoot": [{
        "watchDataFoot": 0
      }],
      "_fixedCols": [{
        "watchFixedCols": 0
      }],
      "_headers": [{
        "watchHeaders": 0
      }],
      "_label": [{
        "watchLabel": 0
      }],
      "_loading": [{
        "watchLoading": 0
      }],
      "_pagination": [{
        "watchPagination": 0
      }],
      "_paginationPosition": [{
        "watchPaginationPosition": 0
      }],
      "_selection": [{
        "watchSelection": 0
      }],
      "_on": [{
        "watchOn": 0
      }],
      "_hasSettingsMenu": [{
        "watchHasSettingsMenu": 0
      }],
      "_variant": [{
        "watchVariant": 0
      }]
    };
  }
};
KolTableStateful.style = {
  default: defaultStyleCss()
};
export {
  KolTableStateful as kol_table_stateful
};
//# sourceMappingURL=kol-table-stateful.entry-WS4RUHYG.js.map
