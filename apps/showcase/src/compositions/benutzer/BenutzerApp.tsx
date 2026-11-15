import { useEffect, useMemo, useRef, useState } from 'react';
import {
	FinkAvatarGroup,
	FinkChip,
	FinkEmptyState,
	FinkGrid,
	FinkPageHeader,
	FinkPanel,
	FinkSegmented,
	FinkSelectionBar,
	FinkSkeleton,
	FinkStack,
	FinkStatus,
	FinkSummaryList,
	FinkTimeline,
	KolAvatar,
	KolButton,
	KolCard,
	KolDialog,
	KolDrawer,
	KolForm,
	KolInputEmail,
	KolInputText,
	KolPagination,
	KolSelect,
	KolSingleSelect,
	KolTableStateful,
	KolTree,
	KolTreeItem,
	useToast,
} from '@fink/react';
import { t, locale } from '../../i18n';
import { navigate, useRoute } from '../../router';
import { people, type Person } from '../../patterns/sample-data';
import { CompositionShell } from '../CompositionShell';
import { createStore } from '../createStore';
import '../composition.css';
import { useFormErrorFocus } from '../../site/useFormErrorFocus';

const BASE = '/compositions/benutzer';
const ROLES: Person['role'][] = ['Admin', 'Sachbearbeitung', 'Lesend'];
const ROLE_LABEL: Record<Person['role'], string> = { Admin: t('Admin'), Sachbearbeitung: t('Sachbearbeitung'), Lesend: t('Lesend') };
const TEAMS = ['Referat 1', 'Referat 2', 'Referat 4', 'IT-Service'];

interface LogEntry {
	id: number;
	text: string;
	date: string;
	tone: 'success' | 'warning' | 'danger' | 'info';
	personId?: string;
}

interface AdminState {
	people: Person[];
	log: LogEntry[];
	teamFilter: string | null;
}

const now = () => new Date().toLocaleString(document.documentElement.lang === 'en' ? 'en-GB' : locale, { dateStyle: 'short', timeStyle: 'short' });

const store = createStore<AdminState>('benutzer', () => ({
	people: people.map((p) => ({ ...p })),
	log: [
		{ id: 3, text: t('Leyla Demir wurde zur Admin ernannt'), date: '28.10.2026, 14:02', tone: 'info', personId: 'u-003' },
		{ id: 2, text: t('Petra Lang wurde deaktiviert'), date: '21.10.2026, 09:15', tone: 'warning', personId: 'u-005' },
		{ id: 1, text: t('Finn Petersen wurde eingeladen'), date: '02.10.2026, 11:40', tone: 'success', personId: 'u-006' },
	],
	teamFilter: null,
}));

const log = (text: string, tone: LogEntry['tone'], personId?: string) =>
	store.set((s) => ({ ...s, log: [{ id: (s.log[0]?.id ?? 0) + 1, text, date: now(), tone, personId }, ...s.log] }));

