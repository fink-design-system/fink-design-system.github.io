/**
 * Legt ältere KoliBri-Versionen für den Versionsvergleich unter .kolibri/<version> an (nicht eingecheckt):
 * @public-ui/components und @public-ui/theme-default 4.5.0 und 4.6.0 von npm.
 *
 * Die aktuelle Version (4.7.0-rc.0) kommt wie bei Fink aus dem Workspace. vite.config.ts bindet die älteren über
 * KOLIBRI_BUILD=4.5 bzw. 4.6 ein.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const VERSIONS = { '4.5': '4.5.0', '4.6': '4.6.0' };
const only = process.argv.slice(2);

for (const [key, version] of Object.entries(VERSIONS)) {
	if (only.length && !only.includes(key)) continue;
	const dir = resolve(root, '.kolibri', key);
	rmSync(dir, { recursive: true, force: true });
	mkdirSync(dir, { recursive: true });
	const dependencies = { '@public-ui/components': version, '@public-ui/theme-default': version };
	writeFileSync(resolve(dir, 'package.json'), `${JSON.stringify({ name: `kolibri-${key}`, private: true, dependencies }, null, '\t')}\n`);
	execFileSync('npm', ['install', '--no-audit', '--no-fund', '--ignore-scripts', '--loglevel=error'], { cwd: dir, stdio: 'inherit' });
	console.log(`KoliBri ${version} in .kolibri/${key}`);
}
