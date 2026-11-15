import { useState } from 'react';
import {
	FinkCalendar,
	FinkFeedback,
	FinkFileUpload,
	FinkOtpInput,
	FinkPanel,
	FinkRating,
	FinkStack,
	type FinkTask,
	FinkTaskList,
	KolAccordion,
	KolAlert,
	KolButton,
	KolDetails,
	KolForm,
	KolInputCheckbox,
	KolInputDate,
	KolInputEmail,
	KolInputPassword,
	KolInputRadio,
	KolInputText,
	KolSingleSelect,
	KolSpin,
	KolTextarea,
	useToast,
} from '@fink/react';
import type { PatternDefinition } from './types';
import { t } from '../i18n';
import { useFormErrorFocus } from '../site/useFormErrorFocus';

const SALUTATIONS = [
	{ label: t('Keine Angabe'), value: '' },
	{ label: t('Frau'), value: 'frau' },
	{ label: t('Herr'), value: 'herr' },
	{ label: t('Divers'), value: 'divers' },
];

const CONTACT = [
	{ label: t('E-Mail'), value: 'mail' },
	{ label: t('Telefon'), value: 'phone' },
	{ label: t('Post'), value: 'post' },
];

function FormLayoutDemo() {
	return (
		<KolForm _requiredText>
			<FinkStack _gap="4">
				<KolSingleSelect _label={t('Anrede')} _options={SALUTATIONS} _value="" />
				<KolDetails _label={t('Warum fragen wir nach der Anrede?')}>{t('Für die persönliche Ansprache in Bescheiden. Die Angabe ist freiwillig.')}</KolDetails>
				<div className="form-row">
					<KolInputText _label={t('Vorname')} _required _autoComplete="given-name" />
					<KolInputText _label={t('Nachname')} _required _autoComplete="family-name" />
				</div>
				<KolInputEmail _label={t('E-Mail-Adresse')} _required _hint={t('Für die Eingangsbestätigung')} _autoComplete="email" />
				<KolInputRadio _label={t('Bevorzugter Kontaktweg')} _orientation="horizontal" _options={CONTACT} _value="mail" />
				<KolTextarea _label={t('Anmerkungen')} _rows={3} _hasCounter _maxLength={500} />
				<FinkStack _direction="row" _gap="2">
					<KolButton _label={t('Speichern')} _variant="primary" _type="submit" />
					<KolButton _label={t('Abbrechen')} _variant="tertiary" />
				</FinkStack>
			</FinkStack>
		</KolForm>
	);
}

type Field = 'name' | 'email' | 'iban';

function ValidationDemo() {
	const [values, setValues] = useState({ name: '', email: '', iban: '' });
	const [submitted, setSubmitted] = useState(false);
	const toast = useToast();
	const errors: Partial<Record<Field, string>> = {};
	if (values.name.trim().length < 2) errors.name = t('Geben Sie Ihren vollständigen Namen ein');
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = t('Geben Sie eine E-Mail-Adresse im richtigen Format ein, z. B. name@beispiel.de');
	if (!/^DE\d{20}$/.test(values.iban.replace(/\s/g, ''))) errors.iban = t('Geben Sie eine deutsche IBAN mit 22 Zeichen ein, beginnend mit DE');
	const list = (Object.keys(errors) as Field[]).map((field) => ({ message: errors[field]!, selector: `#field-${field}` }));
	const msg = (field: Field) => (submitted && errors[field] ? { _type: 'error' as const, _description: errors[field]! } : undefined);
	const set = (field: Field) => (_e: unknown, v: unknown) => setValues((s) => ({ ...s, [field]: String(v ?? '') }));
	const [formRef, focusErrors] = useFormErrorFocus();
	return (
		<KolForm
			ref={formRef}
			_errorList={submitted ? list : []}
			_on={{
				onSubmit: () => {
					setSubmitted(true);
					if (list.length) focusErrors();
					else toast.show({ type: 'success', label: t('Bankverbindung gespeichert') });
				},
			}}
		>
			<FinkStack _gap="4">
				<KolInputText id="field-name" _label={t('Name der kontoführenden Person')} _required _value={values.name} _touched={submitted} _msg={msg('name')} _on={{ onInput: set('name') }} />
				<KolInputEmail id="field-email" _label={t('E-Mail-Adresse')} _required _value={values.email} _touched={submitted} _msg={msg('email')} _on={{ onInput: set('email') }} />
				<KolInputText id="field-iban" _label={t('IBAN')} _required _value={values.iban} _touched={submitted} _msg={msg('iban')} _hint={t('z. B. DE12 3456 7890 1234 5678 90')} _on={{ onInput: set('iban') }} />
				<div>
					<KolButton _label={t('Speichern')} _variant="primary" _type="submit" />
				</div>
			</FinkStack>
		</KolForm>
	);
}

