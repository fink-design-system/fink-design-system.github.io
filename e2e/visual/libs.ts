/**
 * Je Nachbau-Theme das zugehörige Original-Design-System: CDN-Bootstrap, Ready-Bedingung und die
 * Markup-Schnipsel der verglichenen Elemente. Die Schnipsel heißen gleich wie die Fink-Seite und
 * landen in gleich großen Zellen (170 × 44 px), damit die Screenshots pixelvergleichbar sind.
 *
 * Nicht every Theme hat ein per CDN ladbares Original: d-you existiert nur als KoliBri-PR,
 * Swiss Post bietet kein Web-Component-Paket — dafür stehen die Tests aus (TODO).
 */
export type VisualTheme = 'porsche' | 'telekom' | 'siemens-ix' | 'db' | 'post' | 'baloise' | 'tegel' | 'infineon' | 'six' | 'kern' | 'dyou';

export interface VisualLib {
	theme: VisualTheme;
	/** CSS-Ressourcen des Originals (als HTML-Zeichenkette). */
	head: string;
	/**
	 * Scripts des Originals; über createElement eingehängt, weil insertAdjacentHTML erzeugte
	 * Script-Tags vom Browser nicht ausgeführt werden.
	 */
	scripts?: Array<{ type?: 'module'; src?: string; code?: string }>;
	/** Ausdruck, der wahr wird, sobald das Original-Element registriert ist (CSS-only: true). */
	ready: string;
	/** Init-Code (nach Scripts, vor Screenshots), z. B. Stencil-Loader-Aufrufe. */
	init?: string;
	/** Zweite Ready-Bedingung nach dem Init (z. B. Porsche lädt Elemente erst nach load()). */
	postReady?: string;
	/** Grund, warum das Original (noch) keinen gültigen Vergleich erlaubt; der Test skipped dann. */
	todo?: string;
	/** data-element → Markup-Schnipsel des Originals. */
	cells: Record<string, string>;
}

export const VISUAL_LIBS: VisualLib[] = [
	{
		theme: 'porsche',
		todo: 'Die Komponenten laden unstyled — PDS injiziert die Styles nicht über die CDN-Variante; Bootstrap nach PDS-Doku nachbauen.',
		head: '',
		scripts: [{ src: 'https://cdn.jsdelivr.net/npm/@porsche-design-system/components-js@4.10.1/index.js' }],
		ready: "!!(window.PORSCHE_DESIGN_SYSTEM ?? window.porscheDesignSystem)",
		init: 'await (window.PORSCHE_DESIGN_SYSTEM ?? window.porscheDesignSystem).load();',
		postReady: "!!customElements.get('p-button')",
		cells: {
			'button-primary': '<p-button variant="primary">Primary</p-button>',
			'button-secondary': '<p-button variant="secondary">Secondary</p-button>',
		},
	},
	{
		theme: 'siemens-ix',
		todo: 'ix-button rendert im CDN-Setup eine Kontur-Taste statt der gefüllten Primary-Variante — Variant-API/Theme-Klassen gegen die IX-Doku prüfen.',
		head: [
			'<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@siemens/ix@5.3.0/dist/siemens-ix/siemens-ix.css">',
			'<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@siemens/ix@5.3.0/dist/siemens-ix/theme/classic-light.css">',
		].join('\n'),
		scripts: [{ type: 'module', code: 'import { defineCustomElements } from "https://cdn.jsdelivr.net/npm/@siemens/ix@5.3.0/loader/index.js"; defineCustomElements();' }],
		ready: "!!customElements.get('ix-button')",
		cells: {
			'button-primary': '<ix-button variant="primary">Primary</ix-button>',
			'button-secondary': '<ix-button variant="secondary">Secondary</ix-button>',
		},
	},
	{
		theme: 'db',
		todo: 'db-button rendert unstyled — die Style-Auslieferung der @db-ux-Pakete läuft nicht über den CDN-Loader; Einbindung nach DB-Doku nachbauen.',
		head: [
			'<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@db-ux/core-components@6.4.1/build/styles/index.css">',
			'<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@db-ux/core-components@6.4.1/build/components/button/button.css">',
		].join('\n'),
		scripts: [{ type: 'module', code: 'import { defineCustomElements } from "https://cdn.jsdelivr.net/npm/@db-ux/wc-core-components@6.4.1/dist/esm/loader.js"; defineCustomElements(window);' }],
		ready: "!!customElements.get('db-button')",
		cells: {
			'button-primary': '<db-button variant="solid">Primary</db-button>',
			'button-secondary': '<db-button variant="outlined">Secondary</db-button>',
		},
	},
	{
		theme: 'baloise',
		todo: 'Der CDN-Loader definiert bal-button, hydriert aber nicht zuverlässig (Shadow-Root bleibt leer) — Bootstrap nach Baloise-Doku nachbauen.',
		head: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@baloise/design-system-tokens@15.2.4/dist/tokens.css">',
		scripts: [{ type: 'module', code: 'import { defineCustomElements } from "https://cdn.jsdelivr.net/npm/@baloise/design-system-components@15.2.4/dist/esm/loader.js"; defineCustomElements(window);' }],
		ready: "!!customElements.get('bal-button')",
		cells: {
			'button-primary': '<bal-button color="primary">Primary</bal-button>',
			'button-secondary': '<bal-button color="secondary">Secondary</bal-button>',
		},
	},
	{
		theme: 'infineon',
		head: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@infineon/design-system@42.4.4/dist/infineon-design-system-stencil/infineon-design-system-stencil.css">',
		scripts: [{ type: 'module', code: 'import { defineCustomElements } from "https://cdn.jsdelivr.net/npm/@infineon/design-system@42.4.4/dist/esm/loader.js"; defineCustomElements(window);' }],
		ready: "!!customElements.get('ifx-button')",
		cells: {
			'button-primary': '<ifx-button variant="primary">Primary</ifx-button>',
			'button-secondary': '<ifx-button variant="secondary">Secondary</ifx-button>',
		},
	},
	{
		theme: 'kern',
		head: '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@kern-ux/native@2.3.0/dist/kern.css">',
		ready: 'true',
		cells: {
			'button-primary': '<button class="kern-btn kern-btn--primary">Primary</button>',
			'button-secondary': '<button class="kern-btn kern-btn--secondary">Secondary</button>',
		},
	},
];
