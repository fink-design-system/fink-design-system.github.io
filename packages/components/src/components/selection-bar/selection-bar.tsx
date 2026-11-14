import { Component, State, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

/**
 * Leiste für Massenaktionen. Erscheint, sobald Elemente ausgewählt sind, und kündigt die Anzahl an.
 *
 * @slot - Aktionen für die Auswahl, z. B. kol-button.
 */
@Component({
	tag: 'fink-selection-bar',
	styleUrl: 'selection-bar.css',
	shadow: true,
})
export class FinkSelectionBar {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}
	/** Anzahl ausgewählter Elemente. Bei 0 ist die Leiste ausgeblendet. */
	@Prop() _count: number = 0;

	/** Bezeichnung der Elemente im Plural, z. B. „Personen“. */
	@Prop() _itemLabel?: string;

	/** Wird ausgelöst, wenn die Auswahl aufgehoben werden soll. */
	@Event() finkClear!: EventEmitter<void>;

	render() {
		const visible = this._count > 0;
		return (
			<Host hidden={!visible}>
				<div class="bar" role="region" aria-label={t('selectionBar.region')}>
					<span class="count" role="status">
						{t('selectionBar.selected', { count: this._count, items: this._itemLabel ?? t('selectionBar.items') })}
					</span>
					<div class="actions">
						<slot></slot>
					</div>
					<kol-button class="clear" _label={t('selectionBar.clear')} _icons="codicon codicon-close" _variant="ghost" _on={{ onClick: () => this.finkClear.emit() }}></kol-button>
				</div>
			</Host>
		);
	}
}
