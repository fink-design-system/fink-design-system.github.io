import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
// @ts-expect-error Skript ohne Typdeklaration
import { kolibriIconPrune } from './scripts/kolibri-icon-prune.mjs';
// @ts-expect-error Skript ohne Typdeklaration
import { kolibriAnalyseSplit } from './scripts/kolibri-analyse-split.mjs';

/** Mit KOLIBRI_SLIM=1 entsteht die schlanke KoliBri-Variante in dist-slim (nur genutzte Icons im Theme). */
const slim = process.env.KOLIBRI_SLIM === '1';

/** Mit ANALYZE=<seite> wird nur diese Seite gebaut und eine Treemap nach analyse/ geschrieben. */
const analyze = process.env.ANALYZE;

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
		...(analyze
			? [
					kolibriAnalyseSplit(),
					visualizer({
						filename: `analyse/${analyze}${slim ? '-schlank' : ''}.html`,
						title: `Basisvergleich: ${analyze}${slim ? ' (schlank)' : ''}`,
						template: 'treemap',
						gzipSize: true,
					}),
				]
			: []),
	],
	build: {
		outDir: analyze ? `dist-analyse/${analyze}${slim ? '-schlank' : ''}` : slim ? 'dist-slim' : 'dist',
		sourcemap: process.env.SOURCEMAP === '1',
		chunkSizeWarningLimit: 20000,
		rollupOptions: {
			input: analyze
				? { [analyze]: resolve(import.meta.dirname, `${analyze}.html`) }
				: slim
				? { kolibri: resolve(import.meta.dirname, 'kolibri.html') }
				: {
						index: resolve(import.meta.dirname, 'index.html'),
						kolibri: resolve(import.meta.dirname, 'kolibri.html'),
						'react-aria': resolve(import.meta.dirname, 'react-aria.html'),
						lion: resolve(import.meta.dirname, 'lion.html'),
					},
		},
	},
});
