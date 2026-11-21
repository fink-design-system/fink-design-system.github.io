# Strategie: Brand-Themes über Farben hinaus — Maße, Formen, Fokus, Zustände

## Ausgangslage

Die elf Brand-Themes gleichen Farben und Button-Tonalität über `packages/tokens/src/themes/*.json` und `packages/theme/src/brands/*.ts` ab; die A11y-Matrix läuft grün. Der Inventarvergleich zeigt aber, dass **alle** Brands dieselbe Override-Menge tragen: Button/Card/Alert/Badge/Modal/Drawer/Tabellen — und nichts bei Links, Switches, Fokus-Form, Menüs, ausgewählten Zuständen oder Komponenten-Höhen. Der erste Visual-Vergleich hat den Beleg geliefert: das IX-Original rendert die Primär-Taste als Kontur, Fink füllt sie.

Wirkprinzip bleibt: alles über Theming (Tokens + Brand-Overrides), keine Änderungen an Komponenten. Neue Token-Gruppen müssen zuerst in `packages/tokens/src/tokens.json` existieren — der Build wirft sonst „unbekanntes Token“ (schützt die Schema-Konsistenz).

## Impact-Ranking

Geordnet nach Sichtbarkeit × Abdeckung × Beleglage. „Beleg“ = dokumentierte Werte aus den Original-Quellen bzw. ein Visual-Test-Befund.

| # | Ebene | Warum hoher Impact | Belege | Träger |
|---|---|---|---|---|
| 1 | **Kontrollmaße & Formen**: Höhe/Padding von Button, Switch, Input; Radien | Trifft jedes Element auf jeder Seite; die Originals unterscheiden sich stark (Porsche 12 px Button-Radius, Scale 8 px, Kern 2/4/8 px, SIX 0 px eckig, Bal 4/12 px) | Radius-Tokens dokumentiert für 9/11 Themes; **Höhen fehlen im Schema komplett** | `themes/*.json` (neue Gruppe `control.*`), `brands/*.ts` (Button-/Switch-Overrides) |
| 2 | **Variantenarchitektur der Buttons**: fill vs. outline vs. ghost je DS | Drei Buttons pro Seite; das IX-Original ist eine Kontur-Taste, Fink füllt — der erste Visual-Test-Befund | Visual-Baseline ix-button-primary; Porsche nutzt Kontur-Sekundär ohne Rahmen, DB Kontur in Textfarbe | `brands/*.ts` `buttons()` je Brand |
| 3 | **Fokus-Darstellung** (Form + Farbe) | Sichtbar bei jeder Tastaturnavigation; hoher Wiedererkennungswert; a11y-sensibel | Porsche ColorFocus #1A44EA, IX outline-Farbe #199fff, Scale blue.500, DB informational, Kern dreistufiger Box-Shadow — alles dokumentiert | `focusColor`-Baustein erweitern (Form je Brand), `color.focus` |
| 4 | **Links**: Unterstreichung, visited, Hover | Auf fast jeder Seite mehrfach; visited ist pro DS unterschiedlich geregelt | Scale visited violet.600, DB brand-5/-10, Porsche dokumentiert keine visited-Farbe, Kern unveröffentlicht | `color.visited` (schon gesetzt), `KOL-LINK`-Overrides neu |
| 5 | **Menü/Navigation + ausgewählte & Hover-Zustände** | Aktive Einträge und Hover-Fills unterscheiden die Systeme deutlich; der Drawer-Opacity-Fund zeigt, dass Nav-Zustände im Drawer eigene Befunde tragen | Scale `ui.state-fill.hovered/pressed` (0,07/0,21 bzw. 0,14/0,27) dokumentiert; neutralTableHeader-Muster existiert | `KOL-NAV`-, `KOL-SINGLE-SELECT`-, `KOL-COMBOBOX`-Overrides |
| 6 | **Switch-Anatomie**: Track-/Thumb-Form und -Größe | Folgt großteils aus #1 (Radius) + Höhen-Token; switch-spezifisch nur die Restdifferenz | Dyou pillenförmig, SIX eckig, Porsche radiusFull | `control.*` + `KOL-INPUT-CHECKBOX` je Brand |
| 7 | **Dichte/Abstände** | Porsche nutzt fluides Spacing, Infineon 8-px-Basis, DB fixed/responsive-Skalen | Spacing dokumentiert für Porsche/Infineon/DB; `space.*` teils gesetzt | `space.*` je Theme, `--kolibri-spacing` |
| 8 | **Typo-Feinheiten**: Gewicht, Größenskala, Zeilenhöhe | Gewichte sind für 5 Themes gesetzt; Größenskalen und Zeilenhöhe (Kern 140 %, Porsche leadingNormal) fehlen | Dokumentiert bei Porsche/Post/Kern/Baloise/Six | `font.*`, `type-scale.*` je Theme |
| 9 | **Elevation & Motion** | Subtiler, aber dokumentiert: Porsche shadowSm/Md/Lg + 250/400 ms, Scale 100/200/600/800 ms, Post 0,16–0,24 | Dokumentiert für 4 Themes | `elevation.*`, `motion.*` |
| 10 | **Icons** | Außerhalb: Lizenz- und Wartungsgründe | — | bewusst kein Ziel |

