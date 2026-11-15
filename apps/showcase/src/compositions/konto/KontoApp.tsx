import { useRef, useState, type RefObject } from 'react';
import {
	FinkOtpInput,
	FinkPageHeader,
	FinkPanel,
	FinkResult,
	FinkSegmented,
	FinkStack,
	FinkSummaryList,
	FinkTimeline,
	KolAlert,
	KolButton,
	KolDialog,
	KolForm,
	KolInputCheckbox,
	KolInputEmail,
	KolInputPassword,
	KolInputText,
	KolSpin,
	useToast,
} from '@fink/react';
import { navigate, useRoute } from '../../router';
import { CompositionShell } from '../CompositionShell';
import { createStore } from '../createStore';
import '../composition.css';
import { t } from '../../i18n';
import { useFormErrorFocus } from '../../site/useFormErrorFocus';

const BASE = '/compositions/konto';

interface Account {
	loggedIn: boolean;
	deleted: boolean;
	profile: { name: string; email: string; phone: string; organisation: string };
	prefs: { status: boolean; deadlines: boolean; newsletter: boolean; frequency: string };
	twoFactor: boolean;
	sessions: Array<{ id: string; device: string; place: string; when: string; current?: boolean }>;
}

const initial = (): Account => ({
	loggedIn: false,
	deleted: false,
	profile: { name: 'Erika Mustermann', email: 'erika@beispiel.de', phone: '030 1234567', organisation: 'Mühlenwerk GmbH' },
	prefs: { status: true, deadlines: true, newsletter: false, frequency: 'instant' },
	twoFactor: false,
	sessions: [
		{ id: 's1', device: 'Firefox auf macOS', place: 'Berlin', when: 'jetzt aktiv', current: true },
		{ id: 's2', device: 'Safari auf iPhone', place: 'Berlin', when: 'vor 2 Stunden' },
		{ id: 's3', device: 'Edge auf Windows', place: 'Potsdam', when: 'vor 6 Tagen' },
	],
});

const store = createStore<Account>('konto', initial);

function Login() {
	const [email, setEmail] = useState('erika@beispiel.de');
	const [password, setPassword] = useState('');
	const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
	const [attempts, setAttempts] = useState(0);
	const submit = () => {
		setState('loading');
		window.setTimeout(() => {
			if (password === 'fink') {
				store.set((a) => ({ ...a, loggedIn: true }));
			} else {
				setAttempts((n) => n + 1);
				setState('error');
			}
		}, 800);
	};
	return (
		<div className="login-wrap">
			<FinkPanel _heading={t('Anmelden')} _level={1} _description={t('Melden Sie sich mit Ihrem Servicekonto an.')}>
				<KolForm _on={{ onSubmit: submit }}>
					<FinkStack _gap="4">
						{state === 'error' && (
							<KolAlert _type="error" _variant="card" _label={t('Anmeldung fehlgeschlagen')} _alert>
								{t('E-Mail-Adresse oder Passwort ist falsch. Noch {{count}} Versuche, bevor das Konto für 15 Minuten gesperrt wird.', { count: Math.max(0, 5 - attempts) })}
							</KolAlert>
						)}
						<KolInputEmail _label={t('E-Mail-Adresse')} _required _autoComplete="username" _value={email} _on={{ onInput: (_e, v) => setEmail(String(v ?? '')) }} />
						<KolInputPassword _label={t('Passwort')} _required _autoComplete="current-password" _hint={t('Demo-Passwort: fink')} _value={password} _on={{ onInput: (_e, v) => setPassword(String(v ?? '')) }} />
						<KolInputCheckbox _label={t('Auf diesem Gerät angemeldet bleiben')} />
						<FinkStack _direction="row" _gap="3" _align="center">
							<KolButton _label={t('Anmelden')} _variant="primary" _type="submit" _disabled={state === 'loading'} />
							<KolSpin _show={state === 'loading'} _label={t('Anmeldung läuft')} />
						</FinkStack>
					</FinkStack>
				</KolForm>
				<span slot="footer">
					<a href={`#${BASE}`}>{t('Passwort vergessen?')}</a> · <a href={`#${BASE}`}>{t('Konto erstellen')}</a>
				</span>
			</FinkPanel>
		</div>
	);
}

