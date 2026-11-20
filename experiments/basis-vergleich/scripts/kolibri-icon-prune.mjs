/**
 * Schlanke KoliBri-Variante: Das Default-Theme bettet das komplette Icon-CSS (Font Awesome, Codicons,
 * Kolicons samt @font-face) in jeden Komponentenstil ein. Behalten werden nur die Kolicons, die KoliBri intern
 * nutzt, und die Codicons, die Fink nutzt. @font-face entfällt, weil Fink die Schriften ohnehin global lädt
 * (in Shadow Roots greift @font-face nicht).
 */
const rule = /[^{}]*\{[^{}]*\}/g;
const isIcon = /(@font-face|@keyframes\s+(?:fa|codicon)|\.fa[\w-]*|\.codicon)/;

/** Entfernt Icon-Regeln, deren Codicon nicht in `keep` steht. */
export function pruneCss(css, keep) {
	return css.replace(rule, (block) => {
		const selector = block.slice(0, block.indexOf('{'));
		if (!isIcon.test(selector)) return block;
		if (/@font-face|@keyframes|\.fa/.test(selector)) return '';
		const names = [...selector.matchAll(/\.codicon-([a-z0-9-]+)/g)].map((m) => m[1]);
		return names.length === 0 || names.some((name) => keep.has(name)) ? block : '';
	});
}

/** Wendet `fn` auf jeden Komponentenstil im gebauten Default-Theme an. */
export function mapThemeCss(code, fn) {
	return code.replace(/^(var css_248z\$?\w* = )(".*");$/gm, (_line, head, literal) => `${head}${JSON.stringify(fn(JSON.parse(literal)))};`);
}

/** Vite-Plugin. */
export function kolibriIconPrune(keepCodicons) {
	const keep = new Set(keepCodicons);
	return {
		name: 'kolibri-icon-prune',
		enforce: 'pre',
		transform(code, id) {
			if (!id.includes('@public-ui/theme-default/dist/index.mjs')) return null;
			return { code: mapThemeCss(code, (css) => pruneCss(css, keep)), map: null };
		},
	};
}
