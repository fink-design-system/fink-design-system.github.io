import {
	FinkBottomNav,
	FinkButton,
	FinkChip,
	FinkCodeBlock,
	FinkConsentBanner,
	FinkFeedback,
	FinkFileUpload,
	FinkFooter,
	FinkRating,
	FinkResult,
	FinkSegmented,
	FinkSelectionBar,
	FinkSkeleton,
	FinkStack,
	FinkSummaryList,
	FinkTaskList,
	FinkTimeline,
	useToast,
} from '@fink-ui/react';
import { useState } from 'react';
import { t } from '../i18n';
import type { CatalogEntry } from './types';

const FILTERS = ['Digitalisierung', 'Klimaschutz', 'Kultur', 'Innovation'];

function ChipDemo() {
	const [active, setActive] = useState<string[]>(['Klimaschutz']);
	return (
		<FinkStack _gap="4">
			<FinkStack _direction="row" _gap="2">
				{FILTERS.map((label) => (
					<FinkChip
						key={label}
						_label={label}
						_selected={active.includes(label)}
						_count={label.length * 3}
						onFinkToggle={(event) => setActive((list) => (event.detail ? [...list, label] : list.filter((l) => l !== label)))}
					/>
				))}
			</FinkStack>
			<FinkStack _direction="row" _gap="2" _align="center">
				<span className="muted small">{t('Aktive Filter:')}</span>
				{active.length === 0 && <span className="muted small">{t('keine')}</span>}
				{active.map((label) => (
					<FinkChip key={label} _label={label} _removable onFinkRemove={() => setActive((list) => list.filter((l) => l !== label))} />
				))}
			</FinkStack>
		</FinkStack>
	);
}

function SelectionBarDemo() {
	const [count, setCount] = useState(3);
	return (
		<FinkStack _gap="3">
			<FinkSelectionBar _count={count} _itemLabel={t('Personen')} onFinkClear={() => setCount(0)}>
				<FinkButton _label={t('Exportieren')} _icons="codicon codicon-export" />
				<FinkButton _label={t('Deaktivieren')} _variant="danger" _icons="codicon codicon-circle-slash" />
			</FinkSelectionBar>
			{count === 0 && <FinkButton _label={t('Wieder 3 auswählen')} _on={{ onClick: () => setCount(3) }} />}
		</FinkStack>
	);
}

function UploadDemo() {
	const [files, setFiles] = useState<File[]>([]);
	return (
		<FinkStack _gap="3">
			<FinkFileUpload
				_label={t('Nachweise hochladen')}
				_hint={t('PDF, JPG oder PNG, höchstens 5 MB pro Datei')}
				_accept=".pdf,.jpg,.jpeg,.png"
				_maxSize={5 * 1024 * 1024}
				onFinkFilesChange={(event) => setFiles(event.detail)}
			/>
			<p className="muted small">{t('{{count}} gültige Datei(en) ausgewählt.', { count: files.length })}</p>
		</FinkStack>
	);
}

function SegmentedDemo() {
	const [view, setView] = useState('list');
	return (
		<FinkStack _gap="3">
			<FinkSegmented
				_label={t('Ansicht')}
				_value={view}
				_options={[
					{ value: 'list', label: t('Liste'), icon: 'codicon codicon-list-unordered' },
					{ value: 'cards', label: t('Kacheln'), icon: 'codicon codicon-layout' },
					{ value: 'table', label: t('Tabelle'), icon: 'codicon codicon-table' },
				]}
				onFinkChange={(event) => setView(event.detail)}
			/>
			<p className="muted small">{t('Gewählt: {{view}}', { view })}</p>
		</FinkStack>
	);
}

function RatingDemo() {
	const [value, setValue] = useState(4);
	return (
		<FinkStack _gap="4">
			<FinkRating _label={t('Wie zufrieden sind Sie mit dem Online-Antrag?')} _value={value} onFinkChange={(event) => setValue(event.detail)} />
			<FinkStack _direction="row" _gap="2" _align="center">
				<FinkRating _label={t('Durchschnitt')} _value={4} _readOnly />
				<span className="muted small">{t('4,0 aus 1.284 Bewertungen')}</span>
			</FinkStack>
		</FinkStack>
	);
}

