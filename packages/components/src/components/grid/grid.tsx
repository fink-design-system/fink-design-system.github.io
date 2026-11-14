import { Component, Host, Prop, h } from '@stencil/core';
import type { FinkSpace } from '../stack/stack';

/**
 * Responsives Raster: so viele Spalten wie bei der Mindestbreite hineinpassen (auto-fit).
 *
 * @slot - Rasterelemente.
 */
@Component({
	tag: 'fink-grid',
	styleUrl: 'grid.css',
	shadow: true,
})
export class FinkGrid {
	/** Mindestbreite einer Spalte als CSS-Länge. */
	@Prop() _min?: string = '15rem';

	/** Abstand aus dem Spacing-Raster (Token --fink-space-*). */
	@Prop() _gap?: FinkSpace = '4';

	render() {
		const gap = this._gap === '0' ? '0' : `var(--fink-space-${this._gap ?? '4'})`;
		return (
			<Host style={{ gap, gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${this._min ?? '15rem'}), 1fr))` }}>
				<slot></slot>
			</Host>
		);
	}
}
