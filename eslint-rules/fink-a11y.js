/**
 * Fink-eigene Barrierefreiheitsregeln für ESLint.
 *
 * Wörter dürfen nicht mit Auslassungszeichen gekürzt werden: Abgeschnittener Text ist für Menschen mit
 * Vergrößerung, Screenreader oder Tastatur nicht sicher erreichbar und verletzt je nach Kontext
 * WCAG 1.3.1, 1.4.4, 1.4.10 und 1.4.12 (BITV 2.0 9.1.3.1, 9.1.4.4, 9.1.4.10, 9.1.4.12).
 */

const ELLIPSIS_CSS = /text-overflow\s*:\s*ellipsis|(?:-webkit-)?line-clamp\s*:\s*(?!none)\S/i;
const ELLIPSIS_CHAR = /…|\.\.\.$/;
const TRUNCATING_CALLS = new Set(['slice', 'substring', 'substr']);

const isEllipsisLiteral = (node) =>
	(node?.type === 'Literal' && typeof node.value === 'string' && ELLIPSIS_CHAR.test(node.value.trim())) ||
	(node?.type === 'TemplateLiteral' && node.quasis.some((q) => ELLIPSIS_CHAR.test(q.value.cooked?.trim() ?? '')));

const isTruncatingCall = (node) =>
	node?.type === 'CallExpression' && node.callee.type === 'MemberExpression' && !node.callee.computed && TRUNCATING_CALLS.has(node.callee.property.name);

/** JS/TS/TSX: CSS in Strings und Style-Objekten sowie `text.slice(0, n) + '…'`. */
const noEllipsisTruncation = {
	meta: {
		type: 'problem',
		docs: { description: 'Verbietet das Kürzen von Text mit Auslassungszeichen (text-overflow: ellipsis, line-clamp, slice + „…“).' },
		messages: {
			css: 'Text nicht mit „{{what}}“ kürzen: Inhalt umbrechen lassen (overflow-wrap: anywhere; hyphens: auto).',
			style: 'Text nicht per Style „{{what}}“ kürzen: Inhalt umbrechen lassen.',
			concat: 'Text nicht abschneiden und mit Auslassungszeichen ergänzen: vollständigen Text zeigen oder eine Detailansicht anbieten.',
		},
		schema: [],
	},
	create(context) {
		const checkString = (node, value) => {
			const match = typeof value === 'string' && value.match(ELLIPSIS_CSS);
			if (match) context.report({ node, messageId: 'css', data: { what: match[0] } });
		};
		return {
			Literal(node) {
				checkString(node, node.value);
			},
			TemplateElement(node) {
				checkString(node, node.value.cooked);
			},
			Property(node) {
				const key = node.key.type === 'Identifier' ? node.key.name : node.key.value;
				const value = node.value.type === 'Literal' ? node.value.value : undefined;
				if (key === 'textOverflow' && value === 'ellipsis') context.report({ node, messageId: 'style', data: { what: 'textOverflow: ellipsis' } });
				if ((key === 'WebkitLineClamp' || key === 'lineClamp') && value !== 'none') context.report({ node, messageId: 'style', data: { what: key } });
			},
			BinaryExpression(node) {
				if (node.operator === '+' && isEllipsisLiteral(node.right) && isTruncatingCall(node.left)) context.report({ node, messageId: 'concat' });
			},
			TemplateLiteral(node) {
				node.expressions.forEach((expr, i) => {
					const after = node.quasis[i + 1]?.value.cooked ?? '';
					if (isTruncatingCall(expr) && /^\s*(…|\.\.\.)/.test(after)) context.report({ node, messageId: 'concat' });
				});
			},
		};
	},
};

/** CSS (Sprache `css/css` von @eslint/css): text-overflow: ellipsis und line-clamp. */
const noCssEllipsis = {
	meta: {
		type: 'problem',
		languages: ['css/css'],
		docs: { description: 'Verbietet text-overflow: ellipsis und line-clamp in Stylesheets.' },
		messages: {
			ellipsis: '„{{decl}}“ kürzt Text mit Auslassungszeichen. Stattdessen umbrechen lassen (overflow-wrap: anywhere; hyphens: auto).',
		},
		schema: [],
	},
	create(context) {
		const { sourceCode } = context;
		return {
			Declaration(node) {
				const property = node.property.toLowerCase();
				const value = sourceCode.getText(node.value).trim().toLowerCase();
				const truncates = (property === 'text-overflow' && value.includes('ellipsis')) || ((property === 'line-clamp' || property === '-webkit-line-clamp') && value !== 'none' && value !== 'unset' && value !== 'initial');
				if (truncates) context.report({ node, messageId: 'ellipsis', data: { decl: `${node.property}: ${value}` } });
			},
		};
	},
};

export default {
	meta: { name: 'eslint-plugin-fink-a11y', version: '0.1.0' },
	rules: {
		'no-ellipsis-truncation': noEllipsisTruncation,
		'no-css-ellipsis': noCssEllipsis,
	},
};
