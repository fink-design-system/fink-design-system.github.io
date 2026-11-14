import { Component, State, Prop, h } from '@stencil/core';
import { FinkTone, normalizeTone } from '../../utils/tone';
import { formatNumber, getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

/**
 * Kennzahl-Kachel mit Wert, Trend und optionalem Icon.
 */
@Component({
	tag: 'fink-stat-card',
	styleUrl: 'stat-card.css',
	shadow: true,
})
export class FinkStatCard {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}
	/** Bezeichnung der Kennzahl. */
	@Prop() _label!: string;

	/** Formatierter Wert der Kennzahl. */
	@Prop() _value!: string;

	/** Veränderung in Prozent; positiv = gestiegen. */
	@Prop() _trend?: number;

	/** Bezugszeitraum des Trends, z. B. „ggü. Vormonat“. */
	@Prop() _trendLabel?: string;

	/** Kehrt die Bewertung um, wenn ein Anstieg negativ ist (z. B. Bearbeitungszeit). */
	@Prop() _trendInverted?: boolean = false;

	/** Icon-Klassen der Icon-Fonts, z. B. „codicon codicon-inbox“. */
	@Prop() _icons?: string;

	/** Farbton der Icon-Fläche. */
	@Prop() _tone?: FinkTone = 'brand';

	private renderTrend() {
		if (typeof this._trend !== 'number' || Number.isNaN(this._trend)) return null;
		const direction = this._trend > 0 ? 'up' : this._trend < 0 ? 'down' : 'flat';
		const good = direction === 'flat' ? null : (direction === 'up') !== this._trendInverted;
		const formatted = `${this._trend > 0 ? '+' : ''}${formatNumber(this._trend, { maximumFractionDigits: 1 })} %`;
		const spoken = direction === 'up' ? t('statCard.up') : direction === 'down' ? t('statCard.down') : t('statCard.flat');
		const arrow = direction === 'up' ? 'codicon codicon-arrow-up' : direction === 'down' ? 'codicon codicon-arrow-down' : 'codicon codicon-arrow-right';
		return (
			<p class={{ trend: true, 'trend--good': good === true, 'trend--bad': good === false }}>
				<kol-icon _icons={arrow} _label=""></kol-icon>
				<span class="visually-hidden">{spoken} </span>
				<span>{formatted}</span>
				{this._trendLabel && <span class="trend-label">{this._trendLabel}</span>}
			</p>
		);
	}

	render() {
		const tone = normalizeTone(this._tone, 'brand');
		return (
			<article class="card">
				<div class="head">
					<h3 class="label">{this._label}</h3>
					{this._icons && (
						<span class={`icon tone--${tone}`}>
							<kol-icon _icons={this._icons} _label=""></kol-icon>
						</span>
					)}
				</div>
				<p class="value">{this._value}</p>
				{this.renderTrend()}
			</article>
		);
	}
}
