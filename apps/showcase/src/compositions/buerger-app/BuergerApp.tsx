import { useState } from 'react';
import {
	FinkBottomNav,
	FinkCalendar,
	FinkEmptyState,
	FinkSegmented,
	FinkStack,
	FinkStatus,
	FinkSummaryList,
	KolAlert,
	KolButton,
	KolCard,
	KolDrawer,
	KolInputCheckbox,
	KolLinkButton,
	KolSingleSelect,
	KolSkipNav,
	useToast,
} from '@fink/react';
import { t, locale } from '../../i18n';
import { LanguageToggle } from '../../site/LanguageToggle';
import { SchemeToggle } from '../../site/SchemeToggle';
import { createStore } from '../createStore';
import '../composition.css';

type IsoDate = `${number}-${number}-${number}`;

interface Appointment {
	id: number;
	service: string;
	date: string;
	time: string;
}

interface Message {
	id: number;
	from: string;
	subject: string;
	body: string;
	read: boolean;
}

interface AppState {
	tab: string;
	appointments: Appointment[];
	messages: Message[];
	banner: boolean;
	push: boolean;
	reminder: boolean;
}

const SERVICES = [
	{ label: t('Personalausweis beantragen'), value: t('Personalausweis beantragen') },
	{ label: t('Wohnsitz anmelden'), value: t('Wohnsitz anmelden') },
	{ label: t('Führerschein umtauschen'), value: t('Führerschein umtauschen') },
];

const store = createStore<AppState>('buerger-app', () => ({
	tab: 'home',
	appointments: [{ id: 1, service: t('Wohnsitz anmelden'), date: '2026-11-21', time: '09:30' }],
	messages: [
		{ id: 3, from: t('Bürgeramt Mitte'), subject: t('Terminbestätigung'), body: t('Ihr Termin am 21.11. um 09:30 Uhr ist bestätigt. Bitte bringen Sie Ihren Ausweis mit.'), read: false },
		{ id: 2, from: t('Kfz-Zulassung'), subject: t('Dokument bereit'), body: t('Ihre Zulassungsbescheinigung liegt zur Abholung bereit.'), read: false },
		{ id: 1, from: t('Servicekonto'), subject: t('Willkommen'), body: t('Ihr Servicekonto ist eingerichtet.'), read: true },
	],
	banner: true,
	push: true,
	reminder: true,
}));

const dateLabel = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString(locale, { weekday: 'short', day: '2-digit', month: 'short' });

function HomeTab() {
	const [state, set] = store.use();
	const next = state.appointments[0];
	const unread = state.messages.filter((m) => !m.read).length;
	return (
		<FinkStack _gap="4">
			<h1 className="phone-title">{t('Hallo Erika!')}</h1>
			{state.banner && (
				<KolAlert _type="info" _variant="card" _label={t('Neu: Online-Ausweis')} _hasCloser _on={{ onClose: () => set((s) => ({ ...s, banner: false })) }}>
					{t('Den Personalausweis können Sie jetzt online beantragen.')}
				</KolAlert>
			)}
			<KolCard _label={t('Nächster Termin')} _level={2}>
				{next ? (
					<FinkStack _gap="2">
						<strong>{next.service}</strong>
						<span className="muted small">
							{dateLabel(next.date)} · {next.time} · {t('Bürgeramt Mitte')}
						</span>
						<KolButton _label={t('Alle Termine')} _variant="secondary" _on={{ onClick: () => set((s) => ({ ...s, tab: 'appointments' })) }} />
					</FinkStack>
				) : (
					<span className="muted small">{t('Keine Termine geplant.')}</span>
				)}
			</KolCard>
			<KolCard _label={t('Postfach')} _level={2}>
				<FinkStack _gap="2">
					<FinkStatus _label={unread ? t('{{count}} ungelesen', { count: unread }) : t('Alles gelesen')} _tone={unread ? 'warning' : 'success'} />
					<KolButton _label={t('Nachrichten öffnen')} _variant="secondary" _on={{ onClick: () => set((s) => ({ ...s, tab: 'inbox' })) }} />
				</FinkStack>
			</KolCard>
		</FinkStack>
	);
}

