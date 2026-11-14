import { Component, Element, Prop, State, Watch, h } from '@stencil/core';
import { FinkTone, normalizeTone } from '../../utils/tone';
import { mixHex, onColorContextChange, resolveColor } from '../../utils/resolve-color';

const TONE: Record<FinkTone, { icon: string; color: string }> = {
	brand: { icon: 'codicon codicon-circle-filled', color: 'var(--fink-color-primary)' },
	info: { icon: 'codicon codicon-info', color: 'var(--fink-color-info)' },
	success: { icon: 'codicon codicon-pass', color: 'var(--fink-color-success)' },
	warning: { icon: 'codicon codicon-warning', color: 'var(--fink-color-warning)' },
	danger: { icon: 'codicon codicon-error', color: 'var(--fink-color-danger)' },
	neutral: { icon: 'codicon codicon-circle-large', color: 'var(--fink-color-subtle)' },
};

/**
 * Statusanzeige mit semantischem Ton. Baut auf kol-badge auf und ergänzt nur die Zuordnung
 * Ton → Farbtoken + Icon, damit der Status nie allein über die Farbe vermittelt wird.
 * Die Token-Farben werden für kol-badge in konkrete Werte aufgelöst und bei Schemawechsel aktualisiert.
 */
@Component({
	tag: 'fink-status',
	styleUrl: 'status.css',
	shadow: true,
})
export class FinkStatus {
	@Element() host!: HTMLElement;

	private unsubscribe?: () => void;

	@State() colors?: { backgroundColor: string; foregroundColor: string };

	/** Sichtbarer Statustext. */
	@Prop() _label!: string;

	/** Semantischer Farbton. */
	@Prop({ reflect: true }) _tone?: FinkTone = 'neutral';

	@Watch('_tone')
	updateColors() {
		const foreground = resolveColor(this.host, TONE[normalizeTone(this._tone)].color);
		const light = resolveColor(this.host, 'var(--fink-color-light)');
		this.colors = { foregroundColor: foreground, backgroundColor: mixHex(foreground, light, 12) };
	}

	connectedCallback() {
		this.unsubscribe = onColorContextChange(() => requestAnimationFrame(() => this.updateColors()));
	}

	disconnectedCallback() {
		this.unsubscribe?.();
	}

	componentWillLoad() {
		this.updateColors();
	}

	render() {
		return <kol-badge _label={this._label} _icons={TONE[normalizeTone(this._tone)].icon} _color={this.colors}></kol-badge>;
	}
}