function InviteDialog({ dialogRef }: { dialogRef: React.RefObject<HTMLKolDialogElement | null> }) {
	const toast = useToast();
	const empty = { name: '', email: '', role: 'Sachbearbeitung', team: TEAMS[0] };
	const [form, setForm] = useState(empty);
	const [submitted, setSubmitted] = useState(false);
	const errors: Partial<Record<keyof typeof form, string>> = {};
	if (form.name.trim().length < 3) errors.name = t('Geben Sie den vollständigen Namen ein');
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = t('Geben Sie eine gültige E-Mail-Adresse ein');
	else if (store.get().people.some((p) => p.email === form.email.trim())) errors.email = t('Diese E-Mail-Adresse ist bereits vergeben');
	const keys = Object.keys(errors) as Array<keyof typeof form>;
	const msg = (k: keyof typeof form) => (submitted && errors[k] ? { _type: 'error' as const, _description: errors[k]! } : undefined);
	const close = () => {
		setForm(empty);
		setSubmitted(false);
		void dialogRef.current?.closeModal();
	};
	const [formRef, focusErrors] = useFormErrorFocus();
	return (
		<KolDialog ref={dialogRef} _label={t('Person einladen')} _width="34rem" _variant="card" _on={{ onClose: () => setSubmitted(false) }}>
			<KolForm
				ref={formRef}
				_errorList={submitted ? keys.map((k) => ({ message: errors[k]!, selector: `#invite-${k}` })) : []}
				_on={{
					onSubmit: () => {
						setSubmitted(true);
						if (keys.length) return focusErrors();
						const person: Person = {
							id: `u-${String(store.get().people.length + 1).padStart(3, '0')}`,
							name: form.name.trim(),
							email: form.email.trim(),
							role: form.role as Person['role'],
							team: form.team,
							active: true,
							lastLogin: '–',
						};
						store.set((s) => ({ ...s, people: [person, ...s.people] }));
						log(t('{{name}} wurde eingeladen', { name: person.name }), 'success', person.id);
						toast.show({ type: 'success', label: t('Einladung gesendet'), description: person.email });
						close();
					},
				}}
			>
				<FinkStack _gap="4">
					<KolInputText id="invite-name" _label={t('Name')} _required _value={form.name} _touched={submitted} _msg={msg('name')} _on={{ onInput: (_e, v) => setForm((f) => ({ ...f, name: String(v ?? '') })) }} />
					<KolInputEmail id="invite-email" _label={t('E-Mail-Adresse')} _required _value={form.email} _touched={submitted} _msg={msg('email')} _on={{ onInput: (_e, v) => setForm((f) => ({ ...f, email: String(v ?? '') })) }} />
					<div className="form-row">
						<KolSingleSelect _label={t('Rolle')} _options={ROLES.map((r) => ({ label: ROLE_LABEL[r], value: r }))} _value={form.role} _on={{ onChange: (_e, v) => setForm((f) => ({ ...f, role: String(v) })) }} />
						<KolSingleSelect _label={t('Team')} _options={TEAMS.map((x) => ({ label: x, value: x }))} _value={form.team} _on={{ onChange: (_e, v) => setForm((f) => ({ ...f, team: String(v) })) }} />
					</div>
					<FinkStack _direction="row" _gap="2" _justify="end">
						<KolButton _label={t('Abbrechen')} _on={{ onClick: close }} />
						<KolButton _label={t('Einladen')} _variant="primary" _type="submit" _icons="codicon codicon-mail" />
					</FinkStack>
				</FinkStack>
			</KolForm>
		</KolDialog>
	);
}

function PersonDrawer({ person, entries, onClose }: { person?: Person; entries: LogEntry[]; onClose: () => void }) {
	const toast = useToast();
	const [role, setRole] = useState<string>(person?.role ?? 'Lesend');
	useEffect(() => setRole(person?.role ?? 'Lesend'), [person]);
	return (
		<KolDrawer _label={person ? person.name : t('Person')} _open={Boolean(person)} _align="right" _hasCloser _level={2} _on={{ onClose }}>
			{person && (
				<FinkStack _gap="5" style={{ minWidth: 'min(26rem, 80vw)' }}>
					<FinkStack _direction="row" _gap="3" _align="center">
						<KolAvatar _label={person.name} style={{ width: '3.5rem' }} />
						<FinkStatus _label={person.active ? t('Aktiv') : t('Deaktiviert')} _tone={person.active ? 'success' : 'neutral'} />
					</FinkStack>
					<FinkSummaryList
						_readOnly
						_items={[
							{ key: t('E-Mail-Adresse'), value: person.email },
							{ key: t('Team'), value: person.team },
							{ key: t('Rolle'), value: ROLE_LABEL[person.role] },
							{ key: t('Letzte Anmeldung'), value: person.lastLogin },
						]}
					/>
					<FinkPanel _heading={t('Rolle ändern')} _level={3}>
						<FinkStack _direction="row" _gap="2" _align="end">
							<KolSingleSelect _label={t('Rolle')} _options={ROLES.map((r) => ({ label: ROLE_LABEL[r], value: r }))} _value={role} _on={{ onChange: (_e, v) => setRole(String(v)) }} />
							<KolButton
								_label={t('Speichern')}
								_variant="primary"
								_disabled={role === person.role}
								_on={{
									onClick: () => {
										store.set((s) => ({ ...s, people: s.people.map((p) => (p.id === person.id ? { ...p, role: role as Person['role'] } : p)) }));
										log(t('{{name}}: Rolle geändert zu {{role}}', { name: person.name, role: ROLE_LABEL[role as Person['role']] }), 'info', person.id);
										toast.show({ type: 'success', label: t('Rolle gespeichert') });
									},
								}}
							/>
						</FinkStack>
					</FinkPanel>
					<section aria-labelledby="person-log">
						<h3 id="person-log" className="detail-heading">
							{t('Verlauf')}
						</h3>
						{entries.length ? (
							<FinkTimeline _items={entries.map((e) => ({ title: e.text, date: e.date, tone: e.tone }))} />
						) : (
							<p className="muted small">{t('Noch keine Einträge.')}</p>
						)}
					</section>
				</FinkStack>
			)}
		</KolDrawer>
	);
}

