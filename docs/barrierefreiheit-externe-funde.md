# Barrierefreiheit: Funde außerhalb von Fink

Fink konsumiert KoliBri nur und forkt es nicht. Funde, deren Ursache in KoliBri oder in Prüfwerkzeugen liegt, werden
in Fink umgangen, solange es keinen Fix gibt, und sollten an die Hersteller gemeldet werden.
Ermittelt mit `pnpm lint` und `pnpm test:a11y`: axe-core mit WCAG 2.2 AA, EN 301 549 / BITV 2.0 und Best Practices.
Stand: KoliBri `@public-ui/components` 4.7.0-rc.0, axe-core 4.14.
Gemeldet in KoliBri-Epic [#11600](https://github.com/public-ui/kolibri/issues/11600), Fix-Ziel `release/4`.

| # | Ursache | Fund | Kriterium | Umgang in Fink | Status |
| - | ------- | ---- | --------- | -------------- | ------ |
| 1 | KoliBri 4.5.0 `kol-combobox` | Aufklapp-Button ohne zugänglichen Namen (axe `button-name`) | WCAG 4.1.2 | Upgrade auf 4.6.0. Dort hat der Button `aria-label`, `aria-expanded` und `aria-controls`. | in 4.6.0 behoben |
| 2 | KoliBri-Standardtexte | `filename-text` („Datei auswählen oder hier ablegen...“) und `action-running` enden auf Auslassungszeichen | Fink-Regel „keine Ellipsis“, WCAG 2.4.6 | `@fink/theme` übergibt eigene Texte ohne „...“ (`scripts/kolibri-locales.mjs`) | gemeldet: [#11601](https://github.com/public-ui/kolibri/issues/11601) |
| 3 | KoliBri `register({ translations })` | Eigene Übersetzungen **ersetzen** alle Standardtexte, statt sie zu ergänzen (`initializeI18n(lng, translations = TRANSLATIONS)`). Folge: rohe Schlüssel wie „kol-close“ oder „kol-form-description“ | WCAG 2.4.6, 4.1.2 | Fink erzeugt beim Build den vollständigen Textsatz aus der installierten Version; `pnpm locales:check` prüft ihn. Ab 4.6.0 nicht mehr nötig, bleibt wegen Fund 2. | in 4.6.0 behoben ([#11602](https://github.com/public-ui/kolibri/issues/11602), [#11608](https://github.com/public-ui/kolibri/pull/11608)) |
| 4 | KoliBri `kol-input-file` (Komponenten-CSS) | Dateiname mit `white-space: nowrap; text-overflow: ellipsis` gekürzt | WCAG 1.4.4, 1.4.10, 1.4.12 | Überschrieben im Theme (`packages/theme/src/overrides.ts`, `KOL-INPUT-FILE`): Text bricht um | gemeldet: [#11603](https://github.com/public-ui/kolibri/issues/11603) |
| 5 | KoliBri `kol-drawer` | Das innere `<dialog>` hat eine Box von 0×0 px, obwohl der Inhalt sichtbar ist. Beobachtung, kein axe-Fund. Kann Werkzeuge stören, die der Position des Dialogs folgen, etwa Bildschirmlupen. | – | keiner | beobachten; in KoliBri [#11527](https://github.com/public-ui/kolibri/issues/11527) (Cluster 5) mit betrachtet |
| 6 | eslint-plugin-jsx-a11y | Kennt einen fokussierbaren `separator` nicht als Widget (WAI-ARIA 1.2, APG „Window Splitter“) | – | Begründete Ausnahme in `fink-splitter` | Werkzeuglücke |

Kein KoliBri-Fund: Dass Anwendungen nach einem fehlgeschlagenen Absenden `focusErrorList()` aufrufen müssen, ist
dokumentiertes Verhalten von `kol-form` (auch in 4.5). Die Showcase tut das über `useFormErrorFocus`.

Bereits vorher bekannt (siehe README, „Bekannte Punkte“): Der React-Adapter `@public-ui/react-v19` setzt Props erst
nach dem Einhängen, und `kol-badge` akzeptiert keine `var()`.
