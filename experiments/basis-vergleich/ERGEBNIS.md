# Ergebnis des Basisvergleichs

Stand 2026-11-17. Erzeugt mit `pnpm spike`, nicht von Hand bearbeiten.

## Eigener Code je Variante

Zeilen ohne Leerzeilen und Kommentare. Bei KoliBri sind es die Fink-Quellen beider Komponenten samt `fink-chip`, Hilfsfunktionen und deutschen Texten.

| | KoliBri | React Aria | Lion |
| --- | ---: | ---: | ---: |
| Logik und Texte | 417 | 230 | 203 |
| Gestaltung (CSS) | 175 | 225 | 269 |
| **Summe** | **592** | **455** | **472** |

## Beim Seitenaufruf geladen

Skripte, Stylesheets und Schriften der Prüfseite mit beiden Komponenten.

| | KoliBri | React Aria | Lion |
| --- | ---: | ---: | ---: |
| Anfragen | 9 | 6 | 10 |
| Skripte, unkomprimiert | 13.719 KB | 520 KB | 237 KB |
| Skripte, gzip | 1.986 KB | 152 KB | 65 KB |
| Stylesheets und Schriften | 134 KB | 8 KB | 5 KB |
| Gesamt, gzip | 2.013 KB | 155 KB | 67 KB |

## Prüfungen

| Prüfung | KoliBri | React Aria | Lion |
| --- | --- | --- | --- |
| Tag per Tastatur mit Enter übernehmen | bestanden | bestanden | bestanden |
| Freie Eingabe mit Komma übernehmen | bestanden | bestanden | bestanden |
| Vorschlag per Pfeiltaste wählen | nicht simulierbar | bestanden | bestanden |
| Doppelten Eintrag mit Meldung abweisen | bestanden | bestanden | bestanden |
| Rücktaste im leeren Feld entfernt den letzten Eintrag | bestanden | bestanden | bestanden |
| Eintrag per Tastatur über den Entfernen-Knopf löschen | bestanden | bestanden | bestanden |
| Höchstzahl sperrt das Feld | bestanden | bestanden | bestanden |
| Gültige Datei über die Dateiauswahl hinzufügen | bestanden | bestanden | bestanden |
| Zu große Datei mit Meldung abweisen | bestanden | bestanden | bestanden |
| Falschen Dateityp mit Meldung abweisen | bestanden | bestanden | bestanden |
| Datei über den Entfernen-Knopf löschen | bestanden | bestanden | bestanden |
| Datei per Ziehen und Ablegen hinzufügen | bestanden | nicht simulierbar | bestanden |
| Fokus ist im Hochkontrastmodus sichtbar | bestanden | bestanden | bestanden |
| Kein seitliches Scrollen bei 320 Pixeln | bestanden | bestanden | bestanden |
| Alle sichtbaren Texte auf Deutsch | bestanden | bestanden | bestanden |
| Keine axe-Funde nach Interaktion | bestanden | bestanden | bestanden |
| Keine Konsolenfehler | bestanden | bestanden | bestanden |

- KoliBri, „Vorschlag per Pfeiltaste wählen“: Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.
- React Aria, „Datei per Ziehen und Ablegen hinzufügen“: Nicht simulierbar: React Aria prüft dataTransfer.effectAllowed, das bei synthetischen Ereignissen immer „none“ ist.
