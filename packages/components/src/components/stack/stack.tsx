import { Component, Host, Prop, h } from '@stencil/core';

export type FinkSpace = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

/**
 * Layout-Primitive: ordnet Kinder vertikal oder horizontal mit Abstand aus dem Spacing-Raster an.
 *
 * @slot - Elemente, die gestapelt werden.
 */
@Component({
	tag: 'fink-stack',
	styleUrl: 'stack.css',
	shadow: true,
})
export class FinkStack {
	/** Abstand aus dem Spacing-Raster (Token --fink-space-*). */
	@Prop() _gap?: FinkSpace = '4';

	/** Richtung der Anordnung. */
	@Prop({ reflect: true }) _direction?: 'column' | 'row' = 'column';

	/** Querachsen-Ausrichtung. */
	@Prop() _align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline' = 'stretch';

	/** Hauptachsen-Verteilung. */
	@Prop() _justify?: 'start' | 'center' | 'end' | 'space-between' = 'start';

	/** Umbruch bei horizontaler Anordnung erlauben. */
	@Prop() _wrap?: boolean = true;

	render() {
		const gap = this._gap === '0' ? '0' : `var(--fink-space-${this._gap ?? '4'})`;
		return (
			<Host
				style={{
					gap,
					flexDirection: this._direction === 'row' ? 'row' : 'column',
					alignItems: this._align ?? 'stretch',
					justifyContent: this._justify ?? 'start',
					flexWrap: this._direction === 'row' && this._wrap ? 'wrap' : 'nowrap',
				}}
			>
				<slot></slot>
			</Host>
		);
	}
}
