import { FinkButton, FinkInputRadio, FinkPageHeader, FinkPanel, FinkStack, useFink, useToast, type FinkColorScheme, type FinkThemeName } from '@fink-ui/react';
import { t } from '../../i18n';
import { applicationsStore } from './store';

const SCHEME_OPTIONS = [
	{ label: t('Hell'), value: 'light' },
	{ label: t('Dunkel'), value: 'dark' },
	{ label: t('System'), value: 'system' },
];

/** Einstellungen: Farbschema, Theme und Demo-Daten. */
export function SettingsView() {
	const { colorScheme, setColorScheme, theme, setTheme, themes } = useFink();
	const themeOptions = themes.map((item) => ({ label: item.label, value: item.name }));
	const toast = useToast();
	return (
		<>
			<FinkPageHeader _heading={t('Einstellungen')} _description={t('Darstellung und Demo-Daten dieser Sitzung.')} />
			<FinkStack _gap="5">
				<FinkPanel _heading={t('Darstellung')}>
					<FinkStack _gap="5">
						<FinkInputRadio
							_label={t('Farbschema')}
							_orientation="horizontal"
							_options={SCHEME_OPTIONS}
							_value={colorScheme}
							_on={{ onChange: (_e, value) => setColorScheme(value as FinkColorScheme) }}
						/>
						<FinkInputRadio
							_label={t('Theme')}
							_hint={t('Ein Theme-Wechsel montiert die Oberfläche neu, die Daten bleiben erhalten.')}
							_orientation="horizontal"
							_options={themeOptions}
							_value={theme}
							_on={{ onChange: (_e, value) => setTheme(value as FinkThemeName) }}
						/>
					</FinkStack>
				</FinkPanel>
				<FinkPanel _heading={t('Demo-Daten')} _description={t('Die Daten liegen nur in dieser Browser-Sitzung.')}>
					<FinkButton
						_label={t('Demo-Daten zurücksetzen')}
						_icons="codicon codicon-discard"
						_variant="danger"
						_on={{
							onClick: () => {
								applicationsStore.reset();
								toast.show({ type: 'info', label: t('Zurückgesetzt'), description: t('Die Beispieldaten wurden neu geladen.') });
							},
						}}
					/>
				</FinkPanel>
			</FinkStack>
		</>
	);
}
