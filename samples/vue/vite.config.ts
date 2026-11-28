import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [vue()],
	resolve: {
		// The linked @fink-ui/vue adapter must use the app's Vue, not its own copy.
		dedupe: ['vue'],
	},
});
