# Experiment: zwei Fink-Komponenten auf drei Basen

Frage: Wäre Fink mit einer Headless-Bibliothek besser umsetzbar gewesen als mit KoliBri?

Das Experiment baut zwei typische Fink-Komponenten auf React Aria und auf Lion nach und vergleicht sie mit den echten,
unveränderten Fink-Komponenten auf KoliBri. Alle drei Varianten erfüllen dieselbe Vorgabe und durchlaufen dieselben
automatischen Prüfungen.

## Stichprobe

| Komponente         | Warum                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| `fink-tag-input`   | Eingabe mit Vorschlägen, Tastaturführung, entfernbare Einträge, Fehlermeldungen, Statusmeldungen         |
| `fink-file-upload` | Drop-Zone, Dateiauswahl per Tastatur, Typ- und Größenprüfung, Dateiliste, Entfernen, Statusmeldungen    |

Zusammen nutzen sie sieben KoliBri-Bausteine: `kol-input-text`, `kol-badge` und `kol-input-checkbox` (über `fink-chip`),
`kol-input-file`, `kol-button`, `kol-alert` und `kol-icon`.

## Varianten

| Variante   | Basis                                                    | Was gezählt wird                                                                    |
| ---------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| KoliBri    | `@public-ui/components` 4.6.0, Fink-Theme                | Fink-Quellen beider Komponenten, `fink-chip`, Hilfsfunktionen, deutsche Texte       |
| KoliBri schlank | wie KoliBri, Build mit `scripts/kolibri-icon-prune.mjs`: im Theme nur die genutzten Icons (`KOLIBRI_BUILD=slim`) | wie KoliBri       |
| KoliBri schlank + lazy markdown | wie KoliBri schlank, zusätzlich `scripts/kolibri-lazy-markdown.mjs`: markdown-it nur bei Bedarf (`KOLIBRI_BUILD=lazy`) | wie KoliBri |
| React Aria | `react-aria-components` 1.22.1 (ComboBox, TagGroup, DropZone, FileTrigger) | `src/react-aria/*`, `src/shared/texts.ts`                         |
| Lion       | `@lion/ui` 0.25.0 (lion-combobox, lion-input-file, lion-button) | `src/lion/*`, `src/shared/texts.ts`                                          |

## Spielregeln

- Gleiche Vorgabe: Funktionsumfang, Tastaturbedienung und deutsche Texte von `fink-tag-input` und `fink-file-upload`.
- Gleiche Gestaltung: alle Varianten nutzen die Fink-Tokens und sehen gleichwertig aus. React Aria und Lion bringen
  dafür eigenes CSS mit, einschließlich Fokus und Hochkontrastmodus.
- Keine Zusatzfunktionen über die Vorgabe hinaus.
- Gleiche Prüfungen (`tests/basis.spec.ts`): Elemente werden über Rollen und zugängliche Namen gefunden. Nur die
  Ablagestelle für Ziehen und Ablegen ist je Variante angegeben. `tests/markdown.spec.ts` prüft für die KoliBri-Fassungen
  zusätzlich, dass Markdown in Badge-Beschriftungen gerendert wird.
- Prüfstand-Dateien (`src/*/main.*`, `src/shared/config.ts`, `src/shared/page.css`) zählen nicht zum Aufwand.

## Ausführen

```bash
pnpm install
pnpm build                       # Fink-Pakete bauen, die KoliBri-Variante nutzt sie
cd experiments/basis-vergleich
pnpm spike                       # bauen, prüfen, messen; schreibt ERGEBNIS.md und results/ergebnis.json
pnpm dev                         # Varianten im Browser ansehen
```

## Ergebnis

Die Zahlen stehen in [ERGEBNIS.md](ERGEBNIS.md). Kurzfassung:

| | KoliBri | KoliBri schlank | KoliBri schlank + lazy markdown | React Aria | Lion |
| --- | ---: | ---: | ---: | ---: | ---: |
| Prüfungen bestanden (von 17) | 16, eine nicht simulierbar | 16, eine nicht simulierbar | 16, eine nicht simulierbar | 16, eine nicht simulierbar | 17 |
| Eigener Code (Zeilen) | 592 | 592 | 592 | 455 | 472 |
| davon Gestaltung (CSS) | 175 | 175 | 175 | 225 | 269 |
| Geladen, Prüfseite (gzip) | 447 KB | 421 KB | 422 KB | 155 KB | 67 KB |
| Geladen, Seite ohne Badge (gzip) | 432 KB | 405 KB | 351 KB | – | – |

