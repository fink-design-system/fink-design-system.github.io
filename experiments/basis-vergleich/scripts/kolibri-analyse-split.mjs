/**
 * Nur für Analyse-Builds (ANALYZE=…): zerlegt zwei große KoliBri-Module in Teilmodule, damit die Treemap
 * hineinzoomen kann. Der Build ist danach nicht lauffähig und dient nur der Größenmessung.
 *
 * 1. @public-ui/theme-default: jeder Komponentenstil wird zu zwei Modulen, „icons“ (mitgeliefertes Icon-CSS) und
 *    „gestaltung“ (der Rest). Die Größen sind exakt, weil das CSS auch im echten Build als String vorliegt.
 * 2. Der KoliBri-Chunk mit markdown-it: Aufteilung nach Bibliotheken anhand fester Zeilenbereiche. Kommentare und
 *    Leerraum werden entfernt, die Größen sind damit eine Näherung an den minifizierten Code.
 */
const iconRule = /[^{}]*\{[^{}]*\}/g;
const isIcon = /(@font-face|@keyframes\s+(?:fa|codicon)|\.fa[\w-]*|\.codicon|\.kolicon)/;

function splitIcons(css) {
	let icons = '';
	const styling = css.replace(iconRule, (block) => {
		if (!isIcon.test(block.slice(0, block.indexOf('{')))) return block;
		icons += block;
		return '';
	});
	return { icons, styling };
}

/** Zeilenbereiche (1-basiert, inklusive) im KoliBri-Chunk component-oUQcgxDj.js aus 4.6.0-rc.2. */
const CORE_SEGMENTS = [
	['kolibri-eigener-code', 1, 56],
	['mdurl', 57, 607],
	['uc.micro', 608, 646],
	['entities', 647, 1692],
	['markdown-it', 1693, 7159],
	['linkify-it', 7160, 8008],
	['punycode', 8009, 8452],
	['markdown-it', 8453, 9241],
	['kolibri-eigener-code', 9242, Infinity],
];

const strip = (code) =>
	code
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.replace(/^\s*\/\/.*$/gm, '')
		.replace(/\s+/g, ' ');

const PREFIX = '/analyse/';

export function kolibriAnalyseSplit({ keepCodicons } = {}) {
	const virtual = new Map();
	return {
		name: 'kolibri-analyse-split',
		enforce: 'pre',
		resolveId(id) {
			return virtual.has(id) ? id : null;
		},
		load(id) {
			return virtual.has(id) ? `export default ${JSON.stringify(virtual.get(id))};` : null;
		},
		transform(code, id) {
			if (id.includes('@public-ui/theme-default/dist/index.mjs')) {
				const names = {};
				for (const m of code.matchAll(/'(KOL-[A-Z-]+)': (css_248z\$?\w*)/g)) names[m[2]] ??= m[1].toLowerCase();
				const imports = [];
				const out = code.replace(/^var (css_248z\$?\w*) = (".*");$/gm, (_l, name, literal) => {
					let css = JSON.parse(literal);
					if (keepCodicons) css = keepCodicons(css);
					const { icons, styling } = splitIcons(css);
					const base = `${PREFIX}kolibri-theme/${names[name] ?? 'gemeinsam'}`;
					virtual.set(`${base}/icons.css.js`, icons);
					virtual.set(`${base}/gestaltung.css.js`, styling);
					imports.push(`import ${name}_i from '${base}/icons.css.js';`, `import ${name}_g from '${base}/gestaltung.css.js';`);
					return `var ${name} = ${name}_i + ${name}_g;`;
				});
				return { code: `${imports.join('\n')}\n${out}`, map: null };
			}
			if (/@public-ui\/components\/dist\/esm\/component-[\w-]+\.js$/.test(id) && code.includes('new MarkdownIt()')) {
				const lines = code.split('\n');
				const parts = {};
				for (const [name, from, to] of CORE_SEGMENTS) parts[name] = (parts[name] ?? '') + lines.slice(from - 1, Math.min(to, lines.length)).join('\n');
				const imports = Object.entries(parts).map(([name, text], i) => {
					const vid = `${PREFIX}kolibri-kern/markdown-chunk/${name}.js`;
					virtual.set(vid, strip(text));
					return [`import p${i} from '${vid}';`, `p${i}`];
				});
				const exportsLine = code.match(/^export \{[^}]*\};?$/m)?.[0] ?? '';
				const names = [...exportsLine.matchAll(/as (\w+)/g)].map((m) => m[1]);
				return {
					code: `${imports.map((x) => x[0]).join('\n')}\nconst all = [${imports.map((x) => x[1]).join(', ')}].join('');\n${names.map((n) => `export const ${n} = all;`).join('\n')}\n`,
					map: null,
				};
			}
			return null;
		},
	};
}
