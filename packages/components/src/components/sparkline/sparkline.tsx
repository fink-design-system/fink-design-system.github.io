import { Component, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { parseList } from '../../utils/shared';

let uid = 0;

/**
 * Kleiner Verlaufsgraph ohne Achsen für Tabellen, Kennzahlen und Listen (Vuetify „v-sparkline“,
 * MUI X „SparkLineChart“, Carbon „Sparkline“). Linie, Fläche oder Balken; der Name fasst
 * Start, Ende, Minimum und Maximum zusammen, damit die Aussage nicht nur visuell ist.
 */
@Component({
	tag: 'fink-sparkline',
	styleUrl: 'sparkline.css',
	shadow: true,
})
export class FinkSparkline {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private readonly id = `fink-spark-${++uid}`;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}

	/** Was die Werte zeigen, z. B. „Anträge pro Woche“. */
	@Prop() _label!: string;

	/** Werte als Array oder JSON-String. */
	@Prop() _values!: number[] | string;

	/** Darstellung. */
	@Prop() _type?: 'line' | 'area' | 'bar' = 'area';

	/** Farbton. */
	@Prop() _tone?: 'brand' | 'success' | 'warning' | 'danger' | 'info' = 'brand';

	/** Zeigt den letzten Wert als Zahl daneben. */
	@Prop() _showValue?: boolean = false;

	/** Einheit für Beschriftung und Ansage. */
	@Prop() _unit?: string;

	private format(value: number) {
		const text = value.toLocaleString(this.locale === 'en' ? 'en-GB' : 'de-DE', { maximumFractionDigits: 1 });
		return this._unit ? `${text} ${this._unit}` : text;
	}

	render() {
		const values = parseList<number>(this._values).map(Number).filter((v) => Number.isFinite(v));
		if (values.length === 0) return null;
		const w = 100;
		const ht = 32;
		const pad = 2;
		const min = Math.min(...values);
		const max = Math.max(...values);
		const span = max - min || 1;
		const x = (i: number) => (values.length === 1 ? w / 2 : (i / (values.length - 1)) * w);
		const y = (v: number) => pad + (1 - (v - min) / span) * (ht - pad * 2);
		const line = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(2)},${y(v).toFixed(2)}`).join(' ');
		const first = values[0];
		const last = values[values.length - 1];
		const summary = t('sparkline.summary', { label: this._label, first: this.format(first), last: this.format(last), min: this.format(min), max: this.format(max), count: values.length });
		const barWidth = w / values.length;
		return (
			<span class={{ spark: true, [`tone--${this._tone ?? 'brand'}`]: true }}>
				<svg class="chart" viewBox={`0 0 ${w} ${ht}`} preserveAspectRatio="none" role="img" aria-labelledby={`${this.id}-t`}>
					<title id={`${this.id}-t`}>{summary}</title>
					{this._type === 'bar' ? (
						values.map((v, i) => <rect class="bar" x={i * barWidth + barWidth * 0.15} y={y(v)} width={barWidth * 0.7} height={ht - y(v)} rx="0.8"></rect>)
					) : (
						[
							this._type === 'area' && <path class="area" d={`${line} L${w},${ht} L0,${ht} Z`}></path>,
							<path class="line" d={line} vector-effect="non-scaling-stroke"></path>,
						]
					)}
				</svg>
				{this._showValue && (
					<span class="value" aria-hidden="true">
						{this.format(last)}
					</span>
				)}
			</span>
		);
	}
}
