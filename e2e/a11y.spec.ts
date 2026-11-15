import { test, expect } from './fixtures';
import { attach, formatFindings, openRoute, runAxe, runFinkChecks } from './helpers';
import { notFoundRoutes, routes } from './routes';

/**
 * Barrierefreiheit aller Seiten und Kompositions-Ansichten: axe-core (WCAG 2.2 AA, EN 301 549 / BITV 2.0,
 * Best Practices), keine Ellipsis-Kürzung, keine rohen Übersetzungsschlüssel, Fokus nicht verdeckt (2.4.11)
 * und – im 320-px-Projekt – Reflow ohne horizontales Scrollen.
 */
for (const route of [...routes, ...notFoundRoutes]) {
	test(`a11y ${route}`, async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, route, variant);
		const findings = [...(await runAxe(page)), ...(await runFinkChecks(page, { reflow: checkReflow }))];
		await attach(testInfo, findings);
		expect(findings, formatFindings(findings)).toEqual([]);
	});
}
