import { FinkButton, FinkEmptyState, FinkInputText, FinkPageHeader, FinkPanel, FinkSingleSelect, FinkStatus, FinkToolbar, useToast } from '@fink-ui/react';
import { useMemo, useState } from 'react';
import { t } from '../../i18n';
import { ApplicationsTable } from './ApplicationsTable';
import { PROGRAMS, STATUS, STATUS_ORDER, euro, type Application, type ProgramId } from './data';

interface Props {
	applications: Application[];
	onNew: () => void;
	onOpen: (id: string) => void;
}

const statusOptions = [{ label: t('Alle Status'), value: 'all' }, ...STATUS_ORDER.map((status) => ({ label: STATUS[status].label, value: status }))];
const programOptions = [
	{ label: t('Alle Programme'), value: 'all' },
	...(Object.keys(PROGRAMS) as ProgramId[]).map((id) => ({ label: PROGRAMS[id].label, value: id })),
];

export function ApplicationsView({ applications, onNew, onOpen }: Props) {
	const toast = useToast();
	const [query, setQuery] = useState('');
	const [status, setStatus] = useState('all');
	const [program, setProgram] = useState('all');

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return applications.filter(
			(app) =>
				(status === 'all' || app.status === status) &&
				(program === 'all' || app.program === program) &&
				(q === '' || [app.id, app.applicant, app.contact, app.city].some((text) => text.toLowerCase().includes(q))),
		);
	}, [applications, query, status, program]);

	const sum = filtered.reduce((total, app) => total + app.amount, 0);
	const active = query !== '' || status !== 'all' || program !== 'all';
	const reset = () => {
		setQuery('');
		setStatus('all');
		setProgram('all');
	};

	const exportCsv = () => {
		const header = 'Aktenzeichen;Antragsteller;Programm;Betrag;Eingang;Status';
		const lines = filtered.map((app) => [app.id, app.applicant, PROGRAMS[app.program].label, app.amount, app.received, STATUS[app.status].label].join(';'));
		const blob = new Blob([[header, ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = 'antraege.csv';
		link.click();
		URL.revokeObjectURL(url);
		toast.show({ type: 'success', label: t('Export erstellt'), description: `${filtered.length} Anträge als CSV heruntergeladen.` });
	};

	return (
		<>
			<FinkPageHeader _heading={t('Anträge')} _description={t('Alle Anträge im Förderportal. Filtere, sortiere und öffne Details.')}>
				<FinkButton
					slot="actions"
					_label={t('Exportieren')}
					_icons="codicon codicon-desktop-download"
					_disabled={filtered.length === 0}
					_on={{ onClick: exportCsv }}
				/>
				<FinkButton slot="actions" _label={t('Neuer Antrag')} _variant="primary" _icons="codicon codicon-add" _on={{ onClick: onNew }} />
				<FinkStatus slot="meta" _label={t('{{count}} Treffer', { count: filtered.length })} _tone="brand" />
				<FinkStatus slot="meta" _label={t('Summe {{sum}}', { sum: euro(sum) })} _tone="neutral" />
			</FinkPageHeader>

			<FinkPanel _heading={t('Filter')} _level={2}>
				{active && (
					<FinkButton slot="actions" _label={t('Filter zurücksetzen')} _icons="codicon codicon-clear-all" _variant="tertiary" _on={{ onClick: reset }} />
				)}
				<div className="catalog-filter" role="search" style={{ marginBottom: 0 }}>
					<FinkInputText
						_label={t('Suche')}
						_type="search"
						_placeholder={t('Aktenzeichen, Name oder Ort')}
						_icons="codicon codicon-search"
						_value={query}
						_on={{ onInput: (_e, value) => setQuery(String(value ?? '')) }}
					/>
					<FinkSingleSelect
						_label={t('Status')}
						_options={statusOptions}
						_value={status}
						_on={{ onChange: (_e, value) => setStatus(String(value ?? 'all')) }}
					/>
					<FinkSingleSelect
						_label={t('Programm')}
						_options={programOptions}
						_value={program}
						_on={{ onChange: (_e, value) => setProgram(String(value ?? 'all')) }}
					/>
				</div>
			</FinkPanel>

			<p className="visually-hidden" aria-live="polite">
				{t('{{count}} Anträge gefunden', { count: filtered.length })}
			</p>

			<div style={{ marginTop: 'var(--fink-space-5)' }}>
				{filtered.length === 0 ? (
					<FinkEmptyState
						_heading={t('Keine Anträge gefunden')}
						_description={t('Mit den aktuellen Filtern gibt es keine Treffer. Passe die Suche an oder setze die Filter zurück.')}
					>
						<FinkButton _label={t('Filter zurücksetzen')} _variant="primary" _on={{ onClick: reset }} />
					</FinkEmptyState>
				) : (
					<FinkPanel _heading={t('Ergebnisse')} _description={t('Klicke auf den Pfeil, um einen Antrag zu öffnen.')} _flush>
						<FinkToolbar
							slot="actions"
							_label={t('Tabellenaktionen')}
							_items={[
								{ type: 'button', _label: t('Exportieren'), _icons: 'codicon codicon-desktop-download', _on: { onClick: exportCsv } },
								{ type: 'button', _label: t('Drucken'), _icons: 'codicon codicon-file-pdf', _on: { onClick: () => window.print() } },
							]}
						/>
						<ApplicationsTable label={t('Anträge')} rows={filtered} onOpen={onOpen} />
					</FinkPanel>
				)}
			</div>
		</>
	);
}
