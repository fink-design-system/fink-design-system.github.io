import {
	FinkGrid,
	FinkPageHeader,
	FinkPanel,
	FinkStack,
	FinkStatCard,
	KolButton,
	KolLinkButton,
	KolMeter,
	KolProgress,
} from '@fink/react';
import { PROGRAMS, STATUS, STATUS_ORDER, euroCompact, type Application, type ProgramId } from './data';
import { ApplicationsTable } from './ApplicationsTable';
import { t } from '../../i18n';

interface Props {
	applications: Application[];
	onNew: () => void;
	onOpen: (id: string) => void;
}

export function Overview({ applications, onNew, onOpen }: Props) {
	const open = applications.filter((app) => ['neu', 'pruefung', 'rueckfrage'].includes(app.status));
	const approved = applications.filter((app) => app.status === 'bewilligt');
	const decided = applications.filter((app) => ['bewilligt', 'abgelehnt'].includes(app.status));
	const queries = applications.filter((app) => app.status === 'rueckfrage');
	const approvedSum = approved.reduce((sum, app) => sum + app.amount, 0);
	const quote = decided.length ? Math.round((approved.length / decided.length) * 100) : 0;
	const latest = [...applications].sort((a, b) => b.received.localeCompare(a.received)).slice(0, 5);

	return (
		<>
			<FinkPageHeader _heading={t('Guten Tag, Jonas')} _description={t('Der aktuelle Stand im Förderportal auf einen Blick.')}>
				<KolButton slot="actions" _label={t('Neuer Antrag')} _variant="primary" _icons="codicon codicon-add" _on={{ onClick: onNew }} />
			</FinkPageHeader>

			<FinkStack _gap="6">
				<FinkGrid _min="9.5rem">
					<FinkStatCard _label={t('Offene Anträge')} _value={String(open.length)} _trend={12.5} _trendLabel={t('ggü. Vormonat')} _icons="codicon codicon-inbox" />
					<FinkStatCard _label={t('Bewilligte Mittel')} _value={euroCompact(approvedSum)} _trend={4.2} _trendLabel={t('ggü. Vormonat')} _icons="codicon codicon-pass" _tone="success" />
					<FinkStatCard _label={t('Offene Rückfragen')} _value={String(queries.length)} _trend={-20} _trendLabel={t('ggü. Vorwoche')} _trendInverted _icons="codicon codicon-comment-discussion" _tone="warning" />
					<FinkStatCard _label={t('Bewilligungsquote')} _value={`${quote} %`} _icons="codicon codicon-graph" _tone="info" />
				</FinkGrid>

				<FinkPanel _heading={t('Neueste Anträge')} _description={t('Die fünf zuletzt eingegangenen Anträge')} _flush>
					<KolLinkButton slot="actions" _label={t('Alle Anträge')} _href="#/compositions/foerderportal/applications" _variant="tertiary" _icons={{ right: 'codicon codicon-arrow-right' }} />
					<ApplicationsTable label={t('Neueste Anträge')} rows={latest} onOpen={onOpen} pagination={false} />
				</FinkPanel>
				<FinkGrid _min="22rem" _gap="5">
					<FinkPanel _heading={t('Status-Verteilung')} _description={t('{{count}} Anträge insgesamt', { count: applications.length })}>
						<FinkStack _gap="3">
							{STATUS_ORDER.map((status) => {
								const count = applications.filter((app) => app.status === status).length;
								return <KolProgress key={status} _label={STATUS[status].label} _value={count} _max={Math.max(1, applications.length)} _unit={t('Anträge')} _variant="bar" />;
							})}
						</FinkStack>
					</FinkPanel>
					<FinkPanel _heading={t('Mittelabruf nach Programm')} _description={t('Bewilligte Summe im Verhältnis zum Jahresbudget')}>
						<FinkStack _gap="3">
							{(Object.keys(PROGRAMS) as ProgramId[]).map((id) => {
								const used = approved.filter((app) => app.program === id).reduce((sum, app) => sum + app.amount, 0);
								return (
									<KolMeter
										key={id}
										_min={0}
										_low={30}
										_high={90}
										_optimum={60}
										_label={t('{{program}} · {{used}} von {{budget}}', { program: PROGRAMS[id].label, used: euroCompact(used), budget: euroCompact(PROGRAMS[id].budget) })}
										_value={Math.round((used / PROGRAMS[id].budget) * 100)}
										_max={100}
										_unit="%"
									/>
								);
							})}
						</FinkStack>
					</FinkPanel>
				</FinkGrid>
			</FinkStack>
		</>
	);
}
