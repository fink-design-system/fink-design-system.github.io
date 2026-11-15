import { Component, Element, Event, EventEmitter, Prop, h } from '@stencil/core';
import { parseList } from '../../utils/shared';

export interface FinkSegment {
	value: string;
	label: string;
	icon?: string;
	/** Nur Icon anzeigen; das Label bleibt für Screenreader erhalten. */
	hideLabel?: boolean;
}

/**
 * Segmentierte Auswahl für 2–5 sich ausschließende Optionen, z. B. Listen- oder Kachelansicht
 * (Material „Segmented button“, MUI „Toggle Button“, Vuetify „v-btn-toggle“). Tastatur: Pfeiltasten.
 */
@Component({
	tag: 'fink-segmented',
	styleUrl: 'segmented.css',
	shadow: true,
})
export class FinkSegmented {
	@Element() host!: HTMLElement;

	/** Gruppenbezeichnung. */
	@Prop() _label!: string;

	/** Optionen als Array oder JSON-String. */
	@Prop() _options!: FinkSegment[] | string;

	/** Gewählter Wert. */
	@Prop({ mutable: true, reflect: true }) _value?: string;

	/** Blendet das sichtbare Gruppenlabel aus. */
	@Prop() _hideLabel?: boolean = false;

	/** Liefert den neu gewählten Wert. */
	@Event() finkChange!: EventEmitter<string>;

	private select(value: string, focus = false) {
		this._value = value;
		this.finkChange.emit(value);
		if (focus) {
			requestAnimationFrame(() => (this.host.shadowRoot?.querySelector('[aria-checked="true"]') as HTMLElement | null)?.focus());
		}
	}

	private onKeyDown(event: KeyboardEvent, options: FinkSegment[]) {
		const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0;
		if (!step) return;
		event.preventDefault();
		const index = Math.max(0, options.findIndex((o) => o.value === this._value));
		this.select(options[(index + step + options.length) % options.length].value, true);
	}

	render() {
		const options = parseList<FinkSegment>(this._options);
		const current = options.some((o) => o.value === this._value) ? this._value : options[0]?.value;
		return (
			<div class="group">
				<span class={{ legend: true, 'visually-hidden': !!this._hideLabel }} id="label">
					{this._label}
				</span>
				<div class="segments" role="radiogroup" aria-labelledby="label">
					{options.map((option) => {
						const checked = option.value === current;
						return (
							<button
								class={{ segment: true, 'segment--checked': checked }}
								type="button"
								role="radio"
								aria-checked={checked ? 'true' : 'false'}
								aria-label={option.hideLabel ? option.label : undefined}
								title={option.hideLabel ? option.label : undefined}
								tabindex={checked ? 0 : -1}
								onClick={() => this.select(option.value)}
								onKeyDown={(event) => this.onKeyDown(event, options)}
							>
								{checked && <kol-icon class="check" _icons="codicon codicon-check" _label=""></kol-icon>}
								{option.icon && !checked && <kol-icon _icons={option.icon} _label=""></kol-icon>}
								{!option.hideLabel && <span>{option.label}</span>}
							</button>
						);
					})}
				</div>
			</div>
		);
	}
}
