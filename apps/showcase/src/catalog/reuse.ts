/**
 * Nachnutzung von KoliBri je Fink-Komponente: welche kol-* Komponenten sie intern verwendet
 * und welche Lücke sie schließt. Grundsatz: Fink baut nur, was KoliBri nicht anbietet.
 */
export interface ReuseInfo {
	buildsOn: string[];
	/** Was KoliBri nicht bietet und Fink deshalb ergänzt. */
	reason: string;
	/** Art der Komponente. */
	kind: 'Komposition' | 'Muster-Baustein' | 'Layout-Primitive' | 'Doku-Werkzeug';
}

import { t } from '../i18n';

const base: Record<string, ReuseInfo> = {
	'fink-app-shell': { kind: 'Komposition', buildsOn: ['kol-button', 'kol-nav (Slot)'], reason: 'KoliBri hat keinen Anwendungsrahmen mit Kopfzeile, responsivem Navigationspanel und Sprunglink.' },
	'fink-page-header': { kind: 'Komposition', buildsOn: ['kol-heading', 'kol-breadcrumb (Slot)'], reason: 'Seitenkopf-Layout (Titel, Beschreibung, Meta, Aktionen) als wiederkehrende Anordnung.' },
	'fink-stat-card': { kind: 'Komposition', buildsOn: ['kol-icon'], reason: 'Kennzahl mit ausgeschriebenem Trend gibt es in KoliBri nicht.' },
	'fink-status': { kind: 'Muster-Baustein', buildsOn: ['kol-badge'], reason: 'Dünne Hülle um kol-badge: ordnet semantische Töne Farbtokens und Icons zu (Farbe nie allein).' },
	'fink-empty-state': { kind: 'Komposition', buildsOn: ['kol-heading', 'kol-icon'], reason: 'Leerzustand mit Erklärung und Ausweg als festes Muster.' },
	'fink-stepper': { kind: 'Muster-Baustein', buildsOn: ['kol-icon'], reason: 'KoliBri hat keinen Fortschrittsindikator für mehrstufige Abläufe.' },
	'fink-panel': { kind: 'Komposition', buildsOn: ['kol-card'], reason: 'Erweitert kol-card um Beschreibung, Aktionen, Fußzeile und eine randlose Variante.' },
	'fink-stack': { kind: 'Layout-Primitive', buildsOn: [], reason: 'Layout-Primitive (Abstände aus Tokens); KoliBri liefert bewusst keine Layouts.' },
	'fink-grid': { kind: 'Layout-Primitive', buildsOn: [], reason: 'Responsives Auto-Fit-Raster; KoliBri liefert bewusst keine Layouts.' },
	'fink-chip': { kind: 'Muster-Baustein', buildsOn: ['kol-input-checkbox (variant button)', 'kol-badge (smart button)'], reason: 'Bündelt zwei KoliBri-Komponenten zum Filter-/Eingabe-Chip-Muster mit einheitlicher API.' },
	'fink-selection-bar': { kind: 'Komposition', buildsOn: ['kol-button'], reason: 'Aktionsleiste für Mehrfachauswahl mit Live-Region.' },
	'fink-summary-list': { kind: 'Muster-Baustein', buildsOn: ['kol-button-link'], reason: 'Schlüssel-Wert-Liste („Antworten prüfen“) gibt es in KoliBri nicht.' },
	'fink-timeline': { kind: 'Muster-Baustein', buildsOn: ['kol-icon'], reason: 'Chronologischer Verlauf gibt es in KoliBri nicht.' },
	'fink-skeleton': { kind: 'Muster-Baustein', buildsOn: [], reason: 'Lade-Platzhalter; KoliBri hat keinen Ladezustands-Platzhalter (kol-skeleton war nur eine Strukturvorlage und entfällt ab 4.6).' },
	'fink-result': { kind: 'Komposition', buildsOn: ['kol-heading', 'kol-icon'], reason: 'Bestätigungs- und Fehlerseiten mit Vorgangsnummer als Muster.' },
	'fink-footer': { kind: 'Komposition', buildsOn: ['kol-link'], reason: 'Footer-Layout mit Pflichtlinks.' },
	'fink-file-upload': { kind: 'Muster-Baustein', buildsOn: ['kol-input-file', 'kol-button', 'kol-alert', 'kol-icon'], reason: 'Ergänzt kol-input-file um Drop-Zone, Dateiliste und Typ-/Größenprüfung.' },
	'fink-task-list': { kind: 'Muster-Baustein', buildsOn: ['kol-link', 'kol-button-link', 'fink-status → kol-badge'], reason: 'Aufgabenliste mit Fortschritt (GOV.UK) gibt es in KoliBri nicht.' },
	'fink-consent-banner': { kind: 'Komposition', buildsOn: ['kol-heading', 'kol-button', 'kol-details', 'kol-input-checkbox (switch)'], reason: 'Einwilligungs-Ablauf als fertige Komposition.' },
	'fink-feedback': { kind: 'Komposition', buildsOn: ['kol-button', 'kol-textarea', 'kol-icon'], reason: 'Seitenfeedback-Ablauf als fertige Komposition.' },
	'fink-rating': { kind: 'Muster-Baustein', buildsOn: ['kol-icon'], reason: 'Sternebewertung; kol-input-radio bietet keine Sterndarstellung.' },
	'fink-segmented': { kind: 'Muster-Baustein', buildsOn: ['kol-icon'], reason: 'Segmentierte Einfachauswahl; kol-input-radio hat keine Segment-Darstellung.' },
	'fink-bottom-nav': { kind: 'Muster-Baustein', buildsOn: ['kol-icon'], reason: 'Mobile Bottom Navigation gibt es in KoliBri nicht (kol-nav ist vertikal/horizontal ohne Icon-Leiste).' },
	'fink-list': { kind: 'Muster-Baustein', buildsOn: ['kol-icon', 'kol-avatar'], reason: 'KoliBri hat keine Liste mit Icon/Avatar, Zusatzinfo und Auswahlzustand (kol-nav ist reine Navigation).' },
	'fink-menu': { kind: 'Muster-Baustein', buildsOn: ['kol-popover-button', 'kol-icon'], reason: 'kol-popover-button liefert Auslöser und Popover; Fink ergänzt Menüsemantik, Tastaturführung, Gruppen und Checkbox-Einträge.' },
	'fink-tag-input': { kind: 'Muster-Baustein', buildsOn: ['kol-input-text', 'fink-chip → kol-badge'], reason: 'kol-combobox wählt genau einen Wert; Mehrfachauswahl als Tags fehlt.' },
	'fink-avatar-group': { kind: 'Muster-Baustein', buildsOn: ['kol-avatar'], reason: 'kol-avatar zeigt eine Person; Gruppen mit Überlauf „+N“ fehlen.' },
	'fink-divider': { kind: 'Layout-Primitive', buildsOn: [], reason: 'Beschriftete und vertikale Trennlinien; KoliBri liefert bewusst keine Layouts.' },
	'fink-fab': { kind: 'Muster-Baustein', buildsOn: ['kol-button'], reason: 'Schwebende Hauptaktion und Speed Dial gibt es in KoliBri nicht; Fink setzt sie aus kol-button zusammen.' },
	'fink-range-slider': { kind: 'Muster-Baustein', buildsOn: ['kol-input-number'], reason: 'kol-input-range kennt nur einen Wert; Von-bis-Bereiche mit zwei Griffen fehlen.' },
	'fink-calendar': { kind: 'Muster-Baustein', buildsOn: ['kol-button'], reason: 'kol-input-date ist die native Eingabe; eine sichtbare Monatsansicht mit Markierungen fehlt.' },
	'fink-carousel': { kind: 'Muster-Baustein', buildsOn: ['kol-button'], reason: 'Karussell mit Folienwahl, Wischen und pausierbarem Autoplay gibt es in KoliBri nicht.' },
	'fink-kbd': { kind: 'Muster-Baustein', buildsOn: [], reason: 'Darstellung von Tastenkürzeln fehlt in KoliBri.' },
	'fink-back-to-top': { kind: 'Muster-Baustein', buildsOn: ['kol-button'], reason: 'Schaltfläche „Nach oben“ mit Fokusführung fehlt in KoliBri.' },
	'fink-transfer-list': { kind: 'Muster-Baustein', buildsOn: ['kol-button', 'kol-input-text'], reason: 'Zwei verbundene Listen zum Verschieben von Einträgen gibt es in KoliBri nicht.' },
	'fink-otp-input': { kind: 'Muster-Baustein', buildsOn: ['kol-alert'], reason: 'Einmalcode in Einzelfeldern mit Einfügen und Autofill fehlt in KoliBri.' },
	'fink-toc': { kind: 'Muster-Baustein', buildsOn: [], reason: 'Inhaltsverzeichnis mit Scrollspy fehlt; kol-nav ist für Anwendungsnavigation gedacht.' },
	'fink-sparkline': { kind: 'Muster-Baustein', buildsOn: [], reason: 'KoliBri enthält keine Diagramme; die Sparkline ist ein barrierearmer Mini-Verlauf mit Textalternative.' },
	'fink-image-list': { kind: 'Muster-Baustein', buildsOn: ['kol-image', 'kol-dialog', 'kol-button'], reason: 'Galerie mit Raster-Varianten und Lightbox fehlt; Bild und Dialog kommen von KoliBri.' },
	'fink-tour': { kind: 'Komposition', buildsOn: ['kol-button'], reason: 'Geführte Einführung mit Hervorhebung gibt es in KoliBri nicht.' },
	'fink-virtual-list': { kind: 'Muster-Baustein', buildsOn: [], reason: 'Virtualisiertes Rendern sehr langer Listen fehlt in KoliBri.' },
	'fink-bar-chart': { kind: 'Muster-Baustein', buildsOn: [], reason: 'KoliBri enthält keine Diagramme; das Balkendiagramm ist eine gestaltete Datentabelle.' },
	'fink-popconfirm': { kind: 'Muster-Baustein', buildsOn: ['kol-popover-button', 'kol-button', 'kol-icon'], reason: 'Rückfrage am Auslöser als festes Muster; Popover und Schaltflächen kommen von KoliBri.' },
	'fink-infinite-scroll': { kind: 'Muster-Baustein', buildsOn: ['kol-button', 'kol-spin'], reason: 'Nachladen beim Scrollen mit barrierearmer Alternative fehlt in KoliBri.' },
	'fink-splitter': { kind: 'Layout-Primitive', buildsOn: [], reason: 'Größenveränderbare Bereiche fehlen; KoliBri liefert bewusst keine Layouts.' },
	'fink-code-block': { kind: 'Doku-Werkzeug', buildsOn: ['kol-button', 'kol-icon'], reason: 'Syntax-Hervorhebung und Code-Tabs für Dokumentationen.' },
};

export const reuse: Record<string, ReuseInfo> = Object.fromEntries(
	Object.entries(base).map(([tag, info]) => [tag, { ...info, reason: t(info.reason), kind: t(info.kind) as ReuseInfo['kind'] }]),
);
