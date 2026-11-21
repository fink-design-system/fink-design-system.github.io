import AxeBuilder from '@axe-core/playwright';
import type { Page, TestInfo } from '@playwright/test';
import type { Result } from 'axe-core';

/**
 * axe-core-Regelsätze für BITV 2.0 (verweist auf EN 301 549 / WCAG 2.1 AA) und WCAG 2.2 AA,
 * ergänzt um die Best Practices von axe.
 */
export const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa', 'EN-301-549', 'best-practice'];

export type Scheme = 'light' | 'dark';
export type Language = 'de' | 'en';

export interface Variant {
	language: Language;
	scheme: Scheme;
	/** Theme der Seite (gespeicherte Wahl des FinkProvider); ohne Angabe Fink. */
	theme?: string;
}

/** Setzt Sprache und Theme (über die gespeicherte Wahl) vor dem Laden der Seite. */
export async function prepare(page: Page, { language, theme = 'fink' }: Variant) {
	await page.addInitScript(
		([lng, th]) => {
			try {
				localStorage.setItem('fink-language', lng);
				localStorage.setItem('fink-theme', th);
			} catch {
				// ignorieren
			}
		},
		[language, theme] as const,
	);
}

/** Wartet, bis die Showcase gerendert ist und alle Web Components definiert und hydriert sind. */
export async function waitForApp(page: Page) {
	await page.waitForFunction(
		() => {
			if (document.querySelector('.boot')) return false;
			const root = document.getElementById('root');
			if (!root || !root.children.length) return false;
			const pending: Element[] = [];
			const walk = (scope: Document | ShadowRoot) => {
				scope.querySelectorAll('*').forEach((el) => {
					if (el.localName.includes('-') && !customElements.get(el.localName)) pending.push(el);
					if (el.shadowRoot) walk(el.shadowRoot);
				});
			};
			walk(document);
			return pending.length === 0;
		},
		undefined,
		{ timeout: 30_000 },
	);
	await page.evaluate(() => document.fonts.ready);
	// Auf die Stencil-Hydration warten: die Kolibri-Komponenten rendern asynchron NACH der
	// Registrierung — ohne diesen Wait läuft axe mitten im Rendern und meldet rotierende
	// Einzelfehler (fehlende H1, zugeklappte Code-Blöcke).
	await page.waitForFunction(
		() => {
			let pending = 0;
			const walk = (scope: Document | ShadowRoot) => {
				scope.querySelectorAll('*').forEach((el) => {
					if (el.localName.startsWith('kol-') && customElements.get(el.localName) && !el.classList.contains('hydrated')) pending += 1;
					if (el.shadowRoot) walk(el.shadowRoot);
				});
			};
			walk(document);
			return pending === 0;
		},
		undefined,
		{ timeout: 30_000 },
	);
	// Stencil rendert asynchron nach; zwei Frames plus kurze Ruhe für Watcher und Theme-Styles.
	await page.waitForTimeout(400);
}

export async function openRoute(page: Page, route: string, variant: Variant) {
	await prepare(page, variant);
	await page.goto(`/#${route}`);
	await waitForApp(page);
	await applyScheme(page, variant.scheme);
}

/** Schaltet das Farbschema um wie der SchemeToggle (color-scheme am Dokument). */
export async function applyScheme(page: Page, scheme: Scheme) {
	// Übergänge während des Wechsels aus (Dokument und alle Shadow Roots), sonst misst axe Zwischenfarben.
	await page.evaluate((s) => {
		const sheet = new CSSStyleSheet();
		sheet.replaceSync('*, *::before, *::after { transition: none !important; }');
		const roots: (Document | ShadowRoot)[] = [];
		const collect = (scope: Document | ShadowRoot) => {
			roots.push(scope);
			scope.querySelectorAll('*').forEach((el) => el.shadowRoot && collect(el.shadowRoot));
		};
		collect(document);
		roots.forEach((root) => (root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet]));
		document.documentElement.style.colorScheme = s;
		return new Promise<void>((resolve) =>
			requestAnimationFrame(() =>
				requestAnimationFrame(() => {
					roots.forEach((root) => (root.adoptedStyleSheets = root.adoptedStyleSheets.filter((x) => x !== sheet)));
					resolve();
				}),
			),
		);
	}, scheme);
}

export interface Finding {
	rule: string;
	impact?: string | null;
	help: string;
	helpUrl?: string;
	targets: string[];
	html: string[];
	summary?: string[];
}

