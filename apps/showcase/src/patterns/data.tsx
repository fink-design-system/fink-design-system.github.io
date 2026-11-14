import { useMemo, useState } from 'react';
import {
	FinkChip,
	FinkEmptyState,
	FinkGrid,
	FinkPanel,
	FinkSegmented,
	FinkSelectionBar,
	FinkStack,
	FinkStatCard,
	FinkStatus,
	FinkSummaryList,
	FinkTimeline,
	KolButton,
	KolCard,
	KolCombobox,
	KolImage,
	KolInputText,
	KolMeter,
	KolSelect,
	KolTableStateful,
	KolToolbar,
	useToast,
} from '@fink/react';
import { articles, people } from './sample-data';
import { ILLUSTRATION } from '../catalog/kolibri-more';
import type { PatternDefinition } from './types';
import { t } from '../i18n';

function SearchDemo() {
	const [query, setQuery] = useState('');
	const hits = useMemo(() => {
		const q = query.trim().toLowerCase();
		return q.length < 2 ? [] : articles.filter((a) => `${a.title} ${a.excerpt}`.toLowerCase().includes(q));
	}, [query]);
	return (
		<FinkStack _gap="4">
			<KolCombobox
				_label={t('Hilfe durchsuchen')}
				_placeholder={t('z. B. Passwort, Nachweise, Auszahlung')}
				_icons="codicon codicon-search"
				_hasClearButton
				_suggestions={articles.map((a) => a.title)}
				_value={query}
				_on={{ onInput: (_e, v) => setQuery(String(v ?? '')), onChange: (_e, v) => setQuery(String(v ?? '')) }}
			/>
			<p className="muted small" role="status">
				{query.trim().length < 2 ? 'Mindestens 2 Zeichen eingeben.' : `${hits.length} Treffer für „${query}“`}
			</p>
			{query.trim().length >= 2 && hits.length === 0 ? (
				<FinkEmptyState _heading={t('Keine Treffer')} _description={t('Prüfen Sie die Schreibweise oder verwenden Sie allgemeinere Begriffe.')} _level={3} />
			) : (
				<ul className="result-list">
					{hits.map((a) => (
						<li key={a.id}>
							<a href="#/patterns/search">{a.title}</a>
							<span className="muted small">
								{t(a.category)} · {a.excerpt}
							</span>
						</li>
					))}
				</ul>
			)}
		</FinkStack>
	);
}

const CATEGORIES = ['Antrag', 'Konto', 'Zahlung', 'Technik'] as const;

const READING_OPTIONS = [1, 2, 3, 4, 5].map((n) => ({ label: t('{{count}} Min. Lesezeit', { count: n }), value: String(n) }));

function FilterDemo() {
	const [active, setActive] = useState<string[]>([]);
	const [text, setText] = useState('');
	const [minutes, setMinutes] = useState<string[]>([]);
	const list = articles.filter(
		(a) => (active.length === 0 || active.includes(a.category)) && (minutes.length === 0 || minutes.includes(String(a.minutes))) && a.title.toLowerCase().includes(text.toLowerCase()),
	);
	return (
		<FinkStack _gap="4">
			<FinkStack _direction="row" _gap="2" _align="center">
				<span className="small" id="facet-label">
					<strong>{t('Kategorie:')}</strong>
				</span>
				{CATEGORIES.map((c) => (
					<FinkChip
						key={c}
						_label={t(c)}
						_count={articles.filter((a) => a.category === c).length}
						_selected={active.includes(c)}
						onFinkToggle={(e) => setActive((l) => (e.detail ? [...l, c] : l.filter((x) => x !== c)))}
					/>
				))}
			</FinkStack>
			<div className="form-row">
				<KolInputText _label={t('Titel enthält')} _type="search" _value={text} _on={{ onInput: (_e, v) => setText(String(v ?? '')) }} />
				<KolSelect _label={t('Lesezeit (viele Werte → Auswahlliste)')} _multiple _rows={3} _options={READING_OPTIONS} _value={minutes} _on={{ onChange: (_e, v) => setMinutes((v as string[]) ?? []) }} />
			</div>
			{(active.length > 0 || text) && (
				<FinkStack _direction="row" _gap="2" _align="center">
					<span className="muted small">{t('Aktiv:')}</span>
					{active.map((c) => (
						<FinkChip key={c} _label={t(c)} _removable onFinkRemove={() => setActive((l) => l.filter((x) => x !== c))} />
					))}
					{text && <FinkChip _label={`„${text}“`} _removable onFinkRemove={() => setText('')} />}
					<KolButton
						_label={t('Alle Filter löschen')}
						_variant="tertiary"
						_on={{
							onClick: () => {
								setActive([]);
								setText('');
							},
						}}
					/>
				</FinkStack>
			)}
			<p className="muted small" role="status">
				{t('{{count}} von {{total}} Artikeln', { count: list.length, total: articles.length })}
			</p>
			<ul className="result-list">
				{list.slice(0, 5).map((a) => (
					<li key={a.id}>
						<strong>{a.title}</strong>
						<span className="muted small">{t(a.category)}</span>
					</li>
				))}
			</ul>
		</FinkStack>
	);
}

