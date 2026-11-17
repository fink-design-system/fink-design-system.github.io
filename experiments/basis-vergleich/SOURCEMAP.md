# Woher die Größe kommt

Stand 2026-11-17. Erzeugt mit `pnpm spike:sourcemap`, nicht von Hand bearbeiten.

Beim Seitenaufruf geladene Skripte, per Source Map ihrer Herkunft zugeordnet. Minifiziert in KB. „gzip“ ist der Anteil an der gzip-Größe des jeweiligen Chunks.

## Übersicht

| Herkunft | KoliBri (Fink heute) (gzip) | KoliBri schlank (gzip) | React Aria (gzip) | Lion (gzip) |
| --- | ---: | ---: | ---: | ---: |
| KoliBri: Theme | 1.871 | 182 | – | – |
| KoliBri: Kern | 114 | 116 | – | – |
| React Aria: Bibliothek | – | – | 91 | – |
| React | 59 | 29 | 59 | – |
| Lion: Bibliothek | – | – | – | 42 |
| Fink: Komponenten | 21 | 23 | – | – |
| KoliBri: Komponenten | 15 | 15 | – | – |
| Lion: Abhängigkeiten | – | – | – | 13 |
| Sonstiges | 11 | 10 | 0,6 | 1,8 |
| Fink: Kern | 10 | 11 | – | – |
| Lit | 0,2 | 0,2 | – | 5 |
| Variante: eigener Code | 0,4 | 0,3 | 2,2 | 3,6 |
| Fink: Theme | 1,4 | 1,6 | – | – |
| Fink: Tokens | 0,5 | 0,5 | – | – |
| Fink: React-Schicht | 0,5 | 0,5 | – | – |
| **Summe** | **2.105** | **391** | **152** | **66** |

## KoliBri (Fink heute): Einträge je Herkunft

- **KoliBri: Theme**: 13.147 KB minifiziert, 1.871 KB gzip. theme-default 1.871
- **KoliBri: Kern**: 366 KB minifiziert, 114 KB gzip. component-oUQcgxDj.js 55, behavior-Bb7JYoUn.js 8,1, props-from-config-ytxYrJUY.js 6,1, index-Dulj0jro.js 6, loader 5,6, common-BdSzSIXg.js 5, api-DGiFM9p0.js 3,8, base-web-component-Bq_B9edx.js 1,7, behavior-CkPQGfgo.js 1,6, index 1,2, behavior-CFG1f4KQ.js 1,2, component-Bc2pdOk1.js 1,1, … (62 Einträge)
- **React**: 188 KB minifiziert, 59 KB gzip. react-dom 55, react 2,5, scheduler 1,1
- **Fink: Komponenten**: 147 KB minifiziert, 21 KB gzip. fink-code-block 1,1, fink-file-upload 1, fink-app-shell 1, fink-calendar 0,9, fink-transfer-list 0,9, fink-carousel 0,8, fink-range-slider 0,7, fink-image-list 0,7, fink-menu 0,7, fink-tour 0,7, fink-consent-banner 0,7, fink-list 0,6, … (44 Einträge)
- **KoliBri: Komponenten**: 53 KB minifiziert, 15 KB gzip. kol-input-file 5,5, kol-input-text 5,3, kol-badge 3,5, kol-icon 1
- **Sonstiges**: 28 KB minifiziert, 11 KB gzip. [ohne Zuordnung] 11
- **Fink: Kern**: 73 KB minifiziert, 10 KB gzip. p-aAlZGJU7.js 7,4, p-Mm4qbnvn.js 2,2, p-CiRKhT1l.js 0,2, p-CcR-Lcfc.js 0,2, p-CTnekbzJ.js 0,1, p-DY84WS8v.js 0,1, p-0q_cDiSu.js 0, p-B-BbokvN.js 0
- **Fink: Theme**: 10 KB minifiziert, 1,4 KB gzip. kolibri-locales.js 1, overrides.js 0,4, index.js 0,1
- **Fink: Tokens**: 3,5 KB minifiziert, 0,5 KB gzip. index.js 0,5
- **Fink: React-Schicht**: 3,3 KB minifiziert, 0,5 KB gzip. kolibri.js 0,2, provider.js 0,2, components.js 0
- **Variante: eigener Code**: 1,7 KB minifiziert, 0,4 KB gzip. shared/config.ts 0,2, kolibri/main.tsx 0,2
- **Lit**: 1,2 KB minifiziert, 0,2 KB gzip. @lit/react 0,2

## KoliBri schlank: Einträge je Herkunft

