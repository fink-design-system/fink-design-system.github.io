import '@fink-ui/vue/fink.css';
import { defineCustomElements } from '@fink-ui/vue';
import { createApp } from 'vue';

import App from './App.vue';

// The library registers its own components and KoliBri as fink-* elements with the Fink theme.
await defineCustomElements();
createApp(App).mount('#app');
