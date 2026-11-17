/**
 * Gemeinsame Demo-Konfiguration für alle Varianten. Teil des Prüfstands, zählt nicht zum Aufwand einer Variante.
 */
export const TAG = {
	label: 'Zuständige Orte',
	placeholder: 'Ort eingeben',
	options: ['Berlin', 'Bonn', 'Bremen', 'Dresden', 'Hamburg', 'München'],
	value: ['Berlin'],
	max: 5,
};

export const FILE = {
	label: 'Nachweise',
	hint: 'PDF oder JPG, höchstens 2 MB',
	accept: '.pdf,.jpg',
	maxSize: 2 * 1024 * 1024,
	multiple: true,
};

/** Schreibt Ereignisse in ein unsichtbares Protokoll, das die Tests auslesen. */
export function log(name: string, detail: unknown) {
	const el = document.getElementById('event-log');
	if (el) el.textContent = `${name}: ${JSON.stringify(detail)}`;
}
