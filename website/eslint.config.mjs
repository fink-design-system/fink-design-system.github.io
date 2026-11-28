import css from '@eslint/css';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import finkA11y from './eslint-rules/fink-a11y.mjs';

/**
 * Statische Barrierefreiheitsprüfung der Website (ergänzt die axe-core-Tests in ./e2e):
 * eslint-plugin-jsx-a11y (strict, Regeldaten von axe-core) und die Fink-Regeln gegen Kürzen von Text mit Auslassungszeichen.
 */
export default tseslint.config(
	{ ignores: ['dist/**', 'public/**', 'playwright-report/**', 'test-results/**'] },
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: { parser: tseslint.parser, parserOptions: { ecmaFeatures: { jsx: true } }, globals: { ...globals.browser, ...globals.node } },
		plugins: { 'fink-a11y': finkA11y },
		rules: { 'fink-a11y/no-ellipsis-truncation': 'error' },
	},
	// Die Prüfwerkzeuge selbst nennen die verbotenen Muster.
	{ files: ['e2e/**'], rules: { 'fink-a11y/no-ellipsis-truncation': 'off' } },
	{
		files: ['src/**/*.tsx'],
		...jsxA11y.flatConfigs.strict,
		languageOptions: { ...jsxA11y.flatConfigs.strict.languageOptions, parser: tseslint.parser },
		rules: {
			...jsxA11y.flatConfigs.strict.rules,
			// Scrollbare Bereiche brauchen tabindex="0" mit role="region" und Namen (axe: scrollable-region-focusable, WCAG 2.1.1).
			'jsx-a11y/no-noninteractive-tabindex': ['error', { tags: [], roles: ['tabpanel', 'region'], allowExpressionValues: true }],
			// list-style: none entfernt in Safari/VoiceOver die Listensemantik; die explizite Rolle stellt sie wieder her.
			'jsx-a11y/no-redundant-roles': ['error', { nav: ['navigation'], ul: ['list'], ol: ['list'], li: ['listitem'] }],
		},
	},
	{
		files: ['src/**/*.{ts,tsx}'],
		plugins: { 'react-hooks': reactHooks },
		rules: { 'react-hooks/rules-of-hooks': 'error', 'react-hooks/exhaustive-deps': 'warn' },
	},
	{
		files: ['**/*.css'],
		language: 'css/css',
		languageOptions: { tolerant: true },
		plugins: { css, 'fink-a11y': finkA11y },
		rules: { 'fink-a11y/no-css-ellipsis': 'error' },
	},
);