function PeopleView() {
	const toast = useToast();
	const [state, setState] = store.use();
	const [loading, setLoading] = useState(true);
	const [query, setQuery] = useState('');
	const [roles, setRoles] = useState<string[]>([]);
	const [status, setStatus] = useState('all');
	const [teams, setTeams] = useState<string[]>([]);
	const [selected, setSelected] = useState<string[]>([]);
	const [openId, setOpenId] = useState<string | null>(null);
	const inviteRef = useRef<HTMLKolDialogElement>(null);
	const confirmRef = useRef<HTMLKolDialogElement>(null);

	useEffect(() => {
		const id = window.setTimeout(() => setLoading(false), 900);
		return () => window.clearTimeout(id);
	}, []);

	const rows = useMemo(() => {
		const q = query.trim().toLowerCase();
		return state.people.filter(
			(p) =>
				(!state.teamFilter || p.team === state.teamFilter) &&
				(teams.length === 0 || teams.includes(p.team)) &&
				(roles.length === 0 || roles.includes(p.role)) &&
				(status === 'all' || (status === 'active') === p.active) &&
				(q === '' || `${p.name} ${p.email}`.toLowerCase().includes(q)),
		);
	}, [state, query, roles, status, teams]);

	const headers = useMemo(
		() => ({
			horizontal: [
				[
					{ label: t('Name'), key: 'name', sortable: true, width: 170 },
					{ label: t('E-Mail-Adresse'), key: 'email', width: 230 },
					{ label: t('Rolle'), key: 'role', sortable: true, width: 140, render: (_el: HTMLElement, cell: { label: string }) => ROLE_LABEL[cell.label as Person['role']] ?? cell.label },
					{ label: t('Team'), key: 'team', sortable: true, width: 140 },
					{ label: t('Status'), key: 'active', width: 120, render: (_el: HTMLElement, cell: { label: string }) => (String(cell.label) === 'true' ? t('Aktiv') : t('Deaktiviert')) },
					{
						label: t('Aktionen'),
						key: 'actions',
						width: 80,
						type: 'action' as const,
						actions: (row: Record<string, unknown>) => [
							{ type: 'button' as const, _label: t('Details zu {{name}}', { name: String(row.name) }), _hideLabel: true, _icons: 'codicon codicon-chevron-right', _variant: 'tertiary', _on: { onClick: () => setOpenId(String(row.id)) } },
						],
					},
				],
			],
		}),
		[],
	);
	const selection = useMemo(
		() => ({ label: (row: Record<string, unknown>) => t('{{name}} auswählen', { name: String(row.name) }), multiple: true, keyPropertyName: 'id', selectedKeys: selected }),
		[selected],
	);

	const bulk = (active: boolean) => {
		setState((s) => ({ ...s, people: s.people.map((p) => (selected.includes(p.id) ? { ...p, active } : p)) }));
		log(active ? t('{{count}} Personen aktiviert', { count: selected.length }) : t('{{count}} Personen deaktiviert', { count: selected.length }), active ? 'success' : 'warning');
		toast.show({ type: active ? 'success' : 'warning', label: active ? t('{{count}} Personen aktiviert', { count: selected.length }) : t('{{count}} Personen deaktiviert', { count: selected.length }) });
		setSelected([]);
	};

	const removeSelected = () => {
		const count = selected.length;
		setState((s) => ({ ...s, people: s.people.filter((p) => !selected.includes(p.id)) }));
		log(t('{{count}} Personen entfernt', { count }), 'danger');
		toast.show({ type: 'error', label: t('{{count}} Personen entfernt', { count }) });
		setSelected([]);
		void confirmRef.current?.closeModal();
	};

	const resetFilters = () => {
		setQuery('');
		setRoles([]);
		setStatus('all');
		setTeams([]);
		setState((s) => ({ ...s, teamFilter: null }));
	};

	return (
		<>
			<FinkPageHeader _heading={t('Personen')} _description={t('Verwalten Sie Zugänge, Rollen und Teams.')}>
				<KolButton slot="actions" _label={t('Person einladen')} _variant="primary" _icons="codicon codicon-person-add" _on={{ onClick: () => void inviteRef.current?.openModal() }} />
				<FinkStatus slot="meta" _label={t('{{count}} Personen', { count: state.people.length })} _tone="brand" />
				<FinkStatus slot="meta" _label={t('{{count}} aktiv', { count: state.people.filter((p) => p.active).length })} _tone="success" />
			</FinkPageHeader>

			<FinkStack _gap="4">
				<FinkPanel _heading={t('Filter')}>
					<FinkStack _gap="4">
						<div className="form-row">
							<KolInputText _label={t('Suche')} _type="search" _icons="codicon codicon-search" _placeholder={t('Name oder E-Mail')} _value={query} _on={{ onInput: (_e, v) => setQuery(String(v ?? '')) }} />
							<FinkSegmented
								_label={t('Status')}
								_value={status}
								onFinkChange={(e) => setStatus(e.detail)}
								_options={[
									{ value: 'all', label: t('Alle') },
									{ value: 'active', label: t('Aktiv') },
									{ value: 'inactive', label: t('Deaktiviert') },
								]}
							/>
						</div>
						<KolSelect _label={t('Teams')} _hint={t('Mehrfachauswahl mit Strg bzw. Cmd')} _multiple _rows={4} _options={TEAMS.map((x) => ({ label: x, value: x }))} _value={teams} _on={{ onChange: (_e, v) => setTeams((v as string[]) ?? []) }} />
						<div className="chip-filter" role="group" aria-label={t('Nach Rolle filtern')}>
							{ROLES.map((r) => (
								<FinkChip key={r} _label={ROLE_LABEL[r]} _count={state.people.filter((p) => p.role === r).length} _selected={roles.includes(r)} onFinkToggle={(e) => setRoles((l) => (e.detail ? [...l, r] : l.filter((x) => x !== r)))} />
							))}
							{state.teamFilter && <FinkChip _label={t('Team: {{team}}', { team: state.teamFilter })} _removable onFinkRemove={() => setState((s) => ({ ...s, teamFilter: null }))} />}
						</div>
					</FinkStack>
				</FinkPanel>

				<FinkSelectionBar _count={selected.length} _itemLabel={t('Personen')} onFinkClear={() => setSelected([])}>
					<KolButton _label={t('Aktivieren')} _icons="codicon codicon-pass" _on={{ onClick: () => bulk(true) }} />
					<KolButton _label={t('Deaktivieren')} _icons="codicon codicon-circle-slash" _on={{ onClick: () => bulk(false) }} />
					<KolButton _label={t('Entfernen')} _variant="danger" _icons="codicon codicon-trash" _on={{ onClick: () => void confirmRef.current?.openModal() }} />
				</FinkSelectionBar>

				<p className="visually-hidden" role="status">
					{loading ? '' : t('{{count}} Personen gefunden', { count: rows.length })}
				</p>

				{loading ? (
					<FinkPanel _heading={t('Personen')}>
						<FinkStack _gap="4">
							<FinkSkeleton _lines={1} _label={t('Personen werden geladen')} />
							{[1, 2, 3, 4].map((n) => (
								<FinkStack key={n} _direction="row" _gap="3" _align="center" _wrap={false}>
									<FinkSkeleton _variant="circle" _width="2.5rem" />
									<div style={{ flex: 1 }}>
										<FinkSkeleton _lines={2} />
									</div>
								</FinkStack>
							))}
						</FinkStack>
					</FinkPanel>
				) : rows.length === 0 ? (
					<FinkEmptyState _heading={t('Keine Personen gefunden')} _description={t('Mit den aktuellen Filtern gibt es keine Treffer.')}>
						<KolButton _label={t('Filter zurücksetzen')} _variant="primary" _on={{ onClick: resetFilters }} />
					</FinkEmptyState>
				) : (
					<FinkPanel _heading={t('Personen')} _flush>
						<KolTableStateful
							_label={t('Personen')}
							_data={rows as unknown as Record<string, unknown>[]}
							_headers={headers as never}
							_selection={selection}
							_pagination={PAGINATION}
							_on={{ onSelectionChange: (_e, value) => setSelected(((value as unknown as Array<string | Record<string, unknown>>) ?? []).map((v) => (typeof v === 'string' ? v : String(v.id)))) }}
						/>
					</FinkPanel>
				)}
			</FinkStack>

			<InviteDialog dialogRef={inviteRef} />
			<KolDialog ref={confirmRef} _label={t('{{count}} Personen entfernen?', { count: selected.length })} _width="30rem" _variant="card">
				<FinkStack _gap="4">
					<p style={{ margin: 0 }}>{t('Die Zugänge werden sofort gesperrt. Zugeordnete Vorgänge bleiben erhalten.')}</p>
					<FinkStack _direction="row" _gap="2" _justify="end">
						<KolButton _label={t('Abbrechen')} _on={{ onClick: () => void confirmRef.current?.closeModal() }} />
						<KolButton _label={t('Entfernen')} _variant="danger" _on={{ onClick: removeSelected }} />
					</FinkStack>
				</FinkStack>
			</KolDialog>
			<PersonDrawer person={state.people.find((p) => p.id === openId)} entries={state.log.filter((e) => e.personId === openId)} onClose={() => setOpenId(null)} />
		</>
	);
}

