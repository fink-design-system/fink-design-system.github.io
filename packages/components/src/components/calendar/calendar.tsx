import { Component, Element, Event, EventEmitter, Prop, State, Watch, h } from '@stencil/core';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';
import { parseList } from '../../utils/shared';

let uid = 0;

const DAY = 86_400_000;
const toIso = (time: number) => new Date(time).toISOString().slice(0, 10);
const fromIso = (iso?: string): number | undefined => {
	if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return undefined;
	const [y, m, d] = iso.split('-').map(Number);
	return Date.UTC(y, m - 1, d);
};
const todayUtc = () => {
	const now = new Date();
	return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
};
/** Wochentag mit Montag = 0. */
const weekday = (time: number) => (new Date(time).getUTCDay() + 6) % 7;

/**
 * Monatskalender zur Datumsauswahl im Seiteninhalt (MUI „DateCalendar“, Vuetify „v-date-picker“,
 * Material 3 „Date pickers“, Ant „Calendar“). Ergänzt kol-input-date (native Eingabe) um eine
 * sichtbare Monatsansicht mit Markierungen, z. B. freie Termine. Tastatur nach ARIA-Muster
 * „Date Picker Dialog“: Pfeile, Pos1/Ende (Wochenanfang/-ende), Bild auf/ab (Monat),
 * mit Umschalt (Jahr). Monatswechsel über kol-button.
 */
@Component({
	tag: 'fink-calendar',
	styleUrl: 'calendar.css',
	shadow: true,
})
export class FinkCalendar {
	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;
	private readonly id = `fink-calendar-${++uid}`;
	private moveFocus = false;

	@Element() host!: HTMLElement;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}

	/** Bezeichnung des Kalenders. */
	@Prop() _label!: string;

	/** Gewähltes Datum (ISO, JJJJ-MM-TT). */
	@Prop({ mutable: true, reflect: true }) _value?: string;

	/** Frühestes wählbares Datum (ISO). */
	@Prop() _min?: string;

	/** Spätestes wählbares Datum (ISO). */
	@Prop() _max?: string;

	/** Samstag und Sonntag sind nicht wählbar. */
	@Prop() _disableWeekends?: boolean = false;

	/** Markierte Tage (ISO), z. B. mit freien Terminen. */
	@Prop() _markers?: string[] | string;

	/** Bedeutung der Markierung für Screenreader, z. B. „freie Termine“. */
	@Prop() _markerLabel?: string;

	/** Liefert das gewählte Datum (ISO). */
	@Event() finkChange!: EventEmitter<string>;

	@State() focus = fromIso(this._value) ?? todayUtc();

	@Watch('_value')
	onValue(value?: string) {
		const time = fromIso(value);
		if (time !== undefined) this.focus = time;
	}

	componentWillLoad() {
		const time = fromIso(this._value);
		if (time !== undefined) this.focus = time;
	}

	componentDidRender() {
		if (!this.moveFocus) return;
		this.moveFocus = false;
		this.host.shadowRoot?.querySelector<HTMLButtonElement>('button.day[tabindex="0"]')?.focus();
	}

	private disabled(time: number) {
		const min = fromIso(this._min);
		const max = fromIso(this._max);
		if (min !== undefined && time < min) return true;
		if (max !== undefined && time > max) return true;
		return !!this._disableWeekends && weekday(time) > 4;
	}

	private shiftMonth(time: number, months: number) {
		const d = new Date(time);
		const target = Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + months, 1);
		const last = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + months + 1, 0)).getUTCDate();
		return target + (Math.min(d.getUTCDate(), last) - 1) * DAY;
	}

	private choose(time: number) {
		if (this.disabled(time)) return;
		this._value = toIso(time);
		this.focus = time;
		this.finkChange.emit(this._value);
	}

	private readonly onKeyDown = (event: KeyboardEvent) => {
		const f = this.focus;
		const map: Record<string, () => number> = {
			ArrowLeft: () => f - DAY,
			ArrowRight: () => f + DAY,
			ArrowUp: () => f - 7 * DAY,
			ArrowDown: () => f + 7 * DAY,
			Home: () => f - weekday(f) * DAY,
			End: () => f + (6 - weekday(f)) * DAY,
			PageUp: () => this.shiftMonth(f, event.shiftKey ? -12 : -1),
			PageDown: () => this.shiftMonth(f, event.shiftKey ? 12 : 1),
		};
		if (map[event.key]) {
			event.preventDefault();
			this.focus = map[event.key]();
			this.moveFocus = true;
		} else if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			this.choose(this.focus);
		}
	};

	render() {
		const lang = this.locale === 'en' ? 'en-GB' : 'de-DE';
		const view = new Date(this.focus);
		const year = view.getUTCFullYear();
		const month = view.getUTCMonth();
		const first = Date.UTC(year, month, 1);
		const start = first - weekday(first) * DAY;
		const weeks = Array.from({ length: 6 }, (_, w) => Array.from({ length: 7 }, (_, d) => start + (w * 7 + d) * DAY));
		const title = new Intl.DateTimeFormat(lang, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(first);
		const dayName = new Intl.DateTimeFormat(lang, { weekday: 'long', timeZone: 'UTC' });
		const dayShort = new Intl.DateTimeFormat(lang, { weekday: 'short', timeZone: 'UTC' });
		const full = new Intl.DateTimeFormat(lang, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
		const markers = new Set(parseList<string>(this._markers));
		const today = todayUtc();
		const selected = fromIso(this._value);
		return (
			<div class="calendar" role="group" aria-label={this._label}>
				<div class="head">
					<kol-button _label={t('calendar.prev')} _hideLabel _icons="codicon codicon-chevron-left" _variant="ghost" _on={{ onClick: () => (this.focus = this.shiftMonth(this.focus, -1)) }}></kol-button>
					<h2 class="title" id={`${this.id}-title`} aria-live="polite">
						{title}
					</h2>
					<kol-button _label={t('calendar.next')} _hideLabel _icons="codicon codicon-chevron-right" _variant="ghost" _on={{ onClick: () => (this.focus = this.shiftMonth(this.focus, 1)) }}></kol-button>
				</div>
				<table class="grid" role="grid" aria-labelledby={`${this.id}-title`} onKeyDown={this.onKeyDown}>
					<thead>
						<tr>
							{weeks[0].map((time) => (
								<th scope="col" abbr={dayName.format(time)}>
									{dayShort.format(time).replace('.', '')}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{weeks.map((week) => (
							<tr>
								{week.map((time) => {
									const outside = new Date(time).getUTCMonth() !== month;
									const disabled = this.disabled(time);
									const isSelected = time === selected;
									const marked = markers.has(toIso(time)) && !disabled;
									return (
										<td role="gridcell" aria-selected={isSelected ? 'true' : 'false'}>
											<button
												type="button"
												class={{ day: true, 'day--outside': outside, 'day--today': time === today, 'day--selected': isSelected, 'day--marked': marked }}
												tabindex={time === this.focus ? '0' : '-1'}
												aria-disabled={disabled ? 'true' : undefined}
												aria-current={time === today ? 'date' : undefined}
												aria-label={`${full.format(time)}${marked && this._markerLabel ? `, ${this._markerLabel}` : ''}`}
												onClick={() => this.choose(time)}
												onFocus={() => (this.focus = time)}
											>
												{new Date(time).getUTCDate()}
											</button>
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
				{this._markerLabel && markers.size > 0 && (
					<p class="legend">
						<span class="dot" aria-hidden="true"></span>
						{this._markerLabel}
					</p>
				)}
			</div>
		);
	}
}
