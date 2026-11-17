/**
 * Misst die drei Varianten: eigener Code (Logik und Gestaltung getrennt), beim Seitenaufruf geladene
 * Datenmenge und Testergebnisse. Schreibt results/ergebnis.json und ERGEBNIS.md.
 * Voraussetzung: `pnpm spike:build` und `pnpm spike:test` sind gelaufen.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const repo = resolve(root, '../..');
const fink = (p) => resolve(repo, 'packages/components/src', p);
const own = (p) => resolve(root, 'src', p);

/** Was jede Variante selbst schreiben musste. Bei KoliBri sind das die Fink-Quellen beider Komponenten. */
const VARIANTS = {
	kolibri: {
		name: 'KoliBri',
		files: [
			fink('components/tag-input/tag-input.tsx'),
			fink('components/tag-input/tag-input.css'),
			fink('components/chip/chip.tsx'),
			fink('components/chip/chip.css'),
			fink('components/file-upload/file-upload.tsx'),
			fink('components/file-upload/file-upload.css'),
			fink('utils/resolve-color.ts'),
			fink('utils/shared.ts'),
		],
		locales: ['tagInput', 'fileUpload', 'chip'],
	},
	'react-aria': {
		name: 'React Aria',
		files: [own('react-aria/TagInput.tsx'), own('react-aria/FileUpload.tsx'), own('react-aria/styles.css'), own('shared/texts.ts')],
	},
	lion: {
		name: 'Lion',
		files: [own('lion/tag-input.ts'), own('lion/file-upload.ts'), own('lion/styles.css'), own('shared/texts.ts')],
	},
};

/** Zählt Zeilen ohne Leerzeilen und reine Kommentarzeilen, getrennt nach Logik und Gestaltung (CSS, auch css`…` in TS). */
function count(file) {
	const text = readFileSync(file, 'utf8');
	let logic = 0;
	let style = 0;
	let inCss = file.endsWith('.css');
	let inComment = false;
	for (const raw of text.split('\n')) {
		const line = raw.trim();
		const opensCss = /css`\s*$/.test(line) || /static styles = css`/.test(line);
		if (inComment) {
			if (line.includes('*/')) inComment = false;
			continue;
		}
		if (line.startsWith('/*') && !line.includes('*/')) {
			inComment = true;
			continue;
		}
		if (!line || line.startsWith('//') || (line.startsWith('/*') && line.endsWith('*/')) || line.startsWith('*')) continue;
		if (inCss) style++;
		else logic++;
		if (!file.endsWith('.css')) {
			if (opensCss) inCss = true;
			else if (inCss && line.startsWith('`')) inCss = false;
		}
	}
	return { logic, style };
}

/** Deutsche Fink-Texte der beteiligten Komponenten (nur die Ausgangssprache, wie bei den anderen Varianten). */
function countLocales(keys) {
	const text = readFileSync(fink('i18n/locales.ts'), 'utf8');
	const de = text.slice(text.indexOf('export const de'), text.indexOf('export const en'));
	let lines = 0;
	for (const key of keys) {
		const start = de.indexOf(`\t${key}: {`);
		if (start < 0) continue;
		const firstLine = de.slice(start, de.indexOf('\n', start));
		if (firstLine.includes('}')) lines += 1;
		else lines += de.slice(start, de.indexOf('\n\t}', start) + 3).split('\n').filter((l) => l.trim()).length;
	}
	return lines;
}

function code() {
	const out = {};
	for (const [id, v] of Object.entries(VARIANTS)) {
		const totals = { logic: 0, style: 0, files: [] };
		for (const file of v.files) {
			const c = count(file);
			totals.logic += c.logic;
			totals.style += c.style;
			totals.files.push({ file: file.replace(`${repo}/`, ''), ...c });
		}
		if (v.locales) {
			const l = countLocales(v.locales);
			totals.logic += l;
			totals.files.push({ file: 'packages/components/src/i18n/locales.ts (deutsche Texte)', logic: l, style: 0 });
		}
		out[id] = { name: v.name, ...totals, total: totals.logic + totals.style };
	}
	return out;
}

