/**
 * Nur für Analyse-Builds (ANALYZE=…): zerlegt @public-ui/theme-default in Teilmodule, damit die Treemap
 * hineinzoomen kann. Jeder Stil (GLOBAL und je Komponente) wird zu „icons“ (mitgeliefertes Icon-CSS) und „styles“.
 * Die Größen sind exakt, weil das CSS auch im echten Build als String vorliegt. Der Build ist danach nicht lauffähig.
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

const PREFIX = '/analysis/';
const THEME_FILE = /@public-ui\/theme-default\/dist\/index\.mjs$/;

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
			if (THEME_FILE.test(id)) {
				const names = {};
				for (const m of code.matchAll(/(?:'(KOL-[A-Z-]+)'|(GLOBAL)): (css_248z\$?\w*)/g)) names[m[3]] ??= (m[1] ?? m[2]).toLowerCase();
				const imports = [];
				const out = code.replace(/^var (css_248z\$?\w*) = (".*");$/gm, (_l, name, literal) => {
					let css = JSON.parse(literal);
					if (keepCodicons) css = keepCodicons(css);
					const { icons, styling } = splitIcons(css);
					const base = `${PREFIX}kolibri-theme/${names[name] ?? 'shared'}`;
					virtual.set(`${base}/icons.css.js`, icons);
					virtual.set(`${base}/styles.css.js`, styling);
					imports.push(`import ${name}_i from '${base}/icons.css.js';`, `import ${name}_g from '${base}/styles.css.js';`);
					return `var ${name} = ${name}_i + ${name}_g;`;
				});
				return { code: `${imports.join('\n')}\n${out}`, map: null };
			}
			return null;
		},
	};
}
