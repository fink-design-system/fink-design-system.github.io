# Next.js sample

Next.js 16 (App Router) with React 19, using the adapter `@fink-ui/react`.

```bash
pnpm start   # next dev on http://localhost:3000
```

## How the library is included

1. **Dependency:** `package.json` lists `@fink-ui/react` only (plus `next`, `react`, `react-dom`). `@fink-ui/components`, KoliBri and the theme come with the adapter.
2. **Stylesheet:** `app/layout.tsx` imports the document stylesheet. Next.js bundles its fonts and icons:

   ```ts
   import '@fink-ui/react/fink.css';
   ```

3. **Registration and client rendering:** The `fink-*` elements and their tag names exist in the browser only. `app/fink-app.tsx` therefore loads the app with `next/dynamic` and `ssr: false`, after `defineCustomElements` has registered KoliBri and the own components:

   ```tsx
   export const FinkApp = dynamic(
   	async () => {
   		const { defineCustomElements } = await import('@fink-ui/react');
   		await defineCustomElements();
   		return (await import('./app')).App;
   	},
   	{ ssr: false },
   );
   ```

4. **Usage:** `app/app.tsx` is a client component and uses `FinkPageHeader`, `FinkTaskList`, `FinkAlert` and `FinkTask` from `@fink-ui/react`, like the React sample.
