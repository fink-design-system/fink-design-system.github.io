/**
 * Legt die KoliBri-Versionen für den Versionsvergleich unter .kolibri/<version> an (nicht eingecheckt).
 *
 * - 4.5: @public-ui/components und @public-ui/theme-default 4.5.0 von npm.
 * - 4.7: noch nicht veröffentlicht. Gebaut aus einem Checkout von public-ui/kolibri, Branch release/4
 *   (KOLIBRI_SRC, Standard ../../../kolibri). Vorher dort `pnpm install` und den Build von
 *   packages/components und packages/themes/default ausführen. Der Commit wird in .kolibri/4.7/SOURCE festgehalten.
 *
 * 4.6.0 kommt wie bei Fink aus dem Workspace. vite.config.ts bindet die Versionen über KOLIBRI_BUILD=4.5 bzw. 4.7 ein.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const run = (cmd, args, cwd) => execFileSync(cmd, args, { cwd, stdio: ['ignore', 'pipe', 'inherit'], encoding: 'utf8' }).trim();

function install(version, dependencies) {
	const dir = resolve(root, '.kolibri', version);
	rmSync(dir, { recursive: true, force: true });
	mkdirSync(dir, { recursive: true });
	writeFileSync(resolve(dir, 'package.json'), `${JSON.stringify({ name: `kolibri-${version}`, private: true, dependencies }, null, '\t')}\n`);
	run('npm', ['install', '--no-audit', '--no-fund', '--ignore-scripts', '--loglevel=error'], dir);
	return dir;
}

const only = process.argv.slice(2);

if (!only.length || only.includes('4.5')) {
	install('4.5', { '@public-ui/components': '4.5.0', '@public-ui/theme-default': '4.5.0' });
	console.log('KoliBri 4.5.0 in .kolibri/4.5');
}

if (!only.length || only.includes('4.7')) {
	const src = resolve(process.env.KOLIBRI_SRC ?? resolve(root, '../../../kolibri'));
	const components = resolve(src, 'packages/components');
	const theme = resolve(src, 'packages/themes/default');
	if (!existsSync(resolve(components, 'dist/esm')) || !existsSync(resolve(theme, 'dist/index.mjs'))) {
		throw new Error(`KoliBri-Checkout unter ${src} ist nicht gebaut (packages/components/dist, packages/themes/default/dist).`);
	}
	const packs = resolve(root, '.kolibri/packs');
	rmSync(packs, { recursive: true, force: true });
	mkdirSync(packs, { recursive: true });
	for (const dir of [components, theme]) run('pnpm', ['pack', '--pack-destination', packs], dir);
	const [componentsTgz] = readdirSync(packs).filter((f) => f.startsWith('public-ui-components-'));
	const [themeTgz] = readdirSync(packs).filter((f) => f.startsWith('public-ui-theme-default-'));
	const dir = install('4.7', { '@public-ui/components': `file:../packs/${componentsTgz}`, '@public-ui/theme-default': `file:../packs/${themeTgz}` });
	const commit = run('git', ['log', '-1', '--format=%H %cd %s', '--date=short'], src);
	const branch = run('git', ['rev-parse', '--abbrev-ref', 'HEAD'], src);
	writeFileSync(resolve(dir, 'SOURCE'), `public-ui/kolibri ${branch} ${commit}\n`);
	console.log(`KoliBri 4.7 (${branch} ${commit.slice(0, 7)}) in .kolibri/4.7`);
}
