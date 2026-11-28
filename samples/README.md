# Integration samples

All eight samples show the same start page: the own component `fink-page-header` in the style of the framework starters, with `fink-task-list` and its event inside. The README of each sample describes how the library and its assets are included.

| Sample                         | Integration                                                                               |
| ------------------------------ | ----------------------------------------------------------------------------------------- |
| [html](./html)                 | `<script type="module">` on `dist/fink/fink.esm.js`, no framework, no bundler             |
| [react](./react)               | `@fink-ui/react`: `FinkPageHeader`, `FinkTaskList`, `FinkButton` …                           |
| [vue](./vue)                   | `@fink-ui/vue`: `FinkPageHeader`, `FinkTaskList`, `FinkButton` …                             |
| [angular](./angular)           | `@fink-ui/angular`: `FinkPageHeader`, `FinkTaskList`, `FinkButton` (renders `fink-button`) … |
| [nextjs](./nextjs)             | `@fink-ui/react` with server rendering; the Fink part renders on the client (`ssr: false`)   |
| [react-router](./react-router) | `@fink-ui/react` in React Router framework mode (Remix); registered in a `clientLoader`      |
| [nuxt](./nuxt)                 | `@fink-ui/vue` with server rendering; client plugin and `<ClientOnly>`                       |
| [astro](./astro)               | `@fink-ui/components` directly; static `fink-*` HTML, registered by a page script            |

Each sample gets Fink from npm. Run `pnpm install` once in the root, then `pnpm start` in the sample folder. The website shows all samples live on its page “Starter”.

- Every app depends on its adapter only and includes exactly one stylesheet from it: `@fink-ui/react/fink.css`, `@fink-ui/vue/fink.css` or `@fink-ui/angular/fink.css` (fonts, icons, page font). The HTML and Astro samples use `@fink-ui/components` directly.
- Server rendering (Next.js, React Router, Nuxt): the `fink-*` elements and their tag names exist in the browser only, so these samples render the Fink part on the client after `defineCustomElements`.
- Props with objects or functions such as `_on` are bound as properties: Angular `[_on]`, Vue `:_on`, React `_on={…}`, plain HTML `element._on = …`.
- Events are camelCase (`finkTaskSelect`). The adapter exports their type, e.g. `FinkTaskListCustomEvent`.
