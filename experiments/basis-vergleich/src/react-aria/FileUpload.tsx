import { useId, useState } from 'react';
import { Button, DropZone, FileTrigger, Text } from 'react-aria-components';
import { formatBytes, texts, validateFile } from '../shared/texts';

interface Entry {
	file: File;
	error?: string;
}

export interface FileUploadProps {
	label: string;
	hint?: string;
	accept: string;
	maxSize: number;
	multiple?: boolean;
	error?: string;
	onChange?: (files: File[]) => void;
}

/** Datei-Upload auf React Aria: DropZone für Ziehen und Ablegen, FileTrigger für die Dateiauswahl per Tastatur. */
export function FileUpload({ label, hint, accept, maxSize, multiple = true, error, onChange }: FileUploadProps) {
	const id = useId();
	const [entries, setEntries] = useState<Entry[]>([]);
	const [status, setStatus] = useState('');

	const update = (next: Entry[], message: string) => {
		setEntries(next);
		setStatus(message);
		onChange?.(next.filter((entry) => !entry.error).map((entry) => entry.file));
	};

	const add = (files: File[]) => {
		if (!files.length) return;
		const added = files.map((file) => ({ file, error: validateFile(file, accept, maxSize) }));
		const invalid = added.filter((entry) => entry.error).length;
		update(multiple ? [...entries, ...added] : added.slice(0, 1), texts.fileAdded(added.length, invalid));
	};

	const remove = (index: number) => {
		const removed = entries[index];
		update(
			entries.filter((_, i) => i !== index),
			texts.fileRemoved(removed.file.name),
		);
	};

	return (
		<div className={`ra-upload${error ? ' ra-upload--error' : ''}`}>
			<span className="ra-label" id={`${id}-label`}>
				{label}
			</span>
			{hint && (
				<span className="ra-hint" id={`${id}-hint`}>
					{hint}
				</span>
			)}
			{error && (
				<p className="ra-error" role="alert">
					{error}
				</p>
			)}
			<DropZone
				className="ra-zone"
				aria-label={label}
				onDrop={async (event) => {
					const items = event.items.filter((item) => item.kind === 'file');
					add(await Promise.all(items.map((item) => item.getFile())));
				}}
			>
				<span className="ra-zone-icon" aria-hidden="true">
					⇪
				</span>
				<Text slot="label" className="ra-zone-text">
					{texts.fileDrop}
				</Text>
				<FileTrigger acceptedFileTypes={accept.split(',')} allowsMultiple={multiple} onSelect={(list) => list && add(Array.from(list))}>
					<Button className="ra-button" aria-describedby={`${id}-label${hint ? ` ${id}-hint` : ''}`}>
						{texts.fileChooseMany}
					</Button>
				</FileTrigger>
			</DropZone>
			{entries.length > 0 && (
				<ul className="ra-files" aria-label={texts.fileList}>
					{entries.map((entry, index) => (
						<li key={`${entry.file.name}-${index}`} className={`ra-file${entry.error ? ' ra-file--error' : ''}`}>
							<span className="ra-file-text">
								<span className="ra-file-name">{entry.file.name}</span>
								<span className="ra-file-meta">{entry.error ?? formatBytes(entry.file.size)}</span>
							</span>
							<Button className="ra-icon-button" aria-label={texts.remove(entry.file.name)} onPress={() => remove(index)}>
								<span aria-hidden="true">✕</span>
							</Button>
						</li>
					))}
				</ul>
			)}
			<span className="ra-visually-hidden" role="status">
				{status}
			</span>
		</div>
	);
}
