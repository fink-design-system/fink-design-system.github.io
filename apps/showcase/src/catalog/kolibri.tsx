import { useRef, useState } from 'react';
import {
	FinkStack,
	KolAccordion,
	KolAlert,
	KolAvatar,
	KolBadge,
	KolButton,
	KolCard,
	KolDialog,
	KolInputCheckbox,
	KolInputEmail,
	KolInputRadio,
	KolInputText,
	KolProgress,
	KolSingleSelect,
	KolTableStateful,
	KolTabs,
	KolTextarea,
	tokens,
	useToast,
} from '@fink/react';
import type { CatalogEntry } from './types';
import { t, locale } from '../i18n';

const DOCS = 'https://public-ui.github.io/docs/components';

function DialogDemo() {
	const ref = useRef<HTMLKolDialogElement>(null);
	return (
		<>
			<KolButton _label={t('Dialog öffnen')} _variant="primary" _on={{ onClick: () => void ref.current?.openModal() }} />
			<KolDialog ref={ref} _label={t('Antrag zurückziehen?')} _width="32rem" _variant="card">
				<FinkStack _gap="4">
					<p style={{ margin: 0 }}>{t('Der Antrag wird archiviert und kann nicht weiter bearbeitet werden.')}</p>
					<FinkStack _direction="row" _gap="2" _justify="end">
						<KolButton _label={t('Abbrechen')} _on={{ onClick: () => void ref.current?.closeModal() }} />
						<KolButton _label={t('Zurückziehen')} _variant="danger" _on={{ onClick: () => void ref.current?.closeModal() }} />
					</FinkStack>
				</FinkStack>
			</KolDialog>
		</>
	);
}

function ToastDemo() {
	const toast = useToast();
	return (
		<FinkStack _direction="row" _gap="2">
			<KolButton _label={t('Erfolg')} _on={{ onClick: () => toast.show({ type: 'success', label: t('Gespeichert'), description: t('Der Entwurf wurde gesichert.') }) }} />
			<KolButton _label={t('Info')} _on={{ onClick: () => toast.show({ type: 'info', label: t('Hinweis'), description: t('Neue Rückfrage im Postfach.') }) }} />
			<KolButton _label={t('Warnung')} _on={{ onClick: () => toast.show({ type: 'warning', label: t('Frist läuft ab'), description: t('Noch 2 Tage bis zur Abgabe.') }) }} />
			<KolButton _label={t('Fehler')} _variant="danger" _on={{ onClick: () => toast.show({ type: 'error', label: t('Upload fehlgeschlagen'), description: t('Die Datei ist größer als 10 MB.') }) }} />
		</FinkStack>
	);
}

const STATE_OPTIONS = [
	{ label: t('Berlin'), value: 'BE' },
	{ label: t('Hamburg'), value: 'HH' },
	{ label: t('Sachsen'), value: 'SN' },
];

const SIZE_OPTIONS = [
	{ label: t('Klein'), value: 's' },
	{ label: t('Mittel'), value: 'm' },
	{ label: t('Groß'), value: 'l' },
];

function FormDemo() {
	const [name, setName] = useState('');
	const [touched, setTouched] = useState(false);
	return (
		<FinkStack _gap="4">
			<KolInputText
				_label={t('Name der Organisation')}
				_required
				_value={name}
				_touched={touched}
				_msg={touched && name.trim().length < 3 ? { _type: 'error', _description: t('Bitte mindestens 3 Zeichen eingeben.') } : undefined}
				_on={{ onInput: (_e, value) => setName(String(value ?? '')), onBlur: () => setTouched(true) }}
			/>
			<KolInputEmail _label={t('E-Mail-Adresse')} _hint={t('Für Rückfragen zum Antrag')} _placeholder={t('name@beispiel.de')} />
			<KolSingleSelect
				_label={t('Bundesland')}
				_options={STATE_OPTIONS}
				_value="BE"
			/>
			<KolInputRadio
				_label={t('Unternehmensgröße')}
				_orientation="horizontal"
				_options={SIZE_OPTIONS}
				_value="m"
			/>
			<KolTextarea _label={t('Kurzbeschreibung')} _rows={3} _hasCounter _maxLength={280} />
			<KolInputCheckbox _label={t('Ich bestätige die Richtigkeit der Angaben')} _required />
		</FinkStack>
	);
}

