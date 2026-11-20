# Woher die Größe kommt

Stand 2026-11-20. Erzeugt mit `pnpm spike:sourcemap`, nicht von Hand bearbeiten.

Beim Seitenaufruf geladene Skripte, per Source Map ihrer Herkunft zugeordnet. Minifiziert in KB. „gzip“ ist der Anteil an der gzip-Größe des jeweiligen Chunks.

## Übersicht

| Herkunft | KoliBri (Fink heute) (gzip) | KoliBri schlank (gzip) | KoliBri schlank + lazy markdown (gzip) | React Aria (gzip) | Lion (gzip) |
| --- | ---: | ---: | ---: | ---: | ---: |
| KoliBri theme | 115 | 90 | 90 | – | – |
| KoliBri core | 111 | 110 | 56 | – | – |
| React Aria library | – | – | – | 91 | – |
| React | 59 | 57 | 57 | 59 | – |
| KoliBri markdown (lazy) | – | – | 55 | – | – |
| Fink components | 43 | 44 | 44 | – | – |
| Lion library | – | – | – | – | 42 |
| Fink core | 21 | 22 | 22 | – | – |
| KoliBri components | 15 | 15 | 15 | – | – |
| Lion dependencies | – | – | – | – | 13 |
| other | 11 | 9,4 | 9,6 | 0,6 | 1,8 |
| Lit | 0,3 | 0,4 | 0,4 | – | 5 |
| variant code | 0,8 | 0,6 | 0,6 | 2,3 | 3,7 |
| Fink theme | 1,3 | 1,2 | 1,2 | – | – |
| Fink React layer | 1 | 1 | 1 | – | – |
| Fink tokens | 0,4 | 0,4 | 0,4 | – | – |
| **Summe** | **378** | **352** | **353** | **153** | **66** |

## KoliBri (Fink heute): Einträge je Herkunft

- **KoliBri theme**: 952 KB minifiziert, 115 KB gzip. theme-default 115
- **KoliBri core**: 365 KB minifiziert, 111 KB gzip. component-hiabKVP3.js 55, behavior-B6y5Gofe.js 8,1, props-from-config-BOUcpF7e.js 6,4, index-Bbr6Os1b.js 5, loader 4,8, common-BdSzSIXg.js 4,2, api-D0RNr-zh.js 3,8, base-web-component-DP9_OPgV.js 1,7, behavior-DlH8byIw.js 1,6, behavior-BJR8CKBx.js 1,2, component-CNgECeRi.js 1,1, component-CSsUaL_h.js 1,1, … (59 Einträge)
- **React**: 188 KB minifiziert, 59 KB gzip. react-dom 55, react 2,5, scheduler 1,1
- **Fink components**: 147 KB minifiziert, 43 KB gzip. fink-code-block 2,2, fink-file-upload 2, fink-app-shell 1,9, fink-calendar 1,9, fink-transfer-list 1,8, fink-carousel 1,6, fink-range-slider 1,5, fink-image-list 1,4, fink-menu 1,4, fink-tour 1,4, fink-consent-banner 1,3, fink-list 1,3, … (44 Einträge)
- **Fink core**: 72 KB minifiziert, 21 KB gzip. p-aAlZGJU7.js 15, p-Mm4qbnvn.js 4,5, p-CiRKhT1l.js 0,5, p-CcR-Lcfc.js 0,4, p-CTnekbzJ.js 0,3, p-DY84WS8v.js 0,1, p-0q_cDiSu.js 0,1, p-B-BbokvN.js 0
- **KoliBri components**: 55 KB minifiziert, 15 KB gzip. kol-input-file 5,5, kol-input-text 5,3, kol-badge 3,5, kol-icon 1
- **other**: 27 KB minifiziert, 11 KB gzip. [unmapped] 11
- **Fink theme**: 11 KB minifiziert, 1,3 KB gzip. kolibri-locales.js 0,8, overrides.js 0,3, index.js 0,2
- **Fink React layer**: 3,4 KB minifiziert, 1 KB gzip. kolibri.js 0,5, provider.js 0,4, components.js 0,1
- **variant code**: 1,2 KB minifiziert, 0,8 KB gzip. kolibri/main.tsx 0,4, shared/config.ts 0,3
- **Fink tokens**: 3,5 KB minifiziert, 0,4 KB gzip. index.js 0,4
- **Lit**: 1,2 KB minifiziert, 0,3 KB gzip. @lit/react 0,3

