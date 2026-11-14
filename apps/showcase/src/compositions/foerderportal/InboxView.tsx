import { FinkEmptyState, FinkPageHeader, FinkPanel, FinkStack, FinkStatus, KolButton, KolLinkButton } from '@fink/react';
import { dateDe, type Application } from './data';
import { t } from '../../i18n';

interface Props {
	applications: Application[];
	onOpen: (id: string) => void;
}

/** Postfach: offene Rückfragen als Nachrichtenliste. */
export function InboxView({ applications, onOpen }: Props) {
	const queries = applications.filter((app) => app.status === 'rueckfrage');
	return (
		<>
			<FinkPageHeader _heading={t('Postfach')} _description={t('Offene Rückfragen an Antragstellende. Sobald eine Antwort eingeht, geht der Antrag zurück in die Prüfung.')} />
			{queries.length === 0 ? (
				<FinkEmptyState _heading={t('Keine offenen Rückfragen')} _description={t('Alles erledigt – es wartet keine Antwort von Antragstellenden.')} _icons="codicon codicon-check-all">
					<KolLinkButton _label={t('Zu den Anträgen')} _href="#/compositions/foerderportal/applications" _variant="primary" />
				</FinkEmptyState>
			) : (
				<FinkPanel _heading={t('{{count}} offene Rückfragen', { count: queries.length })} _flush>
					<ul className="message-list">
						{queries.map((app) => {
							const last = app.history[app.history.length - 1];
							return (
								<li key={app.id}>
									<FinkStack _direction="row" _justify="space-between" _align="center" _gap="3">
										<div>
											<strong>{app.applicant}</strong> <span className="muted small">· {app.id}</span>
											<br />
											<span className="muted small">
												{last.text} · {dateDe(last.date)}
											</span>
										</div>
										<FinkStack _direction="row" _gap="2" _align="center">
											<FinkStatus _label={t('Wartet auf Antwort')} _tone="warning" />
											<KolButton _label={t('{{id}} öffnen', { id: app.id })} _hideLabel _icons="codicon codicon-chevron-right" _variant="tertiary" _on={{ onClick: () => onOpen(app.id) }} />
										</FinkStack>
									</FinkStack>
								</li>
							);
						})}
					</ul>
				</FinkPanel>
			)}
		</>
	);
}
