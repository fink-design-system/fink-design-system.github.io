/**
 * Zerlegt die beim Seitenaufruf geladenen Skripte jeder Variante per Source Map nach Herkunft
 * (KoliBri-Kern, einzelne KoliBri-Komponenten, Theme, Fink-Komponenten, React, …) und das KoliBri-Theme
 * je Komponente. Schreibt results/sourcemap.json und SOURCEMAP.md.
 * Voraussetzung: Build mit SOURCEMAP=1 (`pnpm spike:sourcemap` erledigt alles).
 */
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { spawn } from 'node:child_process';
import { chromium } from '@playwright/test';
import { SourceMapConsumer } from 'source-map';
import { pruneCss } from './kolibri-icon-prune.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repo = resolve(root, '../..');
const gz = (text) => gzipSync(text).length;
const kb = (n) => (n / 1024).toLocaleString('de-DE', { maximumFractionDigits: n < 10240 ? 1 : 0 });

const VARIANTS = [
	{ id: 'kolibri', name: 'KoliBri (Fink heute)', dist: 'dist', page: 'kolibri', port: 4321 },
	{ id: 'kolibri-schlank', name: 'KoliBri schlank', dist: 'dist-slim', page: 'kolibri', port: 4322 },
	{ id: 'kolibri-lazy', name: 'KoliBri schlank + lazy markdown', dist: 'dist-lazy', page: 'kolibri', port: 4323 },
	{ id: 'react-aria', name: 'React Aria', dist: 'dist', page: 'react-aria', port: 4321 },
	{ id: 'lion', name: 'Lion', dist: 'dist', page: 'lion', port: 4321 },
];