function DataTableDemo() {
	const toast = useToast();
	const [rows, setRows] = useState(people.slice(0, 8));
	const [selected, setSelected] = useState<string[]>([]);
	const selection = useMemo(
		() => ({ label: (row: Record<string, unknown>) => t('{{name}} auswählen', { name: String(row.name) }), multiple: true, keyPropertyName: 'id', selectedKeys: selected }),
		[selected],
	);
	const headers = useMemo(
		() => ({
			horizontal: [
				[
					{ label: t('Name'), key: 'name', sortable: true, width: 170 },
					{ label: t('E-Mail'), key: 'email', width: 230 },
					{ label: t('Rolle'), key: 'role', sortable: true, width: 140, render: (_el: HTMLElement, cell: { label: string }) => t(String(cell.label)) },
					{ label: t('Team'), key: 'team', sortable: true, width: 140 },
					{ label: t('Status'), key: 'active', width: 120, render: (_el: HTMLElement, cell: { label: string }) => (String(cell.label) === 'true' ? t('Aktiv') : t('Deaktiviert')) },
				],
			],
		}),
		[],
	);
	return (
		<FinkStack _gap="3">
			<FinkSelectionBar _count={selected.length} _itemLabel={t('Personen')} onFinkClear={() => setSelected([])}>
				<KolButton _label={t('Exportieren')} _icons="codicon codicon-export" _on={{ onClick: () => toast.show({ type: 'success', label: t('{{count}} Personen exportiert', { count: selected.length }) }) }} />
				<KolButton
					_label={t('Deaktivieren')}
					_variant="danger"
					_icons="codicon codicon-circle-slash"
					_on={{
						onClick: () => {
							setRows((list) => list.map((p) => (selected.includes(p.id) ? { ...p, active: false } : p)));
							toast.show({ type: 'warning', label: t('{{count}} Personen deaktiviert', { count: selected.length }) });
							setSelected([]);
						},
					}}
				/>
			</FinkSelectionBar>
			<KolToolbar
				_label={t('Tabellenaktionen')}
				_items={[
					{ type: 'button', _label: t('Alle exportieren'), _icons: 'codicon codicon-export', _on: { onClick: () => toast.show({ type: 'success', label: t('Export erstellt') }) } },
					{ type: 'button', _label: t('Drucken'), _icons: 'codicon codicon-file-pdf', _on: { onClick: () => window.print() } },
					{ type: 'hr' },
					{ type: 'link', _label: t('Hilfe zur Tabelle'), _href: '#/patterns/data-table', _icons: 'codicon codicon-question' },
				]}
			/>
			<KolTableStateful
				_label={t('Personen')}
				_data={rows as unknown as Record<string, unknown>[]}
				_headers={headers as never}
				_selection={selection}
				_on={{ onSelectionChange: (_e, value) => setSelected(((value as unknown as Array<string | Record<string, unknown>>) ?? []).map((v) => (typeof v === 'string' ? v : String(v.id)))) }}
			/>
		</FinkStack>
	);
}

