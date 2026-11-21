import { KolButton, useFink, type FinkColorScheme } from '@fink/react';
import { t } from '../i18n';

const OPTIONS: Array<{ scheme: FinkColorScheme; icon: string; label: string }> = [
	{ scheme: 'system', icon: 'codicon codicon-desktop-monitor', label: t('Farbschema System') },
	{ scheme: 'light', icon: 'codicon codicon-sun', label: t('Helles Farbschema') },
	{ scheme: 'dark', icon: 'codicon codicon-moon', label: t('Dunkles Farbschema') },
];

/** Wählt das Farbschema (System, hell, dunkel) — je Zustand ein eigenes Icon. */
export function SchemeToggle() {
	const { colorScheme, setColorScheme } = useFink();
	return (
		<span role="group" aria-label={t('Farbschema wählen')} className="scheme-toggle">
			{OPTIONS.map(({ scheme, icon, label }) => (
				<KolButton
					key={scheme}
					_label={label}
					_hideLabel
					_icons={icon}
					_variant={colorScheme === scheme ? 'primary' : 'ghost'}
					_on={{ onClick: () => setColorScheme(scheme) }}
				/>
			))}
		</span>
	);
}