## Auswertung

**Funktion und Barrierefreiheit.** Alle drei Varianten erfüllen die Vorgabe und bestehen die Prüfungen: Tastatur,
Fehlermeldungen, Statusmeldungen, axe-core (WCAG 2.2 AA, EN 301 549), sichtbarer Fokus im Hochkontrastmodus, kein
seitliches Scrollen bei 320 Pixeln, deutsche Texte, keine Konsolenfehler. Zwei Fälle sind im Prüfstand nicht
simulierbar und deshalb ausgenommen: die native Vorschlagsliste (`datalist`) von `fink-tag-input` und das Ablegen bei
React Aria, das `dataTransfer.effectAllowed` prüft.

**Codeumfang.** Mit KoliBri war der Code für diese beiden Komponenten nicht kleiner, sondern größer. Ein Teil davon
sind Funktionen, die nur Fink hat: Sprachumschaltung zur Laufzeit, die Umschaltvariante von `fink-chip`, Werte als
JSON-Attribute, `reset()` und `_disabled`. Ohne sie wären es geschätzt rund 520 Zeilen, immer noch mehr als bei React
Aria und Lion. Ein weiterer Teil ist Anpassungsarbeit an KoliBri: `resolve-color.ts` (37 Zeilen), weil `kol-badge`
keine CSS-Variablen annimmt, und 144 Zeilen CSS für die Drop-Zone um `kol-input-file`.

**Gestaltung.** React Aria und Lion brauchen mehr CSS, weil Eingabefeld, Vorschlagsliste, Tags, Knöpfe und Drop-Zone
selbst gestaltet werden. Der Unterschied ist kleiner als erwartet: 50 bis 94 Zeilen mehr. Der Hochkontrastmodus
kostete 23 Zeilen bei React Aria und 36 bei Lion.

**Ladegröße.** Fink lädt mit KoliBri 4.6.0 447 KB gzip. Mit 4.6.0-rc.2 waren es noch 2.174 KB, weil das
Default-Theme das Icon-CSS in 40 Komponentenstilen kopierte. Seit 4.6.0 liegt es einmal in `GLOBAL` (siehe
„Icon-CSS einmal in GLOBAL“). Das Default-Theme macht jetzt 952 KB minifiziert aus, 115 KB gzip: 187 KB `GLOBAL` mit
Icon-CSS und die Stile aller 45 Komponenten.

Die Variante „KoliBri schlank“ entfernt beim Build alle Icon-Regeln, die weder KoliBri intern noch Fink nutzt
(`scripts/kolibri-icon-prune.mjs`, ein Vite-Plugin mit rund 30 Zeilen). Sie lädt 421 KB gzip, bei denselben
bestandenen Prüfungen. Davon entfallen rund 70 KB auf global geladene Icon-Schriften, darunter Font Awesome, das Fink
gar nicht nutzt.

KoliBri lädt Komponenten einzeln nach. Auf der Prüfseite sind es vier (`kol-input-text`, `kol-input-file`,
`kol-badge`, `kol-icon`), zusammen rund 20 KB. Über alle 52 Komponenten liegt der Median bei 4,3 KB gzip. Der core
wird einmal geladen, jede weitere Komponente kostet wenig. React Aria (155 KB) und Lion (67 KB) bleiben für diese
beiden Komponenten kleiner. Wie sich der Abstand bei vielen Komponenten entwickelt, ist nicht gemessen.

**Befunde beim Bauen.**

- React Aria: In der ersten Fassung blieb die Vorschlagsliste nach dem Übernehmen offen. React Aria blendet den
  restlichen Inhalt dann für Hilfstechnik aus, axe meldete fünf Funde. Behoben, indem Vorschläge erst beim Tippen
  erscheinen. Solche Entscheidungen liegen bei Headless beim Designsystem.
- Lion: Die Mehrfachauswahl von `lion-combobox` ist laut Lion-Dokumentation nicht barrierefrei, deshalb eine eigene
  Tag-Liste wie bei Fink. `lion-input-file` bringt Drop-Zone, Dateiliste, Entfernen-Knöpfe und deutsche Texte mit,
  aber keine Statusmeldung und keine Dateigröße. Beides ist ergänzt. Lions deutsche Texte weichen ab, etwa „per Drag &
  Drop“.