function ViewSwitchDemo() {
	const [view, setView] = useState('cards');
	const items = articles.slice(0, 6);
	return (
		<FinkStack _gap="4">
			<FinkSegmented
				_label={t('Darstellung')}
				_value={view}
				onFinkChange={(e) => setView(e.detail)}
				_options={[
					{ value: 'cards', label: t('Kacheln'), icon: 'codicon codicon-layout' },
					{ value: 'list', label: t('Liste'), icon: 'codicon codicon-list-unordered' },
				]}
			/>
			{view === 'cards' ? (
				<FinkGrid _min="14rem" _gap="3">
					{items.map((a) => (
						<KolCard key={a.id} _label={a.title} _level={3}>
							<p style={{ margin: 0 }} className="small">
								{a.excerpt}
							</p>
						</KolCard>
					))}
				</FinkGrid>
			) : (
				<ul className="result-list">
					{items.map((a) => (
						<li key={a.id}>
							<strong>{a.title}</strong>
							<span className="muted small">{a.excerpt}</span>
						</li>
					))}
				</ul>
			)}
		</FinkStack>
	);
}

function CheckAnswersDemo() {
	const [editing, setEditing] = useState<string | null>(null);
	return (
		<FinkStack _gap="3">
			<FinkSummaryList
				_items={[
					{ id: 'name', key: t('Name'), value: 'Erika Mustermann', actionLabel: t('Ändern') },
					{ id: 'birth', key: t('Geburtsdatum'), value: '12.03.1984', actionLabel: t('Ändern') },
					{ id: 'address', key: t('Anschrift'), value: 'Musterweg 4\n10115 Berlin', actionLabel: t('Ändern') },
					{ id: 'amount', key: t('Fördersumme'), value: '24.500 €', actionLabel: t('Ändern') },
				]}
				onFinkAction={(e) => setEditing(e.detail)}
			/>
			<p className="muted small" role="status">
				{editing ? `Springt zur Frage „${editing}“ und danach zurück zu dieser Seite.` : t('Wählen Sie „Ändern“, um eine Antwort zu korrigieren.')}
			</p>
			<KolButton _label={t('Antrag verbindlich absenden')} _variant="primary" />
		</FinkStack>
	);
}

