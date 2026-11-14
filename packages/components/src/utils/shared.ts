/** Liest ein Prop, das als Array oder JSON-String übergeben werden kann. */
export const parseList = <T>(value: T[] | string | undefined): T[] => {
	if (Array.isArray(value)) return value;
	if (typeof value !== 'string' || value.trim() === '') return [];
	try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? (parsed as T[]) : [];
	} catch {
		return [];
	}
};

export const formatBytes = (bytes: number): string => {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toLocaleString('de-DE', { maximumFractionDigits: 0 })} KB`;
	return `${(bytes / 1024 / 1024).toLocaleString('de-DE', { maximumFractionDigits: 1 })} MB`;
};