- **KoliBri: Theme**: 1.164 KB minifiziert, 182 KB gzip. theme-default 182
- **KoliBri: Kern**: 367 KB minifiziert, 116 KB gzip. component-oUQcgxDj.js 55, behavior-Bb7JYoUn.js 8,1, index-Dulj0jro.js 6,6, loader 6,2, props-from-config-ytxYrJUY.js 6,1, common-BdSzSIXg.js 5,5, api-DGiFM9p0.js 3,8, base-web-component-Bq_B9edx.js 1,7, behavior-CkPQGfgo.js 1,6, index 1,5, behavior-CFG1f4KQ.js 1,2, component-Bc2pdOk1.js 1,1, … (62 Einträge)
- **React**: 188 KB minifiziert, 29 KB gzip. react-dom 28, react 1,3, scheduler 0,6
- **Fink: Komponenten**: 147 KB minifiziert, 23 KB gzip. fink-code-block 1,2, fink-file-upload 1,1, fink-app-shell 1, fink-calendar 1, fink-transfer-list 1, fink-carousel 0,8, fink-range-slider 0,8, fink-image-list 0,8, fink-menu 0,8, fink-tour 0,8, fink-consent-banner 0,7, fink-list 0,7, … (44 Einträge)
- **KoliBri: Komponenten**: 53 KB minifiziert, 15 KB gzip. kol-input-file 5,4, kol-input-text 5,2, kol-badge 3,5, kol-icon 1
- **Fink: Kern**: 73 KB minifiziert, 11 KB gzip. p-aAlZGJU7.js 8,2, p-Mm4qbnvn.js 2,4, p-CiRKhT1l.js 0,3, p-CcR-Lcfc.js 0,2, p-CTnekbzJ.js 0,1, p-DY84WS8v.js 0,1, p-0q_cDiSu.js 0,1, p-B-BbokvN.js 0
- **Sonstiges**: 26 KB minifiziert, 10 KB gzip. [ohne Zuordnung] 10
- **Fink: Theme**: 10 KB minifiziert, 1,6 KB gzip. kolibri-locales.js 1,1, overrides.js 0,4, index.js 0,1
- **Fink: Tokens**: 3,5 KB minifiziert, 0,5 KB gzip. index.js 0,5
- **Fink: React-Schicht**: 3,4 KB minifiziert, 0,5 KB gzip. kolibri.js 0,3, provider.js 0,2, components.js 0
- **Variante: eigener Code**: 1,7 KB minifiziert, 0,3 KB gzip. kolibri/main.tsx 0,2, shared/config.ts 0,1
- **Lit**: 1,2 KB minifiziert, 0,2 KB gzip. @lit/react 0,2

## React Aria: Einträge je Herkunft

- **React Aria: Bibliothek**: 325 KB minifiziert, 91 KB gzip. react-aria 76, react-aria-components 8,3, react-stately 5,6, @internationalized/string 0,5, use-sync-external-store 0,2, clsx 0,1
- **React**: 188 KB minifiziert, 59 KB gzip. react-dom 55, react 2,5, scheduler 1,1
- **Variante: eigener Code**: 6,1 KB minifiziert, 2,2 KB gzip. shared/texts.ts 0,7, react-aria/TagInput.tsx 0,6, react-aria/FileUpload.tsx 0,5, shared/config.ts 0,2, react-aria/main.tsx 0,2
- **Sonstiges**: 1,2 KB minifiziert, 0,6 KB gzip. [ohne Zuordnung] 0,6

## Lion: Einträge je Herkunft

- **Lion: Bibliothek**: 159 KB minifiziert, 42 KB gzip. form-core 13, overlays 9,5, input-file 6, combobox 4,4, listbox 3,3, localize 2,3, core 2,1, button 1, exports 0
- **Lion: Abhängigkeiten**: 43 KB minifiziert, 13 KB gzip. @popperjs/core 7,4, @bundled-es-modules/message-format 5,6, @open-wc/scoped-elements 0,2, singleton-manager 0,2, @open-wc/dedupe-mixin 0,1
- **Lit**: 19 KB minifiziert, 5 KB gzip. lit-html 2,9, @lit/reactive-element 1,9, lit-element 0,2
- **Variante: eigener Code**: 12 KB minifiziert, 3,6 KB gzip. lion/tag-input.ts 1,5, lion/file-upload.ts 1,1, shared/texts.ts 0,7, shared/config.ts 0,2, lion/main.ts 0,2
- **Sonstiges**: 4,2 KB minifiziert, 1,8 KB gzip. [ohne Zuordnung] 1,8

## KoliBri-Theme je Komponente

Unkomprimiert in KB. „Icons“ ist mitgeliefertes Icon-CSS (Font Awesome, Codicons, Kolicons, @font-face). „Gestaltung“ ist der Rest.

