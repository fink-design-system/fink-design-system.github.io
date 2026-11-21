import { useState, type CSSProperties, type ReactNode } from 'react';
import {
	FinkPageHeader,
	FinkStack,
	FinkStatCard,
	FinkStatus,
	KolAlert,
	KolBadge,
	KolButton,
	KolInputColor,
	KolInputRange,
	KolInputText,
	KolSingleSelect,
	KolLink,
	FINK_THEMES,
	brandThemes,
	tokens,
	useFink,
	type FinkThemeName,
} from '@fink/react';
import { CodeBlock } from '../site/CodeBlock';
import { t } from '../i18n';

const PROGRAM_OPTIONS = [
	{ label: t('Digitalisierung'), value: 'dig' },
	{ label: t('Klimaschutz'), value: 'klima' },
];

const THEME_OPTIONS = FINK_THEMES.map((theme) => ({ label: theme.label, value: theme.name }));

/** Theme der ganzen Seite; auf Smartphones der einzige Umschalter, weil der Kopf dafür keinen Platz hat. */
function PageThemeSelect() {
	const { theme, setTheme } = useFink();
	return (
		<KolSingleSelect
			_label={t('Theme dieser Seite')}
			_hint={t('Gilt für die ganze Showcase und wird gespeichert.')}
			_options={THEME_OPTIONS}
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

/**
 * Primärfarbe eines Themes als Hex-Wert; kol-badge wertet Farben selbst aus und akzeptiert keine
 * var(). Je Farbschema der passende Wert — sonst zeigt der Dunkelmodus die hellen Light-Werte.
 */
const primaryOf = (theme: string | undefined, scheme: 'light' | 'dark'): string => {
	const info = brandThemes.find((item) => item.name === theme)?.flat['color.primary'] ?? tokens['color.primary'];
	return scheme === 'dark' ? (info.dark ?? info.value!) : (info.light ?? info.value!);
};

/** Textfarbe mit ≥4,5:1 auf dem gegebenen Hintergrund (kol-badge wählt selbst nur weiß/schwarz pauschal). */
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
				<KolButton _label={t('Primär')} _variant="primary" />
				<KolButton _label={t('Sekundär')} _variant="secondary" />
				<KolButton _label={t('Löschen')} _variant="danger" />
			</FinkStack>
			<KolInputText _label={t('Aktenzeichen')} _placeholder={t('z. B. FD-2026-0142')} _hint={t('Steht auf dem Bescheid')} />
			<KolSingleSelect _label={t('Programm')} _options={PROGRAM_OPTIONS} _value="dig" />
			<KolAlert _type="info" _variant="card" _label={t('Hinweis')}>
				{t('Gleiche Komponenten, anderes Theme.')}
			</KolAlert>
			<FinkStack _direction="row" _gap="2" _align="center">
				<KolBadge
					_label={t('Badge')}
					_color={{ backgroundColor: primaryOf(theme, scheme), foregroundColor: foregroundOn(primaryOf(theme, scheme)) }}
				/>
				<FinkStatus _label={t('Fink-Status')} _tone="success" />
			</FinkStack>
		</FinkStack>
	);
}

/**
 * Rendert die Kinder unter einem anderen Theme. KoliBri liest data-theme beim Mounten, die Tokens
 * des Themes gelten über den Selektor [data-theme='…'] aus @fink/tokens für den ganzen Teilbaum.
 */
function ThemeScope({ theme, children }: { theme: string; children: ReactNode }) {
	return (
		<div className="compare-pane" data-theme={theme}>
			{children}
		</div>
	);
}

export function Theming() {
	const { colorScheme } = useFink();
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
				_description={t('Fink ist ein KoliBri-Theme plus Tokens. KoliBri-Atome bekommen ihre Optik über adoptierte Stylesheets, Fink-Komposita lesen dieselben Tokens.')}
			/>

			<section className="section" aria-labelledby="compare">
				<h2 id="compare">{t('Ein Komponentensatz, sechs Design-Systeme')}</h2>
				<p className="section-intro">
					{t('Alle Themes sind registriert. KoliBri sucht beim Mounten das nächste')} <code>{t('data-theme')}</code>{t('-Attribut – so lassen sich Themes sogar auf einer Seite mischen.')}{' '}
					{t('Neben Fink und dem KoliBri-Default stehen Stil-Adaptionen von DB UX Design System, Porsche Design System, Telekom Scale und Siemens iX: dieselben KoliBri- und Fink-Komponenten, nur andere Tokens und wenige Overrides. Für die ganze Seite wählt man das Theme über das Farbeimer-Symbol im Kopf.')}
				</p>
				<div className="theme-select">
					<PageThemeSelect />
				</div>
				<div className="compare">
					{FINK_THEMES.map((theme) => (
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
					{t('Stil-Nachbildungen auf Basis veröffentlichter Design-Tokens: Farben, Radien, Schatten und Abstände. Keine Schriften, Logos oder Icons der Vorbilder; keine Verbindung zu den Unternehmen.')}
				</p>
				<ul className="section-intro brand-notes">
					{FINK_THEMES.filter((theme) => theme.brand).map((theme) => (
						<li key={theme.name}>
							<KolLink _href={theme.source} _label={theme.label} _target="_blank" />: <code>packages/tokens/src/themes/{theme.name}.json</code>
						</li>
					))}
				</ul>
			</section>

			<section className="section" aria-labelledby="live">
				<h2 id="live">{t('Live-Theming über Tokens')}</h2>
				<p className="section-intro">
					{t('Tokens sind CSS Custom Properties und erben in jede Shadow Root. Wer sie in einem Teilbaum überschreibt, ändert KoliBri-Atome und Fink-Komposita gemeinsam – ohne Neuladen.')}
				</p>
				<div className="playground">
					<div className="playground-controls">
						<KolInputColor _label={t('Markenfarbe')} _value={primary} _on={{ onInput: (_e, value) => setPrimary(String(value)) }} />
						<KolInputRange _label={t('Eckenradius: {{radius}}px', { radius })} _min={0} _max={24} _step={1} _value={radius} _on={{ onInput: (_e, value) => setRadius(Number(value)) }} />
						<KolSingleSelect
							_label={t('Schrift')}
							_options={FONT_OPTIONS}
							_value={font}
							_on={{ onChange: (_e, value) => setFont(String(value)) }}
						/>
						<KolButton
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

			<section className="section" aria-labelledby="howto">
				<h2 id="howto">{t('So entsteht das Fink-Theme')}</h2>
				<p className="section-intro">
					{t('@fink/theme übernimmt alle Styles von @public-ui/theme-default, registriert sie unter dem Namen „fink“ und hängt pro Komponente Overrides im Layer kol-theme-component an. Farben, Radius, Spacing und Schrift fließen über die --kolibri-*-Hooks aus den Tokens ein.')}
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
