import {
	FINK_THEMES,
	FinkAlert,
	FinkBadge,
	FinkButton,
	FinkCodeBlock,
	FinkInputColor,
	FinkInputRange,
	FinkInputText,
	FinkLink,
	FinkPageHeader,
	FinkSingleSelect,
	FinkStack,
	FinkStatCard,
	FinkStatus,
	brandThemes,
	tokens,
	useFink,
	type FinkThemeName,
} from '@fink-ui/react';
import { useState, type CSSProperties, type ReactNode } from 'react';
import { t } from '../i18n';
import { CodeBlock } from '../site/CodeBlock';

/** Beispielcode für ein abgeleitetes Theme: mit React und ohne Framework. */
const DERIVE_EXAMPLE = [
	{
		label: 'React',
		language: 'tsx' as const,
		filename: 'main.tsx',
		code: `import { defineFinkTheme, FinkProvider } from '@fink-ui/react';

const forest = defineFinkTheme({
  name: 'fink-forest',
  label: 'Fink Forest',
  extends: 'fink', // oder 'telekom', 'db', 'default' oder ein eigenes Theme
  tokens: {
    color: {
      primary: { light: '#1d6b3c', dark: '#8fdcae' },
      'primary-variant': { light: '#14532d', dark: '#b9ecc9' },
    },
    radius: { md: '6px' },
  },
  overrides: {
    // optional: CSS je KoliBri-Komponente, angehängt an das Elternteil
    'KOL-BUTTON': '@layer kol-theme-component { .kol-button__text { font-weight: 600; } }',
  },
});

<FinkProvider themes={[forest]} defaultTheme="fink-forest">
  <App />
</FinkProvider>;`,
	},
	{
		label: 'Ohne Framework',
		language: 'ts' as const,
		filename: 'main.ts',
		code: `import { addFinkThemes, defineFinkTheme } from '@fink-ui/components';
import { defineCustomElements } from '@fink-ui/components/dist/loader/index.js';

const forest = defineFinkTheme({
  name: 'fink-forest',
  label: 'Fink Forest',
  extends: 'fink',
  tokens: { color: { primary: { light: '#1d6b3c', dark: '#8fdcae' } } },
});
addFinkThemes([forest]); // vor defineCustomElements()
document.documentElement.dataset.theme = 'fink-forest';
await defineCustomElements();`,
	},
];

const PROGRAM_OPTIONS = [
	{ label: t('Digitalisierung'), value: 'dig' },
	{ label: t('Klimaschutz'), value: 'klima' },
];

/** Theme der ganzen Seite; auf Smartphones der einzige Umschalter, weil der Kopf dafür keinen Platz hat. */
function PageThemeSelect() {
	const { theme, setTheme, themes } = useFink();
	return (
		<FinkSingleSelect
			_label={t('Theme dieser Seite')}
			_hint={t('Gilt für die ganze Showcase und wird gespeichert.')}
			_options={themes.map((item) => ({ label: item.label, value: item.name }))}
			_value={theme}
			_on={{ onChange: (_e, value) => setTheme(String(value) as FinkThemeName) }}
		/>
	);
}

const FONT_OPTIONS = [
	{ label: t('Fink (Inter/System)'), value: 'var(--fink-font-family)' },
	{ label: t('Serif'), value: 'Georgia, "Times New Roman", serif' },
	{ label: t('Monospace'), value: 'ui-monospace, Menlo, monospace' },
];

/** brandThemes und FINK_THEMES kommen aus dem Paket untypisiert; hier die vom Showcase benutzte Struktur. */
type BrandThemeInfo = { name: string; flat: Record<string, { value?: string; light?: string; dark?: string }> };
type CatalogTheme = { name: string; label: string; source: string; brand?: boolean };

const brandThemeList = brandThemes as BrandThemeInfo[];
const catalogThemes = FINK_THEMES as CatalogTheme[];

/**
 * Primärfarbe eines Themes als Hex-Wert; fink-badge wertet Farben selbst aus und akzeptiert keine
 * var(). Je Farbschema der passende Wert — sonst zeigt der Dunkelmodus die hellen Light-Werte.
 */
const primaryOf = (theme: string | undefined, scheme: 'light' | 'dark'): string => {
	const info = brandThemeList.find((item) => item.name === theme)?.flat['color.primary'] ?? tokens['color.primary'];
	return scheme === 'dark' ? (info.dark ?? info.value!) : (info.light ?? info.value!);
};

