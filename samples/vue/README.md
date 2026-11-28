# Vue sample

Vue 3 with Vite, using the adapter `@fink-ui/vue`.

```bash
pnpm start   # Vite dev server
```

## How the library is included

1. **Dependency:** `package.json` lists `@fink-ui/vue` only (plus `vue`). `@fink-ui/components`, KoliBri and the theme come with the adapter.
2. **Stylesheet:** `src/main.ts` imports the document stylesheet. Vite bundles its fonts and icons:

   ```ts
   import '@fink-ui/vue/fink.css';
   ```

3. **Registration:** `src/main.ts` calls `defineCustomElements` once before `createApp`:

   ```ts
   import { defineCustomElements } from '@fink-ui/vue';

   await defineCustomElements();
   createApp(App).mount('#app');
   ```

4. **Usage:** `src/App.vue` imports components and types from `@fink-ui/vue`, e.g. `FinkPageHeader`, `FinkTaskList`, `FinkAlert` and `FinkTask`. KoliBri components are called `Fink*`. Objects such as `_on` are bound with `:_on`, events with `@finkTaskSelect`.
5. **Vite:** `vite.config.ts` sets `resolve.dedupe: ['vue']`, so the linked adapter uses the same Vue instance as the app.
