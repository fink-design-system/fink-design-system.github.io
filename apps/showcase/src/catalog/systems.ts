import type { FinkBrandThemeName } from '@fink/theme';

/**
 * Die Nachbau-Themes europäischer Design-Systeme, geordnet nach GitHub-Sternen (Stand 20.11.2026).
 * Token-Quellen und Regeln stehen in packages/tokens/src/themes/*.json und
 * docs/design-system-landschaft.md; lizenzierte Markenschriften sind ersetzt.
 */
export interface ReplicaSystem {
	id: FinkBrandThemeName;
	label: string;
	company: string;
	tech: string;
	license: string;
	stars: number;
	sourceUrl: string;
	docsUrl?: string;
	/** Ersatzschrift bzw. Hinweis zur Typografie. */
	fontNote: string;
	/** Offene Punkte des Nachbaus, ehrlich benannt. */
	caveat?: string;
}

export const replicaSystems: ReplicaSystem[] = [
	{ id: 'porsche', label: 'Porsche Design System', company: 'Porsche (DE)', tech: 'Stencil', license: 'eigene Lizenzdatei', stars: 684, sourceUrl: 'https://github.com/porsche-design-system/porsche-design-system', docsUrl: 'https://designsystem.porsche.com', fontNote: 'Porsche Next → schmale Systemschrift' },
	{ id: 'telekom', label: 'Telekom Scale', company: 'Deutsche Telekom (DE)', tech: 'Stencil', license: 'eigene Lizenzdatei', stars: 431, sourceUrl: 'https://github.com/telekom/scale', fontNote: 'TeleNeo → Systemstack', caveat: 'Die Doku-Domain scale.telekom.com ist nicht mehr erreichbar.' },
	{ id: 'siemens-ix', label: 'Siemens Industrial Experience', company: 'Siemens (DE)', tech: 'Stencil', license: 'MIT', stars: 393, sourceUrl: 'https://github.com/siemens/ix', docsUrl: 'https://ix.siemens.io', fontNote: 'Siemens Sans → Systemstack (Classic)' },
	{ id: 'post', label: 'Swiss Post Design System', company: 'Die Schweizerische Post (CH)', tech: 'Stencil', license: 'Apache-2.0', stars: 182, sourceUrl: 'https://github.com/swisspost/design-system', fontNote: 'Swiss Post Sans → Inter' },
	{ id: 'db', label: 'DB UX Design System v3', company: 'Deutsche Bahn (DE)', tech: 'Stencil', license: 'eigene Lizenzdatei', stars: 137, sourceUrl: 'https://github.com/db-ux-design-system/core-web', docsUrl: 'https://design-system.deutschebahn.com', fontNote: 'DB Screen → Helvetica-Systemstack', caveat: 'Primärfarbe DB-Rot wie in den Produkten; Kontrast-Anpassungen aus @db-ux/db-theme.' },
	{ id: 'baloise', label: 'Baloise Design System', company: 'Baloise (CH)', tech: 'Stencil', license: 'Apache-2.0', stars: 114, sourceUrl: 'https://github.com/baloise/design-system', fontNote: 'BaloiseCreate → Inter' },
	{ id: 'tegel', label: 'Tegel', company: 'Scania (SE)', tech: 'Stencil', license: 'MIT', stars: 40, sourceUrl: 'https://github.com/scania-digital-design-system/tegel', fontNote: 'Scania Sans → Inter' },
	{ id: 'infineon', label: 'Infineon Design System', company: 'Infineon (DE)', tech: 'Stencil', license: 'MIT', stars: 37, sourceUrl: 'https://github.com/Infineon/infineon-design-system-stencil', fontNote: 'Source Sans 3 bleibt (frei verfügbar)' },
	{ id: 'six', label: 'SIX Web Components', company: 'SIX Group (CH)', tech: 'Stencil', license: 'Apache-2.0', stars: 30, sourceUrl: 'https://github.com/six-group/six-webcomponents', fontNote: 'Noto Sans bleibt (frei verfügbar)', caveat: 'Ein Dark-Theme ist bei SIX nicht dokumentiert.' },
	{ id: 'kern', label: 'KERN UX', company: 'Schleswig-Holstein (DE)', tech: '@kern-ux/native / KoliBri-Theme', license: 'Fira Sans bleibt (frei verfügbar)', stars: 0, sourceUrl: 'https://www.npmjs.com/package/@public-ui/theme-kern', fontNote: 'Fira Sans bleibt (frei verfügbar)', caveat: 'Werte aus den Fallbacks von @kern-ux/native 2.3.0; KoliBri liefert zudem das fertige @public-ui/theme-kern.' },
	{ id: 'dyou', label: 'd-you', company: 'EUDI Wallet DE', tech: 'KoliBri-Theme (PR #10970)', license: 'EUPL-1.2', stars: 0, sourceUrl: 'https://github.com/public-ui/kolibri/pull/10970', fontNote: 'Inter', caveat: 'Der Dark Mode ist im Original offen („Dark Mode (TBD)“); Dark-Werte sind abgeleitet.' },
];

export const findReplicaSystem = (id: string): ReplicaSystem | undefined => replicaSystems.find((system) => system.id === id);
