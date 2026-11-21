import {
  setCurrentLocation
} from "./chunk-L5RCXHD3.js";
import {
  bootstrap,
  isInitialized,
  register
} from "./chunk-AEQ2DHFL.js";
import {
  KolToastContainerTag
} from "./chunk-6OHARAC5.js";
import "./chunk-4KQM2UAA.js";
import {
  isTooltipOpen
} from "./chunk-MIXJLZBB.js";
import {
  KolEvent
} from "./chunk-TR6JQWDR.js";
import {
  BEM
} from "./chunk-MQNHCCSC.js";
import {
  Ee,
  KeyEnum,
  KoliBriDevHelper,
  Log,
  R,
  TagEnum
} from "./chunk-37FUF44C.js";
import "./chunk-WGJZ2PPP.js";

// ../../node_modules/.pnpm/@public-ui+components@4.7.0-rc.0_adopted-style-sheets@1.2.0-rc.3/node_modules/@public-ui/components/dist/esm/index.js
var KoliBri = new Ee("kol", KeyEnum, TagEnum);
var ToasterService = class _ToasterService {
  constructor(document, options) {
    var _a;
    this.document = document;
    this.options = options;
    this.toastContainerElement = this.document.createElement(KolToastContainerTag);
    this.document.body.prepend(this.toastContainerElement);
    if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.defaultVariant) {
      Log.info(`ToasterService: Default variant is deprecated. Use 'card' variant for all toasts instead.`);
    }
  }
  static getInstance(document, options) {
    if (!isInitialized()) {
      throw new Error("Toaster: Call KoliBri bootstrap/register method first.");
    }
    let instance = this.instances.get(document);
    if (!instance) {
      instance = new _ToasterService(document, options);
      this.instances.set(document, instance);
    }
    return instance;
  }
  dispose() {
    const element = this.toastContainerElement;
    if (element) {
      this.toastContainerElement = void 0;
      element.remove();
    } else {
      Log.warn("Toaster service is already disposed.");
    }
  }
  enqueue(toast) {
    if (this.toastContainerElement && typeof this.toastContainerElement.enqueue === "function") {
      return this.toastContainerElement.enqueue(toast);
    }
  }
  closeAll(immediate = false) {
    if (this.toastContainerElement && typeof this.toastContainerElement.closeAll === "function") {
      void this.toastContainerElement.closeAll(immediate);
    }
  }
};
ToasterService.instances = /* @__PURE__ */ new Map();
var Bundesministerium;
(function(Bundesministerium2) {
  Bundesministerium2["Die Bundesregierung"] = "BReg";
  Bundesministerium2["Bundesministerium der Finanzen"] = "BMF";
  Bundesministerium2["Bundesministerium des Innern, für Bau und Heimat"] = "BMI";
  Bundesministerium2["Auswärtiges Amt"] = "AA";
  Bundesministerium2["Bundesministerium für Wirtschaft und Energie"] = "BMWi";
  Bundesministerium2["Bundesministerium der Justiz und für Verbraucherschutz"] = "BMJV";
  Bundesministerium2["Bundesministerium für Arbeit und Soziales"] = "BMAS";
  Bundesministerium2["Bundesministerium der Verteidigung"] = "BMVg";
  Bundesministerium2["Bundesministerium für Ernährung und Landwirtschaft"] = "BMEL";
  Bundesministerium2["Bundesministerium für Familie, Senioren, Frauen und Jugend"] = "BMFSFJ";
  Bundesministerium2["Bundesministerium für Gesundheit"] = "BMG";
  Bundesministerium2["Bundesministerium für Verkehr und digitale Infrastruktur"] = "BMVI";
  Bundesministerium2["Bundesministerium für Umwelt, Naturschutz und nukleare Sicherheit"] = "BMU";
  Bundesministerium2["Bundesministerium für Bildung und Forschung"] = "BMBF";
  Bundesministerium2["Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung"] = "BMZ";
})(Bundesministerium || (Bundesministerium = {}));
var BUNDESMINISTERIEN = Object.getOwnPropertyNames(Bundesministerium);
var Bundesamt;
(function(Bundesamt2) {
  Bundesamt2["Beschaffungsamt des Bundesministeriums des Innern"] = "BeschA";
  Bundesamt2["Bundesamt für Ausrüstung, Informationstechnik und Nutzung der Bundeswehr"] = "BAAINBw";
  Bundesamt2["Bundesamt für äußere Restitutionen"] = "BAR";
  Bundesamt2["Bundesamt für Bauwesen und Raumordnung"] = "BBR";
  Bundesamt2["Bundesamt für Bevölkerungsschutz und Katastrophenhilfe"] = "BBK";
  Bundesamt2["Bundesamt für Familie und zivilgesellschaftliche Aufgaben"] = "BAFzA";
  Bundesamt2["Bundesamt für Güterverkehr"] = "BAG";
  Bundesamt2["Bundesamt für Justiz"] = "BfJ";
  Bundesamt2["Bundesamt für Kartographie und Geodäsie"] = "BKG";
  Bundesamt2["Bundesamt für kerntechnische Entsorgungssicherheit"] = "BASE";
  Bundesamt2["Bundesamt für Migration und Flüchtlinge"] = "BAMF";
  Bundesamt2["Bundesamt für Sicherheit in der Informationstechnik"] = "BSI";
  Bundesamt2["Bundesamt für Verbraucherschutz und Lebensmittelsicherheit"] = "BVL";
  Bundesamt2["Bundesamt für Verfassungsschutz"] = "BfV";
  Bundesamt2["Bundesamt für Wirtschaft und Ausfuhrkontrolle"] = "BAFA";
  Bundesamt2["Bundesamt für zentrale Dienste und offene Vermögensfragen"] = "BADV";
  Bundesamt2["Bundesanstalt für Verwaltungsdienstleistungen"] = "BAV";
  Bundesamt2["Bundesarchiv"] = "BArch";
  Bundesamt2["Bundesaufsichtsamt für Flugsicherung"] = "BAF";
  Bundesamt2["Bundesausgleichsamt"] = "BAA";
  Bundesamt2["Bundeskartellamt"] = "BKartA";
  Bundesamt2["Bundeskriminalamt"] = "BKA";
  Bundesamt2["Bundesnachrichtendienst"] = "BND";
  Bundesamt2["Bundesnetzagentur für Elektrizität, Gas, Telekommunikation, Post und Eisenbahnen"] = "BNetzA";
  Bundesamt2["Bundespolizeipräsidium"] = "BPOLP";
  Bundesamt2["Bundesprüfstelle für jugendgefährdende Medien"] = "BPjM";
  Bundesamt2["Bundessortenamt"] = "BSA";
  Bundesamt2["Bundessprachenamt"] = "BSprA";
  Bundesamt2["Bundesamt für Soziale Sicherung"] = "BAS";
  Bundesamt2["Bundesverwaltungsamt"] = "BVA";
  Bundesamt2["Bundeszentralamt für Steuern"] = "BZSt";
  Bundesamt2["Deutsches Patent- und Markenamt"] = "DPMA";
  Bundesamt2["Eisenbahn-Bundesamt"] = "EBA";
  Bundesamt2["Generalzolldirektion"] = "GZD";
  Bundesamt2["Militärischer Abschirmdienst"] = "MAD";
  Bundesamt2["Zentrale Stelle für Informationstechnik im Sicherheitsbereich"] = "ZITiS";
})(Bundesamt || (Bundesamt = {}));
var BUNDESAEMTER = Object.getOwnPropertyNames(Bundesamt);
var Bundesanstalt;
(function(Bundesanstalt2) {
  Bundesanstalt2["Informationstechnikzentrum Bund"] = "ITZBund";
  Bundesanstalt2["Bundesanstalt für den Digitalfunk der Behörden und Organisationen mit Sicherheitsaufgaben"] = "BDBOS";
  Bundesanstalt2["Bundesanstalt für Landwirtschaft und Ernährung"] = "BLE";
  Bundesanstalt2["Bundesanstalt Technisches Hilfswerk"] = "THW";
  Bundesanstalt2["Bundesinstitut für Arzneimittel und Medizinprodukte"] = "BfArM";
  Bundesanstalt2["Bundesinstitut für Bevölkerungsforschung"] = "BiB";
  Bundesanstalt2["Bundesinstitut für Sportwissenschaft"] = "BISp";
})(Bundesanstalt || (Bundesanstalt = {}));
var BUNDESANSTALTEN = Object.getOwnPropertyNames(Bundesanstalt);
var BUND_LOGO_TEXT_MAP = /* @__PURE__ */ new Map();
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Die Bundesregierung"], ["Die", "Bundesregierung"]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium der Finanzen"], ["Bundesministerium", "der Finanzen"]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium des Innern, für Bau und Heimat"], ["Bundesministerium", "des Inneren, für Bau", "und Heimat"]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Auswärtiges Amt"], ["Auswärtiges Amt"]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium für Wirtschaft und Energie"], ["Bundesministerium", "für Wirtschaft", "und Energie"]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium der Justiz und für Verbraucherschutz"], [
  "Bundesministerium",
  "der Justiz und",
  "für Verbraucherschutz"
]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium für Arbeit und Soziales"], ["Bundesministerium", "für Arbeit und Soziales"]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium der Verteidigung"], ["Bundesministerium", "der Verteidigung"]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium für Bildung und Forschung"], ["Bundesministerium", "für Bildung", "und Forschung"]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium für Ernährung und Landwirtschaft"], ["Bundesministerium", "für Ernährung", "und Landwirtschaft"]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium für Familie, Senioren, Frauen und Jugend"], [
  "Bundesministerium",
  "für Familie, Senioren, Frauen",
  "und Jugend"
]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium für Gesundheit"], ["Bundesministerium", "für Gesundheit"]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium für Umwelt, Naturschutz und nukleare Sicherheit"], [
  "Bundesministerium",
  "für Umwelt, Naturschutz",
  "und nukleare Sicherheit"
]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium für Verkehr und digitale Infrastruktur"], [
  "Bundesministerium",
  "für Verkehr und",
  "digitale Infrastruktur"
]);
BUND_LOGO_TEXT_MAP.set(Bundesministerium["Bundesministerium für wirtschaftliche Zusammenarbeit und Entwicklung"], [
  "Bundesministerium",
  "für wirtschaftliche Zusammenarbeit",
  "und Entwicklung"
]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Beschaffungsamt des Bundesministeriums des Innern"], ["Beschaffungsamt", "des Bundesministeriums", "des Innern"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Ausrüstung, Informationstechnik und Nutzung der Bundeswehr"], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für äußere Restitutionen"], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Bauwesen und Raumordnung"], []);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Bevölkerungsschutz und Katastrophenhilfe"], ["Bundesamt", "für Bevölkerungsschutz", "und Katastrophenhilfe"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Familie und zivilgesellschaftliche Aufgaben"], [
  "Bundesamt",
  "für Familie und",
  "zivilgesellschaftliche Aufgaben"
]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Güterverkehr"], ["Bundesamt", "für Güterverkehr"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Justiz"], ["Bundesamt für", "Justiz"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Kartographie und Geodäsie"], ["Bundesamt für", "Kartographie und Geodäsie"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für kerntechnische Entsorgungssicherheit"], ["Bundesamt für", "kerntechnische", "Entsorgungssicherheit"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Migration und Flüchtlinge"], ["Bundesamt", "für Migration", "und Flüchtlinge"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Sicherheit in der Informationstechnik"], ["Bundesamt", "für Sicherheit in der", "Informationstechnik"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Verbraucherschutz und Lebensmittelsicherheit"], [
  "Bundesamt für",
  "Verbraucherschutz und",
  "Lebensmittelsicherheit"
]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Verfassungsschutz"], ["Bundesamt für", "Verfassungsschutz"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Wirtschaft und Ausfuhrkontrolle"], ["Bundesamt", "für Wirtschaft", "Ausfuhrkontrolle"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für zentrale Dienste und offene Vermögensfragen"], [
  "Bundesamt",
  "für zentrale Dienste und",
  "offene Vermögensfragen"
]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesanstalt für Verwaltungsdienstleistungen"], ["Bundesanstalt", "für Verwaltungsdienstleistungen"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesarchiv"], ["Das", "Bundesarchiv"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesaufsichtsamt für Flugsicherung"], ["Bundesaufsichtsamt", "für Flugsicherung"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesausgleichsamt"], ["Bundesausgleichsamt"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundeskartellamt"], ["Bundeskartellamt"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundeskriminalamt"], ["Bundeskriminalamt"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesnachrichtendienst"], ["Bundesnachrichtendienst"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesnetzagentur für Elektrizität, Gas, Telekommunikation, Post und Eisenbahnen"], ["Bundesnetzagentur"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundespolizeipräsidium"], ["Bundespolizeipräsidium"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesprüfstelle für jugendgefährdende Medien"], ["Bundesprüfstelle", "für jugendgefährdende", "Medien"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundessortenamt"], ["Bundessortenamt"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundessprachenamt"], ["Bundessprachenamt"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesamt für Soziale Sicherung"], ["Bundesamt", "für Soziale Sicherung"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundesverwaltungsamt"], ["Bundesverwaltungsamt"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Bundeszentralamt für Steuern"], ["Bundeszentralamt", "für Steuern"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Deutsches Patent- und Markenamt"], ["Deutsches", "Patent- und Markenamt"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Eisenbahn-Bundesamt"], ["Eisenbahn-Bundesamt"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Generalzolldirektion"], ["Generalzolldirektion"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Militärischer Abschirmdienst"], ["Bundesamt für den", "Militärischen Abschirmdienst"]);
BUND_LOGO_TEXT_MAP.set(Bundesamt["Zentrale Stelle für Informationstechnik im Sicherheitsbereich"], [
  "Zentrale Stelle",
  "für Informationstechnik",
  "im Sicherheitsbereich"
]);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt["Informationstechnikzentrum Bund"], ["Informations", "Technik", "Zentrum Bund"]);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt["Bundesanstalt für den Digitalfunk der Behörden und Organisationen mit Sicherheitsaufgaben"], [
  "Bundesanstalt",
  "für den Digitalfunk der Behörden und",
  "Organisationen mit Sicherheitsaufgaben"
]);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt["Bundesanstalt für Landwirtschaft und Ernährung"], ["Bundesanstalt für", "Landwirtschaft und Ernährung"]);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt["Bundesanstalt Technisches Hilfswerk"], ["Bundesanstalt", "Technisches Hilfswerk"]);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt["Bundesinstitut für Arzneimittel und Medizinprodukte"], ["Bundesinstitut", "für Arzneimittel", "und Medizinprodukte"]);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt["Bundesinstitut für Bevölkerungsforschung"], ["Bundesinstitut", "für Bevölkerungsforschung"]);
BUND_LOGO_TEXT_MAP.set(Bundesanstalt["Bundesinstitut für Sportwissenschaft"], ["Bundesinstitut", "für Sportwissenschaft"]);
export {
  BEM,
  BUNDESAEMTER,
  BUNDESANSTALTEN,
  BUNDESMINISTERIEN,
  BUND_LOGO_TEXT_MAP,
  Bundesamt,
  Bundesanstalt,
  Bundesministerium,
  KolEvent,
  KoliBri,
  KoliBriDevHelper,
  ToasterService,
  bootstrap,
  R as getDefaultThemeName,
  isInitialized,
  isTooltipOpen,
  register,
  setCurrentLocation
};
//# sourceMappingURL=@public-ui_components.js.map
