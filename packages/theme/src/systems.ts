import { DEFAULT } from '@public-ui/theme-default';
import { systemDeclarations } from '@fink/tokens/systems';

type ThemePatch = Parameters<typeof DEFAULT>[0];
type ThemeMap = Parameters<ThemePatch>[1];

/** Die Nachbau-Skins und ihre KoliBri-Theme-Namen (Wert für das Attribut data-theme). */
export type FinkSystemName = 'porsche' | 'scale' | 'ix' | 'db' | 'post' | 'baloise' | 'tegel' | 'infineon' | 'six' | 'kern' | 'dyou';

export const FINK_SYSTEM_NAMES = ['porsche', 'scale', 'ix', 'db', 'post', 'baloise', 'tegel', 'infineon', 'six', 'kern', 'dyou'] as const satisfies readonly FinkSystemName[];

const TOKENS_STYLE_ID = 'fink-systems-tokens';

/*
 * Schmale Tabellen: Spalten werden nicht bis auf Silbenbreite gestaucht (wie im Fink-Theme).
 * Wörter bleiben ganz und Kopfzellen einzeilig; die Mindestbreite setzt die Anwendung über
 * _minWidth, den Rest übernimmt der Scroll-Container von KoliBri.
 */
const narrowTable = `
@layer kol-theme-component {
	:host {
		container-type: inline-size;
	}
	@container (max-width: 48rem) {
		.kol-table__cell {
			padding-inline: var(--fink-space-2) var(--fink-space-3);
			word-break: normal;
			overflow-wrap: normal;
			hyphens: manual;
		}
		.kol-table__cell--header {
			white-space: nowrap;
		}
	}
}`;

/*
 * Gemeinsame Basis aller Nachbau-Skins. Sie bildet die Fink-Markenregeln nach, bezieht ihre
 * Werte aber aus den Skin-Tokens des jeweiligen Systems: Radius, Fokus und Farben wechseln
 * mit dem Skin, die Regeln selbst bleiben gleich. Keine Literale, nur Token-Referenzen.
 */
const baseOverrides: Record<string, string> = {
	GLOBAL: `
@layer kol-theme-global {
	:host {
		--fink-focus-ring: 0 0 0 3px color-mix(in srgb, var(--fink-focus-color) 35%, transparent);
	}
}`,
	'KOL-BUTTON': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-md);
	}
	.kol-button {
		font-weight: var(--fink-font-weight-medium);
		transition: background-color var(--fink-motion-duration-fast) var(--fink-motion-easing), box-shadow var(--fink-motion-duration-fast) var(--fink-motion-easing);
	}
	.kol-button:focus-visible,
	.kol-button__interactive-element:focus-visible {
		box-shadow: var(--fink-focus-ring);
	}
}`,
	'KOL-CARD': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-lg);
	}
	.kol-card {
		border-color: var(--fink-color-mute-variant);
		box-shadow: var(--fink-elevation-1);
	}
}`,
	'KOL-ALERT': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-md);
	}
}`,
	'KOL-BADGE': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-pill);
	}
	.kol-badge {
		font-weight: var(--fink-font-weight-medium);
	}
}`,
	'KOL-INPUT-CHECKBOX': `
@layer kol-theme-component {
	.kol-input-checkbox--variant-button .kol-field-control__input {
		border-radius: var(--fink-radius-pill) 0 0 var(--fink-radius-pill);
	}
	.kol-input-checkbox--variant-button .kol-field-control__label {
		border-radius: 0 var(--fink-radius-pill) var(--fink-radius-pill) 0;
	}
	.kol-input-checkbox--variant-button:not(:has(.kol-checkbox__input:checked)) .kol-field-control__input {
		width: var(--fink-space-4);
		min-width: 0;
	}
	.kol-input-checkbox--variant-button:not(:has(.kol-checkbox__input:checked)) .kol-checkbox {
		width: 0;
		min-width: 0;
		overflow: clip;
	}
}`,
	'KOL-MODAL': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-lg);
	}
}`,
	'KOL-TABLE-STATELESS': narrowTable,
	'KOL-TABLE-STATEFUL': narrowTable,
	/* Dateiname und Hinweis brechen um, statt mit „…“ gekürzt zu werden (WCAG 1.4.4, 1.4.10, 1.4.12). */
	'KOL-INPUT-FILE': `
@layer kol-theme-component {
	.kol-input-container__filename {
		min-width: 0;
		overflow: visible;
		white-space: normal;
		text-overflow: clip;
		overflow-wrap: anywhere;
	}
}`,
	'KOL-DRAWER': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-lg);
	}
}`,
};

interface ReplicaOptions {
	/** Abweichende Button-Form; „pill“ für Systeme mit pillenförmigen Buttons (d-you). */
	buttonRadius?: 'md' | 'pill';
}

const replicaTheme = (name: FinkSystemName, options: ReplicaOptions = {}): typeof DEFAULT => (patch) =>
	DEFAULT((_n, map, themeOptions, features) => {
		const overrides: Record<string, string> = { ...baseOverrides };
		overrides['KOL-BUTTON'] = options.buttonRadius === 'pill'
			? baseOverrides['KOL-BUTTON'].replace('--border-radius: var(--fink-radius-md);', '--border-radius: var(--fink-radius-pill);')
			: baseOverrides['KOL-BUTTON'];
		const merged: Record<string, string | undefined> = { ...map };
		for (const [key, css] of Object.entries(overrides)) {
			merged[key] = `${merged[key] ?? ''}\n${css}`;
		}
		return patch(name, merged as ThemeMap, themeOptions, features);
	});

export const PORSCHE = replicaTheme('porsche');
export const SCALE = replicaTheme('scale');
export const IX = replicaTheme('ix');
export const DB = replicaTheme('db');
export const POST = replicaTheme('post');
export const BALOISE = replicaTheme('baloise');
export const TEGEL = replicaTheme('tegel');
export const INFINEON = replicaTheme('infineon');
export const SIX = replicaTheme('six');
export const KERN = replicaTheme('kern');
export const DYOU = replicaTheme('dyou', { buttonRadius: 'pill' });

export const SYSTEM_THEMES: Record<FinkSystemName, typeof DEFAULT> = {
	porsche: PORSCHE,
	scale: SCALE,
	ix: IX,
	db: DB,
	post: POST,
	baloise: BALOISE,
	tegel: TEGEL,
	infineon: INFINEON,
	six: SIX,
	kern: KERN,
	dyou: DYOU,
};

/**
 * Hängt die Token-Declarations aller Nachbau-Skins als Stylesheet ans Dokument, skoped über
 * data-theme. Die Anwendung kann damit mehrere Skins nebeneinander zeigen: Ein Container mit
 * data-theme="porsche" stylt alle Fink- und KoliBri-Komponenten darin im Porsche-Look.
 */
export const injectSystemTokens = (doc: Document = document): void => {
	if (doc.getElementById(TOKENS_STYLE_ID)) return;
	const style = doc.createElement('style');
	style.id = TOKENS_STYLE_ID;
	style.textContent = FINK_SYSTEM_NAMES.map((name) => `[data-theme="${name}"] {\n${systemDeclarations[name]}\n}`).join('\n');
	doc.head.prepend(style);
};
