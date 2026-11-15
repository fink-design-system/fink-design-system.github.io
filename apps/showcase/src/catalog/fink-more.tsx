import { useState, type CSSProperties } from 'react';
import { FinkAvatarGroup, FinkBackToTop, FinkBarChart, FinkImageList, FinkInfiniteScroll, FinkPopconfirm, FinkSplitter, FinkTour, FinkVirtualList, FinkCalendar, FinkCarousel, FinkDivider, FinkFab, FinkKbd, FinkList, FinkMenu, FinkOtpInput, FinkRangeSlider, FinkSegmented, FinkSparkline, FinkStack, FinkTagInput, FinkToc, FinkTransferList, KolButton, useToast } from '@fink/react';
import type { CatalogEntry } from './types';
import { t } from '../i18n';

/*
 * Erweiterter Komponentenumfang nach Vorbild von MUI, Vuetify, Material 3, Carbon und Ant Design,
 * geordnet nach Verbreitung: erst die Bausteine, die in fast jeder Anwendung vorkommen.
 */

const PEOPLE = [
	{ label: 'Erika Mustermann' },
	{ label: 'Jonas Weber' },
	{ label: 'Leyla Demir' },
	{ label: 'Malik Yilmaz' },
	{ label: 'Petra Lang' },
	{ label: 'Finn Petersen' },
	{ label: 'Klara Vogt' },
];

function ListDemo() {
	const [value, setValue] = useState('inbox');
	return (
		<div className="demo-grid-2">
			<FinkList
				_label={t('Postfach-Ordner')}
				_selectable
				_value={value}
				onFinkSelect={(e) => setValue(e.detail)}
				_items={[
					{ id: 'inbox', label: t('Eingang'), icon: 'codicon codicon-inbox', badge: 4 },
					{ id: 'drafts', label: t('Entwürfe'), icon: 'codicon codicon-edit', meta: '2' },
					{ id: 'sent', label: t('Gesendet'), icon: 'codicon codicon-send' },
					{ id: 'archive', label: t('Archiv'), icon: 'codicon codicon-archive' },
					{ id: 'trash', label: t('Papierkorb'), icon: 'codicon codicon-trash', disabled: true },
				]}
			/>
			<FinkList
				_label={t('Nachrichten')}
				_dividers
				_lines={2}
				_items={[
					{ id: 'm1', label: t('Rückfrage zu FD-2026-0142'), description: t('Bitte reichen Sie den Kostenvoranschlag als PDF nach, damit wir den Antrag prüfen können.'), avatar: { label: 'Jonas Weber' }, meta: '09:14' },
					{ id: 'm2', label: t('Bescheid verfügbar'), description: t('Ihr Bescheid zum Förderprogramm Klimaschutz steht zum Download bereit.'), avatar: { label: 'Förderportal' }, meta: t('Gestern') },
					{ id: 'm3', label: t('Termin bestätigt'), description: t('Wohnsitz anmelden am 21. November, 09:30 Uhr im Bürgeramt Mitte.'), avatar: { label: 'Bürgeramt Mitte' }, meta: '12.11.' },
				]}
			/>
		</div>
	);
}

function MenuDemo() {
	const toast = useToast();
	const [view, setView] = useState({ compact: false, archived: true });
	return (
		<FinkStack _direction="row" _gap="4" _align="center">
			<FinkMenu
				_label={t('Aktionen')}
				_icons="codicon codicon-chevron-down"
				_items={[
					{ type: 'heading', label: t('Antrag') },
					{ id: 'edit', label: t('Bearbeiten'), icon: 'codicon codicon-edit', shortcut: 'E' },
					{ id: 'duplicate', label: t('Duplizieren'), icon: 'codicon codicon-copy', shortcut: 'Strg+D' },
					{ id: 'export', label: t('Als PDF exportieren'), icon: 'codicon codicon-file-pdf', description: t('Mit allen Anlagen') },
					{ type: 'divider' },
					{ id: 'delete', label: t('Löschen'), icon: 'codicon codicon-trash', danger: true },
				]}
				onFinkSelect={(e) => toast.show({ type: 'info', label: t('Gewählt: {{view}}', { view: e.detail }) })}
			/>
			<FinkMenu
				_label={t('Ansicht anpassen')}
				_hideLabel
				_icons="codicon codicon-settings"
				_variant="ghost"
				_items={[
					{ type: 'checkbox', id: 'compact', label: t('Kompakte Zeilen'), checked: view.compact },
					{ type: 'checkbox', id: 'archived', label: t('Archivierte anzeigen'), checked: view.archived },
				]}
				onFinkCheck={(e) => setView((v) => ({ ...v, [e.detail.id]: e.detail.checked }))}
			/>
			<span className="muted small">
				{t('Kompakt: {{a}} · Archiv: {{b}}', { a: view.compact ? t('an') : t('aus'), b: view.archived ? t('an') : t('aus') })}
			</span>
		</FinkStack>
	);
}

function TagInputDemo() {
	const [tags, setTags] = useState(['Digitalisierung', 'KI']);
	return (
		<FinkStack _gap="3">
			<FinkTagInput
				_label={t('Schlagworte')}
				_value={tags}
				_options={['Digitalisierung', 'Klimaschutz', 'KI', 'Kultur', 'Mobilität', 'Bildung', 'Gesundheit', 'Innovation']}
				_max={5}
				onFinkChange={(e) => setTags(e.detail)}
			/>
			<p className="muted small">{t('Gewählt: {{view}}', { view: tags.join(', ') || '–' })}</p>
		</FinkStack>
	);
}


function FabDemo() {
	const toast = useToast();
	return (
		<FinkStack _direction="row" _gap="6" _align="end">
			<FinkFab _label={t('Neuer Antrag')} onFinkClick={() => toast.show({ type: 'info', label: t('Neuer Antrag') })} />
			<FinkFab _label={t('Neuer Antrag')} _extended _icons="codicon codicon-edit" onFinkClick={() => toast.show({ type: 'info', label: t('Neuer Antrag') })} />
			<FinkFab
				_label={t('Erstellen')}
				_actions={[
					{ id: 'application', label: t('Antrag'), icon: 'codicon codicon-file-add' },
					{ id: 'message', label: t('Nachricht'), icon: 'codicon codicon-mail' },
					{ id: 'appointment', label: t('Termin'), icon: 'codicon codicon-calendar' },
				]}
				onFinkSelect={(e) => toast.show({ type: 'success', label: t('Gewählt: {{view}}', { view: e.detail }) })}
			/>
		</FinkStack>
	);
}

