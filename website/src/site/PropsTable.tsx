import docs from '@fink-ui/components/dist/docs.json';
import { t } from '../i18n';
import { DocTable } from './DocTable';

interface DocProp {
	name: string;
	type: string;
	default?: string;
	docs: string;
	required: boolean;
}

interface DocComponent {
	tag: string;
	docs: string;
	props: DocProp[];
	events: { event: string; detail: string; docs: string }[];
	slots: { name: string; docs: string }[];
	styles: { name: string; docs: string }[];
}

const components = (docs as unknown as { components: DocComponent[] }).components;

export const getDocs = (tag: string): DocComponent | undefined => components.find((c) => c.tag === tag);

/** API-Tabellen (Props, Events, Slots, CSS-Properties) aus dem Stencil-docs-json, dargestellt mit fink-table-stateless. */
export function ApiTables({ tag }: { tag: string }) {
	const doc = getDocs(tag);
	if (!doc) return null;
	return (
		<div className="api-tables">
			<DocTable
				label={t('Properties')}
				columns={[
					{ key: 'name', label: t('Name'), code: true },
					{ key: 'type', label: t('Typ'), code: true },
					{ key: 'default', label: t('Standard'), code: true },
					{ key: 'docs', label: t('Beschreibung') },
				]}
				rows={doc.props.map((prop) => ({
					name: prop.required ? `${prop.name} *` : prop.name,
					type: prop.type,
					default: prop.default ?? '–',
					docs: t(prop.docs),
				}))}
			/>
			{doc.events.length > 0 && (
				<DocTable
					label={t('Events')}
					columns={[
						{ key: 'event', label: t('Event'), code: true },
						{ key: 'detail', label: t('Detail'), code: true },
						{ key: 'docs', label: t('Beschreibung') },
					]}
					rows={doc.events.map((event) => ({ event: event.event, detail: event.detail, docs: t(event.docs) }))}
				/>
			)}
			{doc.slots.length > 0 && (
				<DocTable
					label={t('Slots')}
					columns={[
						{ key: 'name', label: t('Slot'), code: true },
						{ key: 'docs', label: t('Beschreibung') },
					]}
					rows={doc.slots.map((slot) => ({ name: slot.name || t('(Standard)'), docs: t(slot.docs) }))}
				/>
			)}
			{doc.styles.length > 0 && (
				<DocTable
					label={t('CSS Custom Properties')}
					columns={[
						{ key: 'name', label: t('Property'), code: true },
						{ key: 'docs', label: t('Beschreibung') },
					]}
					rows={doc.styles.map((style) => ({ name: style.name, docs: t(style.docs) }))}
				/>
			)}
		</div>
	);
}
