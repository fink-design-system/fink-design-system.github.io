/**
 * Kleiner, abhängigkeitsfreier Syntax-Highlighter für Doku-Codebeispiele.
 * Liefert escaptes HTML mit <span class="tok-*">-Markierungen.
 */
export type CodeLanguage = 'bash' | 'css' | 'html' | 'json' | 'text' | 'ts' | 'tsx';

const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

type Rule = [type: string, pattern: RegExp];

const JS_KEYWORDS =
	'as|async|await|break|case|catch|class|const|continue|default|delete|do|else|enum|export|extends|false|finally|for|from|function|if|implements|import|in|instanceof|interface|let|new|null|of|private|protected|public|readonly|return|static|super|switch|this|throw|true|try|type|typeof|undefined|var|void|while|yield';

const rules: Record<Exclude<CodeLanguage, 'text'>, Rule[]> = {
	tsx: [
		['comment', /\/\/[^\n]*|\/\*[\s\S]*?\*\//y],
		['string', /`(?:\\.|[^`\\])*`|'(?:\\.|[^'\\\n])*'|"(?:\\.|[^"\\\n])*"/y],
		['tag', /<\/?[A-Za-z][\w.-]*|\/?>/y],
		['attr', /\b[_a-zA-Z][\w-]*(?==)/y],
		['keyword', new RegExp(`\\b(?:${JS_KEYWORDS})\\b`, 'y')],
		['type', /\b[A-Z][A-Za-z0-9]*\b/y],
		['number', /\b\d[\d_.]*\b/y],
		['function', /\b[a-zA-Z_$][\w$]*(?=\()/y],
	],
	ts: [],
	html: [
		['comment', /<!--[\s\S]*?-->/y],
		['tag', /<\/?[A-Za-z][\w-]*|\/?>/y],
		['attr', /\b[_a-zA-Z:@][\w:.-]*(?==)/y],
		['string', /"[^"]*"|'[^']*'/y],
	],
	css: [
		['comment', /\/\*[\s\S]*?\*\//y],
		['string', /"[^"]*"|'[^']*'/y],
		['keyword', /@[\w-]+/y],
		['attr', /--?[a-zA-Z][\w-]*(?=\s*:)|\b[a-z-]+(?=\s*:)/y],
		['function', /\b[a-z-]+(?=\()/y],
		['number', /-?\b\d+(?:\.\d+)?(?:px|rem|em|%|ms|s|dvh|vw|vh)?\b|#[0-9a-fA-F]{3,8}\b/y],
	],
	bash: [
		['comment', /#[^\n]*/y],
		['string', /"(?:\\.|[^"\\])*"|'[^']*'/y],
		['keyword', /\b(?:pnpm|npm|npx|yarn|git|cd|export)\b/y],
		['attr', /\s--?[a-zA-Z][\w-]*/y],
	],
	json: [
		['attr', /"(?:\\.|[^"\\])*"(?=\s*:)/y],
		['string', /"(?:\\.|[^"\\])*"/y],
		['keyword', /\b(?:true|false|null)\b/y],
		['number', /-?\b\d+(?:\.\d+)?\b/y],
	],
};
rules.ts = rules.tsx.filter(([type]) => type !== 'tag' && type !== 'attr');

export const highlight = (code: string, language: CodeLanguage = 'text'): string => {
	if (language === 'text' || !(language in rules)) return escape(code);
	const active = rules[language];
	let out = '';
	let plain = '';
	let index = 0;
	while (index < code.length) {
		let matched = false;
		for (const [type, pattern] of active) {
			pattern.lastIndex = index;
			const match = pattern.exec(code);
			if (match && match[0].length > 0) {
				out += escape(plain) + `<span class="tok-${type}">${escape(match[0])}</span>`;
				plain = '';
				index += match[0].length;
				matched = true;
				break;
			}
		}
		if (!matched) {
			const char = code[index];
			// Bezeichner am Stück übernehmen, damit Schlüsselwörter nicht mitten im Wort greifen.
			const word = /[A-Za-z0-9_$]/.test(char) ? /[A-Za-z0-9_$]+/y : null;
			if (word) {
				word.lastIndex = index;
				const w = word.exec(code)![0];
				plain += w;
				index += w.length;
			} else {
				plain += char;
				index += 1;
			}
		}
	}
	return out + escape(plain);
};