function ProfileView({ account }: { account: Account }) {
	const toast = useToast();
	const [editing, setEditing] = useState(false);
	const [form, setForm] = useState(account.profile);
	const [touched, setTouched] = useState(false);
	const emailError = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? undefined : t('Geben Sie eine gültige E-Mail-Adresse ein');
	const nameError = form.name.trim().length < 3 ? t('Geben Sie Ihren vollständigen Namen ein') : undefined;
	return (
		<>
			<FinkPageHeader _heading={t('Profil')} _description={t('Ihre Stammdaten für alle Anträge.')}>
				{!editing && <KolButton slot="actions" _label={t('Bearbeiten')} _icons="codicon codicon-edit" _on={{ onClick: () => setEditing(true) }} />}
			</FinkPageHeader>
			<FinkPanel _heading={editing ? 'Profil bearbeiten' : 'Stammdaten'}>
				{editing ? (
					<KolForm
						_on={{
							onSubmit: () => {
								setTouched(true);
								if (emailError || nameError) return;
								store.set((a) => ({ ...a, profile: form }));
								setEditing(false);
								toast.show({ type: 'success', label: t('Profil gespeichert') });
							},
						}}
					>
						<FinkStack _gap="4">
							<KolInputText _label={t('Name')} _required _value={form.name} _touched={touched} _msg={touched && nameError ? { _type: 'error', _description: nameError } : undefined} _on={{ onInput: (_e, v) => setForm((f) => ({ ...f, name: String(v ?? '') })) }} />
							<KolInputEmail _label={t('E-Mail-Adresse')} _required _value={form.email} _touched={touched} _msg={touched && emailError ? { _type: 'error', _description: emailError } : undefined} _on={{ onInput: (_e, v) => setForm((f) => ({ ...f, email: String(v ?? '') })) }} />
							<KolInputText _label={t('Telefon')} _type="tel" _value={form.phone} _on={{ onInput: (_e, v) => setForm((f) => ({ ...f, phone: String(v ?? '') })) }} />
							<KolInputText _label={t('Organisation')} _value={form.organisation} _on={{ onInput: (_e, v) => setForm((f) => ({ ...f, organisation: String(v ?? '') })) }} />
							<FinkStack _direction="row" _gap="2">
								<KolButton _label={t('Speichern')} _variant="primary" _type="submit" />
								<KolButton
									_label={t('Abbrechen')}
									_variant="tertiary"
									_on={{
										onClick: () => {
											setForm(account.profile);
											setEditing(false);
										},
									}}
								/>
							</FinkStack>
						</FinkStack>
					</KolForm>
				) : (
					<FinkSummaryList
						_readOnly
						_items={[
							{ key: t('Name'), value: account.profile.name },
							{ key: t('E-Mail-Adresse'), value: account.profile.email },
							{ key: t('Telefon'), value: account.profile.phone },
							{ key: t('Organisation'), value: account.profile.organisation },
						]}
					/>
				)}
			</FinkPanel>
		</>
	);
}

function NotificationsView({ account }: { account: Account }) {
	const toast = useToast();
	const set = (key: keyof Account['prefs'], label: string) => (_e: unknown, v: unknown) => {
		store.set((a) => ({ ...a, prefs: { ...a.prefs, [key]: Boolean(v) } }));
		toast.show({ type: 'success', label: v ? t('{{label}} aktiviert', { label }) : t('{{label}} deaktiviert', { label }) });
	};
	return (
		<>
			<FinkPageHeader _heading={t('Benachrichtigungen')} _description={t('Änderungen werden sofort gespeichert.')} />
			<FinkStack _gap="5">
				<FinkPanel _heading={t('E-Mail')}>
					<FinkStack _gap="4">
						<KolInputCheckbox _variant="switch" _label={t('Statusänderungen meiner Anträge')} _checked={account.prefs.status} _on={{ onChange: set('status', 'Statusmeldungen') }} />
						<KolInputCheckbox _variant="switch" _label={t('Erinnerungen an Fristen')} _hint={t('7 und 2 Tage vor Ablauf')} _checked={account.prefs.deadlines} _on={{ onChange: set('deadlines', 'Fristerinnerungen') }} />
						<KolInputCheckbox _variant="switch" _label={t('Newsletter zu neuen Förderprogrammen')} _checked={account.prefs.newsletter} _on={{ onChange: set('newsletter', 'Newsletter') }} />
					</FinkStack>
				</FinkPanel>
				<FinkPanel _heading={t('Häufigkeit')}>
					<FinkSegmented
						_label={t('Benachrichtigungen bündeln')}
						_value={account.prefs.frequency}
						_options={[
							{ value: 'instant', label: t('Sofort') },
							{ value: 'daily', label: t('Täglich') },
							{ value: 'weekly', label: t('Wöchentlich') },
						]}
						onFinkChange={(e) => {
							store.set((a) => ({ ...a, prefs: { ...a.prefs, frequency: e.detail } }));
							toast.show({ type: 'info', label: t('Häufigkeit geändert') });
						}}
					/>
				</FinkPanel>
			</FinkStack>
		</>
	);
}

