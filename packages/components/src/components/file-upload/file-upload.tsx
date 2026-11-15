import { Component, Event, EventEmitter, Listen, Method, Prop, State, h } from '@stencil/core';
import { formatBytes } from '../../utils/shared';
import { getFinkLanguage, onFinkLanguageChange, t } from '../../i18n';

interface Entry {
	file: File;
	error?: string;
}

let uid = 0;

/**
 * Datei-Upload mit Drag & Drop, Dateiliste, Typ- und Größenprüfung.
 * Die Dateiauswahl ist kol-input-file und funktioniert vollständig ohne Maus. Entfernen-Schaltflächen sind
 * kol-button, Fehlermeldungen kol-alert; eigen ist nur die Drop-Zone mit Prüf- und Listenlogik.
 */
@Component({
	tag: 'fink-file-upload',
	styleUrl: 'file-upload.css',
	shadow: true,
})
export class FinkFileUpload {

	/** Aktuelle Sprache; Änderung löst ein neues Rendern aus. */
	@State() locale = getFinkLanguage();

	private unsubscribeLanguage?: () => void;

	connectedCallback() {
		this.unsubscribeLanguage = onFinkLanguageChange((lng) => (this.locale = lng));
	}

	disconnectedCallback() {
		this.unsubscribeLanguage?.();
	}
	private readonly id = `fink-file-upload-${++uid}`;

	/** Beschriftung des Upload-Bereichs. */
	@Prop() _label!: string;

	/** Hinweis zu erlaubten Formaten und Größen. */
	@Prop() _hint?: string;

	/** Erlaubte Dateitypen wie beim accept-Attribut, z. B. „.pdf,.jpg,image/png“. */
	@Prop() _accept?: string;

	/** Mehrere Dateien erlauben. */
	@Prop() _multiple?: boolean = true;

	/** Maximale Dateigröße in Byte. */
	@Prop() _maxSize?: number = 10 * 1024 * 1024;

	/** Deaktiviert den Upload. */
	@Prop() _disabled?: boolean = false;

	/** Fehlermeldung von außen, z. B. „Bitte mindestens eine Datei hochladen“. */
	@Prop() _error?: string;

	@State() entries: Entry[] = [];
	@State() dragging = false;
	@State() announcement = '';

	/** Liefert alle gültigen Dateien bei jeder Änderung. */
	@Event() finkFilesChange!: EventEmitter<File[]>;

	/** Entfernt alle Dateien. */
	@Method()
	async reset(): Promise<void> {
		this.entries = [];
		this.emit();
	}

	private validate(file: File): string | undefined {
		if (this._maxSize && file.size > this._maxSize) return t('fileUpload.tooLarge', { size: formatBytes(this._maxSize) });
		if (this._accept) {
			const allowed = this._accept.split(',').map((rule) => rule.trim().toLowerCase());
			const name = file.name.toLowerCase();
			const ok = allowed.some((rule) => (rule.startsWith('.') ? name.endsWith(rule) : rule.endsWith('/*') ? file.type.startsWith(rule.slice(0, -1)) : file.type === rule));
			if (!ok) return t('fileUpload.wrongType', { accept: this._accept });
		}
		return undefined;
	}

	private add(files: FileList | File[]) {
		const list = Array.from(files);
		if (list.length === 0) return;
		const added = list.map((file) => ({ file, error: this.validate(file) }));
		this.entries = this._multiple ? [...this.entries, ...added] : added.slice(0, 1);
		const invalid = added.filter((entry) => entry.error).length;
		this.announcement = `${t('fileUpload.added', { count: added.length })}${invalid ? t('fileUpload.invalid', { count: invalid }) : ''}.`;
		this.emit();
	}

	private remove(index: number) {
		const [removed] = this.entries.splice(index, 1);
		this.entries = [...this.entries];
		this.announcement = t('fileUpload.removed', { name: removed.file.name });
		this.emit();
	}

	private emit() {
		this.finkFilesChange.emit(this.entries.filter((entry) => !entry.error).map((entry) => entry.file));
	}

	private readonly onDrop = (event: DragEvent) => {
		event.preventDefault();
		this.dragging = false;
		if (!this._disabled && event.dataTransfer?.files) this.add(event.dataTransfer.files);
	};

	/*
	 * Ziehen und Ablegen ist eine Zusatzfunktion für Zeigegeräte; per Tastatur dient die Dateiauswahl.
	 * Die Listener hängen am Host, nicht an einem statischen Element (WCAG 2.1.1).
	 */
	@Listen('dragover')
	handleDragOver(event: DragEvent) {
		event.preventDefault();
		if (!this._disabled) this.dragging = true;
	}

	@Listen('dragleave')
	handleDragLeave() {
		this.dragging = false;
	}

	@Listen('drop')
	handleDrop(event: DragEvent) {
		this.onDrop(event);
	}

	render() {
		return (
			<div class={{ upload: true, 'upload--error': !!this._error }}>
				<span class="label" id={`${this.id}-label`}>
					{this._label}
				</span>
				{this._hint && (
					<span class="hint" id={`${this.id}-hint`}>
						{this._hint}
					</span>
				)}
				{this._error && (
					<kol-alert class="error" id={`${this.id}-error`} _type="error" _variant="msg">
						{this._error}
					</kol-alert>
				)}
				<div class={{ zone: true, 'zone--active': this.dragging, 'zone--disabled': !!this._disabled }}>
					<span class="zone-icon">
						<kol-icon _icons="codicon codicon-cloud-upload" _label=""></kol-icon>
					</span>
					<span class="zone-text">{t('fileUpload.drop')}</span>
					<kol-input-file
						class="pick"
						_label={this._multiple ? t('fileUpload.chooseMany') : t('fileUpload.chooseOne')}
						_hint={[this._label, this._hint].filter(Boolean).join('. ')}
						_hideLabel
						_hideMsg
						_accept={this._accept}
						_multiple={this._multiple}
						_disabled={this._disabled}
						_on={{
							onChange: (event: Event, value: unknown) => {
								const files = value instanceof FileList ? value : (event.target as HTMLInputElement | null)?.files;
								if (files) this.add(files);
							},
						}}
					></kol-input-file>
				</div>
				{this.entries.length > 0 && (
					<ul class="files" aria-label={t('fileUpload.list')}>
						{this.entries.map((entry, index) => (
							<li class={{ file: true, 'file--error': !!entry.error }}>
								<kol-icon class="file-icon" _icons={entry.error ? 'codicon codicon-error' : 'codicon codicon-file'} _label=""></kol-icon>
								<span class="file-text">
									<span class="file-name">{entry.file.name}</span>
									<span class="file-meta">{entry.error ?? formatBytes(entry.file.size)}</span>
								</span>
								<kol-button
									class="file-remove"
									_label={t('fileUpload.remove', { name: entry.file.name })}
									_hideLabel
									_icons="codicon codicon-trash"
									_variant="ghost"
									_on={{ onClick: () => this.remove(index) }}
								></kol-button>
							</li>
						))}
					</ul>
				)}
				<span class="visually-hidden" role="status">
					{this.announcement}
				</span>
			</div>
		);
	}
}
