import { Component, Element, Listen, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

/**
 * Karussell für Inhalte, die nacheinander gezeigt werden (Vuetify „v-carousel“, Ant „Carousel“,
 * Material 3 „Carousel“). Jedes Kind-Element ist eine Folie. Bedienung über kol-button
 * (Zurück/Weiter, Folienwahl), Wischen und Scroll-Snap. Automatisches Weiterschalten nur mit
 * sichtbarer Pause-Schaltfläche (WCAG 2.2.2) und Stopp bei Fokus oder Zeiger.
 *
 * @slot - Folien, je ein Element.
 */
@Component({
	tag: 'fink-carousel',
	styleUrl: 'carousel.css',
	shadow: true,
})
export class FinkCarousel {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private viewport?: HTMLElement;
	private observer?: IntersectionObserver;
	private timer?: number;

	@Element() host!: HTMLElement;

	/** Barrierefreie Bezeichnung, z. B. „Aktuelle Förderprogramme“. */
	@Prop() _label!: string;

	/** Sichtbare Folien gleichzeitig (ab mittlerer Breite). */
	@Prop() _perView?: number = 1;

	/** Automatisch weiterschalten (Millisekunden, 0 = aus). */
	@Prop() _autoplay?: number = 0;

	@State() index = 0;
	@State() count = 0;
	@State() playing = false;
	@State() hovered = false;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
		this.playing = (this._autoplay ?? 0) > 0 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	}

	componentDidLoad() {
		this.setupSlides();
		this.schedule();
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
		this.observer?.disconnect();
		window.clearTimeout(this.timer);
	}

	private slides(): HTMLElement[] {
		return Array.from(this.host.children) as HTMLElement[];
	}

	private readonly setupSlides = () => {
		const slides = this.slides();
		this.count = slides.length;
		slides.forEach((slide, i) => {
			// Generische Elemente werden zur Folie (APG-Karussell); article, li usw. behalten ihre eigene Rolle.
			if (slide.localName === 'div' || slide.localName === 'span') slide.setAttribute('role', 'group');
			slide.setAttribute('aria-roledescription', t('carousel.slide'));
			slide.setAttribute('aria-label', t('carousel.position', { index: i + 1, count: slides.length }));
		});
		this.observer?.disconnect();
		this.observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting && e.intersectionRatio > 0.6).map((e) => slides.indexOf(e.target as HTMLElement));
				if (visible.length) this.index = Math.min(...visible);
			},
			{ root: this.viewport, threshold: [0.6] },
		);
		slides.forEach((slide) => this.observer!.observe(slide));
	};

	private go(index: number) {
		const slides = this.slides();
		if (!slides.length) return;
		const target = (index + slides.length) % slides.length;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const viewport = this.viewport;
		if (viewport) {
			const left = viewport.scrollLeft + slides[target].getBoundingClientRect().left - viewport.getBoundingClientRect().left;
			viewport.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' });
		}
		this.index = target;
	}

	private schedule() {
		window.clearTimeout(this.timer);
		if (!this.playing || this.hovered || !this._autoplay) return;
		this.timer = window.setTimeout(() => {
			this.go(this.index + 1);
			this.schedule();
		}, this._autoplay);
	}

	componentDidUpdate() {
		this.schedule();
	}

	/** Automatisches Weiterschalten pausiert bei Zeiger oder Fokus im Karussell (WCAG 2.2.2). */
	@Listen('mouseenter')
	@Listen('focusin')
	handlePause() {
		this.hovered = true;
	}

	@Listen('mouseleave')
	@Listen('focusout')
	handleResume() {
		this.hovered = false;
	}

	render() {
		const perView = Math.max(1, this._perView ?? 1);
		return (
			<section
				class="carousel"
				aria-roledescription={t('carousel.carousel')}
				aria-label={this._label}
				style={{ '--per-view': String(perView) }}
			>
				<div class="controls">
					{(this._autoplay ?? 0) > 0 && (
						<kol-button
							_label={this.playing ? t('carousel.pause') : t('carousel.play')}
							_hideLabel
							_icons={this.playing ? 'codicon codicon-debug-pause' : 'codicon codicon-play'}
							_variant="ghost"
							_on={{ onClick: () => (this.playing = !this.playing) }}
						></kol-button>
					)}
					<span class="counter" aria-hidden="true">
						{this.index + 1} / {this.count}
					</span>
					<kol-button _label={t('carousel.prev')} _hideLabel _icons="codicon codicon-chevron-left" _variant="secondary" _on={{ onClick: () => this.go(this.index - 1) }}></kol-button>
					<kol-button _label={t('carousel.next')} _hideLabel _icons="codicon codicon-chevron-right" _variant="secondary" _on={{ onClick: () => this.go(this.index + 1) }}></kol-button>
				</div>
				{/* Scrollbarer Bereich: per Tastatur erreichbar und mit Pfeiltasten scrollbar (WCAG 2.1.1). */}
				<div class="viewport" ref={(el) => (this.viewport = el)} role="region" aria-label={t('carousel.slides')} tabindex="0" aria-live={this.playing ? 'off' : 'polite'}>
					<slot onSlotchange={this.setupSlides}></slot>
				</div>
				{this.count > 1 && (
					<div class="dots" role="group" aria-label={t('carousel.choose')}>
						{Array.from({ length: this.count }, (_, i) => (
							<button type="button" class={{ dot: true, 'dot--active': i === this.index }} aria-label={t('carousel.goTo', { index: i + 1 })} aria-current={i === this.index ? 'true' : undefined} onClick={() => this.go(i)}></button>
						))}
					</div>
				)}
			</section>
		);
	}
}
