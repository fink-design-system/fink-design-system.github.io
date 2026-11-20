import { INPUT_COMPONENTS, focusColor, forComponents, mergeOverrides, neutralTableHeader, sharedOverrides, slimInputs, tintedAlert } from '../overrides.js';

/** Button-Stil für kol-button (.kol-button) und kol-link-button (.kol-link): gleiche Varianten, andere Klassen. */
const buttons = (b: '.kol-button' | '.kol-link') => `
@layer kol-theme-component {
	${b}__text {
		font-weight: var(--fink-font-weight-regular);
		transition: background-color var(--fink-motion-duration-fast) var(--fink-motion-easing);
	}
	${b}--secondary,
	${b}--tertiary {
		--text-background-color: var(--fink-color-mute);
		--text-border-color: var(--fink-color-mute);
		--text-color: var(--fink-color-text);
	}
	${b}--normal {
		--text-border-color: var(--fink-color-mute-variant);
	}
}`;

/**
 * Stil-Adaption „Porsche Design System v4“: Schwarz/Weiß als Primärfarbe, 12 px Radius für Bedienelemente,
 * 24 px für Karten und Dialoge, Sekundär-Button als graue Fläche ohne Rahmen, normales Schriftgewicht,
 * blauer Fokusring, neutraler Tabellenkopf, getönte Hinweise. Werte aus src/themes/porsche.json in @fink/tokens.
 */
export const porscheOverrides = mergeOverrides(sharedOverrides, forComponents(INPUT_COMPONENTS, slimInputs('var(--fink-radius-md)')), {
	GLOBAL: focusColor,
	'KOL-TABLE-STATELESS': neutralTableHeader('var(--color-surface-current)'),
	'KOL-TABLE-STATEFUL': neutralTableHeader('var(--color-surface-current)'),
	'KOL-BUTTON': buttons('.kol-button'),
	'KOL-LINK-BUTTON': buttons('.kol-link'),
	'KOL-CARD': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-lg);
	}
	.kol-card {
		border-color: transparent;
		background-color: var(--fink-color-mute);
		box-shadow: none;
	}
}`,
	'KOL-ALERT': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-lg);
	}
}
${tintedAlert}`,
	'KOL-BADGE': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-pill);
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
