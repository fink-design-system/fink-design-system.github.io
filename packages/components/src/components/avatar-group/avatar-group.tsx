import { Component, Element, Prop, State, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { parseList } from '../../utils/shared';
import { onColorContextChange, resolveColor, tintFor } from '../../utils/resolve-color';

/** Tonfarben der Initialen; der Name bestimmt die Farbe, damit dieselbe Person gleich aussieht. */
const TONES = ['primary', 'info', 'success', 'warning', 'danger'];

const hash = (value: string) => [...value].reduce((sum, char) => (sum * 31 + char.charCodeAt(0)) >>> 0, 7);

export interface FinkAvatar {
	label: string;
	src?: string;
}

/**
 * Überlappende Avatare mit „+N“ für den Rest (MUI „AvatarGroup“, Ant „Avatar.Group“,
 * Atlassian „Avatar group“). Jeder Avatar ist kol-avatar; die Gruppe nennt alle Namen.
 */
@Component({
	tag: 'fink-avatar-group',
	styleUrl: 'avatar-group.css',
	shadow: true,
})
export class FinkAvatarGroup {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private unsubscribeColors?: () => void;

	@Element() host!: HTMLElement;

	/** Aufgelöste Farbpaare je Ton (KoliBri-Avatar erwartet konkrete Farben). */
	@State() palette: Array<{ backgroundColor: string; foregroundColor: string }> = [];

	private updatePalette() {
		const light = resolveColor(this.host, 'var(--fink-color-light)');
		this.palette = TONES.map((tone) => {
			const fg = resolveColor(this.host, `var(--fink-color-${tone})`);
			return { backgroundColor: tintFor(fg, light, 18), foregroundColor: fg };
		});
	}

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
		this.unsubscribeColors = onColorContextChange(() => requestAnimationFrame(() => this.updatePalette()));
	}

	componentWillLoad() {
		this.updatePalette();
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
		this.unsubscribeColors?.();
	}

	/** Bezeichnung der Gruppe, z. B. „Bearbeitende“. */
	@Prop() _label!: string;

	/** Personen als Array oder JSON-String. */
	@Prop() _items!: FinkAvatar[] | string;

	/** Höchstzahl sichtbarer Avatare inklusive „+N“. */
	@Prop() _max?: number = 4;

	/** Größe der Avatare. */
	@Prop({ reflect: true }) _size?: 'small' | 'medium' | 'large' = 'medium';

	render() {
		const items = parseList<FinkAvatar>(this._items);
		const max = Math.max(2, this._max ?? 4);
		const overflow = items.length > max ? items.length - (max - 1) : 0;
		const visible = overflow ? items.slice(0, max - 1) : items;
		const names = items.map((item) => item.label).join(', ');
		return (
			<div class="group" role="img" aria-label={t('avatarGroup.summary', { label: this._label, count: items.length, names })} title={names}>
				{visible.map((item) => (
					<kol-avatar class="avatar" _label={item.label} _src={item.src} _color={this.palette[hash(item.label) % TONES.length]} aria-hidden="true"></kol-avatar>
				))}
				{overflow > 0 && (
					<span class="avatar more" aria-hidden="true">
						+{overflow}
					</span>
				)}
			</div>
		);
	}
}
