import { test as base } from '@playwright/test';
import type { Variant } from './helpers';

export interface A11yOptions {
	variant: Variant;
	/** Zusätzlich WCAG 1.4.10 (Reflow) prüfen – nur im 320-px-Projekt. */
	checkReflow: boolean;
}

export const test = base.extend<A11yOptions>({
	variant: [{ language: 'de', scheme: 'light' }, { option: true }],
	checkReflow: [false, { option: true }],
});

export { expect } from '@playwright/test';
