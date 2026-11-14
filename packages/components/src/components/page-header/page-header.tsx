import { Component, Prop, h } from '@stencil/core';

/**
 * Seitenkopf mit Überschrift, Beschreibung, Brotkrumen und Seitenaktionen.
 *
 * @slot breadcrumb - Brotkrumen-Navigation über der Überschrift, z. B. kol-breadcrumb.
 * @slot actions - Primäre Seitenaktionen rechts neben der Überschrift.
 * @slot meta - Zusatzinformationen unter der Beschreibung (Status, Datum …).
 */
@Component({
	tag: 'fink-page-header',
	styleUrl: 'page-header.css',
	shadow: true,
})
export class FinkPageHeader {
	/** Überschrift der Seite. */
	@Prop() _heading!: string;

	/** Kurzbeschreibung unter der Überschrift. */
	@Prop() _description?: string;

	/** Überschriftenebene (1–6). */
	@Prop() _level?: 1 | 2 | 3 | 4 | 5 | 6 = 1;

	render() {
		return (
			<header class="page-header">
				<div class="breadcrumb">
					<slot name="breadcrumb"></slot>
				</div>
				<div class="row">
					<div class="text">
						<kol-heading class="heading" _label={this._heading} _level={this._level}></kol-heading>
						{this._description && <p class="description">{this._description}</p>}
						<div class="meta">
							<slot name="meta"></slot>
						</div>
					</div>
					<div class="actions">
						<slot name="actions"></slot>
					</div>
				</div>
			</header>
		);
	}
}
