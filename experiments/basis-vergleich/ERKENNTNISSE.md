# Erkenntnisse aus dem Basisvergleich

Sammlung von Wissen, Messwerten, Methoden und Erfahrungen aus dem Experiment „Fink auf KoliBri, React Aria und Lion“
(November 2026). Ergänzt [README.md](README.md) (Aufbau und Auswertung) und die erzeugten Ergebnisse
([ERGEBNIS.md](ERGEBNIS.md), [SOURCEMAP.md](SOURCEMAP.md), [PERF.md](PERF.md)). Ein Artikelentwurf für Medium liegt
unter [docs/artikel/kolibri-headless-medium.md](../../docs/artikel/kolibri-headless-medium.md).

## Ausgangsfrage

Wäre Fink mit einer Headless-Bibliothek besser umsetzbar gewesen als mit KoliBri? Fink gilt dabei als repräsentatives
Designsystem der Verwaltung. Untersucht wurden zwei Ebenen:

1. **Bau:** zwei Fink-Komponenten (`fink-tag-input`, `fink-file-upload`) auf React Aria 1.22.1 und Lion 0.25.0
   nachgebaut, gleiche Vorgabe, gleiche Tokens, gleiche 17 Prüfungen.
2. **Auslieferung:** was jede Variante lädt, woher die Bytes kommen und was sie zur Laufzeit kosten.

## Verlauf

| Datum | Schritt |
| --- | --- |
| 15.11.2026 | Wirtschaftlichkeitsbetrachtung („KoliBri-Dividende“) mit Kostenmodell für Eigenbau, Headless und KoliBri |
| 17.11.2026 | Experiment mit React Aria und Lion aufgesetzt; Prüfseite mit KoliBri 4.6.0-rc.2: 2.174 KB gzip |
| 17.11.2026 | Ursachenanalyse per Source Map und Treemap: Icon-CSS 40-mal im Theme, markdown-it im gemeinsamen Chunk |
| 17.11.2026 | Nachbauten per Build-Schritt: Icons kürzen, Icon-CSS in GLOBAL, markdown-it nur bei Bedarf |
| 18.11.2026 | Issues eingereicht: public-ui/kolibri#11623 (Icon-CSS), #11627 (markdown-it), dazu #11624 (Size-Gate) |
| 18.11.2026 | #11623 umgesetzt (#11629, #11631) und mit KoliBri 4.6.0 veröffentlicht, rund vier Stunden nach der Meldung |
| 19.11.2026 | #11627 durch eigenen Inline-Renderer gelöst (#11637), keine 24 Stunden nach der Meldung, erscheint mit 4.7 |
| 20.11.2026 | Fink auf 4.6.0 gehoben, Experiment neu gemessen, Versionsvergleich 4.5 / 4.6 / 4.7, Vergleich mit gleichem Umfang |

## Ergebnisse in Kürze

### Bau

| | KoliBri | React Aria | Lion |
| --- | ---: | ---: | ---: |
| Prüfungen bestanden (von 17) | 16, eine nicht simulierbar | 16, eine nicht simulierbar | 17 |
| Eigener Code (Zeilen) | 592 | 455 | 472 |
| davon CSS | 175 | 225 | 269 |
| Hochkontrastmodus (Zeilen CSS) | in KoliBri enthalten | 23 | 36 |

- Funktional gleichwertig. Für diese beiden Kompositionen kein Codevorteil durch KoliBri.
- Mehrcode bei Fink: Zusatzfunktionen (Sprachumschaltung, JSON-Attribute, `reset()`), 37 Zeilen Farbauflösung für
  `kol-badge` (nimmt keine CSS-Variablen an), 144 Zeilen CSS für die Drop-Zone um `kol-input-file`.
- Ohne Zusatzfunktionen geschätzt rund 520 Zeilen.

### Auslieferung, Versionsvergleich (gleicher Fink-Code)

| | 4.5.0 | 4.6.0 | 4.7 (release/4) |
| --- | ---: | ---: | ---: |
| Prüfseite (gzip) | 2.181 KB | 447 KB | 393 KB |
| Seite ohne Badge (gzip) | 2.159 KB | 432 KB | 378 KB |
| KoliBri-Theme (gzip) | 1.838 KB | 115 KB | 115 KB |
| KoliBri-Kern (gzip) | 112 KB | 111 KB | 57 KB |
| Vier genutzte KoliBri-Komponenten (gzip) | 25 KB | 15 KB | 15 KB |
| KoliBri ohne Theme (minifiziert) | 435 KB | 420 KB | 288 KB |
| JS-Speicher nach 900 Komponenten | 73 MB | 15 MB | 14 MB |