const toFindings = (violations: Result[]): Finding[] =>
	violations.map((v) => ({
		rule: v.id,
		impact: v.impact,
		help: v.help,
		helpUrl: v.helpUrl,
		targets: v.nodes.map((n) => n.target.map((t) => (Array.isArray(t) ? t.join(' >>> ') : String(t))).join(' >>> ')),
		html: v.nodes.map((n) => n.html.slice(0, 300)),
		summary: v.nodes.map((n) => n.failureSummary ?? ''),
	}));

/** Führt axe-core mit den BITV/WCAG-Regeln auf der ganzen Seite (inklusive Shadow DOM) aus. */
export async function runAxe(page: Page, include?: string, { modal = false } = {}): Promise<Finding[]> {
	let builder = new AxeBuilder({ page }).withTags(AXE_TAGS);
	// Bei offenem modalem Overlay ist der Seiteninhalt inert; Seitenregeln gelten im geschlossenen Zustand (separat geprüft).
	if (modal) builder = builder.disableRules(['landmark-one-main', 'page-has-heading-one', 'region']);
	if (include) builder = builder.include(include);
	const results = await builder.analyze();
	return toFindings(results.violations);
}

/**
 * Wörter dürfen nicht per Auslassungszeichen gekürzt werden (text-overflow: ellipsis, line-clamp):
 * Abgeschnittene Inhalte sind für Screenreader-, Lupen- und Tastaturnutzende nicht sicher erreichbar
 * (WCAG 1.3.1, 1.4.4, 1.4.10, 1.4.12). Prüft alle sichtbaren Elemente inklusive Shadow DOM.
 */
export async function findTruncation(page: Page): Promise<Finding[]> {
	const hits = await page.evaluate(() => {
		const out: { target: string; html: string; reason: string }[] = [];
		const path = (el: Element): string => {
			const parts: string[] = [];
			let node: Element | null = el;
			while (node) {
				const id = node.id ? `#${node.id}` : '';
				const cls = typeof node.className === 'string' && node.className ? `.${node.className.trim().split(/\s+/).slice(0, 2).join('.')}` : '';
				parts.unshift(`${node.localName}${id}${cls}`);
				const parent: Node | null = node.parentNode;
				if (parent instanceof ShadowRoot) {
					parts.unshift('>>>');
					node = parent.host;
				} else node = node.parentElement;
				if (parts.length > 14) break;
			}
			return parts.join(' ').replace(/ >>> /g, ' >>> ');
		};
		const walk = (scope: Document | ShadowRoot) => {
			scope.querySelectorAll('*').forEach((el) => {
				const cs = getComputedStyle(el);
				const rect = el.getBoundingClientRect();
				const visible = cs.display !== 'none' && cs.visibility !== 'hidden' && (rect.width > 0 || rect.height > 0);
				if (visible) {
					const clamp = cs.getPropertyValue('-webkit-line-clamp');
					if (cs.textOverflow === 'ellipsis' && cs.overflowX !== 'visible' && el.textContent?.trim()) out.push({ target: path(el), html: el.outerHTML.slice(0, 200), reason: 'text-overflow: ellipsis' });
					else if (clamp && clamp !== 'none' && el.textContent?.trim()) out.push({ target: path(el), html: el.outerHTML.slice(0, 200), reason: `line-clamp: ${clamp}` });
				}
				if (el.shadowRoot) walk(el.shadowRoot);
			});
		};
		walk(document);
		// Auslassungszeichen in Texten und zugänglichen Namen (Codebeispiele ausgenommen).
		const ELLIPSIS = /…|\.\.\.(?!\w)/;
		const inCode = (node: Node) => {
			let n: Node | null = node;
			while (n) {
				if (n instanceof Element && (n.localName === 'pre' || n.localName === 'code' || n.localName === 'fink-code-block')) return true;
				n = n.parentNode instanceof ShadowRoot ? n.parentNode.host : n.parentNode;
			}
			return false;
		};
		const scanText = (scope: Document | ShadowRoot) => {
			const tw = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
			for (let n = tw.nextNode(); n; n = tw.nextNode()) {
				const text = n.textContent ?? '';
				const parent = n.parentElement;
				if (!parent || parent.localName === 'style' || parent.localName === 'script') continue;
				if (ELLIPSIS.test(text) && !inCode(n) && parent.getClientRects().length) out.push({ target: path(parent), html: text.trim().slice(0, 120), reason: 'Text mit Auslassungszeichen' });
			}
			scope.querySelectorAll('*').forEach((el) => {
				for (const attr of ['placeholder', 'aria-label', 'title', 'alt', 'aria-description']) {
					const value = el.getAttribute(attr);
					if (value && ELLIPSIS.test(value) && !inCode(el)) out.push({ target: path(el), html: `${attr}="${value.slice(0, 120)}"`, reason: `${attr} mit Auslassungszeichen` });
				}
				if (el.shadowRoot) scanText(el.shadowRoot);
			});
		};
		scanText(document);
		return out;
	});
	if (!hits.length) return [];
	return [
		{
			rule: 'fink-no-ellipsis-truncation',
			impact: 'serious',
			help: 'Text darf nicht mit Auslassungszeichen gekürzt werden (text-overflow: ellipsis / line-clamp).',
			targets: hits.map((h) => `${h.target} [${h.reason}]`),
			html: hits.map((h) => h.html),
		},
	];
}

