import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { parseList } from '../../utils/shared';

/**
 * Mehrfachauswahl als Tags mit Vorschlägen und freier Eingabe (MUI „Autocomplete multiple“,
 * Vuetify „v-combobox chips“, Ant „Select mode=tags“, Carbon „MultiSelect“).
 * Eingabefeld ist kol-input-text mit _suggestions, gewählte Werte sind entfernbare fink-chip.
 * Tastatur: Enter oder Komma übernimmt, Rücktaste im leeren Feld entfernt den letzten Tag.
 */
@Component({
	tag: 'fink-tag-input',
	styleUrl: 'tag-input.css',
	shadow: true,
})
export class FinkTagInput {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}

	/** Bezeichnung des Felds. */
	@Prop() _label!: string;

	/** Gewählte Werte als Array oder JSON-String. */
	@Prop({ mutable: true }) _value?: string[] | string = [];

	/** Vorschläge als Array oder JSON-String. */
	@Prop() _options?: string[] | string = [];

	/** Erlaubt Werte, die nicht in den Vorschlägen stehen. */
	@Prop() _allowCustom?: boolean = true;

	/** Höchstzahl an Tags. */
	@Prop() _max?: number;

	/** Hinweistext unter dem Feld. */
	@Prop() _hint?: string;

	/** Platzhalter im Eingabefeld. */
	@Prop() _placeholder?: string;

	/** Deaktiviert das Feld. */
	@Prop() _disabled?: boolean = false;

	/** Liefert die neue Liste der Werte. */
	@Event() finkChange!: EventEmitter<string[]>;

	@State() draft = '';
	@State() status = '';
	@State() error = '';

	private values(): string[] {
		return parseList<string>(this._value);
	}

	private options(): string[] {
		return parseList<string>(this._options);
	}

	private commit(next: string[], status: string) {
		this._value = next;
		this.status = status;
		this.finkChange.emit(next);
	}

	private add(raw: string) {
		const value = raw.trim().replace(/,$/, '').trim();
		if (!value) return;
		const values = this.values();
		const option = this.options().find((o) => o.toLowerCase() === value.toLowerCase());
		if (!option && !this._allowCustom) {
			this.error = t('tagInput.notAllowed', { value });
			return;
		}
		const label = option ?? value;
		if (values.some((v) => v.toLowerCase() === label.toLowerCase())) {
			this.error = t('tagInput.duplicate', { value: label });
			return;
		}
		if (this._max && values.length >= this._max) {
			this.error = t('tagInput.max', { count: this._max });
			return;
		}
		this.error = '';
		this.draft = '';
		this.commit([...values, label], t('tagInput.added', { value: label }));
	}

	private remove(label: string) {
		this.commit(
			this.values().filter((v) => v !== label),
			t('tagInput.removed', { value: label }),
		);
	}

	private readonly onKeyDown = (event: KeyboardEvent) => {
		const input = event.composedPath()[0] as HTMLInputElement;
		const current = input?.value ?? this.draft;
		if (event.key === 'Enter' || event.key === ',') {
			event.preventDefault();
			this.add(current);
		} else if (event.key === 'Backspace' && current === '') {
			const values = this.values();
			if (values.length) this.remove(values[values.length - 1]);
		}
	};

	private readonly onInput = (event: Event, value: unknown) => {
		const text = String(value ?? '');
		this.draft = text;
		this.error = '';
		// Nur die Auswahl aus der Vorschlagsliste (kein Tippen) übernimmt sofort.
		const inputType = (event as InputEvent).inputType;
		const picked = inputType === undefined || inputType === 'insertReplacementText';
		if (picked && this.options().some((o) => o === text)) this.add(text);
	};

	render() {
		const values = this.values();
		const suggestions = this.options().filter((o) => !values.includes(o));
		return (
			<div class="tag-input">
				<kol-input-text
					_label={this._label}
					_value={this.draft}
					_suggestions={suggestions}
					_placeholder={this._placeholder}
					_hint={this._hint ?? t('tagInput.hint')}
					_disabled={this._disabled || (!!this._max && values.length >= this._max)}
					_msg={this.error ? { _type: 'error', _description: this.error } : undefined}
					_touched={!!this.error}
					_on={{ onInput: this.onInput, onKeyDown: this.onKeyDown }}
				></kol-input-text>
				{values.length > 0 && (
					<ul class="tags" aria-label={t('tagInput.selected', { label: this._label })}>
						{values.map((value) => (
							<li>
								<fink-chip _label={value} _removable _disabled={this._disabled} onFinkRemove={() => this.remove(value)}></fink-chip>
							</li>
						))}
					</ul>
				)}
				<span class="visually-hidden" role="status">
					{this.status}
				</span>
			</div>
		);
	}
}
