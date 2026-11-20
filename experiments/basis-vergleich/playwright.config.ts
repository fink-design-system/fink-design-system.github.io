import { defineConfig, devices } from '@playwright/test';

/** Prüfstand: dieselben Tests für alle drei Varianten. Vorher `pnpm spike:build` ausführen. */
export default defineConfig({
	testDir: './tests',
	fullyParallel: true,
	retries: 0,
	reporter: [['list'], ['json', { outputFile: 'results/playwright.json' }]],
	use: {
		baseURL: 'http://localhost:4317',
		trace: 'off',
		locale: 'de-DE',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: [
		{ command: 'pnpm exec vite preview --port 4317 --strictPort', url: 'http://localhost:4317', reuseExistingServer: true },
		{ command: 'pnpm exec vite preview --port 4319 --strictPort --outDir dist-slim', url: 'http://localhost:4319/kolibri.html', reuseExistingServer: true },
		{ command: 'pnpm exec vite preview --port 4323 --strictPort --outDir dist-lazy', url: 'http://localhost:4323/kolibri.html', reuseExistingServer: true },
		{ command: 'pnpm exec vite preview --port 4329 --strictPort --outDir dist-next', url: 'http://localhost:4329/kolibri.html', reuseExistingServer: true },
	],
});
