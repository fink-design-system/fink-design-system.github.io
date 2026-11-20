# Ergebnis des Basisvergleichs

Stand 2026-11-20. Erzeugt mit `pnpm spike`, nicht von Hand bearbeiten.

## Eigener Code je Variante

Zeilen ohne Leerzeilen und Kommentare. Bei KoliBri sind es die Fink-Quellen beider Komponenten samt `fink-chip`, Hilfsfunktionen und deutschen Texten.

| | KoliBri 4.5.0 | KoliBri 4.6.0 | KoliBri 4.7.0-rc.0 | KoliBri 4.7.0-rc.0 schlank | React Aria | Lion |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Logik und Texte | 417 | 417 | 417 | 417 | 230 | 203 |
| Gestaltung (CSS) | 175 | 175 | 175 | 175 | 225 | 269 |
| **Summe** | **592** | **592** | **592** | **592** | **455** | **472** |

## Beim Seitenaufruf geladen

Skripte, Stylesheets und Schriften der Prüfseite mit beiden Komponenten.

| | KoliBri 4.5.0 | KoliBri 4.6.0 | KoliBri 4.7.0-rc.0 | KoliBri 4.7.0-rc.0 schlank | React Aria | Lion |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Anfragen | 64 | 60 | 64 | 60 | 7 | 11 |
| Skripte, unkomprimiert | 14.036 KB | 1.825 KB | 1.692 KB | 1.520 KB | 520 KB | 237 KB |
| Skripte, gzip | 2.110 KB | 377 KB | 323 KB | 297 KB | 152 KB | 66 KB |
| Stylesheets und Schriften | 214 KB | 214 KB | 214 KB | 214 KB | 8 KB | 5 KB |
| Gesamt, gzip | 2.182 KB | 448 KB | 395 KB | 368 KB | 155 KB | 67 KB |

## KoliBri auf einer Seite ohne Badge

Nur `fink-file-upload`, kein `kol-badge`. Zeigt, was eine Seite ohne Badge lädt.

| | KoliBri 4.5.0 | KoliBri 4.6.0 | KoliBri 4.7.0-rc.0 | KoliBri 4.7.0-rc.0 schlank |
| --- | ---: | ---: | ---: | ---: |
| Anfragen | 51 | 47 | 51 | 47 |
| Skripte, gzip | 2.088 KB | 361 KB | 308 KB | 281 KB |
| Gesamt, gzip | 2.160 KB | 432 KB | 379 KB | 353 KB |

## Prüfungen

| Prüfung | KoliBri 4.5.0 | KoliBri 4.6.0 | KoliBri 4.7.0-rc.0 | KoliBri 4.7.0-rc.0 schlank | React Aria | Lion |
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

- KoliBri 4.7.0-rc.0, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- KoliBri 4.7.0-rc.0 schlank, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- KoliBri 4.5.0, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- KoliBri 4.6.0, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- React Aria, „Datei per Ziehen und Ablegen hinzufügen“: Nicht simulierbar: React Aria prüft dataTransfer.effectAllowed, das bei synthetischen Ereignissen immer „none“ ist.
