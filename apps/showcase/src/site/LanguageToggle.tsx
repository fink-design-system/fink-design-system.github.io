import { KolButton, useFink } from '@fink/react';
import { useCompact } from './useMediaQuery';

/** Schaltet zwischen Deutsch und Englisch um. */
export function LanguageToggle() {
	const { language, setLanguage } = useFink();
	const next = language === 'de' ? 'en' : 'de';
	// Auf schmalen Viewports nur das Globus-Icon; die Bezeichnung bleibt als Tooltip und Name erhalten.
	const compact = useCompact();
	return (
		<KolButton
			_label={next === 'en' ? 'English' : 'Deutsch'}
			_hideLabel={compact}
			_icons="codicon codicon-globe"
			_variant="ghost"
			_ariaDescription={next === 'en' ? 'Switch to English' : 'Auf Deutsch umschalten'}
			_on={{ onClick: () => setLanguage(next) }}
		/>
	);
}
