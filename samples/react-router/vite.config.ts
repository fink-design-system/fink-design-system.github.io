import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// Für die Galerie der Website: Unterpfad aus SAMPLE_BASE.
	base: process.env.SAMPLE_BASE ?? '/',
	// fink.css nutzt light-dark(); ein älteres CSS-Ziel ersetzt es durch eine Form, die das Fink-Theme bricht.
	build: { cssTarget: ['chrome123', 'edge123', 'firefox120', 'safari17.5'] },
	plugins: [reactRouter()],
	resolve: {
		// The linked @fink-ui/react adapter must use the app's React, not its own copy.
		dedupe: ['react', 'react-dom'],
	},
});
