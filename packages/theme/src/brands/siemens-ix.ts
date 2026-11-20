import { INPUT_COMPONENTS, focusColor, forComponents, mergeOverrides, neutralTableHeader, sharedOverrides, slimInputs } from '../overrides.js';

/** Button-Stil für kol-button (.kol-button) und kol-link-button (.kol-link): gleiche Varianten, andere Klassen. */
const buttons = (b: '.kol-button' | '.kol-link') => `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-sm);
	}
	${b}__text {
		font-weight: var(--fink-font-weight-bold);
		transition: background-color var(--fink-motion-duration-fast) var(--fink-motion-easing);
	}
	${b}--secondary,
	${b}--tertiary {
		--text-background-color: transparent;
		--text-border-color: var(--fink-color-primary);
		--text-color: var(--fink-color-primary);
	}
}`;

/**
 * Stil-Adaption „Siemens iX (Classic)“: dichte Oberfläche für Industrie-Software mit 32 px hohen
 * Bedienelementen (statt KoliBris 44 px; WCAG 2.2 AA verlangt 24 px), 2 px Radius für Buttons und Felder,
 * 4 px für Flächen, Sekundär-Button als Kontur in Primärfarbe, blauer Fokusring, Tabellenkopf auf
 * gedämpfter Fläche. Werte aus src/themes/siemens-ix.json in @fink/tokens.
 */
export const siemensIxOverrides = mergeOverrides(sharedOverrides, forComponents(INPUT_COMPONENTS, slimInputs('var(--fink-radius-sm)')), {
	GLOBAL: `
@layer kol-theme-global {
	:host {
		--a11y-min-size: 2rem;
	}
}
${focusColor}`,
	'KOL-TABLE-STATELESS': neutralTableHeader('var(--fink-color-mute)'),
	'KOL-TABLE-STATEFUL': neutralTableHeader('var(--fink-color-mute)'),
	'KOL-BUTTON': buttons('.kol-button'),
	'KOL-LINK-BUTTON': buttons('.kol-link'),
	'KOL-CARD': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-md);
	}
	.kol-card {
		border-color: var(--fink-color-mute-variant);
		box-shadow: var(--fink-elevation-1);
	}
}`,
	'KOL-BADGE': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-pill);
	}
}`,
});
