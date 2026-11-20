# Renderzeit mit vielen Komponenten

Stand 2026-11-20. Erzeugt mit `pnpm spike:perf`, nicht von Hand bearbeiten.

Je Komponententyp 150 Elemente, Median aus 7 Läufen, Chromium ohne Drosselung. „Rendern“ ist die Zeit vom Einfügen bis alle Elemente fertig gezeichnet sind. „Stilberechnung“ und „Layout“ stammen aus dem Chrome-DevTools-Protokoll. „JS-Speicher“ ist der belegte JavaScript-Heap nach dem Rendern; darin liegen auch die CSS-Strings des Themes.

## Nur Komponenten ohne Icons (450 Elemente: kol-heading, kol-progress, kol-quote)

| | KoliBri 4.5.0 | KoliBri 4.6.0 | KoliBri 4.7.0-rc.0 | KoliBri 4.7.0-rc.0, nur genutzte Icons |
| --- | ---: | ---: | ---: | ---: |
| Rendern | 461 ms | 488 ms | 542 ms | 448 ms |
| Stilberechnung | 47 ms | 54 ms | 63 ms | 52 ms |
| Layout | 104 ms | 93 ms | 94 ms | 82 ms |
| JS-Speicher | 69,6 MB | 9,7 MB | 9,1 MB | 8,5 MB |

## Gemischt, mit und ohne Icons (900 Elemente: kol-heading, kol-progress, kol-quote, kol-button, kol-badge, kol-input-text)

| | KoliBri 4.5.0 | KoliBri 4.6.0 | KoliBri 4.7.0-rc.0 | KoliBri 4.7.0-rc.0, nur genutzte Icons |
| --- | ---: | ---: | ---: | ---: |
| Rendern | 1.243 ms | 1.216 ms | 1.066 ms | 1.024 ms |
| Stilberechnung | 140 ms | 133 ms | 118 ms | 108 ms |
| Layout | 227 ms | 179 ms | 149 ms | 149 ms |
| JS-Speicher | 73,2 MB | 14,6 MB | 13,9 MB | 13,3 MB |
