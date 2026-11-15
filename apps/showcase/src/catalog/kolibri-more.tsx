import { useState, type ReactNode } from 'react';
import {
	FinkStack,
	KolAbbr,
	KolBreadcrumb,
	KolButtonLink,
	KolCombobox,
	KolDetails,
	KolDrawer,
	KolForm,
	KolHeading,
	KolIcon,
	KolImage,
	KolInputCheckbox,
	KolInputColor,
	KolInputDate,
	KolInputEmail,
	KolInputFile,
	KolInputNumber,
	KolInputPassword,
	KolInputRadio,
	KolInputRange,
	KolInputText,
	KolKolibri,
	KolLink,
	KolLinkButton,
	KolMeter,
	KolNav,
	KolPagination,
	KolPopoverButton,
	KolQuote,
	KolSelect,
	KolSingleSelect,
	KolSkipNav,
	KolSpin,
	KolSplitButton,
	KolTableStateless,
	KolTextarea,
	KolToolbar,
	KolTree,
	KolTreeItem,
	KolVersion,
	KolButton,
	useToast,
} from '@fink/react';
import { t } from '../i18n';
import type { CatalogEntry, Category } from './types';

const DOCS = 'https://public-ui.github.io/docs/components';

/** Illustration als Data-URI, damit die Demo ohne externe Dateien auskommt. */
export const ILLUSTRATION =
	'data:image/svg+xml;utf8,' +
	encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 160"><rect width="320" height="160" rx="16" fill="#e9e7ff"/><circle cx="72" cy="80" r="36" fill="#3b2fc9"/><rect x="128" y="52" width="140" height="14" rx="7" fill="#3b2fc9"/><rect x="128" y="78" width="110" height="10" rx="5" fill="#8f87e6"/><rect x="128" y="98" width="80" height="10" rx="5" fill="#c9c5f5"/></svg>`,
	);

const OPTIONS = [
	{ label: t('Digitalisierung'), value: 'dig' },
	{ label: t('Klimaschutz'), value: 'klima' },
	{ label: t('Kultur vor Ort'), value: 'kultur' },
];

interface Def {
	tag: string;
	name: string;
	category: Category;
	icon: string;
	summary: string;
	doc?: string;
	title: string;
	render: () => ReactNode;
	react: string;
	html: string;
}

const entry = (d: Def): CatalogEntry => ({
	id: d.tag,
	name: d.name,
	tag: d.tag,
	layer: 'kolibri',
	category: d.category,
	icon: d.icon,
	summary: d.summary,
	docsUrl: `${DOCS}/${d.doc ?? d.tag.replace('kol-', '')}`,
	demos: [{ title: d.title, render: d.render, code: { react: d.react, html: d.html } }],
});

function DrawerDemo() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<KolButton _label={t('Drawer öffnen')} _variant="primary" _on={{ onClick: () => setOpen(true) }} />
			<KolDrawer _label={t('Filter')} _open={open} _align="right" _hasCloser _on={{ onClose: () => setOpen(false) }}>
				<FinkStack _gap="4">
					<KolSingleSelect _label={t('Programm')} _options={OPTIONS} _value="dig" />
					<KolButton _label={t('Anwenden')} _variant="primary" _on={{ onClick: () => setOpen(false) }} />
				</FinkStack>
			</KolDrawer>
		</>
	);
}

function PaginationDemo() {
	const [page, setPage] = useState(2);
	return <KolPagination _label={t('Seiten')} _page={page} _max={120} _pageSize={10} _on={{ onChangePage: (_e, v) => setPage(Number(v)) }} />;
}

function SpinDemo() {
	const [show, setShow] = useState(true);
	return (
		<FinkStack _direction="row" _gap="4" _align="center">
			<KolSpin _show={show} _label={t('Daten werden geladen')} _variant="cycle" />
			<KolSpin _show={show} _label={t('Daten werden geladen')} _variant="dot" />
			<KolButton _label={show ? t('Anhalten') : t('Starten')} _on={{ onClick: () => setShow((s) => !s) }} />
		</FinkStack>
	);
}

