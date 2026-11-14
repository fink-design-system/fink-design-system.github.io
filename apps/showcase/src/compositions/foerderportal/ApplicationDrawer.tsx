import { FinkStack, FinkStatus, KolButton, KolDrawer, useToast } from '@fink/react';
import { PROGRAMS, STATUS, dateDe, euro, type Application, type Status } from './data';
import { applicationsStore } from './store';
import { t } from '../../i18n';

interface Props {
	application: Application | undefined;
	onClose: () => void;
}

const transitions: Array<{ to: Status; label: string; icon: string; variant: string; note: string; allowed: Status[] }> = [
	{ to: 'pruefung', label: t('Prüfung starten'), icon: 'codicon codicon-play', variant: 'secondary', note: t('Prüfung begonnen'), allowed: ['neu'] },
	{ to: 'rueckfrage', label: t('Rückfrage stellen'), icon: 'codicon codicon-comment', variant: 'normal', note: t('Rückfrage an Antragsteller gesendet'), allowed: ['neu', 'pruefung'] },
	{ to: 'pruefung', label: t('Antwort erhalten'), icon: 'codicon codicon-reply', variant: 'secondary', note: t('Antwort auf Rückfrage erhalten'), allowed: ['rueckfrage'] },
	{ to: 'bewilligt', label: t('Bewilligen'), icon: 'codicon codicon-check', variant: 'primary', note: t('Bewilligt'), allowed: ['pruefung'] },
	{ to: 'abgelehnt', label: t('Ablehnen'), icon: 'codicon codicon-close', variant: 'danger', note: t('Abgelehnt'), allowed: ['pruefung', 'rueckfrage'] },
];

const toastType: Record<Status, 'default' | 'error' | 'info' | 'success' | 'warning'> = {
	neu: 'info',
	pruefung: 'info',
	rueckfrage: 'warning',
	bewilligt: 'success',
	abgelehnt: 'error',
};

/** Detailansicht eines Antrags im seitlichen Drawer mit Statusaktionen. */
export function ApplicationDrawer({ application, onClose }: Props) {
	const toast = useToast();
	const open = Boolean(application);

	return (
		<KolDrawer _label={application ? t('Antrag {{id}}', { id: application.id }) : t('Antrag')} _open={open} _align="right" _hasCloser _level={2} _on={{ onClose }}>
			{application && (
				<FinkStack _gap="5" style={{ minWidth: 'min(26rem, 80vw)' }}>
					<FinkStack _direction="row" _gap="2" _align="center">
						<FinkStatus _label={STATUS[application.status].label} _tone={STATUS[application.status].tone} />
						<span className="muted small">eingegangen am {dateDe(application.received)}</span>
					</FinkStack>

					<dl className="detail-list">
						<dt>{t('Antragsteller')}</dt>
						<dd>{application.applicant}</dd>
						<dt>{t('Ansprechperson')}</dt>
						<dd>
							{application.contact}
							<br />
							<a href={`mailto:${application.email}`}>{application.email}</a>
						</dd>
						<dt>{t('Ort')}</dt>
						<dd>{application.city}</dd>
						<dt>{t('Programm')}</dt>
						<dd>{PROGRAMS[application.program].label}</dd>
						<dt>{t('Beantragte Summe')}</dt>
						<dd>
							<strong>{euro(application.amount)}</strong>
						</dd>
						<dt>{t('Vorhaben')}</dt>
						<dd>{application.description}</dd>
					</dl>

					<section aria-labelledby="history-title">
						<h3 id="history-title" className="detail-heading">
							{t('Verlauf')}
						</h3>
						<ol className="timeline">
							{[...application.history].reverse().map((entry, index) => (
								<li key={`${entry.date}-${index}`}>
									<span className="timeline-date">{dateDe(entry.date)}</span>
									<span>{entry.text}</span>
								</li>
							))}
						</ol>
					</section>

					<section aria-labelledby="actions-title">
						<h3 id="actions-title" className="detail-heading">
							{t('Aktionen')}
						</h3>
						<FinkStack _direction="row" _gap="2">
							{transitions
								.filter((transition) => transition.allowed.includes(application.status))
								.map((transition) => (
									<KolButton
										key={transition.label}
										_label={transition.label}
										_icons={transition.icon}
										_variant={transition.variant}
										_on={{
											onClick: () => {
												applicationsStore.setStatus(application.id, transition.to, transition.note);
												toast.show({ type: toastType[transition.to], label: `${application.id}: ${STATUS[transition.to].label}`, description: transition.note });
											},
										}}
									/>
								))}
							{['bewilligt', 'abgelehnt'].includes(application.status) && <p className="muted small">{t('Der Antrag ist abgeschlossen.')}</p>}
						</FinkStack>
					</section>
				</FinkStack>
			)}
		</KolDrawer>
	);
}
