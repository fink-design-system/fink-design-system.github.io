import { useMemo, useState } from 'react';
import {
	FinkChip,
	FinkEmptyState,
	FinkFeedback,
	FinkFileUpload,
	FinkGrid,
	FinkPageHeader,
	FinkPanel,
	FinkRating,
	FinkResult,
	FinkSegmented,
	FinkStack,
	FinkTimeline,
	KolAccordion,
	KolBreadcrumb,
	KolButton,
	KolCard,
	KolCombobox,
	KolForm,
	KolImage,
	KolInputEmail,
	KolInputText,
	KolLink,
	KolLinkButton,
	KolPagination,
	KolSingleSelect,
	KolTextarea,
	KolTree,
	KolTreeItem,
	useToast,
} from '@fink/react';
import { t } from '../../i18n';
import { navigate, useRoute } from '../../router';
import { articles, type Article } from '../../patterns/sample-data';
import { ILLUSTRATION } from '../../catalog/kolibri-more';
import { CompositionShell } from '../CompositionShell';
import { createStore } from '../createStore';
import '../composition.css';
import { useFormErrorFocus } from '../../site/useFormErrorFocus';

const BASE = '/compositions/hilfe';
const CATEGORIES: Article['category'][] = ['Antrag', 'Konto', 'Zahlung', 'Technik'];
const CATEGORY_LABEL: Record<Article['category'], string> = { Antrag: t('Antrag'), Konto: t('Konto'), Zahlung: t('Zahlung'), Technik: t('Technik') };
const CATEGORY_ICON: Record<Article['category'], string> = {
	Antrag: 'codicon codicon-file',
	Konto: 'codicon codicon-account',
	Zahlung: 'codicon codicon-credit-card',
	Technik: 'codicon codicon-tools',
};
const PAGE_SIZE = 4;

const search = createStore('hilfe-search', () => ({ query: '', categories: [] as string[] }));

function StartView() {
	const [, setSearch] = search.use();
	const [query, setQuery] = useState('');
	const submit = (value = query) => {
		setSearch({ query: value, categories: [] });
		navigate(`${BASE}/artikel`);
	};
	return (
		<FinkStack _gap="6">
			<section className="help-hero">
				<h1>{t('Wie können wir helfen?')}</h1>
				<KolForm _requiredText={false} _on={{ onSubmit: () => submit() }}>
					<div className="help-search">
						<KolCombobox
							_label={t('Hilfe durchsuchen')}
							_hideLabel
							_placeholder={t('z. B. Passwort, Nachweise, Auszahlung')}
							_icons="codicon codicon-search"
							_suggestions={articles.map((a) => a.title)}
							_value={query}
							_on={{ onInput: (_e, v) => setQuery(String(v ?? '')), onChange: (_e, v) => setQuery(String(v ?? '')) }}
						/>
						<KolButton _label={t('Suchen')} _variant="primary" _type="submit" />
					</div>
				</KolForm>
			</section>
			<section aria-labelledby="topics">
				<h2 id="topics" className="section-title">
					{t('Themen')}
				</h2>
				<FinkGrid _min="13rem">
					{CATEGORIES.map((category) => (
						<KolCard key={category} _label={CATEGORY_LABEL[category]} _level={3}>
							<FinkStack _gap="3">
								<span className={`pattern-icon ${CATEGORY_ICON[category]}`} aria-hidden="true"></span>
								<span className="muted small">{t('{{count}} Artikel', { count: articles.filter((a) => a.category === category).length })}</span>
								<KolButtonLinkToCategory category={category} />
							</FinkStack>
						</KolCard>
					))}
				</FinkGrid>
			</section>
			<FinkGrid _min="22rem" _gap="5">
				<FinkPanel _heading={t('Beliebte Artikel')}>
					<ul className="result-list">
						{articles.slice(0, 5).map((a) => (
							<li key={a.id}>
								<KolLink _href={`#${BASE}/artikel/${a.id}`} _label={a.title} />
								<span className="muted small">{a.excerpt}</span>
							</li>
						))}
					</ul>
				</FinkPanel>
				<FinkPanel _heading={t('Häufige Fragen')}>
					<FinkStack _gap="2">
						<KolAccordion _label={t('Wie lange dauert die Bearbeitung?')} _level={3}>
							{t('Im Schnitt 10 Arbeitstage nach Eingang aller Unterlagen.')}
						</KolAccordion>
						<KolAccordion _label={t('Kann ich einen Antrag zurückziehen?')} _level={3}>
							{t('Ja, solange noch kein Bescheid ergangen ist – im Postfach unter „Antrag zurückziehen“.')}
						</KolAccordion>
						<KolAccordion _label={t('Wo finde ich meinen Bescheid?')} _level={3}>
							{t('Bescheide liegen als PDF in Ihrem Postfach.')}
						</KolAccordion>
					</FinkStack>
				</FinkPanel>
			</FinkGrid>
			<FinkFeedback />
		</FinkStack>
	);
}

