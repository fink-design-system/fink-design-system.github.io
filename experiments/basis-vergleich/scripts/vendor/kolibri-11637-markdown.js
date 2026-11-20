/**
 * Markdown-Renderer aus public-ui/kolibri#11637 (Merge-Commit 9f9369a2), packages/components/src/utils/markdown.ts.
 * Nur Typen entfernt (esbuild), sonst unverändert. KoliBri steht unter EUPL-1.2.
 * Ersetzt markdown-it ab dem nächsten KoliBri-Release nach 4.6.0. Genutzt von scripts/kolibri-next-markdown.mjs.
 */
const NULL_CHARACTERS = new RegExp(String.fromCharCode(0), "g");
const REPLACEMENT_CHARACTER = String.fromCharCode(65533);
const NAMED_ENTITIES = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: String.fromCharCode(160),
  quot: '"'
};
const decodeCodePoint = (code) => Number.isInteger(code) && code >= 32 && code <= 1114111 && !(code >= 55296 && code <= 57343) ? String.fromCodePoint(code) : void 0;
const decodeEntities = (str) => str.replace(/&#(\d+);/g, (reference, code) => decodeCodePoint(Number.parseInt(code, 10)) ?? reference).replace(/&#x([0-9a-f]+);/gi, (reference, code) => decodeCodePoint(Number.parseInt(code, 16)) ?? reference).replace(/&([a-z]+);/gi, (reference, name) => NAMED_ENTITIES[name.toLowerCase()] ?? reference);
const escapeHtml = (str) => str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const DELIMITER_NEIGHBOUR = "\\s!-/:-@\\[-^`{-~";
const OPENER_PREFIX = `(^|[${DELIMITER_NEIGHBOUR}])`;
const CLOSER_SUFFIX = `(?=$|[${DELIMITER_NEIGHBOUR}])`;
const CONTENT = "\\S(?:[\\s\\S]*\\S)?";
const HARD_BREAK = /[ \t]{2,}\n/g;
const STRIKETHROUGH = new RegExp(`~~(${CONTENT})~~`, "g");
const ASTERISK_STRONG = new RegExp(`\\*\\*(${CONTENT})\\*\\*`, "g");
const ASTERISK_EM = /\*([^\s*](?:[^*]*[^\s*])?)\*/g;
const TRIPLE_ASTERISK_STRONG_EM = new RegExp(`\\*\\*\\*(${CONTENT})\\*\\*\\*`, "g");
const UNDERSCORE_STRONG = new RegExp(`${OPENER_PREFIX}__(${CONTENT})__${CLOSER_SUFFIX}`, "g");
const UNDERSCORE_EM = new RegExp(`${OPENER_PREFIX}_([^\\s_](?:[^_]*[^\\s_])?)_${CLOSER_SUFFIX}`, "g");
const TRIPLE_UNDERSCORE_STRONG_EM = new RegExp(`${OPENER_PREFIX}___(${CONTENT})___${CLOSER_SUFFIX}`, "g");
const formatInline = (str) => str.replace(HARD_BREAK, "<br>\n").replace(TRIPLE_ASTERISK_STRONG_EM, "<em><strong>$1</strong></em>").replace(TRIPLE_UNDERSCORE_STRONG_EM, "$1<em><strong>$2</strong></em>").replace(STRIKETHROUGH, "<s>$1</s>").replace(ASTERISK_STRONG, "<strong>$1</strong>").replace(UNDERSCORE_STRONG, "$1<strong>$2</strong>").replace(ASTERISK_EM, "<em>$1</em>").replace(UNDERSCORE_EM, "$1<em>$2</em>");
const md = (str) => {
  const escapedMarkers = [];
  return escapeHtml(decodeEntities(str.replace(/\r\n?/g, "\n").replace(NULL_CHARACTERS, REPLACEMENT_CHARACTER))).replace(/\\([\\`*_~[\]()#+\-.!>{}])/g, (_match, marker) => {
    escapedMarkers.push(marker);
    return `<${escapedMarkers.length - 1}>`;
  }).split(/(`[^`]+`)/).map((segment, index) => index % 2 === 0 ? formatInline(segment) : `<code>${segment.slice(1, -1)}</code>`).join("").replace(/<(\d+)>/g, (_match, index) => escapedMarkers[Number.parseInt(index, 10)] ?? "");
};
export {
  md
};
