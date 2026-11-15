import { Component, Element, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

/**
 * Zwei Bereiche mit verschiebbarer Trennlinie, z. B. Liste und Detail (Ant „Splitter“,
 * VS-Code-Muster „Split view“, Carbon-Muster „Resizable panels“). Die Trennlinie ist ein
 * fokussierbares role="separator" mit aria-valuenow; Pfeiltasten verschieben in 5-%-Schritten,
 * Pos1/Ende springen an die Grenzen. Auf schmalen Flächen stehen die Bereiche untereinander.
 *
 * @slot start - Erster Bereich (links bzw. oben).
 * @slot end - Zweiter Bereich (rechts bzw. unten).
 */
@Component({
	tag: 'fink-splitter',
	styleUrl: 'splitter.css',
	shadow: true,
})
export class FinkSplitter {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	@Element() host!: HTMLElement;

	/** Bezeichnung der Trennlinie, z. B. „Breite der Liste“. */
	@Prop() _label?: string;

	/** Anteil des ersten Bereichs in Prozent. */
	@Prop({ mutable: true }) _value?: number = 40;

	/** Kleinster Anteil in Prozent. */
	@Prop() _min?: number = 20;

	/** Größter Anteil in Prozent. */
	@Prop() _max?: number = 80;

	/** Ausrichtung. */
	@Prop({ reflect: true }) _orientation?: 'horizontal' | 'vertical' = 'horizontal';

	/** Höhe des Splitters (CSS-Länge). */
	@Prop() _height?: string = '22rem';

	/** Liefert den neuen Anteil in Prozent. */
	@Event() finkResize!: EventEmitter<number>;

	@State() dragging = false;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}

	private set(value: number) {
		const next = Math.round(Math.max(this._min ?? 20, Math.min(this._max ?? 80, value)));
		if (next === this._value) return;
		this._value = next;
		this.finkResize.emit(next);
	}

	private readonly onPointerDown = (event: PointerEvent) => {
		const handle = event.currentTarget as HTMLElement;
		handle.setPointerCapture(event.pointerId);
		this.dragging = true;
		const rect = this.host.getBoundingClientRect();
		const vertical = this._orientation === 'vertical';
		const move = (e: PointerEvent) => this.set(vertical ? ((e.clientY - rect.top) / rect.height) * 100 : ((e.clientX - rect.left) / rect.width) * 100);
		const up = () => {
			this.dragging = false;
			handle.removeEventListener('pointermove', move);
			handle.removeEventListener('pointerup', up);
		};
		handle.addEventListener('pointermove', move);
		handle.addEventListener('pointerup', up);
	};

	private readonly onKeyDown = (event: KeyboardEvent) => {
		const value = this._value ?? 40;
		const keys: Record<string, number> = {
			ArrowLeft: value - 5,
			ArrowUp: value - 5,
			ArrowRight: value + 5,
			ArrowDown: value + 5,
			Home: this._min ?? 20,
			End: this._max ?? 80,
		};
		if (event.key in keys) {
			event.preventDefault();
			this.set(keys[event.key]);
		}
	};

	render() {
		const value = this._value ?? 40;
		const vertical = this._orientation === 'vertical';
		return (
			<div class={{ splitter: true, 'splitter--vertical': vertical, 'splitter--dragging': this.dragging }} style={{ '--split': `${value}%`, height: this._height ?? '22rem' }}>
				<div class="pane">
					<slot name="start"></slot>
				</div>
				{/* Fokussierbarer separator ist laut WAI-ARIA 1.2 ein Widget (APG „Window Splitter“); jsx-a11y kennt das nicht. */}
				{/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/no-noninteractive-tabindex */}
				<div class="handle" role="separator" tabindex="0" aria-orientation={vertical ? 'horizontal' : 'vertical'} aria-valuenow={value} aria-valuemin={this._min} aria-valuemax={this._max} aria-label={this._label ?? t('splitter.label')} onPointerDown={this.onPointerDown} onKeyDown={this.onKeyDown}>
					<span class="grip" aria-hidden="true"></span>
				</div>
				<div class="pane">
					<slot name="end"></slot>
				</div>
			</div>
		);
	}
}