/** Textfarbe mit ≥4,5:1 auf dem gegebenen Hintergrund (fink-badge wählt selbst nur weiß/schwarz pauschal). */
const foregroundOn = (bg: string): string => {
	const lum = [1, 3, 5]
		.map((i) => parseInt(bg.slice(i, i + 2), 16) / 255)
		.map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
		.reduce((acc, v, i) => acc + [0.2126, 0.7152, 0.0722][i] * v, 0);
	return lum > 0.179 ? '#1d1d1e' : '#ffffff';
};

function Sample({ theme, scheme }: { theme?: string; scheme: 'light' | 'dark' }) {
	return (
		<FinkStack _gap="4">
			<FinkStack _direction="row" _gap="2">
				<FinkButton _label={t('Primär')} _variant="primary" />
				<FinkButton _label={t('Sekundär')} _variant="secondary" />
				<FinkButton _label={t('Löschen')} _variant="danger" />
			</FinkStack>
			<FinkInputText _label={t('Aktenzeichen')} _placeholder={t('z. B. FD-2026-0142')} _hint={t('Steht auf dem Bescheid')} />
			<FinkSingleSelect _label={t('Programm')} _options={PROGRAM_OPTIONS} _value="dig" />
			<FinkAlert _type="info" _variant="card" _label={t('Hinweis')}>
				{t('Gleiche Komponenten, anderes Theme.')}
			</FinkAlert>
			<FinkStack _direction="row" _gap="2" _align="center">
				{brandThemeList.some((item) => item.name === theme) && (
					<FinkBadge _label={t('Badge')} _color={{ backgroundColor: primaryOf(theme, scheme), foregroundColor: foregroundOn(primaryOf(theme, scheme)) }} />
				)}
				<FinkStatus _label={t('Fink-Status')} _tone="success" />
			</FinkStack>
		</FinkStack>
	);
}

/**
 * Rendert die Kinder unter einem anderen Theme. KoliBri liest data-theme beim Mounten, die Tokens
 * des Themes gelten über den Selektor [data-theme='…'] aus den Fink-Tokens für den ganzen Teilbaum.
 */
function ThemeScope({ theme, children }: { theme: string; children: ReactNode }) {
	return (
		<div className="compare-pane" data-theme={theme}>
			{children}
		</div>
	);
}

