# React Router sample

React Router 8 in framework mode (the successor of Remix) with server rendering, using the adapter `@fink-ui/react`.

```bash
pnpm start   # react-router dev on http://localhost:5175
```

## How the library is included

1. **Dependency:** `package.json` lists `@fink-ui/react` only (plus `react-router`, `@react-router/node`, `react`, `react-dom`, `isbot`). `@fink-ui/components`, KoliBri and the theme come with the adapter.
2. **Stylesheet:** `app/root.tsx` imports the document stylesheet. Vite bundles its fonts and icons:

   ```ts
   import '@fink-ui/react/fink.css';
   ```

3. **Registration and client rendering:** The `fink-*` elements and their tag names exist in the browser only. The route `app/routes/home.tsx` registers the library in a `clientLoader` and renders nothing on the server (`HydrateFallback`). The page renders in the browser once the loader has finished:

   ```tsx
   export async function clientLoader() {
   	await defineCustomElements();
   	return null;
   }
   clientLoader.hydrate = true as const;

   export function HydrateFallback() {
   	return null;
   }
   ```

4. **Usage:** The route component uses `FinkPageHeader`, `FinkTaskList`, `FinkAlert` and `FinkTask` from `@fink-ui/react`, like the React sample.
5. **Vite:** `vite.config.ts` sets `resolve.dedupe: ['react', 'react-dom']`, so the linked adapter uses the same React instance as the app.