function KolButtonLinkToCategory({ category }: { category: Article['category'] }) {
	return (
		<KolButton
			_label={t('Artikel ansehen')}
			_variant="secondary"
			_icons="codicon codicon-arrow-right"
			_on={{
				onClick: () => {
					search.set({ query: '', categories: [category] });
					navigate(`${BASE}/artikel`);
				},
			}}
		/>
	);
}

function ArticleList() {
	const [state, setState] = search.use();
	const [view, setView] = useState('list');
	const [page, setPage] = useState(1);
	const filtered = useMemo(() => {
		const q = state.query.trim().toLowerCase();
		return articles.filter((a) => (state.categories.length === 0 || state.categories.includes(a.category)) && (q === '' || `${a.title} ${a.excerpt}`.toLowerCase().includes(q)));
	}, [state]);
	const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
	const update = (next: Partial<typeof state>) => {
		setState((s) => ({ ...s, ...next }));
		setPage(1);
	};
	return (
		<>
			<FinkPageHeader _heading={t('Artikel')} _description={t('Durchsuchen und filtern Sie alle Hilfeartikel.')} />
			<FinkStack _gap="4">
				<KolInputText _label={t('Suchbegriff')} _type="search" _icons="codicon codicon-search" _value={state.query} _on={{ onInput: (_e, v) => update({ query: String(v ?? '') }) }} />
				<div className="chip-filter" role="group" aria-label={t('Nach Thema filtern')}>
					{CATEGORIES.map((c) => (
						<FinkChip
							key={c}
							_label={CATEGORY_LABEL[c]}
							_count={articles.filter((a) => a.category === c).length}
							_selected={state.categories.includes(c)}
							onFinkToggle={(e) => update({ categories: e.detail ? [...state.categories, c] : state.categories.filter((x) => x !== c) })}
						/>
					))}
				</div>
				<FinkStack _direction="row" _justify="space-between" _align="center" _gap="3">
					<p className="muted small" role="status" style={{ margin: 0 }}>
						{t('{{count}} von {{total}} Artikeln', { count: filtered.length, total: articles.length })}
					</p>
					<FinkSegmented
						_label={t('Darstellung')}
						_hideLabel
						_value={view}
						onFinkChange={(e) => setView(e.detail)}
						_options={[
							{ value: 'list', label: t('Liste'), icon: 'codicon codicon-list-unordered', hideLabel: true },
							{ value: 'cards', label: t('Kacheln'), icon: 'codicon codicon-layout', hideLabel: true },
						]}
					/>
				</FinkStack>
				{filtered.length === 0 ? (
					<FinkEmptyState _heading={t('Keine Artikel gefunden')} _description={t('Versuchen Sie einen anderen Suchbegriff oder entfernen Sie Filter.')}>
						<KolButton _label={t('Filter zurücksetzen')} _variant="primary" _on={{ onClick: () => update({ query: '', categories: [] }) }} />
						<KolLinkButton _label={t('Kontakt aufnehmen')} _href={`#${BASE}/kontakt`} />
					</FinkEmptyState>
				) : view === 'list' ? (
					<ul className="result-list">
						{visible.map((a) => (
							<li key={a.id}>
								<KolLink _href={`#${BASE}/artikel/${a.id}`} _label={a.title} />
								<span className="muted small">
									{CATEGORY_LABEL[a.category]} · {t('{{count}} Min. Lesezeit', { count: a.minutes })} · {a.excerpt}
								</span>
							</li>
						))}
					</ul>
				) : (
					<FinkGrid _min="15rem" _gap="3">
						{visible.map((a) => (
							<KolCard key={a.id} _label={a.title} _level={2}>
								<FinkStack _gap="3">
									<span className="small">{a.excerpt}</span>
									<KolLinkButton _label={t('Lesen')} _href={`#${BASE}/artikel/${a.id}`} _variant="secondary" />
								</FinkStack>
							</KolCard>
						))}
					</FinkGrid>
				)}
				{filtered.length > PAGE_SIZE && <KolPagination _label={t('Seiten')} _page={page} _max={filtered.length} _pageSize={PAGE_SIZE} _on={{ onChangePage: (_e, v) => setPage(Number(v)) }} />}
			</FinkStack>
		</>
	);
}

