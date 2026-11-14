import * as KolibriReact from '@fink/react';
import { reuse } from '../catalog/reuse';

/**
 * Ermittelt zur Build-Zeit, welche KoliBri-Komponenten die Showcase (Patterns, Kompositionen, Doku)
 * und die Fink-Komponenten tatsächlich verwenden.
 */
const sources = import.meta.glob(['../**/*.tsx', '../**/*.ts', '!../i18n/**'], { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const toTag = (name: string) => `kol-${name.replace(/^Kol/, '').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`;

/** Alle KoliBri-Komponenten laut React-Adapter (über @fink/react re-exportiert, ohne veraltete). */
export const kolibriTags = Object.keys(KolibriReact)
	.filter((name) => /^Kol[A-Z]/.test(name) && name !== 'KolModal')
	.map(toTag)
	.sort();

const usage = new Map<string, Set<string>>();
const note = (tag: string, where: string) => {
	if (!usage.has(tag)) usage.set(tag, new Set());
	usage.get(tag)!.add(where);
};

for (const [path, src] of Object.entries(sources)) {
	if (path.includes('kolibriUsage')) continue;
	const area = path.includes('/compositions/') ? 'Kompositionen' : path.includes('/patterns/') ? 'Patterns' : path.includes('/catalog/') ? 'Katalog' : 'Doku';
	for (const m of src.matchAll(/<(Kol[A-Z][A-Za-z]*)\b/g)) note(toTag(m[1]), area);
	for (const m of src.matchAll(/['"`<](kol-[a-z-]+)/g)) if (kolibriTags.includes(m[1])) note(m[1], area);
}
for (const info of Object.values(reuse)) for (const b of info.buildsOn) {
	const tag = b.split(' ')[0];
	if (kolibriTags.includes(tag)) note(tag, 'Fink-Komponenten');
}
note('kol-toast-container', 'Kompositionen');

export const kolibriUsage = kolibriTags.map((tag) => ({ tag, areas: [...(usage.get(tag) ?? [])].sort() }));
export const usedCount = kolibriUsage.filter((u) => u.areas.length > 0).length;
