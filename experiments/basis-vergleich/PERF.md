# Renderzeit mit vielen Komponenten

Stand 2026-11-17. Erzeugt mit `pnpm spike:perf`, nicht von Hand bearbeiten.

Je Komponententyp 150 Elemente, Median aus 7 Läufen, Chromium ohne Drosselung. „Rendern“ ist die Zeit vom Einfügen bis alle Elemente fertig gezeichnet sind. „Stilberechnung“ und „Layout“ stammen aus dem Chrome-DevTools-Protokoll. „JS-Speicher“ ist der belegte JavaScript-Heap nach dem Rendern; darin liegen auch die CSS-Strings des Themes.

## Nur Komponenten ohne Icons (450 Elemente: kol-heading, kol-progress, kol-quote)

| | KoliBri (Fink heute) | KoliBri icons in GLOBAL | KoliBri icons in GLOBAL, gekürzt | KoliBri schlank |
| --- | ---: | ---: | ---: | ---: |
| Rendern | 422 ms | 500 ms | 434 ms | 420 ms |
| Stilberechnung | 37 ms | 118 ms | 40 ms | 38 ms |
| Layout | 80 ms | 70 ms | 77 ms | 74 ms |
| JS-Speicher | 69,6 MB | 11,0 MB | 8,7 MB | 10,8 MB |

## Gemischt, mit und ohne Icons (900 Elemente: kol-heading, kol-progress, kol-quote, kol-button, kol-badge, kol-input-text)

| | KoliBri (Fink heute) | KoliBri icons in GLOBAL | KoliBri icons in GLOBAL, gekürzt | KoliBri schlank |
| --- | ---: | ---: | ---: | ---: |
| Rendern | 980 ms | 1.038 ms | 955 ms | 1.000 ms |
| Stilberechnung | 105 ms | 229 ms | 99 ms | 96 ms |
| Layout | 128 ms | 130 ms | 134 ms | 144 ms |
| JS-Speicher | 73,2 MB | 15,8 MB | 13,5 MB | 15,6 MB |