function SecurityView({ account }: { account: Account }) {
	const toast = useToast();
	// Zwei-Faktor einrichten: erst nach Bestätigung mit einem Code aus der Authenticator-App aktiv.
	const [pending2fa, setPending2fa] = useState(false);
	const [codeError, setCodeError] = useState<string>();
	const [pw, setPw] = useState({ current: '', next: '', repeat: '' });
	const [touched, setTouched] = useState(false);
	const errors = {
		current: pw.current ? undefined : t('Geben Sie Ihr aktuelles Passwort ein'),
		next: pw.next.length >= 12 ? undefined : 'Das neue Passwort braucht mindestens 12 Zeichen',
		repeat: pw.repeat === pw.next && pw.repeat ? undefined : t('Die Passwörter stimmen nicht überein'),
	};
	const list = (Object.entries(errors) as Array<[keyof typeof errors, string | undefined]>).filter(([, m]) => m).map(([k, m]) => ({ message: m!, selector: `#pw-${k}` }));
	const msg = (k: keyof typeof errors) => (touched && errors[k] ? { _type: 'error' as const, _description: errors[k]! } : undefined);
	const [formRef, focusErrors] = useFormErrorFocus();
	return (
		<>
			<FinkPageHeader _heading={t('Sicherheit')} _description={t('Passwort, Zwei-Faktor-Anmeldung und aktive Sitzungen.')} />
			<FinkStack _gap="5">
				<FinkPanel _heading={t('Passwort ändern')}>
					<KolForm
						ref={formRef}
						_errorList={touched ? list : []}
						_on={{
							onSubmit: () => {
								setTouched(true);
								if (list.length) return focusErrors();
								setPw({ current: '', next: '', repeat: '' });
								setTouched(false);
								toast.show({ type: 'success', label: t('Passwort geändert'), description: t('Andere Sitzungen wurden abgemeldet.') });
							},
						}}
					>
						<FinkStack _gap="4">
							<KolInputPassword id="pw-current" _label={t('Aktuelles Passwort')} _autoComplete="current-password" _value={pw.current} _touched={touched} _msg={msg('current')} _on={{ onInput: (_e, v) => setPw((p) => ({ ...p, current: String(v ?? '') })) }} />
							<KolInputPassword id="pw-next" _label={t('Neues Passwort')} _autoComplete="new-password" _hint={t('Mindestens 12 Zeichen')} _value={pw.next} _touched={touched} _msg={msg('next')} _on={{ onInput: (_e, v) => setPw((p) => ({ ...p, next: String(v ?? '') })) }} />
							<KolInputPassword id="pw-repeat" _label={t('Neues Passwort wiederholen')} _autoComplete="new-password" _value={pw.repeat} _touched={touched} _msg={msg('repeat')} _on={{ onInput: (_e, v) => setPw((p) => ({ ...p, repeat: String(v ?? '') })) }} />
							<div>
								<KolButton _label={t('Passwort ändern')} _variant="primary" _type="submit" />
							</div>
						</FinkStack>
					</KolForm>
				</FinkPanel>
				<FinkPanel _heading={t('Zwei-Faktor-Anmeldung')}>
					<KolInputCheckbox
						_variant="switch"
						_label={t('Anmeldung zusätzlich per Authenticator-App bestätigen')}
						_checked={account.twoFactor || pending2fa}
						_on={{
							onChange: (_e, v) => {
								if (v) {
									setPending2fa(true);
									return;
								}
								setPending2fa(false);
								store.set((a) => ({ ...a, twoFactor: false }));
								toast.show({ type: 'warning', label: t('Zwei-Faktor-Anmeldung deaktiviert') });
							},
						}}
					/>
					{pending2fa && !account.twoFactor && (
						<FinkOtpInput
							_label={t('Code aus der Authenticator-App')}
							_hint={t('Scannen Sie den QR-Code mit Ihrer App und geben Sie den angezeigten Code ein. Demo-Code: 123456')}
							_error={codeError}
							onFinkChange={() => setCodeError(undefined)}
							onFinkComplete={(e) => {
								if (e.detail !== '123456') {
									setCodeError(t('Der Code ist nicht korrekt. Bitte prüfen Sie die App.'));
									return;
								}
								setPending2fa(false);
								store.set((a) => ({ ...a, twoFactor: true }));
								toast.show({ type: 'success', label: t('Zwei-Faktor-Anmeldung aktiv') });
							}}
						/>
					)}
				</FinkPanel>
				<FinkPanel _heading={t('Aktive Sitzungen')} _description={t('{{count}} Geräte', { count: account.sessions.length })}>
					{account.sessions.length > 1 && (
						<KolButton
							slot="actions"
							_label={t('Andere abmelden')}
							_variant="tertiary"
							_icons="codicon codicon-sign-out"
							_on={{
								onClick: () => {
									store.set((a) => ({ ...a, sessions: a.sessions.filter((s) => s.current) }));
									toast.show({ type: 'success', label: t('Andere Sitzungen abgemeldet') });
								},
							}}
						/>
					)}
					<FinkTimeline
						_label={t('Sitzungen')}
						_items={account.sessions.map((s) => ({ title: s.device, date: s.when, description: s.place, tone: s.current ? 'success' : 'neutral', icon: s.current ? 'codicon codicon-vm-active' : 'codicon codicon-device-desktop' }))}
					/>
				</FinkPanel>
			</FinkStack>
		</>
	);
}

