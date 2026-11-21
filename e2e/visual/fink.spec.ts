import { test, expect } from '../fixtures';
import { VISUAL_LIBS } from './libs';

/**
 * Dieselben Elemente, gerendert mit dem jeweiligen Fink-Nachbau-Theme (data-theme), verglichen
 * gegen die Original-Screenshots aus originals.spec.ts. maxDiffPixelRatio schluckt Schrift- und
 * Sub-Pixel-Unterschiede; strukturell andere Ausprägungen fliegen auf.
 *
 * Baselines neu schreiben: `pnpm exec playwright test --project=visual --update-snapshots=all`.
 */
const MAX_DIFF = 0.35;

for (const lib of VISUAL_LIBS) {
		test(`fink ${lib.theme}`, async ({ page }) => {
			if (process.env.FINK_VISUAL === undefined) test.skip(true, 'Visual-Vergleich nur über `pnpm test:visual`');
			if (lib.todo) test.skip(true, `${lib.theme}: ${lib.todo}`);
			await page.goto('/');
		const isKern = lib.theme === 'kern';
		await page.evaluate((theme) => {
			const section = document.createElement('section');
			section.setAttribute('data-theme', theme);
			section.style.position = 'absolute';
			section.style.inset = '0';
			section.style.zIndex = '99999';
			section.style.background = '#fff';
			section.style.padding = '24px';
			section.style.display = 'grid';
			section.style.gridTemplateColumns = 'repeat(2, 170px)';
			section.style.gap = '16px';
			section.innerHTML = Object.entries({
				// Markup der Fink-Seite, gleiche Elemente und Labels wie beim Original.
				'button-primary': '<kol-button _label="Primary" _variant="primary"></kol-button>',
				'button-secondary': '<kol-button _label="Secondary" _variant="secondary"></kol-button>',
			})
				.map(
					([element, markup]) =>
						`<span class="cell" data-element="${element}" style="box-sizing:border-box;overflow:hidden;width:170px;height:44px;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid #ddd">${markup}</span>`,
				)
				.join('');
			document.body.appendChild(section);
		}, lib.theme);
		await page.waitForFunction(
			(theme) => {
				const btn = document.querySelector(`section[data-theme="${theme}"] kol-button`);
				return !!btn && btn.classList.contains('hydrated');
			},
			lib.theme,
			{ timeout: 15_000 },
		);
		await page.waitForTimeout(600);

		for (const element of ['button-primary', 'button-secondary']) {
			const cell = section_locator(page, lib.theme, element);
			await expect(cell).toHaveScreenshot(`${lib.theme}-${element}.png`, {
				maxDiffPixelRatio: MAX_DIFF,
			});
		}
	});
}

/** Fokus-Zelle nur für Kern (CSS-only-Original): dreistufiger KERN-Ring gegen den Fink-Ring. */
for (const lib of VISUAL_LIBS.filter((item) => item.theme === 'kern')) {
	test(`fink kern focus`, async ({ page }) => {
		if (process.env.FINK_VISUAL === undefined) test.skip(true, 'Visual-Vergleich nur über `pnpm test:visual`');
		await page.goto('/');
		await page.evaluate(() => {
			const section = document.createElement('section');
			section.setAttribute('data-theme', 'kern');
			section.style.position = 'absolute';
			section.style.inset = '0';
			section.style.zIndex = '99999';
			section.style.background = '#fff';
			section.style.padding = '24px';
			section.innerHTML =
				'<span class="cell" data-element="button-focus" style="box-sizing:border-box;width:230px;height:84px;display:flex;align-items:center;justify-content:center;background:#fff"><kol-button _label="Primary" _variant="primary"></kol-button></span>';
			document.body.appendChild(section);
		});
		await page.waitForFunction(
			() => {
				const btn = document.querySelector('section[data-theme="kern"] kol-button');
				return !!btn && btn.classList.contains('hydrated');
			},
			undefined,
			{ timeout: 15_000 },
		);
		await page.keyboard.press('Tab');
		await page.locator('section[data-theme="kern"] kol-button').getByRole('button').first().focus();
		await page.waitForTimeout(400);
		await expect(page.locator('section[data-theme="kern"] .cell[data-element="button-focus"]')).toHaveScreenshot(
			'kern-button-focus.png',
			{ maxDiffPixelRatio: MAX_DIFF },
		);
	});
}

/** Locator für eine Zelle im frisch injizierten Theme-Container. */
const section_locator = (page: import('@playwright/test').Page, theme: string, element: string) =>
	page.locator(`section[data-theme="${theme}"] .cell[data-element="${element}"]`);
