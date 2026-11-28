# Nuxt sample

Nuxt 4 with Vue 3 and server rendering, using the adapter `@fink-ui/vue`.

```bash
pnpm start   # nuxt dev on http://localhost:3001
```

## How the library is included

1. **Dependency:** `package.json` lists `@fink-ui/vue` only (plus `nuxt`, `vue`). `@fink-ui/components`, KoliBri and the theme come with the adapter.
2. **Stylesheet:** `nuxt.config.ts` adds the document stylesheet under `css`:

   ```ts
   css: ['@fink-ui/vue/fink.css'],
   ```

   The font URLs of the library start with `./assets`, and Nuxt resolves such URLs through its own `assets` alias. `nuxt.config.ts` therefore points that alias to the assets of the library; the path is derived from `@fink-ui/vue`, not hard-coded.

3. **Registration:** The client plugin `app/plugins/fink.client.ts` calls `defineCustomElements` in the browser before the app mounts:

   ```ts
   export default defineNuxtPlugin(async () => {
   	await defineCustomElements();
   });
   ```

4. **Client rendering:** The `fink-*` elements and their tag names exist in the browser only, so `app/app.vue` wraps the page in `<ClientOnly>`.
5. **Usage:** `app/app.vue` imports `FinkPageHeader`, `FinkTaskList`, `FinkAlert` and the types from `@fink-ui/vue`, like the Vue sample.
