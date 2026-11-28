import docs from '@fink-ui/components/dist/docs.json';
import * as FinkReact from '@fink-ui/react';
import { reuse } from '../catalog/reuse';

/**
 * Ermittelt zur Build-Zeit, welche KoliBri-Komponenten die Showcase (Patterns, Kompositionen, Doku)
 * und die Fink-Komponenten tatsächlich verwenden.
 */
const sources = import.meta.glob(['../**/*.tsx', '../**/*.ts', '!../i18n/**'], { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const toTag = (name: string) =>
	`fink-${name
		.replace(/^Fink/, '')
		.replace(/([a-z0-9])([A-Z])/g, '$1-$2')
		.toLowerCase()}`;

/** Eigene Fink-Komponenten laut Stencil-Dokumentation. */
const ownTags = new Set(docs.components.map((component) => component.tag));

/**
 * Alle KoliBri-Komponenten, registriert als fink-*: die Fink*-Komponenten von @fink-ui/react ohne die eigenen
 * Komponenten, ohne FinkProvider und ohne das veraltete fink-modal.
 */
export const kolibriTags: string[] = Object.keys(FinkReact)
	.filter((name) => /^Fink[A-Z][a-z]/.test(name) && name !== 'FinkProvider')
	.map(toTag)
	.filter((tag) => !ownTags.has(tag) && tag !== 'fink-modal')
	.sort();

/** true für KoliBri-Komponenten unter dem Fink-Präfix, false für eigene Fink-Komponenten. */
export const isKolibriTag = (tag: string): boolean => kolibriTags.includes(tag.split(' ')[0]);

const usage = new Map<string, Set<string>>();
const note = (tag: string, where: string) => {
	if (!usage.has(tag)) usage.set(tag, new Set());
	usage.get(tag)!.add(where);
};

for (const [path, src] of Object.entries(sources)) {
	if (path.includes('kolibriUsage')) continue;
	const area = path.includes('/compositions/') ? 'Kompositionen' : path.includes('/patterns/') ? 'Patterns' : path.includes('/catalog/') ? 'Katalog' : 'Doku';
	for (const m of src.matchAll(/<(Fink[A-Z][A-Za-z]*)\b/g)) if (kolibriTags.includes(toTag(m[1]))) note(toTag(m[1]), area);
	for (const m of src.matchAll(/['"`<](fink-[a-z-]+)/g)) if (kolibriTags.includes(m[1])) note(m[1], area);
}
for (const info of Object.values(reuse))
	for (const b of info.buildsOn) {
		const tag = b.split(' ')[0];
		if (kolibriTags.includes(tag)) note(tag, 'Fink-Komponenten');
	}
note('fink-toast-container', 'Kompositionen');

export const kolibriUsage = kolibriTags.map((tag) => ({ tag, areas: [...(usage.get(tag) ?? [])].sort() }));
export const usedCount = kolibriUsage.filter((u) => u.areas.length > 0).length;
