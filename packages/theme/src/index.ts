import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';
import { tokenDeclarations } from '@fink/tokens';
import { overrides } from './overrides.js';
import { kolibriLocales } from './kolibri-locales.js';
import { FINK_SYSTEM_NAMES, SYSTEM_THEMES, injectSystemTokens, type FinkSystemName } from './systems.js';

export { FINK_SYSTEM_NAMES, SYSTEM_THEMES, injectSystemTokens };
export type { FinkSystemName };

type ThemePatch = Parameters<typeof DEFAULT>[0];
type ThemeMap = Parameters<ThemePatch>[1];

/** Name, unter dem das Theme registriert wird (Wert für das Attribut kol-theme). */
export const FINK_THEME_NAME = 'fink';

/**
 * Das Fink-Theme: die vollständigen Styles von @public-ui/theme-default plus die Fink-Overrides,
 * registriert unter eigenem Namen. Die Optik kommt überwiegend aus den Tokens (--kolibri-*-Hooks).
 */
export const FINK: typeof DEFAULT = (patch) =>
	DEFAULT((_name, map, options, features) => {
		const merged: Record<string, string | undefined> = { ...map };
		for (const [key, css] of Object.entries(overrides)) {
			merged[key] = `${merged[key] ?? ''}\n${css}`;
		}
		return patch(FINK_THEME_NAME, merged as ThemeMap, options, features);
	});

export { DEFAULT as KOLIBRI_DEFAULT };

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
	 * Nachbau-Skins europäischer Design-Systeme mitregistrieren (porsche, scale, ix, db, post,
	 * baloise, tegel, infineon, six, kern, dyou). true nimmt alle, ein Array eine Auswahl; ihre
	 * Token-Declarations werden automatisch als data-theme-scoped Stylesheet eingefügt.
	 */
	includeSystems?: boolean | readonly FinkSystemName[];
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
	const themes = options.includeKolibriDefault === false ? [FINK] : [FINK, DEFAULT];
	if (options.includeSystems) {
		if (typeof document !== 'undefined') injectSystemTokens();
		const selected = options.includeSystems === true ? FINK_SYSTEM_NAMES : options.includeSystems;
		themes.push(...selected.map((name) => SYSTEM_THEMES[name]));
	}
	registration = register(themes, [defineCustomElements, ...(options.loaders ?? [])], {
		environment: 'production',
		theme: { detect, name: FINK_THEME_NAME },
		translation: { name: options.language ?? 'de' },
		translations: new Set(finkTranslations) as unknown as KoliBriTranslations,
	});
	return registration;
};
