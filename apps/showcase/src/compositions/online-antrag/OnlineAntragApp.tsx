import { useState } from 'react';
import {
	FinkConsentBanner,
	FinkEmptyState,
	FinkFeedback,
	FinkFileUpload,
	FinkGrid,
	FinkPageHeader,
	FinkPanel,
	FinkRating,
	FinkResult,
	FinkStack,
	FinkSummaryList,
	FinkTaskList,
	FinkTimeline,
	KolAccordion,
	KolAlert,
	KolButton,
	KolForm,
	KolInputCheckbox,
	KolInputDate,
	KolInputEmail,
	KolInputNumber,
	KolInputText,
	KolLinkButton,
	KolSingleSelect,
	KolSpin,
	KolTextarea,
	useToast,
	type FinkTask,
} from '@fink/react';
import { useRoute } from '../../router';
import { CompositionShell } from '../CompositionShell';
import { createStore } from '../createStore';
import '../composition.css';
import { t, locale } from '../../i18n';
import { useFormErrorFocus } from '../../site/useFormErrorFocus';

const BASE = '/compositions/online-antrag';

type IsoDate = `${number}-${number}-${number}`;

interface Draft {
	person: { firstName: string; lastName: string; birth: string; email: string; street: string; zip: string; city: string };
	project: { program: string; start: string; end: string; amount: number | null; description: string };
	files: string[];
	confirmed: boolean;
	submitted: string | null;
	consent: string[] | null;
}

const empty = (): Draft => ({
	person: { firstName: '', lastName: '', birth: '', email: '', street: '', zip: '', city: '' },
	project: { program: '', start: '', end: '', amount: null, description: '' },
	files: [],
	confirmed: false,
	submitted: null,
	consent: null,
});

const store = createStore<Draft>('online-antrag', empty);

const PROGRAMS = [
	{ label: t('Bitte wählen'), value: '' },
	{ label: t('Digitalisierung im Mittelstand'), value: 'dig' },
	{ label: t('Klimaschutz in Unternehmen'), value: 'klima' },
	{ label: t('Innovationsgutschein'), value: 'inno' },
];

type PersonKey = keyof Draft['person'];
type ProjectKey = keyof Draft['project'];

const personErrors = (p: Draft['person']) => {
	const e: Partial<Record<PersonKey, string>> = {};
	if (!p.firstName.trim()) e.firstName = t('Geben Sie Ihren Vornamen ein');
	if (!p.lastName.trim()) e.lastName = t('Geben Sie Ihren Nachnamen ein');
	if (!p.birth) e.birth = t('Geben Sie Ihr Geburtsdatum ein');
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) e.email = t('Geben Sie eine E-Mail-Adresse im Format name@beispiel.de ein');
	if (!p.street.trim()) e.street = t('Geben Sie Straße und Hausnummer ein');
	if (!/^\d{5}$/.test(p.zip)) e.zip = 'Die Postleitzahl hat 5 Ziffern';
	if (!p.city.trim()) e.city = t('Geben Sie den Ort ein');
	return e;
};

const projectErrors = (p: Draft['project']) => {
	const e: Partial<Record<ProjectKey, string>> = {};
	if (!p.program) e.program = t('Wählen Sie ein Förderprogramm');
	if (!p.start) e.start = t('Geben Sie den Beginn an');
	if (!p.end) e.end = t('Geben Sie das Ende an');
	else if (p.start && p.end < p.start) e.end = 'Das Ende muss nach dem Beginn liegen';
	if (p.amount === null || p.amount < 1000 || p.amount > 50000) e.amount = t('Die Fördersumme liegt zwischen 1.000 € und 50.000 €');
	if (p.description.trim().length < 50) e.description = `Beschreiben Sie das Vorhaben in mindestens 50 Zeichen (noch ${Math.max(0, 50 - p.description.trim().length)})`;
	return e;
};

const status = (errors: object, touched: boolean): FinkTask['status'] => (Object.keys(errors).length === 0 ? 'done' : touched ? 'in-progress' : 'todo');

const dateDe = (iso: string) => (iso ? new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale) : '–');
const euro = (n: number | null) => (n === null ? '–' : n.toLocaleString(locale, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }));

type Page = 'tasks' | 'person' | 'project' | 'docs' | 'check';