export function Theming() {
	const { colorScheme, themes } = useFink();
	const [primary, setPrimary] = useState<string>(tokens['color.primary'].light!);
	const [radius, setRadius] = useState(10);
	const [font, setFont] = useState('var(--fink-font-family)');

	const scoped = {
		'--fink-color-primary': primary,
		'--kolibri-color-primary': primary,
		'--fink-color-primary-variant': `color-mix(in srgb, ${primary} 80%, black)`,
		'--kolibri-color-primary-variant': `color-mix(in srgb, ${primary} 80%, black)`,
		'--fink-color-secondary': `color-mix(in srgb, ${primary} 12%, white)`,
		'--kolibri-color-secondary': `color-mix(in srgb, ${primary} 12%, white)`,
		'--fink-radius-md': `${radius}px`,
		'--fink-radius-lg': `${Math.round(radius * 1.6)}px`,
		'--kolibri-border-radius': `${radius}px`,
		'--fink-font-family': font,
		'--kolibri-font-family': font,
		colorScheme: 'light',
	} as CSSProperties;

	return (
		<>
			<FinkPageHeader
				_heading={t('Theming')}
				_description={t(
					'Fink ist ein KoliBri-Theme plus Tokens. KoliBri-Atome bekommen ihre Optik über adoptierte Stylesheets, Fink-Komposita lesen dieselben Tokens.',
				)}
			/>

			<section className="section" aria-labelledby="compare">
				<h2 id="compare">{t('Ein Komponentensatz, sechs Design-Systeme')}</h2>
				<p className="section-intro">
					{t('Alle Themes sind registriert. KoliBri sucht beim Mounten das nächste')} <code>{t('data-theme')}</code>
					{t('-Attribut – so lassen sich Themes sogar auf einer Seite mischen.')}{' '}
					{t(
						'Neben Fink und dem KoliBri-Default stehen Stil-Adaptionen von DB UX Design System, Porsche Design System, Telekom Scale und Siemens iX: dieselben KoliBri- und Fink-Komponenten, nur andere Tokens und wenige Overrides. Für die ganze Seite wählt man das Theme über das Farbeimer-Symbol im Kopf.',
					)}
				</p>
				<div className="theme-select">
					<PageThemeSelect />
				</div>
				<div className="compare">
					{themes.map((theme) => (
						<ThemeScope key={theme.name} theme={theme.name}>
							<h3>
								{theme.label} <code className="muted small">data-theme="{theme.name}"</code>
							</h3>
							<Sample scheme={colorScheme === 'dark' ? 'dark' : 'light'} theme={theme.name} />
						</ThemeScope>
					))}
				</div>
			</section>

			<section className="section" aria-labelledby="brands">
				<h2 id="brands">{t('Stil-Adaptionen')}</h2>
				<p className="section-intro">
					{t(
						'Stil-Nachbildungen auf Basis veröffentlichter Design-Tokens: Farben, Radien, Schatten und Abstände. Keine Schriften, Logos oder Icons der Vorbilder; keine Verbindung zu den Unternehmen.',
					)}
				</p>
				<ul className="section-intro brand-notes">
					{catalogThemes
						.filter((theme) => theme.brand)
						.map((theme) => (
							<li key={theme.name}>
								<FinkLink _href={theme.source} _label={theme.label} _target="_blank" />: Theme <code>{theme.name}</code> aus <code>@fink-ui/react</code>
							</li>
						))}
				</ul>
			</section>

			<section className="section" aria-labelledby="live">
				<h2 id="live">{t('Live-Theming über Tokens')}</h2>
				<p className="section-intro">
					{t(
						'Tokens sind CSS Custom Properties und erben in jede Shadow Root. Wer sie in einem Teilbaum überschreibt, ändert KoliBri-Atome und Fink-Komposita gemeinsam – ohne Neuladen.',
					)}
				</p>
				<div className="playground">
					<div className="playground-controls">
						<FinkInputColor _label={t('Markenfarbe')} _value={primary} _on={{ onInput: (_e, value) => setPrimary(String(value)) }} />
						<FinkInputRange
							_label={t('Eckenradius: {{radius}}px', { radius })}
							_min={0}
							_max={24}
							_step={1}
							_value={radius}
							_on={{ onInput: (_e, value) => setRadius(Number(value)) }}
						/>
						<FinkSingleSelect _label={t('Schrift')} _options={FONT_OPTIONS} _value={font} _on={{ onChange: (_e, value) => setFont(String(value)) }} />
						<FinkButton
							_label={t('Zurücksetzen')}
							_icons="codicon codicon-discard"
							_on={{
								onClick: () => {
									setPrimary(tokens['color.primary'].light!);
									setRadius(10);
									setFont('var(--fink-font-family)');
								},
							}}
						/>
					</div>
					<div className="compare-pane" style={scoped}>
						<FinkStatCard _label={t('Vorschau')} _value={t('42 Anträge')} _trend={7} _trendLabel={t('diese Woche')} _icons="codicon codicon-paintcan" />
						<Sample scheme={colorScheme === 'dark' ? 'dark' : 'light'} />
					</div>
				</div>
			</section>

			<section className="section" aria-labelledby="derive">
				<h2 id="derive">{t('Eigenes Theme ableiten')}</h2>
				<p className="section-intro">
					{t(
						'Ein eigenes Theme übernimmt Tokens und KoliBri-Overrides eines vorhandenen Themes und ändert nur, was abweicht. Elternteil kann Fink, der KoliBri-Default, jede Stil-Adaption oder ein anderes eigenes Theme sein. Unbekannte Tokens sind ein Fehler, damit alle Themes dieselbe Struktur behalten.',
					)}{' '}
					{t('Das Theme „Fink Forest“ im Vergleich oben und im Umschalter ist so entstanden.')}
				</p>
				<FinkCodeBlock _tabs={DERIVE_EXAMPLE} />
			</section>

			<section className="section" aria-labelledby="howto">
				<h2 id="howto">{t('So entsteht das Fink-Theme')}</h2>
				<p className="section-intro">
					{t(
						'Das Fink-Theme (privat, gebündelt in @fink-ui/components) übernimmt alle Styles von @public-ui/theme-default, registriert sie unter dem Namen „fink“ und hängt pro Komponente Overrides im Layer kol-theme-component an. Farben, Radius, Spacing und Schrift fließen über die --kolibri-*-Hooks aus den Tokens ein.',
					)}
				</p>
				<CodeBlock
					label="Theme-Definition"
					code={`export const FINK: typeof DEFAULT = (patch) =>
  DEFAULT((_name, map, options, features) => {
    const merged = { ...map };
    for (const [key, css] of Object.entries(overrides)) {
      merged[key] = \`\${merged[key] ?? ''}\\n\${css}\`;
    }
    return patch('fink', merged, options, features);
  });

// overrides['KOL-BUTTON']
@layer kol-theme-component {
  :host { --border-radius: var(--fink-radius-pill); }
  .kol-button { font-weight: var(--fink-font-weight-medium); }
}`}
				/>
			</section>
		</>
	);
}
