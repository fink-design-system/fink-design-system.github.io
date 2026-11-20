// GitHub-Profilbild rendern:  node build-github.mjs  → final/github-profilbild.png (1024×1024)
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const svg = readFileSync(join(here, 'final', 'github-avatar.svg'), 'utf8');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: 2 });
await page.setContent(
	`<!doctype html><html><body style="margin:0"><div id="target" style="width:512px;height:512px">${svg}</div></body></html>`,
);
await page.locator('#target svg').evaluate((el) => {
	el.setAttribute('width', '512');
	el.setAttribute('height', '512');
	el.style.display = 'block';
});
await page.locator('#target').screenshot({ path: join(here, 'final', 'github-profilbild.png') });
await browser.close();
console.log('final/github-profilbild.png geschrieben (1024×1024)');
