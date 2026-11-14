import { Component, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange } from '../../i18n';
import { parseList } from '../../utils/shared';
import type { FinkTone } from '../../utils/tone';

export interface FinkBarDatum {
	label: string;
	value: number;
	tone?: FinkTone;
}

/**
 * Balkendiagramm, das zugleich eine echte Tabelle ist: Jede Zeile hat Beschriftung, Balken und
 * Wert, Screenreader lesen eine normale Datentabelle (MUI X „BarChart“, Vuetify-Muster
 * „Charts“, Carbon „Simple bar chart“). Werte stehen immer als Zahl neben dem Balken.
 */
@Component({
	tag: 'fink-bar-chart',
	styleUrl: 'bar-chart.css',
	shadow: true,
})
export class FinkBarChart {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}

	/** Titel des Diagramms (Tabellenüberschrift). */
	@Prop() _label!: string;

	/** Daten als Array oder JSON-String. */
	@Prop() _data!: FinkBarDatum[] | string;

	/** Spaltenüberschrift der Beschriftungen. */
	@Prop() _labelHeader?: string;

	/** Spaltenüberschrift der Werte. */
	@Prop() _valueHeader?: string;

	/** Einheit der Werte, z. B. „€“. */
	@Prop() _unit?: string;

	/** Skalenende; ohne Angabe der größte Wert. */
	@Prop() _max?: number;

	/** Absteigend nach Wert sortieren. */
	@Prop() _sorted?: boolean = false;

	private format(value: number) {
		const text = value.toLocaleString(this.locale === 'en' ? 'en-GB' : 'de-DE', { maximumFractionDigits: 1 });
		return this._unit ? `${text} ${this._unit}` : text;
	}

	render() {
		const data = parseList<FinkBarDatum>(this._data).filter((d) => Number.isFinite(Number(d.value)));
		const rows = this._sorted ? [...data].sort((a, b) => b.value - a.value) : data;
		const max = this._max ?? Math.max(1, ...rows.map((d) => d.value));
		return (
			<table class="chart">
				<caption class="caption">{this._label}</caption>
				<thead class="visually-hidden">
					<tr>
						<th scope="col">{this._labelHeader ?? ''}</th>
						<th scope="col">{this._valueHeader ?? ''}</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((d) => (
						<tr class={{ row: true, [`tone--${d.tone ?? 'brand'}`]: true }}>
							<th scope="row" class="label">
								{d.label}
							</th>
							<td>
								{/* Flex im Innern, damit die Zelle ihre Tabellensemantik behält. */}
								<span class="cell">
									<span class="track" aria-hidden="true">
										<span class="bar" style={{ width: `${Math.max(0, Math.min(100, (d.value / max) * 100))}%` }}></span>
									</span>
									<span class="value">{this.format(d.value)}</span>
								</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}
