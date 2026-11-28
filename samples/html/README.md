# HTML sample

Static page without framework and bundler. It loads the library straight from `node_modules`.

```bash
pnpm start   # http://localhost:8080
```

## How the library is included

1. **Dependency:** `package.json` lists `@fink-ui/components` only. KoliBri and the theme are part of it.
2. **Stylesheet:** `index.html` loads the document stylesheet of the library. It brings the icon fonts (Kolicons, Codicons, Font Awesome), the design tokens and the page font; the assets sit next to it in `dist/fink/assets/`:

   ```html
   <link rel="stylesheet" href="node_modules/@fink-ui/components/dist/fink/fink.css" />
   ```

3. **Components:** The ESM build registers the own components and KoliBri as `fink-*` with the Fink theme. No call to `defineCustomElements` is needed:

   ```html
   <script type="module" src="node_modules/@fink-ui/components/dist/fink/fink.esm.js"></script>
   ```

4. **Usage:** Text props are attributes in the HTML. `main.js` sets objects and functions such as `_on` as properties (`element._on = …`) and listens to events with `addEventListener('finkTaskSelect', …)`.
