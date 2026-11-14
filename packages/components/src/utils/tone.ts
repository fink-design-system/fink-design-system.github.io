/** Semantische Tonalität, gemappt auf Fink-Farbtokens. */
export type FinkTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'brand';

export const TONES: FinkTone[] = ['brand', 'danger', 'info', 'neutral', 'success', 'warning'];

export const normalizeTone = (value: string | undefined, fallback: FinkTone = 'neutral'): FinkTone =>
	TONES.includes(value as FinkTone) ? (value as FinkTone) : fallback;
