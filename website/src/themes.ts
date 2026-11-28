import { defineFinkTheme } from '@fink-ui/react';

/**
 * Demo für ein abgeleitetes Theme: übernimmt Tokens und Overrides von Fink und ändert nur Grüntöne,
 * Fokus und Radius. Erscheint im Theme-Umschalter und im Vergleich auf der Seite „Theming“.
 */
export const finkForest = defineFinkTheme({
	name: 'fink-forest',
	label: 'Fink Forest (abgeleitet)',
	extends: 'fink',
	description: 'Eigenes Theme, abgeleitet von Fink mit defineFinkTheme.',
	tokens: {
		color: {
			primary: { light: '#1d6b3c', dark: '#8fdcae' },
			'primary-variant': { light: '#14532d', dark: '#b9ecc9' },
			secondary: { light: '#e3f4e8', dark: '#1d3a28' },
			focus: { light: '#14532d', dark: '#b9ecc9' },
		},
		radius: { md: '6px', lg: '10px' },
	},
});

/** Eigene Themes der Website, angemeldet im FinkProvider. */
export const showcaseThemes = [finkForest];
