import { KolButton, useFink } from '@fink/react';
import { t } from '../i18n';

/** Schaltet zwischen hellem und dunklem Farbschema um. */
export function SchemeToggle() {
	const { colorScheme, setColorScheme } = useFink();
	const dark = colorScheme === 'dark' || (colorScheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
	return (
		<KolButton
			_label={dark ? t('Helles Farbschema') : t('Dunkles Farbschema')}
			_hideLabel
			_icons={dark ? 'codicon codicon-color-mode' : 'codicon codicon-color-mode'}
			_variant="ghost"
			_on={{ onClick: () => setColorScheme(dark ? 'light' : 'dark') }}
		/>
	);
}