function BottomNavDemo() {
	const [value, setValue] = useState('home');
	return (
		<div
			style={{
				maxWidth: '26rem',
				marginInline: 'auto',
				border: '1px solid var(--fink-color-mute-variant)',
				borderRadius: 'var(--fink-radius-lg)',
				overflow: 'clip',
			}}
		>
			<div style={{ padding: 'var(--fink-space-6)', textAlign: 'center' }} className="muted">
				Bereich: {value}
			</div>
			<FinkBottomNav
				_value={value}
				_items={[
					{ id: 'home', label: t('Start'), icon: 'codicon codicon-home' },
					{ id: 'search', label: t('Suche'), icon: 'codicon codicon-search' },
					{ id: 'inbox', label: t('Postfach'), icon: 'codicon codicon-mail', badge: 3 },
					{ id: 'profile', label: t('Profil'), icon: 'codicon codicon-account' },
				]}
				onFinkChange={(event) => setValue(event.detail)}
			/>
		</div>
	);
}

function ConsentDemo() {
	const toast = useToast();
	const [key, setKey] = useState(0);
	return (
		<FinkStack _gap="3">
			<FinkConsentBanner
				key={key}
				_position="inline"
				onFinkConsent={(event) => toast.show({ type: 'success', label: t('Auswahl gespeichert'), description: `Aktiv: ${event.detail.join(', ')}` })}
			/>
			<FinkButton _label={t('Banner erneut zeigen')} _icons="codicon codicon-refresh" _variant="tertiary" _on={{ onClick: () => setKey((k) => k + 1) }} />
		</FinkStack>
	);
}

function FeedbackDemo() {
	const [key, setKey] = useState(0);
	return (
		<FinkStack _gap="3">
			<FinkFeedback key={key} />
			<FinkButton _label={t('Zurücksetzen')} _variant="tertiary" _on={{ onClick: () => setKey((k) => k + 1) }} />
		</FinkStack>
	);
}