function ArticleDetail({ id }: { id: string }) {
	const toast = useToast();
	const article = articles.find((a) => a.id === id);
	if (!article) {
		return (
			<FinkResult _variant="not-found" _heading={t('Artikel nicht gefunden')} _description={t('Der Artikel wurde verschoben oder gelöscht.')}>
				<KolLinkButton _label={t('Alle Artikel')} _href={`#${BASE}/artikel`} _variant="primary" />
			</FinkResult>
		);
	}
	const related = articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 3);
	return (
		<>
			<FinkPageHeader _heading={article.title} _description={article.excerpt}>
				<KolBreadcrumb
					slot="breadcrumb"
					_label={t('Brotkrumen')}
					_links={[
						{ _label: t('Hilfe-Center'), _href: `#${BASE}` },
						{ _label: CATEGORY_LABEL[article.category], _href: `#${BASE}/artikel` },
						{ _label: article.title, _href: `#${BASE}/artikel/${article.id}` },
					]}
				/>
				<span slot="meta" className="source-chip">
					{t('{{count}} Min. Lesezeit', { count: article.minutes })}
				</span>
			</FinkPageHeader>
			<FinkGrid _min="20rem" _gap="5">
				<FinkPanel _heading={t('So gehen Sie vor')}>
					<ol className="prose">
						<li>{t('Melden Sie sich mit Ihrem Servicekonto an.')}</li>
						<li>{t('Öffnen Sie den Bereich, um den es geht.')}</li>
						<li>{article.excerpt}</li>
						<li>{t('Speichern Sie Ihre Änderungen – Sie erhalten eine Bestätigung per E-Mail.')}</li>
					</ol>
				</FinkPanel>
				<FinkStack _gap="5">
					<KolImage _src={ILLUSTRATION} _alt={t('Illustration zum Artikel')} />
					<FinkPanel _heading={t('Alle Themen')}>
						<KolTree _label={t('Themenbaum')}>
							{CATEGORIES.map((category) => (
								<KolTreeItem key={category} _label={CATEGORY_LABEL[category]} _href={`#${BASE}/artikel`} _open={category === article.category}>
									{articles
										.filter((a) => a.category === category)
										.map((a) => (
											<KolTreeItem key={a.id} _label={a.title} _href={`#${BASE}/artikel/${a.id}`} _active={a.id === article.id} />
										))}
								</KolTreeItem>
							))}
						</KolTree>
					</FinkPanel>
					<FinkPanel _heading={t('Verwandte Artikel')}>
						<ul className="result-list">
							{related.map((a) => (
								<li key={a.id}>
									<KolLink _href={`#${BASE}/artikel/${a.id}`} _label={a.title} />
								</li>
							))}
						</ul>
					</FinkPanel>
				</FinkStack>
			</FinkGrid>
			<FinkStack _gap="4" style={{ marginTop: 'var(--fink-space-6)' }}>
				<FinkRating _label={t('Wie hilfreich war dieser Artikel?')} onFinkChange={(e) => toast.show({ type: 'success', label: t('Danke für Ihre Bewertung'), description: t('{{count}} von 5 Sternen', { count: e.detail }) })} />
				<FinkFeedback />
			</FinkStack>
		</>
	);
}

const TOPICS = [
	{ label: t('Bitte wählen'), value: '' },
	{ label: t('Antrag'), value: 'antrag' },
	{ label: t('Konto'), value: 'konto' },
	{ label: t('Zahlung'), value: 'zahlung' },
	{ label: t('Technik'), value: 'technik' },
];

