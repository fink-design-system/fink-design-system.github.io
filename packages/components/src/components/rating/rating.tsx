import { Component, Event, EventEmitter, Listen, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

let uid = 0;

/**
 * Sternebewertung als Radiogruppe (MUI „Rating“, Vuetify „v-rating“).
 * Tastatur: Pfeiltasten wie bei nativen Radiobuttons.
 */
@Component({
	tag: 'fink-rating',
	styleUrl: 'rating.css',
	shadow: true,
})
export class FinkRating {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}
	private readonly name = `fink-rating-${++uid}`;

	/** Bezeichnung der Bewertung. */
	@Prop() _label!: string;

	/** Aktueller Wert (0 = keine Bewertung). */
	@Prop({ mutable: true, reflect: true }) _value?: number = 0;

	/** Höchstwert. */
	@Prop() _max?: number = 5;

	/** Nur anzeigen, nicht bewerten. */
	@Prop() _readOnly?: boolean = false;

	@State() hover = 0;

	/** Liefert den neuen Wert. */
	@Event() finkChange!: EventEmitter<number>;

	/** Vorschau beim Überfahren mit der Maus (rein visuell; Tastatur und Screenreader nutzen die Radiobuttons). */
	@Listen('mouseover')
	handleHover(event: MouseEvent) {
		if (this._readOnly) return;
		const label = event.composedPath().find((node): node is HTMLElement => node instanceof HTMLElement && !!node.dataset?.value);
		this.hover = label ? Number(label.dataset.value) : 0;
	}

	@Listen('mouseleave')
	handleLeave() {
		this.hover = 0;
	}

	render() {
		const max = Math.max(1, this._max ?? 5);
		const value = this._value ?? 0;
		const shown = this.hover || value;
		if (this._readOnly) {
			return (
				<span class="rating rating--readonly" role="img" aria-label={t('rating.summary', { label: this._label, value, max })}>
					{Array.from({ length: max }, (_, i) => (
						<kol-icon class={{ star: true, 'star--on': i < value }} _icons={i < value ? 'codicon codicon-star-full' : 'codicon codicon-star-empty'} _label=""></kol-icon>
					))}
				</span>
			);
		}
		return (
			<fieldset class="rating">
				<legend class="legend">{this._label}</legend>
				<div class="stars">
					{Array.from({ length: max }, (_, i) => {
						const n = i + 1;
						return (
							<label class={{ star: true, 'star--on': n <= shown }} data-value={n}>
								<input
									class="visually-hidden"
									type="radio"
									name={this.name}
									value={String(n)}
									checked={n === value}
									onChange={() => {
										this._value = n;
										this.finkChange.emit(n);
									}}
								/>
								<kol-icon _icons={n <= shown ? 'codicon codicon-star-full' : 'codicon codicon-star-empty'} _label=""></kol-icon>
								<span class="visually-hidden">
									{t('rating.star', { count: n })}
								</span>
							</label>
						);
					})}
					<span class="value" aria-hidden="true">
						{value ? `${value}/${max}` : ''}
					</span>
				</div>
			</fieldset>
		);
	}
}
