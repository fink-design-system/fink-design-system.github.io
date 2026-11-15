import { Component, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { parseList } from '../../utils/shared';

export interface FinkImage {
	src: string;
	alt: string;
	/** Bildunterschrift. */
	title?: string;
	/** Zweite Zeile der Bildunterschrift. */
	subtitle?: string;
	/** Spalten-/Zeilenspanne in der Variante „quilted“. */
	cols?: number;
	rows?: number;
}

type Dialog = HTMLElement & { openModal(): Promise<void>; closeModal(): Promise<void> };

/**
 * Bildergalerie als Raster, Masonry oder „quilted“ mit Lightbox (MUI „Image List“,
 * Ant „Image.PreviewGroup“, Vuetify-Muster „Gallery“). Vorschaubilder sind kol-image in
 * Schaltflächen; die Lightbox ist ein kol-dialog mit Zurück/Weiter und Pfeiltasten.
 */
@Component({
	tag: 'fink-image-list',
	styleUrl: 'image-list.css',
	shadow: true,
})
export class FinkImageList {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private dialog?: Dialog;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}

	/** Bezeichnung der Galerie. */
	@Prop() _label!: string;

	/** Bilder als Array oder JSON-String. */
	@Prop() _items!: FinkImage[] | string;

	/** Anordnung. */
	@Prop() _variant?: 'standard' | 'masonry' | 'quilted' = 'standard';

	/** Spalten ab mittlerer Breite (auf schmalen Flächen zwei). */
	@Prop() _cols?: number = 3;

	/** Bildunterschriften unter den Bildern zeigen. */
	@Prop() _captions?: boolean = true;

	/** Großansicht beim Anklicken. */
	@Prop() _lightbox?: boolean = true;

	@State() index = 0;

	private open(index: number) {
		this.index = index;
		void this.dialog?.openModal();
	}

	private step(delta: number, count: number) {
		this.index = (this.index + delta + count) % count;
	}

	render() {
		const items = parseList<FinkImage>(this._items);
		const current = items[this.index];
		const variant = this._variant ?? 'standard';
		return (
			<div class="gallery">
				<ul class={{ grid: true, [`grid--${variant}`]: true }} aria-label={this._label} style={{ '--cols': String(this._cols ?? 3) }}>
					{items.map((item, i) => {
						const image = <kol-image class="image" _src={item.src} _alt={this._lightbox ? '' : item.alt} _loading="lazy"></kol-image>;
						/*
						 * Die Bildunterschrift liegt außerhalb der Schaltfläche: Sichtbarer Text muss sonst Teil des
						 * zugänglichen Namens sein (WCAG 2.5.3), und eine figure ist kein erlaubter Inhalt eines button.
						 */
						return (
							<li class="cell" style={variant === 'quilted' ? { gridColumn: `span ${item.cols ?? 1}`, gridRow: `span ${item.rows ?? 1}` } : undefined}>
								<figure class="figure">
									{this._lightbox ? (
										<button type="button" class="open" aria-label={t('imageList.open', { alt: item.alt })} onClick={() => this.open(i)}>
											{image}
										</button>
									) : (
										image
									)}
									{this._captions && item.title && (
										<figcaption class="caption">
											<span class="title">{item.title}</span>
											{item.subtitle && <span class="subtitle">{item.subtitle}</span>}
										</figcaption>
									)}
								</figure>
							</li>
						);
					})}
				</ul>
				{this._lightbox && (
					<kol-dialog
						ref={(el: HTMLElement | undefined) => (this.dialog = el as Dialog)}
						_label={current?.title ?? current?.alt ?? this._label}
						_width="min(64rem, 94vw)"
						_variant="card"
						onKeyDown={(e: KeyboardEvent) => {
							if (e.key === 'ArrowRight') this.step(1, items.length);
							if (e.key === 'ArrowLeft') this.step(-1, items.length);
						}}
					>
						{current && (
							<div class="lightbox">
								<kol-image class="large" _src={current.src} _alt={current.alt}></kol-image>
								<div class="lightbox-bar">
									<kol-button _label={t('imageList.prev')} _hideLabel _icons="codicon codicon-chevron-left" _variant="secondary" _on={{ onClick: () => this.step(-1, items.length) }}></kol-button>
									<p class="lightbox-caption" aria-live="polite">
										<strong>{current.title ?? current.alt}</strong>
										{current.subtitle && <span> · {current.subtitle}</span>}
										<span class="counter">{t('imageList.position', { index: this.index + 1, count: items.length })}</span>
									</p>
									<kol-button _label={t('imageList.next')} _hideLabel _icons="codicon codicon-chevron-right" _variant="secondary" _on={{ onClick: () => this.step(1, items.length) }}></kol-button>
								</div>
							</div>
						)}
					</kol-dialog>
				)}
			</div>
		);
	}
}
