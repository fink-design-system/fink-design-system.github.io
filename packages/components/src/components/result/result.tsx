import { Component, State, Prop, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

export type FinkResultVariant = 'success' | 'info' | 'warning' | 'error' | 'not-found' | 'unavailable';

const ICONS: Record<FinkResultVariant, string> = {
	success: 'codicon codicon-pass-filled',
	info: 'codicon codicon-info',
	warning: 'codicon codicon-warning',
	error: 'codicon codicon-error',
	'not-found': 'codicon codicon-search-stop',
	unavailable: 'codicon codicon-debug-disconnect',
};

/**
 * Ergebnisseite für Abschlüsse und Fehler: Bestätigung mit Vorgangsnummer, „Seite nicht gefunden“,
 * „Dienst nicht verfügbar“ und allgemeine Fehler.
 *
 * @slot - Nächste Schritte bzw. Aktionen.
 * @slot details - Zusätzliche Inhalte unter der Beschreibung.
 */
@Component({
	tag: 'fink-result',
	styleUrl: 'result.css',
	shadow: true,
})
export class FinkResult {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}
	/** Art des Ergebnisses. */
	@Prop() _variant?: FinkResultVariant = 'success';

	/** Überschrift. */
	@Prop() _heading!: string;

	/** Beschreibung bzw. Erklärung. */
	@Prop() _description?: string;

	/** Referenz, z. B. Vorgangsnummer – wird bei success hervorgehoben. */
	@Prop() _reference?: string;

	/** Bezeichnung der Referenz. */
	@Prop() _referenceLabel?: string;

	/** Überschriftenebene (1–6). */
	@Prop() _level?: 1 | 2 | 3 | 4 | 5 | 6 = 1;

	render() {
		const variant = this._variant ?? 'success';
		return (
			<section class={`result result--${variant}`}>
				<div class="panel">
					<span class="icon">
						<kol-icon _icons={ICONS[variant]} _label=""></kol-icon>
					</span>
					<kol-heading class="heading" _label={this._heading} _level={this._level}></kol-heading>
					{this._reference && (
						<p class="reference">
							{this._referenceLabel ?? t('result.reference')}
							<br />
							<strong>{this._reference}</strong>
						</p>
					)}
				</div>
				{this._description && <p class="description">{this._description}</p>}
				<div class="details">
					<slot name="details"></slot>
				</div>
				<div class="actions">
					<slot></slot>
				</div>
			</section>
		);
	}
}