const PAGINATION = { _page: 1, _pageSize: 8 };

function TeamsView() {
	const [state, setState] = store.use();
	return (
		<>
			<FinkPageHeader _heading={t('Teams')} _description={t('Personen nach Organisationseinheit.')} />
			<FinkPanel _heading={t('Organigramm')} _description={t('Teams und Mitglieder als Baum')}>
				<KolTree _label={t('Organigramm')}>
					<KolTreeItem _label={t('Musterbehörde')} _href={`#${BASE}/teams`} _open>
						{TEAMS.map((team) => (
							<KolTreeItem key={team} _label={team} _href={`#${BASE}/teams`}>
								{state.people
									.filter((p) => p.team === team)
									.map((p) => (
										<KolTreeItem key={p.id} _label={`${p.name} (${ROLE_LABEL[p.role]})`} _href={`#${BASE}`} />
									))}
							</KolTreeItem>
						))}
					</KolTreeItem>
				</KolTree>
			</FinkPanel>
			<div style={{ height: 'var(--fink-space-5)' }} />
			<FinkGrid _min="16rem">
				{TEAMS.map((team) => {
					const members = state.people.filter((p) => p.team === team);
					return (
						<KolCard key={team} _label={team} _level={2}>
							<FinkStack _gap="3">
								<FinkStack _direction="row" _gap="2">
									<FinkStatus _label={t('{{count}} Personen', { count: members.length })} _tone="brand" />
									<FinkStatus _label={t('{{count}} aktiv', { count: members.filter((m) => m.active).length })} _tone="success" />
								</FinkStack>
								<FinkAvatarGroup _label={t('Mitglieder von {{team}}', { team })} _items={members.map((m) => ({ label: m.name }))} _max={5} _size="small" />
								<KolButton
									_label={t('Mitglieder anzeigen')}
									_variant="secondary"
									_on={{
										onClick: () => {
											setState((s) => ({ ...s, teamFilter: team }));
											navigate(BASE);
										},
									}}
								/>
							</FinkStack>
						</KolCard>
					);
				})}
			</FinkGrid>
		</>
	);
}

