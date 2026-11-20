// Baut die Vorschau-Seite aus den SVG-Marken.  `node build-preview.mjs`
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const marksDir = join(here, 'marks');

// Buchfink-Merkmale als Maßstab: Kegelschnabel, runder Kopf, plumper Rumpf,
// aufrechte Haltung, Schwanz schräg nach unten, dünne Beine.
const proposals = [
	['01-flug', 'Flug', 'Schwünge + Kopf mit Kegelschnabel; Lücke im Schwung = weiße Flügelbinde'],
	['02-blockvogel', 'Blockvogel', 'Der Fink aus Komponenten: Kreis, Kegel, Quadrat – Design-System-Narrativ'],
	['03-f-schwing', 'F-Schwing', 'Das F wird zum Fink: Balken = Kopf mit Kegelschnabel, Mittelbalken = Flügel'],
	['04-silhouette', 'Silhouette', 'Aufrechte Buchfink-Silhouette: Kegelschnabel, Brust, Flügel-Linie, Schwanz abwärts'],
	['05-feder', 'Feder', 'Runde Schwungfeder mit geschnittener Spindel – leicht und präzise'],
	['06-astsitzer', 'Astsitzer', 'Aufrecht auf dem Ast: Kegelschnabel, Plumpheit, gegabelter Schwanz'],
];

const inline = (svg, cls, attrs = '') =>
	svg.replace('<svg ', `<svg class="${cls}" ${attrs} aria-hidden="true" focusable="false" `);

const card = (svg, scheme) => `
	<div class="row ${scheme}">
		${inline(svg, 'm96', 'width="96" height="96"')}
		${inline(svg, 'm40', 'width="40" height="40"')}
		${inline(svg, 'm22', 'width="22" height="22"')}
		<span class="lockup">${inline(svg, 'm28', 'width="28" height="28"')}<span class="word">fink</span><span class="sub">Design&nbsp;System</span></span>
	</div>`;

const sections = proposals
	.map(([slug, name, desc], i) => {
		const svg = readFileSync(join(marksDir, `${slug}.svg`), 'utf8');
		return `
	<section>
		<h2><span class="num">${String(i + 1).padStart(2, '0')}</span> ${name} <small>— ${desc}</small></h2>
		${card(svg, 'light')}
		${card(svg, 'dark')}
	</section>`;
	})
	.join('\n');

writeFileSync(
	join(here, 'index.html'),
	`<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>Fink – Logo-Vorschläge</title>
<style>
	:root { color-scheme: light dark; }
	* { box-sizing: border-box; }
	body { margin: 0; padding: 2.5rem; font-family: Inter, "Segoe UI", system-ui, sans-serif; background: #efeef6; color: #1c1b29; }
	h1 { font-size: 1.6rem; letter-spacing: -0.02em; margin: 0 0 .3rem; }
	.note { color: #5b5970; margin: 0 0 2rem; font-size: .95rem; }
	section { margin-bottom: 2.5rem; max-width: 1180px; }
	h2 { font-size: 1.15rem; letter-spacing: -0.01em; margin: 0 0 .8rem; }
	h2 small { font-weight: 400; color: #5b5970; }
	h2 .num { color: #3b2fc9; font-variant-numeric: tabular-nums; margin-right: .15rem; }
	.row { display: flex; align-items: center; gap: 2.2rem; padding: 1.6rem 2rem; border-radius: 14px; }
	.row.light { background: #ffffff; color: #3b2fc9; border: 1px solid #e3e1f0; }
	.row.dark  { background: #121120; color: #b7b0ff; margin-top: .6rem; }
	.m96, .m40, .m22, .m28 { flex: none; }
	.lockup { display: inline-flex; align-items: baseline; gap: .55rem; margin-left: auto; color: #1c1b29; }
	.dark .lockup { color: #ecebf5; }
	.word { font-size: 2rem; font-weight: 650; letter-spacing: -0.03em; line-height: 1; }
	.word, .lockup svg { align-self: center; }
	.sub { font-size: .72rem; letter-spacing: .14em; text-transform: uppercase; color: #5b5970; align-self: center; margin-top: .45rem; }
</style>
</head>
<body>
<h1>Fink Design System – Logo-Vorschläge</h1>
<p class="note">Sechs Marken-Ideen in der Primärfarbe (#3b2fc9 / Dark #b7b0ff), je in 96 / 40 / 22 px und als Wortmarken-Koppel „fink“.</p>
${sections}
</body>
</html>`,
);
console.log('index.html geschrieben');
