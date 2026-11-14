import { Component, State, Element, Event, EventEmitter, Host, Listen, Prop, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

/**
 * Anwendungsrahmen mit Kopfzeile, Hauptnavigation und Inhaltsbereich.
 * Unterhalb von 960px wird die Navigation zum ein- und ausblendbaren Panel.
 *
 * @slot brand - Logo oder Wortmarke links in der Kopfzeile.
 * @slot actions - Aktionen rechts in der Kopfzeile.
 * @slot nav - Hauptnavigation, z. B. kol-nav.
 * @slot - Hauptinhalt.
 * @slot footer - Fußzeile unter dem Inhalt.
 *
 * @cssprop --fink-app-shell-min-height - Mindesthöhe des Rahmens (Standard: 100dvh).
 * @cssprop --fink-app-shell-nav-width - Breite der Navigation (Standard: 17rem).
 * @cssprop --fink-app-shell-header-height - Höhe der Kopfzeile (Standard: 4rem).
 */
@Component({
	tag: 'fink-app-shell',
	styleUrl: 'app-shell.css',
	shadow: true,
})
export class FinkAppShell {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}
	@Element() host!: HTMLElement;

	private mainElement?: HTMLElement;

	/** Name der Anwendung, sichtbar in der Kopfzeile. */
	@Prop() _label!: string;

	/** Barrierefreie Bezeichnung der Navigation. */
	@Prop() _navLabel?: string;

	/** Steuert, ob das Navigationspanel auf kleinen Viewports geöffnet ist. */
	@Prop({ mutable: true, reflect: true }) _navOpen?: boolean = false;

	/** Wird ausgelöst, wenn das Navigationspanel geöffnet oder geschlossen wird. */
	@Event() finkNavToggle!: EventEmitter<boolean>;

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && this._navOpen) {
			this.setNavOpen(false);
		}
	}

	private setNavOpen(open: boolean) {
		this._navOpen = open;
		this.finkNavToggle.emit(open);
	}

	private readonly skipToMain = (event: Event) => {
		event.preventDefault();
		this.mainElement?.focus();
	};

	render() {
		return (
			<Host>
				<a class="skip-link" href="#main" onClick={this.skipToMain}>
					{t('appShell.skip')}
				</a>
				<header class="header">
					<span class="menu-toggle">
						<kol-button
							_label={this._navOpen ? t('appShell.closeNav') : t('appShell.openNav')}
							_hideLabel
							_icons={this._navOpen ? 'codicon codicon-close' : 'codicon codicon-menu'}
							_ariaExpanded={this._navOpen}
							_variant="ghost"
							_on={{ onClick: () => this.setNavOpen(!this._navOpen) }}
						></kol-button>
					</span>
					<div class="brand">
						<slot name="brand"></slot>
						<span class="label">{this._label}</span>
					</div>
					<div class="actions">
						<slot name="actions"></slot>
					</div>
				</header>
				<div class="body">
					<nav class={{ nav: true, 'nav--open': !!this._navOpen }} aria-label={this._navLabel ?? t('appShell.nav')}>
						<slot name="nav"></slot>
					</nav>
					{this._navOpen && <div class="backdrop" onClick={() => this.setNavOpen(false)}></div>}
					<main class="main" id="main" tabindex="-1" ref={(el) => (this.mainElement = el)}>
						<slot></slot>
						<footer class="footer">
							<slot name="footer"></slot>
						</footer>
					</main>
				</div>
			</Host>
		);
	}
}
