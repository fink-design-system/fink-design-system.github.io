import { mergeOverrides, sharedOverrides } from '../overrides.js';

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
 * Nachbildung des Porsche Design System v4: Schwarz/Weiß als Primärfarbe, 12 px Radius für Bedienelemente,
 * 24 px für Karten und Dialoge, Sekundär-Button als graue Fläche ohne Rahmen, normales Schriftgewicht.
 * Farben, Radius und Schrift kommen aus src/themes/porsche.json in @fink/tokens.
 */
export const porscheOverrides = mergeOverrides(sharedOverrides, {
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
}`,
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
