import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { parseList } from '../../utils/shared';

export interface FinkVirtualItem {
	id: string;
	label: string;
	description?: string;
	meta?: string;
}

/**
 * Liste mit sehr vielen Einträgen, von denen nur die sichtbaren gerendert werden
 * (Vuetify „v-virtual-scroll“, MUI-Rezept „Virtualized List“, Ant „List virtual“).
 * Jede Zeile trägt aria-setsize und aria-posinset, damit Screenreader die Gesamtlänge kennen;
 * die Liste ist per Tastatur scrollbar, Pos1/Ende springen an Anfang und Ende.
 */
@Component({
	tag: 'fink-virtual-list',
	styleUrl: 'virtual-list.css',
	shadow: true,
})
export class FinkVirtualList {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private viewport?: HTMLElement;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}

	/** Bezeichnung der Liste. */
	@Prop() _label!: string;

	/** Einträge als Array oder JSON-String. */
	@Prop() _items!: FinkVirtualItem[] | string;

	/** Feste Zeilenhöhe in Pixeln. */
	@Prop() _itemHeight?: number = 56;

	/** Sichtbare Höhe der Liste (CSS-Länge). */
	@Prop() _height?: string = '24rem';

	/** Zeilen über und unter dem sichtbaren Bereich, die vorab gerendert werden. */
	@Prop() _overscan?: number = 6;

	/** Klick auf eine Zeile; liefert die ID. */
	@Event() finkSelect!: EventEmitter<string>;

	@State() scrollTop = 0;
	@State() viewportHeight = 384;

	componentDidLoad() {
		if (this.viewport) this.viewportHeight = this.viewport.clientHeight;
	}

	private readonly onScroll = () => {
		if (!this.viewport) return;
		this.scrollTop = this.viewport.scrollTop;
		this.viewportHeight = this.viewport.clientHeight;
	};

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (!this.viewport) return;
		if (event.key === 'Home') {
			event.preventDefault();
			this.viewport.scrollTop = 0;
		} else if (event.key === 'End') {
			event.preventDefault();
			this.viewport.scrollTop = this.viewport.scrollHeight;
		}
	};

	render() {
		const items = parseList<FinkVirtualItem>(this._items);
		const rowHeight = this._itemHeight ?? 56;
		const overscan = this._overscan ?? 6;
		const start = Math.max(0, Math.floor(this.scrollTop / rowHeight) - overscan);
		const end = Math.min(items.length, Math.ceil((this.scrollTop + this.viewportHeight) / rowHeight) + overscan);
		const visible = items.slice(start, end);
		return (
			<div class="wrap">
				<div
					class="viewport"
					style={{ height: this._height ?? '24rem' }}
					ref={(el) => (this.viewport = el)}
					onScroll={this.onScroll}
					onKeyDown={this.onKeyDown}
					tabindex="0"
					role="region"
					aria-label={t('virtualList.region', { label: this._label, count: items.length })}
				>
					<ul class="list" role="list" aria-label={this._label} style={{ height: `${items.length * rowHeight}px` }}>
						{visible.map((item, i) => {
							const index = start + i;
							return (
								<li
									class="row"
									role="listitem"
									aria-setsize={items.length}
									aria-posinset={index + 1}
									style={{ top: `${index * rowHeight}px`, height: `${rowHeight}px` }}
									key={item.id}
								>
									<button type="button" class="item" onClick={() => this.finkSelect.emit(item.id)}>
										<span class="text">
											<span class="label">{item.label}</span>
											{item.description && <span class="description">{item.description}</span>}
										</span>
										{item.meta && <span class="meta">{item.meta}</span>}
									</button>
								</li>
							);
						})}
					</ul>
				</div>
				<p class="footer" aria-hidden="true">
					{t('virtualList.rendered', { shown: visible.length, count: items.length.toLocaleString(this.locale === 'en' ? 'en-GB' : 'de-DE') })}
				</p>
			</div>
		);
	}
}
