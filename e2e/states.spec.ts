import type { Page, TestInfo } from '@playwright/test';
import { test, expect } from './fixtures';
import { attach, formatFindings, openRoute, runAxe, runFinkChecks, waitForApp } from './helpers';

/**
 * Interaktive Zustände der Kompositionen und Patterns: geöffnete Dialoge, Drawer und Bottom Sheets,
 * Fehlerzustände von Formularen und Ansichten, die nur per Klick erreichbar sind. Jeder Zustand wird mit
 * axe-core (WCAG 2.2 AA, EN 301 549 / BITV 2.0) und den Fink-Zusatzprüfungen getestet; dazu kommen
 * Tastatur- und Fokusprüfungen nach der Checkliste des KoliBri-Skills (public-ui/agent-skills).
 */

/** Fokuspfad durch alle Shadow Roots, z. B. „kol-button > button“. */
const focusPath = (page: Page) =>
	page.evaluate(() => {
		const path: string[] = [];
		for (let el: Element | null = document.activeElement; el; el = el.shadowRoot?.activeElement ?? null) {
			path.push(el.localName + (el.id ? `#${el.id}` : ''));
		}
		return path.join(' > ');
	});

/** Zugänglicher Name des fokussierten Elements (innerstes aktives Element). */
const focusedLabel = (page: Page) =>
	page.evaluate(() => {
		let el: Element | null = document.activeElement;
		while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
		return (el?.getAttribute('aria-label') || el?.textContent || '').trim();
	});

async function check(page: Page, checkReflow: boolean, testInfo: TestInfo, label: string) {
	await page.waitForTimeout(400);
	// Fokusprüfung nur ohne offenen modalen Dialog: Sie fokussiert jedes Element und würde den Zustand verändern.
	const { modal, inertMain } = await page.evaluate(() => {
		const find = (scope: Document | ShadowRoot, test: (el: Element) => boolean): Element | undefined => {
			for (const el of scope.querySelectorAll('*')) {
				if (test(el)) return el;
				const inner = el.shadowRoot && find(el.shadowRoot, test);
				if (inner) return inner;
			}
			return undefined;
		};
		document.querySelectorAll('[data-a11y-modal]').forEach((el) => el.removeAttribute('data-a11y-modal'));
		// Offener modaler Dialog (showModal): Der Rest der Seite ist inert. Markiert wird der äußerste Host im Dokument.
		const dialog = find(document, (el) => el.localName === 'dialog' && (el as HTMLDialogElement).open && el.matches(':modal'));
		let host: Node | undefined = dialog;
		while (host && host.getRootNode() !== document) host = (host.getRootNode() as ShadowRoot).host;
		(host as Element | undefined)?.setAttribute('data-a11y-modal', '');
		return { modal: !!dialog, inertMain: !!find(document, (el) => el.localName === 'main' && el.hasAttribute('inert')) };
	});
	const findings = [
		...(await runAxe(page, modal ? '[data-a11y-modal]' : undefined, { modal: modal || inertMain })),
		...(await runFinkChecks(page, { reflow: checkReflow, focus: !modal })),
	];
	await attach(testInfo, findings.map((f) => ({ ...f, help: `[${label}] ${f.help}` })));
	expect(findings, `${label}\n${formatFindings(findings)}`).toEqual([]);
}

const button = (page: Page, name: string | RegExp) => page.getByRole('button', { name, exact: typeof name === 'string' }).first();

test.describe('Förderportal', () => {
	test('Dialog „Neuer Antrag“: barrierefrei, Escape schließt, Fokus kehrt zurück', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/compositions/foerderportal', variant);
		const trigger = button(page, 'Neuer Antrag');
		await trigger.click();
		await expect(page.getByRole('dialog')).toBeVisible();
		await check(page, checkReflow, testInfo, 'Dialog Neuer Antrag');
		await page.keyboard.press('Escape');
		await expect(page.getByRole('dialog')).toBeHidden();
		await expect.poll(() => focusedLabel(page)).toContain('Neuer Antrag');
	});

	test('Detail-Drawer eines Antrags', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/compositions/foerderportal/applications', variant);
		await page.getByRole('button', { name: /^Details zu / }).first().click();
		await expect(page.getByRole('heading', { name: /^Antrag FD-/ })).toBeVisible();
		await check(page, checkReflow, testInfo, 'Antrags-Drawer');
	});
});

