import { Component, Prop, h } from '@stencil/core';

/**
 * Wortmarke und Zeichen des Fink Design Systems: aufrechte Buchfink-Silhouette
 * mit Kegelschnabel, gefaltetem Flügel, abwärts gerichtetem Schwanz.
 *
 * Varianten: „mark“ zeichnet das Zeichen allein in der Textfarbe (currentColor),
 * „badge“ setzt es auf eine Kachelfläche in der Primärfarbe (Kopfzeilenmaßstab),
 * „lockup“ koppelt Zeichen und Wortmarke „fink“ mit optionalem Zusatz.
 *
 * Ohne _label ist die Marke rein dekorativ (aria-hidden); mit _label erhält sie
 * role="img" und einen zugänglichen Namen.
 */
@Component({
	tag: 'fink-logo',
	styleUrl: 'logo.css',
	shadow: true,
})
export class FinkLogo {
	/** Darstellungsvariante der Marke. */
	@Prop({ reflect: true }) _variant?: 'mark' | 'badge' | 'lockup' = 'mark';

	/** Zugänglicher Name; ohne _label bleibt die Marke dekorativ. */
	@Prop() _label?: string;

	/** Zusatz hinter der Wortmarke (nur Variante „lockup“), z. B. „Design System“. */
	@Prop() _subtitle?: string;

	private get labelled() {
		return typeof this._label === 'string' && this._label.trim().length > 0;
	}

	render() {
		const lockup = this._variant === 'lockup';
		const hasSubtitle = typeof this._subtitle === 'string' && this._subtitle.trim().length > 0;
		return (
			<span
				class={`logo logo-${this._variant}`}
				role={this.labelled ? 'img' : undefined}
				aria-label={this.labelled ? this._label : undefined}
				aria-hidden={this.labelled ? undefined : 'true'}
			>
				<svg class="logo-mark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<mask id="fink-logo-wing">
						<rect width="24" height="24" fill="#fff" />
						<circle cx="15.1" cy="6.8" r="1.15" fill="#000" />
						<path d="M11.6 9.2C10.4 10.5 9.2 12.3 8.2 14.4" stroke="#000" stroke-width="1.2" fill="none" />
					</mask>
					<path
						mask="url(#fink-logo-wing)"
						d="M21.3 7.7L17.6 6.3C17.2 4.6 15.9 3.6 14.3 3.8 12.1 4.1 10.4 5.9 9.9 8.2 9.5 9.8 8.9 11.2 8.1 12.2 7.6 12.8 7.2 13.2 6.9 13.4L2.8 18.3C2.45 18.75 2.75 19.3 3.3 19.05L6.9 16.3C7.7 17.8 9.8 19 12.2 18.8 14.6 18.6 16.6 16.8 17.2 14.2 17.5 12.9 17.4 11.2 17 10.1Z"
					/>
					<path d="M11.4 18.6V20.5M13.7 18.5V20.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" fill="none" />
				</svg>
				{lockup && (
					<span class="logo-word">
						fink
						{hasSubtitle && <span class="logo-subtitle">{this._subtitle}</span>}
					</span>
				)}
			</span>
		);
	}
}
