import { register } from '@public-ui/components';
import { defineCustomElements } from '@public-ui/components/loader';
import { DEFAULT } from '@public-ui/theme-default';
import { brandThemes, themeCss } from '@fink/tokens';
import { hostOverrides, overrides } from './overrides.js';
import { porscheOverrides } from './brands/porsche.js';
import { siemensIxOverrides } from './brands/siemens-ix.js';
import { telekomOverrides } from './brands/telekom.js';
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

/**
 * Erzeugt ein KoliBri-Theme unter eigenem Namen: alle Styles von @public-ui/theme-default plus Overrides.
 * Fink und die Marken-Themes entstehen auf diese Weise; die Optik kommt überwiegend aus den Tokens.
 */
export const createTheme =
	(name: string, extra: Record<string, string>): typeof DEFAULT =>
	(patch) =>
		DEFAULT((_name, map, options, features) => patch(name, withOverrides(map, extra), options, features));

export const FINK: typeof DEFAULT = createTheme(FINK_THEME_NAME, overrides);

/** Namen der Marken-Themes (Nachbildungen anderer Design-Systeme auf Fink-Basis). */
export type FinkBrandThemeName = (typeof brandThemes)[number]['name'];

const brandOverrides: Record<FinkBrandThemeName, Record<string, string>> = {
	porsche: porscheOverrides,
	'siemens-ix': siemensIxOverrides,
	telekom: telekomOverrides,
};

/** KoliBri-Themes der Marken, je Name. Tokens kommen aus @fink/tokens (src/themes/<name>.json). */
export const BRAND_THEMES: Record<FinkBrandThemeName, typeof DEFAULT> = Object.fromEntries(
	brandThemes.map((theme) => [theme.name, createTheme(theme.name, brandOverrides[theme.name])]),
) as Record<FinkBrandThemeName, typeof DEFAULT>;

/** Alle wählbaren Themes. */
export type FinkThemeName = typeof FINK_THEME_NAME | 'default' | FinkBrandThemeName;

export interface FinkThemeInfo {
	name: FinkThemeName;
	label: string;
	/** Herkunft und Lizenzhinweis; leer für Fink und KoliBri-Default. */
	description: string;
	/** Website des nachgebildeten Systems. */
	source: string;
	/** true für Nachbildungen fremder Design-Systeme. */
	brand: boolean;
}

/** Wählbare Themes in Anzeigereihenfolge, z. B. für einen Umschalter. */
export const FINK_THEMES: FinkThemeInfo[] = [
	{ name: FINK_THEME_NAME, label: 'Fink', description: '', source: '', brand: false },
	{ name: 'default', label: 'KoliBri Default', description: '', source: 'https://public-ui.github.io', brand: false },
	...brandThemes.map(({ name, label, description, source }) => ({ name, label, description, source, brand: true })),
];

export const isFinkThemeName = (value: unknown): value is FinkThemeName => FINK_THEMES.some((theme) => theme.name === value);

/**
 * Das KoliBri-Default-Theme für den Vergleich, unverändert bis auf transparente Hosts (siehe hostOverrides).
 */
export const KOLIBRI_DEFAULT: typeof DEFAULT = (patch) =>
	DEFAULT((name, map, options, features) => patch(name, withOverrides(map, hostOverrides), options, features));

const TOKENS_STYLE_ID = 'fink-tokens';

/**
 * Hängt die Fink-Tokens als Stylesheet an das Dokument, falls die Anwendung
 * @fink/tokens/tokens.css nicht selbst einbindet: Basis auf :root, Marken-Themes je [data-theme].
 * Tokens erreichen über Vererbung auch die Shadow Roots aller kol-*- und fink-*-Komponenten.
 */
export const injectTokens = (doc: Document = document): void => {
	if (doc.getElementById(TOKENS_STYLE_ID)) return;
	const style = doc.createElement('style');
	style.id = TOKENS_STYLE_ID;
	style.textContent = themeCss;
	doc.head.prepend(style);
};

export interface RegisterFinkOptions {
	/** Zusätzliche Element-Loader, z. B. defineCustomElements aus @fink/components/loader. */
	loaders?: Array<() => Promise<void> | void>;
	/** Tokens automatisch ins Dokument einfügen (Standard: true). */
	injectTokens?: boolean;
	/** Das unveränderte KoliBri-Default-Theme zusätzlich registrieren (Standard: true). */
	includeKolibriDefault?: boolean;
	/** Die Marken-Themes (Porsche, Telekom, Siemens iX) zusätzlich registrieren (Standard: true). */
	includeBrandThemes?: boolean;
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
	const themes = [
		FINK,
		...(options.includeKolibriDefault === false ? [] : [KOLIBRI_DEFAULT]),
		...(options.includeBrandThemes === false ? [] : Object.values(BRAND_THEMES)),
	];
	registration = register(themes, [defineCustomElements, ...(options.loaders ?? [])], {
		environment: 'production',
		theme: { detect, name: FINK_THEME_NAME },
		translation: { name: options.language ?? 'de' },
		translations: new Set(finkTranslations) as unknown as KoliBriTranslations,
	});
	return registration;
};
