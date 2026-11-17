/**
 * Deutsche Texte und Hilfsfunktionen für die Varianten ohne Fink-i18n (React Aria, Lion).
 * Wortgleich mit den Fink-Texten. Zählt zum Aufwand beider Varianten.
 */
export const texts = {
	tagHint: 'Mit Enter oder Komma übernehmen, Rücktaste entfernt den letzten Eintrag.',
	tagSelected: (label: string) => `Ausgewählt für ${label}`,
	tagAdded: (value: string) => `${value} hinzugefügt`,
	tagRemoved: (value: string) => `${value} entfernt`,
	tagDuplicate: (value: string) => `${value} ist bereits ausgewählt.`,
	tagNotAllowed: (value: string) => `${value} steht nicht zur Auswahl.`,
	tagMax: (count: number) => `Höchstens ${count} Einträge möglich.`,
	remove: (name: string) => `${name} entfernen`,
	fileDrop: 'Dateien hierher ziehen oder',
	fileChooseMany: 'Dateien auswählen',
	fileList: 'Ausgewählte Dateien',
	fileTooLarge: (size: string) => `Die Datei ist größer als ${size}.`,
	fileWrongType: (accept: string) => `Dieses Dateiformat ist nicht erlaubt (${accept}).`,
	fileAdded: (count: number, invalid: number) =>
		`${count} ${count === 1 ? 'Datei' : 'Dateien'} hinzugefügt${invalid ? `, davon ${invalid} mit Fehler` : ''}.`,
	fileRemoved: (name: string) => `${name} entfernt.`,
};

export function formatBytes(bytes: number): string {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toLocaleString('de-DE', { maximumFractionDigits: 0 })} KB`;
	return `${(bytes / 1024 / 1024).toLocaleString('de-DE', { maximumFractionDigits: 1 })} MB`;
}

/** Prüft Größe und Typ wie fink-file-upload. */
export function validateFile(file: File, accept: string, maxSize: number): string | undefined {
	if (file.size > maxSize) return texts.fileTooLarge(formatBytes(maxSize));
	const allowed = accept.split(',').map((rule) => rule.trim().toLowerCase());
	const name = file.name.toLowerCase();
	const ok = allowed.some((rule) =>
		rule.startsWith('.') ? name.endsWith(rule) : rule.endsWith('/*') ? file.type.startsWith(rule.slice(0, -1)) : file.type === rule,
	);
	return ok ? undefined : texts.fileWrongType(accept);
}
