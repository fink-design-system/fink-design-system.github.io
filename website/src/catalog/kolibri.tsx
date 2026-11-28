import {
	FinkAccordion,
	FinkAlert,
	FinkAvatar,
	FinkBadge,
	FinkButton,
	FinkCard,
	FinkDialog,
	FinkInputCheckbox,
	FinkInputEmail,
	FinkInputRadio,
	FinkInputText,
	FinkProgress,
	FinkSingleSelect,
	FinkStack,
	FinkTableStateful,
	FinkTabs,
	FinkTextarea,
	tokens,
	useToast,
} from '@fink-ui/react';
import { useRef, useState } from 'react';
import { locale, t } from '../i18n';
import type { CatalogEntry } from './types';

const DOCS = 'https://public-ui.github.io/docs/components';

function DialogDemo() {
	const ref = useRef<HTMLKolDialogElement>(null);
	return (
		<>
			<FinkButton _label={t('Dialog öffnen')} _variant="primary" _on={{ onClick: () => void ref.current?.openModal() }} />
			<FinkDialog ref={ref} _label={t('Antrag zurückziehen?')} _width="32rem" _variant="card">
				<FinkStack _gap="4">
					<p style={{ margin: 0 }}>{t('Der Antrag wird archiviert und kann nicht weiter bearbeitet werden.')}</p>
					<FinkStack _direction="row" _gap="2" _justify="end">
						<FinkButton _label={t('Abbrechen')} _on={{ onClick: () => void ref.current?.closeModal() }} />
						<FinkButton _label={t('Zurückziehen')} _variant="danger" _on={{ onClick: () => void ref.current?.closeModal() }} />
					</FinkStack>
				</FinkStack>
			</FinkDialog>
		</>
	);
}

