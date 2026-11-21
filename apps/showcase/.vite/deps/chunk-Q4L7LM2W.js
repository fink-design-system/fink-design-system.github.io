import {
  __rest
} from "./chunk-7UI7W6EF.js";
import {
  clsx
} from "./chunk-KPGE6Z2R.js";
import {
  h
} from "./chunk-VUP4WNL7.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/Heading-DDS-lyOB.js
var MIN_HEADING_LEVEL = 1;
var MAX_HEADING_LEVEL = 6;
function isValidHeadingLevel(level) {
  return level >= MIN_HEADING_LEVEL && level <= MAX_HEADING_LEVEL;
}
function getHeadlineTag(level) {
  return isValidHeadingLevel(level) ? `h${level}` : "strong";
}
var KolHeadlineFc = (_a, children) => {
  var { class: classNames, level = MIN_HEADING_LEVEL } = _a, other = __rest(_a, ["class", "level"]);
  const HeadlineTag = getHeadlineTag(level);
  return h(HeadlineTag, Object.assign({ class: clsx("kol-headline", `kol-headline--${HeadlineTag}`, classNames) }, other), children);
};
var KolSecondaryHeadlineFc = (_a, children) => {
  var { class: classNames } = _a, other = __rest(_a, ["class"]);
  return h("p", Object.assign({ class: clsx("kol-headline kol-headline--group kol-headline--secondary", classNames) }, other), children);
};
var KolHeadingFc = (_a, children) => {
  var { secondaryHeadline, level = MIN_HEADING_LEVEL, class: classNames, HeadingGroupProps = {}, SecondaryHeadlineProps = {} } = _a, other = __rest(_a, ["secondaryHeadline", "level", "class", "HeadingGroupProps", "SecondaryHeadlineProps"]);
  const headlineProps = Object.assign({ level }, other);
  if (!secondaryHeadline) {
    return h(KolHeadlineFc, Object.assign({ class: clsx(classNames, "kol-headline--single") }, headlineProps), children);
  }
  const { class: groupClassNames } = HeadingGroupProps, groupOthers = __rest(HeadingGroupProps, ["class"]);
  const headlineGroupProps = Object.assign({ class: clsx("kol-heading-group", groupClassNames) }, groupOthers);
  return h("hgroup", Object.assign({}, headlineGroupProps), h(KolHeadlineFc, Object.assign({ class: clsx(classNames, "kol-headline--group", "kol-headline--primary") }, headlineProps), children), h(KolSecondaryHeadlineFc, Object.assign({}, SecondaryHeadlineProps), secondaryHeadline));
};

export {
  getHeadlineTag,
  KolHeadingFc
};
//# sourceMappingURL=chunk-Q4L7LM2W.js.map