## KoliBri schlank: Einträge je Herkunft

- **KoliBri core**: 366 KB minifiziert, 110 KB gzip. component-hiabKVP3.js 55, behavior-B6y5Gofe.js 8,1, props-from-config-BOUcpF7e.js 6,4, index-Bbr6Os1b.js 4,8, loader 4,6, common-BdSzSIXg.js 4, api-D0RNr-zh.js 3,8, base-web-component-DP9_OPgV.js 1,7, behavior-DlH8byIw.js 1,6, behavior-BJR8CKBx.js 1,2, index 1,1, component-CNgECeRi.js 1,1, … (59 Einträge)
- **KoliBri theme**: 780 KB minifiziert, 90 KB gzip. theme-default 90
- **React**: 188 KB minifiziert, 57 KB gzip. react-dom 53, react 2,4, scheduler 1,1
- **Fink components**: 147 KB minifiziert, 44 KB gzip. fink-code-block 2,2, fink-file-upload 2, fink-app-shell 2, fink-calendar 2, fink-transfer-list 1,9, fink-carousel 1,6, fink-range-slider 1,5, fink-image-list 1,5, fink-menu 1,5, fink-tour 1,5, fink-consent-banner 1,4, fink-list 1,3, … (44 Einträge)
- **Fink core**: 73 KB minifiziert, 22 KB gzip. p-aAlZGJU7.js 16, p-Mm4qbnvn.js 4,7, p-CiRKhT1l.js 0,5, p-CcR-Lcfc.js 0,4, p-CTnekbzJ.js 0,3, p-DY84WS8v.js 0,1, p-0q_cDiSu.js 0,1, p-B-BbokvN.js 0
- **KoliBri components**: 55 KB minifiziert, 15 KB gzip. kol-input-file 5,5, kol-input-text 5,3, kol-badge 3,5, kol-icon 1
- **other**: 25 KB minifiziert, 9,4 KB gzip. [unmapped] 9,4
- **Fink theme**: 11 KB minifiziert, 1,2 KB gzip. kolibri-locales.js 0,8, overrides.js 0,3, index.js 0,1
- **Fink React layer**: 3,3 KB minifiziert, 1 KB gzip. kolibri.js 0,5, provider.js 0,4, components.js 0,1
- **variant code**: 1,2 KB minifiziert, 0,6 KB gzip. kolibri/main.tsx 0,5, shared/config.ts 0,1
- **Fink tokens**: 3,5 KB minifiziert, 0,4 KB gzip. index.js 0,4
- **Lit**: 1,2 KB minifiziert, 0,4 KB gzip. @lit/react 0,4

## KoliBri schlank + lazy markdown: Einträge je Herkunft

