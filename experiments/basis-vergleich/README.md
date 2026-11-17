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
| KoliBri    | `@public-ui/components` 4.6.0-rc.2, Fink-Theme           | Fink-Quellen beider Komponenten, `fink-chip`, Hilfsfunktionen, deutsche Texte       |
| KoliBri schlank | wie KoliBri, Build mit `scripts/kolibri-icon-prune.ts`: im Theme nur die genutzten Icons | wie KoliBri                                  |
| React Aria | `react-aria-components` 1.22.1 (ComboBox, TagGroup, DropZone, FileTrigger) | `src/react-aria/*`, `src/shared/texts.ts`                         |
| Lion       | `@lion/ui` 0.25.0 (lion-combobox, lion-input-file, lion-button) | `src/lion/*`, `src/shared/texts.ts`                                          |

## Spielregeln

- Gleiche Vorgabe: Funktionsumfang, Tastaturbedienung und deutsche Texte von `fink-tag-input` und `fink-file-upload`.
- Gleiche Gestaltung: alle Varianten nutzen die Fink-Tokens und sehen gleichwertig aus. React Aria und Lion bringen
  dafür eigenes CSS mit, einschließlich Fokus und Hochkontrastmodus.
- Keine Zusatzfunktionen über die Vorgabe hinaus.
- Gleiche Prüfungen (`tests/basis.spec.ts`): Elemente werden über Rollen und zugängliche Namen gefunden. Nur die
  Ablagestelle für Ziehen und Ablegen ist je Variante angegeben.
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

| | KoliBri | KoliBri schlank | React Aria | Lion |
| --- | ---: | ---: | ---: | ---: |
| Prüfungen bestanden (von 17) | 16, eine nicht simulierbar | 16, eine nicht simulierbar | 16, eine nicht simulierbar | 17 |
| Eigener Code (Zeilen) | 592 | 592 | 455 | 472 |
| davon Gestaltung (CSS) | 175 | 175 | 225 | 269 |
| Geladen beim Seitenaufruf (gzip) | 2.174 KB | 460 KB | 155 KB | 67 KB |

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

**Ladegröße.** Fink lädt in der heutigen Form 2.174 KB gzip. Fast alles davon ist das Default-Theme
`@public-ui/theme-default`, das Fink erweitert. 12,2 der 12,9 MB Theme-CSS sind mitgelieferte Icon-Stile (Font
Awesome, Codicons, Kolicons samt `@font-face`), eingebettet in 40 Komponentenstile. Die eigentliche Gestaltung der
Komponenten macht nur 755 KB aus, 55 KB gzip.

Die Variante „KoliBri schlank“ entfernt beim Build alle Icon-Regeln, die weder KoliBri intern noch Fink nutzt
(`scripts/kolibri-icon-prune.ts`, ein Vite-Plugin mit rund 30 Zeilen). Sie lädt 460 KB gzip, bei pixelgleicher
Darstellung und denselben bestandenen Prüfungen. Davon entfallen rund 70 KB auf global geladene Icon-Schriften,
darunter Font Awesome, das Fink gar nicht nutzt.

KoliBri lädt Komponenten einzeln nach. Auf der Prüfseite sind es vier (`kol-input-text`, `kol-input-file`,
`kol-badge`, `kol-icon`), zusammen rund 20 KB. Über alle 52 Komponenten liegt der Median bei 4,3 KB gzip. Der Kern
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