export const finkExtendedEntries: CatalogEntry[] = [
	{
		id: 'fink-chip',
		name: 'Chip',
		tag: 'fink-chip',
		layer: 'fink',
		category: 'Aktion',
		icon: 'codicon codicon-tag',
		summary: t('Filter- und Eingabe-Chip: umschaltbar (aria-pressed) oder entfernbar. Vorbild: Material Chips, MUI Chip, Vuetify v-chip.'),
		guidance: [
			t('Umschaltbare Chips für Filter, entfernbare Chips für aktive Auswahl.'),
			t('Chips nie als einzige Möglichkeit zum Zurücksetzen – zusätzlich „Alle Filter löschen“ anbieten.'),
		],
		demos: [
			{
				title: t('Filter- und Eingabe-Chips'),
				render: () => <ChipDemo />,
				code: {
					react: `const [active, setActive] = useState<string[]>([]);

<FinkChip
  _label="Klimaschutz"
  _count={12}
  _selected={active.includes('Klimaschutz')}
  onFinkToggle={(e) => toggle('Klimaschutz', e.detail)}
/>
<FinkChip _label="Klimaschutz" _removable onFinkRemove={() => remove('Klimaschutz')} />`,
					html: `<fink-chip _label="Klimaschutz" _count="12"></fink-chip>
<fink-chip _label="Klimaschutz" _removable></fink-chip>

<script type="module">
  document.querySelector('fink-chip').addEventListener('finkToggle', (e) => console.log(e.detail));
</script>`,
				},
			},
		],
	},
	{
		id: 'fink-selection-bar',
		name: 'Selection Bar',
		tag: 'fink-selection-bar',
		layer: 'fink',
		category: 'Aktion',
		icon: 'codicon codicon-checklist',
		summary: t(
			'Leiste für Massenaktionen, sobald Elemente ausgewählt sind. Kündigt die Anzahl per Live-Region an. Vorbild: Carbon Batch actions, MUI Data Grid.',
		),
		demos: [
			{
				title: t('Massenaktionen'),
				render: () => <SelectionBarDemo />,
				code: {
					react: `<FinkSelectionBar _count={selected.length} _itemLabel="Personen" onFinkClear={() => setSelected([])}>
  <FinkButton _label="Exportieren" _icons="codicon codicon-export" />
  <FinkButton _label="Deaktivieren" _variant="danger" />
</FinkSelectionBar>`,
					html: `<fink-selection-bar _count="3" _item-label="Personen">
  <fink-button _label="Exportieren"></fink-button>
</fink-selection-bar>`,
				},
			},
		],
	},
	{
		id: 'fink-summary-list',
		name: 'Summary List',
		tag: 'fink-summary-list',
		layer: 'fink',
		category: 'Daten',
		icon: 'codicon codicon-list-flat',
		summary: t('Schlüssel-Wert-Liste für Detailansichten und „Antworten prüfen“ mit Ändern-Aktion pro Zeile. Vorbild: GOV.UK Summary list, MUI List.'),
		demos: [
			{
				title: t('Antworten prüfen'),
				render: () => (
					<FinkSummaryList
						_items={[
							{ key: t('Name'), value: 'Erika Mustermann', actionLabel: t('Ändern') },
							{ key: t('Geburtsdatum'), value: '12.03.1984', actionLabel: t('Ändern') },
							{ key: t('Anschrift'), value: 'Musterweg 4\n10115 Berlin', actionLabel: t('Ändern') },
							{ key: t('Kontakt'), value: 'erika@example.org' },
						]}
					/>
				),
				code: {
					react: `<FinkSummaryList
  _items={[
    { key: 'Name', value: 'Erika Mustermann', actionLabel: 'Ändern' },
    { key: 'Anschrift', value: 'Musterweg 4\\n10115 Berlin', actionLabel: 'Ändern' },
  ]}
  onFinkAction={(e) => goToQuestion(e.detail)}
/>`,
					html: `<fink-summary-list _items='[{"key":"Name","value":"Erika Mustermann","actionLabel":"Ändern"}]'></fink-summary-list>`,
				},
			},
		],
	},
	{
		id: 'fink-timeline',
		name: 'Timeline',
		tag: 'fink-timeline',
		layer: 'fink',
		category: 'Daten',
		icon: 'codicon codicon-history',
		summary: t('Chronologischer Verlauf mit Tönen und Icons. Vorbild: MUI Timeline, Vuetify v-timeline.'),
		demos: [
			{
				title: t('Bearbeitungsverlauf'),
				render: () => (
					<FinkTimeline
						_items={[
							{ title: t('Bescheid versendet'), date: '14.11.2026, 09:12', tone: 'success', icon: 'codicon codicon-mail' },
							{
								title: t('Antrag bewilligt'),
								date: '13.11.2026',
								description: t('durch Jonas Weber, Referat 4'),
								tone: 'success',
								icon: 'codicon codicon-check',
							},
							{ title: t('Rückfrage beantwortet'), date: '08.11.2026', tone: 'info' },
							{
								title: t('Rückfrage gestellt'),
								date: '05.11.2026',
								description: t('Nachweis zur Eigenbeteiligung fehlt'),
								tone: 'warning',
								icon: 'codicon codicon-comment',
							},
							{ title: t('Antrag eingegangen'), date: '03.11.2026', tone: 'brand' },
						]}
					/>
				),
				code: {
					react: `<FinkTimeline
  _items={[
    { title: 'Antrag bewilligt', date: '13.11.2026', tone: 'success', icon: 'codicon codicon-check' },
    { title: 'Rückfrage gestellt', date: '05.11.2026', description: '…', tone: 'warning' },
  ]}
/>`,
					html: `<fink-timeline _items='[{"title":"Antrag eingegangen","date":"03.11.2026"}]'></fink-timeline>`,
				},
			},
		],
	},
	{
		id: 'fink-skeleton',
		name: 'Skeleton',
		tag: 'fink-skeleton',
		layer: 'fink',
		category: 'Feedback',
		icon: 'codicon codicon-loading',
		summary: t('Platzhalter in der Form kommender Inhalte; respektiert reduzierte Bewegung. Vorbild: MUI Skeleton, Vuetify v-skeleton-loader.'),
		demos: [
			{
				title: t('Karte wird geladen'),
				render: () => (
					<FinkStack _direction="row" _gap="4" _align="start" _wrap={false}>
						<FinkSkeleton _variant="circle" _width="3.5rem" _label={t('Profil wird geladen')} />
						<div style={{ flex: 1 }}>
							<FinkSkeleton _lines={3} />
						</div>
					</FinkStack>
				),
				code: {
					react: `<FinkSkeleton _variant="circle" _width="3.5rem" _label="Profil wird geladen" />
<FinkSkeleton _lines={3} />
<FinkSkeleton _variant="rect" _height="10rem" />`,
					html: `<fink-skeleton _variant="circle" _width="3.5rem" _label="Profil wird geladen"></fink-skeleton>
<fink-skeleton _lines="3"></fink-skeleton>`,
				},
			},
		],
	},
	{
		id: 'fink-result',
		name: 'Result',
		tag: 'fink-result',
		layer: 'fink',
		category: 'Feedback',
		icon: 'codicon codicon-pass',
		summary: t('Ergebnisseiten: Bestätigung mit Vorgangsnummer, 404, Dienst nicht verfügbar, Fehler. Vorbild: GOV.UK Confirmation pages, Ant Design Result.'),
		demos: [
			{
				title: t('Bestätigung mit Vorgangsnummer'),
				render: () => (
					<FinkResult
						_variant="success"
						_heading={t('Antrag eingereicht')}
						_reference="FD-2026-0143"
						_description={t('Wir haben Ihnen eine Bestätigung per E-Mail gesendet. Die Bearbeitung dauert etwa 10 Arbeitstage.')}
						_level={3}
					>
						<FinkButton _label={t('Weiteren Antrag stellen')} _variant="primary" />
						<FinkButton _label={t('Zur Übersicht')} />
					</FinkResult>
				),
				code: {
					react: `<FinkResult _variant="success" _heading="Antrag eingereicht" _reference="FD-2026-0143" _description="…">
  <FinkButton _label="Zur Übersicht" />
</FinkResult>`,
					html: `<fink-result _variant="success" _heading="Antrag eingereicht" _reference="FD-2026-0143"></fink-result>`,
				},
			},
			{
				title: t('Seite nicht gefunden'),
				render: () => (
					<FinkResult
						_variant="not-found"
						_heading={t('Seite nicht gefunden')}
						_description={t('Wenn Sie die Adresse eingegeben haben, prüfen Sie die Schreibweise. Wenn Sie einem Link gefolgt sind, ist er womöglich veraltet.')}
						_level={3}
					>
						<FinkButton _label={t('Zur Startseite')} _variant="primary" />
					</FinkResult>
				),
				code: `<FinkResult _variant="not-found" _heading="Seite nicht gefunden" _description="…" />`,
			},
		],
	},
	{
		id: 'fink-footer',
		name: 'Footer',
		tag: 'fink-footer',
		layer: 'fink',
		category: 'Layout',
		icon: 'codicon codicon-layout-panel',
		summary: t('Seitenfuß mit Linkspalten und Pflichtangaben (Impressum, Datenschutz, Barrierefreiheit).'),
		demos: [
			{
				title: t('Footer mit Pflichtlinks'),
				plain: true,
				render: () => (
					<FinkFooter
						_columns={[
							{
								heading: t('Service'),
								links: [
									{ label: t('Kontakt'), href: '#/components/fink-footer' },
									{ label: t('Hilfe'), href: '#/components/fink-footer' },
								],
							},
							{
								heading: t('Über uns'),
								links: [
									{ label: t('Behörde'), href: '#/components/fink-footer' },
									{ label: t('Presse'), href: '#/components/fink-footer' },
								],
							},
						]}
						_legal={[
							{ label: t('Impressum'), href: '#/components/fink-footer' },
							{ label: t('Datenschutz'), href: '#/components/fink-footer' },
							{ label: t('Barrierefreiheit'), href: '#/components/fink-footer' },
							{ label: t('Leichte Sprache'), href: '#/components/fink-footer' },
						]}
						_copyright={t('© 2026 Musterbehörde')}
					>
						<strong slot="brand">{t('Musterbehörde')}</strong>
					</FinkFooter>
				),
				code: `<FinkFooter _columns={columns} _legal={legalLinks} _copyright="© 2026 Musterbehörde">
  <strong slot="brand">Musterbehörde</strong>
</FinkFooter>`,
			},
		],
	},
	{
		id: 'fink-file-upload',
		name: 'File Upload',
		tag: 'fink-file-upload',
		layer: 'fink',
		category: 'Formular',
		icon: 'codicon codicon-cloud-upload',
		summary: t(
			'Drag & Drop plus Auswahlschaltfläche, Dateiliste, Typ- und Größenprüfung mit Fehlermeldungen. Vorbild: Vuetify v-file-input, Carbon File uploader.',
		),
		guidance: [t('Erlaubte Formate und Größe immer im Hinweis nennen.'), t('Drag & Drop ist eine Abkürzung – die Schaltfläche bleibt der Hauptweg.')],
		demos: [
			{
				title: t('Nachweise hochladen'),
				render: () => <UploadDemo />,
				code: {
					react: `<FinkFileUpload
  _label="Nachweise hochladen"
  _hint="PDF, JPG oder PNG, höchstens 5 MB pro Datei"
  _accept=".pdf,.jpg,.jpeg,.png"
  _maxSize={5 * 1024 * 1024}
  onFinkFilesChange={(e) => setFiles(e.detail)}
/>`,
					html: `<fink-file-upload _label="Nachweise hochladen" _accept=".pdf,.png" _max-size="5242880"></fink-file-upload>`,
				},
			},
		],
	},
	{
		id: 'fink-task-list',
		name: 'Task List',
		tag: 'fink-task-list',
		layer: 'fink',
		category: 'Navigation',
		icon: 'codicon codicon-tasklist',
		summary: t('Aufgabenliste mit Fortschritt und Status je Teilaufgabe. Vorbild: GOV.UK „Complete multiple tasks“.'),
		demos: [
			{
				title: t('Antrag in Teilaufgaben'),
				render: () => (
					<FinkTaskList
						_tasks={[
							{ id: 'person', label: t('Persönliche Angaben'), status: 'done' },
							{ id: 'project', label: t('Vorhaben beschreiben'), status: 'in-progress', hint: t('Zuletzt bearbeitet vor 2 Tagen') },
							{ id: 'docs', label: t('Nachweise hochladen'), status: 'todo' },
							{ id: 'check', label: t('Antworten prüfen und absenden'), status: 'blocked' },
						]}
					/>
				),
				code: {
					react: `<FinkTaskList
  _tasks={[
    { id: 'person', label: 'Persönliche Angaben', status: 'done' },
    { id: 'docs', label: 'Nachweise hochladen', status: 'todo' },
    { id: 'check', label: 'Prüfen und absenden', status: 'blocked' },
  ]}
  onFinkTaskSelect={(e) => openTask(e.detail)}
/>`,
					html: `<fink-task-list _tasks='[{"id":"a","label":"Persönliche Angaben","status":"done"}]'></fink-task-list>`,
				},
			},
		],
	},
	{
		id: 'fink-consent-banner',
		name: 'Consent Banner',
		tag: 'fink-consent-banner',
		layer: 'fink',
		category: 'Feedback',
		icon: 'codicon codicon-shield',
		summary: t('Cookie-Einwilligung mit gleichwertigen Optionen und Einstellungen pro Kategorie. Vorbild: GOV.UK Cookie banner.'),
		guidance: [t('„Alle akzeptieren“ und „Nur notwendige“ gleichwertig gestalten (keine Dark Patterns).')],
		demos: [
			{
				title: t('Einwilligung'),
				render: () => <ConsentDemo />,
				code: {
					react: `<FinkConsentBanner onFinkConsent={(e) => saveConsent(e.detail)} />`,
					html: `<fink-consent-banner></fink-consent-banner>
<script type="module">
  document.querySelector('fink-consent-banner')
    .addEventListener('finkConsent', (e) => localStorage.setItem('consent', JSON.stringify(e.detail)));
</script>`,
				},
			},
		],
	},
	{
		id: 'fink-feedback',
		name: 'Feedback',
		tag: 'fink-feedback',
		layer: 'fink',
		category: 'Formular',
		icon: 'codicon codicon-thumbsup',
		summary: t('„War diese Seite hilfreich?“ mit Kommentar bei „Nein“ – kurzes Seitenfeedback ohne Kontaktformular.'),
		demos: [
			{
				title: t('Seitenfeedback'),
				render: () => <FeedbackDemo />,
				code: `<FinkFeedback onFinkFeedback={(e) => sendFeedback(e.detail)} />`,
			},
		],
	},
	{
		id: 'fink-rating',
		name: 'Rating',
		tag: 'fink-rating',
		layer: 'fink',
		category: 'Formular',
		icon: 'codicon codicon-star-full',
		summary: t('Sternebewertung als Radiogruppe, auch als reine Anzeige. Vorbild: MUI Rating, Vuetify v-rating.'),
		demos: [
			{
				title: t('Bewerten und anzeigen'),
				render: () => <RatingDemo />,
				code: {
					react: `<FinkRating _label="Wie zufrieden sind Sie?" _value={value} onFinkChange={(e) => setValue(e.detail)} />
<FinkRating _label="Durchschnitt" _value={4} _readOnly />`,
					html: `<fink-rating _label="Wie zufrieden sind Sie?" _value="4"></fink-rating>`,
				},
			},
		],
	},
	{
		id: 'fink-segmented',
		name: 'Segmented',
		tag: 'fink-segmented',
		layer: 'fink',
		category: 'Aktion',
		icon: 'codicon codicon-split-horizontal',
		summary: t('Segmentierte Einfachauswahl mit Pfeiltasten. Vorbild: Material Segmented button, MUI Toggle Button, Vuetify v-btn-toggle.'),
		demos: [
			{
				title: t('Ansicht umschalten'),
				render: () => <SegmentedDemo />,
				code: {
					react: `<FinkSegmented
  _label="Ansicht"
  _value={view}
  _options={[
    { value: 'list', label: 'Liste', icon: 'codicon codicon-list-unordered' },
    { value: 'cards', label: 'Kacheln', icon: 'codicon codicon-layout' },
  ]}
  onFinkChange={(e) => setView(e.detail)}
/>`,
					html: `<fink-segmented _label="Ansicht" _value="list" _options='[{"value":"list","label":"Liste"},{"value":"cards","label":"Kacheln"}]'></fink-segmented>`,
				},
			},
		],
	},
	{
		id: 'fink-bottom-nav',
		name: 'Bottom Navigation',
		tag: 'fink-bottom-nav',
		layer: 'fink',
		category: 'Navigation',
		icon: 'codicon codicon-layout-panel-justify',
		summary: t(
			'Untere Navigationsleiste für mobile Ansichten mit Badges. Vorbild: Material Navigation bar, MUI Bottom Navigation, Vuetify v-bottom-navigation.',
		),
		guidance: ['3–5 gleichrangige Ziele.', 'Nur auf kleinen Viewports; ab Tablet-Breite Navigation Drawer bzw. Rail nutzen.'],
		demos: [
			{
				title: t('Mobile Hauptnavigation'),
				render: () => <BottomNavDemo />,
				code: {
					react: `<FinkBottomNav
  _value={tab}
  _items={[
    { id: 'home', label: 'Start', icon: 'codicon codicon-home' },
    { id: 'inbox', label: 'Postfach', icon: 'codicon codicon-mail', badge: 3 },
  ]}
  onFinkChange={(e) => setTab(e.detail)}
/>`,
					html: `<fink-bottom-nav _value="home" _items='[{"id":"home","label":"Start","icon":"codicon codicon-home"}]'></fink-bottom-nav>`,
				},
			},
		],
	},
	{
		id: 'fink-code-block',
		name: 'Code Block',
		tag: 'fink-code-block',
		layer: 'fink',
		category: 'Doku',
		icon: 'codicon codicon-code',
		summary: t('Doku-Modul für Codebeispiele: Syntax-Hervorhebung, Tabs pro Framework, Dateiname, Zeilennummern, Kopieren.'),
		guidance: [t('Tabs mit Pfeiltasten wechseln; der Code ist per Tab fokussierbar und scrollt horizontal.')],
		demos: [
			{
				title: t('Mehrere Varianten als Tabs'),
				render: () => (
					<FinkCodeBlock
						_lineNumbers
						_tabs={[
							{
								label: t('React'),
								language: 'tsx',
								filename: 'App.tsx',
								code: `import { FinkProvider, FinkButton } from '@fink-ui/react';\n\nexport function App() {\n  return (\n    <FinkProvider>\n      <FinkButton _label="Speichern" _variant="primary" />\n    </FinkProvider>\n  );\n}`,
							},
							{
								label: t('Web Component'),
								language: 'html',
								filename: 'index.html',
								code: `<fink-button _label="Speichern" _variant="primary"></fink-button>`,
							},
							{ label: t('Installation'), language: 'bash', code: `pnpm add @fink-ui/react @public-ui/components` },
						]}
					/>
				),
				code: {
					react: `<FinkCodeBlock
  _lineNumbers
  _tabs={[
    { label: 'React', language: 'tsx', filename: 'App.tsx', code: reactCode },
    { label: 'Web Component', language: 'html', code: htmlCode },
  ]}
/>`,
					html: `<fink-code-block _language="bash" _code="pnpm add @fink-ui/react"></fink-code-block>`,
				},
			},
		],
	},
];