- **KoliBri theme**: 780 KB minifiziert, 90 KB gzip. theme-default 90
- **React**: 188 KB minifiziert, 57 KB gzip. react-dom 53, react 2,4, scheduler 1,1
- **KoliBri core**: 232 KB minifiziert, 56 KB gzip. behavior-B6y5Gofe.js 8,1, props-from-config-BOUcpF7e.js 6,4, index-Bbr6Os1b.js 4,8, loader 4,6, common-BdSzSIXg.js 4, api-D0RNr-zh.js 3,8, base-web-component-DP9_OPgV.js 1,7, behavior-DlH8byIw.js 1,6, behavior-BJR8CKBx.js 1,2, index 1,1, component-CNgECeRi.js 1,1, component-CSsUaL_h.js 1,1, … (59 Einträge)
- **KoliBri markdown (lazy)**: 136 KB minifiziert, 55 KB gzip. markdown-it, entities, linkify-it, punycode, mdurl, uc.micro 55
- **Fink components**: 147 KB minifiziert, 44 KB gzip. fink-code-block 2,2, fink-file-upload 2, fink-app-shell 2, fink-calendar 2, fink-transfer-list 1,9, fink-carousel 1,6, fink-range-slider 1,5, fink-image-list 1,5, fink-menu 1,5, fink-tour 1,5, fink-consent-banner 1,4, fink-list 1,3, … (44 Einträge)
- **Fink core**: 73 KB minifiziert, 22 KB gzip. p-aAlZGJU7.js 16, p-Mm4qbnvn.js 4,7, p-CiRKhT1l.js 0,5, p-CcR-Lcfc.js 0,4, p-CTnekbzJ.js 0,3, p-DY84WS8v.js 0,1, p-0q_cDiSu.js 0,1, p-B-BbokvN.js 0
- **KoliBri components**: 55 KB minifiziert, 15 KB gzip. kol-input-file 5,5, kol-input-text 5,3, kol-badge 3,5, kol-icon 1
- **other**: 25 KB minifiziert, 9,6 KB gzip. [unmapped] 9,6
- **Fink theme**: 11 KB minifiziert, 1,2 KB gzip. kolibri-locales.js 0,8, overrides.js 0,3, index.js 0,1
- **Fink React layer**: 3,3 KB minifiziert, 1 KB gzip. kolibri.js 0,5, provider.js 0,4, components.js 0,1
- **variant code**: 1,2 KB minifiziert, 0,6 KB gzip. kolibri/main.tsx 0,5, shared/config.ts 0,1
- **Fink tokens**: 3,5 KB minifiziert, 0,4 KB gzip. index.js 0,4
- **Lit**: 1,2 KB minifiziert, 0,4 KB gzip. @lit/react 0,4

## React Aria: Einträge je Herkunft

- **React Aria library**: 325 KB minifiziert, 91 KB gzip. react-aria 76, react-aria-components 8,3, react-stately 5,6, @internationalized/string 0,5, use-sync-external-store 0,2, clsx 0,1
- **React**: 188 KB minifiziert, 59 KB gzip. react-dom 55, react 2,5, scheduler 1,1
- **variant code**: 6,1 KB minifiziert, 2,3 KB gzip. shared/texts.ts 0,7, react-aria/TagInput.tsx 0,6, react-aria/FileUpload.tsx 0,5, shared/config.ts 0,3, react-aria/main.tsx 0,2
- **other**: 1,3 KB minifiziert, 0,6 KB gzip. [unmapped] 0,6

## Lion: Einträge je Herkunft

- **Lion library**: 159 KB minifiziert, 42 KB gzip. form-core 13, overlays 9,5, input-file 6, combobox 4,4, listbox 3,3, localize 2,3, core 2,1, button 1, exports 0
- **Lion dependencies**: 43 KB minifiziert, 13 KB gzip. @popperjs/core 7,4, @bundled-es-modules/message-format 5,6, @open-wc/scoped-elements 0,2, singleton-manager 0,2, @open-wc/dedupe-mixin 0,1
- **Lit**: 19 KB minifiziert, 5 KB gzip. lit-html 2,9, @lit/reactive-element 1,9, lit-element 0,2
- **variant code**: 12 KB minifiziert, 3,7 KB gzip. lion/tag-input.ts 1,5, lion/file-upload.ts 1,1, shared/texts.ts 0,7, shared/config.ts 0,3, lion/main.ts 0,2
- **other**: 4,2 KB minifiziert, 1,8 KB gzip. [unmapped] 1,8

## KoliBri-Theme je Komponente

Unkomprimiert in KB. „icons“ ist mitgeliefertes Icon-CSS (Font Awesome, Codicons, Kolicons, @font-face), „styles“ der Rest.

