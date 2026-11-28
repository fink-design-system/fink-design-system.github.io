import type { ReactNode } from 'react';
import type { CodeVariants } from '../site/CodeBlock';

export type PatternCategory = 'Navigation & Struktur' | 'Suche & Daten' | 'Formulare & Eingabe' | 'Feedback & Status';

export type DesignSystemSource = 'Material 3' | 'MUI' | 'Vuetify' | 'Carbon' | 'GOV.UK' | 'Atlassian' | 'Ant Design' | 'Polaris';

export const SOURCES: DesignSystemSource[] = ['Material 3', 'MUI', 'Vuetify', 'Carbon', 'GOV.UK', 'Atlassian', 'Ant Design', 'Polaris'];

/** Offizielle Kataloge der Vorbild-Systeme (Primärquellen der Angaben). */
export const SOURCE_URLS: Record<DesignSystemSource, string> = {
	'Material 3': 'https://m3.material.io/components',
	MUI: 'https://mui.com/material-ui/all-components/',
	Vuetify: 'https://vuetifyjs.com/en/components/all/',
	Carbon: 'https://carbondesignsystem.com/components/overview/components/',
	'GOV.UK': 'https://design-system.service.gov.uk/',
	Atlassian: 'https://atlassian.design/components',
	'Ant Design': 'https://ant.design/components/overview/',
	Polaris: 'https://polaris-react.shopify.com/components',
};

export const CATEGORIES: PatternCategory[] = ['Navigation & Struktur', 'Suche & Daten', 'Formulare & Eingabe', 'Feedback & Status'];

export interface PatternDefinition {
	id: string;
	number: number;
	title: string;
	category: PatternCategory;
	icon: string;
	summary: string;
	/** Welches Nutzerproblem das Pattern löst. */
	problem: string;
	when: string[];
	avoid?: string[];
	/** Verwendete Komponenten als Tag-Namen. */
	components: string[];
	a11y: string[];
	/** Vorbilder: Design System und dortiger Name. */
	sources: Array<{ system: DesignSystemSource; name: string }>;
	demo: () => ReactNode;
	code: CodeVariants;
	plain?: boolean;
}
