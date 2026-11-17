# Ergebnis des Basisvergleichs

Stand 2026-11-17. Erzeugt mit `pnpm spike`, nicht von Hand bearbeiten.

## Eigener Code je Variante

Zeilen ohne Leerzeilen und Kommentare. Bei KoliBri sind es die Fink-Quellen beider Komponenten samt `fink-chip`, Hilfsfunktionen und deutschen Texten.

| | KoliBri | KoliBri schlank | KoliBri schlank + lazy markdown | KoliBri icons in GLOBAL | KoliBri icons in GLOBAL, gekürzt | React Aria | Lion |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Logik und Texte | 417 | 417 | 417 | 417 | 417 | 230 | 203 |
| Gestaltung (CSS) | 175 | 175 | 175 | 175 | 175 | 225 | 269 |
| **Summe** | **592** | **592** | **592** | **592** | **592** | **455** | **472** |

## Beim Seitenaufruf geladen

Skripte, Stylesheets und Schriften der Prüfseite mit beiden Komponenten.

| | KoliBri | KoliBri schlank | KoliBri schlank + lazy markdown | KoliBri icons in GLOBAL | KoliBri icons in GLOBAL, gekürzt | React Aria | Lion |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Anfragen | 67 | 63 | 64 | 63 | 63 | 7 | 11 |
| Skripte, unkomprimiert | 14.018 KB | 2.034 KB | 2.037 KB | 2.208 KB | 1.596 KB | 520 KB | 237 KB |
| Skripte, gzip | 2.102 KB | 389 KB | 390 KB | 421 KB | 344 KB | 152 KB | 66 KB |
| Stylesheets und Schriften | 214 KB | 214 KB | 214 KB | 214 KB | 214 KB | 8 KB | 5 KB |
| Gesamt, gzip | 2.174 KB | 460 KB | 461 KB | 492 KB | 416 KB | 155 KB | 67 KB |

## KoliBri auf einer Seite ohne Badge

Nur `fink-file-upload`, kein `kol-badge`. Hier zeigt sich, was das Nachladen von markdown-it spart.

| | KoliBri | KoliBri schlank | KoliBri schlank + lazy markdown | KoliBri icons in GLOBAL | KoliBri icons in GLOBAL, gekürzt |
| --- | ---: | ---: | ---: | ---: | ---: |
| Anfragen | 54 | 50 | 50 | 50 | 50 |
| Skripte, gzip | 2.087 KB | 373 KB | 319 KB | 405 KB | 329 KB |
| Gesamt, gzip | 2.158 KB | 444 KB | 390 KB | 477 KB | 400 KB |

## Prüfungen

| Prüfung | KoliBri | KoliBri schlank | KoliBri schlank + lazy markdown | KoliBri icons in GLOBAL | KoliBri icons in GLOBAL, gekürzt | React Aria | Lion |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Tag per Tastatur mit Enter übernehmen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Freie Eingabe mit Komma übernehmen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Vorschlag per Pfeiltaste wählen | nicht simulierbar | nicht simulierbar | nicht simulierbar | nicht simulierbar | nicht simulierbar | bestanden | bestanden |
| Doppelten Eintrag mit Meldung abweisen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Rücktaste im leeren Feld entfernt den letzten Eintrag | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Eintrag per Tastatur über den Entfernen-Knopf löschen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Höchstzahl sperrt das Feld | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Gültige Datei über die Dateiauswahl hinzufügen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Zu große Datei mit Meldung abweisen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Falschen Dateityp mit Meldung abweisen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Datei über den Entfernen-Knopf löschen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Datei per Ziehen und Ablegen hinzufügen | bestanden | bestanden | bestanden | bestanden | bestanden | nicht simulierbar | bestanden |
| Fokus ist im Hochkontrastmodus sichtbar | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Kein seitliches Scrollen bei 320 Pixeln | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Alle sichtbaren Texte auf Deutsch | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Keine axe-Funde nach Interaktion | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Keine Konsolenfehler | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Markdown in Badge-Beschriftung wird gerendert | bestanden | bestanden | bestanden | bestanden | bestanden | – | – |

- KoliBri, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- KoliBri schlank, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- KoliBri schlank + lazy markdown, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- KoliBri icons in GLOBAL, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- KoliBri icons in GLOBAL, gekürzt, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- React Aria, „Datei per Ziehen und Ablegen hinzufügen“: Nicht simulierbar: React Aria prüft dataTransfer.effectAllowed, das bei synthetischen Ereignissen immer „none“ ist.
