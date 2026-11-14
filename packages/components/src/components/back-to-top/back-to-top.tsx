import { Component, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

/**
 * „Nach oben“-Schaltfläche, die nach einer Scrollstrecke erscheint (Ant „FloatButton.BackTop“,
 * Carbon „Back to top“, GOV.UK „Back to top“). Baut auf kol-button auf, scrollt ohne Animation,
 * wenn reduzierte Bewegung gewünscht ist, und setzt den Fokus auf das Ziel.
 */
@Component({
	tag: 'fink-back-to-top',
	styleUrl: 'back-to-top.css',
	shadow: true,
})
export class FinkBackToTop {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	/** Scrollstrecke in Pixeln, ab der die Schaltfläche erscheint. */
	@Prop() _threshold?: number = 400;

	/** CSS-Selektor des Elements, das nach dem Scrollen den Fokus erhält (Standard: erstes h1 oder main). */
	@Prop() _target?: string;

	/** Feste Position am Viewport oder im Fluss. */
	@Prop({ reflect: true }) _position?: 'fixed' | 'inline' = 'fixed';

	@State() visible = false;

	private readonly onScroll = () => {
		this.visible = window.scrollY > (this._threshold ?? 400);
	};

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
		window.addEventListener('scroll', this.onScroll, { passive: true });
		this.onScroll();
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
		window.removeEventListener('scroll', this.onScroll);
	}

	private readonly toTop = () => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
		const target = (this._target && document.querySelector<HTMLElement>(this._target)) || document.querySelector<HTMLElement>('h1, main');
		if (target) {
			if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
			target.focus({ preventScroll: true });
		}
	};

	render() {
		const visible = this._position === 'inline' || this.visible;
		return (
			<div class={{ wrap: true, 'wrap--visible': visible }} hidden={!visible}>
				<kol-button class="button" _label={t('backToTop.label')} _icons="codicon codicon-arrow-up" _variant="secondary" _on={{ onClick: this.toTop }}></kol-button>
			</div>
		);
	}
}
