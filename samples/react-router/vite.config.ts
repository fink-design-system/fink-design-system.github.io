import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	// Für die Galerie der Website: Unterpfad aus SAMPLE_BASE.
	base: process.env.SAMPLE_BASE ?? '/',
	plugins: [reactRouter()],
	resolve: {
		// The linked @fink-ui/react adapter must use the app's React, not its own copy.
		dedupe: ['react', 'react-dom'],
	},
});