async function loaded() {
	const server = spawn('pnpm', ['exec', 'vite', 'preview', '--port', '4318', '--strictPort'], { cwd: root, stdio: 'ignore' });
	await new Promise((r) => setTimeout(r, 2500));
	const browser = await chromium.launch();
	const out = {};
	try {
		for (const id of Object.keys(VARIANTS)) {
			const page = await browser.newPage();
			const bodies = [];
			page.on('response', async (response) => {
				const type = response.request().resourceType();
				if (['script', 'stylesheet', 'font'].includes(type)) {
					try {
						bodies.push({ type, body: await response.body() });
					} catch {
						/* Antwort ohne Inhalt */
					}
				}
			});
			await page.goto(`http://localhost:4318/${id}.html`, { waitUntil: 'networkidle' });
			await page.waitForTimeout(500);
			const sum = (filter) => bodies.filter(filter).reduce((n, b) => n + b.body.length, 0);
			const gz = (filter) => bodies.filter(filter).reduce((n, b) => n + gzipSync(b.body).length, 0);
			out[id] = {
				requests: bodies.length,
				scriptBytes: sum((b) => b.type === 'script'),
				scriptGzip: gz((b) => b.type === 'script'),
				styleAndFontBytes: sum((b) => b.type !== 'script'),
				totalGzip: gz(() => true),
			};
			await page.close();
		}
	} finally {
		await browser.close();
		server.kill();
	}
	return out;
}

function tests() {
	const file = resolve(root, 'results/playwright.json');
	if (!existsSync(file)) return {};
	const report = JSON.parse(readFileSync(file, 'utf8'));
	const out = {};
	const walk = (suite, variant) => {
		const v = suite.title && !suite.title.endsWith('.ts') ? suite.title : variant;
		for (const s of suite.suites ?? []) walk(s, v);
		for (const spec of suite.specs ?? []) {
			for (const t of spec.tests) {
				const status = t.results.at(-1)?.status ?? 'skipped';
				const note = t.annotations?.find((a) => a.type === 'fixme')?.description;
				(out[v] ??= []).push({ test: spec.title, status: status === 'skipped' ? 'nicht simulierbar' : status === 'passed' ? 'bestanden' : 'fehlgeschlagen', note });
			}
		}
	};
	for (const s of report.suites) walk(s, '');
	return out;
}

const kb = (n) => `${(n / 1024).toLocaleString('de-DE', { maximumFractionDigits: 0 })} KB`;

const result = { stand: new Date().toISOString().slice(0, 10), code: code(), loaded: await loaded(), tests: tests() };
mkdirSync(resolve(root, 'results'), { recursive: true });
writeFileSync(resolve(root, 'results/ergebnis.json'), `${JSON.stringify(result, null, '\t')}\n`);

const ids = Object.keys(VARIANTS);
const names = ids.map((id) => VARIANTS[id].name);
const testNames = result.tests[names[0]]?.map((t) => t.test) ?? [];
const md = [
	'# Ergebnis des Basisvergleichs',
	'',
	`Stand ${result.stand}. Erzeugt mit \`pnpm spike\`, nicht von Hand bearbeiten.`,
	'',
	'## Eigener Code je Variante',
	'',
	'Zeilen ohne Leerzeilen und Kommentare. Bei KoliBri sind es die Fink-Quellen beider Komponenten samt `fink-chip`, Hilfsfunktionen und deutschen Texten.',
	'',
	`| | ${names.join(' | ')} |`,
	`| --- | ${names.map(() => '---:').join(' | ')} |`,
	`| Logik und Texte | ${ids.map((id) => result.code[id].logic).join(' | ')} |`,
	`| Gestaltung (CSS) | ${ids.map((id) => result.code[id].style).join(' | ')} |`,
	`| **Summe** | ${ids.map((id) => `**${result.code[id].total}**`).join(' | ')} |`,
	'',
	'## Beim Seitenaufruf geladen',
	'',
	'Skripte, Stylesheets und Schriften der Prüfseite mit beiden Komponenten.',
	'',
	`| | ${names.join(' | ')} |`,
	`| --- | ${names.map(() => '---:').join(' | ')} |`,
	`| Anfragen | ${ids.map((id) => result.loaded[id].requests).join(' | ')} |`,
	`| Skripte, unkomprimiert | ${ids.map((id) => kb(result.loaded[id].scriptBytes)).join(' | ')} |`,
	`| Skripte, gzip | ${ids.map((id) => kb(result.loaded[id].scriptGzip)).join(' | ')} |`,
	`| Stylesheets und Schriften | ${ids.map((id) => kb(result.loaded[id].styleAndFontBytes)).join(' | ')} |`,
	`| Gesamt, gzip | ${ids.map((id) => kb(result.loaded[id].totalGzip)).join(' | ')} |`,
	'',
	'## Prüfungen',
	'',
	`| Prüfung | ${names.join(' | ')} |`,
	`| --- | ${names.map(() => '---').join(' | ')} |`,
	...testNames.map((t) => `| ${t} | ${names.map((n) => result.tests[n]?.find((x) => x.test === t)?.status ?? '–').join(' | ')} |`),
	'',
	...Object.entries(result.tests).flatMap(([n, list]) => list.filter((t) => t.note).map((t) => `- ${n}, „${t.test}“: ${t.note}`)),
	'',
].join('\n');
writeFileSync(resolve(root, 'ERGEBNIS.md'), md);
console.log(md);
