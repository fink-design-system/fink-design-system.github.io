# Renderzeit mit vielen Komponenten

Stand 2026-11-20. Erzeugt mit `pnpm spike:perf`, nicht von Hand bearbeiten.

Je Komponententyp 150 Elemente, Median aus 7 Läufen, Chromium ohne Drosselung. „Rendern“ ist die Zeit vom Einfügen bis alle Elemente fertig gezeichnet sind. „Stilberechnung“ und „Layout“ stammen aus dem Chrome-DevTools-Protokoll. „JS-Speicher“ ist der belegte JavaScript-Heap nach dem Rendern; darin liegen auch die CSS-Strings des Themes.

## Nur Komponenten ohne Icons (450 Elemente: kol-heading, kol-progress, kol-quote)

| | KoliBri 4.6.0 (Icon-CSS in GLOBAL) | KoliBri 4.6.0, nur genutzte Icons |
| --- | ---: | ---: |
| Rendern | 352 ms | 300 ms |
| Stilberechnung | 41 ms | 30 ms |
| Layout | 59 ms | 57 ms |
| JS-Speicher | 9,7 MB | 9,1 MB |

## Gemischt, mit und ohne Icons (900 Elemente: kol-heading, kol-progress, kol-quote, kol-button, kol-badge, kol-input-text)

| | KoliBri 4.6.0 (Icon-CSS in GLOBAL) | KoliBri 4.6.0, nur genutzte Icons |
| --- | ---: | ---: |
| Rendern | 730 ms | 797 ms |
| Stilberechnung | 75 ms | 72 ms |
| Layout | 105 ms | 105 ms |
| JS-Speicher | 14,6 MB | 13,9 MB |
