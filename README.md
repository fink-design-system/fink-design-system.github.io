# Fink Design System

Fink basiert wie [KoliBri](https://public-ui.github.io/) vollständig auf dem Web-Components-Standard. In jedem
webbasierten Ansatz sind alle Komponenten robust wiederverwendbar: semantisch, im Verhalten und im Corporate Design.

Dieses Repository enthält die Doku-Website ([fink-design-system.github.io](https://fink-design-system.github.io/)) und
die Integrationsbeispiele. Die Komponenten kommen aus npm.

| Ordner                 | Inhalt                                                                         |
| ---------------------- | ------------------------------------------------------------------------------ |
| [`website`](./website) | Doku-Website: Grundlagen, Theming, Katalog, Patterns, Kompositionen, a11y-Tests |
| [`samples`](./samples) | HTML, React, Vue, Angular, Next.js, React Router, Nuxt, Astro                  |

## Fink nutzen

Apps installieren den Adapter ihres Frameworks (oder `@fink-ui/components`) und laden ein Stylesheet, `fink.css`. Alle
Elemente heißen `fink-*`, in React, Vue und Angular heißen die Komponenten `Fink*` (`FinkButton`, `FinkStepper` …).

```bash
pnpm add @fink-ui/react
```

```tsx
import '@fink-ui/react/fink.css';
import { defineCustomElements, FinkButton, FinkTaskList } from '@fink-ui/react';

await defineCustomElements();
```

Schritt für Schritt für HTML, React, Vue und Angular:
[Getting Started](https://fink-design-system.github.io/#/getting-started).

## Lokal starten

```bash
pnpm install
pnpm --filter @fink-ui/website start      # Website unter http://localhost:5173
pnpm --filter @fink-ui/website test:a11y  # axe über alle Seiten, Sprachen, Farbschemata, Marken und Zustände
```

## Lizenz

[EUPL-1.2](LICENSE)
