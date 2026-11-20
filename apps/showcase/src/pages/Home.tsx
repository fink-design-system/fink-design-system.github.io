import {
	FinkGrid,
	FinkPageHeader,
	FinkStatCard,
	KolAbbr,
	KolLinkButton,
	KolQuote,
	KolVersion,
	tokens,
} from '@fink/react';
import { catalog } from '../catalog';
import { benchmark, coverageOf } from '../catalog/benchmark';
import { CodeBlock } from '../site/CodeBlock';
import { t } from '../i18n';

const layers = [
	{ name: t('Anwendung'), pkg: 'React · Vue · Angular', text: t('Eure Fachanwendung. Nutzt nur die oberste Schicht.'), color: 'var(--fink-color-subtle)' },
	{ name: '@fink/react', pkg: t('Framework-Schicht'), text: t('FinkProvider, useFink, useToast und generierte React-Wrapper – plus Re-Export aller KoliBri-Komponenten.'), color: 'var(--fink-color-info)' },
	{ name: '@fink/components', pkg: t('Komposita (Stencil)'), text: t('fink-* Web Components wie App Shell, Stepper oder Stat Card. Intern aus KoliBri-Atomen gebaut.'), color: 'var(--fink-color-primary)' },
	{ name: '@fink/theme', pkg: t('KoliBri-Theme'), text: t('Erweitert @public-ui/theme-default um Fink-Overrides und registriert KoliBri.'), color: 'var(--fink-color-warning)' },
	{ name: '@fink/tokens', pkg: t('Design Tokens'), text: t('Single Source of Truth: Farben (light/dark), Typo, Spacing, Radien, Elevation → CSS, JS, Typen.'), color: 'var(--fink-color-success)' },
	{ name: '@public-ui/components', pkg: t('KoliBri-Atome'), text: t('Barrierefreie Basiskomponenten (WCAG 2.2, BITV). Wird nur konsumiert, nie geforkt.'), color: 'var(--fink-color-danger)' },
];

export function Home() {
	const finkCount = catalog.filter((entry) => entry.layer === 'fink').length;
	const kolibriCount = catalog.filter((entry) => entry.layer === 'kolibri').length;
	return (
		<>
			<section className="hero" aria-labelledby="hero-title">
				<span style={{ justifySelf: 'start' }}>
					<KolVersion _label={t('0.1.0 · Prototyp')} />
				</span>
				<h1 id="hero-title">{t('Ein Design System auf dem Fundament von KoliBri.')}</h1>
				<p className="lead">
					{t('Fink ergänzt die barrierefreien KoliBri-Atome um Tokens, ein eigenes Theme, zusammengesetzte Komponenten und eine React-Schicht – ähnlich wie MUI oder Vuetify, aber ohne die Barrierefreiheit neu erfinden zu müssen.')}
				</p>
				<div className="hero-actions">
					<KolLinkButton _label={t('Komponenten ansehen')} _href="#/components" _variant="primary" _icons="codicon codicon-symbol-misc" />
					<KolLinkButton _label={t('Gesamtkomposition öffnen')} _href="#/compositions" _variant="secondary" _icons="codicon codicon-play" />
					<KolLinkButton _label={t('Mit MUI & Co. vergleichen')} _href="#/compare" _variant="tertiary" _icons="codicon codicon-graph" />
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
					<FinkStatCard _label={t('Abdeckung ggü. MUI, Vuetify & Co.')} _value={`${coverageOf('fink')} / ${benchmark.length}`} _icons="codicon codicon-graph" _tone="brand" />
					<FinkStatCard _label={t('Farbschemata')} _value={t('Hell + Dunkel')} _icons="codicon codicon-color-mode" _tone="info" />
				</FinkGrid>
			</section>

			<section className="section" aria-label={t('Leitbild')}>
				<KolQuote
					_quote={t('Gemeinsam machen wir HTML mit wiederverwendbaren Web Components barrierefrei.')}
					_label={t('Vision von Public UI – KoliBri')}
					_href="https://github.com/public-ui/kolibri"
					_variant="block"
				/>
				<p className="muted small">
					{t('Grundlage sind')} <KolAbbr _label="Web Content Accessibility Guidelines">WCAG</KolAbbr> 2.2 {t('und')}{' '}
					<KolAbbr _label={t('Barrierefreie-Informationstechnik-Verordnung')}>BITV</KolAbbr> 2.0.
				</p>
			</section>

			<section className="section" aria-label={t('Architektur')}>
				<FinkPageHeader _heading={t('Architektur in Schichten')} _description={t('Jede Schicht hat genau eine Aufgabe. KoliBri bleibt unverändert und wird als Abhängigkeit eingebunden.')} _level={2} />
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
				<p className="section-intro">{t('Ein Paket, ein Provider: KoliBri wird mit dem Fink-Theme registriert, Tokens werden geladen, alle Komponenten stehen bereit.')}</p>
				<CodeBlock
					label="Schnellstart"
					code={`pnpm add @fink/react @public-ui/components

// main.tsx
import '@fink/tokens/tokens.css';
import { FinkProvider, FinkPageHeader, KolButton } from '@fink/react';
import { t } from '../i18n';

createRoot(root).render(
  <FinkProvider defaultColorScheme="system">
    <FinkPageHeader _heading="Meine Anwendung">
      <KolButton slot="actions" _label="Los geht's" _variant="primary" />
    </FinkPageHeader>
  </FinkProvider>,
);`}
				/>
			</section>

			<section className="teaser" aria-labelledby="teaser-title">
				<div>
					<h2 id="teaser-title">{t('Alles zusammen: die Gesamtkomposition')}</h2>
					<p>
						{t('Eine interaktive Fachanwendung zur Antragsverwaltung – App Shell, Kennzahlen, filterbare Tabelle, Detail-Drawer, mehrstufiger Antragsdialog mit Validierung, Toasts und Dark Mode.')}
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
