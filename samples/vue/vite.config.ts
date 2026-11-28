import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
	// fink.css nutzt light-dark(); ein älteres CSS-Ziel ersetzt es durch eine Form, die das Fink-Theme bricht.
	build: { cssTarget: ['chrome123', 'edge123', 'firefox120', 'safari17.5'] },
	plugins: [vue()],
	resolve: {
		// The linked @fink-ui/vue adapter must use the app's Vue, not its own copy.
		dedupe: ['vue'],
	},
});
