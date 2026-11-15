import type { FinkTone } from '@fink/components';
import { t, locale } from '../../i18n';

export type Status = 'neu' | 'pruefung' | 'rueckfrage' | 'bewilligt' | 'abgelehnt';

export const STATUS: Record<Status, { label: string; tone: FinkTone }> = {
	neu: { label: t('Neu'), tone: 'brand' },
	pruefung: { label: t('In Prüfung'), tone: 'info' },
	rueckfrage: { label: t('Rückfrage'), tone: 'warning' },
	bewilligt: { label: t('Bewilligt'), tone: 'success' },
	abgelehnt: { label: t('Abgelehnt'), tone: 'danger' },
};

export const STATUS_ORDER: Status[] = ['neu', 'pruefung', 'rueckfrage', 'bewilligt', 'abgelehnt'];

export type ProgramId = 'dig' | 'klima' | 'kultur' | 'inno';

export const PROGRAMS: Record<ProgramId, { label: string; budget: number }> = {
	dig: { label: t('Digitalisierung im Mittelstand'), budget: 900_000 },
	klima: { label: t('Klimaschutz in Kommunen'), budget: 1_200_000 },
	kultur: { label: t('Kultur vor Ort'), budget: 300_000 },
	inno: { label: t('Innovationsgutschein'), budget: 450_000 },
};

export interface HistoryEntry {
	date: string;
	text: string;
}

export interface Application {
	id: string;
	applicant: string;
	contact: string;
	email: string;
	city: string;
	program: ProgramId;
	amount: number;
	received: string;
	status: Status;
	description: string;
	history: HistoryEntry[];
}

// Alle Antragsteller sind erfunden (siehe docs/datenschutz-beispieldaten.md):
// Fantasie-Firmennamen, nur Großstädte, Behörden mit Musternamen,
// E-Mails ausschließlich unter der reservierten Domain example.org.
const applicants: Array<[string, string, string]> = [
	['Mühlenwerk GmbH', 'Petra Lang', 'Hamburg'],
	['Sonnentau eG', 'Malik Yilmaz', 'München'],
	['Kranich & Söhne KG', 'Henrike Albrecht', 'Bremen'],
	['Lindenhof Bäckerei', 'Tobias Brandt', 'Leipzig'],
	['Gemeinde Musterhausen', 'Sabine Roth', 'Musterhausen'],
	['Kulturverein Zwirbelhalle', 'Jule Hartmann', 'Dresden'],
	['Nordlicht Robotics GmbH', 'Finn Petersen', 'Hamburg'],
	['Stadtwerke Musterstadt', 'Dr. Uwe Seidel', 'Musterstadt'],
	['Holzwunder Manufaktur', 'Anna Fuchs', 'Nürnberg'],
	['Theater Wolkenbühne e. V.', 'Ole Marquardt', 'Köln'],
	['Grünkraft Solar GmbH', 'Leyla Demir', 'Frankfurt am Main'],
	['Musikschule Klangfabrik', 'Klara Vogt', 'Stuttgart'],
	['Amt Musterland', 'Rainer Pohl', 'Musterdorf'],
	['Datenwerk Fiktiva UG', 'Mira Klein', 'Düsseldorf'],
	['Hofladen Löwenzahn', 'Jan Ehlers', 'Hannover'],
	['Kunsthalle Farbenspiel', 'Esther Wolff', 'Dortmund'],
	['Flinkfräse Präzisionsteile GmbH', 'Stefan Maier', 'Stuttgart'],
	['Gemeinde Beispielfeld', 'Birgit Sommer', 'Beispielfeld'],
	['Quellwasser Labs GmbH', 'Nils Berger', 'Berlin'],
	['Literaturhaus Seitenwind', 'Paula Engel', 'Leipzig'],
	['Flinkfeder Druck GmbH', 'Georg Albers', 'Hannover'],
	['Energiegenossenschaft Sonnenhang', 'Carla Neumann', 'Berlin'],
];

const programs: ProgramId[] = ['dig', 'klima', 'kultur', 'inno'];
const statuses: Status[] = ['neu', 'pruefung', 'bewilligt', 'rueckfrage', 'pruefung', 'bewilligt', 'abgelehnt', 'neu', 'bewilligt', 'pruefung', 'rueckfrage'];
const descriptions: Record<ProgramId, string> = {
	dig: t('Einführung eines digitalen Auftragsmanagements inklusive Schulung der Mitarbeitenden.'),
	klima: t('Umrüstung der Straßenbeleuchtung auf LED mit bedarfsgerechter Steuerung.'),
	kultur: t('Veranstaltungsreihe mit Lesungen und Workshops für Kinder und Jugendliche.'),
	inno: t('Machbarkeitsstudie für ein neues Produkt gemeinsam mit einer Hochschule.'),
};

const iso = (dayOffset: number) => {
	const date = new Date(Date.UTC(2026, 10, 13));
	date.setUTCDate(date.getUTCDate() - dayOffset);
	return date.toISOString().slice(0, 10);
};

export const seedApplications = (): Application[] =>
	applicants.map(([applicant, contact, city], index) => {
		const program = programs[index % programs.length];
		const status = statuses[index % statuses.length];
		const received = iso(index * 2 + (index % 3));
		const history: HistoryEntry[] = [{ date: received, text: t('Antrag eingegangen') }];
		if (status !== 'neu') history.push({ date: iso(index * 2 - 1 + (index % 3)), text: t('Prüfung begonnen') });
		if (status === 'rueckfrage') history.push({ date: iso(Math.max(0, index * 2 - 2)), text: t('Rückfrage: Nachweis zur Eigenbeteiligung fehlt') });
		if (status === 'bewilligt') history.push({ date: iso(Math.max(0, index * 2 - 3)), text: t('Bewilligt') });
		if (status === 'abgelehnt') history.push({ date: iso(Math.max(0, index * 2 - 3)), text: t('Abgelehnt: Fördervoraussetzungen nicht erfüllt') });
		return {
			id: `FD-2026-${String(142 - index).padStart(4, '0')}`,
			applicant,
			contact,
			email: `${contact.toLowerCase().replace(/^dr\. /, '').replace(/[^a-zäöüß]+/g, '.').replace(/\.$/, '')}@example.org`,
			city,
			program,
			amount: Math.round(((index * 7919) % 95) + 5) * 1000,
			received,
			status,
			description: descriptions[program],
			history,
		};
	});

export const euro = (value: number) => value.toLocaleString(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

export const euroCompact = (value: number) =>
	value >= 1_000_000 ? `${(value / 1_000_000).toLocaleString(locale, { maximumFractionDigits: 2 })} Mio. €` : `${Math.round(value / 1000).toLocaleString(locale)} Tsd. €`;

export const dateDe = (isoDate: string) => new Date(`${isoDate}T12:00:00Z`).toLocaleDateString(locale, { day: '2-digit', month: '2-digit', year: 'numeric' });

export const today = () => new Date().toISOString().slice(0, 10);
