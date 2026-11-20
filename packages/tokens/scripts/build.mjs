import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
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

/** Liefert die CSS-Deklarationen und die flache Token-Tabelle eines Token-Satzes. */
const compile = (set) => {
	const entries = [];
	const flat = {};
	for (const [group, tokens] of Object.entries(set)) {
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

/**
 * Marken-Themes: src/themes/<name>.json enthält nur abweichende Tokens. Sie werden auf den Basissatz
 * gelegt; unbekannte Schlüssel sind ein Fehler, damit alle Themes dieselbe Token-Struktur haben.
 */
const merge = (name, theme) => {
	const merged = structuredClone(source);
	for (const [group, tokens] of Object.entries(theme)) {
		if (group.startsWith('$')) continue;
		for (const [key, token] of Object.entries(tokens)) {
			if (!merged[group]?.[key]) throw new Error(`Theme ${name}: unbekanntes Token ${group}.${key}`);
			merged[group][key] = { ...token, $description: token.$description ?? merged[group][key].$description };
		}
	}
	return merged;
};

const declare = (entries) => [...entries, ...Object.entries(kolibriHooks)].map(([k, v]) => `\t${k}: ${v};`).join('\n');

const { entries, flat } = compile(source);
const declarations = declare(entries);

const themeDir = join(root, 'src/themes');
const brandThemes = readdirSync(themeDir)
	.filter((file) => file.endsWith('.json'))
	.sort()
	.map((file) => {
		const name = file.replace(/\.json$/, '');
		const theme = JSON.parse(readFileSync(join(themeDir, file), 'utf8'));
		const compiled = compile(merge(name, theme));
		return { name, label: theme.$label ?? name, description: theme.$description ?? '', source: theme.$source ?? '', declarations: declare(compiled.entries), flat: compiled.flat };
	});

/*
 * Jeder Theme-Block wiederholt auch die --kolibri-*-Hooks: var() in Custom Properties wird an der
 * deklarierenden Stelle aufgelöst. Würde ein Theme nur --fink-* überschreiben, behielten die auf
 * :root berechneten Hooks die Fink-Werte. Fink und Default stehen zusätzlich als Selektor da, damit
 * ein verschachteltes data-theme="fink" innerhalb einer Marke wieder die Basis-Tokens bekommt.
 */
const themeCss = [
	`:root,\n[data-theme='fink'],\n[data-theme='default'] {\n${declarations}\n}`,
	...brandThemes.map((theme) => `[data-theme='${theme.name}'] {\n${theme.declarations}\n}`),
].join('\n\n');

const css = `/* Generiert aus src/tokens.json und src/themes/*.json – nicht bearbeiten. */
${themeCss}
`;
writeFileSync(join(out, 'tokens.css'), css);

const js = `/* Generiert aus src/tokens.json – nicht bearbeiten. */
export const tokens = ${JSON.stringify(flat, null, '\t')};
/** Token-Deklarationen ohne Selektor, z. B. für :host im Theme. */
export const tokenDeclarations = ${JSON.stringify(declarations)};
/** Vollständiges Stylesheet: Basis auf :root und je Marken-Theme ein Block [data-theme='…']. */
export const themeCss = ${JSON.stringify(themeCss)};
/** Marken-Themes aus src/themes (Name, Bezeichnung, Herkunft, Token-Tabelle). */
export const brandThemes = ${JSON.stringify(brandThemes.map(({ declarations: _d, ...rest }) => rest), null, '\t')};
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
export declare const themeCss: string;
export interface BrandTheme {
	name: ${brandThemes.map((t) => JSON.stringify(t.name)).join(' | ')};
	label: string;
	description: string;
	source: string;
	flat: Record<TokenPath, TokenInfo>;
}
export declare const brandThemes: BrandTheme[];
export declare const cssVar: (path: TokenPath) => string;
`;
writeFileSync(join(out, 'index.d.ts'), dts);
console.log(`@fink/tokens: ${entries.length} Tokens, ${Object.keys(kolibriHooks).length} KoliBri-Hooks, Marken-Themes: ${brandThemes.map((t) => t.name).join(', ')}`);
