import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Platzhalter, der die Form kommender Inhalte andeutet, solange sie geladen werden.
 * Mit _label kündigt er den Ladevorgang für Screenreader an; ohne _label ist er rein dekorativ.
 */
@Component({
	tag: 'fink-skeleton',
	styleUrl: 'skeleton.css',
	shadow: true,
})
export class FinkSkeleton {
	/** Form des Platzhalters. */
	@Prop() _variant?: 'text' | 'rect' | 'circle' = 'text';

	/** Anzahl der Zeilen bei _variant="text". */
	@Prop() _lines?: number = 3;

	/** Breite als CSS-Länge (rect, circle). */
	@Prop() _width?: string;

	/** Höhe als CSS-Länge (rect, circle). */
	@Prop() _height?: string;

	/** Ansage für Screenreader, z. B. „Daten werden geladen“. */
	@Prop() _label?: string;

	render() {
		const variant = this._variant ?? 'text';
		const lines = Math.max(1, this._lines ?? 3);
		return (
			<Host aria-busy="true">
				{this._label && (
					<span class="visually-hidden" role="status">
						{this._label}
					</span>
				)}
				{variant === 'text' ? (
					<span class="lines" aria-hidden="true">
						{Array.from({ length: lines }, (_, i) => (
							<span class="bone bone--text" style={{ width: i === lines - 1 && lines > 1 ? '62%' : '100%' }}></span>
						))}
					</span>
				) : (
					<span
						class={`bone bone--${variant}`}
						aria-hidden="true"
						style={{ width: this._width ?? (variant === 'circle' ? '3rem' : '100%'), height: this._height ?? (variant === 'circle' ? this._width ?? '3rem' : '8rem') }}
					></span>
				)}
			</Host>
		);
	}
}