function ToolbarDemo() {
	const toast = useToast();
	return (
		<KolToolbar
			_label={t('Tabellenaktionen')}
			_items={[
				{ type: 'button', _label: t('Exportieren'), _icons: 'codicon codicon-export', _on: { onClick: () => toast.show({ type: 'success', label: t('Export erstellt') }) } },
				{ type: 'button', _label: t('Drucken'), _icons: 'codicon codicon-file-pdf' },
				{ type: 'hr' },
				{ type: 'link', _label: t('Hilfe'), _href: '#/components/kol-toolbar', _icons: 'codicon codicon-question' },
			]}
		/>
	);
}

const TABLE_HEADERS = {
	horizontal: [
		[
			{ label: t('Programm'), key: 'program', width: 180 },
			{ label: t('Budget'), key: 'budget', textAlign: 'right' as const, width: 120 },
			{ label: t('Bewilligt'), key: 'approved', textAlign: 'right' as const, width: 120 },
		],
	],
};

const TABLE_DATA = [
	{ program: t('Digitalisierung im Mittelstand'), budget: '900.000 €', approved: '648.000 €' },
	{ program: t('Klimaschutz in Kommunen'), budget: '1.200.000 €', approved: '492.000 €' },
	{ program: t('Kultur vor Ort'), budget: '300.000 €', approved: '87.000 €' },
];

