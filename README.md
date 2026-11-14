# Fink Design System (Prototyp)

Ein Design System im Stil von MUI oder Vuetify auf Basis von [Public UI – KoliBri](https://public-ui.github.io).
KoliBri liefert die barrierefreien Atome (`kol-*`), Fink ergänzt Tokens, ein eigenes Theme, zusammengesetzte
Komponenten (`fink-*`) und eine React-Schicht. KoliBri wird nur konsumiert, nie geforkt.

## Pakete

| Paket              | Inhalt                                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `@fink/tokens`     | Design Tokens in `src/tokens.json` → `tokens.css` (CSS-Variablen, `light-dark()`), JS-Objekt, TS-Typen. Speist die `--kolibri-*`-Hooks von KoliBri. |
| `@fink/theme`      | KoliBri-Theme `FINK` (erweitert `@public-ui/theme-default`), `registerFink()`, CLI `fink-sync-icons`.        |
| `@fink/components` | 46 Stencil-Komponenten (App Shell, Page Header, Stat Card, Stepper, Chip, List, Menu, Tag Input, Calendar, Range Slider, Carousel, FAB, Transfer List, OTP Input, Image List, Tour, Virtual List, Bar Chart, Splitter …), intern aus KoliBri gebaut; eigene i18next-Instanz (de/en). |
| `@fink/react`      | Generierte React-Wrapper (`@stencil/react-output-target`), Re-Export von `@public-ui/react-v19`, `FinkProvider`, `useFink`, `useToast`. |
| `@fink/showcase`   | Doku-Website: Grundlagen, Theming, Katalog aller Fink- und KoliBri-Komponenten, 30 Patterns, sechs interaktive Kompositionen, Vergleich mit MUI/Vuetify/Material 3/Carbon/Ant, KoliBri-Nachnutzung. |

## Loslegen

```bash
pnpm install
pnpm build        # baut alle Pakete in Abhängigkeitsreihenfolge
pnpm dev          # Showcase unter http://localhost:5173
```

Nach Änderungen an `packages/*` das jeweilige Paket neu bauen (`pnpm --filter @fink/components build`),
der Showcase nutzt die gebauten Ausgaben.

## Patterns und Kompositionen

Die Showcase dokumentiert **30 Patterns** (Navigation & Struktur, Suche & Daten, Formulare & Eingabe, Feedback & Status),
abgeleitet aus Material Design 3, MUI, Vuetify, Carbon, GOV.UK, Atlassian, Ant Design und Polaris. Jedes Pattern hat
Live-Beispiel, Code (React und Web Component im `fink-code-block`), Einsatzregeln, Barrierefreiheit und Vorbilder.

Sechs **interaktive Kompositionen** zeigen die Patterns im Zusammenspiel: Förderportal (Sachbearbeitung), Online-Antrag
(Bürgersicht), Mein Konto, Hilfe-Center, Benutzerverwaltung und eine mobile Bürger-App.

## Vergleich mit den großen Design-Systemen

Die Seite „Vergleich“ (`#/compare`) stellt die Komponentenabdeckung von Fink neben MUI 7, Vuetify 3, Material 3,
Carbon v11 und Ant Design 5 – geordnet nach Verbreitung in drei Stufen (Grundbausteine, verbreitet, spezialisiert).
Die Daten stehen in `apps/showcase/src/catalog/benchmark.ts`; offene Lücken (Kaskadenauswahl, Erwähnungen, QR-Code;
Tooltips und Diagramme nur teilweise) sind dort bewusst markiert. Neue Fink-Komponenten entstehen in dieser
Reihenfolge: erst die verbreitetsten Lücken, KoliBri immer zuerst.

## KoliBri-Nachnutzung

Fink baut nur, was KoliBri nicht hat. Alle 50 KoliBri-Komponenten sind im Katalog dokumentiert und werden in Patterns,
Kompositionen, Doku oder als Innenleben von Fink-Komponenten genutzt. Die Seite „KoliBri-Nachnutzung“ ermittelt das zur
Build-Zeit aus dem Quellcode und begründet jede eigene Fink-Komponente.

## Mehrsprachigkeit (Deutsch / Englisch)

- Startsprache: gespeicherte Wahl, sonst `<html lang>`, sonst Browsersprache (`navigator.languages`), sonst Englisch
  (`detectFinkLanguage()`). Die Showcase setzt kein festes `lang` und folgt damit dem Browser.
- `@fink/components` hat eine eigene i18next-Instanz (Namespace `fink`), folgt `<html lang>` und rendert live neu.
  Weitere Sprachen: `addFinkTranslations(lng, resources)`.
- KoliBri übernimmt seine Sprache nur bei `register()` (`translation.name`). `FinkProvider` speichert die Wahl und lädt
  die Seite beim Wechsel neu (`reloadOnLanguageChange`).
- Die Showcase nutzt i18next mit react-i18next; deutsche Texte sind die Schlüssel, Englisch steht in
  `apps/showcase/src/i18n/en`.

## Vorbilder der Patterns

Jede Vorbild-Angabe (System + Bezeichnung) ist an einer Primärquelle geprüft: Carbon- und GOV.UK-Kataloge, die
Material-3-Referenz von Google (Jetpack Compose), MUI- und MUI-X-Doku, das Vuetify-Repository, die Ant-Design-Übersicht,
die Polaris-Doku (Quelldateien der Polaris-Website im Repository Shopify/polaris) und die Atlassian-Doku
(`atlassian.design/llms-components.txt`). Die Pattern-Seiten verlinken die Kataloge.

## GitHub Pages

`.github/workflows/pages.yml` baut alle Pakete und veröffentlicht `apps/showcase/dist`. Der Basis-Pfad kommt aus
`actions/configure-pages` (`FINK_BASE`), die Routen sind Hash-basiert.

## Icon-Fonts

KoliBri-Komponenten nutzen intern **Kolicons** (`@public-ui/components`), Demos und Themes zusätzlich
**Codicons** und **Font Awesome** (`@public-ui/theme-default`). `@font-face` greift nur im Dokument, nicht in
Shadow Roots. Deshalb muss die Anwendung die Fonts global laden.

`fink-sync-icons` (aus `@fink/theme`) kopiert die Fonts der **installierten** Paketversionen in ein Asset-Verzeichnis,
leert es vorher und schreibt `icon-fonts.css` (ein Einstiegspunkt) sowie `manifest.json` (Versionen):

```bash
pnpm icons:sync    # läuft automatisch vor dev und build des Showcase
pnpm icons:check   # bricht ab, wenn die Fonts nicht zur installierten KoliBri-Version passen (für CI)
```

```html
<link rel="stylesheet" href="/assets/icon-fonts/icon-fonts.css" />
```

## Theming

- Farben, Schrift, Radius und Spacing kommen aus `@fink/tokens` über die `--kolibri-*`-Hooks des Default-Themes.
- Abweichungen, die sich nicht über Tokens ausdrücken lassen, stehen in `packages/theme/src/overrides.ts`
  (Layer `kol-theme-component`, nur Token-Referenzen).
- Dark Mode: Die Anwendung setzt `color-scheme`; `FinkProvider` übernimmt das über `defaultColorScheme` bzw. `useFink().setColorScheme`.
- Theme-Wahl: `registerFink()` nutzt `detect: 'auto'`, KoliBri liest beim Mounten das nächste `data-theme`-Attribut.
  Registriert sind `fink` und `default`.
- Container mit eigener Fläche melden sie über `--kol-surface`, damit KoliBri-Hosts dieselbe Fläche malen.

## Bekannte Punkte

- **kol-badge und CSS-Variablen:** kol-badge wertet Farben selbst aus und akzeptiert keine `var()`. `fink-status` und
  `fink-chip` lösen Token-Farben deshalb zur Laufzeit in Hex-Werte auf und aktualisieren sie beim Schemawechsel.
- **KoliBri-React-Adapter und Watcher:** Der Adapter `@public-ui/react-v19` setzt Props erst nach dem Einhängen. Bei
  bereits geladenen Modulen laufen KoliBri-4.5-Watcher dann vor `componentWillLoad` und protokollieren `TypeError`s.
  `@fink/react` exportiert deshalb eigene Wrapper (`packages/react/src/kolibri.ts`), die die native Custom-Element-
  Unterstützung von React 19 nutzen: Props stehen vor dem Einhängen fest. Typen kommen unverändert aus dem Adapter.
  Gemessen über alle 128 Routen (DE und EN): 0 Konsolenmeldungen. Der Adapter-Fehler sollte trotzdem an KoliBri gemeldet werden.
- **Theme-Warnung:** Im Modus `detect: 'auto'` meldet `adopted-style-sheets` einmalig „The presetting of theme options
  is only relevant by using 'fixed' detection mode.“ Das ist erwartet.
- Die Showcase-Daten der Gesamtkomposition liegen nur in `sessionStorage`.