function ContactView() {
	const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' });
	const [submitted, setSubmitted] = useState(false);
	const [reference, setReference] = useState<string | null>(null);
	const [formRef, focusErrors] = useFormErrorFocus();
	const errors: Partial<Record<keyof typeof form, string>> = {};
	if (form.name.trim().length < 2) errors.name = t('Geben Sie Ihren Namen ein');
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = t('Geben Sie eine E-Mail-Adresse im Format name@beispiel.de ein');
	if (!form.topic) errors.topic = t('Wählen Sie ein Thema');
	if (form.message.trim().length < 20) errors.message = t('Beschreiben Sie Ihr Anliegen in mindestens 20 Zeichen');
	const keys = Object.keys(errors) as Array<keyof typeof form>;
	const msg = (k: keyof typeof form) => (submitted && errors[k] ? { _type: 'error' as const, _description: errors[k]! } : undefined);
	const set = (k: keyof typeof form) => (_e: unknown, v: unknown) => setForm((f) => ({ ...f, [k]: String(v ?? '') }));
	if (reference) {
		return (
			<FinkStack _gap="6">
				<FinkResult _variant="success" _heading={t('Nachricht gesendet')} _reference={reference} _description={t('Wir antworten in der Regel innerhalb von 2 Arbeitstagen per E-Mail.')}>
					<KolLinkButton _label={t('Zum Hilfe-Center')} _href={`#${BASE}`} _variant="primary" />
				</FinkResult>
				<FinkPanel _heading={t('Wie geht es weiter?')}>
					<FinkTimeline
						_items={[
							{ title: t('Eingangsbestätigung'), date: t('sofort'), tone: 'success', icon: 'codicon codicon-check' },
							{ title: t('Bearbeitung durch das Service-Team'), date: t('1–2 Arbeitstage'), tone: 'info' },
							{ title: t('Antwort per E-Mail'), tone: 'brand' },
						]}
					/>
				</FinkPanel>
			</FinkStack>
		);
	}
	return (
		<>
			<FinkPageHeader _heading={t('Kontakt')} _description={t('Nichts gefunden? Schreiben Sie uns.')} />
			<KolForm
				ref={formRef}
				_requiredText
				_errorList={submitted ? keys.map((k) => ({ message: errors[k]!, selector: `#contact-${k}` })) : []}
				_on={{
					onSubmit: () => {
						setSubmitted(true);
						if (keys.length) focusErrors();
						else setReference(`SR-${String(Math.floor(Math.random() * 90000) + 10000)}`);
					},
				}}
			>
				<FinkStack _gap="4">
					<div className="form-row">
						<KolInputText id="contact-name" _label={t('Name')} _required _autoComplete="name" _value={form.name} _touched={submitted} _msg={msg('name')} _on={{ onInput: set('name') }} />
						<KolInputEmail id="contact-email" _label={t('E-Mail-Adresse')} _required _autoComplete="email" _value={form.email} _touched={submitted} _msg={msg('email')} _on={{ onInput: set('email') }} />
					</div>
					<KolSingleSelect id="contact-topic" _label={t('Thema')} _required _options={TOPICS} _value={form.topic} _touched={submitted} _msg={msg('topic')} _on={{ onChange: set('topic') }} />
					<KolTextarea id="contact-message" _label={t('Ihr Anliegen')} _required _rows={5} _hasCounter _maxLength={2000} _value={form.message} _touched={submitted} _msg={msg('message')} _on={{ onInput: set('message') }} />
					<FinkFileUpload _label={t('Anhänge (optional)')} _hint={t('Screenshots oder Dokumente, höchstens 10 MB')} />
					<div>
						<KolButton _label={t('Nachricht senden')} _variant="primary" _type="submit" _icons="codicon codicon-send" />
					</div>
				</FinkStack>
			</KolForm>
		</>
	);
}

export function HilfeApp() {
	const route = useRoute();
	const parts = route.slice(BASE.length).replace(/^\//, '').split('/');
	const view = parts[0] || 'start';
	return (
		<CompositionShell
			label={t('Hilfe-Center')}
			icon="codicon codicon-question"
			base={BASE}
			view={view}
			gradient="linear-gradient(135deg, var(--fink-color-info), var(--fink-color-primary))"
			links={[
				{ id: 'start', label: t('Start'), icon: 'codicon codicon-home' },
				{ id: 'artikel', label: t('Artikel'), icon: 'codicon codicon-book' },
				{ id: 'kontakt', label: t('Kontakt'), icon: 'codicon codicon-mail' },
			]}
		>
			{view === 'start' && <StartView />}
			{view === 'artikel' && (parts[1] ? <ArticleDetail id={parts[1]} /> : <ArticleList />)}
			{view === 'kontakt' && <ContactView />}
			{!['start', 'artikel', 'kontakt'].includes(view) && (
				<FinkResult _variant="not-found" _heading={t('Seite nicht gefunden')} _description={t('Prüfen Sie die Adresse.')}>
					<KolLinkButton _label={t('Zum Hilfe-Center')} _href={`#${BASE}`} _variant="primary" />
				</FinkResult>
			)}
		</CompositionShell>
	);
}
