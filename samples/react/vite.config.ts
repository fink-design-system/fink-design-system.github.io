import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	// fink.css nutzt light-dark(); ein älteres CSS-Ziel ersetzt es durch eine Form, die das Fink-Theme bricht.
	build: { cssTarget: ['chrome123', 'edge123', 'firefox120', 'safari17.5'] },
	plugins: [react()],
	resolve: {
		// The linked @fink-ui/react adapter must use the app's React, not its own copy.
		dedupe: ['react', 'react-dom'],
	},
});
