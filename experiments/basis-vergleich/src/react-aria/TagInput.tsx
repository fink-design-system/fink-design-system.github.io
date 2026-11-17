import { useState } from 'react';
import { Button, ComboBox, FieldError, Input, Label, ListBox, ListBoxItem, Popover, Tag, TagGroup, TagList, Text } from 'react-aria-components';
import { texts } from '../shared/texts';

export interface TagInputProps {
	label: string;
	placeholder?: string;
	options: string[];
	value?: string[];
	max?: number;
	allowCustom?: boolean;
	onChange?: (values: string[]) => void;
}

/** Tag-Eingabe auf React Aria: ComboBox für Eingabe und Vorschläge, TagGroup für die gewählten Werte. */
export function TagInput({ label, placeholder, options, value = [], max, allowCustom = true, onChange }: TagInputProps) {
	const [values, setValues] = useState(value);
	const [draft, setDraft] = useState('');
	const [error, setError] = useState('');
	const [status, setStatus] = useState('');
	const [open, setOpen] = useState(false);

	const commit = (next: string[], message: string) => {
		setValues(next);
		setStatus(message);
		onChange?.(next);
	};

	const add = (raw: string) => {
		const text = raw.trim().replace(/,$/, '').trim();
		if (!text) return;
		const option = options.find((o) => o.toLowerCase() === text.toLowerCase());
		if (!option && !allowCustom) return setError(texts.tagNotAllowed(text));
		const next = option ?? text;
		if (values.some((v) => v.toLowerCase() === next.toLowerCase())) return setError(texts.tagDuplicate(next));
		if (max && values.length >= max) return setError(texts.tagMax(max));
		setError('');
		setDraft('');
		commit([...values, next], texts.tagAdded(next));
	};

	const remove = (item: string) => commit(values.filter((v) => v !== item), texts.tagRemoved(item));

	// Vorschläge erst beim Tippen; mit leerem Feld schließt die Liste, damit der Rest der Seite erreichbar bleibt.
	const query = draft.trim().toLowerCase();
	const suggestions = query ? options.filter((o) => !values.includes(o) && o.toLowerCase().includes(query)) : [];

	return (
		<div className="ra-tag-input">
			<ComboBox
				className="ra-field"
				allowsCustomValue
				menuTrigger="input"
				inputValue={draft}
				selectedKey={null}
				items={suggestions.map((id) => ({ id }))}
				onInputChange={(text) => {
					setDraft(text);
					setError('');
				}}
				onSelectionChange={(key) => key !== null && add(String(key))}
				onOpenChange={setOpen}
				isInvalid={!!error}
				isDisabled={!!max && values.length >= max}
			>
				<Label className="ra-label">{label}</Label>
				<Input
					className="ra-input"
					placeholder={placeholder}
					onKeyDown={(event) => {
						const optionActive = open && !!event.currentTarget.getAttribute('aria-activedescendant');
						if (event.key === ',' || (event.key === 'Enter' && !optionActive)) {
							event.preventDefault();
							add(draft);
						} else if (event.key === 'Backspace' && draft === '' && values.length) {
							remove(values[values.length - 1]);
						}
					}}
				/>
				<Text slot="description" className="ra-hint">
					{texts.tagHint}
				</Text>
				<FieldError className="ra-error">{error}</FieldError>
				<Popover className="ra-popover" placement="bottom start">
					<ListBox className="ra-listbox">
						{(item: { id: string }) => (
							<ListBoxItem className="ra-option" id={item.id}>
								{item.id}
							</ListBoxItem>
						)}
					</ListBox>
				</Popover>
			</ComboBox>
			{values.length > 0 && (
				<TagGroup className="ra-tags" aria-label={texts.tagSelected(label)} onRemove={(keys) => keys.forEach((key) => remove(String(key)))}>
					<TagList className="ra-tag-list" items={values.map((id) => ({ id }))}>
						{(item) => (
							<Tag className="ra-tag" id={item.id} textValue={item.id}>
								{item.id}
								<Button slot="remove" className="ra-tag-remove" aria-label={texts.remove(item.id)}>
									<span aria-hidden="true">×</span>
								</Button>
							</Tag>
						)}
					</TagList>
				</TagGroup>
			)}
			<span className="ra-visually-hidden" role="status">
				{status}
			</span>
		</div>
	);
}
