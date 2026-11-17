import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Locator, type Page } from '@playwright/test';

/**
 * Dieselben Prüfungen für alle Varianten. Gefunden wird über Rollen und zugängliche Namen,
 * nur die Ablagestelle für Ziehen und Ablegen ist je Variante angegeben.
 */
const VARIANTS = [
	{ id: 'kolibri', name: 'KoliBri', dropTarget: 'fink-file-upload' },
	{ id: 'react-aria', name: 'React Aria', dropTarget: '.ra-zone' },
	{ id: 'lion', name: 'Lion', dropTarget: 'fink-lion-file-upload .input-file__drop-zone' },
] as const;

const LABEL = 'Zuständige Orte';
/** Englische Bedienwörter. „Drag & Drop“ gilt als eingedeutscht (so in Lions deutscher Übersetzung). */
const ENGLISH = /\b(Remove|Browse|Select|Choose|files?|No files?|Upload|selected|Clear|Drop (?:files|here))\b/;

function tagField(page: Page): Locator {
	return page.getByRole('combobox', { name: LABEL }).or(page.getByRole('textbox', { name: LABEL })).first();
}

function status(page: Page, text: string | RegExp): Locator {
	return page.locator('[role=status]').filter({ hasText: text });
}

/** Listeneintrag einer Datei, unabhängig von Statusmeldungen mit demselben Namen. */
function fileItem(page: Page, name: string): Locator {
	return page.getByRole('listitem').filter({ hasText: name });
}

function pdf(name: string, bytes: number, mimeType = 'application/pdf') {
	return { name, mimeType, buffer: Buffer.alloc(bytes, 1) };
}

async function ready(page: Page, id: string) {
	await page.goto(`/${id}.html`);
	await expect(tagField(page)).toBeVisible();
	await expect(page.getByRole('button', { name: 'Berlin entfernen' })).toBeVisible();
	await page.waitForTimeout(300);
}

async function addTag(page: Page, text: string, key = 'Enter') {
	const field = tagField(page);
	await field.click();
	await field.pressSequentially(text, { delay: 20 });
	await page.keyboard.press(key);
}

async function deepFocus(page: Page) {
	return page.evaluate(() => {
		let el = document.activeElement;
		while (el?.shadowRoot?.activeElement) el = el.shadowRoot.activeElement;
		return el ? `${el.tagName.toLowerCase()}${el.getAttribute('aria-label') ? `[${el.getAttribute('aria-label')}]` : ''}` : '';
	});
}