/**
 * WCAG 1.4.10 Reflow / BITV 9.1.4.10: Bei 320 CSS-Pixeln Breite kein horizontales Scrollen der Seite.
 * Gemeldet werden die Elemente, die über den Viewport hinausragen.
 */
export async function findReflow(page: Page): Promise<Finding[]> {
	const hits = await page.evaluate(() => {
		const vw = document.documentElement.clientWidth;
		const scroll = document.documentElement.scrollWidth;
		if (scroll <= vw + 1) return [] as string[];
		const out: string[] = [];
		const inScroller = (el: Element) => {
			let n: Element | null = el.parentElement;
			while (n && n !== document.body) {
				const ox = getComputedStyle(n).overflowX;
				if (ox === 'auto' || ox === 'scroll' || ox === 'hidden' || ox === 'clip') return true;
				n = n.parentElement;
			}
			return false;
		};
		document.querySelectorAll('body *').forEach((el) => {
			const r = el.getBoundingClientRect();
			if (r.right > vw + 1 && r.width > 0 && !inScroller(el)) out.push(`${el.localName}${el.id ? '#' + el.id : ''}${typeof el.className === 'string' && el.className ? '.' + el.className.trim().split(/\s+/).join('.') : ''} (right=${Math.round(r.right)})`);
		});
		return [`scrollWidth ${scroll} > ${vw}`, ...out.slice(0, 15)];
	});
	if (!hits.length) return [];
	return [{ rule: 'fink-reflow-320', impact: 'serious', help: 'Bei 320 CSS-Pixeln Breite darf die Seite nicht horizontal scrollen (WCAG 1.4.10).', targets: hits, html: [] }];
}

/**
 * WCAG 2.4.11 Fokus nicht verdeckt (Minimum): Jedes per Tab erreichbare Element wird fokussiert (der Browser
 * scrollt es dabei in den sichtbaren Bereich); gemeldet wird, wenn es danach vollständig von anderen Inhalten
 * (z. B. angehefteter Kopfzeile, Cookie-Banner) überdeckt ist.
 */
