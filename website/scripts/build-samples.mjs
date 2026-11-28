/*
 * Baut alle Samples statisch unter einem Unterpfad der Website (dist/samples/<name>/), damit die Starter-Galerie sie
 * in iframes zeigen kann. Läuft nach dem Website-Build, z. B. in pages.yml: `node website/scripts/build-samples.mjs`.
 * Basis-Pfad der Website aus FINK_BASE (Standard „/“); je Sample wird SAMPLE_BASE gesetzt.
 */
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const samples = join(root, 'samples');
const target = join(root, 'website/dist/samples');
const siteBase = (process.env.FINK_BASE ?? '/').replace(/\/?$/, '/');
const only = process.argv.slice(2);

const run = (cwd, command, args, base) =>
	execFileSync(command, args, { cwd, stdio: 'inherit', env: { ...process.env, SAMPLE_BASE: base, NUXT_APP_BASE_URL: base, NODE_ENV: 'production' } });
const pnpmExec = (cwd, base, ...args) => run(cwd, 'pnpm', ['exec', ...args], base);

/** Je Sample: Build-Befehl und Ordner mit dem statischen Ergebnis. */
const builds = {
	html: (dir, base, out) => {
		// Kein Bundler: Seite, Skript und der selbstständige Build von @fink-ui/components, Pfade auf den Unterordner umgeschrieben.
		const require = createRequire(join(dir, 'package.json'));
		const lib = join(dirname(require.resolve('@fink-ui/components/package.json')), 'dist/fink');
		mkdirSync(out, { recursive: true });
		cpSync(lib, join(out, 'fink'), { recursive: true });
		cpSync(join(dir, 'main.js'), join(out, 'main.js'));
		writeFileSync(join(out, 'index.html'), readFileSync(join(dir, 'index.html'), 'utf8').replaceAll('node_modules/@fink-ui/components/dist/fink/', 'fink/'));
		return out;
	},
	react: (dir, base) => (pnpmExec(dir, base, 'vite', 'build', '--base', base), join(dir, 'dist')),
	vue: (dir, base) => (pnpmExec(dir, base, 'vite', 'build', '--base', base), join(dir, 'dist')),
	angular: (dir, base) => (pnpmExec(dir, base, 'ng', 'build', '--base-href', base, '--output-path', 'dist/gallery'), join(dir, 'dist/gallery/browser')),
	nextjs: (dir, base) => (pnpmExec(dir, base, 'next', 'build'), join(dir, 'out')),
	'react-router': (dir, base) => (pnpmExec(dir, base, 'react-router', 'build'), join(dir, 'build/client')),
	nuxt: (dir, base) => (pnpmExec(dir, base, 'nuxt', 'generate'), join(dir, '.output/public')),
	astro: (dir, base) => (pnpmExec(dir, base, 'astro', 'build'), join(dir, 'dist')),
};

rmSync(target, { recursive: true, force: true });
for (const [name, build] of Object.entries(builds)) {
	if (only.length && !only.includes(name)) continue;
	const dir = join(samples, name);
	const base = `${siteBase}samples/${name}/`;
	const out = join(target, name);
	console.log(`\n▶ Sample ${name} → ${base}`);
	const result = build(dir, base, out);
	if (result !== out) cpSync(result, out, { recursive: true });
	if (!existsSync(join(out, 'index.html'))) throw new Error(`Sample ${name}: kein index.html in ${result}`);
}
console.log(`\nSamples gebaut nach ${target}`);
