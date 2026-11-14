import { Component, Element, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

let uid = 0;

/**
 * Eingabe für Einmalcodes in Einzelfeldern (Vuetify „v-otp-input“, Ant „Input.OTP“,
 * Material-Muster „Verification code“). Einfügen verteilt den Code, Tippen springt weiter,
 * Rücktaste zurück; das erste Feld trägt autocomplete="one-time-code" für SMS-Vorschläge.
 * Fehler erscheinen als kol-alert.
 */
@Component({
	tag: 'fink-otp-input',
	styleUrl: 'otp-input.css',
	shadow: true,
})
export class FinkOtpInput {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private readonly id = `fink-otp-${++uid}`;

	@Element() host!: HTMLElement;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}

	/** Bezeichnung, z. B. „Bestätigungscode“. */
	@Prop() _label!: string;

	/** Anzahl der Stellen. */
	@Prop() _length?: number = 6;

	/** Nur Ziffern (numerische Tastatur) oder auch Buchstaben. */
	@Prop() _type?: 'numeric' | 'alphanumeric' = 'numeric';

	/** Aktueller Code. */
	@Prop({ mutable: true }) _value?: string = '';

	/** Hinweistext, z. B. wohin der Code geschickt wurde. */
	@Prop() _hint?: string;

	/** Fehlermeldung. */
	@Prop() _error?: string;

	/** Deaktiviert die Eingabe. */
	@Prop() _disabled?: boolean = false;

	/** Liefert den Code bei jeder Änderung. */
	@Event() finkChange!: EventEmitter<string>;

	/** Liefert den Code, sobald alle Stellen ausgefüllt sind. */
	@Event() finkComplete!: EventEmitter<string>;

	private inputs(): HTMLInputElement[] {
		return Array.from(this.host.shadowRoot?.querySelectorAll<HTMLInputElement>('input') ?? []);
	}

	private clean(text: string) {
		const pattern = this._type === 'alphanumeric' ? /[^0-9a-z]/gi : /\D/g;
		return text.replace(pattern, '').toUpperCase();
	}

	private update(chars: string[]) {
		const length = this._length ?? 6;
		const value = chars.join('').slice(0, length);
		this._value = value;
		this.finkChange.emit(value);
		if (value.length === length && !chars.slice(0, length).includes('')) this.finkComplete.emit(value);
	}

	private chars(): string[] {
		const length = this._length ?? 6;
		const value = this._value ?? '';
		return Array.from({ length }, (_, i) => value[i] ?? '');
	}

	private onInput(index: number, event: Event) {
		const input = event.target as HTMLInputElement;
		const text = this.clean(input.value);
		const chars = this.chars();
		if (text.length > 1) {
			// Einfügen oder SMS-Autofill: über die Felder verteilen.
			text.split('').forEach((char, i) => {
				if (index + i < chars.length) chars[index + i] = char;
			});
			this.update(chars);
			this.inputs()[Math.min(index + text.length, chars.length - 1)]?.focus();
			return;
		}
		chars[index] = text;
		input.value = text;
		this.update(chars);
		if (text && index < chars.length - 1) this.inputs()[index + 1]?.focus();
	}

	private onKeyDown(index: number, event: KeyboardEvent) {
		const inputs = this.inputs();
		if (event.key === 'Backspace' && !(event.target as HTMLInputElement).value && index > 0) {
			event.preventDefault();
			const chars = this.chars();
			chars[index - 1] = '';
			this.update(chars);
			inputs[index - 1].focus();
		} else if (event.key === 'ArrowLeft' && index > 0) {
			event.preventDefault();
			inputs[index - 1].focus();
		} else if (event.key === 'ArrowRight' && index < inputs.length - 1) {
			event.preventDefault();
			inputs[index + 1].focus();
		}
	}

	render() {
		const chars = this.chars();
		const describedBy = [this._hint && `${this.id}-hint`, this._error && `${this.id}-error`].filter(Boolean).join(' ') || undefined;
		return (
			<fieldset class={{ otp: true, 'otp--error': !!this._error }} aria-describedby={describedBy}>
				<legend class="legend">{this._label}</legend>
				{this._hint && (
					<p class="hint" id={`${this.id}-hint`}>
						{this._hint}
					</p>
				)}
				{this._error && (
					<kol-alert id={`${this.id}-error`} class="error" _type="error" _variant="msg">
						{this._error}
					</kol-alert>
				)}
				<div class="cells">
					{chars.map((char, i) => (
						<input
							class="cell"
							type="text"
							inputMode={this._type === 'numeric' ? 'numeric' : 'text'}
							autocomplete={i === 0 ? 'one-time-code' : 'off'}
							maxLength={i === 0 ? chars.length : 1}
							value={char}
							disabled={this._disabled}
							aria-label={t('otp.digit', { index: i + 1, count: chars.length })}
							aria-invalid={this._error ? 'true' : undefined}
							onInput={(e) => this.onInput(i, e)}
							onKeyDown={(e) => this.onKeyDown(i, e)}
							onFocus={(e) => (e.target as HTMLInputElement).select()}
						/>
					))}
				</div>
			</fieldset>
		);
	}
}
