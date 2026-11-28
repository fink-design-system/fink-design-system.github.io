import { FinkBreadcrumb, FinkEmptyState, FinkLinkButton, FinkPageHeader } from '@fink-ui/react';
import { findEntry } from '../catalog';
import { reuse } from '../catalog/reuse';
import { t } from '../i18n';
import { CodeBlock } from '../site/CodeBlock';
import { Demo } from '../site/Demo';
import { ApiTables, getDocs } from '../site/PropsTable';

const toPascal = (tag: string) =>
	tag
		.split('-')
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('');

export function ComponentDetail({ id }: { id: string }) {
	const entry = findEntry(id);
	if (!entry) {
		return (
			<FinkEmptyState
				_level={1}
				_heading={t('Komponente nicht gefunden')}
				_description={t('Es gibt keine Komponente mit der Kennung „{{id}}“.', { id })}
				_icons="codicon codicon-question"
			>
				<FinkLinkButton _label={t('Zur Übersicht')} _href="#/components" _variant="primary" />
			</FinkEmptyState>
		);
	}
	const docs = entry.layer === 'fink' ? getDocs(entry.tag) : undefined;
	return (
		<>
			<FinkPageHeader _heading={entry.name} _description={entry.summary}>
				<FinkBreadcrumb
					slot="breadcrumb"
					_label={t('Brotkrumen')}
					_links={[
						{ _label: t('Komponenten'), _href: '#/components' },
						{ _label: entry.name, _href: `#/components/${entry.id}` },
					]}
				/>
				<span slot="meta" className={`layer-chip layer-chip--${entry.layer}`}>
					{entry.layer === 'fink' ? 'Fink-Kompositum' : 'KoliBri-Atom'}
				</span>
				<span slot="meta" className="layer-chip" style={{ background: 'var(--fink-color-mute)' }}>
					&lt;{entry.tag}&gt;
				</span>
				{entry.docsUrl && (
					<FinkLinkButton slot="actions" _label={t('KoliBri-Doku')} _href={entry.docsUrl} _target="_blank" _icons="codicon codicon-link-external" />
				)}
			</FinkPageHeader>

			{reuse[entry.tag] && (
				<aside className="reuse-note" aria-label={t('KoliBri-Nachnutzung')}>
					<strong>{t('Baut auf KoliBri:')}</strong>{' '}
					{reuse[entry.tag].buildsOn.length ? reuse[entry.tag].buildsOn.map((b) => <code key={b}>{b}</code>) : <span>– (reines Layout)</span>}
					<p>{reuse[entry.tag].reason}</p>
				</aside>
			)}

			{entry.demos.map((demo) => (
				<Demo key={demo.title} title={demo.title} code={demo.code} plain={demo.plain}>
					{demo.render()}
				</Demo>
			))}

			{entry.guidance && (
				<section className="section" aria-labelledby="guidance">
					<h2 id="guidance">{t('Verwendung')}</h2>
					<ul className="prose">
						{entry.guidance.map((text) => (
							<li key={text}>{text}</li>
						))}
					</ul>
				</section>
			)}

			{docs && (
				<>
					<section className="section" aria-labelledby="usage">
						<h2 id="usage">{t('Einbindung')}</h2>
						<p className="section-intro">{t('Als React-Komponente aus @fink-ui/react oder framework-frei als Web Component.')}</p>
						<CodeBlock
							code={{
								react: `import { ${toPascal(entry.tag)} } from '@fink-ui/react';`,
								html: `<script type="module">\n  import { defineCustomElements } from '@fink-ui/components/dist/loader/index.js';\n  await defineCustomElements();\n</script>\n\n<${entry.tag}></${entry.tag}>`,
								bash: 'pnpm add @fink-ui/react @public-ui/components',
							}}
						/>
					</section>
					<section className="section" aria-labelledby="api">
						<h2 id="api">{t('API')}</h2>
						<p className="section-intro">Automatisch aus dem Stencil-Quellcode erzeugt (docs-json).</p>
						<ApiTables tag={entry.tag} />
					</section>
				</>
			)}
		</>
	);
}