export async function findObscuredFocus(page: Page): Promise<Finding[]> {
	const hits = await page.evaluate(() => {
		const out: string[] = [];
		const tabbables: HTMLElement[] = [];
		// inert wirkt im Flat Tree, also auch über Slots und Shadow-Grenzen hinweg.
		const isInert = (el: Element) => {
			for (let n: Node | null = el; n; ) {
				if (n instanceof Element && n.hasAttribute('inert')) return true;
				n = (n instanceof Element && n.assignedSlot) || (n instanceof ShadowRoot ? n.host : n.parentNode);
			}
			return false;
		};
		const walk = (scope: Document | ShadowRoot) => {
			scope.querySelectorAll<HTMLElement>('*').forEach((el) => {
				if (el.shadowRoot) walk(el.shadowRoot);
				if (el.tabIndex < 0 || (el as HTMLButtonElement).disabled || el.localName.includes('-')) return;
				const cs = getComputedStyle(el);
				if (cs.visibility === 'hidden' || !el.getClientRects().length || isInert(el)) return;
				tabbables.push(el);
			});
		};
		walk(document);
		const deepHit = (x: number, y: number) => {
			let hit: Element | null = document.elementFromPoint(x, y);
			while (hit?.shadowRoot) {
				const inner = hit.shadowRoot.elementFromPoint(x, y);
				if (!inner || inner === hit) break;
				hit = inner;
			}
			return hit;
		};
		const composedContains = (outer: Element, inner: Element | null) => {
			for (let n: Node | null = inner; n; n = n instanceof ShadowRoot ? n.host : n.parentNode) if (n === outer) return true;
			return false;
		};
		const describe = (el: Element) => `${el.localName}${el.id ? '#' + el.id : ''}${el.getAttribute('aria-label') ? `[aria-label="${el.getAttribute('aria-label')}"]` : ''} „${(el.textContent ?? '').trim().slice(0, 40)}“`;
		// Visuell versteckte Eingaben (z. B. Checkbox mit eigener Darstellung): Bezug ist der sichtbare Container.
		const visualOf = (el: Element): Element => {
			let n: Element | null = el;
			while (n) {
				const cs = getComputedStyle(n);
				const r = n.getBoundingClientRect();
				const hidden = r.width <= 2 || r.height <= 2 || cs.opacity === '0' || (cs.clipPath !== 'none' && cs.clipPath !== '') || cs.clip.startsWith('rect');
				if (!hidden) return n;
				const parent: Node | null = n.parentNode;
				n = parent instanceof ShadowRoot ? parent.host : (parent as Element | null);
			}
			return el;
		};
		for (const focusable of tabbables) {
			focusable.focus({ preventScroll: false });
			const el = visualOf(focusable);
			const r = el.getBoundingClientRect();
			if (r.width < 1 || r.height < 1) continue;
			const vw = document.documentElement.clientWidth;
			const vh = window.innerHeight;
			const points = [
				[r.left + r.width / 2, r.top + r.height / 2],
				[r.left + 2, r.top + 2],
				[r.right - 2, r.top + 2],
				[r.left + 2, r.bottom - 2],
				[r.right - 2, r.bottom - 2],
			].filter(([x, y]) => x >= 0 && y >= 0 && x < vw && y < vh);
			if (!points.length) continue; // außerhalb des Viewports, z. B. in eigenen Scrollbereichen
			const visible = points.some(([x, y]) => {
				const hit = deepHit(x, y);
				return hit === el || composedContains(el, hit) || (hit !== null && composedContains(hit, el));
			});
			if (!visible) {
				const cover = deepHit(points[0][0], points[0][1]);
				out.push(`${describe(el)} verdeckt von ${cover ? describe(cover) : '?'}`);
			}
		}
		(document.activeElement as HTMLElement | null)?.blur();
		window.scrollTo(0, 0);
		return out;
	});
	if (!hits.length) return [];
	return [{ rule: 'fink-focus-not-obscured', impact: 'serious', help: 'Fokussierte Elemente dürfen nicht vollständig verdeckt sein (WCAG 2.4.11).', targets: hits, html: [] }];
}

/** Rohe KoliBri-Übersetzungsschlüssel („kol-close“) als sichtbarer Text oder zugänglicher Name. */
export async function findRawTranslationKeys(page: Page): Promise<Finding[]> {
	const hits = await page.evaluate(() => {
		const KEY = /^kol-[a-z]+(-[a-z]+)+$/;
		// Tag-Namen (z. B. „kol-input-text“ in einer Tabelle) sind Inhalt, keine Übersetzungsschlüssel.
		const isKey = (value: string) => KEY.test(value) && !customElements.get(value);
		const out: string[] = [];
		// Nur Texte, die KoliBri selbst rendert (Shadow DOM der kol-*-Komponenten); Tag-Namen in der Doku sind gewollt.
		const walk = (scope: Document | ShadowRoot, inKolibri: boolean) => {
			scope.querySelectorAll('*').forEach((el) => {
				if (el.shadowRoot) walk(el.shadowRoot, el.localName.startsWith('kol-'));
				if (!inKolibri) return;
				for (const attr of ['aria-label', 'title', 'placeholder', 'alt', 'aria-description']) {
					const v = el.getAttribute(attr);
					if (v && isKey(v.trim())) out.push(`${el.localName}[${attr}="${v}"]`);
				}
				for (const node of el.childNodes) if (node.nodeType === Node.TEXT_NODE && isKey((node.textContent ?? '').trim())) out.push(`${el.localName}: ${node.textContent?.trim()}`);
			});
		};
		walk(document, false);
		return out;
	});
	if (!hits.length) return [];
	return [{ rule: 'fink-raw-translation-key', impact: 'serious', help: 'Texte und zugängliche Namen dürfen keine unübersetzten Schlüssel sein (WCAG 2.4.6, 4.1.2).', targets: hits, html: [] }];
}