## Umsetzungsphasen

**Phase 1 — Quick Wins (nur `brands/*.ts`, Werte liegen dokumentiert vor):**
1. Button-Varianten-Architektur je Brand voll abbilden (primary/secondary/danger/ghost als fill/outline/ghost-Kombination) — IX- und DB-Befunde sind die Vorlage.
2. Fokus-Form je Brand: Kern als dreistufiger Box-Shadow, IX als outline-Farbe (existiert), Porsche/SIX als Farbwechsel des Fink-Rings.
3. `KOL-LINK`: visited-Farbe je Theme (Scale violet.600, DB brand-5) und Unterstreichungsverhalten.
4. `KOL-NAV`-Hover/Selected über die Scale-`state-fill`-Werte als Vorbild.

**Phase 2 — Schema-Erweiterung (Token-Struktur):**
1. Neue Token-Gruppe `control.*` in `tokens.json` (z. B. `control.height-sm/md/lg`, `control.switch-track`, `control.switch-thumb`) → Build generiert sie für alle Themes; je Brand die dokumentierten Maße.
2. Radius- und Space-Tokens für die Lücken (tegel, post, db) aus den Original-Quellen nachziehen.
3. `type-scale`/Zeilenhöhe für die Themes ohne dokumentierte Skala ergänzen.

**Phase 3 — Menü- und Zustands-Feinschliff:**
1. `KOL-NAV`/Selected/Hover je Brand (Scale-`state-fill` als Referenzmuster).
2. Elevation/Motion-Werte für die Themes mit dokumentierten Werten.

## Verifikation

- `e2e/visual/fink.spec.ts` um die Elemente aus #1/#2/#3/#4/#5 erweitern: Switch, Link (normal/visited/besucht), Fokus-Zelle (Tastaturfokus, sichtbarer Ring), Menü-Zelle mit ausgewähltem Eintrag. Baselines stammen wie bisher aus `originals.spec.ts` vom geladenen Original-CDN.
- Schwellwert bleibt `maxDiffPixelRatio 0.35`; strukturelle Abweichungen (Kontur vs. Fläche) fliegen damit auf.
- Die A11y-Matrix bleibt das Gate: Kontrast- und Zustands-Regeln müssen in beiden Schemata ≥4,5:1 halten (Muster: `$description` dokumentiert jede abgeleitete Korrektur).
- Baselines nur auf dem macOS-Host erzeugen und committen (`pnpm test:visual`, `FINK_VISUAL=1`); die CI-A11y-Pflichtprüfung läuft ohne Visual-Projekt.
