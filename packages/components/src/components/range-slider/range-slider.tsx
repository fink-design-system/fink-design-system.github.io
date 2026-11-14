import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

let uid = 0;

/**
 * Bereichsregler mit zwei Griffen für Von-bis-Werte (MUI „Slider“ mit Bereich, Vuetify
 * „v-range-slider“, Carbon „Slider“ two handles, Ant „Slider range“). kol-input-range kennt
 * nur einen Wert; hier sind es zwei native Range-Eingaben auf einer gemeinsamen Spur, jede mit
 * eigenem Namen. Optional daneben zwei kol-input-number für exakte Eingabe.
 */
@Component({
	tag: 'fink-range-slider',
	styleUrl: 'range-slider.css',
	shadow: true,
})
export class FinkRangeSlider {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private readonly id = `fink-range-${++uid}`;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}

	/** Bezeichnung des Bereichs. */
	@Prop() _label!: string;

	/** Kleinster Wert. */
	@Prop() _min?: number = 0;

	/** Größter Wert. */
	@Prop() _max?: number = 100;

	/** Schrittweite. */
	@Prop() _step?: number = 1;

	/** Aktueller Bereich [von, bis]. */
	@Prop({ mutable: true }) _value?: [number, number] | string;

	/** Einheit hinter den Werten, z. B. „€“ oder „km“. */
	@Prop() _unit?: string;

	/** Zeigt Zahlenfelder für exakte Eingabe. */
	@Prop() _showInputs?: boolean = false;

	/** Hinweistext unter dem Regler. */
	@Prop() _hint?: string;

	/** Deaktiviert den Regler. */
	@Prop() _disabled?: boolean = false;

	/** Liefert den neuen Bereich [von, bis]. */
	@Event() finkChange!: EventEmitter<[number, number]>;

	private range(): [number, number] {
		const min = this._min ?? 0;
		const max = this._max ?? 100;
		let value = this._value;
		if (typeof value === 'string') {
			try {
				value = JSON.parse(value) as [number, number];
			} catch {
				value = undefined;
			}
		}
		const [a, b] = Array.isArray(value) ? value : [min, max];
		return [Math.max(min, Math.min(a, max)), Math.max(min, Math.min(b, max))];
	}

	private set(index: 0 | 1, raw: number) {
		const [from, to] = this.range();
		const next: [number, number] = index === 0 ? [Math.min(raw, to), to] : [from, Math.max(raw, from)];
		this._value = next;
		this.finkChange.emit(next);
	}

	private format(value: number) {
		const text = value.toLocaleString(this.locale === 'en' ? 'en-GB' : 'de-DE');
		return this._unit ? `${text} ${this._unit}` : text;
	}

	render() {
		const min = this._min ?? 0;
		const max = this._max ?? 100;
		const [from, to] = this.range();
		const frac = (v: number) => (v - min) / (max - min || 1);
		return (
			<fieldset class={{ range: true, 'range--disabled': !!this._disabled }} aria-describedby={this._hint ? `${this.id}-hint` : undefined}>
				<legend class="legend">{this._label}</legend>
				<p class="readout" aria-hidden="true">
					{this.format(from)} – {this.format(to)}
				</p>
				<div class="track" style={{ '--from': String(frac(from)), '--to': String(frac(to)) }}>
					<span class="fill"></span>
					<input
						class="thumb"
						type="range"
						min={min}
						max={max}
						step={this._step}
						value={from}
						disabled={this._disabled}
						aria-label={t('rangeSlider.from', { label: this._label })}
						aria-valuetext={this.format(from)}
						onInput={(e) => this.set(0, Number((e.target as HTMLInputElement).value))}
					/>
					<input
						class="thumb"
						type="range"
						min={min}
						max={max}
						step={this._step}
						value={to}
						disabled={this._disabled}
						aria-label={t('rangeSlider.to', { label: this._label })}
						aria-valuetext={this.format(to)}
						onInput={(e) => this.set(1, Number((e.target as HTMLInputElement).value))}
					/>
				</div>
				<div class="scale" aria-hidden="true">
					<span>{this.format(min)}</span>
					<span>{this.format(max)}</span>
				</div>
				{this._showInputs && (
					<div class="inputs">
						<kol-input-number _label={t('rangeSlider.fromShort')} _min={min} _max={to} _step={this._step} _value={from} _disabled={this._disabled} _on={{ onChange: (_e: Event, v: unknown) => this.set(0, Number(v)) }}></kol-input-number>
						<kol-input-number _label={t('rangeSlider.toShort')} _min={from} _max={max} _step={this._step} _value={to} _disabled={this._disabled} _on={{ onChange: (_e: Event, v: unknown) => this.set(1, Number(v)) }}></kol-input-number>
					</div>
				)}
				{this._hint && (
					<p class="hint" id={`${this.id}-hint`}>
						{this._hint}
					</p>
				)}
			</fieldset>
		);
	}
}
