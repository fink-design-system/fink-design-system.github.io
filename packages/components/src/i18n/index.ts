import i18next, { type i18n } from 'i18next';
import { de, en, type FinkResources } from './locales';

export type FinkLanguage = 'de' | 'en';

const NS = 'fink';

const normalize = (value: string | null | undefined): FinkLanguage => (value?.toLowerCase().startsWith('de') ? 'de' : 'en');

const documentLanguage = (): FinkLanguage => (typeof document === 'undefined' ? 'de' : normalize(document.documentElement.lang));

/**
 * i18next-Instanz der Fink-Komponenten (Namespace „fink“). Die Sprache folgt dem lang-Attribut
 * von <html>; Anwendungen setzen sie dort oder über setFinkLanguage().
 */
export const finkI18n: i18n = i18next.createInstance();

finkI18n.init({
	lng: documentLanguage(),
	fallbackLng: 'en',
	supportedLngs: ['de', 'en'],
	ns: [NS],
	defaultNS: NS,
	resources: { de: { [NS]: de }, en: { [NS]: en } },
	interpolation: { escapeValue: false },
	initAsync: false,
	showSupportNotice: false,
} as Parameters<i18n['init']>[0]);

if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined') {
	new MutationObserver(() => {
		const lng = documentLanguage();
		if (lng !== finkI18n.language) void finkI18n.changeLanguage(lng);
	}).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
}

/** Übersetzt einen Schlüssel aus dem Namespace „fink“. */
export const t = (key: string, options?: Record<string, unknown>): string => finkI18n.t(key, options) as string;

/** Aktuelle Sprache der Fink-Komponenten. */
export const getFinkLanguage = (): FinkLanguage => normalize(finkI18n.language);

/** Setzt die Sprache der Fink-Komponenten (und das lang-Attribut des Dokuments). */
export const setFinkLanguage = (lng: FinkLanguage): Promise<unknown> => {
	if (typeof document !== 'undefined') document.documentElement.lang = lng;
	return finkI18n.changeLanguage(lng);
};

/** Ergänzt oder überschreibt Texte der Fink-Komponenten, z. B. für weitere Sprachen. */
export const addFinkTranslations = (lng: string, resources: Partial<FinkResources>): void => {
	finkI18n.addResourceBundle(lng, NS, resources, true, true);
};

/** Formatiert Zahlen in der aktuellen Sprache. */
export const formatNumber = (value: number, options?: Intl.NumberFormatOptions): string => value.toLocaleString(getFinkLanguage() === 'en' ? 'en-GB' : 'de-DE', options);

/**
 * Hilfsfunktion für Komponenten: abonniert Sprachwechsel und liefert eine Abmeldefunktion.
 * Die Komponente setzt im Callback einen @State, damit sie neu rendert.
 */
export const onFinkLanguageChange = (callback: (lng: FinkLanguage) => void): (() => void) => {
	const handler = (lng: string) => callback(normalize(lng));
	finkI18n.on('languageChanged', handler);
	return () => finkI18n.off('languageChanged', handler);
};
