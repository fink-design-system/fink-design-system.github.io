import { Component, Host, Prop, h } from '@stencil/core';

/**
 * Trennlinie zwischen Inhalten, optional mit Beschriftung in der Mitte
 * (MUI „Divider“, Vuetify „v-divider“, Material 3 „Divider“).
 * Ohne Beschriftung rein dekorativ; mit Beschriftung als role="separator" mit Namen.
 *
 * @cssprop --fink-divider-color - Linienfarbe (Standard: --fink-color-mute-variant).
 */
@Component({
	tag: 'fink-divider',
	styleUrl: 'divider.css',
	shadow: true,
})
export class FinkDivider {
	/** Beschriftung in der Linie, z. B. „oder“. */
	@Prop() _label?: string;

	/** Ausrichtung der Linie. */
	@Prop({ reflect: true }) _orientation?: 'horizontal' | 'vertical' = 'horizontal';

	/** Einrückung: „full“ (ganze Breite), „inset“ (links eingerückt wie in Listen), „middle“ (beidseitig). */
	@Prop({ reflect: true }) _variant?: 'full' | 'inset' | 'middle' = 'full';

	/** Position der Beschriftung. */
	@Prop() _align?: 'start' | 'center' | 'end' = 'center';

	render() {
		const vertical = this._orientation === 'vertical';
		return (
			<Host
				role={this._label ? 'separator' : 'presentation'}
				aria-orientation={this._label && vertical ? 'vertical' : undefined}
				aria-label={this._label || undefined}
			>
				<div class={{ divider: true, [`divider--${this._variant ?? 'full'}`]: true, 'divider--vertical': vertical, 'divider--labelled': !!this._label, [`divider--${this._align ?? 'center'}`]: true }}>
					{this._label && (
						<span class="label" aria-hidden="true">
							{this._label}
						</span>
					)}
				</div>
			</Host>
		);
	}
}