/**
 * WCAG 1.4.12 Textabstand / BITV 9.1.4.12: Zeilenhöhe 1,5, Absatzabstand 2em, Zeichenabstand 0,12em und
 * Wortabstand 0,16em dürfen keinen Inhalt abschneiden. Setzt die Werte im Dokument und in allen Shadow Roots und
 * meldet Elemente mit eigenem Text, die danach in einem nicht scrollbaren Bereich überlaufen.
 */
export async function findTextSpacingClipping(page: Page): Promise<Finding[]> {
	await page.evaluate(() => {
		const css = `*, *::before, *::after { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-block-end: 2em !important; }`;
		const sheet = new CSSStyleSheet();
		sheet.replaceSync(css);
		const apply = (scope: Document | ShadowRoot) => {
			scope.adoptedStyleSheets = [...scope.adoptedStyleSheets, sheet];
			scope.querySelectorAll('*').forEach((el) => el.shadowRoot && apply(el.shadowRoot));
		};
		apply(document);
	});
	await page.waitForTimeout(300);
	const hits = await page.evaluate(() => {
		const out: string[] = [];
		const ownText = (el: Element) => [...el.childNodes].some((n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? '').trim().length > 0);
		const walk = (scope: Document | ShadowRoot) => {
			scope.querySelectorAll('*').forEach((el) => {
				if (el.shadowRoot) walk(el.shadowRoot);
				if (!(el instanceof HTMLElement) || !ownText(el) || ['input', 'textarea', 'select', 'option', 'script', 'style', 'pre', 'code'].includes(el.localName)) return;
				const cs = getComputedStyle(el);
				if (cs.display === 'none' || cs.visibility === 'hidden' || !el.getClientRects().length) return;
				const clipsX = cs.overflowX === 'hidden' || cs.overflowX === 'clip';
				const clipsY = cs.overflowY === 'hidden' || cs.overflowY === 'clip';
				// Visuell versteckte Texte (sr-only) sind gewollt abgeschnitten.
				if (el.clientWidth <= 1 || el.clientHeight <= 1 || cs.clip.startsWith('rect') || (cs.clipPath !== 'none' && cs.clipPath !== '')) return;
				const overX = clipsX && el.scrollWidth > el.clientWidth + 2;
				const overY = clipsY && el.scrollHeight > el.clientHeight + 2;
				if (overX || overY) out.push(`${el.localName}${el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''} „${(el.textContent ?? '').trim().slice(0, 50)}“ (${overX ? `Breite ${el.scrollWidth}>${el.clientWidth}` : ''}${overY ? ` Höhe ${el.scrollHeight}>${el.clientHeight}` : ''})`);
			});
		};
		walk(document);
		return out;
	});
	if (!hits.length) return [];
	return [{ rule: 'fink-text-spacing', impact: 'serious', help: 'Mit erhöhten Textabständen darf kein Inhalt abgeschnitten werden (WCAG 1.4.12).', targets: hits, html: [] }];
}

/** Alle Fink-Zusatzprüfungen zu axe-core. */
export async function runFinkChecks(page: Page, { reflow = false, focus = true } = {}): Promise<Finding[]> {
	const findings = [...(await findTruncation(page)), ...(await findRawTranslationKeys(page))];
	if (reflow) findings.push(...(await findReflow(page)));
	if (focus) findings.push(...(await findObscuredFocus(page)));
	return findings;
}

export function formatFindings(findings: Finding[]): string {
	return findings
		.map((f) => `• [${f.impact ?? '-'}] ${f.rule}: ${f.help}\n${f.targets.map((t, i) => `    - ${t}${f.summary?.[i] ? `\n      ${f.summary[i].replace(/\n/g, '\n      ')}` : ''}`).join('\n')}`)
		.join('\n');
}

export async function attach(testInfo: TestInfo, findings: Finding[]) {
	if (!findings.length) return;
	const body = JSON.stringify(findings, null, 2);
	await testInfo.attach('a11y-findings.json', { body, contentType: 'application/json' });
	// Optional alle Funde gesammelt ablegen, z. B. für eine Auswertung über alle Routen.
	const dir = process.env.A11Y_REPORT_DIR;
	if (dir) {
		const { mkdirSync, writeFileSync } = await import('node:fs');
		mkdirSync(dir, { recursive: true });
		const name = `${testInfo.project.name}${testInfo.title.replace(/^a11y /, '_').replace(/[^\w-]+/g, '_')}.json`;
		writeFileSync(`${dir}/${name}`, JSON.stringify({ project: testInfo.project.name, title: testInfo.title, findings }, null, 2));
	}
}
