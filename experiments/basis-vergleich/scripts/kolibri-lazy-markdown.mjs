import { dirname, resolve } from 'node:path';

/**
 * Lösung 1 für KoliBri 4.6.0-rc.2: markdown-it nur bei Bedarf laden.
 *
 * Im gemeinsamen core-Chunk (SpanFC, importiert von 44 Komponenten) legt KoliBri beim Laden `new MarkdownIt()` an.
 * Gebraucht wird der Parser nur für Badge-Beschriftungen (`allowMarkdown: true` im Badge). Das Plugin
 * - entfernt markdown-it, entities, linkify-it, punycode, mdurl und uc.micro aus dem core-Chunk,
 * - ersetzt `md()` durch eine Fassung, die beim ersten Aufruf den Parser dynamisch nachlädt und bis dahin den
 *   Text maskiert ausgibt (für Text ohne Markdown identisch mit der Ausgabe von markdown-it),
 * - zeichnet nach dem Laden alle kol-badge neu (Stencil `forceUpdate`), damit Markdown sichtbar wird.
 * Der nachgeladene Chunk ist das unveränderte Original-Modul; doppelt ist dort nur SpanFC (rund 2 KB).
 */
const VIRTUAL = 'virtual:kolibri-markdown';
const RESOLVED = '\0kolibri-markdown';
const MD_LINE = /^const markdown = new MarkdownIt\(\);\nconst md = \(str\) => markdown\.renderInline\(str\);$/m;

export function kolibriLazyMarkdown() {
	let original = '';
	let originalDir = '';
	return {
		name: 'kolibri-lazy-markdown',
		enforce: 'pre',
		resolveId(id) {
			return id === VIRTUAL ? RESOLVED : null;
		},
		load(id) {
			if (id !== RESOLVED) return null;
			const absolute = original.replace(/from '(\.\/[^']+)'/g, (_m, spec) => `from '${resolve(originalDir, spec)}'`);
			return `${absolute}\nexport { markdown };\n`;
		},
		transform(code, id) {
			if (!/@public-ui\/components\/dist\/esm\/component-[\w-]+\.js$/.test(id) || !MD_LINE.test(code)) return null;
			original = code;
			originalDir = dirname(id);
			const runtime = code.match(/import \{[^}]*\bh\b[^}]*\} from '(\.\/index-[\w-]+\.js)';/)?.[1];
			if (!runtime) throw new Error('kolibri-lazy-markdown: Stencil-Laufzeit-Import nicht gefunden');
			const lines = code.split('\n');
			const libStart = lines.findIndex((l) => /^var index_cjs\$\d+ = \{\};$/.test(l));
			const mdStart = lines.findIndex((l) => l === 'const markdown = new MarkdownIt();');
			if (libStart < 0 || mdStart < libStart) throw new Error('kolibri-lazy-markdown: Bibliotheksbereich nicht gefunden');
			const lazy = `let __markdown;
let __loading;
const __escape = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const __rerenderBadges = () => {
	const walk = (root) => root.querySelectorAll('*').forEach((el) => {
		if (el.tagName === 'KOL-BADGE') __forceUpdate(el);
		if (el.shadowRoot) walk(el.shadowRoot);
	});
	walk(document);
};
const md = (str) => {
	if (__markdown) return __markdown.renderInline(str);
	__loading ??= import('${VIRTUAL}').then((m) => {
		__markdown = m.markdown;
		__rerenderBadges();
	});
	return __escape(str);
};`;
			const out = [`import { f as __forceUpdate } from '${runtime}';`, ...lines.slice(0, libStart), lazy, ...lines.slice(mdStart + 2)].join('\n');
			return { code: out, map: null };
		},
	};
}
