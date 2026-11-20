---
status: Entwurf für Medium
titel: Headless oder KoliBri? Was ein Designsystem wirklich lädt, kostet und gewinnt
untertitel: Ein Experiment mit Fink, React Aria und Lion – und warum zwei Issues in drei Tagen die Rechnung verändert haben
sprache: de
stand: 20.11.2026, KoliBri 4.7.0-rc.0
tags: Design Systems, Web Components, Accessibility, Barrierefreiheit, Performance
---

# Headless oder KoliBri? Was ein Designsystem wirklich lädt, kostet und gewinnt

_Ein Experiment mit Fink, React Aria und Lion – und warum zwei Issues in drei Tagen die Rechnung verändert haben._

Wer heute ein Designsystem baut, bekommt fast reflexartig eine Empfehlung: „Nimm eine Headless-Bibliothek.“ React
Aria, Radix, Ark UI, Base UI oder Lion liefern Verhalten, Tastaturbedienung und ARIA-Semantik – und überlassen die
Gestaltung dir. Das klingt nach dem besten aus zwei Welten.

Wir wollten wissen, ob das für ein Designsystem der öffentlichen Verwaltung stimmt. Unser Prüfling ist **Fink**, ein
repräsentatives Designsystem mit 46 Komponenten, gebaut auf **KoliBri** (Public UI), der barrierefreien
Web-Component-Bibliothek des ITZBund. Die Frage: _Wäre Fink mit einer Headless-Bibliothek besser umsetzbar gewesen?_

Die Antwort ist differenzierter als erwartet. Und auf dem Weg dahin haben wir nebenbei KoliBri um vier Fünftel leichter
gemacht.

---

## Das Experiment: zwei Komponenten, drei Basen, dieselben Regeln

Wir haben zwei Fink-Komponenten auf React Aria und auf Lion nachgebaut:

- `fink-tag-input`: ein Eingabefeld für Schlagwörter mit Vorschlägen, Höchstzahl und Entfernen per Tastatur.
- `fink-file-upload`: eine Dateiauswahl mit Ziehen und Ablegen, Prüfung von Typ und Größe und einer Dateiliste.

Verglichen wurde mit den unveränderten Fink-Komponenten auf KoliBri. Die Spielregeln:

- **Gleiche Vorgabe:** derselbe Funktionsumfang, dieselbe Tastaturbedienung, dieselben deutschen Texte.
- **Gleiche Gestaltung:** alle Varianten nutzen die Fink-Tokens und sehen gleichwertig aus.
- **Gleiche Prüfungen:** 17 automatische Tests mit Playwright. Gefunden wird über Rollen und zugängliche Namen, nicht
  über CSS-Klassen. Geprüft werden Tastatur, Fehler- und Statusmeldungen, axe-core (WCAG 2.2 AA, EN 301 549),
  sichtbarer Fokus im Hochkontrastmodus, kein seitliches Scrollen bei 320 Pixeln, deutsche Texte und keine
  Konsolenfehler.

### Ergebnis 1: Funktional gleichwertig

Alle drei Varianten bestehen alle Prüfungen. Je eine Prüfung ist im Prüfstand nicht simulierbar: die native
Vorschlagsliste (`datalist`), die Chromium headless nicht öffnet, und das Ablegen bei React Aria, das
`dataTransfer.effectAllowed` prüft – bei synthetischen Ereignissen ist das immer „none“.

### Ergebnis 2: Kein Codevorteil für KoliBri – bei diesen beiden Komponenten

| Eigener Code (Zeilen ohne Leerzeilen und Kommentare) | KoliBri | React Aria | Lion |
| --- | ---: | ---: | ---: |
| Logik und Texte | 417 | 230 | 203 |
| Gestaltung (CSS) | 175 | 225 | 269 |
| **Summe** | **592** | **455** | **472** |