### Bibliothek gegen Bibliothek (minifiziert, ohne Theme, Fink und Wrapper)

| | KoliBri 4.6 | KoliBri 4.7 | Lion | React Aria |
| --- | ---: | ---: | ---: | ---: |
| Eigener Code | 157 KB | 160 KB | 159 KB | 322 KB |
| Basis-CSS (Layout, Hochkontrast) | 35 KB | 35 KB | – | – |
| Abhängigkeiten | 136 KB | 1 KB | 43 KB | 3 KB |
| Laufzeit | 92 KB (Stencil) | 92 KB | 19 KB (Lit) | 188 KB (React) |
| Summe | 420 KB | 288 KB | 221 KB | 325 KB (+188 KB React) |

### Zwei Komponenten mit Gestaltung, gleicher Umfang (gzip)

| | KoliBri 4.5 | KoliBri 4.6 | KoliBri 4.7 | React Aria | Lion |
| --- | ---: | ---: | ---: | ---: | ---: |
| Bibliothek mit Abhängigkeiten | 137 | 126 | 73 | 91 | 56 |
| Laufzeit der Komponenten | 22 (Stencil, Fink) | 21 | 22 | 59 (React) | 5 (Lit) |
| Theme bzw. eigenes CSS | 1.838 | 115 | 115 | 1 | 0,4 |
| Code der Komponenten und der Seite | 7 | 6 | 7 | 4 | 7 |
| Summe | 2.003 | 269 | 217 | 155 | 68 |
| Theme nur für genutzte Komponenten und Icons (geschätzt) | – | 168 | 116 | 155 | 68 |

## Technische Befunde

### Icon-CSS im Default-Theme (bis 4.5 und 4.6.0-rc.2)

- Jede Komponentendatei in `packages/themes/default/src/components/*.scss` band `@include kol-icon-theme` ein. Sass
  fügt ein Mixin bei jedem `@include` vollständig ein: Font Awesome und Codicons in 40 von 47 Komponentenstilen.
- 11.965 KB von 12,9 MB CSS-Strings waren Icon-CSS. Dedupliziert 616 KB (Font Awesome 497 KB, Codicons 124 KB).
  Eingabefelder hatten zusätzlich eine auf `.kol-form-field__label` beschränkte Kopie.
- `adopted-style-sheets` setzt `[PROPERTIES, GLOBAL, Komponentenstil]` in jeden Shadow Root und cached jedes CSS nach
  seinem String als geteiltes `CSSStyleSheet`. Jede Kopie war also auch im Speicher eine eigene Instanz.
- `@font-face` in Shadow-Root-Stylesheets registriert keine Schriften. Schriften muss die Anwendung auf Dokumentebene
  laden (Fink: `fink-sync-icons`).
- **Nachbau 1, Icons kürzen** (`scripts/kolibri-icon-prune.mjs`): nur Icons, die KoliBri intern und Fink nutzen.
  2.174 → 460 KB gzip, pixelgleich.
- **Nachbau 2, Icon-CSS in GLOBAL** (inzwischen entfernt, siehe Git-Historie): 2.174 → 492 KB gzip, JS-Speicher 73 →
  16 MB. Aber Stilberechnung für 450 Komponenten ohne Icons 37 → 118 ms, weil jeder Shadow Root 600 KB Icon-Regeln
  bekam. Mit gekürzten Icons 416 KB und 40 ms.
