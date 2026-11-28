import {
	FinkAbbr,
	FinkBreadcrumb,
	FinkButton,
	FinkButtonLink,
	FinkCombobox,
	FinkDetails,
	FinkDrawer,
	FinkForm,
	FinkHeading,
	FinkIcon,
	FinkImage,
	FinkInputCheckbox,
	FinkInputColor,
	FinkInputDate,
	FinkInputEmail,
	FinkInputFile,
	FinkInputNumber,
	FinkInputPassword,
	FinkInputRadio,
	FinkInputRange,
	FinkInputText,
	FinkKolibri,
	FinkLink,
	FinkLinkButton,
	FinkMeter,
	FinkNav,
	FinkPagination,
	FinkPopoverButton,
	FinkQuote,
	FinkSelect,
	FinkSingleSelect,
	FinkSkipNav,
	FinkSpin,
	FinkSplitButton,
	FinkStack,
	FinkTableStateless,
	FinkTextarea,
	FinkToolbar,
	FinkTree,
	FinkTreeItem,
	FinkVersion,
	useToast,
} from '@fink-ui/react';
import { useState, type ReactNode } from 'react';
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
	docsUrl: `${DOCS}/${d.doc ?? d.tag.replace('fink-', '')}`,
	demos: [{ title: d.title, render: d.render, code: { react: d.react, html: d.html } }],
});

function DrawerDemo() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<FinkButton _label={t('Drawer öffnen')} _variant="primary" _on={{ onClick: () => setOpen(true) }} />
			<FinkDrawer _label={t('Filter')} _open={open} _align="right" _hasCloser _on={{ onClose: () => setOpen(false) }}>
				<FinkStack _gap="4">
					<FinkSingleSelect _label={t('Programm')} _options={OPTIONS} _value="dig" />
					<FinkButton _label={t('Anwenden')} _variant="primary" _on={{ onClick: () => setOpen(false) }} />
				</FinkStack>
			</FinkDrawer>
		</>
	);
}

function PaginationDemo() {
	const [page, setPage] = useState(2);
	return <FinkPagination _label={t('Seiten')} _page={page} _max={120} _pageSize={10} _on={{ onChangePage: (_e, v) => setPage(Number(v)) }} />;
}

function SpinDemo() {
	const [show, setShow] = useState(true);
	return (
		<FinkStack _direction="row" _gap="4" _align="center">
			<FinkSpin _show={show} _label={t('Daten werden geladen')} _variant="cycle" />
			<FinkSpin _show={show} _label={t('Daten werden geladen')} _variant="dot" />
			<FinkButton _label={show ? t('Anhalten') : t('Starten')} _on={{ onClick: () => setShow((s) => !s) }} />
		</FinkStack>
	);
}

