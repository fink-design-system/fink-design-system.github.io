# Ergebnis des Basisvergleichs

Stand 2026-11-20. Erzeugt mit `pnpm spike`, nicht von Hand bearbeiten.

## Eigener Code je Variante

Zeilen ohne Leerzeilen und Kommentare. Bei KoliBri sind es die Fink-Quellen beider Komponenten samt `fink-chip`, Hilfsfunktionen und deutschen Texten.

| | KoliBri | KoliBri schlank | KoliBri schlank + lazy markdown | KoliBri next (#11637) | React Aria | Lion |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Logik und Texte | 417 | 417 | 417 | 417 | 230 | 203 |
| Gestaltung (CSS) | 175 | 175 | 175 | 175 | 225 | 269 |
| **Summe** | **592** | **592** | **592** | **592** | **455** | **472** |

## Beim Seitenaufruf geladen

Skripte, Stylesheets und Schriften der Prüfseite mit beiden Komponenten.

| | KoliBri | KoliBri schlank | KoliBri schlank + lazy markdown | KoliBri next (#11637) | React Aria | Lion |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Anfragen | 64 | 60 | 61 | 60 | 7 | 11 |
| Skripte, unkomprimiert | 1.825 KB | 1.653 KB | 1.656 KB | 1.689 KB | 520 KB | 237 KB |
| Skripte, gzip | 378 KB | 352 KB | 353 KB | 322 KB | 153 KB | 66 KB |
| Stylesheets und Schriften | 214 KB | 214 KB | 214 KB | 214 KB | 8 KB | 5 KB |
| Gesamt, gzip | 450 KB | 423 KB | 425 KB | 393 KB | 155 KB | 68 KB |

## KoliBri auf einer Seite ohne Badge

Nur `fink-file-upload`, kein `kol-badge`. Hier zeigt sich, was das Nachladen von markdown-it spart.

| | KoliBri | KoliBri schlank | KoliBri schlank + lazy markdown | KoliBri next (#11637) |
| --- | ---: | ---: | ---: | ---: |
| Anfragen | 51 | 47 | 47 | 47 |
| Skripte, gzip | 362 KB | 336 KB | 282 KB | 306 KB |
| Gesamt, gzip | 434 KB | 407 KB | 353 KB | 377 KB |

## Prüfungen

| Prüfung | KoliBri | KoliBri schlank | KoliBri schlank + lazy markdown | KoliBri next (#11637) | React Aria | Lion |
| --- | --- | --- | --- | --- | --- | --- |
| Tag per Tastatur mit Enter übernehmen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Freie Eingabe mit Komma übernehmen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Vorschlag per Pfeiltaste wählen | nicht simulierbar | nicht simulierbar | nicht simulierbar | nicht simulierbar | bestanden | bestanden |
| Doppelten Eintrag mit Meldung abweisen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Rücktaste im leeren Feld entfernt den letzten Eintrag | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Eintrag per Tastatur über den Entfernen-Knopf löschen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Höchstzahl sperrt das Feld | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Gültige Datei über die Dateiauswahl hinzufügen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Zu große Datei mit Meldung abweisen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Falschen Dateityp mit Meldung abweisen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Datei über den Entfernen-Knopf löschen | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Datei per Ziehen und Ablegen hinzufügen | bestanden | bestanden | bestanden | bestanden | nicht simulierbar | bestanden |
| Fokus ist im Hochkontrastmodus sichtbar | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Kein seitliches Scrollen bei 320 Pixeln | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Alle sichtbaren Texte auf Deutsch | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Keine axe-Funde nach Interaktion | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Keine Konsolenfehler | bestanden | bestanden | bestanden | bestanden | bestanden | bestanden |
| Markdown in Badge-Beschriftung wird gerendert | bestanden | bestanden | bestanden | bestanden | – | – |

- KoliBri, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- KoliBri schlank, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- KoliBri schlank + lazy markdown, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- KoliBri next (#11637), „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- React Aria, „Datei per Ziehen und Ablegen hinzufügen“: Nicht simulierbar: React Aria prüft dataTransfer.effectAllowed, das bei synthetischen Ereignissen immer „none“ ist.
