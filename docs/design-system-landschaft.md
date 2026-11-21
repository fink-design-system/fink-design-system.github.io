# Design-System-Landschaft europäischer Unternehmen

Öffentlich zugängliche Open-Source-Design-Systeme deutscher und europäischer Unternehmen, absteigend sortiert nach GitHub-Sternen. Datenstand: 20.11.2026 (GitHub-API). Die Sternzahl ist ein Proxy für Popularität; npm-Download-Zahlen liegen keinen Angaben zugrunde. Die Tabelle ist die Grundlage für die Fink-Nachbauthemen: **Stencil-basierte Systeme** sind die direkte Peer-Group, weil Fink selbst Stencil-Web-Components baut.

## Unternehmens-Design-Systeme

| # | System | Unternehmen (Land) | Basis | Lizenz | Status | Stars | Quellen |
|---|--------|--------------------|-------|--------|--------|-------|---------|
| 1 | Lion | ING (NL) | Web Components (Lit), White-Label | MIT | aktiv | 1975 | [GitHub](https://github.com/ing-bank/lion) · [Doku](https://ing-bank.github.io/lion/) |
| 2 | UI5 Web Components | SAP (DE) | Web Components (Lit), Fiori | Apache-2.0 | aktiv | 1794 | [GitHub](https://github.com/SAP/ui5-webcomponents) · [Doku](https://sap.github.io/ui5-webcomponents/) |
| 3 | Porsche Design System | Porsche (DE) | Stencil | eigene Lizenzdatei | aktiv | 684 | [GitHub](https://github.com/porsche-design-system/porsche-design-system) · [Doku](https://designsystem.porsche.com) |
| 4 | Backpack | Skyscanner (UK) | React | Apache-2.0 | archiviert (08/2026) | 542 | [GitHub](https://github.com/Skyscanner/backpack) |
| 5 | Scale | Deutsche Telekom (DE) | Stencil | eigene Lizenzdatei | aktiv, v3 Beta; Doku-Domain scale.telekom.com nicht mehr erreichbar | 431 | [GitHub](https://github.com/telekom/scale) |
| 6 | Siemens Industrial Experience | Siemens (DE) | Stencil | MIT | aktiv | 393 | [GitHub](https://github.com/siemens/ix) · [Doku](https://ix.siemens.io) |
| 7 | KoliBri | ITZBund (DE, Behörde; Basis von Fink) | eigene Web Components | EUPL-1.2 | aktiv | 292 | [GitHub](https://github.com/public-ui/kolibri) · [Doku](https://public-ui.github.io) |
| 8 | Vitamin | Decathlon (FR) | CSS + Framework-Bindings | Apache-2.0 | letzter Push 06/2025 | 290 | [GitHub](https://github.com/Decathlon/vitamin-web) · [Doku](https://decathlon.design) |
| 9 | Fundamental Library | SAP (DE) | CSS + React/Angular-Bindings | Apache-2.0 | aktiv | 283 | [GitHub](https://github.com/SAP/fundamental-styles) |
| 10 | Boosted (OUDS Web) | Orange (FR) | Bootstrap-Fork | MIT | aktiv | 227 | [GitHub](https://github.com/Orange-OpenSource/Orange-Boosted-Bootstrap) · [Doku](https://system.design.orange.com) |
| 11 | Swiss Post Design System | Die Schweizerische Post (CH) | Stencil | Apache-2.0 | aktiv | 182 | [GitHub](https://github.com/swisspost/design-system) |
| 12 | BEEQ | Endava (UK) | Stencil | Apache-2.0 | aktiv | 162 | [GitHub](https://github.com/Endava/BEEQ) |
| 13 | Equinor Design System | Equinor (NO) | React | MIT | aktiv | 157 | [GitHub](https://github.com/equinor/design-system) · [Doku](https://eds.equinor.com) |
| 14 | DB UX Design System v3 | Deutsche Bahn (DE) | Stencil | eigene Lizenzdatei | aktiv | 137 | [GitHub](https://github.com/db-ux-design-system/core-web) · [Doku](https://db-ux-design-system.github.io) |
| 15 | Baloise Design System | Baloise (CH) | Stencil | Apache-2.0 | aktiv | 114 | [GitHub](https://github.com/baloise/design-system) |
| 16 | Mistica | Telefónica (ES, in DE als O2) | React | MIT | aktiv | 76 | [GitHub](https://github.com/Telefonica/mistica-web) |
| 17 | Eufemia | DNB (NO) | React | eigene Lizenzdatei | aktiv | 73 | [GitHub](https://github.com/dnbexperience/eufemia) · [Doku](https://eufemia.dnb.no) |
| 18 | Tegel | Scania (SE, VW-Traton-Gruppe) | Stencil | MIT | aktiv | 40 | [GitHub](https://github.com/scania-digital-design-system/tegel) |
| 19 | Infineon Design System | Infineon (DE) | Stencil | MIT | aktiv | 37 | [GitHub](https://github.com/Infineon/infineon-design-system-stencil) |
| 20 | SIX Web Components | SIX Group (CH) | Stencil | Apache-2.0 | aktiv | 30 | [GitHub](https://github.com/six-group/six-webcomponents) |
| 21 | Scania Corporate UI | Scania (SE) | Stencil | keine Lizenzdatei | eingestellt (2021, Nachfolger Tegel) | 25 | [GitHub](https://github.com/scania/corporate-ui) |

## Öffentliche Hand

Für den amtlichen Kontext von Fink (KoliBri) sind zusätzlich relevant:

- [GOV.UK Design System](https://design-system.service.gov.uk) (UK)
- [Système de Design de l'État (DSFR)](https://www.systeme-de-design.gouv.fr) (FR)
- [Bootstrap Italia](https://italia.github.io/bootstrap-italia/) (IT)
- [NL Design System](https://nldesignsystem.nl) (NL)

Das „Design System des Bundes" (DigitalService GmbH des Bundes) ist dokumentiert, hat aber kein öffentliches Quellcode-Repository.

## Nicht öffentlich

Diese bekannten Systeme führen ihren Code intern und eignen sich allenfalls als visuelle Referenz:

- Volkswagen Pkw, BMW, Mercedes-Benz, Audi, Lufthansa, Allianz, Deutsche Bank
- Erste Group / George (AT)
- Swisscom SDX ([sdx.swisscom.com](https://sdx.swisscom.com), nur Dokumentation öffentlich)
- AXA (GitHub-Organisation axa-ch-webhub-cloud ohne öffentliche Repos)

Porsche und Scania/Tegel sind die offenen Teile der VW-Gruppe.

## Nachbau-Regeln für Fink-Themen

- Lizenzierte Markenschriften (Porsche Next, DB Screen, Telekom Neo, …) werden durch freie Schriften ersetzt; Original-Schriftdateien kommen nicht ins Repository.
- Keine Logos oder Markennamen als eigene Assets; die Nachbauten sind Stil-Referenzen mit Quellen-Attribution in der jeweiligen Theme-Doku.
- Komponentenverhalten (Tastatur, Fokus, A11y) bleibt Fink/KoliBri-Standard; dokumentierte Original-Abweichungen werden als Props/Overrides abgebildet.
