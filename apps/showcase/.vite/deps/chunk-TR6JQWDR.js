// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/events-CRHxtwup.js
var KolEvent;
(function(KolEvent2) {
  KolEvent2["blur"] = "blur";
  KolEvent2["cancel"] = "cancel";
  KolEvent2["change"] = "change";
  KolEvent2["changeHeaderCells"] = "changeheadercells";
  KolEvent2["changePage"] = "changepage";
  KolEvent2["changePageSize"] = "changepagesize";
  KolEvent2["click"] = "click";
  KolEvent2["close"] = "close";
  KolEvent2["create"] = "create";
  KolEvent2["error"] = "error";
  KolEvent2["focus"] = "focus";
  KolEvent2["input"] = "input";
  KolEvent2["keydown"] = "keydown";
  KolEvent2["load"] = "load";
  KolEvent2["mousedown"] = "mousedown";
  KolEvent2["reset"] = "reset";
  KolEvent2["select"] = "select";
  KolEvent2["selectionChange"] = "selectionchange";
  KolEvent2["sort"] = "sort";
  KolEvent2["submit"] = "submit";
  KolEvent2["toggle"] = "toggle";
})(KolEvent || (KolEvent = {}));
var DEFAULT_OPTIONS = {
  bubbles: true,
  cancelable: true,
  composed: true
};
function createKoliBriEvent(event, detail = null) {
  return new CustomEvent(event, Object.assign(Object.assign({}, DEFAULT_OPTIONS), { detail }));
}
function dispatchDomEvent(target, event, detail) {
  return target.dispatchEvent(createKoliBriEvent(event, detail));
}
function createEventWithTarget(event, detail = null, target) {
  const customEvent = createKoliBriEvent(event, detail);
  if (target) {
    Object.defineProperty(customEvent, "target", { value: target });
    Object.defineProperty(customEvent, "currentTarget", { value: target });
  }
  return customEvent;
}

export {
  KolEvent,
  dispatchDomEvent,
  createEventWithTarget
};
//# sourceMappingURL=chunk-TR6JQWDR.js.map
