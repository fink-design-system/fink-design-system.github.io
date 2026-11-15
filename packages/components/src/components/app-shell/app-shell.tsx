import { Component, State, Element, Event, EventEmitter, Host, Listen, Prop, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { setViewportInset } from '../../utils/viewport-inset';

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
		this.resizeObserver?.disconnect();
		setViewportInset(this, 'top');
	}
	@Element() host!: HTMLElement;

	private headerElement?: HTMLElement;
	private resizeObserver?: ResizeObserver;

	componentDidLoad() {
		// Die angeheftete Kopfzeile darf fokussierte Elemente nicht verdecken (WCAG 2.4.11): Höhe als scroll-padding melden.
		if (this._embedded || !this.headerElement || typeof ResizeObserver === 'undefined') return;
		this.resizeObserver = new ResizeObserver(() => setViewportInset(this, 'top', (this.headerElement?.offsetHeight ?? 0) + 8));
		this.resizeObserver.observe(this.headerElement);
	}

	private mainElement?: HTMLElement;

	/** Name der Anwendung, sichtbar in der Kopfzeile. */
	@Prop() _label!: string;

	/**
	 * Bezeichnung des Navigationsbereichs. Die Navigationslandmarke selbst stellt der Slot-Inhalt
	 * (z. B. kol-nav mit `_label`).
	 */
	@Prop() _navLabel?: string;

	/** Steuert, ob das Navigationspanel auf kleinen Viewports geöffnet ist. */
	@Prop({ mutable: true, reflect: true }) _navOpen?: boolean = false;

	/**
	 * Eingebettete Vorschau innerhalb einer anderen Seite (Doku, Demo): rendert keine Landmarken
	 * (banner, navigation, main) und keinen Skip-Link, damit die Seite genau eine Hauptlandmarke behält.
	 */
	@Prop() _embedded?: boolean = false;

	/** Wird ausgelöst, wenn das Navigationspanel geöffnet oder geschlossen wird. */
	@Event() finkNavToggle!: EventEmitter<boolean>;

	// Auf Dokumentebene: Escape schließt das Overlay-Panel, wo immer der Fokus gerade liegt.
	@Listen('keydown', { target: 'document' })
	handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Escape' && this._navOpen) {
			this.setNavOpen(false);
			// Fokus zurück auf den Menü-Button, der das Panel geöffnet hat.
			(this.host.shadowRoot?.querySelector('.menu-toggle kol-button') as (HTMLElement & { focus: () => void }) | null)?.focus();
		}
	}

	private setNavOpen(open: boolean) {
		this._navOpen = open;
		if (open) {
			// Fokus in das Panel: erstes fokussierbares Element der Navigation.
			requestAnimationFrame(() => {
				const nav = this.host.querySelector<HTMLElement>('[slot="nav"]');
				(nav as (HTMLElement & { focus: () => void }) | null)?.focus();
			});
		}
		this.finkNavToggle.emit(open);
	}

	private readonly skipToMain = (event: Event) => {
		event.preventDefault();
		this.mainElement?.focus();
	};

	render() {
		const embedded = !!this._embedded;
		// Offenes Overlay-Panel (schmale Viewports): Inhalt dahinter ist nicht erreichbar (WCAG 2.4.3, 2.4.11).
		const overlay = !!this._navOpen && typeof window !== 'undefined' && window.matchMedia('(max-width: 959px)').matches;
		const Header = embedded ? 'div' : 'header';
		const Main = embedded ? 'div' : 'main';
		const Footer = embedded ? 'div' : 'footer';
		return (
			<Host>
				<Header
					class="header"
					ref={(el?: HTMLElement) => {
						this.headerElement = el;
					}}
				>
					{!embedded && (
						<a class="skip-link" href="#main" onClick={this.skipToMain}>
							{t('appShell.skip')}
						</a>
					)}
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
				</Header>
				<div class="body">
					{/*
					 * Kein eigenes <nav>: Der Slot enthält bereits die Navigationslandmarke (z. B. kol-nav).
					 * Eine zweite, gleich benannte Navigation wäre eine doppelte Landmarke (WCAG 1.3.1, 2.4.1).
					 */}
					<div class={{ nav: true, 'nav--open': !!this._navOpen }} data-label={this._navLabel ?? t('appShell.nav')}>
						<slot name="nav"></slot>
					</div>
					{/* Nur für Zeigegeräte: Per Tastatur schließen Escape und der Menü-Button das Panel. */}
					{this._navOpen && <div class="backdrop" aria-hidden="true" onClick={() => this.setNavOpen(false)}></div>}
					<Main class="main" id="main" inert={overlay} tabindex={embedded ? undefined : '-1'} ref={(el?: HTMLElement) => {
						this.mainElement = el;
					}}>
						<slot></slot>
						<Footer class="footer">
							<slot name="footer"></slot>
						</Footer>
					</Main>
				</div>
			</Host>
		);
	}
}