function AppointmentsTab() {
	const toast = useToast();
	const [state, set] = store.use();
	const [sheet, setSheet] = useState(false);
	const [service, setService] = useState(SERVICES[0].value);
	const [date, setDate] = useState<IsoDate>('2026-11-24');
	const [time, setTime] = useState('10:00');
	const book = () => {
		set((s) => ({ ...s, appointments: [...s.appointments, { id: Date.now(), service, date, time }].sort((a, b) => a.date.localeCompare(b.date)) }));
		setSheet(false);
		toast.show({ type: 'success', label: t('Termin gebucht'), description: `${service} · ${dateLabel(date)} · ${time}` });
	};
	return (
		<FinkStack _gap="4">
			<h1 className="phone-title">{t('Termine')}</h1>
			{state.appointments.length === 0 ? (
				<FinkEmptyState _heading={t('Keine Termine')} _description={t('Buchen Sie einen Termin im Bürgeramt.')} _icons="codicon codicon-calendar" _level={2} />
			) : (
				<ul className="result-list">
					{state.appointments.map((a) => (
						<li key={a.id} className="row-between">
							<span>
								<strong>{a.service}</strong>
								<br />
								<span className="muted small">
									{dateLabel(a.date)} · {a.time}
								</span>
							</span>
							<KolButton
								_label={t('Termin absagen: {{service}}', { service: a.service })}
								_hideLabel
								_icons="codicon codicon-close"
								_variant="tertiary"
								_on={{
									onClick: () => {
										set((s) => ({ ...s, appointments: s.appointments.filter((x) => x.id !== a.id) }));
										toast.show({ type: 'warning', label: t('Termin abgesagt') });
									},
								}}
							/>
						</li>
					))}
				</ul>
			)}
			<KolButton _label={t('Termin buchen')} _variant="primary" _icons="codicon codicon-add" _on={{ onClick: () => setSheet(true) }} />
			<KolDrawer _label={t('Termin buchen')} _open={sheet} _align="bottom" _hasCloser _level={2} _on={{ onClose: () => setSheet(false) }}>
				<FinkStack _gap="4">
					<KolSingleSelect _label={t('Anliegen')} _options={SERVICES} _value={service} _on={{ onChange: (_e, v) => setService(String(v)) }} />
					<FinkCalendar
						_label={t('Datum')}
						_value={date}
						_min="2026-11-16"
						_max="2027-01-31"
						_disableWeekends
						_markers={['2026-11-17', '2026-11-19', '2026-11-24', '2026-11-26', '2026-12-01', '2026-12-03']}
						_markerLabel={t('freie Termine')}
						onFinkChange={(e) => setDate(e.detail as IsoDate)}
					/>
					<FinkSegmented
						_label={t('Uhrzeit')}
						_value={time}
						onFinkChange={(e) => setTime(e.detail)}
						_options={['08:30', '10:00', '13:30', '15:00'].map((v) => ({ value: v, label: v }))}
					/>
					<KolButton _label={t('Verbindlich buchen')} _variant="primary" _on={{ onClick: book }} />
				</FinkStack>
			</KolDrawer>
		</FinkStack>
	);
}

function InboxTab() {
	const toast = useToast();
	const [state, set] = store.use();
	const [openId, setOpenId] = useState<number | null>(null);
	const open = state.messages.find((m) => m.id === openId);
	if (open) {
		return (
			<FinkStack _gap="4">
				<KolButton _label={t('Zurück')} _icons="codicon codicon-arrow-left" _variant="tertiary" _on={{ onClick: () => setOpenId(null) }} />
				<h1 className="phone-title">{open.subject}</h1>
				<FinkSummaryList _plain _readOnly _items={[{ key: t('Von'), value: open.from }]} />
				<p>{open.body}</p>
				<KolButton
					_label={t('Archivieren')}
					_icons="codicon codicon-archive"
					_on={{
						onClick: () => {
							set((s) => ({ ...s, messages: s.messages.filter((m) => m.id !== open.id) }));
							setOpenId(null);
							toast.show({ type: 'success', label: t('Nachricht archiviert') });
						},
					}}
				/>
			</FinkStack>
		);
	}
	return (
		<FinkStack _gap="4">
			<h1 className="phone-title">{t('Postfach')}</h1>
			{state.messages.length === 0 ? (
				<FinkEmptyState _heading={t('Postfach leer')} _description={t('Neue Nachrichten erscheinen hier.')} _icons="codicon codicon-mail" _level={2} />
			) : (
				<ul className="result-list">
					{state.messages.map((m) => (
						<li key={m.id}>
							<KolButton
								className={m.read ? '' : 'unread'}
								_label={`${m.read ? '' : '● '}${m.subject} – ${m.from}`}
								_variant="ghost"
								_on={{
									onClick: () => {
										set((s) => ({ ...s, messages: s.messages.map((x) => (x.id === m.id ? { ...x, read: true } : x)) }));
										setOpenId(m.id);
									},
								}}
							/>
						</li>
					))}
				</ul>
			)}
		</FinkStack>
	);
}

