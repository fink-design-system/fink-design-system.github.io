# React sample

React 19 with Vite, using the adapter `@fink-ui/react`.

```bash
pnpm start   # Vite dev server
```

## How the library is included

1. **Dependency:** `package.json` lists `@fink-ui/react` only (plus `react`, `react-dom`). `@fink-ui/components`, KoliBri and the theme come with the adapter.
2. **Stylesheet:** `src/main.tsx` imports the document stylesheet. Vite bundles its fonts and icons:

   ```ts
   import '@fink-ui/react/fink.css';
   ```

3. **Registration:** `src/main.tsx` calls `defineCustomElements` once before the first render. KoliBri and the own components are then registered as `fink-*` with the Fink theme:

   ```ts
   import { defineCustomElements } from '@fink-ui/react';

   await defineCustomElements();
   ```

4. **Usage:** `src/App.tsx` imports components and types from `@fink-ui/react`, e.g. `FinkPageHeader`, `FinkTaskList`, `FinkAlert` and `FinkTask`. KoliBri components are called `Fink*`, events `on<Event>` (`onFinkTaskSelect`).
5. **Vite:** `vite.config.ts` sets `resolve.dedupe: ['react', 'react-dom']`, so the linked adapter uses the same React instance as the app.