Das hat uns überrascht. Ein Teil erklärt sich durch Funktionen, die nur Fink hat (Sprachumschaltung zur Laufzeit,
Werte als JSON-Attribute, `reset()`). Ohne sie wären es geschätzt rund 520 Zeilen – immer noch mehr. Ein anderer Teil
ist Anpassungsarbeit: 37 Zeilen, weil `kol-badge` keine CSS-Variablen für Farben annimmt, und 144 Zeilen CSS für die
Drop-Zone um `kol-input-file`.

Headless kostet mehr CSS, aber weniger als gedacht: 50 bis 94 Zeilen mehr. Der Hochkontrastmodus schlug mit 23 Zeilen
bei React Aria und 36 bei Lion zu Buche.

### Ergebnis 3: Headless heißt, Entscheidungen selbst zu treffen

Beim Bauen sind uns Dinge begegnet, die in keiner Feature-Liste stehen:

- **React Aria:** In der ersten Fassung blieb die Vorschlagsliste nach dem Übernehmen offen. React Aria blendet dann den
  restlichen Inhalt für Hilfstechnik aus (`aria-hidden`), axe meldete fünf Funde. Die Lösung: Vorschläge erst beim
  Tippen zeigen. Bei Headless liegt so eine Entscheidung beim Designsystem.
- **Lion:** Die Mehrfachauswahl von `lion-combobox` ist laut Lion-Dokumentation nicht barrierefrei. Wir haben deshalb
  eine eigene Tag-Liste gebaut. `lion-input-file` bringt Drop-Zone, Dateiliste und deutsche Texte mit, aber keine
  Statusmeldung und keine Dateigröße.
- **KoliBri:** `fink-tag-input` verlässt sich für Vorschläge auf die native `datalist`. Deren Bedienbarkeit hängt vom
  Browser ab.

---

## Die eigentliche Überraschung: 2,2 Megabyte

Dann haben wir gemessen, was der Browser lädt. Die KoliBri-Prüfseite: **2.174 KB gzip**. React Aria: 155 KB.
Lion: 67 KB.

Das sah nach einem klaren Urteil aus. War es aber nicht. Wir haben jedes Byte mit Source Maps seiner Herkunft
zugeordnet und interaktive Treemaps gebaut. Das Bild war eindeutig: Fast die ganze Fläche war das **Default-Theme** –
und darin fast nur **Icon-CSS**.

### Ursache 1: Ein SCSS-Mixin, 40-mal kopiert

Jede Komponentendatei im Default-Theme band das Icon-CSS selbst ein:

```scss
@layer kol-theme-component {
  @include kol-icon-theme;   // Font Awesome + Codicons
  @include kol-button('kol-button');
}
```

Sass fügt ein Mixin bei jedem `@include` vollständig ein. So steckten Font Awesome und Codicons in 40 von 47
Komponentenstilen: **11.965 KB von 12,9 MB Theme-CSS**. Einmal dedupliziert wären es 616 KB gewesen.

Das Paradoxe: KoliBris Styling-Laufzeit `adopted-style-sheets` setzt ohnehin in jeden Shadow Root ein gemeinsames
Stylesheet `GLOBAL` und legt jedes CSS nur einmal als geteiltes `CSSStyleSheet` an. Der richtige Ort war also schon da.

Wir haben das per Build-Schritt nachgestellt: Icon-Regeln aus allen Komponentenstilen herausgenommen, dedupliziert und an
`GLOBAL` gehängt, in derselben Kaskadenebene.

| Fassung | Prüfseite (gzip) | Stilberechnung, 450 Komponenten ohne Icons | JS-Speicher |
| --- | ---: | ---: | ---: |
| wie veröffentlicht | 2.174 KB | 37 ms | 73 MB |
| Icon-CSS einmal in GLOBAL | 492 KB | **118 ms** | 16 MB |
| einmal in GLOBAL, nur genutzte Icons | 416 KB | 40 ms | 14 MB |

Lehrreich war die mittlere Zeile: Einmal laden ist gut, aber wenn jeder Shadow Root 600 KB Icon-Regeln bekommt, wird die
Stilberechnung auch für Komponenten ohne Icons dreimal so lang. Die Darstellung blieb pixelgleich bis auf Kantenglättung.

