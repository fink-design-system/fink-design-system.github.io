import type { Plugin } from 'vite';

/**
 * Vite-Plugin für die schlanke KoliBri-Variante: Das Default-Theme bettet das komplette Icon-CSS
 * (Font Awesome, Codicons, Kolicons samt @font-face) in jeden Komponentenstil ein. Das Plugin behält nur
 * die Kolicons, die KoliBri intern nutzt, und die Codicons, die Fink nutzt. @font-face entfällt, weil Fink
 * die Schriften ohnehin global lädt (in Shadow Roots greift @font-face nicht).
 */
export function kolibriIconPrune(keepCodicons: string[]): Plugin {
	const keep = new Set(keepCodicons);
	const rule = /[^{}]*\{[^{}]*\}/g;
	const isIcon = /(@font-face|@keyframes\s+(?:fa|codicon)|\.fa[\w-]*|\.codicon)/;

	const pruneCss = (css: string) =>
		css.replace(rule, (block) => {
			const selector = block.slice(0, block.indexOf('{'));
			if (!isIcon.test(selector)) return block;
			if (/@font-face|@keyframes|\.fa/.test(selector)) return '';
			const names = [...selector.matchAll(/\.codicon-([a-z0-9-]+)/g)].map((m) => m[1]);
			return names.length === 0 || names.some((name) => keep.has(name)) ? block : '';
		});

	return {
		name: 'kolibri-icon-prune',
		enforce: 'pre',
		transform(code, id) {
			if (!id.includes('@public-ui/theme-default/dist/index.mjs')) return null;
			const out = code.replace(/^(var css_248z\$?\w* = )(".*");$/gm, (_line, head: string, literal: string) => `${head}${JSON.stringify(pruneCss(JSON.parse(literal) as string))};`);
			return { code: out, map: null };
		},
	};
}