- KoliBri: `fink-tag-input` verlässt sich für Vorschläge auf die native `datalist`. Deren Bedienbarkeit hängt vom
  Browser ab.

## Woher die Größe kommt

`pnpm spike:sourcemap` baut alle Varianten mit Source Maps und ordnet jedes beim Seitenaufruf geladene Byte seiner
Quelle zu. Die vollständige Aufstellung je Komponente steht in [SOURCEMAP.md](SOURCEMAP.md). Für „KoliBri schlank“
(Skripte, minifiziert):

| Herkunft | minifiziert | Anmerkung |
| --- | ---: | --- |
| KoliBri theme | 780 KB | Stile aller 45 Komponenten, auch der nicht genutzten. Die drei genutzten brauchen rund 60 KB. |
| KoliBri core | 366 KB | Darin ein Chunk von 343 KB Quelle, davon 341 KB markdown-it mit `entities` und `linkify-it`. Fast jede Komponente importiert ihn über `SpanFC`, die gemeinsame Beschriftung. |
| React | 188 KB | wie bei React Aria |
| Fink components | 147 KB | alle 44, weil `@fink/react` jede Komponente registriert. Genutzt werden zwei. |
| KoliBri components | 55 KB | genau die vier genutzten: `kol-input-file`, `kol-input-text`, `kol-badge`, `kol-icon` |
| Fink core, theme, tokens | 87 KB | Stencil-Laufzeit von Fink, Texte, Overrides |

Als interaktive Treemap: `pnpm spike:treemap` schreibt je Variante eine Karte nach `analyse/` (rollup-plugin-visualizer).
Für diese Analyse-Builds zerlegt `scripts/kolibri-analyse-split.mjs` das KoliBri theme je Komponente und den core-Chunk nach Bibliotheken (`analysis/kolibri-core/markdown-chunk`). Die Analyse-Builds sind nicht
lauffähig. Die Theme-Größen sind exakt, die Größen im core-Chunk sind eine Näherung (ohne Kommentare und Leerraum).

Die gzip-Anteile in SOURCEMAP.md sind anteilig je Chunk geschätzt. Wo Theme und React im selben Chunk liegen,
verschieben sie sich. Die minifizierten Bytes sind exakt.

Daraus ergaben sich vier Hebel. Zwei davon hat KoliBri inzwischen umgesetzt:

1. Icon-CSS im theme nur einmal: seit KoliBri 4.6.0 (public-ui/kolibri#11623). Offen bleibt, nur die genutzten
   Icon-Sets auszuliefern.
2. theme-Stile nur für die genutzten Komponenten laden: offen.
3. markdown-it aus dem gemeinsamen core lösen: in `release/4` durch einen kleinen Inline-Renderer ersetzt
   (public-ui/kolibri#11627, #11637), nach 4.6.0 gemergt, kommt mit dem nächsten Release.
4. In Fink nur die genutzten Komponenten registrieren statt aller 44: offen, liegt bei Fink.

## markdown-it nur bei Bedarf (Hebel 3)

KoliBri rendert Badge-Beschriftungen als Markdown (`allowMarkdown: true` im Badge-Baustein). Sonst setzt keine
Komponente `allowMarkdown`, und als Prop gibt es es nicht. Trotzdem legt `SpanFC`, die gemeinsame Beschriftung fast
aller Komponenten, beim Laden `new MarkdownIt()` an. Damit lädt jede Seite den Parser.

`scripts/kolibri-lazy-markdown.mjs` stellt nach, wie KoliBri das lösen könnte:

- Der core-Chunk verliert markdown-it, entities, linkify-it, punycode, mdurl und uc.micro: 139 KB auf 2,7 KB minifiziert.
- `md()` lädt den Parser beim ersten Aufruf dynamisch nach und gibt bis dahin den Text maskiert aus. Für Text ohne
  Markdown ist das dieselbe Ausgabe.
- Nach dem Laden werden alle `kol-badge` mit Stencils `forceUpdate` neu gezeichnet. `tests/markdown.spec.ts` prüft,
  dass `**wichtig**` danach als `<strong>` erscheint und `<ok>` maskiert bleibt.

Ergebnis mit 4.6.0 (gzip): Auf einer Seite ohne Badge sinkt die Ladegröße von 405 auf 351 KB, um 54 KB. Auf der Prüfseite
ändert sich nichts, weil Fink Tags als Badges darstellt und der Parser dort nachgeladen wird, nur später. In der
Source-Map-Auswertung sinkt der KoliBri core von 110 auf 56 KB, der Parser erscheint als eigener Posten
„KoliBri markdown (lazy)“ mit 55 KB. Alle Prüfungen bestehen weiter.

Die Lösung im Experiment ist ein Nachbau per Build-Schritt auf dem fertigen Paket. KoliBri hat sich für einen anderen
Weg entschieden: markdown-it wird in `release/4` durch einen kleinen Inline-Renderer ersetzt (public-ui/kolibri#11637).
Sobald das veröffentlicht ist, wird `scripts/kolibri-lazy-markdown.mjs` überflüssig.

## Icon-CSS einmal in GLOBAL statt in jeder Komponente

Bis 4.6.0-rc.2 band das Default-theme das Icon-CSS über das Mixin `kol-icon-theme` in die SCSS-Datei jeder Komponente
ein. Sass fügt ein Mixin bei jedem `@include` vollständig ein, so entstanden 40 Kopien und 12,9 MB CSS-Strings.
KoliBris Styling-Laufzeit `adopted-style-sheets` setzt in jeden Shadow Root `PROPERTIES`, `GLOBAL` und den
Komponentenstil und legt jedes CSS nur einmal als geteiltes `CSSStyleSheet` an.

Das Experiment hat das mit einem Build-Schritt nachgestellt (`scripts/kolibri-icons-global.mjs`, in der Git-Historie)
und gemeldet (public-ui/kolibri#11623). KoliBri hat es für alle Themes umgesetzt (#11629, #11631) und mit 4.6.0 am
18.11.2026 veröffentlicht. Die Fassungen „icons in GLOBAL“ sind deshalb aus dem Experiment entfernt.

| Fassung | Prüfseite (gzip) | ohne Badge (gzip) |
| --- | ---: | ---: |
| 4.6.0-rc.2, 40 Kopien | 2.174 KB | 2.158 KB |
| 4.6.0, einmal in `GLOBAL` | 447 KB | 432 KB |
| 4.6.0, nur genutzte Icons (schlank) | 421 KB | 405 KB |

In der Nachbildung kostete das vollständige Icon-CSS in `GLOBAL` Zeit: Jede Komponente bekam rund 600 KB Icon-Regeln,
die Stilberechnung für Komponenten ohne Icons wurde etwa dreimal so lang. In 4.6.0 ist `GLOBAL` mit 187 KB deutlich
kleiner, weil laut #11629 auch die auf Beschriftungen beschränkten Doppelkopien entfallen sind. Gemessen
(`pnpm spike:perf`, [PERF.md](PERF.md), zwei Läufe) liegt die Stilberechnung jetzt gleichauf mit dem gekürzten Theme:
29 bis 41 ms gegenüber 30 ms bei 450 Komponenten ohne Icons, 62 bis 75 ms gegenüber 72 ms bei 900 gemischten.

Offen bleibt, nur die Icon-Sets auszuliefern, die eine Anwendung nutzt. Das spart rund 25 KB gzip, ohne messbaren
Laufzeitgewinn.

## Grenzen

- Aufwand ist nur als Codezeilen gemessen. Arbeitszeit lässt sich nicht vergleichen, alle Varianten sind mit
  KI-Unterstützung entstanden, React Aria und Lion mit Fink als Vorlage.
- Zwei von 46 Fink-Komponenten. Komplexe Bausteine wie Tabelle, Datumswahl oder Baum sind nicht geprüft. Gerade dort
  könnte der Abstand anders ausfallen.
- Keine Prüfung von Hand mit Screenreadern, nur Chromium.
- Pflege über Jahre, Updates der Basis und BITV-Prüfungen sind nicht erfasst.

## Folgerung

Für Kompositionen wie diese beiden stützt das Experiment die Annahme nicht, dass Fink mit einer Headless-Bibliothek
deutlich mehr Aufwand gehabt hätte. KoliBris Vorteil liegt woanders: in der Breite von 49 fertigen Bausteinen, in der
Pflege durch das ITZBund und im BITV-orientierten Prüfverfahren. Sein messbarer Nachteil ist die Ladegröße des
Default-Themes. Er lässt sich mit einem Build-Schritt auf rund ein Fünftel senken. Der nächste aufschlussreiche Schritt wäre derselbe Vergleich für einen komplexen Baustein,
etwa eine sortierbare Tabelle oder eine Datumswahl.