for (const variant of VARIANTS) {
	test.describe(variant.name, () => {
		test.beforeEach(async ({ page }) => {
			await ready(page, variant.id);
		});

		test('Tag per Tastatur mit Enter übernehmen', async ({ page }) => {
			await addTag(page, 'Bonn');
			await expect(status(page, 'Bonn hinzugefügt')).toHaveCount(1);
			await expect(page.getByRole('button', { name: 'Bonn entfernen' })).toBeVisible();
			await expect(page.locator('#event-log')).toContainText('Bonn');
		});

		test('Freie Eingabe mit Komma übernehmen', async ({ page }) => {
			await addTag(page, 'Kiel', ',');
			await expect(page.getByRole('button', { name: 'Kiel entfernen' })).toBeVisible();
		});

		test('Vorschlag per Pfeiltaste wählen', async ({ page }) => {
			test.fixme(variant.id === 'kolibri', 'Nicht simulierbar: fink-tag-input nutzt die native Vorschlagsliste (datalist), die Chromium headless nicht öffnet.');
			const field = tagField(page);
			await field.click();
			await field.pressSequentially('Dre', { delay: 20 });
			await page.keyboard.press('ArrowDown');
			await page.keyboard.press('Enter');
			await expect(page.getByRole('button', { name: 'Dresden entfernen' })).toBeVisible();
		});

		test('Doppelten Eintrag mit Meldung abweisen', async ({ page }) => {
			await addTag(page, 'Berlin');
			await expect(page.getByText('Berlin ist bereits ausgewählt.')).toBeVisible();
			await expect(page.getByRole('button', { name: 'Berlin entfernen' })).toHaveCount(1);
		});

		test('Rücktaste im leeren Feld entfernt den letzten Eintrag', async ({ page }) => {
			await tagField(page).click();
			await page.keyboard.press('Backspace');
			await expect(status(page, 'Berlin entfernt')).toHaveCount(1);
			await expect(page.getByRole('button', { name: 'Berlin entfernen' })).toHaveCount(0);
		});

		test('Eintrag per Tastatur über den Entfernen-Knopf löschen', async ({ page }) => {
			await page.getByRole('button', { name: 'Berlin entfernen' }).focus();
			await page.keyboard.press('Enter');
			await expect(page.getByRole('button', { name: 'Berlin entfernen' })).toHaveCount(0);
		});

		test('Höchstzahl sperrt das Feld', async ({ page }) => {
			for (const town of ['Bonn', 'Kiel', 'Ulm', 'Jena']) await addTag(page, town);
			await expect(page.getByRole('button', { name: 'Jena entfernen' })).toBeVisible();
			await expect(tagField(page)).toBeDisabled();
		});

		test('Gültige Datei über die Dateiauswahl hinzufügen', async ({ page }) => {
			await page.locator('input[type=file]').setInputFiles(pdf('beleg.pdf', 1024));
			await expect(fileItem(page, 'beleg.pdf')).toBeVisible();
			await expect(fileItem(page, 'beleg.pdf')).toContainText('1 KB');
			await expect(status(page, '1 Datei hinzugefügt')).toHaveCount(1);
			await expect(page.locator('#event-log')).toContainText('beleg.pdf');
		});

		test('Zu große Datei mit Meldung abweisen', async ({ page }) => {
			await page.locator('input[type=file]').setInputFiles(pdf('gross.pdf', 3 * 1024 * 1024));
			await expect(page.getByText(/2 MB/).first()).toBeVisible();
			await expect(page.locator('#event-log')).not.toContainText('gross.pdf');
		});

		test('Falschen Dateityp mit Meldung abweisen', async ({ page }) => {
			await page.locator('input[type=file]').setInputFiles(pdf('bild.png', 1024, 'image/png'));
			await expect(page.getByText(/pdf/i).filter({ hasNotText: 'bild.png' }).first()).toBeVisible();
			await expect(page.locator('#event-log')).not.toContainText('bild.png');
		});

		test('Datei über den Entfernen-Knopf löschen', async ({ page }) => {
			await page.locator('input[type=file]').setInputFiles(pdf('beleg.pdf', 1024));
			await page.getByRole('button', { name: /beleg\.pdf entfernen/ }).click();
			await expect(fileItem(page, 'beleg.pdf')).toHaveCount(0);
			await expect(status(page, 'beleg.pdf entfernt')).toHaveCount(1);
		});

		test('Datei per Ziehen und Ablegen hinzufügen', async ({ page }) => {
			test.fixme(variant.id === 'react-aria', 'Nicht simulierbar: React Aria prüft dataTransfer.effectAllowed, das bei synthetischen Ereignissen immer „none“ ist.');
			const target = page.locator(variant.dropTarget).first();
			const dataTransfer = await page.evaluateHandle(() => {
				const dt = new DataTransfer();
				dt.items.add(new File(['x'.repeat(2048)], 'abgelegt.pdf', { type: 'application/pdf' }));
				return dt;
			});
			for (const type of ['dragenter', 'dragover', 'drop']) await target.dispatchEvent(type, { dataTransfer });
			await expect(fileItem(page, 'abgelegt.pdf')).toBeVisible();
		});

		test('Fokus ist im Hochkontrastmodus sichtbar', async ({ page }) => {
			await page.emulateMedia({ forcedColors: 'active' });
			const checks: Record<string, boolean> = {};
			const targets = [
				['Eingabefeld', tagField(page)],
				['Entfernen-Knopf', page.getByRole('button', { name: 'Berlin entfernen' })],
			] as const;
			for (const [name, locator] of targets) {
				const box = (await locator.boundingBox())!;
				const clip = { x: Math.max(0, box.x - 8), y: Math.max(0, box.y - 8), width: box.width + 16, height: box.height + 16 };
				await page.locator('h1').click();
				const before = await page.screenshot({ clip });
				await page.keyboard.press('Tab');
				for (let i = 0; i < 30 && !(await locator.evaluate((el) => el.matches(':focus-within') || !!el.shadowRoot?.activeElement)); i++) await page.keyboard.press('Tab');
				const after = await page.screenshot({ clip });
				checks[name] = !before.equals(after);
			}
			expect(checks, `Fokus sichtbar (${await deepFocus(page)})`).toEqual({ Eingabefeld: true, 'Entfernen-Knopf': true });
		});

		test('Kein seitliches Scrollen bei 320 Pixeln', async ({ page }) => {
			await page.setViewportSize({ width: 320, height: 800 });
			await page.locator('input[type=file]').setInputFiles(pdf('ein-sehr-langer-dateiname-fuer-den-nachweis-2026.pdf', 1024));
			await page.waitForTimeout(300);
			expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
		});

		test('Alle sichtbaren Texte auf Deutsch', async ({ page }) => {
			await page.locator('input[type=file]').setInputFiles(pdf('beleg.pdf', 1024));
			const text = await page.locator('main').evaluate((main) => {
				const parts: string[] = [];
				const walk = (node: Node) => {
					if (node instanceof Element && node.id === 'event-log') return;
					if (node.nodeType === Node.TEXT_NODE) parts.push(node.textContent ?? '');
					if (node instanceof Element) {
						if (node.shadowRoot) node.shadowRoot.childNodes.forEach(walk);
						for (const attr of ['aria-label', 'title', 'placeholder']) {
							const value = node.getAttribute(attr);
							if (value) parts.push(value);
						}
					}
					node.childNodes.forEach(walk);
				};
				walk(main);
				return parts.join(' ').replace(/\s+/g, ' ');
			});
			expect(text).not.toMatch(ENGLISH);
		});

		test('Keine axe-Funde nach Interaktion', async ({ page }) => {
			await addTag(page, 'Bonn');
			await page.locator('input[type=file]').setInputFiles([pdf('beleg.pdf', 1024), pdf('bild.png', 1024, 'image/png')]);
			await page.waitForTimeout(300);
			const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'EN-301-549', 'best-practice']).analyze();
			expect(result.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
		});

		test('Keine Konsolenfehler', async ({ page }) => {
			const errors: string[] = [];
			page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
			page.on('pageerror', (error) => errors.push(error.message));
			await ready(page, variant.id);
			await addTag(page, 'Bonn');
			await page.locator('input[type=file]').setInputFiles(pdf('beleg.pdf', 1024));
			await page.waitForTimeout(300);
			expect(errors).toEqual([]);
		});
	});
}
