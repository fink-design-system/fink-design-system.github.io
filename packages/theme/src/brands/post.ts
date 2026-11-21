import { INPUT_COMPONENTS, focusColor, forComponents, mergeOverrides, neutralTableHeader, sharedOverrides, slimInputs, tintedAlert } from '../overrides.js';

/** Buttons: fettes Textgewicht, Sekundär/Normal als getönte Fläche, Primär dunkel auf Postgelb. */
const buttons = (b: '.kol-button' | '.kol-link') => `
@layer kol-theme-component {
	${b}__text {
		font-weight: var(--fink-font-weight-medium);
		transition: background-color var(--fink-motion-duration-fast) var(--fink-motion-easing), box-shadow var(--fink-motion-duration-fast) var(--fink-motion-easing);
	}
	${b}--secondary,
	${b}--normal {
		--text-background-color: var(--fink-color-mute);
		--text-border-color: var(--fink-color-mute);
		--text-color: var(--fink-color-text);
	}
	/* Postgelb trägt weder hellen noch dunklen Text in beiden Schemata: hell → Tinte, dunkel →
	   der dunkle Light-Token (Sandgrau). light-dark() macht den Button-Text schemaabhängig. */
	${b}--primary {
		--text-color: light-dark(var(--fink-color-ink), var(--fink-color-light));
	}
}`;

/**
 * Stil-Adaption „Swiss Post Design System“: Postgelb als Markenkern auf warmer Sandgrau-Skala,
 * schwarzer Text, kräftige Gewichte, getönte Hinweise. Werte aus src/themes/post.json in
 * @fink/tokens (Quelle: Tokens-Studio-Export von swisspost/design-system); Swiss Post Sans ist
 * ersetzt. Post dokumentiert keine Fokusfarbe; der Umriss nutzt einen neutralen Dunkelton.
 */
export const postOverrides = mergeOverrides(sharedOverrides, forComponents(INPUT_COMPONENTS, slimInputs('var(--fink-radius-md)')), {
	GLOBAL: focusColor,
	'KOL-BUTTON': buttons('.kol-button'),
	'KOL-LINK-BUTTON': buttons('.kol-link'),
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
		--border-radius: var(--fink-radius-lg);
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
