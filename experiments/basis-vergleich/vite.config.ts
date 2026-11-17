import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { kolibriIconPrune } from './scripts/kolibri-icon-prune';

/** Mit KOLIBRI_SLIM=1 entsteht die schlanke KoliBri-Variante in dist-slim (nur genutzte Icons im Theme). */
const slim = process.env.KOLIBRI_SLIM === '1';

/** Alle Codicons, die Fink in seinen Komponenten verwendet. */
function finkCodicons(): string[] {
	const dir = resolve(import.meta.dirname, '../../packages/components/src/components');
	const names = new Set<string>();
	for (const entry of readdirSync(dir, { recursive: true, encoding: 'utf8' })) {
		if (!entry.endsWith('.tsx')) continue;
		for (const m of readFileSync(join(dir, entry), 'utf8').matchAll(/codicon-([a-z0-9-]+)/g)) names.add(m[1]);
	}
	return [...names];
}

export default defineConfig({
	plugins: [react(), ...(slim ? [kolibriIconPrune(finkCodicons())] : [])],
	build: {
		outDir: slim ? 'dist-slim' : 'dist',
		chunkSizeWarningLimit: 20000,
		rollupOptions: {
			input: slim
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
