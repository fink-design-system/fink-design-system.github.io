import { FinkAbbr, FinkGrid, FinkLinkButton, FinkPageHeader, FinkQuote, FinkStatCard, FinkVersion, tokens } from '@fink-ui/react';
import { catalog } from '../catalog';
import { benchmark, coverageOf } from '../catalog/benchmark';
import { t } from '../i18n';
import { CodeBlock } from '../site/CodeBlock';
import { FINK_VERSION } from '../site/finkVersion';

const layers = [
	{ name: t('Anwendung'), pkg: 'React · Vue · Angular', text: t('Eure Fachanwendung. Nutzt nur die oberste Schicht.'), color: 'var(--fink-color-subtle)' },
	{
		name: '@fink-ui/react',
		pkg: t('Framework-Schicht'),
		text: t(
			'FinkProvider, useFink, useToast und generierte React-Wrapper: eigene Komponenten und alle KoliBri-Komponenten als Fink* (FinkButton). Dazu @fink-ui/vue und @fink-ui/angular.',
		),
		color: 'var(--fink-color-info)',
	},
	{
		name: '@fink-ui/components',
		pkg: t('Komposita (Stencil)'),
		text: t(
			'Registriert KoliBri als fink-* und liefert eigene Web Components wie App Shell, Stepper oder Stat Card, gebaut aus KoliBri-Bausteinen. Dazu fink.css.',
		),
		color: 'var(--fink-color-primary)',
	},
	{
		name: t('Theme und Tokens'),
		pkg: 'fink.css',
		text: t(
			'Enthalten in @fink-ui/components und fink.css: Design Tokens (Farben hell/dunkel, Typo, Spacing, Radien), Theme FINK auf Basis von @public-ui/theme-default, Marken-Themes und KoliBri-Texte.',
		),
		color: 'var(--fink-color-success)',
	},
	{
		name: '@public-ui/components',
		pkg: t('KoliBri-Atome'),
		text: t('Barrierefreie Basiskomponenten (WCAG 2.2, BITV). Wird nur konsumiert, nie geforkt, und läuft unter dem Präfix fink-*.'),
		color: 'var(--fink-color-danger)',
	},
];

