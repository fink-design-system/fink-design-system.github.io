import { FinkGrid, FinkPageHeader, tokens, type TokenPath } from '@fink/react';
import { t } from '../i18n';

const hexToRgb = (hex: string) => {
	const value = hex.replace('#', '');
	if (!/^[0-9a-f]{6}$/i.test(value)) return null;
	return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
};

const luminance = (hex: string) => {
	const rgb = hexToRgb(hex);
	if (!rgb) return null;
	const [r, g, b] = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
	return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrast = (a?: string, b?: string) => {
	if (!a || !b) return null;
	const la = luminance(a);
	const lb = luminance(b);
	if (la === null || lb === null) return null;
	return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

/** Liest #rrggbb, rgb() und rgba() sowie „transparent“ als [r, g, b, a] (0–255, a 0–1). */
const parseColor = (value: string): [number, number, number, number] | null => {
	const v = value.trim().toLowerCase();
	if (v === 'transparent') return [0, 0, 0, 0];
	const hex = /^#([0-9a-f]{6})$/.exec(v);
	if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16)).concat(1) as [number, number, number, number];
	const rgb = /^rgba?\(([^)]+)\)$/.exec(v);
	if (!rgb) return null;
	const [r, g, b, a = '1'] = rgb[1].split(/[\s,/]+/).filter(Boolean);
	return [Number(r), Number(g), Number(b), Number(a)];
};

