import { INPUT_COMPONENTS, focusColor, forComponents, mergeOverrides, neutralTableHeader, sharedOverrides, slimInputs, tintedAlert } from '../overrides.js';

/** Buttons: fettes Textgewicht (Baloise kennt 300/400/700), Sekundär/Normal als getönte Fläche ohne Kontur. */
const buttons = (b: '.kol-button' | '.kol-link') => `
@layer kol-theme-component {
	${b}__text {
		font-weight: var(--fink-font-weight-bold);
		transition: background-color var(--fink-motion-duration-fast) var(--fink-motion-easing), box-shadow var(--fink-motion-duration-fast) var(--fink-motion-easing);
	}
	${b}--secondary,
	${b}--normal {
		--text-background-color: var(--fink-color-mute);
		--text-border-color: var(--fink-color-mute);
		--text-color: var(--fink-color-text);
	}
}`;

/**
 * Stil-Adaption „Baloise Design System“: Baloise-Blau als Primärfarbe, kompakte 4-px-Radien für
 * Bedienelemente, 12 px für Karten und Dialoge, getönte Sekundärflächen, neutraler Tabellenkopf,
 * getönte Hinweise. Werte aus src/themes/baloise.json in @fink/tokens (Quelle:
 * @baloise/design-system-tokens); Schriften des Vorbilds sind ersetzt.
 */
export const baloiseOverrides = mergeOverrides(sharedOverrides, forComponents(INPUT_COMPONENTS, slimInputs('var(--fink-radius-md)')), {
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
		border-color: transparent;
		background-color: var(--fink-color-mute);
		box-shadow: none;
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
