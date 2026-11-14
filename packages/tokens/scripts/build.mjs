import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = JSON.parse(readFileSync(join(root, 'src/tokens.json'), 'utf8'));
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

const declarations = [...entries, ...Object.entries(kolibriHooks)].map(([k, v]) => `\t${k}: ${v};`).join('\n');

const css = `/* Generiert aus src/tokens.json – nicht bearbeiten. */
:root {
${declarations}
}
`;
writeFileSync(join(out, 'tokens.css'), css);

const js = `/* Generiert aus src/tokens.json – nicht bearbeiten. */
export const tokens = ${JSON.stringify(flat, null, '\t')};
/** Token-Deklarationen ohne Selektor, z. B. für :host im Theme. */
export const tokenDeclarations = ${JSON.stringify(declarations)};
export const cssVar = (path) => \`var(\${tokens[path].cssVar})\`;
`;
writeFileSync(join(out, 'index.js'), js);

const keys = Object.keys(flat)
	.map((k) => JSON.stringify(k))
	.join(' | ');
const dts = `/* Generiert aus src/tokens.json – nicht bearbeiten. */
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
writeFileSync(join(out, 'index.d.ts'), dts);
console.log(`@fink/tokens: ${entries.length} Tokens, ${Object.keys(kolibriHooks).length} KoliBri-Hooks`);
