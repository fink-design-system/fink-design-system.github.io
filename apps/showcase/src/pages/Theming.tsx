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
	tokens,
} from '@fink/react';
import { CodeBlock } from '../site/CodeBlock';
import { t } from '../i18n';

const PROGRAM_OPTIONS = [
	{ label: t('Digitalisierung'), value: 'dig' },
	{ label: t('Klimaschutz'), value: 'klima' },
];

const FONT_OPTIONS = [
	{ label: t('Fink (Inter/System)'), value: 'var(--fink-font-family)' },
	{ label: t('Serif'), value: 'Georgia, "Times New Roman", serif' },
	{ label: t('Monospace'), value: 'ui-monospace, Menlo, monospace' },
];

function Sample() {
	return (
		<FinkStack _gap="4">
			<FinkStack _direction="row" _gap="2">
				<KolButton _label={t('Primär')} _variant="primary" />
				<KolButton _label={t('Sekundär')} _variant="secondary" />
				<KolButton _label={t('Löschen')} _variant="danger" />
			</FinkStack>
			<KolInputText _label={t('Aktenzeichen')} _placeholder={t('FD-2026-…')} _hint={t('Steht auf dem Bescheid')} />
			<KolSingleSelect _label={t('Programm')} _options={PROGRAM_OPTIONS} _value="dig" />
			<KolAlert _type="info" _variant="card" _label={t('Hinweis')}>
				{t('Gleiche Komponenten, anderes Theme.')}
			</KolAlert>
			<FinkStack _direction="row" _gap="2" _align="center">
				<KolBadge _label={t('Badge')} _color={tokens['color.primary'].light!} />
				<FinkStatus _label={t('Fink-Status')} _tone="success" />
			</FinkStack>
		</FinkStack>
	);
}

/** Rendert die Kinder unter einem anderen KoliBri-Theme. KoliBri liest data-theme beim Mounten. */
function ThemeScope({ theme, children }: { theme: string; children: ReactNode }) {
	return <div data-theme={theme}>{children}</div>;
}

export function Theming() {
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
				<h2 id="compare">{t('Fink und KoliBri-Default im Vergleich')}</h2>
				<p className="section-intro">
					{t('Beide Themes sind registriert. KoliBri sucht beim Mounten das nächste')} <code>{t('data-theme')}</code>{t('-Attribut – so lassen sich Themes sogar auf einer Seite mischen.')}
				</p>
				<div className="compare">
					<div className="compare-pane">
						<h3>
							<code>data-theme="fink"</code>
						</h3>
						<ThemeScope theme="fink">
							<Sample />
						</ThemeScope>
					</div>
					<div className="compare-pane">
						<h3>
							<code>data-theme="default"</code>
						</h3>
						<ThemeScope theme="default">
							<Sample />
						</ThemeScope>
					</div>
				</div>
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
						<Sample />
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
