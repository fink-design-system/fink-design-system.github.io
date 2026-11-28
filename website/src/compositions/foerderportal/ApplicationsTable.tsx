import { FinkTableStateful } from '@fink-ui/react';
import { useMemo } from 'react';
import { t } from '../../i18n';
import { PROGRAMS, STATUS, dateDe, euro, type Application } from './data';

const PAGINATION = { _page: 1, _pageSize: 8 };

type Row = Application & Record<string, unknown>;

interface Props {
	label: string;
	rows: Application[];
	onOpen: (id: string) => void;
	pagination?: boolean;
	compact?: boolean;
}

/** Antragstabelle auf Basis von FinkTableStateful; die Statusspalte rendert fink-status. */
export function ApplicationsTable({ label, rows, onOpen, pagination = true, compact = false }: Props) {
	const headers = useMemo(() => {
		const columns = [
			{ label: t('Aktenzeichen'), key: 'id', sortable: true, width: 130 },
			{ label: t('Antragsteller'), key: 'applicant', sortable: true, width: 170 },
			...(compact
				? []
				: [
						{
							label: t('Programm'),
							key: 'program',
							sortable: true,
							width: 200,
							render: (_el: HTMLElement, cell: { label: string }) => PROGRAMS[cell.label as Application['program']]?.label ?? cell.label,
						},
					]),
			{
				label: t('Betrag'),
				key: 'amount',
				sortable: true,
				width: 110,
				textAlign: 'right' as const,
				render: (_el: HTMLElement, cell: { label: string }) => euro(Number(cell.label)),
				compareFn: (a: Record<string, unknown>, b: Record<string, unknown>) => Number(a.amount) - Number(b.amount),
			},
			...(compact
				? []
				: [{ label: t('Eingang'), key: 'received', sortable: true, width: 110, render: (_el: HTMLElement, cell: { label: string }) => dateDe(cell.label) }]),
			{
				label: t('Status'),
				key: 'status',
				sortable: true,
				width: 150,
				render: (el: HTMLElement, cell: { label: string }) => {
					const status = STATUS[cell.label as Application['status']];
					let badge = el.querySelector('fink-status') as (HTMLElement & { _label: string; _tone: string }) | null;
					if (!badge) {
						el.textContent = '';
						badge = document.createElement('fink-status') as HTMLElement & { _label: string; _tone: string };
						el.appendChild(badge);
					}
					badge._label = status?.label ?? cell.label;
					badge._tone = status?.tone ?? 'neutral';
				},
			},
			{
				label: t('Aktionen'),
				key: 'actions',
				width: 80,
				type: 'action' as const,
				actions: (row: Record<string, unknown>) => [
					{
						type: 'button' as const,
						_label: t('Details zu {{name}}', { name: String(row.id) }),
						_hideLabel: true,
						_icons: 'codicon codicon-chevron-right',
						_variant: 'tertiary',
						_on: { onClick: () => onOpen(String(row.id)) },
					},
				],
			},
		];
		return { horizontal: [columns] };
	}, [compact, onOpen]);

	return (
		<FinkTableStateful
			_label={label}
			_data={rows as Row[]}
			_headers={headers as never}
			_pagination={pagination ? PAGINATION : false}
			_paginationPosition="bottom"
		/>
	);
}
