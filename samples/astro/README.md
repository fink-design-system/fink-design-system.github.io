# Astro sample

Astro 7 with a static page, using `@fink-ui/components` directly. No adapter is needed: Astro renders the `fink-*` tags as plain HTML and the browser upgrades them.

```bash
pnpm start   # astro dev on http://localhost:4321
```

## How the library is included

1. **Dependency:** `package.json` lists `@fink-ui/components` only (plus `astro`). KoliBri and the theme are part of it.
2. **Stylesheet:** The frontmatter of `src/pages/index.astro` imports the document stylesheet. Astro bundles its fonts and icons:

   ```astro
   ---
   import '@fink-ui/components/dist/collection/fink.css';
   ---
   ```

3. **Registration:** A `<script>` in the page calls `defineCustomElements` in the browser. Astro bundles the script:

   ```ts
   import { defineCustomElements } from '@fink-ui/components/dist/loader/index.js';

   await defineCustomElements();
   ```

4. **Usage:** The page writes `<fink-page-header>` and `<fink-task-list>` as HTML; text props are attributes. The script sets objects such as `_label` on created elements as properties and listens to `finkTaskSelect` with `addEventListener`.