function ToolbarDemo() {
	const toast = useToast();
	return (
		<FinkToolbar
			_label={t('Tabellenaktionen')}
			_items={[
				{
					type: 'button',
					_label: t('Exportieren'),
					_icons: 'codicon codicon-export',
					_on: { onClick: () => toast.show({ type: 'success', label: t('Export erstellt') }) },
				},
				{ type: 'button', _label: t('Drucken'), _icons: 'codicon codicon-file-pdf' },
				{ type: 'hr' },
				{ type: 'link', _label: t('Hilfe'), _href: '#/components/fink-toolbar', _icons: 'codicon codicon-question' },
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
		tag: 'fink-abbr',
		name: 'Abbr',
		category: 'Inhalt',
		icon: 'codicon codicon-symbol-key',
		summary: t('Abkürzung mit ausgeschriebener Bedeutung als Tooltip.'),
		title: t('Abkürzungen'),
		render: () => (
			<p>
				{t('Fink erfüllt')} <FinkAbbr _label="Web Content Accessibility Guidelines">WCAG</FinkAbbr> 2.2 {t('und')}{' '}
				<FinkAbbr _label="Barrierefreie-Informationstechnik-Verordnung">BITV</FinkAbbr> 2.0.
			</p>
		),
		react: `<FinkAbbr _label="Web Content Accessibility Guidelines">WCAG</FinkAbbr>`,
		html: `<fink-abbr _label="Web Content Accessibility Guidelines">WCAG</fink-abbr>`,
	},
	{
		tag: 'fink-breadcrumb',
		name: 'Breadcrumb',
		category: 'Navigation',
		icon: 'codicon codicon-chevron-right',
		summary: t('Pfad zur aktuellen Seite in einer Hierarchie.'),
		title: t('Brotkrumen'),
		render: () => (
			<FinkBreadcrumb
				_label={t('Brotkrumen')}
				_links={[
					{ _label: t('Start'), _href: '#/', _icons: 'codicon codicon-home', _hideLabel: true },
					{ _label: t('Komponenten'), _href: '#/components' },
					{ _label: 'Breadcrumb', _href: '#/components/fink-breadcrumb' },
				]}
			/>
		),
		react: `<FinkBreadcrumb _label="Brotkrumen" _links={[{ _label: 'Start', _href: '/' }, { _label: 'Komponenten', _href: '/components' }]} />`,
		html: `<fink-breadcrumb _label="Brotkrumen"></fink-breadcrumb>`,
	},
	{
		tag: 'fink-button-link',
		name: 'Button Link',
		category: 'Aktion',
		icon: 'codicon codicon-link',
		summary: t('Semantisch ein Button, optisch ein Link – z. B. für „Ändern“ in Listen.'),
		title: t('Aktion im Fließtext'),
		render: () => (
			<p>
				{t('Ihre Anschrift ist hinterlegt.')} <FinkButtonLink _label={t('Ändern')} />
			</p>
		),
		react: `<FinkButtonLink _label="Ändern" _on={{ onClick: edit }} />`,
		html: `<fink-button-link _label="Ändern"></fink-button-link>`,
	},
	{
		tag: 'fink-combobox',
		name: 'Combobox',
		category: 'Formular',
		icon: 'codicon codicon-search',
		summary: t('Eingabefeld mit Vorschlagsliste (Autocomplete).'),
		title: t('Autovervollständigung'),
		doc: 'combobox',
		render: () => <FinkCombobox _label={t('Stadt')} _suggestions={['Berlin', 'Bremen', 'Bonn', 'Dresden', 'Düsseldorf']} _hasClearButton />,
		react: `<FinkCombobox _label="Stadt" _suggestions={['Berlin', 'Bremen', 'Bonn']} _hasClearButton />`,
		html: `<fink-combobox _label="Stadt" _has-clear-button></fink-combobox>`,
	},
	{
		tag: 'fink-details',
		name: 'Details',
		category: 'Inhalt',
		icon: 'codicon codicon-fold-down',
		summary: t('Ausklappbarer Zusatzinhalt auf Basis von details/summary.'),
		title: t('Zusatzinformation'),
		render: () => <FinkDetails _label={t('Warum fragen wir das?')}>{t('Die Angabe brauchen wir, um die Förderhöhe zu berechnen.')}</FinkDetails>,
		react: `<FinkDetails _label="Warum fragen wir das?">…</FinkDetails>`,
		html: `<fink-details _label="Warum fragen wir das?">…</fink-details>`,
	},
	{
		tag: 'fink-drawer',
		name: 'Drawer',
		category: 'Feedback',
		icon: 'codicon codicon-layout-sidebar-right',
		summary: t('Seitliches oder unteres Panel (Side/Bottom Sheet) mit Fokusfalle.'),
		title: t('Filter-Drawer'),
		render: () => <DrawerDemo />,
		react: `<FinkDrawer _label="Filter" _open={open} _align="right" _hasCloser _on={{ onClose: () => setOpen(false) }}>…</FinkDrawer>`,
		html: `<fink-drawer _label="Filter" _align="right" _has-closer></fink-drawer>`,
	},
	{
		tag: 'fink-form',
		name: 'Form',
		category: 'Formular',
		icon: 'codicon codicon-checklist',
		summary: t('Formular-Hülle mit Pflichtfeld-Hinweis und verlinkter Fehlerliste.'),
		title: t('Fehlerliste'),
		render: () => (
			<FinkForm _requiredText _errorList={[{ message: t('Geben Sie Ihren Namen ein'), selector: '#form-demo-name' }]}>
				<FinkInputText id="form-demo-name" _label={t('Name')} _required _touched _msg={{ _type: 'error', _description: t('Geben Sie Ihren Namen ein') }} />
			</FinkForm>
		),
		react: `<FinkForm _requiredText _errorList={[{ message: 'Geben Sie Ihren Namen ein', selector: '#name' }]}>…</FinkForm>`,
		html: `<fink-form _required-text>…</fink-form>`,
	},
	{
		tag: 'fink-heading',
		name: 'Heading',
		category: 'Inhalt',
		icon: 'codicon codicon-symbol-text',
		summary: t('Überschrift mit wählbarer Ebene und optionaler Unterzeile.'),
		title: t('Überschriften'),
		render: () => (
			<FinkStack _gap="2">
				<FinkHeading _label={t('Ebene 2')} _level={2} _secondaryHeadline={t('mit Unterzeile')} />
				<FinkHeading _label={t('Ebene 3')} _level={3} />
				<FinkHeading _label={t('Ebene 4')} _level={4} />
			</FinkStack>
		),
		react: `<FinkHeading _label="Ebene 2" _level={2} _secondaryHeadline="mit Unterzeile" />`,
		html: `<fink-heading _label="Ebene 2" _level="2"></fink-heading>`,
	},
	{
		tag: 'fink-icon',
		name: 'Icon',
		category: 'Inhalt',
		icon: 'codicon codicon-symbol-color',
		summary: t('Icons aus Icon-Fonts (Codicons, Font Awesome, Kolicons) – dekorativ oder mit Label.'),
		title: t('Icon-Fonts'),
		render: () => (
			<FinkStack _direction="row" _gap="4" _align="center">
				<FinkIcon _icons="codicon codicon-home" _label={t('Start')} />
				<FinkIcon _icons="fa-solid fa-star" _label={t('Favorit')} />
				<FinkIcon _icons="kolicon-check" _label={t('Erledigt')} />
				<FinkIcon _icons="codicon codicon-heart" _label="" />
			</FinkStack>
		),
		react: `<FinkIcon _icons="codicon codicon-home" _label="Start" />
<FinkIcon _icons="fa-solid fa-star" _label="Favorit" />
<FinkIcon _icons="codicon codicon-heart" _label="" /> {/* dekorativ */}`,
		html: `<fink-icon _icons="codicon codicon-home" _label="Start"></fink-icon>`,
	},
	{
		tag: 'fink-image',
		name: 'Image',
		category: 'Inhalt',
		icon: 'codicon codicon-file-media',
		summary: t('Bild mit Pflicht-Alternativtext, srcset und Lazy Loading.'),
		title: t('Illustration'),
		render: () => <FinkImage _src={ILLUSTRATION} _alt={t('Illustration einer Profilkarte')} style={{ maxWidth: '20rem' }} />,
		react: `<FinkImage _src="/img/karte.svg" _alt="Illustration einer Profilkarte" _loading="lazy" />`,
		html: `<fink-image _src="/img/karte.svg" _alt="Illustration einer Profilkarte"></fink-image>`,
	},
	{
		tag: 'fink-input-checkbox',
		name: 'Input Checkbox',
		category: 'Formular',
		icon: 'codicon codicon-pass',
		summary: t('Checkbox in den Varianten Standard, Switch und Button.'),
		title: t('Varianten'),
		doc: 'input-checkbox',
		render: () => (
			<FinkStack _gap="3">
				<FinkInputCheckbox _label={t('Standard')} _checked />
				<FinkInputCheckbox _label={t('Switch')} _variant="switch" _checked />
				<FinkInputCheckbox _label={t('Button')} _variant="button" />
			</FinkStack>
		),
		react: `<FinkInputCheckbox _label="Switch" _variant="switch" _checked />`,
		html: `<fink-input-checkbox _label="Switch" _variant="switch" _checked></fink-input-checkbox>`,
	},
	{
		tag: 'fink-input-color',
		name: 'Input Color',
		category: 'Formular',
		icon: 'codicon codicon-symbol-color',
		summary: t('Farbauswahl mit Picker und Texteingabe.'),
		title: t('Farbe wählen'),
		doc: 'input-color',
		render: () => <FinkInputColor _label={t('Markenfarbe')} _value="#3b2fc9" />,
		react: `<FinkInputColor _label="Markenfarbe" _value="#3b2fc9" />`,
		html: `<fink-input-color _label="Markenfarbe" _value="#3b2fc9"></fink-input-color>`,
	},
	{
		tag: 'fink-input-date',
		name: 'Input Date',
		category: 'Formular',
		icon: 'codicon codicon-calendar',
		summary: t('Datum, Monat, Woche, Uhrzeit und Zeitstempel mit Min/Max.'),
		title: t('Datumsfelder'),
		doc: 'input-date',
		render: () => (
			<div className="form-row">
				<FinkInputDate _label={t('Datum')} _type="date" _value="2026-11-14" />
				<FinkInputDate _label={t('Uhrzeit')} _type="time" _value="09:30" />
				<FinkInputDate _label={t('Monat')} _type="month" _value="2026-11" />
			</div>
		),
		react: `<FinkInputDate _label="Datum" _type="date" _min="2026-01-01" />`,
		html: `<fink-input-date _label="Datum" _type="date"></fink-input-date>`,
	},
	{
		tag: 'fink-input-email',
		name: 'Input Email',
		category: 'Formular',
		icon: 'codicon codicon-mail',
		summary: t('E-Mail-Feld mit Formatprüfung und Autocomplete.'),
		title: t('E-Mail-Adresse'),
		doc: 'input-email',
		render: () => <FinkInputEmail _label={t('E-Mail-Adresse')} _autoComplete="email" _placeholder={t('name@example.org')} />,
		react: `<FinkInputEmail _label="E-Mail-Adresse" _autoComplete="email" />`,
		html: `<fink-input-email _label="E-Mail-Adresse" _auto-complete="email"></fink-input-email>`,
	},
	{
		tag: 'fink-input-file',
		name: 'Input File',
		category: 'Formular',
		icon: 'codicon codicon-file',
		summary: t('Dateiauswahl; Grundlage von fink-file-upload.'),
		title: t('Datei wählen'),
		doc: 'input-file',
		render: () => <FinkInputFile _label={t('Nachweis')} _accept=".pdf" _hint={t('PDF, höchstens 10 MB')} />,
		react: `<FinkInputFile _label="Nachweis" _accept=".pdf" _multiple />`,
		html: `<fink-input-file _label="Nachweis" _accept=".pdf"></fink-input-file>`,
	},
	{
		tag: 'fink-input-number',
		name: 'Input Number',
		category: 'Formular',
		icon: 'codicon codicon-symbol-numeric',
		summary: t('Zahlenfeld mit Min, Max und Schrittweite.'),
		title: t('Betrag'),
		doc: 'input-number',
		render: () => <FinkInputNumber _label={t('Fördersumme in Euro')} _min={1000} _max={50000} _step={500} _value={12500} />,
		react: `<FinkInputNumber _label="Fördersumme in Euro" _min={1000} _max={50000} _step={500} />`,
		html: `<fink-input-number _label="Fördersumme in Euro" _min="1000" _max="50000"></fink-input-number>`,
	},
	{
		tag: 'fink-input-password',
		name: 'Input Password',
		category: 'Formular',
		icon: 'codicon codicon-lock',
		summary: t('Passwortfeld mit Sichtbarkeitsumschalter.'),
		title: t('Passwort'),
		doc: 'input-password',
		render: () => <FinkInputPassword _label={t('Passwort')} _autoComplete="new-password" _hint={t('Mindestens 12 Zeichen')} />,
		react: `<FinkInputPassword _label="Passwort" _autoComplete="new-password" />`,
		html: `<fink-input-password _label="Passwort"></fink-input-password>`,
	},
	{
		tag: 'fink-input-radio',
		name: 'Input Radio',
		category: 'Formular',
		icon: 'codicon codicon-circle-large-filled',
		summary: t('Radiogruppe, vertikal oder horizontal.'),
		title: t('Auswahl'),
		doc: 'input-radio',
		render: () => <FinkInputRadio _label={t('Förderprogramm')} _options={OPTIONS} _value="dig" />,
		react: `<FinkInputRadio _label="Förderprogramm" _options={options} _value="dig" />`,
		html: `<fink-input-radio _label="Förderprogramm"></fink-input-radio>`,
	},
	{
		tag: 'fink-input-range',
		name: 'Input Range',
		category: 'Formular',
		icon: 'codicon codicon-settings',
		summary: t('Schieberegler mit Zahlenfeld.'),
		title: t('Regler'),
		doc: 'input-range',
		render: () => <FinkInputRange _label={t('Bearbeitungsdauer in Tagen')} _min={1} _max={30} _value={10} />,
		react: `<FinkInputRange _label="Bearbeitungsdauer in Tagen" _min={1} _max={30} />`,
		html: `<fink-input-range _label="Bearbeitungsdauer in Tagen" _min="1" _max="30"></fink-input-range>`,
	},
	{
		tag: 'fink-input-text',
		name: 'Input Text',
		category: 'Formular',
		icon: 'codicon codicon-symbol-string',
		summary: t('Textfeld für Text, Suche, URL und Telefon mit Zähler und Smart Button.'),
		title: t('Textfeld'),
		doc: 'input-text',
		render: () => <FinkInputText _label={t('Aktenzeichen')} _hint={t('Steht auf dem Bescheid')} _hasCounter _maxLength={16} />,
		react: `<FinkInputText _label="Aktenzeichen" _hint="Steht auf dem Bescheid" _hasCounter _maxLength={16} />`,
		html: `<fink-input-text _label="Aktenzeichen" _has-counter _max-length="16"></fink-input-text>`,
	},
	{
		tag: 'fink-kolibri',
		name: 'KoliBri',
		category: 'Inhalt',
		icon: 'codicon codicon-heart',
		summary: t('KoliBri-Logo, z. B. für „Gebaut mit KoliBri“.'),
		title: t('Logo'),
		render: () => <FinkKolibri _labeled style={{ width: '10rem' }} />,
		react: `<FinkKolibri _labeled />`,
		html: `<fink-kolibri _labeled></fink-kolibri>`,
	},
	{
		tag: 'fink-link',
		name: 'Link',
		category: 'Navigation',
		icon: 'codicon codicon-link',
		summary: t('Link mit Icon, externem Ziel und Kennzeichnung neuer Fenster.'),
		title: t('Links'),
		render: () => (
			<FinkStack _gap="2">
				<FinkLink _href="#/patterns" _label={t('Interner Link')} />
				<FinkLink _href="https://public-ui.github.io" _label={t('Externer Link')} _target="_blank" />
			</FinkStack>
		),
		react: `<FinkLink _href="https://public-ui.github.io" _label="Externer Link" _target="_blank" />`,
		html: `<fink-link _href="https://public-ui.github.io" _label="Externer Link" _target="_blank"></fink-link>`,
	},
	{
		tag: 'fink-link-button',
		name: 'Link Button',
		category: 'Aktion',
		icon: 'codicon codicon-debug-stop',
		summary: t('Semantisch ein Link, optisch ein Button – für Navigation mit Button-Optik.'),
		title: t('Navigation als Button'),
		render: () => <FinkLinkButton _href="#/compositions" _label={t('Kompositionen ansehen')} _variant="primary" _icons="codicon codicon-play" />,
		react: `<FinkLinkButton _href="/compositions" _label="Kompositionen ansehen" _variant="primary" />`,
		html: `<fink-link-button _href="/compositions" _label="Kompositionen ansehen" _variant="primary"></fink-link-button>`,
	},
	{
		tag: 'fink-meter',
		name: 'Meter',
		category: 'Daten',
		icon: 'codicon codicon-dashboard',
		summary: t('Messwert in einem bekannten Bereich mit Schwellen (low/high/optimum), z. B. Budgetauslastung.'),
		title: t('Budgetauslastung'),
		render: () => (
			<FinkStack _gap="3">
				<FinkMeter _label={t('Digitalisierung')} _value={72} _min={0} _max={100} _low={50} _high={90} _optimum={60} _unit="%" />
				<FinkMeter _label={t('Klimaschutz')} _value={95} _min={0} _max={100} _low={50} _high={90} _optimum={60} _unit="%" />
			</FinkStack>
		),
		react: `<FinkMeter _label="Digitalisierung" _value={72} _min={0} _max={100} _low={50} _high={90} _optimum={60} _unit="%" />`,
		html: `<fink-meter _label="Digitalisierung" _value="72" _min="0" _max="100" _unit="%"></fink-meter>`,
	},
	{
		tag: 'fink-nav',
		name: 'Nav',
		category: 'Navigation',
		icon: 'codicon codicon-list-tree',
		summary: t('Navigation mit Untermenüs, Icons und kompaktem Modus.'),
		title: t('Mehrstufige Navigation'),
		render: () => (
			<div style={{ maxWidth: '18rem' }}>
				<FinkNav
					_label={t('Bereiche')}
					_hasCompactButton
					_hasIconsWhenExpanded
					_links={[
						{ _label: t('Übersicht'), _href: '#/components/fink-nav', _icons: 'codicon codicon-home', _active: true },
						{
							_label: t('Anträge'),
							_icons: 'codicon codicon-files',
							_children: [
								{ _label: t('Offen'), _href: '#/components/fink-nav' },
								{ _label: t('Archiv'), _href: '#/components/fink-nav' },
							],
						},
					]}
				/>
			</div>
		),
		react: `<FinkNav _label="Bereiche" _hasCompactButton _links={links} />`,
		html: `<fink-nav _label="Bereiche" _has-compact-button></fink-nav>`,
	},
	{
		tag: 'fink-pagination',
		name: 'Pagination',
		category: 'Navigation',
		icon: 'codicon codicon-ellipsis',
		summary: t('Seitennavigation mit Seitengröße und Sprung an Anfang und Ende.'),
		title: t('Seiten'),
		render: () => <PaginationDemo />,
		react: `<FinkPagination _label="Seiten" _page={page} _max={120} _pageSize={10} _on={{ onChangePage: (_e, p) => setPage(p) }} />`,
		html: `<fink-pagination _label="Seiten" _page="2" _max="120" _page-size="10"></fink-pagination>`,
	},
	{
		tag: 'fink-popover-button',
		name: 'Popover Button',
		category: 'Aktion',
		icon: 'codicon codicon-comment',
		summary: t('Button mit Popover auf Basis der nativen Popover-API.'),
		title: t('Popover'),
		render: () => (
			<FinkPopoverButton _label={t('Hinweis anzeigen')} _icons="codicon codicon-info">
				<p style={{ margin: 0, padding: 'var(--fink-space-3)', maxWidth: '18rem' }}>{t('Die Frist kann einmalig um 14 Tage verlängert werden.')}</p>
			</FinkPopoverButton>
		),
		react: `<FinkPopoverButton _label="Hinweis anzeigen" _icons="codicon codicon-info">…</FinkPopoverButton>`,
		html: `<fink-popover-button _label="Hinweis anzeigen">…</fink-popover-button>`,
	},
	{
		tag: 'fink-quote',
		name: 'Quote',
		category: 'Inhalt',
		icon: 'codicon codicon-quote',
		summary: t('Zitat als Block oder inline, mit Quellenlink.'),
		title: t('Zitat'),
		render: () => (
			<FinkQuote
				_quote={t('Gemeinsam machen wir HTML mit wiederverwendbaren Web Components barrierefrei.')}
				_label="KoliBri – Vision"
				_href="https://public-ui.github.io"
				_variant="block"
			/>
		),
		react: `<FinkQuote _quote="…" _label="KoliBri – Vision" _href="https://public-ui.github.io" _variant="block" />`,
		html: `<fink-quote _quote="…" _label="KoliBri – Vision" _href="https://public-ui.github.io" _variant="block"></fink-quote>`,
	},
	{
		tag: 'fink-select',
		name: 'Select',
		category: 'Formular',
		icon: 'codicon codicon-list-selection',
		summary: t('Native Auswahlliste, auch mit Mehrfachauswahl.'),
		title: t('Mehrfachauswahl'),
		render: () => <FinkSelect _label={t('Programme')} _options={OPTIONS} _multiple _rows={3} _value={['dig']} />,
		react: `<FinkSelect _label="Programme" _options={options} _multiple _rows={3} />`,
		html: `<fink-select _label="Programme" _multiple _rows="3"></fink-select>`,
	},
	{
		tag: 'fink-single-select',
		name: 'Single Select',
		category: 'Formular',
		icon: 'codicon codicon-chevron-down',
		summary: t('Einfachauswahl mit Filter und Löschen-Schaltfläche.'),
		title: t('Einfachauswahl'),
		doc: 'single-select',
		render: () => <FinkSingleSelect _label={t('Programm')} _options={OPTIONS} _hasClearButton _placeholder={t('Bitte wählen')} />,
		react: `<FinkSingleSelect _label="Programm" _options={options} _hasClearButton />`,
		html: `<fink-single-select _label="Programm" _has-clear-button></fink-single-select>`,
	},
	{
		tag: 'fink-skip-nav',
		name: 'Skip Nav',
		category: 'Navigation',
		icon: 'codicon codicon-debug-step-over',
		summary: t('Sprunglinks für Tastatur- und Screenreader-Nutzende; erscheinen beim Fokussieren.'),
		title: t('Sprunglinks (Tab drücken)'),
		render: () => (
			<FinkSkipNav
				_label={t('Sprunglinks')}
				_links={[
					{ _label: t('Zum Inhalt'), _href: '#main-demo' },
					{ _label: t('Zur Suche'), _href: '#search-demo' },
				]}
			/>
		),
		react: `<FinkSkipNav _label="Sprunglinks" _links={[{ _label: 'Zum Inhalt', _href: '#main' }]} />`,
		html: `<fink-skip-nav _label="Sprunglinks"></fink-skip-nav>`,
	},
	{
		tag: 'fink-spin',
		name: 'Spin',
		category: 'Feedback',
		icon: 'codicon codicon-loading',
		summary: t('Ladeanzeige als Kreis oder Punkte mit Ansage für Screenreader.'),
		title: t('Ladeanzeigen'),
		render: () => <SpinDemo />,
		react: `<FinkSpin _show={loading} _label="Daten werden geladen" _variant="cycle" />`,
		html: `<fink-spin _show _label="Daten werden geladen"></fink-spin>`,
	},
	{
		tag: 'fink-split-button',
		name: 'Split Button',
		category: 'Aktion',
		icon: 'codicon codicon-split-horizontal',
		summary: t('Hauptaktion plus Menü mit Varianten.'),
		title: t('Speichern mit Varianten'),
		render: () => (
			<FinkSplitButton _label={t('Speichern')} _variant="primary">
				<div className="menu">
					<FinkButton _label={t('Als Entwurf speichern')} _variant="ghost" />
					<FinkButton _label={t('Speichern und schließen')} _variant="ghost" />
				</div>
			</FinkSplitButton>
		),
		react: `<FinkSplitButton _label="Speichern" _variant="primary">…</FinkSplitButton>`,
		html: `<fink-split-button _label="Speichern" _variant="primary">…</fink-split-button>`,
	},
	{
		tag: 'fink-table-stateless',
		name: 'Table Stateless',
		category: 'Daten',
		icon: 'codicon codicon-table',
		summary: t('Darstellende Tabelle ohne eigenen Zustand – Sortierung und Paging steuert die Anwendung.'),
		title: t('Einfache Tabelle'),
		render: () => <FinkTableStateless _label={t('Budgets 2026')} _headers={TABLE_HEADERS} _data={TABLE_DATA} />,
		react: `<FinkTableStateless _label="Budgets 2026" _headers={{ horizontal: [[{ label: 'Programm', key: 'program' }]] }} _data={rows} />`,
		html: `<fink-table-stateless _label="Budgets 2026"></fink-table-stateless>`,
	},
	{
		tag: 'fink-textarea',
		name: 'Textarea',
		category: 'Formular',
		icon: 'codicon codicon-note',
		summary: t('Mehrzeilige Eingabe mit Zähler und automatischer Höhe.'),
		title: t('Mehrzeilig'),
		render: () => <FinkTextarea _label={t('Beschreibung')} _rows={3} _hasCounter _maxLength={280} _adjustHeight />,
		react: `<FinkTextarea _label="Beschreibung" _rows={3} _hasCounter _maxLength={280} _adjustHeight />`,
		html: `<fink-textarea _label="Beschreibung" _rows="3" _has-counter></fink-textarea>`,
	},
	{
		tag: 'fink-toolbar',
		name: 'Toolbar',
		category: 'Aktion',
		icon: 'codicon codicon-tools',
		summary: t('Werkzeugleiste mit Pfeiltasten-Navigation (roving tabindex).'),
		title: t('Tabellenaktionen'),
		render: () => <ToolbarDemo />,
		react: `<FinkToolbar _label="Tabellenaktionen" _items={[{ type: 'button', _label: 'Exportieren' }, { type: 'hr' }, { type: 'link', _label: 'Hilfe', _href: '/hilfe' }]} />`,
		html: `<fink-toolbar _label="Tabellenaktionen"></fink-toolbar>`,
	},
	{
		tag: 'fink-tree',
		name: 'Tree',
		category: 'Navigation',
		icon: 'codicon codicon-list-tree',
		summary: t('Baumnavigation mit fink-tree-item, Tastatursteuerung und aktivem Eintrag.'),
		title: t('Themenbaum'),
		render: () => (
			<FinkTree _label={t('Themen')}>
				<FinkTreeItem _label={t('Antrag')} _href="#/components/fink-tree" _open>
					<FinkTreeItem _label={t('Nachweise')} _href="#/components/fink-tree" _active />
					<FinkTreeItem _label={t('Fristen')} _href="#/components/fink-tree" />
				</FinkTreeItem>
				<FinkTreeItem _label={t('Konto')} _href="#/components/fink-tree" />
			</FinkTree>
		),
		react: `<FinkTree _label="Themen">
  <FinkTreeItem _label="Antrag" _href="/antrag" _open>
    <FinkTreeItem _label="Nachweise" _href="/antrag/nachweise" _active />
  </FinkTreeItem>
</FinkTree>`,
		html: `<fink-tree _label="Themen">
  <fink-tree-item _label="Antrag" _href="/antrag" _open></fink-tree-item>
</fink-tree>`,
	},
	{
		tag: 'fink-version',
		name: 'Version',
		category: 'Inhalt',
		icon: 'codicon codicon-versions',
		summary: t('Versionskennzeichnung als Badge.'),
		title: t('Version'),
		render: () => <FinkVersion _label="0.1.0" />,
		react: `<FinkVersion _label="0.1.0" />`,
		html: `<fink-version _label="0.1.0"></fink-version>`,
	},
];

export const kolibriMoreEntries: CatalogEntry[] = defs.map(entry);
