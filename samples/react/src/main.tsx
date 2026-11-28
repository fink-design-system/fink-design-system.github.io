import '@fink-ui/react/fink.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { defineCustomElements } from '@fink-ui/react';

import { App } from './App';

// The library registers its own components and KoliBri as fink-* elements with the Fink theme.
await defineCustomElements();

createRoot(document.querySelector('#app')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
