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
 * die Liste ist per Tastatur scrollbar (Pfeiltasten, Bild auf/ab, Pos1/Ende).
 * Zeilen dürfen umbrechen: Ihre Höhe wird gemessen, Text wird nie mit „…“ gekürzt (WCAG 1.4.4, 1.4.12).
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

	/** Geschätzte Mindesthöhe einer Zeile in Pixeln; die tatsächliche Höhe wird gemessen. */
	@Prop() _itemHeight?: number = 56;

	/** Sichtbare Höhe der Liste (CSS-Länge). */
	@Prop() _height?: string = '24rem';

	/** Zeilen über und unter dem sichtbaren Bereich, die vorab gerendert werden. */
	@Prop() _overscan?: number = 6;

	/** Klick auf eine Zeile; liefert die ID. */
	@Event() finkSelect!: EventEmitter<string>;

	@State() scrollTop = 0;
	@State() viewportHeight = 384;
	/** Erhöht sich, wenn gemessene Zeilenhöhen von der Schätzung abweichen. */
	@State() measured = 0;

	/** Gemessene Zeilenhöhen nach ID. */
	private readonly heights = new Map<string, number>();

	componentDidLoad() {
		if (this.viewport) this.viewportHeight = this.viewport.clientHeight;
	}

	componentDidRender() {
		if (!this.viewport) return;
		let changed = false;
		this.viewport.querySelectorAll<HTMLElement>('li[data-id]').forEach((row) => {
			const id = row.dataset.id!;
			const height = row.offsetHeight;
			if (height && this.heights.get(id) !== height) {
				this.heights.set(id, height);
				changed = true;
			}
		});
		if (changed) this.measured++;
	}

	private readonly onScroll = () => {
		if (!this.viewport) return;
		this.scrollTop = this.viewport.scrollTop;
		this.viewportHeight = this.viewport.clientHeight;
	};

	render() {
		const items = parseList<FinkVirtualItem>(this._items);
		const estimate = this._itemHeight ?? 56;
		const overscan = this._overscan ?? 6;
		// Versatz jeder Zeile aus gemessenen (sonst geschätzten) Höhen.
		const offsets = new Array<number>(items.length + 1);
		offsets[0] = 0;
		items.forEach((item, i) => (offsets[i + 1] = offsets[i] + (this.heights.get(item.id) ?? estimate)));
		const indexAt = (y: number) => {
			let lo = 0;
			let hi = items.length;
			while (lo < hi) {
				const mid = (lo + hi) >> 1;
				if (offsets[mid + 1] <= y) lo = mid + 1;
				else hi = mid;
			}
			return lo;
		};
		const start = Math.max(0, indexAt(this.scrollTop) - overscan);
		const end = Math.min(items.length, indexAt(this.scrollTop + this.viewportHeight) + 1 + overscan);
		const visible = items.slice(start, end);
		return (
			<div class="wrap">
				<div
					class="viewport"
					style={{ height: this._height ?? '24rem' }}
					ref={(el) => (this.viewport = el)}
					onScroll={this.onScroll}
					tabindex="0"
					role="region"
					aria-label={t('virtualList.region', { label: this._label, count: items.length })}
				>
					<ul class="list" role="list" aria-label={this._label} style={{ height: `${offsets[items.length]}px` }}>
						{visible.map((item, i) => {
							const index = start + i;
							return (
								<li
									class="row"
									role="listitem"
									aria-setsize={items.length}
									aria-posinset={index + 1}
									style={{ top: `${offsets[index]}px`, minHeight: `${estimate}px` }}
									key={item.id}
									data-id={item.id}
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
