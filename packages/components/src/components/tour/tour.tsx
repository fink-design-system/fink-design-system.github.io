import { Component, Element, Event, EventEmitter, Listen, Prop, State, Watch, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { parseList } from '../../utils/shared';

let uid = 0;

export interface FinkTourStep {
	/** CSS-Selektor des Elements, das hervorgehoben wird. */
	target: string;
	title: string;
	description: string;
}

/**
 * Geführte Tour durch eine Oberfläche: hebt Elemente nacheinander hervor und erklärt sie
 * (Ant „Tour“, Atlassian „Spotlight“, Material-Muster „Feature discovery“). Die Erklärkarte ist
 * ein nicht-modaler Dialog mit kol-button für Zurück/Weiter/Beenden; Escape beendet, der Fokus
 * springt mit jedem Schritt in die Karte und am Ende zurück zum Auslöser.
 */
@Component({
	tag: 'fink-tour',
	styleUrl: 'tour.css',
	shadow: true,
})
export class FinkTour {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private readonly id = `fink-tour-${++uid}`;
	private returnFocus?: HTMLElement | null;
	private card?: HTMLElement;

	@Element() host!: HTMLElement;

	/** Bezeichnung der Tour, z. B. „Neu im Förderportal“. */
	@Prop() _label!: string;

	/** Schritte als Array oder JSON-String. */
	@Prop() _steps!: FinkTourStep[] | string;

	/** Tour geöffnet. */
	@Prop({ mutable: true, reflect: true }) _open?: boolean = false;

	@State() index = 0;
	@State() rect?: { top: number; left: number; width: number; height: number };

	/** Tour wurde bis zum Ende durchlaufen. */
	@Event() finkFinish!: EventEmitter<void>;

	/** Tour wurde geschlossen (auch vorzeitig); liefert den letzten Schrittindex. */
	@Event() finkClose!: EventEmitter<number>;

	private readonly measure = () => {
		const step = parseList<FinkTourStep>(this._steps)[this.index];
		const el = step && document.querySelector<HTMLElement>(step.target);
		if (!el) {
			this.rect = undefined;
			return;
		}
		const r = el.getBoundingClientRect();
		this.rect = { top: r.top, left: r.left, width: r.width, height: r.height };
	};

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
		window.addEventListener('resize', this.measure);
		window.addEventListener('scroll', this.measure, true);
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
		window.removeEventListener('resize', this.measure);
		window.removeEventListener('scroll', this.measure, true);
	}

	@Watch('_open')
	onOpen(open: boolean) {
		if (open) {
			this.returnFocus = document.activeElement as HTMLElement | null;
			this.index = 0;
			this.show();
		}
	}

	componentDidLoad() {
		if (this._open) this.onOpen(true);
	}

	@Listen('keydown', { target: 'document' })
	onKey(event: KeyboardEvent) {
		if (this._open && event.key === 'Escape') this.close(false);
	}

	private show() {
		const step = parseList<FinkTourStep>(this._steps)[this.index];
		const el = step && document.querySelector<HTMLElement>(step.target);
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		el?.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
		this.measure();
		// Nach dem Scrollen erneut messen und den Fokus in die Karte setzen.
		window.setTimeout(() => {
			this.measure();
			this.card?.focus();
		}, reduce ? 0 : 350);
	}

	private go(delta: number) {
		const count = parseList<FinkTourStep>(this._steps).length;
		const next = this.index + delta;
		if (next >= count) {
			this.close(true);
			return;
		}
		this.index = Math.max(0, next);
		this.show();
	}

	private close(finished: boolean) {
		this._open = false;
		if (finished) this.finkFinish.emit();
		this.finkClose.emit(this.index);
		this.returnFocus?.focus?.();
	}

	render() {
		const steps = parseList<FinkTourStep>(this._steps);
		const step = steps[this.index];
		if (!this._open || !step) return null;
		const r = this.rect;
		const pad = 6;
		const below = !r || r.top + r.height + 220 < window.innerHeight;
		const cardStyle = r
			? {
					top: below ? `${r.top + r.height + pad + 12}px` : 'auto',
					bottom: below ? 'auto' : `${window.innerHeight - r.top + pad + 12}px`,
					left: `${Math.min(Math.max(12, r.left), window.innerWidth - 12 - Math.min(400, window.innerWidth - 24))}px`,
				}
			: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
		const last = this.index === steps.length - 1;
		return (
			<div class="tour">
				{r ? (
					<div class="spotlight" style={{ top: `${r.top - pad}px`, left: `${r.left - pad}px`, width: `${r.width + pad * 2}px`, height: `${r.height + pad * 2}px` }}></div>
				) : (
					<div class="backdrop"></div>
				)}
				<section class="card" style={cardStyle} role="dialog" aria-labelledby={`${this.id}-title`} aria-describedby={`${this.id}-text`} tabindex="-1" ref={(el) => (this.card = el)}>
					<p class="progress">
						{this._label} · {t('tour.step', { index: this.index + 1, count: steps.length })}
					</p>
					<h2 class="title" id={`${this.id}-title`}>
						{step.title}
					</h2>
					<p class="text" id={`${this.id}-text`}>
						{step.description}
					</p>
					<div class="dots" aria-hidden="true">
						{steps.map((_, i) => (
							<span class={{ dot: true, 'dot--active': i === this.index }}></span>
						))}
					</div>
					<div class="actions">
						<kol-button _label={t('tour.skip')} _variant="ghost" _on={{ onClick: () => this.close(false) }}></kol-button>
						<span class="spacer"></span>
						{this.index > 0 && <kol-button _label={t('tour.back')} _variant="secondary" _on={{ onClick: () => this.go(-1) }}></kol-button>}
						<kol-button _label={last ? t('tour.finish') : t('tour.next')} _variant="primary" _on={{ onClick: () => this.go(1) }}></kol-button>
					</div>
				</section>
			</div>
		);
	}
}
