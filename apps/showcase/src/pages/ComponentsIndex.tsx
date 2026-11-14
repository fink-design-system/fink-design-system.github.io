import { useMemo, useState } from 'react';
import { FinkEmptyState, FinkGrid, FinkPageHeader, KolButton, KolInputText, KolSingleSelect } from '@fink/react';
import { catalog } from '../catalog';
import { t } from '../i18n';

const layerOptions = [
	{ label: t('Alle Schichten'), value: 'all' },
	{ label: t('Fink-Komposita'), value: 'fink' },
	{ label: t('KoliBri-Atome'), value: 'kolibri' },
];

export function ComponentsIndex() {
	const [query, setQuery] = useState('');
	const [layer, setLayer] = useState('all');

	const results = useMemo(() => {
		const q = query.trim().toLowerCase();
		return catalog.filter(
			(entry) =>
				(layer === 'all' || entry.layer === layer) &&
				(q === '' || [entry.name, entry.tag, entry.summary, entry.category].some((text) => text.toLowerCase().includes(q))),
		);
	}, [query, layer]);

	return (
		<>
			<FinkPageHeader
				_heading={t('Komponenten')}
				_description={t('Fink-Komposita (fink-*) entstehen aus KoliBri-Atomen (kol-*). Beide Schichten tragen das Fink-Theme und stehen über @fink/react bereit.')}
			/>
			<div className="catalog-filter" role="search">
				<KolInputText _label={t('Komponenten durchsuchen')} _type="search" _value={query} _icons="codicon codicon-search" _on={{ onInput: (_e, value) => setQuery(String(value ?? '')) }} />
				<KolSingleSelect _label={t('Schicht')} _options={layerOptions} _value={layer} _on={{ onChange: (_e, value) => setLayer(String(value)) }} />
			</div>
			<p className="muted small" aria-live="polite">
				{t('{{count}} von {{total}} Komponenten', { count: results.length, total: catalog.length })}
			</p>
			{results.length === 0 ? (
				<FinkEmptyState _heading={t('Keine Komponente gefunden')} _description={t('Für „{{query}}“ gibt es keinen Treffer.', { query })}>
					<KolButton
						_label={t('Suche zurücksetzen')}
						_variant="primary"
						_on={{
							onClick: () => {
								setQuery('');
								setLayer('all');
							},
						}}
					/>
				</FinkEmptyState>
			) : (
				<FinkGrid _min="16rem">
					{results.map((entry) => (
						<a key={entry.id} className="catalog-card" href={`#/components/${entry.id}`}>
							<span className="preview" aria-hidden="true">
								<span className={entry.icon}></span>
							</span>
							<span className="chip-row">
								<span className={`layer-chip layer-chip--${entry.layer}`}>{entry.layer === 'fink' ? 'Fink' : 'KoliBri'}</span>
								<span className="layer-chip" style={{ background: 'var(--fink-color-mute)' }}>
									{entry.category}
								</span>
							</span>
							<h3>{entry.name}</h3>
							<p>{entry.summary}</p>
							<span className="tag">&lt;{entry.tag}&gt;</span>
						</a>
					))}
				</FinkGrid>
			)}
		</>
	);
}