### Ursache 2: Ein Markdown-Parser für Badges

Der zweite große Block war ein gemeinsamer Chunk von 136 KB minifiziert (55 KB gzip). Darin: **markdown-it** samt
`entities` (rund 1.500 HTML-Entitäten), `linkify-it`, `punycode`, `mdurl` und `uc.micro`. Die gemeinsame Beschriftung
fast aller Komponenten legte beim Laden `new MarkdownIt()` an – 44 von 53 Komponenten importierten den Chunk.

Gebraucht wurde der Parser an genau einer Stelle: für Badge-Beschriftungen.

Wir haben ihn per Build-Schritt erst bei Bedarf nachgeladen. Ergebnis: −54 KB gzip, aber nur auf Seiten ohne Badge.

---

## Zwei Issues, drei Tage

Wir haben beide Befunde mit Messungen, Skripten und Tests als Issues beim KoliBri-Team eingereicht. Was dann passierte,
ist der eigentlich bemerkenswerte Teil dieser Geschichte:

- **Icon-CSS:** gemeldet am 18.11. um 6 Uhr, umgesetzt für alle Themes rund **vier Stunden später**, veröffentlicht mit
  **KoliBri 4.6.0** am selben Tag – ohne sichtbare Änderung in den Visual Tests. Das Team ging sogar weiter als unser
  Vorschlag: Auch auf Beschriftungen beschränkte Doppelkopien fielen weg. `GLOBAL` wiegt damit 187 statt 616 KB, und
  die Laufzeitstrafe aus unserer Nachbildung trat nicht mehr auf.
- **markdown-it:** gemeldet am 18.11., **keine 24 Stunden später** ersetzt – nicht durch Nachladen, wie wir vorgeschlagen
  hatten, sondern durch einen eigenen kleinen Inline-Renderer. Er kann fett, kursiv, durchgestrichen, Inline-Code und
  Zeilenumbruch; rohes HTML bleibt maskiert. Das spart auf jeder Seite, auch mit Badge. Es erscheint mit **4.7**.

Unsere Build-Schritte haben wir danach wieder gelöscht. Das ist das beste Ende, das ein Workaround haben kann.

## KoliBri 4.5, 4.6 und 4.7 im Vergleich

Derselbe Fink-Code auf drei Versionen, 4.7 als Vorabversion 4.7.0-rc.0:

| | 4.5.0 | 4.6.0 | 4.7.0-rc.0 |
| --- | ---: | ---: | ---: |
| Prüfseite (gzip) | 2.182 KB | 448 KB | 395 KB |
| KoliBri-Theme (gzip) | 1.838 KB | 115 KB | 115 KB |
| KoliBri-Kern (gzip) | 112 KB | 111 KB | 57 KB |
| KoliBri ohne Theme (minifiziert) | 435 KB | 420 KB | 287 KB |
| JS-Speicher nach 900 Komponenten | 73 MB | 15 MB | 14 MB |
| Prüfungen | alle bestanden | alle bestanden | alle bestanden |

Rendern und Stilberechnung lagen in allen drei Versionen im Rahmen der Messstreuung.

---

## Fair vergleichen ist schwerer als messen

Die größte methodische Lehre: Unsere erste Tabelle war unfair, und zwar in beide Richtungen.

- **Wrapper zählen nicht.** Ein React-Adapter um Web Components ist bei jeder Bibliothek gleich. Verglichen werden
  sollten nur die Bibliotheken ab den Web Components und ihre Abhängigkeiten.
- **Schriften kosten in jedem Stack.** Wer Font Awesome nutzt, lädt die Schrift – mit Lit genauso wie mit KoliBri.
- **Das Theme ist keine Bibliothek.** Headless-Bibliotheken haben kein Theme. KoliBri hat Gestaltung und Verhalten
  vollständig getrennt: Das Basis-Styling jeder Komponente enthält nur Layout, Hochkontrastmodus und einen
  Notfall-Stil; Farben, Abstände und Typografie kommen ausschließlich aus dem Theme. Wer will, schreibt es komplett
  selbst.
