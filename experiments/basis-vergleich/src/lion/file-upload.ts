import { css, html } from 'lit';
import { LionInputFile, LionSelectedFileList } from '@lion/ui/input-file.js';
import { formatBytes, texts } from '../shared/texts';

type ListedFile = Parameters<LionSelectedFileList['_listItemAfterTemplate']>[0];

/** Dateiliste mit Größe, Fink-Gestaltung und Hochkontrastmodus. */
class FinkLionFileList extends LionSelectedFileList {
	_listItemAfterTemplate(file: ListedFile, fileUuid: string) {
		return html`<span class="meta">${file.status === 'FAIL' ? '' : formatBytes(file.systemFile.size ?? 0)}</span>${super._listItemAfterTemplate(file, fileUuid)}`;
	}

	_removeButtonContentTemplate() {
		return html`<span aria-hidden="true">✕</span>`;
	}

	static get styles() {
		return [
			...super.styles,
			css`
				.selected__list {
					display: grid;
					gap: var(--fink-space-2);
				}

				.selected__list__item {
					padding: var(--fink-space-2) var(--fink-space-2) var(--fink-space-2) var(--fink-space-3);
					border: var(--fink-border-width) solid var(--fink-color-mute-variant);
					border-radius: var(--fink-radius-md);
					background: var(--fink-color-light);
				}

				.selected__list__item[status='fail'] {
					border-color: var(--fink-color-danger);
					color: var(--fink-color-danger);
				}

				.selected__list__item__label {
					display: flex;
					align-items: center;
					gap: var(--fink-space-3);
				}

				.selected__list__item__label__text {
					flex: 1 1 auto;
					min-width: 0;
					overflow-wrap: anywhere;
				}

				.meta {
					color: var(--fink-color-subtle);
					font-size: var(--fink-type-scale-sm);
				}

				.selected__list__item__remove-button {
					display: inline-grid;
					place-items: center;
					width: 44px;
					height: 44px;
					border: 0;
					border-radius: var(--fink-radius-md);
					background: transparent;
					color: var(--fink-color-subtle);
					cursor: pointer;
				}

				.selected__list__item__remove-button:hover {
					background: var(--fink-color-mute);
					color: var(--fink-color-danger);
				}

				.selected__list__item__remove-button:focus-visible {
					outline: 3px solid var(--fink-color-primary);
					outline-offset: 2px;
				}

				@media (forced-colors: active) {
					.selected__list__item {
						border-color: CanvasText;
					}

					.selected__list__item__remove-button:focus-visible {
						outline-color: Highlight;
					}
				}
			`,
		];
	}
}

/** Datei-Upload auf Lion: lion-input-file mit Drop-Zone, abgeleitet für Fink-Gestaltung und Statusmeldung. */
export class FinkLionFileUpload extends LionInputFile {
	static get scopedElements() {
		return { ...super.scopedElements, 'lion-selected-file-list': FinkLionFileList };
	}

	private statusNode?: HTMLElement;

	connectedCallback() {
		super.connectedCallback();
		this.enableDropZone = true;
		if (!this.statusNode) {
			this.statusNode = document.createElement('span');
			this.statusNode.setAttribute('role', 'status');
			this.statusNode.className = 'fink-lion-status';
			this.appendChild(this.statusNode);
		}
		this.addEventListener('file-list-changed', (event) => {
			const added = (event as CustomEvent<{ newFiles: File[] }>).detail.newFiles;
			queueMicrotask(() => {
				const invalid = this._selectedFilesMetaData.filter((f) => f.status === 'FAIL' && added.some((a) => a.name === f.systemFile.name)).length;
				this.announce(texts.fileAdded(added.length, invalid));
			});
		});
		this.addEventListener('file-removed', (event) => this.announce(texts.fileRemoved((event as CustomEvent<{ removedFile: { systemFile: File } }>).detail.removedFile.systemFile.name)));
	}

	private announce(message: string) {
		if (this.statusNode) this.statusNode.textContent = message;
		const valid = this._selectedFilesMetaData.filter((f) => f.status !== 'FAIL').map((f) => f.systemFile);
		this.dispatchEvent(new CustomEvent('fink-files-change', { detail: valid }));
	}

	static get styles() {
		return [
			...super.styles,
			css`
				:host {
					display: block;
					font-family: var(--fink-font-family);
					color: var(--fink-color-text);
				}

				.form-field__group-one {
					display: grid;
					gap: var(--fink-space-1);
					margin-block-end: var(--fink-space-2);
				}

				.input-group__container {
					width: auto;
				}

				.input-file__drop-zone {
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: center;
					gap: var(--fink-space-2) var(--fink-space-3);
					padding: var(--fink-space-6) var(--fink-space-4);
					border: 2px dashed var(--fink-color-mute-variant);
					border-radius: var(--fink-radius-lg);
					background: var(--fink-color-light);
					text-align: center;
				}

				.input-file__drop-zone::before {
					content: '⇪';
					display: block;
					width: 100%;
					color: var(--fink-color-primary);
					font-size: 2rem;
				}

				:host([is-dragging]) .input-file__drop-zone {
					border-color: var(--fink-color-primary);
					background: var(--fink-color-secondary);
				}

				.input-file__drop-zone__text {
					color: var(--fink-color-subtle);
				}

				.input-group__after {
					margin-block-start: var(--fink-space-2);
				}

				@media (forced-colors: active) {
					.input-file__drop-zone {
						border-color: CanvasText;
					}
				}
			`,
		];
	}
}

customElements.define('fink-lion-file-upload', FinkLionFileUpload);
