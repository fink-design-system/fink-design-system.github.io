import { finkEntries } from './fink';
import { finkExtendedEntries } from './fink-extended';
import { finkMoreEntries } from './fink-more';
import { kolibriEntries } from './kolibri';
import { kolibriMoreEntries } from './kolibri-more';

import { t } from '../i18n';
import type { CatalogEntry } from './types';

const localize = (entry: CatalogEntry): CatalogEntry => ({
	...entry,
	name: t(entry.name),
	summary: t(entry.summary),
	guidance: entry.guidance?.map((x) => t(x)),
	demos: entry.demos.map((demo) => ({ ...demo, title: t(demo.title) })),
});

export const catalog = [...finkEntries, ...finkExtendedEntries, ...finkMoreEntries, ...kolibriEntries, ...kolibriMoreEntries].map(localize);
export const findEntry = (id: string) => catalog.find((entry) => entry.id === id);
export type { CatalogEntry } from './types';