const toHex = (rgb: number[]) => `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;

/** Sichtbare Farbe eines (ggf. transparenten) Tokens über der Fläche des jeweiligen Schemas. */
const composite = (value: string | undefined, underlay: string) => {
	const top = parseColor(value ?? '');
	const base = parseColor(underlay);
	if (!top || !base) return underlay;
	const a = top[3];
	return toHex([0, 1, 2].map((i) => top[i] * a + base[i] * (1 - a)));
};

/** Wählt die Schriftfarbe mit dem höheren Kontrast zur sichtbaren Fläche (WCAG 1.4.3). */
const inkOn = (background: string) => ((contrast(background, '#ffffff') ?? 0) >= (contrast(background, '#1c1b29') ?? 0) ? '#ffffff' : '#1c1b29');

/** Farbfeld: die Token-Farbe als solide Fläche (axe kann Gradients nicht kontrastbewerten). */
const fieldStyle = (value: string | undefined, underlay: string) => ({
	backgroundColor: value ?? underlay,
	color: inkOn(composite(value ?? underlay, underlay)),
});

const textTokens = new Set(['primary', 'primary-variant', 'success', 'warning', 'danger', 'info', 'text', 'subtle', 'ink', 'visited']);

function Swatch({ path }: { path: TokenPath }) {
	const token = tokens[path];
	const name = path.split('.')[1];
	const onLight = textTokens.has(name) ? contrast(token.light, tokens['color.light'].light) : null;
	const onDark = textTokens.has(name) ? contrast(token.dark, tokens['color.light'].dark) : null;
	const label = (ratio: number | null, scheme: string) =>
		ratio === null ? null : (
			<span className={ratio >= 4.5 ? 'pass' : 'fail'} title={t('Kontrast auf Fläche ({{scheme}})', { scheme })}>
				{scheme} {ratio.toFixed(1)}:1 {ratio >= 4.5 ? 'AA' : '✕'}
			</span>
		);
	if (!token.light || !token.dark) {
		// Nicht-Farb-Tokens (z. B. control.height) haben kein hell/dunkel-Feld und kein Farbfeld.
		return (
			<div className="swatch">
				<div className="swatch-body">
					<strong>{token.cssVar}</strong>
					<span>{t(token.description)}</span>
					<span>{token.value}</span>
				</div>
			</div>
		);
	}
	return (
		<div className="swatch">
			<div className="swatch-color">
				<span style={fieldStyle(token.light, tokens['color.light'].light ?? '#ffffff')}>{t('hell')}</span>
				<span style={fieldStyle(token.dark, tokens['color.light'].dark ?? '#1b1a2c')}>{t('dunkel')}</span>
			</div>
			<div className="swatch-body">
				<strong>{token.cssVar}</strong>
				<span>{t(token.description)}</span>
				<span>
					{token.light} · {token.dark}
				</span>
				{(onLight || onDark) && (
					<div className="contrast">
						{label(onLight, t('hell'))}
						{label(onDark, t('dunkel'))}
					</div>
				)}
			</div>
		</div>
	);
}

const byGroup = (group: string) => (Object.keys(tokens) as TokenPath[]).filter((path) => path.startsWith(`${group}.`));

export function Foundations() {
	const brand: TokenPath[] = ['color.primary', 'color.primary-variant', 'color.secondary'];
	const semantic: TokenPath[] = ['color.success', 'color.warning', 'color.danger', 'color.info'];
	const neutral = byGroup('color').filter((path) => !brand.includes(path) && !semantic.includes(path));
	return (
		<>
			<FinkPageHeader
				_heading={t('Grundlagen')}
				_description={t('Alle Werte stammen aus @fink/tokens. Farben sind als light-dark() definiert – das Farbschema der Anwendung entscheidet, welcher Wert gilt.')}
			/>

			<section className="section" aria-labelledby="colors-brand">
				<h2 id="colors-brand">{t('Markenfarben')}</h2>
				<p className="section-intro">Kontrastwerte werden gegen die Komponentenfläche (--fink-color-light) im jeweiligen Schema berechnet. Ziel: mindestens 4,5:1 (WCAG AA).</p>
				<FinkGrid _min="16rem">
					{brand.map((path) => (
						<Swatch key={path} path={path} />
					))}
				</FinkGrid>
			</section>

			<section className="section" aria-labelledby="colors-semantic">
				<h2 id="colors-semantic">{t('Semantische Farben')}</h2>
				<FinkGrid _min="16rem">
					{semantic.map((path) => (
						<Swatch key={path} path={path} />
					))}
				</FinkGrid>
			</section>

			<section className="section" aria-labelledby="colors-neutral">
				<h2 id="colors-neutral">{t('Text, Flächen und Linien')}</h2>
				<FinkGrid _min="16rem">
					{neutral.map((path) => (
						<Swatch key={path} path={path} />
					))}
				</FinkGrid>
			</section>

			<section className="section" aria-labelledby="typography">
				<h2 id="typography">{t('Typografie')}</h2>
				<p className="section-intro">
					{t('Schrift:')} <code>{tokens['font.family'].value}</code>
				</p>
				{byGroup('type-scale')
					.slice()
					.reverse()
					.map((path) => (
						<div key={path} className="type-row">
							<code>
								{path.split('.')[1]} · {tokens[path].value}
							</code>
							<span style={{ fontSize: `var(${tokens[path].cssVar})` }}>{t('Barrierefreiheit ist kein Feature.')}</span>
						</div>
					))}
			</section>

			<section className="section" aria-labelledby="spacing">
				<h2 id="spacing">{t('Abstände')}</h2>
				<p className="section-intro">{t('4-px-Raster. --fink-space-base wird als --kolibri-spacing an KoliBri übergeben.')}</p>
				{byGroup('space')
					.filter((path) => path !== 'space.base')
					.map((path) => (
						<div key={path} className="space-row">
							<code>{tokens[path].cssVar}</code>
							<span className="muted">{tokens[path].value}</span>
							<div className="space-bar" style={{ width: `var(${tokens[path].cssVar})` }}></div>
						</div>
					))}
			</section>

			<section className="section" aria-labelledby="shape">
				<h2 id="shape">{t('Radien und Elevation')}</h2>
				<FinkGrid _min="10rem">
					{byGroup('radius').map((path) => (
						<div key={path} className="shape-tile" style={{ borderRadius: `var(${tokens[path].cssVar})` }}>
							<strong>{path.split('.')[1]}</strong>
							<code>{tokens[path].value}</code>
						</div>
					))}
					{byGroup('elevation').map((path) => (
						<div key={path} className="shape-tile" style={{ borderRadius: 'var(--fink-radius-md)', boxShadow: `var(${tokens[path].cssVar})`, borderColor: 'transparent' }}>
							<strong>Elevation {path.split('.')[1]}</strong>
							<code>{tokens[path].cssVar}</code>
						</div>
					))}
				</FinkGrid>
			</section>
		</>
	);
}
