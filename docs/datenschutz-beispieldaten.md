# Datenschutz: Beispieldaten

Alle Beispieldaten im Showcase sollen **maximal fiktiv** sein. Keine Demo darf echte Personen, Firmen,
Behörden, Domains oder Telefonanschlüsse treffen.

## Regeln

| Datentyp | Regel | Beispiel |
| --- | --- | --- |
| E-Mail | Nur reservierte Domains nach RFC 2606: `example.org` (bevorzugt), `example.com`, `*.example` | `erika.mustermann@example.org` |
| Personen | Offizieller Mustername oder häufige Vor- und Nachnamen, **nie** mit einer realen Organisation oder einem kleinen Ort verknüpft | Erika Mustermann |
| Firmen | Fantasie-Kunstwörter statt „Nachname + Gewerk + Ort“ | Flinkfeder Druck GmbH |
| Orte | Nur Großstädte (Berlin, Hamburg, München, Köln …) oder Musternamen | Musterstadt |
| Behörden / Körperschaften | Musternamen, keine realen Gemeinden, Ämter, Stadtwerke oder Bürgerämter | Gemeinde Musterhausen |
| Telefon | Nur Nummern aus dem Bereich, den die Bundesnetzagentur für Medienproduktionen reserviert hat (vor Verwendung auf bundesnetzagentur.de prüfen), sonst maskiert | `030 23125 xxx`, `+49 151 ••• 42` |
| IBAN | Nur mit ungültiger Prüfsumme | `DE12 3456 7890 1234 5678 90` |
| Bilder | Keine Fotos realer Personen, keine externen Avatar-Dienste | Inline-SVG |

## Bereits umgesetzt

- `apps/showcase/src/patterns/sample-data.ts`: E-Mails jetzt unter `example.org` statt `beispiel.de`.
  `beispiel.de` ist eine echte, registrierte Domain.
- `apps/showcase/src/compositions/foerderportal/data.ts`: E-Mails unter `example.org`. Die Antragsteller wurden neu gefasst:
  Statt der Kombination aus Nachname, Gewerk und echter Kleinstadt (z. B. „Druckerei Albers, Osnabrück“) gibt es jetzt
  Fantasienamen in Großstädten. Reale Körperschaften wie Gemeinde Waldbrunn, Gemeinde Hohenfels, Amt Seenland und
  Stadtwerke Talheim wurden durch Musternamen ersetzt. Das war besonders wichtig, weil einige davon den Status
  „Abgelehnt“ hatten.
- In Komponenten, Platzhaltern, Fehlertexten und i18n-Dateien steht `beispiel.de` bzw. `example.com` jetzt einheitlich als
  `example.org`, die deutschen Übersetzungsschlüssel in `i18n/en/site*.ts` wurden mitgezogen. Nebeneffekt: Die
  Login-Demo in `patterns/forms.tsx` funktioniert jetzt auch auf Englisch. Vorher zeigte der englische Hinweis
  `erika@example.com`, geprüft wurde aber `erika@beispiel.de`.
- Telefonnummer in `compositions/konto/KontoApp.tsx`: `030 1234567` → `030 23125 123`. Das ist der Bereich, den die
  Bundesnetzagentur für Medienproduktionen reserviert hat („Drama Numbers“, Berlin: 030 23125 000–999, geprüft auf
  bundesnetzagentur.de).
- „Bürgeramt Mitte“ (eine reale Berliner Behörde) → „Bürgeramt Musterstadt“ in `BuergerApp.tsx`, `catalog/fink-more.tsx`
  und den englischen Übersetzungen.

## Bewusst unverändert

| Stelle | Begründung |
| --- | --- |
| Sitzungsorte „Berlin“ und „Potsdam“ in `KontoApp.tsx` | Großstädte, ohne Personenbezug |
| Kontaktnamen in Katalog-Demos (Malik Yilmaz, Petra Lang, Klara Vogt) | häufige Namen ohne Organisationsbezug |
| Firmennamen Mühlenwerk GmbH, Sonnentau eG, Kranich & Söhne KG, Lindenhof Bäckerei in `catalog/*.tsx` und `KontoApp.tsx` | generisch, nicht mit einem Ort verknüpft und konsistent mit `foerderportal/data.ts` |

## Geprüft und unkritisch

- „Erika Mustermann“: offizieller Mustername der Bundesdruckerei.
- „Musterweg 4, 10115 Berlin“ und das Geburtsdatum „12.03.1984“: an den Musternamen gebunden.
- IBAN `DE12 3456 7890 1234 5678 90`: Die Prüfsumme ist ungültig (mod 97 = 31, nicht 1).
- `+49 151 ••• 42`: maskiert.
- Bilder: ausschließlich Inline-SVG-Illustrationen, keine externen Bild- oder Avatar-Dienste.

## Prüfbefehle

```bash
git grep -nI 'beispiel\.de' -- apps packages
git grep -nIE '\b0[1-9][0-9]{1,4}[ /-]?[0-9]{5,}' -- apps packages
```