function TasksPage({ draft, go }: { draft: Draft; go: (p: Page) => void }) {
	const pTouched = Object.values(draft.person).some(Boolean);
	const jTouched = Object.values(draft.project).some((v) => v !== '' && v !== null);
	const tasks: FinkTask[] = [
		{ id: 'person', label: t('Persönliche Angaben'), status: status(personErrors(draft.person), pTouched) },
		{ id: 'project', label: t('Vorhaben und Finanzierung'), status: status(projectErrors(draft.project), jTouched) },
		{ id: 'docs', label: t('Nachweise hochladen'), status: draft.files.length ? 'done' : 'todo', hint: draft.files.length ? `${draft.files.length} Datei(en)` : t('Kostenvoranschlag oder Angebot') },
	];
	const ready = tasks.every((t) => t.status === 'done');
	tasks.push({ id: 'check', label: t('Antworten prüfen und absenden'), status: ready ? 'todo' : 'blocked', hint: ready ? undefined : t('Möglich, sobald alle Aufgaben erledigt sind') });
	return (
		<>
			<FinkPageHeader _heading={t('Förderung „Digitalisierung im Mittelstand“ beantragen')} _description={t('Erledigen Sie die Aufgaben in beliebiger Reihenfolge. Ihr Entwurf wird automatisch gespeichert.')} />
			<FinkStack _gap="5">
				<KolAlert _type="info" _variant="card" _label={t('Antragsfrist: 30.11.2026')}>
					{t('Halten Sie einen Kostenvoranschlag als PDF bereit. Die Bearbeitung dauert etwa 15 Minuten.')}
				</KolAlert>
				<FinkPanel _heading={t('Ihre Aufgaben')}>
					<FinkTaskList _tasks={tasks} onFinkTaskSelect={(e) => go(e.detail as Page)} />
				</FinkPanel>
				<FinkStack _direction="row" _gap="2">
					<KolButton
						_label={t('Entwurf verwerfen')}
						_variant="tertiary"
						_icons="codicon codicon-discard"
						_on={{ onClick: () => store.set((d) => ({ ...empty(), consent: d.consent })) }}
					/>
				</FinkStack>
			</FinkStack>
		</>
	);
}

function PersonPage({ draft, back }: { draft: Draft; back: () => void }) {
	const [submitted, setSubmitted] = useState(false);
	const p = draft.person;
	const errors = personErrors(p);
	const set = (key: PersonKey) => (_e: unknown, v: unknown) => store.set((d) => ({ ...d, person: { ...d.person, [key]: String(v ?? '') } }));
	const msg = (key: PersonKey) => (submitted && errors[key] ? { _type: 'error' as const, _description: errors[key]! } : undefined);
	const list = (Object.keys(errors) as PersonKey[]).map((key) => ({ message: errors[key]!, selector: `#person-${key}` }));
	const [formRef, focusErrors] = useFormErrorFocus();
	return (
		<>
			<FinkPageHeader _heading={t('Persönliche Angaben')} _description={t('Wir verwenden die Angaben ausschließlich zur Bearbeitung Ihres Antrags.')} />
			<KolForm
				ref={formRef}
				_requiredText
				_errorList={submitted ? list : []}
				_on={{
					onSubmit: () => {
						setSubmitted(true);
						if (list.length === 0) back();
						else focusErrors();
					},
				}}
			>
				<FinkStack _gap="4">
					<div className="form-row">
						<KolInputText id="person-firstName" _label={t('Vorname')} _required _autoComplete="given-name" _value={p.firstName} _touched={submitted} _msg={msg('firstName')} _on={{ onInput: set('firstName') }} />
						<KolInputText id="person-lastName" _label={t('Nachname')} _required _autoComplete="family-name" _value={p.lastName} _touched={submitted} _msg={msg('lastName')} _on={{ onInput: set('lastName') }} />
					</div>
					<KolInputDate id="person-birth" _label={t('Geburtsdatum')} _type="date" _required _max="2008-11-14" _value={(p.birth || undefined) as IsoDate | undefined} _touched={submitted} _msg={msg('birth')} _on={{ onInput: set('birth') }} />
					<KolInputEmail id="person-email" _label={t('E-Mail-Adresse')} _required _autoComplete="email" _hint={t('Für Rückfragen und die Eingangsbestätigung')} _value={p.email} _touched={submitted} _msg={msg('email')} _on={{ onInput: set('email') }} />
					<KolInputText id="person-street" _label={t('Straße und Hausnummer')} _required _autoComplete="street-address" _value={p.street} _touched={submitted} _msg={msg('street')} _on={{ onInput: set('street') }} />
					<div className="form-row">
						<KolInputText id="person-zip" _label={t('Postleitzahl')} _required _autoComplete="postal-code" _maxLength={5} _value={p.zip} _touched={submitted} _msg={msg('zip')} _on={{ onInput: set('zip') }} />
						<KolInputText id="person-city" _label={t('Ort')} _required _autoComplete="address-level2" _value={p.city} _touched={submitted} _msg={msg('city')} _on={{ onInput: set('city') }} />
					</div>
					<FinkStack _direction="row" _gap="2">
						<KolButton _label={t('Speichern und zurück')} _variant="primary" _type="submit" />
						<KolButton _label={t('Später fortfahren')} _variant="tertiary" _on={{ onClick: back }} />
					</FinkStack>
				</FinkStack>
			</KolForm>
		</>
	);
}