function ToastDemo() {
	const toast = useToast();
	return (
		<FinkStack _direction="row" _gap="2">
			<FinkButton
				_label={t('Erfolg')}
				_on={{ onClick: () => toast.show({ type: 'success', label: t('Gespeichert'), description: t('Der Entwurf wurde gesichert.') }) }}
			/>
			<FinkButton
				_label={t('Info')}
				_on={{ onClick: () => toast.show({ type: 'info', label: t('Hinweis'), description: t('Neue Rückfrage im Postfach.') }) }}
			/>
			<FinkButton
				_label={t('Warnung')}
				_on={{ onClick: () => toast.show({ type: 'warning', label: t('Frist läuft ab'), description: t('Noch 2 Tage bis zur Abgabe.') }) }}
			/>
			<FinkButton
				_label={t('Fehler')}
				_variant="danger"
				_on={{ onClick: () => toast.show({ type: 'error', label: t('Upload fehlgeschlagen'), description: t('Die Datei ist größer als 10 MB.') }) }}
			/>
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
			<FinkInputText
				_label={t('Name der Organisation')}
				_required
				_value={name}
				_touched={touched}
				_msg={touched && name.trim().length < 3 ? { _type: 'error', _description: t('Bitte mindestens 3 Zeichen eingeben.') } : undefined}
				_on={{ onInput: (_e, value) => setName(String(value ?? '')), onBlur: () => setTouched(true) }}
			/>
			<FinkInputEmail _label={t('E-Mail-Adresse')} _hint={t('Für Rückfragen zum Antrag')} _placeholder={t('name@example.org')} />
			<FinkSingleSelect _label={t('Bundesland')} _options={STATE_OPTIONS} _value="BE" />
			<FinkInputRadio _label={t('Unternehmensgröße')} _orientation="horizontal" _options={SIZE_OPTIONS} _value="m" />
			<FinkTextarea _label={t('Kurzbeschreibung')} _rows={3} _hasCounter _maxLength={280} />
			<FinkInputCheckbox _label={t('Ich bestätige die Richtigkeit der Angaben')} _required />
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
		id: 'fink-button',
		name: 'Button',
		tag: 'fink-button',
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
						<FinkButton _label={t('Primär')} _variant="primary" />
						<FinkButton _label={t('Sekundär')} _variant="secondary" />
						<FinkButton _label={t('Normal')} _variant="normal" />
						<FinkButton _label={t('Tertiär')} _variant="tertiary" />
						<FinkButton _label={t('Löschen')} _variant="danger" _icons="codicon codicon-trash" />
						<FinkButton _label={t('Einstellungen')} _variant="ghost" _hideLabel _icons="codicon codicon-settings-gear" />
						<FinkButton _label={t('Deaktiviert')} _disabled />
					</FinkStack>
				),
				code: `<FinkButton _label="Primär" _variant="primary" />
<FinkButton _label="Sekundär" _variant="secondary" />
<FinkButton _label="Löschen" _variant="danger" _icons="codicon codicon-trash" />
<FinkButton _label="Einstellungen" _variant="ghost" _hideLabel _icons="codicon codicon-settings-gear" />`,
			},
		],
	},
	{
		id: 'fink-inputs',
		name: 'Formularfelder',
		tag: 'fink-input-*',
		layer: 'kolibri',
		category: 'Formular',
		icon: 'codicon codicon-symbol-field',
		summary: t('Text, E-Mail, Auswahl, Radio, Textarea und Checkbox mit Label, Hinweis, Pflichtfeld und Fehlermeldung.'),
		docsUrl: `${DOCS}/input-text`,
		demos: [
			{
				title: t('Formular mit Validierung'),
				render: () => <FormDemo />,
				code: `<FinkInputText
  _label="Name der Organisation"
  _required
  _value={name}
  _touched={touched}
  _msg={invalid ? { _type: 'error', _description: 'Bitte mindestens 3 Zeichen eingeben.' } : undefined}
  _on={{ onInput: (_e, value) => setName(String(value)), onBlur: () => setTouched(true) }}
/>
<FinkSingleSelect _label="Bundesland" _options={options} _value="BE" />`,
			},
		],
	},
	{
		id: 'fink-alert',
		name: 'Alert',
		tag: 'fink-alert',
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
						<FinkAlert _type="info" _variant="card" _label={t('Hinweis')}>
							{t('Die Antragsfrist endet am 30.11.2026.')}
						</FinkAlert>
						<FinkAlert _type="success" _variant="card" _label={t('Antrag eingereicht')}>
							{t('Sie erhalten eine Eingangsbestätigung per E-Mail.')}
						</FinkAlert>
						<FinkAlert _type="warning" _variant="msg">
							{t('Es fehlen noch zwei Nachweise.')}
						</FinkAlert>
						<FinkAlert _type="error" _variant="msg">
							{t('Die Steuernummer ist ungültig.')}
						</FinkAlert>
					</FinkStack>
				),
				code: `<FinkAlert _type="info" _variant="card" _label="Hinweis">Die Antragsfrist endet am 30.11.2026.</FinkAlert>
<FinkAlert _type="warning" _variant="msg">Es fehlen noch zwei Nachweise.</FinkAlert>`,
			},
		],
	},
	{
		id: 'fink-badge',
		name: 'Badge',
		tag: 'fink-badge',
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
						<FinkBadge _label={t('Digitalisierung')} _color={tokens['color.primary'].light!} />
						<FinkBadge _label={t('Klimaschutz')} _color={tokens['color.success'].light!} _icons="codicon codicon-globe" />
						<FinkBadge _label={t('Eilantrag')} _color={tokens['color.danger'].light!} />
						<FinkBadge _label={t('Entwurf')} _color={tokens['color.mute'].light!} />
					</FinkStack>
				),
				code: `import { tokens } from '@fink-ui/react';

<FinkBadge _label="Digitalisierung" _color={tokens['color.primary'].light} />
<FinkBadge _label="Klimaschutz" _color={tokens['color.success'].light} _icons="codicon codicon-globe" />`,
			},
		],
	},
	{
		id: 'fink-card',
		name: 'Card',
		tag: 'fink-card',
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
						<FinkCard _label={t('Förderprogramm Digitalisierung')} _level={3} _hasCloser>
							<p style={{ margin: 0 }}>{t('Zuschüsse bis 50.000 € für kleine und mittlere Unternehmen. Antragsschluss: 30.11.2026.')}</p>
						</FinkCard>
					</div>
				),
				code: `<FinkCard _label="Förderprogramm Digitalisierung" _level={3} _hasCloser>
  <p>Zuschüsse bis 50.000 € …</p>
</FinkCard>`,
			},
		],
	},
	{
		id: 'fink-tabs',
		name: 'Tabs',
		tag: 'fink-tabs',
		layer: 'kolibri',
		category: 'Navigation',
		icon: 'codicon codicon-browser',
		summary: t('Registerkarten mit Tastatursteuerung (Pfeiltasten) und Icons.'),
		docsUrl: `${DOCS}/tabs`,
		demos: [
			{
				title: t('Registerkarten'),
				render: () => (
					<FinkTabs
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
					</FinkTabs>
				),
				code: `<FinkTabs _label="Antragsdetails" _tabs={[{ _label: 'Übersicht' }, { _label: 'Dokumente' }, { _label: 'Verlauf' }]}>
  <div>…</div>
  <div>…</div>
  <div>…</div>
</FinkTabs>`,
			},
		],
	},
	{
		id: 'fink-table-stateful',
		name: 'Tabelle',
		tag: 'fink-table-stateful',
		layer: 'kolibri',
		category: 'Daten',
		icon: 'codicon codicon-table',
		summary: t('Datentabelle mit Sortierung, Pagination, Auswahl und Aktionsspalten.'),
		docsUrl: `${DOCS}/table`,
		demos: [
			{
				title: t('Sortierbare Tabelle'),
				render: () => (
					<FinkTableStateful
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
				code: `<FinkTableStateful
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
		id: 'fink-dialog',
		name: 'Dialog',
		tag: 'fink-dialog',
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

<FinkButton _label="Dialog öffnen" _on={{ onClick: () => ref.current?.openModal() }} />
<FinkDialog ref={ref} _label="Antrag zurückziehen?" _variant="card">…</FinkDialog>`,
			},
		],
	},
	{
		id: 'fink-toast',
		name: 'Toast',
		tag: 'fink-toast-container',
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
		id: 'fink-progress',
		name: 'Progress',
		tag: 'fink-progress',
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
						<FinkProgress _label={t('Upload')} _value={64} _max={100} _unit="%" _variant="bar" />
						<FinkProgress _label={t('Vollständigkeit')} _value={3} _max={4} _unit="Schritte" _variant="cycle" />
					</FinkStack>
				),
				code: `<FinkProgress _label="Upload" _value={64} _max={100} _unit="%" _variant="bar" />
<FinkProgress _label="Vollständigkeit" _value={3} _max={4} _variant="cycle" />`,
			},
		],
	},
	{
		id: 'fink-accordion',
		name: 'Accordion',
		tag: 'fink-accordion',
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
						<FinkAccordion _label={t('Wer ist antragsberechtigt?')} _open>
							{t('Unternehmen mit weniger als 250 Beschäftigten und Sitz in Deutschland.')}
						</FinkAccordion>
						<FinkAccordion _label={t('Welche Kosten sind förderfähig?')}>{t('Hard- und Software, Beratung sowie Schulungen.')}</FinkAccordion>
					</FinkStack>
				),
				code: `<FinkAccordion _label="Wer ist antragsberechtigt?" _open>…</FinkAccordion>`,
			},
		],
	},
	{
		id: 'fink-avatar',
		name: 'Avatar',
		tag: 'fink-avatar',
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
						<FinkAvatar _label={t('Erika Mustermann')} style={{ width: '2rem' }} />
						<FinkAvatar _label={t('Jonas Weber')} style={{ width: '3rem' }} />
						<FinkAvatar _label={t('Ada Lovelace')} style={{ width: '4.5rem' }} />
					</FinkStack>
				),
				code: `<FinkAvatar _label="Erika Mustermann" style={{ width: '2rem' }} />`,
			},
		],
	},
];
