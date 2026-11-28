import { defineCustomElements } from '@fink-ui/vue';

// Registers KoliBri and the own components as fink-* with the Fink theme, in the browser and before the app mounts.
export default defineNuxtPlugin(async () => {
	await defineCustomElements();
});
