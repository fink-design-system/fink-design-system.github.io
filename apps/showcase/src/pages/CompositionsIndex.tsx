import { FinkGrid, FinkPageHeader } from '@fink/react';
import { compositions } from '../compositions';
import { patterns } from '../patterns';
import { t } from '../i18n';

export function CompositionsIndex() {
	return (
		<>
			<FinkPageHeader
				_heading={t('Kompositionen')}
				_description={t('Vollständige, interaktive Anwendungen, in denen die Patterns zusammenspielen. Daten liegen nur in Ihrer Browser-Sitzung.')}
			/>
			<FinkGrid _min="20rem">
				{compositions.map((c) => (
					<a key={c.id} className="catalog-card pattern-card" href={`#/compositions/${c.id}`}>
						<span className="pattern-head">
							<span className={`pattern-icon ${c.icon}`} aria-hidden="true"></span>
							<span className="source-chip">{c.patterns.length} Patterns</span>
						</span>
						<h2>{c.title}</h2>
						<p>{c.summary}</p>
						<span className="chip-row">
							{c.patterns.map((n) => {
								const p = patterns.find((x) => x.number === n);
								return p ? (
									<span key={n} className="source-chip" title={p.title}>
										{n}. {p.title}
									</span>
								) : null;
							})}
						</span>
					</a>
				))}
			</FinkGrid>
		</>
	);
}