- **Die Prüfseiten waren nicht gleich.** Die KoliBri-Seite lud zusätzlich Icon-Schriften (69 KB), alle 44
  Fink-Komponenten (43 KB) und React mit Finks React-Schicht (60 KB). Die Alternativen luden nur das Nötigste.

### Bibliothek gegen Bibliothek

Ohne Theme, ohne Fink, ohne Wrapper (minifiziert):

| | KoliBri 4.6 | KoliBri 4.7 | Lion | React Aria |
| --- | ---: | ---: | ---: | ---: |
| Eigener Code | 157 KB | 159 KB | 159 KB | 322 KB |
| Basis-CSS (Layout, Hochkontrast) | 35 KB | 35 KB | – | – |
| Abhängigkeiten | 136 KB | 1 KB | 43 KB | 3 KB |
| Laufzeit | 92 KB (Stencil) | 92 KB (Stencil) | 19 KB (Lit) | 188 KB (React) |
| **Summe** | **420 KB** | **287 KB** | **221 KB** | **325 KB + 188 KB** |

KoliBris eigener Code ist etwa so groß wie Lions Bibliothek und halb so groß wie React Aria. Mit 4.7 liegt KoliBri
zwischen beiden. Der Rest des Abstands zu Lion ist das Basis-CSS, das Lion nicht mitliefert, und die größere
Laufzeit von Stencil.

### Zwei Komponenten mit Gestaltung, gleicher Umfang

Bibliothek, Laufzeit, Theme oder eigenes CSS und der Code der beiden Komponenten (gzip):

| | KoliBri 4.6 | KoliBri 4.7 | React Aria | Lion |
| --- | ---: | ---: | ---: | ---: |
| Summe | 270 KB | 215 KB | 155 KB | 68 KB |
| Theme nur für genutzte Komponenten (geschätzt) | 169 KB | 115 KB | 155 KB | 68 KB |

Auch fair gerechnet bleiben Lion und React Aria für zwei Komponenten kleiner. Den Abstand macht fast nur das Theme, das
alle 45 KoliBri-Komponenten gestaltet. Wie sich das bei vielen Komponenten entwickelt, ist offen: KoliBri lädt jede
Komponente einzeln nach, im Median für 4,3 KB gzip, der Kern wird nur einmal geladen.

---

## Warum das für Fink so gut ist

Die Versionstabelle ist das stärkste Argument für eine gestaltete, gepflegte Basis: **Fink hat nur die Versionsnummer
geändert** und lädt danach ein Fünftel, bei einem Fünftel des Speichers. Jede Verbesserung in KoliBri kommt allen
Anwendungen auf Fink zugute, ohne dass ein Fink-Team eine Zeile schreibt. Bei einem Eigenbau oder einer
Headless-Bibliothek, um die man Gestaltung, Layout und Hochkontrastmodus selbst baut, trägt man diese Arbeit selbst.

Dasselbe gilt in die andere Richtung: Als wir alle Komponenten-Hosts transparent haben wollten, war das eine einzige
Regel im Fink-Theme, wirksam in allen 50 KoliBri-Komponenten. Danach bestanden alle 1.067 automatischen
Barrierefreiheitstests weiter.

## Wo die Alternativen wirklich besser sind – und wo KoliBri

**Für Headless spricht:**

- Verhalten komplexer Widgets: React Aria ist bei Datum, Zeitzonen, Tabellen und Drag & Drop ausgereifter und bringt
  Übersetzungen für über 30 Sprachen mit.
- Freie innere Struktur: Bei KoliBri ist die DOM-Struktur fest. Fink musste etwa Badge-Farben zur Laufzeit auflösen.
- Verbreitung: React Aria, Radix und Base UI haben deutlich größere Gemeinden.
- Bausteine, die KoliBri nicht hat: Zag.js und Ark UI bringen Datumswahl, Tag-Eingabe, Tour, Splitter und PIN-Eingabe
  mit.

