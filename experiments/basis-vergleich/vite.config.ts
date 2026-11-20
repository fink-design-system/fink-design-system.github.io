import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
// @ts-expect-error Skript ohne Typdeklaration
import { kolibriIconPrune } from './scripts/kolibri-icon-prune.mjs';
// @ts-expect-error Skript ohne Typdeklaration
import { kolibriAnalyseSplit } from './scripts/kolibri-analyse-split.mjs';
// @ts-expect-error Skript ohne Typdeklaration
import { kolibriLazyMarkdown } from './scripts/kolibri-lazy-markdown.mjs';

/**
 * KOLIBRI_BUILD wählt die KoliBri-Fassung:
 * - nicht gesetzt: wie Fink heute (alle vier Seiten, dist)
 * - slim: nur genutzte Icons im Theme (dist-slim)
 * - lazy: slim und markdown-it nur bei Bedarf (dist-lazy)
 * Seit KoliBri 4.6.0 liegt das Icon-CSS einmal in GLOBAL (public-ui/kolibri#11623); die früheren Fassungen
 * global und global-slim sind damit der Normalfall.
 */
const flavor = process.env.KOLIBRI_BUILD ?? '';
const slim = flavor === 'slim' || flavor === 'lazy';
const lazy = flavor === 'lazy';

/** Mit ANALYZE=<seite> wird nur diese Seite gebaut und eine Treemap nach analyse/ geschrieben. */
const analyze = process.env.ANALYZE;
const suffix = flavor ? `-${flavor}` : '';

/** Alle Codicons, die Fink in seinen Komponenten verwendet. */
export function finkCodicons(): string[] {
	const dir = resolve(import.meta.dirname, '../../packages/components/src/components');
	const names = new Set<string>();
	for (const entry of readdirSync(dir, { recursive: true, encoding: 'utf8' })) {
		if (!entry.endsWith('.tsx')) continue;
		for (const m of readFileSync(join(dir, entry), 'utf8').matchAll(/codicon-([a-z0-9-]+)/g)) names.add(m[1]);
	}
	return [...names];
}

export default defineConfig({
	plugins: [
		react(),
		...(slim ? [kolibriIconPrune(finkCodicons())] : []),
		...(lazy ? [kolibriLazyMarkdown()] : []),
		...(analyze
			? [
					kolibriAnalyseSplit(),
					visualizer({
						filename: `analyse/${analyze}${suffix}.html`,
						title: `Basisvergleich: ${analyze}${suffix}`,
						template: 'treemap',
						gzipSize: true,
					}),
				]
			: []),
	],
	build: {
		outDir: analyze ? `dist-analyse/${analyze}${suffix}` : `dist${suffix}`,
		sourcemap: process.env.SOURCEMAP === '1',
		chunkSizeWarningLimit: 20000,
		rollupOptions: {
			input: analyze
				? { [analyze]: resolve(import.meta.dirname, `${analyze}.html`) }
				: flavor
					? {
							kolibri: resolve(import.meta.dirname, 'kolibri.html'),
							'kolibri-no-badge': resolve(import.meta.dirname, 'kolibri-no-badge.html'),
							'kolibri-perf': resolve(import.meta.dirname, 'kolibri-perf.html'),
						}
					: {
							index: resolve(import.meta.dirname, 'index.html'),
							kolibri: resolve(import.meta.dirname, 'kolibri.html'),
							'kolibri-no-badge': resolve(import.meta.dirname, 'kolibri-no-badge.html'),
							'kolibri-perf': resolve(import.meta.dirname, 'kolibri-perf.html'),
							'react-aria': resolve(import.meta.dirname, 'react-aria.html'),
							lion: resolve(import.meta.dirname, 'lion.html'),
						},
		},
	},
});
