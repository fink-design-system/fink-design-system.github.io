import { INPUT_COMPONENTS, focusColor, forComponents, mergeOverrides, neutralTableHeader, sharedOverrides, slimInputs, tintedAlert } from '../overrides.js';

/** Buttons: normales Schriftgewicht, Sekundär/Normal als Kontur, Danger dunkel auf Negative. */
const buttons = (b: '.kol-button' | '.kol-link') => `
@layer kol-theme-component {
	${b}__text {
		font-weight: var(--fink-font-weight-regular);
		transition: background-color var(--fink-motion-duration-fast) var(--fink-motion-easing), box-shadow var(--fink-motion-duration-fast) var(--fink-motion-easing);
	}
	${b}--secondary,
	${b}--normal {
		--text-background-color: transparent;
		--text-border-color: var(--fink-color-mute-variant);
		--text-color: var(--fink-color-text);
	}
	/* Tegel-Negative #ff2340 trägt hellen Text nur mit 3,3:1 — Danger-Button schemaabhängig dunkel. */
	${b}--danger {
		--text-color: light-dark(var(--fink-color-ink), var(--fink-color-light));
	}
}`;

/**
 * Stil-Adaption „Tegel“ (Scania Digital Design System): Scania-Blau als CTA, 8 px Radien,
 * Kontur-Buttons, neutraler Tabellenkopf, getönte Hinweise. Werte aus src/themes/tegel.json in
 * @fink/tokens (Quelle: color/_tokens.scss von scania-digital-design-system/tegel); Scania Sans
 * ist ersetzt.
 */
export const tegelOverrides = mergeOverrides(sharedOverrides, forComponents(INPUT_COMPONENTS, slimInputs('var(--fink-radius-md)')), {
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
