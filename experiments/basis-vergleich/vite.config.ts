import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
// @ts-expect-error Skript ohne Typdeklaration
import { kolibriIconPrune } from './scripts/kolibri-icon-prune.mjs';
// @ts-expect-error Skript ohne Typdeklaration
import { kolibriAnalyseSplit } from './scripts/kolibri-analyse-split.mjs';

/**
 * KOLIBRI_BUILD wählt die KoliBri-Fassung:
 * - nicht gesetzt: wie Fink heute, KoliBri 4.7.0-rc.0 (alle Seiten, dist)
 * - slim: KoliBri 4.7.0-rc.0, im Theme nur die genutzten Icons (dist-slim)
 * - 4.5: KoliBri 4.5.0 (dist-4.5)
 * - 4.6: KoliBri 4.6.0 (dist-4.6)
 * 4.5 und 4.6 liegen unter .kolibri/<version>, vorbereitet mit `pnpm kolibri:versions`.
 */
const flavor = process.env.KOLIBRI_BUILD ?? '';
const slim = flavor === 'slim';
const version = flavor === '4.5' || flavor === '4.6' ? flavor : '';
const versionDir = version ? resolve(import.meta.dirname, `.kolibri/${version}/node_modules/@public-ui`) : '';

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
	resolve: versionDir
		? {
				alias: [
					{ find: /^@public-ui\/components(?=\/|$)/, replacement: `${versionDir}/components` },
					{ find: /^@public-ui\/theme-default(?=\/|$)/, replacement: `${versionDir}/theme-default` },
				],
			}
		: undefined,
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
