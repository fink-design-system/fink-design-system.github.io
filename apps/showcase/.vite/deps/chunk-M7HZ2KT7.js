import {
  Callback
} from "./chunk-E2XMBNEJ.js";
import {
  createLinkItem
} from "./chunk-TGGYHXBL.js";
import {
  createItemPool
} from "./chunk-HRRUQDE3.js";
import {
  SpinFC
} from "./chunk-PNMCSFOB.js";
import {
  resolveTargets
} from "./chunk-FRVQWXY2.js";
import {
  createButtonItem
} from "./chunk-RSHHA2HG.js";
import {
  dialogCallbacksProp,
  widthProp
} from "./chunk-ECNWMIMC.js";
import {
  DialogFC,
  lockScroll,
  unlockScroll
} from "./chunk-N4RN2MQH.js";
import {
  CardFC,
  resolveCardCloseButtonProps
} from "./chunk-LWHH35DI.js";
import {
  LinkFC
} from "./chunk-JLURN3RE.js";
import {
  KolBadgeTag,
  KolInputCheckboxTag,
  KolInputNumberTag
} from "./chunk-6OHARAC5.js";
import {
  AlertFC
} from "./chunk-U3F5DQBF.js";
import {
  levelProp
} from "./chunk-AXVYILGE.js";
import {
  translate
} from "./chunk-ZFTINDKO.js";
import {
  TooltipBehavior
} from "./chunk-IGUFDWYR.js";
import {
  ButtonFC
} from "./chunk-3C6UB25G.js";
import {
  classNameFromVariant,
  variantProp
} from "./chunk-JIRF5MWS.js";
import {
  TooltipFC
} from "./chunk-7Q2QTJQF.js";
import {
  handleCancelOverlay
} from "./chunk-MIXJLZBB.js";
import {
  createCtaRef
} from "./chunk-VFFG6S5V.js";
import {
  createUniqueId,
  nonce
} from "./chunk-FQ2Y4FDM.js";
import {
  renderLabelWithLang
} from "./chunk-AVJUB7OE.js";
import {
  IconFC
} from "./chunk-NQNQ4CHG.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
import {
  KolEvent,
  dispatchDomEvent
} from "./chunk-TR6JQWDR.js";
import {
  labelLangSegmentsProp
} from "./chunk-QVVQWVZC.js";
import {
  BaseWebComponent
} from "./chunk-MS3MLDFB.js";
import {
  BemRootNodeFC,
  createCallbacksPropDefinition,
  createPropDefinition,
  normalizeArray,
  normalizeBoolean,
  resolveFcProps,
  trimLabel,
  variantDialogProp
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  Fragment,
  forceUpdate,
  h
} from "./chunk-VUP4WNL7.js";
import {
  Log,
  parseJson,
  watchValidator
} from "./chunk-37FUF44C.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/base-D7-iAVBu.js
var validateAriaLabelledby = (component, host, value) => {
  const isValid = (value2) => typeof value2 === "string" || typeof value2 === "undefined";
  watchValidator(component, "_ariaLabelledby", isValid, /* @__PURE__ */ new Set(["string"]), value);
  if (!isValid(value)) {
    return [];
  }
  return resolveTargets(host, value);
};
var isFixedColCount = (value) => typeof value === "number" && Number.isInteger(value) && value >= 0;
var fixedColsProp = createPropDefinition("fixedCols", [0, 0], (value) => normalizeArray(value), (value) => value.length === 2 && value.every(isFixedColCount));
var hasSettingsMenuProp = createPropDefinition("hasSettingsMenu", false, normalizeBoolean);
var tableCallbacksProp = createCallbacksPropDefinition();
function normalizeTableRows(value) {
  const rows = typeof value === "string" ? parseJson(value) : value;
  if (Array.isArray(rows)) {
    return rows;
  }
  throw new Error("Invalid table data: expected an array of row objects.");
}
function isTableRows(rows) {
  return rows.every((row) => typeof row === "object" && row !== null);
}
var tableDataProp = createPropDefinition("data", [], normalizeTableRows, isTableRows);
var tableDataFootProp = createPropDefinition("dataFoot", [], normalizeTableRows, isTableRows);
var isHeaderRows = (rows) => Array.isArray(rows) && rows.every((row) => Array.isArray(row));
function normalizeTableHeaders(value) {
  const headers = typeof value === "string" ? parseJson(value) : value;
  if (typeof headers !== "object" || headers === null) {
    throw new Error("Invalid table headers: expected an object.");
  }
  const { horizontal = [], vertical = [] } = headers;
  if (!isHeaderRows(horizontal) || !isHeaderRows(vertical)) {
    throw new Error("Invalid table headers: horizontal and vertical must be arrays of header rows.");
  }
  return { horizontal, vertical };
}
function hasNumericWidths({ horizontal, vertical }) {
  return [...horizontal, ...vertical].every((row) => row.every((cell) => cell.width === void 0 || typeof cell.width === "number"));
}
var tableHeadersProp = createPropDefinition("headers", { horizontal: [], vertical: [] }, normalizeTableHeaders, hasNumericWidths);
var tableLoadingProp = createPropDefinition("loading", false, normalizeBoolean);
function normalizeTableSelection(value) {
  const selection = typeof value === "string" ? parseJson(value) : value;
  if (typeof selection === "object" && selection !== null) {
    return selection;
  }
  throw new Error("Invalid table selection: expected an object.");
}
function isTableSelection(selection) {
  return selection === false || typeof selection.label === "function" && (!selection.selectedKeys || Array.isArray(selection.selectedKeys));
}
var tableSelectionProp = createPropDefinition("selection", false, normalizeTableSelection, isTableSelection);
var tableStatelessPropsConfig = {
  required: [labelLangSegmentsProp, tableDataProp],
  optional: [fixedColsProp, hasSettingsMenuProp, tableCallbacksProp, tableDataFootProp, tableHeadersProp, tableLoadingProp, tableSelectionProp, variantProp]
};
var collectKeyedHeaderCells = (rows) => rows.flatMap((cells) => cells.filter((cell) => typeof cell.key === "string" || typeof cell.render === "function"));
var getPrimaryHeaders = (headers) => {
  const horizontalCells = collectKeyedHeaderCells(headers.horizontal);
  if (horizontalCells.length > 0) {
    return { cells: horizontalCells, horizontal: true };
  }
  const verticalCells = collectKeyedHeaderCells(headers.vertical);
  return { cells: verticalCells, horizontal: verticalCells.length === 0 };
};
var sumSpans = (cells, span) => {
  let count = 0;
  if (Array.isArray(cells)) {
    cells.forEach((cell) => {
      var _a;
      count += (_a = cell[span]) !== null && _a !== void 0 ? _a : 1;
    });
  }
  return count;
};
var getNumberOfCols = (horizontalHeaders, data) => {
  const max = Math.max(0, ...horizontalHeaders.map((row) => sumSpans(row, "colSpan")));
  return max === 0 ? data.length : max;
};
var getNumberOfRows = (verticalHeaders, data, footLength) => {
  const max = Math.max(0, ...verticalHeaders.map((column) => sumSpans(column, "rowSpan")));
  return max === 0 ? data.length : max - footLength;
};
var getVisibleColSpan = (cells) => {
  var _a;
  return (_a = cells === null || cells === void 0 ? void 0 : cells.reduce((acc, cell) => {
    if ("visible" in cell && cell.visible === false) {
      return acc;
    }
    return acc + (cell.colSpan || 1);
  }, 0)) !== null && _a !== void 0 ? _a : 0;
};
var getFixedSide = (fixedCols, stickyColsDisabled, maxCols, index) => {
  if (index === void 0 || stickyColsDisabled) {
    return void 0;
  }
  if (index < fixedCols[0]) {
    return "left";
  }
  if (fixedCols[1] > 0 && index >= maxCols - fixedCols[1]) {
    return "right";
  }
  return void 0;
};
var getFixedOffsets = (primaryCells, maxCols, fixedCols, stickyColsDisabled) => {
  var _a, _b, _c, _d, _e, _f;
  const offsets = [];
  for (let j = 0; j < maxCols; j++) {
    if (getFixedSide(fixedCols, stickyColsDisabled, maxCols, j) === "left") {
      offsets[j] = ((_a = offsets[j - 1]) !== null && _a !== void 0 ? _a : 0) + ((_c = (_b = primaryCells[j - 1]) === null || _b === void 0 ? void 0 : _b.width) !== null && _c !== void 0 ? _c : 0);
    }
  }
  for (let j = maxCols - 1; j >= 0; j--) {
    if (getFixedSide(fixedCols, stickyColsDisabled, maxCols, j) === "right") {
      offsets[j] = ((_d = offsets[j + 1]) !== null && _d !== void 0 ? _d : 0) + ((_f = (_e = primaryCells[j + 1]) === null || _e === void 0 ? void 0 : _e.width) !== null && _f !== void 0 ? _f : 0);
    }
  }
  return offsets;
};
var getOffsetString = (offsets, index, left, hasSelection) => {
  const offset = index === void 0 ? void 0 : offsets[index];
  if (left && hasSelection) {
    return `calc( var(--kol-table-selection-col-width) + ${offset}px)`;
  }
  return `${offset}px`;
};
var getColumnHeaderForType = (headers, primaryHeaders, colIndex, type) => {
  const directionHeaders = primaryHeaders.horizontal ? headers.horizontal : headers.vertical;
  if (directionHeaders.length === 0)
    return void 0;
  const header = primaryHeaders.cells[colIndex];
  if ((header === null || header === void 0 ? void 0 : header.type) === type) {
    return header;
  }
  return void 0;
};
var createDataField = ({ data, dataFoot, headers, isFoot, noEntriesLabel, primaryHeaders }) => {
  const maxCols = getNumberOfCols(headers.horizontal, data);
  const primaryCells = primaryHeaders.cells;
  let maxRows = getNumberOfRows(headers.vertical, data, dataFoot.length);
  let startRow = 0;
  if (isFoot) {
    startRow = maxRows;
    maxRows += dataFoot.length;
  }
  const dataField = [];
  const rowCount = [];
  const rowSpans = [];
  headers.vertical.forEach((_row, index) => {
    rowCount[index] = 0;
    rowSpans[index] = [];
  });
  for (let i = startRow; i < maxRows; i++) {
    const dataRow = [];
    headers.vertical.forEach((headerCells, index) => {
      let rowsTotal = 0;
      rowSpans[index].forEach((value) => rowsTotal += value);
      if (rowsTotal <= i) {
        const rows = headerCells[i - rowsTotal + rowCount[index]];
        if (typeof rows === "object") {
          dataRow.push(Object.assign(Object.assign({}, rows), { headerCell: true, data: {} }));
          let rowSpan = 1;
          if (typeof rows.rowSpan === "number" && rows.rowSpan > 1) {
            rowSpan = rows.rowSpan;
          }
          rowSpans[index].push(rowSpan);
          if (typeof rows.colSpan === "number" && rows.colSpan > 1) {
            for (let k = 1; k < rows.colSpan; k++) {
              rowSpans[index + k].push(rowSpan);
            }
          }
          rowCount[index]++;
        }
      }
    });
    for (let j = 0; j < maxCols; j++) {
      if (primaryHeaders.horizontal) {
        const row = isFoot ? dataFoot[i - startRow] : data[i];
        const header = primaryCells[j];
        if (typeof header === "object" && header !== null && typeof row === "object" && row !== null) {
          dataRow.push(Object.assign(Object.assign({}, header), { colIndex: j, colSpan: void 0, rowSpan: void 0, data: row, label: row[header.key] }));
        }
      } else {
        const header = primaryCells[i];
        if (typeof header === "object" && header !== null && typeof data[j] === "object" && data[j] !== null) {
          dataRow.push(Object.assign(Object.assign({}, header), { colIndex: j, colSpan: void 0, rowSpan: void 0, data: data[j], label: data[j][header.key] }));
        }
      }
    }
    dataField.push(dataRow);
  }
  if (data.length === 0) {
    let colspan = getVisibleColSpan(headers.horizontal[0]);
    let rowspan = 0;
    if (headers.vertical.length > 0) {
      colspan -= headers.vertical.length;
      headers.vertical[0].forEach((row) => {
        rowspan += row.rowSpan || 1;
      });
    }
    const emptyCell = {
      colSpan: colspan,
      label: noEntriesLabel,
      render: void 0,
      rowSpan: Math.max(rowspan, 1)
    };
    if (dataField.length === 0) {
      dataField.push([emptyCell]);
    } else {
      dataField[0].push(emptyCell);
    }
  }
  return dataField;
};
var getTableMinWidth = ({ horizontal, vertical }) => {
  const horizontalWidths = horizontal.flatMap((row) => row.filter((cell) => cell.visible !== false && cell.width !== void 0 && cell.width > 0).map((cell) => cell.width));
  const verticalWidths = vertical.flatMap((column) => column.filter((cell) => cell.width !== void 0 && cell.width > 0).map((cell) => cell.width));
  const allWidths = [...verticalWidths, ...horizontalWidths];
  if (allWidths.length === 0) {
    return "0px";
  }
  if (allWidths.length === 1) {
    return `${allWidths[0]}px`;
  }
  return `calc(${allWidths.map((w) => `${w}px`).join(" + ")})`;
};
var normalizeSelectionKeys = (value) => value === void 0 ? [] : Array.isArray(value) ? value : [value];
var getSelectionKeyPropertyName = (selection) => {
  var _a;
  return (_a = selection ? selection.keyPropertyName : void 0) !== null && _a !== void 0 ? _a : "id";
};
var createSelectionModel = (selection) => {
  const selectedKeys = selection ? normalizeSelectionKeys(selection.selectedKeys) : [];
  return {
    disabledKeys: new Set((selection ? normalizeSelectionKeys(selection.disabledKeys) : []).map(String)),
    keyPropertyName: getSelectionKeyPropertyName(selection),
    selectedKeys,
    selectedKeysSet: new Set(selectedKeys.map(String))
  };
};
var getSelectableRows = (data, model) => data.filter((item) => !model.disabledKeys.has(String(item[model.keyPropertyName])));
var getSelectAllSelection = (data, model, selectAll) => {
  const selection = model.selectedKeys.filter((key) => model.disabledKeys.has(String(key)));
  if (selectAll) {
    selection.push(...getSelectableRows(data, model).map((row) => row === null || row === void 0 ? void 0 : row[model.keyPropertyName]));
  }
  return selection;
};
var tableBem = bem.forBlock("kol-table");
var BEM_CLASS_TABLE__BODY = tableBem("body");
var BEM_CLASS_TABLE__CELL_ACTIONS = tableBem("cell-actions");
var BEM_CLASS_TABLE__CELL_STATES = tableBem("cell-states");
var BEM_CLASS_TABLE__FOOTER = tableBem("footer");
var BEM_CLASS_TABLE__HEAD = tableBem("head");
var BEM_CLASS_TABLE__HEAD_ROW = tableBem("head-row");
var BEM_CLASS_TABLE__SCROLL_CONTAINER = tableBem("scroll-container");
var BEM_CLASS_TABLE__SELECTION_ICON = tableBem("selection-icon");
var BEM_CLASS_TABLE__SELECTION_INPUT_TOOLTIP = tableBem("selection-input-tooltip");
var BEM_CLASS_TABLE__SORT = tableBem("sort");
var BEM_CLASS_TABLE__SORT_BUTTON = tableBem("sort-button");
var BEM_CLASS_TABLE__SORT_ORDER = tableBem("sort-order");
var BEM_CLASS_TABLE__TABLE = tableBem("table");
var BEM_CLASS_TABLE__CAPTION = `${tableBem("focus-element")} ${tableBem("caption")}`;
var TABLE_CAPTION_ID = "caption";
var getFixedSideOf = (context, index) => getFixedSide(context.fixedCols, context.stickyColsDisabled, context.maxCols, index);
var getOffsets = (context, fixed, index) => ({
  left: fixed === "left" ? getOffsetString(context.fixedOffsets, index, true, context.selection !== false) : void 0,
  right: fixed === "right" ? getOffsetString(context.fixedOffsets, index, false, context.selection !== false) : void 0
});
var getRowKey = (context, row, rowIndex) => {
  var _a, _b;
  return (_b = context.primaryHeaders.horizontal && ((_a = row[0]) === null || _a === void 0 ? void 0 : _a.data) ? context.rowKeys.get(row[0].data) : void 0) !== null && _b !== void 0 ? _b : String(rowIndex);
};
var renderSelectionCell = (context, row, rowIndex) => {
  var _a;
  const { handleSelectionChange, selection, selectionModel } = context;
  if (!selection)
    return "";
  const firstCellData = (_a = row[0]) === null || _a === void 0 ? void 0 : _a.data;
  if (!firstCellData)
    return "";
  const keyProperty = firstCellData[selectionModel.keyPropertyName];
  const isMultiple = selection.multiple || selection.multiple === void 0;
  const keyPropertyString = String(keyProperty);
  const selected = selectionModel.selectedKeysSet.has(keyPropertyString);
  const disabled = selectionModel.disabledKeys.has(keyPropertyString);
  const label = selection.label(firstCellData);
  const props = {
    name: "selection",
    checked: selected,
    disabled,
    id: String(keyProperty),
    ["aria-label"]: label
  };
  return h("td", { key: `tbody-${rowIndex}-selection`, class: tableBem("cell", { selection: true }) }, h("div", { class: tableBem("selection", { checked: selected }) }, isMultiple ? h("label", { class: tableBem("selection-label", { disabled }) }, h(IconFC, { class: BEM_CLASS_TABLE__SELECTION_ICON, icons: `kolicon ${selected ? "kolicon-check" : ""}`, label: "" }), h("input", Object.assign({ class: tableBem("selection-input", { checkbox: true }) }, props, { type: "checkbox", onInput: (event) => {
    const updatedSelectedKeys = !selected ? [...selectionModel.selectedKeys, keyProperty] : selectionModel.selectedKeys.filter((key) => String(key) !== keyPropertyString);
    handleSelectionChange(event, updatedSelectedKeys);
  } }))) : h("label", { class: tableBem("selection-label") }, h("input", Object.assign({ class: tableBem("selection-input", { radio: true }) }, props, { type: "radio", onInput: (event) => {
    handleSelectionChange(event, [keyProperty]);
  } }))), h("div", { class: BEM_CLASS_TABLE__SELECTION_INPUT_TOOLTIP }, h(TooltipFC, { label, badgeText: "", id: `${keyProperty}-label`, refFloating: () => {
  } }))));
};
var renderHeadingSelectionCell = (context) => {
  const { data, handleSelectionChange, selection, selectionModel } = context;
  if (!selection) {
    return h("td", { class: tableBem("cell", { header: true }), key: `thead-0` });
  }
  if (selection.multiple === false) {
    return h("th", { scope: "col", key: `thead-0-selection`, class: tableBem("cell", { header: true, selection: true }) }, h("span", { class: "visually-hidden" }, translate("kol-table-selection")));
  }
  const selectedKeyLength = selectionModel.selectedKeys.filter((key) => !selectionModel.disabledKeys.has(String(key))).length;
  const dataLength = getSelectableRows(data, selectionModel).length;
  const isChecked = selectedKeyLength === dataLength;
  const indeterminate = selectedKeyLength !== 0 && !isChecked;
  let label;
  if (selectedKeyLength === 0) {
    label = translate("kol-table-selection-all");
  } else if (isChecked && !indeterminate) {
    label = translate("kol-table-selection-none");
  } else {
    label = translate("kol-table-selection-indeterminate");
  }
  return h("th", { scope: "col", key: `thead-0-selection`, class: tableBem("cell", { header: true, selection: true }) }, h("span", { class: "visually-hidden" }, translate("kol-table-selection")), h("div", { class: tableBem("selection", { checked: isChecked, indeterminate }) }, h("label", { class: tableBem("selection-label") }, h(IconFC, { class: BEM_CLASS_TABLE__SELECTION_ICON, icons: `kolicon ${indeterminate ? "kolicon-minus" : isChecked ? "kolicon-check" : ""}`, label: "" }), h("input", { class: tableBem("selection-input", { checkbox: true }), name: "selection", checked: isChecked && !indeterminate, indeterminate, "aria-label": label, type: "checkbox", onInput: (event) => {
    handleSelectionChange(event, getSelectAllSelection(data, selectionModel, !isChecked));
  } })), h("div", { class: BEM_CLASS_TABLE__SELECTION_INPUT_TOOLTIP }, h(TooltipFC, { label, badgeText: "", refFloating: () => {
  } }))));
};
var renderHeaderTdCell = ({ headers }) => {
  const { horizontal, vertical } = headers;
  if (horizontal.length === 0 || vertical.length === 0) {
    return h(Fragment, null);
  }
  const totalWidth = vertical.reduce((sum, column) => {
    var _a, _b;
    return sum + ((_b = (_a = column === null || column === void 0 ? void 0 : column[0]) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 0);
  }, 0);
  return h("td", { "aria-hidden": "true", colSpan: vertical.length, rowSpan: horizontal.length, style: totalWidth > 0 ? { width: `${totalWidth}px` } : void 0 });
};
var getSortAriaDescription = (order) => {
  const translateSort = translate("kol-sort");
  if (typeof order === "number" && order > 0) {
    return `${translateSort} – ${translate("kol-table-sort-order").replace("{{order}}", `${order}`)}`;
  }
  return translateSort;
};
var renderHeadingCell = (context, cell, rowIndex, colIndex, isVertical) => {
  if (cell.visible === false) {
    return "";
  }
  const sortableSetting = (cell === null || cell === void 0 ? void 0 : cell.sortable) !== false;
  const hasSortDirection = typeof cell.sortDirection === "string";
  const canSort = sortableSetting && hasSortDirection;
  let ariaSort = "none";
  let sortButtonIcon = "kolicon-sort-neutral";
  if (canSort && cell.sortDirection) {
    switch (cell.sortDirection) {
      case "ASC":
        sortButtonIcon = "kolicon-sort-asc";
        ariaSort = "ascending";
        break;
      case "DESC":
        sortButtonIcon = "kolicon-sort-desc";
        ariaSort = "descending";
        break;
      default:
        ariaSort = "none";
    }
  }
  const scope = isVertical ? "row" : typeof cell.colSpan === "number" && cell.colSpan > 1 ? "colgroup" : "col";
  const sortOrder = typeof cell.sortOrder === "number" && cell.sortOrder > 0 ? cell.sortOrder : void 0;
  const width = cell.width !== void 0 ? `${cell.width}px` : void 0;
  const fixed = getFixedSideOf(context, colIndex);
  const { left, right } = getOffsets(context, fixed, colIndex);
  const textAlign = cell.textAlign;
  const sortDirection = canSort ? cell.sortDirection : void 0;
  return h("th", { key: `${rowIndex}-${colIndex}-${cell.label}`, class: tableBem("cell", {
    [ariaSort]: true,
    "align-center": textAlign === "center",
    "align-justify": textAlign === "justify",
    "align-left": textAlign === "left",
    "align-right": textAlign === "right",
    header: true,
    "sticky-left": fixed === "left",
    "sticky-right": fixed === "right"
  }), scope, colSpan: cell.colSpan, rowSpan: cell.rowSpan, style: { width, left, right }, "aria-sort": ariaSort, "data-sort": sortDirection ? `sort-${sortDirection}` : void 0 }, sortDirection ? h("span", { class: BEM_CLASS_TABLE__SORT }, h(ButtonFC, Object.assign({}, context.getButtonFcProps(`sort-${isVertical ? "vertical" : "horizontal"}-${rowIndex}-${colIndex}`, {
    _icons: { right: sortButtonIcon },
    _label: cell.label,
    _ariaDescription: getSortAriaDescription(sortOrder),
    _on: {
      onClick: (event) => {
        context.handleSort(event, {
          key: cell.key,
          currentSortDirection: sortDirection
        });
      }
    }
  }, { class: BEM_CLASS_TABLE__SORT_BUTTON }))), sortOrder && h("span", { "aria-hidden": "true", class: BEM_CLASS_TABLE__SORT_ORDER }, sortOrder)) : cell.label);
};
var renderActionItems = (context, actionColumn, rowData, key) => h("div", { class: BEM_CLASS_TABLE__CELL_ACTIONS }, actionColumn.actions(rowData).map((action, actionIndex) => {
  const actionKey = `action-${key}-${actionIndex}`;
  if (action.type === "button") {
    return h("span", { key: actionKey }, h(ButtonFC, Object.assign({}, context.getButtonFcProps(actionKey, action))));
  } else if (action.type === "link") {
    return h("span", { key: actionKey }, h(LinkFC, Object.assign({}, context.getLinkFcProps(actionKey, action))));
  }
  return null;
}));
var renderStateItems = (stateColumn, rowData, key) => {
  const colKey = stateColumn.key;
  if (!colKey) {
    return "";
  }
  const states = rowData[colKey];
  if (!states) {
    return "";
  }
  return h("div", { class: BEM_CLASS_TABLE__CELL_STATES }, states.map((state, stateIndex) => {
    if (state.type === "badge") {
      return h(KolBadgeTag, Object.assign({ key: `state-${key}-${stateIndex}` }, state));
    }
    return null;
  }));
};
var renderTableCell = (context, cell, rowIndex, colIndex, isVertical) => {
  if (cell.visible === false) {
    return "";
  }
  let key = `${rowIndex}-${colIndex}-${cell.label}`;
  if (cell.data) {
    const dataKey = context.rowKeys.get(cell.data);
    key = dataKey ? `${dataKey}-${context.primaryHeaders.horizontal ? colIndex : rowIndex}` : key;
  }
  if (cell.headerCell) {
    return renderHeadingCell(context, cell, rowIndex, colIndex, isVertical);
  }
  const isNoEntriesHintCell = typeof cell.render !== "function" && cell.label === context.translateNoEntries;
  const actionColumn = getColumnHeaderForType(context.headers, context.primaryHeaders, colIndex, "action");
  const isActionColumn = Boolean(actionColumn && cell.data);
  const stateColumn = getColumnHeaderForType(context.headers, context.primaryHeaders, colIndex, "state");
  const isStateColumn = Boolean(stateColumn && cell.data);
  const fixed = getFixedSideOf(context, colIndex);
  const { left, right } = getOffsets(context, fixed, cell.colIndex);
  const hasCustomRender = typeof cell.render === "function";
  const textAlign = cell.textAlign;
  return h("td", { key: `cell-${key}-${context.settingsChangedCounter}`, class: tableBem("cell", {
    actions: isActionColumn,
    "align-center": textAlign === "center",
    "align-justify": textAlign === "justify",
    "align-left": textAlign === "left",
    "align-right": textAlign === "right",
    body: true,
    states: isStateColumn,
    "sticky-left": fixed === "left",
    "sticky-right": fixed === "right"
  }), "aria-atomic": isNoEntriesHintCell ? "false" : void 0, "aria-live": isNoEntriesHintCell ? "polite" : void 0, "aria-relevant": isNoEntriesHintCell ? "text" : void 0, colSpan: cell.colSpan, rowSpan: cell.rowSpan, style: { textAlign, left, right }, ref: hasCustomRender ? (element) => context.handleRenderCell(cell, element) : void 0 }, isActionColumn && actionColumn && cell.data ? renderActionItems(context, actionColumn, cell.data, key) : isStateColumn && stateColumn && cell.data ? renderStateItems(stateColumn, cell.data, key) : !hasCustomRender ? cell.label : "");
};
var renderTableRow = (context, row, rowIndex, isVertical, isFooter = false) => h("tr", { class: tableBem("row", { body: !isFooter, footer: isFooter }), key: `row-${getRowKey(context, row, rowIndex)}` }, renderSelectionCell(context, row, rowIndex), row.map((cell, colIndex) => renderTableCell(context, cell, rowIndex, colIndex, isVertical)));
var renderSpacer = (context, variant, cellDefs) => {
  const colspan = context.headers.vertical.length + getVisibleColSpan(cellDefs === null || cellDefs === void 0 ? void 0 : cellDefs[0]) + (context.selection ? 1 : 0);
  return h("tr", { "aria-hidden": "true", class: tableBem("spacer", { [variant]: true }) }, h("td", { class: tableBem("spacer-line", { [variant]: true }), colSpan: colspan }));
};
var renderFoot = (context) => {
  const { dataFoot, headers, primaryHeaders, translateNoEntries } = context;
  if (dataFoot.length === 0) {
    return null;
  }
  const rows = createDataField({ data: dataFoot, dataFoot, headers, isFoot: true, noEntriesLabel: translateNoEntries, primaryHeaders });
  const maxCols = getNumberOfCols(headers.horizontal, dataFoot);
  const footContext = Object.assign(Object.assign({}, context), { fixedOffsets: getFixedOffsets(primaryHeaders.cells, maxCols, context.fixedCols, context.stickyColsDisabled), maxCols });
  return h("tfoot", { class: BEM_CLASS_TABLE__FOOTER }, [renderSpacer(context, "foot", rows), rows.map((row, rowIndex) => renderTableRow(footContext, row, rowIndex, true, true))]);
};
var TableStatelessFC = (props) => {
  const resolved = resolveFcProps(tableStatelessPropsConfig, props);
  const { data, dataFoot, externalLabelElements, fixedCols, hasScrollbar, hasSettingsMenu, headers, label, loading, refScrollContainer, refTable, selection, stickyColsDisabled, variant } = resolved;
  const translateNoEntries = translate("kol-no-entries");
  const primaryHeaders = getPrimaryHeaders(headers);
  const maxCols = getNumberOfCols(headers.horizontal, data);
  const context = Object.assign(Object.assign({}, resolved), {
    fixedOffsets: getFixedOffsets(primaryHeaders.cells, maxCols, fixedCols, stickyColsDisabled),
    maxCols,
    primaryHeaders,
    selectionModel: createSelectionModel(selection),
    translateNoEntries
  });
  const dataField = createDataField({ data, dataFoot, headers, isFoot: false, noEntriesLabel: translateNoEntries, primaryHeaders });
  const showInternalCaption = externalLabelElements.length === 0;
  return h(BemRootNodeFC, { block: "kol-table", class: classNameFromVariant(variant, "table") }, hasSettingsMenu && props.renderSettings(headers.horizontal), h("div", { ref: refScrollContainer, class: BEM_CLASS_TABLE__SCROLL_CONTAINER, tabindex: hasScrollbar ? showInternalCaption ? "-1" : "0" : void 0 }, h("table", { ref: refTable, "aria-labelledby": showInternalCaption ? TABLE_CAPTION_ID : void 0, class: BEM_CLASS_TABLE__TABLE, style: { minWidth: getTableMinWidth(headers) } }, showInternalCaption && h("caption", { class: BEM_CLASS_TABLE__CAPTION, id: TABLE_CAPTION_ID, ref: (el) => {
    if (el) {
      if (hasScrollbar) {
        el.tabIndex = 0;
      } else {
        el.removeAttribute("tabindex");
      }
    }
  } }, renderLabelWithLang(label)), h("thead", { class: BEM_CLASS_TABLE__HEAD }, [
    headers.horizontal.map((cols, rowIndex) => h("tr", { class: BEM_CLASS_TABLE__HEAD_ROW, key: `thead-${rowIndex}` }, selection && renderHeadingSelectionCell(context), rowIndex === 0 && renderHeaderTdCell(context), Array.isArray(cols) && cols.map((cell, colIndex) => renderHeadingCell(context, cell, rowIndex, colIndex, false)))),
    renderSpacer(context, "head", headers.horizontal)
  ]), h("tbody", { class: BEM_CLASS_TABLE__BODY }, h("div", { class: tableBem("loader", { shown: loading }) }, h(SpinFC, { label: (loading ? translate("kol-table-data-loading") : translate("kol-table-data-loaded")).replace("{{caption}}", trimLabel(label)), show: loading, variant: "cycle" })), dataField.map((row, rowIndex) => renderTableRow(context, row, rowIndex, true))), renderFoot(context))));
};
var DialogItemFC = ({ dialog, card }, children) => h(DialogFC, Object.assign({}, dialog), card ? h(CardFC, Object.assign({}, card), children) : children);
var createDialogItem = (getFlagHost, requestRender, getEventTarget) => {
  const dialogRef = createCtaRef();
  const cardCloseButtonRef = createCtaRef();
  const cardCloseTooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
  const ariaDescriptionId = nonce();
  const headingId = createUniqueId("dialog-heading");
  const scrollLockOwner = {};
  let cardCloseButtonProps;
  let modal = true;
  let on = {};
  const dispatch = (event) => {
    const target = getEventTarget();
    return target ? dispatchDomEvent(target, event) : true;
  };
  const close = () => {
    var _a, _b;
    (_b = (_a = dialogRef.el) === null || _a === void 0 ? void 0 : _a.close) === null || _b === void 0 ? void 0 : _b.call(_a);
  };
  const handleCancel = (event) => {
    var _a;
    handleCancelOverlay(event);
    if (event.defaultPrevented)
      return;
    (_a = on.onCancel) === null || _a === void 0 ? void 0 : _a.call(on, event);
    if (event.defaultPrevented)
      return;
    if (!dispatch(KolEvent.cancel)) {
      event.preventDefault();
    }
  };
  const handleClose = (event) => {
    var _a;
    if (event.target !== dialogRef.el) {
      return;
    }
    unlockScroll(scrollLockOwner);
    (_a = on.onClose) === null || _a === void 0 ? void 0 : _a.call(on);
    dispatch(KolEvent.close);
  };
  const handleCardClose = () => {
    cardCloseTooltipBehavior.hideTooltip();
    close();
    dispatch(KolEvent.close);
  };
  return {
    getFcProps: (props) => {
      var _a, _b, _c;
      let label = "";
      let level = 0;
      let variant = "blank";
      let width = "100%";
      labelLangSegmentsProp.apply(props.label, (v) => {
        label = v;
      });
      levelProp.apply((_a = props.level) !== null && _a !== void 0 ? _a : 0, (v) => {
        level = v;
      });
      dialogCallbacksProp.apply(props.on, (v) => {
        on = v;
      });
      variantDialogProp.apply((_b = props.variant) !== null && _b !== void 0 ? _b : "blank", (v) => {
        variant = v;
      });
      widthProp.apply((_c = props.width) !== null && _c !== void 0 ? _c : "100%", (v) => {
        width = v;
      });
      const isCard = variant === "card";
      if (isCard && !cardCloseButtonProps) {
        cardCloseButtonProps = resolveCardCloseButtonProps(getFlagHost());
        cardCloseTooltipBehavior.componentWillLoad({
          label: cardCloseButtonProps.label,
          align: cardCloseButtonProps.tooltipAlign
        });
      }
      return {
        dialog: {
          handleCancel,
          handleClose,
          label: trimLabel(label),
          labelledBy: isCard ? headingId : void 0,
          modal,
          refDialog: dialogRef,
          variant,
          width
        },
        card: isCard && cardCloseButtonProps ? {
          ariaDescriptionId,
          closeButtonProps: cardCloseButtonProps,
          handleClose: handleCardClose,
          hasCloser: true,
          headingId,
          label,
          level,
          refCloseButton: cardCloseButtonRef,
          refTooltip: cardCloseTooltipBehavior.setTooltipElementRef
        } : void 0
      };
    },
    show: (nextModal) => {
      var _a, _b;
      const dialog = dialogRef.el;
      if (dialog === null || dialog === void 0 ? void 0 : dialog.open) {
        return;
      }
      if (modal !== nextModal) {
        modal = nextModal;
        requestRender();
      }
      if (nextModal) {
        (_a = dialog === null || dialog === void 0 ? void 0 : dialog.showModal) === null || _a === void 0 ? void 0 : _a.call(dialog);
        if (dialog) {
          lockScroll(scrollLockOwner);
        }
      } else {
        (_b = dialog === null || dialog === void 0 ? void 0 : dialog.show) === null || _b === void 0 ? void 0 : _b.call(dialog);
      }
    },
    close,
    syncListeners: () => {
      if (cardCloseButtonRef.el) {
        cardCloseTooltipBehavior.syncListeners(void 0, cardCloseButtonRef.el, true);
      }
    },
    destroy: () => {
      close();
      unlockScroll(scrollLockOwner);
      cardCloseTooltipBehavior.destroy();
    }
  };
};
var BEM_CLASS_TABLE__SETTINGS = bem.forBlock("kol-table")("settings");
var tableSettingsBem = bem.forBlock("kol-table-settings");
var BEM_CLASS_TABLE_SETTINGS = tableSettingsBem();
var BEM_CLASS_TABLE_SETTINGS__ACTIONS = tableSettingsBem("actions");
var BEM_CLASS_TABLE_SETTINGS__COLUMN = tableSettingsBem("column");
var BEM_CLASS_TABLE_SETTINGS__COLUMN_LABEL = tableSettingsBem("column-label");
var BEM_CLASS_TABLE_SETTINGS__COLUMNS = tableSettingsBem("columns");
var BEM_CLASS_TABLE_SETTINGS__CONTENT = tableSettingsBem("content");
var BEM_CLASS_TABLE_SETTINGS__ERROR_MESSAGE = tableSettingsBem("error-message");
var parseColumnWidth = (width) => {
  return Number.isFinite(width) && width !== void 0 && width > 0 ? width : void 0;
};
var NOOP = () => {
};
var createTableSettings = (getHost, requestTableRender) => {
  const translateTableSettings = translate("kol-table-settings");
  const translateTableSettingsCancel = translate("kol-table-settings-cancel");
  const translateTableSettingsApply = translate("kol-table-settings-apply");
  const translateErrorAllInvisible = translate("kol-table-settings-error-all-invisible");
  let rootElement;
  let ownRenderRequested = false;
  let isOwnRender = false;
  const requestRender = () => {
    ownRenderRequested = true;
    requestTableRender();
  };
  const buttons = createItemPool(() => createButtonItem(getHost), (item) => item.syncListeners(), (item) => item.destroy());
  const dialog = createDialogItem(getHost, requestRender, () => rootElement);
  const alertHeadingId = createUniqueId("alert-heading");
  const alertCloserAriaDescriptionId = nonce();
  let receivedHeaderCells;
  let headerCells = [];
  let editingHeaderCells = [];
  let errorMessage = null;
  const applyHeaderCells = (value) => {
    headerCells = value.map((row) => [...row]);
    editingHeaderCells = value.map((row) => row.map((cell) => Object.assign({}, cell)));
  };
  const getPrimaryRow = () => {
    var _a;
    return (_a = editingHeaderCells[editingHeaderCells.length - 1]) !== null && _a !== void 0 ? _a : [];
  };
  const updatePrimaryRow = (newRow) => {
    editingHeaderCells = editingHeaderCells.map((row, index, arr) => index === arr.length - 1 ? newRow : row);
    requestRender();
  };
  const moveColumn = (columnId, direction) => {
    const row = [...getPrimaryRow()];
    const sourceIndex = row.findIndex((col) => col.key === columnId);
    if (sourceIndex === -1)
      return;
    let targetIndex;
    if (direction === "up") {
      if (sourceIndex === 0)
        return;
      targetIndex = sourceIndex - 1;
    } else {
      if (sourceIndex === row.length - 1)
        return;
      targetIndex = sourceIndex + 1;
    }
    const [source] = row.splice(sourceIndex, 1);
    row.splice(targetIndex, 0, source);
    updatePrimaryRow(row);
  };
  const handleVisibilityChange = (key, visible) => {
    const row = getPrimaryRow().map((col) => col.key === key && col.hidable !== false ? Object.assign(Object.assign({}, col), { visible: Boolean(visible) }) : col);
    updatePrimaryRow(row);
  };
  const handleWidthChange = (key, width) => {
    const parsedWidth = parseColumnWidth(Number(width));
    const row = getPrimaryRow().map((col) => col.key === key && col.resizable !== false ? Object.assign(Object.assign({}, col), { width: parsedWidth }) : col);
    updatePrimaryRow(row);
  };
  const handleCancel = () => {
    editingHeaderCells = headerCells.map((row) => [...row]);
    errorMessage = null;
    requestRender();
    dialog.close();
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const primaryRow = getPrimaryRow();
    const hasVisibleColumn = primaryRow.some((column) => column.visible !== false);
    if (!hasVisibleColumn) {
      errorMessage = translateErrorAllInvisible;
      requestRender();
      return;
    } else if (rootElement) {
      errorMessage = null;
      headerCells = editingHeaderCells.map((row) => row.map((cell) => Object.assign({}, cell)));
      requestRender();
      const sanitizedHeaderCells = editingHeaderCells.map((row) => row.map((column) => {
        const _a = column, { hidable, resizable, sortable, visible, width } = _a, rest = __rest(_a, ["hidable", "resizable", "sortable", "visible", "width"]);
        const cell = Object.assign({}, rest);
        if (visible !== void 0)
          cell.visible = visible;
        if (hidable !== void 0)
          cell.hidable = hidable;
        if (sortable !== void 0)
          cell.sortable = sortable;
        if (resizable !== void 0)
          cell.resizable = resizable;
        if (width !== void 0 && width !== null)
          cell.width = width;
        return cell;
      }));
      dispatchDomEvent(rootElement, KolEvent.changeHeaderCells, sanitizedHeaderCells);
      dialog.close();
    }
  };
  const refRoot = (element) => {
    if (element) {
      rootElement = element;
    }
  };
  const renderColumn = (column, index, columns) => h("div", { key: column.key, class: BEM_CLASS_TABLE_SETTINGS__COLUMN }, h(KolInputCheckboxTag, { _checked: column.visible !== false, _label: column.hidable ? translate("kol-table-settings-column-hidable", { placeholders: { column: column.label } }) : translate("kol-table-settings-column-not-hidable", { placeholders: { column: column.label } }), _value: true, _hideLabel: true, _disabled: column.hidable === false, _on: { onInput: (_, value) => {
    var _a;
    return handleVisibilityChange((_a = column.key) !== null && _a !== void 0 ? _a : "", value);
  } } }), h("span", { class: BEM_CLASS_TABLE_SETTINGS__COLUMN_LABEL }, column.label), h(KolInputNumberTag, { _hideLabel: true, _value: parseColumnWidth(column.width), _label: translate("kol-table-settings-column-width", { placeholders: { column: column.label } }), _min: 1, _disabled: column.resizable === false, _on: { onInput: (_, value) => {
    var _a;
    return handleWidthChange((_a = column.key) !== null && _a !== void 0 ? _a : "", value);
  } } }), h(ButtonFC, Object.assign({}, buttons.get(`move-up-${column.key}`).getFcProps({
    _icons: "kolicon-chevron-up",
    _label: column.sortable === false || index === 0 ? translate("kol-table-settings-not-move", { placeholders: { column: column.label } }) : translate("kol-table-settings-move-up", { placeholders: { column: column.label } }),
    _hideLabel: true,
    _variant: "ghost",
    _on: { onClick: () => {
      var _a;
      return moveColumn((_a = column.key) !== null && _a !== void 0 ? _a : "", "up");
    } },
    _disabled: column.sortable === false || index === 0
  }))), h(ButtonFC, Object.assign({}, buttons.get(`move-down-${column.key}`).getFcProps({
    _icons: "kolicon-chevron-down",
    _label: column.sortable === false || index === columns.length - 1 ? translate("kol-table-settings-not-move", { placeholders: { column: column.label } }) : translate("kol-table-settings-move-down", { placeholders: { column: column.label } }),
    _hideLabel: true,
    _variant: "ghost",
    _on: { onClick: () => {
      var _a;
      return moveColumn((_a = column.key) !== null && _a !== void 0 ? _a : "", "down");
    } },
    _disabled: column.sortable === false || index === columns.length - 1
  }))));
  return {
    beginRender: () => {
      buttons.beginRender();
      isOwnRender = ownRenderRequested;
      ownRenderRequested = false;
    },
    render: (horizontalHeaderCells) => {
      if (!isOwnRender && horizontalHeaderCells !== receivedHeaderCells) {
        receivedHeaderCells = horizontalHeaderCells;
        applyHeaderCells(horizontalHeaderCells);
      }
      const columns = getPrimaryRow();
      return h("div", { class: BEM_CLASS_TABLE__SETTINGS, ref: refRoot }, h("div", { class: BEM_CLASS_TABLE_SETTINGS }, h(ButtonFC, Object.assign({}, buttons.get("toggle").getFcProps({
        _icons: "kolicon-settings",
        _label: translateTableSettings,
        _hideLabel: true,
        _on: { onClick: () => dialog.show(true) }
      })))), h(DialogItemFC, Object.assign({}, dialog.getFcProps({ label: translateTableSettings, variant: "card", width: "fit-content" })), h("div", { class: BEM_CLASS_TABLE_SETTINGS__CONTENT }, errorMessage && h("div", { class: BEM_CLASS_TABLE_SETTINGS__ERROR_MESSAGE }, h(AlertFC, { alert: false, closerAriaDescriptionId: alertCloserAriaDescriptionId, handleCloserClick: NOOP, hasCloser: false, headingId: alertHeadingId, label: errorMessage, level: 0, refCloserButton: NOOP, refCloserTooltip: NOOP, type: "error", variant: "msg" })), h("form", { onSubmit: handleSubmit }, h("div", { class: BEM_CLASS_TABLE_SETTINGS__COLUMNS }, columns.map((column, index) => renderColumn(column, index, columns))), h("div", { class: BEM_CLASS_TABLE_SETTINGS__ACTIONS }, h(ButtonFC, Object.assign({}, buttons.get("cancel").getFcProps({
        _label: translateTableSettingsCancel,
        _variant: "secondary",
        _on: { onClick: () => handleCancel() }
      }))), h(ButtonFC, Object.assign({}, buttons.get("apply").getFcProps({ _label: translateTableSettingsApply, _variant: "primary", _type: "submit" }))))))));
    },
    sync: () => {
      buttons.endRender();
      dialog.syncListeners();
    },
    destroy: () => {
      buttons.destroy();
      dialog.destroy();
    }
  };
};
var RESIZE_DEBOUNCE_DELAY = 150;
var withHeaderCellSettings = (headers) => {
  if (headers.horizontal.length === 0) {
    return headers;
  }
  return Object.assign(Object.assign({}, headers), { horizontal: headers.horizontal.map((row) => row.map((header) => Object.assign(Object.assign({}, header), { visible: typeof header.visible === "boolean" ? header.visible : true, hidable: typeof header.hidable === "boolean" ? header.hidable : true }))) });
};
var createRowKeys = (rows, previous) => new Map(rows.map((row) => {
  var _a;
  return [row, (_a = previous.get(row)) !== null && _a !== void 0 ? _a : nonce()];
}));
var BaseTableStatelessWebComponent = class extends BaseWebComponent {
  constructor() {
    super(...arguments);
    this.hasExternalTableLabelRefs = false;
    this.cellRenderTimeouts = /* @__PURE__ */ new Map();
    this.buttonItems = createItemPool(() => createButtonItem(() => this.host), (item) => item.syncListeners(), (item) => item.destroy());
    this.settings = createTableSettings(() => this.host, () => forceUpdate(this));
    this.linkItems = createItemPool(() => createLinkItem(() => forceUpdate(this)), (item) => item.syncListeners(), (item) => item.destroy());
    this.propsConfig = tableStatelessPropsConfig;
    this.handleResize = () => {
      this.updateScrollbarState();
      clearTimeout(this.resizeDebounceTimeout);
      this.resizeDebounceTimeout = setTimeout(() => {
        this.updateStickyColsDisabled();
      }, RESIZE_DEBOUNCE_DELAY);
    };
    this.handleSelectionChange = (event, payload) => {
      this.emitSelectionChange(event, payload);
    };
    this.handleSort = (event, payload) => {
      this.emitSort(event, payload);
    };
    this.handleRenderCell = (cell, element) => {
      if (!element) {
        return;
      }
      clearTimeout(this.cellRenderTimeouts.get(element));
      this.cellRenderTimeouts.set(element, setTimeout(() => {
        this.cellRenderTimeouts.delete(element);
        if (typeof cell.render === "function") {
          const renderContent = cell.render(element, cell, cell.data, this.getRenderProp("data"));
          if (typeof renderContent === "string") {
            element.textContent = renderContent;
          }
        }
      }));
    };
    this.refScrollContainer = (element) => {
      this.scrollContainerElement = element;
    };
    this.refTable = (element) => {
      this.tableElement = element;
      this.syncTableLabel(this.getState("externalLabelElements"));
    };
    this.getButtonFcProps = (key, props, rootAttributes) => this.buttonItems.get(key).getFcProps(props, rootAttributes);
    this.renderSettings = (horizontalHeaderCells) => this.settings.render(horizontalHeaderCells);
    this.getLinkFcProps = (key, props) => this.linkItems.get(key).getFcProps(props);
  }
  observeScrollContainer() {
    if (this.scrollContainerElement && ResizeObserver) {
      this.resizeObserver = new ResizeObserver(this.handleResize);
      this.resizeObserver.observe(this.scrollContainerElement);
    }
    this.updateStickyColsDisabled();
  }
  teardownTable() {
    var _a;
    (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    clearTimeout(this.resizeDebounceTimeout);
    this.cellRenderTimeouts.forEach((timeout) => clearTimeout(timeout));
    this.cellRenderTimeouts.clear();
    this.buttonItems.destroy();
    this.linkItems.destroy();
    this.settings.destroy();
  }
  syncTableItems() {
    this.buttonItems.endRender();
    this.linkItems.endRender();
    this.settings.sync();
  }
  applyData(value) {
    tableDataProp.apply(value, (rows) => {
      this.setRenderProp("data", rows);
      this.setState("rowKeys", createRowKeys(rows, this.getState("rowKeys")));
    });
  }
  applyDataFoot(value) {
    tableDataFootProp.apply(value, (v) => this.setRenderProp("dataFoot", v));
  }
  applyFixedCols(value) {
    fixedColsProp.apply(value, (v) => this.setRenderProp("fixedCols", v));
    this.updateStickyColsDisabled();
  }
  applyHasSettingsMenu(value) {
    hasSettingsMenuProp.apply(value, (v) => this.setRenderProp("hasSettingsMenu", v));
  }
  applyHeaders(value) {
    tableHeadersProp.apply(value, (headers) => this.setRenderProp("headers", withHeaderCellSettings(headers)));
  }
  applyLabel(value) {
    labelLangSegmentsProp.apply(value, (v) => this.setRenderProp("label", v), this.isRequired("label"));
  }
  applyLoading(value) {
    tableLoadingProp.apply(value, (v) => this.setRenderProp("loading", v));
  }
  applyOn(value) {
    tableCallbacksProp.apply(value, (v) => this.setRenderProp("on", v));
  }
  applySelection(value) {
    tableSelectionProp.apply(value, (v) => this.setRenderProp("selection", v));
    this.updateStickyColsDisabled();
  }
  applyVariant(value) {
    variantProp.apply(value, (v) => this.setRenderProp("variant", v));
  }
  syncTableLabel(elements) {
    if (!this.tableElement)
      return;
    if ("ariaLabelledByElements" in this.tableElement) {
      if (elements === null || elements === void 0 ? void 0 : elements.length) {
        this.tableElement.ariaLabelledByElements = elements;
        this.hasExternalTableLabelRefs = true;
        Log.debug([this.tableElement, elements, this.tableElement.ariaLabelledByElements]);
      } else if (this.hasExternalTableLabelRefs) {
        this.hasExternalTableLabelRefs = false;
        this.tableElement.ariaLabelledByElements = null;
        this.tableElement.setAttribute("aria-labelledby", TABLE_CAPTION_ID);
      }
    }
  }
  moveCheckboxFocus(event) {
    var _a, _b, _c;
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") {
      return;
    }
    const checkboxes = Array.from((_b = (_a = this.scrollContainerElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll(".kol-table__selection-input--checkbox")) !== null && _b !== void 0 ? _b : []);
    const focusedElement = (_c = this.scrollContainerElement) === null || _c === void 0 ? void 0 : _c.querySelector(":focus");
    let index = checkboxes.indexOf(focusedElement);
    if (index > -1) {
      event.preventDefault();
      const offset = event.key === "ArrowDown" ? 1 : checkboxes.length - 1;
      index = (index + offset) % checkboxes.length;
      checkboxes[index].focus();
    }
  }
  applyChangedHeaderCells(event) {
    const updatedHeaders = Object.assign(Object.assign({}, this.getRenderProp("headers")), { horizontal: event.detail });
    this.setRenderProp("headers", updatedHeaders);
    this.setState("settingsChangedCounter", this.getState("settingsChangedCounter") + 1);
    const onChangeHeaderCells = this.getRenderProp("on")[Callback.onChangeHeaderCells];
    if (typeof onChangeHeaderCells === "function") {
      onChangeHeaderCells(event, updatedHeaders);
    }
  }
  updateScrollbarState() {
    if (this.scrollContainerElement) {
      const { clientHeight, clientWidth, scrollHeight, scrollWidth } = this.scrollContainerElement;
      this.setState("hasScrollbar", scrollWidth > clientWidth || scrollHeight > clientHeight && ["auto", "scroll"].includes(getComputedStyle(this.scrollContainerElement).overflowY));
    }
  }
  calculateFixedColsWidth() {
    var _a, _b, _c, _d, _e, _f;
    const [fixedLeft, fixedRight] = this.getRenderProp("fixedCols");
    const headers = this.getRenderProp("headers");
    const primaryCells = getPrimaryHeaders(headers).cells;
    const maxCols = getNumberOfCols(headers.horizontal, this.getRenderProp("data"));
    let totalWidth = 0;
    for (let i = 0; i < fixedLeft && i < primaryCells.length; i++) {
      totalWidth += (_b = (_a = primaryCells[i]) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 0;
    }
    for (let i = maxCols - fixedRight; i < maxCols && i < primaryCells.length; i++) {
      totalWidth += (_d = (_c = primaryCells[i]) === null || _c === void 0 ? void 0 : _c.width) !== null && _d !== void 0 ? _d : 0;
    }
    if (this.getRenderProp("selection")) {
      const selectionCell = (_e = this.scrollContainerElement) === null || _e === void 0 ? void 0 : _e.querySelector(".kol-table__cell--selection");
      totalWidth += (_f = selectionCell === null || selectionCell === void 0 ? void 0 : selectionCell.offsetWidth) !== null && _f !== void 0 ? _f : 0;
    }
    return totalWidth;
  }
  updateStickyColsDisabled() {
    if (!this.scrollContainerElement) {
      this.setState("stickyColsDisabled", false);
      return;
    }
    const fixedColsWidth = this.calculateFixedColsWidth();
    this.setState("stickyColsDisabled", fixedColsWidth > 0 && fixedColsWidth >= this.scrollContainerElement.clientWidth);
  }
  emitSelectionChange(event, payload) {
    const onSelectionChange = this.getRenderProp("on")[Callback.onSelectionChange];
    if (typeof onSelectionChange === "function") {
      onSelectionChange(event, payload);
    }
    if (this.host) {
      dispatchDomEvent(this.host, KolEvent.selectionChange, payload);
    }
  }
  emitSort(event, payload) {
    const onSort = this.getRenderProp("on")[Callback.onSort];
    if (typeof onSort === "function" && payload.key) {
      onSort(event, payload);
    }
    if (this.host) {
      dispatchDomEvent(this.host, KolEvent.sort, payload);
    }
  }
  renderTableStatelessFC() {
    this.buttonItems.beginRender();
    this.linkItems.beginRender();
    this.settings.beginRender();
    return h(TableStatelessFC, { data: this.getRenderProp("data"), dataFoot: this.getRenderProp("dataFoot"), externalLabelElements: this.getState("externalLabelElements"), fixedCols: this.getRenderProp("fixedCols"), getButtonFcProps: this.getButtonFcProps, getLinkFcProps: this.getLinkFcProps, renderSettings: this.renderSettings, handleRenderCell: this.handleRenderCell, handleSelectionChange: this.handleSelectionChange, handleSort: this.handleSort, hasScrollbar: this.getState("hasScrollbar"), hasSettingsMenu: this.getRenderProp("hasSettingsMenu"), headers: this.getRenderProp("headers"), label: this.getRenderProp("label"), loading: this.getRenderProp("loading"), on: this.getRenderProp("on"), refScrollContainer: this.refScrollContainer, refTable: this.refTable, rowKeys: this.getState("rowKeys"), selection: this.getRenderProp("selection"), settingsChangedCounter: this.getState("settingsChangedCounter"), stickyColsDisabled: this.getState("stickyColsDisabled"), variant: this.getRenderProp("variant") });
  }
};

export {
  validateAriaLabelledby,
  tableDataProp,
  tableDataFootProp,
  BaseTableStatelessWebComponent
};
//# sourceMappingURL=chunk-M7HZ2KT7.js.map
