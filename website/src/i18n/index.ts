import { detectFinkLanguage, type FinkLanguage } from '@fink-ui/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './en';

/**
 * i18next der Showcase. Deutsche Texte sind die Schlüssel (fehlt eine Übersetzung, erscheint
 * Deutsch), Englisch steht in ./en. Ein Sprachwechsel lädt die Seite neu (KoliBri übernimmt seine
 * Sprache nur beim Registrieren), daher darf t() auch in Modul-Konstanten verwendet werden.
 */
export const language: FinkLanguage = detectFinkLanguage();

void i18n.use(initReactI18next).init({
	lng: language,
	fallbackLng: 'de',
	resources: { de: { translation: {} }, en: { translation: en } },
	keySeparator: false,
	nsSeparator: false,
	interpolation: { escapeValue: false },
	initAsync: false,
	showSupportNotice: false,
} as Parameters<typeof i18n.init>[0]);

document.documentElement.lang = language;

export const t = (key: string, options?: Record<string, unknown>): string => i18n.t(key, options) as string;

export const isEnglish = language === 'en';

/** Wählt den Text der aktuellen Sprache. */
export const pick = <T>(de: T, enValue: T | undefined): T => (isEnglish && enValue !== undefined ? enValue : de);

export const locale = isEnglish ? 'en-GB' : 'de-DE';

export { i18n };
