// Ausarbeitung „04 Silhouette“:  node build-ausarbeitung.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const finalDir = join(here, 'final');

const svg = (name, cls = '', attrs = '') =>
	readFileSync(join(finalDir, name), 'utf8').replace('<svg ', `<svg class="${cls}" ${attrs} aria-hidden="true" focusable="false" `);

const colors = [
	['Primär auf hell', svg('fink-mark-primary.svg'), '#ffffff', '#e3e1f0'],
	['Dark-Variante', svg('fink-mark-dark.svg'), '#121120', null],
	['Mono (Tinte)', svg('fink-mark-mono.svg'), '#ffffff', '#e3e1f0'],
];

const rows = colors
	.map(
		([label, markup, bg]) => `
	<div class="cell" style="background:${bg}">
		${markup.replace('<svg ', '<svg width="96" height="96" ')}
		${markup.replace('<svg ', '<svg width="48" height="48" ')}
		${markup.replace('<svg ', '<svg width="24" height="24" ')}
		${markup.replace('<svg ', '<svg width="16" height="16" ')}
		<span class="lbl">${label}</span>
	</div>`,
	)
	.join('\n');

const tiles = `
	<div class="cell" style="background:#ffffff">
		${svg('fink-app-icon.svg', '', 'width="128" height="128"')}
		${svg('fink-app-icon.svg', '', 'width="64" height="64"')}
		${svg('fink-app-icon.svg', '', 'width="48" height="48"')}
		${svg('favicon.svg', '', 'width="32" height="32"')}
		${svg('favicon.svg', '', 'width="16" height="16"')}
		<span class="lbl">App-Icon / Favicon</span>
	</div>
	<div class="cell" style="background:#121120">
		${svg('fink-app-icon.svg', '', 'width="128" height="128"')}
		<span class="lbl">App-Icon auf dunkler Fläche</span>
	</div>`;

const lockups = `
	<div class="cell col" style="background:#ffffff">
		<img src="final/fink-lockup.svg" width="234" height="72" alt="">
		<img src="final/fink-lockup.svg" width="156" height="48" alt="">
		<span class="lbl">Koppel hell</span>
	</div>
	<div class="cell col" style="background:#121120">
		<img src="final/fink-lockup-dark.svg" width="234" height="72" alt="">
		<img src="final/fink-lockup-dark.svg" width="156" height="48" alt="">
		<span class="lbl">Koppel dunkel</span>
	</div>
	<div class="cell" style="background:#3b2fc9">
		${svg('fink-mark-white.svg', '', 'width="96" height="96"')}
		<span class="lbl">Weiße Marke auf Primärfläche</span>
	</div>`;

writeFileSync(
	join(here, 'ausarbeitung.html'),
	`<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>Fink Logo – Ausarbeitung „Silhouette“</title>
<style>
	body { margin: 0; padding: 2.5rem; font-family: Inter, "Segoe UI", system-ui, sans-serif; background: #efeef6; color: #1c1b29; }
	h1 { font-size: 1.5rem; letter-spacing: -0.02em; margin: 0 0 .3rem; }
	.note { color: #5b5970; margin: 0 0 2rem; font-size: .95rem; }
	h2 { font-size: 1.1rem; margin: 2rem 0 .8rem; }
	.grid { display: flex; flex-wrap: wrap; gap: .6rem; max-width: 1180px; }
	.cell { display: flex; align-items: center; gap: 1.6rem; padding: 1.6rem 2rem; border-radius: 14px; border: 1px solid #e3e1f0; }
	.cell.col { flex-direction: column; align-items: flex-start; gap: .8rem; }
	.lbl { font-size: .8rem; color: #5b5970; margin-left: auto; padding-left: 1.6rem; }
	img { display: block; image-rendering: auto; }
</style>
</head>
<body>
<h1>Fink Logo – Ausarbeitung „04 Silhouette“</h1>
<p class="note">Aufrechte Buchfink-Silhouette: Kegelschnabel, rundes Auge, gefalteter Flügel, Schwanz abwärts, dünne Beine. Master-Marke auf <code>currentColor</code>, Details als Masken-Ausschnitte.</p>
<h2>Marke in Größen und Farbvarianten</h2>
<div class="grid">${rows}</div>
<h2>Kachel und Koppel</h2>
<div class="grid">${tiles}${lockups}</div>
</body>
</html>`,
);
console.log('ausarbeitung.html geschrieben');
