import { useState, type CSSProperties } from 'react';
import {
	FinkAppShell,
	FinkBottomNav,
	FinkFooter,
	FinkMenu,
	FinkPageHeader,
	FinkStack,
	FinkStepper,
	KolBreadcrumb,
	KolButton,
	KolNav,
	KolPagination,
	KolPopoverButton,
	KolSplitButton,
	KolTabs,
	KolTree,
	KolTreeItem,
	KolVersion,
	useToast,
} from '@fink/react';
import type { PatternDefinition } from './types';
import { t } from '../i18n';

const frame: CSSProperties = { border: '1px solid var(--fink-color-mute-variant)', borderRadius: 'var(--fink-radius-md)', overflow: 'clip' };

function AccountMenu() {
	return (
		<KolPopoverButton _label={t('Konto von Erika Mustermann')} _hideLabel _icons="codicon codicon-account" _variant="ghost" _popoverAlign="bottom">
			<div className="menu" role="group" aria-label={t('Kontomenü')}>
				<p className="menu-head">
					<strong>{t('Erika Mustermann')}</strong>
					<br />
					<span className="muted small">{t('erika@beispiel.de')}</span>
				</p>
				<KolButton _label={t('Profil')} _icons="codicon codicon-person" _variant="ghost" />
				<KolButton _label={t('Einstellungen')} _icons="codicon codicon-settings-gear" _variant="ghost" />
				<KolButton _label={t('Abmelden')} _icons="codicon codicon-sign-out" _variant="ghost" />
			</div>
		</KolPopoverButton>
	);
}

function AppBarDemo() {
	return (
		<div style={frame}>
			<FinkAppShell _label={t('Bürgerportal')} style={{ '--fink-app-shell-min-height': '22rem' } as CSSProperties}>
				<span slot="brand" className="brand-mark" aria-hidden="true">
					<span className="codicon codicon-home"></span>
				</span>
				<div slot="actions" className="header-tools">
					<KolButton _label={t('Suche')} _hideLabel _icons="codicon codicon-search" _variant="ghost" />
					<KolVersion _label="2.4.1" className="header-version" />
					<KolButton _label={t('Benachrichtigungen (3 neu)')} _hideLabel _icons="codicon codicon-bell-dot" _variant="ghost" />
					<AccountMenu />
				</div>
				<KolNav
					slot="nav"
					_label={t('Bereiche')}
					_hasIconsWhenExpanded
					_links={[
						{ _label: t('Übersicht'), _href: '#/patterns/app-bar', _icons: 'codicon codicon-home', _active: true },
						{ _label: t('Anträge'), _href: '#/patterns/app-bar', _icons: 'codicon codicon-files' },
					]}
				/>
				<FinkPageHeader _heading={t('Übersicht')} _level={2} _description={t('Kopfzeile, Navigation, Inhalt und Footer bilden den Rahmen.')} />
				<FinkFooter slot="footer" _legal={[{ label: t('Impressum'), href: '#/patterns/app-bar' }, { label: t('Datenschutz'), href: '#/patterns/app-bar' }, { label: t('Barrierefreiheit'), href: '#/patterns/app-bar' }]} _copyright={t('© 2026 Musterbehörde')} />
			</FinkAppShell>
		</div>
	);
}

const NAV_LINKS = [
	{ _label: t('Dashboard'), _href: '#/patterns/nav-drawer', _icons: 'codicon codicon-dashboard', _active: true },
	{
		_label: t('Anträge'),
		_icons: 'codicon codicon-files',
		_children: [
			{ _label: t('Offen'), _href: '#/patterns/nav-drawer' },
			{ _label: t('Archiv'), _href: '#/patterns/nav-drawer' },
		],
	},
	{ _label: t('Postfach'), _href: '#/patterns/nav-drawer', _icons: 'codicon codicon-mail' },
	{ _label: t('Einstellungen'), _href: '#/patterns/nav-drawer', _icons: 'codicon codicon-settings-gear' },
];