function LoginDemo() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [state, setState] = useState<'idle' | 'loading' | 'error' | 'code' | 'ok'>('idle');
	const [codeError, setCodeError] = useState<string>();
	const submit = () => {
		setState('loading');
		window.setTimeout(() => setState(email === 'erika@beispiel.de' && password === 'fink' ? 'code' : 'error'), 900);
	};
	if (state === 'code') {
		return (
			<div style={{ maxWidth: '26rem' }}>
				<FinkStack _gap="4">
					<FinkOtpInput
						_label={t('Bestätigungscode')}
						_hint={t('Wir haben einen sechsstelligen Code an +49 151 ••• 42 gesendet. Demo-Code: 123456')}
						_error={codeError}
						onFinkChange={() => setCodeError(undefined)}
						onFinkComplete={(e) => (e.detail === '123456' ? setState('ok') : setCodeError(t('Der Code ist nicht korrekt. Bitte prüfen Sie die SMS.')))}
					/>
					<KolButton _label={t('Code erneut senden')} _variant="tertiary" _icons="codicon codicon-refresh" />
				</FinkStack>
			</div>
		);
	}
	if (state === 'ok') {
		return (
			<KolAlert _type="success" _variant="card" _label={t('Angemeldet')}>
				Willkommen zurück, Erika!{' '}
				<KolButton _label={t('Abmelden')} _variant="tertiary" _inline _on={{ onClick: () => setState('idle') }} />
			</KolAlert>
		);
	}
	return (
		<div style={{ maxWidth: '26rem' }}>
			<KolForm _on={{ onSubmit: submit }}>
				<FinkStack _gap="4">
					{state === 'error' && (
						<KolAlert _type="error" _variant="card" _label={t('Anmeldung fehlgeschlagen')} _alert>
							{t('E-Mail-Adresse oder Passwort ist falsch. Nach 5 Fehlversuchen wird das Konto 15 Minuten gesperrt.')}
						</KolAlert>
					)}
					<KolInputEmail _label={t('E-Mail-Adresse')} _required _autoComplete="username" _value={email} _on={{ onInput: (_e, v) => setEmail(String(v ?? '')) }} />
					<KolInputPassword _label={t('Passwort')} _required _autoComplete="current-password" _value={password} _on={{ onInput: (_e, v) => setPassword(String(v ?? '')) }} />
					<KolInputCheckbox _label={t('Angemeldet bleiben')} />
					<FinkStack _direction="row" _gap="3" _align="center">
						<KolButton _label={t('Anmelden')} _variant="primary" _type="submit" _disabled={state === 'loading'} />
						<KolSpin _show={state === 'loading'} _label={t('Anmeldung läuft')} />
					</FinkStack>
					<p className="small muted">
						{t('Demo:')} <code>{t('erika@beispiel.de')}</code> / <code>{t('fink')}</code> · <a href="#/patterns/login">{t('Passwort vergessen?')}</a>
					</p>
				</FinkStack>
			</KolForm>
		</div>
	);
}

type IsoDate = `${number}-${number}-${number}`;

function DatesDemo() {
	const [from, setFrom] = useState<IsoDate>('2026-12-01');
	const [to, setTo] = useState<IsoDate>('2026-12-14');
	const invalid = Boolean(from && to && to < from);
	const days = from && to && !invalid ? Math.round((Date.parse(to) - Date.parse(from)) / 86400000) + 1 : 0;
	return (
		<FinkStack _gap="4">
			<div className="form-row">
				<KolInputDate _label={t('Beginn des Vorhabens')} _type="date" _min="2026-11-14" _value={from} _on={{ onInput: (_e, v) => setFrom(String(v ?? '') as IsoDate) }} />
				<KolInputDate
					_label={t('Ende des Vorhabens')}
					_type="date"
					_min={from}
					_value={to}
					_touched
					_msg={invalid ? { _type: 'error', _description: t('Das Ende muss nach dem Beginn liegen.') } : undefined}
					_on={{ onInput: (_e, v) => setTo(String(v ?? '') as IsoDate) }}
				/>
			</div>
			<p className="muted small" role="status">
				{days ? t('Zeitraum: {{days}} Tage', { days }) : ' '}
			</p>
			<FinkCalendar _label={t('Beginn im Kalender wählen')} _value={from} _min="2026-11-14" onFinkChange={(e) => setFrom(e.detail as IsoDate)} />
		</FinkStack>
	);
}

