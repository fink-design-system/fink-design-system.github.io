# Vorschläge für das KoliBri-Team

> **Stand 20.11.2026:** Beide Issues sind eingereicht und umgesetzt.
> - Issue 1: [public-ui/kolibri#11623](https://github.com/public-ui/kolibri/issues/11623), umgesetzt in #11629 und
>   #11631, veröffentlicht mit 4.6.0.
> - Issue 2: [public-ui/kolibri#11627](https://github.com/public-ui/kolibri/issues/11627), markdown-it in `release/4`
>   durch einen kleinen Inline-Renderer ersetzt (#11637), erscheint mit 4.7. Im Versionsvergleich gemessen
>   (4.7 aus `release/4`): Prüfseite 447 auf 393 KB gzip.
>
> Die Texte unten sind der eingereichte Stand mit den Messwerten von 4.6.0-rc.2.

Zwei Issue-Texte zum Einreichen unter https://github.com/public-ui/kolibri/issues. Beide beziehen sich auf
`@public-ui/components` und `@public-ui/theme-default` in Version 4.6.0-rc.2. Belege, Skripte und Messwerte liegen in
diesem Ordner (`experiments/basis-vergleich`).

---

## Issue 1

**Titel:** Default-Theme: Icon-CSS steckt in 40 Komponentenstilen (rund 12 MB), einmal in GLOBAL würden 616 KB reichen

### Beobachtung

`@public-ui/theme-default` 4.6.0-rc.2 enthält rund 12,9 MB CSS als JavaScript-Strings (`dist/index.mjs`). Davon sind
11.965 KB Icon-CSS (Font Awesome, Codicons, `@font-face`). Es steckt vollständig in 40 der 47 Komponentenstile. Eine
Anwendung, die das Default-Theme registriert oder erweitert, lädt alle Kopien. In unserer Messung waren das rund 1,7 MB
gzip von 2,17 MB auf einer Seite mit zwei Komponenten.

Ursache ist das SCSS-Mixin: Jede Komponentendatei bindet `kol-icon-theme` ein, zum Beispiel
`packages/themes/default/src/components/button.scss`:

```scss
@use '../mixins/icon' as *;

@layer kol-theme-component {
	@include kol-icon-theme;
	@include kol-button('kol-button');
}
```

Sass fügt ein Mixin bei jedem `@include` vollständig ein. Im aktuellen `develop` sind die Schriftdateien für Version 5
bereits ausgelagert, die Glyph-Klassen stecken aber weiterhin in jeder Komponente. Die Eingabefelder enthalten zusätzlich
eine zweite, auf `.kol-form-field__label` beschränkte Kopie von Font Awesome.

### Vorschlag

`@include kol-icon-theme` einmal in das globale SCSS (Theme-Eintrag `GLOBAL`) verschieben und aus den Komponentendateien
entfernen. `adopted-style-sheets` setzt `GLOBAL` bereits in jeden Shadow Root und legt jedes CSS nur einmal als geteiltes
`CSSStyleSheet` an. Das Icon-CSS läge damit einmal im Bundle und einmal im Speicher.

Damit Komponenten ohne Icons nicht unnötig Regeln prüfen (siehe Messung), zusätzlich die Icon-Sets wählbar machen, etwa
Font Awesome optional. Font Awesome macht 497 der 616 KB aus. Alternativ könnte das Theme-Format je Komponente eine Liste
von CSS-Strings erlauben (`'KOL-BUTTON': [icons, button]`), sodass ein gemeinsamer Icon-String nur in die Komponenten mit
Icons kommt.

### Messung

Nachgestellt per Build-Schritt auf dem fertigen Paket: Icon-Anweisungen aus allen Komponentenstilen herausgenommen,
dedupliziert und an `GLOBAL` angehängt, in derselben Ebene `kol-theme-component`. `@media`-, `@supports`- und
`@keyframes`-Blöcke ziehen vollständig um.

| Fassung | Ladegröße der Seite (gzip) | Stilberechnung, 450 Komponenten ohne Icons | Stilberechnung, 900 gemischt | JS-Heap |
| --- | ---: | ---: | ---: | ---: |
| 4.6.0-rc.2 wie veröffentlicht | 2.174 KB | 37 ms | 105 ms | 73 MB |
| Icon-CSS einmal in GLOBAL, alle Icons | 492 KB | 118 ms | 229 ms | 16 MB |
| Icon-CSS einmal in GLOBAL, nur genutzte Icons | 416 KB | 40 ms | 99 ms | 14 MB |

- Ladegröße: Seite mit zwei Komponenten, Skripte, Stylesheets und Schriften, gzip.
- Stilberechnung und JS-Heap: Chrome-DevTools-Protokoll, Chromium ohne Drosselung, Median aus 7 Läufen. Komponenten ohne
  Icons: `kol-heading`, `kol-progress`, `kol-quote`. Gemischt zusätzlich `kol-button`, `kol-badge`, `kol-input-text`.
- Darstellung mit allen Icons in GLOBAL: bis auf 25 Pixel Kantenglättung (höchstens 3 von 765 Farbstufen) gleich, im
  Hochkontrastmodus pixelgleich. Alle Prüfungen bestehen (Tastatur, axe-core WCAG 2.2 AA, Hochkontrastmodus, Reflow).
- „Nur genutzte Icons“ heißt hier: Kolicons, die KoliBri intern nutzt, und die Codicons der Anwendung.

Mit allen Icons in GLOBAL wird die Stilberechnung etwa dreimal so lang, weil jeder Shadow Root rund 600 KB Icon-Regeln
erhält. Mit nur den genutzten Icons verschwindet dieser Preis.

### Weitere Beobachtung

Das Theme bringt die Stile aller 47 Komponenten mit, auch wenn eine Seite nur wenige nutzt. Ohne Icon-CSS sind das rund
975 KB, die vier Komponenten unserer Testseite brauchen davon rund 84 KB. Ein Laden der Theme-Stile je Komponente wäre
ein eigener, späterer Schritt.

### Belege

- Experiment mit Skripten, Tests und Messwerten:
  https://github.com/fink-design-system/fink-design-system.github.io/pull/7, Ordner `experiments/basis-vergleich`
- Build-Schritt: `scripts/kolibri-icons-global.mjs`, Messung: `scripts/measure.mjs` und `scripts/perf.mjs`
- Ergebnisse: `ERGEBNIS.md`, `PERF.md`

---

## Issue 2

**Titel:** markdown-it im gemeinsamen Chunk: 44 Komponenten laden den Parser, genutzt wird er nur vom Badge

### Beobachtung

Der gemeinsame Chunk `dist/esm/component-oUQcgxDj.js` (4.6.0-rc.2) enthält `SpanFC`, die Beschriftung fast aller
Komponenten. Er legt beim Laden einen Markdown-Parser an (Zeile 9210):

```js
const markdown = new MarkdownIt();
const md = (str) => markdown.renderInline(str);
```

Von den 343 KB Quelltext dieses Chunks sind 341 KB Bibliotheken: markdown-it, entities (rund 1.500 HTML-Entitäten),
linkify-it, punycode, mdurl und uc.micro. 44 der 53 Komponenten-Einträge importieren den Chunk. Minifiziert sind es
136 KB, gzip 55 KB.

Gebraucht wird der Parser nur, wenn `SpanFC` `allowMarkdown` erhält. Das setzt einzig der Badge-Baustein
(`internal/functional-components/badge/component.js`: `allowMarkdown: true`). Als Prop einer Komponente gibt es
`allowMarkdown` nicht.

### Vorschlag

markdown-it nur bei Bedarf laden, zum Beispiel per dynamischem Import im Badge oder in einer eigenen Markdown-Fassung von
`SpanFC`. Für die übrigen Komponenten fiele der Parser dann weg. Wenn Badge-Beschriftungen nur Inline-Formatierung
brauchen (fett, kursiv, Code), käme auch ein kleinerer Parser ohne `linkify-it` und `entities` in Frage.

### Messung

Nachgestellt per Build-Schritt: Bibliotheken aus dem gemeinsamen Chunk entfernt, `md()` lädt den Parser beim ersten Aufruf
dynamisch nach und gibt bis dahin den Text maskiert aus. Danach werden alle `kol-badge` mit `forceUpdate` neu gezeichnet.

- Gemeinsamer Chunk: 139 KB auf 2,7 KB minifiziert.
- Seite ohne Badge: 444 auf 390 KB gzip (−54 KB).
- Seite mit Badge: unverändert, der Parser wird nachgeladen.
- Ein Test prüft, dass `**wichtig**` im Badge danach als `<strong>` erscheint und `<ok>` maskiert bleibt. Alle übrigen
  Prüfungen bestehen.

### Belege

- https://github.com/fink-design-system/fink-design-system.github.io/pull/7, Ordner `experiments/basis-vergleich`
- Build-Schritt: `scripts/kolibri-lazy-markdown.mjs`, Test: `tests/markdown.spec.ts`
