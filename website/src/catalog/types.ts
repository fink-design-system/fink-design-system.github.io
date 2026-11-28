import type { ReactNode } from 'react';
import type { CodeVariants } from '../site/CodeBlock';

export type Layer = 'fink' | 'kolibri';
export type Category = 'Layout' | 'Navigation' | 'Inhalt' | 'Daten' | 'Feedback' | 'Formular' | 'Aktion' | 'Doku';

export interface DemoDefinition {
	title: string;
	code: string | CodeVariants;
	render: () => ReactNode;
	plain?: boolean;
}

export interface CatalogEntry {
	id: string;
	name: string;
	tag: string;
	layer: Layer;
	category: Category;
	icon: string;
	summary: string;
	/** Hinweise zur Verwendung (Do/Don't). */
	guidance?: string[];
	/** Link zur KoliBri-Dokumentation für Basis-Komponenten. */
	docsUrl?: string;
	demos: DemoDefinition[];
}
