import { Component, Event, EventEmitter, Listen, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { parseList } from '../../utils/shared';

export interface FinkFabAction {
	id: string;
	label: string;
	icon: string;
}

/**
 * Floating Action Button für die Hauptaktion einer Ansicht, optional erweitert (mit Text) oder als
 * Speed Dial mit weiteren Aktionen (MUI „Fab“/„SpeedDial“, Vuetify „v-fab“/„v-speed-dial“,
 * Material 3 „FAB“/„Extended FAB“). Alle Schaltflächen sind kol-button; die Aktionen des Speed Dial
 * zeigen ihre Beschriftung sichtbar statt nur als Tooltip.
 */
@Component({
	tag: 'fink-fab',
	styleUrl: 'fab.css',
	shadow: true,
})
export class FinkFab {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}

	/** Beschriftung der Hauptaktion (beim einfachen FAB als Tooltip und Name). */
	@Prop() _label!: string;

	/** Icon-Klassen der Hauptaktion. */
	@Prop() _icons?: string = 'codicon codicon-add';

	/** Zeigt die Beschriftung neben dem Icon (Extended FAB). */
	@Prop() _extended?: boolean = false;

	/** Weitere Aktionen; macht den FAB zum Speed Dial. */
	@Prop() _actions?: FinkFabAction[] | string;

	/** Feste Position am Viewport oder im Fluss. */
	@Prop({ reflect: true }) _position?: 'inline' | 'bottom-end' | 'bottom-start' = 'inline';

	/** Ausgeklappt-Zustand des Speed Dial. */
	@State() open = false;

	/** Klick auf die Hauptaktion (ohne Speed Dial). */
	@Event() finkClick!: EventEmitter<void>;

	/** Liefert die ID der gewählten Speed-Dial-Aktion. */
	@Event() finkSelect!: EventEmitter<string>;

	@Listen('keydown')
	onKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && this.open) {
			this.open = false;
		}
	}

	render() {
		const actions = parseList<FinkFabAction>(this._actions);
		const dial = actions.length > 0;
		return (
			<div class={{ fab: true, 'fab--open': this.open, 'fab--extended': !!this._extended }}>
				{dial && this.open && (
					<ul class="actions" aria-label={this._label}>
						{actions.map((action) => (
							<li>
								<kol-button
									class="action"
									_label={action.label}
									_icons={action.icon}
									_variant="secondary"
									_on={{
										onClick: () => {
											this.open = false;
											this.finkSelect.emit(action.id);
										},
									}}
								></kol-button>
							</li>
						))}
					</ul>
				)}
				<kol-button
					class="main"
					_label={dial && this.open ? t('fab.close') : this._label}
					_icons={dial && this.open ? 'codicon codicon-close' : this._icons}
					_hideLabel={!this._extended || (dial && this.open)}
					_variant="primary"
					_ariaExpanded={dial ? this.open : undefined}
					_on={{ onClick: () => (dial ? (this.open = !this.open) : this.finkClick.emit()) }}
				></kol-button>
			</div>
		);
	}
}
