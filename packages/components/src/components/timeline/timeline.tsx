import { Component, State, Prop, h } from '@stencil/core';
import { FinkTone, normalizeTone } from '../../utils/tone';
import { parseList } from '../../utils/shared';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

export interface FinkTimelineItem {
	title: string;
	date?: string;
	description?: string;
	tone?: FinkTone;
	icon?: string;
}

/**
 * Chronologischer Verlauf von Ereignissen (Aktivitäten, Bearbeitungsschritte, Kommentare).
 */
@Component({
	tag: 'fink-timeline',
	styleUrl: 'timeline.css',
	shadow: true,
})
export class FinkTimeline {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}
	/** Einträge als Array oder JSON-String, neueste zuerst. */
	@Prop() _items!: FinkTimelineItem[] | string;

	/** Barrierefreie Bezeichnung der Liste. */
	@Prop() _label?: string;

	render() {
		const items = parseList<FinkTimelineItem>(this._items);
		return (
			<ol class="timeline" aria-label={this._label ?? t('timeline.label')}>
				{items.map((item) => (
					<li class={`item tone--${normalizeTone(item.tone, 'brand')}`}>
						<span class="marker" aria-hidden="true">
							{item.icon ? <kol-icon _icons={item.icon} _label=""></kol-icon> : <span class="dot"></span>}
						</span>
						<div class="body">
							<div class="head">
								<span class="title">{item.title}</span>
								{item.date && <time class="date">{item.date}</time>}
							</div>
							{item.description && <p class="description">{item.description}</p>}
						</div>
					</li>
				))}
			</ol>
		);
	}
}
