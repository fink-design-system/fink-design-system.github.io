import { test, expect } from './fixtures';
import { attach, findTextSpacingClipping, formatFindings, openRoute } from './helpers';
import { routes } from './routes';

/** WCAG 1.4.12 / BITV 9.1.4.12: erhöhte Textabstände schneiden auf keiner Seite Inhalt ab. */
for (const route of routes) {
	test(`text-spacing ${route}`, async ({ page, variant }, testInfo) => {
		await openRoute(page, route, variant);
		const findings = await findTextSpacingClipping(page);
		await attach(testInfo, findings);
		expect(findings, formatFindings(findings)).toEqual([]);
	});
}
