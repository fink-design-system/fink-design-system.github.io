import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

// fink.css of @fink-ui/vue imports the fonts of @fink-ui/components. Their URLs start with ./assets, which Nuxt resolves
// through its own `assets` alias, so the alias points to the assets of the library.
const require = createRequire(import.meta.url);
const components = dirname(createRequire(require.resolve('@fink-ui/vue/fink.css')).resolve('@fink-ui/components/package.json'));

export default defineNuxtConfig({
	compatibilityDate: '2026-11-01',
	alias: { assets: join(components, 'dist/collection/assets') },
	// One document stylesheet with fonts, icons and the page font of the Fink theme.
	css: ['@fink-ui/vue/fink.css'],
	app: {
		head: { title: 'Nuxt sample | Fink Design System', htmlAttrs: { lang: 'en' } },
	},
});