function LogView() {
	const [state] = store.use();
	const [page, setPage] = useState(1);
	const size = 6;
	return (
		<>
			<FinkPageHeader _heading={t('Protokoll')} _description={t('Alle Änderungen an Zugängen, neueste zuerst.')} />
			<FinkPanel _heading={t('{{count}} Einträge', { count: state.log.length })}>
				<FinkStack _gap="4">
					<FinkTimeline _items={state.log.slice((page - 1) * size, page * size).map((e) => ({ title: e.text, date: e.date, tone: e.tone }))} />
					{state.log.length > size && <KolPagination _label={t('Seiten')} _page={page} _max={state.log.length} _pageSize={size} _on={{ onChangePage: (_e, v) => setPage(Number(v)) }} />}
					<div>
						<KolButton _label={t('Demo-Daten zurücksetzen')} _variant="tertiary" _icons="codicon codicon-discard" _on={{ onClick: () => store.reset() }} />
					</div>
				</FinkStack>
			</FinkPanel>
		</>
	);
}

export function BenutzerApp() {
	const route = useRoute();
	const view = route.slice(BASE.length).replace(/^\//, '').split('/')[0] || 'personen';
	return (
		<CompositionShell
			label={t('Benutzerverwaltung')}
			icon="codicon codicon-organization"
			base={BASE}
			view={view}
			user="Jonas Weber"
			gradient="linear-gradient(135deg, var(--fink-color-warning), var(--fink-color-danger))"
			links={[
				{ id: 'personen', label: t('Personen'), icon: 'codicon codicon-person' },
				{ id: 'teams', label: t('Teams'), icon: 'codicon codicon-organization' },
				{ id: 'protokoll', label: t('Protokoll'), icon: 'codicon codicon-history' },
			]}
		>
			{view === 'personen' && <PeopleView />}
			{view === 'teams' && <TeamsView />}
			{view === 'protokoll' && <LogView />}
		</CompositionShell>
	);
}