function ProjectPage({ draft, back }: { draft: Draft; back: () => void }) {
	const [submitted, setSubmitted] = useState(false);
	const p = draft.project;
	const errors = projectErrors(p);
	const set = (key: ProjectKey, transform: (v: unknown) => unknown = (v) => String(v ?? '')) => (_e: unknown, v: unknown) =>
		store.set((d) => ({ ...d, project: { ...d.project, [key]: transform(v) } }));
	const msg = (key: ProjectKey) => (submitted && errors[key] ? { _type: 'error' as const, _description: errors[key]! } : undefined);
	const list = (Object.keys(errors) as ProjectKey[]).map((key) => ({ message: errors[key]!, selector: `#project-${key}` }));
	const [formRef, focusErrors] = useFormErrorFocus();
	return (
		<>
			<FinkPageHeader _heading={t('Vorhaben und Finanzierung')} _description={t('Beschreiben Sie, was Sie mit der Förderung umsetzen möchten.')} />
			<KolForm
				ref={formRef}
				_requiredText
				_errorList={submitted ? list : []}
				_on={{
					onSubmit: () => {
						setSubmitted(true);
						if (list.length === 0) back();
						else focusErrors();
					},
				}}
			>
				<FinkStack _gap="4">
					<KolSingleSelect id="project-program" _label={t('Förderprogramm')} _required _options={PROGRAMS} _value={p.program} _touched={submitted} _msg={msg('program')} _on={{ onChange: set('program') }} />
					<div className="form-row">
						<KolInputDate id="project-start" _label={t('Beginn')} _type="date" _required _min="2026-11-14" _value={(p.start || undefined) as IsoDate | undefined} _touched={submitted} _msg={msg('start')} _on={{ onInput: set('start') }} />
						<KolInputDate id="project-end" _label={t('Ende')} _type="date" _required _min={(p.start || '2026-11-14') as IsoDate} _value={(p.end || undefined) as IsoDate | undefined} _touched={submitted} _msg={msg('end')} _on={{ onInput: set('end') }} />
					</div>
					<KolInputNumber
						id="project-amount"
						_label={t('Beantragte Fördersumme in Euro')}
						_required
						_min={1000}
						_max={50000}
						_step={100}
						_value={p.amount ?? undefined}
						_touched={submitted}
						_msg={msg('amount')}
						_on={{ onInput: set('amount', (v) => (v === '' || v === null || v === undefined ? null : Number(v))) }}
					/>
					<KolTextarea id="project-description" _label={t('Beschreibung des Vorhabens')} _required _rows={5} _hasCounter _maxLength={1000} _value={p.description} _touched={submitted} _msg={msg('description')} _on={{ onInput: set('description') }} />
					<FinkStack _direction="row" _gap="2">
						<KolButton _label={t('Speichern und zurück')} _variant="primary" _type="submit" />
						<KolButton _label={t('Später fortfahren')} _variant="tertiary" _on={{ onClick: back }} />
					</FinkStack>
				</FinkStack>
			</KolForm>
		</>
	);
}

function DocsPage({ draft, back }: { draft: Draft; back: () => void }) {
	const [error, setError] = useState<string | undefined>();
	const [files, setFiles] = useState<File[]>([]);
	return (
		<>
			<FinkPageHeader _heading={t('Nachweise hochladen')} _description={t('Laden Sie einen Kostenvoranschlag oder ein Angebot hoch.')} />
			<FinkStack _gap="5">
				{draft.files.length > 0 && (
					<KolAlert _type="success" _variant="msg">
						Bereits hochgeladen: {draft.files.join(', ')}
					</KolAlert>
				)}
				<FinkFileUpload _label={t('Kostenvoranschlag oder Angebot')} _hint={t('PDF, JPG oder PNG, höchstens 10 MB pro Datei')} _accept=".pdf,.jpg,.jpeg,.png" _error={error} onFinkFilesChange={(e) => setFiles(e.detail)} />
				<FinkStack _direction="row" _gap="2">
					<KolButton
						_label={t('Speichern und zurück')}
						_variant="primary"
						_on={{
							onClick: () => {
								if (files.length === 0 && draft.files.length === 0) {
									setError(t('Laden Sie mindestens eine Datei hoch'));
									return;
								}
								store.set((d) => ({ ...d, files: [...new Set([...d.files, ...files.map((f) => f.name)])] }));
								back();
							},
						}}
					/>
					<KolButton _label={t('Später fortfahren')} _variant="tertiary" _on={{ onClick: back }} />
				</FinkStack>
			</FinkStack>
		</>
	);
}

