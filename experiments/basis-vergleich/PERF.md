# Renderzeit mit vielen Komponenten

Stand 2026-11-20. Erzeugt mit `pnpm spike:perf`, nicht von Hand bearbeiten.

Je Komponententyp 150 Elemente, Median aus 7 Läufen, Chromium ohne Drosselung. „Rendern“ ist die Zeit vom Einfügen bis alle Elemente fertig gezeichnet sind. „Stilberechnung“ und „Layout“ stammen aus dem Chrome-DevTools-Protokoll. „JS-Speicher“ ist der belegte JavaScript-Heap nach dem Rendern; darin liegen auch die CSS-Strings des Themes.

## Nur Komponenten ohne Icons (450 Elemente: kol-heading, kol-progress, kol-quote)

| | KoliBri 4.5.0 | KoliBri 4.6.0 | KoliBri 4.7 (release/4) | KoliBri 4.6.0, nur genutzte Icons |
| --- | ---: | ---: | ---: | ---: |
| Rendern | 275 ms | 313 ms | 321 ms | 395 ms |
| Stilberechnung | 27 ms | 32 ms | 38 ms | 34 ms |
| Layout | 59 ms | 56 ms | 58 ms | 72 ms |
| JS-Speicher | 69,6 MB | 9,7 MB | 9,1 MB | 9,1 MB |

## Gemischt, mit und ohne Icons (900 Elemente: kol-heading, kol-progress, kol-quote, kol-button, kol-badge, kol-input-text)

| | KoliBri 4.5.0 | KoliBri 4.6.0 | KoliBri 4.7 (release/4) | KoliBri 4.6.0, nur genutzte Icons |
| --- | ---: | ---: | ---: | ---: |
| Rendern | 688 ms | 676 ms | 720 ms | 841 ms |
| Stilberechnung | 70 ms | 68 ms | 72 ms | 80 ms |
| Layout | 95 ms | 97 ms | 98 ms | 105 ms |
| JS-Speicher | 73,2 MB | 14,6 MB | 13,9 MB | 14,0 MB |
