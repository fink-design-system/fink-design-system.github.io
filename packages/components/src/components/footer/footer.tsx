import { Component, State, Prop, h } from '@stencil/core';
import { parseList } from '../../utils/shared';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

export interface FinkFooterLink {
	label: string;
	href: string;
}

export interface FinkFooterColumn {
	heading: string;
	links: FinkFooterLink[];
}

/**
 * Seitenfuß mit Linkspalten, Pflichtangaben (Impressum, Datenschutz, Barrierefreiheit) und Copyright.
 * Alle Links sind kol-link.
 *
 * @slot brand - Logo oder Organisationsname.
 */
@Component({
	tag: 'fink-footer',
	styleUrl: 'footer.css',
	shadow: true,
})
export class FinkFooter {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}
	/** Linkspalten als Array oder JSON-String. */
	@Prop() _columns?: FinkFooterColumn[] | string;

	/** Pflichtlinks in der unteren Zeile. */
	@Prop() _legal?: FinkFooterLink[] | string;

	/** Copyright- bzw. Herausgeberzeile. */
	@Prop() _copyright?: string;

	render() {
		const columns = parseList<FinkFooterColumn>(this._columns);
		const legal = parseList<FinkFooterLink>(this._legal);
		return (
			<footer class="footer">
				<div class="top">
					<div class="brand">
						<slot name="brand"></slot>
					</div>
					{columns.map((column) => (
						<nav class="column" aria-label={column.heading}>
							<p class="heading">{column.heading}</p>
							<ul>
								{column.links.map((link) => (
									<li>
										<kol-link _href={link.href} _label={link.label}></kol-link>
									</li>
								))}
							</ul>
						</nav>
					))}
				</div>
				<div class="bottom">
					{legal.length > 0 && (
						<nav aria-label={t('footer.legal')}>
							<ul class="legal">
								{legal.map((link) => (
									<li>
										<kol-link _href={link.href} _label={link.label}></kol-link>
									</li>
								))}
							</ul>
						</nav>
					)}
					{this._copyright && <p class="copyright">{this._copyright}</p>}
				</div>
			</footer>
		);
	}
}
