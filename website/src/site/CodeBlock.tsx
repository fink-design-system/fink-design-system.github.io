import { FinkCodeBlock, type FinkCodeTab } from '@fink-ui/react';

export type CodeLanguage = NonNullable<FinkCodeTab['language']>;

/** Code-Varianten eines Beispiels; jede vorhandene Variante wird zum Tab. */
export interface CodeVariants {
	react?: string;
	html?: string;
	vue?: string;
	css?: string;
	bash?: string;
}

const LABELS: Array<[keyof CodeVariants, string, CodeLanguage, string]> = [
	['react', 'React', 'tsx', 'Beispiel.tsx'],
	['html', 'Web Component', 'html', 'index.html'],
	['vue', 'Vue', 'html', 'Beispiel.vue'],
	['css', 'CSS', 'css', 'styles.css'],
	['bash', 'Terminal', 'bash', 'Terminal'],
];

export const toTabs = (code: string | CodeVariants): FinkCodeTab[] =>
	typeof code === 'string'
		? [{ label: 'React', code, language: 'tsx', filename: 'Beispiel.tsx' }]
		: LABELS.filter(([key]) => code[key]).map(([key, label, language, filename]) => ({ label, code: code[key]!, language, filename }));

/** Doku-Codeblock auf Basis von fink-code-block (Hervorhebung, Tabs, Kopieren). */
export function CodeBlock({
	code,
	language = 'tsx',
	filename,
	lineNumbers,
}: {
	code: string | CodeVariants;
	language?: CodeLanguage;
	filename?: string;
	lineNumbers?: boolean;
	label?: string;
}) {
	if (typeof code === 'string') {
		return (
			<FinkCodeBlock _code={code} _language={language} _filename={filename ?? (language === 'bash' ? 'Terminal' : undefined)} _lineNumbers={lineNumbers} />
		);
	}
	return <FinkCodeBlock _tabs={toTabs(code)} _lineNumbers={lineNumbers} />;
}
