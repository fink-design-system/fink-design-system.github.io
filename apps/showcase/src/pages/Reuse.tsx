import { FinkGrid, FinkPageHeader, FinkStatCard } from '@fink/react';
import { catalog } from '../catalog';
import { reuse } from '../catalog/reuse';
import { DocTable } from '../site/DocTable';
import { kolibriTags, kolibriUsage, usedCount } from '../site/kolibriUsage';
import { patterns } from '../patterns';
import { t } from '../i18n';

export function Reuse() {
	const fink = catalog.filter((entry) => entry.layer === 'fink');
	const kolUsedInPatterns = new Set(patterns.flatMap((p) => p.components.filter((c) => c.startsWith('kol-'))));
	const finkUsedInPatterns = new Set(patterns.flatMap((p) => p.components.filter((c) => c.startsWith('fink-'))));
	const kolInFink = new Set(Object.values(reuse).flatMap((r) => r.buildsOn.filter((b) => b.startsWith('kol-')).map((b) => b.split(' ')[0])));
	return (
		<>
			<FinkPageHeader
				_heading={t('KoliBri-Nachnutzung')}
				_description={t('Fink ergänzt KoliBri, statt es nachzubauen. Wo KoliBri eine Komponente hat, wird sie direkt oder als Innenleben genutzt. Eigene Fink-Komponenten schließen nur echte Lücken.')}
			/>
			<FinkGrid _min="9.5rem">
				<FinkStatCard _label={t('KoliBri-Komponenten genutzt')} _value={`${usedCount} / ${kolibriTags.length}`} _icons="codicon codicon-pass" _tone="success" />
				<FinkStatCard _label={t('KoliBri-Komponenten direkt in Patterns')} _value={String(kolUsedInPatterns.size)} _icons="codicon codicon-symbol-misc" _tone="success" />
				<FinkStatCard _label={t('KoliBri-Komponenten in Fink verbaut')} _value={String(kolInFink.size)} _icons="codicon codicon-references" _tone="info" />
				<FinkStatCard _label={t('Fink-Komponenten')} _value={String(fink.length)} _icons="codicon codicon-extensions" />
				<FinkStatCard _label={t('davon in Patterns genutzt')} _value={String(finkUsedInPatterns.size)} _icons="codicon codicon-graph" _tone="warning" />
			</FinkGrid>

			<section className="section" aria-labelledby="rules">
				<h2 id="rules">{t('Regeln')}</h2>
				<ol className="prose">
					<li>Gibt es eine KoliBri-Komponente für die Aufgabe, wird sie direkt verwendet (z. B. Alerts, Dialoge, Tabellen, Tabs, Formularfelder, Toasts).</li>
					<li>{t('Fehlt nur Optik, wird das Fink-Theme erweitert – keine neue Komponente.')}</li>
					<li>Eine Fink-Komponente entsteht nur für eine Lücke (Muster oder Komposition) und nutzt intern so viele kol-* Bausteine wie möglich.</li>
					<li>{t('Jede Fink-Komponente dokumentiert, worauf sie aufbaut und warum es sie gibt.')}</li>
				</ol>
			</section>

			<section className="section" aria-labelledby="matrix">
				<h2 id="matrix">{t('Matrix')}</h2>
				<DocTable
					label={t('Fink-Komponenten und genutzte KoliBri-Komponenten')}
					columns={[
						{ key: 'tag', label: t('Fink-Komponente'), link: true },
						{ key: 'kind', label: t('Art') },
						{ key: 'buildsOn', label: t('Baut auf (KoliBri)'), code: true },
						{ key: 'reason', label: t('Warum eine eigene Komponente?') },
					]}
					rows={fink.map((entry) => ({
						tag: `<${entry.tag}>|#/components/${entry.id}`,
						kind: reuse[entry.tag]?.kind ?? '–',
						buildsOn: reuse[entry.tag]?.buildsOn.join(', ') || t('– (reines Layout/Markup)'),
						reason: reuse[entry.tag]?.reason ?? '–',
					}))}
				/>
			</section>

			<section className="section" aria-labelledby="usage">
				<h2 id="usage">{t('Nutzung aller KoliBri-Komponenten')}</h2>
				<p className="section-intro">{t('Automatisch zur Build-Zeit aus dem Quellcode ermittelt: wo jede KoliBri-Komponente verwendet wird.')}</p>
				<DocTable
					label={t('Nutzung aller KoliBri-Komponenten')}
					columns={[
						{ key: 'tag', label: t('KoliBri-Komponente'), code: true },
						{ key: 'areas', label: t('Verwendet in') },
					]}
					rows={kolibriUsage.map((u) => ({ tag: `<${u.tag}>`, areas: u.areas.length ? u.areas.map((a) => t(a)).join(', ') : t('– noch nicht genutzt') }))}
				/>
			</section>
		</>
	);
}
