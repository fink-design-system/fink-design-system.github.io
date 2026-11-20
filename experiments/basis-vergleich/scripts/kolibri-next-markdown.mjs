import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Nimmt public-ui/kolibri#11637 für KoliBri 4.6.0 vorweg: markdown-it wird durch den kleinen Inline-Renderer aus dem
 * PR ersetzt (gemergt in release/4 nach 4.6.0, erscheint mit dem nächsten Release).
 *
 * Das Plugin entfernt markdown-it, entities, linkify-it, punycode, mdurl und uc.micro aus dem gemeinsamen core-Chunk
 * und setzt an die Stelle von `md()` den Renderer aus scripts/vendor/kolibri-11637-markdown.js.
 */
const RENDERER = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), 'vendor/kolibri-11637-markdown.js'), 'utf8')
	.replace(/^\/\*\*[\s\S]*?\*\/\n/, '')
	.replace(/^export \{\s*md\s*\};?\s*$/m, '');

export function kolibriNextMarkdown() {
	return {
		name: 'kolibri-next-markdown',
		enforce: 'pre',
		transform(code, id) {
			if (!/@public-ui\/components\/dist\/esm\/component-[\w-]+\.js$/.test(id) || !code.includes('const markdown = new MarkdownIt();')) return null;
			const lines = code.split('\n');
			const libStart = lines.findIndex((l) => /^var index_cjs\$\d+ = \{\};$/.test(l));
			const mdStart = lines.findIndex((l) => l === 'const markdown = new MarkdownIt();');
			if (libStart < 0 || mdStart < libStart || lines[mdStart + 1] !== 'const md = (str) => markdown.renderInline(str);') {
				throw new Error('kolibri-next-markdown: Bibliotheksbereich nicht gefunden');
			}
			return { code: [...lines.slice(0, libStart), RENDERER, ...lines.slice(mdStart + 2)].join('\n'), map: null };
		},
	};
}
