import { INPUT_COMPONENTS, focusColor, forComponents, mergeOverrides, neutralTableHeader, sharedOverrides, slimInputs, tintedAlert } from '../overrides.js';

/**
 * Buttons: Gent trennt Linkfarbe (Blau #005ba9) und Primär-Button (dunkles Gent-Blau #001823).
 * Der Primär-Button bekommt deshalb die Textfarbe als Fläche; Sekundär bleibt Kontur in Textfarbe.
 */
const buttons = (b: '.kol-button' | '.kol-link') => `
@layer kol-theme-component {
	${b}__text {
		font-weight: var(--fink-font-weight-regular);
		transition: background-color var(--fink-motion-duration-fast) var(--fink-motion-easing), box-shadow var(--fink-motion-duration-fast) var(--fink-motion-easing);
	}
	${b}--primary {
		--text-background-color: var(--fink-color-text);
		--text-border-color: var(--fink-color-text);
		--text-color: var(--fink-color-light);
	}
	${b}--secondary,
	${b}--normal {
		--text-background-color: transparent;
		--text-border-color: var(--fink-color-text);
		--text-color: var(--fink-color-text);
	}
	/* Danger #d30c2e trägt hellen Text in beiden Schemata (4,6:1). */
	${b}--danger {
		--text-color: light-dark(var(--fink-color-light), var(--fink-color-text));
	}
}`;

/**
 * Stil-Adaption „Styleguide Stadt Gent“: dunkles Gent-Blau als Button-Fläche, Blau als Linkfarbe,
 * eckige Formen, Fira Sans, Danger #d30c2e. Werte aus dem kompilierten CSS von
 * gent_styleguide 7.2.6.
 */
export const gentOverrides = mergeOverrides(sharedOverrides, forComponents(INPUT_COMPONENTS, slimInputs('var(--fink-radius-md)')), {
	GLOBAL: focusColor,
	'KOL-BUTTON': buttons('.kol-button'),
	'KOL-LINK-BUTTON': buttons('.kol-link'),
	/* Links folgen dem dokumentierten Gent-Blau, nicht der dunklen Button-Fläche. */
	'KOL-LINK': `
@layer kol-theme-component {
	a {
		color: light-dark(var(--fink-color-primary), var(--fink-color-primary));
	}
}`,
	'KOL-TABLE-STATELESS': neutralTableHeader('var(--fink-color-mute)'),
	'KOL-TABLE-STATEFUL': neutralTableHeader('var(--fink-color-mute)'),
	'KOL-ALERT': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-md);
	}
}
${tintedAlert}`,
	'KOL-CARD': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-md);
	}
	.kol-card {
		border-color: var(--fink-color-mute-variant);
		box-shadow: none;
	}
}`,
	'KOL-BADGE': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-md);
	}
}`,
	'KOL-MODAL': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-md);
	}
}`,
	'KOL-DRAWER': `
@layer kol-theme-component {
	:host {
		--border-radius: var(--fink-radius-md);
	}
}`,
});
