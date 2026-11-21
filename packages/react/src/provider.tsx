import { createContext, Fragment, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { FINK_THEME_NAME, isFinkThemeName, registerFink, type FinkThemeName, type RegisterFinkOptions } from '@fink/theme';
import { setFinkLanguage, type FinkLanguage } from '@fink/components/i18n';

export type FinkColorScheme = 'light' | 'dark' | 'system';
export type { FinkLanguage, FinkThemeName };

export interface FinkContextValue {
	colorScheme: FinkColorScheme;
	setColorScheme: (scheme: FinkColorScheme) => void;
	theme: FinkThemeName;
	setTheme: (theme: FinkThemeName) => void;
	language: FinkLanguage;
	setLanguage: (language: FinkLanguage) => void;
	ready: boolean;
}

const FinkContext = createContext<FinkContextValue | null>(null);

const LANGUAGE_KEY = 'fink-language';
const THEME_KEY = 'fink-theme';

const readStorage = (key: string): string | null => {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
};

const writeStorage = (key: string, value: string) => {
	try {
		localStorage.setItem(key, value);
	} catch {
		// localStorage nicht verfügbar
	}
};

/** Gespeicherte Theme-Wahl, sonst der übergebene Startwert. */
export const detectFinkTheme = (fallback: FinkThemeName = FINK_THEME_NAME): FinkThemeName => {
	const stored = readStorage(THEME_KEY);
	return isFinkThemeName(stored) ? stored : fallback;
};

/**
 * Ermittelt die Startsprache: gespeicherte Wahl, dann <html lang>, dann die Browsersprachen
 * (navigator.languages in Reihenfolge), sonst Englisch.
 */
export const detectFinkLanguage = (fallback: FinkLanguage = 'en'): FinkLanguage => {
	const match = (value?: string | null): FinkLanguage | undefined => {
		const v = value?.toLowerCase() ?? '';
		return v.startsWith('en') ? 'en' : v.startsWith('de') ? 'de' : undefined;
	};
	const stored = readStorage(LANGUAGE_KEY);
	const browser = typeof navigator !== 'undefined' ? [...(navigator.languages ?? []), navigator.language] : [];
	return match(stored) ?? match(typeof document !== 'undefined' ? document.documentElement.lang : '') ?? browser.map(match).find(Boolean) ?? fallback;
};

export interface FinkProviderProps {
	children: ReactNode;
	/** Startwert für das Farbschema. „system“ folgt dem Betriebssystem. */
	defaultColorScheme?: FinkColorScheme;
	/**
	 * Startwert für das Theme: Fink, unverändertes KoliBri-Default oder ein Marken-Theme
	 * (porsche, telekom, siemens-ix). Eine gespeicherte Wahl hat Vorrang.
	 */
	defaultTheme?: FinkThemeName;
	/** Startsprache; ohne Angabe gespeicherte Wahl, <html lang>, Browsersprache oder Englisch. */
	defaultLanguage?: FinkLanguage;
	/** Wird bei jedem Sprachwechsel aufgerufen, z. B. um i18next der Anwendung umzuschalten. */
	onLanguageChange?: (language: FinkLanguage) => void;
	/**
	 * KoliBri legt die Sprache seiner eigenen Texte beim Registrieren fest. Mit true (Standard)
	 * wird die Seite nach einem Sprachwechsel neu geladen, damit auch diese Texte wechseln.
	 */
	reloadOnLanguageChange?: boolean;
	/** Wird angezeigt, bis KoliBri und das Theme registriert sind. */
	fallback?: ReactNode;
	/** Weitere Optionen für registerFink. */
	registerOptions?: RegisterFinkOptions;
}

/**
 * Registriert KoliBri mit dem Fink-Theme und stellt Farbschema, Theme und Sprache bereit.
 *
 * Das Farbschema setzt `color-scheme` am Dokument. Ein Theme-Wechsel setzt `data-theme` (Tokens und
 * KoliBri-Theme), speichert die Wahl und montiert die Kinder neu, weil KoliBri das Theme beim Mounten anwendet. Die Sprache steht in `<html lang>`;
 * Fink-Komponenten folgen live, KoliBri nach dem Neuladen.
 */
export function FinkProvider({
	children,
	defaultColorScheme = 'system',
	defaultTheme = FINK_THEME_NAME,
	defaultLanguage,
	onLanguageChange,
	reloadOnLanguageChange = true,
	fallback = null,
	registerOptions,
}: FinkProviderProps) {
	const [ready, setReady] = useState(false);
	const [colorScheme, setColorScheme] = useState<FinkColorScheme>(defaultColorScheme);
	const [theme, setThemeState] = useState<FinkThemeName>(() => detectFinkTheme(defaultTheme));
	const [language, setLanguageState] = useState<FinkLanguage>(() => defaultLanguage ?? detectFinkLanguage());

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
	}, [theme]);

	useEffect(() => {
		document.documentElement.lang = language;
		void setFinkLanguage(language);
		onLanguageChange?.(language);
		// onLanguageChange ist ein Callback der Anwendung und soll keinen erneuten Lauf auslösen.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [language]);

	useEffect(() => {
		let active = true;
		registerFink({ detect: 'auto', language, ...registerOptions })
			.catch((error: unknown) => console.error('[Fink] Registrierung fehlgeschlagen', error))
			.finally(() => active && setReady(true));
		return () => {
			active = false;
		};
		// Registrierung erfolgt genau einmal pro Seite.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		document.documentElement.style.colorScheme = colorScheme === 'system' ? 'light dark' : colorScheme;
	}, [colorScheme]);

	const setTheme = useCallback((next: FinkThemeName) => {
		writeStorage(THEME_KEY, next);
		// Vor dem Neumontieren setzen, damit KoliBri beim Mounten bereits das neue Theme findet.
		document.documentElement.dataset.theme = next;
		setThemeState(next);
	}, []);

	const setLanguage = useCallback(
		(next: FinkLanguage) => {
			writeStorage(LANGUAGE_KEY, next);
			setLanguageState(next);
			if (reloadOnLanguageChange && ready) {
				document.documentElement.lang = next;
				window.setTimeout(() => window.location.reload(), 0);
			}
		},
		[reloadOnLanguageChange, ready],
	);

	const value = useMemo<FinkContextValue>(
		() => ({ colorScheme, setColorScheme, theme, setTheme, language, setLanguage, ready }),
		[colorScheme, theme, setTheme, language, setLanguage, ready],
	);

	return <FinkContext.Provider value={value}>{ready ? <Fragment key={theme}>{children}</Fragment> : fallback}</FinkContext.Provider>;
}

/** Zugriff auf Farbschema, Theme und Sprache des umgebenden FinkProvider. */
export function useFink(): FinkContextValue {
	const context = useContext(FinkContext);
	if (!context) throw new Error('useFink muss innerhalb von <FinkProvider> verwendet werden.');
	return context;
}