- **Lösung in KoliBri 4.6.0** (#11629, #11631): Icon-CSS einmal in `global.scss`, Doppelkopien entfernt, `kol-icon` ohne
  eigenen Eintrag. `GLOBAL` wiegt 187 KB. Eine Laufzeitstrafe ist nicht mehr messbar (29 bis 41 ms gegenüber 30 ms mit
  gekürzten Icons).
- Offen: nur genutzte Icon-Sets ausliefern (rund 25 KB gzip), Theme-Stile nur für genutzte Komponenten (rund 85 KB
  gzip).

### markdown-it im gemeinsamen Chunk (bis 4.6)

- `utils/markdown.ts` legte beim Laden `new MarkdownIt()` an, `SpanFC` (Beschriftung fast aller Komponenten) importierte
  es statisch. 44 von 53 Komponenten-Einträgen luden den Chunk.
- 136 KB minifiziert, 55 KB gzip. Anteile: entities 43 %, markdown-it 41 %, linkify-it 6 %, mdurl 4 %, uc.micro,
  punycode und KoliBri-Code je 2 %.
- Genutzt nur von `BadgeFC` (`allowMarkdown`).
- **Nachbau, Nachladen bei Bedarf:** Bibliotheken aus dem Chunk entfernt, dynamischer Import beim ersten `md()`,
  danach `forceUpdate` auf alle `kol-badge`. −54 KB gzip, aber nur auf Seiten ohne Badge.
- **Lösung in KoliBri 4.7** (#11637): eigener Inline-Renderer, der die gesamte Eingabe zuerst HTML-maskiert und dann
  fett, kursiv, durchgestrichen, Inline-Code und harte Zeilenumbrüche erzeugt. Links und Bilder bleiben sichtbarer Text.
  Spart auf allen Seiten. Kern 111 → 57 KB gzip.

### Weitere Befunde an KoliBri

| Issue | Befund | Stand |
| --- | --- | --- |
| #11601 | Standardtexte `filename-text` und `action-running` enden auf „...“ | offen, Fink entfernt die „...“ |
| #11602 | `register({ translations })` ersetzte alle Standardtexte | in 4.6.0 behoben |
| #11603 | `kol-input-file` kürzt den Dateinamen mit `text-overflow: ellipsis` | offen, Fink überschreibt im Theme |
| – | `kol-combobox`: Aufklapp-Button ohne zugänglichen Namen | in 4.6.0 behoben |
| – | `kol-badge` nimmt keine CSS-Variablen für Farben an | Fink löst Farben zur Laufzeit auf |

## Methoden und Werkzeuge

- **Prüfstand:** Playwright 1.63 mit axe-core 4.14 (WCAG 2.2 AA, EN 301 549, Best Practices). Elemente über Rollen und
  zugängliche Namen, Fokus im Hochkontrastmodus per Screenshot-Vergleich, Reflow bei 320 px, Sprachprüfung über alle
  Texte inklusive Shadow DOM.
- **Ladegröße:** `scripts/measure.mjs` lädt jede Seite und summiert Skripte, Stylesheets und Schriften.
- **Herkunft je Byte:** Build mit Source Maps, `scripts/sourcemap.mjs` ordnet minifizierte Bytes exakt zu, gzip anteilig
  je Chunk.
- **Treemaps:** `rollup-plugin-visualizer`, dazu `scripts/kolibri-analyse-split.mjs`, das das Theme je Stil in Icon-CSS
  und übrige Stile zerlegt (Analyse-Builds sind nicht lauffähig).
- **Laufzeit:** `scripts/perf.mjs` mit Chrome-DevTools-Protokoll (`Performance.getMetrics`, `HeapProfiler`), 150
  Elemente je Komponententyp, Median aus 7 Läufen.
- **Versionen:** `KOLIBRI_BUILD=4.5|4.7` bindet KoliBri aus `.kolibri/<version>` per Vite-Alias ein;
  `scripts/kolibri-versions.mjs` legt 4.5.0 von npm und 4.7 aus einem gebauten `release/4`-Checkout an.

## Stolpersteine und wie sie gelöst wurden

- **Synthetische Ereignisse:** React Aria prüft beim Ablegen `dataTransfer.effectAllowed`, das bei synthetischen
  Ereignissen „none“ ist. Die native `datalist` öffnet Chromium headless nicht. Beide als nicht simulierbar markiert,
  nicht übersprungen.
- **`aria-hidden` durch offene Listen:** Ein offenes React-Aria-Popover blendet den Rest der Seite für Hilfstechnik
  aus. Lösung im Design, nicht im Test: Vorschläge erst beim Tippen.
- **Source-Map-Zuordnung:** Pfade mit mehreren `node_modules` zuerst falsch zugeordnet; richtig ist das letzte
  `node_modules`-Segment.
- **Erzeugte Dateien im Lint:** Build-Ausgaben und Analysen des Experiments müssen in den ESLint-Ignores stehen,
  sonst scheitert `pnpm lint`.
- **Messstreuung:** Laufzeitwerte schwanken zwischen Läufen spürbar (etwa 29 gegenüber 41 ms). Immer mehrere Läufe,
  Spannen statt Einzelwerte berichten, Absolutwerte nur innerhalb eines Laufs vergleichen.
- **KoliBri aus dem Quellcode bauen:** Der Stencil-Build braucht die ganze Workspace-Installation (Svelte-Output-Target),
  vorher `pnpm --filter @public-ui/icons build` (Kolicons) und einen Ordner `doc`.
- **Gemergte PRs:** Nach dem Merge eines PRs den Branch auf den aktuellen `main` neu aufsetzen und neue Arbeit in einem
  neuen PR führen.

## Was ein fairer Vergleich braucht

1. Nur Bibliotheken ab den Web Components vergleichen. Framework-Wrapper sind bei allen gleich.
2. Fink selbst gehört nicht in den Bibliotheksvergleich.
3. Schriften kosten in jedem Stack, wenn man Icon-Schriften nutzt.
4. Das Theme getrennt betrachten: Headless-Bibliotheken haben keins, KoliBri trennt Gestaltung vollständig vom
   Verhalten. Das Basis-Styling der Komponenten enthält nur Layout, Hochkontrastmodus und einen Notfall-Stil.
5. Seiten nur mit gleichem Umfang vergleichen. Die KoliBri-Prüfseite lädt zusätzlich Icon-Schriften (69 KB), alle 44
   Fink-Komponenten (43 KB) und React mit Finks React-Schicht (60 KB).
6. Messen, was gemessen wird: gzip-Anteile aus Source Maps sind Schätzungen, minifizierte Bytes exakt.

## Einordnung

- **Für Headless:** reiferes Verhalten komplexer Widgets (React Aria: Datum, Zeitzonen, Tabellen, Drag & Drop, über 30
  Sprachen), freie innere Struktur, größere Gemeinden, zusätzliche Bausteine (Zag.js, Ark UI).
- **Für KoliBri:** Breite (49 von 49 benötigten Bausteinen, React Aria 36), Layout und Hochkontrastmodus in jeder
  Komponente, Web Components für alle Frameworks, öffentlicher Träger mit EUPL-Lizenz, BITV-orientiertes Prüfverfahren
  und eine Reaktionszeit von Stunden auf gut belegte Befunde.
- **Barrierefreiheit per Lint:** ESLint-Regeln prüfen nur Quelltext. Laufzeitverhalten (Fokus, Tastatur,
  Bildschirmleser, Vergrößerung) und das Innere fremder Komponenten erfassen sie nicht. Dafür braucht es Prüfungen im
  Browser.
- **Kostenmodell:** Die Annahme, Headless spare je Baustein 15 bis 60 % gegenüber dem Eigenbau, ließ sich für die beiden
  gebauten Komponenten nicht bestätigen. Beträge aus dem Modell sind Obergrenzen, keine belegten Ersparnisse.

## Grenzen

- Zwei von 46 Fink-Komponenten. Komplexe Bausteine wie Tabelle, Datumswahl oder Baum sind nicht geprüft.
- Aufwand nur als Codezeilen. Alle Varianten KI-gestützt, React Aria und Lion mit Fink als Vorlage.
- Nur Chromium, keine Prüfung von Hand mit Screenreadern.
- Pflege, Updates und BITV-Prüfungen über Jahre sind nicht erfasst.
- 4.7 ist aus `release/4` (Commit 794c476 vom 19.11.2026) gebaut und noch nicht veröffentlicht.

## Nächste Schritte

1. Derselbe Vergleich für einen komplexen Baustein (sortierbare Tabelle oder Datumswahl).
2. In Fink nur die genutzten Komponenten registrieren statt aller 44 (43 KB gzip auf der Prüfseite).
3. Font-Awesome-CSS in Fink streichen, Fink nutzt nur Codicons (20 KB gzip).
4. In KoliBri vorschlagen: Icon-Sets wählbar machen und Theme-Stile je Komponente nachladen.
5. Nach Erscheinen von 4.7 Fink hochziehen und `scripts/kolibri-versions.mjs` auf npm umstellen.
