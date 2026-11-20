import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { FinkAppShell, KolAvatar, KolLinkButton, KolNav } from '@fink/react';
import { SchemeToggle } from '../site/SchemeToggle';
import { LanguageToggle } from '../site/LanguageToggle';
import { ThemeSwitcher } from '../site/ThemeSwitcher';
import { t } from '../i18n';

export interface ShellLink {
	id: string;
	label: string;
	icon: string;
}

interface Props {
	label: string;
	icon: string;
	base: string;
	view: string;
	links: ShellLink[];
	user?: string;
	children: ReactNode;
	footer?: ReactNode;
	actions?: ReactNode;
	gradient?: string;
}

/** Gemeinsamer Rahmen der Kompositionen: App Shell, Navigation, Rückweg zur Doku. */
export function CompositionShell({ label, icon, base, view, links, user = 'Erika Mustermann', children, footer, actions, gradient }: Props) {
	const [navOpen, setNavOpen] = useState(false);
	useEffect(() => setNavOpen(false), [view]);
	const navLinks = useMemo(
		() =>
			links.map((link, index) => ({
				_label: link.label,
				_href: `#${base}${index === 0 ? '' : `/${link.id}`}`,
				_icons: link.icon,
				_active: view === link.id,
			})),
		[links, base, view],
	);
	return (
		<FinkAppShell _label={label} _navLabel={label} _navOpen={navOpen} onFinkNavToggle={(e) => setNavOpen(e.detail)}>
			<span slot="brand" className="composition-mark" aria-hidden="true" style={gradient ? { background: gradient } : undefined}>
				<span className={icon}></span>
			</span>
			<div slot="actions" className="header-tools">
				{actions}
				<KolLinkButton _label={t('Alle Kompositionen')} _href="#/compositions" _variant="ghost" _icons="codicon codicon-arrow-left" className="hide-small" />
				<LanguageToggle />
				<ThemeSwitcher />
				<SchemeToggle />
				<KolAvatar _label={user} style={{ width: '2.25rem' }} />
			</div>
			<KolNav slot="nav" _label={label} _links={navLinks} _hasIconsWhenExpanded />
			<div key={view}>{children}</div>
			<span slot="footer">{footer ?? t('{{label}} · Komposition des Fink Design Systems · Demo-Daten', { label })}</span>
		</FinkAppShell>
	);
}
