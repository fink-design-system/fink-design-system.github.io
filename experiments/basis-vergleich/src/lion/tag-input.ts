import { LitElement, css, html } from 'lit';
import type { LionCombobox } from '@lion/ui/combobox.js';
import '@lion/ui/define/lion-combobox.js';
import '@lion/ui/define/lion-option.js';
import '@lion/ui/define/lion-button.js';
import { texts } from '../shared/texts';

/**
 * Tag-Eingabe auf Lion: lion-combobox als Eingabe mit Vorschlägen, eigene Tag-Liste mit lion-button.
 * Lions Mehrfachauswahl der Combobox ist laut Doku nicht barrierefrei, deshalb wie bei Fink eine eigene Liste.
 */
export class FinkLionTagInput extends LitElement {
	static properties = {
		label: { type: String },
		placeholder: { type: String },
		options: { type: Array },
		values: { type: Array },
		max: { type: Number },
		allowCustom: { type: Boolean, attribute: 'allow-custom' },
		error: { state: true },
		status: { state: true },
	};

	declare label: string;
	declare placeholder: string;
	declare options: string[];
	declare values: string[];
	declare max?: number;
	declare allowCustom: boolean;
	declare error: string;
	declare status: string;

	constructor() {
		super();
		this.options = [];
		this.values = [];
		this.allowCustom = true;
		this.error = '';
		this.status = '';
	}

	private get combobox() {
		return this.renderRoot.querySelector('lion-combobox') as LionCombobox;
	}

	/** Das Eingabefeld ist in Lion geschützt; Ableiten wäre der vorgesehene Weg, hier genügt der Zugriff. */
	private get input() {
		return (this.combobox as unknown as { _inputNode: HTMLInputElement })._inputNode;
	}

	firstUpdated() {
		const input = this.input;
		input.placeholder = this.placeholder ?? '';
		input.addEventListener('keydown', this.onKeyDown);
		this.combobox.addToAriaDescribedBy(this.renderRoot.querySelector('.error') as HTMLElement);
	}

	private readonly onKeyDown = (event: KeyboardEvent) => {
		const draft = this.input.value;
		if (event.key === ',' || (event.key === 'Enter' && this.combobox.activeIndex === -1)) {
			event.preventDefault();
			this.add(draft);
		} else if (event.key === 'Backspace' && draft === '' && this.values.length) {
			this.removeTag(this.values[this.values.length - 1]);
		} else if (event.key !== 'Enter') {
			this.error = '';
		}
	};

	/** Auswahl eines Vorschlags per Enter oder Klick. */
	private readonly onModelValueChanged = () => {
		if (this.combobox && this.combobox.checkedIndex !== -1 && this.combobox.checkedIndex !== undefined) {
			const picked = String(this.combobox.modelValue);
			this.combobox.checkedIndex = -1;
			this.add(picked);
		}
	};

	private commit(next: string[], message: string) {
		this.values = next;
		this.status = message;
		this.dispatchEvent(new CustomEvent('fink-change', { detail: next }));
	}

	private add(raw: string) {
		const text = raw.trim().replace(/,$/, '').trim();
		if (!text) return;
		const option = this.options.find((o) => o.toLowerCase() === text.toLowerCase());
		if (!option && !this.allowCustom) return void (this.error = texts.tagNotAllowed(text));
		const next = option ?? text;
		if (this.values.some((v) => v.toLowerCase() === next.toLowerCase())) return void (this.error = texts.tagDuplicate(next));
		if (this.max && this.values.length >= this.max) return void (this.error = texts.tagMax(this.max));
		this.error = '';
		this.input.value = '';
		this.combobox.modelValue = '';
		this.commit([...this.values, next], texts.tagAdded(next));
	}

	private removeTag(item: string) {
		this.commit(
			this.values.filter((v) => v !== item),
			texts.tagRemoved(item),
		);
	}

