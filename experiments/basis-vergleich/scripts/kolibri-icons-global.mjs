/**
 * Variante „Icons in GLOBAL“ für KoliBri 4.6.0-rc.2: Das Default-Theme bindet das Icon-CSS (Mixin `kol-icon-theme`)
 * in 40 Komponentenstile ein. Dieses Plugin nimmt es dort heraus und legt es einmal in den GLOBAL-Stil des Themes.
 * KoliBris Styling-Laufzeit (adopted-style-sheets) setzt GLOBAL in jeden Shadow Root und teilt dabei ein einziges
 * CSSStyleSheet. Es wird kein Icon weggelassen.
 *
 * Damit sich die Kaskade nicht ändert, bleibt das Icon-CSS in derselben Ebene (`@layer kol-theme-component`).
 * Innerhalb der Ebene stand es bisher vor den Komponentenregeln, GLOBAL wird vor dem Komponentenstil eingesetzt:
 * die Reihenfolge bleibt gleich. @media-, @supports- und @keyframes-Blöcke ziehen vollständig um.
 */
const ICON_SELECTOR = /(\.fa[\w-]*|\.codicon|\.kolicon)/;

/** Zerlegt CSS in Anweisungen der obersten Ebene: { prelude, body } für Blöcke, { text } für Einzelanweisungen. */
export function statements(css) {
	const out = [];
	let i = 0;
	while (i < css.length) {
		while (i < css.length && /\s/.test(css[i])) i++;
		if (i >= css.length) break;
		if (css.startsWith('/*', i)) {
			const end = css.indexOf('*/', i + 2);
			i = end < 0 ? css.length : end + 2;
			continue;
		}
		let j = i;
		while (j < css.length && css[j] !== '{' && css[j] !== ';') j++;
		if (j >= css.length) break;
		if (css[j] === ';') {
			out.push({ text: css.slice(i, j + 1) });
			i = j + 1;
			continue;
		}
		let depth = 0;
		let k = j;
		for (; k < css.length; k++) {
			if (css[k] === '{') depth++;
			else if (css[k] === '}' && --depth === 0) break;
		}
		out.push({ prelude: css.slice(i, j).trim(), body: css.slice(j + 1, k) });
		i = k + 1;
	}
	return out;
}

const render = (s) => (s.text !== undefined ? s.text : `${s.prelude}{${s.body}}`);

/** Gehört die Anweisung vollständig zum Icon-CSS? */
function isIconStatement(s) {
	if (s.text !== undefined) return false;
	if (/^@font-face/.test(s.prelude)) return true;
	if (/^@keyframes\s+(fa|codicon)/.test(s.prelude)) return true;
	if (/^@(media|supports)/.test(s.prelude)) {
		const inner = statements(s.body);
		return inner.length > 0 && inner.every(isIconStatement);
	}
	if (s.prelude.startsWith('@')) return false;
	return ICON_SELECTOR.test(s.prelude);
}

/** Trennt einen Komponentenstil in Rest und Icon-Anweisungen je Ebene. */
export function splitComponent(css) {
	const icons = [];
	const rest = statements(css)
		.map((s) => {
			if (s.prelude && /^@layer\s/.test(s.prelude)) {
				const layer = s.prelude;
				const keep = [];
				for (const inner of statements(s.body)) (isIconStatement(inner) ? icons.push({ layer, text: render(inner) }) : keep.push(render(inner)));
				return `${layer}{${keep.join('')}}`;
			}
			if (isIconStatement(s)) {
				icons.push({ layer: null, text: render(s) });
				return '';
			}
			return render(s);
		})
		.join('');
	return { rest, icons };
}

export function kolibriIconsGlobal() {
	return {
		name: 'kolibri-icons-global',
		enforce: 'pre',
		transform(code, id) {
			if (!id.includes('@public-ui/theme-default/dist/index.mjs')) return null;
			const globalVar = code.match(/^\s*GLOBAL: (css_248z\$?\w*),$/m)?.[1];
			if (!globalVar) throw new Error('kolibri-icons-global: GLOBAL im Theme nicht gefunden');
			const seen = new Set();
			const byLayer = new Map();
			let moved = 0;
			let out = code.replace(/^var (css_248z\$?\w*) = (".*");$/gm, (line, name, literal) => {
				if (name === globalVar) return line;
				const { rest, icons } = splitComponent(JSON.parse(literal));
				if (!icons.length) return line;
				moved++;
				for (const { layer, text } of icons) {
					const key = `${layer}\n${text}`;
					if (seen.has(key)) continue;
					seen.add(key);
					if (!byLayer.has(layer)) byLayer.set(layer, []);
					byLayer.get(layer).push(text);
				}
				return `var ${name} = ${JSON.stringify(rest)};`;
			});
			const iconCss = [...byLayer].map(([layer, texts]) => (layer ? `${layer}{${texts.join('')}}` : texts.join(''))).join('');
			const globalRe = new RegExp(`^var ${globalVar.replace(/\$/g, '\\$')} = (".*");$`, 'm');
			out = out.replace(globalRe, (_l, literal) => `var ${globalVar} = ${JSON.stringify(JSON.parse(literal) + iconCss)};`);
			if (moved === 0) throw new Error('kolibri-icons-global: kein Icon-CSS gefunden');
			this.info?.(`Icon-CSS aus ${moved} Komponentenstilen nach GLOBAL verschoben (${Math.round(iconCss.length / 1024)} KB)`);
			return { code: out, map: null };
		},
	};
}