function ProfileTab() {
	const [state, set] = store.use();
	return (
		<FinkStack _gap="4">
			<h1 className="phone-title">{t('Profil')}</h1>
			<FinkSummaryList _readOnly _items={[{ key: t('Name'), value: 'Erika Mustermann' }, { key: t('E-Mail-Adresse'), value: 'erika@beispiel.de' }]} />
			<KolInputCheckbox _variant="switch" _label={t('Push-Mitteilungen')} _checked={state.push} _on={{ onChange: (_e, v) => set((s) => ({ ...s, push: Boolean(v) })) }} />
			<KolInputCheckbox _variant="switch" _label={t('Terminerinnerung am Vortag')} _checked={state.reminder} _on={{ onChange: (_e, v) => set((s) => ({ ...s, reminder: Boolean(v) })) }} />
			<FinkStack _direction="row" _gap="2">
				<LanguageToggle />
				<SchemeToggle />
			</FinkStack>
			<KolButton _label={t('Demo zurücksetzen')} _variant="tertiary" _icons="codicon codicon-discard" _on={{ onClick: () => store.reset() }} />
		</FinkStack>
	);
}

export function BuergerApp() {
	const [state, set] = store.use();
	const unread = state.messages.filter((m) => !m.read).length;
	return (
		<div className="phone-page">
			<div className="phone-intro">
				<KolLinkButton _label={t('Alle Kompositionen')} _href="#/compositions" _icons="codicon codicon-arrow-left" _variant="tertiary" />
				<p className="muted small">{t('Mobile Ansicht im Stil von Material Design 3: Bottom Navigation, Bottom Sheet, Snackbar und Banner.')}</p>
			</div>
			<div className="phone" role="region" aria-label={t('Bürger-App (Demo)')}>
				<KolSkipNav
					_label={t('Sprunglinks')}
					_links={[
						{ _label: t('Zum Inhalt springen'), _href: '#phone-main' },
						{ _label: t('Zur Navigation springen'), _href: '#phone-nav' },
					]}
				/>
				<header className="phone-bar">
					<span className="composition-mark" aria-hidden="true">
						<span className="codicon codicon-home"></span>
					</span>
					<strong>{t('Bürger-App')}</strong>
					<KolButton
						_label={unread ? t('Benachrichtigungen ({{count}} neu)', { count: unread }) : t('Benachrichtigungen')}
						_hideLabel
						_icons={unread ? 'codicon codicon-bell-dot' : 'codicon codicon-bell'}
						_variant="ghost"
						_on={{ onClick: () => set((s) => ({ ...s, tab: 'inbox' })) }}
					/>
				</header>
				<main className="phone-content" id="phone-main" tabIndex={-1} key={state.tab}>
					{state.tab === 'home' && <HomeTab />}
					{state.tab === 'appointments' && <AppointmentsTab />}
					{state.tab === 'inbox' && <InboxTab />}
					{state.tab === 'profile' && <ProfileTab />}
				</main>
				<FinkBottomNav
					id="phone-nav"
					_value={state.tab}
					onFinkChange={(e) => set((s) => ({ ...s, tab: e.detail }))}
					_items={[
						{ id: 'home', label: t('Start'), icon: 'codicon codicon-home' },
						{ id: 'appointments', label: t('Termine'), icon: 'codicon codicon-calendar' },
						{ id: 'inbox', label: t('Postfach'), icon: 'codicon codicon-mail', badge: unread },
						{ id: 'profile', label: t('Profil'), icon: 'codicon codicon-account' },
					]}
				/>
			</div>
		</div>
	);
}
