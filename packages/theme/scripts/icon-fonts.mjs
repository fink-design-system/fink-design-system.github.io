#!/usr/bin/env node
/**
 * Generiert src/icon-fonts.generated.ts: die @font-face-Regeln der drei Icon-Fonts (Kolicons,
 * Codicons, Font Awesome) aus den installierten Paketen — dieselben Quellen wie fink-sync-icons.
 *
 * Die Font-URLs werden auf /assets/icon-fonts/<id>/… umgeschrieben: die Anwendung spiegelt die
 * Fonts über `fink-sync-icons <ziel>` an genau diese Pfade (absolut zur Origin — die Showcase wird
 * auf der Root der GitHub-Pages-Domain ausgeliefert). Das Theme injiziert das Ergebnis in seine
 * GLOBAL-Styles, damit die Icons unter JEDEM Theme verfügbar sind — Font-Faces aus dem
 * Seiten-Header erreichen die Shadow-Roots nicht zuverlässig (siehe KERN-PR „Fontawesome fehlt").
 */
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync } from 'node:fs';

const here = dirname(fileURLToPath(import.meta.url));
const findPackageRoot = (name) => {
	const bases = [join(here, '..', 'package.json'), fileURLToPath(import.meta.url)];
	for (const base of bases) {
		try {
			let dir = dirname(createRequire(base).resolve(name));
			while (dir !== dirname(dir)) {
				const manifest = join(dir, 'package.json');
				if (existsSyncPkg(manifest)) return dir;
				dir = dirname(dir);
			}
		} catch {
			// nächste Basis versuchen
		}
	}
	throw new Error(`Paket ${name} nicht gefunden. Ist es installiert?`);
};
const existsSyncPkg = (path) => {
	try {
		return Boolean(JSON.parse(readFileSync(path, 'utf8')).name);
	} catch {
		return false;
	}
};

const components = findPackageRoot('@public-ui/components');
const themeDefault = findPackageRoot('@public-ui/theme-default');

/** Quelle → CSS-Datei und das URL-Präfix, auf das die Font-Referenzen umgeschrieben werden. */
const sources = [
	{ id: 'kolicons', css: join(components, 'assets', 'kolicons', 'style.css'), prefix: '/assets/icon-fonts/kolicons/' },
	{ id: 'codicons', css: join(themeDefault, 'assets', 'codicons', 'codicon.css'), prefix: '/assets/icon-fonts/codicons/' },
	{
		id: 'fontawesome-free',
		css: join(themeDefault, 'assets', 'fontawesome-free', 'css', 'all.min.css'),
		prefix: '/assets/icon-fonts/fontawesome-free/',
	},
];

/** Relative Font-URLs einer Icon-CSS auf das absolute /assets/icon-fonts/<id>/…-Präfix umschreiben. */
const rewrite = (css, prefix) =>
	css
		.replace(/url\((['"]?)\.\.\//g, `url($1${prefix}`)
		.replace(/url\((['"]?)(?!\.\.\/|\/|https?:|data:)/g, `url($1${prefix}`);

const css = sources
	.map(({ id, css: file, prefix }) => `/* ${id} (${id === 'kolicons' ? components : themeDefault} · ${prefix}) */\n${rewrite(readFileSync(file, 'utf8'), prefix)}`)
	.join('\n');

const out = `/* Generiert von scripts/icon-fonts.mjs — nicht bearbeiten. Quelle: fink-sync-icons-Muster.\n   Die Fonts werden von der Anwendung über \`fink-sync-icons <ziel>\` nach /assets/icon-fonts gespiegelt. */\nexport const ICON_FONT_CSS = ${JSON.stringify(css)};\n`;
writeFileSync(join(here, '..', 'src', 'icon-fonts.generated.ts'), out);
console.log(`[fink] Icon-Font-CSS generiert: ${sources.map((s) => s.id).join(', ')}`);
