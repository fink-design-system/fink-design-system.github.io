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

const applicants: Array<[string, string, string]> = [
	['Mühlenwerk GmbH', 'Petra Lang', 'Lüneburg'],
	['Sonnentau eG', 'Malik Yilmaz', 'Freiburg'],
	['Kranich & Söhne KG', 'Henrike Kranich', 'Rostock'],
	['Lindenhof Bäckerei', 'Tobias Brandt', 'Erfurt'],
	['Gemeinde Waldbrunn', 'Sabine Roth', 'Waldbrunn'],
	['Kulturverein Alte Weberei', 'Jule Hartmann', 'Chemnitz'],
	['Nordlicht Robotics GmbH', 'Finn Petersen', 'Kiel'],
	['Stadtwerke Talheim', 'Dr. Uwe Seidel', 'Talheim'],
	['Tischlerei Fuchs', 'Anna Fuchs', 'Regensburg'],
	['Theater am Fluss e. V.', 'Ole Marquardt', 'Bremen'],
	['Grünkraft Solar GmbH', 'Leyla Demir', 'Kassel'],
	['Musikschule Bergland', 'Klara Vogt', 'Siegen'],
	['Amt Seenland', 'Rainer Pohl', 'Neuruppin'],
	['Datenwerk Saar UG', 'Mira Klein', 'Saarbrücken'],
	['Hofladen Ehlers', 'Jan Ehlers', 'Celle'],
	['Kunsthalle Ostviertel', 'Esther Wolff', 'Münster'],
	['Präzisionsteile Maier', 'Stefan Maier', 'Ulm'],
	['Gemeinde Hohenfels', 'Birgit Sommer', 'Hohenfels'],
	['Quellwasser Labs GmbH', 'Nils Berger', 'Jena'],
	['Literaturhaus Mitte', 'Paula Engel', 'Leipzig'],
	['Druckerei Albers', 'Georg Albers', 'Osnabrück'],
	['Energiegenossenschaft Rhön', 'Carla Neumann', 'Fulda'],
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
			email: `${contact.toLowerCase().replace(/^dr\. /, '').replace(/[^a-zäöüß]+/g, '.').replace(/\.$/, '')}@beispiel.de`,
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
