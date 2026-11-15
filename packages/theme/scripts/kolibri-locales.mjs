#!/usr/bin/env node
/**
 * Erzeugt src/kolibri-locales.ts aus den Texten der installierten KoliBri-Version.
 *
 * KoliBri ersetzt beim Registrieren mit eigenen `translations` seine Standardtexte vollständig. Fink gibt deshalb
 * den kompletten Satz weiter und korrigiert nur Texte, die mit Auslassungszeichen enden („...“, „…“): Diese werden
 * vorgelesen und wirken wie gekürzter Text. `--check` bricht ab, wenn die Datei nicht zur installierten Version passt.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
const pkgPath = require.resolve('@public-ui/components/package.json');
const { version } = JSON.parse(readFileSync(pkgPath, 'utf8'));
const localeDir = join(dirname(pkgPath), 'dist', 'collection', 'locales');

const clean = (value) => value.replace(/\s*(\.\.\.|…)\s*$/u, '');

const load = async (lng) => {
	const { default: messages } = await import(pathToFileURL(join(localeDir, `${lng}.js`)).href);
	const out = {};
	const changed = [];
	for (const [key, value] of Object.entries(messages)) {
		out[`kol-${key}`] = clean(value);
		if (out[`kol-${key}`] !== value) changed.push(key);
	}
	return { out, changed };
};

const de = await load('de');
const en = await load('en');
const target = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'kolibri-locales.ts');
const content = `/*
 * Automatisch erzeugt von scripts/kolibri-locales.mjs aus @public-ui/components ${version}. Nicht von Hand bearbeiten.
 * Angepasst (Auslassungszeichen entfernt): ${[...new Set([...de.changed, ...en.changed])].join(', ') || '–'}.
 */
export const KOLIBRI_VERSION = '${version}';

export const kolibriLocales: Record<'de' | 'en', Record<string, string>> = ${JSON.stringify({ de: de.out, en: en.out }, null, '\t')};
`;

if (process.argv.includes('--check')) {
	let current = '';
	try {
		current = readFileSync(target, 'utf8');
	} catch {
		// fehlt
	}
	if (current !== content) {
		console.error(`[fink] src/kolibri-locales.ts passt nicht zu @public-ui/components ${version}. Bitte \`pnpm --filter @fink/theme build\` ausführen.`);
		process.exit(1);
	}
} else {
	writeFileSync(target, content);
	console.log(`[fink] KoliBri-Texte ${version} übernommen; angepasst: ${[...new Set([...de.changed, ...en.changed])].join(', ') || '–'}`);
}
