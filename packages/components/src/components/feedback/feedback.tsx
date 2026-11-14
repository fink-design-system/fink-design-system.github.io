import { Component, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

export interface FinkFeedbackDetail {
	helpful: boolean;
	comment?: string;
}

/**
 * Seitenfeedback „War diese Seite hilfreich?“. Bei „Nein“ öffnet sich ein Kommentarfeld.
 */
@Component({
	tag: 'fink-feedback',
	styleUrl: 'feedback.css',
	shadow: true,
})
export class FinkFeedback {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}
	/** Frage. */
	@Prop() _question?: string;

	/** Dankestext nach dem Absenden. */
	@Prop() _thanks?: string;

	@State() step: 'ask' | 'comment' | 'done' = 'ask';
	@State() comment = '';

	/** Liefert das Feedback, sobald es abgeschlossen ist. */
	@Event() finkFeedback!: EventEmitter<FinkFeedbackDetail>;

	private finish(detail: FinkFeedbackDetail) {
		this.step = 'done';
		this.finkFeedback.emit(detail);
	}

	render() {
		return (
			<section class="feedback" aria-label={t('feedback.region')}>
				{this.step === 'ask' && (
					<div class="row">
						<span class="question">{this._question ?? t('feedback.question')}</span>
						<span class="buttons">
							<kol-button _label={t('feedback.yes')} _icons="codicon codicon-thumbsup" _on={{ onClick: () => this.finish({ helpful: true }) }}></kol-button>
							<kol-button _label={t('feedback.no')} _icons="codicon codicon-thumbsdown" _on={{ onClick: () => (this.step = 'comment') }}></kol-button>
						</span>
					</div>
				)}
				{this.step === 'comment' && (
					<div class="comment">
						<kol-textarea
							_label={t('feedback.improve')}
							_hint={t('feedback.hint')}
							_rows={3}
							_value={this.comment}
							_on={{ onInput: (_event: Event, value: unknown) => (this.comment = String(value ?? '')) }}
						></kol-textarea>
						<span class="buttons">
							<kol-button _label={t('feedback.send')} _variant="primary" _on={{ onClick: () => this.finish({ helpful: false, comment: this.comment.trim() || undefined }) }}></kol-button>
							<kol-button _label={t('feedback.cancel')} _variant="tertiary" _on={{ onClick: () => (this.step = 'ask') }}></kol-button>
						</span>
					</div>
				)}
				{this.step === 'done' && (
					<p class="thanks" role="status">
						<kol-icon _icons="codicon codicon-heart" _label=""></kol-icon> {this._thanks ?? t('feedback.thanks')}
					</p>
				)}
			</section>
		);
	}
}
