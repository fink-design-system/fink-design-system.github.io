import { FinkTableStateless } from '@fink-ui/react';
import { useMemo } from 'react';

export interface DocColumn {
	key: string;
	label: string;
	/** Rendert die Zelle als Code (monospace). */
	code?: boolean;
	/** Rendert die Zelle als fink-link; Wert ist [label, href]. */
	link?: boolean;
}

/** Doku-Tabelle auf Basis von fink-table-stateless. */
export function DocTable({ label, columns, rows }: { label: string; columns: DocColumn[]; rows: Array<Record<string, unknown>> }) {
	const headerCells = useMemo(
		() => ({
			horizontal: [
				columns.map((column) => ({
					key: column.key,
					label: column.label,
					// Spaltenbreiten in px: KoliBri leitet daraus die Mindestbreite der Tabelle ab, schmale Viewports scrollen waagerecht.
					width: column.code || column.link ? 130 : 220,
					render: column.link
						? (el: HTMLElement, cell: { label: string }) => {
								const [text, href] = String(cell.label).split('|');
								el.textContent = '';
								const link = document.createElement('fink-link') as HTMLElement & { _label: string; _href: string };
								link._label = text;
								link._href = href;
								el.appendChild(link);
							}
						: column.code
							? (el: HTMLElement, cell: { label: string }) => {
									el.textContent = '';
									const code = document.createElement('code');
									code.textContent = String(cell.label ?? '');
									el.appendChild(code);
								}
							: undefined,
				})),
			],
		}),
		[columns],
	);
	return <FinkTableStateless _label={label} _headers={headerCells} _data={rows} />;
}
