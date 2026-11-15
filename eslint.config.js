import css from '@eslint/css';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import finkA11y from './eslint-rules/fink-a11y.js';

/**
 * Statische Barrierefreiheitsprüfung (ergänzt die axe-core-Tests mit Playwright in ./e2e):
 * - eslint-plugin-jsx-a11y (strict) – nutzt die Regeldaten von axe-core – für React- und Stencil-JSX,
 * - Fink-Regeln gegen Kürzen von Text mit Auslassungszeichen, in TS/TSX und in CSS (@eslint/css).
 */
export default tseslint.config(
	{
		ignores: ['packages/components/src/components.d.ts', '**/node_modules/**', '**/dist/**', '**/www/**', '**/loader/**', '**/.stencil/**', 'packages/react/src/generated/**', 'apps/showcase/public/**', 'playwright-report/**', 'test-results/**'],
	},
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: { ecmaFeatures: { jsx: true } },
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: { 'fink-a11y': finkA11y },
		rules: {
			'fink-a11y/no-ellipsis-truncation': 'error',
		},
	},
	{
		// Die Prüfwerkzeuge selbst nennen die verbotenen Muster.
		files: ['e2e/**', 'eslint-rules/**'],
		rules: { 'fink-a11y/no-ellipsis-truncation': 'off' },
	},
	{
		files: ['apps/showcase/src/**/*.tsx', 'packages/components/src/**/*.tsx', 'packages/react/src/**/*.tsx'],
		...jsxA11y.flatConfigs.strict,
		languageOptions: { ...jsxA11y.flatConfigs.strict.languageOptions, parser: tseslint.parser },
		settings: {
			'jsx-a11y': {
				// Stencil-JSX nutzt for wie HTML.
				attributes: { for: ['htmlFor', 'for'] },
			},
		},
		rules: {
			...jsxA11y.flatConfigs.strict.rules,
			// Scrollbare Bereiche brauchen tabindex="0" mit role="region" und Namen (axe: scrollable-region-focusable, WCAG 2.1.1).
			'jsx-a11y/no-noninteractive-tabindex': ['error', { tags: [], roles: ['tabpanel', 'region'], allowExpressionValues: true }],
			// Datumsgitter nach APG: <table role="grid"> mit <td role="gridcell">.
			'jsx-a11y/no-noninteractive-element-to-interactive-role': ['error', { table: ['grid'], td: ['gridcell'], ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'], ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'], li: ['menuitem', 'menuitemradio', 'menuitemcheckbox', 'option', 'row', 'tab', 'treeitem'] }],
			// list-style: none entfernt in Safari/VoiceOver die Listensemantik; die explizite Rolle stellt sie wieder her.
			'jsx-a11y/no-redundant-roles': ['error', { nav: ['navigation'], ul: ['list'], ol: ['list'], li: ['listitem'] }],
		},
	},
	{
		files: ['apps/showcase/src/**/*.{ts,tsx}', 'packages/react/src/**/*.{ts,tsx}'],
		plugins: { 'react-hooks': reactHooks },
		rules: {
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
	},
	{
		files: ['**/*.css'],
		language: 'css/css',
		languageOptions: { tolerant: true },
		plugins: { css, 'fink-a11y': finkA11y },
		rules: {
			'fink-a11y/no-css-ellipsis': 'error',
		},
	},
);
