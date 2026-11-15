/**
 * Gemeinsame Beispieldaten für Pattern-Demos.
 *
 * Alle Daten sind fiktiv (siehe docs/datenschutz-beispieldaten.md):
 * E-Mails nur unter der reservierten Domain example.org (RFC 2606),
 * keine realen Firmen, Behörden oder Personen-Ort-Kombinationen.
 */
import { t } from '../i18n';
export interface Person {
	id: string;
	name: string;
	email: string;
	role: 'Admin' | 'Sachbearbeitung' | 'Lesend';
	team: string;
	active: boolean;
	lastLogin: string;
}

const first = ['Erika', 'Jonas', 'Leyla', 'Malik', 'Petra', 'Finn', 'Klara', 'Ole', 'Mira', 'Tobias', 'Sabine', 'Nils', 'Paula', 'Georg', 'Anna', 'Uwe'];
const last = ['Mustermann', 'Weber', 'Demir', 'Yilmaz', 'Lang', 'Petersen', 'Vogt', 'Marquardt', 'Klein', 'Brandt', 'Roth', 'Berger', 'Engel', 'Albers', 'Fuchs', 'Seidel'];
const teams = ['Referat 1', 'Referat 2', 'Referat 4', 'IT-Service'];
const roles: Person['role'][] = ['Sachbearbeitung', 'Sachbearbeitung', 'Lesend', 'Admin'];

export const people: Person[] = first.map((name, i) => ({
	id: `u-${String(i + 1).padStart(3, '0')}`,
	name: `${name} ${last[i]}`,
	email: `${name.toLowerCase()}.${last[i].toLowerCase()}@example.org`,
	role: roles[i % roles.length],
	team: teams[i % teams.length],
	active: i % 5 !== 3,
	lastLogin: `${String(((i * 7) % 28) + 1).padStart(2, '0')}.10.2026`,
}));

export interface Article {
	id: string;
	title: string;
	category: 'Antrag' | 'Konto' | 'Zahlung' | 'Technik';
	excerpt: string;
	minutes: number;
}

export const articles: Article[] = [
	{ id: 'a1', title: t('Antrag stellen: Schritt für Schritt'), category: 'Antrag', excerpt: t('So reichen Sie Ihren Antrag online ein – mit Checkliste der nötigen Unterlagen.'), minutes: 4 },
	{ id: 'a2', title: t('Welche Nachweise brauche ich?'), category: 'Antrag', excerpt: t('Übersicht über Nachweise je Förderprogramm und erlaubte Dateiformate.'), minutes: 3 },
	{ id: 'a3', title: t('Antragsfrist verpasst – was nun?'), category: 'Antrag', excerpt: t('Wann eine Fristverlängerung möglich ist und wie Sie sie beantragen.'), minutes: 2 },
	{ id: 'a4', title: t('Passwort zurücksetzen'), category: 'Konto', excerpt: t('Neues Passwort per E-Mail-Link festlegen, auch ohne Zugriff auf das alte.'), minutes: 2 },
	{ id: 'a5', title: t('Zwei-Faktor-Anmeldung einrichten'), category: 'Konto', excerpt: t('Konto zusätzlich mit einer Authenticator-App schützen.'), minutes: 5 },
	{ id: 'a6', title: t('E-Mail-Adresse ändern'), category: 'Konto', excerpt: t('Neue Adresse eintragen und per Bestätigungslink verifizieren.'), minutes: 2 },
	{ id: 'a7', title: t('Wann wird die Förderung ausgezahlt?'), category: 'Zahlung', excerpt: t('Auszahlung nach Bewilligung und Mittelabruf – mit typischen Zeiträumen.'), minutes: 3 },
	{ id: 'a8', title: t('Bankverbindung ändern'), category: 'Zahlung', excerpt: t('IBAN aktualisieren; Änderungen gelten ab der nächsten Auszahlung.'), minutes: 2 },
	{ id: 'a9', title: t('Unterstützte Browser'), category: 'Technik', excerpt: t('Das Portal funktioniert mit aktuellen Versionen von Firefox, Chrome, Edge und Safari.'), minutes: 1 },
	{ id: 'a10', title: t('Upload schlägt fehl'), category: 'Technik', excerpt: t('Häufige Ursachen: Dateigröße über 10 MB, nicht erlaubtes Format, Verbindungsabbruch.'), minutes: 2 },
	{ id: 'a11', title: t('Barrierefreie Nutzung'), category: 'Technik', excerpt: t('Tastaturbedienung, Screenreader-Unterstützung und Leichte Sprache.'), minutes: 3 },
	{ id: 'a12', title: t('Bescheid herunterladen'), category: 'Antrag', excerpt: t('Bescheide liegen als PDF im Postfach und bleiben 10 Jahre abrufbar.'), minutes: 1 },
];
