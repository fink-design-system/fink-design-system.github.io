import { Component, Element, State, Event, EventEmitter, Prop, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { onColorContextChange, resolveColor } from '../../utils/resolve-color';

/**
 * Filter- und Eingabe-Chip auf KoliBri-Basis:
 * – umschaltbar: kol-input-checkbox in der Variante „button“ (Zustand als echte Checkbox),
 * – entfernbar: kol-badge mit Smart Button zum Entfernen.
 */
@Component({
	tag: 'fink-chip',
	styleUrl: 'chip.css',
	shadow: true,
})
export class FinkChip {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private unsubscribeColors?: () => void;

	@Element() host!: HTMLElement;

	@State() colors?: { backgroundColor: string; foregroundColor: string };

	private updateColors() {
		this.colors = { backgroundColor: resolveColor(this.host, 'var(--fink-color-secondary)'), foregroundColor: resolveColor(this.host, 'var(--fink-color-primary)') };
	}

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
		this.unsubscribeColors = onColorContextChange(() => requestAnimationFrame(() => this.updateColors()));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
		this.unsubscribeColors?.();
	}

	componentWillLoad() {
		this.updateColors();
	}
	/** Sichtbarer Text. */
	@Prop() _label!: string;

	/** Ausgewählt-Zustand eines umschaltbaren Chips. */
	@Prop({ mutable: true, reflect: true }) _selected?: boolean = false;

	/** Zeigt eine Entfernen-Schaltfläche statt umzuschalten. */
	@Prop() _removable?: boolean = false;

	/** Optionale Anzahl, z. B. Treffer pro Facette. */
	@Prop() _count?: number;

	/** Icon-Klassen der Icon-Fonts (nur entfernbare Chips). */
	@Prop() _icons?: string;

	/** Deaktiviert den Chip. */
	@Prop() _disabled?: boolean = false;

	/** Wird beim Umschalten ausgelöst; liefert den neuen Zustand. */
	@Event() finkToggle!: EventEmitter<boolean>;

	/** Wird beim Entfernen ausgelöst. */
	@Event() finkRemove!: EventEmitter<void>;

	render() {
		const label = typeof this._count === 'number' ? `${this._label} (${this._count})` : this._label;
		if (this._removable) {
			return (
				<kol-badge
					class="chip chip--removable"
					_label={label}
					_icons={this._icons}
					_color={this.colors}
					_smartButton={{
						_label: t('chip.remove', { label: this._label }),
						_icons: 'codicon codicon-close',
						_hideLabel: true,
						_disabled: this._disabled,
						_on: { onClick: () => this.finkRemove.emit() },
					}}
				></kol-badge>
			);
		}
		return (
			<kol-input-checkbox
				class={{ chip: true, 'chip--selected': !!this._selected }}
				_label={label}
				_variant="button"
				_checked={this._selected}
				_disabled={this._disabled}
				_on={{
					onChange: (_event: Event, value: unknown) => {
						this._selected = Boolean(value);
						this.finkToggle.emit(this._selected);
					},
				}}
			></kol-input-checkbox>
		);
	}
}