function SettingsDemo() {
	const toast = useToast();
	const [prefs, setPrefs] = useState({ mail: true, push: false, digest: true });
	const toggle = (key: keyof typeof prefs, label: string) => (_e: unknown, v: unknown) => {
		setPrefs((p) => ({ ...p, [key]: Boolean(v) }));
		toast.show({ type: 'success', label: v ? t('{{label}} aktiviert', { label }) : t('{{label}} deaktiviert', { label }) });
	};
	return (
		<FinkPanel _heading={t('Benachrichtigungen')} _description={t('Änderungen werden sofort gespeichert.')} _level={3}>
			<FinkStack _gap="4">
				<KolInputCheckbox _variant="switch" _label={t('E-Mail bei Statusänderungen')} _checked={prefs.mail} _on={{ onChange: toggle('mail', 'E-Mail-Benachrichtigung') }} />
				<KolInputCheckbox _variant="switch" _label={t('Push-Mitteilungen im Browser')} _hint={t('Erfordert die Zustimmung Ihres Browsers.')} _checked={prefs.push} _on={{ onChange: toggle('push', 'Push-Mitteilungen') }} />
				<KolInputCheckbox _variant="switch" _label={t('Wöchentliche Zusammenfassung')} _checked={prefs.digest} _on={{ onChange: toggle('digest', 'Zusammenfassung') }} />
			</FinkStack>
		</FinkPanel>
	);
}

function TaskListDemo() {
	const [tasks, setTasks] = useState<FinkTask[]>([
		{ id: 'person', label: t('Persönliche Angaben'), status: 'done' },
		{ id: 'project', label: t('Vorhaben beschreiben'), status: 'in-progress' },
		{ id: 'docs', label: t('Nachweise hochladen'), status: 'todo' },
		{ id: 'check', label: t('Antworten prüfen und absenden'), status: 'blocked', hint: t('Möglich, sobald alle Aufgaben erledigt sind') },
	]);
	const complete = (id: string) =>
		setTasks((list) => {
			const next = list.map((t) => (t.id === id ? { ...t, status: 'done' as const } : t));
			const open = next.filter((t) => t.id !== 'check' && t.status !== 'done').length;
			return next.map((t) => (t.id === 'check' && t.status === 'blocked' && open === 0 ? { ...t, status: 'todo' as const, hint: undefined } : t));
		});
	return <FinkTaskList _tasks={tasks} onFinkTaskSelect={(e) => complete(e.detail)} />;
}

function HelpDemo() {
	return (
		<FinkStack _gap="5">
			<FinkStack _gap="2">
				<KolAccordion _label={t('Wer ist antragsberechtigt?')} _level={3}>
					{t('Unternehmen mit weniger als 250 Beschäftigten und Sitz in Deutschland.')}
				</KolAccordion>
				<KolAccordion _label={t('Welche Kosten sind förderfähig?')} _level={3}>
					{t('Hard- und Software, externe Beratung sowie Schulungen.')}
				</KolAccordion>
				<KolAccordion _label={t('Wie lange dauert die Bearbeitung?')} _level={3}>
					{t('Im Schnitt 10 Arbeitstage nach Eingang aller Unterlagen.')}
				</KolAccordion>
			</FinkStack>
			<FinkRating _label={t('Wie hilfreich fanden Sie die Antworten?')} _value={0} />
			<FinkFeedback />
		</FinkStack>
	);
}