/** Ordnet eine Quelldatei einer Gruppe und einem Eintrag zu. */
function classify(source) {
	const s = source.replace(/\\/g, '/');
	if (s.includes('kolibri-markdown')) return ['KoliBri markdown (lazy)', 'markdown-it, entities, linkify-it, punycode, mdurl, uc.micro'];
	const last = s.lastIndexOf('node_modules/');
	const pkg = last < 0 ? null : s.slice(last + 13).match(/^((?:@[^/]+\/)?[^/]+)\/(.*)$/);
	const name = pkg?.[1] ?? '';
	const rest = pkg?.[2] ?? s;
	if (name === '@public-ui/theme-default') return ['KoliBri theme', 'theme-default'];
	if (name === '@public-ui/components') {
		const comp = rest.match(/(?:components\/|\/)(kol-[a-z-]+|[a-z-]+)(?:\.entry)?\.js$/);
		const entry = rest.match(/(kol-[a-z-]+)\.entry/) ?? rest.match(/collection\/components\/([a-z-]+)\//);
		if (entry) return ['KoliBri components', entry[1].startsWith('kol-') ? entry[1] : `kol-${entry[1]}`];
		return ['KoliBri core', comp ? comp[1] : rest.split('/').pop()];
	}
	if (name.startsWith('@public-ui/') || name.startsWith('@stencil/')) return ['KoliBri core', name];
	if (name === '@fink/components' || s.includes('packages/components/')) {
		const comp = s.match(/fink-([a-z-]+)\.js$/) ?? s.match(/components\/([a-z-]+)\/[^/]+$/);
		return comp ? ['Fink components', `fink-${comp[1]}`] : ['Fink core', s.split('/').pop()];
	}
	if (name === '@fink/react' || s.includes('packages/react/')) return ['Fink React layer', s.split('/').pop()];
	if (name === '@fink/theme' || s.includes('packages/theme/')) return ['Fink theme', s.split('/').pop()];
	if (name === '@fink/tokens' || s.includes('packages/tokens/')) return ['Fink tokens', s.split('/').pop()];
	if (['react', 'react-dom', 'scheduler'].includes(name)) return ['React', name];
	if (/^(react-aria|react-aria-components|react-stately|@react-aria\/|@react-stately\/|@react-types\/|@internationalized\/|@swc\/helpers|clsx|use-sync-external-store)/.test(name)) {
		return ['React Aria library', name];
	}
	if (name === '@lion/ui') {
		const comp = rest.match(/components\/([a-z-]+)\//);
		return ['Lion library', comp ? comp[1] : rest.split('/')[0]];
	}
	if (/^(lit|lit-html|lit-element|@lit\/)/.test(name)) return ['Lit', name];
	if (/^(@open-wc\/|@popperjs\/|singleton-manager|@bundled-es-modules\/|autosize|ibantools)/.test(name)) return ['Lion dependencies', name];
	if (/i18next/.test(name)) return ['i18next', name];
	if (s.includes('experiments/basis-vergleich/src/') || s.startsWith('../../src/') || /^\.?\.?\/?src\//.test(s)) return ['variant code', s.split('/').slice(-2).join('/')];
	if (s.includes('vite/') || s.includes('commonjsHelpers') || s.startsWith('\0') || s.includes('preload-helper')) return ['Vite runtime', s.split('/').pop()];
	return ['other', name || s.split('/').slice(-2).join('/')];
}

/** Bytes je Quelle eines gebauten Skripts, über alle Zuordnungen der Source Map. */
async function attribute(file) {
	const code = readFileSync(file, 'utf8');
	const mapFile = `${file}.map`;
	const result = new Map();
	const add = (source, bytes) => result.set(source, (result.get(source) ?? 0) + bytes);
	if (!existsSync(mapFile)) {
		add('[no source map]', Buffer.byteLength(code));
		return { code, result };
	}
	const lines = code.split('\n');
	const byLine = lines.map(() => []);
	await SourceMapConsumer.with(JSON.parse(readFileSync(mapFile, 'utf8')), null, (consumer) => {
		consumer.eachMapping((m) => byLine[m.generatedLine - 1]?.push([m.generatedColumn, m.source ?? '[unmapped]']));
	});
	lines.forEach((line, i) => {
		const segs = byLine[i].sort((a, b) => a[0] - b[0]);
		if (!segs.length) return add('[unmapped]', Buffer.byteLength(line) + 1);
		if (segs[0][0] > 0) add('[unmapped]', Buffer.byteLength(line.slice(0, segs[0][0])));
		segs.forEach(([col, source], j) => add(source, Buffer.byteLength(line.slice(col, j + 1 < segs.length ? segs[j + 1][0] : line.length)) + (j + 1 === segs.length ? 1 : 0)));
	});
	return { code, result };
}

async function loadedScripts(browser, v) {
	const page = await browser.newPage();
	const urls = new Set();
	page.on('response', (r) => r.request().resourceType() === 'script' && urls.add(new URL(r.url()).pathname));
	await page.goto(`http://localhost:${v.port}/${v.page}.html`, { waitUntil: 'networkidle' });
	await page.evaluate(() => document.fonts.ready);
	await page.waitForTimeout(1500);
	await page.close();
	return [...urls];
}

async function analyse() {
	const servers = [
		spawn('pnpm', ['exec', 'vite', 'preview', '--port', '4321', '--strictPort'], { cwd: root, stdio: 'ignore' }),
		spawn('pnpm', ['exec', 'vite', 'preview', '--port', '4322', '--strictPort', '--outDir', 'dist-slim'], { cwd: root, stdio: 'ignore' }),
		spawn('pnpm', ['exec', 'vite', 'preview', '--port', '4323', '--strictPort', '--outDir', 'dist-lazy'], { cwd: root, stdio: 'ignore' }),
	];
	await new Promise((r) => setTimeout(r, 3000));
	const browser = await chromium.launch();
	const out = {};
	try {
		for (const v of VARIANTS) {
			const groups = {};
			for (const path of await loadedScripts(browser, v)) {
				const attributed = await attribute(join(root, v.dist, path));
				const { code } = attributed;
				// Der nachgeladene Markdown-Chunk ist ein virtuelles Modul ohne Source Map: Zuordnung über den Dateinamen.
				const result = path.includes('_kolibri-markdown') ? new Map([['kolibri-markdown', Buffer.byteLength(code)]]) : attributed.result;
				const total = Buffer.byteLength(code);
				const zipped = gz(code);
				for (const [source, bytes] of result) {
					const [group, item] = classify(source);
					const g = (groups[group] ??= { bytes: 0, gzip: 0, items: {} });
					const share = (bytes / total) * zipped;
					g.bytes += bytes;
					g.gzip += share;
					const it = (g.items[item] ??= { bytes: 0, gzip: 0 });
					it.bytes += bytes;
					it.gzip += share;
				}
			}
			out[v.id] = { name: v.name, groups };
		}
	} finally {
		await browser.close();
		servers.forEach((s) => s.kill());
	}
	return out;
}

/** Theme je KoliBri-Komponente: gesamt, davon Icon-CSS, eigentliche Gestaltung, nach Kürzung. */
function themeByComponent() {
	const require = createRequire(join(root, 'package.json'));
	const themeFile = join(dirname(require.resolve('@public-ui/theme-default')), 'index.mjs');
	const code = readFileSync(themeFile, 'utf8');
	const keep = new Set();
	const dir = join(repo, 'packages/components/src/components');
	for (const entry of readdirSync(dir, { recursive: true, encoding: 'utf8' })) {
		if (entry.endsWith('.tsx')) for (const m of readFileSync(join(dir, entry), 'utf8').matchAll(/codicon-([a-z0-9-]+)/g)) keep.add(m[1]);
	}
	const names = {};
	for (const m of code.matchAll(/'(KOL-[A-Z-]+)': (css_248z\$?\w*)/g)) (names[m[2]] ??= []).push(m[1].toLowerCase());
	const rows = [];
	for (const m of code.matchAll(/^var (css_248z\$?\w*) = (".*");$/gm)) {
		const css = JSON.parse(m[2]);
		const noIcons = pruneCss(css, new Set()).replace(/\.codicon[^{}]*\{[^}]*\}|\.kolicon[^{}]*\{[^}]*\}/g, '');
		const pruned = pruneCss(css, keep);
		rows.push({
			components: names[m[1]] ?? ['(shared)'],
			total: Buffer.byteLength(css),
			icons: Buffer.byteLength(css) - Buffer.byteLength(noIcons),
			styling: Buffer.byteLength(noIcons),
			stylingGzip: gz(noIcons),
			pruned: Buffer.byteLength(pruned),
			prunedGzip: gz(pruned),
		});
	}
	return rows.sort((a, b) => b.total - a.total);
}

const loaded = await analyse();
const theme = themeByComponent();
mkdirSync(join(root, 'results'), { recursive: true });
writeFileSync(join(root, 'results/sourcemap.json'), `${JSON.stringify({ stand: new Date().toISOString().slice(0, 10), loaded, theme }, null, '\t')}\n`);

const md = ['# Woher die Größe kommt', '', `Stand ${new Date().toISOString().slice(0, 10)}. Erzeugt mit \`pnpm spike:sourcemap\`, nicht von Hand bearbeiten.`, ''];
md.push('Beim Seitenaufruf geladene Skripte, per Source Map ihrer Herkunft zugeordnet. Minifiziert in KB. „gzip“ ist der Anteil an der gzip-Größe des jeweiligen Chunks.', '');
md.push('## Übersicht', '');
const allGroups = [...new Set(Object.values(loaded).flatMap((v) => Object.keys(v.groups)))].sort((a, b) => Math.max(...Object.values(loaded).map((v) => v.groups[b]?.gzip ?? 0)) - Math.max(...Object.values(loaded).map((v) => v.groups[a]?.gzip ?? 0)));
md.push(`| Herkunft | ${VARIANTS.map((v) => `${v.name} (gzip)`).join(' | ')} |`, `| --- | ${VARIANTS.map(() => '---:').join(' | ')} |`);
for (const g of allGroups) md.push(`| ${g} | ${VARIANTS.map((v) => (loaded[v.id].groups[g] ? kb(loaded[v.id].groups[g].gzip) : '–')).join(' | ')} |`);
md.push(`| **Summe** | ${VARIANTS.map((v) => `**${kb(Object.values(loaded[v.id].groups).reduce((n, g) => n + g.gzip, 0))}**`).join(' | ')} |`, '');
for (const v of VARIANTS) {
	md.push(`## ${v.name}: Einträge je Herkunft`, '');
	for (const [g, data] of Object.entries(loaded[v.id].groups).sort((a, b) => b[1].gzip - a[1].gzip)) {
		const items = Object.entries(data.items).sort((a, b) => b[1].gzip - a[1].gzip);
		md.push(`- **${g}**: ${kb(data.bytes)} KB minifiziert, ${kb(data.gzip)} KB gzip. ${items.slice(0, 12).map(([n, d]) => `${n} ${kb(d.gzip)}`).join(', ')}${items.length > 12 ? `, … (${items.length} Einträge)` : ''}`);
	}
	md.push('');
}
md.push('## KoliBri-Theme je Komponente', '', 'Unkomprimiert in KB. „icons“ ist mitgeliefertes Icon-CSS (Font Awesome, Codicons, Kolicons, @font-face), „styles“ der Rest.', '');
md.push('| Komponente | Gesamt | davon icons | styles | styles gzip | nach Kürzung | nach Kürzung gzip |', '| --- | ---: | ---: | ---: | ---: | ---: | ---: |');
for (const r of theme) md.push(`| ${r.components.join(', ')} | ${kb(r.total)} | ${kb(r.icons)} | ${kb(r.styling)} | ${kb(r.stylingGzip)} | ${kb(r.pruned)} | ${kb(r.prunedGzip)} |`);
const sum = (k) => theme.reduce((n, r) => n + r[k], 0);
md.push(`| **Summe** | **${kb(sum('total'))}** | **${kb(sum('icons'))}** | **${kb(sum('styling'))}** | **${kb(sum('stylingGzip'))}** | **${kb(sum('pruned'))}** | **${kb(sum('prunedGzip'))}** |`, '');
writeFileSync(join(root, 'SOURCEMAP.md'), md.join('\n'));
console.log(md.join('\n'));
