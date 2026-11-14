import { useMemo, useState } from 'react';
import { FinkChip, FinkEmptyState, FinkGrid, FinkPageHeader, FinkStack, KolButton, KolInputText } from '@fink/react';
import { CATEGORIES, SOURCES, patterns, type DesignSystemSource } from '../patterns';
import { t } from '../i18n';

export function PatternsIndex() {
	const [query, setQuery] = useState('');
	const [systems, setSystems] = useState<DesignSystemSource[]>([]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		return patterns.filter(
			(p) =>
				(systems.length === 0 || p.sources.some((s) => systems.includes(s.system))) &&
				(q === '' || [p.title, p.summary, ...p.components, ...p.sources.map((s) => s.name)].some((text) => text.toLowerCase().includes(q))),
		);
	}, [query, systems]);

	return (
		<>
			<FinkPageHeader
				_heading={t('Patterns')}
				_description={t('30 wiederkehrende UX-Muster, abgeleitet aus Material Design 3, MUI, Vuetify, Carbon, GOV.UK, Atlassian, Ant Design und Polaris – jeweils umgesetzt mit Fink- und KoliBri-Komponenten.')}
			/>

			<FinkStack _gap="4">
				<KolInputText _label={t('Patterns durchsuchen')} _type="search" _icons="codicon codicon-search" _placeholder={t('z. B. Tabelle, Upload, Snackbar, Autocomplete')} _value={query} _on={{ onInput: (_e, v) => setQuery(String(v ?? '')) }} />
				<div className="chip-filter" role="group" aria-label={t('Nach Vorbild filtern')}>
					<span className="small">
						<strong>{t('Vorbild:')}</strong>
					</span>
					{SOURCES.map((system) => (
						<FinkChip
							key={system}
							_label={system}
							_count={patterns.filter((p) => p.sources.some((s) => s.system === system)).length}
							_selected={systems.includes(system)}
							onFinkToggle={(e) => setSystems((list) => (e.detail ? [...list, system] : list.filter((s) => s !== system)))}
						/>
					))}
				</div>
				<p className="muted small" role="status">
					{t('{{count}} von {{total}} Patterns', { count: filtered.length, total: patterns.length })}
				</p>
			</FinkStack>

			{filtered.length === 0 && (
				<FinkEmptyState _heading={t('Kein Pattern gefunden')} _description={t('Passe Suche oder Vorbild-Filter an.')}>
					<KolButton
						_label={t('Filter zurücksetzen')}
						_variant="primary"
						_on={{
							onClick: () => {
								setQuery('');
								setSystems([]);
							},
						}}
					/>
				</FinkEmptyState>
			)}

			{CATEGORIES.map((category) => {
				const list = filtered.filter((p) => p.category === category);
				if (list.length === 0) return null;
				return (
					<section key={category} className="section" aria-labelledby={`cat-${category}`}>
						<h2 id={`cat-${category}`}>{t(category)}</h2>
						<FinkGrid _min="17rem">
							{list.map((p) => (
								<a key={p.id} className="catalog-card pattern-card" href={`#/patterns/${p.id}`}>
									<span className="pattern-head">
										<span className="pattern-number">{String(p.number).padStart(2, '0')}</span>
										<span className={`pattern-icon ${p.icon}`} aria-hidden="true"></span>
									</span>
									<h3>{p.title}</h3>
									<p>{p.summary}</p>
									<span className="chip-row">
										{p.sources.slice(0, 3).map((s) => (
											<span key={s.system} className="source-chip">
												{s.system}
											</span>
										))}
										{p.sources.length > 3 && <span className="source-chip">+{p.sources.length - 3}</span>}
									</span>
								</a>
							))}
						</FinkGrid>
					</section>
				);
			})}
		</>
	);
}
