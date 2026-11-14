import { Component, State, Event, EventEmitter, Prop, h } from '@stencil/core';
import { parseList } from '../../utils/shared';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

export interface FinkBottomNavItem {
	id: string;
	label: string;
	icon: string;
	/** Zähler, z. B. ungelesene Nachrichten. */
	badge?: number;
	href?: string;
}

/**
 * Untere Navigationsleiste für mobile Ansichten mit 3–5 Zielen (Material „Navigation bar“).
 */
@Component({
	tag: 'fink-bottom-nav',
	styleUrl: 'bottom-nav.css',
	shadow: true,
})
export class FinkBottomNav {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}
	/** Ziele als Array oder JSON-String. */
	@Prop() _items!: FinkBottomNavItem[] | string;

	/** Id des aktiven Ziels. */
	@Prop({ mutable: true }) _value?: string;

	/** Barrierefreie Bezeichnung. */
	@Prop() _label?: string;

	/** Wird bei Auswahl ausgelöst; liefert die id. */
	@Event() finkChange!: EventEmitter<string>;

	render() {
		const items = parseList<FinkBottomNavItem>(this._items);
		return (
			<nav class="bar" aria-label={this._label ?? t('bottomNav.label')}>
				<ul>
					{items.map((item) => {
						const active = item.id === this._value;
						const content = [
							<span class="indicator">
								<kol-icon _icons={item.icon} _label=""></kol-icon>
								{item.badge ? (
									<span class="badge" aria-hidden="true">
										{item.badge > 99 ? '99+' : item.badge}
									</span>
								) : null}
							</span>,
							<span class="label">
								{item.label}
								{item.badge ? <span class="visually-hidden">, {t('bottomNav.new', { count: item.badge })}</span> : null}
							</span>,
						];
						const select = () => {
							this._value = item.id;
							this.finkChange.emit(item.id);
						};
						return (
							<li>
								{item.href ? (
									<a class={{ item: true, 'item--active': active }} href={item.href} aria-current={active ? 'page' : undefined} onClick={select}>
										{content}
									</a>
								) : (
									<button class={{ item: true, 'item--active': active }} type="button" aria-current={active ? 'page' : undefined} onClick={select}>
										{content}
									</button>
								)}
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}
}
