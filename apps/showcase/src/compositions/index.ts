import type { ComponentType } from 'react';
import { t } from '../i18n';
import { BenutzerApp } from './benutzer/BenutzerApp';
import { BuergerApp } from './buerger-app/BuergerApp';
import { CompositionApp as FoerderportalApp } from './foerderportal/CompositionApp';
import { HilfeApp } from './hilfe/HilfeApp';
import { KontoApp } from './konto/KontoApp';
import { OnlineAntragApp } from './online-antrag/OnlineAntragApp';

export interface CompositionDefinition {
	id: string;
	title: string;
	icon: string;
	summary: string;
	/** Nummern der Patterns, die die Komposition zeigt. */
	patterns: number[];
	app: ComponentType;
}

export const compositions: CompositionDefinition[] = [
	{
		id: 'foerderportal',
		title: t('Förderportal (Sachbearbeitung)'),
		icon: 'codicon codicon-briefcase',
		summary: t('Fachanwendung zur Antragsbearbeitung: Dashboard, filterbare Tabelle, Detail-Drawer mit Statuswechsel, Antrags-Wizard.'),
		patterns: [1, 2, 7, 11, 14, 15, 18, 25, 27, 28],
		app: FoerderportalApp,
	},
	{
		id: 'online-antrag',
		title: t('Online-Antrag (Bürgersicht)'),
		icon: 'codicon codicon-file-submodule',
		summary: t('Antragsstrecke mit Aufgabenliste, Formularen mit Fehlerzusammenfassung, Upload, „Antworten prüfen“, Bestätigung und Feedback.'),
		patterns: [13, 17, 18, 20, 21, 23, 24, 26, 29, 30],
		app: OnlineAntragApp,
	},
	{
		id: 'konto',
		title: t('Mein Konto'),
		icon: 'codicon codicon-account',
		summary: t('Anmeldung, Profil im Lese- und Bearbeitungsmodus, Benachrichtigungs-Schalter, Passwortwechsel, Sitzungen und Konto löschen.'),
		patterns: [1, 2, 12, 13, 14, 19, 22, 25, 27, 30],
		app: KontoApp,
	},
	{
		id: 'hilfe',
		title: t('Hilfe-Center'),
		icon: 'codicon codicon-question',
		summary: t('Suche mit Autovervollständigung, Themenkarten, Filter-Chips, Ansicht umschalten, Pagination, Artikel mit Bewertung, Kontaktformular.'),
		patterns: [4, 5, 6, 9, 10, 12, 16, 18, 20, 24, 28, 30],
		app: HilfeApp,
	},
	{
		id: 'benutzer',
		title: t('Benutzerverwaltung (Admin)'),
		icon: 'codicon codicon-organization',
		summary: t('Ladezustände, Filter, Tabelle mit Mehrfachauswahl und Massenaktionen, Einladedialog, Detail-Drawer, Teams und Protokoll.'),
		patterns: [2, 6, 10, 11, 12, 13, 14, 16, 18, 25, 27, 28, 29],
		app: BenutzerApp,
	},
	{
		id: 'buerger-app',
		title: t('Bürger-App (mobil)'),
		icon: 'codicon codicon-device-mobile',
		summary: t('Mobile App im Material-Stil: Bottom Navigation, Bottom Sheet zur Terminbuchung, Snackbar, Banner, Postfach und Einstellungen.'),
		patterns: [3, 12, 16, 21, 22, 25, 26, 28],
		app: BuergerApp,
	},
];

export const findComposition = (id: string) => compositions.find((c) => c.id === id);
