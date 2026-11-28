import { FinkButton, useFink, type FinkColorScheme } from '@fink-ui/react';
import { t } from '../i18n';

const ORDER: FinkColorScheme[] = ['system', 'light', 'dark'];
const ICON: Record<FinkColorScheme, string> = {
	system: 'fa-solid fa-display',
	light: 'fa-solid fa-sun',
	dark: 'fa-solid fa-moon',
};
const NEXT_LABEL: Record<FinkColorScheme, string> = {
	system: t('Helles Farbschema'),
	light: t('Dunkles Farbschema'),
	dark: t('Farbschema System'),
};

/** Ein Button, drei Zustände: Monitor (System) → Sonne (hell) → Mond (dunkel) → Monitor. */
export function SchemeToggle() {
	const { colorScheme, setColorScheme } = useFink();
	const current = ORDER.includes(colorScheme) ? colorScheme : 'system';
	const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
	return (
		<FinkButton
			_label={t('Farbschema wechseln ({{ziel}})', { ziel: NEXT_LABEL[next] })}
			_hideLabel
			_icons={ICON[current]}
			_variant="ghost"
			_on={{ onClick: () => setColorScheme(next) }}
		/>
	);
}
