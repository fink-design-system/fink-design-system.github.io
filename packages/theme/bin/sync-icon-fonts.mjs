#!/usr/bin/env node
/**
 * Synchronisiert die Icon-Fonts von KoliBri in ein öffentliches Asset-Verzeichnis der Anwendung.
 *
 *   fink-sync-icons <zielverzeichnis>          kopiert und schreibt icon-fonts.css + manifest.json
 *   fink-sync-icons <zielverzeichnis> --check  prüft nur, ob das Ziel zu den installierten Paketen passt
 *
 * Die Quellen werden aus Sicht des aufrufenden Projekts (cwd) aufgelöst, damit immer genau die
 * installierten Versionen von @public-ui/components und @public-ui/theme-default kopiert werden.
 * Das Ziel wird vor dem Kopieren geleert, damit keine Dateien alter Versionen liegen bleiben.
 */
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const targetArg = args.find((arg) => !arg.startsWith('--'));
if (!targetArg) {
	console.error('Aufruf: fink-sync-icons <zielverzeichnis> [--check]');
	process.exit(2);
}
const target = resolve(process.cwd(), targetArg);

const findPackageRoot = (name) => {
	const bases = [join(process.cwd(), 'package.json'), fileURLToPath(import.meta.url)];
	for (const base of bases) {
		try {
			let dir = dirname(createRequire(base).resolve(name));
			while (dir !== dirname(dir)) {
				const manifest = join(dir, 'package.json');
				if (existsSync(manifest) && JSON.parse(readFileSync(manifest, 'utf8')).name === name) return dir;
				dir = dirname(dir);
			}
		} catch {
			// nächste Basis versuchen
		}
	}
	throw new Error(`Paket ${name} nicht gefunden. Ist es installiert?`);
};

const version = (root) => JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;

const components = findPackageRoot('@public-ui/components');
const themeDefault = findPackageRoot('@public-ui/theme-default');

/** Quelle → Zielordner und das Stylesheet, das die @font-face-Regeln enthält. */
const fonts = [
	{ id: 'kolicons', from: join(components, 'assets', 'kolicons'), css: 'kolicons/style.css', pkg: '@public-ui/components', version: version(components) },
	{ id: 'codicons', from: join(themeDefault, 'assets', 'codicons'), css: 'codicons/codicon.css', pkg: '@public-ui/theme-default', version: version(themeDefault) },
	{
		id: 'fontawesome-free',
		from: join(themeDefault, 'assets', 'fontawesome-free'),
		css: 'fontawesome-free/css/all.min.css',
		pkg: '@public-ui/theme-default',
		version: version(themeDefault),
	},
];

const manifest = Object.fromEntries(fonts.map((font) => [font.id, { package: font.pkg, version: font.version }]));
const manifestPath = join(target, 'manifest.json');

if (checkOnly) {
	const current = existsSync(manifestPath) ? readFileSync(manifestPath, 'utf8') : '';
	if (current.trim() !== JSON.stringify(manifest, null, 2)) {
		console.error(`Icon-Fonts in ${targetArg} sind nicht synchron. Bitte „fink-sync-icons ${targetArg}“ ausführen.`);
		process.exit(1);
	}
	console.log(`Icon-Fonts in ${targetArg} sind synchron.`);
	process.exit(0);
}

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });
for (const font of fonts) {
	cpSync(font.from, join(target, font.id), { recursive: true });
}
writeFileSync(
	join(target, 'icon-fonts.css'),
	`/* Generiert von fink-sync-icons – nicht bearbeiten. Lädt die @font-face-Regeln aller KoliBri-Icon-Fonts global. */\n${fonts
		.map((font) => `@import url('./${font.css}');`)
		.join('\n')}\n`,
);
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log(`Icon-Fonts synchronisiert nach ${targetArg}: ${fonts.map((font) => `${font.id}@${font.version}`).join(', ')}`);
