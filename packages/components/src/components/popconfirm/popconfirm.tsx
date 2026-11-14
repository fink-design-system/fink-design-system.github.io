import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

type PopoverButton = Omit<HTMLElement, 'hidePopover' | 'focus'> & { hidePopover(): Promise<void>; focus(): Promise<void> };

/**
 * Leichte Rückfrage direkt an der Schaltfläche, z. B. vor dem Löschen eines Eintrags
 * (Ant „Popconfirm“, Atlassian-Muster „Inline confirmation“). Auslöser und Popover sind
 * kol-popover-button, die Antworten kol-button. Für folgenreiche Aktionen weiterhin kol-dialog nutzen.
 */
@Component({
	tag: 'fink-popconfirm',
	styleUrl: 'popconfirm.css',
	shadow: true,
})
export class FinkPopconfirm {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private popover?: PopoverButton;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}

	/** Beschriftung des Auslösers. */
	@Prop() _label!: string;

	/** Icon-Klassen des Auslösers. */
	@Prop() _icons?: string;

	/** Nur das Icon des Auslösers zeigen. */
	@Prop() _hideLabel?: boolean = false;

	/** Variante des Auslösers. */
	@Prop() _variant?: 'primary' | 'secondary' | 'normal' | 'tertiary' | 'ghost' | 'danger' = 'secondary';

	/** Die Rückfrage, z. B. „Antrag wirklich löschen?“. */
	@Prop() _question!: string;

	/** Zusatzhinweis unter der Frage. */
	@Prop() _description?: string;

	/** Beschriftung der Bestätigung. */
	@Prop() _confirmLabel?: string;

	/** Bestätigung als destruktive Aktion darstellen. */
	@Prop() _danger?: boolean = false;

	/** Position der Rückfrage. */
	@Prop() _align?: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

	/** Bestätigt. */
	@Event() finkConfirm!: EventEmitter<void>;

	/** Abgebrochen. */
	@Event() finkCancel!: EventEmitter<void>;

	private done(confirmed: boolean) {
		void this.popover?.hidePopover();
		void this.popover?.focus();
		if (confirmed) this.finkConfirm.emit();
		else this.finkCancel.emit();
	}

	render() {
		return (
			<kol-popover-button
				ref={(el: HTMLElement | undefined) => (this.popover = el as unknown as PopoverButton)}
				_label={this._label}
				_icons={this._icons}
				_hideLabel={this._hideLabel}
				_variant={this._variant}
				_popoverAlign={this._align}
			>
				<div class="confirm" role="group" aria-label={this._question}>
					<p class="question">
						<kol-icon class="icon" _icons={this._danger ? 'codicon codicon-warning' : 'codicon codicon-question'} _label=""></kol-icon>
						<span>{this._question}</span>
					</p>
					{this._description && <p class="description">{this._description}</p>}
					<div class="actions">
						<kol-button _label={t('popconfirm.cancel')} _variant="tertiary" _on={{ onClick: () => this.done(false) }}></kol-button>
						<kol-button _label={this._confirmLabel ?? t('popconfirm.confirm')} _variant={this._danger ? 'danger' : 'primary'} _on={{ onClick: () => this.done(true) }}></kol-button>
					</div>
				</div>
			</kol-popover-button>
		);
	}
}