function TabsDemo() {
	const [selected, setSelected] = useState(0);
	return (
		<KolTabs
			_label={t('Antragsdetails')}
			_selected={selected}
			_on={{ onSelect: (_e, index) => setSelected(Number(index)) }}
			_tabs={[
				{ _label: t('Übersicht'), _icons: 'codicon codicon-home' },
				{ _label: t('Dokumente (3)'), _icons: 'codicon codicon-file' },
				{ _label: t('Verlauf'), _icons: 'codicon codicon-history' },
			]}
		>
			<div className="tab-panel">{t('Stammdaten, Fördersumme und Ansprechperson.')}</div>
			<div className="tab-panel">{t('Drei Nachweise als PDF.')}</div>
			<div className="tab-panel">{t('Eingang am 03.11., Rückfrage am 05.11., Bewilligung am 13.11.')}</div>
		</KolTabs>
	);
}

function PaginationDemo() {
	const [page, setPage] = useState(3);
	const total = 248;
	const size = 20;
	return (
		<FinkStack _gap="3">
			<p className="muted small" aria-live="polite">
				{t('Einträge {{from}}–{{to}} von {{total}}', { from: (page - 1) * size + 1, to: Math.min(page * size, total), total })}
			</p>
			<KolPagination _label={t('Seiten der Ergebnisliste')} _page={page} _max={total} _pageSize={size} _siblingCount={1} _on={{ onChangePage: (_e, value) => setPage(Number(value)) }} />
		</FinkStack>
	);
}

function StepperDemo() {
	const steps = ['Konto', 'Angaben', 'Nachweise', t('Prüfen')];
	const [current, setCurrent] = useState(2);
	return (
		<FinkStack _gap="4">
			<FinkStepper _steps={steps} _current={current} _clickable onFinkStepChange={(e) => setCurrent(e.detail)} />
			<FinkStack _direction="row" _gap="2">
				<KolButton _label={t('Zurück')} _disabled={current === 0} _on={{ onClick: () => setCurrent((c) => Math.max(0, c - 1)) }} />
				<KolButton _label={t('Weiter')} _variant="primary" _disabled={current >= steps.length - 1} _on={{ onClick: () => setCurrent((c) => c + 1) }} />
			</FinkStack>
		</FinkStack>
	);
}

function BottomNavDemo() {
	const [value, setValue] = useState('home');
	return (
		<div style={{ ...frame, maxWidth: '24rem', marginInline: 'auto' }}>
			<div style={{ padding: 'var(--fink-space-7) var(--fink-space-4)', textAlign: 'center' }}>
				<strong>{{ home: 'Start', search: 'Suche', inbox: 'Postfach', profile: 'Profil' }[value]}</strong>
			</div>
			<FinkBottomNav
				_value={value}
				onFinkChange={(e) => setValue(e.detail)}
				_items={[
					{ id: 'home', label: t('Start'), icon: 'codicon codicon-home' },
					{ id: 'search', label: t('Suche'), icon: 'codicon codicon-search' },
					{ id: 'inbox', label: t('Postfach'), icon: 'codicon codicon-mail', badge: 2 },
					{ id: 'profile', label: t('Profil'), icon: 'codicon codicon-account' },
				]}
			/>
		</div>
	);
}

function MenuDemo() {
	const toast = useToast();
	return (
		<FinkStack _direction="row" _gap="4" _align="center">
			<KolSplitButton _label={t('Speichern')} _variant="primary" _on={{ onClick: () => toast.show({ type: 'success', label: t('Gespeichert') }) }}>
				<div className="menu">
					<KolButton _label={t('Als Entwurf speichern')} _variant="ghost" _on={{ onClick: () => toast.show({ type: 'info', label: t('Entwurf gespeichert') }) }} />
					<KolButton _label={t('Speichern und schließen')} _variant="ghost" />
				</div>
			</KolSplitButton>
			<FinkMenu
				_label={t('Weitere Aktionen')}
				_hideLabel
				_icons="codicon codicon-kebab-vertical"
				_variant="tertiary"
				_items={[
					{ id: 'duplicate', label: t('Duplizieren'), icon: 'codicon codicon-copy' },
					{ id: 'export', label: t('Exportieren'), icon: 'codicon codicon-export' },
					{ type: 'divider' },
					{ id: 'delete', label: t('Löschen'), icon: 'codicon codicon-trash', danger: true },
				]}
				onFinkSelect={(e) => toast.show({ type: 'info', label: t('Gewählt: {{view}}', { view: e.detail }) })}
			/>
			<AccountMenu />
		</FinkStack>
	);
}