| Komponente | Gesamt | davon Icons | Gestaltung | Gestaltung gzip | nach Kürzung | nach Kürzung gzip |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| kol-input-checkbox | 964 | 896 | 67 | 5,8 | 79 | 6,7 |
| kol-input-radio | 701 | 657 | 43 | 4,8 | 52 | 5,7 |
| kol-table-stateful | 659 | 580 | 79 | 9,2 | 86 | 9,9 |
| kol-table-stateless | 659 | 580 | 78 | 9,2 | 86 | 9,8 |
| kol-single-select | 450 | 410 | 41 | 5 | 46 | 5,6 |
| kol-combobox | 450 | 410 | 41 | 5 | 46 | 5,6 |
| kol-input-file | 449 | 410 | 40 | 5 | 45 | 5,6 |
| kol-pagination | 449 | 410 | 39 | 5,4 | 45 | 6 |
| kol-select | 446 | 410 | 37 | 5,1 | 42 | 5,7 |
| kol-textarea | 444 | 410 | 34 | 4,7 | 39 | 5,3 |
| kol-input-number | 443 | 410 | 34 | 4,7 | 39 | 5,3 |
| kol-input-date | 443 | 410 | 33 | 4,7 | 39 | 5,3 |
| kol-input-email | 443 | 410 | 33 | 4,6 | 39 | 5,2 |
| kol-input-password | 443 | 410 | 33 | 4,6 | 39 | 5,2 |
| kol-input-text | 443 | 410 | 33 | 4,6 | 39 | 5,2 |
| kol-input-range | 443 | 410 | 33 | 4,6 | 38 | 5,2 |
| kol-input-color | 441 | 410 | 32 | 4,5 | 37 | 5,1 |
| kol-toolbar | 188 | 171 | 17 | 2,4 | 19 | 2,8 |
| kol-form | 187 | 171 | 16 | 3,2 | 18 | 3,7 |
| kol-toast-container | 186 | 171 | 15 | 3,1 | 17 | 3,6 |
| kol-drawer | 186 | 171 | 15 | 2,9 | 17 | 3,4 |
| kol-alert | 186 | 171 | 15 | 3 | 17 | 3,5 |
| kol-dialog | 185 | 171 | 14 | 3 | 16 | 3,5 |
| kol-card | 184 | 171 | 13 | 2,6 | 15 | 3,1 |
| kol-split-button | 183 | 171 | 13 | 2,2 | 15 | 2,7 |
| kol-popover-button | 181 | 171 | 11 | 2,1 | 13 | 2,6 |
| kol-button | 181 | 171 | 10 | 2 | 13 | 2,5 |
| kol-link-button | 181 | 171 | 10 | 2 | 12 | 2,5 |
| kol-nav | 180 | 171 | 9,8 | 1,8 | 12 | 2,3 |
| kol-accordion | 178 | 171 | 7,8 | 2 | 10 | 2,4 |
| kol-tabs | 178 | 171 | 7,4 | 1,5 | 9,6 | 2 |
| kol-version | 177 | 171 | 6,4 | 1,4 | 8,7 | 1,8 |
| kol-badge | 177 | 171 | 6,4 | 1,4 | 8,7 | 1,8 |
| kol-button-link | 177 | 171 | 6,2 | 1,2 | 8,5 | 1,6 |
| kol-details | 177 | 171 | 6,1 | 1,3 | 8,3 | 1,7 |
| kol-tree-item | 177 | 171 | 6 | 1,2 | 8,3 | 1,7 |
| kol-breadcrumb | 177 | 171 | 5,9 | 1,2 | 8,2 | 1,6 |
| kol-link | 176 | 171 | 5,6 | 1,1 | 7,9 | 1,6 |
| kol-skip-nav | 176 | 171 | 5,3 | 1 | 7,6 | 1,5 |
| kol-icon | 175 | 171 | 4,2 | 0,6 | 6,5 | 1,1 |
| (gemeinsam) | 11 | 0 | 11 | 3,9 | 11 | 3,9 |
| kol-meter | 1,8 | 0 | 1,8 | 0,7 | 1,8 | 0,7 |
| kol-progress | 1,6 | 0 | 1,6 | 0,6 | 1,6 | 0,6 |
| kol-heading | 1,1 | 0 | 1,1 | 0,5 | 1,1 | 0,5 |
| kol-tree | 0,8 | 0 | 0,8 | 0,4 | 0,8 | 0,4 |
| kol-abbr | 0,7 | 0 | 0,7 | 0,4 | 0,7 | 0,4 |
| kol-quote | 0,6 | 0 | 0,6 | 0,4 | 0,6 | 0,4 |
| **Summe** | **12.939** | **11.965** | **975** | **143** | **1.132** | **165** |
