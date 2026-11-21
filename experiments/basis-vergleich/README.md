# Experiment: zwei Fink-Komponenten auf drei Basen

Frage: Wäre Fink mit einer Headless-Bibliothek besser umsetzbar gewesen als mit KoliBri?

Das Experiment baut zwei typische Fink-Komponenten auf React Aria und auf Lion nach und vergleicht sie mit den echten,
unveränderten Fink-Komponenten auf KoliBri. Alle drei Varianten erfüllen dieselbe Vorgabe und durchlaufen dieselben
automatischen Prüfungen.

Gesammelte Erkenntnisse, Stolpersteine und der Verlauf stehen in [ERKENNTNISSE.md](ERKENNTNISSE.md), ein Artikelentwurf in
[docs/artikel/kolibri-headless-medium.md](../../docs/artikel/kolibri-headless-medium.md).

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
| KoliBri 4.7.0-rc.0 | `@public-ui/components` 4.7.0-rc.0, Fink-Theme, wie Fink heute | Fink-Quellen beider Komponenten, `fink-chip`, Hilfsfunktionen, deutsche Texte |
| KoliBri 4.5.0 | gleicher Fink-Code auf KoliBri 4.5.0 (`KOLIBRI_BUILD=4.5`) | wie KoliBri 4.7.0-rc.0 |
| KoliBri 4.6.0 | gleicher Fink-Code auf KoliBri 4.6.0 (`KOLIBRI_BUILD=4.6`) | wie KoliBri 4.7.0-rc.0 |
| KoliBri 4.7.0-rc.0 schlank | wie KoliBri 4.7.0-rc.0, Build mit `scripts/kolibri-icon-prune.mjs`: im Theme nur die genutzten Icons (`KOLIBRI_BUILD=slim`) | wie KoliBri 4.7.0-rc.0 |
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
pnpm kolibri:versions            # KoliBri 4.5.0 und 4.6.0 von npm nach .kolibri/
pnpm spike                       # bauen, prüfen, messen; schreibt ERGEBNIS.md und results/ergebnis.json
pnpm dev                         # Varianten im Browser ansehen
```

Gemessen wurde zunächst mit 4.7 aus `release/4` (Commit `794c476` vom 19.11.2026), danach mit der veröffentlichten
Vorabversion 4.7.0-rc.0. Die Werte stimmen bis auf 1 bis 2 KB überein.

## Ergebnis

Die Zahlen stehen in [ERGEBNIS.md](ERGEBNIS.md). Kurzfassung:

| | KoliBri 4.5.0 | KoliBri 4.6.0 | KoliBri 4.7.0-rc.0 | KoliBri 4.7.0-rc.0 schlank | React Aria | Lion |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Prüfungen bestanden (von 17) | 16, eine nicht simulierbar | 16, eine nicht simulierbar | 16, eine nicht simulierbar | 16, eine nicht simulierbar | 16, eine nicht simulierbar | 17 |
| Eigener Code (Zeilen) | 592 | 592 | 592 | 592 | 455 | 472 |
| davon Gestaltung (CSS) | 175 | 175 | 175 | 175 | 225 | 269 |
| Geladen, Prüfseite (gzip) | 2.182 KB | 448 KB | 395 KB | 368 KB | 155 KB | 67 KB |
| Geladen, Seite ohne Badge (gzip) | 2.160 KB | 432 KB | 379 KB | 353 KB | – | – |

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

**Ladegröße.** Fink lädt mit KoliBri 4.7.0-rc.0 395 KB gzip, mit 4.6.0 waren es 448 KB, mit 4.5.0 2.182 KB
(siehe „KoliBri 4.5, 4.6 und 4.7 im Vergleich“).

Die Prüfseiten sind untereinander nicht vergleichbar: Die KoliBri-Seite lädt zusätzlich Icon-Schriften (Codicons
49 KB, Font Awesome 20 KB gzip), alle 44 Fink-Komponenten (43 KB) und React mit Finks React-Schicht (60 KB). Mit
gleichem Umfang, also Bibliothek, Laufzeit, Theme oder eigenes CSS und Code der beiden Komponenten (gzip, Anteile aus
der Source Map):

| | KoliBri 4.5.0 | KoliBri 4.6.0 | KoliBri 4.7.0-rc.0 | React Aria | Lion |
| --- | ---: | ---: | ---: | ---: | ---: |
| Bibliothek mit Abhängigkeiten | 137 KB | 126 KB | 73 KB | 91 KB | 56 KB |
| Laufzeit der Komponenten | 22 KB (Stencil, Fink) | 21 KB | 22 KB | 59 KB (React) | 5 KB (Lit) |
| Gestaltung: Theme bzw. eigenes CSS | 1.838 KB | 115 KB | 115 KB | 1 KB | 0,4 KB |
| Code der beiden Komponenten und der Seite | 7 KB | 6 KB | 7 KB | 4 KB | 7 KB |
| **Summe** | **2.003 KB** | **269 KB** | **217 KB** | **155 KB** | **68 KB** |
| Summe mit Theme nur für genutzte Komponenten und Icons (geschätzt) | – | 168 KB | 116 KB | 155 KB | 68 KB |

Das Default-Theme gestaltet alle 45 KoliBri-Komponenten, Lion und React Aria haben nur CSS für diese beiden. Die
geschätzte Zeile rechnet das Theme auf `GLOBAL` mit den genutzten Icons und die Stile der drei genutzten Komponenten
herunter. Das Default-Theme macht jetzt 952 KB minifiziert aus, 115 KB gzip: 187 KB `GLOBAL` mit
Icon-CSS und die Stile aller 45 Komponenten.

Die Variante „KoliBri 4.7.0-rc.0 schlank“ entfernt beim Build alle Icon-Regeln, die weder KoliBri intern noch Fink nutzt
(`scripts/kolibri-icon-prune.mjs`, ein Vite-Plugin mit rund 30 Zeilen). Sie lädt 368 KB gzip, bei denselben
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
Quelle zu. Die vollständige Aufstellung je Komponente steht in [SOURCEMAP.md](SOURCEMAP.md). Für „KoliBri 4.7.0-rc.0 schlank“
(Skripte, minifiziert):

| Herkunft | minifiziert | Anmerkung |
| --- | ---: | --- |
| KoliBri theme | 780 KB | Stile aller 45 Komponenten, auch der nicht genutzten. Die drei genutzten brauchen rund 60 KB. |
| KoliBri core | 233 KB | Bis 4.6 kamen 136 KB markdown-it mit `entities` und `linkify-it` dazu, importiert über `SpanFC`, die gemeinsame Beschriftung fast aller Komponenten. |
| React | 188 KB | wie bei React Aria |
| Fink components | 150 KB | alle 44, weil `@fink/react` jede Komponente registriert. Genutzt werden zwei. |
| KoliBri components | 55 KB | genau die vier genutzten: `kol-input-file`, `kol-input-text`, `kol-badge`, `kol-icon` |
| Fink core, theme, tokens | 87 KB | Stencil-Laufzeit von Fink, Texte, Overrides |

Als interaktive Treemap: `pnpm spike:treemap` schreibt je Variante eine Karte nach `analyse/` (rollup-plugin-visualizer).
Für diese Analyse-Builds zerlegt `scripts/kolibri-analyse-split.mjs` das KoliBri theme je Stil (GLOBAL und je
Komponente) in Icon-CSS und übrige Stile. Die Analyse-Builds sind nicht lauffähig, die Theme-Größen sind exakt.

Die gzip-Anteile in SOURCEMAP.md sind anteilig je Chunk geschätzt. Wo Theme und React im selben Chunk liegen,
verschieben sie sich. Die minifizierten Bytes sind exakt.

Daraus ergaben sich vier Hebel. Zwei davon hat KoliBri inzwischen umgesetzt:

1. Icon-CSS im theme nur einmal: seit KoliBri 4.6.0 (public-ui/kolibri#11623). Offen bleibt, nur die genutzten
   Icon-Sets auszuliefern.
2. theme-Stile nur für die genutzten Komponenten laden: offen.
3. markdown-it aus dem gemeinsamen core entfernen: ab 4.7 durch einen kleinen Inline-Renderer ersetzt
   (public-ui/kolibri#11627, #11637).
4. In Fink nur die genutzten Komponenten registrieren statt aller 44: offen, liegt bei Fink.

## KoliBri 4.5, 4.6 und 4.7 im Vergleich

Derselbe Fink-Code auf drei KoliBri-Versionen. 4.7 ist die Vorabversion 4.7.0-rc.0.

| | 4.5.0 | 4.6.0 | 4.7 |
| --- | ---: | ---: | ---: |
| Prüfseite (gzip) | 2.182 KB | 448 KB | 395 KB |
| Seite ohne Badge (gzip) | 2.160 KB | 432 KB | 379 KB |
| KoliBri theme (gzip) | 1.838 KB | 115 KB | 115 KB |
| KoliBri core (gzip) | 112 KB | 111 KB | 57 KB |
| KoliBri components, die vier genutzten (gzip) | 25 KB | 15 KB | 15 KB |
| KoliBri ohne Theme: core und Komponenten (minifiziert) | 435 KB | 420 KB | 288 KB |
| JS-Speicher nach 900 Komponenten | 73 MB | 15 MB | 14 MB |
| Prüfungen | alle bestanden | alle bestanden | alle bestanden |

- **4.5 → 4.6:** Das Default-Theme legt das Icon-CSS einmal in `GLOBAL` statt in 40 Komponentenstile
  (public-ui/kolibri#11623). Die Prüfseite schrumpft auf ein Fünftel, der JS-Speicher ebenso. Die vier genutzten
  Komponenten sind zusammen 10 KB gzip kleiner.
- **4.6 → 4.7:** markdown-it samt `entities`, `linkify-it`, `punycode`, `mdurl` und `uc.micro` entfällt
  (public-ui/kolibri#11627, #11637). Ein eigener Renderer kann fett, kursiv, durchgestrichen, Inline-Code und
  Zeilenumbrüche; Links und Bilder bleiben sichtbarer Text. Der core halbiert sich, die Prüfseite verliert 54 KB gzip,
  auch mit Badge. `tests/markdown.spec.ts` prüft in allen Versionen, dass `**wichtig**` als `<strong>` erscheint und
  `<ok>` maskiert bleibt.
- **Laufzeit:** Rendern, Stilberechnung und Layout liegen in allen drei Versionen im Rahmen der Messstreuung
  ([PERF.md](PERF.md)).

Ohne Theme gerechnet liegt KoliBri mit 4.7 bei 288 KB minifiziert, zwischen Lion (221 KB) und React Aria (325 KB ohne
React, 513 KB mit).

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
| 4.5.0, 40 Kopien | 2.181 KB | 2.159 KB |
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
Pflege durch das ITZBund und im BITV-orientierten Prüfverfahren. Sein messbarer Nachteil war die Ladegröße. Mit 4.6
sank sie auf ein Fünftel, mit 4.7 entfällt markdown-it; beides nach Meldungen aus diesem Experiment. Der nächste aufschlussreiche Schritt wäre derselbe Vergleich für einen komplexen Baustein,
etwa eine sortierbare Tabelle oder eine Datumswahl.
