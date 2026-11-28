import { FinkAppShell, FinkBackToTop, FinkKolibri, FinkNav, FinkVersion } from '@fink-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { findComposition } from './compositions';
import { t } from './i18n';
import { Compare } from './pages/Compare';
import { ComponentDetail } from './pages/ComponentDetail';
import { ComponentsIndex } from './pages/ComponentsIndex';
import { CompositionsIndex } from './pages/CompositionsIndex';
import { Foundations } from './pages/Foundations';
import { GettingStarted } from './pages/GettingStarted';
import { Home } from './pages/Home';
import { PatternDetail } from './pages/PatternDetail';
import { PatternsIndex } from './pages/PatternsIndex';
import { Reuse } from './pages/Reuse';
import { Starters } from './pages/Starters';
import { Theming } from './pages/Theming';
import { navigate, useRoute } from './router';
import { GitHubLink } from './site/GitHubLink';
import { LanguageToggle } from './site/LanguageToggle';
import { Logo } from './site/Logo';
import { SchemeToggle } from './site/SchemeToggle';
import { ThemeSwitcher } from './site/ThemeSwitcher';
import { FINK_VERSION } from './site/finkVersion';

const NAV_COMPACT_KEY = 'fink-nav-compact';

const pages = [
	{ path: '/', label: t('Start'), icon: 'codicon codicon-home' },
	{ path: '/getting-started', label: t('Getting Started'), icon: 'codicon codicon-rocket' },
	{ path: '/starter', label: t('Starter'), icon: 'codicon codicon-browser' },
	{ path: '/foundations', label: t('Grundlagen'), icon: 'codicon codicon-symbol-color' },
	{ path: '/theming', label: t('Theming'), icon: 'codicon codicon-paintcan' },
	{ path: '/components', label: t('Komponenten'), icon: 'codicon codicon-symbol-misc' },
	{ path: '/patterns', label: t('Patterns'), icon: 'codicon codicon-library' },
	{ path: '/compositions', label: t('Kompositionen'), icon: 'codicon codicon-play' },
	{ path: '/compare', label: t('Vergleich'), icon: 'codicon codicon-graph' },
	{ path: '/reuse', label: t('KoliBri-Nachnutzung'), icon: 'codicon codicon-references' },
];

function renderPage(route: string) {
	if (route === '/getting-started') return <GettingStarted />;
	if (route === '/starter') return <Starters />;
	if (route === '/foundations') return <Foundations />;
	if (route === '/theming') return <Theming />;
	if (route === '/components') return <ComponentsIndex />;
	if (route.startsWith('/components/')) return <ComponentDetail id={decodeURIComponent(route.slice('/components/'.length))} />;
	if (route === '/patterns') return <PatternsIndex />;
	if (route.startsWith('/patterns/')) return <PatternDetail id={decodeURIComponent(route.slice('/patterns/'.length))} />;
	if (route === '/compositions') return <CompositionsIndex />;
	if (route === '/compare') return <Compare />;
	if (route === '/reuse') return <Reuse />;
	return <Home />;
}

export function App() {
	const route = useRoute();
	const [navOpen, setNavOpen] = useState(false);
	// Kompakte Navigation (nur Symbole) bleibt über Seitenwechsel und Neuladen erhalten.
	const [navCompact, setNavCompact] = useState(() => {
		try {
			return localStorage.getItem(NAV_COMPACT_KEY) === 'true';
		} catch {
			return false;
		}
	});
	const changeNavCompact = (compact: boolean) => {
		setNavCompact(compact);
		try {
			localStorage.setItem(NAV_COMPACT_KEY, String(compact));
		} catch {
			// ohne Speicher gilt die Wahl bis zum Neuladen
		}
	};
	const links = useMemo(
		() =>
			pages.map((page) => ({
				_label: page.label,
				_href: `#${page.path}`,
				_icons: page.icon,
				_active: page.path === '/' ? route === '/' : route.startsWith(page.path),
			})),
		[route],
	);

	useEffect(() => {
		if (route === '/composition' || route.startsWith('/composition/')) navigate(route.replace('/composition', '/compositions/foerderportal'));
	}, [route]);

	useEffect(() => {
		setNavOpen(false);
		const page = [...pages].reverse().find((p) => (p.path === '/' ? route === '/' : route.startsWith(p.path)));
		document.title = `${page?.label ?? 'Start'} · Fink Design System`;
		window.scrollTo({ top: 0 });
	}, [route]);

	const compositionMatch = route.match(/^\/compositions\/([^/]+)/);
	const composition = compositionMatch ? findComposition(compositionMatch[1]) : undefined;
	if (composition) {
		const CompositionComponent = composition.app;
		return <CompositionComponent />;
	}

	return (
		<>
			<FinkAppShell
				_label={t('Fink Design System')}
				_navLabel={t('Dokumentation')}
				_navOpen={navOpen}
				_navCompact={navCompact}
				onFinkNavToggle={(event) => setNavOpen(event.detail)}
				onFinkNavCompactToggle={(event) => changeNavCompact(event.detail)}
			>
				<Logo slot="brand" />
				<div slot="actions" className="header-tools">
					<FinkVersion _label={FINK_VERSION} className="header-version" />
					<LanguageToggle />
					<ThemeSwitcher />
					<SchemeToggle />
					<GitHubLink />
				</div>
				<FinkNav slot="nav" _label={t('Dokumentation')} _links={links} _hasIconsWhenExpanded />
				{/* Erster Inhalt im Hauptbereich: liegt so in der main-Landmark und verschiebt die Kopfzeile der App Shell nicht. */}
				<div className="site-banner">
					<p className="site-banner-text">
						{t(
							'Fink basiert wie KoliBri vollständig auf dem Web-Components-Standard. In jedem webbasierten Ansatz sind alle Komponenten robust wiederverwendbar: semantisch, im Verhalten und im Corporate Design.',
						)}
					</p>
				</div>
				<div key={route}>{renderPage(route)}</div>
				<FinkBackToTop />
				<span slot="footer" className="site-footer">
					<FinkKolibri _labeled className="site-footer-logo" />
					<span>{t('Fink Design System · Prototyp auf Basis von Public UI – KoliBri (EUPL-1.2)')}</span>
				</span>
			</FinkAppShell>
		</>
	);
}
