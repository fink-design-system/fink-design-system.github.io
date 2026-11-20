import { defineConfig, devices } from '@playwright/test';
import type { A11yOptions } from './e2e/fixtures';

const port = Number(process.env.PORT ?? 4173);
const desktop = { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' as const };

/** Marken-Themes aus @fink/tokens (src/themes); je Theme hell und dunkel über alle Routen. */
const brandThemes = ['porsche', 'siemens-ix', 'telekom'];

/**
 * Barrierefreiheitstests der Showcase mit Playwright und axe-core.
 * Vorher bauen: `pnpm build`. Starten: `pnpm test:a11y`.
 */
export default defineConfig<A11yOptions>({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	workers: 4,
	timeout: 90_000,
	reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : [['list']],
	use: {
		baseURL: `http://localhost:${port}`,
		trace: 'off',
	},
	webServer: {
		command: `pnpm --filter @fink/showcase exec vite preview --port ${port} --strictPort`,
		url: `http://localhost:${port}`,
		reuseExistingServer: !process.env.CI,
	},
	projects: [
		{ name: 'routes', testMatch: /routes\.spec\.ts/, use: desktop },
		{ name: 'de-light', testMatch: /a11y\.spec\.ts/, use: { ...desktop, variant: { language: 'de', scheme: 'light' } } },
		{ name: 'de-dark', testMatch: /a11y\.spec\.ts/, use: { ...desktop, variant: { language: 'de', scheme: 'dark' } } },
		{ name: 'en-light', testMatch: /a11y\.spec\.ts/, use: { ...desktop, variant: { language: 'en', scheme: 'light' } } },
		{ name: 'en-dark', testMatch: /a11y\.spec\.ts/, use: { ...desktop, variant: { language: 'en', scheme: 'dark' } } },
		{
			name: 'mobile-320',
			testMatch: /(a11y|states)\.spec\.ts/,
			use: { ...devices['Desktop Chrome'], viewport: { width: 320, height: 640 }, reducedMotion: 'reduce', variant: { language: 'de', scheme: 'light' }, checkReflow: true },
		},
		...brandThemes.flatMap((theme) =>
			(['light', 'dark'] as const).map((scheme) => ({
				name: `${theme}-${scheme}`,
				testMatch: /a11y\.spec\.ts/,
				use: { ...desktop, variant: { language: 'de' as const, scheme, theme } },
			})),
		),
		{ name: 'text-spacing', testMatch: /text-spacing\.spec\.ts/, use: { ...desktop, variant: { language: 'de', scheme: 'light' } } },
		{ name: 'states-light', testMatch: /states\.spec\.ts/, use: { ...desktop, variant: { language: 'de', scheme: 'light' } } },
		{ name: 'states-dark', testMatch: /states\.spec\.ts/, use: { ...desktop, variant: { language: 'de', scheme: 'dark' } } },
	],
});