export const dataPatterns: PatternDefinition[] = [
	{
		id: 'search',
		number: 9,
		title: t('Suche mit Autovervollständigung'),
		category: 'Suche & Daten',
		icon: 'codicon codicon-search',
		summary: t('Suchfeld mit Vorschlägen, Trefferanzahl und Leerzustand.'),
		problem: t('Nutzende kennen den Ort einer Information nicht, aber Begriffe dafür.'),
		when: [t('Große Inhaltsmengen oder Listen.'), 'Bekannte Begriffe (Titel, Namen, Nummern).'],
		components: ['kol-combobox', 'fink-empty-state'],
		a11y: ['Trefferanzahl als Live-Region ansagen.', t('Vorschläge per Pfeiltasten erreichbar (Combobox-Muster).')],
		sources: [
			{ system: 'Material 3', name: 'Search' },
			{ system: 'MUI', name: 'Autocomplete' },
			{ system: 'Vuetify', name: 'v-autocomplete' },
			{ system: 'Carbon', name: 'Search pattern' },
		],
		demo: () => <SearchDemo />,
		code: {
			react: `<KolCombobox
  _label="Hilfe durchsuchen"
  _icons="codicon codicon-search"
  _hasClearButton
  _suggestions={titles}
  _value={query}
  _on={{ onInput: (_e, v) => setQuery(String(v)) }}
/>
<p role="status">{hits.length} Treffer für „{query}“</p>
{hits.length === 0 && <FinkEmptyState _heading="Keine Treffer" />}`,
			html: `<kol-combobox _label="Hilfe durchsuchen" _has-clear-button></kol-combobox>`,
		},
	},
	{
		id: 'filtering',
		number: 10,
		title: t('Filter-Chips & Facetten'),
		category: 'Suche & Daten',
		icon: 'codicon codicon-filter',
		summary: t('Ergebnisse über Facetten eingrenzen; aktive Filter als entfernbare Chips mit „Alle löschen“.'),
		problem: t('Große Ergebnismengen müssen nach mehreren Kriterien gleichzeitig eingegrenzt werden.'),
		when: [t('Listen mit mehreren klar benennbaren Merkmalen.')],
		avoid: ['Mehr als ca. 10 Werte pro Facette – dann Auswahlliste nutzen.'],
		components: ['fink-chip', 'kol-select', 'kol-input-text', 'kol-button', 'fink-tag-input', 'fink-range-slider'],
		a11y: ['Filter-Chips sind Umschalter (aria-pressed).', 'Ergebnisanzahl als Live-Region.'],
		sources: [
			{ system: 'Material 3', name: 'Filter chips' },
			{ system: 'MUI', name: 'Chip' },
			{ system: 'Vuetify', name: 'v-chip-group (filter)' },
			{ system: 'Carbon', name: 'Filtering pattern' },
		],
		demo: () => <FilterDemo />,
		code: {
			react: `{categories.map((c) => (
  <FinkChip key={c} _label={c} _count={count(c)} _selected={active.includes(c)}
    onFinkToggle={(e) => toggle(c, e.detail)} />
))}

{active.map((c) => <FinkChip key={c} _label={c} _removable onFinkRemove={() => remove(c)} />)}
<KolButton _label="Alle Filter löschen" _variant="tertiary" _on={{ onClick: clear }} />`,
			html: `<fink-chip _label="Antrag" _count="5"></fink-chip>
<fink-chip _label="Antrag" _removable></fink-chip>`,
		},
	},
	{
		id: 'data-table',
		number: 11,
		title: t('Datentabelle mit Massenaktionen'),
		category: 'Suche & Daten',
		icon: 'codicon codicon-table',
		summary: t('Sortierbare Tabelle mit Mehrfachauswahl und Aktionsleiste für die Auswahl.'),
		problem: t('Viele Datensätze sollen verglichen und gemeinsam bearbeitet werden.'),
		when: [t('Strukturierte Daten mit gleichen Attributen.'), t('Aktionen auf mehrere Datensätze.')],
		components: ['kol-table-stateful', 'kol-toolbar', 'fink-selection-bar', 'kol-button'],
		a11y: [t('Auswahl-Checkboxen mit individuellem Label („Erika Mustermann auswählen“).'), t('Anzahl der Auswahl als Statusmeldung.')],
		sources: [
			{ system: 'MUI', name: 'Data Grid (checkbox selection)' },
			{ system: 'Vuetify', name: 'v-data-table (show-select)' },
			{ system: 'Carbon', name: 'Data table – batch actions' },
			{ system: 'Polaris', name: 'Index table – bulk actions' },
		],
		demo: () => <DataTableDemo />,
		code: {
			react: `<FinkSelectionBar _count={selected.length} _itemLabel="Personen" onFinkClear={() => setSelected([])}>
  <KolButton _label="Deaktivieren" _variant="danger" _on={{ onClick: deactivate }} />
</FinkSelectionBar>
<KolTableStateful
  _label="Personen"
  _data={rows}
  _headers={{ horizontal: [[{ label: 'Name', key: 'name', sortable: true }, …]] }}
  _selection={{ multiple: true, keyPropertyName: 'id', selectedKeys: selected, label: (row) => \`\${row.name} auswählen\` }}
  _on={{ onSelectionChange: (_e, keys) => setSelected(keys) }}
/>`,
		},
	},
	{
		id: 'view-switch',
		number: 12,
		title: t('Ansicht umschalten'),
		category: 'Suche & Daten',
		icon: 'codicon codicon-split-horizontal',
		summary: t('Dieselben Inhalte als Kacheln oder Liste darstellen – per segmentierter Auswahl.'),
		problem: t('Unterschiedliche Aufgaben brauchen unterschiedliche Darstellungen (Überblick vs. Vergleich).'),
		when: [t('Inhalte mit Bild/Teaser und kompakter Listenform.')],
		components: ['fink-segmented', 'kol-card', 'fink-grid'],
		a11y: [t('Radiogruppe mit Pfeiltasten-Navigation.'), 'Wahl beibehalten (z. B. localStorage).'],
		sources: [
			{ system: 'Material 3', name: 'Segmented buttons' },
			{ system: 'MUI', name: 'Toggle Button' },
			{ system: 'Vuetify', name: 'v-btn-toggle' },
		],
		demo: () => <ViewSwitchDemo />,
		code: {
			react: `<FinkSegmented
  _label="Darstellung"
  _value={view}
  _options={[
    { value: 'cards', label: 'Kacheln', icon: 'codicon codicon-layout' },
    { value: 'list', label: 'Liste', icon: 'codicon codicon-list-unordered' },
  ]}
  onFinkChange={(e) => setView(e.detail)}
/>
{view === 'cards' ? <FinkGrid _min="14rem">{cards}</FinkGrid> : <ul>{rows}</ul>}`,
		},
	},
	{
		id: 'check-answers',
		number: 13,
		title: t('Detailansicht & Antworten prüfen'),
		category: 'Suche & Daten',
		icon: 'codicon codicon-list-flat',
		summary: t('Schlüssel-Wert-Übersicht mit „Ändern“ pro Zeile, vor dem verbindlichen Absenden.'),
		problem: t('Vor dem Absenden müssen Nutzende alle Angaben auf einen Blick prüfen und gezielt korrigieren können.'),
		when: ['Ende jedes mehrstufigen Formulars.', t('Detailseiten von Datensätzen.')],
		components: ['fink-summary-list', 'kol-button'],
		a11y: [t('„Ändern“-Links enthalten den Feldnamen für Screenreader („Ändern Name“).')],
		sources: [
			{ system: 'GOV.UK', name: 'Check answers / Summary list' },
			{ system: 'MUI', name: 'List' },
			{ system: 'Ant Design', name: 'Descriptions' },
		],
		demo: () => <CheckAnswersDemo />,
		code: {
			react: `<FinkSummaryList
  _items={[
    { id: 'name', key: 'Name', value: 'Erika Mustermann', actionLabel: 'Ändern' },
    { id: 'address', key: 'Anschrift', value: 'Musterweg 4\\n10115 Berlin', actionLabel: 'Ändern' },
  ]}
  onFinkAction={(e) => goToQuestion(e.detail)}
/>
<KolButton _label="Antrag verbindlich absenden" _variant="primary" />`,
			html: `<fink-summary-list _items='[{"id":"name","key":"Name","value":"Erika Mustermann","actionLabel":"Ändern"}]'></fink-summary-list>`,
		},
	},
	{
		id: 'activity',
		number: 14,
		title: t('Aktivitätsverlauf'),
		category: 'Suche & Daten',
		icon: 'codicon codicon-history',
		summary: t('Chronologische Ereignisse eines Vorgangs mit Status-Tönen.'),
		problem: t('Nachvollziehen, wer wann was an einem Vorgang getan hat.'),
		when: [t('Vorgänge mit mehreren Bearbeitungsschritten.'), 'Audit-Anforderungen.'],
		components: ['fink-timeline'],
		a11y: ['Geordnete Liste (ol); Datum als time-Element.'],
		sources: [
			{ system: 'MUI', name: 'Timeline' },
			{ system: 'Vuetify', name: 'v-timeline' },
			{ system: 'Ant Design', name: 'Timeline' },
		],
		demo: () => (
			<FinkTimeline
				_items={[
					{ title: t('Bescheid versendet'), date: '14.11.2026', tone: 'success', icon: 'codicon codicon-mail' },
					{ title: t('Bewilligt'), date: '13.11.2026', description: t('durch Jonas Weber'), tone: 'success', icon: 'codicon codicon-check' },
					{ title: t('Rückfrage gestellt'), date: '05.11.2026', description: t('Nachweis zur Eigenbeteiligung fehlt'), tone: 'warning', icon: 'codicon codicon-comment' },
					{ title: t('Antrag eingegangen'), date: '03.11.2026' },
				]}
			/>
		),
		code: {
			react: `<FinkTimeline _items={[
  { title: 'Bewilligt', date: '13.11.2026', tone: 'success', icon: 'codicon codicon-check' },
  { title: 'Antrag eingegangen', date: '03.11.2026' },
]} />`,
			html: `<fink-timeline _items='[{"title":"Antrag eingegangen","date":"03.11.2026"}]'></fink-timeline>`,
		},
	},
	{
		id: 'dashboard',
		number: 15,
		title: t('Kennzahlen-Dashboard'),
		category: 'Suche & Daten',
		icon: 'codicon codicon-dashboard',
		summary: t('Wichtigste Kennzahlen mit Trend, darunter Verteilungen und Fortschritt.'),
		problem: t('Den Zustand eines Bereichs auf einen Blick erfassen und Auffälligkeiten erkennen.'),
		when: [t('Einstiegsseite für Fach- und Leitungsrollen.')],
		avoid: [t('Mehr als 4–6 Kennzahlen in der ersten Reihe.')],
		components: ['fink-stat-card', 'fink-grid', 'fink-panel', 'kol-meter', 'fink-sparkline'],
		a11y: [t('Trends werden ausgeschrieben („gestiegen um 12 %“), nicht nur farblich.')],
		sources: [
			{ system: 'Ant Design', name: 'Statistic' },
		],
		demo: () => (
			<FinkStack _gap="4">
				<FinkGrid _min="9.5rem">
					<FinkStatCard _label={t('Offen')} _value="128" _trend={12.5} _trendLabel={t('ggü. Vormonat')} _icons="codicon codicon-inbox" />
					<FinkStatCard _label={t('Bewilligt')} _value="1,8 Mio. €" _trend={4.2} _tone="success" _icons="codicon codicon-pass" />
					<FinkStatCard _label={t('Ø Bearbeitung')} _value="9,3 Tage" _trend={-8} _trendInverted _tone="warning" _icons="codicon codicon-watch" />
				</FinkGrid>
				<FinkPanel _heading={t('Mittelabruf')} _level={3}>
					<FinkStack _gap="3">
						<KolMeter _label={t('Digitalisierung')} _value={72} _min={0} _max={100} _low={50} _high={90} _optimum={60} _unit="%" />
						<KolMeter _label={t('Klimaschutz')} _value={95} _min={0} _max={100} _low={50} _high={90} _optimum={60} _unit="%" />
					</FinkStack>
				</FinkPanel>
			</FinkStack>
		),
		code: {
			react: `<FinkGrid _min="9.5rem">
  <FinkStatCard _label="Offen" _value="128" _trend={12.5} _trendLabel="ggü. Vormonat" />
  <FinkStatCard _label="Ø Bearbeitung" _value="9,3 Tage" _trend={-8} _trendInverted _tone="warning" />
</FinkGrid>
<FinkPanel _heading="Mittelabruf">
  <KolMeter _label="Digitalisierung" _value={72} _max={100} _low={50} _high={90} _optimum={60} _unit="%" />
</FinkPanel>`,
		},
	},
	{
		id: 'cards',
		number: 16,
		title: t('Karten-Raster'),
		category: 'Suche & Daten',
		icon: 'codicon codicon-preview',
		summary: t('Gleichartige Inhalte als Karten in einem responsiven Raster ohne Breakpoints.'),
		problem: t('Mehrere Angebote oder Objekte sollen überflogen und verglichen werden.'),
		when: [t('Inhalte mit Titel, Kurztext, Status und Aktion.')],
		components: ['kol-card', 'kol-image', 'fink-grid', 'fink-status'],
		a11y: [t('Kartentitel als Überschrift auf passender Ebene.'), t('Nicht die ganze Karte als einen großen Link mit viel Text bauen.')],
		sources: [
			{ system: 'Material 3', name: 'Cards' },
			{ system: 'MUI', name: 'Card / Grid' },
			{ system: 'Vuetify', name: 'v-card' },
		],
		demo: () => (
			<FinkGrid _min="15rem">
				{[
					[t('Digitalisierung im Mittelstand'), t('bis 50.000 €'), t('Offen'), 'success'],
					[t('Klimaschutz in Kommunen'), t('bis 250.000 €'), t('Endet bald'), 'warning'],
					[t('Kultur vor Ort'), t('bis 20.000 €'), t('Geschlossen'), 'neutral'],
				].map(([title, sum, status, tone]) => (
					<KolCard key={title} _label={title} _level={3}>
						<FinkStack _gap="3">
							<KolImage _src={ILLUSTRATION} _alt="" />
							<FinkStatus _label={status} _tone={tone as 'success'} />
							<p style={{ margin: 0 }}>{t('Zuschuss {{sum}}', { sum })}</p>
							<KolButton _label={t('Details')} _variant="secondary" _disabled={tone === 'neutral'} />
						</FinkStack>
					</KolCard>
				))}
			</FinkGrid>
		),
		code: {
			react: `<FinkGrid _min="15rem">
  {programs.map((p) => (
    <KolCard key={p.id} _label={p.title} _level={3}>
      <FinkStatus _label={p.status} _tone={p.tone} />
      <KolButton _label="Details" _variant="secondary" />
    </KolCard>
  ))}
</FinkGrid>`,
		},
	},
];