const tableData = [
	{ id: 'FD-0142', name: 'Mühlenwerk GmbH', amount: 48000, status: t('In Prüfung') },
	{ id: 'FD-0139', name: 'Sonnentau eG', amount: 12500, status: t('Bewilligt') },
	{ id: 'FD-0137', name: 'Kranich & Söhne KG', amount: 87300, status: t('Rückfrage') },
	{ id: 'FD-0131', name: 'Lindenhof Bäckerei', amount: 6400, status: t('Neu') },
];

const euro = (value: unknown) => Number(value).toLocaleString(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

export const kolibriEntries: CatalogEntry[] = [
	{
		id: 'kol-button',
		name: 'Button',
		tag: 'kol-button',
		layer: 'kolibri',
		category: 'Aktion',
		icon: 'codicon codicon-debug-stop',
		summary: t('Barrierefreier Button mit Varianten, Icons und Tooltip bei ausgeblendetem Label. Im Fink-Theme mit Pill-Form.'),
		docsUrl: `${DOCS}/button`,
		demos: [
			{
				title: t('Varianten'),
				render: () => (
					<FinkStack _direction="row" _gap="3">
						<KolButton _label={t('Primär')} _variant="primary" />
						<KolButton _label={t('Sekundär')} _variant="secondary" />
						<KolButton _label={t('Normal')} _variant="normal" />
						<KolButton _label={t('Tertiär')} _variant="tertiary" />
						<KolButton _label={t('Löschen')} _variant="danger" _icons="codicon codicon-trash" />
						<KolButton _label={t('Einstellungen')} _variant="ghost" _hideLabel _icons="codicon codicon-settings-gear" />
						<KolButton _label={t('Deaktiviert')} _disabled />
					</FinkStack>
				),
				code: `<KolButton _label="Primär" _variant="primary" />
<KolButton _label="Sekundär" _variant="secondary" />
<KolButton _label="Löschen" _variant="danger" _icons="codicon codicon-trash" />
<KolButton _label="Einstellungen" _variant="ghost" _hideLabel _icons="codicon codicon-settings-gear" />`,
			},
		],
	},
	{
		id: 'kol-inputs',
		name: 'Formularfelder',
		tag: 'kol-input-*',
		layer: 'kolibri',
		category: 'Formular',
		icon: 'codicon codicon-symbol-field',
		summary: t('Text, E-Mail, Auswahl, Radio, Textarea und Checkbox mit Label, Hinweis, Pflichtfeld und Fehlermeldung.'),
		docsUrl: `${DOCS}/input-text`,
		demos: [
			{
				title: t('Formular mit Validierung'),
				render: () => <FormDemo />,
				code: `<KolInputText
  _label="Name der Organisation"
  _required
  _value={name}
  _touched={touched}
  _msg={invalid ? { _type: 'error', _description: 'Bitte mindestens 3 Zeichen eingeben.' } : undefined}
  _on={{ onInput: (_e, value) => setName(String(value)), onBlur: () => setTouched(true) }}
/>
<KolSingleSelect _label="Bundesland" _options={options} _value="BE" />`,
			},
		],
	},
	{
		id: 'kol-alert',
		name: 'Alert',
		tag: 'kol-alert',
		layer: 'kolibri',
		category: 'Feedback',
		icon: 'codicon codicon-warning',
		summary: t('Meldungen in fünf Typen, als Karte oder kompakte Nachricht.'),
		docsUrl: `${DOCS}/alert`,
		demos: [
			{
				title: t('Typen'),
				render: () => (
					<FinkStack _gap="3">
						<KolAlert _type="info" _variant="card" _label={t('Hinweis')}>
							{t('Die Antragsfrist endet am 30.11.2026.')}
						</KolAlert>
						<KolAlert _type="success" _variant="card" _label={t('Antrag eingereicht')}>
							{t('Sie erhalten eine Eingangsbestätigung per E-Mail.')}
						</KolAlert>
						<KolAlert _type="warning" _variant="msg">
							{t('Es fehlen noch zwei Nachweise.')}
						</KolAlert>
						<KolAlert _type="error" _variant="msg">
							{t('Die Steuernummer ist ungültig.')}
						</KolAlert>
					</FinkStack>
				),
				code: `<KolAlert _type="info" _variant="card" _label="Hinweis">Die Antragsfrist endet am 30.11.2026.</KolAlert>
<KolAlert _type="warning" _variant="msg">Es fehlen noch zwei Nachweise.</KolAlert>`,
			},
		],
	},
	{
		id: 'kol-badge',
		name: 'Badge',
		tag: 'kol-badge',
		layer: 'kolibri',
		category: 'Inhalt',
		icon: 'codicon codicon-tag',
		summary: t('Hervorhebung mit frei wählbarer Farbe; die Textfarbe berechnet KoliBri kontrastsicher.'),
		docsUrl: `${DOCS}/badge`,
		demos: [
			{
				title: t('Mit Fink-Farben'),
				render: () => (
					<FinkStack _direction="row" _gap="2">
						<KolBadge _label={t('Digitalisierung')} _color={tokens['color.primary'].light!} />
						<KolBadge _label={t('Klimaschutz')} _color={tokens['color.success'].light!} _icons="codicon codicon-globe" />
						<KolBadge _label={t('Eilantrag')} _color={tokens['color.danger'].light!} />
						<KolBadge _label={t('Entwurf')} _color={tokens['color.mute'].light!} />
					</FinkStack>
				),
				code: `import { tokens } from '@fink/react';

<KolBadge _label="Digitalisierung" _color={tokens['color.primary'].light} />
<KolBadge _label="Klimaschutz" _color={tokens['color.success'].light} _icons="codicon codicon-globe" />`,
			},
		],
	},
	{
		id: 'kol-card',
		name: 'Card',
		tag: 'kol-card',
		layer: 'kolibri',
		category: 'Inhalt',
		icon: 'codicon codicon-preview',
		summary: t('Inhaltskarte mit Überschrift und optionalem Schließen-Button.'),
		docsUrl: `${DOCS}/card`,
		demos: [
			{
				title: t('Karte'),
				render: () => (
					<div style={{ maxWidth: '24rem' }}>
						<KolCard _label={t('Förderprogramm Digitalisierung')} _level={3} _hasCloser>
							<p style={{ margin: 0 }}>{t('Zuschüsse bis 50.000 € für kleine und mittlere Unternehmen. Antragsschluss: 30.11.2026.')}</p>
						</KolCard>
					</div>
				),
				code: `<KolCard _label="Förderprogramm Digitalisierung" _level={3} _hasCloser>
  <p>Zuschüsse bis 50.000 € …</p>
</KolCard>`,
			},
		],
	},
	{
		id: 'kol-tabs',
		name: 'Tabs',
		tag: 'kol-tabs',
		layer: 'kolibri',
		category: 'Navigation',
		icon: 'codicon codicon-browser',
		summary: t('Registerkarten mit Tastatursteuerung (Pfeiltasten) und Icons.'),
		docsUrl: `${DOCS}/tabs`,
		demos: [
			{
				title: t('Registerkarten'),
				render: () => (
					<KolTabs
						_label={t('Antragsdetails')}
						_tabs={[
							{ _label: t('Übersicht'), _icons: 'codicon codicon-home' },
							{ _label: t('Dokumente'), _icons: 'codicon codicon-file' },
							{ _label: t('Verlauf'), _icons: 'codicon codicon-history' },
						]}
					>
						<div>{t('Stammdaten und Fördersumme des Antrags.')}</div>
						<div>{t('3 hochgeladene Nachweise.')}</div>
						<div>{t('Eingang, Prüfung, Rückfrage – mit Zeitstempeln.')}</div>
					</KolTabs>
				),
				code: `<KolTabs _label="Antragsdetails" _tabs={[{ _label: 'Übersicht' }, { _label: 'Dokumente' }, { _label: 'Verlauf' }]}>
  <div>…</div>
  <div>…</div>
  <div>…</div>
</KolTabs>`,
			},
		],
	},
	{
		id: 'kol-table-stateful',
		name: 'Tabelle',
		tag: 'kol-table-stateful',
		layer: 'kolibri',
		category: 'Daten',
		icon: 'codicon codicon-table',
		summary: t('Datentabelle mit Sortierung, Pagination, Auswahl und Aktionsspalten.'),
		docsUrl: `${DOCS}/table`,
		demos: [
			{
				title: t('Sortierbare Tabelle'),
				render: () => (
					<KolTableStateful
						_label={t('Anträge')}
						_data={tableData}
						_headers={{
							horizontal: [
								[
									{ label: t('Aktenzeichen'), key: 'id', sortable: true, width: 130 },
									{ label: t('Antragsteller'), key: 'name', sortable: true, width: 170 },
									{ label: t('Betrag'), key: 'amount', textAlign: 'right', sortable: true, width: 110, render: (_el, cell) => euro(cell.label) },
									{ label: t('Status'), key: 'status', width: 130 },
								],
							],
						}}
					/>
				),
				code: `<KolTableStateful
  _label="Anträge"
  _data={rows}
  _headers={{
    horizontal: [[
      { label: 'Aktenzeichen', key: 'id', sortable: true },
      { label: 'Antragsteller', key: 'name', sortable: true },
      { label: 'Betrag', key: 'amount', textAlign: 'right', render: (_el, cell) => euro(cell.label) },
      { label: 'Status', key: 'status' },
    ]],
  }}
/>`,
			},
		],
	},
	{
		id: 'kol-dialog',
		name: 'Dialog',
		tag: 'kol-dialog',
		layer: 'kolibri',
		category: 'Feedback',
		icon: 'codicon codicon-multiple-windows',
		summary: t('Modaler Dialog auf Basis des HTML-dialog-Elements mit Fokusfalle und Escape.'),
		docsUrl: `${DOCS}/dialog`,
		demos: [
			{
				title: t('Bestätigungsdialog'),
				render: () => <DialogDemo />,
				code: `const ref = useRef<HTMLKolDialogElement>(null);

<KolButton _label="Dialog öffnen" _on={{ onClick: () => ref.current?.openModal() }} />
<KolDialog ref={ref} _label="Antrag zurückziehen?" _variant="card">…</KolDialog>`,
			},
		],
	},
	{
		id: 'kol-toast',
		name: 'Toast',
		tag: 'kol-toast-container',
		layer: 'kolibri',
		category: 'Feedback',
		icon: 'codicon codicon-bell',
		summary: t('Kurzmeldungen über den KoliBri-ToasterService, in Fink als Hook useToast().'),
		docsUrl: `${DOCS}/toast`,
		demos: [
			{
				title: t('Toasts auslösen'),
				render: () => <ToastDemo />,
				code: `const toast = useToast();

toast.show({ type: 'success', label: 'Gespeichert', description: 'Der Entwurf wurde gesichert.' });`,
			},
		],
	},
	{
		id: 'kol-progress',
		name: 'Progress',
		tag: 'kol-progress',
		layer: 'kolibri',
		category: 'Feedback',
		icon: 'codicon codicon-loading',
		summary: t('Fortschritt als Balken oder Kreis.'),
		docsUrl: `${DOCS}/progress`,
		demos: [
			{
				title: t('Balken und Kreis'),
				render: () => (
					<FinkStack _gap="4">
						<KolProgress _label={t('Upload')} _value={64} _max={100} _unit="%" _variant="bar" />
						<KolProgress _label={t('Vollständigkeit')} _value={3} _max={4} _unit="Schritte" _variant="cycle" />
					</FinkStack>
				),
				code: `<KolProgress _label="Upload" _value={64} _max={100} _unit="%" _variant="bar" />
<KolProgress _label="Vollständigkeit" _value={3} _max={4} _variant="cycle" />`,
			},
		],
	},
	{
		id: 'kol-accordion',
		name: 'Accordion',
		tag: 'kol-accordion',
		layer: 'kolibri',
		category: 'Inhalt',
		icon: 'codicon codicon-fold',
		summary: t('Aufklappbare Abschnitte für ergänzende Informationen.'),
		docsUrl: `${DOCS}/accordion`,
		demos: [
			{
				title: t('FAQ'),
				render: () => (
					<FinkStack _gap="2">
						<KolAccordion _label={t('Wer ist antragsberechtigt?')} _open>
							{t('Unternehmen mit weniger als 250 Beschäftigten und Sitz in Deutschland.')}
						</KolAccordion>
						<KolAccordion _label={t('Welche Kosten sind förderfähig?')}>{t('Hard- und Software, Beratung sowie Schulungen.')}</KolAccordion>
					</FinkStack>
				),
				code: `<KolAccordion _label="Wer ist antragsberechtigt?" _open>…</KolAccordion>`,
			},
		],
	},
	{
		id: 'kol-avatar',
		name: 'Avatar',
		tag: 'kol-avatar',
		layer: 'kolibri',
		category: 'Inhalt',
		icon: 'codicon codicon-account',
		summary: t('Profilbild oder Initialen; die Größe folgt der Breite des Elements.'),
		docsUrl: `${DOCS}/avatar`,
		demos: [
			{
				title: t('Initialen in drei Größen'),
				render: () => (
					<FinkStack _direction="row" _gap="3" _align="center">
						<KolAvatar _label={t('Erika Mustermann')} style={{ width: '2rem' }} />
						<KolAvatar _label={t('Jonas Weber')} style={{ width: '3rem' }} />
						<KolAvatar _label={t('Ada Lovelace')} style={{ width: '4.5rem' }} />
					</FinkStack>
				),
				code: `<KolAvatar _label="Erika Mustermann" style={{ width: '2rem' }} />`,
			},
		],
	},
];
