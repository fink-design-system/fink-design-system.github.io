import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		// The linked @fink-ui/react adapter must use the app's React, not its own copy.
		dedupe: ['react', 'react-dom'],
	},
});
