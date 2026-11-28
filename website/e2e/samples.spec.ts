import { expect, test } from '@playwright/test';
import { formatFindings, runAxe } from './helpers';

/**
 * Die acht Starter aus samples/, statisch gebaut nach dist/samples/<name>/ (pnpm build:pages): Jeder lädt unter seinem
 * Unterpfad, registriert die fink-*-Komponenten ohne Konsolenfehler und besteht axe mit denselben Regeln wie die Website.
 */
const samples = ['html', 'react', 'vue', 'angular', 'nextjs', 'react-router', 'nuxt', 'astro'];

for (const name of samples) {
	test(`Starter ${name}`, async ({ page }) => {
		const errors: string[] = [];
		page.on('pageerror', (error) => errors.push(String(error)));
		page.on('console', (message) => message.type() === 'error' && !/favicon/i.test(message.text()) && errors.push(message.text()));
		await page.goto(`samples/${name}/`);
		const header = page.locator('fink-page-header').first();
		await expect.poll(() => header.evaluate((el) => (el.shadowRoot?.childElementCount ?? 0) > 0), { timeout: 20_000 }).toBe(true);
		await expect(page.locator('fink-task-list')).toHaveCount(1);
		// Die Tokens hängt die Registrierung an; ein Bundler darf light-dark() nicht umgeschrieben haben.
		const primary = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--fink-color-primary').replace(/\s/g, ''));
		expect(primary).toBe('light-dark(#3b2fc9,#b7b0ff)');
		const findings = await runAxe(page);
		expect(findings, formatFindings(findings)).toEqual([]);
		expect(errors).toEqual([]);
	});
}
