import { expect, test } from '@playwright/test';

/**
 * KoliBri rendert Badge-Beschriftungen als Markdown. Die Fassung „lazy markdown“ lädt markdown-it erst beim ersten
 * Badge nach und zeichnet die Badges dann neu. Diese Prüfung stellt sicher, dass Markdown danach sichtbar ist.
 */
const KOLIBRI = [
	{ name: 'KoliBri', base: '' },
	{ name: 'KoliBri schlank', base: 'http://localhost:4319' },
	{ name: 'KoliBri schlank + lazy markdown', base: 'http://localhost:4323' },
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
