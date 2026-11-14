import { Component, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { parseList } from '../../utils/shared';

export interface FinkTocItem {
	/** ID des Ziel-Elements (ohne #). */
	id: string;
	label: string;
	/** Gliederungsebene: 1 = Abschnitt, 2 = Unterabschnitt. */
	level?: 1 | 2;
}

/**
 * Inhaltsverzeichnis einer langen Seite mit Hervorhebung des sichtbaren Abschnitts
 * (Ant „Anchor“, GOV.UK „Contents list“, Atlassian „Table of contents“, MUI-Doku „On this page“).
 * Einträge werden übergeben oder aus Überschriften gelesen (_selector). Der aktive Eintrag trägt
 * aria-current="location".
 */
@Component({
	tag: 'fink-toc',
	styleUrl: 'toc.css',
	shadow: true,
})
export class FinkToc {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private observer?: IntersectionObserver;

	/** Überschrift über der Liste (Standard: „Auf dieser Seite“). */
	@Prop() _label?: string;

	/** Einträge als Array oder JSON-String. */
	@Prop() _items?: FinkTocItem[] | string;

	/** Liest die Einträge aus Überschriften, z. B. „main h2, main h3“ (nur Elemente mit id). */
	@Prop() _selector?: string;

	/** Bleibt beim Scrollen am oberen Rand stehen. */
	@Prop({ reflect: true }) _sticky?: boolean = false;

	@State() items: FinkTocItem[] = [];
	@State() active?: string;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	componentDidLoad() {
		// Überschriften erscheinen in Anwendungen oft erst nach dem ersten Rendern.
		requestAnimationFrame(() => this.collect());
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
		this.observer?.disconnect();
	}

	private collect() {
		const given = parseList<FinkTocItem>(this._items);
		this.items = given.length
			? given
			: this._selector
				? Array.from(document.querySelectorAll<HTMLElement>(this._selector))
						.filter((el) => el.id)
						.map((el) => ({ id: el.id, label: el.textContent?.trim() ?? el.id, level: /^H[3-6]$/.test(el.tagName) ? 2 : 1 }))
				: [];
		this.observe();
	}

	private observe() {
		this.observer?.disconnect();
		const targets = this.items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
		const visible = new Map<string, boolean>();
		this.observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => visible.set(entry.target.id, entry.isIntersecting));
				const first = this.items.find((item) => visible.get(item.id));
				if (first) this.active = first.id;
			},
			{ rootMargin: '-10% 0px -70% 0px' },
		);
		targets.forEach((el) => this.observer!.observe(el));
		if (!this.active && targets[0]) this.active = targets[0].id;
	}

	private go(event: MouseEvent, id: string) {
		const target = document.getElementById(id);
		if (!target) return;
		event.preventDefault();
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
		if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
		target.focus({ preventScroll: true });
		this.active = id;
	}

	render() {
		const label = this._label ?? t('toc.label');
		return (
			<nav class="toc" aria-label={label}>
				<p class="title" aria-hidden="true">
					{label}
				</p>
				<ol class="items">
					{this.items.map((item) => (
						<li class={{ entry: true, 'entry--sub': item.level === 2 }}>
							<a class={{ link: true, 'link--active': item.id === this.active }} href={`#${item.id}`} aria-current={item.id === this.active ? 'location' : undefined} onClick={(e) => this.go(e, item.id)}>
								{item.label}
							</a>
						</li>
					))}
				</ol>
			</nav>
		);
	}
}
