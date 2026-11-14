import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

/**
 * Lädt beim Erreichen des Endes weitere Einträge nach (Vuetify „v-infinite-scroll“,
 * MUI-Rezept „Infinite loading“, Ant-Muster „Load more“). Barrierearm: Neben dem automatischen
 * Laden gibt es immer die Schaltfläche „Mehr laden“ (kol-button), Ladezustand und Ende werden
 * angesagt; Tastatur- und Screenreader-Nutzende werden nicht in endlosen Inhalt gezogen.
 *
 * @slot - Die bereits geladenen Einträge.
 */
@Component({
	tag: 'fink-infinite-scroll',
	styleUrl: 'infinite-scroll.css',
	shadow: true,
})
export class FinkInfiniteScroll {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private observer?: IntersectionObserver;
	private sentinel?: HTMLElement;

	@Element() host!: HTMLElement;

	/** Es wird gerade geladen (von der Anwendung gesetzt). */
	@Prop() _loading?: boolean = false;

	/** Es gibt keine weiteren Einträge. */
	@Prop() _done?: boolean = false;

	/** Automatisch laden, wenn das Ende sichtbar wird; sonst nur per Schaltfläche. */
	@Prop() _auto?: boolean = true;

	/** Anzahl der bereits geladenen Einträge für die Ansage. */
	@Prop() _count?: number;

	/** Fordert weitere Einträge an. */
	@Event() finkLoad!: EventEmitter<void>;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	/** Steht das Ende nach dem Nachladen noch im Bild, sofort weiter laden (der Observer meldet keine Änderung). */
	@Watch('_loading')
	onLoading(loading: boolean) {
		if (loading || this._done || !this._auto) return;
		requestAnimationFrame(() => {
			const rect = this.sentinel?.getBoundingClientRect();
			if (rect && rect.top < window.innerHeight + 200 && rect.bottom > 0) this.finkLoad.emit();
		});
	}

	componentDidLoad() {
		this.observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting) && this._auto && !this._loading && !this._done) this.finkLoad.emit();
			},
			{ rootMargin: '0px 0px 200px 0px' },
		);
		if (this.sentinel) this.observer.observe(this.sentinel);
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
		this.observer?.disconnect();
	}

	render() {
		const status = this._loading ? t('infinite.loading') : this._done ? t('infinite.done') : typeof this._count === 'number' ? t('infinite.count', { count: this._count }) : '';
		return (
			<div class="infinite">
				<slot></slot>
				<div class="footer" ref={(el) => (this.sentinel = el)}>
					<kol-spin _show={!!this._loading} _label={t('infinite.loading')}></kol-spin>
					{!this._loading && !this._done && <kol-button _label={t('infinite.more')} _icons="codicon codicon-chevron-down" _variant="secondary" _on={{ onClick: () => this.finkLoad.emit() }}></kol-button>}
					{this._done && <p class="end">{t('infinite.done')}</p>}
				</div>
				<span class="visually-hidden" role="status">
					{status}
				</span>
			</div>
		);
	}
}
