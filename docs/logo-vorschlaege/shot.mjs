// Screenshot der Vorschau:  node shot.mjs
import { chromium } from '@playwright/test';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
await page.goto('file://' + join(here, 'index.html'));
await page.waitForTimeout(300);
await page.screenshot({ path: join(here, 'preview.png'), fullPage: true });
await browser.close();
console.log('preview.png geschrieben');