	render() {
		const full = !!this.max && this.values.length >= this.max;
		return html`
			<lion-combobox
				label=${this.label}
				help-text=${texts.tagHint}
				autocomplete="list"
				.requireOptionMatch=${false}
				?disabled=${full}
				@model-value-changed=${this.onModelValueChanged}
			>
				${this.options.filter((o) => !this.values.includes(o)).map((o) => html`<lion-option .choiceValue=${o}>${o}</lion-option>`)}
			</lion-combobox>
			<p class="error" ?hidden=${!this.error}>${this.error}</p>
			${this.values.length
				? html`<ul class="tags" aria-label=${texts.tagSelected(this.label)}>
						${this.values.map(
							(v) => html`<li class="tag">
								<span>${v}</span>
								<lion-button class="remove" aria-label=${texts.remove(v)} @click=${() => this.removeTag(v)}><span aria-hidden="true">×</span></lion-button>
							</li>`,
						)}
					</ul>`
				: ''}
			<span class="visually-hidden" role="status">${this.status}</span>
		`;
	}

	static styles = css`
		:host {
			display: grid;
			gap: var(--fink-space-2);
			font-family: var(--fink-font-family);
			color: var(--fink-color-text);
		}

		lion-combobox {
			display: grid;
			gap: var(--fink-space-1);
		}

		[slot='label'] {
			font-weight: var(--fink-font-weight-medium);
		}

		[slot='help-text'] {
			color: var(--fink-color-subtle);
			font-size: var(--fink-type-scale-sm);
		}

		[slot='input'] {
			width: 100%;
			min-height: 44px;
			padding: var(--fink-space-2) var(--fink-space-3);
			border: var(--fink-border-width) solid var(--fink-color-subtle);
			border-radius: var(--fink-radius-sm);
			background: var(--fink-color-light);
			color: var(--fink-color-text);
			font: inherit;
			box-sizing: border-box;
		}

		[slot='input']:focus-visible {
			outline: 3px solid var(--fink-color-primary);
			outline-offset: 2px;
		}

		lion-combobox[disabled] [slot='input'] {
			opacity: 0.55;
		}

		[slot='listbox'] {
			border: var(--fink-border-width) solid var(--fink-color-mute-variant);
			border-radius: var(--fink-radius-md);
			background: var(--fink-color-overlay);
			box-shadow: var(--fink-elevation-2);
			padding: var(--fink-space-1);
		}

		lion-option {
			display: block;
			padding: var(--fink-space-2) var(--fink-space-3);
			border-radius: var(--fink-radius-sm);
			cursor: pointer;
		}

		lion-option[active] {
			background: var(--fink-color-secondary);
			color: var(--fink-color-primary-variant);
			outline: 2px solid var(--fink-color-primary);
			outline-offset: -2px;
		}

		.error {
			margin: 0;
			color: var(--fink-color-danger);
			font-weight: var(--fink-font-weight-bold);
		}

		.tags {
			display: flex;
			flex-wrap: wrap;
			gap: var(--fink-space-2);
			margin: 0;
			padding: 0;
			list-style: none;
		}

		.tag {
			display: inline-flex;
			align-items: center;
			gap: var(--fink-space-1);
			padding-inline-start: var(--fink-space-3);
			border: var(--fink-border-width) solid transparent;
			border-radius: var(--fink-radius-pill);
			background: var(--fink-color-secondary);
			color: var(--fink-color-primary);
			font-weight: var(--fink-font-weight-medium);
		}

		.remove {
			display: inline-grid;
			place-items: center;
			width: 44px;
			height: 44px;
			padding: 0;
			border-radius: var(--fink-radius-pill);
			background: transparent;
			color: inherit;
			cursor: pointer;
		}

		.remove:hover {
			background: var(--fink-color-mute);
			color: var(--fink-color-danger);
		}

		.remove:focus-visible {
			outline: 3px solid var(--fink-color-primary);
			outline-offset: 2px;
		}

		.visually-hidden {
			position: absolute;
			width: 1px;
			height: 1px;
			clip-path: inset(50%);
			white-space: nowrap;
			overflow: hidden;
		}

		@media (forced-colors: active) {
			.tag,
			[slot='listbox'] {
				border-color: CanvasText;
			}

			lion-option[active] {
				forced-color-adjust: none;
				background: Highlight;
				color: HighlightText;
			}

			[slot='input']:focus-visible,
			.remove:focus-visible {
				outline-color: Highlight;
			}
		}
	`;
}

customElements.define('fink-lion-tag-input', FinkLionTagInput);
