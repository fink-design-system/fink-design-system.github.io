import { Component, Prop, h } from '@stencil/core';

/**
 * Leerzustand für Listen, Suchergebnisse und noch nicht befüllte Bereiche.
 *
 * @slot - Aktionen, die aus dem Leerzustand herausführen (z. B. „Filter zurücksetzen“).
 */
@Component({
	tag: 'fink-empty-state',
	styleUrl: 'empty-state.css',
	shadow: true,
})
export class FinkEmptyState {
	/** Überschrift des Leerzustands. */
	@Prop() _heading!: string;

	/** Erklärung, warum nichts angezeigt wird und was man tun kann. */
	@Prop() _description?: string;

	/** Icon-Klassen der Icon-Fonts. */
	@Prop() _icons?: string = 'codicon codicon-search';

	/** Überschriftenebene (1–6). */
	@Prop() _level?: 1 | 2 | 3 | 4 | 5 | 6 = 2;

	render() {
		return (
			<section class="empty">
				{this._icons && (
					<span class="icon">
						<kol-icon _icons={this._icons} _label=""></kol-icon>
					</span>
				)}
				<kol-heading class="heading" _label={this._heading} _level={this._level}></kol-heading>
				{this._description && <p class="description">{this._description}</p>}
				<div class="actions">
					<slot></slot>
				</div>
			</section>
		);
	}
}
