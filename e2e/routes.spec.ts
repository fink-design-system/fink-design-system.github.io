import { test, expect } from '@playwright/test';
import { waitForApp } from './helpers';
import { routes } from './routes';

/** Stellt sicher, dass `routes.ts` jede verlinkte Hash-Route der Showcase enthält. */
test('route list covers every linked page', async ({ page }) => {
	test.setTimeout(600_000);
	const seen = new Set<string>(['/']);
	const queue = ['/'];
	while (queue.length) {
		const route = queue.shift()!;
		await page.goto(`/#${route}`);
		await waitForApp(page);
		const hrefs = await page.evaluate(() => {
			const out: string[] = [];
			const walk = (scope: Document | ShadowRoot) =>
				scope.querySelectorAll('*').forEach((el) => {
					const href = el.getAttribute('href') ?? el.getAttribute('_href');
					if (href) out.push(href);
					if (el.shadowRoot) walk(el.shadowRoot);
				});
			walk(document);
			return out;
		});
		for (const href of hrefs) {
			if (!href.startsWith('#/')) continue;
			const path = href.slice(1).split('?')[0];
			if (!seen.has(path)) {
				seen.add(path);
				queue.push(path);
			}
		}
	}
	expect([...seen].filter((r) => !routes.includes(r)).sort()).toEqual([]);
});