export function Home() {
	const finkCount = catalog.filter((entry) => entry.layer === 'fink').length;
	const kolibriCount = catalog.filter((entry) => entry.layer === 'kolibri').length;
	return (
		<>
			<section className="hero" aria-labelledby="hero-title">
				<span style={{ justifySelf: 'start' }}>
					<FinkVersion _label={`${FINK_VERSION} · ${t('Prototyp')}`} />
				</span>
				<h1 id="hero-title">{t('Ein Design System auf dem Fundament von KoliBri.')}</h1>
				<p className="lead">
					{t(
						'Fink ergänzt die barrierefreien KoliBri-Atome um Tokens, ein eigenes Theme, zusammengesetzte Komponenten und eine React-Schicht – ähnlich wie MUI oder Vuetify, aber ohne die Barrierefreiheit neu erfinden zu müssen.',
					)}
				</p>
				<div className="hero-actions">
					<FinkLinkButton _label={t('Komponenten ansehen')} _href="#/components" _variant="primary" _icons="codicon codicon-symbol-misc" />
					<FinkLinkButton _label={t('Gesamtkomposition öffnen')} _href="#/compositions" _variant="secondary" _icons="codicon codicon-play" />
					<FinkLinkButton _label={t('Mit MUI & Co. vergleichen')} _href="#/compare" _variant="tertiary" _icons="codicon codicon-graph" />
				</div>
			</section>

			<section className="section" aria-labelledby="facts">
				<h2 id="facts" className="visually-hidden">
					{t('Kennzahlen')}
				</h2>
				<FinkGrid _min="9.5rem">
					<FinkStatCard _label={t('Fink-Komposita')} _value={String(finkCount)} _icons="codicon codicon-extensions" />
					<FinkStatCard _label={t('KoliBri-Atome im Katalog')} _value={String(kolibriCount)} _icons="codicon codicon-symbol-misc" _tone="success" />
					<FinkStatCard _label={t('Design Tokens')} _value={String(Object.keys(tokens).length)} _icons="codicon codicon-symbol-color" _tone="warning" />
					<FinkStatCard
						_label={t('Abdeckung ggü. MUI, Vuetify & Co.')}
						_value={`${coverageOf('fink')} / ${benchmark.length}`}
						_icons="codicon codicon-graph"
						_tone="brand"
					/>
					<FinkStatCard _label={t('Farbschemata')} _value={t('Hell + Dunkel')} _icons="codicon codicon-color-mode" _tone="info" />
				</FinkGrid>
			</section>

			<section className="section" aria-label={t('Leitbild')}>
				<FinkQuote
					_quote={t('Gemeinsam machen wir HTML mit wiederverwendbaren Web Components barrierefrei.')}
					_label={t('Vision von Public UI – KoliBri')}
					_href="https://github.com/public-ui/kolibri"
					_variant="block"
				/>
				<p className="muted small">
					{t('Grundlage sind')} <FinkAbbr _label="Web Content Accessibility Guidelines">WCAG</FinkAbbr> 2.2 {t('und')}{' '}
					<FinkAbbr _label={t('Barrierefreie-Informationstechnik-Verordnung')}>BITV</FinkAbbr> 2.0.
				</p>
			</section>

			<section className="section" aria-label={t('Architektur')}>
				<FinkPageHeader
					_heading={t('Architektur in Schichten')}
					_description={t('Jede Schicht hat genau eine Aufgabe. KoliBri bleibt unverändert und wird als Abhängigkeit eingebunden.')}
					_level={2}
				/>
				<ol className="layers">
					{layers.map((layer) => (
						<li key={layer.name} className="layer" style={{ ['--layer-color' as string]: layer.color }}>
							<span>
								<code>{layer.name}</code>
								<br />
								<span className="muted small">{layer.pkg}</span>
							</span>
							<p>{layer.text}</p>
						</li>
					))}
				</ol>
			</section>

			<section className="section" aria-labelledby="start">
				<h2 id="start" className="section-title">
					{t('Schnellstart')}
				</h2>
				<p className="section-intro">
					{t('Ein Paket, ein Stylesheet, ein Provider: KoliBri wird mit dem Fink-Theme als fink-* registriert, alle Komponenten stehen bereit.')}
				</p>
				<CodeBlock
					label="Schnellstart"
					code={`pnpm add @fink-ui/react @public-ui/components

// main.tsx
import '@fink-ui/react/fink.css';
import { FinkProvider, FinkPageHeader, FinkButton } from '@fink-ui/react';
import { t } from '../i18n';

createRoot(root).render(
  <FinkProvider defaultColorScheme="system">
    <FinkPageHeader _heading="Meine Anwendung">
      <FinkButton slot="actions" _label="Los geht's" _variant="primary" />
    </FinkPageHeader>
  </FinkProvider>,
);`}
				/>
			</section>

			<section className="teaser" aria-labelledby="teaser-title">
				<div>
					<h2 id="teaser-title">{t('Alles zusammen: die Gesamtkomposition')}</h2>
					<p>
						{t(
							'Eine interaktive Fachanwendung zur Antragsverwaltung – App Shell, Kennzahlen, filterbare Tabelle, Detail-Drawer, mehrstufiger Antragsdialog mit Validierung, Toasts und Dark Mode.',
						)}
					</p>
					<a className="teaser-link" href="#/compositions">
						<span className="codicon codicon-play" aria-hidden="true"></span> {t('Komposition starten')}
					</a>
				</div>
				<div className="teaser-mock" aria-hidden="true">
					<div></div>
					<div className="mock-main">
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</section>
		</>
	);
}
