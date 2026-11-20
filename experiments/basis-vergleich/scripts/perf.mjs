/**
 * Renderzeit, Stilberechnung und JS-Speicher mit vielen KoliBri-Komponenten auf einer Seite.
 * Fragen: Wie unterscheiden sich KoliBri 4.5, 4.6 und 4.7? Was kostet es, dass das Icon-CSS seit 4.6.0 in GLOBAL liegt?
 * Voraussetzung: `pnpm spike:build`. Schreibt results/perf.json und PERF.md.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RUNS = 7;
const PER_TYPE = 150;

const VARIANTS = [
	{ id: 'kolibri-4.5', name: 'KoliBri 4.5.0', dist: 'dist-4.5', port: 4335 },
	{ id: 'kolibri-4.6', name: 'KoliBri 4.6.0', dist: 'dist-4.6', port: 4336 },
	{ id: 'kolibri', name: 'KoliBri 4.7.0-rc.0', dist: 'dist', port: 4331 },
	{ id: 'kolibri-schlank', name: 'KoliBri 4.7.0-rc.0, nur genutzte Icons', dist: 'dist-slim', port: 4333 },
];

/** Komponenten ohne Icon-CSS im Default-Theme und Komponenten mit Icon-CSS. */
const WITHOUT_ICONS = [
	['kol-heading', { _label: 'Antrag auf Förderung', _level: '2' }],
	['kol-progress', { _label: 'Fortschritt', _value: '3', _max: '5' }],
	['kol-quote', { _label: 'Quelle', _quote: 'Barrierefreiheit ist kein Zusatz.', _href: '#' }],
];
const WITH_ICONS = [
	['kol-button', { _label: 'Speichern' }],
	['kol-badge', { _label: 'Neu' }],
	['kol-input-text', { _label: 'Name' }],
];

const SCENARIOS = [
	{ id: 'ohne', name: 'Nur Komponenten ohne Icons', types: WITHOUT_ICONS },
	{ id: 'gemischt', name: 'Gemischt, mit und ohne Icons', types: [...WITHOUT_ICONS, ...WITH_ICONS] },
];

const median = (list) => {
	const s = [...list].sort((a, b) => a - b);
	return s[Math.floor(s.length / 2)];
};

async function run(browser, v, scenario) {
	const page = await browser.newPage();
	const cdp = await page.context().newCDPSession(page);
	await cdp.send('Performance.enable');
	await page.goto(`http://localhost:${v.port}/kolibri-perf.html`, { waitUntil: 'networkidle' });
	await page.evaluate(() => window.kolibriReady);
	await cdp.send('HeapProfiler.collectGarbage');
	const metric = async () => Object.fromEntries((await cdp.send('Performance.getMetrics')).metrics.map((m) => [m.name, m.value]));
	const before = await metric();
	const ms = await page.evaluate(
		async ({ types, perType }) => {
			const stage = document.getElementById('stage');
			const fragment = document.createDocumentFragment();
			const all = [];
			for (const [tag, attrs] of types) {
				for (let i = 0; i < perType; i++) {
					const el = document.createElement(tag);
					for (const [k, val] of Object.entries(attrs)) el.setAttribute(k, val);
					fragment.appendChild(el);
					all.push(el);
				}
			}
			const t0 = performance.now();
			stage.appendChild(fragment);
			await new Promise((done) => {
				const check = () => (all.every((el) => el.classList.contains('hydrated')) ? done() : requestAnimationFrame(check));
				check();
			});
			await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
			document.body.getBoundingClientRect();
			return performance.now() - t0;
		},
		{ types: scenario.types, perType: PER_TYPE },
	);
	await cdp.send('HeapProfiler.collectGarbage');
	const after = await metric();
	await page.close();
	return {
		ms,
		recalcStyleMs: (after.RecalcStyleDuration - before.RecalcStyleDuration) * 1000,
		layoutMs: (after.LayoutDuration - before.LayoutDuration) * 1000,
		heapMb: after.JSHeapUsedSize / 1024 / 1024,
	};
}

const servers = VARIANTS.map((v) => spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(v.port), '--strictPort', '--outDir', v.dist], { cwd: root, stdio: 'ignore' }));
await new Promise((r) => setTimeout(r, 3000));
const browser = await chromium.launch();
const results = {};
try {
	for (const scenario of SCENARIOS) {
		results[scenario.id] = {};
		for (const v of VARIANTS) {
			const runs = [];
			for (let i = 0; i < RUNS; i++) runs.push(await run(browser, v, scenario));
			results[scenario.id][v.id] = {
				ms: median(runs.map((r) => r.ms)),
				recalcStyleMs: median(runs.map((r) => r.recalcStyleMs)),
				layoutMs: median(runs.map((r) => r.layoutMs)),
				heapMb: median(runs.map((r) => r.heapMb)),
			};
		}
	}
} finally {
	await browser.close();
	servers.forEach((s) => s.kill());
}

mkdirSync(resolve(root, 'results'), { recursive: true });
writeFileSync(resolve(root, 'results/perf.json'), `${JSON.stringify({ stand: new Date().toISOString().slice(0, 10), runs: RUNS, perType: PER_TYPE, results }, null, '\t')}\n`);
const f = (n, d = 0) => n.toLocaleString('de-DE', { maximumFractionDigits: d, minimumFractionDigits: d });
const md = [
	'# Renderzeit mit vielen Komponenten',
	'',
	`Stand ${new Date().toISOString().slice(0, 10)}. Erzeugt mit \`pnpm spike:perf\`, nicht von Hand bearbeiten.`,
	'',
	`Je Komponententyp ${PER_TYPE} Elemente, Median aus ${RUNS} Läufen, Chromium ohne Drosselung. „Rendern“ ist die Zeit vom Einfügen bis alle Elemente fertig gezeichnet sind. „Stilberechnung“ und „Layout“ stammen aus dem Chrome-DevTools-Protokoll. „JS-Speicher“ ist der belegte JavaScript-Heap nach dem Rendern; darin liegen auch die CSS-Strings des Themes.`,
	'',
];
for (const scenario of SCENARIOS) {
	const count = scenario.types.length * PER_TYPE;
	md.push(`## ${scenario.name} (${count} Elemente: ${scenario.types.map((t) => t[0]).join(', ')})`, '');
	md.push(`| | ${VARIANTS.map((v) => v.name).join(' | ')} |`, `| --- | ${VARIANTS.map(() => '---:').join(' | ')} |`);
	md.push(`| Rendern | ${VARIANTS.map((v) => `${f(results[scenario.id][v.id].ms)} ms`).join(' | ')} |`);
	md.push(`| Stilberechnung | ${VARIANTS.map((v) => `${f(results[scenario.id][v.id].recalcStyleMs)} ms`).join(' | ')} |`);
	md.push(`| Layout | ${VARIANTS.map((v) => `${f(results[scenario.id][v.id].layoutMs)} ms`).join(' | ')} |`);
	md.push(`| JS-Speicher | ${VARIANTS.map((v) => `${f(results[scenario.id][v.id].heapMb, 1)} MB`).join(' | ')} |`, '');
}
writeFileSync(resolve(root, 'PERF.md'), md.join('\n'));
console.log(md.join('\n'));
