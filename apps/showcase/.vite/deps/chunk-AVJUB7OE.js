import {
  IconFC
} from "./chunk-NQNQ4CHG.js";
import {
  __rest
} from "./chunk-7UI7W6EF.js";
import {
  BemRootNodeFC,
  baseGetTag,
  clsx,
  isArray,
  isObjectLike
} from "./chunk-KPGE6Z2R.js";
import {
  bem
} from "./chunk-MQNHCCSC.js";
import {
  Fragment,
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/component-Cj3P_f35.js
var stringTag = "[object String]";
function isString(value) {
  return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
}
var showExpertSlot = (label) => label === "";
var buildBadgeTextString = (accessKey, shortKey) => {
  return accessKey || shortKey || "";
};
var NULL_CHARACTERS = new RegExp(String.fromCharCode(0), "g");
var REPLACEMENT_CHARACTER = String.fromCharCode(65533);
var NAMED_ENTITIES = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: String.fromCharCode(160),
  quot: '"'
};
var decodeCodePoint = (code) => Number.isInteger(code) && code >= 32 && code <= 1114111 && !(code >= 55296 && code <= 57343) ? String.fromCodePoint(code) : void 0;
var decodeEntities = (str) => str.replace(/&#(\d+);/g, (reference, code) => {
  var _a;
  return (_a = decodeCodePoint(Number.parseInt(code, 10))) !== null && _a !== void 0 ? _a : reference;
}).replace(/&#x([0-9a-f]+);/gi, (reference, code) => {
  var _a;
  return (_a = decodeCodePoint(Number.parseInt(code, 16))) !== null && _a !== void 0 ? _a : reference;
}).replace(/&([a-z]+);/gi, (reference, name) => {
  var _a;
  return (_a = NAMED_ENTITIES[name.toLowerCase()]) !== null && _a !== void 0 ? _a : reference;
});
var escapeHtml = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
var DELIMITER_NEIGHBOUR = "\\s!-/:-@\\[-^`{-~";
var OPENER_PREFIX = `(^|[${DELIMITER_NEIGHBOUR}])`;
var CLOSER_SUFFIX = `(?=$|[${DELIMITER_NEIGHBOUR}])`;
var CONTENT = "\\S(?:[\\s\\S]*\\S)?";
var HARD_BREAK = /[ \t]{2,}\n/g;
var STRIKETHROUGH = new RegExp(`~~(${CONTENT})~~`, "g");
var ASTERISK_STRONG = new RegExp(`\\*\\*(${CONTENT})\\*\\*`, "g");
var ASTERISK_EM = /\*([^\s*](?:[^*]*[^\s*])?)\*/g;
var TRIPLE_ASTERISK_STRONG_EM = new RegExp(`\\*\\*\\*(${CONTENT})\\*\\*\\*`, "g");
var UNDERSCORE_STRONG = new RegExp(`${OPENER_PREFIX}__(${CONTENT})__${CLOSER_SUFFIX}`, "g");
var UNDERSCORE_EM = new RegExp(`${OPENER_PREFIX}_([^\\s_](?:[^_]*[^\\s_])?)_${CLOSER_SUFFIX}`, "g");
var TRIPLE_UNDERSCORE_STRONG_EM = new RegExp(`${OPENER_PREFIX}___(${CONTENT})___${CLOSER_SUFFIX}`, "g");
var formatInline = (str) => str.replace(HARD_BREAK, "<br>\n").replace(TRIPLE_ASTERISK_STRONG_EM, "<em><strong>$1</strong></em>").replace(TRIPLE_UNDERSCORE_STRONG_EM, "$1<em><strong>$2</strong></em>").replace(STRIKETHROUGH, "<s>$1</s>").replace(ASTERISK_STRONG, "<strong>$1</strong>").replace(UNDERSCORE_STRONG, "$1<strong>$2</strong>").replace(ASTERISK_EM, "<em>$1</em>").replace(UNDERSCORE_EM, "$1<em>$2</em>");
var md = (str) => {
  const escapedMarkers = [];
  return escapeHtml(decodeEntities(str.replace(/\r\n?/g, "\n").replace(NULL_CHARACTERS, REPLACEMENT_CHARACTER))).replace(/\\([\\`*_~[\]()#+\-.!>{}])/g, (_match, marker) => {
    escapedMarkers.push(marker);
    return `<${escapedMarkers.length - 1}>`;
  }).split(/(`[^`]+`)/).map((segment, index) => index % 2 === 0 ? formatInline(segment) : `<code>${segment.slice(1, -1)}</code>`).join("").replace(/<(\d+)>/g, (_match, index) => {
    var _a;
    return (_a = escapedMarkers[Number.parseInt(index, 10)]) !== null && _a !== void 0 ? _a : "";
  });
};
var spanBem = bem.forBlock("kol-span");
function isCustomIcon(icon) {
  return typeof icon === "object" && icon !== null && "icon" in icon;
}
function normalizeIcon(icon) {
  if (icon !== null && icon !== void 0 && isCustomIcon(icon)) {
    return icon;
  }
  if (isString(icon) && icon.length > 0) {
    return { icon };
  }
  return null;
}
function isAllIcons(icons) {
  return typeof icons === "object" && icons !== null && !Array.isArray(icons);
}
function renderUnderlinedBadgeText(label, badgeText) {
  let badgeStr = badgeText;
  let [first, ...rest] = label.split(badgeStr);
  if (rest.length === 0) {
    badgeStr = badgeText.toUpperCase();
    [first, ...rest] = label.split(badgeStr);
  }
  if (rest.length === 0) {
    badgeStr = badgeText.toLowerCase();
    [first, ...rest] = label.split(badgeStr);
  }
  return h(Fragment, null, first, rest.length ? h(Fragment, null, h("u", null, badgeStr), rest.join(badgeStr)) : null);
}
function renderLabelWithLang(label) {
  return Array.isArray(label) ? h("span", null, label.map((labelSegment) => {
    return h("span", { lang: labelSegment.lang }, labelSegment.text);
  })) : h(Fragment, null, label);
}
function renderLabel(label, hideLabel, allowMarkdown, badgeText) {
  if (hideLabel) {
    return null;
  }
  if (Array.isArray(label)) {
    return h("span", { class: spanBem("label") }, label.map((labelSegment) => {
      return h("span", { lang: labelSegment.lang }, labelSegment.text);
    }));
  } else {
    if (allowMarkdown) {
      return h("span", { class: clsx(spanBem("label"), "md"), innerHTML: md(label) });
    }
    if (badgeText) {
      return h("span", { class: spanBem("label") }, renderUnderlinedBadgeText(label, badgeText));
    }
    return h("span", { class: spanBem("label") }, label);
  }
}
var SpanFC = (props, children) => {
  const { allowMarkdown, badgeText, class: classNames, hideLabel = false, icons, label } = props, htmlAttributes = __rest(props, ["allowMarkdown", "badgeText", "class", "hideLabel", "icons", "label"]);
  let top = null;
  let left = null;
  let right = null;
  let bottom = null;
  if (isAllIcons(icons)) {
    top = normalizeIcon(icons.top);
    left = normalizeIcon(icons.left);
    right = normalizeIcon(icons.right);
    bottom = normalizeIcon(icons.bottom);
  } else if (isString(icons) && icons.length > 0) {
    left = { icon: icons };
  }
  const renderIcon = (iconProps, position) => {
    var _a;
    if (!iconProps) {
      return null;
    }
    return h(IconFC, { class: spanBem("icon", { [position]: true }), icons: iconProps.icon, label: (_a = iconProps.label) !== null && _a !== void 0 ? _a : "", style: iconProps.style });
  };
  const hideExpertSlot = !showExpertSlot(label);
  return h(BemRootNodeFC, Object.assign({ component: "span" }, htmlAttributes, { block: "kol-span", modifiers: {
    "has-badge": !!badgeText,
    "hide-label": !!hideLabel
  }, class: classNames }), renderIcon(top, "top"), h("span", { class: spanBem("container") }, renderIcon(left, "left"), hideExpertSlot && renderLabel(label, hideLabel, allowMarkdown, badgeText), h("span", { "aria-hidden": hideExpertSlot ? "true" : void 0, class: spanBem("slot"), hidden: hideExpertSlot }, children), isString(badgeText) && badgeText.length > 0 && h("kbd", { "aria-hidden": "true", class: "badge-text-hint" }, badgeText), renderIcon(right, "right")), renderIcon(bottom, "bottom"));
};

export {
  showExpertSlot,
  buildBadgeTextString,
  renderLabelWithLang,
  SpanFC
};
//# sourceMappingURL=chunk-AVJUB7OE.js.map
