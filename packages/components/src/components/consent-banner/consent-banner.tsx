import { Component, Element, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';
import { setViewportInset } from '../../utils/viewport-inset';
import { parseList } from '../../utils/shared';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

export interface FinkConsentCategory {
	id: string;
	label: string;
	description?: string;
	/** Notwendige Kategorien sind immer aktiv und nicht abwählbar. */
	required?: boolean;
}

/**
 * Einwilligungsbanner für Cookies und Tracking. „Alle akzeptieren“ und „Nur notwendige“ sind
 * gleichwertig gestaltet; die Einstellungen (kol-details) erlauben die Auswahl einzelner Kategorien.
 */
@Component({
	tag: 'fink-consent-banner',
	styleUrl: 'consent-banner.css',
	shadow: true,
})
export class FinkConsentBanner {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	@Element() host!: HTMLElement;

	private resizeObserver?: ResizeObserver;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	componentDidLoad() {
		// Das fest angeheftete Banner darf fokussierte Inhalte nicht verdecken (WCAG 2.4.11).
		if (typeof ResizeObserver !== 'undefined') {
			this.resizeObserver = new ResizeObserver(() => this.updateInset());
			this.resizeObserver.observe(this.host);
		}
		this.updateInset();
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
		this.resizeObserver?.disconnect();
		setViewportInset(this, 'bottom');
	}

	@Watch('_open')
	@Watch('_position')
	updateInset() {
		const fixed = this._open && (this._position ?? 'fixed') === 'fixed';
		const gap = fixed ? window.innerHeight - this.host.getBoundingClientRect().top : 0;
		setViewportInset(this, 'bottom', fixed ? gap + 8 : 0);
	}
	/** Überschrift. */
	@Prop() _heading?: string;

	/** Erklärender Text. */
	@Prop() _description?: string;

	/** Kategorien als Array oder JSON-String. */
	@Prop() _categories?: FinkConsentCategory[] | string;

	/** Sichtbarkeit des Banners. */
	@Prop({ mutable: true, reflect: true }) _open?: boolean = true;

	/** „fixed“ heftet das Banner an den unteren Rand, „inline“ bettet es in den Fluss ein. */
	@Prop({ reflect: true }) _position?: 'fixed' | 'inline' = 'fixed';

	@State() selected: string[] = [];

	/** Liefert die akzeptierten Kategorien, nachdem eine Entscheidung getroffen wurde. */
	@Event() finkConsent!: EventEmitter<string[]>;

	private get categories(): FinkConsentCategory[] {
		const list = parseList<FinkConsentCategory>(this._categories);
		return list.length
			? list
			: [
					{ id: 'necessary', label: t('consent.necessary'), description: t('consent.necessaryHint'), required: true },
					{ id: 'statistics', label: t('consent.statistics'), description: t('consent.statisticsHint') },
					{ id: 'comfort', label: t('consent.comfort'), description: t('consent.comfortHint') },
				];
	}

	private decide(ids: string[]) {
		const required = this.categories.filter((c) => c.required).map((c) => c.id);
		this.finkConsent.emit([...new Set([...required, ...ids])]);
		this._open = false;
	}

	private toggle(id: string, on: boolean) {
		this.selected = on ? [...this.selected, id] : this.selected.filter((value) => value !== id);
	}

	render() {
		const categories = this.categories;
		return (
			<Host hidden={!this._open}>
				<section class="banner" aria-label={this._heading ?? t('consent.heading')}>
					<div class="text">
						<kol-heading class="heading" _label={this._heading ?? t('consent.heading')} _level={2}></kol-heading>
						<p class="description">{this._description ?? t('consent.description')}</p>
					</div>
					<kol-details class="settings" _label={t('consent.settings')} _level={0}>
						<fieldset class="categories">
							<legend class="visually-hidden">{t('consent.categories')}</legend>
							{categories.map((category) => (
								<kol-input-checkbox
									_label={category.label}
									_hint={category.description}
									_variant="switch"
									_checked={category.required || this.selected.includes(category.id)}
									_disabled={category.required}
									_on={{ onChange: (_event: Event, value: unknown) => this.toggle(category.id, Boolean(value)) }}
								></kol-input-checkbox>
							))}
						</fieldset>
					</kol-details>
					<div class="actions">
						<kol-button _label={t('consent.acceptAll')} _variant="primary" _on={{ onClick: () => this.decide(categories.map((c) => c.id)) }}></kol-button>
						<kol-button _label={t('consent.necessaryOnly')} _variant="primary" _on={{ onClick: () => this.decide([]) }}></kol-button>
						<kol-button _label={t('consent.save')} _variant="secondary" _on={{ onClick: () => this.decide(this.selected) }}></kol-button>
					</div>
				</section>
			</Host>
		);
	}
}
