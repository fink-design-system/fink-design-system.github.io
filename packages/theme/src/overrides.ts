/**
 * Marken-Overrides des Fink-Themes, angehängt an die Styles von @public-ui/theme-default.
 *
 * Farben, Schrift, Radius und Spacing kommen über die --kolibri-*-Hooks aus @fink/tokens.
 * Hier stehen nur Abweichungen, die sich nicht über Tokens ausdrücken lassen. Alle Regeln liegen
 * im Layer kol-theme-component und referenzieren ausschließlich Tokens (keine Literale, kein
 * color-scheme, kein !important).
 */
/*
 * Schmale Tabellen: Spalten werden nicht bis auf Silbenbreite gestaucht. Wörter bleiben ganz und
 * Kopfzellen einzeilig. Die Mindestbreite der Tabelle setzt die Anwendung über _minWidth
 * (KoliBri schreibt sie inline); den Rest übernimmt der Scroll-Container von KoliBri.
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
 * Host ohne eigenen Hintergrund: KoliBris Basis-Stil malt jeden Host in --kol-a11y-background-color.
 * Die Fläche gehört dem umgebenden Container, nicht der Komponente. Die Regel liegt in
 * kol-theme-component, damit sie auch Theme-Regeln auf :host schlägt. KOL-NAV bekommt sie zusätzlich,
 * weil das Default-Theme dort den Host einfärbt und sein Komponentenstil nach GLOBAL greift.
 */
const transparentHost = `
@layer kol-theme-component {
	:host {
		background: transparent;
	}
}`;

/** Nur die Host-Regel, für das zum Vergleich registrierte KoliBri-Default-Theme. */
export const hostOverrides: Record<string, string> = {
	GLOBAL: transparentHost,
	'KOL-NAV': transparentHost,
};

/** Fügt Override-Sätze zusammen; CSS gleicher Komponenten wird in Reihenfolge angehängt. */
export const mergeOverrides = (...sets: Array<Record<string, string>>): Record<string, string> => {
	const merged: Record<string, string> = {};
	for (const set of sets) {
		for (const [key, css] of Object.entries(set)) {
			merged[key] = merged[key] ? `${merged[key]}\n${css}` : css;
		}
	}
	return merged;
};

/**
 * Overrides, die für jedes Fink-Theme gelten (Fink und Marken-Themes): Verhalten und Barrierefreiheit,
 * keine Markenoptik.
 */
export const sharedOverrides: Record<string, string> = {
	GLOBAL: `
@layer kol-theme-global {
	:host {
		--fink-focus-ring: 0 0 0 3px color-mix(in srgb, var(--fink-focus-color) 35%, transparent);
	}
}
${transparentHost}`,
	'KOL-NAV': transparentHost,
	'KOL-INPUT-CHECKBOX': `
@layer kol-theme-component {
	/*
	 * Variante „button“ als Filter-Chip (fink-chip): Pill-Form; die Icon-Spalte erscheint nur im
	 * gewählten Zustand (Haken), ungewählt bleibt ein schmaler Innenabstand.
	 */
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
	/*
	 * Drawer-Labels sind im Default-Theme translucent gefärbt (Schwarz mit ~45 % Alpha) und liegen
	 * damit unterhalb der 4,5:1 des axe-Kontrastchecks. Volle Textfarbe stattdessen (WCAG 1.4.3).
	 * Ausnahme von der Kein-!important-Regel: die Label-Regel des Default-Themes hat höhere
	 * Spezifität und es gibt keinen Token-Angriffspunkt auf die Transparenz.
	 */
	'KOL-DRAWER': `
@layer kol-theme-component {
	.kol-drawer .kol-span__label {
		color: var(--fink-color-text) !important;
		opacity: 1 !important;
	}
}`,
	'KOL-TABLE-STATELESS': narrowTable,
	'KOL-TABLE-STATEFUL': narrowTable,
};

/*
 * Bausteine der Stil-Adaptionen (packages/theme/src/brands). Sie referenzieren nur Tokens.
 */

/**
 * Fokusfarbe aus color.focus. KoliBri setzt die Umrissfarbe in vielen Komponentenregeln mit höherer
 * Spezifität (outline: var(--color-primary-variant) …), die zugleich die Hover-Farbe ist. Die Regel steht
 * deshalb bewusst ohne Layer und ändert nur outline-color; ob und wie dick der Fokusring ist, bleibt bei KoliBri.
 */
export const focusColor = `
:focus,
:focus *,
:focus-within {
	outline-color: var(--fink-color-focus);
}`;

/** Neutraler Tabellenkopf statt der Primärfläche des KoliBri-Defaults; Zeilenlinien in Linienfarbe. */
export const neutralTableHeader = (background: string) => `
@layer kol-theme-component {
	.kol-table__cell {
		border-color: var(--fink-color-mute-variant);
	}
	.kol-table__cell--header {
		color: var(--fink-color-text);
		background-color: ${background};
		font-weight: var(--fink-font-weight-bold);
		border-color: var(--fink-color-text);
	}
}`;

/**
 * Alert-Karte als getönte Fläche mit Akzent-Icon statt farbigem Kopfbalken. Text bleibt in Textfarbe,
 * damit der Kontrast nicht von der Tonfarbe abhängt.
 */
export const tintedAlert = `
@layer kol-theme-component {
	.kol-alert--variant-card {
		--kol-surface: color-mix(in srgb, var(--alert-accent-color) 10%, var(--fink-color-light));
		background-color: var(--kol-surface);
		filter: none;
	}
	.kol-alert--variant-card .kol-alert__heading,
	.kol-alert--variant-card .kol-alert__closer.kol-button {
		color: var(--fink-color-text);
		--text-color: var(--fink-color-text);
	}
	.kol-alert--variant-card .kol-alert__icon {
		color: var(--alert-accent-color);
	}
	.kol-alert--variant-card .kol-alert__content {
		--kol-surface: transparent;
		background-color: transparent;
		color: var(--fink-color-text);
	}
}`;

/** Eingabefelder mit schmalem Rahmen (1 px statt KoliBris 2 px) und eigenem Radius. */
export const slimInputs = (radius: string) => `
@layer kol-theme-component {
	.kol-input-container {
		border-width: var(--fink-border-width);
		border-radius: ${radius};
	}
}`;

/** KoliBri-Komponenten mit Eingabefeld (.kol-input-container). */
export const INPUT_COMPONENTS = [
	'KOL-INPUT-COLOR',
	'KOL-INPUT-DATE',
	'KOL-INPUT-EMAIL',
	'KOL-INPUT-FILE',
	'KOL-INPUT-NUMBER',
	'KOL-INPUT-PASSWORD',
	'KOL-INPUT-TEXT',
	'KOL-SELECT',
	'KOL-SINGLE-SELECT',
	'KOL-COMBOBOX',
	'KOL-TEXTAREA',
] as const;

/** Wendet dasselbe CSS auf mehrere Komponenten an. */
export const forComponents = (keys: readonly string[], css: string): Record<string, string> => Object.fromEntries(keys.map((key) => [key, css]));

/** Markenoptik des Fink-Themes. */
const finkLook: Record<string, string> = {
	'KOL-BUTTON': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-pill);
	}
	.kol-button {
		height: var(--fink-control-height-md);
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
	'KOL-MODAL': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-lg);
	}
}`,
	'KOL-DRAWER': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-lg);
	}
}`,
};

export const overrides: Record<string, string> = mergeOverrides(sharedOverrides, finkLook);
