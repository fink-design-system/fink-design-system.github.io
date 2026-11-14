import { useCallback, useEffect, useMemo, useState } from 'react';
import { FinkAppShell, KolAvatar, KolLinkButton, KolNav, useToast } from '@fink/react';
import { useRoute, navigate } from '../../router';
import { SchemeToggle } from '../../site/SchemeToggle';
import { ApplicationDrawer } from './ApplicationDrawer';
import { ApplicationsView } from './ApplicationsView';
import { InboxView } from './InboxView';
import { NewApplicationDialog } from './NewApplicationDialog';
import { Overview } from './Overview';
import { SettingsView } from './SettingsView';
import { applicationsStore, useApplications } from './store';
import '../composition.css';
import { t } from '../../i18n';

const BASE = '/compositions/foerderportal';

/**
 * Gesamtkomposition „Förderportal“: eine kleine Fachanwendung ausschließlich aus Fink-Komposita
 * und KoliBri-Atomen.
 */
export function CompositionApp() {
	const route = useRoute();
	const view = route.slice(BASE.length).replace(/^\//, '') || 'overview';
	const applications = useApplications();
	const toast = useToast();
	const [navOpen, setNavOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [dialogOpen, setDialogOpen] = useState(false);

	useEffect(() => setNavOpen(false), [view]);

	const openDetails = useCallback((id: string) => setSelectedId(id), []);
	const queries = applications.filter((app) => app.status === 'rueckfrage').length;

	const links = useMemo(
		() =>
			[
				{ id: 'overview', label: t('Übersicht'), icon: 'codicon codicon-dashboard' },
				{ id: 'applications', label: t('Anträge'), icon: 'codicon codicon-files' },
				{ id: 'inbox', label: queries ? `Postfach (${queries})` : 'Postfach', icon: 'codicon codicon-mail' },
				{ id: 'settings', label: t('Einstellungen'), icon: 'codicon codicon-settings-gear' },
			].map((link) => ({
				_label: link.label,
				_href: `#${BASE}${link.id === 'overview' ? '' : `/${link.id}`}`,
				_icons: link.icon,
				_active: view === link.id,
			})),
		[queries, view],
	);

	return (
		<FinkAppShell _label={t('Förderportal')} _navLabel={t('Förderportal')} _navOpen={navOpen} onFinkNavToggle={(event) => setNavOpen(event.detail)} className="composition">
			<span slot="brand" className="composition-mark" aria-hidden="true">
				<span className="codicon codicon-briefcase"></span>
			</span>
			<div slot="actions" className="header-tools">
				<KolLinkButton _label={t('Alle Kompositionen')} _href="#/compositions" _variant="ghost" _icons="codicon codicon-book" className="hide-small" />
				<SchemeToggle />
				<KolAvatar _label={t('Jonas Weber')} style={{ width: '2.25rem' }} />
			</div>
			<KolNav slot="nav" _label={t('Bereiche')} _links={links} _hasIconsWhenExpanded />

			<div key={view}>
				{view === 'overview' && <Overview applications={applications} onNew={() => setDialogOpen(true)} onOpen={openDetails} />}
				{view === 'applications' && <ApplicationsView applications={applications} onNew={() => setDialogOpen(true)} onOpen={openDetails} />}
				{view === 'inbox' && <InboxView applications={applications} onOpen={openDetails} />}
				{view === 'settings' && <SettingsView />}
			</div>

			<span slot="footer">{t('Gesamtkomposition des Fink Design Systems · Demo-Daten, keine echte Verarbeitung')}</span>

			<ApplicationDrawer application={applications.find((app) => app.id === selectedId)} onClose={() => setSelectedId(null)} />
			<NewApplicationDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				onSubmit={(input) => {
					const created = applicationsStore.add(input);
					setDialogOpen(false);
					toast.show({ type: 'success', label: t('Antrag eingereicht'), description: `${created.id} von ${created.applicant} wurde angelegt.` });
					navigate(`${BASE}/applications`);
					setSelectedId(created.id);
				}}
			/>
		</FinkAppShell>
	);
}
