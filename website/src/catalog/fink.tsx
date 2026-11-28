import {
	FinkAppShell,
	FinkAvatar,
	FinkBreadcrumb,
	FinkButton,
	FinkEmptyState,
	FinkGrid,
	FinkNav,
	FinkPageHeader,
	FinkPanel,
	FinkStack,
	FinkStatCard,
	FinkStatus,
	FinkStepper,
} from '@fink-ui/react';
import { useState, type CSSProperties } from 'react';
import { t } from '../i18n';
import { Logo } from '../site/Logo';
import type { CatalogEntry } from './types';

const Box = ({ children, grow }: { children: string; grow?: boolean }) => (
	<div
		style={{
			flex: grow ? '1 1 auto' : undefined,
			padding: 'var(--fink-space-4)',
			borderRadius: 'var(--fink-radius-md)',
			background: 'var(--fink-color-secondary)',
			color: 'var(--fink-color-primary)',
			fontWeight: 600,
			textAlign: 'center',
		}}
	>
		{children}
	</div>
);

function StepperDemo() {
	const steps = [t('Antragsteller'), t('Vorhaben'), t('Finanzierung'), t('Prüfen & Absenden')];
	const [current, setCurrent] = useState(1);
	return (
		<FinkStack _gap="5">
			<FinkStepper _steps={steps} _current={current} _clickable onFinkStepChange={(event) => setCurrent(event.detail)} />
			<FinkStack _direction="row" _gap="2">
				<FinkButton
					_label={t('Zurück')}
					_icons="codicon codicon-arrow-left"
					_disabled={current === 0}
					_on={{ onClick: () => setCurrent((c) => Math.max(0, c - 1)) }}
				/>
				<FinkButton
					_label={current === steps.length - 1 ? t('Absenden') : t('Weiter')}
					_variant="primary"
					_disabled={current === steps.length}
					_on={{ onClick: () => setCurrent((c) => Math.min(steps.length, c + 1)) }}
				/>
			</FinkStack>
			<p className="muted small" aria-live="polite">
				{current === steps.length ? 'Alle Schritte abgeschlossen.' : `Aktueller Schritt: ${steps[current]}`}
			</p>
		</FinkStack>
	);
}