export const navigationPatterns: PatternDefinition[] = [
	{
		id: 'app-bar',
		number: 1,
		title: t('App Bar & Anwendungsrahmen'),
		category: 'Navigation & Struktur',
		icon: 'codicon codicon-layout',
		summary: t('Kopfzeile mit Marke, globalen Aktionen und Kontomenü, dazu Navigation, Inhalt und Footer.'),
		problem: t('Nutzende brauchen auf jeder Seite Orientierung (wo bin ich, wer bin ich) und denselben Zugang zu globalen Funktionen.'),
		when: [t('Jede Anwendung mit mehr als einer Seite.'), 'Globale Aktionen wie Suche, Benachrichtigungen, Konto.'],
		avoid: [t('Seitenspezifische Aktionen in die App Bar legen – sie gehören in den Page Header.')],
		components: ['fink-app-shell', 'kol-nav', 'kol-popover-button', 'kol-button', 'kol-version', 'fink-footer'],
		a11y: ['Sprunglink „Zum Inhalt springen“ als erstes fokussierbares Element.', 'Landmarks: header, nav (benannt), main, footer.', t('Icon-Buttons haben ein Label, das als Tooltip erscheint.')],
		sources: [
			{ system: 'Material 3', name: 'Top app bar' },
			{ system: 'MUI', name: 'App Bar' },
			{ system: 'Vuetify', name: 'v-app-bar / v-app' },
			{ system: 'Carbon', name: 'Global header' },
		],
		plain: true,
		demo: () => <AppBarDemo />,
		code: {
			react: `<FinkAppShell _label="Bürgerportal">
  <Logo slot="brand" />
  <div slot="actions">
    <KolButton _label="Suche" _hideLabel _icons="codicon codicon-search" _variant="ghost" />
    <KolPopoverButton _label="Konto" _hideLabel _icons="codicon codicon-account" _variant="ghost">
      <KolButton _label="Abmelden" _variant="ghost" />
    </KolPopoverButton>
  </div>
  <KolNav slot="nav" _label="Bereiche" _links={links} />
  <FinkPageHeader _heading="Übersicht" />
  <FinkFooter slot="footer" _legal={legal} />
</FinkAppShell>`,
			html: `<fink-app-shell _label="Bürgerportal">
  <img slot="brand" src="logo.svg" alt="" />
  <kol-button slot="actions" _label="Suche" _hide-label _icons="codicon codicon-search"></kol-button>
  <kol-nav slot="nav" _label="Bereiche"></kol-nav>
  <fink-page-header _heading="Übersicht"></fink-page-header>
</fink-app-shell>`,
		},
	},
	{
		id: 'nav-drawer',
		number: 2,
		title: t('Navigation Drawer & Rail'),
		category: 'Navigation & Struktur',
		icon: 'codicon codicon-layout-sidebar-left',
		summary: t('Seitliche Hauptnavigation mit Untermenüs, die sich zur Icon-Leiste (Rail) einklappen lässt.'),
		problem: t('Viele gleichrangige Bereiche müssen dauerhaft erreichbar sein, ohne Inhaltsfläche zu verschwenden.'),
		when: [t('5 oder mehr Hauptbereiche.'), t('Zweite Navigationsebene nötig.'), t('Desktop und Tablet.')],
		avoid: [t('Auf Smartphones – dort Bottom Navigation oder ausklappbares Panel nutzen.')],
		components: ['kol-nav', 'kol-tree', 'fink-app-shell'],
		a11y: [t('Aktive Seite mit aria-current kennzeichnen (KolNav: _active).'), t('Im eingeklappten Zustand bleiben die Labels als Tooltip und für Screenreader erhalten.')],
		sources: [
			{ system: 'Material 3', name: 'Navigation drawer / Navigation rail' },
			{ system: 'MUI', name: 'Drawer' },
			{ system: 'Vuetify', name: 'v-navigation-drawer (rail)' },
		],
		demo: () => (
			<div className="form-row">
				<KolNav _label={t('Hauptnavigation')} _links={NAV_LINKS} _hasCompactButton _hasIconsWhenExpanded _collapsible />
				<KolTree _label={t('Themenbaum')}>
					<KolTreeItem _label={t('Anträge')} _href="#/patterns/nav-drawer" _open>
						<KolTreeItem _label={t('Offen')} _href="#/patterns/nav-drawer" _active />
						<KolTreeItem _label={t('Archiv')} _href="#/patterns/nav-drawer" />
					</KolTreeItem>
					<KolTreeItem _label={t('Postfach')} _href="#/patterns/nav-drawer" />
				</KolTree>
			</div>
		),
		code: {
			react: `<KolNav
  _label="Hauptnavigation"
  _hasCompactButton
  _hasIconsWhenExpanded
  _collapsible
  _links={[
    { _label: 'Dashboard', _href: '#/', _icons: 'codicon codicon-dashboard', _active: true },
    { _label: 'Anträge', _icons: 'codicon codicon-files', _children: [
      { _label: 'Offen', _href: '#/open' },
      { _label: 'Archiv', _href: '#/archive' },
    ] },
  ]}
/>`,
			html: `<kol-nav _label="Hauptnavigation" _has-compact-button _collapsible></kol-nav>
<script type="module">
  document.querySelector('kol-nav')._links = [{ _label: 'Dashboard', _href: '#/' }];
</script>`,
		},
	},
	{
		id: 'bottom-nav',
		number: 3,
		title: t('Bottom Navigation'),
		category: 'Navigation & Struktur',
		icon: 'codicon codicon-layout-panel-justify',
		summary: t('Untere Leiste mit 3–5 Hauptzielen für mobile Ansichten, inklusive Zähler.'),
		problem: t('Auf Smartphones sind Ziele oben schwer erreichbar; die Hauptbereiche sollen mit dem Daumen bedienbar sein.'),
		when: [t('Mobile Ansichten mit 3–5 gleichrangigen Bereichen.')],
		avoid: ['Mehr als 5 Ziele.', 'Desktop-Layouts.'],
		components: ['fink-bottom-nav'],
		a11y: [t('nav mit Bezeichnung, aktives Ziel mit aria-current="page".'), t('Zähler werden als Text („3 neu“) vorgelesen.')],
		sources: [
			{ system: 'Material 3', name: 'Navigation bar' },
			{ system: 'MUI', name: 'Bottom Navigation' },
			{ system: 'Vuetify', name: 'v-bottom-navigation' },
		],
		demo: () => <BottomNavDemo />,
		code: {
			react: `<FinkBottomNav
  _value={tab}
  onFinkChange={(e) => setTab(e.detail)}
  _items={[
    { id: 'home', label: 'Start', icon: 'codicon codicon-home' },
    { id: 'inbox', label: 'Postfach', icon: 'codicon codicon-mail', badge: 2 },
    { id: 'profile', label: 'Profil', icon: 'codicon codicon-account' },
  ]}
/>`,
			html: `<fink-bottom-nav _value="home" _items='[{"id":"home","label":"Start","icon":"codicon codicon-home"}]'></fink-bottom-nav>`,
		},
	},
	{
		id: 'breadcrumbs',
		number: 4,
		title: t('Brotkrumen'),
		category: 'Navigation & Struktur',
		icon: 'codicon codicon-chevron-right',
		summary: t('Pfad zur aktuellen Seite in einer Hierarchie, kombiniert mit dem Seitenkopf.'),
		problem: t('In tiefen Hierarchien verlieren Nutzende die Orientierung und wollen schnell eine Ebene zurück.'),
		when: ['Ab drei Hierarchieebenen.', 'Detailseiten unterhalb von Listen.'],
		avoid: [t('Flache Anwendungen oder lineare Abläufe (dort Stepper).')],
		components: ['kol-breadcrumb', 'fink-page-header'],
		a11y: [t('nav mit Bezeichnung „Brotkrumen“; letzte Ebene ist die aktuelle Seite.')],
		sources: [
			{ system: 'MUI', name: 'Breadcrumbs' },
			{ system: 'Vuetify', name: 'v-breadcrumbs' },
			{ system: 'Carbon', name: 'Breadcrumb' },
			{ system: 'GOV.UK', name: 'Breadcrumbs' },
		],
		demo: () => (
			<FinkPageHeader _heading={t('Antrag FD-2026-0142')} _level={2} _description={t('Digitalisierung im Mittelstand')}>
				<KolBreadcrumb
					slot="breadcrumb"
					_label={t('Brotkrumen')}
					_links={[
						{ _label: t('Start'), _href: '#/patterns/breadcrumbs', _icons: 'codicon codicon-home', _hideLabel: true },
						{ _label: t('Anträge'), _href: '#/patterns/breadcrumbs' },
						{ _label: '2026', _href: '#/patterns/breadcrumbs' },
						{ _label: t('FD-2026-0142'), _href: '#/patterns/breadcrumbs' },
					]}
				/>
			</FinkPageHeader>
		),
		code: {
			react: `<FinkPageHeader _heading="Antrag FD-2026-0142">
  <KolBreadcrumb
    slot="breadcrumb"
    _label="Brotkrumen"
    _links={[
      { _label: 'Start', _href: '/', _icons: 'codicon codicon-home', _hideLabel: true },
      { _label: 'Anträge', _href: '/antraege' },
      { _label: 'FD-2026-0142', _href: '/antraege/0142' },
    ]}
  />
</FinkPageHeader>`,
			html: `<kol-breadcrumb _label="Brotkrumen"></kol-breadcrumb>`,
		},
	},
	{
		id: 'tabs',
		number: 5,
		title: t('Tabs'),
		category: 'Navigation & Struktur',
		icon: 'codicon codicon-browser',
		summary: t('Verwandte Inhalte auf derselben Seite in Registerkarten gliedern.'),
		problem: t('Viele zusammengehörige Informationen überfordern auf einer langen Seite.'),
		when: ['2–7 gleichrangige Ansichten desselben Objekts.'],
		avoid: [t('Inhalte, die verglichen werden müssen.'), 'Sequenzielle Schritte (Stepper verwenden).'],
		components: ['kol-tabs'],
		a11y: [t('Tastatur: Pfeiltasten zwischen Tabs, Tab in das Panel.'), 'Rollen tablist/tab/tabpanel liefert KoliBri.'],
		sources: [
			{ system: 'Material 3', name: 'Tabs' },
			{ system: 'MUI', name: 'Tabs' },
			{ system: 'Vuetify', name: 'v-tabs' },
			{ system: 'Carbon', name: 'Tabs' },
		],
		demo: () => <TabsDemo />,
		code: {
			react: `<KolTabs
  _label="Antragsdetails"
  _selected={selected}
  _on={{ onSelect: (_e, index) => setSelected(index) }}
  _tabs={[{ _label: 'Übersicht' }, { _label: 'Dokumente (3)' }, { _label: 'Verlauf' }]}
>
  <div>…</div>
  <div>…</div>
  <div>…</div>
</KolTabs>`,
			html: `<kol-tabs _label="Antragsdetails" _tabs='[{"_label":"Übersicht"},{"_label":"Verlauf"}]'>
  <div>…</div>
  <div>…</div>
</kol-tabs>`,
		},
	},
	{
		id: 'pagination',
		number: 6,
		title: t('Pagination'),
		category: 'Navigation & Struktur',
		icon: 'codicon codicon-ellipsis',
		summary: t('Große Ergebnismengen seitenweise durchblättern, mit Angabe des sichtbaren Bereichs.'),
		problem: t('Hunderte Einträge auf einmal laden langsam und überfordern.'),
		when: [t('Listen und Tabellen mit mehr als ca. 25 Einträgen.')],
		avoid: [t('Feeds, bei denen die Position egal ist (dort „Mehr laden“).')],
		components: ['kol-pagination'],
		a11y: [t('Bereichsangabe („Einträge 41–60 von 248“) als Live-Region.'), t('Aktuelle Seite mit aria-current.')],
		sources: [
			{ system: 'MUI', name: 'Pagination / TablePagination' },
			{ system: 'Vuetify', name: 'v-pagination' },
			{ system: 'Carbon', name: 'Pagination' },
		],
		demo: () => <PaginationDemo />,
		code: {
			react: `<KolPagination
  _label="Seiten der Ergebnisliste"
  _page={page}
  _max={248}
  _pageSize={20}
  _on={{ onChangePage: (_e, value) => setPage(value) }}
/>`,
			html: `<kol-pagination _label="Seiten" _page="1" _max="248" _page-size="20"></kol-pagination>`,
		},
	},
	{
		id: 'stepper',
		number: 7,
		title: t('Stepper & Schritt-für-Schritt'),
		category: 'Navigation & Struktur',
		icon: 'codicon codicon-list-ordered',
		summary: t('Mehrstufige Abläufe mit Fortschritt und Rücksprung zu erledigten Schritten.'),
		problem: t('Lange Formulare schrecken ab; Nutzende wollen wissen, wie weit sie sind.'),
		when: ['3–6 aufeinander aufbauende Schritte.'],
		avoid: [t('Unabhängige Teilaufgaben in beliebiger Reihenfolge (dort Task List).')],
		components: ['fink-stepper', 'kol-button'],
		a11y: [t('Aktueller Schritt mit aria-current="step", Status je Schritt vorgelesen.')],
		sources: [
			{ system: 'MUI', name: 'Stepper' },
			{ system: 'Vuetify', name: 'v-stepper' },
			{ system: 'Carbon', name: 'Progress indicator' },
			{ system: 'GOV.UK', name: 'Step by step navigation' },
		],
		demo: () => <StepperDemo />,
		code: {
			react: `<FinkStepper
  _steps={['Konto', 'Angaben', 'Nachweise', 'Prüfen']}
  _current={current}
  _clickable
  onFinkStepChange={(e) => setCurrent(e.detail)}
/>`,
			html: `<fink-stepper _steps='["Konto","Angaben","Nachweise","Prüfen"]' _current="2" _clickable></fink-stepper>`,
		},
	},
	{
		id: 'menus',
		number: 8,
		title: t('Menüs & Aktionen'),
		category: 'Navigation & Struktur',
		icon: 'codicon codicon-kebab-vertical',
		summary: t('Sekundäre Aktionen in Menüs bündeln: Split Button, Überlaufmenü, Kontomenü.'),
		problem: t('Zu viele gleichzeitig sichtbare Aktionen machen die Oberfläche unruhig.'),
		when: [t('Eine Hauptaktion mit Varianten (Split Button).'), t('Seltene Aktionen pro Objekt (Überlaufmenü).')],
		avoid: [t('Die wichtigste Aktion im Menü verstecken.')],
		components: ['kol-split-button', 'fink-menu', 'kol-popover-button', 'kol-button'],
		a11y: [t('Menüs öffnen mit Enter/Leertaste, schließen mit Escape; der Fokus kehrt zum Auslöser zurück.')],
		sources: [
			{ system: 'Material 3', name: 'Menus' },
			{ system: 'MUI', name: 'Menu / Split button' },
			{ system: 'Vuetify', name: 'v-menu' },
			{ system: 'Carbon', name: 'Menu buttons (overflow menu)' },
		],
		demo: () => <MenuDemo />,
		code: {
			react: `<KolSplitButton _label="Speichern" _variant="primary" _on={{ onClick: save }}>
  <KolButton _label="Als Entwurf speichern" _variant="ghost" />
</KolSplitButton>

<FinkMenu
  _label="Weitere Aktionen"
  _hideLabel
  _icons="codicon codicon-kebab-vertical"
  _items={[
    { id: 'duplicate', label: 'Duplizieren', icon: 'codicon codicon-copy' },
    { type: 'divider' },
    { id: 'delete', label: 'Löschen', icon: 'codicon codicon-trash', danger: true },
  ]}
  onFinkSelect={(e) => run(e.detail)}
/>`,
			html: `<fink-menu _label="Weitere Aktionen" _hide-label _icons="codicon codicon-kebab-vertical"
  _items='[{"id":"duplicate","label":"Duplizieren"},{"type":"divider"},{"id":"delete","label":"Löschen","danger":true}]'></fink-menu>`,
		},
	},
];
