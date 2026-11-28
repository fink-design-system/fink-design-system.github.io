import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/*
 * light-dark() darf nicht heruntertransformiert werden: Ein Downlevel ersetzt es durch
 * prefers-color-scheme und ignoriert damit color-scheme. Deshalb ein cssTarget mit nativer
 * light-dark()-Unterstützung.
 */
const modernCss = ['chrome123', 'edge123', 'firefox120', 'safari17.5'];

export default defineConfig({
	// Für GitHub Pages: Basis-Pfad des Repos, z. B. /fink/ (per Umgebungsvariable aus dem Workflow).
	base: process.env.FINK_BASE ?? '/',
	plugins: [react()],
	build: {
		target: 'es2022',
		cssTarget: modernCss,
		chunkSizeWarningLimit: 4000,
	},
	optimizeDeps: {
		// Der Stencil-Lazy-Loader von KoliBri lädt seine Chunks relativ zu import.meta.url.
		exclude: ['@public-ui/components'],
	},
});
