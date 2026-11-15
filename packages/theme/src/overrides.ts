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

export const overrides: Record<string, string> = {
	GLOBAL: `
@layer kol-theme-global {
	:host {
		--fink-focus-ring: 0 0 0 3px color-mix(in srgb, var(--fink-color-primary) 35%, transparent);
	}
}`,
	'KOL-BUTTON': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-pill);
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
	'KOL-MODAL': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-lg);
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
	'KOL-TABLE-STATELESS': narrowTable,
	'KOL-TABLE-STATEFUL': narrowTable,
	'KOL-DRAWER': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-lg);
	}
}`,
};
