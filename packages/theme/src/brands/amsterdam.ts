import { INPUT_COMPONENTS, focusColor, forComponents, mergeOverrides, neutralTableHeader, sharedOverrides, slimInputs, tintedAlert } from '../overrides.js';

/** Buttons: Sekundär/Normal als 2-px-Kontur in Interaktionsfarbe (light-dark schemaabhängig). */
const buttons = (b: '.kol-button' | '.kol-link') => `
@layer kol-theme-component {
	${b}__text {
		font-weight: var(--fink-font-weight-medium);
		transition: background-color var(--fink-motion-duration-fast) var(--fink-motion-easing), box-shadow var(--fink-motion-duration-fast) var(--fink-motion-easing);
	}
	${b}--secondary,
	${b}--normal {
		--text-background-color: transparent;
		--text-border-color: light-dark(var(--fink-color-primary), var(--fink-color-text));
		--text-color: light-dark(var(--fink-color-primary), var(--fink-color-text));
	}
	/* Primär/Danger: weißer Text in beiden Schemata (Amsterdam-Blau und -Rot sind dunkel genug). */
	${b}--primary,
	${b}--danger {
		--text-color: light-dark(var(--fink-color-light), var(--fink-color-text));
	}
}`;

/**
 * Stil-Adaption „Amsterdam Design System“ (Stadt Amsterdam): eckige Formen (Radius 0), 2 px
 * Konturen, Amsterdam-Blau als Interaktionsfarbe, Amsterdam-Rot als Fehlerfarbe, body-Text fluid
 * vergrößert. Werte aus @amsterdam/design-system-tokens 4.4.0; „Amsterdam Sans“ wird durch den
 * Fallback-Stack ersetzt. Ein Dunkelschema ist im Original nicht definiert — Dark-Werte abgeleitet.
 */
export const amsterdamOverrides = mergeOverrides(sharedOverrides, forComponents(INPUT_COMPONENTS, slimInputs('var(--fink-radius-md)')), {
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
		--border-radius: var(--fink-radius-pill);
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