| Komponente | Gesamt | davon icons | styles | styles gzip | nach Kürzung | nach Kürzung gzip |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| (shared) | 187 | 171 | 15 | 4,4 | 18 | 4,9 |
| kol-table-stateful | 69 | 0 | 69 | 8,2 | 69 | 8,2 |
| kol-table-stateless | 69 | 0 | 69 | 8,2 | 69 | 8,2 |
| kol-input-checkbox | 50 | 0 | 50 | 4,8 | 50 | 4,8 |
| kol-single-select | 33 | 0 | 33 | 4,1 | 33 | 4,1 |
| kol-combobox | 33 | 0 | 33 | 4,1 | 33 | 4,1 |
| kol-input-file | 33 | 0 | 33 | 4,1 | 33 | 4,1 |
| kol-pagination | 32 | 0 | 32 | 4,4 | 32 | 4,4 |
| kol-input-radio | 31 | 0 | 31 | 3,8 | 31 | 3,8 |
| kol-select | 29 | 0 | 29 | 4,2 | 29 | 4,2 |
| kol-textarea | 26 | 0 | 26 | 3,8 | 26 | 3,8 |
| kol-input-number | 26 | 0 | 26 | 3,8 | 26 | 3,8 |
| kol-input-date | 26 | 0 | 26 | 3,8 | 26 | 3,8 |
| kol-input-email | 25 | 0 | 25 | 3,7 | 25 | 3,7 |
| kol-input-password | 25 | 0 | 25 | 3,7 | 25 | 3,7 |
| kol-input-text | 25 | 0 | 25 | 3,7 | 25 | 3,7 |
| kol-input-range | 25 | 0 | 25 | 3,7 | 25 | 3,7 |
| kol-input-color | 24 | 0 | 24 | 3,6 | 24 | 3,6 |
| kol-toolbar | 14 | 0 | 14 | 1,9 | 14 | 1,9 |
| kol-form | 13 | 0 | 13 | 2,7 | 13 | 2,7 |
| kol-toast-container | 12 | 0 | 12 | 2,6 | 12 | 2,6 |
| kol-drawer | 11 | 0 | 11 | 2,4 | 11 | 2,4 |
| kol-alert | 11 | 0 | 11 | 2,5 | 11 | 2,5 |
| kol-dialog | 11 | 0 | 11 | 2,5 | 11 | 2,5 |
| kol-nav | 11 | 0 | 11 | 2 | 11 | 2 |
| kol-card | 9,5 | 0 | 9,5 | 2,1 | 9,5 | 2,1 |
| kol-split-button | 9,2 | 0 | 9,2 | 1,7 | 9,2 | 1,7 |
| kol-popover-button | 7,3 | 0 | 7,3 | 1,6 | 7,3 | 1,6 |
| kol-button | 6,8 | 0 | 6,8 | 1,5 | 6,8 | 1,5 |
| kol-link-button | 6,7 | 0 | 6,7 | 1,5 | 6,7 | 1,5 |
| kol-accordion | 3,6 | 0 | 3,6 | 1,4 | 3,6 | 1,4 |
| kol-tabs | 3,1 | 0 | 3,1 | 1 | 3,1 | 1 |
| kol-version | 2,3 | 0 | 2,3 | 0,9 | 2,3 | 0,9 |
| kol-badge | 2,2 | 0 | 2,2 | 0,8 | 2,2 | 0,8 |
| kol-button-link | 2 | 0 | 2 | 0,6 | 2 | 0,6 |
| kol-details | 1,8 | 0 | 1,8 | 0,7 | 1,8 | 0,7 |
| kol-tree-item | 1,8 | 0 | 1,8 | 0,7 | 1,8 | 0,7 |
| kol-meter | 1,8 | 0 | 1,8 | 0,7 | 1,8 | 0,7 |
| kol-breadcrumb | 1,7 | 0 | 1,7 | 0,6 | 1,7 | 0,6 |
| kol-progress | 1,6 | 0 | 1,6 | 0,6 | 1,6 | 0,6 |
| kol-link | 1,4 | 0 | 1,4 | 0,6 | 1,4 | 0,6 |
| kol-heading | 1,1 | 0 | 1,1 | 0,5 | 1,1 | 0,5 |
| kol-skip-nav | 1,1 | 0 | 1,1 | 0,5 | 1,1 | 0,5 |
| kol-tree | 0,8 | 0 | 0,8 | 0,4 | 0,8 | 0,4 |
| kol-abbr | 0,7 | 0 | 0,7 | 0,4 | 0,7 | 0,4 |
| kol-quote | 0,6 | 0 | 0,6 | 0,4 | 0,6 | 0,4 |
| **Summe** | **919** | **171** | **747** | **116** | **750** | **117** |
