import { Component, Event, EventEmitter, Prop, h } from '@stencil/core';
import { parseList } from '../../utils/shared';

export interface FinkSummaryItem {
	/** Eindeutige Kennung; Standard ist der Schlüssel. */
	id?: string;
	key: string;
	value: string;
	/** Text der Aktion, z. B. „Ändern“. */
	actionLabel?: string;
}

/**
 * Schlüssel-Wert-Liste für Detailansichten und „Antworten prüfen“ – optional mit Ändern-Aktion pro Zeile.
 * Die Aktion ist ein kol-button-link; der Feldname wird als Beschreibung vorgelesen.
 */
@Component({
	tag: 'fink-summary-list',
	styleUrl: 'summary-list.css',
	shadow: true,
})
export class FinkSummaryList {
	/** Zeilen als Array oder JSON-String. */
	@Prop() _items!: FinkSummaryItem[] | string;

	/** Blendet alle Aktionen aus. */
	@Prop() _readOnly?: boolean = false;

	/** Ohne Rahmenlinien zwischen den Zeilen. */
	@Prop() _plain?: boolean = false;

	/** Wird bei Klick auf die Aktion einer Zeile ausgelöst; liefert deren id. */
	@Event() finkAction!: EventEmitter<string>;

	render() {
		const items = parseList<FinkSummaryItem>(this._items);
		return (
			<dl class={{ list: true, 'list--plain': !!this._plain }}>
				{items.map((item) => (
					<div class="row">
						<dt class="key">{item.key}</dt>
						<dd class="value">{item.value || '–'}</dd>
						{!this._readOnly && item.actionLabel && (
							<dd class="action">
								<kol-button-link
									_label={item.actionLabel}
									_ariaDescription={item.key}
									_on={{ onClick: () => this.finkAction.emit(item.id ?? item.key) }}
								></kol-button-link>
							</dd>
						)}
					</div>
				))}
			</dl>
		);
	}
}
