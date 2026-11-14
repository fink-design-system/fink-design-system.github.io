import { Component, Element, Prop, State, h } from '@stencil/core';
import { CodeLanguage, highlight } from '../../utils/highlight';
import { parseList } from '../../utils/shared';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

export interface FinkCodeTab {
	label: string;
	code: string;
	language?: CodeLanguage;
	filename?: string;
}

let uid = 0;

/**
 * Codebeispiel für Dokumentationen: Syntax-Hervorhebung, Dateiname, Zeilennummern, Kopieren
 * und mehrere Varianten als Tabs (z. B. React, HTML, Vue).
 */
@Component({
	tag: 'fink-code-block',
	styleUrl: 'code-block.css',
	shadow: true,
})
export class FinkCodeBlock {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	@Element() host!: HTMLElement;

	/** Schmale Fläche: Kopieren-Schaltfläche nur als Icon, damit die Tabs Platz behalten. */
	@State() narrow = false;

	private unsubscribeLanguage?: () => void;
	private resizeObserver?: ResizeObserver;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
		if (typeof ResizeObserver !== 'undefined') {
			this.resizeObserver = new ResizeObserver(([entry]) => {
				const narrow = entry.contentRect.width < 480;
				if (narrow !== this.narrow) this.narrow = narrow;
			});
			this.resizeObserver.observe(this.host);
		}
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
		this.resizeObserver?.disconnect();
	}
	private readonly id = `fink-code-${++uid}`;

	/** Einzelner Code (ohne Tabs). */
	@Prop() _code?: string;

	/** Sprache für _code. */
	@Prop() _language?: CodeLanguage = 'tsx';

	/** Dateiname bzw. Titel über dem Code. */
	@Prop() _filename?: string;

	/** Mehrere Varianten als Tabs, als Array oder JSON-String. */
	@Prop() _tabs?: FinkCodeTab[] | string;

	/** Zeigt Zeilennummern. */
	@Prop() _lineNumbers?: boolean = false;

	/** Maximale Höhe; darüber wird gescrollt. */
	@Prop() _maxHeight?: string;

	@State() active = 0;
	@State() copied = false;

	private get tabs(): FinkCodeTab[] {
		const tabs = parseList<FinkCodeTab>(this._tabs);
		if (tabs.length) return tabs;
		return [{ label: this._filename ?? this._language ?? 'Code', code: this._code ?? '', language: this._language, filename: this._filename }];
	}

	private async copy(code: string) {
		try {
			await navigator.clipboard.writeText(code);
			this.copied = true;
			window.setTimeout(() => (this.copied = false), 1800);
		} catch {
			this.copied = false;
		}
	}

	private onTabKey(event: KeyboardEvent, count: number) {
		const keys: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };
		if (!(event.key in keys) && event.key !== 'Home' && event.key !== 'End') return;
		event.preventDefault();
		const next = event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : (this.active + keys[event.key] + count) % count;
		this.active = next;
		const root = (event.currentTarget as HTMLElement).getRootNode() as ShadowRoot;
		(root.getElementById(`${this.id}-tab-${next}`) as HTMLElement | null)?.focus();
	}

	render() {
		const tabs = this.tabs;
		const index = Math.min(this.active, tabs.length - 1);
		const tab = tabs[index];
		const code = tab.code.replace(/^\n+|\s+$/g, '');
		const lines = code.split('\n');
		const showTabs = tabs.length > 1;
		return (
			<div class="block">
				<div class="bar">
					{showTabs ? (
						<div class="tabs" role="tablist" aria-label={t('codeBlock.variants')} onKeyDown={(event) => this.onTabKey(event, tabs.length)}>
							{tabs.map((t, i) => (
								<button
									id={`${this.id}-tab-${i}`}
									class={{ tab: true, 'tab--active': i === index }}
									type="button"
									role="tab"
									aria-selected={i === index ? 'true' : 'false'}
									aria-controls={`${this.id}-panel`}
									tabindex={i === index ? 0 : -1}
									onClick={() => (this.active = i)}
								>
									{t.label}
								</button>
							))}
						</div>
					) : (
						<span class="filename">{tab.filename ?? tab.language}</span>
					)}
					{showTabs && tab.filename && <span class="filename filename--secondary">{tab.filename}</span>}
					<kol-button
						class="copy"
						_label={this.copied ? t('codeBlock.copied') : t('codeBlock.copy')}
						_icons={this.copied ? 'codicon codicon-check' : 'codicon codicon-copy'}
						_hideLabel={this.narrow}
						_variant="ghost"
						_on={{ onClick: () => this.copy(code) }}
					></kol-button>
					<span class="visually-hidden" role="status">
						{this.copied ? t('codeBlock.status') : ''}
					</span>
				</div>
				<pre
					id={`${this.id}-panel`}
					class={{ pre: true, 'pre--numbers': !!this._lineNumbers }}
					role={showTabs ? 'tabpanel' : undefined}
					aria-labelledby={showTabs ? `${this.id}-tab-${index}` : undefined}
					tabindex="0"
					style={this._maxHeight ? { maxHeight: this._maxHeight } : undefined}
				>
					{this._lineNumbers && (
						<span class="numbers" aria-hidden="true">
							{lines.map((_, i) => (
								<span>{i + 1}</span>
							))}
						</span>
					)}
					<code innerHTML={highlight(code, tab.language ?? 'tsx')}></code>
				</pre>
			</div>
		);
	}
}
