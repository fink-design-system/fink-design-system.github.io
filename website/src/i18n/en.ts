import { a11y } from './en/a11y';
import { gettingStarted } from './en/getting-started';
import { site } from './en/site';
import { site2 } from './en/site2';
import { site3 } from './en/site3';
import { starters } from './en/starters';
import { themes } from './en/themes';

/** Englische Übersetzungen, Schlüssel sind die deutschen Ausgangstexte. */
export const en: Record<string, string> = {
	...site,
	...site2,
	...site3,
	...a11y,
	...themes,
	...gettingStarted,
	...starters,
	Katalog: 'Catalogue',
	Absenden: 'Submit',
	'„War diese Seite hilfreich?“ mit Kommentar bei „Nein“ – kurzes Seitenfeedback ohne Kontaktformular.':
		'“Was this page helpful?” with a comment on “No” – short page feedback without a contact form.',
	'Antrag {{id}}': 'Application {{id}}',
	'Inhalte werden geladen': 'Loading content',
	'{{count}} von {{total}} Patterns': '{{count}} of {{total}} patterns',
	'Dialog & Bestätigung': 'Dialog & confirmation',
	'Einträge {{from}}–{{to}} von {{total}}': 'Items {{from}}–{{to}} of {{total}}',
	'Endet bald': 'Closing soon',
	Finanzierung: 'Financing',
	Geschlossen: 'Closed',
	'Kontrast auf Fläche ({{scheme}})': 'Contrast on surface ({{scheme}})',
	'Online-Antrag': 'Online application',
	'bis 20.000 €': 'up to €20,000',
	'bis 250.000 €': 'up to €250,000',
	'bis 50.000 €': 'up to €50,000',
	'{{count}} Anträge gefunden': '{{count}} applications found',
	'{{count}} von {{total}} Komponenten': '{{count}} of {{total}} components',
	'Navigation & Struktur': 'Navigation & structure',
	'Suche & Daten': 'Search & data',
	'Formulare & Eingabe': 'Forms & input',
	'Feedback & Status': 'Feedback & status',
	Doku: 'Docs',
	LÖSCHEN: 'DELETE',
	'Geben Sie zur Bestätigung LÖSCHEN ein.': 'Type DELETE to confirm.',
	'Mehr erfahren': 'Learn more',
};
