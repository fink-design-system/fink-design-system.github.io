import { useEffect, useMemo, useState } from 'react';
import {
	FinkAppShell,
	FinkBackToTop,
	KolKolibri,
	KolNav,
	KolVersion,
} from '@fink/react';
import { navigate, useRoute } from './router';
import { Logo } from './site/Logo';
import { SchemeToggle } from './site/SchemeToggle';
import { LanguageToggle } from './site/LanguageToggle';
import { ThemeSwitcher } from './site/ThemeSwitcher';
import { GitHubLink } from './site/GitHubLink';
import { Home } from './pages/Home';
import { Foundations } from './pages/Foundations';
import { Theming } from './pages/Theming';
import { ComponentsIndex } from './pages/ComponentsIndex';
import { ComponentDetail } from './pages/ComponentDetail';
import { PatternsIndex } from './pages/PatternsIndex';
import { PatternDetail } from './pages/PatternDetail';
import { CompositionsIndex } from './pages/CompositionsIndex';
import { Reuse } from './pages/Reuse';
import { Compare } from './pages/Compare';
import { findComposition } from './compositions';
import { t } from './i18n';

const pages = [
	{ path: '/', label: t('Start'), icon: 'codicon codicon-home' },
	{ path: '/foundations', label: t('Grundlagen'), icon: 'codicon codicon-symbol-color' },
	{ path: '/theming', label: t('Theming'), icon: 'codicon codicon-paintcan' },
	{ path: '/components', label: t('Komponenten'), icon: 'codicon codicon-symbol-misc' },
	{ path: '/patterns', label: t('Patterns'), icon: 'codicon codicon-library' },
	{ path: '/compositions', label: t('Kompositionen'), icon: 'codicon codicon-play' },
	{ path: '/compare', label: t('Vergleich'), icon: 'codicon codicon-graph' },
	{ path: '/reuse', label: t('KoliBri-Nachnutzung'), icon: 'codicon codicon-references' },
];

function renderPage(route: string) {
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
		<FinkAppShell _label={t('Fink Design System')} _navLabel={t('Dokumentation')} _navOpen={navOpen} onFinkNavToggle={(event) => setNavOpen(event.detail)}>
			<Logo slot="brand" />
			<div slot="actions" className="header-tools">
				<KolVersion _label="0.1.0" className="header-version" />
				<LanguageToggle />
				<ThemeSwitcher />
				<SchemeToggle />
				<GitHubLink />
			</div>
			<KolNav slot="nav" _label={t('Dokumentation')} _links={links} _hasIconsWhenExpanded />
			<div key={route}>{renderPage(route)}</div>
			<FinkBackToTop />
			<span slot="footer" className="site-footer">
				<KolKolibri _labeled className="site-footer-logo" />
				<span>{t('Fink Design System · Prototyp auf Basis von Public UI – KoliBri (EUPL-1.2)')}</span>
			</span>
		</FinkAppShell>
	);
}
