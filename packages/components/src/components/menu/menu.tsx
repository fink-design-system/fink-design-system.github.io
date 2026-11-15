import { Component, Element, Event, EventEmitter, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange } from '../../i18n';
import { parseList } from '../../utils/shared';

/** Methoden von kol-popover-button, die das Menü nutzt. */
type PopoverButton = Omit<HTMLElement, 'showPopover' | 'hidePopover' | 'focus'> & { showPopover(): Promise<void>; hidePopover(): Promise<void>; focus(): Promise<void> };

export interface FinkMenuItem {
	/** Art des Eintrags; Standard ist „item“. */
	type?: 'item' | 'checkbox' | 'divider' | 'heading';
	id?: string;
	label?: string;
	/** Icon-Klassen vor dem Text. */
	icon?: string;
	/** Tastenkürzel als Hinweis rechts, z. B. „Strg+D“. */
	shortcut?: string;
	/** Zweite Zeile. */
	description?: string;
	/** Zustand eines Checkbox-Eintrags. */
	checked?: boolean;
	/** Destruktive Aktion (rot). */
	danger?: boolean;
	disabled?: boolean;
}

/**
 * Aktionsmenü an einer Schaltfläche (MUI „Menu“, Vuetify „v-menu“, Material 3 „Menus“).
 * Auslöser und Popover kommen von kol-popover-button; Fink ergänzt die Menüsemantik
 * (role="menu", Pfeiltasten, Pos1/Ende, Tippen springt zum Eintrag, Escape) sowie
 * Gruppen, Trennlinien, Tastenkürzel und Checkbox-Einträge.
 */
@Component({
	tag: 'fink-menu',
	styleUrl: 'menu.css',
	shadow: true,
})
export class FinkMenu {
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

	private popover?: PopoverButton;
	private menu?: HTMLElement;

	/** Beschriftung des Auslösers (bei _hideLabel als Tooltip und Name). */
	@Prop() _label!: string;

	/** Icon-Klassen des Auslösers, z. B. „codicon codicon-kebab-vertical“. */
	@Prop() _icons?: string;

	/** Zeigt nur das Icon des Auslösers. */
	@Prop() _hideLabel?: boolean = false;

	/** Variante des Auslösers (KoliBri-Button-Varianten). */
	@Prop() _variant?: 'primary' | 'secondary' | 'normal' | 'tertiary' | 'ghost' | 'danger' = 'secondary';

	/** Position des Menüs relativ zum Auslöser. */
	@Prop() _align?: 'top' | 'right' | 'bottom' | 'left' = 'bottom';

	/** Einträge als Array oder JSON-String. */
	@Prop() _items!: FinkMenuItem[] | string;

	/** Deaktiviert den Auslöser. */
	@Prop() _disabled?: boolean = false;

	/** Liefert die ID des gewählten Eintrags. */
	@Event() finkSelect!: EventEmitter<string>;

	/** Liefert ID und neuen Zustand eines Checkbox-Eintrags. */
	@Event() finkCheck!: EventEmitter<{ id: string; checked: boolean }>;

	private items(): HTMLElement[] {
		return Array.from(this.menu?.querySelectorAll<HTMLElement>('[role^="menuitem"]:not([aria-disabled="true"])') ?? []);
	}

	private focusItem(index: number) {
		const items = this.items();
		if (items.length === 0) return;
		items[(index + items.length) % items.length].focus();
	}

	private readonly onTriggerClick = (event: MouseEvent) => {
		if (this.menu && event.composedPath().includes(this.menu)) return;
		// kol-popover-button öffnet selbst; danach den ersten Eintrag fokussieren (Menü-Muster der APG).
		requestAnimationFrame(() => requestAnimationFrame(() => {
			if (this.menu?.checkVisibility?.() ?? this.menu?.offsetParent) this.focusItem(0);
		}));
	};

	private readonly onTriggerKey = (event: KeyboardEvent) => {
		// Tasten aus dem geöffneten Menü steigen bis hierher auf; die behandelt onMenuKey.
		if (this.menu && event.composedPath().includes(this.menu)) return;
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			event.preventDefault();
			const last = event.key === 'ArrowUp';
			void this.popover?.showPopover().then(() => requestAnimationFrame(() => this.focusItem(last ? -1 : 0)));
		}
	};

	private close(focusTrigger = true) {
		void this.popover?.hidePopover();
		if (focusTrigger) void this.popover?.focus();
	}

	private readonly onMenuKey = (event: KeyboardEvent) => {
		const items = this.items();
		const index = items.indexOf(this.host.shadowRoot?.activeElement as HTMLElement);
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				this.focusItem(index + 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				this.focusItem(index - 1);
				break;
			case 'Home':
				event.preventDefault();
				this.focusItem(0);
				break;
			case 'End':
				event.preventDefault();
				this.focusItem(-1);
				break;
			case 'Escape':
				event.preventDefault();
				event.stopPropagation();
				this.close();
				break;
			case 'Tab':
				this.close(false);
				break;
			default:
				if (event.key.length === 1 && /\S/.test(event.key)) {
					const char = event.key.toLowerCase();
					const order = [...items.slice(index + 1), ...items.slice(0, index + 1)];
					order.find((item) => item.textContent?.trim().toLowerCase().startsWith(char))?.focus();
				}
		}
	};

	private activate(item: FinkMenuItem) {
		if (item.disabled || !item.id) return;
		if (item.type === 'checkbox') {
			this.finkCheck.emit({ id: item.id, checked: !item.checked });
			return;
		}
		this.finkSelect.emit(item.id);
		this.close();
	}

	render() {
		const items = parseList<FinkMenuItem>(this._items);
		return (
			<kol-popover-button
				ref={(el: HTMLElement | undefined) => (this.popover = el as unknown as PopoverButton)}
				_label={this._label}
				_icons={this._icons}
				_hideLabel={this._hideLabel}
				_variant={this._variant}
				_popoverAlign={this._align}
				_disabled={this._disabled}
				onClick={this.onTriggerClick}
				onKeyDown={this.onTriggerKey}
			>
				<div class="menu" role="menu" aria-label={this._label} tabindex="-1" ref={(el) => (this.menu = el)} onKeyDown={this.onMenuKey}>
					{items.map((item) => {
						if (item.type === 'divider') return <div class="divider" role="separator"></div>;
						if (item.type === 'heading') return <div class="heading" role="presentation">{item.label}</div>;
						const checkbox = item.type === 'checkbox';
						return (
							<button
								type="button"
								class={{ item: true, 'item--danger': !!item.danger }}
								role={checkbox ? 'menuitemcheckbox' : 'menuitem'}
								aria-checked={checkbox ? String(!!item.checked) : undefined}
								aria-disabled={item.disabled ? 'true' : undefined}
								tabindex="-1"
								onClick={() => this.activate(item)}
							>
								<span class="icon" aria-hidden="true">
									{checkbox ? item.checked && <kol-icon _icons="codicon codicon-check" _label=""></kol-icon> : item.icon && <kol-icon _icons={item.icon} _label=""></kol-icon>}
								</span>
								<span class="text">
									<span class="label">{item.label}</span>
									{item.description && <span class="description">{item.description}</span>}
								</span>
								{item.shortcut && <kbd class="shortcut">{item.shortcut}</kbd>}
							</button>
						);
					})}
				</div>
			</kol-popover-button>
		);
	}
}
