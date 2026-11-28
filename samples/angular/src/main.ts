import { bootstrapApplication } from '@angular/platform-browser';
import { defineCustomElements } from '@fink-ui/angular';

import { App } from './app/app';

// The library registers its own components and KoliBri as fink-* elements with the Fink theme.
await defineCustomElements();
await bootstrapApplication(App);