export const finkEntries: CatalogEntry[] = [
	{
		id: 'fink-app-shell',
		name: 'App Shell',
		tag: 'fink-app-shell',
		layer: 'fink',
		category: 'Layout',
		icon: 'codicon codicon-layout',
		summary: t('Anwendungsrahmen mit Kopfzeile, Hauptnavigation, Inhaltsbereich und Sprunglink. Unter 960 px wird die Navigation zum Panel.'),
		guidance: [
			t('Genau eine App Shell pro Anwendung verwenden.'),
			t('Die Hauptnavigation gehört in den Slot „nav“, globale Aktionen in den Slot „actions“.'),
			t('Escape schließt das mobile Navigationspanel, der Sprunglink führt direkt zum Inhalt.'),
		],
		demos: [
			{
				title: t('Rahmen mit Navigation'),
				plain: true,
				render: () => (
					<FinkAppShell
						_embedded
						_label={t('Bürgerportal')}
						style={
							{
								'--fink-app-shell-min-height': '24rem',
								border: '1px solid var(--fink-color-mute-variant)',
								borderRadius: 'var(--fink-radius-md)',
								overflow: 'clip',
							} as CSSProperties
						}
					>
						<Logo slot="brand" />
						<div slot="actions" className="header-tools">
							<FinkButton _label={t('Benachrichtigungen')} _hideLabel _icons="codicon codicon-bell" _variant="ghost" />
							<FinkAvatar _label={t('Erika Mustermann')} style={{ width: '2.25rem' }} />
						</div>
						<FinkNav
							slot="nav"
							_label={t('Bereiche')}
							_links={[
								{ _label: t('Übersicht'), _href: '#/components/fink-app-shell', _icons: 'codicon codicon-home', _active: true },
								{ _label: t('Anträge'), _href: '#/components/fink-app-shell', _icons: 'codicon codicon-files' },
								{ _label: t('Postfach'), _href: '#/components/fink-app-shell', _icons: 'codicon codicon-mail' },
							]}
						/>
						<FinkPageHeader _heading={t('Übersicht')} _description={t('Inhalt der Anwendung erscheint im Hauptbereich.')} _level={2} />
					</FinkAppShell>
				),
				code: `<FinkAppShell _label="Bürgerportal">
  <Logo slot="brand" />
  <div slot="actions">
    <FinkButton _label="Benachrichtigungen" _hideLabel _icons="codicon codicon-bell" _variant="ghost" />
  </div>
  <FinkNav slot="nav" _label="Bereiche" _links={links} />
  <FinkPageHeader _heading="Übersicht" />
</FinkAppShell>`,
			},
		],
	},
	{
		id: 'fink-page-header',
		name: 'Page Header',
		tag: 'fink-page-header',
		layer: 'fink',
		category: 'Layout',
		icon: 'codicon codicon-symbol-text',
		summary: t('Seitenkopf mit Überschrift, Beschreibung, Brotkrumen, Metadaten und Seitenaktionen.'),
		guidance: [t('Pro Seite genau einen Page Header mit _level 1 einsetzen.'), t('Höchstens eine primäre Aktion im Slot „actions“.')],
		demos: [
			{
				title: t('Mit Brotkrumen, Status und Aktionen'),
				render: () => (
					<FinkPageHeader
						_heading={t('Antrag FD-2026-0142')}
						_description={t('Förderprogramm Digitalisierung im Mittelstand · eingegangen am 03.11.2026')}
						_level={2}
					>
						<FinkBreadcrumb
							slot="breadcrumb"
							_label={t('Brotkrumen')}
							_links={[
								{ _label: t('Start'), _href: '#/' },
								{ _label: t('Anträge'), _href: '#/components' },
								{ _label: t('FD-2026-0142'), _href: '#/components/fink-page-header' },
							]}
						/>
						<FinkStatus slot="meta" _label={t('In Prüfung')} _tone="info" />
						<FinkStatus slot="meta" _label={t('Frist: 21.11.2026')} _tone="warning" />
						<FinkButton slot="actions" _label={t('Rückfrage stellen')} _icons="codicon codicon-comment" />
						<FinkButton slot="actions" _label={t('Bewilligen')} _variant="primary" _icons="codicon codicon-check" />
					</FinkPageHeader>
				),
				code: `<FinkPageHeader _heading="Antrag FD-2026-0142" _description="…">
  <FinkBreadcrumb slot="breadcrumb" _label="Brotkrumen" _links={links} />
  <FinkStatus slot="meta" _label="In Prüfung" _tone="info" />
  <FinkButton slot="actions" _label="Rückfrage stellen" />
  <FinkButton slot="actions" _label="Bewilligen" _variant="primary" />
</FinkPageHeader>`,
			},
		],
	},
	{
		id: 'fink-stat-card',
		name: 'Stat Card',
		tag: 'fink-stat-card',
		layer: 'fink',
		category: 'Daten',
		icon: 'codicon codicon-graph',
		summary: t('Kennzahl-Kachel mit Wert, Trend und Icon. Der Trend wird für Screenreader ausgeschrieben.'),
		guidance: [
			t('_trendInverted setzen, wenn ein Anstieg schlecht ist (z. B. Bearbeitungsdauer).'),
			t('Werte bereits formatiert übergeben (Tausenderpunkte, Einheit).'),
		],
		demos: [
			{
				title: t('Kennzahlen im Raster'),
				render: () => (
					<FinkGrid _min="14rem">
						<FinkStatCard _label={t('Offene Anträge')} _value="128" _trend={12.5} _trendLabel={t('ggü. Vormonat')} _icons="codicon codicon-inbox" />
						<FinkStatCard
							_label={t('Bewilligt')}
							_value="1,84 Mio. €"
							_trend={4.2}
							_trendLabel={t('ggü. Vormonat')}
							_icons="codicon codicon-pass"
							_tone="success"
						/>
						<FinkStatCard
							_label={t('Ø Bearbeitungszeit')}
							_value="9,3 Tage"
							_trend={-8}
							_trendLabel={t('ggü. Vormonat')}
							_trendInverted
							_icons="codicon codicon-watch"
							_tone="warning"
						/>
					</FinkGrid>
				),
				code: `<FinkGrid _min="14rem">
  <FinkStatCard _label="Offene Anträge" _value="128" _trend={12.5} _trendLabel="ggü. Vormonat" _icons="codicon codicon-inbox" />
  <FinkStatCard _label="Bewilligt" _value="1,84 Mio. €" _trend={4.2} _tone="success" _icons="codicon codicon-pass" />
  <FinkStatCard _label="Ø Bearbeitungszeit" _value="9,3 Tage" _trend={-8} _trendInverted _tone="warning" _icons="codicon codicon-watch" />
</FinkGrid>`,
			},
		],
	},
	{
		id: 'fink-status',
		name: 'Status',
		tag: 'fink-status',
		layer: 'fink',
		category: 'Feedback',
		icon: 'codicon codicon-circle-filled',
		summary: t('Statusanzeige mit semantischem Farbton. Text und Punktform tragen die Information, nicht nur die Farbe.'),
		demos: [
			{
				title: t('Alle Töne'),
				render: () => (
					<FinkStack _direction="row" _gap="3">
						<FinkStatus _label={t('Neu')} _tone="brand" />
						<FinkStatus _label={t('In Prüfung')} _tone="info" />
						<FinkStatus _label={t('Bewilligt')} _tone="success" />
						<FinkStatus _label={t('Rückfrage')} _tone="warning" />
						<FinkStatus _label={t('Abgelehnt')} _tone="danger" />
						<FinkStatus _label={t('Archiviert')} _tone="neutral" />
					</FinkStack>
				),
				code: `<FinkStatus _label="Neu" _tone="brand" />
<FinkStatus _label="In Prüfung" _tone="info" />
<FinkStatus _label="Bewilligt" _tone="success" />
<FinkStatus _label="Rückfrage" _tone="warning" />
<FinkStatus _label="Abgelehnt" _tone="danger" />
<FinkStatus _label="Archiviert" _tone="neutral" />`,
			},
		],
	},
	{
		id: 'fink-empty-state',
		name: 'Empty State',
		tag: 'fink-empty-state',
		layer: 'fink',
		category: 'Feedback',
		icon: 'codicon codicon-search',
		summary: t('Leerzustand für leere Listen und Suchergebnisse – erklärt den Grund und bietet einen Ausweg.'),
		guidance: [t('Immer eine Handlung anbieten, die aus dem Leerzustand herausführt.')],
		demos: [
			{
				title: t('Keine Suchergebnisse'),
				render: () => (
					<FinkEmptyState
						_heading={t('Keine Anträge gefunden')}
						_description={t('Für „Musterstadt“ mit Status „Bewilligt“ gibt es keine Treffer. Passe die Filter an oder setze sie zurück.')}
						_level={3}
					>
						<FinkButton _label={t('Filter zurücksetzen')} _variant="primary" />
						<FinkButton _label={t('Neuen Antrag anlegen')} _icons="codicon codicon-add" />
					</FinkEmptyState>
				),
				code: `<FinkEmptyState _heading="Keine Anträge gefunden" _description="…">
  <FinkButton _label="Filter zurücksetzen" _variant="primary" />
</FinkEmptyState>`,
			},
		],
	},
	{
		id: 'fink-stepper',
		name: 'Stepper',
		tag: 'fink-stepper',
		layer: 'fink',
		category: 'Navigation',
		icon: 'codicon codicon-list-ordered',
		summary: t('Fortschrittsanzeige für mehrstufige Abläufe. Abgeschlossene Schritte sind optional anklickbar.'),
		guidance: [t('3–6 Schritte mit kurzen Bezeichnungen.'), t('Der aktuelle Schritt ist mit aria-current="step" ausgezeichnet.')],
		demos: [
			{
				title: t('Interaktiver Ablauf'),
				render: () => <StepperDemo />,
				code: `const [current, setCurrent] = useState(1);

<FinkStepper
  _steps={['Antragsteller', 'Vorhaben', 'Finanzierung', 'Prüfen & Absenden']}
  _current={current}
  _clickable
  onFinkStepChange={(event) => setCurrent(event.detail)}
/>`,
			},
		],
	},
	{
		id: 'fink-panel',
		name: 'Panel',
		tag: 'fink-panel',
		layer: 'fink',
		category: 'Inhalt',
		icon: 'codicon codicon-window',
		summary: t('Benannter Inhaltsabschnitt mit Überschrift, Aktionen und Fußzeile. Mit _flush randlos für Tabellen.'),
		demos: [
			{
				title: t('Panel mit Aktionen und Fußzeile'),
				render: () => (
					<FinkPanel _heading={t('Ansprechpersonen')} _description={t('Zuständig für Rückfragen zu diesem Antrag')} _level={3}>
						<FinkButton slot="actions" _label={t('Bearbeiten')} _icons="codicon codicon-edit" _variant="tertiary" />
						<FinkStack _gap="3">
							<FinkStack _direction="row" _align="center" _gap="3">
								<FinkAvatar _label={t('Jonas Weber')} style={{ width: '2.5rem' }} />
								<span>
									<strong>{t('Jonas Weber')}</strong>
									<br />
									<span className="muted small">{t('Sachbearbeitung, Referat 4')}</span>
								</span>
							</FinkStack>
						</FinkStack>
						<span slot="footer">{t('Zuletzt aktualisiert vor 2 Stunden')}</span>
					</FinkPanel>
				),
				code: `<FinkPanel _heading="Ansprechpersonen" _description="…">
  <FinkButton slot="actions" _label="Bearbeiten" _variant="tertiary" />
  …Inhalt…
  <span slot="footer">Zuletzt aktualisiert vor 2 Stunden</span>
</FinkPanel>`,
			},
		],
	},
	{
		id: 'fink-stack',
		name: 'Stack',
		tag: 'fink-stack',
		layer: 'fink',
		category: 'Layout',
		icon: 'codicon codicon-layers',
		summary: t('Layout-Primitive für vertikale und horizontale Anordnung mit Abständen aus dem Spacing-Raster.'),
		demos: [
			{
				title: t('Vertikal und horizontal'),
				render: () => (
					<FinkStack _gap="5">
						<FinkStack _gap="2">
							<Box>_gap="2"</Box>
							<Box>{t('vertikal')}</Box>
						</FinkStack>
						<FinkStack _direction="row" _gap="4" _align="center">
							<Box>{t('horizontal')}</Box>
							<Box grow>_gap="4"</Box>
							<Box>{t('umbrechend')}</Box>
						</FinkStack>
					</FinkStack>
				),
				code: `<FinkStack _gap="2">…</FinkStack>
<FinkStack _direction="row" _gap="4" _align="center">…</FinkStack>`,
			},
		],
	},
	{
		id: 'fink-grid',
		name: 'Grid',
		tag: 'fink-grid',
		layer: 'fink',
		category: 'Layout',
		icon: 'codicon codicon-table',
		summary: t('Responsives Raster ohne Breakpoints: so viele Spalten, wie bei der Mindestbreite passen.'),
		demos: [
			{
				title: t('Auto-Fit mit _min="10rem"'),
				render: () => (
					<FinkGrid _min="10rem" _gap="3">
						{['Eins', 'Zwei', 'Drei', 'Vier', t('Fünf'), 'Sechs'].map((label) => (
							<Box key={label}>{label}</Box>
						))}
					</FinkGrid>
				),
				code: `<FinkGrid _min="10rem" _gap="3">
  {items.map((item) => <Tile key={item.id} {...item} />)}
</FinkGrid>`,
			},
		],
	},
];
