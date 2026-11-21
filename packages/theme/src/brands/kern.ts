import { INPUT_COMPONENTS, focusColor, forComponents, mergeOverrides, neutralTableHeader, sharedOverrides, slimInputs, tintedAlert } from '../overrides.js';

/** Buttons: normales Schriftgewicht (Fira Sans Regular), Sekundär/Normal als Kontur in Textfarbe. */
const buttons = (b: '.kol-button' | '.kol-link') => `
@layer kol-theme-component {
	${b}__text {
		font-weight: var(--fink-font-weight-regular);
		transition: background-color var(--fink-motion-duration-fast) var(--fink-motion-easing), box-shadow var(--fink-motion-duration-fast) var(--fink-motion-easing);
	}
	${b}--secondary,
	${b}--normal {
		--text-background-color: transparent;
		--text-border-color: var(--fink-color-text);
		--text-color: var(--fink-color-text);
	}
}`;

/**
 * Stil-Adaption „KERN UX“ (Schleswig-Holstein): Action-Blau, kompakte 2/4/8-px-Radien, Kontur-Buttons,
 * neutraler Tabellenkopf, getönte Hinweise. Werte aus src/themes/kern.json in @fink/tokens (Quelle:
 * @kern-ux/native 2.3.0, Fallback-Werte); Fira Sans ist frei verfügbar und bleibt erhalten. Das
 * Original setzt den Fokus als dreistufigen Box-Shadow; hier greift der outline-Fokus von KoliBri.
 */
export const kernOverrides = mergeOverrides(sharedOverrides, forComponents(INPUT_COMPONENTS, slimInputs('var(--fink-radius-md)')), {
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
