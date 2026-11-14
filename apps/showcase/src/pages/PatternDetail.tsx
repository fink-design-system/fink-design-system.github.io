import { FinkEmptyState, FinkGrid, FinkPageHeader, FinkPanel, KolBreadcrumb, KolLinkButton } from '@fink/react';
import { catalog } from '../catalog';
import { findPattern, patterns, SOURCE_URLS } from '../patterns';
import { Demo } from '../site/Demo';
import { CodeBlock } from '../site/CodeBlock';
import { DocTable } from '../site/DocTable';
import { t } from '../i18n';

const catalogIdFor = (tag: string) => {
	if (catalog.some((entry) => entry.id === tag)) return tag;
	if (tag.startsWith('kol-input') || tag === 'kol-textarea' || tag === 'kol-single-select' || tag === 'kol-combobox' || tag === 'kol-form') return 'kol-inputs';
	if (tag === 'kol-toast-container') return 'kol-toast';
	return undefined;
};

export function PatternDetail({ id }: { id: string }) {
	const pattern = findPattern(id);
	if (!pattern) {
		return (
			<FinkEmptyState _heading={t('Pattern nicht gefunden')} _description={t('Es gibt kein Pattern „{{id}}“.', { id })} _icons="codicon codicon-question">
				<KolLinkButton _label={t('Alle Patterns')} _href="#/patterns" _variant="primary" />
			</FinkEmptyState>
		);
	}
	const index = patterns.indexOf(pattern);
	const prev = patterns[index - 1];
	const next = patterns[index + 1];

	return (
		<>
			<FinkPageHeader _heading={`${pattern.number}. ${pattern.title}`} _description={pattern.summary}>
				<KolBreadcrumb
					slot="breadcrumb"
					_label={t('Brotkrumen')}
					_links={[
						{ _label: t('Patterns'), _href: '#/patterns' },
						{ _label: t(pattern.category), _href: '#/patterns' },
						{ _label: pattern.title, _href: `#/patterns/${pattern.id}` },
					]}
				/>
				{pattern.sources.map((s) => (
					<span key={s.system} slot="meta" className="source-chip" title={s.name}>
						{s.system}: {s.name}
					</span>
				))}
			</FinkPageHeader>

			<p className="lead">{pattern.problem}</p>

			<Demo title={t('Live-Beispiel')} code={pattern.code} plain={pattern.plain} codeOpen>
				{pattern.demo()}
			</Demo>

			<FinkGrid _min="18rem" _gap="4">
				<FinkPanel _heading={t('Wann einsetzen')} _level={2}>
					<ul className="check-list">
						{pattern.when.map((text) => (
							<li key={text}>{text}</li>
						))}
					</ul>
				</FinkPanel>
				{pattern.avoid && (
					<FinkPanel _heading={t('Wann nicht')} _level={2}>
						<ul className="cross-list">
							{pattern.avoid.map((text) => (
								<li key={text}>{text}</li>
							))}
						</ul>
					</FinkPanel>
				)}
				<FinkPanel _heading={t('Barrierefreiheit')} _level={2}>
					<ul className="a11y-list">
						{pattern.a11y.map((text) => (
							<li key={text}>{text}</li>
						))}
					</ul>
				</FinkPanel>
			</FinkGrid>

			<section className="section" aria-labelledby="used">
				<h2 id="used">{t('Verwendete Komponenten')}</h2>
				<div className="chip-row">
					{pattern.components.map((tag) => {
						const target = catalogIdFor(tag);
						return target ? (
							<a key={tag} className="component-link" href={`#/components/${target}`}>
								&lt;{tag}&gt;
							</a>
						) : (
							<span key={tag} className="component-link component-link--plain">
								&lt;{tag}&gt;
							</span>
						);
					})}
				</div>
			</section>

			<section className="section" aria-labelledby="sources">
				<h2 id="sources">{t('Vorbilder in anderen Design Systemen')}</h2>
				<DocTable
					label={t('Vorbilder')}
					columns={[
						{ key: 'system', label: t('Design System'), link: true },
						{ key: 'name', label: t('Bezeichnung dort') },
					]}
					rows={pattern.sources.map((source) => ({ system: `${source.system}|${SOURCE_URLS[source.system]}`, name: source.name }))}
				/>
			</section>

			<section className="section" aria-labelledby="install">
				<h2 id="install">{t('Einbindung')}</h2>
				<CodeBlock
					code={{
						bash: 'pnpm add @fink/react @public-ui/components',
						react: `import { ${[...new Set(pattern.components.map((tag) => tag.replace(/(^|-)([a-z])/g, (_m, _d, c: string) => c.toUpperCase()).replace(/^Kol(ToastContainer)$/, 'useToast')))].join(', ')} } from '@fink/react';`,
					}}
				/>
			</section>

			<nav className="pager" aria-label={t('Weitere Patterns')}>
				{prev ? <KolLinkButton _label={`← ${prev.number}. ${prev.title}`} _href={`#/patterns/${prev.id}`} _variant="tertiary" /> : <span />}
				{next && <KolLinkButton _label={`${next.number}. ${next.title} →`} _href={`#/patterns/${next.id}`} _variant="tertiary" />}
			</nav>
		</>
	);
}
