/**
 * Nachnutzung von KoliBri je Fink-Komponente: welche KoliBri-Komponenten (fink-*) sie intern verwendet
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
	'fink-app-shell': {
		kind: 'Komposition',
		buildsOn: ['fink-button', 'fink-nav (Slot)'],
		reason: 'KoliBri hat keinen Anwendungsrahmen mit Kopfzeile, responsivem Navigationspanel und Sprunglink.',
	},
	'fink-page-header': {
		kind: 'Komposition',
		buildsOn: ['fink-heading', 'fink-breadcrumb (Slot)'],
		reason: 'Seitenkopf-Layout (Titel, Beschreibung, Meta, Aktionen) als wiederkehrende Anordnung.',
	},
	'fink-stat-card': { kind: 'Komposition', buildsOn: ['fink-icon'], reason: 'Kennzahl mit ausgeschriebenem Trend gibt es in KoliBri nicht.' },
	'fink-status': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-badge'],
		reason: 'Dünne Hülle um fink-badge: ordnet semantische Töne Farbtokens und Icons zu (Farbe nie allein).',
	},
	'fink-empty-state': { kind: 'Komposition', buildsOn: ['fink-heading', 'fink-icon'], reason: 'Leerzustand mit Erklärung und Ausweg als festes Muster.' },
	'fink-stepper': { kind: 'Muster-Baustein', buildsOn: ['fink-icon'], reason: 'KoliBri hat keinen Fortschrittsindikator für mehrstufige Abläufe.' },
	'fink-panel': { kind: 'Komposition', buildsOn: ['fink-card'], reason: 'Erweitert fink-card um Beschreibung, Aktionen, Fußzeile und eine randlose Variante.' },
	'fink-stack': { kind: 'Layout-Primitive', buildsOn: [], reason: 'Layout-Primitive (Abstände aus Tokens); KoliBri liefert bewusst keine Layouts.' },
	'fink-grid': { kind: 'Layout-Primitive', buildsOn: [], reason: 'Responsives Auto-Fit-Raster; KoliBri liefert bewusst keine Layouts.' },
	'fink-chip': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-input-checkbox (variant button)', 'fink-badge (smart button)'],
		reason: 'Bündelt zwei KoliBri-Komponenten zum Filter-/Eingabe-Chip-Muster mit einheitlicher API.',
	},
	'fink-selection-bar': { kind: 'Komposition', buildsOn: ['fink-button'], reason: 'Aktionsleiste für Mehrfachauswahl mit Live-Region.' },
	'fink-summary-list': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-button-link'],
		reason: 'Schlüssel-Wert-Liste („Antworten prüfen“) gibt es in KoliBri nicht.',
	},
	'fink-timeline': { kind: 'Muster-Baustein', buildsOn: ['fink-icon'], reason: 'Chronologischer Verlauf gibt es in KoliBri nicht.' },
	'fink-skeleton': {
		kind: 'Muster-Baustein',
		buildsOn: [],
		reason: 'Lade-Platzhalter; KoliBri hat keinen Ladezustands-Platzhalter (kol-skeleton war nur eine Strukturvorlage und entfällt ab 4.6).',
	},
	'fink-result': { kind: 'Komposition', buildsOn: ['fink-heading', 'fink-icon'], reason: 'Bestätigungs- und Fehlerseiten mit Vorgangsnummer als Muster.' },
	'fink-footer': { kind: 'Komposition', buildsOn: ['fink-link'], reason: 'Footer-Layout mit Pflichtlinks.' },
	'fink-file-upload': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-input-file', 'fink-button', 'fink-alert', 'fink-icon'],
		reason: 'Ergänzt fink-input-file um Drop-Zone, Dateiliste und Typ-/Größenprüfung.',
	},
	'fink-task-list': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-link', 'fink-button-link', 'fink-status → fink-badge'],
		reason: 'Aufgabenliste mit Fortschritt (GOV.UK) gibt es in KoliBri nicht.',
	},
	'fink-consent-banner': {
		kind: 'Komposition',
		buildsOn: ['fink-heading', 'fink-button', 'fink-details', 'fink-input-checkbox (switch)'],
		reason: 'Einwilligungs-Ablauf als fertige Komposition.',
	},
	'fink-feedback': { kind: 'Komposition', buildsOn: ['fink-button', 'fink-textarea', 'fink-icon'], reason: 'Seitenfeedback-Ablauf als fertige Komposition.' },
	'fink-rating': { kind: 'Muster-Baustein', buildsOn: ['fink-icon'], reason: 'Sternebewertung; fink-input-radio bietet keine Sterndarstellung.' },
	'fink-segmented': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-icon'],
		reason: 'Segmentierte Einfachauswahl; fink-input-radio hat keine Segment-Darstellung.',
	},
	'fink-bottom-nav': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-icon'],
		reason: 'Mobile Bottom Navigation gibt es in KoliBri nicht (fink-nav ist vertikal/horizontal ohne Icon-Leiste).',
	},
	'fink-list': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-icon', 'fink-avatar'],
		reason: 'KoliBri hat keine Liste mit Icon/Avatar, Zusatzinfo und Auswahlzustand (fink-nav ist reine Navigation).',
	},
	'fink-menu': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-popover-button', 'fink-icon'],
		reason: 'fink-popover-button liefert Auslöser und Popover; Fink ergänzt Menüsemantik, Tastaturführung, Gruppen und Checkbox-Einträge.',
	},
	'fink-tag-input': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-input-text', 'fink-chip → fink-badge'],
		reason: 'fink-combobox wählt genau einen Wert; Mehrfachauswahl als Tags fehlt.',
	},
	'fink-avatar-group': { kind: 'Muster-Baustein', buildsOn: ['fink-avatar'], reason: 'fink-avatar zeigt eine Person; Gruppen mit Überlauf „+N“ fehlen.' },
	'fink-divider': { kind: 'Layout-Primitive', buildsOn: [], reason: 'Beschriftete und vertikale Trennlinien; KoliBri liefert bewusst keine Layouts.' },
	'fink-fab': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-button'],
		reason: 'Schwebende Hauptaktion und Speed Dial gibt es in KoliBri nicht; Fink setzt sie aus fink-button zusammen.',
	},
	'fink-range-slider': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-input-number'],
		reason: 'fink-input-range kennt nur einen Wert; Von-bis-Bereiche mit zwei Griffen fehlen.',
	},
	'fink-calendar': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-button'],
		reason: 'fink-input-date ist die native Eingabe; eine sichtbare Monatsansicht mit Markierungen fehlt.',
	},
	'fink-carousel': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-button'],
		reason: 'Karussell mit Folienwahl, Wischen und pausierbarem Autoplay gibt es in KoliBri nicht.',
	},
	'fink-kbd': { kind: 'Muster-Baustein', buildsOn: [], reason: 'Darstellung von Tastenkürzeln fehlt in KoliBri.' },
	'fink-back-to-top': { kind: 'Muster-Baustein', buildsOn: ['fink-button'], reason: 'Schaltfläche „Nach oben“ mit Fokusführung fehlt in KoliBri.' },
	'fink-transfer-list': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-button', 'fink-input-text'],
		reason: 'Zwei verbundene Listen zum Verschieben von Einträgen gibt es in KoliBri nicht.',
	},
	'fink-otp-input': { kind: 'Muster-Baustein', buildsOn: ['fink-alert'], reason: 'Einmalcode in Einzelfeldern mit Einfügen und Autofill fehlt in KoliBri.' },
	'fink-toc': { kind: 'Muster-Baustein', buildsOn: [], reason: 'Inhaltsverzeichnis mit Scrollspy fehlt; fink-nav ist für Anwendungsnavigation gedacht.' },
	'fink-sparkline': {
		kind: 'Muster-Baustein',
		buildsOn: [],
		reason: 'KoliBri enthält keine Diagramme; die Sparkline ist ein barrierearmer Mini-Verlauf mit Textalternative.',
	},
	'fink-image-list': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-image', 'fink-dialog', 'fink-button'],
		reason: 'Galerie mit Raster-Varianten und Lightbox fehlt; Bild und Dialog kommen von KoliBri.',
	},
	'fink-tour': { kind: 'Komposition', buildsOn: ['fink-button'], reason: 'Geführte Einführung mit Hervorhebung gibt es in KoliBri nicht.' },
	'fink-virtual-list': { kind: 'Muster-Baustein', buildsOn: [], reason: 'Virtualisiertes Rendern sehr langer Listen fehlt in KoliBri.' },
	'fink-bar-chart': { kind: 'Muster-Baustein', buildsOn: [], reason: 'KoliBri enthält keine Diagramme; das Balkendiagramm ist eine gestaltete Datentabelle.' },
	'fink-popconfirm': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-popover-button', 'fink-button', 'fink-icon'],
		reason: 'Rückfrage am Auslöser als festes Muster; Popover und Schaltflächen kommen von KoliBri.',
	},
	'fink-infinite-scroll': {
		kind: 'Muster-Baustein',
		buildsOn: ['fink-button', 'fink-spin'],
		reason: 'Nachladen beim Scrollen mit barrierearmer Alternative fehlt in KoliBri.',
	},
	'fink-splitter': { kind: 'Layout-Primitive', buildsOn: [], reason: 'Größenveränderbare Bereiche fehlen; KoliBri liefert bewusst keine Layouts.' },
	'fink-code-block': { kind: 'Doku-Werkzeug', buildsOn: ['fink-button', 'fink-icon'], reason: 'Syntax-Hervorhebung und Code-Tabs für Dokumentationen.' },
};

export const reuse: Record<string, ReuseInfo> = Object.fromEntries(
	Object.entries(base).map(([tag, info]) => [tag, { ...info, reason: t(info.reason), kind: t(info.kind) as ReuseInfo['kind'] }]),
);
