import { Component, Element, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { parseList } from '../../utils/shared';

let uid = 0;

export interface FinkTransferItem {
	id: string;
	label: string;
	description?: string;
	disabled?: boolean;
}

/**
 * Zwei Listen, zwischen denen Einträge verschoben werden (MUI „Transfer List“, Ant „Transfer“,
 * Vuetify-Muster „Dual list“). Jede Seite hat Suche, „Alle auswählen“ und Zähler; das Verschieben
 * erfolgt über kol-button und wird angesagt. Auswahl über native Checkboxen.
 */
@Component({
	tag: 'fink-transfer-list',
	styleUrl: 'transfer-list.css',
	shadow: true,
})
export class FinkTransferList {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private readonly id = `fink-transfer-${++uid}`;

	private resizeObserver?: ResizeObserver;

	@Element() host!: HTMLElement;

	/** Listen untereinander statt nebeneinander (schmale Fläche). */
	@State() stacked = false;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
		if (typeof ResizeObserver !== 'undefined') {
			this.resizeObserver = new ResizeObserver(([entry]) => {
				const stacked = entry.contentRect.width < 544;
				if (stacked !== this.stacked) this.stacked = stacked;
			});
			this.resizeObserver.observe(this.host);
		}
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
		this.resizeObserver?.disconnect();
	}

	/** Bezeichnung des Ganzen. */
	@Prop() _label!: string;

	/** Alle Einträge als Array oder JSON-String. */
	@Prop() _items!: FinkTransferItem[] | string;

	/** IDs der Einträge auf der rechten Seite (gewählt). */
	@Prop({ mutable: true }) _value?: string[] | string = [];

	/** Überschrift der linken Liste. */
	@Prop() _sourceLabel?: string;

	/** Überschrift der rechten Liste. */
	@Prop() _targetLabel?: string;

	/** Suchfelder über den Listen. */
	@Prop() _searchable?: boolean = true;

	/** Liefert die IDs der rechten Seite. */
	@Event() finkChange!: EventEmitter<string[]>;

	@State() checked = new Set<string>();
	@State() query: Record<'source' | 'target', string> = { source: '', target: '' };
	@State() status = '';

	private toggle(id: string) {
		const next = new Set(this.checked);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		this.checked = next;
	}

	private move(ids: string[], toTarget: boolean) {
		if (!ids.length) return;
		const value = parseList<string>(this._value);
		const next = toTarget ? [...value, ...ids.filter((id) => !value.includes(id))] : value.filter((id) => !ids.includes(id));
		this._value = next;
		const checked = new Set(this.checked);
		ids.forEach((id) => checked.delete(id));
		this.checked = checked;
		this.status = t(toTarget ? 'transfer.movedRight' : 'transfer.movedLeft', { count: ids.length });
		this.finkChange.emit(next);
	}

	private renderSide(side: 'source' | 'target', title: string, items: FinkTransferItem[]) {
		const q = this.query[side].trim().toLowerCase();
		const shown = q ? items.filter((item) => item.label.toLowerCase().includes(q)) : items;
		const selectable = shown.filter((item) => !item.disabled);
		const checkedHere = selectable.filter((item) => this.checked.has(item.id));
		const all = selectable.length > 0 && checkedHere.length === selectable.length;
		const headingId = `${this.id}-${side}`;
		return (
			<section class="side" aria-labelledby={headingId}>
				<header class="side-head">
					<label class="check">
						<input
							type="checkbox"
							checked={all}
							indeterminate={checkedHere.length > 0 && !all}
							disabled={selectable.length === 0}
							aria-label={t('transfer.selectAll', { label: title })}
							onChange={() => {
								const next = new Set(this.checked);
								selectable.forEach((item) => (all ? next.delete(item.id) : next.add(item.id)));
								this.checked = next;
							}}
						/>
					</label>
					<h3 class="side-title" id={headingId}>
						{title}
					</h3>
					<span class="count">{t('transfer.count', { selected: checkedHere.length, total: items.length })}</span>
				</header>
				{this._searchable && (
					<div class="search">
						<kol-input-text
							_label={t('transfer.search', { label: title })}
							_hideLabel
							_type="search"
							_icons={{ left: 'codicon codicon-search' }}
							_placeholder={t('transfer.searchPlaceholder')}
							_value={this.query[side]}
							_on={{ onInput: (_e: Event, v: unknown) => (this.query = { ...this.query, [side]: String(v ?? '') }) }}
						></kol-input-text>
					</div>
				)}
				<ul class="items" aria-labelledby={headingId}>
					{shown.length === 0 && <li class="empty">{t('transfer.empty')}</li>}
					{shown.map((item) => (
						<li>
							<label class={{ item: true, 'item--checked': this.checked.has(item.id), 'item--disabled': !!item.disabled }}>
								<input type="checkbox" checked={this.checked.has(item.id)} disabled={item.disabled} onChange={() => this.toggle(item.id)} />
								<span class="text">
									<span>{item.label}</span>
									{item.description && <span class="description">{item.description}</span>}
								</span>
							</label>
						</li>
					))}
				</ul>
			</section>
		);
	}

	render() {
		const items = parseList<FinkTransferItem>(this._items);
		const value = parseList<string>(this._value);
		const source = items.filter((item) => !value.includes(item.id));
		const target = value.map((id) => items.find((item) => item.id === id)).filter((item): item is FinkTransferItem => !!item);
		const toRight = source.filter((item) => this.checked.has(item.id)).map((item) => item.id);
		const toLeft = target.filter((item) => this.checked.has(item.id)).map((item) => item.id);
		return (
			<div class={{ transfer: true, 'transfer--stacked': this.stacked }} role="group" aria-label={this._label}>
				{this.renderSide('source', this._sourceLabel ?? t('transfer.source'), source)}
				<div class="actions">
					<kol-button _label={t('transfer.right', { count: toRight.length })} _hideLabel _icons={this.stacked ? 'codicon codicon-chevron-down' : 'codicon codicon-chevron-right'} _variant="secondary" _disabled={!toRight.length} _on={{ onClick: () => this.move(toRight, true) }}></kol-button>
					<kol-button _label={t('transfer.left', { count: toLeft.length })} _hideLabel _icons={this.stacked ? 'codicon codicon-chevron-up' : 'codicon codicon-chevron-left'} _variant="secondary" _disabled={!toLeft.length} _on={{ onClick: () => this.move(toLeft, false) }}></kol-button>
				</div>
				{this.renderSide('target', this._targetLabel ?? t('transfer.target'), target)}
				<span class="visually-hidden" role="status">
					{this.status}
				</span>
			</div>
		);
	}
}