function RangeDemo() {
	const [range, setRange] = useState<[number, number]>([20000, 120000]);
	return (
		<div className="demo-grid-2">
			<FinkRangeSlider _label={t('Fördersumme')} _min={0} _max={250000} _step={5000} _unit="€" _value={range} onFinkChange={(e) => setRange(e.detail)} _hint={t('Zeigt Programme in diesem Förderrahmen.')} />
			<FinkRangeSlider _label={t('Bearbeitungszeit')} _min={1} _max={60} _value={[5, 20]} _unit={t('Tage')} _showInputs />
		</div>
	);
}

const iso = (offset: number) => {
	const d = new Date();
	d.setDate(d.getDate() + offset);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function CalendarDemo() {
	const [date, setDate] = useState(iso(3));
	return (
		<div className="demo-grid-2">
			<FinkCalendar
				_label={t('Termin wählen')}
				_value={date}
				_min={iso(0)}
				_max={iso(60)}
				_disableWeekends
				_markers={[iso(2), iso(3), iso(7), iso(9), iso(14), iso(16)]}
				_markerLabel={t('freie Termine')}
				onFinkChange={(e) => setDate(e.detail)}
			/>
			<p className="muted">{t('Gewählt: {{view}}', { view: date })}</p>
		</div>
	);
}

const SLIDES = [
	{ title: 'Digitalisierung im Mittelstand', text: 'Bis zu 50.000 € für digitale Prozesse und IT-Sicherheit.', icon: 'codicon codicon-rocket', tone: 'primary' },
	{ title: 'Klimaschutz in Kommunen', text: 'Zuschüsse für Energieeffizienz und erneuerbare Wärme.', icon: 'codicon codicon-globe', tone: 'success' },
	{ title: 'Kultur vor Ort', text: 'Projektförderung für Vereine und freie Träger.', icon: 'codicon codicon-symbol-color', tone: 'warning' },
	{ title: 'Innovation & Forschung', text: 'Verbundprojekte mit Hochschulen ab 100.000 €.', icon: 'codicon codicon-beaker', tone: 'info' },
];

function CarouselDemo() {
	return (
		<FinkCarousel _label={t('Aktuelle Förderprogramme')} _perView={2} _autoplay={6000}>
			{SLIDES.map((slide) => (
				<div key={slide.title} className="slide-card" style={{ '--tone': `var(--fink-color-${slide.tone})` } as CSSProperties}>
					<span className={`slide-icon ${slide.icon}`} aria-hidden="true"></span>
					<h3>{t(slide.title)}</h3>
					<p>{t(slide.text)}</p>
				</div>
			))}
		</FinkCarousel>
	);
}

const PROGRAMS = [
	{ id: 'digi', label: 'Digitalisierung im Mittelstand', description: 'bis 50.000 €' },
	{ id: 'klima', label: 'Klimaschutz in Kommunen', description: 'bis 250.000 €' },
	{ id: 'kultur', label: 'Kultur vor Ort', description: 'bis 20.000 €' },
	{ id: 'inno', label: 'Innovation & Forschung', description: 'ab 100.000 €' },
	{ id: 'bildung', label: 'Bildung digital', description: 'bis 30.000 €' },
	{ id: 'mobil', label: 'Mobilität im ländlichen Raum', description: 'bis 80.000 €', disabled: true },
	{ id: 'gesund', label: 'Gesundheit im Quartier', description: 'bis 40.000 €' },
];

function TransferDemo() {
	const [value, setValue] = useState(['klima']);
	return (
		<FinkStack _gap="3">
			<FinkTransferList
				_label={t('Programme für das Referat')}
				_sourceLabel={t('Alle Programme')}
				_targetLabel={t('Referat 1')}
				_items={PROGRAMS.map((p) => ({ ...p, label: t(p.label), description: t(p.description) }))}
				_value={value}
				onFinkChange={(e) => setValue(e.detail)}
			/>
			<p className="muted small">{t('Gewählt: {{view}}', { view: value.join(', ') || '–' })}</p>
		</FinkStack>
	);
}

function OtpDemo() {
	const [code, setCode] = useState('');
	const [error, setError] = useState<string>();
	return (
		<div className="demo-grid-2">
			<FinkOtpInput
				_label={t('Bestätigungscode')}
				_hint={t('Wir haben einen sechsstelligen Code an +49 151 ••• 42 gesendet. Demo-Code: 123456')}
				_value={code}
				_error={error}
				onFinkChange={(e) => {
					setCode(e.detail);
					setError(undefined);
				}}
				onFinkComplete={(e) => setError(e.detail === '123456' ? undefined : t('Der Code ist nicht korrekt. Bitte prüfen Sie die SMS.'))}
			/>
			<FinkOtpInput _label={t('Wiederherstellungscode')} _length={4} _type="alphanumeric" />
		</div>
	);
}

function TocDemo() {
	return (
		<div className="toc-demo">
			<FinkToc
				_items={[
					{ id: 'toc-voraussetzungen', label: t('Voraussetzungen') },
					{ id: 'toc-unterlagen', label: t('Unterlagen'), level: 2 },
					{ id: 'toc-fristen', label: t('Fristen'), level: 2 },
					{ id: 'toc-antrag', label: t('Antrag stellen') },
					{ id: 'toc-bescheid', label: t('Nach dem Bescheid') },
				]}
			/>
			<div className="toc-demo-text" tabIndex={0} role="region" aria-label={t('Beispieltext mit Abschnitten')}>
				{[
					['toc-voraussetzungen', 'Voraussetzungen'],
					['toc-unterlagen', 'Unterlagen'],
					['toc-fristen', 'Fristen'],
					['toc-antrag', 'Antrag stellen'],
					['toc-bescheid', 'Nach dem Bescheid'],
				].map(([id, label]) => (
					<section key={id}>
						<h3 id={id}>{t(label)}</h3>
						<p className="muted">{t('Beispieltext zum Abschnitt. Das Inhaltsverzeichnis hebt den Abschnitt hervor, der gerade im sichtbaren Bereich liegt.')}</p>
					</section>
				))}
			</div>
		</div>
	);
}

function SparklineDemo() {
	const rows = [
		{ label: t('Digitalisierung'), values: [12, 18, 15, 22, 28, 26, 34, 39], tone: 'brand' as const },
		{ label: t('Klimaschutz'), values: [30, 28, 31, 27, 24, 22, 20, 18], tone: 'danger' as const },
		{ label: t('Kultur'), values: [5, 7, 6, 8, 7, 9, 8, 10], tone: 'success' as const },
	];
	return (
		<table className="doc-table spark-table">
			<caption>{t('Anträge pro Woche')}</caption>
			<thead>
				<tr>
					<th scope="col">{t('Programm')}</th>
					<th scope="col">{t('Verlauf (8 Wochen)')}</th>
					<th scope="col">{t('Balken')}</th>
				</tr>
			</thead>
			<tbody>
				{rows.map((row) => (
					<tr key={row.label}>
						<th scope="row">{row.label}</th>
						<td>
							<FinkSparkline _label={t('Anträge pro Woche, {{label}}', { label: row.label })} _values={row.values} _tone={row.tone} _showValue />
						</td>
						<td>
							<FinkSparkline _label={t('Anträge pro Woche, {{label}}', { label: row.label })} _values={row.values} _type="bar" _tone={row.tone} />
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

/** Erzeugt ein Landschaftsmotiv als SVG-Daten-URL (keine externen Bildquellen nötig). */
const art = (sky: string, hill: string, sun: string, height = 600) =>
	`data:image/svg+xml,${encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 ${height}" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky}"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><rect width="800" height="${height}" fill="url(#s)"/><circle cx="600" cy="${height * 0.3}" r="70" fill="${sun}" opacity=".9"/><path d="M0 ${height * 0.7} Q200 ${height * 0.5} 400 ${height * 0.68} T800 ${height * 0.62} V${height} H0Z" fill="${hill}" opacity=".75"/><path d="M0 ${height * 0.82} Q260 ${height * 0.66} 520 ${height * 0.8} T800 ${height * 0.78} V${height} H0Z" fill="${hill}"/></svg>`,
	)}`;

const IMAGES = [
	{ src: art('#9fb7ff', '#3b2fc9', '#ffd58a'), alt: 'Hügel im Morgenlicht', title: 'Rathausplatz', subtitle: 'Eröffnung 2026', cols: 2, rows: 2 },
	{ src: art('#a5e3b7', '#0b6b4f', '#fff3c4', 900), alt: 'Grüne Hügel', title: 'Stadtpark', subtitle: 'Klimaschutz' },
	{ src: art('#ffd1a8', '#9a4500', '#ffef9e', 500), alt: 'Abendstimmung', title: 'Kulturnacht', subtitle: 'Kultur vor Ort' },
	{ src: art('#c9a7ff', '#5b2fa8', '#ffe1f0', 760), alt: 'Violette Landschaft', title: 'Innovationszentrum', subtitle: 'Forschung', cols: 2 },
	{ src: art('#8cc4ff', '#0b5cad', '#e6f4ff', 640), alt: 'Blaue Berge', title: 'Hafen', subtitle: 'Mobilität' },
	{ src: art('#ffab91', '#b4232c', '#fff0e6', 820), alt: 'Rote Hügel', title: 'Bürgeramt Mitte', subtitle: 'Service' },
];

function ImageListDemo() {
	const [variant, setVariant] = useState<'standard' | 'masonry' | 'quilted'>('quilted');
	return (
		<FinkStack _gap="4">
			<FinkSegmented
				_label={t('Anordnung')}
				_value={variant}
				_options={[
					{ value: 'standard', label: t('Raster') },
					{ value: 'masonry', label: 'Masonry' },
					{ value: 'quilted', label: 'Quilted' },
				]}
				onFinkChange={(e) => setVariant(e.detail as typeof variant)}
			/>
			<FinkImageList _label={t('Projekte aus der Förderung')} _variant={variant} _items={IMAGES.map((img) => ({ ...img, alt: t(img.alt), title: t(img.title), subtitle: t(img.subtitle) }))} />
		</FinkStack>
	);
}

function TourDemo() {
	const [open, setOpen] = useState(false);
	const toast = useToast();
	return (
		<FinkStack _gap="4">
			<div className="tour-demo">
				<div id="tour-search" className="tour-target">
					<span className="codicon codicon-search" aria-hidden="true"></span> {t('Suche')}
				</div>
				<div id="tour-new" className="tour-target tour-target--primary">
					<span className="codicon codicon-add" aria-hidden="true"></span> {t('Neuer Antrag')}
				</div>
				<div id="tour-inbox" className="tour-target">
					<span className="codicon codicon-inbox" aria-hidden="true"></span> {t('Postfach')} (3)
				</div>
			</div>
			<KolButton _label={t('Tour starten')} _icons="codicon codicon-play" _variant="primary" _on={{ onClick: () => setOpen(true) }} />
			<FinkTour
				_label={t('Neu im Förderportal')}
				_open={open}
				_steps={[
					{ target: '#tour-search', title: t('Alles finden'), description: t('Suchen Sie nach Aktenzeichen, Antragstellern oder Programmen.') },
					{ target: '#tour-new', title: t('Antrag anlegen'), description: t('Hier starten Sie einen neuen Antrag – der Assistent führt Schritt für Schritt.') },
					{ target: '#tour-inbox', title: t('Rückfragen im Blick'), description: t('Neue Nachrichten und Rückfragen landen im Postfach.') },
				]}
				onFinkClose={() => setOpen(false)}
				onFinkFinish={() => toast.show({ type: 'success', label: t('Tour abgeschlossen') })}
			/>
		</FinkStack>
	);
}

const CITIES = ['Berlin', 'Hamburg', 'München', 'Köln', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Leipzig', 'Dortmund', 'Essen', 'Bremen', 'Dresden'];
const MANY = Array.from({ length: 10000 }, (_, i) => ({
	id: `FD-${String(i + 1).padStart(5, '0')}`,
	label: `FD-2026-${String(i + 1).padStart(5, '0')}`,
	description: `${CITIES[i % CITIES.length]} · ${['Digitalisierung', 'Klimaschutz', 'Kultur', 'Innovation'][i % 4]}`,
	meta: `${((i * 7919) % 240) + 10}.000 €`,
}));

function VirtualDemo() {
	const [picked, setPicked] = useState('');
	return (
		<FinkStack _gap="3">
			<FinkVirtualList _label={t('Alle Anträge')} _items={MANY} _height="22rem" onFinkSelect={(e) => setPicked(e.detail)} />
			<p className="muted small">{picked ? t('Gewählt: {{view}}', { view: picked }) : t('10.000 Einträge, flüssig scrollbar.')}</p>
		</FinkStack>
	);
}

function PopconfirmDemo() {
	const toast = useToast();
	return (
		<FinkStack _direction="row" _gap="3" _align="center">
			<FinkPopconfirm
				_label={t('Löschen')}
				_icons="codicon codicon-trash"
				_variant="danger"
				_danger
				_question={t('Entwurf wirklich löschen?')}
				_description={t('Der Entwurf kann danach nicht wiederhergestellt werden.')}
				_confirmLabel={t('Löschen')}
				onFinkConfirm={() => toast.show({ type: 'success', label: t('Entwurf gelöscht') })}
			/>
			<FinkPopconfirm _label={t('Archivieren')} _icons="codicon codicon-archive" _question={t('Antrag archivieren?')} onFinkConfirm={() => toast.show({ type: 'info', label: t('Archiviert') })} />
		</FinkStack>
	);
}

function InfiniteDemo() {
	const [count, setCount] = useState(8);
	const [loading, setLoading] = useState(false);
	const done = count >= 40;
	const load = () => {
		if (loading || done) return;
		setLoading(true);
		window.setTimeout(() => {
			setCount((c) => Math.min(40, c + 8));
			setLoading(false);
		}, 700);
	};
	return (
		<div className="infinite-demo">
			<FinkInfiniteScroll _loading={loading} _done={done} _count={count} onFinkLoad={load}>
				<FinkList
					_label={t('Meldungen')}
					_dividers
					_items={Array.from({ length: count }, (_, i) => ({ id: `n${i}`, label: t('Meldung {{n}}', { n: i + 1 }), description: CITIES[i % CITIES.length], icon: 'codicon codicon-bell' }))}
				/>
			</FinkInfiniteScroll>
		</div>
	);
}

function SplitterDemo() {
	const [size, setSize] = useState(38);
	return (
		<FinkSplitter _label={t('Breite der Liste')} _value={size} onFinkResize={(e) => setSize(e.detail)}>
			<div slot="start" className="split-pane">
				<FinkList
					_label={t('Anträge')}
					_selectable
					_value="a2"
					_dense
					_items={[
						{ id: 'a1', label: 'FD-2026-0142', description: t('Mühlenwerk GmbH') },
						{ id: 'a2', label: 'FD-2026-0141', description: t('Sonnentau eG') },
						{ id: 'a3', label: 'FD-2026-0140', description: t('Kranich & Söhne KG') },
					]}
				/>
			</div>
			<div slot="end" className="split-pane">
				<h3>FD-2026-0141</h3>
				<p className="muted">{t('Detailansicht neben der Liste. Ziehen Sie die Trennlinie oder nutzen Sie die Pfeiltasten.')}</p>
				<p className="muted small">{t('Listenbreite: {{size}} %', { size })}</p>
			</div>
		</FinkSplitter>
	);
}

export const finkMoreEntries: CatalogEntry[] = [
	{
		id: 'fink-list',
		name: 'List',
		tag: 'fink-list',
		layer: 'fink',
		category: 'Daten',
		icon: 'codicon codicon-list-flat',
		summary: t('Ein- oder zweizeilige Listeneinträge mit Icon oder Avatar, Zusatzinfo und Zähler; statisch, als Links oder auswählbar. Vorbild: MUI List, Vuetify v-list, Material 3 Lists.'),
		guidance: [t('Für Navigation innerhalb eines Bereichs (Ordner, Filter) _selectable nutzen.'), t('Für tabellarische Daten mit mehreren Spalten die Tabelle verwenden.')],
		demos: [
			{
				title: t('Navigationsliste und Nachrichtenliste'),
				render: () => <ListDemo />,
				code: {
					react: `<FinkList
  _label="Postfach-Ordner"
  _selectable
  _value={folder}
  onFinkSelect={(e) => setFolder(e.detail)}
  _items={[
    { id: 'inbox', label: 'Eingang', icon: 'codicon codicon-inbox', badge: 4 },
    { id: 'drafts', label: 'Entwürfe', icon: 'codicon codicon-edit', meta: '2' },
  ]}
/>

<FinkList
  _label="Nachrichten"
  _dividers
  _lines={2}
  _items={[{ id: 'm1', label: 'Rückfrage', description: '…', avatar: { label: 'Jonas Weber' }, meta: '09:14' }]}
/>`,
					html: `<fink-list _label="Ordner" _selectable _value="inbox"
  _items='[{"id":"inbox","label":"Eingang","icon":"codicon codicon-inbox","badge":4}]'></fink-list>`,
				},
			},
		],
	},
	{
		id: 'fink-menu',
		name: 'Menu',
		tag: 'fink-menu',
		layer: 'fink',
		category: 'Aktion',
		icon: 'codicon codicon-kebab-vertical',
		summary: t('Aktionsmenü mit Gruppen, Trennlinien, Tastenkürzeln, Checkbox-Einträgen und destruktiven Aktionen; Tastatur nach ARIA-Menü-Muster. Vorbild: MUI Menu, Vuetify v-menu, Material 3 Menus.'),
		guidance: [t('Höchstens sieben Einträge, sonst gruppieren.'), t('Häufigste Aktion als eigene Schaltfläche zeigen, nicht im Menü verstecken.')],
		demos: [
			{
				title: t('Aktionen und Ansichtsoptionen'),
				render: () => <MenuDemo />,
				code: {
					react: `<FinkMenu
  _label="Aktionen"
  _icons="codicon codicon-chevron-down"
  _items={[
    { type: 'heading', label: 'Antrag' },
    { id: 'edit', label: 'Bearbeiten', icon: 'codicon codicon-edit', shortcut: 'E' },
    { type: 'divider' },
    { id: 'delete', label: 'Löschen', icon: 'codicon codicon-trash', danger: true },
  ]}
  onFinkSelect={(e) => run(e.detail)}
/>`,
					html: `<fink-menu _label="Aktionen" _items='[{"id":"edit","label":"Bearbeiten"},{"type":"divider"},{"id":"delete","label":"Löschen","danger":true}]'></fink-menu>`,
				},
			},
		],
	},
	{
		id: 'fink-tag-input',
		name: 'Tag Input',
		tag: 'fink-tag-input',
		layer: 'fink',
		category: 'Formular',
		icon: 'codicon codicon-tag',
		summary: t('Mehrfachauswahl als entfernbare Tags mit Vorschlägen und freier Eingabe. Vorbild: MUI Autocomplete (multiple), Vuetify v-combobox (chips), Ant Select (tags).'),
		guidance: [t('Für wenige feste Optionen Checkboxen bevorzugen.'), t('Mit _allowCustom={false} sind nur Vorschläge erlaubt.')],
		demos: [
			{
				title: t('Schlagworte mit Vorschlägen'),
				render: () => <TagInputDemo />,
				code: {
					react: `<FinkTagInput
  _label="Schlagworte"
  _value={tags}
  _options={['Digitalisierung', 'Klimaschutz', 'KI', 'Kultur']}
  _max={5}
  onFinkChange={(e) => setTags(e.detail)}
/>`,
					html: `<fink-tag-input _label="Schlagworte" _options='["Digitalisierung","Klimaschutz"]'></fink-tag-input>`,
				},
			},
		],
	},
	{
		id: 'fink-avatar-group',
		name: 'Avatar Group',
		tag: 'fink-avatar-group',
		layer: 'fink',
		category: 'Inhalt',
		icon: 'codicon codicon-organization',
		summary: t('Überlappende Avatare mit „+N“ für weitere Personen; der Gruppenname nennt alle. Vorbild: MUI AvatarGroup, Ant Avatar.Group.'),
		demos: [
			{
				title: t('Bearbeitende eines Vorgangs'),
				render: () => (
					<FinkStack _gap="4">
						<FinkAvatarGroup _label={t('Bearbeitende')} _items={PEOPLE} _max={4} />
						<FinkAvatarGroup _label={t('Team Förderung')} _items={PEOPLE.slice(0, 3)} _size="small" />
						<FinkAvatarGroup _label={t('Referat 1')} _items={PEOPLE} _max={6} _size="large" />
					</FinkStack>
				),
				code: {
					react: `<FinkAvatarGroup _label="Bearbeitende" _items={people} _max={4} />`,
					html: `<fink-avatar-group _label="Bearbeitende" _max="4" _items='[{"label":"Erika Mustermann"},{"label":"Jonas Weber"}]'></fink-avatar-group>`,
				},
			},
		],
	},
	{
		id: 'fink-divider',
		name: 'Divider',
		tag: 'fink-divider',
		layer: 'fink',
		category: 'Layout',
		icon: 'codicon codicon-dash',
		summary: t('Trennlinie horizontal oder vertikal, mit optionaler Beschriftung und Einrückung. Vorbild: MUI Divider, Vuetify v-divider, Material 3 Divider.'),
		demos: [
			{
				title: t('Varianten'),
				render: () => (
					<FinkStack _gap="4">
						<FinkDivider />
						<FinkDivider _label={t('oder')} />
						<FinkDivider _label={t('Ältere Einträge')} _align="start" />
						<FinkDivider _variant="middle" />
						<FinkStack _direction="row" _gap="3" _align="center">
							<KolButton _label={t('Kopieren')} _variant="ghost" _icons="codicon codicon-copy" />
							<FinkDivider _orientation="vertical" />
							<KolButton _label={t('Teilen')} _variant="ghost" _icons="codicon codicon-share" />
						</FinkStack>
					</FinkStack>
				),
				code: {
					react: `<FinkDivider />
<FinkDivider _label="oder" />
<FinkDivider _label="Ältere Einträge" _align="start" />
<FinkDivider _orientation="vertical" />`,
					html: `<fink-divider _label="oder"></fink-divider>`,
				},
			},
		],
	},
	{
		id: 'fink-fab',
		name: 'FAB & Speed Dial',
		tag: 'fink-fab',
		layer: 'fink',
		category: 'Aktion',
		icon: 'codicon codicon-add',
		summary: t('Schwebende Hauptaktion einer Ansicht, als Icon, mit Text (Extended) oder als Speed Dial mit sichtbar beschrifteten Unteraktionen. Vorbild: MUI Fab/SpeedDial, Vuetify v-fab, Material 3 FAB.'),
		guidance: [t('Nur eine FAB pro Ansicht, für die wichtigste positive Aktion.'), t('Am Desktop meist besser als normale Primärschaltfläche im Seitenkopf.')],
		demos: [
			{
				title: t('FAB, Extended FAB und Speed Dial'),
				render: () => <FabDemo />,
				code: {
					react: `<FinkFab _label="Neuer Antrag" onFinkClick={create} />
<FinkFab _label="Neuer Antrag" _extended _icons="codicon codicon-edit" />
<FinkFab
  _label="Erstellen"
  _position="bottom-end"
  _actions={[
    { id: 'application', label: 'Antrag', icon: 'codicon codicon-file-add' },
    { id: 'message', label: 'Nachricht', icon: 'codicon codicon-mail' },
  ]}
  onFinkSelect={(e) => create(e.detail)}
/>`,
					html: `<fink-fab _label="Neuer Antrag" _position="bottom-end"></fink-fab>`,
				},
			},
		],
	},
	{
		id: 'fink-range-slider',
		name: 'Range Slider',
		tag: 'fink-range-slider',
		layer: 'fink',
		category: 'Formular',
		icon: 'codicon codicon-settings',
		summary: t('Von-bis-Bereich mit zwei Griffen, Einheit, Skala und optionalen Zahlenfeldern. Vorbild: Vuetify v-range-slider, MUI Slider (range), Carbon Slider.'),
		guidance: [t('Für einen einzelnen Wert kol-input-range verwenden.'), t('Bei genauen Beträgen _showInputs aktivieren.')],
		demos: [
			{
				title: t('Fördersumme und Bearbeitungszeit'),
				render: () => <RangeDemo />,
				code: {
					react: `<FinkRangeSlider
  _label="Fördersumme"
  _min={0}
  _max={250000}
  _step={5000}
  _unit="€"
  _value={range}
  onFinkChange={(e) => setRange(e.detail)}
/>`,
					html: `<fink-range-slider _label="Fördersumme" _min="0" _max="250000" _value="[20000,120000]" _unit="€"></fink-range-slider>`,
				},
			},
		],
	},
	{
		id: 'fink-calendar',
		name: 'Calendar',
		tag: 'fink-calendar',
		layer: 'fink',
		category: 'Formular',
		icon: 'codicon codicon-calendar',
		summary: t('Monatsansicht zur Datumsauswahl mit Grenzen, gesperrten Wochenenden und markierten Tagen; volle Tastaturbedienung. Vorbild: MUI DateCalendar, Vuetify v-date-picker, Material 3 Date picker.'),
		guidance: [t('Für bekannte Daten wie Geburtsdaten kol-input-date nutzen; der Kalender lohnt sich bei Terminwahl.'), t('Markierungen immer mit _markerLabel erklären.')],
		demos: [
			{
				title: t('Termin mit freien Tagen'),
				render: () => <CalendarDemo />,
				code: {
					react: `<FinkCalendar
  _label="Termin wählen"
  _value={date}
  _min="2026-11-14"
  _disableWeekends
  _markers={['2026-11-16', '2026-11-18']}
  _markerLabel="freie Termine"
  onFinkChange={(e) => setDate(e.detail)}
/>`,
					html: `<fink-calendar _label="Termin wählen" _disable-weekends _markers='["2026-11-16"]' _marker-label="freie Termine"></fink-calendar>`,
				},
			},
		],
	},
	{
		id: 'fink-carousel',
		name: 'Carousel',
		tag: 'fink-carousel',
		layer: 'fink',
		category: 'Inhalt',
		icon: 'codicon codicon-layout-panel-justify',
		summary: t('Folien mit Zurück/Weiter, Folienwahl, Wischen und optionalem Autoplay mit Pause-Schaltfläche. Vorbild: Vuetify v-carousel, Material 3 Carousel, Ant Carousel.'),
		guidance: [t('Wichtige Inhalte nie nur in späteren Folien verstecken.'), t('Autoplay nur mit Pause; es stoppt bei Fokus und Zeiger.')],
		demos: [
			{
				title: t('Förderprogramme'),
				render: () => <CarouselDemo />,
				code: {
					react: `<FinkCarousel _label="Aktuelle Förderprogramme" _perView={2} _autoplay={6000}>
  {programs.map((p) => <ProgramCard key={p.id} {...p} />)}
</FinkCarousel>`,
					html: `<fink-carousel _label="Förderprogramme">
  <article>…</article>
  <article>…</article>
</fink-carousel>`,
				},
			},
		],
	},
	{
		id: 'fink-kbd',
		name: 'Kbd',
		tag: 'fink-kbd',
		layer: 'fink',
		category: 'Inhalt',
		icon: 'codicon codicon-keyboard',
		summary: t('Tastenkürzel als Tastenkappen, z. B. in Hilfetexten und Menüs. Vorbild: Vuetify v-kbd, Atlassian Keyboard shortcut.'),
		demos: [
			{
				title: t('Tastenkürzel im Text'),
				render: () => (
					<p>
						{t('Suche öffnen mit')} <FinkKbd _keys={t('Strg+K')} />, {t('speichern mit')} <FinkKbd _keys={t('Strg+S')} /> {t('und Hilfe mit')} <FinkKbd _keys="?" />.
					</p>
				),
				code: { react: `<FinkKbd _keys="Strg+K" />`, html: `<fink-kbd _keys="Strg+K"></fink-kbd>` },
			},
		],
	},
	{
		id: 'fink-back-to-top',
		name: 'Back to Top',
		tag: 'fink-back-to-top',
		layer: 'fink',
		category: 'Navigation',
		icon: 'codicon codicon-arrow-up',
		summary: t('Erscheint nach einer Scrollstrecke, scrollt nach oben und setzt den Fokus auf die Überschrift. Vorbild: Ant FloatButton.BackTop, GOV.UK Back to top.'),
		demos: [
			{
				title: t('Im Fluss (Demo)'),
				render: () => <FinkBackToTop _position="inline" />,
				code: {
					react: `<FinkBackToTop _threshold={600} _target="h1" />`,
					html: `<fink-back-to-top _threshold="600"></fink-back-to-top>`,
				},
			},
		],
	},
	{
		id: 'fink-transfer-list',
		name: 'Transfer List',
		tag: 'fink-transfer-list',
		layer: 'fink',
		category: 'Formular',
		icon: 'codicon codicon-arrow-swap',
		summary: t('Zwei Listen mit Suche, „Alle auswählen“ und Zählern; Einträge werden per Schaltfläche verschoben und angesagt. Vorbild: MUI Transfer List, Ant Transfer.'),
		guidance: [t('Lohnt sich ab etwa zehn Optionen; darunter Checkboxen verwenden.'), t('Auf schmalen Flächen stehen die Listen untereinander.')],
		demos: [
			{
				title: t('Programme einem Referat zuordnen'),
				render: () => <TransferDemo />,
				code: {
					react: `<FinkTransferList
  _label="Programme für das Referat"
  _sourceLabel="Alle Programme"
  _targetLabel="Referat 1"
  _items={programs}
  _value={selected}
  onFinkChange={(e) => setSelected(e.detail)}
/>`,
					html: `<fink-transfer-list _label="Programme" _items='[{"id":"a","label":"Digitalisierung"}]'></fink-transfer-list>`,
				},
			},
		],
	},
	{
		id: 'fink-otp-input',
		name: 'OTP Input',
		tag: 'fink-otp-input',
		layer: 'fink',
		category: 'Formular',
		icon: 'codicon codicon-key',
		summary: t('Einmalcode in Einzelfeldern mit Einfügen, SMS-Autofill, automatischem Weiterspringen und Fehlermeldung. Vorbild: Vuetify v-otp-input, Ant Input.OTP.'),
		guidance: [t('Immer sagen, wohin der Code geschickt wurde, und einen Weg zum erneuten Senden anbieten.')],
		demos: [
			{
				title: t('SMS-Code und Wiederherstellungscode'),
				render: () => <OtpDemo />,
				code: {
					react: `<FinkOtpInput
  _label="Bestätigungscode"
  _hint="Code an +49 151 ••• 42 gesendet"
  _error={error}
  onFinkComplete={(e) => verify(e.detail)}
/>`,
					html: `<fink-otp-input _label="Bestätigungscode" _length="6"></fink-otp-input>`,
				},
			},
		],
	},
	{
		id: 'fink-toc',
		name: 'Table of Contents',
		tag: 'fink-toc',
		layer: 'fink',
		category: 'Navigation',
		icon: 'codicon codicon-list-tree',
		summary: t('Inhaltsverzeichnis langer Seiten mit Hervorhebung des sichtbaren Abschnitts; Einträge übergeben oder aus Überschriften lesen. Vorbild: Ant Anchor, GOV.UK Contents list.'),
		demos: [
			{
				title: t('Seitenverzeichnis mit Scrollspy'),
				render: () => <TocDemo />,
				code: {
					react: `<FinkToc _selector="main h2[id], main h3[id]" _sticky />`,
					html: `<fink-toc _selector="main h2[id]" _sticky></fink-toc>`,
				},
			},
		],
	},
	{
		id: 'fink-sparkline',
		name: 'Sparkline',
		tag: 'fink-sparkline',
		layer: 'fink',
		category: 'Daten',
		icon: 'codicon codicon-graph-line',
		summary: t('Kleiner Verlaufsgraph für Tabellen und Kennzahlen als Linie, Fläche oder Balken; der Name fasst den Verlauf in Worten zusammen. Vorbild: Vuetify v-sparkline, MUI X SparkLineChart.'),
		guidance: [t('Zeigt Tendenzen, keine exakten Werte; exakte Zahlen daneben oder in einer Tabelle nennen.')],
		demos: [
			{
				title: t('Verlauf in einer Tabelle'),
				render: () => <SparklineDemo />,
				code: {
					react: `<FinkSparkline _label="Anträge pro Woche" _values={[12, 18, 15, 22, 28]} _showValue />
<FinkSparkline _label="Anträge pro Woche" _values={values} _type="bar" _tone="success" />`,
					html: `<fink-sparkline _label="Anträge pro Woche" _values="[12,18,15,22,28]"></fink-sparkline>`,
				},
			},
		],
	},
	{
		id: 'fink-image-list',
		name: 'Image List',
		tag: 'fink-image-list',
		layer: 'fink',
		category: 'Inhalt',
		icon: 'codicon codicon-file-media',
		summary: t('Bildergalerie als Raster, Masonry oder „quilted“ mit Bildunterschriften und Lightbox (kol-dialog) samt Pfeiltasten. Vorbild: MUI Image List, Ant Image.PreviewGroup.'),
		guidance: [t('Jedes Bild braucht einen Alternativtext, der den Inhalt beschreibt.'), t('Für Produktbilder mit Aktionen besser Karten verwenden.')],
		demos: [
			{
				title: t('Galerie mit drei Anordnungen'),
				render: () => <ImageListDemo />,
				code: {
					react: `<FinkImageList
  _label="Projekte aus der Förderung"
  _variant="quilted"
  _items={[
    { src: '/rathaus.jpg', alt: 'Rathausplatz bei der Eröffnung', title: 'Rathausplatz', cols: 2, rows: 2 },
    { src: '/park.jpg', alt: 'Stadtpark im Sommer', title: 'Stadtpark' },
  ]}
/>`,
					html: `<fink-image-list _label="Projekte" _variant="masonry" _items='[{"src":"/a.jpg","alt":"…","title":"…"}]'></fink-image-list>`,
				},
			},
		],
	},
	{
		id: 'fink-tour',
		name: 'Tour',
		tag: 'fink-tour',
		layer: 'fink',
		category: 'Feedback',
		icon: 'codicon codicon-compass',
		summary: t('Geführte Tour, die Elemente nacheinander hervorhebt und erklärt; Escape beendet, der Fokus folgt der Karte. Vorbild: Ant Tour, Atlassian Spotlight.'),
		guidance: [t('Nur für wirklich neue Bereiche, höchstens fünf Schritte.'), t('Immer überspringbar; nie automatisch bei jedem Besuch starten.')],
		demos: [
			{
				title: t('Einführung in drei Schritten'),
				render: () => <TourDemo />,
				code: {
					react: `<FinkTour
  _label="Neu im Förderportal"
  _open={open}
  _steps={[
    { target: '#search', title: 'Alles finden', description: 'Suchen Sie nach Aktenzeichen …' },
    { target: '#new', title: 'Antrag anlegen', description: 'Hier starten Sie einen neuen Antrag.' },
  ]}
  onFinkClose={() => setOpen(false)}
/>`,
					html: `<fink-tour _label="Neu im Förderportal" _steps='[{"target":"#search","title":"Alles finden","description":"…"}]'></fink-tour>`,
				},
			},
		],
	},
	{
		id: 'fink-virtual-list',
		name: 'Virtual List',
		tag: 'fink-virtual-list',
		layer: 'fink',
		category: 'Daten',
		icon: 'codicon codicon-list-ordered',
		summary: t('Sehr lange Listen, von denen nur die sichtbaren Zeilen gerendert werden; Gesamtlänge per aria-setsize. Vorbild: Vuetify v-virtual-scroll, Ant List (virtual).'),
		guidance: [t('Erst ab mehreren Tausend Einträgen nötig; darunter Paginierung bevorzugen.'), t('Browser-Suche (Strg+F) findet nur gerenderte Zeilen – eine eigene Suche anbieten.')],
		demos: [
			{
				title: t('10.000 Anträge'),
				render: () => <VirtualDemo />,
				code: {
					react: `<FinkVirtualList _label="Alle Anträge" _items={applications} _itemHeight={56} _height="22rem" onFinkSelect={(e) => open(e.detail)} />`,
					html: `<fink-virtual-list _label="Alle Anträge" _height="22rem"></fink-virtual-list>
<script type="module">
  document.querySelector('fink-virtual-list')._items = items;
</script>`,
				},
			},
		],
	},
	{
		id: 'fink-bar-chart',
		name: 'Bar Chart',
		tag: 'fink-bar-chart',
		layer: 'fink',
		category: 'Daten',
		icon: 'codicon codicon-graph',
		summary: t('Balkendiagramm, das zugleich eine echte Datentabelle ist; Werte stehen immer als Zahl daneben. Vorbild: MUI X BarChart, Carbon Simple bar chart.'),
		guidance: [t('Für Vergleiche weniger Kategorien; Verläufe über die Zeit als Sparkline zeigen.')],
		demos: [
			{
				title: t('Bewilligte Mittel nach Programm'),
				render: () => (
					<div className="demo-grid-2">
						<FinkBarChart
							_label={t('Bewilligte Mittel 2026')}
							_labelHeader={t('Programm')}
							_valueHeader={t('Betrag')}
							_unit={t('Tsd. €')}
							_sorted
							_data={[
								{ label: t('Klimaschutz'), value: 1240, tone: 'success' },
								{ label: t('Digitalisierung'), value: 860 },
								{ label: t('Innovation'), value: 610, tone: 'info' },
								{ label: t('Kultur'), value: 180, tone: 'warning' },
							]}
						/>
						<FinkBarChart
							_label={t('Bearbeitungsstand')}
							_unit="%"
							_max={100}
							_data={[
								{ label: t('Neu'), value: 18, tone: 'info' },
								{ label: t('In Prüfung'), value: 27 },
								{ label: t('Bewilligt'), value: 41, tone: 'success' },
								{ label: t('Abgelehnt'), value: 14, tone: 'danger' },
							]}
						/>
					</div>
				),
				code: {
					react: `<FinkBarChart
  _label="Bewilligte Mittel 2026"
  _unit="Tsd. €"
  _sorted
  _data={[
    { label: 'Klimaschutz', value: 1240, tone: 'success' },
    { label: 'Digitalisierung', value: 860 },
  ]}
/>`,
					html: `<fink-bar-chart _label="Bewilligte Mittel" _unit="Tsd. €" _data='[{"label":"Klimaschutz","value":1240}]'></fink-bar-chart>`,
				},
			},
		],
	},
	{
		id: 'fink-popconfirm',
		name: 'Popconfirm',
		tag: 'fink-popconfirm',
		layer: 'fink',
		category: 'Aktion',
		icon: 'codicon codicon-question',
		summary: t('Leichte Rückfrage direkt an der Schaltfläche, z. B. vor dem Löschen eines Entwurfs. Vorbild: Ant Popconfirm.'),
		guidance: [t('Für folgenreiche oder unumkehrbare Aktionen mit Daten anderer Personen kol-dialog verwenden.')],
		demos: [
			{
				title: t('Löschen und Archivieren'),
				render: () => <PopconfirmDemo />,
				code: {
					react: `<FinkPopconfirm
  _label="Löschen"
  _icons="codicon codicon-trash"
  _variant="danger"
  _danger
  _question="Entwurf wirklich löschen?"
  onFinkConfirm={remove}
/>`,
					html: `<fink-popconfirm _label="Löschen" _question="Entwurf wirklich löschen?" _danger></fink-popconfirm>`,
				},
			},
		],
	},
	{
		id: 'fink-infinite-scroll',
		name: 'Infinite Scroll',
		tag: 'fink-infinite-scroll',
		layer: 'fink',
		category: 'Daten',
		icon: 'codicon codicon-fold-down',
		summary: t('Lädt beim Erreichen des Endes nach, bietet aber immer auch „Mehr laden“ und sagt Ladezustand und Ende an. Vorbild: Vuetify v-infinite-scroll.'),
		guidance: [t('Nicht für Seiten mit Fußzeile, die erreichbar bleiben muss – dann _auto={false}.'), t('Für Suchergebnisse mit Sprungzielen ist Paginierung meist besser.')],
		demos: [
			{
				title: t('Meldungen nachladen'),
				render: () => <InfiniteDemo />,
				code: {
					react: `<FinkInfiniteScroll _loading={loading} _done={!hasMore} _count={items.length} onFinkLoad={loadMore}>
  <FinkList _label="Meldungen" _items={items} />
</FinkInfiniteScroll>`,
					html: `<fink-infinite-scroll>
  <ul>…</ul>
</fink-infinite-scroll>`,
				},
			},
		],
	},
	{
		id: 'fink-splitter',
		name: 'Splitter',
		tag: 'fink-splitter',
		layer: 'fink',
		category: 'Layout',
		icon: 'codicon codicon-split-horizontal',
		summary: t('Zwei Bereiche mit verschiebbarer, per Tastatur bedienbarer Trennlinie; auf schmalen Flächen untereinander. Vorbild: Ant Splitter.'),
		demos: [
			{
				title: t('Liste und Detail'),
				render: () => <SplitterDemo />,
				code: {
					react: `<FinkSplitter _label="Breite der Liste" _value={size} onFinkResize={(e) => setSize(e.detail)}>
  <div slot="start">…</div>
  <div slot="end">…</div>
</FinkSplitter>`,
					html: `<fink-splitter _value="40">
  <div slot="start">…</div>
  <div slot="end">…</div>
</fink-splitter>`,
				},
			},
		],
	},
];