test.describe('Benutzerverwaltung', () => {
	test('Einladedialog mit Fehlern nach leerem Absenden', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/compositions/benutzer', variant);
		await button(page, 'Person einladen').click();
		await expect(page.getByRole('dialog')).toBeVisible();
		await check(page, checkReflow, testInfo, 'Einladedialog');
		await button(page, 'Einladen').click();
		await check(page, checkReflow, testInfo, 'Einladedialog mit Fehlern');
	});

	test('Detail-Drawer einer Person', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/compositions/benutzer', variant);
		await page.getByRole('button', { name: /^Details zu / }).first().click();
		await expect(page.getByRole('dialog').getByRole('heading').first()).toBeVisible();
		await check(page, checkReflow, testInfo, 'Personen-Drawer');
	});

	test('Mehrfachauswahl mit Massenaktionen und Bestätigungsdialog', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/compositions/benutzer', variant);
		await page.locator('kol-table-stateless, kol-table-stateful').first().getByRole('checkbox').nth(1).click({ force: true });
		await expect(button(page, 'Entfernen')).toBeVisible();
		await check(page, checkReflow, testInfo, 'Auswahlleiste');
		await button(page, 'Entfernen').click();
		await expect(page.getByRole('dialog')).toBeVisible();
		await check(page, checkReflow, testInfo, 'Bestätigungsdialog');
	});
});

test.describe('Bürger-App', () => {
	for (const tab of ['Termine', 'Postfach', 'Profil']) {
		test(`Tab „${tab}“`, async ({ page, variant, checkReflow }, testInfo) => {
			await openRoute(page, '/compositions/buerger-app', variant);
			await page.locator('fink-bottom-nav').getByRole('link', { name: new RegExp(`^${tab}`) }).or(page.locator('fink-bottom-nav').getByRole('button', { name: new RegExp(`^${tab}`) })).first().click();
			await check(page, checkReflow, testInfo, `Tab ${tab}`);
		});
	}

	test('Bottom Sheet „Termin buchen“', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/compositions/buerger-app', variant);
		await page.locator('fink-bottom-nav').getByRole('button', { name: /^Termine/ }).or(page.locator('fink-bottom-nav').getByRole('link', { name: /^Termine/ })).first().click();
		await button(page, 'Termin buchen').click();
		await expect(button(page, 'Verbindlich buchen')).toBeVisible();
		await check(page, checkReflow, testInfo, 'Bottom Sheet');
	});

	test('Nachricht im Postfach geöffnet', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/compositions/buerger-app', variant);
		await page.locator('fink-bottom-nav').getByRole('button', { name: /^Postfach/ }).or(page.locator('fink-bottom-nav').getByRole('link', { name: /^Postfach/ })).first().click();
		await page.locator('.phone-content .result-list').getByRole('button').first().click();
		await expect(button(page, 'Archivieren')).toBeVisible();
		await check(page, checkReflow, testInfo, 'Nachricht');
	});
});

test.describe('Mein Konto', () => {
	test('Fehlgeschlagene Anmeldung', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/compositions/konto', variant);
		await page.getByLabel('Passwort', { exact: false }).first().fill('falsch');
		await button(page, 'Anmelden').click();
		await expect(page.getByText('Anmeldung fehlgeschlagen').first()).toBeVisible();
		await check(page, checkReflow, testInfo, 'Anmeldung fehlgeschlagen');
	});

	for (const view of ['', '/benachrichtigungen', '/sicherheit', '/loeschen']) {
		test(`Angemeldet: Ansicht ${view || '/profil'}`, async ({ page, variant, checkReflow }, testInfo) => {
			await openRoute(page, '/compositions/konto', variant);
			await page.getByLabel('Passwort', { exact: false }).first().fill('fink');
			await button(page, 'Anmelden').click();
			await expect(button(page, 'Abmelden')).toBeVisible();
			if (view) {
				await page.goto(`/#/compositions/konto${view}`);
				await waitForApp(page);
			}
			await check(page, checkReflow, testInfo, `Konto ${view || '/profil'}`);
		});
	}

	test('Dialog „Konto löschen“', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/compositions/konto', variant);
		await page.getByLabel('Passwort', { exact: false }).first().fill('fink');
		await button(page, 'Anmelden').click();
		await expect(button(page, 'Abmelden')).toBeVisible();
		await page.goto('/#/compositions/konto/loeschen');
		await waitForApp(page);
		await button(page, 'Konto löschen').click();
		await expect(page.getByRole('dialog')).toBeVisible();
		await check(page, checkReflow, testInfo, 'Konto löschen');
	});
});