function DangerView() {
	const ref = useRef<HTMLKolDialogElement>(null);
	const [confirm, setConfirm] = useState('');
	return (
		<>
			<FinkPageHeader _heading={t('Konto löschen')} _description={t('Diese Aktion lässt sich nicht rückgängig machen.')} />
			<FinkPanel _heading={t('Gefahrenzone')}>
				<FinkStack _gap="4">
					<KolAlert _type="warning" _variant="msg">
						{t('Offene Anträge werden zurückgezogen. Bescheide bleiben gesetzlich 10 Jahre bei der Behörde gespeichert.')}
					</KolAlert>
					<div>
						<KolButton _label={t('Konto löschen')} _variant="danger" _icons="codicon codicon-trash" _on={{ onClick: () => void ref.current?.openModal() }} />
					</div>
				</FinkStack>
			</FinkPanel>
			<KolDialogConfirm dialogRef={ref} confirm={confirm} setConfirm={setConfirm} />
		</>
	);
}


function KolDialogConfirm({ dialogRef, confirm, setConfirm }: { dialogRef: RefObject<HTMLKolDialogElement | null>; confirm: string; setConfirm: (v: string) => void }) {
	return (
		<KolDialog ref={dialogRef} _label={t('Konto endgültig löschen?')} _width="30rem" _variant="card" _on={{ onClose: () => setConfirm('') }}>
			<FinkStack _gap="4">
				<p style={{ margin: 0 }}>{t('Geben Sie zur Bestätigung LÖSCHEN ein.')}</p>
				<KolInputText _label={t('Bestätigung')} _value={confirm} _on={{ onInput: (_e, v) => setConfirm(String(v ?? '')) }} />
				<FinkStack _direction="row" _gap="2" _justify="end">
					<KolButton _label={t('Abbrechen')} _on={{ onClick: () => void dialogRef.current?.closeModal() }} />
					<KolButton
						_label={t('Endgültig löschen')}
						_variant="danger"
						_disabled={confirm.trim() !== t('LÖSCHEN')}
						_on={{
							onClick: () => {
								void dialogRef.current?.closeModal();
								store.set((a) => ({ ...a, deleted: true, loggedIn: false }));
							},
						}}
					/>
				</FinkStack>
			</FinkStack>
		</KolDialog>
	);
}

export function KontoApp() {
	const route = useRoute();
	const view = route.slice(BASE.length).replace(/^\//, '').split('/')[0] || 'profil';
	const [account] = store.use();

	if (account.deleted) {
		return (
			<div className="standalone">
				<FinkResult _variant="info" _heading={t('Ihr Konto wurde gelöscht')} _description={t('(Demo) Alle Daten dieser Sitzung wurden entfernt.')}>
					<KolButton _label={t('Demo zurücksetzen')} _variant="primary" _on={{ onClick: () => store.reset() }} />
					<KolButton _label={t('Alle Kompositionen')} _on={{ onClick: () => navigate('/compositions') }} />
				</FinkResult>
			</div>
		);
	}

	return (
		<CompositionShell
			label={t('Mein Konto')}
			icon="codicon codicon-account"
			base={BASE}
			view={view}
			user={account.profile.name}
			gradient="linear-gradient(135deg, var(--fink-color-primary), var(--fink-color-danger))"
			links={[
				{ id: 'profil', label: t('Profil'), icon: 'codicon codicon-person' },
				{ id: 'benachrichtigungen', label: t('Benachrichtigungen'), icon: 'codicon codicon-bell' },
				{ id: 'sicherheit', label: t('Sicherheit'), icon: 'codicon codicon-shield' },
				{ id: 'loeschen', label: t('Konto löschen'), icon: 'codicon codicon-trash' },
			]}
			actions={account.loggedIn ? <KolButton _label={t('Abmelden')} _icons="codicon codicon-sign-out" _variant="ghost" _hideLabel _on={{ onClick: () => store.set((a) => ({ ...a, loggedIn: false })) }} /> : null}
		>
			{!account.loggedIn ? (
				<Login />
			) : (
				<>
					{view === 'profil' && <ProfileView account={account} />}
					{view === 'benachrichtigungen' && <NotificationsView account={account} />}
					{view === 'sicherheit' && <SecurityView account={account} />}
					{view === 'loeschen' && <DangerView />}
				</>
			)}
		</CompositionShell>
	);
}
