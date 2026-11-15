import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { parseList } from '../../utils/shared';

export interface FinkListItem {
	id: string;
	/** Haupttext. */
	label: string;
	/** Zweite (und dritte) Zeile. */
	description?: string;
	/** Icon-Klassen vor dem Text. */
	icon?: string;
	/** Avatar vor dem Text (Name für Initialen, optional Bild-URL). */
	avatar?: { label: string; src?: string };
	/** Kurzer Text rechts, z. B. Datum oder Anzahl. */
	meta?: string;
	/** Zahl als Zähler-Badge rechts. */
	badge?: number;
	/** Macht den Eintrag zum Link. */
	href?: string;
	disabled?: boolean;
}

/**
 * Liste mit ein-, zwei- oder dreizeiligen Einträgen, führendem Icon oder Avatar und
 * Zusatzinfo rechts (MUI „List“, Vuetify „v-list“, Material 3 „Lists“).
 * Einträge sind statisch, Links (href) oder auswählbar (_selectable, Ereignis finkSelect).
 * Baut auf kol-icon und kol-avatar auf.
 */
@Component({
	tag: 'fink-list',
	styleUrl: 'list.css',
	shadow: true,
})
export class FinkList {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}

	/** Barrierefreie Bezeichnung der Liste. */
	@Prop() _label!: string;

	/** Einträge als Array oder JSON-String. */
	@Prop() _items!: FinkListItem[] | string;

	/** Einträge sind auswählbar (Navigationsliste); der gewählte steht in _value. */
	@Prop() _selectable?: boolean = false;

	/** ID des gewählten Eintrags. */
	@Prop({ mutable: true, reflect: true }) _value?: string;

	/** Dichte Darstellung mit geringerer Zeilenhöhe. */
	@Prop() _dense?: boolean = false;

	/** Trennlinien zwischen den Einträgen. */
	@Prop() _dividers?: boolean = false;

	/**
	 * Früher: maximale Zeilen der Beschreibung.
	 * @deprecated Ohne Wirkung – Beschreibungen werden nie mit „…“ gekürzt, sondern brechen vollständig um (WCAG 1.4.4, 1.4.12).
	 */
	@Prop() _lines?: 1 | 2 = 1;

	/** Liefert die ID des gewählten Eintrags. */
	@Event() finkSelect!: EventEmitter<string>;

	private select(item: FinkListItem) {
		if (item.disabled) return;
		this._value = item.id;
		this.finkSelect.emit(item.id);
	}

	private renderContent(item: FinkListItem, selected: boolean) {
		return [
			item.avatar ? (
				<kol-avatar class="lead lead--avatar" _label={item.avatar.label} _src={item.avatar.src}></kol-avatar>
			) : item.icon ? (
				<span class="lead lead--icon">
					<kol-icon _icons={item.icon} _label=""></kol-icon>
				</span>
			) : null,
			<span class="text">
				<span class="label">{item.label}</span>
				{item.description && <span class="description">{item.description}</span>}
			</span>,
			item.meta && <span class="meta">{item.meta}</span>,
			typeof item.badge === 'number' && item.badge > 0 && (
				<span class="badge">
					<span aria-hidden="true">{item.badge}</span>
					<span class="visually-hidden">{t('list.badge', { count: item.badge })}</span>
				</span>
			),
			selected && <kol-icon class="check" _icons="codicon codicon-check" _label=""></kol-icon>,
		];
	}

	render() {
		const items = parseList<FinkListItem>(this._items);
		return (
			<ul
				class={{ list: true, 'list--dense': !!this._dense, 'list--dividers': !!this._dividers, 'list--two-lines': this._lines === 2 }}
				aria-label={this._label}
			>
				{items.map((item) => {
					const selected = !!this._selectable && item.id === this._value;
					const cls = { item: true, 'item--selected': selected, 'item--disabled': !!item.disabled, 'item--interactive': !!item.href || !!this._selectable };
					if (item.href) {
						return (
							<li class="row">
								{item.disabled ? (
									// Deaktivierter Link: kein Linkziel, daher kein (scheinbar bedienbares) a-Element.
									<span class={cls}>{this.renderContent(item, selected)}</span>
								) : (
									<a class={cls} href={item.href} aria-current={selected ? 'page' : undefined} onClick={() => this._selectable && this.select(item)}>
										{this.renderContent(item, selected)}
									</a>
								)}
							</li>
						);
					}
					if (this._selectable) {
						return (
							<li class="row">
								<button type="button" class={cls} disabled={item.disabled} aria-pressed={selected ? 'true' : 'false'} onClick={() => this.select(item)}>
									{this.renderContent(item, selected)}
								</button>
							</li>
						);
					}
					return (
						<li class="row">
							<div class={cls}>{this.renderContent(item, false)}</div>
						</li>
					);
				})}
			</ul>
		);
	}
}