const defs: Def[] = [
	{
		tag: 'kol-abbr',
		name: 'Abbr',
		category: 'Inhalt',
		icon: 'codicon codicon-symbol-key',
		summary: t('Abkürzung mit ausgeschriebener Bedeutung als Tooltip.'),
		title: t('Abkürzungen'),
		render: () => (
			<p>
				{t('Fink erfüllt')} <KolAbbr _label="Web Content Accessibility Guidelines">WCAG</KolAbbr> 2.2 {t('und')} <KolAbbr _label="Barrierefreie-Informationstechnik-Verordnung">BITV</KolAbbr> 2.0.
			</p>
		),
		react: `<KolAbbr _label="Web Content Accessibility Guidelines">WCAG</KolAbbr>`,
		html: `<kol-abbr _label="Web Content Accessibility Guidelines">WCAG</kol-abbr>`,
	},
	{
		tag: 'kol-breadcrumb',
		name: 'Breadcrumb',
		category: 'Navigation',
		icon: 'codicon codicon-chevron-right',
		summary: t('Pfad zur aktuellen Seite in einer Hierarchie.'),
		title: t('Brotkrumen'),
		render: () => (
			<KolBreadcrumb
				_label={t('Brotkrumen')}
				_links={[
					{ _label: t('Start'), _href: '#/', _icons: 'codicon codicon-home', _hideLabel: true },
					{ _label: t('Komponenten'), _href: '#/components' },
					{ _label: 'Breadcrumb', _href: '#/components/kol-breadcrumb' },
				]}
			/>
		),
		react: `<KolBreadcrumb _label="Brotkrumen" _links={[{ _label: 'Start', _href: '/' }, { _label: 'Komponenten', _href: '/components' }]} />`,
		html: `<kol-breadcrumb _label="Brotkrumen"></kol-breadcrumb>`,
	},
	{
		tag: 'kol-button-link',
		name: 'Button Link',
		category: 'Aktion',
		icon: 'codicon codicon-link',
		summary: t('Semantisch ein Button, optisch ein Link – z. B. für „Ändern“ in Listen.'),
		title: t('Aktion im Fließtext'),
		render: () => (
			<p>
				{t('Ihre Anschrift ist hinterlegt.')} <KolButtonLink _label={t('Ändern')} />
			</p>
		),
		react: `<KolButtonLink _label="Ändern" _on={{ onClick: edit }} />`,
		html: `<kol-button-link _label="Ändern"></kol-button-link>`,
	},
	{
		tag: 'kol-combobox',
		name: 'Combobox',
		category: 'Formular',
		icon: 'codicon codicon-search',
		summary: t('Eingabefeld mit Vorschlagsliste (Autocomplete).'),
		title: t('Autovervollständigung'),
		doc: 'combobox',
		render: () => <KolCombobox _label={t('Stadt')} _suggestions={['Berlin', 'Bremen', 'Bonn', 'Dresden', 'Düsseldorf']} _hasClearButton />,
		react: `<KolCombobox _label="Stadt" _suggestions={['Berlin', 'Bremen', 'Bonn']} _hasClearButton />`,
		html: `<kol-combobox _label="Stadt" _has-clear-button></kol-combobox>`,
	},
	{
		tag: 'kol-details',
		name: 'Details',
		category: 'Inhalt',
		icon: 'codicon codicon-fold-down',
		summary: t('Ausklappbarer Zusatzinhalt auf Basis von details/summary.'),
		title: t('Zusatzinformation'),
		render: () => <KolDetails _label={t('Warum fragen wir das?')}>{t('Die Angabe brauchen wir, um die Förderhöhe zu berechnen.')}</KolDetails>,
		react: `<KolDetails _label="Warum fragen wir das?">…</KolDetails>`,
		html: `<kol-details _label="Warum fragen wir das?">…</kol-details>`,
	},
	{
		tag: 'kol-drawer',
		name: 'Drawer',
		category: 'Feedback',
		icon: 'codicon codicon-layout-sidebar-right',
		summary: t('Seitliches oder unteres Panel (Side/Bottom Sheet) mit Fokusfalle.'),
		title: t('Filter-Drawer'),
		render: () => <DrawerDemo />,
		react: `<KolDrawer _label="Filter" _open={open} _align="right" _hasCloser _on={{ onClose: () => setOpen(false) }}>…</KolDrawer>`,
		html: `<kol-drawer _label="Filter" _align="right" _has-closer></kol-drawer>`,
	},
	{
		tag: 'kol-form',
		name: 'Form',
		category: 'Formular',
		icon: 'codicon codicon-checklist',
		summary: t('Formular-Hülle mit Pflichtfeld-Hinweis und verlinkter Fehlerliste.'),
		title: t('Fehlerliste'),
		render: () => (
			<KolForm _requiredText _errorList={[{ message: t('Geben Sie Ihren Namen ein'), selector: '#form-demo-name' }]}>
				<KolInputText id="form-demo-name" _label={t('Name')} _required _touched _msg={{ _type: 'error', _description: t('Geben Sie Ihren Namen ein') }} />
			</KolForm>
		),
		react: `<KolForm _requiredText _errorList={[{ message: 'Geben Sie Ihren Namen ein', selector: '#name' }]}>…</KolForm>`,
		html: `<kol-form _required-text>…</kol-form>`,
	},
	{
		tag: 'kol-heading',
		name: 'Heading',
		category: 'Inhalt',
		icon: 'codicon codicon-symbol-text',
		summary: t('Überschrift mit wählbarer Ebene und optionaler Unterzeile.'),
		title: t('Überschriften'),
		render: () => (
			<FinkStack _gap="2">
				<KolHeading _label={t('Ebene 2')} _level={2} _secondaryHeadline={t('mit Unterzeile')} />
				<KolHeading _label={t('Ebene 3')} _level={3} />
				<KolHeading _label={t('Ebene 4')} _level={4} />
			</FinkStack>
		),
		react: `<KolHeading _label="Ebene 2" _level={2} _secondaryHeadline="mit Unterzeile" />`,
		html: `<kol-heading _label="Ebene 2" _level="2"></kol-heading>`,
	},
	{
		tag: 'kol-icon',
		name: 'Icon',
		category: 'Inhalt',
		icon: 'codicon codicon-symbol-color',
		summary: t('Icons aus Icon-Fonts (Codicons, Font Awesome, Kolicons) – dekorativ oder mit Label.'),
		title: t('Icon-Fonts'),
		render: () => (
			<FinkStack _direction="row" _gap="4" _align="center">
				<KolIcon _icons="codicon codicon-home" _label={t('Start')} />
				<KolIcon _icons="fa-solid fa-star" _label={t('Favorit')} />
				<KolIcon _icons="kolicon-check" _label={t('Erledigt')} />
				<KolIcon _icons="codicon codicon-heart" _label="" />
			</FinkStack>
		),
		react: `<KolIcon _icons="codicon codicon-home" _label="Start" />
<KolIcon _icons="fa-solid fa-star" _label="Favorit" />
<KolIcon _icons="codicon codicon-heart" _label="" /> {/* dekorativ */}`,
		html: `<kol-icon _icons="codicon codicon-home" _label="Start"></kol-icon>`,
	},
	{
		tag: 'kol-image',
		name: 'Image',
		category: 'Inhalt',
		icon: 'codicon codicon-file-media',
		summary: t('Bild mit Pflicht-Alternativtext, srcset und Lazy Loading.'),
		title: t('Illustration'),
		render: () => <KolImage _src={ILLUSTRATION} _alt={t('Illustration einer Profilkarte')} style={{ maxWidth: '20rem' }} />,
		react: `<KolImage _src="/img/karte.svg" _alt="Illustration einer Profilkarte" _loading="lazy" />`,
		html: `<kol-image _src="/img/karte.svg" _alt="Illustration einer Profilkarte"></kol-image>`,
	},
	{
		tag: 'kol-input-checkbox',
		name: 'Input Checkbox',
		category: 'Formular',
		icon: 'codicon codicon-pass',
		summary: t('Checkbox in den Varianten Standard, Switch und Button.'),
		title: t('Varianten'),
		doc: 'input-checkbox',
		render: () => (
			<FinkStack _gap="3">
				<KolInputCheckbox _label={t('Standard')} _checked />
				<KolInputCheckbox _label={t('Switch')} _variant="switch" _checked />
				<KolInputCheckbox _label={t('Button')} _variant="button" />
			</FinkStack>
		),
		react: `<KolInputCheckbox _label="Switch" _variant="switch" _checked />`,
		html: `<kol-input-checkbox _label="Switch" _variant="switch" _checked></kol-input-checkbox>`,
	},
	{
		tag: 'kol-input-color',
		name: 'Input Color',
		category: 'Formular',
		icon: 'codicon codicon-symbol-color',
		summary: t('Farbauswahl mit Picker und Texteingabe.'),
		title: t('Farbe wählen'),
		doc: 'input-color',
		render: () => <KolInputColor _label={t('Markenfarbe')} _value="#3b2fc9" />,
		react: `<KolInputColor _label="Markenfarbe" _value="#3b2fc9" />`,
		html: `<kol-input-color _label="Markenfarbe" _value="#3b2fc9"></kol-input-color>`,
	},
	{
		tag: 'kol-input-date',
		name: 'Input Date',
		category: 'Formular',
		icon: 'codicon codicon-calendar',
		summary: t('Datum, Monat, Woche, Uhrzeit und Zeitstempel mit Min/Max.'),
		title: t('Datumsfelder'),
		doc: 'input-date',
		render: () => (
			<div className="form-row">
				<KolInputDate _label={t('Datum')} _type="date" _value="2026-11-14" />
				<KolInputDate _label={t('Uhrzeit')} _type="time" _value="09:30" />
				<KolInputDate _label={t('Monat')} _type="month" _value="2026-11" />
			</div>
		),
		react: `<KolInputDate _label="Datum" _type="date" _min="2026-01-01" />`,
		html: `<kol-input-date _label="Datum" _type="date"></kol-input-date>`,
	},
	{
		tag: 'kol-input-email',
		name: 'Input Email',
		category: 'Formular',
		icon: 'codicon codicon-mail',
		summary: t('E-Mail-Feld mit Formatprüfung und Autocomplete.'),
		title: t('E-Mail-Adresse'),
		doc: 'input-email',
		render: () => <KolInputEmail _label={t('E-Mail-Adresse')} _autoComplete="email" _placeholder={t('name@beispiel.de')} />,
		react: `<KolInputEmail _label="E-Mail-Adresse" _autoComplete="email" />`,
		html: `<kol-input-email _label="E-Mail-Adresse" _auto-complete="email"></kol-input-email>`,
	},
	{
		tag: 'kol-input-file',
		name: 'Input File',
		category: 'Formular',
		icon: 'codicon codicon-file',
		summary: t('Dateiauswahl; Grundlage von fink-file-upload.'),
		title: t('Datei wählen'),
		doc: 'input-file',
		render: () => <KolInputFile _label={t('Nachweis')} _accept=".pdf" _hint={t('PDF, höchstens 10 MB')} />,
		react: `<KolInputFile _label="Nachweis" _accept=".pdf" _multiple />`,
		html: `<kol-input-file _label="Nachweis" _accept=".pdf"></kol-input-file>`,
	},
	{
		tag: 'kol-input-number',
		name: 'Input Number',
		category: 'Formular',
		icon: 'codicon codicon-symbol-numeric',
		summary: t('Zahlenfeld mit Min, Max und Schrittweite.'),
		title: t('Betrag'),
		doc: 'input-number',
		render: () => <KolInputNumber _label={t('Fördersumme in Euro')} _min={1000} _max={50000} _step={500} _value={12500} />,
		react: `<KolInputNumber _label="Fördersumme in Euro" _min={1000} _max={50000} _step={500} />`,
		html: `<kol-input-number _label="Fördersumme in Euro" _min="1000" _max="50000"></kol-input-number>`,
	},
	{
		tag: 'kol-input-password',
		name: 'Input Password',
		category: 'Formular',
		icon: 'codicon codicon-lock',
		summary: t('Passwortfeld mit Sichtbarkeitsumschalter.'),
		title: t('Passwort'),
		doc: 'input-password',
		render: () => <KolInputPassword _label={t('Passwort')} _autoComplete="new-password" _hint={t('Mindestens 12 Zeichen')} />,
		react: `<KolInputPassword _label="Passwort" _autoComplete="new-password" />`,
		html: `<kol-input-password _label="Passwort"></kol-input-password>`,
	},
	{
		tag: 'kol-input-radio',
		name: 'Input Radio',
		category: 'Formular',
		icon: 'codicon codicon-circle-large-filled',
		summary: t('Radiogruppe, vertikal oder horizontal.'),
		title: t('Auswahl'),
		doc: 'input-radio',
		render: () => <KolInputRadio _label={t('Förderprogramm')} _options={OPTIONS} _value="dig" />,
		react: `<KolInputRadio _label="Förderprogramm" _options={options} _value="dig" />`,
		html: `<kol-input-radio _label="Förderprogramm"></kol-input-radio>`,
	},
	{
		tag: 'kol-input-range',
		name: 'Input Range',
		category: 'Formular',
		icon: 'codicon codicon-settings',
		summary: t('Schieberegler mit Zahlenfeld.'),
		title: t('Regler'),
		doc: 'input-range',
		render: () => <KolInputRange _label={t('Bearbeitungsdauer in Tagen')} _min={1} _max={30} _value={10} />,
		react: `<KolInputRange _label="Bearbeitungsdauer in Tagen" _min={1} _max={30} />`,
		html: `<kol-input-range _label="Bearbeitungsdauer in Tagen" _min="1" _max="30"></kol-input-range>`,
	},
	{
		tag: 'kol-input-text',
		name: 'Input Text',
		category: 'Formular',
		icon: 'codicon codicon-symbol-string',
		summary: t('Textfeld für Text, Suche, URL und Telefon mit Zähler und Smart Button.'),
		title: t('Textfeld'),
		doc: 'input-text',
		render: () => <KolInputText _label={t('Aktenzeichen')} _hint={t('Steht auf dem Bescheid')} _hasCounter _maxLength={16} />,
		react: `<KolInputText _label="Aktenzeichen" _hint="Steht auf dem Bescheid" _hasCounter _maxLength={16} />`,
		html: `<kol-input-text _label="Aktenzeichen" _has-counter _max-length="16"></kol-input-text>`,
	},
	{
		tag: 'kol-kolibri',
		name: 'KoliBri',
		category: 'Inhalt',
		icon: 'codicon codicon-heart',
		summary: t('KoliBri-Logo, z. B. für „Gebaut mit KoliBri“.'),
		title: t('Logo'),
		render: () => <KolKolibri _labeled style={{ width: '10rem' }} />,
		react: `<KolKolibri _labeled />`,
		html: `<kol-kolibri _labeled></kol-kolibri>`,
	},
	{
		tag: 'kol-link',
		name: 'Link',
		category: 'Navigation',
		icon: 'codicon codicon-link',
		summary: t('Link mit Icon, externem Ziel und Kennzeichnung neuer Fenster.'),
		title: t('Links'),
		render: () => (
			<FinkStack _gap="2">
				<KolLink _href="#/patterns" _label={t('Interner Link')} />
				<KolLink _href="https://public-ui.github.io" _label={t('Externer Link')} _target="_blank" />
			</FinkStack>
		),
		react: `<KolLink _href="https://public-ui.github.io" _label="Externer Link" _target="_blank" />`,
		html: `<kol-link _href="https://public-ui.github.io" _label="Externer Link" _target="_blank"></kol-link>`,
	},
	{
		tag: 'kol-link-button',
		name: 'Link Button',
		category: 'Aktion',
		icon: 'codicon codicon-debug-stop',
		summary: t('Semantisch ein Link, optisch ein Button – für Navigation mit Button-Optik.'),
		title: t('Navigation als Button'),
		render: () => <KolLinkButton _href="#/compositions" _label={t('Kompositionen ansehen')} _variant="primary" _icons="codicon codicon-play" />,
		react: `<KolLinkButton _href="/compositions" _label="Kompositionen ansehen" _variant="primary" />`,
		html: `<kol-link-button _href="/compositions" _label="Kompositionen ansehen" _variant="primary"></kol-link-button>`,
	},
	{
		tag: 'kol-meter',
		name: 'Meter',
		category: 'Daten',
		icon: 'codicon codicon-dashboard',
		summary: t('Messwert in einem bekannten Bereich mit Schwellen (low/high/optimum), z. B. Budgetauslastung.'),
		title: t('Budgetauslastung'),
		render: () => (
			<FinkStack _gap="3">
				<KolMeter _label={t('Digitalisierung')} _value={72} _min={0} _max={100} _low={50} _high={90} _optimum={60} _unit="%" />
				<KolMeter _label={t('Klimaschutz')} _value={95} _min={0} _max={100} _low={50} _high={90} _optimum={60} _unit="%" />
			</FinkStack>
		),
		react: `<KolMeter _label="Digitalisierung" _value={72} _min={0} _max={100} _low={50} _high={90} _optimum={60} _unit="%" />`,
		html: `<kol-meter _label="Digitalisierung" _value="72" _min="0" _max="100" _unit="%"></kol-meter>`,
	},
	{
		tag: 'kol-nav',
		name: 'Nav',
		category: 'Navigation',
		icon: 'codicon codicon-list-tree',
		summary: t('Navigation mit Untermenüs, Icons und kompaktem Modus.'),
		title: t('Mehrstufige Navigation'),
		render: () => (
			<div style={{ maxWidth: '18rem' }}>
				<KolNav
					_label={t('Bereiche')}
					_hasCompactButton
					_hasIconsWhenExpanded
					_links={[
						{ _label: t('Übersicht'), _href: '#/components/kol-nav', _icons: 'codicon codicon-home', _active: true },
						{ _label: t('Anträge'), _icons: 'codicon codicon-files', _children: [{ _label: t('Offen'), _href: '#/components/kol-nav' }, { _label: t('Archiv'), _href: '#/components/kol-nav' }] },
					]}
				/>
			</div>
		),
		react: `<KolNav _label="Bereiche" _hasCompactButton _links={links} />`,
		html: `<kol-nav _label="Bereiche" _has-compact-button></kol-nav>`,
	},
	{
		tag: 'kol-pagination',
		name: 'Pagination',
		category: 'Navigation',
		icon: 'codicon codicon-ellipsis',
		summary: t('Seitennavigation mit Seitengröße und Sprung an Anfang und Ende.'),
		title: t('Seiten'),
		render: () => <PaginationDemo />,
		react: `<KolPagination _label="Seiten" _page={page} _max={120} _pageSize={10} _on={{ onChangePage: (_e, p) => setPage(p) }} />`,
		html: `<kol-pagination _label="Seiten" _page="2" _max="120" _page-size="10"></kol-pagination>`,
	},
	{
		tag: 'kol-popover-button',
		name: 'Popover Button',
		category: 'Aktion',
		icon: 'codicon codicon-comment',
		summary: t('Button mit Popover auf Basis der nativen Popover-API.'),
		title: t('Popover'),
		render: () => (
			<KolPopoverButton _label={t('Hinweis anzeigen')} _icons="codicon codicon-info">
				<p style={{ margin: 0, padding: 'var(--fink-space-3)', maxWidth: '18rem' }}>{t('Die Frist kann einmalig um 14 Tage verlängert werden.')}</p>
			</KolPopoverButton>
		),
		react: `<KolPopoverButton _label="Hinweis anzeigen" _icons="codicon codicon-info">…</KolPopoverButton>`,
		html: `<kol-popover-button _label="Hinweis anzeigen">…</kol-popover-button>`,
	},
	{
		tag: 'kol-quote',
		name: 'Quote',
		category: 'Inhalt',
		icon: 'codicon codicon-quote',
		summary: t('Zitat als Block oder inline, mit Quellenlink.'),
		title: t('Zitat'),
		render: () => <KolQuote _quote={t('Gemeinsam machen wir HTML mit wiederverwendbaren Web Components barrierefrei.')} _label="KoliBri – Vision" _href="https://public-ui.github.io" _variant="block" />,
		react: `<KolQuote _quote="…" _label="KoliBri – Vision" _href="https://public-ui.github.io" _variant="block" />`,
		html: `<kol-quote _quote="…" _label="KoliBri – Vision" _href="https://public-ui.github.io" _variant="block"></kol-quote>`,
	},
	{
		tag: 'kol-select',
		name: 'Select',
		category: 'Formular',
		icon: 'codicon codicon-list-selection',
		summary: t('Native Auswahlliste, auch mit Mehrfachauswahl.'),
		title: t('Mehrfachauswahl'),
		render: () => <KolSelect _label={t('Programme')} _options={OPTIONS} _multiple _rows={3} _value={['dig']} />,
		react: `<KolSelect _label="Programme" _options={options} _multiple _rows={3} />`,
		html: `<kol-select _label="Programme" _multiple _rows="3"></kol-select>`,
	},
	{
		tag: 'kol-single-select',
		name: 'Single Select',
		category: 'Formular',
		icon: 'codicon codicon-chevron-down',
		summary: t('Einfachauswahl mit Filter und Löschen-Schaltfläche.'),
		title: t('Einfachauswahl'),
		doc: 'single-select',
		render: () => <KolSingleSelect _label={t('Programm')} _options={OPTIONS} _hasClearButton _placeholder={t('Bitte wählen')} />,
		react: `<KolSingleSelect _label="Programm" _options={options} _hasClearButton />`,
		html: `<kol-single-select _label="Programm" _has-clear-button></kol-single-select>`,
	},
	{
		tag: 'kol-skip-nav',
		name: 'Skip Nav',
		category: 'Navigation',
		icon: 'codicon codicon-debug-step-over',
		summary: t('Sprunglinks für Tastatur- und Screenreader-Nutzende; erscheinen beim Fokussieren.'),
		title: t('Sprunglinks (Tab drücken)'),
		render: () => (
			<KolSkipNav
				_label={t('Sprunglinks')}
				_links={[
					{ _label: t('Zum Inhalt'), _href: '#main-demo' },
					{ _label: t('Zur Suche'), _href: '#search-demo' },
				]}
			/>
		),
		react: `<KolSkipNav _label="Sprunglinks" _links={[{ _label: 'Zum Inhalt', _href: '#main' }]} />`,
		html: `<kol-skip-nav _label="Sprunglinks"></kol-skip-nav>`,
	},
	{
		tag: 'kol-spin',
		name: 'Spin',
		category: 'Feedback',
		icon: 'codicon codicon-loading',
		summary: t('Ladeanzeige als Kreis oder Punkte mit Ansage für Screenreader.'),
		title: t('Ladeanzeigen'),
		render: () => <SpinDemo />,
		react: `<KolSpin _show={loading} _label="Daten werden geladen" _variant="cycle" />`,
		html: `<kol-spin _show _label="Daten werden geladen"></kol-spin>`,
	},
	{
		tag: 'kol-split-button',
		name: 'Split Button',
		category: 'Aktion',
		icon: 'codicon codicon-split-horizontal',
		summary: t('Hauptaktion plus Menü mit Varianten.'),
		title: t('Speichern mit Varianten'),
		render: () => (
			<KolSplitButton _label={t('Speichern')} _variant="primary">
				<div className="menu">
					<KolButton _label={t('Als Entwurf speichern')} _variant="ghost" />
					<KolButton _label={t('Speichern und schließen')} _variant="ghost" />
				</div>
			</KolSplitButton>
		),
		react: `<KolSplitButton _label="Speichern" _variant="primary">…</KolSplitButton>`,
		html: `<kol-split-button _label="Speichern" _variant="primary">…</kol-split-button>`,
	},
	{
		tag: 'kol-table-stateless',
		name: 'Table Stateless',
		category: 'Daten',
		icon: 'codicon codicon-table',
		summary: t('Darstellende Tabelle ohne eigenen Zustand – Sortierung und Paging steuert die Anwendung.'),
		title: t('Einfache Tabelle'),
		render: () => <KolTableStateless _label={t('Budgets 2026')} _headerCells={TABLE_HEADERS} _data={TABLE_DATA} />,
		react: `<KolTableStateless _label="Budgets 2026" _headerCells={{ horizontal: [[{ label: 'Programm', key: 'program' }]] }} _data={rows} />`,
		html: `<kol-table-stateless _label="Budgets 2026"></kol-table-stateless>`,
	},
	{
		tag: 'kol-textarea',
		name: 'Textarea',
		category: 'Formular',
		icon: 'codicon codicon-note',
		summary: t('Mehrzeilige Eingabe mit Zähler und automatischer Höhe.'),
		title: t('Mehrzeilig'),
		render: () => <KolTextarea _label={t('Beschreibung')} _rows={3} _hasCounter _maxLength={280} _adjustHeight />,
		react: `<KolTextarea _label="Beschreibung" _rows={3} _hasCounter _maxLength={280} _adjustHeight />`,
		html: `<kol-textarea _label="Beschreibung" _rows="3" _has-counter></kol-textarea>`,
	},
	{
		tag: 'kol-toolbar',
		name: 'Toolbar',
		category: 'Aktion',
		icon: 'codicon codicon-tools',
		summary: t('Werkzeugleiste mit Pfeiltasten-Navigation (roving tabindex).'),
		title: t('Tabellenaktionen'),
		render: () => <ToolbarDemo />,
		react: `<KolToolbar _label="Tabellenaktionen" _items={[{ type: 'button', _label: 'Exportieren' }, { type: 'hr' }, { type: 'link', _label: 'Hilfe', _href: '/hilfe' }]} />`,
		html: `<kol-toolbar _label="Tabellenaktionen"></kol-toolbar>`,
	},
	{
		tag: 'kol-tree',
		name: 'Tree',
		category: 'Navigation',
		icon: 'codicon codicon-list-tree',
		summary: t('Baumnavigation mit kol-tree-item, Tastatursteuerung und aktivem Eintrag.'),
		title: t('Themenbaum'),
		render: () => (
			<KolTree _label={t('Themen')}>
				<KolTreeItem _label={t('Antrag')} _href="#/components/kol-tree" _open>
					<KolTreeItem _label={t('Nachweise')} _href="#/components/kol-tree" _active />
					<KolTreeItem _label={t('Fristen')} _href="#/components/kol-tree" />
				</KolTreeItem>
				<KolTreeItem _label={t('Konto')} _href="#/components/kol-tree" />
			</KolTree>
		),
		react: `<KolTree _label="Themen">
  <KolTreeItem _label="Antrag" _href="/antrag" _open>
    <KolTreeItem _label="Nachweise" _href="/antrag/nachweise" _active />
  </KolTreeItem>
</KolTree>`,
		html: `<kol-tree _label="Themen">
  <kol-tree-item _label="Antrag" _href="/antrag" _open></kol-tree-item>
</kol-tree>`,
	},
	{
		tag: 'kol-version',
		name: 'Version',
		category: 'Inhalt',
		icon: 'codicon codicon-versions',
		summary: t('Versionskennzeichnung als Badge.'),
		title: t('Version'),
		render: () => <KolVersion _label="0.1.0" />,
		react: `<KolVersion _label="0.1.0" />`,
		html: `<kol-version _label="0.1.0"></kol-version>`,
	},
];

export const kolibriMoreEntries: CatalogEntry[] = defs.map(entry);
