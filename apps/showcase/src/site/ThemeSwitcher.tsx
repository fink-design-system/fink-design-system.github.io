import { FINK_THEMES, FinkMenu, useFink, type FinkThemeInfo, type FinkThemeName } from '@fink/react';
import { t } from '../i18n';
import { useCompact } from './useMediaQuery';

const toItem = (item: FinkThemeInfo, active: FinkThemeName) => ({
	id: item.name,
	label: item.label,
	icon: item.name === active ? 'codicon codicon-check' : 'codicon codicon-blank',
	description: item.name === active ? t('Aktiv') : undefined,
});

/**
 * Wählt das Theme der gesamten Seite: Fink, KoliBri-Default oder eine Marken-Nachbildung
 * (Porsche, Telekom, Siemens iX). Der Wechsel montiert die Oberfläche neu; die Wahl bleibt gespeichert.
 * Auf schmalen Viewports blendet sich der Kopf-Umschalter aus (hideOnCompact).
 */
export function ThemeSwitcher({ hideOnCompact = true }: { hideOnCompact?: boolean }) {
	const { theme, setTheme } = useFink();
	// Im Kopf ist auf Smartphones kein Platz für ein weiteres Symbol (WCAG 1.4.10); dort wählt man das
	// Theme auf der Seite „Theming“ oder in den Einstellungen der Kompositionen.
	const compact = useCompact();
	if (hideOnCompact && compact) return null;
	const current = FINK_THEMES.find((item) => item.name === theme);
	return (
		<FinkMenu
			_label={t('Theme: {{name}}', { name: current?.label ?? theme })}
			_hideLabel
			_icons="codicon codicon-paintcan"
			_variant="ghost"
			_items={[
				{ type: 'heading', label: t('Design-System') },
				...FINK_THEMES.filter((item) => !item.brand).map((item) => toItem(item, theme)),
				{ type: 'divider' as const },
				{ type: 'heading', label: t('Nachbildungen auf Fink-Basis') },
				...FINK_THEMES.filter((item) => item.brand).map((item) => toItem(item, theme)),
			]}
			onFinkSelect={(event) => setTheme(event.detail as FinkThemeName)}
		/>
	);
}
