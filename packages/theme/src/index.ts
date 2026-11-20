import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';
import { tokenDeclarations } from '@fink/tokens';
import { hostOverrides, overrides } from './overrides.js';
import { kolibriLocales } from './kolibri-locales.js';

type ThemePatch = Parameters<typeof DEFAULT>[0];
type ThemeMap = Parameters<ThemePatch>[1];

/** Name, unter dem das Theme registriert wird (Wert für das Attribut kol-theme). */
export const FINK_THEME_NAME = 'fink';

/**
 * Das Fink-Theme: die vollständigen Styles von @public-ui/theme-default plus die Fink-Overrides,
 * registriert unter eigenem Namen. Die Optik kommt überwiegend aus den Tokens (--kolibri-*-Hooks).
 */
function withOverrides(map: ThemeMap, extra: Record<string, string>): ThemeMap {
	const merged: Record<string, string | undefined> = { ...map };
	for (const [key, css] of Object.entries(extra)) {
		merged[key] = `${merged[key] ?? ''}\n${css}`;
	}
	return merged as ThemeMap;
}

export const FINK: typeof DEFAULT = (patch) =>
	DEFAULT((_name, map, options, features) => patch(FINK_THEME_NAME, withOverrides(map, overrides), options, features));

/**
 * Das KoliBri-Default-Theme für den Vergleich, unverändert bis auf transparente Hosts (siehe hostOverrides).
 */
export const KOLIBRI_DEFAULT: typeof DEFAULT = (patch) =>
	DEFAULT((name, map, options, features) => patch(name, withOverrides(map, hostOverrides), options, features));

const TOKENS_STYLE_ID = 'fink-tokens';

/**
 * Hängt die Fink-Tokens als :root-Stylesheet an das Dokument, falls die Anwendung
 * @fink/tokens/tokens.css nicht selbst einbindet. Tokens auf :root erreichen über Vererbung
 * auch die Shadow Roots aller kol-*- und fink-*-Komponenten.
 */
export const injectTokens = (doc: Document = document): void => {
	if (doc.getElementById(TOKENS_STYLE_ID)) return;
	const style = doc.createElement('style');
	style.id = TOKENS_STYLE_ID;
	style.textContent = `:root {\n${tokenDeclarations}\n}`;
	doc.head.prepend(style);
};

export interface RegisterFinkOptions {
	/** Zusätzliche Element-Loader, z. B. defineCustomElements aus @fink/components/loader. */
	loaders?: Array<() => Promise<void> | void>;
	/** Tokens automatisch ins Dokument einfügen (Standard: true). */
	injectTokens?: boolean;
	/** Das unveränderte KoliBri-Default-Theme zusätzlich registrieren (Standard: true). */
	includeKolibriDefault?: boolean;
	/**
	 * Theme-Erkennung: „auto“ liest das Attribut data-theme am nächsten Vorfahren (auch über
	 * Shadow-Grenzen), „fixed“ nutzt immer das Fink-Theme (Standard: „auto“).
	 */
	detect?: 'auto' | 'fixed';
	/** Sprache der KoliBri-eigenen Texte (z. B. „Schließen“, Pagination). KoliBri legt sie beim Registrieren fest. */
	language?: 'de' | 'en';
}

/**
 * KoliBri-Texte für de und en. KoliBri ersetzt mit eigenen `translations` seine Standardtexte vollständig;
 * Fink gibt deshalb den kompletten, aus der installierten Version erzeugten Satz weiter. Geändert sind nur
 * Texte, die auf Auslassungszeichen enden („Datei auswählen oder hier ablegen...“): Sie werden vorgelesen
 * und wirken wie gekürzter Text.
 */
export { kolibriLocales as FINK_KOLIBRI_TRANSLATIONS } from './kolibri-locales.js';

type KoliBriTranslations = NonNullable<NonNullable<Parameters<typeof register>[2]>['translations']>;
type TranslationPatch = (register: (language: 'de' | 'en', resources: Record<string, string>) => unknown) => unknown;

const finkTranslations: TranslationPatch[] = [(t) => t('de', kolibriLocales.de), (t) => t('en', kolibriLocales.en)];

let registration: Promise<unknown> | undefined;

/**
 * Registriert KoliBri mit dem Fink-Theme. Idempotent: weitere Aufrufe liefern dasselbe Promise.
 */
export const registerFink = (options: RegisterFinkOptions = {}): Promise<unknown> => {
	if (registration) return registration;
	if (options.injectTokens !== false && typeof document !== 'undefined') injectTokens();
	const detect = options.detect ?? 'auto';
	if (detect === 'auto' && typeof document !== 'undefined' && !document.documentElement.dataset.theme) {
		document.documentElement.dataset.theme = FINK_THEME_NAME;
	}
	const themes = options.includeKolibriDefault === false ? [FINK] : [FINK, KOLIBRI_DEFAULT];
	registration = register(themes, [defineCustomElements, ...(options.loaders ?? [])], {
		environment: 'production',
		theme: { detect, name: FINK_THEME_NAME },
		translation: { name: options.language ?? 'de' },
		translations: new Set(finkTranslations) as unknown as KoliBriTranslations,
	});
	return registration;
};
