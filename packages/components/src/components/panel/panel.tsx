import { Component, Prop, h } from '@stencil/core';

/**
 * Benannter Inhaltsabschnitt auf Basis von kol-card. Ergänzt Beschreibung, Aktionen,
 * Fußzeile und eine randlose Variante für Tabellen.
 *
 * @slot actions - Aktionen im Kopf des Panels.
 * @slot - Inhalt des Panels.
 * @slot footer - Fußzeile des Panels.
 */
@Component({
	tag: 'fink-panel',
	styleUrl: 'panel.css',
	shadow: true,
})
export class FinkPanel {
	/** Überschrift des Panels. */
	@Prop() _heading!: string;

	/** Kurze Beschreibung unter der Überschrift. */
	@Prop() _description?: string;

	/** Überschriftenebene (1–6). */
	@Prop() _level?: 1 | 2 | 3 | 4 | 5 | 6 = 2;

	/** Entfernt den Innenabstand des Inhalts, z. B. für randlose Tabellen. */
	@Prop() _flush?: boolean = false;

	render() {
		return (
			<kol-card class={{ panel: true, 'panel--flush': !!this._flush }} _label={this._heading} _level={this._level}>
				<div class="body">
					<div class="head">
						{this._description && <p class="description">{this._description}</p>}
						<div class="actions">
							<slot name="actions"></slot>
						</div>
					</div>
					<div class="content">
						<slot></slot>
					</div>
					<footer class="footer">
						<slot name="footer"></slot>
					</footer>
				</div>
			</kol-card>
		);
	}
}
