import { dataPatterns } from './data';
import { feedbackPatterns } from './feedback';
import { formPatterns } from './forms';
import { navigationPatterns } from './navigation';

import { t } from '../i18n';
import type { PatternDefinition } from './types';

const localize = (p: PatternDefinition): PatternDefinition => ({
	...p,
	title: t(p.title),
	summary: t(p.summary),
	problem: t(p.problem),
	when: p.when.map((x) => t(x)),
	avoid: p.avoid?.map((x) => t(x)),
	a11y: p.a11y.map((x) => t(x)),
});

export const patterns = [...navigationPatterns, ...dataPatterns, ...formPatterns, ...feedbackPatterns].map(localize).sort((a, b) => a.number - b.number);
export const findPattern = (id: string) => patterns.find((p) => p.id === id);
export * from './types';