test.describe('Online-Antrag', () => {
	for (const task of ['Persönliche Angaben', 'Vorhaben und Finanzierung']) {
		test(`Aufgabe „${task}“: Fehlerzusammenfassung nach leerem Absenden`, async ({ page, variant, checkReflow }, testInfo) => {
			await openRoute(page, '/compositions/online-antrag', variant);
			await page.getByRole('link', { name: new RegExp(task) }).or(page.getByRole('button', { name: new RegExp(task) })).first().click();
			await check(page, checkReflow, testInfo, `${task} (leer)`);
			// Felder leeren, damit alle Fehler in einer Runde erscheinen.
			for (const input of await page.locator('kol-input-text, kol-input-email, kol-input-date, kol-input-number, kol-textarea').all()) {
				const field = input.locator('input, textarea').first();
				if (await field.isEditable().catch(() => false)) await field.fill('');
			}
			await button(page, 'Speichern und zurück').press('Enter');
			await page.waitForTimeout(300);
			// Fokus liegt in der Fehlerzusammenfassung von kol-form.
			await expect.poll(() => focusPath(page)).toMatch(/kol-form/);
			await check(page, checkReflow, testInfo, `${task} (Fehler)`);
		});
	}

	test('Aufgabe „Nachweise hochladen“: Fehler ohne Datei', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/compositions/online-antrag', variant);
		await page.getByRole('link', { name: /Nachweise hochladen/ }).or(page.getByRole('button', { name: /Nachweise hochladen/ })).first().click();
		await button(page, 'Speichern und zurück').press('Enter');
		await check(page, checkReflow, testInfo, 'Nachweise (Fehler)');
	});
});

test.describe('Hilfe-Center', () => {
	test('Suche mit geöffneten Vorschlägen', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/compositions/hilfe', variant);
		const combo = page.locator('kol-combobox').first().locator('input').first();
		await combo.click();
		await combo.pressSequentially('An');
		await page.waitForTimeout(300);
		await check(page, checkReflow, testInfo, 'Suchvorschläge');
	});

	test('Kontaktformular mit Fehlern', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/compositions/hilfe/kontakt', variant);
		await button(page, 'Nachricht senden').click();
		await page.waitForTimeout(300);
		await check(page, checkReflow, testInfo, 'Kontakt (Fehler)');
	});
});

test.describe('Dokumentation', () => {
	test('Code-Beispiel ausgeklappt', async ({ page, variant, checkReflow }, testInfo) => {
		await openRoute(page, '/components/fink-stepper', variant);
		await button(page, 'Code anzeigen').click();
		await check(page, checkReflow, testInfo, 'Code-Beispiel');
	});

	test('Mobiles Navigationspanel geöffnet', async ({ page, variant, checkReflow }, testInfo) => {
		await page.setViewportSize({ width: 400, height: 800 });
		await openRoute(page, '/', variant);
		await button(page, 'Navigation öffnen').click();
		await check(page, checkReflow, testInfo, 'Navigationspanel');
		await page.keyboard.press('Escape');
		await expect(button(page, 'Navigation öffnen')).toBeVisible();
	});

	test('Sprunglink führt zum Hauptinhalt', async ({ page, variant }) => {
		await openRoute(page, '/foundations', variant);
		await page.keyboard.press('Tab');
		await expect.poll(() => focusedLabel(page)).toBe('Zum Inhalt springen');
		await page.keyboard.press('Enter');
		await expect.poll(() => focusPath(page)).toMatch(/fink-app-shell > main#main/);
	});
});
