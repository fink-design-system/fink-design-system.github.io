import { expect, test } from '../fixtures';
import { VISUAL_LIBS } from './libs';

/**
 * Dieselben Elemente, gerendert mit dem jeweiligen Fink-Nachbau-Theme (data-theme), verglichen
 * gegen die Original-Screenshots aus originals.spec.ts. maxDiffPixelRatio schluckt Schrift- und
 * Sub-Pixel-Unterschiede; strukturell andere Ausprägungen fliegen auf.
 *
 * Die Zellen ergeben sich aus den Schlüsseln der Original-Zellen (libs.ts) — nur Elemente mit
 * Fink-Gegenstück sind hier verdrahtet. Fokus- und visited-Zellen erkennt der Name (…-focus,
 * …-visited), die Zustände werden vor dem Screenshot gesetzt — gleich wie in originals.spec.ts.
 *
 * Baselines ERZEUGT NUR originals.spec (--update-snapshots=all -g originals). Dieser Spec nutzt
 * dieselben Snapshot-Namen und darf nie schreiben — sonst vergleicht Fink gegen Fink.
 */
const MAX_DIFF = 0.35;
const updating = process.argv.some((arg) => arg.includes('update-snapshots'));

/** data-element → Markup der Fink-Seite, gleiche Elemente und Labels wie beim Original. */
const FINK_CELLS: Record<string, string> = {
	'button-primary': '<fink-button _label="Primary" _variant="primary"></fink-button>',
	'button-secondary': '<fink-button _label="Secondary" _variant="secondary"></fink-button>',
	'button-focus': '<fink-button _label="Primary" _variant="primary"></fink-button>',
	'link-visited': '<fink-link _label="Link" _href="#link-visited-target"></fink-link>',
};

for (const lib of VISUAL_LIBS) {
	test(`fink ${lib.theme}`, async ({ page }) => {
		if (process.env.FINK_VISUAL === undefined) test.skip(true, 'Visual-Vergleich nur über `pnpm test:visual`');
		if (updating) test.skip(true, 'Baselines nur über originals.spec erzeugen — dieser Spec vergleicht nur');
		if (lib.todo) test.skip(true, `${lib.theme}: ${lib.todo}`);
		await page.goto('/');
		// History-Eintrag für visited-Zellen: der Fragment-Link muss „besucht“ sein, damit :visited greift.
		const needsVisited = Object.keys(lib.cells).some((element) => element.endsWith('visited'));
		if (needsVisited) {
			await page.evaluate(() => {
				location.hash = 'link-visited-target';
			});
			await page.waitForTimeout(150);
			await page.evaluate(() => {
				history.back();
			});
			await page.waitForTimeout(150);
		}
		const elements = Object.keys(lib.cells).filter((element) => element in FINK_CELLS);
		await page.evaluate(
			({ theme, markupByElement }) => {
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
				section.innerHTML = Object.entries(markupByElement)
					.map(
						([element, markup]) =>
							`<span class="cell" data-element="${element}" style="box-sizing:border-box;overflow:hidden;width:170px;height:44px;display:flex;align-items:center;justify-content:center;background:#fff;border:1px solid #ddd">${markup}</span>`,
					)
					.join('');
				document.body.appendChild(section);
			},
			{ theme: lib.theme, markupByElement: Object.fromEntries(elements.map((element) => [element, FINK_CELLS[element]])) },
		);
		await page.waitForFunction(
			(theme) => {
				const section = document.querySelector(`section[data-theme="${theme}"]`);
				if (!section) return false;
				const hosts = [...section.querySelectorAll('*')].filter((el) => el.localName.includes('-'));
				return hosts.length > 0 && hosts.every((el) => el.classList.contains('hydrated'));
			},
			lib.theme,
			{ timeout: 15_000 },
		);
		await page.waitForTimeout(600);

		for (const element of elements) {
			const cell = section_locator(page, lib.theme, element);
			if (element.endsWith('focus')) {
				await page.keyboard.press('Tab');
				await cell.getByRole('button').first().focus();
				await page.waitForTimeout(400);
			}
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
		if (updating) test.skip(true, 'Baselines nur über originals.spec erzeugen — dieser Spec vergleicht nur');
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
				'<span class="cell" data-element="button-focus" style="box-sizing:border-box;width:230px;height:84px;display:flex;align-items:center;justify-content:center;background:#fff"><fink-button _label="Primary" _variant="primary"></fink-button></span>';
			document.body.appendChild(section);
		});
		await page.waitForFunction(
			() => {
				const btn = document.querySelector('section[data-theme="kern"] fink-button');
				return !!btn && btn.classList.contains('hydrated');
			},
			undefined,
			{ timeout: 15_000 },
		);
		await page.keyboard.press('Tab');
		await page.locator('section[data-theme="kern"] fink-button').getByRole('button').first().focus();
		await page.waitForTimeout(400);
		await expect(page.locator('section[data-theme="kern"] .cell[data-element="button-focus"]')).toHaveScreenshot('kern-button-focus.png', {
			maxDiffPixelRatio: MAX_DIFF,
		});
	});
}

/** Locator für eine Zelle im frisch injizierten Theme-Container. */
const section_locator = (page: import('@playwright/test').Page, theme: string, element: string) =>
	page.locator(`section[data-theme="${theme}"] .cell[data-element="${element}"]`);
