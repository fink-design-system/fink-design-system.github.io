import { INPUT_COMPONENTS, focusColor, forComponents, mergeOverrides, neutralTableHeader, sharedOverrides, slimInputs, tintedAlert } from '../overrides.js';

/** Button-Stil für kol-button (.kol-button) und kol-link-button (.kol-link): gleiche Varianten, andere Klassen. */
const buttons = (b: '.kol-button' | '.kol-link') => `
@layer kol-theme-component {
	${b}__text {
		font-weight: var(--fink-font-weight-medium);
		transition: background-color var(--fink-motion-duration-base) var(--fink-motion-easing);
	}
	${b}--secondary,
	${b}--normal {
		--text-background-color: transparent;
		--text-border-color: var(--fink-color-text);
		--text-color: var(--fink-color-text);
	}
}`;

/**
 * Stil-Adaption „Telekom Scale“: Magenta für Primäraktionen, 8 px Radius, fette Button-Beschriftung,
 * Sekundär-Button als Kontur in Textfarbe, blauer Fokusring, neutraler Tabellenkopf, getönte Hinweise.
 * Werte aus src/themes/telekom.json in @fink/tokens.
 */
export const telekomOverrides = mergeOverrides(sharedOverrides, forComponents(INPUT_COMPONENTS, slimInputs('var(--fink-radius-md)')), {
	GLOBAL: focusColor,
	'KOL-TABLE-STATELESS': neutralTableHeader('var(--color-surface-current)'),
	'KOL-TABLE-STATEFUL': neutralTableHeader('var(--color-surface-current)'),
	'KOL-BUTTON': buttons('.kol-button'),
	'KOL-LINK-BUTTON': buttons('.kol-link'),
	'KOL-ALERT': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-lg);
	}
}
${tintedAlert}`,
	'KOL-CARD': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-lg);
	}
	.kol-card {
		border-color: transparent;
		box-shadow: var(--fink-elevation-1);
	}
}`,
	'KOL-BADGE': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-sm);
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
});