function CheckPage({ draft, go }: { draft: Draft; go: (p: Page) => void }) {
	const toast = useToast();
	const [sending, setSending] = useState(false);
	const [touched, setTouched] = useState(false);
	const p = draft.person;
	const j = draft.project;
	const program = PROGRAMS.find((x) => x.value === j.program)?.label ?? '–';
	return (
		<>
			<FinkPageHeader _heading={t('Antworten prüfen')} _description={t('Prüfen Sie Ihre Angaben, bevor Sie den Antrag verbindlich absenden.')} />
			<FinkStack _gap="5">
				<FinkPanel _heading={t('Persönliche Angaben')}>
					<FinkSummaryList
						_items={[
							{ id: 'person', key: t('Name'), value: `${p.firstName} ${p.lastName}`, actionLabel: t('Ändern') },
							{ id: 'person', key: t('Geburtsdatum'), value: dateDe(p.birth), actionLabel: t('Ändern') },
							{ id: 'person', key: t('E-Mail'), value: p.email, actionLabel: t('Ändern') },
							{ id: 'person', key: t('Anschrift'), value: `${p.street}\n${p.zip} ${p.city}`, actionLabel: t('Ändern') },
						]}
						onFinkAction={(e) => go(e.detail as Page)}
					/>
				</FinkPanel>
				<FinkPanel _heading={t('Vorhaben und Finanzierung')}>
					<FinkSummaryList
						_items={[
							{ id: 'project', key: t('Programm'), value: program, actionLabel: t('Ändern') },
							{ id: 'project', key: t('Zeitraum'), value: `${dateDe(j.start)} – ${dateDe(j.end)}`, actionLabel: t('Ändern') },
							{ id: 'project', key: t('Fördersumme'), value: euro(j.amount), actionLabel: t('Ändern') },
							{ id: 'project', key: t('Beschreibung'), value: j.description, actionLabel: t('Ändern') },
						]}
						onFinkAction={(e) => go(e.detail as Page)}
					/>
				</FinkPanel>
				<FinkPanel _heading={t('Nachweise')}>
					<FinkSummaryList _items={[{ id: 'docs', key: t('Dateien'), value: draft.files.join('\n'), actionLabel: t('Ändern') }]} onFinkAction={(e) => go(e.detail as Page)} />
				</FinkPanel>
				<KolInputCheckbox
					_label={t('Ich versichere, dass alle Angaben vollständig und richtig sind.')}
					_required
					_checked={draft.confirmed}
					_touched={touched}
					_msg={touched && !draft.confirmed ? { _type: 'error', _description: t('Bestätigen Sie die Richtigkeit der Angaben') } : undefined}
					_on={{ onChange: (_e, v) => store.set((d) => ({ ...d, confirmed: Boolean(v) })) }}
				/>
				<FinkStack _direction="row" _gap="3" _align="center">
					<KolButton
						_label={t('Antrag verbindlich absenden')}
						_variant="primary"
						_icons="codicon codicon-send"
						_disabled={sending}
						_on={{
							onClick: () => {
								setTouched(true);
								if (!draft.confirmed) return;
								setSending(true);
								window.setTimeout(() => {
									const reference = `DM-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
									store.set((d) => ({ ...d, submitted: reference }));
									toast.show({ type: 'success', label: t('Antrag eingereicht'), description: `Vorgangsnummer ${reference}` });
								}, 1200);
							},
						}}
					/>
					<KolSpin _show={sending} _label={t('Antrag wird übermittelt')} />
				</FinkStack>
			</FinkStack>
		</>
	);
}

function DonePage({ draft }: { draft: Draft }) {
	return (
		<FinkStack _gap="6">
			<FinkResult _variant="success" _heading={t('Antrag eingereicht')} _reference={draft.submitted ?? ''} _description={t('Wir haben eine Bestätigung an {{email}} gesendet.', { email: draft.person.email })}>
				<KolButton _label={t('Neuen Antrag beginnen')} _variant="secondary" _on={{ onClick: () => store.set((d) => ({ ...empty(), consent: d.consent })) }} />
			</FinkResult>
			<FinkGrid _min="20rem" _gap="5">
				<FinkPanel _heading={t('Wie geht es weiter?')}>
					<FinkTimeline
						_items={[
							{ title: t('Eingangsbestätigung'), date: t('heute'), description: t('per E-Mail mit Ihren Angaben als PDF'), tone: 'success', icon: 'codicon codicon-check' },
							{ title: t('Prüfung'), date: t('in 5–10 Arbeitstagen'), description: t('Bei Rückfragen melden wir uns per E-Mail.'), tone: 'info' },
							{ title: t('Bescheid'), date: t('nach der Prüfung'), description: t('im Postfach dieses Portals'), tone: 'brand' },
						]}
					/>
				</FinkPanel>
				<FinkPanel _heading={t('Wie war der Online-Antrag?')}>
					<FinkStack _gap="4">
						<FinkRating _label={t('Ihre Bewertung')} />
						<FinkFeedback _question={t('Haben Sie alles gefunden, was Sie brauchten?')} />
					</FinkStack>
				</FinkPanel>
			</FinkGrid>
		</FinkStack>
	);
}

function AntragView() {
	const [draft] = store.use();
	const [page, setPage] = useState<Page>('tasks');
	const go = (p: Page) => {
		setPage(p);
		window.scrollTo({ top: 0 });
	};
	if (draft.submitted) return <DonePage draft={draft} />;
	const back = () => go('tasks');
	return (
		<>
			{page !== 'tasks' && (
				<div style={{ marginBottom: 'var(--fink-space-4)' }}>
					<KolButton _label={t('Zurück zur Übersicht')} _icons="codicon codicon-arrow-left" _variant="tertiary" _on={{ onClick: back }} />
				</div>
			)}
			{page === 'tasks' && <TasksPage draft={draft} go={go} />}
			{page === 'person' && <PersonPage draft={draft} back={back} />}
			{page === 'project' && <ProjectPage draft={draft} back={back} />}
			{page === 'docs' && <DocsPage draft={draft} back={back} />}
			{page === 'check' && <CheckPage draft={draft} go={go} />}
		</>
	);
}

function HelpView() {
	return (
		<>
			<FinkPageHeader _heading={t('Hilfe zum Antrag')} _description={t('Antworten auf häufige Fragen.')} />
			<FinkStack _gap="2">
				<KolAccordion _label={t('Kann ich den Antrag unterbrechen?')} _level={2}>
					{t('Ja. Ihr Entwurf wird automatisch gespeichert, sobald Sie eine Aufgabe speichern.')}
				</KolAccordion>
				<KolAccordion _label={t('Welche Dateiformate sind erlaubt?')} _level={2}>
					{t('PDF, JPG und PNG bis 10 MB pro Datei.')}
				</KolAccordion>
				<KolAccordion _label={t('Kann ich den Antrag nach dem Absenden ändern?')} _level={2}>
					{t('Nein. Wenden Sie sich bei Änderungen an die im Bescheid genannte Stelle.')}
				</KolAccordion>
			</FinkStack>
		</>
	);
}

export function OnlineAntragApp() {
	const route = useRoute();
	const view = route.slice(BASE.length).replace(/^\//, '').split('/')[0] || 'antrag';
	const [draft] = store.use();
	return (
		<CompositionShell
			label={t('Online-Antrag')}
			icon="codicon codicon-file-submodule"
			base={BASE}
			view={view}
			gradient="linear-gradient(135deg, var(--fink-color-success), var(--fink-color-info))"
			links={[
				{ id: 'antrag', label: t('Mein Antrag'), icon: 'codicon codicon-file' },
				{ id: 'hilfe', label: t('Hilfe'), icon: 'codicon codicon-question' },
				{ id: 'postfach', label: t('Postfach'), icon: 'codicon codicon-mail' },
			]}
		>
			{view === 'antrag' && <AntragView />}
			{view === 'hilfe' && <HelpView />}
			{view === 'postfach' && (
				<>
					<FinkPageHeader _heading={t('Postfach')} />
					<FinkEmptyState _heading={t('Keine Nachrichten')} _description={t('Bescheide und Rückfragen erscheinen hier.')} _icons="codicon codicon-mail">
						<KolLinkButton _label={t('Zum Antrag')} _href={`#${BASE}`} _variant="primary" />
					</FinkEmptyState>
				</>
			)}
			{draft.consent === null && <FinkConsentBanner onFinkConsent={(e) => store.set((d) => ({ ...d, consent: e.detail }))} />}
		</CompositionShell>
	);
}
