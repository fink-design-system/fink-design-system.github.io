import { FinkGrid, FinkLink, FinkPageHeader } from '@fink-ui/react';
import { t } from '../i18n';
import { REPO_URL } from '../site/GitHubLink';

interface Starter {
	id: string;
	title: string;
	install: string;
	summary: string;
}

/** Die Samples aus samples/, statisch gebaut nach dist/samples/<id>/ (website/scripts/build-samples.mjs). */
const starters: Starter[] = [
	{
		id: 'html',
		title: 'HTML',
		install: '@fink-ui/components',
		summary: t('Ohne Framework und ohne Bundler: ein Script-Tag auf den Build von @fink-ui/components.'),
	},
	{ id: 'react', title: 'React', install: '@fink-ui/react', summary: t('React mit Vite und den Komponenten als Fink*.') },
	{ id: 'vue', title: 'Vue', install: '@fink-ui/vue', summary: t('Vue mit Vite, Props mit Objekten per :_on gebunden.') },
	{ id: 'angular', title: 'Angular', install: '@fink-ui/angular', summary: t('Standalone-Komponenten mit fink-*-Selektoren.') },
	{ id: 'nextjs', title: 'Next.js', install: '@fink-ui/react', summary: t('Server-Rendering, der Fink-Teil rendert im Browser. Hier als statischer Export.') },
	{
		id: 'react-router',
		title: 'React Router',
		install: '@fink-ui/react',
		summary: t('Framework-Modus, Registrierung in einem clientLoader. Hier vorab gerendert.'),
	},
	{ id: 'nuxt', title: 'Nuxt', install: '@fink-ui/vue', summary: t('Server-Rendering mit Client-Plugin und <ClientOnly>. Hier statisch erzeugt.') },
	{ id: 'astro', title: 'Astro', install: '@fink-ui/components', summary: t('Statisches fink-*-HTML, registriert per Seiten-Script.') },
];

const sampleUrl = (id: string) => `${import.meta.env.BASE_URL}samples/${id}/`;

export function Starters() {
	return (
		<>
			<FinkPageHeader
				_heading={t('Starter')}
				_description={t('Acht lauffähige Einstiege, je Framework einer. Alle zeigen dieselbe Startseite und beziehen Fink von npm.')}
			/>
			<FinkGrid _min="24rem">
				{starters.map((s) => (
					<article key={s.id} className="catalog-card starter-card" aria-labelledby={`starter-${s.id}`}>
						<h2 id={`starter-${s.id}`}>{s.title}</h2>
						<p>{s.summary}</p>
						<code className="starter-install">npm install {s.install}</code>
						<iframe className="starter-frame" src={sampleUrl(s.id)} title={t('Vorschau des Starters {{name}}', { name: s.title })} loading="lazy" />
						<span className="starter-links">
							<FinkLink _href={sampleUrl(s.id)} _label={t('In neuem Tab öffnen')} _target="_blank" />
							<FinkLink _href={`${REPO_URL}/tree/develop/samples/${s.id}`} _label={t('Quellcode')} _target="_blank" />
						</span>
					</article>
				))}
			</FinkGrid>
		</>
	);
}