**Für KoliBri spricht:**

- Breite: Fink deckt 49 von 49 benötigten Bausteinen mit KoliBri ab. Die beste Alternative käme auf 36.
- Layout und Hochkontrastmodus sind in jeder Komponente fertig. Keine der untersuchten Headless-Bibliotheken liefert das
  mit; bei Headless baut und prüft das Designsystem es selbst.
- Web Components: Das Designsystem bleibt für Angular, Vue, React und reines HTML nutzbar.
- Öffentlicher Träger, EUPL-Lizenz und ein Prüfverfahren, das sich an der BITV orientiert.
- **Reaktionszeit:** Zwei Größenbefunde wurden binnen eines Tages umgesetzt. Bei einer Bibliothek, die die Verwaltung
  selbst trägt, kann sie Anforderungen direkt einbringen. Bei Komponenten eines Drittanbieters, die bestimmte
  Anforderungen nicht erfüllen, hat man diesen Einfluss oft nicht.

## Was wir gelernt haben

1. **„Headless spart Aufwand“ ist keine Naturkonstante.** Für zwei Kompositionen war der Code mit Headless sogar
   kleiner. Der Vorteil einer gestalteten Bibliothek liegt in der Breite und in dem, was man nicht selbst prüfen muss.
2. **Messen, bevor man urteilt – und dann noch einmal messen, was man eigentlich misst.** Unsere 2,2 MB waren kein
   Problem von KoliBri, sondern eines der Auslieferung. Und unser erster „fairer“ Vergleich war es nicht.
3. **Source Maps und Treemaps schlagen Bauchgefühl.** Ohne Zuordnung jedes Bytes hätten wir „KoliBri ist schwer“
   geschrieben und wären falsch gelegen.
4. **Eine Laufzeitmessung gehört zu jeder Optimierung.** Icon-CSS einmal statt 40-mal klang eindeutig besser – bis die
   Stilberechnung dreimal so lang wurde.
5. **Workarounds sind Prototypen für Upstream-Fixes.** Mit Messwerten, Build-Schritt und Test im Issue war die Lösung
   für die Maintainer greifbar. Beide Fixes kamen schneller, als wir unsere Workarounds dokumentieren konnten.
6. **ESLint allein reicht nicht für Barrierefreiheit.** Lint-Regeln prüfen den Quelltext. Fokus, Tastatur,
   Bildschirmleser-Ausgaben und Darstellung bei Vergrößerung zeigen sich erst im Browser – und fremde Komponenten prüft
   ein Linter gar nicht.

## Grenzen

- Nur zwei von 46 Komponenten. Tabelle, Datumswahl oder Baum, bei denen eine Bibliothek viel Logik abnimmt, sind nicht
  geprüft.
- Aufwand nur als Codezeilen, nicht als Arbeitszeit. Alle Varianten sind KI-gestützt entstanden, React Aria und Lion mit
  Fink als Vorlage.
- Nur Chromium, keine Prüfung von Hand mit Screenreadern.
- Pflege über Jahre, Updates und BITV-Prüfungen sind nicht erfasst.

## Fazit

Für ein Designsystem der Verwaltung, das als Web Components für mehrere Frameworks ausgeliefert wird, bleibt KoliBri
die tragfähigere Grundlage – nicht weil es kleiner wäre, sondern weil es Barrierefreiheit, Layout und
Hochkontrastmodus für 49 Bausteine mitbringt und weil man es mitgestalten kann. Headless lohnt sich, wo ein Team ein
einziges Framework nutzt und die Breite selbst bauen will.

Der nächste aufschlussreiche Schritt ist derselbe Vergleich für einen komplexen Baustein, etwa eine sortierbare Tabelle
oder eine Datumswahl.

---

_Code, Tests, Messskripte und Ergebnisse liegen offen im Repository des Fink Design Systems unter
`experiments/basis-vergleich`. Die gemeldeten Issues: public-ui/kolibri#11623 (Icon-CSS) und #11627 (markdown-it)._