export const formPatterns: PatternDefinition[] = [
	{
		id: 'forms',
		number: 17,
		title: t('Formular-Layout'),
		category: 'Formulare & Eingabe',
		icon: 'codicon codicon-symbol-field',
		summary: t('Einspaltige Formulare mit sichtbaren Labels, Hinweisen, Pflichtfeld-Kennzeichnung und klarer Primäraktion.'),
		problem: t('Formulare sind die häufigste Abbruchstelle; Unklarheit kostet Zeit und erzeugt Fehler.'),
		when: ['Jede Dateneingabe.'],
		avoid: ['Platzhalter statt Labels.', t('Mehrspaltige Formulare für nicht zusammengehörige Felder.')],
		components: ['kol-form', 'kol-input-text', 'kol-input-email', 'kol-single-select', 'kol-details', 'kol-input-radio', 'kol-textarea', 'kol-button'],
		a11y: [t('Autocomplete-Attribute für persönliche Daten (WCAG 1.3.5).'), 'Pflichtfeld-Hinweis am Formularanfang (KolForm _requiredText).'],
		sources: [
			{ system: 'MUI', name: 'Text Field / Form Control' },
			{ system: 'Vuetify', name: 'v-form' },
			{ system: 'Carbon', name: 'Forms pattern' },
			{ system: 'Atlassian', name: 'Forms' },
		],
		demo: () => <FormLayoutDemo />,
		code: {
			react: `<KolForm _requiredText>
  <KolInputText _label="Vorname" _required _autoComplete="given-name" />
  <KolInputEmail _label="E-Mail-Adresse" _required _hint="Für die Eingangsbestätigung" />
  <KolInputRadio _label="Bevorzugter Kontaktweg" _orientation="horizontal" _options={options} />
  <KolButton _label="Speichern" _variant="primary" _type="submit" />
</KolForm>`,
			html: `<kol-form _required-text>
  <kol-input-text _label="Vorname" _required _auto-complete="given-name"></kol-input-text>
  <kol-button _label="Speichern" _variant="primary" _type="submit"></kol-button>
</kol-form>`,
		},
	},
	{
		id: 'validation',
		number: 18,
		title: t('Validierung & Fehlerzusammenfassung'),
		category: 'Formulare & Eingabe',
		icon: 'codicon codicon-error',
		summary: t('Fehler nach dem Absenden oben zusammenfassen und mit dem Feld verlinken, zusätzlich am Feld anzeigen.'),
		problem: t('Nutzende übersehen Fehler in langen Formularen oder verstehen nicht, wie sie sie beheben.'),
		when: ['Validierung beim Absenden.', t('Formulare mit mehreren Feldern.')],
		avoid: ['Fehler schon beim ersten Tippen anzeigen.', t('Fehlertexte ohne Lösungshinweis („Ungültig“).')],
		components: ['kol-form', 'kol-input-text', 'kol-input-email'],
		a11y: [t('Fehlerliste wird fokussiert und verlinkt auf das Feld (KolForm _errorList).'), t('Fehlertext am Feld über aria-describedby verknüpft.')],
		sources: [
			{ system: 'GOV.UK', name: 'Recover from validation errors / Error summary' },
			{ system: 'Carbon', name: 'Forms – validation' },
		],
		demo: () => <ValidationDemo />,
		code: {
			react: `<KolForm
  ref={formRef}
  _errorList={submitted ? errors.map((e) => ({ message: e.text, selector: \`#field-\${e.field}\` })) : []}
  _on={{
    onSubmit: () => {
      setSubmitted(true);
      // Ab KoliBri 4.6 explizit: Fehlerzusammenfassung fokussieren.
      if (errors.length) void formRef.current?.focusErrorList();
    },
  }}
>
  <KolInputText
    id="field-iban"
    _label="IBAN"
    _touched={submitted}
    _msg={error ? { _type: 'error', _description: 'Geben Sie eine deutsche IBAN mit 22 Zeichen ein' } : undefined}
  />
</KolForm>`,
		},
	},
	{
		id: 'login',
		number: 19,
		title: t('Anmeldung'),
		category: 'Formulare & Eingabe',
		icon: 'codicon codicon-sign-in',
		summary: t('Anmeldeformular mit Ladezustand, verständlicher Fehlermeldung und Passwort-Hilfe.'),
		problem: t('Anmeldefehler frustrieren; Nutzende müssen wissen, was schiefging und wie es weitergeht.'),
		when: [t('Geschützte Bereiche.')],
		avoid: [t('Verraten, ob E-Mail oder Passwort falsch war (Sicherheit).'), t('Einfügen in Passwortfelder blockieren.')],
		components: ['kol-form', 'kol-input-email', 'kol-input-password', 'kol-input-checkbox', 'kol-spin', 'kol-alert', 'fink-otp-input'],
		a11y: [t('autocomplete="username"/"current-password" für Passwortmanager.'), 'Fehlermeldung als Alert angesagt.'],
		sources: [
			{ system: 'Carbon', name: 'Login pattern' },
			{ system: 'GOV.UK', name: 'Passwords / Create accounts' },
			{ system: 'MUI', name: 'Sign-in template' },
		],
		demo: () => <LoginDemo />,
		code: {
			react: `<KolForm _on={{ onSubmit: login }}>
  {error && <KolAlert _type="error" _variant="card" _label="Anmeldung fehlgeschlagen" _alert>…</KolAlert>}
  <KolInputEmail _label="E-Mail-Adresse" _autoComplete="username" />
  <KolInputPassword _label="Passwort" _autoComplete="current-password" />
  <KolButton _label="Anmelden" _variant="primary" _type="submit" _disabled={loading} />
  <KolSpin _show={loading} _label="Anmeldung läuft" />
</KolForm>`,
		},
	},
	{
		id: 'file-upload',
		number: 20,
		title: t('Datei-Upload'),
		category: 'Formulare & Eingabe',
		icon: 'codicon codicon-cloud-upload',
		summary: t('Dateien per Drag & Drop oder Schaltfläche hinzufügen, prüfen und wieder entfernen.'),
		problem: t('Nachweise müssen hochgeladen werden; falsche Formate oder Größen sollen sofort auffallen.'),
		when: [t('Nachweise, Anhänge, Bilder.')],
		components: ['fink-file-upload'],
		a11y: [t('Schaltfläche statt reiner Drop-Zone; Fehler pro Datei als Text.'), t('Hinzufügen/Entfernen wird angesagt.')],
		sources: [
			{ system: 'Vuetify', name: 'v-file-input' },
			{ system: 'Carbon', name: 'File uploader' },
			{ system: 'Ant Design', name: 'Upload (Dragger)' },
		],
		demo: () => <FinkFileUpload _label={t('Nachweise')} _hint={t('PDF oder JPG, höchstens 5 MB')} _accept=".pdf,.jpg,.jpeg" _maxSize={5 * 1024 * 1024} />,
		code: {
			react: `<FinkFileUpload
  _label="Nachweise"
  _hint="PDF oder JPG, höchstens 5 MB"
  _accept=".pdf,.jpg,.jpeg"
  _maxSize={5 * 1024 * 1024}
  onFinkFilesChange={(e) => setFiles(e.detail)}
/>`,
			html: `<fink-file-upload _label="Nachweise" _accept=".pdf,.jpg" _max-size="5242880"></fink-file-upload>`,
		},
	},
	{
		id: 'dates',
		number: 21,
		title: t('Datum & Zeitraum'),
		category: 'Formulare & Eingabe',
		icon: 'codicon codicon-calendar',
		summary: t('Datumseingabe mit Min/Max-Grenzen und Zeitraumprüfung.'),
		problem: t('Ungültige oder unlogische Daten (Ende vor Beginn) führen zu Rückfragen.'),
		when: [t('Termine, Fristen, Zeiträume.')],
		avoid: [t('Kalender-Popups für bekannte Daten wie Geburtsdaten – dort Texteingabe.')],
		components: ['kol-input-date', 'fink-calendar'],
		a11y: [t('Natives Datumsfeld mit Tastaturbedienung; Fehler als Text.')],
		sources: [
			{ system: 'Material 3', name: 'Date pickers (range)' },
			{ system: 'MUI', name: 'Date Range Picker' },
			{ system: 'Vuetify', name: 'v-date-input' },
			{ system: 'GOV.UK', name: 'Dates' },
		],
		demo: () => <DatesDemo />,
		code: {
			react: `<KolInputDate _label="Beginn" _type="date" _min={today} _value={from} _on={{ onInput: (_e, v) => setFrom(v) }} />
<KolInputDate
  _label="Ende"
  _type="date"
  _min={from}
  _value={to}
  _msg={to < from ? { _type: 'error', _description: 'Das Ende muss nach dem Beginn liegen.' } : undefined}
/>`,
		},
	},
	{
		id: 'settings',
		number: 22,
		title: t('Einstellungen mit Schaltern'),
		category: 'Formulare & Eingabe',
		icon: 'codicon codicon-settings',
		summary: t('Sofort wirksame Ein/Aus-Optionen als Switches, gruppiert in Panels.'),
		problem: t('Einstellungen sollen schnell geändert werden, ohne Speichern-Knopf zu suchen.'),
		when: [t('Binäre Optionen mit sofortiger Wirkung.')],
		avoid: [t('Switches in Formularen, die erst mit „Absenden“ wirken (dort Checkbox).')],
		components: ['kol-input-checkbox', 'fink-panel'],
		a11y: [t('Switch-Rolle mit Zustand; Bestätigung per Toast.')],
		sources: [
			{ system: 'Material 3', name: 'Switch' },
			{ system: 'MUI', name: 'Switch' },
			{ system: 'Vuetify', name: 'v-switch' },
		],
		demo: () => <SettingsDemo />,
		code: {
			react: `<FinkPanel _heading="Benachrichtigungen">
  <KolInputCheckbox
    _variant="switch"
    _label="E-Mail bei Statusänderungen"
    _checked={prefs.mail}
    _on={{ onChange: (_e, v) => save({ mail: Boolean(v) }) }}
  />
</FinkPanel>`,
			html: `<kol-input-checkbox _variant="switch" _label="E-Mail bei Statusänderungen" _checked></kol-input-checkbox>`,
		},
	},
	{
		id: 'task-list',
		number: 23,
		title: t('Aufgabenliste'),
		category: 'Formulare & Eingabe',
		icon: 'codicon codicon-tasklist',
		summary: t('Lange Vorgänge in Teilaufgaben mit Status zerlegen; Absenden erst, wenn alles erledigt ist.'),
		problem: t('Umfangreiche Anträge werden über Tage bearbeitet; Nutzende brauchen Überblick und Wiedereinstieg.'),
		when: [t('Unabhängige Teilaufgaben, die in beliebiger Reihenfolge erledigt werden.')],
		components: ['fink-task-list'],
		a11y: [t('Status als Text, gesperrte Aufgaben sind nicht als Link ausgezeichnet.')],
		sources: [
			{ system: 'GOV.UK', name: 'Complete multiple tasks / Task list' },
		],
		demo: () => <TaskListDemo />,
		code: {
			react: `<FinkTaskList
  _tasks={[
    { id: 'person', label: 'Persönliche Angaben', status: 'done' },
    { id: 'docs', label: 'Nachweise hochladen', status: 'todo' },
    { id: 'check', label: 'Prüfen und absenden', status: 'blocked' },
  ]}
  onFinkTaskSelect={(e) => openTask(e.detail)}
/>`,
			html: `<fink-task-list _tasks='[{"id":"docs","label":"Nachweise hochladen","status":"todo"}]'></fink-task-list>`,
		},
	},
	{
		id: 'help',
		number: 24,
		title: t('Hilfe, FAQ & Bewertung'),
		category: 'Formulare & Eingabe',
		icon: 'codicon codicon-question',
		summary: t('Aufklappbare Antworten, Sternebewertung und Seitenfeedback.'),
		problem: t('Häufige Fragen sollen ohne Kontaktaufnahme beantwortet und Lücken erkannt werden.'),
		when: ['Hilfeseiten, Abschluss von Prozessen.'],
		components: ['kol-accordion', 'fink-rating', 'fink-feedback'],
		a11y: [t('Accordion-Überschriften auf korrekter Ebene.'), 'Bewertung als Radiogruppe.'],
		sources: [
			{ system: 'MUI', name: 'Accordion / Rating' },
			{ system: 'Vuetify', name: 'v-expansion-panels / v-rating' },
			{ system: 'Carbon', name: 'Disclosures' },
		],
		demo: () => <HelpDemo />,
		code: {
			react: `<KolAccordion _label="Wer ist antragsberechtigt?" _level={3}>…</KolAccordion>
<FinkRating _label="Wie hilfreich fanden Sie die Antworten?" onFinkChange={(e) => rate(e.detail)} />
<FinkFeedback onFinkFeedback={(e) => send(e.detail)} />`,
			html: `<kol-accordion _label="Wer ist antragsberechtigt?">…</kol-accordion>
<fink-rating _label="Wie hilfreich?"></fink-rating>
<fink-feedback></fink-feedback>`,
		},
	},
];
