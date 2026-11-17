import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	build: {
		chunkSizeWarningLimit: 20000,
		rollupOptions: {
			input: {
				index: resolve(import.meta.dirname, 'index.html'),
				kolibri: resolve(import.meta.dirname, 'kolibri.html'),
				'react-aria': resolve(import.meta.dirname, 'react-aria.html'),
				lion: resolve(import.meta.dirname, 'lion.html'),
			},
		},
	},
});
