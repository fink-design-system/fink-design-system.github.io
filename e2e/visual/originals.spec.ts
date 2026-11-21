import { test, expect } from '../fixtures';
import { VISUAL_LIBS } from './libs';

/**
 * Screenshots der ORIGINAL-Design-Systeme (per CDN geladen, auf der Showcase-Seite injiziert —
 * module-imports aus about:blank heraus werden vom Browser blockiert). Dieser Lauf erzeugt und
 * aktualisiert die Baselines: `pnpm exec playwright test --project=visual --update-snapshots=all`.
 * Das Fink-Gegenstück vergleicht visual/fink.spec.ts gegen genau diese Baselines.
 */
const HARNESS_CSS = `
	body > #original-harness { position: absolute; inset: 0; background: #fff; z-index: 99999; padding: 24px; }
	#original-harness { display: grid; grid-template-columns: repeat(2, 170px); gap: 16px; }
	.cell { box-sizing: border-box; overflow: hidden; width: 170px; height: 44px; display: flex; align-items: center; justify-content: center; background: #fff; border: 1px solid #ddd; }
`;

for (const lib of VISUAL_LIBS) {
	test(`originals ${lib.theme}`, async ({ page }) => {
		await page.goto('/');
		await page.evaluate(({ lib, harnessCss }) => {
			document.head.insertAdjacentHTML('beforeend', lib.head + `<style>${harnessCss}</style>`);
			for (const script of lib.scripts ?? []) {
				const el = document.createElement('script');
				if (script.type) el.type = script.type;
				if (script.src) el.src = script.src;
				if (script.code) el.textContent = script.code;
				document.head.appendChild(el);
			}
			const harness = document.createElement('div');
			harness.id = 'original-harness';
			harness.innerHTML = Object.entries(lib.cells)
				.map(([element, markup]) => `<span class="cell" data-element="${element}">${markup}</span>`)
				.join('\n');
			document.body.appendChild(harness);
		}, { lib, harnessCss: HARNESS_CSS });

		if (lib.todo) test.skip(true, `${lib.theme}: ${lib.todo}`);
		// Bis zu drei Versuche: die Stencil-CDNs liefern ihre Style-Chunks gelegentlich verzögert,
		// eine unstyled Baseline wäre für den Vergleich wertlos. Erkennbar an transparentem
		// Hintergrund des ersten Elements.
		let styled = false;
		for (let attempt = 0; attempt < 3 && !styled; attempt++) {
			let ready = true;
			try {
				await page.goto('/');
				await page.evaluate(({ lib, harnessCss }) => {
					document.head.insertAdjacentHTML('beforeend', lib.head + `<style>${harnessCss}</style>`);
					for (const script of lib.scripts ?? []) {
						const el = document.createElement('script');
						if (script.type) el.type = script.type;
						if (script.src) el.src = script.src;
						if (script.code) el.textContent = script.code;
						document.head.appendChild(el);
					}
					const harness = document.createElement('div');
					harness.id = 'original-harness';
					harness.innerHTML = Object.entries(lib.cells)
						.map(([element, markup]) => `<span class="cell" data-element="${element}">${markup}</span>`)
						.join('\n');
					document.body.appendChild(harness);
				}, { lib, harnessCss: HARNESS_CSS });
				await page.waitForFunction(lib.ready, undefined, { timeout: 20_000 });
				if (lib.init) await page.evaluate(`(async () => { ${lib.init} })()`);
				if (lib.postReady) await page.waitForFunction(lib.postReady, undefined, { timeout: 20_000 });
				await page.waitForTimeout(2500);
				styled = await page.evaluate(() => {
					const els = [...document.querySelectorAll('#original-harness .cell > *')];
					if (els.length === 0) return false;
					// Stencil-Elemente sind gestylt, sobald ihr Shadow-Root ein <style> (oder adoptierte
					// Sheets) trägt; ohne Styles wäre die Baseline wertlos.
					return els.every((el) => {
						if (el.shadowRoot) {
							return el.shadowRoot.querySelector('style') !== null || el.shadowRoot.adoptedStyleSheets.length > 0;
						}
						const cs = getComputedStyle(el);
						return cs.backgroundColor !== 'rgba(0, 0, 0, 0)';
					});
				});
			} catch {
				ready = false;
			}
		}
		test.skip(!styled, `${lib.theme}: Original per CDN nicht gestylt ladbar — Bootstrap prüfen (TODO)`);
		for (const element of Object.keys(lib.cells)) {
			await expect(page.locator(`#original-harness .cell[data-element="${element}"]`)).toHaveScreenshot(
				`${lib.theme}-${element}.png`,
			);
		}
	});
}
