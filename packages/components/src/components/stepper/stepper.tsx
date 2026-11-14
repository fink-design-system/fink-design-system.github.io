import { Component, State, Event, EventEmitter, Prop, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

/**
 * Fortschrittsanzeige für mehrstufige Abläufe (Wizard, Antragsstrecke).
 * Abgeschlossene Schritte können optional angeklickt werden, um zurückzuspringen.
 */
@Component({
	tag: 'fink-stepper',
	styleUrl: 'stepper.css',
	shadow: true,
})
export class FinkStepper {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}
	/** Bezeichnungen der Schritte, als Array oder JSON-String. */
	@Prop() _steps!: string[] | string;

	/** Index des aktuellen Schritts (0-basiert). */
	@Prop() _current: number = 0;

	/** Erlaubt das Zurückspringen zu abgeschlossenen Schritten. */
	@Prop() _clickable?: boolean = false;

	/** Barrierefreie Bezeichnung der Schrittliste. */
	@Prop() _label?: string;

	/** Wird ausgelöst, wenn ein abgeschlossener Schritt gewählt wird; liefert dessen Index. */
	@Event() finkStepChange!: EventEmitter<number>;

	private get steps(): string[] {
		if (Array.isArray(this._steps)) return this._steps;
		try {
			const parsed = JSON.parse(this._steps ?? '[]');
			return Array.isArray(parsed) ? parsed.map(String) : [];
		} catch {
			return [];
		}
	}

	private renderMarker(index: number, state: 'done' | 'current' | 'todo') {
		return <span class="marker">{state === 'done' ? <kol-icon _icons="codicon codicon-check" _label=""></kol-icon> : index + 1}</span>;
	}

	render() {
		const steps = this.steps;
		return (
			<ol class="stepper" aria-label={this._label ?? t('stepper.label')}>
				{steps.map((label, index) => {
					const state = index < this._current ? 'done' : index === this._current ? 'current' : 'todo';
					const status = t(`stepper.${state}`);
					const content = [
						this.renderMarker(index, state),
						<span class="text">
							<span class="label">{label}</span>
							<span class="visually-hidden">, {status}</span>
						</span>,
					];
					return (
						<li class={`step step--${state}`} aria-current={state === 'current' ? 'step' : undefined}>
							{this._clickable && state === 'done' ? (
								<button class="step-button" type="button" onClick={() => this.finkStepChange.emit(index)}>
									{content}
								</button>
							) : (
								<span class="step-inner">{content}</span>
							)}
						</li>
					);
				})}
			</ol>
		);
	}
}
