/**
 * Löst CSS-Farbausdrücke (Tokens mit light-dark()) im Kontext eines Elements in konkrete Hex-Werte auf.
 * Nötig für KoliBri-Komponenten wie kol-badge, die Farben selbst auswerten (Kontrast) und keine
 * CSS-Variablen akzeptieren.
 */
const toHex = (rgb: string): string => {
	const parts = rgb.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0];
	return `#${parts
		.slice(0, 3)
		.map((n) => Math.round(n).toString(16).padStart(2, '0'))
		.join('')}`;
};

const parse = (rgb: string): [number, number, number] => {
	const [r, g, b] = rgb.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0];
	return [r, g, b];
};

export const resolveColor = (host: HTMLElement, cssColor: string): string => {
	const root = host.shadowRoot ?? host;
	const probe = document.createElement('span');
	probe.style.color = cssColor;
	probe.style.display = 'none';
	root.appendChild(probe);
	const value = getComputedStyle(probe).color;
	probe.remove();
	return toHex(value);
};

/** Mischt zwei Hex-Farben (Anteil der ersten in Prozent). */
export const mixHex = (a: string, b: string, percentA: number): string => {
	const ca = parse(`${parseInt(a.slice(1, 3), 16)} ${parseInt(a.slice(3, 5), 16)} ${parseInt(a.slice(5, 7), 16)}`);
	const cb = parse(`${parseInt(b.slice(1, 3), 16)} ${parseInt(b.slice(3, 5), 16)} ${parseInt(b.slice(5, 7), 16)}`);
	const p = percentA / 100;
	return toHex(`rgb(${ca.map((v, i) => v * p + cb[i] * (1 - p)).join(',')})`);
};

const luminance = (hex: string): number => {
	const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Kontrastverhältnis zweier Hex-Farben nach WCAG. */
export const contrastRatio = (a: string, b: string): number => {
	const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
	return (hi + 0.05) / (lo + 0.05);
};

/**
 * Getönte Fläche für Text in der Tonfarbe: mischt bis zu `percent` Prozent der Tonfarbe in die Fläche,
 * senkt den Anteil aber, bis der Text mindestens `minContrast` erreicht (WCAG 1.4.3). So bleiben auch
 * helle Markenfarben (z. B. Magenta) als Textfarbe auf ihrer eigenen Tönung lesbar.
 */
export const tintFor = (foreground: string, surface: string, percent: number, minContrast = 4.5): string => {
	for (let p = percent; p > 0; p -= 1) {
		const tint = mixHex(foreground, surface, p);
		if (contrastRatio(foreground, tint) >= minContrast) return tint;
	}
	return surface;
};

/**
 * Beobachtet Änderungen, die aufgelöste Farben verändern können (Farbschema, Theme, Tokens am Dokument).
 * Liefert eine Abmeldefunktion.
 */
export const onColorContextChange = (callback: () => void): (() => void) => {
	const media = window.matchMedia('(prefers-color-scheme: dark)');
	const observer = new MutationObserver(callback);
	observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style', 'class', 'data-theme', 'data-kol-color-scheme'] });
	media.addEventListener('change', callback);
	return () => {
		observer.disconnect();
		media.removeEventListener('change', callback);
	};
};
