import { FinkGrid, FinkPageHeader, FinkSegmented, FinkStatCard, FinkStatus, FinkToc } from '@fink-ui/react';
import { Fragment, useMemo, useState } from 'react';
import { findEntry } from '../catalog';
import { benchmark, coverageOf, systems, type Coverage } from '../catalog/benchmark';
import { t } from '../i18n';

const TIERS = [
	{ tier: 1, id: 'tier-1', title: 'Stufe 1: Grundbausteine', intro: 'Komponenten, die in fast jeder Anwendung vorkommen.' },
	{ tier: 2, id: 'tier-2', title: 'Stufe 2: Verbreitet', intro: 'Häufig in Fach- und Bürgeranwendungen, aber nicht überall nötig.' },
	{ tier: 3, id: 'tier-3', title: 'Stufe 3: Spezialisiert', intro: 'Seltener gebraucht; hier unterscheiden sich die Systeme am stärksten.' },
] as const;

const COVERAGE: Record<Coverage, { label: string; tone: 'success' | 'brand' | 'warning' | 'neutral' }> = {
	kolibri: { label: 'KoliBri', tone: 'success' },
	fink: { label: 'Fink', tone: 'brand' },
	partial: { label: 'teilweise', tone: 'warning' },
	missing: { label: 'fehlt', tone: 'neutral' },
};

/** Vergleich der Komponentenabdeckung mit MUI, Vuetify, Material 3, Carbon und Ant Design. */
export function Compare() {
	const [filter, setFilter] = useState('all');
	const total = benchmark.length;
	const rows = useMemo(
		() =>
			filter === 'gaps'
				? benchmark.filter((row) => row.coverage === 'partial' || row.coverage === 'missing')
				: filter === 'fink'
					? benchmark.filter((row) => row.coverage === 'fink')
					: benchmark,
		[filter],
	);
	const kolibri = benchmark.filter((row) => row.coverage === 'kolibri').length;
	return (
		<>
			<FinkPageHeader
				_heading={t('Vergleich')}
				_description={t(
					'Wie viel von dem, was die großen Design-Systeme bieten, deckt Fink ab? Die Zeilen sind nach Verbreitung geordnet – von Bausteinen, die jede Anwendung braucht, bis zu Spezialfällen. KoliBri zuerst, Fink für die Lücken.',
				)}
			/>
			<FinkGrid _min="9.5rem">
				<FinkStatCard _level={2} _label={t('Fink gesamt')} _value={`${coverageOf('fink')} / ${total}`} _icons="codicon codicon-pass-filled" _tone="brand" />
				{systems.map((system) => (
					<FinkStatCard
						_level={2}
						key={system.key}
						_label={system.label}
						_value={`${coverageOf(system.key)} / ${total}`}
						_icons="codicon codicon-symbol-class"
						_tone="neutral"
					/>
				))}
			</FinkGrid>
			<p className="muted small compare-note">
				{t(
					'{{kolibri}} Zeilen deckt KoliBri direkt ab, {{fink}} ergänzt Fink. Gezählt wird, ob ein System eine eigene Komponente dafür hat; Muster und Rezepte zählen nicht.',
					{
						kolibri,
						fink: benchmark.filter((row) => row.coverage === 'fink').length,
					},
				)}
			</p>

			<div className="compare-layout">
				<div className="compare-main">
					<FinkSegmented
						_label={t('Anzeigen')}
						_value={filter}
						_options={[
							{ value: 'all', label: t('Alle') },
							{ value: 'fink', label: t('Fink-Ergänzungen') },
							{ value: 'gaps', label: t('Lücken') },
						]}
						onFinkChange={(e) => setFilter(e.detail)}
					/>
					{TIERS.map((tier) => {
						const tierRows = rows.filter((row) => row.tier === tier.tier);
						if (tierRows.length === 0) return null;
						return (
							<section key={tier.id} className="section">
								<h2 id={tier.id}>{t(tier.title)}</h2>
								<p className="section-intro">{t(tier.intro)}</p>
								<div className="doc-table-wrap" tabIndex={0} role="region" aria-labelledby={tier.id}>
									<table className="doc-table compare-table">
										<thead>
											<tr>
												<th scope="col">{t('Komponente')}</th>
												<th scope="col">{t('Fink')}</th>
												{systems.map((system) => (
													<th key={system.key} scope="col">
														{system.label}
													</th>
												))}
											</tr>
										</thead>
										<tbody>
											{tierRows.map((row) => (
												<tr key={row.name}>
													<th scope="row">{t(row.name)}</th>
													<td>
														<span className="compare-fink">
															<FinkStatus _label={t(COVERAGE[row.coverage].label)} _tone={COVERAGE[row.coverage].tone} />
															{row.fink.map((id, i) => (
																<Fragment key={id}>
																	{i > 0 && ' '}
																	{findEntry(id) ? (
																		<a className="component-link" href={`#/components/${id}`}>
																			{id}
																		</a>
																	) : (
																		<code>{id}</code>
																	)}
																</Fragment>
															))}
															{row.note && <span className="muted small">{t(row.note)}</span>}
														</span>
													</td>
													{systems.map((system) => (
														<td key={system.key} className={row[system.key] ? undefined : 'compare-none'}>
															{row[system.key] ?? (
																<>
																	<span aria-hidden="true">–</span>
																	<span className="visually-hidden">{t('keine eigene Komponente')}</span>
																</>
															)}
														</td>
													))}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</section>
						);
					})}
				</div>
				<aside className="compare-aside">
					<FinkToc _sticky _items={TIERS.map((tier) => ({ id: tier.id, label: t(tier.title) }))} />
				</aside>
			</div>

			<section className="section" aria-labelledby="method">
				<h2 id="method">{t('Methode')}</h2>
				<ul className="prose">
					<li>{t('Stand der Vergleichssysteme: MUI 7 (inklusive MUI X), Vuetify 3, Material Design 3, Carbon v11, Ant Design 5.')}</li>
					<li>{t('„Teilweise“ heißt: Die Aufgabe ist lösbar, aber nicht mit gleichem Umfang (z. B. Tooltips nur an KoliBri-Bedienelementen).')}</li>
					<li>{t('„Fehlt“ markiert bewusst offene Punkte für die nächsten Ausbaustufen.')}</li>
				</ul>
			</section>
		</>
	);
}
