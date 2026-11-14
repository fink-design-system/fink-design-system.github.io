import { Component, Prop, h } from '@stencil/core';

/**
 * Tastenkürzel als Tastenkappen (Vuetify „v-kbd“, Atlassian „Keyboard shortcut“, GitHub Primer „KeyboardKey“).
 * „Strg+K“ oder „⌘ K“ wird in einzelne Tasten zerlegt; Screenreader lesen den Text unverändert.
 */
@Component({
	tag: 'fink-kbd',
	styleUrl: 'kbd.css',
	shadow: true,
})
export class FinkKbd {
	/** Tastenkombination, Tasten getrennt durch „+“ oder Leerzeichen, z. B. „Strg+Umschalt+P“. */
	@Prop() _keys!: string;

	render() {
		const keys = (this._keys ?? '')
			.split(/\s*\+\s*|\s+/)
			.map((k) => k.trim())
			.filter(Boolean);
		return (
			<kbd class="combo">
				{keys.map((key, i) => [
					i > 0 && (
						<span class="plus" aria-hidden="true">
							+
						</span>
					),
					<kbd class="key">{key}</kbd>,
				])}
			</kbd>
		);
	}
}
