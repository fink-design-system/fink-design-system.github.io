import { FinkLinkButton } from '@fink-ui/react';
import { t } from '../i18n';
import { useCompact } from './useMediaQuery';

/** Öffentliches Repository des Fink Design Systems (nach einer Umbenennung nur hier anpassen). */
export const REPO_URL = 'https://github.com/fink-design-system/fink-design-system.github.io';

/** Link zum Quellcode in der Kopfzeile; auf schmalen Viewports nur als Icon. */
export function GitHubLink() {
	const compact = useCompact();
	return (
		<FinkLinkButton
			_label={t('GitHub')}
			_hideLabel={compact}
			_icons="codicon codicon-github"
			_href={REPO_URL}
			_target="_blank"
			_variant="ghost"
			_ariaDescription={t('Quellcode auf GitHub (öffnet in neuem Tab)')}
		/>
	);
}
