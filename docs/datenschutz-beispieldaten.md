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

## Offene Funde (bewusst zurückgestellt)

Diese Stellen liegen in Komponenten- oder i18n-Dateien, die gerade für die Barrierefreiheit überarbeitet werden.
Um Merge-Konflikte zu vermeiden, werden sie erst danach angepasst.

| Fund | Fundstelle | Vorschlag |
| --- | --- | --- |
| `beispiel.de` in Sample-Mails | `compositions/konto/KontoApp.tsx` (Profil, Login-Vorbelegung), `compositions/buerger-app/BuergerApp.tsx:238` | `erika.mustermann@example.org` |
| `beispiel.de` in Platzhaltern und Fehlertexten | `compositions/online-antrag/OnlineAntragApp.tsx:77`, `compositions/hilfe/HilfeApp.tsx:304`, `patterns/forms.tsx`, `catalog/*.tsx` | `name@example.org`. **Die deutschen i18n-Schlüssel in `i18n/en/site*.ts` mitziehen**, sonst fehlt die Übersetzung |
| `example.com` in englischen Übersetzungen | `i18n/en/site*.ts` | auf `example.org` vereinheitlichen (optional, `example.com` ist ebenfalls reserviert) |
| Telefonnummer `030 1234567` liegt in einem regulär vergebbaren Berliner Nummernbereich | `compositions/konto/KontoApp.tsx:42` | `030 23125 123` (BNetzA-Medienbereich, vorher prüfen) |
| „Bürgeramt Mitte“ ist eine reale Berliner Behörde | `compositions/buerger-app/BuergerApp.tsx:62, 90` und die i18n-Schlüssel | „Bürgeramt Musterstadt“ |
| Sitzungsorte „Berlin“ und „Potsdam“ im Konto | `compositions/konto/KontoApp.tsx` | unkritisch (Großstädte), optional so lassen |
| Kontaktnamen in Katalog-Demos (Malik Yilmaz, Petra Lang, Klara Vogt) | `catalog/fink-more.tsx:15–18` | unkritisch, weil ohne Organisationsbezug |
| Firmennamen in Katalog-Demos (Mühlenwerk GmbH, Sonnentau eG, Kranich & Söhne KG, Lindenhof Bäckerei) | `catalog/fink-more.tsx:430–432`, `catalog/kolibri.tsx:102–105`, `KontoApp.tsx:42` | generisch und konsistent mit `foerderportal/data.ts`. Optional später durch Kunstwörter ersetzen |

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
