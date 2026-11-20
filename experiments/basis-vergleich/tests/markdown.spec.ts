import { expect, test } from '@playwright/test';

/**
 * KoliBri rendert Badge-Beschriftungen als Markdown: bis 4.6 mit markdown-it, ab 4.7 mit einem eigenen kleinen
 * Inline-Renderer (public-ui/kolibri#11637). Die Prüfung stellt sicher, dass Markdown in allen Versionen sichtbar ist
 * und rohes HTML maskiert bleibt.
 */
const KOLIBRI = [
	{ name: 'KoliBri 4.6.0', base: '' },
	{ name: 'KoliBri 4.6.0 schlank', base: 'http://localhost:4319' },
	{ name: 'KoliBri 4.5.0', base: 'http://localhost:4323' },
	{ name: 'KoliBri 4.7 (release/4)', base: 'http://localhost:4329' },
];

for (const variant of KOLIBRI) {
	test.describe(variant.name, () => {
		test('Markdown in Badge-Beschriftung wird gerendert', async ({ page }) => {
			await page.goto(`${variant.base}/kolibri-no-badge.html`);
			await expect(page.locator('input[type=file]')).toHaveCount(1);
			await page.evaluate(() => {
				const badge = document.createElement('kol-badge');
				badge.setAttribute('_label', 'Status **wichtig** & <ok>');
				document.querySelector('main')!.appendChild(badge);
			});
			const label = page.locator('kol-badge .kol-span__label');
			await expect(label.locator('strong')).toHaveText('wichtig');
			await expect(label).toHaveText('Status wichtig & <ok>');
		});
	});
}
