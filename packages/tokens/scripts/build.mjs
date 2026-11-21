import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const out = join(root, 'dist');
mkdirSync(out, { recursive: true });

/** KoliBri-Theme-Hooks von @public-ui/theme-default, die aus Fink-Tokens gespeist werden. */
const kolibriHooks = {
	'--kolibri-border-radius': 'var(--fink-radius-md)',
	'--kolibri-border-width': 'var(--fink-border-width)',
	'--kolibri-font-family': 'var(--fink-font-family)',
	'--kolibri-spacing': 'var(--fink-space-base)',
	...Object.fromEntries(
		['backdrop', 'danger', 'edge', 'ink', 'light', 'mute', 'mute-variant', 'overlay', 'primary', 'primary-variant', 'secondary', 'shadow', 'subtle', 'success', 'surface', 'text', 'visited', 'warning'].map(
			(name) => [`--kolibri-color-${name}`, `var(--fink-color-${name})`],
		),
	),
};

/**
 * Flacht eine Token-Datei auf CSS-Deklarationen (--fink-*) und Token-Infos. Farbtokens mit
 * light/dark werden zu light-dark() aufgelöst; die Anwendung steuert das Schema über color-scheme.
 */
const flatten = (source) => {
	const entries = [];
	const flat = {};
	for (const [group, tokens] of Object.entries(source)) {
		if (group.startsWith('$')) continue;
		for (const [name, token] of Object.entries(tokens)) {
			const cssName = `--fink-${group}-${name}`;
			const value = 'light' in token ? `light-dark(${token.light}, ${token.dark})` : token.value;
			entries.push([cssName, value]);
			flat[`${group}.${name}`] = { cssVar: cssName, description: token.$description ?? '', ...('light' in token ? { light: token.light, dark: token.dark } : { value: token.value }) };
		}
	}
	return { entries, flat };
};

const cssBlock = (selector, entries, hooks) => {
	const declarations = [...entries, ...Object.entries(hooks)].map(([k, v]) => `\t${k}: ${v};`).join('\n');
	return `${selector} {\n${declarations}\n}\n`;
};

const writeJsModule = (target, flat, declarations) => {
	const js = `/* Generiert aus src – nicht bearbeiten. */
export const tokens = ${JSON.stringify(flat, null, '\t')};
/** Token-Deklarationen ohne Selektor, z. B. für :host im Theme. */
export const tokenDeclarations = ${JSON.stringify(declarations)};
export const cssVar = (path) => \`var(\${tokens[path].cssVar})\`;
`;
	writeFileSync(target, js);
};

const writeDts = (target, flat) => {
	const keys = Object.keys(flat)
		.map((k) => JSON.stringify(k))
		.join(' | ');
	const dts = `/* Generiert aus src – nicht bearbeiten. */
export type TokenPath = ${keys};
export interface TokenInfo {
	cssVar: string;
	description: string;
	light?: string;
	dark?: string;
	value?: string;
}
export declare const tokens: Record<TokenPath, TokenInfo>;
export declare const tokenDeclarations: string;
export declare const cssVar: (path: TokenPath) => string;
`;
	writeFileSync(target, dts);
};

const jsonFiles = readdirSync(src).filter((file) => file.endsWith('.json')).sort();

/* Fink-Grundtokens (tokens.json → dist-Wurzel, :root) – unverändertes Verhalten. */
const finkSource = JSON.parse(readFileSync(join(src, 'tokens.json'), 'utf8'));
const { entries, flat } = flatten(finkSource);
const finkDeclarations = [...entries, ...Object.entries(kolibriHooks)].map(([k, v]) => `\t${k}: ${v};`).join('\n');
writeFileSync(join(out, 'tokens.css'), `/* Generiert aus src/tokens.json – nicht bearbeiten. */\n:root {\n${finkDeclarations}\n}\n`);
writeJsModule(join(out, 'index.js'), flat, finkDeclarations);
writeDts(join(out, 'index.d.ts'), flat);

/* Nachbau-Skins: ein Token-Set je System, skoped über [data-theme="<system>"]. Die Skins
 * überschreiben die gleichen --fink-*-Namen, sodass alle Fink- und KoliBri-Komponenten im
 * Look des jeweiligen Originals rendern, ohne dass Komponenten oder Themes angefasst werden. */
const systemFiles = jsonFiles.filter((file) => file !== 'tokens.json');
const systemDeclarations = {};
const systemBlocks = [];
let tokenCount = 0;

for (const file of systemFiles) {
	const name = file.replace(/\.json$/, '');
	const source = JSON.parse(readFileSync(join(src, file), 'utf8'));
	const { entries: systemEntries, flat: systemFlat } = flatten(source);
	const declarations = [...systemEntries, ...Object.entries(kolibriHooks)].map(([k, v]) => `\t${k}: ${v};`).join('\n');
	tokenCount += systemEntries.length;

	const dir = join(out, name);
	mkdirSync(dir, { recursive: true });
	const block = cssBlock(`[data-theme="${name}"]`, systemEntries, kolibriHooks);
	systemBlocks.push(`/* ${name} – ${source.$description ?? 'Nachbau-Skin'} */\n${block}`);
	writeFileSync(join(dir, 'tokens.css'), `/* Generiert aus src/${file} – nicht bearbeiten. */\n${block}`);
	writeJsModule(join(dir, 'index.js'), systemFlat, declarations);
	systemDeclarations[name] = declarations;
}

writeFileSync(join(out, 'systems.css'), `/* Generiert aus src/*.json – nicht bearbeiten. Nachbau-Skins, skoped über data-theme. */\n${systemBlocks.join('\n')}`);

const systemsJs = `/* Generiert aus src/*.json – nicht bearbeiten. */
export const systemNames = ${JSON.stringify(Object.keys(systemDeclarations))};
/** Token-Deklarationen je Nachbau-Skin (ohne Selektor), z. B. für dynamische Injektion. */
export const systemDeclarations = ${JSON.stringify(systemDeclarations)};
`;
writeFileSync(join(out, 'systems.js'), systemsJs);

const systemDts = `/* Generiert aus src/*.json – nicht bearbeiten. */
export declare const systemNames: ${Object.keys(systemDeclarations).map((n) => JSON.stringify(n)).join(' | ')};
export declare const systemDeclarations: Record<string, string>;
`;
writeFileSync(join(out, 'systems.d.ts'), systemDts);

console.log(`@fink/tokens: Fink (${entries.length} Tokens) + ${systemFiles.length} Nachbau-Skins (${tokenCount} Tokens), ${Object.keys(kolibriHooks).length} KoliBri-Hooks je Skin`);
